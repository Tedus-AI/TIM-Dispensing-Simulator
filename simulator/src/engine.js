import {planDispensePath, pointOnPath} from './path-planning.js';
export const VERSION = '0.7.0';
export const LABEL = '工程假設／未經實機校準';
export const BEAD_SIDES = 32;
export const ENDING_DEFAULT = {id:'ending.shutoff_distance',value:10,unit:'mm',evidence:'engineering_assumption',basis:'AI 初始比較值：預設 100 mm 路徑、100 mm/s、500 mm/s² 對應提前 200 ms 關膠。不是原廠配方；速度或路徑改變後提前時間也會改變。',source_refs:['16_收尾積膠原因與影片比對.md']};
export const MOTION_DEFAULTS = [
  ['endMotion','vertical','','垂直抬針；提供斜退及先升再退，單點僅垂直。'],
  ['endDwell',.1,'s','到達終點後停留 100 ms 再離開；不是從提前關膠時刻起算。'],
  ['backtrackDistance',2,'mm','沿原直線反向回退 2 mm；垂直模式及單點不使用。'],
  ['backtrackSpeed',20,'mm/s','回退速度上限；抬針與回退共用設定加速度。'],
  ['reverseRpm',30,'rpm','理想 PCP 反轉參考轉速；僅回收未出嘴的暫存量。'],
  ['reverseDuration',0,'s','反轉預設關閉；手動比較初值 0.05 s，不能視為原廠配方。']
].map(([key,value,unit,basis])=>({id:`ending.${key}`,key,value,unit,evidence:'engineering_assumption',basis,source_refs:['18_v0.3收尾動作與體積分帳.md']}));
const motionDefaults=()=>Object.fromEntries(MOTION_DEFAULTS.map(p=>[p.key,p.value]));
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
    timestep:g('numerics.initial_timestep'), cellSize:0.5, workpieceKind:'plate', workpieceFile:null, ...motionDefaults() };
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
// B is a lumped forward-delivery inventory, not nozzle pressure or a material rheology law.
// During reverse: dB/dt=-B/tau-R. Only B can be recovered; deposited glue is never removed.
export function pcpResponse(t,Q,gate,delay,tau,reverseRate,reverseDuration) {
  const raw=pulse(t,Q,gate,delay,tau,tau),start=gate+delay;
  if(t<=start||reverseRate<=0||reverseDuration<=0||gate<=0)return {...raw,recovered:0,reverseActive:false};
  const before=pulse(start,Q,gate,delay,tau,tau),B0=Math.max(0,Q*gate-before.volume);
  const empty=tau*Math.log1p(B0/(reverseRate*tau)),u=t-start,active=Math.min(u,reverseDuration,empty);
  const recovered=reverseRate*active,B=Math.max(0,(B0+reverseRate*tau)*Math.exp(-active/tau)-reverseRate*tau)*Math.exp(-(u-active)/tau);
  return {q:B/tau,volume:before.volume+B0-recovered-B,recovered,reverseActive:u<Math.min(reverseDuration,empty)};
}
export function endingTrajectory(c,movementEnd,tailEnd) {
  const legacy=c.endMotion==='legacy',back=c.mode==='line'&&['diagonal','liftThenBack'].includes(c.endMotion)?Math.min(c.backtrackDistance,c.lineLength):0;
  const start=legacy?tailEnd:movementEnd+c.endDwell;
  const lift=motionProfile(c.liftDistance,c.liftSpeed,c.acceleration),retreat=back>0?motionProfile(back,c.backtrackSpeed,c.acceleration):null;
  const diagonal=c.endMotion==='diagonal'&&back>0,total=Math.hypot(back,c.liftDistance);
  const combined=diagonal?motionProfile(total,Math.min(c.liftSpeed*total/c.liftDistance,c.backtrackSpeed*total/back),c.acceleration):null;
  const end=start+(legacy?c.liftDistance/c.liftSpeed:combined?combined.duration:lift.duration+(retreat?retreat.duration:0));
  return {start,end,back,at(t){
    const u=Math.max(0,t-start);
    if(legacy){const z=Math.min(c.liftDistance,u*c.liftSpeed);return {back:0,lift:z,vx:0,vz:t>start&&t<end?c.liftSpeed:0,phase:'垂直抬針'};}
    if(combined){const p=combined.at(u);return {back:p.x*back/total,lift:p.x*c.liftDistance/total,vx:-p.v*back/total,vz:p.v*c.liftDistance/total,phase:'斜退抬針'};}
    const z=lift.at(u),x=retreat?retreat.at(u-lift.duration):{x:0,v:0};
    return {back:x.x,lift:z.x,vx:-x.v,vz:z.v,phase:u<lift.duration?'垂直抬針':'抬高後回退'};
  }};
}
export function validate(c) {
  for(const [k,v] of Object.entries(c)) if(typeof v==='number' && !Number.isFinite(v))throw new Error(`${k} 必須是有限數值`);
  const ranges={pressure:[0,100],diameter:[0.2,8],nozzleLength:[1,100],rpm:[0,300],efficiency:[0,1],density:[0.1,10],viscosity:[1,100000],referenceRate:[0,10],pressureExponent:[0.1,4],
    delay:[0,2],tauOn:[0.001,2],tauOff:[0.001,2],fill:[0,500],residual:[0,500],hoseId:[1,25],hoseLength:[0,5000],speed:[1,800],acceleration:[1,10000],standoff:[0.1,20],
    lineLength:[1,250],gateDuration:[0.001,10],shutoffDistance:[0,250],lineRatio:[0.05,2],dotRatio:[0.05,0.5],width:[1,1000],depth:[1,1000],thickness:[0.1,200],fixtureHeight:[0,100],timestep:[0.0001,0.01],cellSize:[0.1,5],liftSpeed:[.1,200],liftDistance:[.1,50],endDwell:[0,5],backtrackDistance:[0,50],backtrackSpeed:[.1,200],reverseRpm:[0,300],reverseDuration:[0,2]};
  for(const [k,[a,b]]of Object.entries(ranges)) if(c[k]<a||c[k]>b)throw new Error(`${k} 超出原型允許範圍 ${a}–${b}`);
  if(c.residual>c.fill)throw new Error('不可用殘量不能大於裝填量');
  if(c.architecture==='P300'&&Math.abs(c.tauOn-c.tauOff)>1e-12)throw new Error('PCP 必須共用起停時間常數，以保持計量守恆');
  if(!['line','point','pattern'].includes(c.mode))throw new Error('未知路徑模式');
  if(c.mode==='pattern'&&(!c.pathSettings||typeof c.pathSettings!=='object'))throw new Error('請先設定熱源與路徑');
  if(!['vertical','diagonal','liftThenBack','legacy'].includes(c.endMotion))throw new Error('未知收尾動作');
  if(c.architecture!=='P300'&&c.reverseDuration>0)throw new Error('氣壓式未提供 PCP 反轉回吸；請改用下降時間常數比較卸壓響應');
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
  const c={...motionDefaults(),endMotion:'legacy',shutoffDistance:0,...structuredClone(input)}; validate(c);
  const Q=steadyFlow(c), pcp=c.architecture==='P300', available=c.fill-c.residual;
  // Pattern deposition shares the existing volume ledger, indexed by path arc length.
  // The entire polyline uses a single scalar acceleration profile; no corner slowing.
  const path=c.mode==='pattern'?planDispensePath(c.pathSettings):null;
  if(path&&path.length<=1e-9)throw new Error('圖樣路徑沒有長度；單點請使用單點模式');
  const pathLength=path?path.length:c.lineLength, moving=c.mode!=='point';
  const motion=motionProfile(pathLength,c.speed,c.acceleration);
  const effectiveShutoffDistance=moving?Math.min(c.shutoffDistance,pathLength):0;
  const gate=moving?timeAtDistance(motion,pathLength,c.acceleration,pathLength-effectiveShutoffDistance):c.gateDuration;
  const meterGate=pcp&&Q>0?Math.min(gate,available/Q):gate;
  const movementEnd=moving?motion.duration:gate;
  const tailEnd=Math.max(movementEnd,gate+c.delay+20*Math.max(c.tauOn,c.tauOff));
  // A reverse command may outlast both motion and the numerically settled flow.
  // Keep the simulation alive through the delayed end of that command even if
  // all recoverable inventory has already been exhausted.
  const reverseConfigured=pcp&&c.reverseRpm>0&&c.reverseDuration>0;
  const reverseCommandEnd=reverseConfigured?meterGate+c.reverseDuration:null;
  const reverseResponseEnd=reverseConfigured?reverseCommandEnd+c.delay:null;
  const trajectory=endingTrajectory(path?{...c,mode:'line',lineLength:pathLength}:c,movementEnd,tailEnd),duration=Math.max(tailEnd,trajectory.end,reverseResponseEnd??0);
  if(duration>180)throw new Error('試驗超過 180 秒，請縮短路徑或提高速度');
  const fixed=Math.PI*c.diameter**2/4*c.nozzleLength/1000+(pcp?Math.PI*c.hoseId**2/4*c.hoseLength/1000+c.deadVolume:0);
  const initial=c.fill+fixed;
  // Finite longitudinal footprint prevents zero-speed deposition collapsing into a thin end wall.
  // Its support equals the nozzle bore: an explicit geometric assumption, not measured wetting.
  const gridStart=-c.diameter/2, gridLength=pathLength+c.diameter;
  let bins=c.mode==='point'?1:Math.max(2,Math.ceil(gridLength/c.cellSize));
  // Bound snapshots * bins to avoid exhausting browser memory for fine, long paths.
  const requestedBins=bins;
  if(path){const maxBins=Math.max(2,Math.floor(5000000/(Math.ceil(duration/.01)+2)));bins=Math.min(bins,maxBins,20000);}
  const cellLength=gridLength/bins;
  const deposits=new Float64Array(bins), frames=[];
  let previousOut=0, nextFrame=0, maxHeight=0;
  const evaluate=t=>{
    const raw=pcp?pcpResponse(t,Q,meterGate,c.delay,c.tauOn,c.displacement*c.reverseRpm*c.efficiency/60,c.reverseDuration):pulse(t,Q,gate,c.delay,c.tauOn,c.tauOff);
    const output=pcp?raw.volume:Math.min(available,raw.volume);
    const metered=pcp?Q*Math.min(t,meterGate):output;
    const recovered=raw.recovered||0,pending=pcp?Math.max(0,metered-output-recovered):0;
    const remain=Math.max(c.residual,c.fill-metered);
    const pos=moving?motion.at(t):{x:0,v:0};
    const exit=trajectory.at(t), scalarSpeed=pos.v+exit.vx;
    const p=path?pointOnPath(path,pos.x-exit.back):null;
    const x=p?p.x:c.offsetX+(c.mode==='line'?pos.x-c.lineLength/2:0)-exit.back;
    const y=p?p.y:c.offsetY;
    const reverseCommandActive=reverseConfigured&&t>=meterGate&&t<reverseCommandEnd;
    const reverseResponseActive=reverseConfigured&&t>=meterGate+c.delay&&t<reverseResponseEnd;
    return {t,q:(!pcp&&raw.volume>=available)?0:raw.q,target:t<meterGate?Q:0,command:t<meterGate?1:0,output,mass:output*c.density,metered,pending,recovered,reverseActive:!!raw.reverseActive,reverseRecoveryActive:!!raw.reverseActive,reverseCommandActive,reverseResponseActive,remaining:remain,fixed,initial,x,y,z:c.surfaceZ+c.standoff+exit.lift,speed:Math.hypot(scalarSpeed,exit.vz),vx:p?scalarSpeed*p.tx:scalarSpeed,vy:p?scalarSpeed*p.ty:0,vz:exit.vz,
      phase:t<meterGate?'點膠中':t<movementEnd?'收尾移動（已關膠）':t<trajectory.start?(c.endMotion==='legacy'?'舊版尾膠等待':'終點停留'):t<trajectory.end?exit.phase:t<duration?(reverseCommandActive||reverseResponseActive?'動作完成／反轉指令與尾膠記帳':'動作完成／尾膠記帳'):'完成', balance:initial-(remain+fixed+pending+recovered+output)};
  };
  const surfaceLimit=evaluate(trajectory.start).output;
  const steps=Math.ceil(duration/c.timestep);
  for(let i=0;i<=steps;i++){
    const t=Math.min(duration,i*c.timestep), s=evaluate(t);
    const middle=moving?motion.at(Math.max(0,t-c.timestep/2)).x:0;
    s.deposited=c.endMotion==='legacy'?s.output:Math.min(s.output,surfaceLimit);s.offSurface=Math.max(0,s.output-s.deposited);
    s.depositionBalance=s.output-s.deposited-s.offSurface;
    const dv=Math.max(0,s.deposited-(c.endMotion==='legacy'?previousOut:Math.min(previousOut,surfaceLimit)));
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
  const profile=moving?beadProfile(deposits,cellLength,c.lineRatio):null;
  maxHeight=profile?profile.maxHeight:dotDimensions(deposits[0],c.dotRatio).height;
  const last=frames.at(-1), warnings=[];
  const afterStopVolume=Math.max(0,last.output-evaluate(movementEnd).output);
  const windowMean=(a,b)=>{let volume=0;for(let i=0;i<bins;i++){const left=gridStart+i*cellLength;volume+=deposits[i]*Math.max(0,Math.min(b,left+cellLength)-Math.max(a,left))/cellLength;}return volume/(b-a);};
  const endWindow=Math.min(5,pathLength/5),middleMean=windowMean(pathLength*.4,pathLength*.6);
  const endRatio=moving&&middleMean>1e-12?windowMean(pathLength-endWindow,pathLength)/middleMean:null;
  const ending={movementEnd,commandOff:meterGate,effectiveShutoffDistance,leadTime:movementEnd-gate,afterStopVolume,afterStopPercent:last.output>0?afterStopVolume/last.output*100:0,endWindowMm:endWindow,endToMiddleRatio:endRatio,liftStart:trajectory.start,motionEnd:trajectory.end,accountingEnd:duration,effectiveBacktrack:trajectory.back,offSurfaceVolume:last.offSurface,depositedVolume:last.deposited,recoveredVolume:last.recovered,reverseCommandStart:reverseConfigured?meterGate:null,reverseCommandEnd,reverseStart:reverseConfigured?meterGate+c.delay:null,reverseResponseEnd,reverseRequestedVolume:pcp?c.displacement*c.reverseRpm*c.efficiency/60*c.reverseDuration:0};
  if(last.offSurface>1e-9)warnings.push('離面後仍有出膠，另列形狀未定量；未預測拉絲、滴落或落點，不加入工件膠形。');
  if(moving&&c.backtrackDistance>pathLength&&trajectory.back>0)warnings.push('回退距離已限制在原直線長度內。');
  if(c.mode==='point'&&['diagonal','liftThenBack'].includes(c.endMotion))warnings.push('單點沒有路徑方向，收尾使用垂直抬針。');
  if(pcp&&c.reverseDuration>0)warnings.push('PCP 反轉僅為暫存回收近似，回收量獨立記帳；不移除已沉積材料、不保證真實斷絲。');
  if(ending.reverseRequestedVolume>last.recovered+1e-9)warnings.push('反轉指令超過可回收暫存量，剩餘指令不再移除材料；負壓、吸氣與下一次開膠尚未計算。');
  if(moving&&c.shutoffDistance>=pathLength)warnings.push('提前關膠距離達到或超過路徑長度，本次不開膠；請縮短提前距離。');
  if(moving&&endRatio!==null&&endRatio<.5)warnings.push('末段平均截面低於中段一半，可能欠膠；此比較門檻為 AI 初估，不是產品驗收標準。');
  if(moving&&endRatio!==null&&endRatio>1.5)warnings.push('末段平均截面高於中段 1.5 倍，可能積膠；此比較門檻為 AI 初估，不是產品驗收標準。');
  if(maxHeight>c.standoff)warnings.push('簡化膠形高於針距，可能干涉；尚未計算壓扁或拉絲。');
  const maxWidth=profile?profile.maxWidth:dotDimensions(last.deposited,c.dotRatio).radius*2;
  if(path){
    let outside=false;for(const p of path.points)if(Math.abs(p.x)+maxWidth/2>c.width/2||Math.abs(p.y)+maxWidth/2>c.depth/2){outside=true;break;}
    if(outside)warnings.push('路徑或估算膠線可能超出工件範圍；尚未計算實際邊緣流失。');
    if(Math.abs(path.offsetX)+path.width/2>c.width/2||Math.abs(path.offsetY)+path.depth/2>c.depth/2)warnings.push('設定的熱源超出工件矩形參考邊界；請核對熱源位置與尺寸。');
    warnings.push('3D 彎角與重疊為幾何示意；沉積量分帳守恆，但顯示網格體積與融合形狀並非精確實物。');
    warnings.push('圖樣使用整條路徑的弧長加減速，轉角不減速；不是機台運動控制器或真實轉角積膠預測。');
    if(bins<requestedBins)warnings.push('為避免記憶體不足，沿路徑的沉積取樣已放粗；局部精度下降。');
  }else if((c.mode==='line'?(c.lineLength+c.diameter)/2:maxWidth/2)+Math.abs(c.offsetX)>c.width/2 || maxWidth/2+Math.abs(c.offsetY)>c.depth/2)warnings.push('路徑或膠形超出工件範圍；沉積位置仍按水平參考面外推。');
  const workspace=pcp?[254,277]:[300,300];
  if(c.width>workspace[0]||c.depth>workspace[1])warnings.push('工件超出所選設備的參考工作範圍；未自動縮小。');
  if(c.surfaceZ+c.standoff+c.liftDistance>(pcp?70:100))warnings.push('工件／針嘴高度超出參考 Z 行程；尚未確認真實機台的裝夾與工具偏置。');
  if(c.workpieceKind!=='plate')warnings.push('匯入工件只作實尺寸顯示；膠形使用上方水平參考面，未驗證孔洞、曲面或完整碰撞。');
  if(last.remaining<=c.residual+1e-9)warnings.push('可用膠量已耗盡；固定預填流道未吹空。');
  if(pcp)warnings.push('理想 PCP 假設滿腔；管路壓降、供料不足與材料適配尚未計算。');
  return {version:VERSION,label:LABEL,config:c,path,pathLength,Q,gate,duration,tailEnd,cellLength,gridStart,frames,warnings,maxHeight,ending,summary:{...last,deposits:Array.from(last.deposits),maxHeight,ending}};
}
export function frameAt(run,t) {
  let lo=0,hi=run.frames.length-1;
  while(lo<hi){const m=Math.ceil((lo+hi)/2);if(run.frames[m].t<=t)lo=m;else hi=m-1;}
  return run.frames[lo];
}
