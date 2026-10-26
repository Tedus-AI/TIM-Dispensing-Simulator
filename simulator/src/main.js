import './style.css';
import registry from '../../data/engineering_defaults_v0.3.json';
import {fromRegistry,simulate,frameAt,LABEL,VERSION,ENDING_DEFAULT} from './engine.js';
import {DispenseScene} from './scene.js';

const $=s=>document.querySelector(s), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=(n,d=3)=>Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
let config=fromRegistry(registry),run,frame,baseline=null,playing=false,time=0,clock=null,scene,chartType='q',pressureUnit='psi';
const overrides=new Map();
const field=(key,label,value,unit,min,max,step,tag='工程初估')=>`<label class="field"><span>${label}<small>${tag}</small></span><div class="input-wrap"><input id="${key}" data-key="${key}" type="number" min="${min}" max="${max}" step="any" value="${value}" aria-label="${label}"><b>${unit}</b></div></label>`;
$('#app').innerHTML=`
<header class="topbar"><div class="brand-mark">T<span>·</span></div><div><div class="eyebrow">PROCESS EXPLORATION / 01</div><h1>TIM 點膠研究室</h1></div><div class="header-end"><span class="status-dot"></span><span>本機研究原型</span><span class="badge">工程假設 · 未校準</span></div></header>
<div class="workspace"><aside class="setup panel"><div class="section-title"><span class="eyebrow">01 / CONFIGURATION</span><button id="defaults" class="text-button">恢復預設</button></div><h2>試驗配置</h2>
<label class="select-field">膠材<select id="material"><option value="putty">Laird · Tputty 910</option><option value="grease">Laird · Tgrease-2500</option></select></label>
<label class="select-field">出膠架構<select id="architecture"><option value="R75">R75 · 氣壓時間式 / 75 mL</option><option value="P300">P300 · 理想 PCP / 300 mL</option></select></label>
<div class="method-card"><span id="method-name"></span><p id="method-note"></p></div>
<div id="primary-fields"></div>
<div class="divider"></div><h3>路徑與運動</h3><div class="segmented"><button data-mode="line" class="active">直線</button><button data-mode="point">單點</button></div><div id="motion-fields"></div>
<section class="ending-controls"><h3>收尾控制</h3><div id="ending-fields"></div><div class="ending-presets"><button id="ending-off">未補償 · 0 mm</button><button id="ending-assumed">初估 · 10 mm</button></div><p class="hint" id="ending-note"></p></section>
<details><summary>工程響應與膠形</summary><div id="advanced-fields"></div><p class="hint">起停與形狀比例為 AI 初估。沉積體積重建為連續半橢圓膠線；維持總體積，局部截面為近似。無拉絲、塌陷、回吸或壓合。此版仍等尾膠結算才抬針，不代表實機節拍。</p></details>
<details><summary>膠筒與預填管路</summary><div id="inventory-fields"></div><p id="inventory-note" class="hint"></p></details>
<details id="workpiece-details"><summary>工件與治具</summary><div id="workpiece-fields"></div><p class="hint">預設 150 × 100 × 5 mm 平板為虛擬工件。</p><div class="import-options"><label>STL 單位<select id="import-unit"><option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option><option value="inch">inch</option></select></label><label>STL 向上<select id="import-up"><option>Z</option><option>Y</option></select></label></div><label class="file-button">載入工件 STL / GLB / glTF<input id="workpiece-file" type="file" accept=".stl,.glb,.gltf"></label><button id="clear-workpiece" class="text-button">恢復虛擬平板</button><p id="asset-name" class="hint">GLB／glTF 依規格以 m、Y 向上換算。複雜工件使用水平點膠面近似。</p></details>
<button id="show-sources" class="source-button">參數來源與假設 ↗</button></aside>
<main class="center"><section class="stage panel"><div class="stage-top"><div><span class="eyebrow">02 / DISPENSING STAGE</span><h2>點膠觀察</h2></div><div class="view-controls" role="group" aria-label="視角"><button data-view="whole">全機</button><button data-view="close" class="active">近看</button><button data-view="follow">局部跟隨</button><button id="reset-camera" title="重設相機">↺</button></div></div><div class="camera-toolbar"><label>等角方向<select id="iso-corner" aria-label="等角方向"><option value="0">① X+ / Y+</option><option value="1">② X− / Y+</option><option value="2">③ X− / Y−</option><option value="3">④ X+ / Y−</option></select></label><button id="free-orbit" aria-pressed="false">360° 自由旋轉</button></div><div id="viewport"></div><div class="stage-label"><span id="view-label">等角近看</span><span>mm · 真實尺寸比例</span></div><div class="stage-status"><span class="dot"></span><span id="phase">就緒</span></div><div class="stage-bottom"><span id="camera-hint">拖曳平移 · 滾輪縮放 · Home 重設</span><div class="scale"><i id="scale-line"></i><span>X 軸 10 mm</span></div></div><div class="geometry-note">近看隱藏上部機構 · 膠形為體積一致近似</div></section>
<section class="timeline panel"><div class="playback"><button id="play" class="primary">▶ 開始試驗</button><button id="restart" class="icon-button" title="回到起點">↶</button><button id="step" class="icon-button" title="前進 0.01 秒">▸│</button><span id="time-readout">0.000 / 0.000 s</span><select id="playback-speed" aria-label="播放速度"><option value="0.25">0.25× 播放</option><option value="0.5" selected>0.5× 播放</option><option value="1">1× 播放</option><option value="2">2× 播放</option></select></div><input type="range" id="scrubber" aria-label="時間軸" min="0" max="1000" step="1" value="0"><div class="chart-heading"><div class="chart-tabs"><button data-chart="q" class="active">流量</button><button data-chart="output">累積膠量</button><button data-chart="speed">移動速度</button></div><span id="chart-unit">mL/s</span></div><svg id="chart" viewBox="0 0 700 130" role="img" aria-label="出膠與指令時間曲線"></svg><div class="chart-legend"><span><i></i>假設計算</span><span id="command-legend"><i class="dashed"></i>指令穩態目標</span><span>關膠與到位分開 · 尾膠結算後抬針</span></div></section></main>
<aside class="results panel"><span class="eyebrow">03 / READOUT</span><h2>試驗讀值</h2><div class="metric primary-metric"><span>累積出口體積</span><div><strong id="volume">0.000</strong><b>mL</b></div><small>含關閉後的尾膠</small></div><div class="metric-grid"><div><span>出口重量</span><strong id="mass">0.000</strong><small>g</small></div><div><span>瞬時流量</span><strong id="flow">0.000</strong><small>mL/s</small></div></div><div class="divider"></div><dl class="readouts"><div><dt>TCP X / Y</dt><dd id="xy"></dd></div><div><dt>TCP Z</dt><dd id="z"></dd></div><div><dt>移動速度</dt><dd id="velocity"></dd></div><div><dt>膠筒剩餘</dt><dd id="remaining"></dd></div><div><dt>暫存輸送量</dt><dd id="pending"></dd></div><div><dt>預填固定持膠</dt><dd id="fixed"></dd></div><div><dt>體積對帳誤差</dt><dd id="balance"></dd></div></dl>
<div class="summary-card"><span class="eyebrow">完整試驗 · 預計結果</span><div><strong id="total"></strong><span>mL</span></div><p id="summary-text"></p></div><div id="ending-readout" class="ending-readout" aria-live="polite"></div><div id="warnings" aria-live="polite"></div><button id="save-baseline" class="secondary">保存為比較基準</button><div id="comparison"></div><div class="export-buttons"><button id="export-json">配置 JSON ↓</button><button id="export-csv">結果 CSV ↓</button><button id="export-image">畫面 PNG ↓</button></div><p class="fineprint">23°C 參考條件。未模擬溫度、供料壓降與真實流變；結果供假設比較，尚不能作為真機配方。</p></aside></div>
<footer><span>TIM LAB <b>v${VERSION}</b></span><span>來源預設 v0.3 · 兩款材料 · 四組工程情境</span><button id="help">使用說明</button></footer>
<dialog id="sources-dialog"><div class="dialog-heading"><h2>參數來源與假設</h2><button data-close>關閉 ✕</button></div><p>以下保留研究原值。試驗輸出另含目前配置與覆寫記錄；所有項目目前均未經實機驗證。</p><div class="table-scroll"><table><thead><tr><th>參數</th><th>研究原值</th><th>類型 / 用途</th><th>依據</th></tr></thead><tbody id="source-rows"></tbody></table></div></dialog>
<dialog id="help-dialog"><div class="dialog-heading"><h2>從一條膠線開始</h2><button data-close>關閉 ✕</button></div><ol><li>選擇膠材與出膠架構，再調壓力或轉速。</li><li>選擇單點或直線，設定移動速度／開膠時間。</li><li>按「開始試驗」，切換全機、近看或局部跟隨。選擇四個等角方向，或開啟 360° 自由旋轉；拖曳旋轉、右鍵平移、滾輪縮放。暫停後可拖時間軸回看。</li><li>保存比較基準，再改一個參數。右側會列出差異與完整試驗結果。</li><li>匯出配置、結果表或含假設標記的圖片。</li></ol><p>所有機構同用 mm。首次載入實際工件請核對長寬厚與上方向；目前只在水平參考面沉積，不判斷複雜曲面或孔洞。</p><p>調整配置會重新計算並回到起點。播放速度只控制觀看速度。關閉分頁顯示時自動暫停。</p><p>直線預設提前 10 mm 關膠（AI 初估），可切未補償 0 mm 比較；提前距離達到路徑全長時不開膠。R75 的膠筒扣出口量；PCP 的膠筒扣計量量，尚未流出的量列入暫存。零壓力／零轉速不會自行產生膠。</p></dialog><div id="toast" role="status"></div>`;

