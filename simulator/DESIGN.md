# 點膠研究室 · 機構與實作契約

## v2.1.0（2026-11-06）

- `deposit.js`：
  - 每一小步的膠是均勻厚度的圓盤（`stamp`），半徑＝該處膠條寬的一半，中心在針嘴下方；邊緣在一格內漸變，體積依實際格數正規化，完全守恆。
    - 圓盤沿直線掃過的橫切面 ∝ √(1 − (2u/w)²)，就是原本的半橢圓（Abel 投影），所以直線膠條、膠高、壓扁規則都不變；
    - 轉角外側是半徑 w/2 的圓角；90° 尖角內側最多約 √2 倍膠高（原本兩條長條重疊是 2 倍，外側還缺一角）；起點、終點是圓頭。
  - 寬度沿路徑在格邊界之間線性變化（`nodeW`），每格的膠量依同樣的橫截面（寬 × 高）分配（`share`）；路徑兩端的格邊界沿用相鄰格的值，因為圓盤本身會把端點收圓。
  - 剛鋪的膠排隊到針嘴移過圓盤前緣 `behind`（＝小步長 + 2 格）之後才併入膠面（每筆記錄 `{s, x, y, r, v}`，併入時才畫圓盤），所以針嘴不會把自己剛鋪的膠當成下面的膠。
- `compression.js`：每一幀多記錄 `air`（每格空氣比例 0–255：剛性夾氣 255，可壓縮氣泡＝1 − 膠的填滿比例）。
- `compression-scene.js`：膠層頂點顏色依平滑後的空氣比例，混入選定的夾氣顏色（混合比例 min(1, 1.8 × 空氣比例)），換顏色時重畫；底部色塊保留，在膠層破洞處可見。舊結果沒有 `air` 時改用 `trapped`。
- `main.js`：最佳化表格的膠條欄加上「內徑 x mm」。

## v2.0.1（2026-11-06）

- `optimize.js`：
  - `passMargin(worst, goals, cell)`：複核最差點離目標多遠。溢出在格中心量，約以一格為單位跳動；最差溢出離上限不到一格（`cell` = 複核網格）時 `marginal`。覆蓋不判邊緣：標稱膠量＝窗口左界 ÷ (1 − 容差)，−容差那一點本來就貼在覆蓋目標上，各組的差別都在網格誤差內（約每 mm 格寬 0.5 個百分點，`coverageNoise`）。
  - `resultOrder(list, { goals, cycleRef, settled })`：結果排序（原本是 `optimizeSettings` 內的 `orderFor`）。達標組：3% 膠量段 →（`settled` 時）邊緣達標排在同段穩健者之後 → 製程成本 0.15 一級 → 週期 → 窗口餘裕；其餘依差距。選誰複核時不看邊緣，複核結果不會再引發更多複核。
  - `verifyOne`：回傳 `passMargin` 與 `marginal`（只有達標才可能為 true）。
  - 複核名單 `due`：前 `verify` 名，加上每種圖樣第一個（排序最前）窗口夠寬的；它複核沒過，就換同種圖樣的下一個。多圖樣搜尋時，每種圖樣都有確定的判定，不會因為別的圖樣排在前面而停在「待複核」。
  - `planSearch`：`leaders`、`checked` 為整體前幾名的找窗口、複核組數；`keep`、`verify` 為加上每種圖樣最好一組後的上限（時間估計與進度用）。
- `main.js`：
  - 判定「邊緣達標」（`.mid-badge`，綠色虛框），說明列出最差溢膠與離上限的距離；「達標」也列出餘裕。
  - 建議設定若是邊緣達標，警示並指出第一個穩健的達標列與多用的膠量。
  - 精細度說明、表頭與說明頁加上邊緣達標與每種圖樣複核；存成情境時來源註明「邊緣達標」。

## v2.0.0（2026-11-06）

