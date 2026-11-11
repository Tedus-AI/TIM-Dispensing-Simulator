// The verdicts a row of the optimiser table can get (v3.1.1), in the order the glossary lists them. The table
// takes its badge text and style from here and the glossary under the table explains each one in everyday
// words, so the two cannot drift apart. `plain` says what it means; `todo` says what to do about it.
import { OPTIMIZE_DEFAULTS, STANDOFF_MAX } from '../optimize.js';

// The two verdicts that carry a number. The glossary shows them with an x in its place.
export const shortLabel = (points) => `覆蓋差 ${points}%`;
export const overLabel = (mm) => `溢膠超 ${mm} mm`;
/** The text of a row that misses a goal: one of the two, or both joined. Empty when neither is missed. */
export const missLabel = (short, over) => [short ? shortLabel(short) : '', over ? overLabel(over) : ''].filter(Boolean).join('・');

export const VERDICTS = Object.freeze({
  pass: {
    label: '達標',
    cls: 'ok-badge',
    plain: '這組可以用。就算點膠機實際出的膠比設定少一點或多一點（在容差內），熱源都還是蓋得夠，膠也不會溢出太遠。這個結論已經用細網格再算過一次確認。',
    todo: '按「套用」，再用透明板實際壓一片確認。',
  },
  marginal: {
    label: '邊緣達標',
    cls: 'mid-badge',
    plain: '算過關，但很驚險。膠量偏多的時候，溢膠只比上限少一點點，少到比計算本身的誤差還小，實際做出來有可能超過。',
    todo: '表裡有別的「達標」就先選那些。一定要用這組的話，請用透明板在膠量偏多的情況下確認溢膠。',
  },
  needle: {
    label: '碰針',
    cls: 'no-badge',
    plain: '針頭會沾到膠。可能是一趟的膠就堆得比針頭高，也可能是走回頭路時撞上先前疊起來的膠。針頭一沾到膠，後面就會拖膠、牽絲，所以不管它蓋得多好，這組都不採用。',
    todo: `「針嘴離面高度」選「自動上調」，讓程式自己把針抬高。已經選了還是碰針，表示抬到上限 ${STANDOFF_MAX} mm 都不夠：請換不會重複經過同一處的圖樣，或減少膠量。`,
  },
  equipment: {
    label: '設備限制',
    cls: 'no-badge',
    plain: '機器調不出需要的膠量。最常見的是膠出不夠：壓力（或轉速）已經開到最大、移動速度也放到最慢了，還是不夠。多半是針頭太細。',
    todo: '換粗一點的針頭（「針嘴」選「自動」會自己挑）、放寬移動速度的範圍，或先到設備頁用實測的出膠量校正。',
  },
  cycle: {
    label: '超過週期',
    cls: 'no-badge',
    plain: '點完一片要花的時間，超過你設定的「週期上限」。',
    todo: '提高移動速度、換粗一點的針頭，或放寬週期上限。',
  },
  narrow: {
    label: '窗口不足',
    cls: 'no-badge',
    plain: '照建議的膠量點是合格的，但「可以用的膠量範圍」太窄。點膠機只要多出一點或少出一點膠，就會變成蓋不夠或溢太多，量產時不穩。',
    todo: '放寬溢膠上限或降低覆蓋率目標；或把「膠量容差」改成你的設備實際會有的誤差。',
  },
  short: {
    label: shortLabel('x'),
    cls: 'no-badge',
    plain: '膠蓋得不夠，離覆蓋率目標還差 x 個百分點（x 是實際數字）。複核過的列，看的是膠量偏少時最差的情況。',
    todo: '增加膠量、把路徑間距縮小，或換一種圖樣。',
  },
  over: {
    label: overLabel('x'),
    cls: 'no-badge',
    plain: '膠被壓到熱源外面太遠，比溢膠上限多出 x mm。複核過的列，看的是膠量偏多時最差的情況。',
    todo: '減少膠量、把邊界內縮加大，或放寬溢膠上限。',
  },
  both: {
    label: missLabel('x', 'x'),
    cls: 'no-badge',
    plain: '兩個同時出現：有的地方蓋不到，有的地方又擠出去太多。表示這種點法的膠分布不均，或是膠量一有出入就顧此失彼，光調膠量救不回來。',
    todo: '換一種圖樣或調整間距、內縮；不然就放寬其中一個目標。',
  },
  partial: {
    label: '未全部達標',
    cls: 'no-badge',
    plain: '複核時，有的膠量點機器調不到那個量（或沒算出結果），沒辦法確認每一點都過關，所以不算達標。很少見。',
    todo: '檢查膠量範圍和設備的壓力、速度範圍，再搜尋一次。',
  },
  pending: {
    label: '待複核',
    cls: 'no-badge',
    plain: '粗略算起來可以，但還沒用細網格再確認一次，所以先不算數。通常是它排名比較後面，還沒輪到，或搜尋中途被停止。',
    todo: '讓搜尋跑完；還是「待複核」就把搜尋精細度調高，會複核更多列。',
  },
  unfinished: {
    label: '未完成',
    cls: 'no-badge',
    plain: '只做了第一輪的粗略篩選，後面「找可用的膠量範圍」和「複核」都還沒做，不能當作結論。常見於中途按了停止，或排名太後面沒輪到。',
    todo: '讓搜尋跑完，或把搜尋精細度調高。',
  },
});

