// Material cards used outside the flow model (colour, thermal, bond line). Values are the
// public TDS typicals recorded in 03_Laird代表材料_Tgrease2500與Tputty910.md, not lot measurements.
export const MATERIALS = Object.freeze({
  putty: {
    key: 'putty',
    name: 'Tputty 910',
    vendor: 'Laird',
    kind: '單劑 thermal putty（陶瓷填充矽系）',
    conductivity: 9.1, // W/(m·K), Hot Disk, TDS Rev C
    minBondLine: 0.18, // mm, Laird method
    contactResistance: 0.11, // °C·cm²/W, derived from TDS D5470 1.76 at 1.5 mm (see parameters.js)
    temperatureRange: '-40～180 °C',
    packaging: '30cc 針筒／75cc EFD 56cc（179 g）／180cc 159cc／300cc 鋁筒 300cc（960 g）',
    density: 3.2,
    color: 0xe0868a, // 官方色名「淡紅」近似
    colorName: '淡紅（近似）',
    source: 'THR-DS-Tputty 910 Rev C 2025-04-22',
  },
  grease: {
    key: 'grease',
    name: 'Tgrease 2500',
    vendor: 'Laird',
    kind: '非矽 thermal grease',
    conductivity: 3.8, // W/(m·K), Hot Disk, TDS 2025-06-27 (料號頁另列 3.50)
    minBondLine: 0.05,
    contactResistance: 0.02, // °C·cm²/W, derived from TDS D5470 0.15 at 10 psi assuming 50 µm
    temperatureRange: '-55～150 °C',
    packaging: '50cc 針筒（A14399-03）／600cc 膠筒（A14259-10）',
    density: 3.4,
    color: 0xd9dbd6, // 官方色名「灰白」近似
    colorName: '灰白（近似）',
    source: 'MKT-DOC-1592 Tgrease 2500 Data Sheet 2025-06-27',
  },
});

