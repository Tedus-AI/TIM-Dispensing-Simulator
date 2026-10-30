from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'simulator/src/main.js'
s=p.read_text(encoding='utf-8')
def replace(a,b):
    global s
    assert a in s,a[:90]
    s=s.replace(a,b)
replace('VERSION,ENDING_DEFAULT}', 'VERSION,ENDING_DEFAULT,MOTION_DEFAULTS}')
replace('<details><summary>工程響應與膠形</summary>', '<details open><summary>退離動作與設備收尾</summary><div id="exit-fields"></div><p id="exit-note" class="hint"></p><div id="reverse-fields"></div><p id="reverse-note" class="hint"></p></details><details><summary>工程響應與膠形</summary>')
replace('無拉絲、塌陷、回吸或壓合。此版仍等尾膠結算才抬針，不代表實機節拍。','離面後的出膠另列形狀未定量，未加入工件膠形。PCP 可比較暫存回收近似；無真實拉絲、塌陷、負壓或壓合求解。')
replace('<span>關膠與到位分開 · 尾膠結算後抬針</span>', '<span>關膠／到位／離面分開 · 動作後持續記帳</span>')
replace('<div class="chart-heading">', '<div class="event-controls"><button id="jump-lift">查看開始抬針</button><button id="jump-exit">查看退離完成</button><label><input id="show-exit-path" type="checkbox" checked> 顯示針尖退離路徑</label></div><div class="chart-heading">')
replace('<div><dt>體積對帳誤差</dt>', '<div><dt>工件沉積量</dt><dd id="deposited"></dd></div><div><dt>離面後出膠（形狀未定）</dt><dd id="off-surface"></dd></div><div><dt>回收暫存量</dt><dd id="recovered"></dd></div><div><dt>體積對帳誤差</dt>')
replace('零壓力／零轉速不會自行產生膠。','零壓力／零轉速不會自行產生膠。終點停留由路徑到位起算，之後執行退離。離面後的出膠不再假定全部留在工件上；獨立列為形狀未定量。橙色虛線代表針尖路徑，不是膠絲。PCP 反轉僅回收暫存量；不能預測真實斷絲。')
needle="  $('#advanced-fields').innerHTML="
i=s.index(needle)
s=s[:i]+'''  $('#exit-fields').innerHTML=`<label class="select-field">退離方式<select id="end-motion" aria-label="退離方式"><option value="vertical">垂直抬針</option><option value="diagonal">邊升邊回退</option><option value="liftThenBack">先抬高再回退</option><option value="legacy">v0.2 尾膠結算後抬針（對照）</option></select></label>`+(c.endMotion==='legacy'?'':field('endDwell','終點停留時間',c.endDwell,'s',0,5,.01,'AI 初估 · 到位後起算'))+field('liftSpeed','抬針速度上限',c.liftSpeed,'mm/s',.1,200,1)+field('liftDistance','相對抬針高度',c.liftDistance,'mm',.1,50,.5)+(['diagonal','liftThenBack'].includes(c.endMotion)&&c.mode==='line'?field('backtrackDistance','沿路徑回退距離',c.backtrackDistance,'mm',0,50,.5,'AI 初估')+field('backtrackSpeed','回退速度上限',c.backtrackSpeed,'mm/s',.1,200,1,'AI 初估'):'');
  $('#end-motion').value=c.endMotion;
  $('#end-motion').onchange=e=>{const next={...config,endMotion:e.target.value};try{const result=simulate(next);config=next;overrides.set(config.profile,structuredClone(config));fields();applyRun(result);}catch(err){toast(err.message);fields();}};
  $('#exit-note').textContent=c.endMotion==='legacy'?'歷史對照：等待數值尾膠結算後等速抬針。不是生產配方。':'終點停留預設 0.10 s（AI 初估），以到位起算。退離採加減速，沿用路徑加速度；單點只垂直抬針。橙色虛線是針尖路徑，不是膠絲。';
  $('#reverse-fields').innerHTML=pcp?field('reverseDuration','PCP 反轉指令時間',c.reverseDuration,'s',0,2,.01,'AI 初估 · 0 為停用')+field('reverseRpm','PCP 反轉轉速',c.reverseRpm,'rpm',0,300,5,'AI 初估')+`<button id="reverse-example" class="source-button">比較反轉 · 30 rpm / 0.05 s（初估）</button>`:'';
  $('#reverse-example')?.addEventListener('click',()=>{config={...config,reverseRpm:30,reverseDuration:.05};overrides.set(config.profile,structuredClone(config));fields();applyRun(simulate(config));});
  $('#reverse-note').textContent=pcp?'反轉預設停用。只回收未出嘴的暫存量，獨立記帳；不把工件上的膠吸回。未求解負壓、吸氣或斷絲。':'氣壓式：關閉後以「下降時間常數」近似卸壓衰減；不提供螺桿反轉或虛構負壓回吸。';
''' +s[i:]
replace("'下降時間常數'", "'卸壓下降時間常數'")
start=s.index("  $('#ending-readout').innerHTML=")
end=s.index("  $('#warnings')",start)
s=s[:start]+'''  $('#ending-readout').innerHTML=`<b>收尾時序與分帳</b><p>關膠 ${number(run.ending.commandOff)} s → 到位 ${number(run.ending.movementEnd)} s</p><p>開始抬針 ${number(run.ending.liftStart)} s<br>退離完成 ${number(run.ending.motionEnd)} s<br>尾膠記帳至 ${number(run.duration)} s</p><p>停移後流出 ${number(run.ending.afterStopVolume*1000,2)} µL；其中離面後 ${number(run.summary.offSurface*1000,2)} µL</p><p>工件沉積 ${number(run.summary.deposited,6)} mL<br>離面後出膠 ${number(run.summary.offSurface,6)} mL（形狀未定）</p>`+(config.architecture==='P300'?`<p>回收暫存 ${number(run.summary.recovered*1000,2)} µL${run.ending.reverseStart!==null?' · 響應起點 '+number(run.ending.reverseStart)+' s':''}</p>`:'')+(config.mode==='line'?`<p>末 ${number(run.ending.endWindowMm,1)} mm / 中段截面：${run.ending.endToMiddleRatio===null?'無有效膠量可比較':number(run.ending.endToMiddleRatio,2)+' 倍'}</p>`:'')+`<small>完整試驗預計值；動作時間未含下一點移動，不是生產節拍。離面後拉絲與落點尚未求解。</small>`;
''' +s[end:]
replace("  $('#phase').textContent=", "  $('#deposited').textContent=`${number(frame.deposited,6)} mL`;$('#off-surface').textContent=`${number(frame.offSurface*1000,2)} µL`;$('#recovered').textContent=`${number(frame.recovered*1000,2)} µL`;\n  $('#phase').textContent=")
replace("if(config.mode==='line')$('#chart')", "if(true)$('#chart')")
replace("x(run.gate)","x(run.ending.commandOff)")
replace("  $('#chart-unit').textContent=", "  $('#chart').innerHTML+=`<line x1=\"${x(run.ending.liftStart)}\" x2=\"${x(run.ending.liftStart)}\" y1=\"10\" y2=\"105\" stroke=\"#99624f\" stroke-dasharray=\"5 2\"><title>開始抬針 ${number(run.ending.liftStart)} s</title></line>`;\n  $('#chart-unit').textContent=")
replace("tailPolicy:'distance_shutoff_then_finish_motion_settle_before_lift'", "tailPolicy:'independent_exit_motion_and_outlet_accounting',surfaceAllocation:'outlet_before_first_lift_only_except_legacy',offSurface:'unresolved_shape_no_automatic_landing',reverse:'PCP_lumped_pending_recovery_not_nozzle_pressure',exitAcceleration:'shared_with_path_scalar_profile'")
replace('additionalDefaults:[ENDING_DEFAULT]', 'additionalDefaults:[ENDING_DEFAULT,...MOTION_DEFAULTS]')
replace('[ENDING_DEFAULT,...registry.parameters]', '[ENDING_DEFAULT,...MOTION_DEFAULTS,...registry.parameters]')
replace("freeOrbit:scene.freeOrbit,cameraPosition", "freeOrbit:scene.freeOrbit,showExitPath:scene.showExitPath,cameraPosition")
replace("$('#restart').onclick=", "$('#show-exit-path').onchange=e=>{scene.showExitPath=e.target.checked;scene.exitPath.visible=scene.showExitPath;scene.render();};\nfor(const [id,key] of [['jump-lift','liftStart'],['jump-exit','motionEnd']])$('#'+id).onclick=()=>{playing=false;time=run.ending[key];renderState();};\n$('#restart').onclick=")
replace("'pending','fixed','balance'", "'pending','fixed','balance','deposited','offSurface','recovered','vx','vz','phase','depositionBalance'")
replace("'fixed_primed_mL','balance_error_mL'", "'fixed_primed_mL','balance_error_mL','deposited_mL','off_surface_mL','recovered_pending_mL','velocity_X_mm_s','velocity_Z_mm_s','phase','deposition_balance_mL'")
replace('虛擬機構／簡化膠形。完整假設與參數請搭配配置 JSON。','工件沉積與離面後出膠分帳；橙色虛線是針尖路徑，非膠絲。')
replace('最高膠形 ${number(run.maxHeight,2)}', '最高沉積膠形 ${number(run.maxHeight,2)}')
p.write_text(s,encoding='utf-8')
p=root/'simulator/src/scene.js';s=p.read_text(encoding='utf-8')
replace("this.isoCorner=0;this.freeOrbit=false;", "this.isoCorner=0;this.freeOrbit=false;this.showExitPath=true;")
replace('this.disposeGroup(this.depositGroup);this.piston', 'this.disposeGroup(this.depositGroup);if(this.exitPath){this.exitPath.geometry.dispose();this.exitPath.material.dispose();this.exitPath.removeFromParent();}this.piston')
replace('this.run=run;this.update(run.frames[0]);', '''const pathPoints=run.frames.filter(f=>f.t>=run.ending.liftStart-.01&&f.t<=run.ending.motionEnd+.01).map(f=>new THREE.Vector3(f.x,f.y,f.z));
    this.exitPath=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathPoints),new THREE.LineDashedMaterial({color:0xb47836,dashSize:.7,gapSize:.4,transparent:true,opacity:.7}));this.exitPath.computeLineDistances();this.exitPath.visible=this.showExitPath;this.scene.add(this.exitPath);
    this.run=run;this.update(run.frames[0]);''')
replace('v=s.output;m.visible', 'v=s.deposited;m.visible')
p.write_text(s,encoding='utf-8')
for name in ['package.json','package-lock.json','public/tim-health.json']:
    p=root/'simulator'/name
    p.write_text(p.read_text(encoding='utf-8').replace('"version": "0.2.0"','"version": "0.3.0"').replace('"version":"0.2.0"','"version":"0.3.0"'),encoding='utf-8')
p=root/'simulator/src/style.css'
p.write_text(p.read_text(encoding='utf-8')+'\n.event-controls{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin:0 0 13px;font-size:10px;color:#64755e}.event-controls button{font-size:10px;padding:5px 8px}.event-controls label{display:flex;gap:4px;align-items:center}.event-controls input{accent-color:#b47836}\n',encoding='utf-8')
