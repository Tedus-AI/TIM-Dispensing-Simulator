# 跨廠牌 putty／免二次固化 thermal gel 流率佐證

查核日期：2026-10-23。目的：以 Laird 以外廠商的公開資料，評估 Tputty 910 的 75 g/min 與指南約 75 cc/min 兩種讀法的合理性。這是文件交叉研究，沒有量測或廠商確認。

## 1. 結論

跨廠牌資料支持「Tputty 910 的 75 g/min，即約 23.44 cc/min，是合理的初始參考量級」，但不足以證明 910 指南的縱軸誤標。其他免固化 putty 也有約 48 cc/min 的公開典型值；各家配方、出口及流道不同，不能把目前樣本的最高流率當成全產業上限。

研究資料仍暫以 910 新版 TDS 的 90 psi、75 g/min 作為指定配置參考點。指南原始曲線獨立保存，狀態為「單位與完整配置待確認」。「縱軸可能應為 g/min」保留為假說，不能提高為確定事實。

## 2. 比較對象與原始條件

優先選出廠即可點膠、免二次固化的矽基可點膠 gap filler。Parker 使用 GEL 名稱，但明確是已固化、單組分、免二次固化；與 910 的製程類型相近。產品名稱是 putty 或 gel，不能單獨用來判定流變等價。

| 廠商／材料 | 材料類型證據 | 原廠流率 g/min | 密度 g/cc，或比重近似換算 | 體積流率 cc/min（計算） | 原廠出膠條件 |
|---|---|---:|---:|---:|---|
| Parker Chomerics THERM-A-GAP GEL 45 | 單組分、fully cured、免二次固化 | 55 | 比重 3.1 | 約 17.7 | 30cc 針筒、不裝附加針嘴、0.100 吋出口、90 psi |
| Parker Chomerics THERM-A-GAP GEL 75 | 單組分、fully cured、免二次固化 | 30 | 比重 3.4 | 約 8.8 | 30cc 針筒、不裝附加針嘴、0.100 吋出口、90 psi |
| Long Young LYT-GEL400 | 單組分、無後續固化反應 | 50 | 3.25 | 約 15.4 | 30cc EFD、2.5 mm needle、90 psi、60 秒 |
| Waermtimo WT 5921-100T1 | 官網稱 Thermal Conductive Putty、無需化學反應、可再使用 | 125 | 2.6 | 約 48.1 | 30cc、2.54 mm needle、90 psi |
| Laird Tputty 910，TDS 基準 | 單組分、免後固化 | 75 | 3.2 | 約 23.4 | 75cc taper tip、90 psi；TDS 未列出口尺寸 |
| Laird Tputty 910，指南讀圖候選 | 同上 | 若按體積單位換算，約 240 | 3.2 | 圖讀值約 75 | 75cc cartridge、0.125 吋 nozzle；讀取 90 psi 處 |

計算：體積流率 = 質量流率／密度。Parker 欄位是無因次比重，這裡以水密度約 1 g/cc 做工程近似，未把比重單位誤寫成 g/cc。0.100 吋 = 2.54 mm；0.125 吋 = 3.175 mm。Long Young 與 Waermtimo 的 needle 尺寸按原文保留，不能自行補為已知的出口內徑或有效長度。

### 官方來源

