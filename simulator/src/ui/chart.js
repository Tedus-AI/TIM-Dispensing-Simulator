// Time-series chart drawn as SVG. Width follows the container through viewBox scaling.
const W = 1000;
const H = 150;
const L = 52;
const R = 14;
const T = 12;
const B = 26;

export const CHARTS = {
  q: { label: '出口流量', unit: 'mL/s', key: 'q', digits: 3 },
  output: { label: '累積出膠', unit: 'mL', key: 'output', digits: 3 },
  speed: { label: '移動速度', unit: 'mm/s', key: 'speed', digits: 0 },
  z: { label: '針嘴高度', unit: 'mm', key: 'z', digits: 1 },
};

function niceMax(v) {
  if (!(v > 0)) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= v) return m * p;
  return 10 * p;
}

export function drawChart(svg, run, type, time, baseline) {
  const spec = CHARTS[type];
  const frames = run.frames;
  const values = frames.map((f) => f[spec.key]);
  const extra = type === 'q' ? [run.Q] : [];
  const baseValues = baseline?.frames?.map((f) => f[spec.key]) || [];
  const max = niceMax(Math.max(1e-6, ...values, ...extra, ...baseValues) * 1.05);
  const min = type === 'z' ? Math.max(0, Math.min(...values) - 1) : 0;
  const duration = Math.max(run.duration, baseline?.duration || 0);
  const x = (t) => L + (t / duration) * (W - L - R);
  const y = (v) => H - B - ((v - min) / (max - min)) * (H - B - T);
  const stride = Math.max(1, Math.floor(frames.length / 900));
  const line = (fs) =>
    fs
      .filter((_, i) => i % stride === 0 || i === fs.length - 1)
      .map((f, i) => `${i ? 'L' : 'M'}${x(f.t).toFixed(1)},${y(f[spec.key]).toFixed(1)}`)
      .join('');
  const path = line(frames);
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((k) => {
      const v = min + (max - min) * k;
      return `<line class="grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v.toFixed(spec.digits === 0 ? 0 : max < 1 ? 2 : 1)}</text>`;
    })
    .join('');
  const ticks = [];
  const stepT = niceMax(duration / 6);
  for (let t = 0; t <= duration + 1e-9; t += stepT) ticks.push(`<text class="tick" x="${x(t)}" y="${H - 8}" text-anchor="middle">${+t.toFixed(2)}s</text>`);
  const e = run.ending;
  const markers = [
    ['off', e.commandOff, '關膠'],
    ['arrive', e.movementEnd, '到位'],
    ['lift', e.liftStart, '抬針'],
    ['exit', e.motionEnd, '退離完成'],
  ]
    .filter(([, t]) => Number.isFinite(t))
    .map(([k, t, label]) => `<line class="marker ${k}" x1="${x(t)}" x2="${x(t)}" y1="${T}" y2="${H - B}"><title>${label} ${t.toFixed(3)} s</title></line>`)
    .join('');
  const command =
    type === 'q' ? `<path class="command" d="M${L},${y(run.Q)} H${x(e.commandOff)} V${y(0)} H${W - R}"/>` : '';
  const base = baseline ? `<path class="baseline" d="${line(baseline.frames)}"/>` : '';
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML =
    grid +
    ticks.join('') +
    markers +
    base +
    `<path class="area" d="${path} L${x(frames.at(-1).t)},${y(min)} L${L},${y(min)} Z"/><path class="series" d="${path}"/>` +
    command +
    `<line class="cursor" id="chart-cursor" x1="${x(time)}" x2="${x(time)}" y1="${T - 4}" y2="${H - B}"/>`;
  return { x, duration, toTime: (px) => ((px - L) / (W - L - R)) * duration };
}

export function moveCursor(svg, chart, time) {
  const c = svg.querySelector('#chart-cursor');
  if (c && chart) {
    const v = chart.x(time);
    c.setAttribute('x1', v);
    c.setAttribute('x2', v);
  }
}

export const CHART_SIZE = { W, L, R };
