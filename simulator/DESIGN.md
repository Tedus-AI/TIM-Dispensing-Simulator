# 點膠研究室 · 機構與實作契約

## v1.8.3（2026-11-05）

- `scene.js`：
  - `stackBases(rings, widths, heights)`：依弧長順序（即鋪膠順序），每個 ring 的底高＝它落在的先前膠條頂面（該段的底高 + 半橢圓在該橫向距離的高度，取最大）；
  - 自己剛鋪的 ring（弧長差 ≤ 寬度 + 一格）不算，之後以斜坡過渡，回程爬上去程膠條；
  - 線段依包圍盒（加半寬）放進網格以便查找；
  - `beadGeometry(..., { stack })` 把 ring 與底面抬高到底高；`continuousPathGeometry` 開啟，直線與單點不開；
  - `userData.maxBase` 供檢查。
- 只改畫面：壓合仍用各趟膠量加總（`depositSources`），疊高檢查仍用 `stacking.js` 的體積相加。

## v1.8.2（2026-11-05）

- `stacking.js`：`stackedBead(run)`（依 run 快取）：
  - 每個沉積來源（`depositSources`）以自己的半橢圓截面，雙線性分配到細網格（至少 6 格跨一般膠條、≤ 0.1 mm、≤ 50 萬格），各趟相加；
  - 回傳最高點的高度、位置與所在（`centre`／`vertex`／`path`），以及 `single`（單趟最高）、`overlap`（> 1.15 × 單趟）、`contact`（overlap 且 > 1.05 × 針距）；
  - 單點不疊。
- `beadMatch`：加 `buried`（單趟高於針距）、`stack`；`drags`＝`buried` 或 `stack.contact`，所以 `beadDeviation` 與 `processCost` 會把疊膠碰針當埋針加 1。
- 排序改為可遞移的鍵：
  - 達標者依膠量分段 `bandOf(膠量, 最少膠量, 3%)`，再依 `costStep`（成本每 0.15 一段）、週期、餘裕；
  - 篩選依標稱膠量分段（2%）、成本段、標稱；
  - 原本「兩兩相差 3% 以內比成本」不可遞移，排序結果會依比較順序而變。
- `main.js`：`shapeKpi(s, c, run)` 顯示疊高（碰針時 `疊高 x mm > 針距`，警示色）；碰針說明 `stackText` 放在提醒清單最前面；最佳化膠條欄加「疊膠碰針」。

## v1.8.1（2026-11-05）

- `optimize.js`：`GAUGES`（整數 G 數與內徑：14–25G 為 Nordson EFD 一般針頭值，其餘為標準壁厚針管）；`NEEDLES`＝自動選擇的候選，只含整數 G 數；`NOZZLE_PRESETS`＝設備頁選單（加 1/8 吋）；`needleLabel` 依選單命名；`gaugeTable()` 產生對照表文字。
- `main.js`：`nozzleFields` 在「驅動與針嘴」放「針頭規格」選單（`#sel-nozzle`，選了即 `tryRecompute` 新內徑；「自訂」聚焦內徑欄並顯示最接近的 G 數）與內徑欄（hint＝對照表）；結果卡與膠條說明的匹配內徑附最接近的 G 數（0.2–4.3 mm 以外不標）；膠量列建議改說「針頭規格選 xxG」。

## v1.8（2026-11-05）

- `engine.js`：
  - `planRun(c)` 把路徑、運動、時間與出膠閉式解從 `simulate` 抽出，`simulate` 與新的 `runTiming` 共用；
  - `runTiming(config)` 不逐步模擬，回傳最終沉積（＝`simulate(...).summary.deposited`）、週期、總時間、`fits`（≤ `RUN_LIMIT` 180 s）；
  - `calibrateFlow(config, grams, seconds)`：R75 grease → `viscosity ÷ ratio`，R75 putty → `referenceRate × ratio`，P300 → `efficiency × ratio`，附 `inRange`。
