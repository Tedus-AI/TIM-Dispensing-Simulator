import './compression-ui.css';

const safe = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const fmt = (value, digits = 3) => Number.isFinite(value) ? value.toFixed(digits) : '—';
const summaryKeys = ['material','architecture','profile','mode','pressure','rpm','efficiency','speed','acceleration','lineLength','gateDuration','shutoffDistance','standoff','diameter','nozzleLength','endMotion','endDwell','liftSpeed','liftDistance','backtrackDistance','backtrackSpeed','reverseDuration','reverseRpm','lineRatio','dotRatio','offsetX','offsetY'];
function configSnapshot(config) {
  if (!config || typeof config !== 'object') return null;
  const snapshot = Object.fromEntries(summaryKeys.filter(key => config[key] !== undefined).map(key => [key, config[key]]));
  if (config.pathSettings && typeof config.pathSettings === 'object') snapshot.pathSettings = structuredClone(config.pathSettings);
  return snapshot;
}
function describeConfig(config) {
  if (!config) return '點膠條件未提供';
  const materials = {putty:'Tputty 910',grease:'Tgrease-2500'};
  const paths = {line:'熱源中心線',n:'N 形',serpentine:'蛇形',spiral:'螺旋',perimeter:'外框'};
  const path = config.pathSettings;
  const mode = config.mode === 'pattern' && path
    ? `${paths[path.pattern] || path.pattern}${path.pattern==='spiral'?' · '+({auto:'依熱源',square:'方形',round:'圓形'}[path.spiralShape||'auto'])+' · '+(path.spiralDirection==='inside-out'?'中心向外':'外向內'):''}（間距 ${fmt(path.spacing,1)} mm，內縮 ${fmt(path.edgeInset,1)} mm）`
    : ({line:'直線',point:'單點'}[config.mode] || config.mode || '未提供');
  const machine = config.architecture || '未提供';
  const drive = machine === 'P300' ? `${fmt(config.rpm,1)} rpm` : `${fmt(config.pressure,1)} psi`;
  const motion = config.mode === 'point' ? `開膠 ${fmt(config.gateDuration,2)} s` : `速度 ${fmt(config.speed,1)} mm/s`;
  return `${materials[config.material] || config.material || '未提供'} · ${machine} · ${mode} · ${drive} · ${motion}`;
}

