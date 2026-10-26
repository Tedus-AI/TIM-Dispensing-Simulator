export const VERSION = '0.2.0';
export const LABEL = '工程假設／未經實機校準';
export const BEAD_SIDES = 32;
export const ENDING_DEFAULT = {id:'ending.shutoff_distance',value:10,unit:'mm',evidence:'engineering_assumption',basis:'AI 初始比較值：預設 100 mm 路徑、100 mm/s、500 mm/s² 對應提前 200 ms 關膠。不是原廠配方；速度或路徑改變後提前時間也會改變。',source_refs:['16_收尾積膠原因與影片比對.md']};
export function fromRegistry(registry, material='putty', architecture='R75') {
  const p=Object.fromEntries(registry.parameters.map(p=>[p.id,p.value]));
  const g=k=>p[k]; const pcp=architecture==='P300';
  return { material, architecture, profile:pcp?`P300_${material==='putty'?'PUTTY':'GREASE'}_IDEAL`:`R75_${material==='putty'?'PUTTY':'GREASE'}_ASSUMED`,
    density:g(`material.${material}.density`), viscosity:g('grease_proxy.constant_viscosity'),
    pressure:g('scenario.pressure'), referencePressure:g('scenario.reference_pressure'), referenceRate:g('putty_proxy.reference_rate'), pressureExponent:g('putty_proxy.pressure_exponent'),
    diameter:g('virtual_nozzle.id'), nozzleLength:g('virtual_nozzle.length'), referenceDiameter:g('virtual_nozzle.reference_id'), referenceLength:g('virtual_nozzle.reference_length'),
    rpm:g('p300.pcp.speed'), displacement:g('p300.pcp.displacement'), efficiency:g('p300.pcp.volumetric_efficiency'),
    delay:g(`${pcp?'p300':'r75'}.dynamic.delay`), tauOn:g(`${pcp?'p300':'r75'}.dynamic.tau_on`), tauOff:g(`${pcp?'p300':'r75'}.dynamic.tau_off`),
    fill:g(`${pcp?'p300':'r75'}.${material==='grease'?'grease':'cartridge'}.initial_fill`), residual:g(`${pcp?'p300':'r75'}.cartridge.unusable_residual`),
    hoseId:g('p300.hose.id'), hoseLength:g('p300.hose.length'), deadVolume:g('p300.adapter.wetted_dead_volume'),
    speed:g('motion.speed'), acceleration:g('motion.acceleration'), standoff:g('motion.standoff'), liftSpeed:g('motion.lift_speed'), liftDistance:g('motion.lift_distance'),
    mode:'line', lineLength:g('job.line_length'), gateDuration:g('job.point_gate_duration'), shutoffDistance:ENDING_DEFAULT.value, lineRatio:g('shape.line_height_to_width'), dotRatio:g('shape.dot_height_to_width'),
    width:g('workpiece.width'), depth:g('workpiece.depth'), thickness:5, fixtureHeight:8, surfaceZ:13, offsetX:0, offsetY:0,
    timestep:g('numerics.initial_timestep'), cellSize:0.5, workpieceKind:'plate', workpieceFile:null };
}
export function steadyFlow(c) {
  if(c.architecture==='P300') return c.displacement*c.rpm*c.efficiency/60;
  if(c.material==='putty') return c.referenceRate*(Math.max(c.pressure,0)/c.referencePressure)**c.pressureExponent*(c.diameter/c.referenceDiameter)**4*(c.referenceLength/c.nozzleLength);
  return Math.PI*(c.diameter/1000)**4*(Math.max(c.pressure,0)*6894.757293168)/(128*c.viscosity*c.nozzleLength/1000)*1e6;
}
export function motionProfile(length,speed,acceleration) {
  const peak=Math.min(speed,Math.sqrt(length*acceleration)), ramp=peak/acceleration;
  const cruise=Math.max(0,(length-peak*peak/acceleration)/peak), duration=2*ramp+cruise;
  return {duration,peak,ramp,cruise,at(t){
    if(t<=0)return {x:0,v:0}; if(t>=duration)return {x:length,v:0};
    if(t<ramp)return {x:0.5*acceleration*t*t,v:acceleration*t};
    if(t<ramp+cruise)return {x:0.5*peak*ramp+peak*(t-ramp),v:peak};
    const rem=duration-t; return {x:length-0.5*acceleration*rem*rem,v:acceleration*rem};
  }};
}
// Inverse of the same triangular/trapezoidal motion, so shutoff distance remains a distance during deceleration.
export function timeAtDistance(profile,length,acceleration,distance) {
  const x=Math.max(0,Math.min(length,distance)),rampDistance=profile.peak*profile.ramp/2;
  if(x<=rampDistance)return Math.sqrt(2*x/acceleration);
  if(x>=length-rampDistance)return profile.duration-Math.sqrt(2*(length-x)/acceleration);
  return profile.ramp+(x-rampDistance)/profile.peak;
}
// Analytic integral of a delayed rectangular command with nonnegative first-order response.
export function pulse(t,Q,duration,delay,tauOn,tauOff) {
  const u=t-delay;
  if(u<=0 || Q===0 || duration<=0)return {q:0,volume:0};
  const on=Math.min(u,duration), gain=-Math.expm1(-on/tauOn);
  let volume=Q*(on-tauOn*gain), q=Q*gain;
  if(u>duration){const tail=u-duration; volume+=q*tauOff*(-Math.expm1(-tail/tauOff));q*=Math.exp(-tail/tauOff);}
  return {q,volume};
}
export function validate(c) {
  for(const [k,v] of Object.entries(c)) if(typeof v==='number' && !Number.isFinite(v))throw new Error(`${k} 必須是有限數值`);
  const ranges={pressure:[0,100],diameter:[0.2,8],nozzleLength:[1,100],rpm:[0,300],efficiency:[0,1],density:[0.1,10],viscosity:[1,100000],referenceRate:[0,10],pressureExponent:[0.1,4],
    delay:[0,2],tauOn:[0.001,2],tauOff:[0.001,2],fill:[0,500],residual:[0,500],hoseId:[1,25],hoseLength:[0,5000],speed:[1,800],acceleration:[1,10000],standoff:[0.1,20],
    lineLength:[1,250],gateDuration:[0.001,10],shutoffDistance:[0,250],lineRatio:[0.05,2],dotRatio:[0.05,0.5],width:[1,1000],depth:[1,1000],thickness:[0.1,200],fixtureHeight:[0,100],timestep:[0.0001,0.01],cellSize:[0.1,5]};
  for(const [k,[a,b]]of Object.entries(ranges)) if(c[k]<a||c[k]>b)throw new Error(`${k} 超出原型允許範圍 ${a}–${b}`);
  if(c.residual>c.fill)throw new Error('不可用殘量不能大於裝填量');
  if(c.architecture==='P300'&&Math.abs(c.tauOn-c.tauOff)>1e-12)throw new Error('PCP 必須共用起停時間常數，以保持計量守恆');
  if(!['line','point'].includes(c.mode))throw new Error('未知路徑模式');
}
export function lineDimensions(volumeMl,length,ratio) {
  const area=1000*volumeMl/length, width=Math.sqrt(4*area/(Math.PI*ratio));
  return {width,height:ratio*width,area};
}
export function dotDimensions(volumeMl,ratio) {
  const b=Math.cbrt(1000*volumeMl*3/(Math.PI*ratio*(3+4*ratio*ratio)));
  return {radius:b,height:2*ratio*b};
}
// Shared continuous half-ellipse rings. Reconstruct radii without overshoot, then normalize
// the exact frustum integral to the deposited volume. This is geometric reconstruction, not wetting physics.
export function beadProfile(deposits,cellLength,ratio) {
  const n=deposits.length,widths=new Float64Array(n+1),heights=new Float64Array(n+1);
  let target=0,integral=0;
  for(const v of deposits)target+=v*1000;
  for(let i=1;i<n;i++)widths[i]=Math.sqrt(4*1000*(deposits[i-1]+deposits[i])/(2*cellLength*Math.PI*ratio));
  for(let i=0;i<n;i++)integral+=BEAD_SIDES*Math.sin(Math.PI/BEAD_SIDES)*ratio/4*cellLength*(widths[i]**2+widths[i]*widths[i+1]+widths[i+1]**2)/3;
  const scale=integral>0?Math.sqrt(target/integral):0;
  for(let i=0;i<=n;i++){widths[i]*=scale;heights[i]=widths[i]*ratio;}
  return {widths,heights,volumeMm3:target,maxHeight:Math.max(...heights),maxWidth:Math.max(...widths)};
}
export function simulate(input) {
  const c={shutoffDistance:0,...structuredClone(input)}; validate(c);
  const Q=steadyFlow(c), pcp=c.architecture==='P300', available=c.fill-c.residual;
  const motion=motionProfile(c.lineLength,c.speed,c.acceleration);
  const effectiveShutoffDistance=c.mode==='line'?Math.min(c.shutoffDistance,c.lineLength):0;
  const gate=c.mode==='line'?timeAtDistance(motion,c.lineLength,c.acceleration,c.lineLength-effectiveShutoffDistance):c.gateDuration;
  const meterGate=pcp&&Q>0?Math.min(gate,available/Q):gate;
  const movementEnd=c.mode==='line'?motion.duration:gate;
  const tailEnd=Math.max(movementEnd,gate+c.delay+20*Math.max(c.tauOn,c.tauOff));
  const duration=tailEnd+c.liftDistance/c.liftSpeed;
  if(duration>180)throw new Error('試驗超過 180 秒，請縮短路徑或提高速度');
  const fixed=Math.PI*c.diameter**2/4*c.nozzleLength/1000+(pcp?Math.PI*c.hoseId**2/4*c.hoseLength/1000+c.deadVolume:0);
  const initial=c.fill+fixed;
  // Finite longitudinal footprint prevents zero-speed deposition collapsing into a thin end wall.
  // Its support equals the nozzle bore: an explicit geometric assumption, not measured wetting.
  const gridStart=-c.diameter/2, gridLength=c.lineLength+c.diameter;
  const bins=c.mode==='point'?1:Math.max(2,Math.ceil(gridLength/c.cellSize)), cellLength=gridLength/bins;
  const deposits=new Float64Array(bins), frames=[];
  let previousOut=0, nextFrame=0, maxHeight=0;
  const evaluate=t=>{
    const raw=pulse(t,Q,pcp?meterGate:gate,c.delay,c.tauOn,c.tauOff);
    const output=pcp?raw.volume:Math.min(available,raw.volume);
    const metered=pcp?Q*Math.min(t,meterGate):output;
    const pending=pcp?Math.max(0,metered-output):0;
    const remain=Math.max(c.residual,c.fill-metered);
    const pos=c.mode==='line'?motion.at(t):{x:0,v:0};
    const x=c.offsetX+(c.mode==='line'?pos.x-c.lineLength/2:0);
    const lift=Math.min(c.liftDistance,Math.max(0,t-tailEnd)*c.liftSpeed);
    return {t,q:(!pcp&&raw.volume>=available)?0:raw.q,target:t<meterGate?Q:0,command:t<meterGate?1:0,output,mass:output*c.density,metered,pending,remaining:remain,fixed,initial,x,y:c.offsetY,z:c.surfaceZ+c.standoff+lift,speed:pos.v,
      phase:t<meterGate?'點膠中':t<movementEnd?'收尾移動（已關膠）':t<tailEnd?'停止／尾膠結算':t<duration?'抬針':'完成', balance:initial-(remain+fixed+pending+output)};
  };
  const steps=Math.ceil(duration/c.timestep);
  for(let i=0;i<=steps;i++){
    const t=Math.min(duration,i*c.timestep), s=evaluate(t);
    const middle=c.mode==='line'?motion.at(Math.max(0,t-c.timestep/2)).x:0;
    const dv=Math.max(0,s.output-previousOut);
    if(c.mode==='point')deposits[0]+=dv;
    else{
      const radius=Math.max(c.diameter/2,cellLength),index=Math.floor((middle-gridStart)/cellLength),reach=Math.ceil(radius/cellLength)+1;
      const weights=[];let sum=0;
      for(let j=Math.max(0,index-reach);j<=Math.min(bins-1,index+reach);j++){
        const weight=Math.max(0,1-Math.abs(gridStart+(j+.5)*cellLength-middle)/radius);
        if(weight){weights.push([j,weight]);sum+=weight;}
      }
      for(const [j,weight] of weights)deposits[j]+=dv*weight/sum;
    }
    previousOut=s.output;
    if(t+1e-9>=nextFrame || i===steps){
      frames.push({...s,deposits:Float64Array.from(deposits)});nextFrame+=0.01;
    }
  }
  const profile=c.mode==='line'?beadProfile(deposits,cellLength,c.lineRatio):null;
  maxHeight=profile?profile.maxHeight:dotDimensions(previousOut,c.dotRatio).height;
  const last=frames.at(-1), warnings=[];
  const afterStopVolume=Math.max(0,last.output-evaluate(movementEnd).output);
  const windowMean=(a,b)=>{let volume=0;for(let i=0;i<bins;i++){const left=gridStart+i*cellLength;volume+=deposits[i]*Math.max(0,Math.min(b,left+cellLength)-Math.max(a,left))/cellLength;}return volume/(b-a);};
  const endWindow=Math.min(5,c.lineLength/5),middleMean=windowMean(c.lineLength*.4,c.lineLength*.6);
  const endRatio=c.mode==='line'&&middleMean>1e-12?windowMean(c.lineLength-endWindow,c.lineLength)/middleMean:null;
  const ending={movementEnd,commandOff:meterGate,effectiveShutoffDistance,leadTime:movementEnd-gate,afterStopVolume,afterStopPercent:last.output>0?afterStopVolume/last.output*100:0,endWindowMm:endWindow,endToMiddleRatio:endRatio};
  if(c.mode==='line'&&c.shutoffDistance>=c.lineLength)warnings.push('提前關膠距離達到或超過路徑長度，本次不開膠；請縮短提前距離。');
  if(c.mode==='line'&&endRatio!==null&&endRatio<.5)warnings.push('末段平均截面低於中段一半，可能欠膠；此比較門檻為 AI 初估，不是產品驗收標準。');
  if(c.mode==='line'&&endRatio!==null&&endRatio>1.5)warnings.push('末段平均截面高於中段 1.5 倍，可能積膠；此比較門檻為 AI 初估，不是產品驗收標準。');
  if(maxHeight>c.standoff)warnings.push('簡化膠形高於針距，可能干涉；尚未計算壓扁或拉絲。');
  const maxWidth=profile?profile.maxWidth:dotDimensions(last.output,c.dotRatio).radius*2;
  if((c.mode==='line'?(c.lineLength+c.diameter)/2:maxWidth/2)+Math.abs(c.offsetX)>c.width/2 || maxWidth/2+Math.abs(c.offsetY)>c.depth/2)warnings.push('路徑或膠形超出工件範圍；沉積位置仍按水平參考面外推。');
  const workspace=pcp?[254,277]:[300,300];
  if(c.width>workspace[0]||c.depth>workspace[1])warnings.push('工件超出所選設備的參考工作範圍；未自動縮小。');
  if(c.surfaceZ+c.standoff+c.liftDistance>(pcp?70:100))warnings.push('工件／針嘴高度超出參考 Z 行程；尚未確認真實機台的裝夾與工具偏置。');
  if(c.workpieceKind!=='plate')warnings.push('匯入工件只作實尺寸顯示；膠形使用上方水平參考面，未驗證孔洞、曲面或完整碰撞。');
  if(last.remaining<=c.residual+1e-9)warnings.push('可用膠量已耗盡；固定預填流道未吹空。');
  if(pcp)warnings.push('理想 PCP 假設滿腔；管路壓降、供料不足與材料適配尚未計算。');
  return {version:VERSION,label:LABEL,config:c,Q,gate,duration,tailEnd,cellLength,gridStart,frames,warnings,maxHeight,ending,summary:{...last,deposits:Array.from(last.deposits),maxHeight,ending}};
}
export function frameAt(run,t) {
  let lo=0,hi=run.frames.length-1;
  while(lo<hi){const m=Math.ceil((lo+hi)/2);if(run.frames[m].t<=t)lo=m;else hi=m-1;}
  return run.frames[lo];
}