- `tuning.js`：`tuneForVolume` 的試探改用 `runTiming`，只有最後的設定做 `simulate`；`BOUNDS` 匯出；`tuneDose` 在改速度後仍到極限時回傳 `motionAtLimit`。
- `path-planning.js`：`star`（米字形）：中心→8 個尖端（矩形：四角與四邊中點；圓形：每 45°）各來回一次，起訖在中心。
- `optimize.js`：
  - `searchSpace` 的幾何不再含速度；速度搜尋時回傳 `speeds`（範圍內 12 個，自動範圍另含目前速度）；
  - `autoRanges.speed`＝[max(1, min(s0/4, L/60)), min(800, max(2·s0, L/5))]，L＝目前路徑長；
  - `chooseProcess(config, { speeds, needles, nominalMl, lowMl, needMl, knob, cycleRef })`：每個速度一次 `runTiming`，針嘴出膠量依 `steadyFlow` 比例換算；條件 `capTop ≥ needMl` 且 `capLow ≤ lowMl`（drive knob）；成本＝`beadDeviation`＋max(0, ln(cycle/cycleRef))；沒有符合者先取到得了上限的，再取出最多的；
  - 搜尋前每組幾何呼叫一次 `chooseProcess`：`needFactor`＝上篩選膠量 ×(1+tol)，`lowFactor`＝下篩選膠量 ×(1−tol)；整組都超過 180 s 的略過（`sizing.tooSlow`），出不了膠的計入 `sizing.limited`；
  - 快取鍵含速度與針嘴（`gid`）；
  - `processCost`＝膠條＋週期＋（`headroom === false` 時 0.5）；排序：達標者膠量差 > 3%（`MATERIAL_TIE`）先比膠量，否則比成本（差 > 0.15），再比週期、餘裕；篩選估計膠量差 ≤ 2% 時先比成本；
  - 窗口結果加 `capFactor`（未達到的評估中實際鋪出的最大倍數）、`supportedTol`＝(fOvf − fCov)/(fOvf + fCov)；複核點加 `laid`、`capped`、`fallback`，候選加 `headroom`；
  - `OPTIMIZE_DEFAULTS.nozzle`＝`'auto'`（`'match'` 視為 `'auto'`），`VARS_DEFAULT.speed.search`＝true。
- `compute-worker.js`：`tune` 到不了目標時用 `chooseProcess` 找較粗的針嘴，回傳 `suggest`。
- `main.js`：
  - `migrateOptOptions`：舊版存的最佳化設定沒有 `version: 18` 時，針嘴與速度兩項改用新預設；
  - 設備上限文字：`capWhy`（針嘴、壓力上限、速度）、窗口欄「設備上限」、最接近的取捨、膠量點 `laidNote`、`moved` 的「速度已到下限」；
  - 設備頁「用實測出膠量校正」群組與 `cal-apply`；
  - `renderTab` 只在同一分頁重繪時保留群組展開狀態與捲動位置；
  - 圖樣切換失敗時退回並重繪；`.patterns` 改 6 欄。

## v1.7（2026-11-05）

- 說明元件：
  - `tip(text)` 產生帶 `data-tip` 的小圓圈問號；任何元素加 `data-tip` 也會有說明。
  - 只有一個 `#tipbox`（`popover="manual"`），在 top layer 顯示，所以不會被對話框或捲動區裁掉，也能顯示在 modal 對話框上方。
  - 觸發方式：pointerover／focusin 顯示，pointerout／focusout／scroll 隱藏；位置在目標下方，靠近視窗底部時放上方。
  - 不支援 popover 的瀏覽器退回 `title`。
- `num`／`select` 的 hint、`group` 的 note、`kpi` 的說明都改成「?」；分頁開頭段落併入對應欄位或群組。
- 最佳化視窗：
  - `.dialog.resizable`（CSS `resize: both`），預設 1440 × 920 px；
  - 使用者從右下角拖曳後，大小記在 `tim-opt-size`；
  - 結果表合併幾何欄，判定用短標籤加 `data-tip`。
- 複核結果帶 `bandPoints`（每個膠量點的覆蓋、溢膠、夾氣），供說明列出最差點。
- `beadMatch.speedRatio`＝內孔截面 ÷ 實際膠條截面（`deposited / pathLength`），等於平均移動速度 ÷ 出膠速度；另回傳 `averageSpeed`。
- `beadDeviation`：離 0.7–1.5 的對數距離，埋針加 1。膠量相差 1% 內時先比它（差 > 0.2）再比週期。
- 移除圖樣比較（介面、`compare` 背景工作、匯出欄位）。
- 夾氣顏色：
  - `createCompressionScene(..., { voidColor })` 與 `setVoidColor`；
  - `DispenseScene.setVoidColor` 記住顏色，下次壓合沿用；
  - 選擇存在 `tim-void-color`，未選時 Tputty 用藍、Tgrease 用洋紅。

## v1.6（2026-11-04）

- `searchSpace(config, heat, n, vars, knob)` 產生幾何清單：
  - 每組幾何記錄自己的路徑種類（蛇形、螺旋、單點、中心線，或目前的 N、外框、直線）與該種類用得到的變數（間距、內縮、螺旋起點、速度）；
  - 未搜尋的變數用目前值；
  - 範圍為自動或使用者輸入；
  - `varies` 記錄哪些變數有變化，供介面決定欄位。
