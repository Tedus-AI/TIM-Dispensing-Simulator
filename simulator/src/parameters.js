// v1.0 parameter updates layered over data/engineering_defaults_v0.3.json. The original research
// registry file stays unchanged; every value here records its evidence and source like the registry.
const GUIDE = 'sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf';
const TDS910 = 'sources/Laird/Tputty910_TDS_20250422_RevC.pdf';
const TDS2500 = 'sources/Laird/Tgrease2500_TDS_20250627.pdf';
const NAGRANI = 'Nagrani et al., J. Rheol. 67 (2023), doi:10.1122/8.0000679（arXiv 2304.12104）';

export const PARAMETER_UPDATES = Object.freeze([
  {
    id: 'putty_proxy.pressure_exponent',
    value: 2.7,
    unit: '1',
    evidence: 'derived',
    role: '氣壓 → 流率的冪次 m（流動指數 n≈1/m）',
    basis:
      '以 Laird A18720-00 Rev A 第 5 頁「75cc cartridge、0.125 in nozzle」Tputty 910 流率—氣壓曲線，300 dpi 數位讀圖 20–100 psi 對數擬合 m=2.73（各點誤差約 2% 內）；取 2.7。曲線縱軸單位（cc/min）與 TDS（g/min）仍待 Laird 確認，故只採用曲線「形狀」，90 psi 的量值仍沿用 TDS 75 g/min。取代 v0.3 的中性線性假設 m=1。',
    source_refs: [GUIDE, TDS910],
    supersedes: 'v0.3 value 1 (engineering_assumption)',
  },
  {
    id: 'material.putty.conductivity',
    value: 9.1,
    unit: 'W/(m·K)',
    evidence: 'published_typical',
    role: '熱阻估算',
    basis: 'TDS Rev C：9.1 W/mK，Hot Disk。',
    source_refs: [TDS910],
  },
  {
    id: 'material.putty.min_bond_line',
    value: 0.18,
    unit: 'mm',
    evidence: 'published_typical',
    role: '間隙下限提醒',
    basis: 'TDS Rev C：Minimum Bond Line Thickness 180 µm（Laird Method）。',
    source_refs: [TDS910],
  },
  {
    id: 'material.putty.contact_resistance',
    value: 0.11,
    unit: '°C·cm²/W',
    evidence: 'derived',
    role: '熱阻估算的兩側接觸熱阻合計',
    basis:
      'TDS Rev C：1.5 mm、80°C／40 psi 熱阻 1.76 °C·cm²/W（ASTM D5470）。扣除體積項 1.5 mm ÷ 9.1 W/mK = 1.65 °C·cm²/W，得接觸項約 0.11。假設該試片厚度即 1.5 mm 且導熱率不隨壓縮改變。',
    source_refs: [TDS910],
  },
  {
    id: 'material.grease.conductivity',
    value: 3.8,
    unit: 'W/(m·K)',
    evidence: 'published_typical',
    role: '熱阻估算',
    basis: 'TDS 2025-06-27：3.8 W/m-K，Hot Disk；A14259-09 料號頁另列 3.50，未取平均。',
    source_refs: [TDS2500],
  },
  {
    id: 'material.grease.min_bond_line',
    value: 0.05,
    unit: 'mm',
    evidence: 'published_typical',
    role: '間隙下限提醒',
    basis: 'TDS 2025-06-27：Minimum Bondline Thickness 50 µm（Laird Test Method）。',
    source_refs: [TDS2500],
  },
  {
    id: 'material.grease.contact_resistance',
    value: 0.02,
    unit: '°C·cm²/W',
    evidence: 'derived',
    role: '熱阻估算的兩側接觸熱阻合計',
    basis:
      'TDS：10 psi & 70°C 熱阻 0.15 °C·cm²/W（ASTM D5470）。若試片 BLT 為最小 50 µm，體積項 0.05 mm ÷ 3.8 = 0.13，接觸項約 0.02；TDS 未列試片 BLT，此推算不確定。',
    source_refs: [TDS2500],
  },
  {
    id: 'material.grease.packaging',
    value: '50cc syringe／600cc cartridge',
    unit: '',
    evidence: 'published_typical',
    role: '包材提示',
    basis: 'TDS 列 50cc 針筒（A14399-03）與 600cc 膠筒（A14259-10）；本模擬的 75 mL／300 mL grease 裝填仍是虛擬比較配置。',
    source_refs: [TDS2500],
  },
  {
    id: 'assembly.gap',
    value: 0.5,
    unit: 'mm',
    evidence: 'engineering_assumption',
    role: '壓合目標間隙預設',
    basis:
      'AI 初估：Tputty 910 為 gap filler（TDS 最小 BLT 0.18 mm、熱阻量測於 1.5 mm），0.5 mm 位於常見 RRU 元件—腔體間隙範圍內；v0.6 的 0.20 mm 太接近最小 BLT。Tgrease 屬薄 BLT 用途，請改小。',
    source_refs: [TDS910, TDS2500],
    supersedes: 'v0.6 value 0.20 (engineering_assumption)',
  },
  {
    id: 'squeeze.air_model',
    value: 'compressible',
    unit: '',
    evidence: 'engineering_assumption',
    since: '1.1',
    role: '壓合時被膠包圍的空氣',
    basis:
      '等溫理想氣體 pV = 常數；氣泡壓力與膜壓聯立隱式求解，氣/膠介面可雙向移動（氣泡隨膠流遷移，理想條件下約為膠流速度兩倍，Taylor & Saffman 1959），膠牆排空時氣泡接通大氣即排出。取代 v1.0「被包圍即凍結」的剛性牆；剛性牆與全部排出保留為對照選項。',
    source_refs: ['Taylor & Saffman, Q. J. Mech. Appl. Math. 12 (1959) 265'],
    supersedes: 'v1.0 rigid trapped air (engineering_assumption)',
  },
  {
    id: 'squeeze.press_force',
    value: 10,
    unit: 'kgf',
    evidence: 'engineering_assumption',
    since: '1.1',
    role: '透明板定力壓合到墊片',
    basis: 'AI 初估：手壓或簡易治具量級。壓合時間與壓合中的氣泡壓縮隨之改變；墊片定位後的最終回脹主要由降伏應力決定，對此值較不敏感。下降速度上限另取 1 mm/s（AI 初估）。',
    source_refs: [],
  },
  {
    id: 'material.putty.squeeze_viscosity',
    value: 7000,
    unit: 'Pa·s',
    evidence: 'derived',
    since: '1.1',
    role: '壓合等效牛頓黏度',
    basis:
      '由 90 psi、75 g/min（÷3.2 g/cc）與冪律 m = 2.7（n ≈ 0.37）在虛擬針嘴 Ø3.175 × 10 mm 反推 K ≈ 7.3×10³ Pa·sⁿ，取 1 s⁻¹ 視黏度約 7000 Pa·s（壓合剪切率約 1–5 s⁻¹）。假設 90 psi 全部落在針嘴、未扣除膠筒壓降，偏高；未含剪切稀化。',
    source_refs: [TDS910, GUIDE],
  },
  {
    id: 'material.grease.squeeze_viscosity',
    value: 2500,
    unit: 'Pa·s',
    evidence: 'published_typical',
    since: '1.1',
    role: '壓合等效牛頓黏度',
    basis: 'TDS 2,500,000 cP（23 °C、TF spindle 2 rpm、Helipath），與設備頁的常黏度相同並隨之變動。單點黏度，未含剪切稀化。',
    source_refs: [TDS2500],
  },
  {
    id: 'material.yield_stress',
    value: 'putty 200 / grease 50',
    unit: 'Pa',
    evidence: 'engineering_assumption',
    since: '1.1',
    role: '墊片定位後擋住氣泡回脹（Bingham：Δp = 2τy·L/h）',
    basis:
      'AI 初估，廠商未公開。公開文獻量測 DOWSIL TC-5550 σy ≈ 7–10 Pa、TC-5622 σy ≈ 30 Pa；Tgrease 2500 黏度高約一個數量級故取 50 Pa，Tputty 910 為可保持膠形的 putty 取 200 Pa。以 L = 5 mm、間隙 0.5 mm 計僅擋住 1–4 kPa，故模型預測墊片壓合後氣泡幾乎回脹到 1 atm 體積。',
    source_refs: [NAGRANI],
  },
  {
    id: 'thermal.power',
    value: 25,
    unit: 'W',
    evidence: 'engineering_assumption',
    role: '溫升估算',
    basis: 'AI 初估：5G RRU 功放／FPGA 類單顆元件量級；請改為實際功耗。',
    source_refs: [],
  },
]);

const UPDATE_IDS = new Set(PARAMETER_UPDATES.map((p) => p.id));

/** Registry with v1.0 updates applied (idempotent). */
export function withUpdates(registry) {
  if (registry.__v1) return registry;
  const parameters = [...registry.parameters.filter((p) => !UPDATE_IDS.has(p.id)), ...PARAMETER_UPDATES];
  return { ...registry, parameters, update_version: '1.0', __v1: true };
}

export function parameterValue(registry, id) {
  return withUpdates(registry).parameters.find((p) => p.id === id)?.value;
}