function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),4500);}
function fields(){
  const c=config,pcp=c.architecture==='P300';
  $('#method-name').textContent=pcp?'理想容積計量':c.material==='putty'?'TDS 單點正規化':'常黏度虛擬圓管';
  $('#method-note').textContent=pcp?'每轉 0.30 mL；滿腔、效率與起停為假設。兩種材料以密度區分重量。':c.material==='putty'?'參考 75 g/min @ 90 psi。針嘴映射與動態均未校準。':'單點黏度 2500 Pa·s 暫作常數，不代表完整流變。';
  $('#primary-fields').innerHTML=pcp?field('rpm','計量軸轉速',c.rpm,'rpm',0,300,5)+field('efficiency','有效排量效率',c.efficiency,'',0,1,.05):field('pressure','驅動表壓',pressureUnit==='bar'?c.pressure*.0689475729:c.pressure,pressureUnit,0,pressureUnit==='bar'?6.89475729:100,pressureUnit==='bar'?.1:1)+`<button id="pressure-unit" class="text-button">切換 ${pressureUnit==='psi'?'bar':'psi'}</button>`;
  $('#primary-fields').innerHTML+=field('diameter','虛擬針嘴內徑',c.diameter,'mm',.2,8,.025,pcp?'幾何／持膠':'參與流量近似')+field('nozzleLength','等效直管長',c.nozzleLength,'mm',1,100,1,pcp?'幾何／持膠':'參與流量近似');
  $('#motion-fields').innerHTML=(c.mode==='line'?field('lineLength','路徑長度',c.lineLength,'mm',1,250,1)+field('speed','設定速度',c.speed,'mm/s',1,800,5)+field('acceleration','加速度',c.acceleration,'mm/s²',1,10000,50):field('gateDuration','開膠時間',c.gateDuration,'s',.001,10,.01))+field('standoff','針嘴離面高度',c.standoff,'mm',.1,20,.1,'僅間距／干涉提示');
  $('#ending-fields').innerHTML=c.mode==='line'?field('shutoffDistance','終點前關膠距離',c.shutoffDistance,'mm',0,250,.5,'AI 初估 · 可設 0 比較'):'';
  $('#ending-off').disabled=$('#ending-assumed').disabled=c.mode!=='line';
  $('#ending-note').textContent=c.mode==='line'?'先關膠，針嘴繼續走到終點。10 mm 是本版比較初值，非原廠配方；提前過多會降低總膠量或造成欠膠。':'單點依開膠時間控制；提前關膠距離不作用於單點。';
  $('#advanced-fields').innerHTML=field('delay','合併延遲',c.delay,'s',0,2,.01)+field('tauOn',pcp?'共用起停時間常數':'上升時間常數',c.tauOn,'s',.001,2,.01)+(pcp?'':field('tauOff','下降時間常數',c.tauOff,'s',.001,2,.01))+(c.mode==='line'?field('lineRatio','膠線高寬比',c.lineRatio,'',.05,2,.05,'幾何假設'):field('dotRatio','單點高徑比',c.dotRatio,'',.05,.5,.05,'幾何假設'))+(!pcp&&c.material==='putty'?field('referenceRate','參考流率覆寫',c.referenceRate,'mL/s',0,10,.01,'單點映射假設'):'')+(!pcp&&c.material==='grease'?field('viscosity','等效黏度',c.viscosity,'Pa·s',1,100000,100,'常黏度假設'):'');
  $('#inventory-fields').innerHTML=field('fill','膠筒初始裝填',c.fill,'mL',c.residual,pcp?300:75,1)+field('residual','不可用殘量',c.residual,'mL',0,c.fill,.1)+(pcp?field('hoseId','供料管內徑',c.hoseId,'mm',1,25,.1,'只影響固定持膠')+field('hoseLength','供料管長',c.hoseLength,'mm',0,5000,10,'只影響固定持膠'):'');
  $('#inventory-note').textContent=pcp?'預設管路已填滿。入口 90 psi、供氣 20 psi 為純參考，不影響本版計算。管路未畫成精確路由。':'75 mL 是公稱容量；910 TDS 裝填 56 mL。氣室與氣管未分開求解，統一使用合併響應。';
  $('#workpiece-fields').innerHTML=field('width','工件長 X',+c.width.toFixed(4),'mm',1,1000,1,'幾何')+field('depth','工件寬 Y',+c.depth.toFixed(4),'mm',1,1000,1,'幾何')+field('thickness','工件厚度',+c.thickness.toFixed(4),'mm',.1,200,.1,'幾何')+field('fixtureHeight','治具支承高度',c.fixtureHeight,'mm',0,100,1,'AI 初估')+field('offsetX','路徑偏移 X',c.offsetX,'mm',-500,500,1,'工件座標')+field('offsetY','路徑偏移 Y',c.offsetY,'mm',-500,500,1,'工件座標');
  if(c.workpieceKind!=='plate')for(const k of ['width','depth','thickness'])$('#'+k).disabled=true;
  document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===c.mode));
  $('#pressure-unit')?.addEventListener('click',()=>{pressureUnit=pressureUnit==='psi'?'bar':'psi';fields();});
  document.querySelectorAll('[data-key]').forEach(input=>input.addEventListener('change',()=>{
    const next={...config},key=input.dataset.key;let value=Number(input.value);
    if(!input.value.trim()||!input.checkValidity()){toast('請輸入欄位範圍內的數值');fields();return;}
    if(key==='pressure'&&pressureUnit==='bar')value/=.0689475729;
    next[key]=value;if(key==='tauOn'&&next.architecture==='P300')next.tauOff=value;next.surfaceZ=next.fixtureHeight+next.thickness;
    try{const result=simulate(next);config=next;overrides.set(config.profile,structuredClone(config));applyRun(result);fields();}catch(e){toast(e.message);fields();}
  }));
}
function applyRun(result){playing=false;time=0;run=result;frame=run.frames[0];scene.rebuild(config,run);$('#scrubber').max=String(Math.ceil(run.duration*1000));$('#scrubber').value='0';
  $('#total').textContent=number(run.summary.output);$('#summary-text').textContent=`開膠 ${number(run.gate,2)} s · ${number(run.summary.mass)} g · 最高膠形 ${number(run.maxHeight,2)} mm`;
  $('#ending-readout').innerHTML=config.mode==='line'?`<b>${config.shutoffDistance===0?'未補償收尾':'提前關膠收尾'}</b><p>關膠 ${number(run.ending.commandOff,3)} s → 到位 ${number(run.ending.movementEnd,3)} s</p><p>停止後流出 <strong>${number(run.ending.afterStopVolume*1000,2)} µL</strong>（${number(run.ending.afterStopPercent,1)}%）</p><p>末 ${number(run.ending.endWindowMm,1)} mm 平均截面 / 中段：${run.ending.endToMiddleRatio===null?'無有效膠量可比較':number(run.ending.endToMiddleRatio,2)+' 倍'}</p><small>完整試驗預計值；不是覆蓋率或產品合格判定。</small>`:'<p>單點以開膠時間控制，無直線收尾比較。</p>';
  $('#warnings').innerHTML=run.warnings.map(w=>`<p class="warning">${esc(w)}</p>`).join('');
  renderState();drawChart();compare();
}
function renderState(){
  frame=frameAt(run,time);scene.update(frame);$('#volume').textContent=number(frame.output);$('#mass').textContent=number(frame.mass);$('#flow').textContent=number(frame.q);
  $('#xy').textContent=`${number(frame.x,1)} / ${number(frame.y,1)} mm`;$('#z').textContent=`${number(frame.z,2)} mm`;$('#velocity').textContent=`${number(frame.speed,1)} mm/s`;$('#remaining').textContent=`${number(frame.remaining)} mL`;$('#pending').textContent=`${number(frame.pending,5)} mL`;$('#fixed').textContent=`${number(frame.fixed,3)} mL`;$('#balance').textContent=`${frame.balance.toExponential(1)} mL`;
  $('#phase').textContent=time===0?'就緒':time>=run.duration?'試驗完成':playing?frame.phase:`已暫停 · ${frame.phase}`;
  $('#play').textContent=playing?'Ⅱ 暫停':time>=run.duration?'↻ 再次播放':time>0?'▶ 繼續':'▶ 開始試驗';
  $('#time-readout').textContent=`${number(frame.t,3)} / ${number(run.duration,3)} s`;$('#scrubber').value=String(time*1000);
  const cursor=$('#chart-cursor');if(cursor){const x=42+time/run.duration*646;cursor.setAttribute('x1',x);cursor.setAttribute('x2',x);}
}
function drawChart(){
  const key=chartType,values=run.frames.map(f=>f[key]),max=Math.max(.001,...values,...(key==='q'?[run.Q]:[]))*1.1;
  const x=t=>42+t/run.duration*646,y=v=>105-v/max*88;
  const path=run.frames.filter((f,i)=>i%Math.max(1,Math.floor(run.frames.length/700))===0||i===run.frames.length-1).map((f,i)=>`${i?'L':'M'}${x(f.t).toFixed(2)},${y(f[key]).toFixed(2)}`).join(' ');
  $('#chart').innerHTML=[0,.5,1].map(k=>`<line x1="42" x2="688" y1="${y(max*k)}" y2="${y(max*k)}" stroke="#e2e7e0"/><text x="34" y="${y(max*k)+3}" text-anchor="end">${(max*k).toFixed(key==='speed'?0:2)}</text>`).join('')+`<path d="${path} L688,105 L42,105 Z" fill="#dce8de" opacity=".5"/><path d="${path}" fill="none" stroke="#3c6958" stroke-width="2"/>`+(key==='q'?`<path d="M42,${y(run.Q)} H${x(run.gate)} V105 H688" fill="none" stroke="#9ba99c" stroke-width="1.5" stroke-dasharray="5 4"/>`:'')+`<line id="chart-cursor" x1="${x(time)}" x2="${x(time)}" y1="10" y2="108" stroke="#bf8a44"/><text x="42" y="125">0</text><text x="688" y="125" text-anchor="end">${number(run.duration,2)} s</text>`;
  if(config.mode==='line')$('#chart').innerHTML+=`<line x1="${x(run.ending.commandOff)}" x2="${x(run.ending.commandOff)}" y1="10" y2="105" stroke="#b17d38" stroke-dasharray="4 3"><title>關膠指令 ${number(run.ending.commandOff,3)} s</title></line><line x1="${x(run.ending.movementEnd)}" x2="${x(run.ending.movementEnd)}" y1="10" y2="105" stroke="#577a94" stroke-dasharray="1 3"><title>移動到位 ${number(run.ending.movementEnd,3)} s</title></line>`;
  $('#chart-unit').textContent={q:'mL/s',output:'mL',speed:'mm/s'}[key];$('#command-legend').hidden=key!=='q';
}
function compare(){
  if(!baseline){$('#comparison').innerHTML='<p class="hint">先保存基準，再調整參數觀察差異。</p>';return;}
  const change=run.summary.output-baseline.summary.output;
  const changed=Object.keys(config).filter(k=>typeof config[k]!=='object'&&config[k]!==baseline.config[k]);
  $('#comparison').innerHTML=`<div class="compare"><span>基準 / 目前 · mL</span><div>${number(baseline.summary.output)} <b>→</b> ${number(run.summary.output)}</div><strong>${change>=0?'+':''}${number(change)} mL</strong><p>${changed.length?`${changed.length} 個配置欄位改變`:'與基準配置相同'}</p><details><summary>差異明細</summary>${changed.map(k=>`<p>${esc(k)}：${esc(baseline.config[k])} → ${esc(config[k])}</p>`).join('')||'<p>無</p>'}</details></div>`;
}
function download(content,name,type){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportRecord(){return {application:'TIM Dispensing Lab',version:VERSION,date:new Date().toISOString(),label:LABEL,validatedAgainstHardware:false,parameterRegistryVersion:registry.schema_version,modelAssumptions:{flow:'delayed_first_order',lineGeometry:'shared_half_ellipse_rings_total_volume_normalized',spatialDeposition:'nozzle_width_longitudinal_triangle',pointGeometry:'spherical_cap',tailPolicy:'distance_shutoff_then_finish_motion_settle_before_lift',endRatioWarning:{low:.5,high:1.5,evidence:'engineering_assumption_not_acceptance_limits'},surface:'horizontal_reference_plane',primed:'fixed_inventory_not_drained'},config,referenceParameters:registry.parameters,additionalDefaults:[ENDING_DEFAULT],sources:registry.sources,warnings:run.warnings,summary:run.summary,baseline:baseline?{config:baseline.config,summary:baseline.summary}:null,view:{mode:scene.mode,time:frame.t,isoCorner:scene.isoCorner,freeOrbit:scene.freeOrbit,cameraPosition:scene.camera.position.toArray(),cameraTarget:scene.controls.target.toArray(),zoom:scene.camera.zoom},note:'工件檔案不內嵌，僅保存名稱與雜湊；重新載入需原檔。'};}

try{scene=new DispenseScene($('#viewport'),(px,angle)=>{const mm=px>600?1:px>240?2:px>120?5:10;$('#scale-line').style.width=`${px*mm/10}px`;$('#scale-line').nextElementSibling.textContent=`X 軸 ${mm} mm`;$('#scale-line').style.transform=`rotate(${angle>90?angle-180:angle< -90?angle+180:angle}deg)`;});}catch(e){$('#viewport').innerHTML='<div class="webgl-error">無法啟動 3D 顯示，請使用啟用硬體加速的桌面瀏覽器。</div>';throw e;}
fields();applyRun(simulate(config));
for(const [id,value]of [['ending-off',0],['ending-assumed',ENDING_DEFAULT.value]])$('#'+id).onclick=()=>{config={...config,shutoffDistance:value};overrides.set(config.profile,structuredClone(config));fields();applyRun(simulate(config));};
for(const id of ['material','architecture'])$('#'+id).addEventListener('change',()=>{overrides.set(config.profile,structuredClone(config));const next=fromRegistry(registry,$('#material').value,$('#architecture').value);config=overrides.get(next.profile)||next;scene.clearImport();if(config.workpieceKind!=='plate'){Object.assign(config,{width:150,depth:100,thickness:5,workpieceKind:'plate',workpieceFile:null});config.surfaceZ=config.fixtureHeight+5;}fields();applyRun(simulate(config));});
$('#defaults').onclick=()=>{scene.clearImport();config=fromRegistry(registry,$('#material').value,$('#architecture').value);overrides.delete(config.profile);fields();applyRun(simulate(config));$('#asset-name').textContent='已恢復虛擬平板；尺寸為工程初估。';toast('已恢復此情境的研究預設');};
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{config.mode=b.dataset.mode;fields();applyRun(simulate(config));});
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x===b));scene.fit(b.dataset.view);scene.update(frame);$('.geometry-note').textContent=b.dataset.view==='whole'?'虛擬機構外形 · 膠形為體積一致近似':'近看隱藏上部機構 · 膠形為體積一致近似';$('#view-label').textContent={whole:'全機等角',close:'點膠近看等角',follow:'局部等角跟隨'}[b.dataset.view];});
function cameraLabels(){
  $('#iso-corner').value=String(scene.isoCorner);
  $('#free-orbit').classList.toggle('active',scene.freeOrbit);$('#free-orbit').setAttribute('aria-pressed',String(scene.freeOrbit));
  $('#camera-hint').textContent=scene.freeOrbit?'拖曳旋轉 · 右鍵平移 · 滾輪縮放':'拖曳平移 · 滾輪縮放 · Home 重設';
  $('#view-label').textContent=(scene.freeOrbit?'自由 3D':`等角 ${scene.isoCorner+1}`)+' · '+({whole:'全機',close:'點膠近看',follow:'局部跟隨'}[scene.mode]);
}
$('#iso-corner').onchange=e=>{scene.setCorner(Number(e.target.value));scene.update(frame);cameraLabels();};
$('#free-orbit').onclick=()=>{scene.setFreeOrbit(!scene.freeOrbit);scene.update(frame);cameraLabels();};
$('#reset-camera').onclick=()=>{scene.setFreeOrbit(false);scene.fit(scene.mode);scene.update(frame);cameraLabels();};
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',cameraLabels));
cameraLabels();
$('#play').onclick=()=>{if(time>=run.duration)time=0;playing=!playing;clock=null;renderState();};
$('#restart').onclick=()=>{playing=false;time=0;renderState();};$('#step').onclick=()=>{playing=false;time=Math.min(run.duration,time+.010001);renderState();};
$('#scrubber').oninput=e=>{playing=false;time=Math.min(run.duration,+e.target.value/1000);renderState();};
document.querySelectorAll('[data-chart]').forEach(b=>b.onclick=()=>{chartType=b.dataset.chart;document.querySelectorAll('[data-chart]').forEach(x=>x.classList.toggle('active',x===b));drawChart();});
$('#save-baseline').onclick=()=>{baseline={config:structuredClone(config),summary:structuredClone(run.summary)};compare();toast('已保存完整試驗結果為基準');};
$('#workpiece-file').onchange=async e=>{const file=e.target.files[0];if(!file)return;playing=false;try{const data=await scene.importFile(file,$('#import-unit').value,$('#import-up').value);const next={...config,...data,surfaceZ:config.fixtureHeight+data.thickness};const result=simulate(next);config=next;fields();applyRun(result);$('#asset-name').textContent=`${file.name} · ${number(config.width,2)} × ${number(config.depth,2)} × ${number(config.thickness,2)} mm；請核對尺寸／方向。`;toast('工件已載入。請核對尺寸；目前使用上方水平參考面。');}catch(error){toast(error.message);}e.target.value='';};
$('#clear-workpiece').onclick=()=>{scene.clearImport();Object.assign(config,{width:150,depth:100,thickness:5,surfaceZ:config.fixtureHeight+5,workpieceKind:'plate',workpieceFile:null});fields();applyRun(simulate(config));$('#asset-name').textContent='已恢復 150 × 100 × 5 mm 虛擬平板。';};
const evidence={published_typical:'原廠典型',published_rated:'原廠額定',derived:'公式換算',engineering_assumption:'AI 工程初估'};
$('#source-rows').innerHTML=[ENDING_DEFAULT,...registry.parameters].map(p=>`<tr><td>${esc(p.id)}</td><td>${esc(p.value)} ${esc(p.unit)}</td><td>${esc(evidence[p.evidence]||p.evidence)}<br><small>${esc(p.role||'新增控制初值')}</small></td><td>${esc(p.basis)}<br><small>${esc((p.source_refs||[]).join(' / '))}</small></td></tr>`).join('');
$('#show-sources').onclick=()=>$('#sources-dialog').showModal();$('#help').onclick=()=>$('#help-dialog').showModal();document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('#export-json').onclick=()=>download(JSON.stringify(exportRecord(),null,2),'TIM_工程假設_試驗配置.json','application/json');
$('#export-csv').onclick=()=>{
  const keys=['t','command','target','q','output','mass','x','y','z','speed','remaining','pending','fixed','balance'];
  const names=['time_s','command_0_1','target_mL_s','outflow_mL_s','outlet_mL','mass_g','TCP_X_mm','TCP_Y_mm','TCP_Z_mm','speed_mm_s','cartridge_mL','pending_mL','fixed_primed_mL','balance_error_mL'];
  const quote=v=>'"'+String(v).replaceAll('"','""')+'"';
  const record=exportRecord();const meta=JSON.stringify({config,sourceVersion:registry.schema_version,modelAssumptions:record.modelAssumptions,additionalDefaults:record.additionalDefaults,ending:run.ending,warnings:run.warnings});
  const lines=[['label','app_version','profile',...names,'run_metadata_json_first_row'].join(','),...run.frames.map((f,i)=>[LABEL,VERSION,config.profile,...keys.map(k=>f[k]),i===0?meta:''].map(quote).join(','))];
  download('\ufeff'+lines.join('\r\n'),'TIM_未校準_試驗結果.csv','text/csv;charset=utf-8');
};
$('#export-image').onclick=async()=>{const im=new Image();im.src=scene.screenshot();await im.decode();const cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height+96;const ctx=cv.getContext('2d');ctx.fillStyle='#f1f3ef';ctx.fillRect(0,0,cv.width,cv.height);ctx.drawImage(im,0,0);ctx.fillStyle='#273d35';ctx.font='18px sans-serif';ctx.fillText(`TIM LAB · ${LABEL} · v${VERSION}`,24,im.height+28);ctx.font='14px sans-serif';ctx.fillText(`${config.profile} · t=${frame.t.toFixed(3)}s · 出口=${frame.output.toFixed(6)}mL · mm 比例`,24,im.height+54);ctx.fillText('虛擬機構／簡化膠形。完整假設與參數請搭配配置 JSON。',24,im.height+78);cv.toBlob(b=>download(b,'TIM_未校準_點膠畫面.png','image/png'));};
document.addEventListener('visibilitychange',()=>{if(document.hidden){playing=false;clock=null;renderState();}});
function loop(now){if(playing){if(clock!==null)time=Math.min(run.duration,time+(now-clock)/1000*Number($('#playback-speed').value));clock=now;if(time>=run.duration)playing=false;renderState();}else clock=null;requestAnimationFrame(loop);}requestAnimationFrame(loop);
// Development-only inspection surface for numerical/rendering acceptance checks.
if(import.meta.env.DEV)window.timDiagnostics=()=>({config:structuredClone(config),summary:structuredClone(run.summary),frame:{...frame,deposits:Array.from(frame.deposits)},geometry:scene.geometryAudit(),playing,duration:run.duration,warnings:run.warnings});

window.addEventListener('pageshow',()=>{requestAnimationFrame(()=>{ $('#material').value=config.material;$('#architecture').value=config.architecture;fields();renderState();cameraLabels(); });});
