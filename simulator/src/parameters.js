// v1.0 parameter updates layered over data/engineering_defaults_v0.3.json. The original research
// registry file stays unchanged; every value here records its evidence and source like the registry.
const GUIDE = 'sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf';
const TDS910 = 'sources/Laird/Tputty910_TDS_20250422_RevC.pdf';
const TDS2500 = 'sources/Laird/Tgrease2500_TDS_20250627.pdf';

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
