// A one-page trial report as a self-contained HTML document (no external files): the settings that define the
// trial, what the simulation found, the press and tolerance results, and the 3D view at the moment of export.
// Opened in a browser it prints to PDF. Everything in it is labelled as an uncalibrated engineering estimate.

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const fmt = (n, d = 2) => (Number.isFinite(n) ? Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—');
const row = (label, value, note = '') => `<tr><th>${esc(label)}</th><td>${value}</td><td class="note">${esc(note)}</td></tr>`;
const table = (title, rows) => `<section><h2>${esc(title)}</h2><table class="kv"><tbody>${rows.filter(Boolean).join('')}</tbody></table></section>`;
const END_MOTION = { vertical: '垂直抬針', diagonal: '邊升邊回退', liftThenBack: '先抬高再回退', legacy: '尾膠結算後抬針（對照）' };

export function buildReport(d) {
  const c = d.config;
  const h = d.heat;
  const run = d.run;
  const s = run.summary;
  const e = run.ending;
  const pcp = c.architecture === 'P300';
  const moving = c.mode !== 'point';
  const area = h.shape === 'circle' ? (Math.PI * h.width ** 2) / 4 : h.width * h.depth;
  const p = d.press?.summary;
  const ratio = d.required > 0 ? s.deposited / d.required : 0;
  const state = d.bead.speedRatio === null ? '' : d.bead.state === 'stretched' ? '被拉細' : d.bead.state === 'piled' ? '堆疊' : '良好';
  const issues = [...(run.issues || []), ...(d.press?.issues || [])];
  const flagged = new Set(issues);
  const notes = [...run.warnings, ...(d.press?.warnings || [])].filter((w) => !flagged.has(w));
  const now = new Date();

  const inputs = [
    table('熱源與間隙', [
      row('熱源', h.shape === 'circle' ? `圓形 Ø${fmt(h.width, 1)} mm` : `矩形 ${fmt(h.width, 1)} × ${fmt(h.depth, 1)} mm`, `面積 ${fmt(area, 0)} mm²，中心 (${fmt(h.offsetX, 1)}, ${fmt(h.offsetY, 1)}) mm`),
      row('組裝間隙', `${fmt(h.gap, h.gap < 0.1 ? 3 : 2)} mm`, `需求膠量 ${fmt(d.required, 3)} mL（面積 × 間隙）`),
      row('元件功耗', `${fmt(h.power, 0)} W`),
      row('工件', `${fmt(c.width, 0)} × ${fmt(c.depth, 0)} × ${fmt(c.thickness, 1)} mm`, c.workpieceKind === 'plate' ? '虛擬平板' : `匯入：${c.workpieceFile?.name ?? ''}`),
    ]),
    table('膠材與設備', [
      row('膠材', esc(d.material.name), `${d.material.kind}；k ${d.material.conductivity} W/m·K、${d.material.density} g/cc`),
      row('膠溫', `${fmt(c.temperature, 1)} °C`, `流動活化能 ${fmt(c.activationEnergy, 0)} kJ/mol（AI 初估）`),
      row('出膠架構', pcp ? 'P300 PCP 容積式' : 'R75 氣壓時間式'),
      row(pcp ? '計量軸轉速' : '驅動表壓', pcp ? `${fmt(c.rpm, 1)} rpm` : `${fmt(c.pressure, 1)} psi`, `穩態出膠 ${fmt(run.Q, 4)} mL/s（${fmt(run.Q * c.density * 60, 2)} g/min）`),
      row('針嘴', `內徑 ${fmt(c.diameter, 2)} mm`, `等效直管長 ${fmt(c.nozzleLength, 1)} mm`),
      row('壓合流變', `K ${fmt(d.rheology.viscosity, 0)} Pa·sⁿ、n ${fmt(d.rheology.flowIndex, 2)}`, `降伏應力 ${fmt(d.rheology.yieldStress, 0)} Pa`),
    ]),
    table('路徑與收尾', [
      row('路徑', esc(d.patternName), moving ? `長 ${fmt(run.pathLength, 1)} mm` : `開膠 ${fmt(c.gateDuration, 3)} s`),
      c.mode === 'pattern' ? row('圖樣幾何', `${['serpentine', 'spiral'].includes(d.pattern.pattern) ? `間距 ${fmt(d.pattern.spacing, 2)} mm、` : ''}邊界內縮 ${fmt(d.pattern.edgeInset, 2)} mm`, d.pattern.pattern === 'spiral' ? (d.pattern.spiralDirection === 'inside-out' ? '中心向外' : '外向內') : '') : '',
      moving ? row('運動', `${fmt(c.speed, 1)} mm/s、加速度 ${fmt(c.acceleration, 0)} mm/s²`, run.motion ? `平均 ${fmt(run.motion.averageSpeed, 1)} mm/s${run.motion.corners ? `；${run.motion.corners} 個減速轉角，最低 ${fmt(run.motion.slowestCorner, 1)} mm/s` : ''}${run.motion.curveSlowest != null ? `；圓弧最低 ${fmt(run.motion.curveSlowest, 1)} mm/s` : ''}` : '') : '',
      row('針嘴離面', `${fmt(c.standoff, 2)} mm`),
      moving ? row('起點出膠等待', `${fmt(c.startDwell, 2)} s`) : '',
      moving ? row('提前關膠', `${fmt(c.shutoffDistance, 1)} mm`) : '',
      row('退離', esc(END_MOTION[c.endMotion] || c.endMotion), `停留 ${fmt(c.endDwell, 2)} s、抬針 ${fmt(c.liftDistance, 1)} mm @ ${fmt(c.liftSpeed, 0)} mm/s`),
    ]),
  ].join('');

  const results = table('點膠結果', [
    row('工件沉積', `<b>${fmt(s.deposited, 3)} mL</b>（${fmt(s.deposited * c.density, 3)} g）`, `需求的 ${fmt(ratio, 2)} 倍`),
    row('開膠時間', `${fmt(run.gate, 2)} s`, `動作完成 ${fmt(e.motionEnd, 2)} s`),
    row(moving ? '膠條高 / 寬' : '膠點高 / 直徑', `${fmt(s.maxHeight, 2)} / ${fmt(s.maxWidth, 1)} mm`, s.maxHeight > c.standoff ? '高於針嘴離面：埋針' : s.flattened ? '被針嘴壓平' : '自然形狀'),
    d.bead.speedRatio !== null ? row('針嘴與膠條', `拉細倍率 ×${fmt(d.bead.speedRatio, 2)}（${state}）`, `匹配內徑約 ${fmt(d.bead.matchedId, 2)} mm；0.7–1.5 為良好範圍（AI 初估）`) : '',
    d.stack?.overlap ? row('疊高', `${fmt(d.stack.maxHeight, 2)} mm`, d.stack.contact ? '針嘴碰到前一道膠' : '低於針嘴') : '',
    moving && e.endToMiddleRatio !== null ? row('末段 / 中段', `×${fmt(e.endToMiddleRatio, 2)}`, '每 mm 膠量比；0.5–1.5 為比較帶') : '',
    row('停移後流出', `${fmt(e.afterStopVolume * 1000, 2)} µL`, `${fmt(e.afterStopPercent, 1)}%`),
  ]);

  const pr = p?.press;
  const press = p
    ? table('壓合與熱阻', [
        row('壓合條件', `${fmt(pr.forceKgf, 1)} kgf、下降速度上限 ${fmt(pr.pressSpeed, 2)} mm/s`, `${d.airModeName}；網格 ${fmt(d.press.grid.cellSize, 2)} mm${pr.holdTime > 0 ? `；保壓上限 ${fmt(pr.holdTime, 0)} s` : ''}`),
        row('熱源覆蓋', `<b>${fmt(p.coveredPercent, 1)}%</b>`, `目標 ≥ ${d.goals.coverage}%`),
        row('溢出熱源', `${fmt(p.squeezeOutMm, 1)} mm`, `上限 ${d.goals.overflow} mm；熱源外 ${fmt(p.outsideMl, 3)} mL`),
        row('夾氣', `${p.voidCount} 處、${fmt(p.voidAreaMm2, 1)} mm²`, `熱源面積的 ${fmt(p.voidPercent, 1)}%`),
        row('膠層', `${fmt(pr.finalGapMm, pr.finalGapMm < 0.1 ? 3 : 2)} mm`, pr.stalled === 'yield' ? '壓不到墊片（降伏應力撐住壓合力）' : pr.stalled === 'time' ? '保壓時間內未壓到墊片' : `壓到墊片 ${fmt(pr.pressTime, pr.pressTime < 10 ? 1 : 0)} s`),
        row('熱阻', `${fmt(p.thermal.resistance, 4)} K/W`, `θ ${fmt(p.thermal.impedanceCm2, 3)} °C·cm²/W = 膠層 ÷ k + 接觸熱阻 ${fmt(p.thermal.contactResistance, 2)}`),
        row('TIM 溫升', `<b>${fmt(p.thermal.rise, 2)} °C</b>`, `滿覆蓋 ${fmt(p.thermal.idealRise, 2)} °C @ ${fmt(p.thermal.power, 0)} W；一維估算`),
      ])
    : '<section><h2>壓合與熱阻</h2><p class="muted">匯出時尚未模擬壓合。</p></section>';

  const t = d.tolerance;
  const tol = t
    ? `<section><h2>公差檢查</h2><p class="muted">膠量 ±${fmt(t.settings.dose * 100, 0)}%、間隙 ±${fmt(t.settings.gap, 2)} mm；目標：覆蓋 ≥ ${t.goals.coverage}%、溢膠 ≤ ${t.goals.overflow} mm。</p><table class="grid"><thead><tr><th>情況</th><th>膠量</th><th>間隙 mm</th><th>覆蓋 %</th><th>溢出 mm</th><th>夾氣 處</th><th>膠層 mm</th><th>溫升 °C</th><th>判定</th></tr></thead><tbody>${t.rows
        .map(
          (r) =>
            `<tr><th>${esc(r.label)}</th><td>${fmt(r.dose * 100, 0)}%</td><td>${fmt(r.gap, 3)}</td><td class="${r.short > 1e-9 ? 'bad' : ''}">${fmt(r.coveredPercent, 1)}</td><td class="${r.over > 1e-9 ? 'bad' : ''}">${fmt(r.squeezeOutMm, 1)}</td><td>${r.voidCount}</td><td>${fmt(r.bondLineMm, 3)}</td><td>${fmt(r.rise, 2)}</td><td>${r.pass ? '達標' : '<b class="bad">未達標</b>'}</td></tr>`,
        )
        .join('')}</tbody></table><p>${t.verdict.pass ? '公差內都達標。' : '<b class="bad">公差內有未達標的情況。</b>'}覆蓋最低 ${fmt(t.verdict.coverage, 1)}%、溢膠最多 ${fmt(t.verdict.overflow, 1)} mm、溫升最高 ${fmt(t.verdict.rise, 2)} °C。</p></section>`
    : '';

  const list = (title, items, cls) => (items.length ? `<section class="${cls}"><h2>${esc(title)}（${items.length}）</h2><ul>${items.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></section>` : '');

  return `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TIM 點膠試驗報告 ${now.toISOString().slice(0, 10)}</title>
<style>
  :root { color-scheme: light; }
  body { font: 13px/1.55 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', 'Segoe UI', system-ui, sans-serif; color: #1b1e22; margin: 0; background: #eef0f2; }
  main { max-width: 980px; margin: 0 auto; padding: 28px 32px 40px; background: #fff; }
  header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; border-bottom: 2px solid #1b1e22; padding-bottom: 10px; }
  h1 { font-size: 21px; margin: 0; }
  header p { margin: 2px 0 0; color: #5d646c; }
  .stamp { padding: 4px 10px; border: 1.5px solid #b06a00; color: #b06a00; border-radius: 6px; font-weight: 700; white-space: nowrap; }
  h2 { font-size: 14px; margin: 20px 0 6px; padding-left: 8px; border-left: 4px solid #2f5fd0; }
  table { border-collapse: collapse; width: 100%; }
  .kv th { text-align: left; font-weight: 600; width: 132px; color: #454b52; vertical-align: top; }
  .kv td, .kv th { padding: 4px 8px 4px 0; border-bottom: 1px solid #e4e7ea; vertical-align: top; }
  .kv td.note, .muted { color: #6a727b; font-size: 12px; }
  .grid th, .grid td { border: 1px solid #d5d9dd; padding: 4px 8px; text-align: right; }
  .grid th:first-child { text-align: left; }
  .grid thead th { background: #f3f5f7; }
  .bad { color: #c62f3b; font-weight: 700; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; }
  figure { margin: 14px 0 0; }
  figure img { width: 100%; border: 1px solid #d5d9dd; border-radius: 6px; display: block; }
  figcaption { color: #6a727b; font-size: 12px; margin-top: 4px; }
  ul { margin: 4px 0 0; padding-left: 18px; }
  li { margin: 3px 0; }
  .issues h2 { border-color: #c7790b; }
  .notes { color: #5d646c; font-size: 12px; }
  .notes h2 { border-color: #9aa2ab; }
  footer { margin-top: 24px; padding-top: 10px; border-top: 1px solid #d5d9dd; color: #6a727b; font-size: 12px; }
  @media print { body { background: #fff; } main { padding: 0; max-width: none; } section, figure { break-inside: avoid; } }
  @media (max-width: 700px) { .cols { grid-template-columns: 1fr; } main { padding: 18px 16px; } }
</style></head><body><main>
<header><div><h1>TIM 點膠試驗報告</h1><p>${esc(d.describe)}</p><p>${esc(now.toLocaleString())}　TIM 點膠研究室 v${esc(d.version)}</p></div><span class="stamp">${esc(d.label)}</span></header>
<figure><img src="${d.image}" alt="匯出時的 3D 畫面"><figcaption>匯出時的畫面：${esc(d.viewLabel)}${p ? '；透明板壓合後的膠層與夾氣' : ''}。所有零件與膠形為 mm 真實比例。</figcaption></figure>
<div class="cols"><div>${inputs}</div><div>${results}${press}</div></div>
${tol}
${list('需要注意', issues, 'issues')}
${list('模型界線與說明', notes, 'notes')}
<footer>本報告所有數值為工程假設、未經實機校準（膠材流變、起停時間常數、降伏應力多為 AI 初估），用於比較方案與縮小試驗範圍，不能取代透明板或首件驗證，也不能作為量產配方或驗收依據。</footer>
</main></body></html>`;
}
