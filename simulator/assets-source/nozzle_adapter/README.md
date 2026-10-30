# 泛用針嘴接頭：編輯與重建

此接頭是為本模擬器創作的視覺工程示意，不是品牌 CAD、實測零件或流道規格。它不決定出膠內徑，也不可作為採購與裝配圖。

- `nozzle-adapter.blend`：可在 Blender 5.2.1 LTS 開啟的可編輯來源，含各個獨立部件與底座定位 datum。
- `build_nozzle_adapter.py`：由零重建 `.blend` 並匯出 `../../public/assets/nozzle-adapter.glb`。
- `validate-glb.mjs`：以專案相同的 Three.js GLTFLoader 重載匯出品，驗證單位與位置。
- `render_preview.py`：在背景產生光照預覽，不修改 `.blend`；`nozzle-adapter-preview.png` 是此 Blender 的獨立預覽，不能代替模擬器中的視覺驗收。

## 座標與裝配

Blender 尺寸為公尺，Z 向上。基準位於零件軸心與底部平面：`(0,0,0)`。中空孔徑 10.1 mm，顯示本體最外包圍盒 X 14.5、Y 16.611、Z 16 mm。這些為本視覺假設，不是原廠尺寸。

glTF 依規格以公尺、Y 向上輸出，放在 Three.js Group 後設 `scale.setScalar(1000)`、`rotation.x = Math.PI/2`，即可轉為模擬器的毫米與 Z 向上。其底面以工具局部 Z 等於可視針嘴外形長度定位（R75 為候選 63.5 mm，P300 沿用設定長度）；此值不改變 `config.nozzleLength` 的等效流道計算，保持 X、Y 軸心為 0。不可非等比例縮放。

上套環應與供料頭的接合處實際接觸；不同設備的周圍機構需另外確認，不可因局部裝飾改善而宣稱整台為精確實機。實際虛擬針嘴外形及動態參數仍由模擬器控制，與接頭孔徑分離。

## 指令

於 simulator 目錄執行：

```powershell
& 'C:\Program Files\Blender Foundation\Blender 5.2\blender.exe' --background --factory-startup --python 'assets-source\nozzle_adapter\build_nozzle_adapter.py'
node assets-source\nozzle_adapter\validate-glb.mjs
& 'C:\Program Files\Blender Foundation\Blender 5.2\blender.exe' --background --factory-startup --python 'assets-source\nozzle_adapter\render_preview.py'
```

驗證包圍盒容許 0.015 mm 浮點差；本次導出為 7 meshes、12,000 triangles、427,760 bytes，無外接貼圖與解碼器。因 Blender 加工或版本變更，檔案位元組數未必一致，應重新執行檢查與預覽。