// Words the explanations lean on, explained first.
export const VERDICT_TERMS = Object.freeze([
  { term: '可以用的膠量範圍（膠量窗口）', plain: '同一種點法，膠太少會蓋不滿，膠太多會溢出去。從「剛好蓋得夠」到「再多就溢太遠」之間的膠量，就是窗口。窗口越寬，越不怕點膠機忽多忽少。' },
  { term: '膠量容差', plain: `量產時每一次出的膠量都會有點出入（預設 ±${Math.round(OPTIMIZE_DEFAULTS.tolerance * 100)}%，可以自己改）。一組設定要在這個出入範圍內都合格，才算數。` },
  { term: '複核', plain: '把「膠少一點、剛好、多一點」幾種情況，各用細網格重新算一遍。全部合格才給「達標」。' },
  { term: '粗網格、細網格', plain: '計算時把膠層切成很多小方格來算。格子越小越準，也越花時間。所以先用大格子快速找出有希望的組合，再用小格子確認。' },
]);

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** The glossary shown under the optimiser table. */
export function verdictGlossaryHtml(open = true) {
  const terms = VERDICT_TERMS.map((t) => `<div class="vg-term"><dt>${esc(t.term)}</dt><dd>${esc(t.plain)}</dd></div>`).join('');
  const items = Object.entries(VERDICTS)
    .map(([id, v]) => `<div class="vg-item" data-verdict="${id}"><dt><span class="${v.cls}">${esc(v.label)}</span></dt><dd>${esc(v.plain)}<span class="vg-todo"><b>怎麼辦</b>${esc(v.todo)}</span></dd></div>`)
    .join('');
  return `<details class="verdict-glossary" id="verdict-glossary"${open ? ' open' : ''}><summary><b>判定名詞解釋</b><small>「判定」欄可能出現的結果，用白話說明</small></summary><p class="vg-lead">先認識四個詞</p><dl class="vg-terms">${terms}</dl><p class="vg-lead">判定欄會出現的結果</p><dl class="vg-list">${items}</dl><p class="vg-foot">一列只顯示一個判定：同時有好幾個問題時，先顯示「${VERDICTS.needle.label}」，其次是「${VERDICTS.equipment.label}」、「${VERDICTS.cycle.label}」。游標移到表格裡的判定上，會顯示那一列實際的數字（差多少、是哪一個膠量點）。所有結果都是模擬估算，未經實機校準。</p></details>`;
}
