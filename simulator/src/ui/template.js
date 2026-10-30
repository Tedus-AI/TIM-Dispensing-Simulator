// Static page skeleton. Dynamic panel content is rendered by main.js into the named slots.
export const PATTERN_ICONS = {
  line: '<path d="M4 12h16"/>',
  n: '<path d="M5 19V5l14 14V5"/>',
  serpentine: '<path d="M4 5h15a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h14a2 2 0 0 1 0 4H4"/>',
  spiral: '<path d="M4 4h16v16H6V7h11v10H9v-7h5v4"/>',
  perimeter: '<rect x="4" y="4" width="16" height="16" rx="1"/>',
};
export const PATTERN_NAMES = { line: '中心線', n: 'N 形', serpentine: '蛇形', spiral: '螺旋', perimeter: '外框' };

const icon = (d, size = 16) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const ICONS = {
  play: icon('<path d="M7 5v14l11-7z" fill="currentColor" stroke="none"/>'),
  pause: icon('<path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none"/>'),
  restart: icon('<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/>'),
  step: icon('<path d="M6 5v14l9-7zM17 5v14"/>'),
  reset: icon('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'),
  orbit: icon('<circle cx="12" cy="12" r="3"/><path d="M12 3c5 0 9 4 9 9M12 21c-5 0-9-4-9-9"/><path d="M19 9l2 3 2-3M5 15l-2-3-2 3"/>'),
  cube: icon('<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>'),
  sun: icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  moon: icon('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),
  book: icon('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5"/>'),
  help: icon('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>'),
  download: icon('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  press: icon('<path d="M4 6h16M12 6v6M8 12h8l-2 4h-4zM4 20h16"/>'),
  compare: icon('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  close: icon('<path d="M6 6l12 12M18 6 6 18"/>'),
  pin: icon('<path d="M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>'),
};

export function pageTemplate(version) {
  return `
<header class="topbar">
  <div class="brand">
    <div class="brand-mark" aria-hidden="true"><span></span></div>
    <div><div class="eyebrow">TIM DISPENSING LAB</div><h1>TIM 點膠研究室</h1></div>
  </div>
  <div class="scenario" id="scenario" aria-label="目前情境"></div>
  <div class="top-actions">
    <span class="badge-warn" title="所有結果皆為工程假設，尚未經實機校準">工程假設 · 未校準</span>
    <button class="ghost" id="show-sources" title="參數來源與假設">${ICONS.book}<span>來源</span></button>
    <button class="ghost" id="help" title="使用說明">${ICONS.help}<span>說明</span></button>
    <button class="ghost icon-only" id="theme" title="切換深色／淺色">${ICONS.moon}</button>
  </div>
</header>
<div class="workspace">
  <aside class="panel config" aria-label="試驗配置">
    <nav class="tabs" role="tablist">
      <button role="tab" data-tab="equipment" class="active"><b>1</b>設備</button>
      <button role="tab" data-tab="heat"><b>2</b>熱源</button>
      <button role="tab" data-tab="path"><b>3</b>路徑</button>
      <button role="tab" data-tab="ending"><b>4</b>收尾</button>
      <button role="tab" data-tab="workpiece"><b>5</b>工件</button>
    </nav>
    <div class="tab-body" id="tab-body"></div>
    <footer class="config-foot"><button id="defaults" class="text-button">恢復此情境預設</button><span>v${version}</span></footer>
  </aside>
  <main class="center">
    <section class="stage card" aria-label="點膠觀察">
      <div class="stage-head">
        <div class="fig"><span class="fig-n">Fig. 1</span><span id="view-label">點膠近看</span></div>
        <div class="seg views" role="group" aria-label="視角">
          <button data-view="whole">全機</button><button data-view="work">工作區</button><button data-view="head">機頭</button><button data-view="feed">供膠站</button><button data-view="close" class="active">近看</button><button data-view="heat">熱源</button><button data-view="follow">跟隨</button>
        </div>
        <div class="cam-tools">
          <div class="seg corners" role="group" aria-label="等角方向">
            <button data-corner="0" title="等角 ① X+ / Y+">①</button><button data-corner="1" title="等角 ② X− / Y+">②</button><button data-corner="2" class="active" title="等角 ③ X− / Y−">③</button><button data-corner="3" title="等角 ④ X+ / Y−">④</button>
          </div>
          <button class="tool" id="free-orbit" aria-pressed="false" title="360° 自由旋轉">${ICONS.orbit}</button>
          <button class="tool" id="projection" aria-pressed="false" title="切換正交／透視">${ICONS.cube}<span id="projection-label">正交</span></button>
          <button class="tool" id="reset-camera" title="重設視角 (Home)">${ICONS.reset}</button>
        </div>
      </div>
      <div id="viewport" class="viewport"></div>
      <div class="hud hud-left">
        <div class="phase"><span class="dot"></span><span id="phase">就緒</span></div>
        <label class="chk"><input type="checkbox" id="show-planned" checked><i class="sw path"></i>規劃路徑</label>
        <label class="chk"><input type="checkbox" id="show-exit" checked><i class="sw exit"></i>退離軌跡</label>
        <label class="chk"><input type="checkbox" id="show-heat" checked><i class="sw heat"></i>熱源輪廓</label>
      </div>
      <div class="hud hud-right" aria-live="off">
        <div><span>t</span><b id="hud-t">0.000</b><small>s</small></div>
        <div><span>出口</span><b id="hud-out">0.000</b><small>mL</small></div>
        <div><span>流量</span><b id="hud-q">0.000</b><small>mL/s</small></div>
        <div><span>TCP</span><b id="hud-xyz">0, 0, 0</b><small>mm</small></div>
      </div>
      <div class="press-bar" id="press-bar" hidden>
        <button class="tool" id="press-play">${ICONS.play}</button>
        <input type="range" id="press-scrub" min="0" max="23" step="1" value="23" aria-label="壓合進程">
        <span id="press-gap">間隙 0.50 mm</span>
        <div class="seg small" role="group" aria-label="壓合著色"><button data-press-color="material" class="active">膠色</button><button data-press-color="front">前緣時序</button></div>
        <button class="tool" id="press-exit" title="回到點膠">${ICONS.close}<span>回到點膠</span></button>
      </div>
      <div class="stage-foot">
        <span id="camera-hint">拖曳平移 · 滾輪縮放 · Home 重設</span>
        <span class="scale"><i id="scale-line"></i><span id="scale-label">X 軸 10 mm</span></span>
        <span class="note" id="geometry-note">mm 真實比例 · 機構為工程示意</span>
      </div>
    </section>
    <section class="dock card" aria-label="時間軸">
      <div class="transport">
        <button id="play" class="primary">${ICONS.play}<span>開始試驗</span></button>
        <button id="restart" class="tool" title="回到起點">${ICONS.restart}</button>
        <button id="step" class="tool" title="前進 0.01 秒">${ICONS.step}</button>
        <div class="scrub-wrap"><input type="range" id="scrubber" aria-label="時間軸" min="0" max="1000" step="1" value="0"><div class="marks" id="marks"></div></div>
        <span id="time-readout" class="mono">0.000 / 0.000 s</span>
        <select id="playback-speed" aria-label="播放速度"><option value="0.25">0.25×</option><option value="0.5" selected>0.5×</option><option value="1">1×</option><option value="2">2×</option></select>
      </div>
      <div class="chart-head">
        <div class="seg small" role="tablist"><button data-chart="q" class="active">流量</button><button data-chart="output">累積膠量</button><button data-chart="speed">移動速度</button><button data-chart="z">針嘴高度</button></div>
        <div class="legend"><span><i class="lg series"></i>計算</span><span id="legend-command"><i class="lg command"></i>指令穩態</span><span id="legend-base" hidden><i class="lg baseline"></i>基準</span><span><i class="lg off"></i>關膠</span><span><i class="lg arrive"></i>到位</span><span><i class="lg lift"></i>抬針</span></div>
        <span id="chart-unit" class="unit">mL/s</span>
      </div>
      <svg id="chart" class="chart" preserveAspectRatio="none" role="img" aria-label="時間曲線；點擊可跳到該時間"></svg>
    </section>
  </main>
  <aside class="panel results" aria-label="試驗結果">
    <div class="results-scroll" id="results"></div>
  </aside>
</div>
<dialog id="sources-dialog" class="dialog wide"><div class="dialog-head"><h2>參數來源與假設</h2><button data-close class="ghost">${ICONS.close}</button></div><p class="muted">「v1.0 更新」為本次查證後替換或新增的值；研究原檔 v0.3 不變。所有項目目前均未經實機驗證。</p><div class="table-scroll"><table><thead><tr><th>參數</th><th>值</th><th>類型</th><th>依據與出處</th></tr></thead><tbody id="source-rows"></tbody></table></div></dialog>
<dialog id="compare-dialog" class="dialog wide"><div class="dialog-head"><h2>熱源圖樣比較</h2><button data-close class="ghost">${ICONS.close}</button></div><div id="compare-body"></div></dialog>
<dialog id="help-dialog" class="dialog"><div class="dialog-head"><h2>使用說明</h2><button data-close class="ghost">${ICONS.close}</button></div><div id="help-body"></div></dialog>
<div id="toast" role="status"></div>`;
}