- `engine.js`：
  - `powerLawTubeFlow(K, n, ΔP, d, L)`：冪律圓管流量 Q = πn/(3n+1)·(ΔP/2KL)^(1/n)·R^(3+1/n)，n = 1 為 Hagen–Poiseuille。
  - `steadyFlow`：R75 grease 改用 `powerLawTubeFlow(viscosity, flowIndex)`。`flowIndex` 預設 0.4（`grease_proxy.flow_index`），缺值時當 1。
  - `pasteRheology(c)`：出膠與壓合共用的 {K, n}。
    - grease：`viscosity` 與 `flowIndex`；
    - putty：n = 1/m，K 由參考流率在參考管反推。
  - `calibrateFlow(config, g, s, second)`：
    - 單點：grease K × ratio^(−n)，putty 參考流率，P300 效率；
    - 第二組不同壓力：m = ln(Q₂/Q₁)/ln(P₂/P₁)，grease n = 1/m、putty m，再由第一組定 K 或參考流率；
    - 回傳 `fits`。
  - `startDwell`（起點出膠等待，MOTION_DEFAULTS）：`withStartDwell(motion, d)` 包住運動，at、timeAt、duration 平移 d；`motion.travel` 為純移動時間，平均速度不含等待。
  - `airScale(c)`：R75 的 tauOn、tauOff 乘以 (75 − fill + 5)/(75 − 56 + 5)，用在 `planRun` 的 `pulse` 與 tailEnd；P300 為 1。`R75_AIR` 匯出。
- `compression.js`：
  - `squeezeRaster` 新增 `flowIndex`。
    - 冪律膜流的格面導流：κ = c·h^(2+1/n)·K^(−1/n)·Δt·Δx^(1−1/n)，c = 2n/(2n+1)·2^−(2+1/n)；乘上 φ = |∇p|^(1/n−1)。
    - |∇p| 是格面法向差（含前緣 ghost 權重）與兩側格切向中央差平均的合成。只用法向差時，斜向膠流會慢約 25%。
    - `reweight` 在每次 solve 內迭代 φ：先依暖啟動的壓力全量更新，之後以 β = n 做幾何混合；壓力相對變化 < 1e-2（`PICARD_TOL`）或 30 次即停。
    - 單位解的壓力 ∝ κ^(−n)，所以 κ = (unitLoad/F)^(1/n)；暖啟動的倍率改為 κ^n；dt = κ/κ(h, 1)。
    - n = 1 時不迭代，結果與 v1.9 逐位相同。
  - `squeezeRheology`：預設改取 `pasteRheology`；選項可覆寫 `viscosity`（K）、`flowIndex`、`yieldStress`。
  - 間隙 < 1.5 × 最小 BLT 時警告；壓合超過 120 s 的說明改為「最後一段最慢，膠層可能停在比墊片厚處」。
- `main.js`：
  - 設備頁：grease 顯示「稠度 K（1 s⁻¹ 視黏度）」與「剪切變稀指數 n」；校正可填第二組壓力；響應說明列出目前裝填下的實際時間常數。
  - 路徑頁：「起點出膠等待」。
  - 壓合條件：稠度 K、剪切變稀指數 n（預設與出膠相同）。
  - 載入情境時，存檔後才新增的欄位取預設值。
- `parameters.js`：`grease_proxy.flow_index`、`grease_proxy.constant_viscosity`（改為 K）、`squeeze.rheology`。
- 驗證：定體積圓盤定力壓合的冪律解析解 t = (h₂^(1−a) − h₁^(1−a))/(C(a−1))，a = 5(n+1)/2n。

## v1.9.0（2026-11-06）