- 每組幾何的膠量旋鈕依其路徑種類：單點用 `pointKnob`（預設開膠時間），其餘用 `knob`；速度是膠量旋鈕時不搜尋速度（`speedLocked`）。
- 換成單點時點位放在熱源中心。
- 篩選後除了整體前幾名，每種路徑的最佳組也找膠量窗口；`planSearch` 的找窗口組數含這些。
- 快取鍵與結果比對改用幾何鍵（種類、間距、內縮、起點、速度）＋針嘴。
- 背景計時若在搜尋進行中完成，結果丟棄、搜尋後重測。

## v1.5（2026-11-04）

- 自動最佳化重新審核後的修正：
  - **篩選膠量**：改在「決策區」篩選。下限 f_a = 1.1 × 覆蓋目標／100（膠量不可能覆蓋超過自己的面積），上限 f_b = f_a × (1 + 容差)／(1 − 容差)。
  - **窗口估計**：未覆蓋面積對膠量取指數衰減、下限為體積限制 goal/100；溢膠取線性。
  - **驗證方式**：以三組熱源、六組目標的劑量階梯真值比對。v1.4 的中段單一膠量篩選與初版兩點線性外推都會漏掉最佳幾何。
  - **複核**：沿排序一路複核，直到前幾名都已複核；只有細網格、容差內全部膠量點都達標才算 pass。
  - **設備達不到的膠量**：算未達標。
  - **找窗口**：從篩選已得到的區間開始二分。
  - **下限提示**：覆蓋邊界貼在膠量下限時標示。
- `tuneForVolume` 改為對數空間的夾擠割線法：
  - 從目前設定出發，斜率初值 1；
  - 割線步跨出區間，以及每第四步，改用二分；
  - 收斂到 0.1%，通常 3–6 次模擬（原為固定 26 次）；
  - 範圍端點精確夾住，避免 exp(log(100)) 超過 100 psi；
  - 目標超出範圍且膠量已不隨設定改變（加速度限速）時，回傳膠量相同中最不極端的設定。
- `optimizeSettings` 改為 async：
  - 每次評估（`evaluateTask`：反推膠量 + 壓合）可由 `evaluate` 交給 Worker 池並行。
  - 兩條二分鏈在每組幾何內並行，各組幾何也並行。
  - 結果與完成順序無關（測試以亂序完成驗證）。
  - `onPartial` 在每個階段交出目前結果，停止時保留。
- 四個精細度 `SEARCH_LEVELS`（候選數、篩選膠量數、找窗口組數、二分次數、複核組數與膠量點、篩選／複核網格）。
- 時間估算：`calibrateTask` 預熱後計時一次反推與 1.0／0.5 mm 兩次壓合，`squeezeMs` 以格數冪次外插（細於 0.5 mm 時冪次 ≥ 1.8，上限 90,000 格），`estimateSeconds` 依計畫與 Worker 數估牆鐘時間。

## v1.4（2026-11-04）

- 介面依新案子的流程重排：
  - 膠量列固定在分頁上方：目標可用 × 需求、mL、g；調整方式為 drive 或 motion，記在 `tim-dose`。
  - 五個分頁依序為熱源工件、膠材設備、路徑、收尾、壓合。
  - 圖樣比較、自動最佳化、情境比較放在頂部工具列。
  - 模擬壓合與存成情境只留在結果卡。
- `tuning.tuneDose(config, target, knob)` 的兩種調整方式：
  - drive 先在範圍內調驅動（R75 壓力 10–100 psi、P300 轉速 10–150 rpm），到極限才把運動設定（速度；單點為開膠時間）往需要的方向調；
  - motion 只調運動設定。
- 膠量列與圖樣比較都在 Worker 執行，最佳化同樣使用 `tuneDose`。
- `optimize.searchSpace` 對直線與單點回傳單一幾何（`geometry: false`），只搜尋膠量窗口；結果附 `knob`（drive／motion）、`motion`、`fallback`。
- 膠形加入針距：
  - 自然高度高於針距時，壓成針距高、寬 = 4A ÷ (π × 針距)，以 `troweledWidth = 內徑 + 2 × 針距` 為上限；
  - 超過上限就保留較高的膠，並以「埋針」警示；
  - 球冠同理；
  - `beadProfile` 先縮放截面使積分體積吻合，再只縮放寬度修掉殘差，體積嚴格守恆。
- 引擎、3D、壓合初始分布共用同一組 `dotDimensions`／`beadProfile`。

## v1.1（2026-10-30）

- 壓合改為定力壓到墊片：每步解 Hele-Shaw 膜壓，步長時間由「膜壓總和 = 壓合力」決定（剛接觸時受下降速度上限限制）；壓板步長自適應，前緣每步約前進一格。
- 夾氣以「氣泡」為單位追蹤：記錄封住時的氣量，pV = 常數，與膜壓用 Newton 隱式聯立（矩陣保持對稱正定，仍用 Jacobi-PCG）。介面格的膠先被推空，空氣才進入下一格，介面維持一格寬；氣泡分裂／合併依空氣體積分配氣量。
- 壓到墊片後進入靜置：只有氣壓超過 Bingham 保持壓力 2τy·L/h 的氣泡繼續回脹，時間步自適應。
- 乾格門檻 1e-3（高於 CG 誤差 5e-5 的 20 倍），避免數值誤差打通假的排氣通道。
- 剛性牆（v1.0）與全部排出保留為 `airMode` 對照。