/** UI only: calculations and visualization are injected by the caller. */
export function mountCompressionPanel(container, {onApply = () => {}, onReset = () => {}, onChange = () => {}} = {}) {
  container.innerHTML = `<section class="compression-panel" aria-labelledby="compression-title">
    <div class="compression-title"><div><span class="eyebrow">04 / ASSEMBLY VALIDATION</span><h2 id="compression-title">透明板壓合驗證</h2></div><span class="compression-badge">未校準</span></div>
    <p class="compression-intro">設定熱源與組裝間隙，觀察完整試驗後壓合的預估覆蓋；依據目前工件上的沉積量計算。</p>
    <div class="compression-fields">
      <label class="select-field">熱源形狀<select data-compression="shape"><option value="rectangle">矩形</option><option value="circle">圓形</option></select></label>
      <label class="field"><span data-compression-width-label>熱源長 X</span><div class="input-wrap"><input type="number" data-compression="width" min="1" max="500" step="any" value="30"><b>mm</b></div></label>
      <label class="field" data-compression-depth-wrap><span>熱源寬 Y</span><div class="input-wrap"><input type="number" data-compression="depth" min="1" max="500" step="any" value="30"><b>mm</b></div></label>
      <label class="field"><span>中心 X 偏移</span><div class="input-wrap"><input type="number" data-compression="offsetX" min="-500" max="500" step="any" value="0"><b>mm</b></div></label>
      <label class="field"><span>中心 Y 偏移</span><div class="input-wrap"><input type="number" data-compression="offsetY" min="-500" max="500" step="any" value="0"><b>mm</b></div></label>
      <label class="field"><span>組裝間隙</span><div class="input-wrap"><input type="number" data-compression="gap" min="0.05" max="10" step="any" value="0.2"><b>mm</b></div></label>
    </div>
    <p class="compression-note">偏移以工件中心為原點；組裝間隙為熱源與壓板間的固定距離，非點膠針嘴離面高度。</p>
    <details class="compression-advanced"><summary>估算網格</summary><label class="field"><span>網格解析度 <small>工程初估</small></span><div class="input-wrap"><input type="number" data-compression="cellSize" min="0.2" max="5" step="any" value="0.5"><b>mm</b></div></label><p class="compression-note">格子較小可改善輪廓解析度，計算時間也會增加。</p></details>
    <div class="compression-actions"><button type="button" class="primary" data-compression-apply>模擬壓合</button><button type="button" data-compression-reset>回到點膠</button></div>
    <div class="compression-result" data-compression-result aria-live="polite"><p class="compression-note">按「模擬壓合」查看完整試驗的初步估算。</p></div>
    <button type="button" class="compression-baseline-button" data-compression-baseline disabled>保存壓合作為比較基準</button><div data-compression-comparison aria-live="polite"></div>
    <p class="compression-caution">工程近似：尚未依材料流變、壓合速度、夾持力、排氣或實測壓痕校準。結果不代表實際組裝合格或保證覆蓋，需以透明板實驗驗證。</p>
  </section>`;
  const find = selector => container.querySelector(selector);
  const input = key => find(`[data-compression="${key}"]`);
  const resultElement = find('[data-compression-result]');
  let result = null;
  let stale = false;
  let baseline = null;
  let resultSettings = null;
  let resultConfig = null;
  const settings = () => ({shape:input('shape').value, width:Number(input('width').value), depth:Number(input('depth').value), offsetX:Number(input('offsetX').value), offsetY:Number(input('offsetY').value), gap:Number(input('gap').value), cellSize:Number(input('cellSize').value)});
  const valid = () => [...container.querySelectorAll('input[data-compression]')].every(el => el.value.trim() !== '' && el.checkValidity());
  function render() {
    find('[data-compression-baseline]').disabled = !result || stale;
    const comparisonElement = find('[data-compression-comparison]');
    if (!result) { comparisonElement.innerHTML = ''; return; }
    const s = result.summary;
    const delta = (value, old, digits) => `${value - old >= 0 ? '+' : ''}${fmt(value - old, digits)}`;
    comparisonElement.innerHTML = baseline ? `<div class="compression-compare"><b>基準 → 目前 ${stale ? '（目前結果已過期）' : ''}</b>
      <p>覆蓋率 ${fmt(baseline.summary.coveredPercent,1)}% → ${fmt(s.coveredPercent,1)}%（${delta(s.coveredPercent,baseline.summary.coveredPercent,1)} 個百分點）</p>
      <p>工件沉積 ${fmt(baseline.summary.depositedMl,4)} → ${fmt(s.depositedMl,4)} mL（${delta(s.depositedMl,baseline.summary.depositedMl,4)} mL）</p>
      <p>基準條件：${safe(baseline.settings.shape === 'circle' ? '圓形直徑 ' + baseline.settings.width : '矩形 ' + baseline.settings.width + ' × ' + baseline.settings.depth)} mm；間隙 ${fmt(baseline.settings.gap,2)} mm；中心偏移 ${fmt(baseline.settings.offsetX,1)} / ${fmt(baseline.settings.offsetY,1)} mm。</p>
      <p>基準點膠：${safe(describeConfig(baseline.config))}。</p>
      <small>僅用於比較工程估算，不是產品合格判定。</small></div>` : '';
    resultElement.innerHTML = `<div class="compression-result-title"><b>壓合後估算</b><span>${stale ? '參數已變更，請重新模擬' : '完整試驗 · 未校準'}</span></div>
      <div class="compression-coverage"><strong>${fmt(s.coveredPercent,1)}%</strong><span>熱源等效覆蓋率</span></div>
      <dl class="compression-metrics">
        <div><dt>熱源面積</dt><dd>${fmt(s.sourceAreaMm2,2)} mm²</dd></div>
        <div><dt>工件沉積膠量</dt><dd>${fmt(s.depositedMl,4)} mL</dd></div>
        <div><dt>熱源間隙幾何體積</dt><dd>${fmt(s.requiredMl,4)} mL</dd></div>
        <div><dt>熱源內膠量</dt><dd>${fmt(s.insideMl,4)} mL</dd></div>
        <div><dt>熱源外膠量</dt><dd>${fmt(s.outsideMl,4)} mL</dd></div>
        <div><dt>工件外膠量</dt><dd>${fmt(s.offWorkpieceMl,4)} mL</dd></div>
        <div><dt>尚未分配膠量</dt><dd>${fmt(s.unresolvedMl,4)} mL</dd></div>
      </dl>
      <p class="compression-note">熱源間隙幾何體積為面積 × 間隙，不代表足夠覆蓋所需的實際用量。工件外膠量可能與熱源內或外膠量重複，不能相加；尚未分配膠量仍依暫存位置計入熱源內／外，不能再相加。</p>
      ${(result.warnings || []).map(w => `<p class="compression-warning">${safe(w)}</p>`).join('')}`;
  }
  function markChanged() {
    const circular = input('shape').value === 'circle';
    find('[data-compression-width-label]').textContent = circular ? '熱源直徑' : '熱源長 X';
    find('[data-compression-depth-wrap]').hidden = circular;
    input('depth').disabled = circular;
    if (result) { stale = true; render(); }
    onChange(settings());
  }
  container.querySelectorAll('[data-compression]').forEach(el => el.addEventListener('change',markChanged));
  find('[data-compression-apply]').addEventListener('click',() => {
    if (!valid()) { resultElement.innerHTML = '<p class="compression-warning">請輸入欄位範圍內的有效數值。</p>'; return; }
    onApply(settings());
  });
  find('[data-compression-reset]').addEventListener('click',() => onReset());
  find('[data-compression-baseline]').addEventListener('click',() => {
    if (!result || stale || !resultSettings) return;
    baseline = {summary:{...result.summary},settings:{...resultSettings},config:resultConfig ? structuredClone(resultConfig) : null};
    render();
  });
  return {
    getSettings: settings,
    setResult(value, config) { result = value; resultSettings = settings(); resultConfig = configSnapshot(config); stale = false; render(); },
    setError(message) { result = null; resultSettings = null; resultConfig = null; render(); resultElement.innerHTML = `<p class="compression-warning">${safe(message)}</p>`; },
    clearResult() { result = null; resultSettings = null; resultConfig = null; stale = false; render(); resultElement.innerHTML = '<p class="compression-note">按「模擬壓合」查看完整試驗的初步估算。</p>'; },
    getBaseline() { return baseline ? structuredClone(baseline) : null; },
    markStale() { if (result) { stale = true; render(); } }
  };
}