- 新 `deposit.js`：一份鋪膠膠面（膠厚 height field），3D、疊高檢查、最佳化與壓合共用。
  - `fieldGrid(run)`：涵蓋整條路徑加最寬可壓寬度與膠堤；格寬＝一般膠條寬 ÷ 6，限 0.02–0.1 mm、≤ 60 萬格。
  - `createDepositor(run, grid)`：依弧長（出膠順序）每格切成 `ceil(2·cellLength/格寬)` 小步。每一小步：
    - 先把超過 `exclude`（小步長 + 2 格）以前鋪的膠併入膠面，剛鋪的不讓自己的針嘴看到；
    - 針管前半圈（外徑由 `needleOuterDiameter` 查規格表）掃過、高出針尖（`standoff`）的膠推到所在那側的膠堤（寬約外徑一半，越外越薄）；
    - 讀內徑下 5 點的膠高 `under`，剩餘間隙 `standoff − under`；新膠條寬度＝該格乾淨工件寬 × `pressedWidth(A, 剩餘間隙) / pressedWidth(A, standoff)`，規則同 `beadProfile`（放得下保持自然比例，放不下壓到間隙高並在 `內徑 + 2×間隙` 內變寬，再放不下就堆在針旁）；
    - 半橢圓截面雙線性鋪上，進待併入佇列。
  - 每格記錄最新鋪膠的弧長位置（`laid`）。弧長差大於 `revisit`（max(3 × 一般膠條寬, 2 × 外徑, 1 mm)）的膠算「前一趟」，用來區分重複經過與轉角自己折回。
  - 針尖碰到前一趟的膠（`under ≥ 0.98 × standoff` 或推到前一趟的膠）時，累計 `contactMm` 並記第一次的位置。
  - `lay(state, i, volume, until)`：`until` 是針嘴已走到的弧長；只在走過的地方推膠，整條預設為路徑長，不推路徑終點之後只是針嘴範圍的格子。
  - `clone` 只複製膠面、`laid`、tiles 和佇列參照；`finish` 併入全部。
  - 每格的乾淨寬度用整條 run 的 `beadProfile`（與單趟模型一致）；畫面中還在出膠的格依本幀膠量照規則縮放，所以能從任一已完成的格接著鋪。
  - `depositField(run, {deposits, until})` 回傳：膠面、`maxHeight` 與位置、`ploughedMm3`、`earlierPloughedMm3`、`stackedMm3`（落在前一趟上的膠）、`pressedMm3`（被針嘴壓在前一趟上的膠）、`maxBase`、`contactMm`、`lostMm3`（應為 0）。
  - `runField(run)` 依 run 快取。
- `stacking.js`：`stackedBead(run)` 改讀 `runField`。
  - `contact`＝`contactMm > 0`；另回傳 `contactWhere`（`centre`／`vertex`／`path`）、`ploughedMm3`、`stackedMm3`。
  - `overlap` 維持「> 1.15 × 單趟」。
- `compression.js`：直線與圖樣的起始膠面改為把膠面每個細格的膠量放進其中心所在的壓合格（體積完全守恆），壓合範圍依膠面實際範圍。
  - 單點不變。
  - 選項 `field` 可指定膠面（比較用）。
  - 舊的每段半橢圓取樣已移除；`depositSources` 只剩單點使用。
- `scene.js`：移除 `stackBases`、`continuousPathGeometry`；圖樣改用 `DepositTerrain`。
  - 網格頂點只放在完成膠面有膠的格及外圍一圈，沒膠的頂點沉到工件面下 0.05 mm，法向量用中心差分。
  - `show(frame)`：已完成（膠量等於最終值且針嘴已走過）的格接續在 `stable` 狀態上，其餘格每幀重鋪；往回跳就從頭鋪。
  - 頂點約 1.3 萬（使用者米字形），每幀中位數約 2–3 ms，往回拖 7–31 ms。
  - 直線維持舊的 ring 網格（單趟不會疊）。
- `compute-worker.js`／`main.js`：送進 Worker 的 run 加 `pathLength`。
- `main.js`：`stackText(st, standoff)` 改說明針嘴壓膠、推膠已算進膠形與壓合，沒算的是沾針。說明頁「疊高」同步更新。

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