1. [Parker GEL 45 官方 TDS](https://www.parker.com/content/dam/Parker-com/Literature/Chomerics/Parker-Chomerics-THERM-A-GAP-GEL-45.pdf)，CHODS1257 May 2026，第 1 頁材料類型、第 2 頁流率與比重。以實際打開的 PDF 版本為準，不採搜尋摘要顯示的舊日期。
2. [Parker GEL 75 官方 TDS](https://www.parker.com/content/dam/Parker-com/Literature/Chomerics/Datasheet-Chomerics-THERM-A-GAP-GEL-75.pdf)，CHODS1025 July 2026，第 1 頁材料類型、第 2 頁流率與比重。
3. [Long Young LYT-GEL400 官方 TDS](https://www.longyoung.com/static/upload/2024/04/09/202404095504.pdf)，2022-10-14，第 1 頁單組分說明、第 2 頁出膠數據；第 2 頁已目視核對。
4. [Waermtimo WT 5921-100T1 官方產品頁](https://www.waermtimo.sg/product/details?id=36)，出膠、密度及免化學反應說明。此頁其他電氣欄位並未納入本研究，亦未驗證整份產品性能。
5. [Laird 910 TDS](https://www.laird.com/sites/default/files/2025-05/THR-DS-Tputty%20910%20RevC.pdf)，2025-04-22 Rev C；[910 指南](https://www.laird.com/sites/default/files/2024-06/A18720-00%20RevA%20Tputty%20910%20%20Dispensing%20Guideline.pdf)，Rev A 第 5 頁。

## 3. 能支持與不能支持的判斷

### 3.1 可支持的部分

- 本次三家外部廠商的四個例子，都用質量流率 g/min 表示可點膠性。因此 910 TDS 用 g/min 並不反常；但不能據此宣稱原廠圖表一定不能用 cc/min。
- 910 TDS 換算的 23.4 cc/min，落在本次樣本約 8.8～48.1 cc/min 的量級內，沒有明顯的量級異常。此範圍僅是所查樣本，並非市場完整分布、統計信賴區間或規格上限。
- Parker 45 與 75 在同樣列示的配置下分別為 55 和 30 g/min，說明相同製程類型也可能明顯不同；不能因外觀都是 putty 而假設流變相同。

### 3.2 不能支持的部分

- 不能由這張表證明 75 cc/min 不可能。Waermtimo 公布約 48.1 cc/min，已比部分樣本高很多；尚無相同完整配置下的 910 對照試驗。
- 不能將 Parker 的 0.100 吋「針筒裸出口」視為 Laird 的 0.125 吋錐形嘴。入口、錐段、直段、有效長度與閥件都影響壓降，大小兩個孔徑不能描述完整流道。
- 不用孔徑四次方把不同品牌流量硬換算到同一針嘴。該簡化關係有牛頓流體、充分發展圓管流等條件；目前沒有這些 TIM 的完整流變或幾何來支持套用。
- 不把單點流率反推成唯一黏度、屈服應力、剪切稀化指數或暫態模型。也不把不同品牌流率平均後當 910 的物性。

### 3.3 證據權重

就選擇初始參考點而言，910 自己新版 TDS 的明確數值優先。先前 607 同材料、不同 Laird 文件的交叉對照，比本次跨品牌量級比較更能定位資料疑點。但兩者都不能取代完整方法與原始數據。

要真正區分「圖軸誤標」與「測試配置不同」，需取得 910 指南原始質量／體積讀值、密度換算方式、針嘴料號與幾何、溫度、出膠時長、壓力量測位置，或以指定實體配置重測。

## 4. 類型不相同的資料如何處理

搜尋也找到 [DOWSIL TC-3065](https://www.dow.com/documents/11/11-4093-01-dowsil-tc-3065-thermal-gel.pdf?iframe=true)，雖標 60 g/min，但屬可固化單劑 thermal gel，且公開表格未完整列出擠出測試的壓力與出口。不能因同為單劑、同叫 gel 就放入免固化 putty 的直接比較。本次不以該數據判定 910 對錯。

## 5. 歸檔狀態

`sources/CrossBrand/` 已保存 Long Young 原始 PDF、Waermtimo 網頁快照與 SHA-256 manifest。Parker 兩份 PDF 已透過網路工具讀取官方內容，但直接下載被網站拒絕；manifest 明列未完成本機歸檔，不填入假雜湊或零位元檔案。Laird 原始資料沿用 `sources/Laird/`。

本次未開始模擬器程式、未採購、未聯絡廠商，也未執行材料量測。