## v1.0（2026-10-30）

接手後的架構：計算（`engine.js`、`motion.js`、`compression.js`、`tuning.js`）與畫面（`scene*.js`、`compression-scene.js`、`ui/`）分離；所有讀值、3D 姿態與曲線都取自同一個模擬快照。壓合與圖樣比較在 Web Worker 執行。

- 世界座標 1 單位 = 1 mm，Z 向上；TCP 為針嘴出口。近看與熱源特寫只隱藏遮擋的上部機構，不改任何尺寸。
- 3D 依 anatomy 的原則建構「真實、多零件、每個零件都有支撐」的機台，但改為彩色 PBR：鈷藍龍門、鋼質線軌、黑色馬達、隨 X 移動的拖鏈、急停、M6 孔位台面與刻度、治具定位銷與夾具、即時 LCD 的點膠控制器。顏色只是辨識用，不是原廠塗裝。
- 視角框架沿用 anatomy 卡片慣例：左上 Fig. 編號與視角名稱、左下操作提示、右上即時讀值；相機過渡為 480 ms 緩動，尊重 `prefers-reduced-motion`，正式試驗不自動巡演。
- 壓合以平行板 Hele-Shaw 擠壓近似：逐步降板、壓力場推膠、被包圍乾區凍結為夾氣。熱阻為一維估算。
- 查證後的參數更新集中於 `parameters.js`，並在來源表以「v1.0 更新」標記；研究原檔不改。

以下為 v0.1–v0.2 的歷史設計紀錄。

2026-10-26 v0.2 更新：直線預設提前 10 mm 關膠（AI 初估，可設 0 保留原控制）；運動仍到原終點，尾膠結算後才抬針。直線改為共享半橢圓環的連續曲面，依封閉多邊形錐台體積正規化，沒有內部端蓋。第一版以下設計記錄保留歷史；新版驗證與界線見上層第 17 份文件。

使用者於 2026-10-24 明確同意開始工程假設原型。研究原始資料保持不變；本版採第 12、14 份規格。

Anatomy 尺度採 Figure：單一點膠機構，40–80 個主要機械零件，附必要螺絲、刻度。依已核定第 14 份使用 Three.js 深度緩衝渲染，採其細節、遮擋與同一狀態原則；不使用 anatomy SVG 排序引擎，故不冒稱通過該套件專用 audit。世界一單位為毫米。

概念：XYZ 膠頭沿工件路徑移動，出膠響應與時間共同決定每個位置分配到的體積。

建置前零件表：底座 1、四支腳 4、平台 1、Y 軸基座 2、Y 軸導軌 2、端止塊 4、立柱 2、柱腳 2、橫梁 1、橫梁端蓋 2、X 軸導軌 2、X 軸滑塊 2、X 軸馬達 1、聯軸器 1、X 軸螺桿 1、Z 軸背板 1、Z 軸導軌 2、Z 軸滑塊 2、Z 軸螺桿 1、Z 軸馬達 1、工具支架 2、膠筒／PCP 本體 1、上下端蓋 2、轉接頭 1、虛擬直管針嘴 1、料位活塞 1、夾持環 2、治具板 1、支承墊 4、工件 1、定位擋塊 2、銘牌 1；約 53 件主要零件，另有支架螺絲與平台刻度。所有未有工程圖的機架外形均標工程示意。

用戶需求優先於 skill 的裝飾預設：嚴格 35.264° 等角、無正式試驗自動巡演、無軸動作裝飾緩動、近看只取工件與膠頭下端。暫不畫缺少端口資料的供料軟管，以免讓示意路由冒充 1000mm 真實管路；庫存仍完整計入預填流道，介面明列此差異。

計算：解析一階流量積分＋梯形速度運動；固定 1ms 空間分配、10ms 快照。PCP 計量、出口與暫存分帳。關閉後等待尾膠結算再抬針，沒有自由射流模型。直線採分段半橢圓柱，單點球冠；多邊形網格作體積修正，與帳目一致。超針距／外溢／非平面情況標示超出簡化膠形範圍。

工件：GLB、內嵌資源 glTF、STL 的顯示匯入；單位及姿態核對，放置於治具。外接資源 glTF 與 STEP 顯示清楚未支援訊息。複雜工件僅用指定水平點膠面假設，尚未有曲面沉積與完整碰撞求解。
