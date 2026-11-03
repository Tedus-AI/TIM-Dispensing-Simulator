(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const nd="0.3",id="2026-10-24",sd="preimplementation_specification",rd=!1,ad=!1,od="工程假設情境｜未經實機校準",cd={L910_TDS:{url:"https://www.laird.com/sites/default/files/2025-05/THR-DS-Tputty%20910%20RevC.pdf",local:"sources/Laird/Tputty910_TDS_20250422_RevC.pdf",version:"2025-04-22 Rev C"},G2500_TDS:{url:"https://www.laird.com/sites/default/files/2025-07/MKT-DOC-1592%20Tgrease%202500%20Data%20Sheet%2006272025.pdf",local:"sources/Laird/Tgrease2500_TDS_20250627.pdf",version:"2025-06-27"},L910_GUIDE:{url:"https://www.laird.com/sites/default/files/2024-06/A18720-00%20RevA%20Tputty%20910%20%20Dispensing%20Guideline.pdf",local:"sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf",page:5},DM22:{local:"sources/Equipment/Graco_DM22_Manual_3A7931EN_D.pdf",version:"3A7931D",page:26},PCP:{local:"sources/Equipment/Graco_PCP_Repair_3A5364EN_L.pdf",version:"3A5364L",page:40},X100:{local:"sources/Equipment/Nordson_PerformusX_TDS_v110624.pdf"},USER:{description:"2026-10-24 使用者授權：未獲廠商回覆也可先建立有註記的工程預設；本次停在模擬器開發之前。"},METHOD:{url:"https://doc.comsol.com/6.3/doc/com.comsol.help.cfd/cfd_ug_fluidflow_single.06.082.html",description:"用於說明完整非牛頓物性需要額外參數；未拿其軟體預設充當 TIM 物性。"}},ld=JSON.parse('[{"id":"material.putty.density","value":3.2,"unit":"g/mL","evidence":"published_typical","basis":"TDS 典型值；不是此批膠實測。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"material.grease.density","value":3.4,"unit":"g/mL","evidence":"published_typical","basis":"TDS 典型值。","source_refs":["G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"material.grease.viscosity_reference","value":2500,"unit":"Pa.s","evidence":"derived","basis":"2500000 cP /1000；23°C、TF spindle、2rpm、Helipath。","source_refs":["G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.mass_rate","value":75,"unit":"g/min","evidence":"published_typical","basis":"75cc taper tip、90psi；完整幾何及溫度未知。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.pressure","value":90,"unit":"psi","evidence":"published_typical","basis":"原測試值；壓力位置與表壓/絕壓待確認。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.volume_rate","value":0.390625,"unit":"mL/s","evidence":"derived","basis":"75/3.2/60；不是新實測。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"scenario.temperature","value":23,"unit":"degC","evidence":"engineering_assumption","basis":"固定等溫開發基準；不宣稱是 910 原流率試驗溫度。","source_refs":["USER"],"sensitivity_range":[23,23],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"scenario.pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"虛擬氣壓式基準，明確選表壓；不作實機操作建議。","source_refs":["USER"],"sensitivity_range":[30,90],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"scenario.reference_pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"將 TDS 未完整交代的壓力映射到虛擬模型；映射本身是假設。","source_refs":["L910_TDS","USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.id","value":3.175,"unit":"mm","evidence":"engineering_assumption","basis":"借用指南 0.125in 尺度，虛擬等徑圓管；非原測試針嘴。","source_refs":["L910_GUIDE","USER"],"sensitivity_range":[2,4],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.length","value":10,"unit":"mm","evidence":"engineering_assumption","basis":"定義虛擬有效直管長 10mm，不由 7018555 總長反推。","source_refs":["USER"],"sensitivity_range":[5,20],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.reference_id","value":3.175,"unit":"mm","evidence":"engineering_assumption","basis":"固定正規化幾何；換現用針嘴時不能一併改此基準。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.reference_length","value":10,"unit":"mm","evidence":"engineering_assumption","basis":"固定正規化幾何。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.reference_rate","value":0.390625,"unit":"mL/s","evidence":"engineering_assumption","basis":"將 TDS 參考量映射到虛擬基準；非該幾何實測。","source_refs":["L910_TDS","USER"],"sensitivity_range":[0.1953125,0.78125],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.pressure_exponent","value":1,"unit":"1","evidence":"engineering_assumption","basis":"中性的線性壓力起點，不是 HB 的流動指數。","source_refs":["USER"],"sensitivity_range":[0.7,2],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.geometry_exponent_d","value":4,"unit":"1","evidence":"engineering_assumption","basis":"僅作等效牛頓圓管尺度比較；非真實 putty 的幾何律。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.geometry_exponent_L","value":-1,"unit":"1","evidence":"engineering_assumption","basis":"等效直管長度尺度比較。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"grease_proxy.constant_viscosity","value":2500,"unit":"Pa.s","evidence":"engineering_assumption","basis":"暫把單一測試黏度當等效常數；此用法未驗證。","source_refs":["G2500_TDS","USER"],"sensitivity_range":[625,10000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"grease_proxy.reference_rate","value":0.061906507721617925,"unit":"mL/s","evidence":"derived","basis":"虛擬等徑圓管的 Poiseuille 起算值；依上述未驗證常黏度。","source_refs":["USER","G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"derived_check_only","scope":"R75_grease","estimated_by":null,"validated_against_hardware":false},{"id":"r75.cartridge.nominal_volume","value":75,"unit":"mL","evidence":"published_typical","basis":"910 包材標稱容量。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75","estimated_by":null,"validated_against_hardware":false},{"id":"r75.cartridge.initial_fill","value":56,"unit":"mL","evidence":"published_typical","basis":"910 TDS 裝填；grease 配置沿用時屬另行虛擬裝填。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75_putty","estimated_by":null,"validated_against_hardware":false},{"id":"r75.grease.initial_fill","value":56,"unit":"mL","evidence":"engineering_assumption","basis":"為比較採相同虛擬裝填，不宣稱 grease 有此商品包裝。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.cartridge.bore","value":38,"unit":"mm","evidence":"engineering_assumption","basis":"配合 75mL 和已知外形選的虛擬內徑，非 Laird 圖面。","source_refs":["USER"],"sensitivity_range":[36,40],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.cartridge.unusable_residual","value":0.5,"unit":"mL","evidence":"engineering_assumption","basis":"先留少量不可用殘量，便於耗量結算。","source_refs":["USER"],"sensitivity_range":[0,2],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.adapter_dead_volume","value":5,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬氣帽/接頭死體積；首版不另外求解氣動壓縮。","source_refs":["USER"],"sensitivity_range":[1,15],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.hose_id","value":4,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬氣管幾何，不是供應商配件。","source_refs":["USER"],"sensitivity_range":[3,6],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.hose_length","value":1000,"unit":"mm","evidence":"engineering_assumption","basis":"設備旁配置的設計起點，不是量產標準。","source_refs":["USER"],"sensitivity_range":[500,2000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.delay","value":0.03,"unit":"s","evidence":"engineering_assumption","basis":"可觀察起膠延遲的原型種子；無實機證據。","source_refs":["USER"],"sensitivity_range":[0,0.1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.tau_on","value":0.15,"unit":"s","evidence":"engineering_assumption","basis":"整條鏈的合併建立時間常數；不再疊加假氣室或閥動態。","source_refs":["USER"],"sensitivity_range":[0.03,0.5],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.tau_off","value":0.1,"unit":"s","evidence":"engineering_assumption","basis":"整條鏈的合併停止時間常數；不等於實測停膠秒數。","source_refs":["USER"],"sensitivity_range":[0.02,0.4],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.initial_fill","value":300,"unit":"mL","evidence":"published_typical","basis":"910 TDS 實際裝填。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300_putty","estimated_by":null,"validated_against_hardware":false},{"id":"p300.grease.initial_fill","value":300,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬 300mL 裝填；grease 與 DM-22 實機適用性未確認。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.od","value":48.5,"unit":"mm","evidence":"engineering_assumption","basis":"位於設備外徑配對區間內，非實物尺寸。","source_refs":["DM22","USER"],"sensitivity_range":[47,50],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.bore","value":46,"unit":"mm","evidence":"engineering_assumption","basis":"搭配外徑及容量的自洽虛擬尺寸。","source_refs":["USER"],"sensitivity_range":[44,47],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.overall_length","value":220,"unit":"mm","evidence":"engineering_assumption","basis":"小於設備候選 <230mm 邊界，非包材圖面。","source_refs":["DM22","USER"],"sensitivity_range":[210,225],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.unusable_residual","value":3,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬不可用殘量。","source_refs":["USER"],"sensitivity_range":[0,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.id","value":12.7,"unit":"mm","evidence":"engineering_assumption","basis":"自訂 1/2in 內徑情境，不從 607 案例移植為 910 規格。","source_refs":["USER"],"sensitivity_range":[9.5,12.7],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory_geometry","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.length","value":1000,"unit":"mm","evidence":"engineering_assumption","basis":"自訂 1m 管路情境。","source_refs":["USER"],"sensitivity_range":[500,2000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory_geometry","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.initially_primed","value":true,"unit":"boolean","evidence":"engineering_assumption","basis":"起跑時管內已有材料；初始總存量須包含此部分，不能視為免費填管。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.adapter.wetted_dead_volume","value":2,"unit":"mL","evidence":"engineering_assumption","basis":"接頭、計量頭與其他未分解腔體的合併持膠量，不含已另計的軟管與針嘴；不是工程圖量測。","source_refs":["USER"],"sensitivity_range":[0,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.pcp.displacement","value":0.3,"unit":"mL/rev","evidence":"published_typical","basis":"25B192 排量；不是 Laird 升級頭已確認型號。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"p300.pcp.speed","value":60,"unit":"rpm","evidence":"engineering_assumption","basis":"低於候選額定上限的簡單起點；不是材料商建議配方。","source_refs":["USER"],"sensitivity_range":[20,120],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.pcp.volumetric_efficiency","value":1,"unit":"1","evidence":"engineering_assumption","basis":"理想滿腔、無滑漏；不冒稱量測效率。","source_refs":["USER"],"sensitivity_range":[0.7,1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.delay","value":0.02,"unit":"s","evidence":"engineering_assumption","basis":"計量鏈合併延遲種子，無實機依據。","source_refs":["USER"],"sensitivity_range":[0,0.1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.tau_on","value":0.08,"unit":"s","evidence":"engineering_assumption","basis":"計量鏈合併建立時間常數種子。","source_refs":["USER"],"sensitivity_range":[0.02,0.3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.tau_off","value":0.08,"unit":"s","evidence":"engineering_assumption","basis":"第一版與建立時間常數共同設定為0.08s，使用單一守恆輸送響應，避免各自設定造成總體積不一致。","source_refs":["USER"],"sensitivity_range":[0.02,0.3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.supply.air_pressure","value":20,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"只作架構圖顯示情境，不據此計算實際供料能力。","source_refs":["USER"],"sensitivity_range":[10,30],"range_kind":"engineering_scenarios_not_confidence_interval","role":"display_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.supply.pressure_ratio","value":22,"unit":"1","evidence":"published_typical","basis":"DM-22 名義壓力比，乘積不是流動中實測壓力。","source_refs":["DM22"],"sensitivity_range":null,"range_kind":null,"role":"display_only","scope":"P300","estimated_by":null,"validated_against_hardware":false},{"id":"p300.pcp.inlet_pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"入口顯示情境；不當已確認工作窗口，也不直接改變理想每轉量。","source_refs":["USER"],"sensitivity_range":[70,100],"range_kind":"engineering_scenarios_not_confidence_interval","role":"display_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.speed","value":100,"unit":"mm/s","evidence":"engineering_assumption","basis":"在參考平台量程內選擇便於觀察的速度。","source_refs":["USER"],"sensitivity_range":[25,150],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.acceleration","value":500,"unit":"mm/s^2","evidence":"engineering_assumption","basis":"虛擬梯形速度曲線，不是 E3/C300 實測加速度。","source_refs":["USER"],"sensitivity_range":[100,1000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.standoff","value":2,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬針距；首版作間隙檢查，不自動算擠壓與自由射流。","source_refs":["USER"],"sensitivity_range":[0.5,3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"clearance_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.lift_speed","value":20,"unit":"mm/s","evidence":"engineering_assumption","basis":"虛擬抬針速度；不據此預測拉絲。","source_refs":["USER"],"sensitivity_range":[5,50],"range_kind":"engineering_scenarios_not_confidence_interval","role":"kinematics_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.lift_distance","value":5,"unit":"mm","evidence":"engineering_assumption","basis":"點膠後抬升距離。","source_refs":["USER"],"sensitivity_range":[2,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"kinematics_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"job.line_length","value":100,"unit":"mm","evidence":"engineering_assumption","basis":"基準直線，位於兩個平台候選工作包絡內。","source_refs":["USER"],"sensitivity_range":[20,150],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"job.point_gate_duration","value":0.1,"unit":"s","evidence":"engineering_assumption","basis":"泛用 timed-gate 原型事件，不仿真 Graco 自動 Shot 的 PLC 時序。","source_refs":["USER"],"sensitivity_range":[0.05,1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"shape.line_height_to_width","value":0.5,"unit":"1","evidence":"engineering_assumption","basis":"半橢圓截面的幾何比例，非材料接觸角或保形量測。","source_refs":["USER"],"sensitivity_range":[0.25,0.75],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometric_illustration_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"shape.dot_height_to_width","value":0.25,"unit":"1","evidence":"engineering_assumption","basis":"球冠幾何比例，非材料/表面量測。","source_refs":["USER"],"sensitivity_range":[0.1,0.5],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometric_illustration_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"workpiece.width","value":150,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬平板。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"geometry_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"workpiece.depth","value":100,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬平板。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"geometry_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"numerics.initial_timestep","value":0.001,"unit":"s","evidence":"engineering_assumption","basis":"未實作求解器的起始步長規格；仍需步長收斂檢查。","source_refs":["USER"],"sensitivity_range":[0.0005,0.002],"range_kind":"engineering_scenarios_not_confidence_interval","role":"implementation_requirement","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"numerics.mass_balance_relative_tolerance","value":0.001,"unit":"1","evidence":"engineering_assumption","basis":"軟體數值質量平衡目標 0.1%，不是物理準確度。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"implementation_requirement","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"limits.x100_max_pressure","value":100,"unit":"psi","evidence":"published_limit","basis":"候選控制器額定上限，不代表整套配件相容。","source_refs":["X100"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"limits.pcp_max_rpm","value":300,"unit":"rpm","evidence":"published_limit","basis":"3A5364L 規格，不等於高填料實際可用上限。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"limits.pcp_max_working_pressure","value":290,"unit":"psi","evidence":"published_limit","basis":"不是已確認入口上限。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"common.nozzle.initially_primed","value":true,"unit":"boolean","evidence":"engineering_assumption","basis":"初始針嘴已充膠，針嘴容積列入初始總存量；不從當次膠筒重複扣除。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"all","estimated_by":"assistant","validated_against_hardware":false}]'),hd={temperature_dependence:{enabled:!1,reason:"固定23°C，未填假溫度敏感係數"},yield_and_thixotropy:{enabled:!1,reason:"完整物性保持未知，改以等效流量與合併響應"},wall_slip_and_friction_solver:{enabled:!1,reason:"不與合併動態重複計入"},hose_pressure_drop_and_starvation:{enabled:!1,reason:"P300 先用滿腔理想計量，壓力只顯示"},snuffback:{enabled:!1,reason:"第一版無回吸；開啟需另定義守恆、負流量與吸氣"},stringing_and_slump:{enabled:!1,reason:"幾何示意不宣稱材料恢復或斷絲"},compression_thermal_voids:{enabled:!1,reason:"後續階段"}},ud=[{id:"R75_PUTTY_ASSUMED",material:"Tputty 910 參考資料＋工程預設",architecture:"R75",flow_method_candidate:"normalized_reference_flow",hardware_compatibility:"unconfirmed"},{id:"R75_GREASE_ASSUMED",material:"Tgrease-2500 參考資料＋常黏度近似",architecture:"R75",flow_method_candidate:"virtual_newtonian_capillary",hardware_compatibility:"unconfirmed"},{id:"P300_PUTTY_IDEAL",material:"Tputty 910 密度＋理想 PCP",architecture:"P300",flow_method_candidate:"ideal_positive_displacement",hardware_compatibility:"unconfirmed"},{id:"P300_GREASE_IDEAL",material:"Tgrease-2500 密度＋理想 PCP",architecture:"P300",flow_method_candidate:"ideal_positive_displacement",hardware_compatibility:"unconfirmed_grease_viscosity_application"}],Wn={schema_version:nd,created_date:id,stage:sd,implementation_authorized:rd,manufacturer_response_required_to_start_assumption_prototype:ad,global_label:od,sources:cd,parameters:ld,features:hd,profiles:ud},Ta=2e4;function dd(s){const e={shape:"rectangle",pattern:"serpentine",offsetX:0,offsetY:0,spacing:5,edgeInset:2,spiralShape:"auto",spiralDirection:"outside-in",...s};e.shape==="circle"&&(e.depth=e.width);for(const h of["width","depth","offsetX","offsetY","spacing","edgeInset"])if(!Number.isFinite(e[h]))throw new Error(`${h} 必須是有限數值`);if(!["rectangle","circle"].includes(e.shape))throw new Error("熱源形狀不支援");if(!["point","line","n","serpentine","spiral","perimeter"].includes(e.pattern))throw new Error("點膠路徑不支援");if(!["auto","round","square"].includes(e.spiralShape))throw new Error("螺旋形狀不支援");if(!["outside-in","inside-out"].includes(e.spiralDirection))throw new Error("螺旋方向不支援");const t=e.shape==="circle"?e.width:e.depth;if(e.width<=0||t<=0||e.width>1e3||t>1e3)throw new Error("熱源尺寸需介於 0 與 1000 mm");if(e.spacing<.2||e.spacing>1e3)throw new Error("路徑間距需介於 0.2 與 1000 mm");if(e.edgeInset<0||e.edgeInset>=Math.min(e.width,t)/2)throw new Error("邊界內縮須小於熱源最短尺寸的一半");const n=e.width/2-e.edgeInset,i=t/2-e.edgeInset,r=e.spiralShape==="auto"?e.shape==="circle"?"round":"square":e.spiralShape,a=[],o=(h,u)=>{h+=e.offsetX,u+=e.offsetY;const d=a.at(-1);if(!(d&&Math.hypot(h-d.x,u-d.y)<1e-9)){if(a.length>=Ta)throw new Error("路徑點數過多，請增加間距或縮小熱源");a.push({x:h,y:u})}};if(e.pattern==="point")o(0,0);else if(e.pattern==="line")o(-n,0),o(n,0);else if(e.pattern==="n"){const h=e.shape==="circle"?n/Math.SQRT2:n,u=e.shape==="circle"?n/Math.SQRT2:i;o(-h,-u),o(-h,u),o(h,-u),o(h,u)}else if(e.pattern==="serpentine"){const h=Math.max(1,Math.floor(2*i/e.spacing)+1);if(h*2>Ta)throw new Error("蛇形路徑點數過多，請增加間距");for(let u=0;u<h;u++){const d=(u-(h-1)/2)*e.spacing,f=e.shape==="circle"?Math.sqrt(Math.max(0,n*n-d*d)):n;u%2===0?(o(-f,d),o(f,d)):(o(f,d),o(-f,d))}}else if(e.pattern==="perimeter")if(e.shape==="rectangle")o(-n,-i),o(n,-i),o(n,i),o(-n,i),o(-n,-i);else{const h=Math.max(16,Math.ceil(2*Math.PI*n/1));if(h+1>Ta)throw new Error("路徑點數過多，請縮小熱源");for(let u=0;u<=h;u++){const d=2*Math.PI*u/h;o(n*Math.cos(d),n*Math.sin(d))}}else if(r==="square"){const h=e.shape==="circle"?n/Math.SQRT2:n,u=e.shape==="circle"?n/Math.SQRT2:i;let d=-h,f=h,g=-u,_=u;for(o(d,g);o(f,g),g+=e.spacing,!(g>_||(o(f,_),f-=e.spacing,f<d)||(o(d,_),_-=e.spacing,_<g)||(o(d,g),d+=e.spacing,d>f)););o(0,0)}else{const h=Math.min(n,i),u=2*Math.PI*h/e.spacing;let d=0;for(o(h,0);d<u;){const f=Math.max(0,h-e.spacing*d/(2*Math.PI));d=Math.min(u,d+Math.min(.18,1/Math.max(1,f)));const g=d===u?0:Math.max(0,h-e.spacing*d/(2*Math.PI));o(g*Math.cos(d),g*Math.sin(d))}a[a.length-1]={x:e.offsetX,y:e.offsetY}}if(!a.length)throw new Error("無法生成點膠路徑");e.pattern==="spiral"&&e.spiralDirection==="inside-out"&&a.reverse();const c=[0];let l=0;for(let h=1;h<a.length;h++)l+=Math.hypot(a[h].x-a[h-1].x,a[h].y-a[h-1].y),c.push(l);return{shape:e.shape,pattern:e.pattern,width:e.width,depth:t,offsetX:e.offsetX,offsetY:e.offsetY,edgeInset:e.edgeInset,spacing:e.spacing,spiralShape:e.spiralShape,effectiveSpiralShape:r,spiralDirection:e.spiralDirection,points:a,cumulative:c,length:l,units:"mm",evidence:"engineering_assumption",note:"幾何候選；未校準流量、轉角速度、點膠寬度、排氣或實際壓合。"}}function xc(s,e){if(!Number.isFinite(e))throw new Error("路徑距離必須是有限數值");if(s.points.length===1)return{...s.points[0],tx:0,ty:0};const t=Math.max(0,Math.min(s.length,e));let n=1,i=s.points.length-1;for(;n<i;){const l=Math.floor((n+i)/2);s.cumulative[l]<t?n=l+1:i=l}const r=s.points[n-1],a=s.points[n],o=s.cumulative[n]-s.cumulative[n-1],c=o?(t-s.cumulative[n-1])/o:0;return{x:r.x+(a.x-r.x)*c,y:r.y+(a.y-r.y)*c,tx:(a.x-r.x)/o,ty:(a.y-r.y)/o}}function Ms(s,e,t){const n=Math.min(e,Math.sqrt(s*t)),i=n/t,r=n>0?Math.max(0,(s-n*n/t)/n):0,a=2*i+r,o=n*i/2;return{kind:"single",length:s,duration:a,peak:n,ramp:i,cruise:r,at(c){if(c<=0)return{x:0,v:0};if(c>=a)return{x:s,v:0};if(c<i)return{x:.5*t*c*c,v:t*c};if(c<i+r)return{x:o+n*(c-i),v:n};const l=a-c;return{x:s-.5*t*l*l,v:t*l}},timeAt(c){return fd(this,s,t,c)}}}function fd(s,e,t,n){const i=Math.max(0,Math.min(e,n)),r=s.peak*s.ramp/2;return i<=r?Math.sqrt(2*i/t):i>=e-r?s.duration-Math.sqrt(2*(e-i)/t):s.ramp+(i-r)/s.peak}function pd(s,e,t,n,i){const r=-(s.x*e.x+s.y*e.y);if(r<=-.999999)return i;if(r>=.999999)return 0;const a=Math.sqrt(.5*(1-r));return Math.min(i,Math.sqrt(t*n*a/(1-a)))}function md(s,{speed:e,acceleration:t,deviation:n}){const i=[];for(let g=1;g<s.length;g++){const _=s[g].x-s[g-1].x,m=s[g].y-s[g-1].y,p=Math.hypot(_,m);p>1e-12&&i.push({length:p,u:{x:_/p,y:m/p}})}const r=i.length;if(!r)return Ms(0,e,t);if(r===1)return Ms(i[0].length,e,t);const a=new Float64Array(r+1);for(let g=1;g<r;g++)a[g]=pd(i[g-1].u,i[g].u,t,n,e);a[0]=0,a[r]=0;for(let g=r-1;g>=0;g--)a[g]=Math.min(a[g],Math.sqrt(a[g+1]**2+2*t*i[g].length));for(let g=0;g<r;g++)a[g+1]=Math.min(a[g+1],Math.sqrt(a[g]**2+2*t*i[g].length));let o=0,c=0,l=e,h=0;for(let g=0;g<r;g++){const _=i[g],m=a[g],p=a[g+1],x=Math.max(m,p,Math.min(e,Math.sqrt((2*t*_.length+m*m+p*p)/2))),y=Math.max(0,(x*x-m*m)/(2*t)),v=Math.max(0,(x*x-p*p)/(2*t)),E=Math.max(0,_.length-y-v);Object.assign(_,{v0:m,v1:p,vp:x,d1:y,d2:E,d3:v,t1:(x-m)/t,t2:x>0?E/x:0,t3:(x-p)/t,start:o,distance:c}),_.duration=_.t1+_.t2+_.t3,o+=_.duration,c+=_.length,g>0&&m<e-1e-9&&(h++,l=Math.min(l,m))}const u=o,d=c,f=(g,_)=>{let m=0,p=r-1;for(;m<p;){const x=Math.ceil((m+p)/2);i[x][g]<=_?m=x:p=x-1}return i[m]};return{kind:"polyline",length:d,duration:u,peak:Math.max(...i.map(g=>g.vp)),corners:h,slowestCorner:h?l:null,junctions:Array.from(a),at(g){if(g<=0)return{x:0,v:0};if(g>=u)return{x:d,v:0};const _=f("start",g),m=Math.min(_.duration,g-_.start);if(m<_.t1)return{x:_.distance+_.v0*m+.5*t*m*m,v:_.v0+t*m};if(m<_.t1+_.t2)return{x:_.distance+_.d1+_.vp*(m-_.t1),v:_.vp};const p=m-_.t1-_.t2;return{x:_.distance+_.d1+_.d2+_.vp*p-.5*t*p*p,v:Math.max(0,_.vp-t*p)}},timeAt(g){const _=Math.max(0,Math.min(d,g));if(_>=d)return u;const m=f("distance",_),p=Math.min(m.length,_-m.distance);if(p<=m.d1)return m.start+(Math.sqrt(m.v0*m.v0+2*t*p)-m.v0)/t;if(p<=m.d1+m.d2)return m.start+m.t1+(p-m.d1)/m.vp;const x=p-m.d1-m.d2;return m.start+m.t1+m.t2+(m.vp-Math.sqrt(Math.max(0,m.vp*m.vp-2*t*x)))/t}}}const el="sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf",Qi="sources/Laird/Tputty910_TDS_20250422_RevC.pdf",es="sources/Laird/Tgrease2500_TDS_20250627.pdf",gd="Nagrani et al., J. Rheol. 67 (2023), doi:10.1122/8.0000679（arXiv 2304.12104）",Ts=Object.freeze([{id:"putty_proxy.pressure_exponent",value:2.7,unit:"1",evidence:"derived",role:"氣壓 → 流率的冪次 m（流動指數 n≈1/m）",basis:"以 Laird A18720-00 Rev A 第 5 頁「75cc cartridge、0.125 in nozzle」Tputty 910 流率—氣壓曲線，300 dpi 數位讀圖 20–100 psi 對數擬合 m=2.73（各點誤差約 2% 內）；取 2.7。曲線縱軸單位（cc/min）與 TDS（g/min）仍待 Laird 確認，故只採用曲線「形狀」，90 psi 的量值仍沿用 TDS 75 g/min。取代 v0.3 的中性線性假設 m=1。",source_refs:[el,Qi],supersedes:"v0.3 value 1 (engineering_assumption)"},{id:"material.putty.conductivity",value:9.1,unit:"W/(m·K)",evidence:"published_typical",role:"熱阻估算",basis:"TDS Rev C：9.1 W/mK，Hot Disk。",source_refs:[Qi]},{id:"material.putty.min_bond_line",value:.18,unit:"mm",evidence:"published_typical",role:"間隙下限提醒",basis:"TDS Rev C：Minimum Bond Line Thickness 180 µm（Laird Method）。",source_refs:[Qi]},{id:"material.putty.contact_resistance",value:.11,unit:"°C·cm²/W",evidence:"derived",role:"熱阻估算的兩側接觸熱阻合計",basis:"TDS Rev C：1.5 mm、80°C／40 psi 熱阻 1.76 °C·cm²/W（ASTM D5470）。扣除體積項 1.5 mm ÷ 9.1 W/mK = 1.65 °C·cm²/W，得接觸項約 0.11。假設該試片厚度即 1.5 mm 且導熱率不隨壓縮改變。",source_refs:[Qi]},{id:"material.grease.conductivity",value:3.8,unit:"W/(m·K)",evidence:"published_typical",role:"熱阻估算",basis:"TDS 2025-06-27：3.8 W/m-K，Hot Disk；A14259-09 料號頁另列 3.50，未取平均。",source_refs:[es]},{id:"material.grease.min_bond_line",value:.05,unit:"mm",evidence:"published_typical",role:"間隙下限提醒",basis:"TDS 2025-06-27：Minimum Bondline Thickness 50 µm（Laird Test Method）。",source_refs:[es]},{id:"material.grease.contact_resistance",value:.02,unit:"°C·cm²/W",evidence:"derived",role:"熱阻估算的兩側接觸熱阻合計",basis:"TDS：10 psi & 70°C 熱阻 0.15 °C·cm²/W（ASTM D5470）。若試片 BLT 為最小 50 µm，體積項 0.05 mm ÷ 3.8 = 0.13，接觸項約 0.02；TDS 未列試片 BLT，此推算不確定。",source_refs:[es]},{id:"material.grease.packaging",value:"50cc syringe／600cc cartridge",unit:"",evidence:"published_typical",role:"包材提示",basis:"TDS 列 50cc 針筒（A14399-03）與 600cc 膠筒（A14259-10）；本模擬的 75 mL／300 mL grease 裝填仍是虛擬比較配置。",source_refs:[es]},{id:"assembly.gap",value:.5,unit:"mm",evidence:"engineering_assumption",role:"壓合目標間隙預設",basis:"AI 初估：Tputty 910 為 gap filler（TDS 最小 BLT 0.18 mm、熱阻量測於 1.5 mm），0.5 mm 位於常見 RRU 元件—腔體間隙範圍內；v0.6 的 0.20 mm 太接近最小 BLT。Tgrease 屬薄 BLT 用途，請改小。",source_refs:[Qi,es],supersedes:"v0.6 value 0.20 (engineering_assumption)"},{id:"squeeze.air_model",value:"compressible",unit:"",evidence:"engineering_assumption",since:"1.1",role:"壓合時被膠包圍的空氣",basis:"等溫理想氣體 pV = 常數；氣泡壓力與膜壓聯立隱式求解，氣/膠介面可雙向移動（氣泡隨膠流遷移，理想條件下約為膠流速度兩倍，Taylor & Saffman 1959），膠牆排空時氣泡接通大氣即排出。取代 v1.0「被包圍即凍結」的剛性牆；剛性牆與全部排出保留為對照選項。",source_refs:["Taylor & Saffman, Q. J. Mech. Appl. Math. 12 (1959) 265"],supersedes:"v1.0 rigid trapped air (engineering_assumption)"},{id:"squeeze.press_force",value:10,unit:"kgf",evidence:"engineering_assumption",since:"1.1",role:"透明板定力壓合到墊片",basis:"AI 初估：手壓或簡易治具量級。壓合時間與壓合中的氣泡壓縮隨之改變；墊片定位後的最終回脹主要由降伏應力決定，對此值較不敏感。下降速度上限另取 1 mm/s（AI 初估）。",source_refs:[]},{id:"material.putty.squeeze_viscosity",value:7e3,unit:"Pa·s",evidence:"derived",since:"1.1",role:"壓合等效牛頓黏度",basis:"由 90 psi、75 g/min（÷3.2 g/cc）與冪律 m = 2.7（n ≈ 0.37）在虛擬針嘴 Ø3.175 × 10 mm 反推 K ≈ 7.3×10³ Pa·sⁿ，取 1 s⁻¹ 視黏度約 7000 Pa·s（壓合剪切率約 1–5 s⁻¹）。假設 90 psi 全部落在針嘴、未扣除膠筒壓降，偏高；未含剪切稀化。",source_refs:[Qi,el]},{id:"material.grease.squeeze_viscosity",value:2500,unit:"Pa·s",evidence:"published_typical",since:"1.1",role:"壓合等效牛頓黏度",basis:"TDS 2,500,000 cP（23 °C、TF spindle 2 rpm、Helipath），與設備頁的常黏度相同並隨之變動。單點黏度，未含剪切稀化。",source_refs:[es]},{id:"material.yield_stress",value:"putty 200 / grease 50",unit:"Pa",evidence:"engineering_assumption",since:"1.1",role:"墊片定位後擋住氣泡回脹（Bingham：Δp = 2τy·L/h）",basis:"AI 初估，廠商未公開。公開文獻量測 DOWSIL TC-5550 σy ≈ 7–10 Pa、TC-5622 σy ≈ 30 Pa；Tgrease 2500 黏度高約一個數量級故取 50 Pa，Tputty 910 為可保持膠形的 putty 取 200 Pa。以 L = 5 mm、間隙 0.5 mm 計僅擋住 1–4 kPa，故模型預測墊片壓合後氣泡幾乎回脹到 1 atm 體積。",source_refs:[gd]},{id:"thermal.power",value:25,unit:"W",evidence:"engineering_assumption",role:"溫升估算",basis:"AI 初估：5G RRU 功放／FPGA 類單顆元件量級；請改為實際功耗。",source_refs:[]}]),_d=new Set(Ts.map(s=>s.id));function Nh(s){if(s.__v1)return s;const e=[...s.parameters.filter(t=>!_d.has(t.id)),...Ts];return{...s,parameters:e,update_version:"1.0",__v1:!0}}function tl(s,e){var t;return(t=Nh(s).parameters.find(n=>n.id===e))==null?void 0:t.value}const vr="1.1.1",xa="工程假設／未經實機校準",Mo=32,lr={id:"ending.shutoff_distance",value:10,unit:"mm",evidence:"engineering_assumption",basis:"AI 初始比較值：預設 100 mm 路徑、100 mm/s、500 mm/s² 對應提前 200 ms 關膠。不是原廠配方；速度或路徑改變後提前時間也會改變。",source_refs:["16_收尾積膠原因與影片比對.md"]},yc=[["endMotion","vertical","","垂直抬針；提供斜退及先升再退，單點僅垂直。"],["endDwell",.1,"s","到達終點後停留 100 ms 再離開；不是從提前關膠時刻起算。"],["backtrackDistance",2,"mm","沿原直線反向回退 2 mm；垂直模式及單點不使用。"],["backtrackSpeed",20,"mm/s","回退速度上限；抬針與回退共用設定加速度。"],["reverseRpm",30,"rpm","理想 PCP 反轉參考轉速；僅回收未出嘴的暫存量。"],["reverseDuration",0,"s","反轉預設關閉；手動比較初值 0.05 s，不能視為原廠配方。"]].map(([s,e,t,n])=>({id:`ending.${s}`,key:s,value:e,unit:t,evidence:"engineering_assumption",basis:n,source_refs:["18_v0.3收尾動作與體積分帳.md"]})),Mc=[{id:"motion.corner_mode",key:"cornerMode",value:"junction",unit:"",evidence:"engineering_assumption",basis:"多段路徑在轉角依 junction deviation 規則降速（CNC 韌體常見作法）；可切回 v0.7「整條弧長單一加減速、轉角不減速」作對照。不是特定機台控制器。",source_refs:["22_v1.0接手全面修正與驗證.md"]},{id:"motion.junction_deviation",key:"junctionDeviation",value:.05,unit:"mm",evidence:"engineering_assumption",basis:"AI 初估：常見 CNC 韌體 0.01–0.05 mm。數值越小轉角越慢、轉角積膠越多；需依實際機台軌跡設定校準。",source_refs:["22_v1.0接手全面修正與驗證.md"]}],Uh=()=>Object.fromEntries(yc.map(s=>[s.key,s.value])),Fh=()=>Object.fromEntries(Mc.map(s=>[s.key,s.value]));function Oh(s,e="putty",t="R75"){const n=Object.fromEntries(Nh(s).parameters.map(o=>[o.id,o.value])),i=o=>n[o],r=t==="P300",a=r?"p300":"r75";return{material:e,architecture:t,profile:r?`P300_${e==="putty"?"PUTTY":"GREASE"}_IDEAL`:`R75_${e==="putty"?"PUTTY":"GREASE"}_ASSUMED`,density:i(`material.${e}.density`),viscosity:i("grease_proxy.constant_viscosity"),pressure:i("scenario.pressure"),referencePressure:i("scenario.reference_pressure"),referenceRate:i("putty_proxy.reference_rate"),pressureExponent:i("putty_proxy.pressure_exponent"),diameter:i("virtual_nozzle.id"),nozzleLength:i("virtual_nozzle.length"),referenceDiameter:i("virtual_nozzle.reference_id"),referenceLength:i("virtual_nozzle.reference_length"),rpm:i("p300.pcp.speed"),displacement:i("p300.pcp.displacement"),efficiency:i("p300.pcp.volumetric_efficiency"),delay:i(`${a}.dynamic.delay`),tauOn:i(`${a}.dynamic.tau_on`),tauOff:i(`${a}.dynamic.tau_off`),fill:i(`${a}.${e==="grease"?"grease":"cartridge"}.initial_fill`),residual:i(`${a}.cartridge.unusable_residual`),hoseId:i("p300.hose.id"),hoseLength:i("p300.hose.length"),deadVolume:i("p300.adapter.wetted_dead_volume"),speed:i("motion.speed"),acceleration:i("motion.acceleration"),standoff:i("motion.standoff"),liftSpeed:i("motion.lift_speed"),liftDistance:i("motion.lift_distance"),mode:"line",lineLength:i("job.line_length"),gateDuration:i("job.point_gate_duration"),shutoffDistance:lr.value,lineRatio:i("shape.line_height_to_width"),dotRatio:i("shape.dot_height_to_width"),width:i("workpiece.width"),depth:i("workpiece.depth"),thickness:5,fixtureHeight:8,surfaceZ:13,offsetX:0,offsetY:0,timestep:i("numerics.initial_timestep"),cellSize:.5,workpieceKind:"plate",workpieceFile:null,...Uh(),...Fh()}}function vd(s){if(s.architecture==="P300")return s.displacement*s.rpm*s.efficiency/60;if(s.material==="putty"){const e=s.pressureExponent;return s.referenceRate*(Math.max(s.pressure,0)/s.referencePressure)**e*(s.diameter/s.referenceDiameter)**(3+e)*(s.referenceLength/s.nozzleLength)**e}return Math.PI*(s.diameter/1e3)**4*(Math.max(s.pressure,0)*6894.757293168)/(128*s.viscosity*s.nozzleLength/1e3)*1e6}function bo(s,e,t,n,i,r){const a=s-n;if(a<=0||e===0||t<=0)return{q:0,volume:0};const o=Math.min(a,t),c=-Math.expm1(-o/i);let l=e*(o-i*c),h=e*c;if(a>t){const u=a-t;l+=h*r*-Math.expm1(-u/r),h*=Math.exp(-u/r)}return{q:h,volume:l}}function xd(s,e,t,n,i,r,a){const o=bo(s,e,t,n,i,i),c=t+n;if(s<=c||r<=0||a<=0||t<=0)return{...o,recovered:0,reverseActive:!1};const l=bo(c,e,t,n,i,i),h=Math.max(0,e*t-l.volume),u=i*Math.log1p(h/(r*i)),d=s-c,f=Math.min(d,a,u),g=r*f,_=Math.max(0,(h+r*i)*Math.exp(-f/i)-r*i)*Math.exp(-(d-f)/i);return{q:_/i,volume:l.volume+h-g-_,recovered:g,reverseActive:d<Math.min(a,u)}}function yd(s,e,t){const n=s.endMotion==="legacy",i=s.mode==="line"&&["diagonal","liftThenBack"].includes(s.endMotion)?Math.min(s.backtrackDistance,s.lineLength):0,r=n?t:e+s.endDwell,a=Ms(s.liftDistance,s.liftSpeed,s.acceleration),o=i>0?Ms(i,s.backtrackSpeed,s.acceleration):null,c=s.endMotion==="diagonal"&&i>0,l=Math.hypot(i,s.liftDistance),h=c?Ms(l,Math.min(s.liftSpeed*l/s.liftDistance,s.backtrackSpeed*l/i),s.acceleration):null,u=r+(n?s.liftDistance/s.liftSpeed:h?h.duration:a.duration+(o?o.duration:0));return{start:r,end:u,back:i,at(d){const f=Math.max(0,d-r);if(n)return{back:0,lift:Math.min(s.liftDistance,f*s.liftSpeed),vx:0,vz:d>r&&d<u?s.liftSpeed:0,phase:"垂直抬針"};if(h){const m=h.at(f);return{back:m.x*i/l,lift:m.x*s.liftDistance/l,vx:-m.v*i/l,vz:m.v*s.liftDistance/l,phase:"斜退抬針"}}const g=a.at(f),_=o?o.at(f-a.duration):{x:0,v:0};return{back:_.x,lift:g.x,vx:-_.v,vz:g.v,phase:f<a.duration?"垂直抬針":"抬高後回退"}}}}const Md={pressure:[0,100],diameter:[.2,8],nozzleLength:[1,100],rpm:[0,300],efficiency:[0,1],density:[.1,10],viscosity:[1,1e5],referenceRate:[0,10],pressureExponent:[.1,4],delay:[0,2],tauOn:[.001,2],tauOff:[.001,2],fill:[0,500],residual:[0,500],hoseId:[1,25],hoseLength:[0,5e3],speed:[1,800],acceleration:[1,1e4],standoff:[.1,20],lineLength:[1,250],gateDuration:[.001,10],shutoffDistance:[0,250],lineRatio:[.05,2],dotRatio:[.05,.5],width:[1,1e3],depth:[1,1e3],thickness:[.1,200],fixtureHeight:[0,100],timestep:[1e-4,.01],cellSize:[.1,5],liftSpeed:[.1,200],liftDistance:[.1,50],endDwell:[0,5],backtrackDistance:[0,50],backtrackSpeed:[.1,200],reverseRpm:[0,300],reverseDuration:[0,2],junctionDeviation:[.001,5]};function bd(s){for(const[e,t]of Object.entries(s))if(typeof t=="number"&&!Number.isFinite(t))throw new Error(`${e} 必須是有限數值`);for(const[e,[t,n]]of Object.entries(Md))if(s[e]<t||s[e]>n)throw new Error(`${e} 超出原型允許範圍 ${t}–${n}`);if(s.residual>s.fill)throw new Error("不可用殘量不能大於裝填量");if(s.architecture==="P300"&&Math.abs(s.tauOn-s.tauOff)>1e-12)throw new Error("PCP 必須共用起停時間常數，以保持計量守恆");if(!["line","point","pattern"].includes(s.mode))throw new Error("未知路徑模式");if(s.mode==="pattern"&&(!s.pathSettings||typeof s.pathSettings!="object"))throw new Error("請先設定熱源與路徑");if(!["vertical","diagonal","liftThenBack","legacy"].includes(s.endMotion))throw new Error("未知收尾動作");if(!["junction","off"].includes(s.cornerMode))throw new Error("未知轉角速度模式");if(s.architecture!=="P300"&&s.reverseDuration>0)throw new Error("氣壓式未提供 PCP 反轉回吸；請改用下降時間常數比較卸壓響應")}function ua(s,e){const t=Math.cbrt(1e3*s*3/(Math.PI*e*(3+4*e*e)));return{radius:t,height:2*e*t}}function bc(s,e,t){const n=s.length,i=new Float64Array(n+1),r=new Float64Array(n+1);let a=0,o=0;for(const u of s)a+=u*1e3;for(let u=1;u<n;u++)i[u]=Math.sqrt(4*1e3*(s[u-1]+s[u])/(2*e*Math.PI*t));for(let u=0;u<n;u++)o+=Mo*Math.sin(Math.PI/Mo)*t/4*e*(i[u]**2+i[u]*i[u+1]+i[u+1]**2)/3;const c=o>0?Math.sqrt(a/o):0;let l=0,h=0;for(let u=0;u<=n;u++)i[u]*=c,r[u]=i[u]*t,r[u]>l&&(l=r[u]),i[u]>h&&(h=i[u]);return{widths:i,heights:r,volumeMm3:a,maxHeight:l,maxWidth:h}}function Sd(s,e,t){return s.mode==="point"?null:e&&s.cornerMode==="junction"&&e.points.length>2?md(e.points,{speed:s.speed,acceleration:s.acceleration,deviation:s.junctionDeviation}):Ms(t,s.speed,s.acceleration)}function da(s){const e={...Uh(),...Fh(),endMotion:"legacy",shutoffDistance:0,...structuredClone(s)};bd(e);const t=vd(e),n=e.architecture==="P300",i=e.fill-e.residual,r=e.mode==="pattern"?dd(e.pathSettings):null;if(r&&r.length<=1e-9)throw new Error("圖樣路徑沒有長度；單點請使用單點模式");const a=r?r.length:e.lineLength,o=e.mode!=="point",c=Sd(e,r,a),l=o?Math.min(e.shutoffDistance,a):0,h=o?c.timeAt(a-l):e.gateDuration,u=n&&t>0?Math.min(h,i/t):h,d=o?c.duration:h,f=Math.max(d,h+e.delay+20*Math.max(e.tauOn,e.tauOff)),g=n&&e.reverseRpm>0&&e.reverseDuration>0,_=g?u+e.reverseDuration:null,m=g?_+e.delay:null,p=yd(r?{...e,mode:"line",lineLength:a}:e,d,f),x=Math.max(f,p.end,m??0);if(x>180)throw new Error("試驗超過 180 秒，請縮短路徑或提高速度");const y=Math.PI*e.diameter**2/4*(e.nozzleLength/1e3)+(n?Math.PI*e.hoseId**2/4*(e.hoseLength/1e3)+e.deadVolume:0),v=e.fill+y,E=-e.diameter/2,w=a+e.diameter;let A=e.mode==="point"?1:Math.max(2,Math.ceil(w/e.cellSize));const D=A;if(r){const We=Math.max(2,Math.floor(5e6/(Math.ceil(x/.01)+2)));A=Math.min(A,We,2e4)}const b=w/A,S=new Float64Array(A),I=[];let U=0,V=0;const Y=e.displacement*e.reverseRpm*e.efficiency/60,Q=We=>{const N=n?xd(We,t,u,e.delay,e.tauOn,Y,e.reverseDuration):bo(We,t,h,e.delay,e.tauOn,e.tauOff),Ie=n?N.volume:Math.min(i,N.volume),Pe=n?t*Math.min(We,u):Ie,Ae=N.recovered||0,oe=n?Math.max(0,Pe-Ie-Ae):0,ze=Math.max(e.residual,e.fill-Pe),me=o?c.at(We):{x:0,v:0},Le=p.at(We),Ke=me.v+Le.vx,Ze=me.x-Le.back,C=r?xc(r,Ze):null,M=C?C.x:e.offsetX+(e.mode==="line"?Ze-e.lineLength/2:0),z=C?C.y:e.offsetY,J=g&&We>=u&&We<_,se=g&&We>=u+e.delay&&We<m,ee=We<u?"點膠中":We<d?"收尾移動（已關膠）":We<p.start?e.endMotion==="legacy"?"舊版尾膠等待":"終點停留":We<p.end?Le.phase:We<x?J||se?"動作完成／反轉指令與尾膠記帳":"動作完成／尾膠記帳":"完成";return{t:We,q:!n&&N.volume>=i?0:N.q,target:We<u?t:0,command:We<u?1:0,output:Ie,mass:Ie*e.density,metered:Pe,pending:oe,recovered:Ae,reverseActive:!!N.reverseActive,reverseRecoveryActive:!!N.reverseActive,reverseCommandActive:J,reverseResponseActive:se,remaining:ze,fixed:y,initial:v,s:Ze,x:M,y:z,z:e.surfaceZ+e.standoff+Le.lift,speed:Math.hypot(Ke,Le.vz),vx:C?Ke*C.tx:Ke,vy:C?Ke*C.ty:0,vz:Le.vz,phase:ee,balance:v-(ze+y+oe+Ae+Ie)}},G=Q(p.start).output,ae=Math.ceil(x/e.timestep),X=e.endMotion==="legacy";for(let We=0;We<=ae;We++){const N=Math.min(x,We*e.timestep),Ie=Q(N),Pe=o?c.at(Math.max(0,N-e.timestep/2)).x:0;Ie.deposited=X?Ie.output:Math.min(Ie.output,G),Ie.offSurface=Math.max(0,Ie.output-Ie.deposited),Ie.depositionBalance=Ie.output-Ie.deposited-Ie.offSurface;const Ae=Math.max(0,Ie.deposited-(X?U:Math.min(U,G)));if(e.mode==="point")S[0]+=Ae;else if(Ae>0){const oe=Math.max(e.diameter/2,b),ze=Math.floor((Pe-E)/b),me=Math.ceil(oe/b)+1,Le=[];let Ke=0;for(let Ze=Math.max(0,ze-me);Ze<=Math.min(A-1,ze+me);Ze++){const C=Math.max(0,1-Math.abs(E+(Ze+.5)*b-Pe)/oe);C&&(Le.push([Ze,C]),Ke+=C)}for(const[Ze,C]of Le)S[Ze]+=Ae*C/Ke}U=Ie.output,(N+1e-9>=V||We===ae)&&(I.push({...Ie,deposits:Float64Array.from(S)}),V+=.01)}const fe=o?bc(S,b,e.lineRatio):null,Me=fe?fe.maxHeight:ua(S[0],e.dotRatio).height,Se=I.at(-1),we=[],at=Math.max(0,Se.output-Q(d).output),Ge=(We,N)=>{let Ie=0;for(let Pe=0;Pe<A;Pe++){const Ae=E+Pe*b;Ie+=S[Pe]*Math.max(0,Math.min(N,Ae+b)-Math.max(We,Ae))/b}return Ie/(N-We)},it=Math.min(5,a/5),te=Ge(a*.4,a*.6),ie=o&&te>1e-12?Ge(a-it,a)/te:null,Te={movementEnd:d,commandOff:u,effectiveShutoffDistance:l,leadTime:d-h,afterStopVolume:at,afterStopPercent:Se.output>0?at/Se.output*100:0,endWindowMm:it,endToMiddleRatio:ie,liftStart:p.start,motionEnd:p.end,accountingEnd:x,effectiveBacktrack:p.back,offSurfaceVolume:Se.offSurface,depositedVolume:Se.deposited,recoveredVolume:Se.recovered,reverseCommandStart:g?u:null,reverseCommandEnd:_,reverseStart:g?u+e.delay:null,reverseResponseEnd:m,reverseRequestedVolume:n?Y*e.reverseDuration:0},ge=c?{kind:c.kind,duration:c.duration,peak:c.peak,corners:c.corners||0,slowestCorner:c.slowestCorner??null,averageSpeed:a/c.duration}:null;Se.offSurface>1e-9&&we.push("離面後仍有出膠，另列形狀未定量；未預測拉絲、滴落或落點，不加入工件膠形。"),o&&e.backtrackDistance>a&&p.back>0&&we.push("回退距離已限制在原直線長度內。"),e.mode==="point"&&["diagonal","liftThenBack"].includes(e.endMotion)&&we.push("單點沒有路徑方向，收尾使用垂直抬針。"),n&&e.reverseDuration>0&&we.push("PCP 反轉僅為暫存回收近似，回收量獨立記帳；不移除已沉積材料、不保證真實斷絲。"),Te.reverseRequestedVolume>Se.recovered+1e-9&&we.push("反轉指令超過可回收暫存量，剩餘指令不再移除材料；負壓、吸氣與下一次開膠尚未計算。"),o&&e.shutoffDistance>=a&&we.push("提前關膠距離達到或超過路徑長度，本次不開膠；請縮短提前距離。"),o&&ie!==null&&ie<.5&&we.push("末段平均截面低於中段一半，可能欠膠；此比較門檻為 AI 初估，不是產品驗收標準。"),o&&ie!==null&&ie>1.5&&we.push("末段平均截面高於中段 1.5 倍，可能積膠；此比較門檻為 AI 初估，不是產品驗收標準。"),Me>e.standoff&&we.push("簡化膠形高於針距，可能干涉；尚未計算壓扁或拉絲。"),e.material==="putty"&&!n&&Math.abs(e.pressureExponent-1)>1e-9&&we.push(`putty 流動指數 m=${e.pressureExponent}：針嘴內徑與長度依冪律 d^(3+m)/L^m 一併換算；仍是單點映射假設。`);const pe=fe?fe.maxWidth:ua(Se.deposited,e.dotRatio).radius*2;if(r){let We=!1;for(const N of r.points)if(Math.abs(N.x)+pe/2>e.width/2||Math.abs(N.y)+pe/2>e.depth/2){We=!0;break}We&&we.push("路徑或估算膠線可能超出工件範圍；尚未計算實際邊緣流失。"),(Math.abs(r.offsetX)+r.width/2>e.width/2||Math.abs(r.offsetY)+r.depth/2>e.depth/2)&&we.push("設定的熱源超出工件矩形參考邊界；請核對熱源位置與尺寸。"),we.push("3D 彎角與重疊為幾何示意；沉積量分帳守恆，但顯示網格體積與融合形狀並非精確實物。"),c.kind==="polyline"?we.push(`轉角依 junction deviation ${e.junctionDeviation} mm 降速（最低 ${ge.slowestCorner===null?"—":ge.slowestCorner.toFixed(1)} mm/s）；轉角較慢處膠量較多。規則為通用 CNC 近似，非特定機台控制器。`):we.push("圖樣使用整條路徑的弧長加減速，轉角不減速（v0.7 對照）；不是機台運動控制器或真實轉角積膠預測。"),A<D&&we.push("為避免記憶體不足，沿路徑的沉積取樣已放粗；局部精度下降。")}else((e.mode==="line"?(e.lineLength+e.diameter)/2:pe/2)+Math.abs(e.offsetX)>e.width/2||pe/2+Math.abs(e.offsetY)>e.depth/2)&&we.push("路徑或膠形超出工件範圍；沉積位置仍按水平參考面外推。");const Oe=n?[254,277]:[300,300];return(e.width>Oe[0]||e.depth>Oe[1])&&we.push("工件超出所選設備的參考工作範圍；未自動縮小。"),e.surfaceZ+e.standoff+e.liftDistance>(n?70:100)&&we.push("工件／針嘴高度超出參考 Z 行程；尚未確認真實機台的裝夾與工具偏置。"),e.workpieceKind!=="plate"&&we.push("匯入工件只作實尺寸顯示；膠形使用上方水平參考面，未驗證孔洞、曲面或完整碰撞。"),Se.remaining<=e.residual+1e-9&&we.push("可用膠量已耗盡；固定預填流道未吹空。"),n&&we.push("理想 PCP 假設滿腔；管路壓降、供料不足與材料適配尚未計算。"),{version:vr,label:xa,config:e,path:r,pathLength:a,Q:t,gate:h,duration:x,tailEnd:f,cellLength:b,gridStart:E,frames:I,warnings:we,maxHeight:Me,maxWidth:pe,motion:ge,ending:Te,summary:{...Se,deposits:Array.from(Se.deposits),maxHeight:Me,maxWidth:pe,ending:Te}}}function Ed(s,e){let t=0,n=s.frames.length-1;for(;t<n;){const i=Math.ceil((t+n)/2);s.frames[i].t<=e?t=i:n=i-1}return s.frames[t]}const qt=Object.freeze({putty:{key:"putty",name:"Tputty 910",vendor:"Laird",kind:"單劑 thermal putty（陶瓷填充矽系）",conductivity:9.1,minBondLine:.18,contactResistance:.11,temperatureRange:"-40～180 °C",packaging:"30cc 針筒／75cc EFD 56cc（179 g）／180cc 159cc／300cc 鋁筒 300cc（960 g）",density:3.2,squeezeViscosity:7e3,yieldStress:200,color:14714506,colorName:"淡紅（近似）",source:"THR-DS-Tputty 910 Rev C 2025-04-22"},grease:{key:"grease",name:"Tgrease 2500",vendor:"Laird",kind:"非矽 thermal grease",conductivity:3.8,minBondLine:.05,contactResistance:.02,temperatureRange:"-55～150 °C",packaging:"50cc 針筒（A14399-03）／600cc 膠筒（A14259-10）",density:3.4,squeezeViscosity:2500,yieldStress:50,color:14277590,colorName:"灰白（近似）",source:"MKT-DOC-1592 Tgrease 2500 Data Sheet 2025-06-27"}});/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sc="180",ci={ROTATE:0,DOLLY:1,PAN:2},ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wd=0,nl=1,Td=2,Bh=1,kh=2,ni=3,ui=0,rn=1,Vt=2,wi=0,bs=1,il=2,sl=3,rl=4,Ad=5,Gi=100,Rd=101,Cd=102,Pd=103,Ld=104,Dd=200,Id=201,Nd=202,Ud=203,So=204,Eo=205,Fd=206,Od=207,Bd=208,kd=209,zd=210,Hd=211,Vd=212,Gd=213,Wd=214,wo=0,To=1,Ao=2,As=3,Ro=4,Co=5,Po=6,Lo=7,Ec=0,Xd=1,$d=2,Ti=0,qd=1,Yd=2,jd=3,zh=4,Kd=5,Zd=6,Jd=7,al="attached",Qd="detached",Hh=300,Rs=301,Cs=302,Do=303,Io=304,ya=306,Ps=1e3,Ei=1001,fa=1002,an=1003,Vh=1004,nr=1005,yn=1006,ra=1007,ai=1008,$n=1009,Gh=1010,Wh=1011,hr=1012,wc=1013,$i=1014,Fn=1015,xr=1016,Tc=1017,Ac=1018,ur=1020,Xh=35902,$h=35899,qh=1021,Yh=1022,Rn=1023,dr=1026,fr=1027,Rc=1028,Cc=1029,jh=1030,Pc=1031,Lc=1033,aa=33776,oa=33777,ca=33778,la=33779,No=35840,Uo=35841,Fo=35842,Oo=35843,Bo=36196,ko=37492,zo=37496,Ho=37808,Vo=37809,Go=37810,Wo=37811,Xo=37812,$o=37813,qo=37814,Yo=37815,jo=37816,Ko=37817,Zo=37818,Jo=37819,Qo=37820,ec=37821,tc=36492,nc=36494,ic=36495,sc=36283,rc=36284,ac=36285,oc=36286,pr=2300,mr=2301,Aa=2302,ol=2400,cl=2401,ll=2402,ef=2500,tf=0,Kh=1,cc=2,nf=3200,sf=3201,Dc=0,rf=1,Si="",Ft="srgb",on="srgb-linear",pa="linear",Rt="srgb",ts=7680,hl=519,af=512,of=513,cf=514,Zh=515,lf=516,hf=517,uf=518,df=519,lc=35044,ul="300 es",Gn=2e3,ma=2001;class Ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let dl=1234567;const Ss=Math.PI/180,Ls=180/Math.PI;function Bn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Yt[s&255]+Yt[s>>8&255]+Yt[s>>16&255]+Yt[s>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]).toLowerCase()}function ct(s,e,t){return Math.max(e,Math.min(t,s))}function Ic(s,e){return(s%e+e)%e}function ff(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function pf(s,e,t){return s!==e?(t-s)/(e-s):0}function sr(s,e,t){return(1-t)*s+t*e}function mf(s,e,t,n){return sr(s,e,1-Math.exp(-t*n))}function gf(s,e=1){return e-Math.abs(Ic(s,e*2)-e)}function _f(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function vf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function xf(s,e){return s+Math.floor(Math.random()*(e-s+1))}function yf(s,e){return s+Math.random()*(e-s)}function Mf(s){return s*(.5-Math.random())}function bf(s){s!==void 0&&(dl=s);let e=dl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Sf(s){return s*Ss}function Ef(s){return s*Ls}function wf(s){return(s&s-1)===0&&s!==0}function Tf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Af(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Rf(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*d,o*l);break;case"YZY":s.set(c*d,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*d,o*h,o*l);break;case"XZX":s.set(o*h,c*g,c*f,o*l);break;case"YXY":s.set(c*f,o*h,c*g,o*l);break;case"ZYZ":s.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Un(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Et(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Nc={DEG2RAD:Ss,RAD2DEG:Ls,generateUUID:Bn,clamp:ct,euclideanModulo:Ic,mapLinear:ff,inverseLerp:pf,lerp:sr,damp:mf,pingpong:gf,smoothstep:_f,smootherstep:vf,randInt:xf,randFloat:yf,randFloatSpread:Mf,seededRandom:bf,degToRad:Sf,radToDeg:Ef,isPowerOfTwo:wf,ceilPowerOfTwo:Tf,floorPowerOfTwo:Af,setQuaternionFromProperEuler:Rf,normalize:Et,denormalize:Un};class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Cn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-o;const p=c*d+l*f+h*g+u*_,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const E=Math.sqrt(y),w=Math.atan2(E,p*x);m=Math.sin(m*w)/E,o=Math.sin(o*w)/E}const v=o*x;if(c=c*m+d*v,l=l*m+f*v,h=h*m+g*v,u=u*m+_*v,m===1-o){const E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ra.copy(this).projectOnVector(e),this.sub(Ra)}reflect(e){return this.sub(Ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ra=new P,fl=new Cn;class lt{constructor(e,t,n,i,r,a,o,c,l){lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],x=i[1],y=i[4],v=i[7],E=i[2],w=i[5],A=i[8];return r[0]=a*_+o*x+c*E,r[3]=a*m+o*y+c*w,r[6]=a*p+o*v+c*A,r[1]=l*_+h*x+u*E,r[4]=l*m+h*y+u*w,r[7]=l*p+h*v+u*A,r[2]=d*_+f*x+g*E,r[5]=d*m+f*y+g*w,r[8]=d*p+f*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ca.makeScale(e,t)),this}rotate(e){return this.premultiply(Ca.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ca=new lt;function Jh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function gr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Cf(){const s=gr("canvas");return s.style.display="block",s}const pl={};function _r(s){s in pl||(pl[s]=!0,console.warn(s))}function Pf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const ml=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gl=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lf(){const s={enabled:!0,workingColorSpace:on,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Rt&&(i.r=li(i.r),i.g=li(i.g),i.b=li(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Rt&&(i.r=Es(i.r),i.g=Es(i.g),i.b=Es(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Si?pa:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return _r("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return _r("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[on]:{primaries:e,whitePoint:n,transfer:pa,toXYZ:ml,fromXYZ:gl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ft},outputColorSpaceConfig:{drawingBufferColorSpace:Ft}},[Ft]:{primaries:e,whitePoint:n,transfer:Rt,toXYZ:ml,fromXYZ:gl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ft}}}),s}const mt=Lf();function li(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Es(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ns;class Df{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ns===void 0&&(ns=gr("canvas")),ns.width=e.width,ns.height=e.height;const i=ns.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ns}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=gr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=li(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(li(t[n]/255)*255):t[n]=li(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let If=0;class Uc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Pa(i[a].image)):r.push(Pa(i[a]))}else r=Pa(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Pa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Df.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nf=0;const La=new P;class Gt extends Ki{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=Ei,i=Ei,r=yn,a=ai,o=Rn,c=$n,l=Gt.DEFAULT_ANISOTROPY,h=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Bn(),this.name="",this.source=new Uc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(La).x}get height(){return this.source.getSize(La).y}get depth(){return this.source.getSize(La).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ps:e.x=e.x-Math.floor(e.x);break;case Ei:e.x=e.x<0?0:1;break;case fa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ps:e.y=e.y-Math.floor(e.y);break;case Ei:e.y=e.y<0?0:1;break;case fa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Hh;Gt.DEFAULT_ANISOTROPY=1;class xt{constructor(e=0,t=0,n=0,i=1){xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,v=(f+1)/2,E=(p+1)/2,w=(h+d)/4,A=(u+_)/4,D=(g+m)/4;return y>v&&y>E?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=w/n,r=A/n):v>E?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=w/i,r=D/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=A/r,i=D/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uf extends Ki{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new Gt(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:yn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Uc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qi extends Uf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Qh extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=an,this.minFilter=an,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ff extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=an,this.minFilter=an,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mn{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Dn):Dn.fromBufferAttribute(r,a),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Er.copy(n.boundingBox)),Er.applyMatrix4(e.matrixWorld),this.union(Er)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ws),wr.subVectors(this.max,Ws),is.subVectors(e.a,Ws),ss.subVectors(e.b,Ws),rs.subVectors(e.c,Ws),pi.subVectors(ss,is),mi.subVectors(rs,ss),Ii.subVectors(is,rs);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Ii.z,Ii.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Ii.z,0,-Ii.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Ii.y,Ii.x,0];return!Da(t,is,ss,rs,wr)||(t=[1,0,0,0,1,0,0,0,1],!Da(t,is,ss,rs,wr))?!1:(Tr.crossVectors(pi,mi),t=[Tr.x,Tr.y,Tr.z],Da(t,is,ss,rs,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Yn=[new P,new P,new P,new P,new P,new P,new P,new P],Dn=new P,Er=new Mn,is=new P,ss=new P,rs=new P,pi=new P,mi=new P,Ii=new P,Ws=new P,wr=new P,Tr=new P,Ni=new P;function Da(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ni.fromArray(s,r);const o=i.x*Math.abs(Ni.x)+i.y*Math.abs(Ni.y)+i.z*Math.abs(Ni.z),c=e.dot(Ni),l=t.dot(Ni),h=n.dot(Ni);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Of=new Mn,Xs=new P,Ia=new P;class qn{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Of.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);const t=Xs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Xs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ia.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(Ia)),this.expandByPoint(Xs.copy(e.center).sub(Ia))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const jn=new P,Na=new P,Ar=new P,gi=new P,Ua=new P,Rr=new P,Fa=new P;class yr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Na.copy(e).add(t).multiplyScalar(.5),Ar.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(Na);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ar),o=gi.dot(this.direction),c=-gi.dot(Ar),l=gi.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Na).addScaledVector(Ar,d),f}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),i=jn.dot(jn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,i,r){Ua.subVectors(t,e),Rr.subVectors(n,e),Fa.crossVectors(Ua,Rr);let a=this.direction.dot(Fa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;gi.subVectors(this.origin,e);const c=o*this.direction.dot(Rr.crossVectors(gi,Rr));if(c<0)return null;const l=o*this.direction.dot(Ua.cross(gi));if(l<0||c+l>a)return null;const h=-o*gi.dot(Fa);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m)}set(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/as.setFromMatrixColumn(e,0).length(),r=1/as.setFromMatrixColumn(e,1).length(),a=1/as.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bf,e,kf)}lookAt(e,t,n){const i=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),_i.crossVectors(n,gn),_i.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),_i.crossVectors(n,gn)),_i.normalize(),Cr.crossVectors(gn,_i),i[0]=_i.x,i[4]=Cr.x,i[8]=gn.x,i[1]=_i.y,i[5]=Cr.y,i[9]=gn.y,i[2]=_i.z,i[6]=Cr.z,i[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],y=n[7],v=n[11],E=n[15],w=i[0],A=i[4],D=i[8],b=i[12],S=i[1],I=i[5],U=i[9],V=i[13],Y=i[2],Q=i[6],G=i[10],ae=i[14],X=i[3],fe=i[7],Me=i[11],Se=i[15];return r[0]=a*w+o*S+c*Y+l*X,r[4]=a*A+o*I+c*Q+l*fe,r[8]=a*D+o*U+c*G+l*Me,r[12]=a*b+o*V+c*ae+l*Se,r[1]=h*w+u*S+d*Y+f*X,r[5]=h*A+u*I+d*Q+f*fe,r[9]=h*D+u*U+d*G+f*Me,r[13]=h*b+u*V+d*ae+f*Se,r[2]=g*w+_*S+m*Y+p*X,r[6]=g*A+_*I+m*Q+p*fe,r[10]=g*D+_*U+m*G+p*Me,r[14]=g*b+_*V+m*ae+p*Se,r[3]=x*w+y*S+v*Y+E*X,r[7]=x*A+y*I+v*Q+E*fe,r[11]=x*D+y*U+v*G+E*Me,r[15]=x*b+y*V+v*ae+E*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-i*l*u-r*o*d+n*l*d+i*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-i*a*f+i*l*h-r*c*h)+m*(+t*l*u-t*o*f-r*a*u+n*a*f+r*o*h-n*l*h)+p*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=u*m*l-_*d*l+_*c*f-o*m*f-u*c*p+o*d*p,y=g*d*l-h*m*l-g*c*f+a*m*f+h*c*p-a*d*p,v=h*_*l-g*u*l+g*o*f-a*_*f-h*o*p+a*u*p,E=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,w=t*x+n*y+i*v+r*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=x*A,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*A,e[2]=(o*m*r-_*c*r+_*i*l-n*m*l-o*i*p+n*c*p)*A,e[3]=(u*c*r-o*d*r-u*i*l+n*d*l+o*i*f-n*c*f)*A,e[4]=y*A,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*A,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*p-t*c*p)*A,e[7]=(a*d*r-h*c*r+h*i*l-t*d*l-a*i*f+t*c*f)*A,e[8]=v*A,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*A,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*A,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*f-t*o*f)*A,e[12]=E*A,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*A,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*m-t*o*m)*A,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,x=c*l,y=c*h,v=c*u,E=n.x,w=n.y,A=n.z;return i[0]=(1-(_+p))*E,i[1]=(f+v)*E,i[2]=(g-y)*E,i[3]=0,i[4]=(f-v)*w,i[5]=(1-(d+p))*w,i[6]=(m+x)*w,i[7]=0,i[8]=(g+y)*A,i[9]=(m-x)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=as.set(i[0],i[1],i[2]).length();const a=as.set(i[4],i[5],i[6]).length(),o=as.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],In.copy(this);const l=1/r,h=1/a,u=1/o;return In.elements[0]*=l,In.elements[1]*=l,In.elements[2]*=l,In.elements[4]*=h,In.elements[5]*=h,In.elements[6]*=h,In.elements[8]*=u,In.elements[9]*=u,In.elements[10]*=u,t.setFromRotationMatrix(In),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=Gn,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===Gn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ma)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Gn,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===Gn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===ma)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const as=new P,In=new rt,Bf=new P(0,0,0),kf=new P(1,1,1),_i=new P,Cr=new P,gn=new P,_l=new rt,vl=new Cn;class Pn{constructor(e=0,t=0,n=0,i=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _l.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_l,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vl.setFromEuler(this),this.setFromQuaternion(vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class eu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zf=0;const xl=new P,os=new Cn,Kn=new rt,Pr=new P,$s=new P,Hf=new P,Vf=new Cn,yl=new P(1,0,0),Ml=new P(0,1,0),bl=new P(0,0,1),Sl={type:"added"},Gf={type:"removed"},cs={type:"childadded",child:null},Oa={type:"childremoved",child:null};class vt extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new P,t=new Pn,n=new Cn,i=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new lt}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.multiply(os),this}rotateOnWorldAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.premultiply(os),this}rotateX(e){return this.rotateOnAxis(yl,e)}rotateY(e){return this.rotateOnAxis(Ml,e)}rotateZ(e){return this.rotateOnAxis(bl,e)}translateOnAxis(e,t){return xl.copy(e).applyQuaternion(this.quaternion),this.position.add(xl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yl,e)}translateY(e){return this.translateOnAxis(Ml,e)}translateZ(e){return this.translateOnAxis(bl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pr.copy(e):Pr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt($s,Pr,this.up):Kn.lookAt(Pr,$s,this.up),this.quaternion.setFromRotationMatrix(Kn),i&&(Kn.extractRotation(i.matrixWorld),os.setFromRotationMatrix(Kn),this.quaternion.premultiply(os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sl),cs.child=e,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gf),Oa.child=e,this.dispatchEvent(Oa),Oa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sl),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,Hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,Vf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}vt.DEFAULT_UP=new P(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Nn=new P,Zn=new P,Ba=new P,Jn=new P,ls=new P,hs=new P,El=new P,ka=new P,za=new P,Ha=new P,Va=new xt,Ga=new xt,Wa=new xt;class An{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Nn.subVectors(e,t),i.cross(Nn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Nn.subVectors(i,t),Zn.subVectors(n,t),Ba.subVectors(e,t);const a=Nn.dot(Nn),o=Nn.dot(Zn),c=Nn.dot(Ba),l=Zn.dot(Zn),h=Zn.dot(Ba),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Jn.x),c.addScaledVector(a,Jn.y),c.addScaledVector(o,Jn.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return Va.setScalar(0),Ga.setScalar(0),Wa.setScalar(0),Va.fromBufferAttribute(e,t),Ga.fromBufferAttribute(e,n),Wa.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Va,r.x),a.addScaledVector(Ga,r.y),a.addScaledVector(Wa,r.z),a}static isFrontFacing(e,t,n,i){return Nn.subVectors(n,t),Zn.subVectors(e,t),Nn.cross(Zn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Nn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return An.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;ls.subVectors(i,n),hs.subVectors(r,n),ka.subVectors(e,n);const c=ls.dot(ka),l=hs.dot(ka);if(c<=0&&l<=0)return t.copy(n);za.subVectors(e,i);const h=ls.dot(za),u=hs.dot(za);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ls,a);Ha.subVectors(e,r);const f=ls.dot(Ha),g=hs.dot(Ha);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(hs,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return El.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(El,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(ls,a).addScaledVector(hs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},Lr={h:0,s:0,l:0};function Xa(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,mt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=mt.workingColorSpace){if(e=Ic(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Xa(a,r,e+1/3),this.g=Xa(a,r,e),this.b=Xa(a,r,e-1/3)}return mt.colorSpaceToWorking(this,i),this}setStyle(e,t=Ft){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){const n=tu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return mt.workingToColorSpace(jt.copy(this),e),Math.round(ct(jt.r*255,0,255))*65536+Math.round(ct(jt.g*255,0,255))*256+Math.round(ct(jt.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.workingToColorSpace(jt.copy(this),t);const n=jt.r,i=jt.g,r=jt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=mt.workingColorSpace){return mt.workingToColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=Ft){mt.workingToColorSpace(jt.copy(this),e);const t=jt.r,n=jt.g,i=jt.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(Lr);const n=sr(vi.h,Lr.h,t),i=sr(vi.s,Lr.s,t),r=sr(vi.l,Lr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new Je;Je.NAMES=tu;let Wf=0;class kn extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=bs,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=So,this.blendDst=Eo,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==So&&(n.blendSrc=this.blendSrc),this.blendDst!==Eo&&(n.blendDst=this.blendDst),this.blendEquation!==Gi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class On extends kn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ot=new P,Dr=new Ee;let Xf=0;class Bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=lc,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Un(t,this.array)),t}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Un(t,this.array)),t}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Un(t,this.array)),t}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==lc&&(e.usage=this.usage),e}}class nu extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class iu extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Pt extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let $f=0;const En=new rt,$a=new vt,us=new P,_n=new Mn,qs=new Mn,$t=new P;class bt extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jh(e)?iu:nu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,n){return En.makeTranslation(e,t,n),this.applyMatrix4(En),this}scale(e,t,n){return En.makeScale(e,t,n),this.applyMatrix4(En),this}lookAt(e){return $a.lookAt(e),$a.updateMatrix(),this.applyMatrix4($a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];qs.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(_n.min,qs.min),_n.expandByPoint($t),$t.addVectors(_n.max,qs.max),_n.expandByPoint($t)):(_n.expandByPoint(qs.min),_n.expandByPoint(qs.max))}_n.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)$t.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared($t));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)$t.fromBufferAttribute(o,l),c&&(us.fromBufferAttribute(e,l),$t.add(us)),i=Math.max(i,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<n.count;D++)o[D]=new P,c[D]=new P;const l=new P,h=new P,u=new P,d=new Ee,f=new Ee,g=new Ee,_=new P,m=new P;function p(D,b,S){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),o[D].add(_),o[b].add(_),o[S].add(_),c[D].add(m),c[b].add(m),c[S].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let D=0,b=x.length;D<b;++D){const S=x[D],I=S.start,U=S.count;for(let V=I,Y=I+U;V<Y;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const y=new P,v=new P,E=new P,w=new P;function A(D){E.fromBufferAttribute(i,D),w.copy(E);const b=o[D];y.copy(b),y.sub(E.multiplyScalar(E.dot(b))).normalize(),v.crossVectors(w,b);const I=v.dot(c[D])<0?-1:1;a.setXYZW(D,y.x,y.y,y.z,I)}for(let D=0,b=x.length;D<b;++D){const S=x[D],I=S.start,U=S.count;for(let V=I,Y=I+U;V<Y;V+=3)A(e.getX(V+0)),A(e.getX(V+1)),A(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new P,r=new P,a=new P,o=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Bt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wl=new rt,Ui=new yr,Ir=new qn,Tl=new P,Nr=new P,Ur=new P,Fr=new P,qa=new P,Or=new P,Al=new P,Br=new P;class nt extends vt{constructor(e=new bt,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Or.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(qa.fromBufferAttribute(u,e),a?Or.addScaledVector(qa,h):Or.addScaledVector(qa.sub(t),h))}t.add(Or)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere),Ir.applyMatrix4(r),Ui.copy(e.ray).recast(e.near),!(Ir.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(Ir,Tl)===null||Ui.origin.distanceToSquared(Tl)>(e.far-e.near)**2))&&(wl.copy(r).invert(),Ui.copy(e.ray).applyMatrix4(wl),!(n.boundingBox!==null&&Ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ui)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,E=y;v<E;v+=3){const w=o.getX(v),A=o.getX(v+1),D=o.getX(v+2);i=kr(this,p,e,n,l,h,u,w,A,D),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=o.getX(m),y=o.getX(m+1),v=o.getX(m+2);i=kr(this,a,e,n,l,h,u,x,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,E=y;v<E;v+=3){const w=v,A=v+1,D=v+2;i=kr(this,p,e,n,l,h,u,w,A,D),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,y=m+1,v=m+2;i=kr(this,a,e,n,l,h,u,x,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function qf(s,e,t,n,i,r,a,o){let c;if(e.side===rn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===ui,o),c===null)return null;Br.copy(o),Br.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Br);return l<t.near||l>t.far?null:{distance:l,point:Br.clone(),object:s}}function kr(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Nr),s.getVertexPosition(c,Ur),s.getVertexPosition(l,Fr);const h=qf(s,e,t,n,Nr,Ur,Fr,Al);if(h){const u=new P;An.getBarycoord(Al,Nr,Ur,Fr,u),i&&(h.uv=An.getInterpolatedAttribute(i,o,c,l,u,new Ee)),r&&(h.uv1=An.getInterpolatedAttribute(r,o,c,l,u,new Ee)),a&&(h.normal=An.getInterpolatedAttribute(a,o,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new P,materialIndex:0};An.getNormal(Nr,Ur,Fr,d.normal),h.face=d,h.barycoord=u}return h}class ln extends bt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Pt(l,3)),this.setAttribute("normal",new Pt(h,3)),this.setAttribute("uv",new Pt(u,2));function g(_,m,p,x,y,v,E,w,A,D,b){const S=v/A,I=E/D,U=v/2,V=E/2,Y=w/2,Q=A+1,G=D+1;let ae=0,X=0;const fe=new P;for(let Me=0;Me<G;Me++){const Se=Me*I-V;for(let we=0;we<Q;we++){const at=we*S-U;fe[_]=at*x,fe[m]=Se*y,fe[p]=Y,l.push(fe.x,fe.y,fe.z),fe[_]=0,fe[m]=0,fe[p]=w>0?1:-1,h.push(fe.x,fe.y,fe.z),u.push(we/A),u.push(1-Me/D),ae+=1}}for(let Me=0;Me<D;Me++)for(let Se=0;Se<A;Se++){const we=d+Se+Q*Me,at=d+Se+Q*(Me+1),Ge=d+(Se+1)+Q*(Me+1),it=d+(Se+1)+Q*Me;c.push(we,at,it),c.push(at,Ge,it),X+=6}o.addGroup(f,X,b),f+=X,d+=ae}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ln(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ds(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function tn(s){const e={};for(let t=0;t<s.length;t++){const n=Ds(s[t]);for(const i in n)e[i]=n[i]}return e}function Yf(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function su(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const jf={clone:Ds,merge:tn};var Kf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends kn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kf,this.fragmentShader=Zf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ds(e.uniforms),this.uniformsGroups=Yf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ru extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=Gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xi=new P,Rl=new Ee,Cl=new Ee;class sn extends ru{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ls*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,Rl,Cl),t.subVectors(Cl,Rl)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ss*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ds=-90,fs=1;class Jf extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new sn(ds,fs,e,t);i.layers=this.layers,this.add(i);const r=new sn(ds,fs,e,t);r.layers=this.layers,this.add(r);const a=new sn(ds,fs,e,t);a.layers=this.layers,this.add(a);const o=new sn(ds,fs,e,t);o.layers=this.layers,this.add(o);const c=new sn(ds,fs,e,t);c.layers=this.layers,this.add(c);const l=new sn(ds,fs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ma)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class au extends Gt{constructor(e=[],t=Rs,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qf extends qi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new au(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ln(5,5,5),r=new Ci({name:"CubemapFromEquirect",uniforms:Ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:rn,blending:wi});r.uniforms.tEquirect.value=t;const a=new nt(i,r),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=yn),new Jf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}class Mt extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ep={type:"move"};class Ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ep)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ou extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class tp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=lc,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qt=new P;class Fc{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Fc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Pl=new P,Ll=new xt,Dl=new xt,np=new P,Il=new rt,zr=new P,ja=new qn,Nl=new rt,Ka=new yr;class ip extends nt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=al,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,zr),this.boundingBox.expandByPoint(zr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new qn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,zr),this.boundingSphere.expandByPoint(zr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ja.copy(this.boundingSphere),ja.applyMatrix4(i),e.ray.intersectsSphere(ja)!==!1&&(Nl.copy(i).invert(),Ka.copy(e.ray).applyMatrix4(Nl),!(this.boundingBox!==null&&Ka.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ka)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===al?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Qd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ll.fromBufferAttribute(i.attributes.skinIndex,e),Dl.fromBufferAttribute(i.attributes.skinWeight,e),Pl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Dl.getComponent(r);if(a!==0){const o=Ll.getComponent(r);Il.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(np.copy(Pl).applyMatrix4(Il),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class cu extends vt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class lu extends Gt{constructor(e=null,t=1,n=1,i,r,a,o,c,l=an,h=an,u,d){super(null,a,o,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ul=new rt,sp=new rt;class Oc{constructor(e=[],t=[]){this.uuid=Bn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:sp;Ul.multiplyMatrices(o,t[r]),Ul.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Oc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new lu(t,e,e,Rn,Fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new cu),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class hc extends Bt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ps=new rt,Fl=new rt,Hr=[],Ol=new Mn,rp=new rt,Ys=new nt,js=new qn;class Is extends nt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,rp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ps),Ol.copy(e.boundingBox).applyMatrix4(ps),this.boundingBox.union(Ol)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ps),js.copy(e.boundingSphere).applyMatrix4(ps),this.boundingSphere.union(js)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ys.geometry=this.geometry,Ys.material=this.material,Ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),js.copy(this.boundingSphere),js.applyMatrix4(n),e.ray.intersectsSphere(js)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ps),Fl.multiplyMatrices(n,ps),Ys.matrixWorld=Fl,Ys.raycast(e,Hr);for(let a=0,o=Hr.length;a<o;a++){const c=Hr[a];c.instanceId=r,c.object=this,t.push(c)}Hr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new hc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new lu(new Float32Array(i*this.count),i,this.count,Rc,Fn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Za=new P,ap=new P,op=new lt;class bi{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Za.subVectors(n,t).cross(ap.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Za),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||op.getNormalMatrix(e),i=this.coplanarPoint(Za).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fi=new qn,cp=new Ee(.5,.5),Vr=new P;class Bc{constructor(e=new bi,t=new bi,n=new bi,i=new bi,r=new bi,a=new bi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gn,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],x=r[12],y=r[13],v=r[14],E=r[15];if(i[0].setComponents(l-a,f-h,p-g,E-x).normalize(),i[1].setComponents(l+a,f+h,p+g,E+x).normalize(),i[2].setComponents(l+o,f+u,p+_,E+y).normalize(),i[3].setComponents(l-o,f-u,p-_,E-y).normalize(),n)i[4].setComponents(c,d,m,v).normalize(),i[5].setComponents(l-c,f-d,p-m,E-v).normalize();else if(i[4].setComponents(l-c,f-d,p-m,E-v).normalize(),t===Gn)i[5].setComponents(l+c,f+d,p+m,E+v).normalize();else if(t===ma)i[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(e){Fi.center.set(0,0,0);const t=cp.distanceTo(e.center);return Fi.radius=.7071067811865476+t,Fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Vr.x=i.normal.x>0?e.max.x:e.min.x,Vr.y=i.normal.y>0?e.max.y:e.min.y,Vr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Vr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yi extends kn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ga=new P,_a=new P,Bl=new rt,Ks=new yr,Gr=new qn,Ja=new P,kl=new P;class ji extends vt{constructor(e=new bt,t=new Yi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)ga.fromBufferAttribute(t,i-1),_a.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ga.distanceTo(_a);e.setAttribute("lineDistance",new Pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(i),Gr.radius+=r,e.ray.intersectsSphere(Gr)===!1)return;Bl.copy(i).invert(),Ks.copy(e.ray).applyMatrix4(Bl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),x=h.getX(_+1),y=Wr(this,e,Ks,c,p,x,_);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=Wr(this,e,Ks,c,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=Wr(this,e,Ks,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Wr(this,e,Ks,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Wr(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(ga.fromBufferAttribute(o,i),_a.fromBufferAttribute(o,r),t.distanceSqToSegment(ga,_a,Ja,kl)>n)return;Ja.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ja);if(!(l<e.near||l>e.far))return{distance:l,point:kl.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const zl=new P,Hl=new P;class kc extends ji{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)zl.fromBufferAttribute(t,i),Hl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+zl.distanceTo(Hl);e.setAttribute("lineDistance",new Pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lp extends ji{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class hu extends kn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vl=new rt,uc=new yr,Xr=new qn,$r=new P;class hp extends vt{constructor(e=new bt,t=new hu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(i),Xr.radius+=r,e.ray.intersectsSphere(Xr)===!1)return;Vl.copy(i).invert(),uc.copy(e.ray).applyMatrix4(Vl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);$r.fromBufferAttribute(u,m),Gl($r,m,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)$r.fromBufferAttribute(u,g),Gl($r,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Gl(s,e,t,n,i,r,a){const o=uc.distanceSqToPoint(s);if(o<t){const c=new P;uc.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class uu extends Gt{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class du extends Gt{constructor(e,t,n=$i,i,r,a,o=an,c=an,l,h=dr,u=1){if(h!==dr&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class fu extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ma extends bt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new P,h=new Ee;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Pt(a,3)),this.setAttribute("normal",new Pt(o,3)),this.setAttribute("uv",new Pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ma(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class dn extends bt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;x(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Pt(u,3)),this.setAttribute("normal",new Pt(d,3)),this.setAttribute("uv",new Pt(f,2));function x(){const v=new P,E=new P;let w=0;const A=(t-e)/n;for(let D=0;D<=r;D++){const b=[],S=D/r,I=S*(t-e)+e;for(let U=0;U<=i;U++){const V=U/i,Y=V*c+o,Q=Math.sin(Y),G=Math.cos(Y);E.x=I*Q,E.y=-S*n+m,E.z=I*G,u.push(E.x,E.y,E.z),v.set(Q,A,G).normalize(),d.push(v.x,v.y,v.z),f.push(V,1-S),b.push(g++)}_.push(b)}for(let D=0;D<i;D++)for(let b=0;b<r;b++){const S=_[b][D],I=_[b+1][D],U=_[b+1][D+1],V=_[b][D+1];(e>0||b!==0)&&(h.push(S,I,V),w+=3),(t>0||b!==r-1)&&(h.push(I,U,V),w+=3)}l.addGroup(p,w,0),p+=w}function y(v){const E=g,w=new Ee,A=new P;let D=0;const b=v===!0?e:t,S=v===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,m*S,0),d.push(0,S,0),f.push(.5,.5),g++;const I=g;for(let U=0;U<=i;U++){const Y=U/i*c+o,Q=Math.cos(Y),G=Math.sin(Y);A.x=b*G,A.y=m*S,A.z=b*Q,u.push(A.x,A.y,A.z),d.push(0,S,0),w.x=Q*.5+.5,w.y=G*.5*S+.5,f.push(w.x,w.y),g++}for(let U=0;U<i;U++){const V=E+U,Y=I+U;v===!0?h.push(Y,Y+1,V):h.push(Y+1,Y,V),D+=3}l.addGroup(p,D,v===!0?1:2),p+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const qr=new P,Yr=new P,Qa=new P,jr=new An;class pu extends bt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(Ss*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=jr;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),jr.getNormal(Qa),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const y=(x+1)%3,v=u[x],E=u[y],w=jr[h[x]],A=jr[h[y]],D=`${v}_${E}`,b=`${E}_${v}`;b in d&&d[b]?(Qa.dot(d[b].normal)<=r&&(f.push(w.x,w.y,w.z),f.push(A.x,A.y,A.z)),d[b]=null):D in d||(d[D]={index0:l[x],index1:l[y],normal:Qa.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];qr.fromBufferAttribute(o,_),Yr.fromBufferAttribute(o,m),f.push(qr.x,qr.y,qr.z),f.push(Yr.x,Yr.y,Yr.z)}this.setAttribute("position",new Pt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new Ee:new P);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new P,i=[],r=[],a=[],o=new P,c=new rt;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ct(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ct(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class mu extends di{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Ee){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class up extends mu{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function zc(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const Kr=new P,eo=new zc,to=new zc,no=new zc;class gu extends di{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(Kr.subVectors(i[0],i[1]).add(i[0]),l=Kr);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Kr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Kr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),eo.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),to.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),no.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(eo.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),to.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),no.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(eo.calc(c),to.calc(c),no.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Wl(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function dp(s,e){const t=1-s;return t*t*e}function fp(s,e){return 2*(1-s)*s*e}function pp(s,e){return s*s*e}function rr(s,e,t,n){return dp(s,e)+fp(s,t)+pp(s,n)}function mp(s,e){const t=1-s;return t*t*t*e}function gp(s,e){const t=1-s;return 3*t*t*s*e}function _p(s,e){return 3*(1-s)*s*s*e}function vp(s,e){return s*s*s*e}function ar(s,e,t,n,i){return mp(s,e)+gp(s,t)+_p(s,n)+vp(s,i)}class xp extends di{constructor(e=new Ee,t=new Ee,n=new Ee,i=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Ee){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ar(e,i.x,r.x,a.x,o.x),ar(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class yp extends di{constructor(e=new P,t=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ar(e,i.x,r.x,a.x,o.x),ar(e,i.y,r.y,a.y,o.y),ar(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mp extends di{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bp extends di{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sp extends di{constructor(e=new Ee,t=new Ee,n=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ee){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(rr(e,i.x,r.x,a.x),rr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _u extends di{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(rr(e,i.x,r.x,a.x),rr(e,i.y,r.y,a.y),rr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ep extends di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Wl(o,c.x,l.x,h.x,u.x),Wl(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new Ee().fromArray(i))}return this}}var wp=Object.freeze({__proto__:null,ArcCurve:up,CatmullRomCurve3:gu,CubicBezierCurve:xp,CubicBezierCurve3:yp,EllipseCurve:mu,LineCurve:Mp,LineCurve3:bp,QuadraticBezierCurve:Sp,QuadraticBezierCurve3:_u,SplineCurve:Ep});class ks extends bt{constructor(e=[new Ee(0,-.5),new Ee(.5,0),new Ee(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ct(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],h=1/t,u=new P,d=new Ee,f=new P,g=new P,_=new P;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let x=0;x<=t;x++){const y=n+x*h*i,v=Math.sin(y),E=Math.cos(y);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*v,u.y=e[w].y,u.z=e[w].x*E,a.push(u.x,u.y,u.z),d.x=x/t,d.y=w/(e.length-1),o.push(d.x,d.y);const A=c[3*w+0]*v,D=c[3*w+1],b=c[3*w+0]*E;l.push(A,D,b)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const v=y+x*e.length,E=v,w=v+e.length,A=v+e.length+1,D=v+1;r.push(E,w,D),r.push(A,D,w)}this.setIndex(r),this.setAttribute("position",new Pt(a,3)),this.setAttribute("uv",new Pt(o,2)),this.setAttribute("normal",new Pt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ks(e.points,e.segments,e.phiStart,e.phiLength)}}class Pi extends bt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const x=p*d-a;for(let y=0;y<l;y++){const v=y*u-r;g.push(v,-x,0),_.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<o;x++){const y=x+l*p,v=x+l*(p+1),E=x+1+l*(p+1),w=x+1+l*p;f.push(y,v,w),f.push(v,E,w)}this.setIndex(f),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Hc extends bt{constructor(e=new _u(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,c=new P,l=new Ee;let h=new P;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Pt(u,3)),this.setAttribute("normal",new Pt(d,3)),this.setAttribute("uv",new Pt(f,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),x(),p()}function m(y){h=e.getPointAt(y/t,h);const v=a.normals[y],E=a.binormals[y];for(let w=0;w<=i;w++){const A=w/i*Math.PI*2,D=Math.sin(A),b=-Math.cos(A);c.x=b*v.x+D*E.x,c.y=b*v.y+D*E.y,c.z=b*v.z+D*E.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function p(){for(let y=1;y<=t;y++)for(let v=1;v<=i;v++){const E=(i+1)*(y-1)+(v-1),w=(i+1)*y+(v-1),A=(i+1)*y+v,D=(i+1)*(y-1)+v;g.push(E,w,D),g.push(w,A,D)}}function x(){for(let y=0;y<=t;y++)for(let v=0;v<=i;v++)l.x=y/t,l.y=v/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Hc(new wp[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ot extends kn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Dc,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cn extends ot{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Tp extends kn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Dc,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ap extends kn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rp extends kn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Xl extends Yi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Zr(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Cp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Pp(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function $l(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function vu(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Mr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Lp extends Mr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ol,endingEnd:ol}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case cl:r=e,o=2*t-n;break;case ll:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case cl:a=e,c=2*n-t;break;case ll:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,x=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,v=f*m-f*_;for(let E=0;E!==o;++E)r[E]=p*a[h+E]+x*a[l+E]+y*a[c+E]+v*a[u+E];return r}}class Dp extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}}class Ip extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class zn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Zr(t,this.TimeBufferType),this.values=Zr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Zr(e.times,Array),values:Zr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ip(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Dp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Lp(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case pr:t=this.InterpolantFactoryMethodDiscrete;break;case mr:t=this.InterpolantFactoryMethodLinear;break;case Aa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pr;case this.InterpolantFactoryMethodLinear:return mr;case this.InterpolantFactoryMethodSmooth:return Aa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Cp(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Aa,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}zn.prototype.ValueTypeName="";zn.prototype.TimeBufferType=Float32Array;zn.prototype.ValueBufferType=Float32Array;zn.prototype.DefaultInterpolation=mr;class zs extends zn{constructor(e,t,n){super(e,t,n)}}zs.prototype.ValueTypeName="bool";zs.prototype.ValueBufferType=Array;zs.prototype.DefaultInterpolation=pr;zs.prototype.InterpolantFactoryMethodLinear=void 0;zs.prototype.InterpolantFactoryMethodSmooth=void 0;class xu extends zn{constructor(e,t,n,i){super(e,t,n,i)}}xu.prototype.ValueTypeName="color";class Ns extends zn{constructor(e,t,n,i){super(e,t,n,i)}}Ns.prototype.ValueTypeName="number";class Np extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let h=l+o;l!==h;l+=4)Cn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Us extends zn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Np(this.times,this.values,this.getValueSize(),e)}}Us.prototype.ValueTypeName="quaternion";Us.prototype.InterpolantFactoryMethodSmooth=void 0;class Hs extends zn{constructor(e,t,n){super(e,t,n)}}Hs.prototype.ValueTypeName="string";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=pr;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class Fs extends zn{constructor(e,t,n,i){super(e,t,n,i)}}Fs.prototype.ValueTypeName="vector";class Up{constructor(e="",t=-1,n=[],i=ef){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Bn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Op(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(zn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const h=Pp(c);c=$l(c,1,h),l=$l(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Ns(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];vu(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let x=0;x!==d[g].morphTargets.length;++x){const y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new Ns(".morphTargetInfluence["+_+"]",m,p))}c=f.length*a}else{const f=".bones["+t[u].name+"]";n(Fs,f+".position",d,"pos",i),n(Us,f+".quaternion",d,"rot",i),n(Fs,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Fp(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ns;case"vector":case"vector2":case"vector3":case"vector4":return Fs;case"color":return xu;case"quaternion":return Us;case"bool":case"boolean":return zs;case"string":return Hs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Op(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Fp(s.type);if(s.times===void 0){const t=[],n=[];vu(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const oi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class yu{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Bp=new yu;class Zi{constructor(e){this.manager=e!==void 0?e:Bp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Zi.DEFAULT_MATERIAL_NAME="__DEFAULT";const Qn={};class kp extends Error{constructor(e,t){super(e),this.response=t}}class Vc extends Zi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=oi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Qn[e]!==void 0){Qn[e].push({onLoad:t,onProgress:n,onError:i});return}Qn[e]=[],Qn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Qn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){x();function x(){u.read().then(({done:y,value:v})=>{if(y)p.close();else{_+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let w=0,A=h.length;w<A;w++){const D=h[w];D.onProgress&&D.onProgress(E)}p.enqueue(v),x()}},y=>{p.error(y)})}}});return new Response(m)}else throw new kp(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{oi.add(`file:${e}`,l);const h=Qn[e];delete Qn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Qn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Qn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ms=new WeakMap;class zp extends Zi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=oi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=ms.get(a);u===void 0&&(u=[],ms.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=gr("img");function c(){h(),t&&t(this);const u=ms.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}ms.delete(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),oi.remove(`image:${e}`);const d=ms.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}ms.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),oi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Hp extends Zi{constructor(e){super(e)}load(e,t,n,i){const r=new Gt,a=new zp(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class ba extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Vp extends ba{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const io=new rt,ql=new P,Yl=new P;class Gc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=$n,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bc,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ql.setFromMatrixPosition(e.matrixWorld),t.position.copy(ql),Yl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yl),t.updateMatrixWorld(),io.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(io,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(io)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Gp extends Gc{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ls*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Wp extends ba{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Gp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const jl=new rt,Zs=new P,so=new P;class Xp extends Gc{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Zs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Zs),so.copy(n.position),so.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(so),n.updateMatrixWorld(),i.makeTranslation(-Zs.x,-Zs.y,-Zs.z),jl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jl,n.coordinateSystem,n.reversedDepth)}}class Mu extends ba{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Xp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Sa extends ru{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $p extends Gc{constructor(){super(new Sa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dc extends ba{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new $p}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class or{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ro=new WeakMap;class qp extends Zi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=oi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if(ro.has(a)===!0)i&&i(ro.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return oi.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),ro.set(c,l),oi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});oi.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Yp extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Wc="\\[\\]\\.:\\/",jp=new RegExp("["+Wc+"]","g"),Xc="[^"+Wc+"]",Kp="[^"+Wc.replace("\\.","")+"]",Zp=/((?:WC+[\/:])*)/.source.replace("WC",Xc),Jp=/(WCOD+)?/.source.replace("WCOD",Kp),Qp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xc),em=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xc),tm=new RegExp("^"+Zp+Jp+Qp+em+"$"),nm=["material","materials","bones","map"];class im{constructor(e,t,n){const i=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Tt{constructor(e,t,n){this.path=t,this.parsedPath=n||Tt.parseTrackName(t),this.node=Tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Tt.Composite(e,t,n):new Tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(jp,"")}static parseTrackName(e){const t=tm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);nm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Tt.Composite=im;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Kl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ct(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ct(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class sm extends Ki{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Zl(s,e,t,n){const i=rm(n);switch(t){case qh:return s*e;case Rc:return s*e/i.components*i.byteLength;case Cc:return s*e/i.components*i.byteLength;case jh:return s*e*2/i.components*i.byteLength;case Pc:return s*e*2/i.components*i.byteLength;case Yh:return s*e*3/i.components*i.byteLength;case Rn:return s*e*4/i.components*i.byteLength;case Lc:return s*e*4/i.components*i.byteLength;case aa:case oa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ca:case la:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Uo:case Oo:return Math.max(s,16)*Math.max(e,8)/4;case No:case Fo:return Math.max(s,8)*Math.max(e,8)/2;case Bo:case ko:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case zo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ho:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Vo:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Go:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Xo:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case $o:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case qo:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Yo:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case jo:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ko:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Zo:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Jo:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Qo:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case ec:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case tc:case nc:case ic:return Math.ceil(s/4)*Math.ceil(e/4)*16;case sc:case rc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ac:case oc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rm(s){switch(s){case $n:case Gh:return{byteLength:1,components:1};case hr:case Wh:case xr:return{byteLength:2,components:1};case Tc:case Ac:return{byteLength:2,components:4};case $i:case wc:case Fn:return{byteLength:4,components:1};case Xh:case $h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bu(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function am(s){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(s.bindBuffer(l,o),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var om=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,um=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ym=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Mm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Am=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Cm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Pm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Dm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Im=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Um=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Om="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,km=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,zm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ym=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Km=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,eg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ng=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ig=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ag=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,og=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ug=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_g=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Sg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Eg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ag=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ig=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ng=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ug=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Og=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$g=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Yg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Kg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,e0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,t0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,n0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,r0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const a0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,o0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,f0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,p0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,m0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,x0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,y0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,M0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,w0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,A0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,R0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,L0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,U0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,B0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:om,alphahash_pars_fragment:cm,alphamap_fragment:lm,alphamap_pars_fragment:hm,alphatest_fragment:um,alphatest_pars_fragment:dm,aomap_fragment:fm,aomap_pars_fragment:pm,batching_pars_vertex:mm,batching_vertex:gm,begin_vertex:_m,beginnormal_vertex:vm,bsdfs:xm,iridescence_fragment:ym,bumpmap_pars_fragment:Mm,clipping_planes_fragment:bm,clipping_planes_pars_fragment:Sm,clipping_planes_pars_vertex:Em,clipping_planes_vertex:wm,color_fragment:Tm,color_pars_fragment:Am,color_pars_vertex:Rm,color_vertex:Cm,common:Pm,cube_uv_reflection_fragment:Lm,defaultnormal_vertex:Dm,displacementmap_pars_vertex:Im,displacementmap_vertex:Nm,emissivemap_fragment:Um,emissivemap_pars_fragment:Fm,colorspace_fragment:Om,colorspace_pars_fragment:Bm,envmap_fragment:km,envmap_common_pars_fragment:zm,envmap_pars_fragment:Hm,envmap_pars_vertex:Vm,envmap_physical_pars_fragment:Qm,envmap_vertex:Gm,fog_vertex:Wm,fog_pars_vertex:Xm,fog_fragment:$m,fog_pars_fragment:qm,gradientmap_pars_fragment:Ym,lightmap_pars_fragment:jm,lights_lambert_fragment:Km,lights_lambert_pars_fragment:Zm,lights_pars_begin:Jm,lights_toon_fragment:eg,lights_toon_pars_fragment:tg,lights_phong_fragment:ng,lights_phong_pars_fragment:ig,lights_physical_fragment:sg,lights_physical_pars_fragment:rg,lights_fragment_begin:ag,lights_fragment_maps:og,lights_fragment_end:cg,logdepthbuf_fragment:lg,logdepthbuf_pars_fragment:hg,logdepthbuf_pars_vertex:ug,logdepthbuf_vertex:dg,map_fragment:fg,map_pars_fragment:pg,map_particle_fragment:mg,map_particle_pars_fragment:gg,metalnessmap_fragment:_g,metalnessmap_pars_fragment:vg,morphinstance_vertex:xg,morphcolor_vertex:yg,morphnormal_vertex:Mg,morphtarget_pars_vertex:bg,morphtarget_vertex:Sg,normal_fragment_begin:Eg,normal_fragment_maps:wg,normal_pars_fragment:Tg,normal_pars_vertex:Ag,normal_vertex:Rg,normalmap_pars_fragment:Cg,clearcoat_normal_fragment_begin:Pg,clearcoat_normal_fragment_maps:Lg,clearcoat_pars_fragment:Dg,iridescence_pars_fragment:Ig,opaque_fragment:Ng,packing:Ug,premultiplied_alpha_fragment:Fg,project_vertex:Og,dithering_fragment:Bg,dithering_pars_fragment:kg,roughnessmap_fragment:zg,roughnessmap_pars_fragment:Hg,shadowmap_pars_fragment:Vg,shadowmap_pars_vertex:Gg,shadowmap_vertex:Wg,shadowmask_pars_fragment:Xg,skinbase_vertex:$g,skinning_pars_vertex:qg,skinning_vertex:Yg,skinnormal_vertex:jg,specularmap_fragment:Kg,specularmap_pars_fragment:Zg,tonemapping_fragment:Jg,tonemapping_pars_fragment:Qg,transmission_fragment:e0,transmission_pars_fragment:t0,uv_pars_fragment:n0,uv_pars_vertex:i0,uv_vertex:s0,worldpos_vertex:r0,background_vert:a0,background_frag:o0,backgroundCube_vert:c0,backgroundCube_frag:l0,cube_vert:h0,cube_frag:u0,depth_vert:d0,depth_frag:f0,distanceRGBA_vert:p0,distanceRGBA_frag:m0,equirect_vert:g0,equirect_frag:_0,linedashed_vert:v0,linedashed_frag:x0,meshbasic_vert:y0,meshbasic_frag:M0,meshlambert_vert:b0,meshlambert_frag:S0,meshmatcap_vert:E0,meshmatcap_frag:w0,meshnormal_vert:T0,meshnormal_frag:A0,meshphong_vert:R0,meshphong_frag:C0,meshphysical_vert:P0,meshphysical_frag:L0,meshtoon_vert:D0,meshtoon_frag:I0,points_vert:N0,points_frag:U0,shadow_vert:F0,shadow_frag:O0,sprite_vert:B0,sprite_frag:k0},Ce={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},Vn={basic:{uniforms:tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:tn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:tn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:tn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:tn([Ce.points,Ce.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:tn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:tn([Ce.common,Ce.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:tn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:tn([Ce.sprite,Ce.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:tn([Ce.common,Ce.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:tn([Ce.lights,Ce.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Vn.physical={uniforms:tn([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Jr={r:0,b:0,g:0},Oi=new Pn,z0=new rt;function H0(s,e,t,n,i,r,a){const o=new Je(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function _(y){let v=!1;const E=g(y);E===null?p(o,c):E&&E.isColor&&(p(E,1),v=!0);const w=s.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===ya)?(h===void 0&&(h=new nt(new ln(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:Ds(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Oi.copy(v.backgroundRotation),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(z0.makeRotationFromEuler(Oi)),h.material.toneMapped=mt.getTransfer(E.colorSpace)!==Rt,(u!==E||d!==E.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new nt(new Pi(2,2),new Ci({name:"BackgroundMaterial",uniforms:Ds(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=mt.getTransfer(E.colorSpace)!==Rt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,v){y.getRGB(Jr,su(s)),n.buffers.color.setClear(Jr.r,Jr.g,Jr.b,v,a)}function x(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:_,addToRenderList:m,dispose:x}}function V0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(S,I,U,V,Y){let Q=!1;const G=u(V,U,I);r!==G&&(r=G,l(r.object)),Q=f(S,V,U,Y),Q&&g(S,V,U,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,v(S,I,U,V),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return s.createVertexArray()}function l(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function u(S,I,U){const V=U.wireframe===!0;let Y=n[S.id];Y===void 0&&(Y={},n[S.id]=Y);let Q=Y[I.id];Q===void 0&&(Q={},Y[I.id]=Q);let G=Q[V];return G===void 0&&(G=d(c()),Q[V]=G),G}function d(S){const I=[],U=[],V=[];for(let Y=0;Y<t;Y++)I[Y]=0,U[Y]=0,V[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:V,object:S,attributes:{},index:null}}function f(S,I,U,V){const Y=r.attributes,Q=I.attributes;let G=0;const ae=U.getAttributes();for(const X in ae)if(ae[X].location>=0){const Me=Y[X];let Se=Q[X];if(Se===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(Se=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(Se=S.instanceColor)),Me===void 0||Me.attribute!==Se||Se&&Me.data!==Se.data)return!0;G++}return r.attributesNum!==G||r.index!==V}function g(S,I,U,V){const Y={},Q=I.attributes;let G=0;const ae=U.getAttributes();for(const X in ae)if(ae[X].location>=0){let Me=Q[X];Me===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(Me=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(Me=S.instanceColor));const Se={};Se.attribute=Me,Me&&Me.data&&(Se.data=Me.data),Y[X]=Se,G++}r.attributes=Y,r.attributesNum=G,r.index=V}function _(){const S=r.newAttributes;for(let I=0,U=S.length;I<U;I++)S[I]=0}function m(S){p(S,0)}function p(S,I){const U=r.newAttributes,V=r.enabledAttributes,Y=r.attributeDivisors;U[S]=1,V[S]===0&&(s.enableVertexAttribArray(S),V[S]=1),Y[S]!==I&&(s.vertexAttribDivisor(S,I),Y[S]=I)}function x(){const S=r.newAttributes,I=r.enabledAttributes;for(let U=0,V=I.length;U<V;U++)I[U]!==S[U]&&(s.disableVertexAttribArray(U),I[U]=0)}function y(S,I,U,V,Y,Q,G){G===!0?s.vertexAttribIPointer(S,I,U,Y,Q):s.vertexAttribPointer(S,I,U,V,Y,Q)}function v(S,I,U,V){_();const Y=V.attributes,Q=U.getAttributes(),G=I.defaultAttributeValues;for(const ae in Q){const X=Q[ae];if(X.location>=0){let fe=Y[ae];if(fe===void 0&&(ae==="instanceMatrix"&&S.instanceMatrix&&(fe=S.instanceMatrix),ae==="instanceColor"&&S.instanceColor&&(fe=S.instanceColor)),fe!==void 0){const Me=fe.normalized,Se=fe.itemSize,we=e.get(fe);if(we===void 0)continue;const at=we.buffer,Ge=we.type,it=we.bytesPerElement,te=Ge===s.INT||Ge===s.UNSIGNED_INT||fe.gpuType===wc;if(fe.isInterleavedBufferAttribute){const ie=fe.data,Te=ie.stride,ge=fe.offset;if(ie.isInstancedInterleavedBuffer){for(let pe=0;pe<X.locationSize;pe++)p(X.location+pe,ie.meshPerAttribute);S.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let pe=0;pe<X.locationSize;pe++)m(X.location+pe);s.bindBuffer(s.ARRAY_BUFFER,at);for(let pe=0;pe<X.locationSize;pe++)y(X.location+pe,Se/X.locationSize,Ge,Me,Te*it,(ge+Se/X.locationSize*pe)*it,te)}else{if(fe.isInstancedBufferAttribute){for(let ie=0;ie<X.locationSize;ie++)p(X.location+ie,fe.meshPerAttribute);S.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ie=0;ie<X.locationSize;ie++)m(X.location+ie);s.bindBuffer(s.ARRAY_BUFFER,at);for(let ie=0;ie<X.locationSize;ie++)y(X.location+ie,Se/X.locationSize,Ge,Me,Se*it,Se/X.locationSize*ie*it,te)}}else if(G!==void 0){const Me=G[ae];if(Me!==void 0)switch(Me.length){case 2:s.vertexAttrib2fv(X.location,Me);break;case 3:s.vertexAttrib3fv(X.location,Me);break;case 4:s.vertexAttrib4fv(X.location,Me);break;default:s.vertexAttrib1fv(X.location,Me)}}}}x()}function E(){D();for(const S in n){const I=n[S];for(const U in I){const V=I[U];for(const Y in V)h(V[Y].object),delete V[Y];delete I[U]}delete n[S]}}function w(S){if(n[S.id]===void 0)return;const I=n[S.id];for(const U in I){const V=I[U];for(const Y in V)h(V[Y].object),delete V[Y];delete I[U]}delete n[S.id]}function A(S){for(const I in n){const U=n[I];if(U[S.id]===void 0)continue;const V=U[S.id];for(const Y in V)h(V[Y].object),delete V[Y];delete U[S.id]}}function D(){b(),a=!0,r!==i&&(r=i,l(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:D,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function G0(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function W0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==Rn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===xr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==$n&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Fn&&!D)}function c(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:E,maxSamples:w}}function X0(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new bi,o=new lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,y=x*4;let v=p.clippingState||null;c.value=v,v=h(g,d,y,f);for(let E=0;E!==y;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,v=f;y!==_;++y,v+=4)a.copy(u[y]).applyMatrix4(x,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function $0(s){let e=new WeakMap;function t(a,o){return o===Do?a.mapping=Rs:o===Io&&(a.mapping=Cs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Do||o===Io)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Qf(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const ys=4,Jl=[.125,.215,.35,.446,.526,.582],Wi=20,ao=new Sa,Ql=new Je;let oo=null,co=0,lo=0,ho=!1;const Hi=(1+Math.sqrt(5))/2,gs=1/Hi,eh=[new P(-Hi,gs,0),new P(Hi,gs,0),new P(-gs,0,Hi),new P(gs,0,Hi),new P(0,Hi,-gs),new P(0,Hi,gs),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],q0=new P;class fc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=q0}=r;oo=this._renderer.getRenderTarget(),co=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(oo,co,lo),this._renderer.xr.enabled=ho,e.scissorTest=!1,Qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Rs||e.mapping===Cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),oo=this._renderer.getRenderTarget(),co=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:xr,format:Rn,colorSpace:on,depthBuffer:!1},i=th(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=th(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Y0(r)),this._blurMaterial=j0(r,e,t)}return i}_compileMaterial(e){const t=new nt(this._lodPlanes[0],e);this._renderer.compile(t,ao)}_sceneToCubeUV(e,t,n,i,r){const c=new sn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ql),u.toneMapping=Ti,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const _=new On({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),m=new nt(new ln,_);let p=!1;const x=e.background;x?x.isColor&&(_.color.copy(x),e.background=null,p=!0):(_.color.copy(Ql),p=!0);for(let y=0;y<6;y++){const v=y%3;v===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):v===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));const E=this._cubeSize;Qr(i,v*E,y>2?E:0,E,E),u.setRenderTarget(i),p&&u.render(m,c),u.render(e,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Rs||e.mapping===Cs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nh());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new nt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Qr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ao)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=eh[(i-r-1)%eh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new nt(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Wi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Wi;m>Wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wi}`);const p=[];let x=0;for(let A=0;A<Wi;++A){const D=A/_,b=Math.exp(-D*D/2);p.push(b),A===0?x+=b:A<m&&(x+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const v=this._sizeLods[i],E=3*v*(i>y-ys?i-y+ys:0),w=4*(this._cubeSize-v);Qr(t,E,w,3*v,2*v),c.setRenderTarget(t),c.render(u,ao)}}function Y0(s){const e=[],t=[],n=[];let i=s;const r=s-ys+1+Jl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-ys?c=Jl[a-s+ys-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),y=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,D=w>2?0:-1,b=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];x.set(b,_*g*w),y.set(d,m*g*w);const S=[w,w,w,w,w,w];v.set(S,p*g*w)}const E=new bt;E.setAttribute("position",new Bt(x,_)),E.setAttribute("uv",new Bt(y,m)),E.setAttribute("faceIndex",new Bt(v,p)),e.push(E),i>ys&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function th(s,e,t){const n=new qi(s,e,t);return n.texture.mapping=ya,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function j0(s,e,t){const n=new Float32Array(Wi),i=new P(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:Wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:$c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function nh(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function ih(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function $c(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function K0(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Do||c===Io,h=c===Rs||c===Cs;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new fc(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new fc(s)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Z0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&_r("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function J0(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let y=0,v=x.length;y<v;y+=3){const E=x[y+0],w=x[y+1],A=x[y+2];d.push(E,w,w,A,A,E)}}else if(g!==void 0){const x=g.array;_=g.version;for(let y=0,v=x.length/3-1;y<v;y+=3){const E=y+0,w=y+1,A=y+2;d.push(E,w,w,A,A,E)}}else return;const m=new(Jh(d)?iu:nu)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Q0(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*_[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function e_(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function t_(s,e,t){const n=new WeakMap,i=new xt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let b=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let v=o.attributes.position.count*y,E=1;v>e.maxTextureSize&&(E=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const w=new Float32Array(v*E*4*u),A=new Qh(w,v,E,u);A.type=Fn,A.needsUpdate=!0;const D=y*4;for(let S=0;S<u;S++){const I=m[S],U=p[S],V=x[S],Y=v*E*4*S;for(let Q=0;Q<I.count;Q++){const G=Q*D;f===!0&&(i.fromBufferAttribute(I,Q),w[Y+G+0]=i.x,w[Y+G+1]=i.y,w[Y+G+2]=i.z,w[Y+G+3]=0),g===!0&&(i.fromBufferAttribute(U,Q),w[Y+G+4]=i.x,w[Y+G+5]=i.y,w[Y+G+6]=i.z,w[Y+G+7]=0),_===!0&&(i.fromBufferAttribute(V,Q),w[Y+G+8]=i.x,w[Y+G+9]=i.y,w[Y+G+10]=i.z,w[Y+G+11]=V.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new Ee(v,E)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function n_(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const Su=new Gt,sh=new du(1,1),Eu=new Qh,wu=new Ff,Tu=new au,rh=[],ah=[],oh=new Float32Array(16),ch=new Float32Array(9),lh=new Float32Array(4);function Vs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=rh[i];if(r===void 0&&(r=new Float32Array(i),rh[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Wt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Xt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ea(s,e){let t=ah[e];t===void 0&&(t=new Int32Array(e),ah[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function i_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function s_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2fv(this.addr,e),Xt(t,e)}}function r_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;s.uniform3fv(this.addr,e),Xt(t,e)}}function a_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4fv(this.addr,e),Xt(t,e)}}function o_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;lh.set(n),s.uniformMatrix2fv(this.addr,!1,lh),Xt(t,n)}}function c_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;ch.set(n),s.uniformMatrix3fv(this.addr,!1,ch),Xt(t,n)}}function l_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;oh.set(n),s.uniformMatrix4fv(this.addr,!1,oh),Xt(t,n)}}function h_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function u_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2iv(this.addr,e),Xt(t,e)}}function d_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;s.uniform3iv(this.addr,e),Xt(t,e)}}function f_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4iv(this.addr,e),Xt(t,e)}}function p_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function m_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2uiv(this.addr,e),Xt(t,e)}}function g_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;s.uniform3uiv(this.addr,e),Xt(t,e)}}function __(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4uiv(this.addr,e),Xt(t,e)}}function v_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(sh.compareFunction=Zh,r=sh):r=Su,t.setTexture2D(e||r,i)}function x_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||wu,i)}function y_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Tu,i)}function M_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Eu,i)}function b_(s){switch(s){case 5126:return i_;case 35664:return s_;case 35665:return r_;case 35666:return a_;case 35674:return o_;case 35675:return c_;case 35676:return l_;case 5124:case 35670:return h_;case 35667:case 35671:return u_;case 35668:case 35672:return d_;case 35669:case 35673:return f_;case 5125:return p_;case 36294:return m_;case 36295:return g_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return v_;case 35679:case 36299:case 36307:return x_;case 35680:case 36300:case 36308:case 36293:return y_;case 36289:case 36303:case 36311:case 36292:return M_}}function S_(s,e){s.uniform1fv(this.addr,e)}function E_(s,e){const t=Vs(e,this.size,2);s.uniform2fv(this.addr,t)}function w_(s,e){const t=Vs(e,this.size,3);s.uniform3fv(this.addr,t)}function T_(s,e){const t=Vs(e,this.size,4);s.uniform4fv(this.addr,t)}function A_(s,e){const t=Vs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function R_(s,e){const t=Vs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function C_(s,e){const t=Vs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function P_(s,e){s.uniform1iv(this.addr,e)}function L_(s,e){s.uniform2iv(this.addr,e)}function D_(s,e){s.uniform3iv(this.addr,e)}function I_(s,e){s.uniform4iv(this.addr,e)}function N_(s,e){s.uniform1uiv(this.addr,e)}function U_(s,e){s.uniform2uiv(this.addr,e)}function F_(s,e){s.uniform3uiv(this.addr,e)}function O_(s,e){s.uniform4uiv(this.addr,e)}function B_(s,e,t){const n=this.cache,i=e.length,r=Ea(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Su,r[a])}function k_(s,e,t){const n=this.cache,i=e.length,r=Ea(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||wu,r[a])}function z_(s,e,t){const n=this.cache,i=e.length,r=Ea(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Tu,r[a])}function H_(s,e,t){const n=this.cache,i=e.length,r=Ea(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Eu,r[a])}function V_(s){switch(s){case 5126:return S_;case 35664:return E_;case 35665:return w_;case 35666:return T_;case 35674:return A_;case 35675:return R_;case 35676:return C_;case 5124:case 35670:return P_;case 35667:case 35671:return L_;case 35668:case 35672:return D_;case 35669:case 35673:return I_;case 5125:return N_;case 36294:return U_;case 36295:return F_;case 36296:return O_;case 35678:case 36198:case 36298:case 36306:case 35682:return B_;case 35679:case 36299:case 36307:return k_;case 35680:case 36300:case 36308:case 36293:return z_;case 36289:case 36303:case 36311:case 36292:return H_}}class G_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=b_(t.type)}}class W_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=V_(t.type)}}class X_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const uo=/(\w+)(\])?(\[|\.)?/g;function hh(s,e){s.seq.push(e),s.map[e.id]=e}function $_(s,e,t){const n=s.name,i=n.length;for(uo.lastIndex=0;;){const r=uo.exec(n),a=uo.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){hh(t,l===void 0?new G_(o,s,e):new W_(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new X_(o),hh(t,u)),t=u}}}class ha{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);$_(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function uh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const q_=37297;let Y_=0;function j_(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const dh=new lt;function K_(s){mt._getMatrix(dh,mt.workingColorSpace,s);const e=`mat3( ${dh.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(s)){case pa:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function fh(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+j_(s.getShaderSource(e),o)}else return r}function Z_(s,e){const t=K_(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function J_(s,e){let t;switch(e){case qd:t="Linear";break;case Yd:t="Reinhard";break;case jd:t="Cineon";break;case zh:t="ACESFilmic";break;case Zd:t="AgX";break;case Jd:t="Neutral";break;case Kd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ea=new P;function Q_(){mt.getLuminanceCoefficients(ea);const s=ea.x.toFixed(4),e=ea.y.toFixed(4),t=ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ev(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ir).join(`
`)}function tv(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nv(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function ir(s){return s!==""}function ph(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mh(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const iv=/^[ \t]*#include +<([\w\d./]+)>/gm;function pc(s){return s.replace(iv,rv)}const sv=new Map;function rv(s,e){let t=ht[e];if(t===void 0){const n=sv.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return pc(t)}const av=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gh(s){return s.replace(av,ov)}function ov(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function _h(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cv(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Bh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===kh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ni&&(e="SHADOWMAP_TYPE_VSM"),e}function lv(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Rs:case Cs:e="ENVMAP_TYPE_CUBE";break;case ya:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Cs:e="ENVMAP_MODE_REFRACTION";break}return e}function uv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ec:e="ENVMAP_BLENDING_MULTIPLY";break;case Xd:e="ENVMAP_BLENDING_MIX";break;case $d:e="ENVMAP_BLENDING_ADD";break}return e}function dv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function fv(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=cv(t),l=lv(t),h=hv(t),u=uv(t),d=dv(t),f=ev(t),g=tv(r),_=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ir).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ir).join(`
`),p.length>0&&(p+=`
`)):(m=[_h(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ir).join(`
`),p=[_h(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ti?"#define TONE_MAPPING":"",t.toneMapping!==Ti?ht.tonemapping_pars_fragment:"",t.toneMapping!==Ti?J_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Z_("linearToOutputTexel",t.outputColorSpace),Q_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ir).join(`
`)),a=pc(a),a=ph(a,t),a=mh(a,t),o=pc(o),o=ph(o,t),o=mh(o,t),a=gh(a),o=gh(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=x+m+a,v=x+p+o,E=uh(i,i.VERTEX_SHADER,y),w=uh(i,i.FRAGMENT_SHADER,v);i.attachShader(_,E),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(I){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(_)||"",V=i.getShaderInfoLog(E)||"",Y=i.getShaderInfoLog(w)||"",Q=U.trim(),G=V.trim(),ae=Y.trim();let X=!0,fe=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,w);else{const Me=fh(i,E,"vertex"),Se=fh(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+Q+`
`+Me+`
`+Se)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(G===""||ae==="")&&(fe=!1);fe&&(I.diagnostics={runnable:X,programLog:Q,vertexShader:{log:G,prefix:m},fragmentShader:{log:ae,prefix:p}})}i.deleteShader(E),i.deleteShader(w),D=new ha(i,_),b=nv(i,_)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,q_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Y_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=w,this}let pv=0;class mv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new gv(e),t.set(e,n)),n}}class gv{constructor(e){this.id=pv++,this.code=e,this.usedTimes=0}}function _v(s,e,t,n,i,r,a){const o=new eu,c=new mv,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,S,I,U,V){const Y=U.fog,Q=V.geometry,G=b.isMeshStandardMaterial?U.environment:null,ae=(b.isMeshStandardMaterial?t:e).get(b.envMap||G),X=ae&&ae.mapping===ya?ae.image.height:null,fe=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const Me=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Se=Me!==void 0?Me.length:0;let we=0;Q.morphAttributes.position!==void 0&&(we=1),Q.morphAttributes.normal!==void 0&&(we=2),Q.morphAttributes.color!==void 0&&(we=3);let at,Ge,it,te;if(fe){const ke=Vn[fe];at=ke.vertexShader,Ge=ke.fragmentShader}else at=b.vertexShader,Ge=b.fragmentShader,c.update(b),it=c.getVertexShaderID(b),te=c.getFragmentShaderID(b);const ie=s.getRenderTarget(),Te=s.state.buffers.depth.getReversed(),ge=V.isInstancedMesh===!0,pe=V.isBatchedMesh===!0,Oe=!!b.map,We=!!b.matcap,N=!!ae,Ie=!!b.aoMap,Pe=!!b.lightMap,Ae=!!b.bumpMap,oe=!!b.normalMap,ze=!!b.displacementMap,me=!!b.emissiveMap,Le=!!b.metalnessMap,Ke=!!b.roughnessMap,Ze=b.anisotropy>0,C=b.clearcoat>0,M=b.dispersion>0,z=b.iridescence>0,J=b.sheen>0,se=b.transmission>0,ee=Ze&&!!b.anisotropyMap,Ne=C&&!!b.clearcoatMap,le=C&&!!b.clearcoatNormalMap,He=C&&!!b.clearcoatRoughnessMap,Be=z&&!!b.iridescenceMap,ce=z&&!!b.iridescenceThicknessMap,be=J&&!!b.sheenColorMap,Xe=J&&!!b.sheenRoughnessMap,$=!!b.specularMap,j=!!b.specularColorMap,F=!!b.specularIntensityMap,R=se&&!!b.transmissionMap,B=se&&!!b.thicknessMap,q=!!b.gradientMap,ne=!!b.alphaMap,W=b.alphaTest>0,O=!!b.alphaHash,re=!!b.extensions;let de=Ti;b.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(de=s.toneMapping);const Ue={shaderID:fe,shaderType:b.type,shaderName:b.name,vertexShader:at,fragmentShader:Ge,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:te,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:pe,batchingColor:pe&&V._colorsTexture!==null,instancing:ge,instancingColor:ge&&V.instanceColor!==null,instancingMorph:ge&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ie===null?s.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:on,alphaToCoverage:!!b.alphaToCoverage,map:Oe,matcap:We,envMap:N,envMapMode:N&&ae.mapping,envMapCubeUVHeight:X,aoMap:Ie,lightMap:Pe,bumpMap:Ae,normalMap:oe,displacementMap:d&&ze,emissiveMap:me,normalMapObjectSpace:oe&&b.normalMapType===rf,normalMapTangentSpace:oe&&b.normalMapType===Dc,metalnessMap:Le,roughnessMap:Ke,anisotropy:Ze,anisotropyMap:ee,clearcoat:C,clearcoatMap:Ne,clearcoatNormalMap:le,clearcoatRoughnessMap:He,dispersion:M,iridescence:z,iridescenceMap:Be,iridescenceThicknessMap:ce,sheen:J,sheenColorMap:be,sheenRoughnessMap:Xe,specularMap:$,specularColorMap:j,specularIntensityMap:F,transmission:se,transmissionMap:R,thicknessMap:B,gradientMap:q,opaque:b.transparent===!1&&b.blending===bs&&b.alphaToCoverage===!1,alphaMap:ne,alphaTest:W,alphaHash:O,combine:b.combine,mapUv:Oe&&_(b.map.channel),aoMapUv:Ie&&_(b.aoMap.channel),lightMapUv:Pe&&_(b.lightMap.channel),bumpMapUv:Ae&&_(b.bumpMap.channel),normalMapUv:oe&&_(b.normalMap.channel),displacementMapUv:ze&&_(b.displacementMap.channel),emissiveMapUv:me&&_(b.emissiveMap.channel),metalnessMapUv:Le&&_(b.metalnessMap.channel),roughnessMapUv:Ke&&_(b.roughnessMap.channel),anisotropyMapUv:ee&&_(b.anisotropyMap.channel),clearcoatMapUv:Ne&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:le&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:He&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Be&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:be&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Xe&&_(b.sheenRoughnessMap.channel),specularMapUv:$&&_(b.specularMap.channel),specularColorMapUv:j&&_(b.specularColorMap.channel),specularIntensityMapUv:F&&_(b.specularIntensityMap.channel),transmissionMapUv:R&&_(b.transmissionMap.channel),thicknessMapUv:B&&_(b.thicknessMap.channel),alphaMapUv:ne&&_(b.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(oe||Ze),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Q.attributes.uv&&(Oe||ne),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Te,skinning:V.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:we,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:de,decodeVideoTexture:Oe&&b.map.isVideoTexture===!0&&mt.getTransfer(b.map.colorSpace)===Rt,decodeVideoTextureEmissive:me&&b.emissiveMap.isVideoTexture===!0&&mt.getTransfer(b.emissiveMap.colorSpace)===Rt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Vt,flipSided:b.side===rn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:re&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&b.extensions.multiDraw===!0||pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)S.push(I),S.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(x(S,b),y(S,b),S.push(s.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function x(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function y(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),b.push(o.mask)}function v(b){const S=g[b.type];let I;if(S){const U=Vn[S];I=jf.clone(U.uniforms)}else I=b.uniforms;return I}function E(b,S){let I;for(let U=0,V=h.length;U<V;U++){const Y=h[U];if(Y.cacheKey===S){I=Y,++I.usedTimes;break}}return I===void 0&&(I=new fv(s,S,b,r),h.push(I)),I}function w(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function A(b){c.remove(b)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:D}}function vv(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function xv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function vh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function xh(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||xv),n.length>1&&n.sort(d||vh),i.length>1&&i.sort(d||vh)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function yv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new xh,s.set(n,[a])):i>=r.length?(a=new xh,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Mv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Je};break;case"SpotLight":t={position:new P,direction:new P,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new P,halfWidth:new P,halfHeight:new P};break}return s[e.id]=t,t}}}function bv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Sv=0;function Ev(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function wv(s){const e=new Mv,t=bv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const i=new P,r=new rt,a=new rt;function o(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,x=0,y=0,v=0,E=0,w=0,A=0;l.sort(Ev);for(let b=0,S=l.length;b<S;b++){const I=l[b],U=I.color,V=I.intensity,Y=I.distance,Q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=U.r*V,u+=U.g*V,d+=U.b*V;else if(I.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(I.sh.coefficients[G],V);A++}else if(I.isDirectionalLight){const G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ae=I.shadow,X=t.get(I);X.shadowIntensity=ae.intensity,X.shadowBias=ae.bias,X.shadowNormalBias=ae.normalBias,X.shadowRadius=ae.radius,X.shadowMapSize=ae.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=I.shadow.matrix,x++}n.directional[f]=G,f++}else if(I.isSpotLight){const G=e.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(U).multiplyScalar(V),G.distance=Y,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,n.spot[_]=G;const ae=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,ae.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[_]=ae.matrix,I.castShadow){const X=t.get(I);X.shadowIntensity=ae.intensity,X.shadowBias=ae.bias,X.shadowNormalBias=ae.normalBias,X.shadowRadius=ae.radius,X.shadowMapSize=ae.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=Q,v++}_++}else if(I.isRectAreaLight){const G=e.get(I);G.color.copy(U).multiplyScalar(V),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=G,m++}else if(I.isPointLight){const G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){const ae=I.shadow,X=t.get(I);X.shadowIntensity=ae.intensity,X.shadowBias=ae.bias,X.shadowNormalBias=ae.normalBias,X.shadowRadius=ae.radius,X.shadowMapSize=ae.mapSize,X.shadowCameraNear=ae.camera.near,X.shadowCameraFar=ae.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=I.shadow.matrix,y++}n.point[g]=G,g++}else if(I.isHemisphereLight){const G=e.get(I);G.skyColor.copy(I.color).multiplyScalar(V),G.groundColor.copy(I.groundColor).multiplyScalar(V),n.hemi[p]=G,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==x||D.numPointShadows!==y||D.numSpotShadows!==v||D.numSpotMaps!==E||D.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,D.directionalLength=f,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=x,D.numPointShadows=y,D.numSpotShadows=v,D.numSpotMaps=E,D.numLightProbes=A,n.version=Sv++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const y=l[p];if(y.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(y.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function yh(s){const e=new wv(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Tv(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new yh(s),e.set(i,[o])):r>=a.length?(o=new yh(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Cv(s,e,t){let n=new Bc;const i=new Ee,r=new Ee,a=new xt,o=new Ap({depthPacking:sf}),c=new Rp,l={},h=t.maxTextureSize,u={[ui]:rn,[rn]:ui,[Vt]:Vt},d=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:Av,fragmentShader:Rv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new bt;g.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new nt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bh;let p=this.type;this.render=function(w,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const b=s.getRenderTarget(),S=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),U=s.state;U.setBlending(wi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const V=p!==ni&&this.type===ni,Y=p===ni&&this.type!==ni;for(let Q=0,G=w.length;Q<G;Q++){const ae=w[Q],X=ae.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",ae,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const fe=X.getFrameExtents();if(i.multiply(fe),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/fe.x),i.x=r.x*fe.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/fe.y),i.y=r.y*fe.y,X.mapSize.y=r.y)),X.map===null||V===!0||Y===!0){const Se=this.type!==ni?{minFilter:an,magFilter:an}:{};X.map!==null&&X.map.dispose(),X.map=new qi(i.x,i.y,Se),X.map.texture.name=ae.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const Me=X.getViewportCount();for(let Se=0;Se<Me;Se++){const we=X.getViewport(Se);a.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),U.viewport(a),X.updateMatrices(ae,Se),n=X.getFrustum(),v(A,D,X.camera,ae,this.type)}X.isPointLightShadow!==!0&&this.type===ni&&x(X,D),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,S,I)};function x(w,A){const D=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new qi(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(A,null,D,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(A,null,D,f,_,null)}function y(w,A,D,b){let S=null;const I=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)S=I;else if(S=D.isPointLight===!0?c:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=S.uuid,V=A.uuid;let Y=l[U];Y===void 0&&(Y={},l[U]=Y);let Q=Y[V];Q===void 0&&(Q=S.clone(),Y[V]=Q,A.addEventListener("dispose",E)),S=Q}if(S.visible=A.visible,S.wireframe=A.wireframe,b===ni?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:u[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=s.properties.get(S);U.light=D}return S}function v(w,A,D,b,S){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===ni)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);const V=e.update(w),Y=w.material;if(Array.isArray(Y)){const Q=V.groups;for(let G=0,ae=Q.length;G<ae;G++){const X=Q[G],fe=Y[X.materialIndex];if(fe&&fe.visible){const Me=y(w,fe,b,S);w.onBeforeShadow(s,w,A,D,V,Me,X),s.renderBufferDirect(D,null,V,Me,w,X),w.onAfterShadow(s,w,A,D,V,Me,X)}}}else if(Y.visible){const Q=y(w,Y,b,S);w.onBeforeShadow(s,w,A,D,V,Q,null),s.renderBufferDirect(D,null,V,Q,w,null),w.onAfterShadow(s,w,A,D,V,Q,null)}}const U=w.children;for(let V=0,Y=U.length;V<Y;V++)v(U[V],A,D,b,S)}function E(w){w.target.removeEventListener("dispose",E);for(const D in l){const b=l[D],S=w.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const Pv={[wo]:To,[Ao]:Po,[Ro]:Lo,[As]:Co,[To]:wo,[Po]:Ao,[Lo]:Ro,[Co]:As};function Lv(s,e){function t(){let R=!1;const B=new xt;let q=null;const ne=new xt(0,0,0,0);return{setMask:function(W){q!==W&&!R&&(s.colorMask(W,W,W,W),q=W)},setLocked:function(W){R=W},setClear:function(W,O,re,de,Ue){Ue===!0&&(W*=de,O*=de,re*=de),B.set(W,O,re,de),ne.equals(B)===!1&&(s.clearColor(W,O,re,de),ne.copy(B))},reset:function(){R=!1,q=null,ne.set(-1,0,0,0)}}}function n(){let R=!1,B=!1,q=null,ne=null,W=null;return{setReversed:function(O){if(B!==O){const re=e.get("EXT_clip_control");O?re.clipControlEXT(re.LOWER_LEFT_EXT,re.ZERO_TO_ONE_EXT):re.clipControlEXT(re.LOWER_LEFT_EXT,re.NEGATIVE_ONE_TO_ONE_EXT),B=O;const de=W;W=null,this.setClear(de)}},getReversed:function(){return B},setTest:function(O){O?ie(s.DEPTH_TEST):Te(s.DEPTH_TEST)},setMask:function(O){q!==O&&!R&&(s.depthMask(O),q=O)},setFunc:function(O){if(B&&(O=Pv[O]),ne!==O){switch(O){case wo:s.depthFunc(s.NEVER);break;case To:s.depthFunc(s.ALWAYS);break;case Ao:s.depthFunc(s.LESS);break;case As:s.depthFunc(s.LEQUAL);break;case Ro:s.depthFunc(s.EQUAL);break;case Co:s.depthFunc(s.GEQUAL);break;case Po:s.depthFunc(s.GREATER);break;case Lo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ne=O}},setLocked:function(O){R=O},setClear:function(O){W!==O&&(B&&(O=1-O),s.clearDepth(O),W=O)},reset:function(){R=!1,q=null,ne=null,W=null,B=!1}}}function i(){let R=!1,B=null,q=null,ne=null,W=null,O=null,re=null,de=null,Ue=null;return{setTest:function(ke){R||(ke?ie(s.STENCIL_TEST):Te(s.STENCIL_TEST))},setMask:function(ke){B!==ke&&!R&&(s.stencilMask(ke),B=ke)},setFunc:function(ke,ft,gt){(q!==ke||ne!==ft||W!==gt)&&(s.stencilFunc(ke,ft,gt),q=ke,ne=ft,W=gt)},setOp:function(ke,ft,gt){(O!==ke||re!==ft||de!==gt)&&(s.stencilOp(ke,ft,gt),O=ke,re=ft,de=gt)},setLocked:function(ke){R=ke},setClear:function(ke){Ue!==ke&&(s.clearStencil(ke),Ue=ke)},reset:function(){R=!1,B=null,q=null,ne=null,W=null,O=null,re=null,de=null,Ue=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,y=null,v=null,E=null,w=null,A=new Je(0,0,0),D=0,b=!1,S=null,I=null,U=null,V=null,Y=null;const Q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,ae=0;const X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(X)[1]),G=ae>=1):X.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),G=ae>=2);let fe=null,Me={};const Se=s.getParameter(s.SCISSOR_BOX),we=s.getParameter(s.VIEWPORT),at=new xt().fromArray(Se),Ge=new xt().fromArray(we);function it(R,B,q,ne){const W=new Uint8Array(4),O=s.createTexture();s.bindTexture(R,O),s.texParameteri(R,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(R,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let re=0;re<q;re++)R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY?s.texImage3D(B,0,s.RGBA,1,1,ne,0,s.RGBA,s.UNSIGNED_BYTE,W):s.texImage2D(B+re,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,W);return O}const te={};te[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),te[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),te[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(s.DEPTH_TEST),a.setFunc(As),Ae(!1),oe(nl),ie(s.CULL_FACE),Ie(wi);function ie(R){h[R]!==!0&&(s.enable(R),h[R]=!0)}function Te(R){h[R]!==!1&&(s.disable(R),h[R]=!1)}function ge(R,B){return u[R]!==B?(s.bindFramebuffer(R,B),u[R]=B,R===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=B),R===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=B),!0):!1}function pe(R,B){let q=f,ne=!1;if(R){q=d.get(B),q===void 0&&(q=[],d.set(B,q));const W=R.textures;if(q.length!==W.length||q[0]!==s.COLOR_ATTACHMENT0){for(let O=0,re=W.length;O<re;O++)q[O]=s.COLOR_ATTACHMENT0+O;q.length=W.length,ne=!0}}else q[0]!==s.BACK&&(q[0]=s.BACK,ne=!0);ne&&s.drawBuffers(q)}function Oe(R){return g!==R?(s.useProgram(R),g=R,!0):!1}const We={[Gi]:s.FUNC_ADD,[Rd]:s.FUNC_SUBTRACT,[Cd]:s.FUNC_REVERSE_SUBTRACT};We[Pd]=s.MIN,We[Ld]=s.MAX;const N={[Dd]:s.ZERO,[Id]:s.ONE,[Nd]:s.SRC_COLOR,[So]:s.SRC_ALPHA,[zd]:s.SRC_ALPHA_SATURATE,[Bd]:s.DST_COLOR,[Fd]:s.DST_ALPHA,[Ud]:s.ONE_MINUS_SRC_COLOR,[Eo]:s.ONE_MINUS_SRC_ALPHA,[kd]:s.ONE_MINUS_DST_COLOR,[Od]:s.ONE_MINUS_DST_ALPHA,[Hd]:s.CONSTANT_COLOR,[Vd]:s.ONE_MINUS_CONSTANT_COLOR,[Gd]:s.CONSTANT_ALPHA,[Wd]:s.ONE_MINUS_CONSTANT_ALPHA};function Ie(R,B,q,ne,W,O,re,de,Ue,ke){if(R===wi){_===!0&&(Te(s.BLEND),_=!1);return}if(_===!1&&(ie(s.BLEND),_=!0),R!==Ad){if(R!==m||ke!==b){if((p!==Gi||v!==Gi)&&(s.blendEquation(s.FUNC_ADD),p=Gi,v=Gi),ke)switch(R){case bs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case il:s.blendFunc(s.ONE,s.ONE);break;case sl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case rl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case bs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case il:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case sl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}x=null,y=null,E=null,w=null,A.set(0,0,0),D=0,m=R,b=ke}return}W=W||B,O=O||q,re=re||ne,(B!==p||W!==v)&&(s.blendEquationSeparate(We[B],We[W]),p=B,v=W),(q!==x||ne!==y||O!==E||re!==w)&&(s.blendFuncSeparate(N[q],N[ne],N[O],N[re]),x=q,y=ne,E=O,w=re),(de.equals(A)===!1||Ue!==D)&&(s.blendColor(de.r,de.g,de.b,Ue),A.copy(de),D=Ue),m=R,b=!1}function Pe(R,B){R.side===Vt?Te(s.CULL_FACE):ie(s.CULL_FACE);let q=R.side===rn;B&&(q=!q),Ae(q),R.blending===bs&&R.transparent===!1?Ie(wi):Ie(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);const ne=R.stencilWrite;o.setTest(ne),ne&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),me(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ie(s.SAMPLE_ALPHA_TO_COVERAGE):Te(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(R){S!==R&&(R?s.frontFace(s.CW):s.frontFace(s.CCW),S=R)}function oe(R){R!==wd?(ie(s.CULL_FACE),R!==I&&(R===nl?s.cullFace(s.BACK):R===Td?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Te(s.CULL_FACE),I=R}function ze(R){R!==U&&(G&&s.lineWidth(R),U=R)}function me(R,B,q){R?(ie(s.POLYGON_OFFSET_FILL),(V!==B||Y!==q)&&(s.polygonOffset(B,q),V=B,Y=q)):Te(s.POLYGON_OFFSET_FILL)}function Le(R){R?ie(s.SCISSOR_TEST):Te(s.SCISSOR_TEST)}function Ke(R){R===void 0&&(R=s.TEXTURE0+Q-1),fe!==R&&(s.activeTexture(R),fe=R)}function Ze(R,B,q){q===void 0&&(fe===null?q=s.TEXTURE0+Q-1:q=fe);let ne=Me[q];ne===void 0&&(ne={type:void 0,texture:void 0},Me[q]=ne),(ne.type!==R||ne.texture!==B)&&(fe!==q&&(s.activeTexture(q),fe=q),s.bindTexture(R,B||te[R]),ne.type=R,ne.texture=B)}function C(){const R=Me[fe];R!==void 0&&R.type!==void 0&&(s.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function M(){try{s.compressedTexImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function z(){try{s.compressedTexImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function J(){try{s.texSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function se(){try{s.texSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ee(){try{s.compressedTexSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ne(){try{s.compressedTexSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function le(){try{s.texStorage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function He(){try{s.texStorage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Be(){try{s.texImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ce(){try{s.texImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function be(R){at.equals(R)===!1&&(s.scissor(R.x,R.y,R.z,R.w),at.copy(R))}function Xe(R){Ge.equals(R)===!1&&(s.viewport(R.x,R.y,R.z,R.w),Ge.copy(R))}function $(R,B){let q=l.get(B);q===void 0&&(q=new WeakMap,l.set(B,q));let ne=q.get(R);ne===void 0&&(ne=s.getUniformBlockIndex(B,R.name),q.set(R,ne))}function j(R,B){const ne=l.get(B).get(R);c.get(B)!==ne&&(s.uniformBlockBinding(B,ne,R.__bindingPointIndex),c.set(B,ne))}function F(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},fe=null,Me={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,y=null,v=null,E=null,w=null,A=new Je(0,0,0),D=0,b=!1,S=null,I=null,U=null,V=null,Y=null,at.set(0,0,s.canvas.width,s.canvas.height),Ge.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:Te,bindFramebuffer:ge,drawBuffers:pe,useProgram:Oe,setBlending:Ie,setMaterial:Pe,setFlipSided:Ae,setCullFace:oe,setLineWidth:ze,setPolygonOffset:me,setScissorTest:Le,activeTexture:Ke,bindTexture:Ze,unbindTexture:C,compressedTexImage2D:M,compressedTexImage3D:z,texImage2D:Be,texImage3D:ce,updateUBOMapping:$,uniformBlockBinding:j,texStorage2D:le,texStorage3D:He,texSubImage2D:J,texSubImage3D:se,compressedTexSubImage2D:ee,compressedTexSubImage3D:Ne,scissor:be,viewport:Xe,reset:F}}function Dv(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ee,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,M){return f?new OffscreenCanvas(C,M):gr("canvas")}function _(C,M,z){let J=1;const se=Ze(C);if((se.width>z||se.height>z)&&(J=z/Math.max(se.width,se.height)),J<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ee=Math.floor(J*se.width),Ne=Math.floor(J*se.height);u===void 0&&(u=g(ee,Ne));const le=M?g(ee,Ne):u;return le.width=ee,le.height=Ne,le.getContext("2d").drawImage(C,0,0,ee,Ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+ee+"x"+Ne+")."),le}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){s.generateMipmap(C)}function x(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(C,M,z,J,se=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ee=M;if(M===s.RED&&(z===s.FLOAT&&(ee=s.R32F),z===s.HALF_FLOAT&&(ee=s.R16F),z===s.UNSIGNED_BYTE&&(ee=s.R8)),M===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.R8UI),z===s.UNSIGNED_SHORT&&(ee=s.R16UI),z===s.UNSIGNED_INT&&(ee=s.R32UI),z===s.BYTE&&(ee=s.R8I),z===s.SHORT&&(ee=s.R16I),z===s.INT&&(ee=s.R32I)),M===s.RG&&(z===s.FLOAT&&(ee=s.RG32F),z===s.HALF_FLOAT&&(ee=s.RG16F),z===s.UNSIGNED_BYTE&&(ee=s.RG8)),M===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.RG8UI),z===s.UNSIGNED_SHORT&&(ee=s.RG16UI),z===s.UNSIGNED_INT&&(ee=s.RG32UI),z===s.BYTE&&(ee=s.RG8I),z===s.SHORT&&(ee=s.RG16I),z===s.INT&&(ee=s.RG32I)),M===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.RGB8UI),z===s.UNSIGNED_SHORT&&(ee=s.RGB16UI),z===s.UNSIGNED_INT&&(ee=s.RGB32UI),z===s.BYTE&&(ee=s.RGB8I),z===s.SHORT&&(ee=s.RGB16I),z===s.INT&&(ee=s.RGB32I)),M===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(ee=s.RGBA16UI),z===s.UNSIGNED_INT&&(ee=s.RGBA32UI),z===s.BYTE&&(ee=s.RGBA8I),z===s.SHORT&&(ee=s.RGBA16I),z===s.INT&&(ee=s.RGBA32I)),M===s.RGB&&(z===s.UNSIGNED_INT_5_9_9_9_REV&&(ee=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(ee=s.R11F_G11F_B10F)),M===s.RGBA){const Ne=se?pa:mt.getTransfer(J);z===s.FLOAT&&(ee=s.RGBA32F),z===s.HALF_FLOAT&&(ee=s.RGBA16F),z===s.UNSIGNED_BYTE&&(ee=Ne===Rt?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(C,M){let z;return C?M===null||M===$i||M===ur?z=s.DEPTH24_STENCIL8:M===Fn?z=s.DEPTH32F_STENCIL8:M===hr&&(z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===$i||M===ur?z=s.DEPTH_COMPONENT24:M===Fn?z=s.DEPTH_COMPONENT32F:M===hr&&(z=s.DEPTH_COMPONENT16),z}function E(C,M){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==an&&C.minFilter!==yn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function w(C){const M=C.target;M.removeEventListener("dispose",w),D(M),M.isVideoTexture&&h.delete(M)}function A(C){const M=C.target;M.removeEventListener("dispose",A),S(M)}function D(C){const M=n.get(C);if(M.__webglInit===void 0)return;const z=C.source,J=d.get(z);if(J){const se=J[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&b(C),Object.keys(J).length===0&&d.delete(z)}n.remove(C)}function b(C){const M=n.get(C);s.deleteTexture(M.__webglTexture);const z=C.source,J=d.get(z);delete J[M.__cacheKey],a.memory.textures--}function S(C){const M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let se=0;se<M.__webglFramebuffer[J].length;se++)s.deleteFramebuffer(M.__webglFramebuffer[J][se]);else s.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)s.deleteFramebuffer(M.__webglFramebuffer[J]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const z=C.textures;for(let J=0,se=z.length;J<se;J++){const ee=n.get(z[J]);ee.__webglTexture&&(s.deleteTexture(ee.__webglTexture),a.memory.textures--),n.remove(z[J])}n.remove(C)}let I=0;function U(){I=0}function V(){const C=I;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),I+=1,C}function Y(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function Q(C,M){const z=n.get(C);if(C.isVideoTexture&&Le(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){const J=C.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(z,C,M);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+M)}function G(C,M){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){te(z,C,M);return}t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+M)}function ae(C,M){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){te(z,C,M);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+M)}function X(C,M){const z=n.get(C);if(C.version>0&&z.__version!==C.version){ie(z,C,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+M)}const fe={[Ps]:s.REPEAT,[Ei]:s.CLAMP_TO_EDGE,[fa]:s.MIRRORED_REPEAT},Me={[an]:s.NEAREST,[Vh]:s.NEAREST_MIPMAP_NEAREST,[nr]:s.NEAREST_MIPMAP_LINEAR,[yn]:s.LINEAR,[ra]:s.LINEAR_MIPMAP_NEAREST,[ai]:s.LINEAR_MIPMAP_LINEAR},Se={[af]:s.NEVER,[df]:s.ALWAYS,[of]:s.LESS,[Zh]:s.LEQUAL,[cf]:s.EQUAL,[uf]:s.GEQUAL,[lf]:s.GREATER,[hf]:s.NOTEQUAL};function we(C,M){if(M.type===Fn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===yn||M.magFilter===ra||M.magFilter===nr||M.magFilter===ai||M.minFilter===yn||M.minFilter===ra||M.minFilter===nr||M.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,fe[M.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,fe[M.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,fe[M.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Me[M.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Me[M.minFilter]),M.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,Se[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===an||M.minFilter!==nr&&M.minFilter!==ai||M.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function at(C,M){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",w));const J=M.source;let se=d.get(J);se===void 0&&(se={},d.set(J,se));const ee=Y(M);if(ee!==C.__cacheKey){se[ee]===void 0&&(se[ee]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),se[ee].usedTimes++;const Ne=se[C.__cacheKey];Ne!==void 0&&(se[C.__cacheKey].usedTimes--,Ne.usedTimes===0&&b(M)),C.__cacheKey=ee,C.__webglTexture=se[ee].texture}return z}function Ge(C,M,z){return Math.floor(Math.floor(C/z)/M)}function it(C,M,z,J){const ee=C.updateRanges;if(ee.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,z,J,M.data);else{ee.sort((ce,be)=>ce.start-be.start);let Ne=0;for(let ce=1;ce<ee.length;ce++){const be=ee[Ne],Xe=ee[ce],$=be.start+be.count,j=Ge(Xe.start,M.width,4),F=Ge(be.start,M.width,4);Xe.start<=$+1&&j===F&&Ge(Xe.start+Xe.count-1,M.width,4)===j?be.count=Math.max(be.count,Xe.start+Xe.count-be.start):(++Ne,ee[Ne]=Xe)}ee.length=Ne+1;const le=s.getParameter(s.UNPACK_ROW_LENGTH),He=s.getParameter(s.UNPACK_SKIP_PIXELS),Be=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let ce=0,be=ee.length;ce<be;ce++){const Xe=ee[ce],$=Math.floor(Xe.start/4),j=Math.ceil(Xe.count/4),F=$%M.width,R=Math.floor($/M.width),B=j,q=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,F),s.pixelStorei(s.UNPACK_SKIP_ROWS,R),t.texSubImage2D(s.TEXTURE_2D,0,F,R,B,q,z,J,M.data)}C.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,le),s.pixelStorei(s.UNPACK_SKIP_PIXELS,He),s.pixelStorei(s.UNPACK_SKIP_ROWS,Be)}}function te(C,M,z){let J=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=s.TEXTURE_3D);const se=at(C,M),ee=M.source;t.bindTexture(J,C.__webglTexture,s.TEXTURE0+z);const Ne=n.get(ee);if(ee.version!==Ne.__version||se===!0){t.activeTexture(s.TEXTURE0+z);const le=mt.getPrimaries(mt.workingColorSpace),He=M.colorSpace===Si?null:mt.getPrimaries(M.colorSpace),Be=M.colorSpace===Si||le===He?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);let ce=_(M.image,!1,i.maxTextureSize);ce=Ke(M,ce);const be=r.convert(M.format,M.colorSpace),Xe=r.convert(M.type);let $=y(M.internalFormat,be,Xe,M.colorSpace,M.isVideoTexture);we(J,M);let j;const F=M.mipmaps,R=M.isVideoTexture!==!0,B=Ne.__version===void 0||se===!0,q=ee.dataReady,ne=E(M,ce);if(M.isDepthTexture)$=v(M.format===fr,M.type),B&&(R?t.texStorage2D(s.TEXTURE_2D,1,$,ce.width,ce.height):t.texImage2D(s.TEXTURE_2D,0,$,ce.width,ce.height,0,be,Xe,null));else if(M.isDataTexture)if(F.length>0){R&&B&&t.texStorage2D(s.TEXTURE_2D,ne,$,F[0].width,F[0].height);for(let W=0,O=F.length;W<O;W++)j=F[W],R?q&&t.texSubImage2D(s.TEXTURE_2D,W,0,0,j.width,j.height,be,Xe,j.data):t.texImage2D(s.TEXTURE_2D,W,$,j.width,j.height,0,be,Xe,j.data);M.generateMipmaps=!1}else R?(B&&t.texStorage2D(s.TEXTURE_2D,ne,$,ce.width,ce.height),q&&it(M,ce,be,Xe)):t.texImage2D(s.TEXTURE_2D,0,$,ce.width,ce.height,0,be,Xe,ce.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){R&&B&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ne,$,F[0].width,F[0].height,ce.depth);for(let W=0,O=F.length;W<O;W++)if(j=F[W],M.format!==Rn)if(be!==null)if(R){if(q)if(M.layerUpdates.size>0){const re=Zl(j.width,j.height,M.format,M.type);for(const de of M.layerUpdates){const Ue=j.data.subarray(de*re/j.data.BYTES_PER_ELEMENT,(de+1)*re/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,de,j.width,j.height,1,be,Ue)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,j.width,j.height,ce.depth,be,j.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,W,$,j.width,j.height,ce.depth,0,j.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?q&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,j.width,j.height,ce.depth,be,Xe,j.data):t.texImage3D(s.TEXTURE_2D_ARRAY,W,$,j.width,j.height,ce.depth,0,be,Xe,j.data)}else{R&&B&&t.texStorage2D(s.TEXTURE_2D,ne,$,F[0].width,F[0].height);for(let W=0,O=F.length;W<O;W++)j=F[W],M.format!==Rn?be!==null?R?q&&t.compressedTexSubImage2D(s.TEXTURE_2D,W,0,0,j.width,j.height,be,j.data):t.compressedTexImage2D(s.TEXTURE_2D,W,$,j.width,j.height,0,j.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?q&&t.texSubImage2D(s.TEXTURE_2D,W,0,0,j.width,j.height,be,Xe,j.data):t.texImage2D(s.TEXTURE_2D,W,$,j.width,j.height,0,be,Xe,j.data)}else if(M.isDataArrayTexture)if(R){if(B&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ne,$,ce.width,ce.height,ce.depth),q)if(M.layerUpdates.size>0){const W=Zl(ce.width,ce.height,M.format,M.type);for(const O of M.layerUpdates){const re=ce.data.subarray(O*W/ce.data.BYTES_PER_ELEMENT,(O+1)*W/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,O,ce.width,ce.height,1,be,Xe,re)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,be,Xe,ce.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,$,ce.width,ce.height,ce.depth,0,be,Xe,ce.data);else if(M.isData3DTexture)R?(B&&t.texStorage3D(s.TEXTURE_3D,ne,$,ce.width,ce.height,ce.depth),q&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,be,Xe,ce.data)):t.texImage3D(s.TEXTURE_3D,0,$,ce.width,ce.height,ce.depth,0,be,Xe,ce.data);else if(M.isFramebufferTexture){if(B)if(R)t.texStorage2D(s.TEXTURE_2D,ne,$,ce.width,ce.height);else{let W=ce.width,O=ce.height;for(let re=0;re<ne;re++)t.texImage2D(s.TEXTURE_2D,re,$,W,O,0,be,Xe,null),W>>=1,O>>=1}}else if(F.length>0){if(R&&B){const W=Ze(F[0]);t.texStorage2D(s.TEXTURE_2D,ne,$,W.width,W.height)}for(let W=0,O=F.length;W<O;W++)j=F[W],R?q&&t.texSubImage2D(s.TEXTURE_2D,W,0,0,be,Xe,j):t.texImage2D(s.TEXTURE_2D,W,$,be,Xe,j);M.generateMipmaps=!1}else if(R){if(B){const W=Ze(ce);t.texStorage2D(s.TEXTURE_2D,ne,$,W.width,W.height)}q&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,be,Xe,ce)}else t.texImage2D(s.TEXTURE_2D,0,$,be,Xe,ce);m(M)&&p(J),Ne.__version=ee.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ie(C,M,z){if(M.image.length!==6)return;const J=at(C,M),se=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+z);const ee=n.get(se);if(se.version!==ee.__version||J===!0){t.activeTexture(s.TEXTURE0+z);const Ne=mt.getPrimaries(mt.workingColorSpace),le=M.colorSpace===Si?null:mt.getPrimaries(M.colorSpace),He=M.colorSpace===Si||Ne===le?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);const Be=M.isCompressedTexture||M.image[0].isCompressedTexture,ce=M.image[0]&&M.image[0].isDataTexture,be=[];for(let O=0;O<6;O++)!Be&&!ce?be[O]=_(M.image[O],!0,i.maxCubemapSize):be[O]=ce?M.image[O].image:M.image[O],be[O]=Ke(M,be[O]);const Xe=be[0],$=r.convert(M.format,M.colorSpace),j=r.convert(M.type),F=y(M.internalFormat,$,j,M.colorSpace),R=M.isVideoTexture!==!0,B=ee.__version===void 0||J===!0,q=se.dataReady;let ne=E(M,Xe);we(s.TEXTURE_CUBE_MAP,M);let W;if(Be){R&&B&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ne,F,Xe.width,Xe.height);for(let O=0;O<6;O++){W=be[O].mipmaps;for(let re=0;re<W.length;re++){const de=W[re];M.format!==Rn?$!==null?R?q&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,re,0,0,de.width,de.height,$,de.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,re,F,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,re,0,0,de.width,de.height,$,j,de.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,re,F,de.width,de.height,0,$,j,de.data)}}}else{if(W=M.mipmaps,R&&B){W.length>0&&ne++;const O=Ze(be[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ne,F,O.width,O.height)}for(let O=0;O<6;O++)if(ce){R?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,0,0,be[O].width,be[O].height,$,j,be[O].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,F,be[O].width,be[O].height,0,$,j,be[O].data);for(let re=0;re<W.length;re++){const Ue=W[re].image[O].image;R?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,re+1,0,0,Ue.width,Ue.height,$,j,Ue.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,re+1,F,Ue.width,Ue.height,0,$,j,Ue.data)}}else{R?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,0,0,$,j,be[O]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,F,$,j,be[O]);for(let re=0;re<W.length;re++){const de=W[re];R?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,re+1,0,0,$,j,de.image[O]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,re+1,F,$,j,de.image[O])}}}m(M)&&p(s.TEXTURE_CUBE_MAP),ee.__version=se.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Te(C,M,z,J,se,ee){const Ne=r.convert(z.format,z.colorSpace),le=r.convert(z.type),He=y(z.internalFormat,Ne,le,z.colorSpace),Be=n.get(M),ce=n.get(z);if(ce.__renderTarget=M,!Be.__hasExternalTextures){const be=Math.max(1,M.width>>ee),Xe=Math.max(1,M.height>>ee);se===s.TEXTURE_3D||se===s.TEXTURE_2D_ARRAY?t.texImage3D(se,ee,He,be,Xe,M.depth,0,Ne,le,null):t.texImage2D(se,ee,He,be,Xe,0,Ne,le,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,se,ce.__webglTexture,0,ze(M)):(se===s.TEXTURE_2D||se>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,se,ce.__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ge(C,M,z){if(s.bindRenderbuffer(s.RENDERBUFFER,C),M.depthBuffer){const J=M.depthTexture,se=J&&J.isDepthTexture?J.type:null,ee=v(M.stencilBuffer,se),Ne=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=ze(M);me(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,le,ee,M.width,M.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,le,ee,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ee,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ne,s.RENDERBUFFER,C)}else{const J=M.textures;for(let se=0;se<J.length;se++){const ee=J[se],Ne=r.convert(ee.format,ee.colorSpace),le=r.convert(ee.type),He=y(ee.internalFormat,Ne,le,ee.colorSpace),Be=ze(M);z&&me(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Be,He,M.width,M.height):me(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Be,He,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,He,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function pe(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(M.depthTexture);J.__renderTarget=M,(!J.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Q(M.depthTexture,0);const se=J.__webglTexture,ee=ze(M);if(M.depthTexture.format===dr)me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(M.depthTexture.format===fr)me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Oe(C){const M=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const J=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){const se=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",se)};J.addEventListener("dispose",se),M.__depthDisposeCallback=se}M.__boundDepthTexture=J}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const J=C.texture.mipmaps;J&&J.length>0?pe(M.__webglFramebuffer[0],C):pe(M.__webglFramebuffer,C)}else if(z){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=s.createRenderbuffer(),ge(M.__webglDepthbuffer[J],C,!1);else{const se=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,ee)}}else{const J=C.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),ge(M.__webglDepthbuffer,C,!1);else{const se=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,ee)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function We(C,M,z){const J=n.get(C);M!==void 0&&Te(J.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Oe(C)}function N(C){const M=C.texture,z=n.get(C),J=n.get(M);C.addEventListener("dispose",A);const se=C.textures,ee=C.isWebGLCubeRenderTarget===!0,Ne=se.length>1;if(Ne||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=M.version,a.memory.textures++),ee){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let He=0;He<M.mipmaps.length;He++)z.__webglFramebuffer[le][He]=s.createFramebuffer()}else z.__webglFramebuffer[le]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<M.mipmaps.length;le++)z.__webglFramebuffer[le]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(Ne)for(let le=0,He=se.length;le<He;le++){const Be=n.get(se[le]);Be.__webglTexture===void 0&&(Be.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&me(C)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let le=0;le<se.length;le++){const He=se[le];z.__webglColorRenderbuffer[le]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[le]);const Be=r.convert(He.format,He.colorSpace),ce=r.convert(He.type),be=y(He.internalFormat,Be,ce,He.colorSpace,C.isXRRenderTarget===!0),Xe=ze(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,Xe,be,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,z.__webglColorRenderbuffer[le])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),ge(z.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ee){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),we(s.TEXTURE_CUBE_MAP,M);for(let le=0;le<6;le++)if(M.mipmaps&&M.mipmaps.length>0)for(let He=0;He<M.mipmaps.length;He++)Te(z.__webglFramebuffer[le][He],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,He);else Te(z.__webglFramebuffer[le],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(M)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ne){for(let le=0,He=se.length;le<He;le++){const Be=se[le],ce=n.get(Be);let be=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(be=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(be,ce.__webglTexture),we(be,Be),Te(z.__webglFramebuffer,C,Be,s.COLOR_ATTACHMENT0+le,be,0),m(Be)&&p(be)}t.unbindTexture()}else{let le=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(le=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(le,J.__webglTexture),we(le,M),M.mipmaps&&M.mipmaps.length>0)for(let He=0;He<M.mipmaps.length;He++)Te(z.__webglFramebuffer[He],C,M,s.COLOR_ATTACHMENT0,le,He);else Te(z.__webglFramebuffer,C,M,s.COLOR_ATTACHMENT0,le,0);m(M)&&p(le),t.unbindTexture()}C.depthBuffer&&Oe(C)}function Ie(C){const M=C.textures;for(let z=0,J=M.length;z<J;z++){const se=M[z];if(m(se)){const ee=x(C),Ne=n.get(se).__webglTexture;t.bindTexture(ee,Ne),p(ee),t.unbindTexture()}}}const Pe=[],Ae=[];function oe(C){if(C.samples>0){if(me(C)===!1){const M=C.textures,z=C.width,J=C.height;let se=s.COLOR_BUFFER_BIT;const ee=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ne=n.get(C),le=M.length>1;if(le)for(let Be=0;Be<M.length;Be++)t.bindFramebuffer(s.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Be,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ne.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Be,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer);const He=C.texture.mipmaps;He&&He.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let Be=0;Be<M.length;Be++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(se|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(se|=s.STENCIL_BUFFER_BIT)),le){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ne.__webglColorRenderbuffer[Be]);const ce=n.get(M[Be]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ce,0)}s.blitFramebuffer(0,0,z,J,0,0,z,J,se,s.NEAREST),c===!0&&(Pe.length=0,Ae.length=0,Pe.push(s.COLOR_ATTACHMENT0+Be),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Pe.push(ee),Ae.push(ee),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ae)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),le)for(let Be=0;Be<M.length;Be++){t.bindFramebuffer(s.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Be,s.RENDERBUFFER,Ne.__webglColorRenderbuffer[Be]);const ce=n.get(M[Be]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ne.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Be,s.TEXTURE_2D,ce,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function ze(C){return Math.min(i.maxSamples,C.samples)}function me(C){const M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Le(C){const M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function Ke(C,M){const z=C.colorSpace,J=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==on&&z!==Si&&(mt.getTransfer(z)===Rt?(J!==Rn||se!==$n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}function Ze(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=U,this.setTexture2D=Q,this.setTexture2DArray=G,this.setTexture3D=ae,this.setTextureCube=X,this.rebindTextures=We,this.setupRenderTarget=N,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=me}function Iv(s,e){function t(n,i=Si){let r;const a=mt.getTransfer(i);if(n===$n)return s.UNSIGNED_BYTE;if(n===Tc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ac)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Xh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===$h)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gh)return s.BYTE;if(n===Wh)return s.SHORT;if(n===hr)return s.UNSIGNED_SHORT;if(n===wc)return s.INT;if(n===$i)return s.UNSIGNED_INT;if(n===Fn)return s.FLOAT;if(n===xr)return s.HALF_FLOAT;if(n===qh)return s.ALPHA;if(n===Yh)return s.RGB;if(n===Rn)return s.RGBA;if(n===dr)return s.DEPTH_COMPONENT;if(n===fr)return s.DEPTH_STENCIL;if(n===Rc)return s.RED;if(n===Cc)return s.RED_INTEGER;if(n===jh)return s.RG;if(n===Pc)return s.RG_INTEGER;if(n===Lc)return s.RGBA_INTEGER;if(n===aa||n===oa||n===ca||n===la)if(a===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ca)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===No||n===Uo||n===Fo||n===Oo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===No)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Bo||n===ko||n===zo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Bo||n===ko)return a===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===zo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ho||n===Vo||n===Go||n===Wo||n===Xo||n===$o||n===qo||n===Yo||n===jo||n===Ko||n===Zo||n===Jo||n===Qo||n===ec)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ho)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Go)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$o)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===qo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ko)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Qo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ec)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===tc||n===nc||n===ic)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===tc)return a===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===nc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ic)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sc||n===rc||n===ac||n===oc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===sc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===rc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ac)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===oc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ur?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Nv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Uv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Fv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new fu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ci({vertexShader:Nv,fragmentShader:Uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new Pi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ov extends Ki{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Fv,p={},x=t.getContextAttributes();let y=null,v=null;const E=[],w=[],A=new Ee;let D=null;const b=new sn;b.viewport=new xt;const S=new sn;S.viewport=new xt;const I=[b,S],U=new Yp;let V=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ie=E[te];return ie===void 0&&(ie=new Ya,E[te]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(te){let ie=E[te];return ie===void 0&&(ie=new Ya,E[te]=ie),ie.getGripSpace()},this.getHand=function(te){let ie=E[te];return ie===void 0&&(ie=new Ya,E[te]=ie),ie.getHandSpace()};function Q(te){const ie=w.indexOf(te.inputSource);if(ie===-1)return;const Te=E[ie];Te!==void 0&&(Te.update(te.inputSource,te.frame,l||a),Te.dispatchEvent({type:te.type,data:te.inputSource}))}function G(){i.removeEventListener("select",Q),i.removeEventListener("selectstart",Q),i.removeEventListener("selectend",Q),i.removeEventListener("squeeze",Q),i.removeEventListener("squeezestart",Q),i.removeEventListener("squeezeend",Q),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",ae);for(let te=0;te<E.length;te++){const ie=w[te];ie!==null&&(w[te]=null,E[te].disconnect(ie))}V=null,Y=null,m.reset();for(const te in p)delete p[te];e.setRenderTarget(y),f=null,d=null,u=null,i=null,v=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",Q),i.addEventListener("selectstart",Q),i.addEventListener("selectend",Q),i.addEventListener("squeeze",Q),i.addEventListener("squeezestart",Q),i.addEventListener("squeezeend",Q),i.addEventListener("end",G),i.addEventListener("inputsourceschange",ae),x.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,ge=null,pe=null;x.depth&&(pe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=x.stencil?fr:dr,ge=x.stencil?ur:$i);const Oe={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Oe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new qi(d.textureWidth,d.textureHeight,{format:Rn,type:$n,depthTexture:new du(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Te={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Te),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new qi(f.framebufferWidth,f.framebufferHeight,{format:Rn,type:$n,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),it.setContext(i),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ae(te){for(let ie=0;ie<te.removed.length;ie++){const Te=te.removed[ie],ge=w.indexOf(Te);ge>=0&&(w[ge]=null,E[ge].disconnect(Te))}for(let ie=0;ie<te.added.length;ie++){const Te=te.added[ie];let ge=w.indexOf(Te);if(ge===-1){for(let Oe=0;Oe<E.length;Oe++)if(Oe>=w.length){w.push(Te),ge=Oe;break}else if(w[Oe]===null){w[Oe]=Te,ge=Oe;break}if(ge===-1)break}const pe=E[ge];pe&&pe.connect(Te)}}const X=new P,fe=new P;function Me(te,ie,Te){X.setFromMatrixPosition(ie.matrixWorld),fe.setFromMatrixPosition(Te.matrixWorld);const ge=X.distanceTo(fe),pe=ie.projectionMatrix.elements,Oe=Te.projectionMatrix.elements,We=pe[14]/(pe[10]-1),N=pe[14]/(pe[10]+1),Ie=(pe[9]+1)/pe[5],Pe=(pe[9]-1)/pe[5],Ae=(pe[8]-1)/pe[0],oe=(Oe[8]+1)/Oe[0],ze=We*Ae,me=We*oe,Le=ge/(-Ae+oe),Ke=Le*-Ae;if(ie.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Ke),te.translateZ(Le),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),pe[10]===-1)te.projectionMatrix.copy(ie.projectionMatrix),te.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Ze=We+Le,C=N+Le,M=ze-Ke,z=me+(ge-Ke),J=Ie*N/C*Ze,se=Pe*N/C*Ze;te.projectionMatrix.makePerspective(M,z,J,se,Ze,C),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function Se(te,ie){ie===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ie.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let ie=te.near,Te=te.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(Te=m.depthFar)),U.near=S.near=b.near=ie,U.far=S.far=b.far=Te,(V!==U.near||Y!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),V=U.near,Y=U.far),U.layers.mask=te.layers.mask|6,b.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;const ge=te.parent,pe=U.cameras;Se(U,ge);for(let Oe=0;Oe<pe.length;Oe++)Se(pe[Oe],ge);pe.length===2?Me(U,b,S):U.projectionMatrix.copy(b.projectionMatrix),we(te,U,ge)};function we(te,ie,Te){Te===null?te.matrix.copy(ie.matrixWorld):(te.matrix.copy(Te.matrixWorld),te.matrix.invert(),te.matrix.multiply(ie.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(ie.projectionMatrix),te.projectionMatrixInverse.copy(ie.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Ls*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(te){c=te,d!==null&&(d.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(te){return p[te]};let at=null;function Ge(te,ie){if(h=ie.getViewerPose(l||a),g=ie,h!==null){const Te=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ge=!1;Te.length!==U.cameras.length&&(U.cameras.length=0,ge=!0);for(let N=0;N<Te.length;N++){const Ie=Te[N];let Pe=null;if(f!==null)Pe=f.getViewport(Ie);else{const oe=u.getViewSubImage(d,Ie);Pe=oe.viewport,N===0&&(e.setRenderTargetTextures(v,oe.colorTexture,oe.depthStencilTexture),e.setRenderTarget(v))}let Ae=I[N];Ae===void 0&&(Ae=new sn,Ae.layers.enable(N),Ae.viewport=new xt,I[N]=Ae),Ae.matrix.fromArray(Ie.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Ie.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),N===0&&(U.matrix.copy(Ae.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ge===!0&&U.cameras.push(Ae)}const pe=i.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const N=u.getDepthInformation(Te[0]);N&&N.isValid&&N.texture&&m.init(N,i.renderState)}if(pe&&pe.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let N=0;N<Te.length;N++){const Ie=Te[N].camera;if(Ie){let Pe=p[Ie];Pe||(Pe=new fu,p[Ie]=Pe);const Ae=u.getCameraImage(Ie);Pe.sourceTexture=Ae}}}}for(let Te=0;Te<E.length;Te++){const ge=w[Te],pe=E[Te];ge!==null&&pe!==void 0&&pe.update(ge,ie,l||a)}at&&at(te,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const it=new bu;it.setAnimationLoop(Ge),this.setAnimationLoop=function(te){at=te},this.dispose=function(){}}}const Bi=new Pn,Bv=new rt;function kv(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,su(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,x,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===rn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===rn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),y=x.envMap,v=x.envMapRotation;y&&(m.envMap.value=y,Bi.copy(v),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),m.envMapRotation.value.setFromMatrix4(Bv.makeRotationFromEuler(Bi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===rn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function zv(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const v=y.program;n.uniformBlockBinding(x,v)}function l(x,y){let v=i[x.id];v===void 0&&(g(x),v=h(x),i[x.id]=v,x.addEventListener("dispose",m));const E=y.program;n.updateUBOMapping(x,E);const w=e.render.frame;r[x.id]!==w&&(d(x),r[x.id]=w)}function h(x){const y=u();x.__bindingPointIndex=y;const v=s.createBuffer(),E=x.__size,w=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,E,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,v),v}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],v=x.uniforms,E=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let w=0,A=v.length;w<A;w++){const D=Array.isArray(v[w])?v[w]:[v[w]];for(let b=0,S=D.length;b<S;b++){const I=D[b];if(f(I,w,b,E)===!0){const U=I.__offset,V=Array.isArray(I.value)?I.value:[I.value];let Y=0;for(let Q=0;Q<V.length;Q++){const G=V[Q],ae=_(G);typeof G=="number"||typeof G=="boolean"?(I.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,U+Y,I.__data)):G.isMatrix3?(I.__data[0]=G.elements[0],I.__data[1]=G.elements[1],I.__data[2]=G.elements[2],I.__data[3]=0,I.__data[4]=G.elements[3],I.__data[5]=G.elements[4],I.__data[6]=G.elements[5],I.__data[7]=0,I.__data[8]=G.elements[6],I.__data[9]=G.elements[7],I.__data[10]=G.elements[8],I.__data[11]=0):(G.toArray(I.__data,Y),Y+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,v,E){const w=x.value,A=y+"_"+v;if(E[A]===void 0)return typeof w=="number"||typeof w=="boolean"?E[A]=w:E[A]=w.clone(),!0;{const D=E[A];if(typeof w=="number"||typeof w=="boolean"){if(D!==w)return E[A]=w,!0}else if(D.equals(w)===!1)return D.copy(w),!0}return!1}function g(x){const y=x.uniforms;let v=0;const E=16;for(let A=0,D=y.length;A<D;A++){const b=Array.isArray(y[A])?y[A]:[y[A]];for(let S=0,I=b.length;S<I;S++){const U=b[S],V=Array.isArray(U.value)?U.value:[U.value];for(let Y=0,Q=V.length;Y<Q;Y++){const G=V[Y],ae=_(G),X=v%E,fe=X%ae.boundary,Me=X+fe;v+=fe,Me!==0&&E-Me<ae.storage&&(v+=E-Me),U.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=ae.storage}}}const w=v%E;return w>0&&(v+=E-w),x.__size=v,x.__cache={},this}function _(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class Hv{constructor(e={}){const{canvas:t=Cf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=Ft;let w=0,A=0,D=null,b=-1,S=null;const I=new xt,U=new xt;let V=null;const Y=new Je(0);let Q=0,G=t.width,ae=t.height,X=1,fe=null,Me=null;const Se=new xt(0,0,G,ae),we=new xt(0,0,G,ae);let at=!1;const Ge=new Bc;let it=!1,te=!1;const ie=new rt,Te=new P,ge=new xt,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function We(){return D===null?X:1}let N=n;function Ie(T,k){return t.getContext(T,k)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Sc}`),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",ne,!1),t.addEventListener("webglcontextcreationerror",W,!1),N===null){const k="webgl2";if(N=Ie(k,T),N===null)throw Ie(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Pe,Ae,oe,ze,me,Le,Ke,Ze,C,M,z,J,se,ee,Ne,le,He,Be,ce,be,Xe,$,j,F;function R(){Pe=new Z0(N),Pe.init(),$=new Iv(N,Pe),Ae=new W0(N,Pe,e,$),oe=new Lv(N,Pe),Ae.reversedDepthBuffer&&d&&oe.buffers.depth.setReversed(!0),ze=new e_(N),me=new vv,Le=new Dv(N,Pe,oe,me,Ae,$,ze),Ke=new $0(v),Ze=new K0(v),C=new am(N),j=new V0(N,C),M=new J0(N,C,ze,j),z=new n_(N,M,C,ze),ce=new t_(N,Ae,Le),le=new X0(me),J=new _v(v,Ke,Ze,Pe,Ae,j,le),se=new kv(v,me),ee=new yv,Ne=new Tv(Pe),Be=new H0(v,Ke,Ze,oe,z,f,c),He=new Cv(v,z,Ae),F=new zv(N,ze,Ae,oe),be=new G0(N,Pe,ze),Xe=new Q0(N,Pe,ze),ze.programs=J.programs,v.capabilities=Ae,v.extensions=Pe,v.properties=me,v.renderLists=ee,v.shadowMap=He,v.state=oe,v.info=ze}R();const B=new Ov(v,N);this.xr=B,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=Pe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Pe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(G,ae,!1))},this.getSize=function(T){return T.set(G,ae)},this.setSize=function(T,k,K=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=T,ae=k,t.width=Math.floor(T*X),t.height=Math.floor(k*X),K===!0&&(t.style.width=T+"px",t.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(G*X,ae*X).floor()},this.setDrawingBufferSize=function(T,k,K){G=T,ae=k,X=K,t.width=Math.floor(T*K),t.height=Math.floor(k*K),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(Se)},this.setViewport=function(T,k,K,Z){T.isVector4?Se.set(T.x,T.y,T.z,T.w):Se.set(T,k,K,Z),oe.viewport(I.copy(Se).multiplyScalar(X).round())},this.getScissor=function(T){return T.copy(we)},this.setScissor=function(T,k,K,Z){T.isVector4?we.set(T.x,T.y,T.z,T.w):we.set(T,k,K,Z),oe.scissor(U.copy(we).multiplyScalar(X).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(T){oe.setScissorTest(at=T)},this.setOpaqueSort=function(T){fe=T},this.setTransparentSort=function(T){Me=T},this.getClearColor=function(T){return T.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,K=!0){let Z=0;if(T){let H=!1;if(D!==null){const ve=D.texture.format;H=ve===Lc||ve===Pc||ve===Cc}if(H){const ve=D.texture.type,De=ve===$n||ve===$i||ve===hr||ve===ur||ve===Tc||ve===Ac,Ve=Be.getClearColor(),Fe=Be.getClearAlpha(),Qe=Ve.r,tt=Ve.g,qe=Ve.b;De?(g[0]=Qe,g[1]=tt,g[2]=qe,g[3]=Fe,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Qe,_[1]=tt,_[2]=qe,_[3]=Fe,N.clearBufferiv(N.COLOR,0,_))}else Z|=N.COLOR_BUFFER_BIT}k&&(Z|=N.DEPTH_BUFFER_BIT),K&&(Z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",ne,!1),t.removeEventListener("webglcontextcreationerror",W,!1),Be.dispose(),ee.dispose(),Ne.dispose(),me.dispose(),Ke.dispose(),Ze.dispose(),z.dispose(),j.dispose(),F.dispose(),J.dispose(),B.dispose(),B.removeEventListener("sessionstart",gt),B.removeEventListener("sessionend",ue),xe.stop()};function q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ne(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=ze.autoReset,k=He.enabled,K=He.autoUpdate,Z=He.needsUpdate,H=He.type;R(),ze.autoReset=T,He.enabled=k,He.autoUpdate=K,He.needsUpdate=Z,He.type=H}function W(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function O(T){const k=T.target;k.removeEventListener("dispose",O),re(k)}function re(T){de(T),me.remove(T)}function de(T){const k=me.get(T).programs;k!==void 0&&(k.forEach(function(K){J.releaseProgram(K)}),T.isShaderMaterial&&J.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,K,Z,H,ve){k===null&&(k=pe);const De=H.isMesh&&H.matrixWorld.determinant()<0,Ve=Zt(T,k,K,Z,H);oe.setMaterial(Z,De);let Fe=K.index,Qe=1;if(Z.wireframe===!0){if(Fe=M.getWireframeAttribute(K),Fe===void 0)return;Qe=2}const tt=K.drawRange,qe=K.attributes.position;let pt=tt.start*Qe,At=(tt.start+tt.count)*Qe;ve!==null&&(pt=Math.max(pt,ve.start*Qe),At=Math.min(At,(ve.start+ve.count)*Qe)),Fe!==null?(pt=Math.max(pt,0),At=Math.min(At,Fe.count)):qe!=null&&(pt=Math.max(pt,0),At=Math.min(At,qe.count));const Ut=At-pt;if(Ut<0||Ut===1/0)return;j.setup(H,Z,Ve,K,Fe);let Dt,Lt=be;if(Fe!==null&&(Dt=C.get(Fe),Lt=Xe,Lt.setIndex(Dt)),H.isMesh)Z.wireframe===!0?(oe.setLineWidth(Z.wireframeLinewidth*We()),Lt.setMode(N.LINES)):Lt.setMode(N.TRIANGLES);else if(H.isLine){let je=Z.linewidth;je===void 0&&(je=1),oe.setLineWidth(je*We()),H.isLineSegments?Lt.setMode(N.LINES):H.isLineLoop?Lt.setMode(N.LINE_LOOP):Lt.setMode(N.LINE_STRIP)}else H.isPoints?Lt.setMode(N.POINTS):H.isSprite&&Lt.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)_r("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Lt.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Pe.get("WEBGL_multi_draw"))Lt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const je=H._multiDrawStarts,It=H._multiDrawCounts,_t=H._multiDrawCount,pn=Fe?C.get(Fe).bytesPerElement:1,Ji=me.get(Z).currentProgram.getUniforms();for(let mn=0;mn<_t;mn++)Ji.setValue(N,"_gl_DrawID",mn),Lt.render(je[mn]/pn,It[mn])}else if(H.isInstancedMesh)Lt.renderInstances(pt,Ut,H.count);else if(K.isInstancedBufferGeometry){const je=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,It=Math.min(K.instanceCount,je);Lt.renderInstances(pt,Ut,It)}else Lt.render(pt,Ut)};function Ue(T,k,K){T.transparent===!0&&T.side===Vt&&T.forceSinglePass===!1?(T.side=rn,T.needsUpdate=!0,kt(T,k,K),T.side=ui,T.needsUpdate=!0,kt(T,k,K),T.side=Vt):kt(T,k,K)}this.compile=function(T,k,K=null){K===null&&(K=T),p=Ne.get(K),p.init(k),y.push(p),K.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),T!==K&&T.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const Z=new Set;return T.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ve=H.material;if(ve)if(Array.isArray(ve))for(let De=0;De<ve.length;De++){const Ve=ve[De];Ue(Ve,K,H),Z.add(Ve)}else Ue(ve,K,H),Z.add(ve)}),p=y.pop(),Z},this.compileAsync=function(T,k,K=null){const Z=this.compile(T,k,K);return new Promise(H=>{function ve(){if(Z.forEach(function(De){me.get(De).currentProgram.isReady()&&Z.delete(De)}),Z.size===0){H(T);return}setTimeout(ve,10)}Pe.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let ke=null;function ft(T){ke&&ke(T)}function gt(){xe.stop()}function ue(){xe.start()}const xe=new bu;xe.setAnimationLoop(ft),typeof self<"u"&&xe.setContext(self),this.setAnimationLoop=function(T){ke=T,B.setAnimationLoop(T),T===null?xe.stop():xe.start()},B.addEventListener("sessionstart",gt),B.addEventListener("sessionend",ue),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(B.cameraAutoUpdate===!0&&B.updateCamera(k),k=B.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,k,D),p=Ne.get(T,y.length),p.init(k),y.push(p),ie.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ge.setFromProjectionMatrix(ie,Gn,k.reversedDepth),te=this.localClippingEnabled,it=le.init(this.clippingPlanes,te),m=ee.get(T,x.length),m.init(),x.push(m),B.enabled===!0&&B.isPresenting===!0){const ve=v.xr.getDepthSensingMesh();ve!==null&&ye(ve,k,-1/0,v.sortObjects)}ye(T,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(fe,Me),Oe=B.enabled===!1||B.isPresenting===!1||B.hasDepthSensing()===!1,Oe&&Be.addToRenderList(m,T),this.info.render.frame++,it===!0&&le.beginShadows();const K=p.state.shadowsArray;He.render(K,T,k),it===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=m.opaque,H=m.transmissive;if(p.setupLights(),k.isArrayCamera){const ve=k.cameras;if(H.length>0)for(let De=0,Ve=ve.length;De<Ve;De++){const Fe=ve[De];Re(Z,H,T,Fe)}Oe&&Be.render(T);for(let De=0,Ve=ve.length;De<Ve;De++){const Fe=ve[De];$e(m,T,Fe,Fe.viewport)}}else H.length>0&&Re(Z,H,T,k),Oe&&Be.render(T),$e(m,T,k);D!==null&&A===0&&(Le.updateMultisampleRenderTarget(D),Le.updateRenderTargetMipmap(D)),T.isScene===!0&&T.onAfterRender(v,T,k),j.resetDefaultState(),b=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],it===!0&&le.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function ye(T,k,K,Z){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ge.intersectsSprite(T)){Z&&ge.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ie);const De=z.update(T),Ve=T.material;Ve.visible&&m.push(T,De,Ve,K,ge.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ge.intersectsObject(T))){const De=z.update(T),Ve=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ge.copy(T.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),ge.copy(De.boundingSphere.center)),ge.applyMatrix4(T.matrixWorld).applyMatrix4(ie)),Array.isArray(Ve)){const Fe=De.groups;for(let Qe=0,tt=Fe.length;Qe<tt;Qe++){const qe=Fe[Qe],pt=Ve[qe.materialIndex];pt&&pt.visible&&m.push(T,De,pt,K,ge.z,qe)}}else Ve.visible&&m.push(T,De,Ve,K,ge.z,null)}}const ve=T.children;for(let De=0,Ve=ve.length;De<Ve;De++)ye(ve[De],k,K,Z)}function $e(T,k,K,Z){const H=T.opaque,ve=T.transmissive,De=T.transparent;p.setupLightsView(K),it===!0&&le.setGlobalState(v.clippingPlanes,K),Z&&oe.viewport(I.copy(Z)),H.length>0&&ut(H,k,K),ve.length>0&&ut(ve,k,K),De.length>0&&ut(De,k,K),oe.buffers.depth.setTest(!0),oe.buffers.depth.setMask(!0),oe.buffers.color.setMask(!0),oe.setPolygonOffset(!1)}function Re(T,k,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Z.id]===void 0&&(p.state.transmissionRenderTarget[Z.id]=new qi(1,1,{generateMipmaps:!0,type:Pe.has("EXT_color_buffer_half_float")||Pe.has("EXT_color_buffer_float")?xr:$n,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));const ve=p.state.transmissionRenderTarget[Z.id],De=Z.viewport||I;ve.setSize(De.z*v.transmissionResolutionScale,De.w*v.transmissionResolutionScale);const Ve=v.getRenderTarget(),Fe=v.getActiveCubeFace(),Qe=v.getActiveMipmapLevel();v.setRenderTarget(ve),v.getClearColor(Y),Q=v.getClearAlpha(),Q<1&&v.setClearColor(16777215,.5),v.clear(),Oe&&Be.render(K);const tt=v.toneMapping;v.toneMapping=Ti;const qe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),p.setupLightsView(Z),it===!0&&le.setGlobalState(v.clippingPlanes,Z),ut(T,K,Z),Le.updateMultisampleRenderTarget(ve),Le.updateRenderTargetMipmap(ve),Pe.has("WEBGL_multisampled_render_to_texture")===!1){let pt=!1;for(let At=0,Ut=k.length;At<Ut;At++){const Dt=k[At],Lt=Dt.object,je=Dt.geometry,It=Dt.material,_t=Dt.group;if(It.side===Vt&&Lt.layers.test(Z.layers)){const pn=It.side;It.side=rn,It.needsUpdate=!0,yt(Lt,K,Z,je,It,_t),It.side=pn,It.needsUpdate=!0,pt=!0}}pt===!0&&(Le.updateMultisampleRenderTarget(ve),Le.updateRenderTargetMipmap(ve))}v.setRenderTarget(Ve,Fe,Qe),v.setClearColor(Y,Q),qe!==void 0&&(Z.viewport=qe),v.toneMapping=tt}function ut(T,k,K){const Z=k.isScene===!0?k.overrideMaterial:null;for(let H=0,ve=T.length;H<ve;H++){const De=T[H],Ve=De.object,Fe=De.geometry,Qe=De.group;let tt=De.material;tt.allowOverride===!0&&Z!==null&&(tt=Z),Ve.layers.test(K.layers)&&yt(Ve,k,K,Fe,tt,Qe)}}function yt(T,k,K,Z,H,ve){T.onBeforeRender(v,k,K,Z,H,ve),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),H.onBeforeRender(v,k,K,Z,T,ve),H.transparent===!0&&H.side===Vt&&H.forceSinglePass===!1?(H.side=rn,H.needsUpdate=!0,v.renderBufferDirect(K,k,Z,H,T,ve),H.side=ui,H.needsUpdate=!0,v.renderBufferDirect(K,k,Z,H,T,ve),H.side=Vt):v.renderBufferDirect(K,k,Z,H,T,ve),T.onAfterRender(v,k,K,Z,H,ve)}function kt(T,k,K){k.isScene!==!0&&(k=pe);const Z=me.get(T),H=p.state.lights,ve=p.state.shadowsArray,De=H.state.version,Ve=J.getParameters(T,H.state,ve,k,K),Fe=J.getProgramCacheKey(Ve);let Qe=Z.programs;Z.environment=T.isMeshStandardMaterial?k.environment:null,Z.fog=k.fog,Z.envMap=(T.isMeshStandardMaterial?Ze:Ke).get(T.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,Qe===void 0&&(T.addEventListener("dispose",O),Qe=new Map,Z.programs=Qe);let tt=Qe.get(Fe);if(tt!==void 0){if(Z.currentProgram===tt&&Z.lightsStateVersion===De)return St(T,Ve),tt}else Ve.uniforms=J.getUniforms(T),T.onBeforeCompile(Ve,v),tt=J.acquireProgram(Ve,Fe),Qe.set(Fe,tt),Z.uniforms=Ve.uniforms;const qe=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(qe.clippingPlanes=le.uniform),St(T,Ve),Z.needsLights=Ju(T),Z.lightsStateVersion=De,Z.needsLights&&(qe.ambientLightColor.value=H.state.ambient,qe.lightProbe.value=H.state.probe,qe.directionalLights.value=H.state.directional,qe.directionalLightShadows.value=H.state.directionalShadow,qe.spotLights.value=H.state.spot,qe.spotLightShadows.value=H.state.spotShadow,qe.rectAreaLights.value=H.state.rectArea,qe.ltc_1.value=H.state.rectAreaLTC1,qe.ltc_2.value=H.state.rectAreaLTC2,qe.pointLights.value=H.state.point,qe.pointLightShadows.value=H.state.pointShadow,qe.hemisphereLights.value=H.state.hemi,qe.directionalShadowMap.value=H.state.directionalShadowMap,qe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,qe.spotShadowMap.value=H.state.spotShadowMap,qe.spotLightMatrix.value=H.state.spotLightMatrix,qe.spotLightMap.value=H.state.spotLightMap,qe.pointShadowMap.value=H.state.pointShadowMap,qe.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=tt,Z.uniformsList=null,tt}function st(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=ha.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function St(T,k){const K=me.get(T);K.outputColorSpace=k.outputColorSpace,K.batching=k.batching,K.batchingColor=k.batchingColor,K.instancing=k.instancing,K.instancingColor=k.instancingColor,K.instancingMorph=k.instancingMorph,K.skinning=k.skinning,K.morphTargets=k.morphTargets,K.morphNormals=k.morphNormals,K.morphColors=k.morphColors,K.morphTargetsCount=k.morphTargetsCount,K.numClippingPlanes=k.numClippingPlanes,K.numIntersection=k.numClipIntersection,K.vertexAlphas=k.vertexAlphas,K.vertexTangents=k.vertexTangents,K.toneMapping=k.toneMapping}function Zt(T,k,K,Z,H){k.isScene!==!0&&(k=pe),Le.resetTextureUnits();const ve=k.fog,De=Z.isMeshStandardMaterial?k.environment:null,Ve=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:on,Fe=(Z.isMeshStandardMaterial?Ze:Ke).get(Z.envMap||De),Qe=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,tt=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),qe=!!K.morphAttributes.position,pt=!!K.morphAttributes.normal,At=!!K.morphAttributes.color;let Ut=Ti;Z.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Ut=v.toneMapping);const Dt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Lt=Dt!==void 0?Dt.length:0,je=me.get(Z),It=p.state.lights;if(it===!0&&(te===!0||T!==S)){const Jt=T===S&&Z.id===b;le.setState(Z,T,Jt)}let _t=!1;Z.version===je.__version?(je.needsLights&&je.lightsStateVersion!==It.state.version||je.outputColorSpace!==Ve||H.isBatchedMesh&&je.batching===!1||!H.isBatchedMesh&&je.batching===!0||H.isBatchedMesh&&je.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&je.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&je.instancing===!1||!H.isInstancedMesh&&je.instancing===!0||H.isSkinnedMesh&&je.skinning===!1||!H.isSkinnedMesh&&je.skinning===!0||H.isInstancedMesh&&je.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&je.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&je.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&je.instancingMorph===!1&&H.morphTexture!==null||je.envMap!==Fe||Z.fog===!0&&je.fog!==ve||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==le.numPlanes||je.numIntersection!==le.numIntersection)||je.vertexAlphas!==Qe||je.vertexTangents!==tt||je.morphTargets!==qe||je.morphNormals!==pt||je.morphColors!==At||je.toneMapping!==Ut||je.morphTargetsCount!==Lt)&&(_t=!0):(_t=!0,je.__version=Z.version);let pn=je.currentProgram;_t===!0&&(pn=kt(Z,k,H));let Ji=!1,mn=!1,Gs=!1;const Nt=pn.getUniforms(),bn=je.uniforms;if(oe.useProgram(pn.program)&&(Ji=!0,mn=!0,Gs=!0),Z.id!==b&&(b=Z.id,mn=!0),Ji||S!==T){oe.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Nt.setValue(N,"projectionMatrix",T.projectionMatrix),Nt.setValue(N,"viewMatrix",T.matrixWorldInverse);const hn=Nt.map.cameraPosition;hn!==void 0&&hn.setValue(N,Te.setFromMatrixPosition(T.matrixWorld)),Ae.logarithmicDepthBuffer&&Nt.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Nt.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,mn=!0,Gs=!0)}if(H.isSkinnedMesh){Nt.setOptional(N,H,"bindMatrix"),Nt.setOptional(N,H,"bindMatrixInverse");const Jt=H.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),Nt.setValue(N,"boneTexture",Jt.boneTexture,Le))}H.isBatchedMesh&&(Nt.setOptional(N,H,"batchingTexture"),Nt.setValue(N,"batchingTexture",H._matricesTexture,Le),Nt.setOptional(N,H,"batchingIdTexture"),Nt.setValue(N,"batchingIdTexture",H._indirectTexture,Le),Nt.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&Nt.setValue(N,"batchingColorTexture",H._colorsTexture,Le));const Sn=K.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&ce.update(H,K,pn),(mn||je.receiveShadow!==H.receiveShadow)&&(je.receiveShadow=H.receiveShadow,Nt.setValue(N,"receiveShadow",H.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(bn.envMap.value=Fe,bn.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&k.environment!==null&&(bn.envMapIntensity.value=k.environmentIntensity),mn&&(Nt.setValue(N,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&Li(bn,Gs),ve&&Z.fog===!0&&se.refreshFogUniforms(bn,ve),se.refreshMaterialUniforms(bn,Z,X,ae,p.state.transmissionRenderTarget[T.id]),ha.upload(N,st(je),bn,Le)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ha.upload(N,st(je),bn,Le),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Nt.setValue(N,"center",H.center),Nt.setValue(N,"modelViewMatrix",H.modelViewMatrix),Nt.setValue(N,"normalMatrix",H.normalMatrix),Nt.setValue(N,"modelMatrix",H.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Jt=Z.uniformsGroups;for(let hn=0,wa=Jt.length;hn<wa;hn++){const Di=Jt[hn];F.update(Di,pn),F.bind(Di,pn)}}return pn}function Li(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Ju(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(T,k,K){const Z=me.get(T);Z.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),me.get(T.texture).__webglTexture=k,me.get(T.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:K,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const K=me.get(T);K.__webglFramebuffer=k,K.__useDefaultFramebuffer=k===void 0};const Qu=N.createFramebuffer();this.setRenderTarget=function(T,k=0,K=0){D=T,w=k,A=K;let Z=!0,H=null,ve=!1,De=!1;if(T){const Fe=me.get(T);if(Fe.__useDefaultFramebuffer!==void 0)oe.bindFramebuffer(N.FRAMEBUFFER,null),Z=!1;else if(Fe.__webglFramebuffer===void 0)Le.setupRenderTarget(T);else if(Fe.__hasExternalTextures)Le.rebindTextures(T,me.get(T.texture).__webglTexture,me.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const qe=T.depthTexture;if(Fe.__boundDepthTexture!==qe){if(qe!==null&&me.has(qe)&&(T.width!==qe.image.width||T.height!==qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Le.setupDepthRenderbuffer(T)}}const Qe=T.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(De=!0);const tt=me.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(tt[k])?H=tt[k][K]:H=tt[k],ve=!0):T.samples>0&&Le.useMultisampledRTT(T)===!1?H=me.get(T).__webglMultisampledFramebuffer:Array.isArray(tt)?H=tt[K]:H=tt,I.copy(T.viewport),U.copy(T.scissor),V=T.scissorTest}else I.copy(Se).multiplyScalar(X).floor(),U.copy(we).multiplyScalar(X).floor(),V=at;if(K!==0&&(H=Qu),oe.bindFramebuffer(N.FRAMEBUFFER,H)&&Z&&oe.drawBuffers(T,H),oe.viewport(I),oe.scissor(U),oe.setScissorTest(V),ve){const Fe=me.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,Fe.__webglTexture,K)}else if(De){const Fe=k;for(let Qe=0;Qe<T.textures.length;Qe++){const tt=me.get(T.textures[Qe]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Qe,tt.__webglTexture,K,Fe)}}else if(T!==null&&K!==0){const Fe=me.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Fe.__webglTexture,K)}b=-1},this.readRenderTargetPixels=function(T,k,K,Z,H,ve,De,Ve=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe){oe.bindFramebuffer(N.FRAMEBUFFER,Fe);try{const Qe=T.textures[Ve],tt=Qe.format,qe=Qe.type;if(!Ae.textureFormatReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ae.textureTypeReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-Z&&K>=0&&K<=T.height-H&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ve),N.readPixels(k,K,Z,H,$.convert(tt),$.convert(qe),ve))}finally{const Qe=D!==null?me.get(D).__webglFramebuffer:null;oe.bindFramebuffer(N.FRAMEBUFFER,Qe)}}},this.readRenderTargetPixelsAsync=async function(T,k,K,Z,H,ve,De,Ve=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe)if(k>=0&&k<=T.width-Z&&K>=0&&K<=T.height-H){oe.bindFramebuffer(N.FRAMEBUFFER,Fe);const Qe=T.textures[Ve],tt=Qe.format,qe=Qe.type;if(!Ae.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ae.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,pt),N.bufferData(N.PIXEL_PACK_BUFFER,ve.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ve),N.readPixels(k,K,Z,H,$.convert(tt),$.convert(qe),0);const At=D!==null?me.get(D).__webglFramebuffer:null;oe.bindFramebuffer(N.FRAMEBUFFER,At);const Ut=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Pf(N,Ut,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,pt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ve),N.deleteBuffer(pt),N.deleteSync(Ut),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,K=0){const Z=Math.pow(2,-K),H=Math.floor(T.image.width*Z),ve=Math.floor(T.image.height*Z),De=k!==null?k.x:0,Ve=k!==null?k.y:0;Le.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,K,0,0,De,Ve,H,ve),oe.unbindTexture()};const ed=N.createFramebuffer(),td=N.createFramebuffer();this.copyTextureToTexture=function(T,k,K=null,Z=null,H=0,ve=null){ve===null&&(H!==0?(_r("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ve=H,H=0):ve=0);let De,Ve,Fe,Qe,tt,qe,pt,At,Ut;const Dt=T.isCompressedTexture?T.mipmaps[ve]:T.image;if(K!==null)De=K.max.x-K.min.x,Ve=K.max.y-K.min.y,Fe=K.isBox3?K.max.z-K.min.z:1,Qe=K.min.x,tt=K.min.y,qe=K.isBox3?K.min.z:0;else{const Sn=Math.pow(2,-H);De=Math.floor(Dt.width*Sn),Ve=Math.floor(Dt.height*Sn),T.isDataArrayTexture?Fe=Dt.depth:T.isData3DTexture?Fe=Math.floor(Dt.depth*Sn):Fe=1,Qe=0,tt=0,qe=0}Z!==null?(pt=Z.x,At=Z.y,Ut=Z.z):(pt=0,At=0,Ut=0);const Lt=$.convert(k.format),je=$.convert(k.type);let It;k.isData3DTexture?(Le.setTexture3D(k,0),It=N.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Le.setTexture2DArray(k,0),It=N.TEXTURE_2D_ARRAY):(Le.setTexture2D(k,0),It=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);const _t=N.getParameter(N.UNPACK_ROW_LENGTH),pn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ji=N.getParameter(N.UNPACK_SKIP_PIXELS),mn=N.getParameter(N.UNPACK_SKIP_ROWS),Gs=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Dt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Dt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Qe),N.pixelStorei(N.UNPACK_SKIP_ROWS,tt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,qe);const Nt=T.isDataArrayTexture||T.isData3DTexture,bn=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Sn=me.get(T),Jt=me.get(k),hn=me.get(Sn.__renderTarget),wa=me.get(Jt.__renderTarget);oe.bindFramebuffer(N.READ_FRAMEBUFFER,hn.__webglFramebuffer),oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,wa.__webglFramebuffer);for(let Di=0;Di<Fe;Di++)Nt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,me.get(T).__webglTexture,H,qe+Di),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,me.get(k).__webglTexture,ve,Ut+Di)),N.blitFramebuffer(Qe,tt,De,Ve,pt,At,De,Ve,N.DEPTH_BUFFER_BIT,N.NEAREST);oe.bindFramebuffer(N.READ_FRAMEBUFFER,null),oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||T.isRenderTargetTexture||me.has(T)){const Sn=me.get(T),Jt=me.get(k);oe.bindFramebuffer(N.READ_FRAMEBUFFER,ed),oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,td);for(let hn=0;hn<Fe;hn++)Nt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Sn.__webglTexture,H,qe+hn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Sn.__webglTexture,H),bn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Jt.__webglTexture,ve,Ut+hn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Jt.__webglTexture,ve),H!==0?N.blitFramebuffer(Qe,tt,De,Ve,pt,At,De,Ve,N.COLOR_BUFFER_BIT,N.NEAREST):bn?N.copyTexSubImage3D(It,ve,pt,At,Ut+hn,Qe,tt,De,Ve):N.copyTexSubImage2D(It,ve,pt,At,Qe,tt,De,Ve);oe.bindFramebuffer(N.READ_FRAMEBUFFER,null),oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else bn?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(It,ve,pt,At,Ut,De,Ve,Fe,Lt,je,Dt.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(It,ve,pt,At,Ut,De,Ve,Fe,Lt,Dt.data):N.texSubImage3D(It,ve,pt,At,Ut,De,Ve,Fe,Lt,je,Dt):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ve,pt,At,De,Ve,Lt,je,Dt.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ve,pt,At,Dt.width,Dt.height,Lt,Dt.data):N.texSubImage2D(N.TEXTURE_2D,ve,pt,At,De,Ve,Lt,je,Dt);N.pixelStorei(N.UNPACK_ROW_LENGTH,_t),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ji),N.pixelStorei(N.UNPACK_SKIP_ROWS,mn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Gs),ve===0&&k.generateMipmaps&&N.generateMipmap(It),oe.unbindTexture()},this.initRenderTarget=function(T){me.get(T).__webglFramebuffer===void 0&&Le.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Le.setTextureCube(T,0):T.isData3DTexture?Le.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Le.setTexture2DArray(T,0):Le.setTexture2D(T,0),oe.unbindTexture()},this.resetState=function(){w=0,A=0,D=null,oe.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}}const Mh={type:"change"},qc={type:"start"},Au={type:"end"},ta=new yr,bh=new bi,Vv=Math.cos(70*Nc.DEG2RAD),zt=new P,un=2*Math.PI,Ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},fo=1e-6;class Gv extends sm{constructor(e,t=null){super(e,t),this.state=Ct.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ci.ROTATE,MIDDLE:ci.DOLLY,RIGHT:ci.PAN},this.touches={ONE:ri.ROTATE,TWO:ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Cn,this._lastTargetPosition=new P,this._quat=new Cn().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Kl,this._sphericalDelta=new Kl,this._scale=1,this._panOffset=new P,this._rotateStart=new Ee,this._rotateEnd=new Ee,this._rotateDelta=new Ee,this._panStart=new Ee,this._panEnd=new Ee,this._panDelta=new Ee,this._dollyStart=new Ee,this._dollyEnd=new Ee,this._dollyDelta=new Ee,this._dollyDirection=new P,this._mouse=new Ee,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Xv.bind(this),this._onPointerDown=Wv.bind(this),this._onPointerUp=$v.bind(this),this._onContextMenu=Qv.bind(this),this._onMouseWheel=jv.bind(this),this._onKeyDown=Kv.bind(this),this._onTouchStart=Zv.bind(this),this._onTouchMove=Jv.bind(this),this._onMouseDown=qv.bind(this),this._onMouseMove=Yv.bind(this),this._interceptControlDown=ex.bind(this),this._interceptControlUp=tx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Mh),this.update(),this.state=Ct.NONE}update(e=null){const t=this.object.position;zt.copy(t).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===Ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=un:n>Math.PI&&(n-=un),i<-Math.PI?i+=un:i>Math.PI&&(i-=un),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=zt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ta.origin.copy(this.object.position),ta.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ta.direction))<Vv?this.object.lookAt(this.target):(bh.setFromNormalAndCoplanarPoint(this.object.up,this.target),ta.intersectPlane(bh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>fo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>fo||this._lastTargetPosition.distanceToSquared(this.target)>fo?(this.dispatchEvent(Mh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?un/60*this.autoRotateSpeed*e:un/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){zt.setFromMatrixColumn(t,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,t){this.screenSpacePanning===!0?zt.setFromMatrixColumn(t,1):(zt.setFromMatrixColumn(t,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;zt.copy(i).sub(this.target);let r=zt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ee,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Wv(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function Xv(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function $v(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Au),this.state=Ct.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function qv(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ci.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Ct.DOLLY;break;case ci.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ct.ROTATE}break;case ci.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ct.PAN}break;default:this.state=Ct.NONE}this.state!==Ct.NONE&&this.dispatchEvent(qc)}function Yv(s){switch(this.state){case Ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function jv(s){this.enabled===!1||this.enableZoom===!1||this.state!==Ct.NONE||(s.preventDefault(),this.dispatchEvent(qc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Au))}function Kv(s){this.enabled!==!1&&this._handleKeyDown(s)}function Zv(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Ct.TOUCH_ROTATE;break;case ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Ct.TOUCH_PAN;break;default:this.state=Ct.NONE}break;case 2:switch(this.touches.TWO){case ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Ct.TOUCH_DOLLY_PAN;break;case ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Ct.TOUCH_DOLLY_ROTATE;break;default:this.state=Ct.NONE}break;default:this.state=Ct.NONE}this.state!==Ct.NONE&&this.dispatchEvent(qc)}function Jv(s){switch(this._trackPointer(s),this.state){case Ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Ct.NONE}}function Qv(s){this.enabled!==!1&&s.preventDefault()}function ex(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tx(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class nx extends Zi{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new Vc(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e){function t(l){const h=new DataView(l),u=32/8*3+32/8*3*3+16/8,d=h.getUint32(80,!0);if(80+32/8+d*u===h.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,h,_))return!1;return!0}function n(l,h,u){for(let d=0,f=l.length;d<f;d++)if(l[d]!==h.getUint8(u+d))return!1;return!0}function i(l){const h=new DataView(l),u=h.getUint32(80,!0);let d,f,g,_=!1,m,p,x,y,v;for(let I=0;I<70;I++)h.getUint32(I,!1)==1129270351&&h.getUint8(I+4)==82&&h.getUint8(I+5)==61&&(_=!0,m=new Float32Array(u*3*3),p=h.getUint8(I+6)/255,x=h.getUint8(I+7)/255,y=h.getUint8(I+8)/255,v=h.getUint8(I+9)/255);const E=84,w=50,A=new bt,D=new Float32Array(u*3*3),b=new Float32Array(u*3*3),S=new Je;for(let I=0;I<u;I++){const U=E+I*w,V=h.getFloat32(U,!0),Y=h.getFloat32(U+4,!0),Q=h.getFloat32(U+8,!0);if(_){const G=h.getUint16(U+48,!0);(G&32768)===0?(d=(G&31)/31,f=(G>>5&31)/31,g=(G>>10&31)/31):(d=p,f=x,g=y)}for(let G=1;G<=3;G++){const ae=U+G*12,X=I*3*3+(G-1)*3;D[X]=h.getFloat32(ae,!0),D[X+1]=h.getFloat32(ae+4,!0),D[X+2]=h.getFloat32(ae+8,!0),b[X]=V,b[X+1]=Y,b[X+2]=Q,_&&(S.setRGB(d,f,g,Ft),m[X]=S.r,m[X+1]=S.g,m[X+2]=S.b)}}return A.setAttribute("position",new Bt(D,3)),A.setAttribute("normal",new Bt(b,3)),_&&(A.setAttribute("color",new Bt(m,3)),A.hasColors=!0,A.alpha=v),A}function r(l){const h=new bt,u=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,f=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,m=new RegExp("vertex"+_+_+_,"g"),p=new RegExp("normal"+_+_+_,"g"),x=[],y=[],v=[],E=new P;let w,A=0,D=0,b=0;for(;(w=u.exec(l))!==null;){D=b;const S=w[0],I=(w=f.exec(S))!==null?w[1]:"";for(v.push(I);(w=d.exec(S))!==null;){let Y=0,Q=0;const G=w[0];for(;(w=p.exec(G))!==null;)E.x=parseFloat(w[1]),E.y=parseFloat(w[2]),E.z=parseFloat(w[3]),Q++;for(;(w=m.exec(G))!==null;)x.push(parseFloat(w[1]),parseFloat(w[2]),parseFloat(w[3])),y.push(E.x,E.y,E.z),Y++,b++;Q!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),Y!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const U=D,V=b-D;h.userData.groupNames=v,h.addGroup(U,V,A),A++}return h.setAttribute("position",new Pt(x,3)),h.setAttribute("normal",new Pt(y,3)),h}function a(l){return typeof l!="string"?new TextDecoder().decode(l):l}function o(l){if(typeof l=="string"){const h=new Uint8Array(l.length);for(let u=0;u<l.length;u++)h[u]=l.charCodeAt(u)&255;return h.buffer||h}else return l}const c=o(e);return t(c)?i(c):r(a(e))}}function Sh(s,e){if(e===tf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===cc||e===Kh){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===cc)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class ix extends Zi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new cx(t)}),this.register(function(t){return new lx(t)}),this.register(function(t){return new vx(t)}),this.register(function(t){return new xx(t)}),this.register(function(t){return new yx(t)}),this.register(function(t){return new ux(t)}),this.register(function(t){return new dx(t)}),this.register(function(t){return new fx(t)}),this.register(function(t){return new px(t)}),this.register(function(t){return new ox(t)}),this.register(function(t){return new mx(t)}),this.register(function(t){return new hx(t)}),this.register(function(t){return new _x(t)}),this.register(function(t){return new gx(t)}),this.register(function(t){return new rx(t)}),this.register(function(t){return new Mx(t)}),this.register(function(t){return new bx(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=or.extractUrlBase(e);a=or.resolveURL(l,this.path)}else a=or.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Vc(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ru){try{a[dt.KHR_BINARY_GLTF]=new Sx(e)}catch(u){i&&i(u);return}r=JSON.parse(a[dt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Fx(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case dt.KHR_MATERIALS_UNLIT:a[u]=new ax;break;case dt.KHR_DRACO_MESH_COMPRESSION:a[u]=new Ex(r,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:a[u]=new wx;break;case dt.KHR_MESH_QUANTIZATION:a[u]=new Tx;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function sx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class rx{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Je(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],on);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new dc(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Mu(h),l.distance=u;break;case"spot":l=new Wp(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Hn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class ax{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return On}extendParams(e,t,n){const i=[];e.color=new Je(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],on),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ft))}return Promise.all(i)}}class ox{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class cx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ee(o,o)}return Promise.all(r)}}class lx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class hx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class ux{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Je(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],on)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ft)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class dx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class fx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Je().setRGB(o[0],o[1],o[2],on),Promise.all(r)}}class px{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class mx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Je().setRGB(o[0],o[1],o[2],on),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ft)),Promise.all(r)}}class gx{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class _x{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class vx{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class xx{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class yx{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class Mx{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class bx{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Tn.TRIANGLES&&l.mode!==Tn.TRIANGLE_STRIP&&l.mode!==Tn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const g of u){const _=new rt,m=new P,p=new Cn,x=new P(1,1,1),y=new Is(g.geometry,g.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&x.fromBufferAttribute(c.SCALE,v),y.setMatrixAt(v,_.compose(m,p,x));for(const v in c)if(v==="_COLOR_0"){const E=c[v];y.instanceColor=new hc(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,c[v]);vt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Ru="glTF",Js=12,Eh={JSON:1313821514,BIN:5130562};class Sx{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Js),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ru)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Js,r=new DataView(e,Js);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===Eh.JSON){const l=new Uint8Array(e,Js+a,o);this.content=n.decode(l)}else if(c===Eh.BIN){const l=Js+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ex{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const u=mc[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=mc[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=ws[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(f)},o,l,on,d)})})}}class wx{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Tx{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class Cu extends Mr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,x=1-m,y=p-d+u;for(let v=0;v!==o;v++){const E=a[_+v+o],w=a[_+v+c]*h,A=a[g+v+o],D=a[g+v]*h;r[v]=x*E+y*w+m*A+p*D}return r}}const Ax=new Cn;class Rx extends Cu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Ax.fromArray(r).normalize().toArray(r),r}}const Tn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ws={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wh={9728:an,9729:yn,9984:Vh,9985:ra,9986:nr,9987:ai},Th={33071:Ei,33648:fa,10497:Ps},po={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},mc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},yi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Cx={CUBICSPLINE:void 0,LINEAR:mr,STEP:pr},mo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Px(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ot({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ui})),s.DefaultMaterial}function ki(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Hn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Lx(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Dx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ix(s){let e;const t=s.extensions&&s.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+go(t.attributes):e=s.indices+":"+go(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+go(s.targets[n]);return e}function go(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function gc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Nx(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Ux=new rt;class Fx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new sx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new Hp(this.options.manager):this.textureLoader=new qp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Vc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ki(r,o,i),Hn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(or.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=po[i.type],o=ws[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Bt(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=po[i.type],l=ws[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(x);y||(_=new l(o,p*f,i.count*f/h),y=new tp(_,f/h),t.cache.add(x,y)),m=new Fc(y,c,d%f/h,g)}else o===null?_=new l(i.count*c):_=new l(o,d,i.count*c),m=new Bt(_,c,g);if(i.sparse!==void 0){const p=po.SCALAR,x=ws[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new x(a[1],y,i.sparse.count*p),w=new l(a[2],v,i.sparse.count*c);o!==null&&(m=new Bt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,D=E.length;A<D;A++){const b=E[A];if(m.setX(b,w[A*c]),c>=2&&m.setY(b,w[A*c+1]),c>=3&&m.setZ(b,w[A*c+2]),c>=4&&m.setW(b,w[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=wh[d.magFilter]||yn,h.minFilter=wh[d.minFilter]||ai,h.wrapS=Th[d.wrapS]||Ps,h.wrapT=Th[d.wrapT]||Ps,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==an&&h.minFilter!==yn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Gt(_);m.needsUpdate=!0,d(m)}),t.load(or.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),Hn(u,a),u.userData.mimeType=a.mimeType||Nx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[dt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new hu,kn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Yi,kn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ot}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[dt.KHR_MATERIALS_UNLIT]){const u=i[dt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new Je(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],on),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,Ft)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Vt);const h=r.alphaMode||mo.OPAQUE;if(h===mo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===mo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==On&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ee(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==On&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==On){const u=r.emissiveFactor;o.emissive=new Je().setRGB(u[0],u[1],u[2],on)}return r.emissiveTexture!==void 0&&a!==On&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ft)),Promise.all(l).then(function(){const u=new a(o);return r.name&&(u.name=r.name),Hn(u,r),t.associations.set(u,{materials:e}),r.extensions&&ki(i,u,r),u})}createUniqueName(e){const t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Ah(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=Ix(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Ah(new bt,l,t),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?Px(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const x=l[f];if(m.mode===Tn.TRIANGLES||m.mode===Tn.TRIANGLE_STRIP||m.mode===Tn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new ip(_,x):new nt(_,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Tn.TRIANGLE_STRIP?p.geometry=Sh(p.geometry,Kh):m.mode===Tn.TRIANGLE_FAN&&(p.geometry=Sh(p.geometry,cc));else if(m.mode===Tn.LINES)p=new kc(_,x);else if(m.mode===Tn.LINE_STRIP)p=new ji(_,x);else if(m.mode===Tn.LINE_LOOP)p=new lp(_,x);else if(m.mode===Tn.POINTS)p=new hp(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Dx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Hn(p,r),m.extensions&&ki(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ki(i,u[0],r),u[0];const d=new Mt;r.extensions&&ki(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(Nc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Sa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Hn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const u=a[l];if(u){o.push(u);const d=new rt;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Oc(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,v=d.length;y<v;y++){const E=d[y],w=f[y],A=g[y],D=_[y],b=m[y];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const S=n._createAnimationTracks(E,w,A,D,b);if(S)for(let I=0;I<S.length;I++)p.push(S[I])}const x=new Up(r,void 0,p);return Hn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Ux)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new cu:l.length>1?h=new Mt:l.length===1?h=l[0]:h=new vt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Hn(h,r),r.extensions&&ki(n,h,r),r.matrix!==void 0){const u=new rt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Mt;n.name&&(r.name=i.createUniqueName(n.name)),Hn(r,n),n.extensions&&ki(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof kn||d instanceof Gt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];yi[r.path]===yi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(yi[r.path]){case yi.weights:l=Ns;break;case yi.rotation:l=Us;break;case yi.translation:case yi.scale:l=Fs;break;default:switch(n.itemSize){case 1:l=Ns;break;case 2:case 3:default:l=Fs;break}break}const h=i.interpolation!==void 0?Cx[i.interpolation]:mr,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+yi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=gc(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Us?Rx:Cu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ox(s,e,t){const n=e.attributes,i=new Mn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),o.normalized){const h=gc(ws[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new P,c=new P;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=gc(ws[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new qn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Ah(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=mc[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return mt.workingColorSpace!==on&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${mt.workingColorSpace}" not supported.`),Hn(s,e),Ox(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Lx(s,e.targets,t):s})}class Bx extends ou{constructor(){super();const e=new ln;e.deleteAttribute("uv");const t=new ot({side:rn}),n=new ot,i=new Mu(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new nt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Is(e,n,6),o=new vt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new nt(e,_s(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new nt(e,_s(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new nt(e,_s(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new nt(e,_s(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new nt(e,_s(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new nt(e,_s(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function _s(s){return new Tp({color:0,emissive:16777215,emissiveIntensity:s})}const cr=new ot({color:15660790,transparent:!0,opacity:.28,depthWrite:!1,side:Vt,roughness:.25,metalness:0}),Pu=new ot({color:13033697,transparent:!0,opacity:.19,depthWrite:!1,side:Vt,roughness:.23,metalness:0}),_o=new ot({color:2450377,roughness:.42,metalness:.12}),Vi=new ot({color:13883612,roughness:.28,metalness:.9}),na=new ot({color:2238252,roughness:.5,metalness:.35}),kx=new ot({color:14080210,roughness:.69,metalness:0}),zx=new ot({color:14259089,roughness:.72});function vs(s,e,t,n=64){const i=new ks(e.map(([a,o])=>new Ee(a,o)),n);i.rotateX(Math.PI/2);const r=new nt(i,t);return r.name=s,r.receiveShadow=!0,r}function ei(s,e,t,n,i,r=48){const a=new dn(e,e,t,r);a.rotateX(Math.PI/2);const o=new nt(a,i);return o.name=s,o.position.z=n+t/2,o.castShadow=i!==cr&&i!==Pu,o.receiveShadow=!0,o}function vo(s,e,t,n,i,r,a,o){const c=new nt(new ln(e,t,n),o);return c.name=s,c.position.set(i,r,a+n/2),c.castShadow=c.receiveShadow=!0,c}function Rh(s,e,t){const n=new ks([new Ee(23.3,0),new Ee(26.6,0),new Ee(26.6,7),new Ee(23.3,7),new Ee(23.3,0)],32,e,t-e);n.rotateX(Math.PI/2);const i=new nt(n,Vi);return i.name=s,i.position.z=48,i.castShadow=i.receiveShadow=!0,i}function Hx(s,e){const t=[[8.1,8.6],[10,11],[16.8,15.4],[20.9,19.4]],n=.62,i=[],r=[];for(const[c,l]of t)for(const h of[-n,n])i.push(c*Math.cos(e)-h*Math.sin(e),c*Math.sin(e)+h*Math.cos(e),l);for(let c=0;c<t.length-1;c++){const l=2*c;r.push(l,l+1,l+3,l,l+3,l+2)}const a=new bt;a.setAttribute("position",new Pt(i,3)),a.setIndex(r),a.computeVertexNormals();const o=new nt(a,cr);return o.name=s,o}function Vx({fillMaterial:s=zx}={}){const e=new Mt;e.name="R75 cartridge, retainer and clamp (illustrative)",e.userData={bareOutsideDiameterMm:43.2,bareLengthMm:98.8,datum:"bare outlet face z=0",dimensionalBasis:"Nordson Optimum typical envelope; internal and accessories estimated"};const t=new Mt;t.name="cartridge_bare",e.add(t);const n=[[6.2,0],[7.6,0],[7.6,8.3],[10,10.4],[16.8,15.3],[21.6,19.5],[21.6,98.8],[20,98.8],[20,20.5],[15.5,16.3],[9,11.5],[6.2,8.3],[6.2,0]];t.add(vs("bare cartridge body and outlet",n,cr)),t.add(vs("bare outlet hex, no thread detail",[[6.2,1.1],[9.4,1.1],[9.4,8.3],[6.2,8.3],[6.2,1.1]],cr,6));for(let d=0;d<6;d++)t.add(Hx(`bare shoulder rib ${d+1}`,d*Math.PI/3));t.add(vs("bare upper rim",[[20,97.5],[21.6,97.5],[21.6,98.8],[20,98.8],[20,97.5]],cr));const i=20.7,r=75,a=ei("illustrative material fill",18.8,1,i,s);e.add(a);const o=ei("illustrative piston",19.2,1.6,i,kx);e.add(o);const c=ei("illustrative piston seal",19.4,.6,i,na);e.add(c);function l(d){const f=Number.isFinite(d)?Math.min(1,Math.max(0,d)):0,g=r*f;a.visible=g>1e-9,a.scale.z=Math.max(g,1e-6),a.position.z=i+g/2,o.position.z=i+g+.8,c.position.z=i+g+.3}l(1),e.add(vs("separate transparent pressure retainer",[[21.9,14],[23.2,14],[23.2,101],[21.9,101],[21.9,14]],Pu)),e.add(vs("retainer lower collar",[[9.4,8.8],[23.2,8.8],[23.2,14],[21.9,14],[18,14],[9.4,10],[9.4,8.8]],_o)),e.add(vs("retainer top retaining lip",[[21.9,99],[24,99],[24,102.2],[21.9,102.2],[21.9,99]],_o)),e.add(ei("separate pressure cap",24,8.5,102.2,_o)),e.add(ei("air connector base",8,3,110.7,Vi,6)),e.add(ei("air push-fit body",5.3,7,113.7,na)),e.add(ei("air push-fit collar",5.8,2,120.7,Vi));const h=new vt;h.name="air inlet tubing end",h.position.set(0,0,122.7),h.userData.direction=[0,0,1],e.add(h);const u=new Mt;u.name="estimated split clamp and mounting plate",e.add(u),u.add(Rh("left clamp half",.08,Math.PI-.08),Rh("right clamp half",Math.PI+.08,2*Math.PI-.08));for(const d of[-27,27]){u.add(vo("clamp lug",9,10,9,d,0,47,Vi));const f=ei("clamp screw head",2.6,2,56,na,12);f.position.x=d,u.add(f);const g=ei("clamp screw socket",1,.25,58,Vi,6);g.position.x=d,u.add(g)}u.add(vo("mounting plate",58,8,42,0,30,30,na)),u.add(vo("rear machine attachment face",46,4,34,0,36,34,Vi));for(const d of[-20,20])for(const f of[38,62]){const g=new nt(new dn(2.4,2.4,1.4,12),Vi);g.name="rear mounting screw",g.position.set(d,24.9,f),u.add(g)}return{group:e,bare:t,piston:o,fill:a,airPort:h,updateFill:l}}const Qs=new P;function wn(s,e,t,n,i,r){const a=2*Math.PI*i/4,o=Math.max(r-2*i,0),c=Math.PI/4;Qs.copy(e),Qs[n]=0,Qs.normalize();const l=.5*a/(a+o),h=1-Qs.angleTo(s)/c;return Math.sign(Qs[t])===1?h*l:o/(a+o)+l+l*(1-h)}class br extends ln{constructor(e=1,t=1,n=1,i=2,r=.1){const a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new P,l=new P,h=new P(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new P,m=.5/a;for(let p=0,x=0;p<u.length;p+=3,x+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*r,u[p+1]=h.y*Math.sign(c.y)+l.y*r,u[p+2]=h.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[x+0]=wn(_,l,"z","y",r,n),f[x+1]=1-wn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),f[x+0]=1-wn(_,l,"z","y",r,n),f[x+1]=1-wn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),f[x+0]=1-wn(_,l,"x","z",r,e),f[x+1]=wn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),f[x+0]=1-wn(_,l,"x","z",r,e),f[x+1]=1-wn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),f[x+0]=1-wn(_,l,"x","y",r,e),f[x+1]=1-wn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),f[x+0]=wn(_,l,"x","y",r,e),f[x+1]=1-wn(_,l,"y","x",r,t);break}}static fromJSON(e){return new br(e.width,e.height,e.depth,e.segments,e.radius)}}function Gx(){const s=new Mt;s.name="P300_supply_station_reference",s.userData={reference:"Graco DM-22 25T471",evidence:"exterior envelope from manual; individual parts engineering approximation",lowerHeightMm:550,raisedHeightMm:800,widthMm:360,depthMm:300,units:"mm",fluidConnection:"1/4 NPT female, nominal",airConnection:"8 mm female, nominal"};const e={blue:new ot({color:2056127,roughness:.42,metalness:.35}),blueDark:new ot({color:1458048,roughness:.5,metalness:.3}),steel:new ot({color:12831691,roughness:.37,metalness:.74}),satin:new ot({color:9083033,roughness:.46,metalness:.68}),dark:new ot({color:2502968,roughness:.7,metalness:.2}),black:new ot({color:1120541,roughness:.62,metalness:.1}),dial:new ot({color:14870239,roughness:.8,metalness:0}),red:new ot({color:12076348,roughness:.55,metalness:.15}),brass:new ot({color:11901526,roughness:.38,metalness:.72}),glass:new ot({color:12638170,transparent:!0,opacity:.24,depthWrite:!1,roughness:.25,metalness:.02,side:Vt})};s.userData.ownedMaterials=Object.values(e);const t=(x,y,v,E,w,A,D,b="steel",S=1.2)=>{const I=Math.min(S,y/8,v/8,E/8),U=new nt(I>0?new br(y,v,E,2,I):new ln(y,v,E),e[b]);return U.name=x,U.position.set(w,A,D+E/2),U.castShadow=b!=="glass",U.receiveShadow=!0,s.add(U),U},n=(x,y,v,E,w,A,D="steel",b="z",S=32)=>{const I=new nt(new dn(y,y,v,S),e[D]);return I.name=x,I.castShadow=D!=="glass",I.receiveShadow=!0,b==="z"?(I.rotation.x=Math.PI/2,I.position.set(E,w,A+v/2)):b==="x"?(I.rotation.z=-Math.PI/2,I.position.set(E+v/2,w,A)):I.position.set(E,w-v/2,A),s.add(I),I},i=(x,y,v,E=2.6)=>{n("bolt washer",E+1.2,.5,x,y,v,"steel"),n("hex fastener",E,2.1,x,y,v+.5,"dark","z",6)},r=(x,y,v)=>{const E=new vt;E.name=x,E.position.set(...y);const w=new P(...v).normalize();return E.quaternion.setFromUnitVectors(new P(0,0,1),w),E.userData={axis:w.toArray(),reference:"visual connection datum; unverified physical fitting"},s.add(E),E};t("base footprint",360,300,18,0,0,0,"blueDark",1),t("lower enclosure",360,230,92,0,15,18,"blue",2),t("recessed front control panel",284,10,88,0,-105,20,"blueDark",1);for(const x of[-155,155])for(const y of[-125,125])i(x,y,18);for(const x of[-156,156])t("side edge protection",12,12,74,x,-107,21,"dark",1);for(const x of[-140,140])for(const y of[30,94])n("panel screw",2,1.2,x,-110,y,"steel","y",6);function a(x,y){n("pressure gauge body",16,6,x,-110,y,"black","y"),n("pressure gauge rim",14.6,1.4,x,-116,y,"steel","y"),n("pressure gauge face",12.6,.5,x,-117.4,y,"dial","y");for(let E=0;E<9;E++){const w=(-.75+E*1.5/8)*Math.PI,A=x+10*Math.sin(w),D=y+10*Math.cos(w),b=t("gauge tick",.6,.2,1.8,A,-118.1,D-.9,"dark",0);b.rotation.y=w}const v=t("gauge needle",.75,.3,8,x,-118.3,y-1,"red",0);v.rotation.y=.7,n("gauge spindle",1.4,.6,x,-118.5,y,"dark","y")}function o(x,y){n("regulator collar",11,4,x,-110,y,"steel","y"),n("regulator knob",10,15,x,-114,y,"black","y",32);for(let v=0;v<12;v++){const E=v*Math.PI/6,w=x+9.7*Math.sin(E),A=y+9.7*Math.cos(E),D=t("knob grip rib",1,11,1.5,w,-122,A-.75,"satin",0);D.rotation.y=E}}a(-92,80),a(66,80),o(-92,46),o(66,46);for(const x of[-30,18])n("selector mounting ring",7,3,x,-110,48,"steel","y"),n("selector switch",4.4,10,x,-113,48,"black","y"),t("selector grip",2.5,4,12,x,-124,42,"satin",.3);for(const x of[-126,126]){n("ram foot flange",24,9,x,24,110,"steel");for(const y of[-13,13])for(const v of[-13,13])i(x+y,24+v,119,2);n("vertical ram post",13.5,255,x,24,119,"satin"),n("upper ram collar",20,13,x,24,374,"steel"),n("upper ram collar cap",15,4,x,24,387,"dark")}t("crossbeam below upper plate",298,40,15,0,24,382,"steel",1.5),t("upper equipment mounting plate",300,150,12,0,14,397,"steel",1.5);for(const x of[-130,130])for(const y of[-40,68])i(x,y,409,2.2);const c=-62,l=12;t("cartridge housing lower mounting block",78,80,13,c,l,110,"satin",2),n("cartridge housing lower seat",35,10,c,l,123,"dark"),n("candidate aluminium cartridge",24,170,c,l,133,"steel"),n("candidate cartridge bottom shoulder",21,4,c,l,133,"satin"),n("candidate cartridge top edge",24.4,3,c,l,300,"satin");for(const x of[-33,33]){t("cartridge housing upright",8,52,206,c+x,l,123,"satin",1);for(const y of[135,210,310])i(c+x,l-18,y,2)}t("cartridge housing head",76,67,10,c,l,329,"satin",2),n("cartridge ram rod",8,43,c,l,339,"steel"),n("ram rod upper bushing",14,7,c,l,375,"dark"),t("transparent inspection panel",59,2,190,c,l-30,132,"glass",.2);for(const x of[c-23,c+23])for(const y of[142,308])n("inspection panel fastener",2,1.4,x,l-32,y,"dark","y");const h=62,u=32;n("pump lower mounting foot",38,10,h,u,110,"steel"),t("estimated feed manifold between cartridge and pump",68,32,18,0,l,120,"satin",1),n("pump lower body",29,210,h,u,120,"steel"),n("pump lower sleeve",33,55,h,u,150,"satin"),n("pump lower collar",34,7,h,u,205,"dark"),n("pump lower upper collar",33,7,h,u,323,"satin"),n("pump shaft neck",16,67,h,u,330,"steel"),n("pump motor lower flange",43,11,h,u,409,"steel"),n("pump pneumatic motor body",42,113,h,u,420,"satin"),n("pump motor upper lip",43,8,h,u,533,"steel"),n("pump motor cap",34,9,h,u,541,"dark");for(const x of[0,Math.PI/2,Math.PI,3*Math.PI/2])i(h+31*Math.cos(x),u+31*Math.sin(x),541,2.2);for(const x of[h-22,h+22])for(const y of[u-20,u+20])i(x,y,120,2.3);const d=247,f=h+29;n("fluid fitting boss",11,6,f,u,d,"satin","x",6),n("fluid fitting nut",10,10,f+6,u,d,"steel","x",6),n("fluid fitting coupling",7,12,f+16,u,d,"steel","x"),n("fluid fitting mouth",5.4,1,f+28,u,d,"dark","x");const g=r("fluid outlet datum",[f+29,u,d],[1,0,0]),_=114,m=55;n("air inlet panel boss",7,4,_,-110,m,"steel","y",6),n("air inlet coupling",5.8,12,_,-114,m,"brass","y"),n("air inlet face",4.2,1,_,-126,m,"dark","y");const p=r("main air inlet datum",[_,-127,m],[0,-1,0]);return s.updateMatrixWorld(!0),{group:s,fluidPort:g,airPort:p}}function Wx(){const s=new Mt;s.name="C300 reference envelope — open inspection",s.userData={kind:"visual_envelope",source:"Graco 349735EN-B p.33",widthMm:939,depthMm:1041,heightMm:1905,bottomMm:-900,topMm:1005,caveat:"external envelope published; panel geometry, mounting and opening assumed; not OEM CAD"};const e={body:new ot({color:15330280,roughness:.55,metalness:.1}),frame:new ot({color:12239296,roughness:.54,metalness:.34}),door:new ot({color:14869983,roughness:.72,metalness:.14}),gasket:new ot({color:4213067,roughness:.8,metalness:.08}),steel:new ot({color:8359310,roughness:.4,metalness:.7}),screen:new ot({color:993850,roughness:.25,metalness:.1,emissive:735826,emissiveIntensity:.8}),screenLine:new ot({color:8106941,roughness:.6,metalness:0}),blue:new ot({color:2056145,roughness:.45,metalness:.15}),red:new ot({color:12662052,roughness:.42,metalness:.08}),yellow:new ot({color:14665028,roughness:.55,metalness:0})};s.userData.ownedMaterials=Object.values(e);function t(i,r,a,o,c,l,h,u){const d=new nt(new ln(r,a,o),e[u]);return d.name=i,d.position.set(c,l,h+o/2),d.castShadow=!0,d.receiveShadow=!0,s.add(d),d}function n(i,r,a,o,c,l,h,u=20){const d=new nt(new dn(r,r,a,u),e[h]);return d.name=i,d.position.set(o,c,l),d.castShadow=!0,d.receiveShadow=!0,s.add(d),d}t("cabinet structure",939,1037,850,0,0,-900,"body"),t("front skin",939,2,850,0,-519.5,-900,"body"),t("rear skin",939,2,850,0,519.5,-900,"body"),t("front access door gasket",710,.5,620,0,-520.15,-830,"gasket"),t("front access door",704,.35,614,0,-520,-827,"door"),t("door label plate",180,.2,74,0,-520.29,-560,"frame"),t("door visual label inset",148,.15,42,0,-520.4,-544,"blue");for(const i of[-280,280])t("cabinet door pull",8,.8,95,i,-520,-315,"steel"),t("door pull lower bracket",24,.8,8,i,-520,-320,"gasket"),t("door pull upper bracket",24,.8,8,i,-520,-220,"gasket");for(const i of[-443,-360,-180,0,180,360,443])for(const r of[-874,-83])n("cabinet fastener",3,.55,i,-520.15,r,"steel",12);for(const i of[-340,340])for(const r of[-814,-230])n("access door fastener",2.6,.45,i,-520.2,r,"steel",12);for(const i of[-448.5,448.5])for(const r of[-499.5,499.5])t("window support post",42,42,1e3,i,r,-50,"frame"),t("post face inset",16,1,950,i,r<0?-520:520,-25,"gasket");t("roof structure",939,1041,55,0,0,950,"body");for(const i of[-510,510])t("window upper rail",855,20,24,0,i,926,"frame"),t("window sill",855,20,22,0,i,-50,"frame");for(const i of[-459,459])t("window side upper rail",20,957,24,i,0,926,"frame"),t("window side sill",20,957,22,i,0,-50,"frame");t("rear window mid rail",855,12,12,0,510,420,"frame");for(const i of[-459,459])t("side window mid rail",12,957,12,i,0,420,"frame");for(const i of[115,420,735])t("front door hinge",18,4,40,436,-518,i,"steel"),n("hinge pin",3,1,436,-519.6,i+20,"gasket",12);t("door latch backing",18,5,180,430,-517.8,280,"gasket"),t("door latch grip",9,4,144,430,-518.5,298,"steel"),t("console support bracket",78,20,24,-403,-500,620,"steel"),t("console housing",190,20,155,-330,-508,490,"gasket"),t("console bezel",176,1,141,-330,-518.4,497,"frame"),t("console screen",160,.7,106,-330,-519.3,524,"screen");for(let i=0;i<4;i++)t("screen interface row",118-i*13,.2,3,-334,-519.77,598-i*17,"screenLine");for(let i=0;i<4;i++)t("screen soft key",15,.2,7,-385+i*35,-519.77,532,"blue");for(const i of[-410,-250])for(const r of[503,632])n("console fastener",2,.5,i,-519.4,r,"steel",12);return t("operator button panel",108,10,68,-343,-511,404,"frame"),n("emergency stop yellow surround",18,3,-372,-517.5,438,"yellow"),n("emergency stop head",11,1.5,-372,-519.3,438,"red"),n("start indicator",6,2,-332,-519,438,"blue"),n("auxiliary indicator",6,2,-308,-519,438,"gasket"),s}function Xx(){const s=new Mt;s.name="PCP 0.30cc reference - 303mm body";const e=new ot({color:13817819,metalness:.9,roughness:.28}),t=new ot({color:3358016,metalness:.35,roughness:.55}),n=new ot({color:2503220,metalness:.15,roughness:.65}),i=new ot({color:2846678,metalness:.3,roughness:.4});s.userData.ownedMaterials=[e,t,n,i];function r(h,u,d,f,g=e,_=48){const m=new dn(u,u,d,_);m.rotateX(Math.PI/2);const p=new nt(m,g);return p.name=h,p.position.z=f+d/2,p.castShadow=p.receiveShadow=!0,s.add(p),p}function a(h,u,d,f,g,_,m,p=e){const x=new nt(new ln(u,d,f),p);return x.name=h,x.position.set(g,_,m+f/2),x.castShadow=x.receiveShadow=!0,s.add(x),x}r("end adapter",12,13,0,e,6),r("stator end ring",15,5,13,t),r("stator body",14,105,18,n),r("stator coupling",18,10,123,e,6),r("pump barrel",20,78,133,e),r("seal housing",25,25,211,t),r("bearing housing",27,24,236,e),r("sanitary clamp",29,8,260,e),r("drive adapter",22,26,268,t),r("gearbox flange",39,9,294,e);for(let h=0;h<4;h++){const u=h*Math.PI/2,d=r("flange M4 visual",2.3,1.2,303,t,12);d.position.x=35*Math.cos(u),d.position.y=35*Math.sin(u)}r("motor shoulder",31,10,303,t),r("motor housing estimated",34,72,313,i);for(let h=0;h<8;h++){const u=h*Math.PI/4;a("motor cooling rib",3,3,52,32*Math.cos(u),32*Math.sin(u),321,t)}r("motor rear cap",34,6,385,t);const o=195,c=new nt(new dn(8,8,24,6),e);c.name="schematic side inlet #8/#6 JIC",c.rotation.z=-Math.PI/2,c.position.set(31,0,o),s.add(c);const l=new vt;l.name="PCP material inlet (schematic outlet face)",l.position.set(43,0,o),s.add(l),a("mounting rail plate estimated",58,8,125,0,38,125,t);for(const h of[145,225]){a("clamp bridge estimated",58,12,9,0,27,h,e);for(const u of[-24,24])r("clamp bolt",2.2,1.5,h+9,t,12).position.set(u,27,h+9.75)}return{group:s,inletPort:l,bodyLengthMm:303,flangeBoltCircleMm:70}}function $x(s,e,t="feed"){const n=s.clone(),i=e.clone();if(t==="air")return[n,n.clone().add(new P(0,0,28)),i.clone().add(new P(0,0,30)),i];if(t==="stationAir")return[n,n.clone().add(new P(0,-30,0)),i.clone().add(new P(-40,0,0)),i];if(t==="supply"){const r=n.clone().lerp(i,.5);return r.z=Math.max(n.z,i.z)+70,[n,n.clone().add(new P(0,0,40)),r,i.clone().add(new P(-50,0,0)),i]}return[n,n.clone().add(new P(35,0,0)),new P(-520,330,n.z+65),new P(-520,360,Math.max(i.z+120,180)),new P(i.x+120,180,i.z+100),i.clone().add(new P(50,0,0)),i]}function xo(s,e,t="feed",n=3){const i=$x(s,e,t),r=new gu(i,!1,"centripetal");return new Hc(r,96,n,12,!1)}const va=Object.freeze({part:"Nordson 7018555 candidate",nominalLengthMm:63.5,nominalIdMm:3.175,assumedInsertionMm:7,thread:"1/4 NPT nominal",evidence:"published dimensions + assumed insertion; unconfirmed Laird test setup",source:"https://www.nordson.com/en/products/efd-products/plastic-nozzles"}),qx=Object.freeze({R75:{cartridge:{capacityMl:75,outerDiameterMm:43.2,axialLengthMm:98.8,evidence:"published typical external envelope; bare cartridge only",source:"https://www.nordsonefd.com/nordson_efd_product_catalog/25/"},nozzle:va,other:"retainer, piston, holder and air hose routing are visual engineering assumptions"},P300:{enclosure:{model:"C300 reference envelope",widthMm:939,depthMm:1041,heightMm:1905,workspaceMm:[254,277,70],source:"https://www.graco.com/content/dam/graco/com_documents/349/349735/349735EN-B.pdf",evidence:"published outer envelope; interior and panels are visual assumptions"},supply:{model:"DM-22 25T471 reference",widthMm:360,depthMm:300,loweredHeightMm:550,raisedHeightMm:800,fluidPort:"1/4 NPT female",airPort:"8 mm female",source:"https://www.graco.com/content/dam/graco/tech_documents/manuals/3A7/3A7931/3A7931EN-D.pdf",evidence:"published metric dimensions; components and tubing routes are visual assumptions"},pcp:{model:"25B192 candidate; not confirmed Laird upgraded PCP",bodyLengthMm:303,boltCircleMm:70,inlet:"#8/#6 JIC",outlet:"5/16-28",source:"https://www.graco.com/content/dam/graco/tech_documents/manuals/3A5/3A5364/3A5364EN.pdf",evidence:"published body length and fittings; motor and details approximated"}}});function Yx(){const s=(e,t,n,i={})=>new ot({color:e,roughness:t,metalness:n,...i});return{graphite:s(2830649,.5,.35),cover:s(15526629,.42,.05),coverGrey:s(13225168,.45,.1),cobalt:s(2056145,.34,.3),cobaltDark:s(1523340,.42,.3),steel:s(14015199,.24,.92),steelDark:s(9278877,.32,.88),aluminum:s(12896976,.3,.82),castAl:s(11778753,.46,.7),black:s(1513756,.48,.35),rubber:s(1052947,.92,0),orange:s(15760411,.5,.05),red:s(14166074,.36,.05),yellow:s(16040991,.42,.05),green:s(2274402,.38,.05),teal:s(1474698,.4,.45),hole:s(3159613,.7,.3),bench:s(14275527,.82,0),mat:s(2776936,.88,0),brass:s(13214285,.3,.9),lens:s(856342,.2,.1),glass:new cn({color:14676735,roughness:.08,metalness:0,transparent:!0,opacity:.16,depthWrite:!1,side:Vt,clearcoat:1}),polymer:new cn({color:10465402,roughness:.35,metalness:0,transparent:!0,opacity:.82,clearcoat:.6})}}class jx{constructor(e,t={parts:0}){this.palette=e,this.counter=t,this.edgeMaterial=new Yi({color:724756,transparent:!0,opacity:.13})}material(e){return typeof e=="string"?this.palette[e]:e}mesh(e,t,n,{edges:i=!0,shadow:r=!0}={}){const a=new nt(e,this.material(t));return a.castShadow=r,a.receiveShadow=!0,i&&a.add(new kc(new pu(e,32),this.edgeMaterial)),n.add(a),this.counter.parts++,a}box(e,t,n,i,r,a,o,c,l){const h=l??Math.min(1.2,e/12,t/12,n/6),u=h>.15&&Math.min(e,t,n)>=2.5?new br(e,t,n,2,h):new ln(e,t,n),d=this.mesh(u,o,c);return d.position.set(i,r,a+n/2),d}cyl(e,t,n,i,r,a,o,c=32){const l=new dn(e,e,t,c);l.rotateX(Math.PI/2);const h=this.mesh(l,a,o,{edges:c<=8});return h.position.set(n,i,r+t/2),h}rod(e,t,n,i,r,a,o,c,l=24){const h=new dn(e,e,t,l);n==="x"?h.rotateZ(Math.PI/2):n==="z"&&h.rotateX(Math.PI/2);const u=this.mesh(h,o,c,{edges:!1});return u.position.set(i,r,a),u}screw(e,t,n,i,r=1.6,a="z"){const o=new dn(r,r,r*.9,14),c=new dn(r*.45,r*.45,r*.95,6);a==="z"?(o.rotateX(Math.PI/2),c.rotateX(Math.PI/2)):a==="y"||(o.rotateZ(Math.PI/2),c.rotateZ(Math.PI/2));const l=this.mesh(o,"black",i,{edges:!1,shadow:!1});return l.position.set(e,t,n),this.mesh(c,"hole",i,{edges:!1,shadow:!1}).position.set(e,t,n),l}}function Kx({material:s,sideMaterial:e,pitch:t=9,width:n=26,height:i=12,radius:r=16,free:a=200}){const o=Math.ceil((a+Math.PI*r)/t)+2,c=new br(t*.92,n,i,1,1.2),l=new ln(t*.6,n+2,i*.45),h=new Is(c,s,o),u=new Is(l,e,o);h.castShadow=u.castShadow=!0,h.receiveShadow=!0;const d=new Mt;d.add(h,u);const f=new rt,g=new Cn,_=new Pn,m=new P(1,1,1),p=new P;function x(y){const v=(a+y)/2,E=Math.max(0,v),w=Math.max(0,v-y);for(let A=0;A<o;A++){let D=(A+.5)*t,b=0;if(D<=E)p.set(D,0,0);else if((D-=E)<=Math.PI*r){const S=D/r;p.set(v+r*Math.sin(S),0,r-r*Math.cos(S)),b=-S}else D-=Math.PI*r,p.set(v-Math.min(D,w),0,2*r),b=-Math.PI;g.setFromEuler(_.set(0,b,0)),f.compose(p,g,m),h.setMatrixAt(A,f),u.setMatrixAt(A,f)}h.instanceMatrix.needsUpdate=u.instanceMatrix.needsUpdate=!0,h.computeBoundingSphere(),u.computeBoundingSphere()}return x(0),{group:d,update:x,dispose:()=>[c,l].forEach(y=>y.dispose())}}function Zx(s=256,e=112){if(typeof document>"u")return null;const t=document.createElement("canvas");t.width=s,t.height=e;const n=new uu(t);n.colorSpace=Ft;const i=t.getContext("2d");let r="";function a(o,c){const l=o.join("|")+c;l!==r&&(r=l,i.fillStyle="#0b2b1f",i.fillRect(0,0,s,e),i.fillStyle=c?"#7dffb2":"#47d38a",i.font="bold 40px ui-monospace, Menlo, Consolas, monospace",i.fillText(o[0],14,50),i.font="22px ui-monospace, Menlo, Consolas, monospace",i.fillText(o[1],14,88),c&&(i.fillStyle="#ffcf5a",i.fillRect(s-30,14,14,14)),n.needsUpdate=!0)}return{texture:n,draw:a}}const er=[[0,[.16,.2,.55]],[.25,[.12,.45,.78]],[.5,[.1,.68,.66]],[.75,[.55,.82,.32]],[1,[.99,.82,.2]]];function Jx(s){const e=Math.max(0,Math.min(1,s));for(let t=1;t<er.length;t++)if(e<=er[t][0]){const[n,i]=er[t-1],[r,a]=er[t],o=(e-n)/(r-n);return i.map((c,l)=>c+(a[l]-c)*o)}return er.at(-1)[1]}function Qx(s,e,t,{plateMargin:n=6}={}){var Te;const i=new Mt;i.name="estimated compression inspection";const r=[],a=ge=>(r.push(ge),ge),o=t.grid,c=s.surfaceZ,l=e.width,h=e.shape==="circle"?e.width:e.depth,u=Uint8Array.from(o.coverage,ge=>Math.round(Math.max(0,Math.min(1,Number(ge)||0))*255)),d=(Te=o.frames)!=null&&Te.length?o.frames:[{gap:e.gap,coverage:u,trapped:o.voidMask||new Uint8Array(u.length)}],f=o.cols*o.rows,g=new Float32Array(f).fill(-1);d.forEach((ge,pe)=>{for(let Oe=0;Oe<f;Oe++)g[Oe]<0&&ge.coverage[Oe]>=128&&(g[Oe]=d.length>1?pe/(d.length-1):1)});const _=e.shape==="circle"?new Ma(l/2,96):new Pi(l,h),m=new nt(_,a(new On({color:1684930,transparent:!0,opacity:.35,side:Vt,depthWrite:!1})));m.position.set(e.offsetX,e.offsetY,c+.004),m.name="configured heat source",m.renderOrder=1,i.add(m);const p=e.shape==="circle"?Array.from({length:97},(ge,pe)=>new P(l/2*Math.cos(pe*Math.PI*2/96),l/2*Math.sin(pe*Math.PI*2/96),0)):[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]].map(([ge,pe])=>new P(ge*l/2,pe*h/2,0)),x=new ji(new bt().setFromPoints(p),a(new Yi({color:771542,depthTest:!1,transparent:!0})));x.position.set(e.offsetX,e.offsetY,c+e.gap+.02),x.name="heat source boundary",x.renderOrder=6,i.add(x);let y=o.cols,v=-1,E=o.rows,w=-1;for(let ge=0;ge<f;ge++)if(u[ge]>0||d.some(pe=>pe.coverage[ge]>0)){const pe=ge%o.cols,Oe=Math.floor(ge/o.cols);y=Math.min(y,pe),v=Math.max(v,pe),E=Math.min(E,Oe),w=Math.max(w,Oe)}const A=v>=y;A&&(y=Math.max(0,y-1),E=Math.max(0,E-1),v=Math.min(o.cols-1,v+1),w=Math.min(o.rows-1,w+1));const D=A?v-y+2:0,b=A?w-E+2:0,S=new bt,I=new Float32Array(D*b*3),U=new Float32Array(D*b*3),V=new Float32Array(D*b);for(let ge=0;ge<b;ge++)for(let pe=0;pe<D;pe++){const Oe=ge*D+pe;I[3*Oe]=o.originX+(y+pe)*o.cellSize,I[3*Oe+1]=o.originY+(E+ge)*o.cellSize}S.setAttribute("position",new Bt(I,3)),S.setAttribute("color",new Bt(U,3));const Y=new Je((qt[s.material]||qt.putty).color),Q=new nt(S,a(new cn({vertexColors:!0,roughness:.55,metalness:0,clearcoat:.2,clearcoatRoughness:.5,side:Vt,envMapIntensity:.6})));Q.name="squeezed film",Q.castShadow=!0,Q.receiveShadow=!0,i.add(Q);const G=new nt(new bt,a(new On({color:16723285,transparent:!0,opacity:.85,side:Vt,depthWrite:!1})));G.name="trapped air",G.position.z=c+.01,G.renderOrder=4,i.add(G);let ae=e.offsetX-l/2,X=e.offsetX+l/2,fe=e.offsetY-h/2,Me=e.offsetY+h/2;for(let ge=0;ge<f;ge++){if(!(Number(o.coverage[ge])>1e-7))continue;const pe=o.originX+ge%o.cols*o.cellSize,Oe=o.originY+Math.floor(ge/o.cols)*o.cellSize;ae=Math.min(ae,pe),X=Math.max(X,pe+o.cellSize),fe=Math.min(fe,Oe),Me=Math.max(Me,Oe+o.cellSize)}const Se=3,we=new ln(X-ae+2*n,Me-fe+2*n,Se),at=new nt(we,a(new cn({color:13626101,transparent:!0,opacity:.1,roughness:.05,metalness:0,clearcoat:.4,depthWrite:!1,side:Vt})));at.name="transparent inspection plate",at.renderOrder=5,i.add(at),at.add(new kc(new pu(we),a(new Yi({color:4892612,transparent:!0,opacity:.8,depthWrite:!1}))));let Ge="material",it=d.length-1;const te=new Je;function ie(ge){it=Math.max(0,Math.min(d.length-1,ge));const pe=d[it],Oe=pe.gap;if(at.position.set((ae+X)/2,(fe+Me)/2,c+Oe+Se/2),x.position.z=c+Oe+.02,A){const Ie=(oe,ze)=>oe<0||ze<0||oe>=o.cols||ze>=o.rows?0:pe.coverage[ze*o.cols+oe]/255,Pe=new Float32Array(D*b);for(let oe=0;oe<b;oe++)for(let ze=0;ze<D;ze++){const me=y+ze,Le=E+oe;Pe[oe*D+ze]=(Ie(me-1,Le-1)+Ie(me,Le-1)+Ie(me-1,Le)+Ie(me,Le))/4}for(let oe=0;oe<b;oe++)for(let ze=0;ze<D;ze++){let me=0,Le=0;for(let Ke=-1;Ke<=1;Ke++)for(let Ze=-1;Ze<=1;Ze++){const C=ze+Ze,M=oe+Ke;C<0||M<0||C>=D||M>=b||(me+=Pe[M*D+C],Le++)}V[oe*D+ze]=me/Le}for(let oe=0;oe<b;oe++)for(let ze=0;ze<D;ze++){const me=oe*D+ze,Le=V[me];if(I[3*me+2]=c+Oe*Math.min(1,2.2*(Le-.22))-(Le<.22?.02:0),Ge==="front"){const Ke=y+ze,Ze=E+oe;let C=-1;for(const[z,J]of[[Ke-1,Ze-1],[Ke,Ze-1],[Ke-1,Ze],[Ke,Ze]])z>=0&&J>=0&&z<o.cols&&J<o.rows&&(C=Math.max(C,g[J*o.cols+z]));const M=Jx(C<0?1:C);te.setRGB(M[0],M[1],M[2],Ft)}else te.copy(Y).multiplyScalar(.7+.2*Math.min(1,Le));U[3*me]=te.r,U[3*me+1]=te.g,U[3*me+2]=te.b}const Ae=[];for(let oe=0;oe<b-1;oe++)for(let ze=0;ze<D-1;ze++){const me=oe*D+ze;Math.max(V[me],V[me+1],V[me+D],V[me+D+1])<.22||Ae.push(me,me+1,me+D+1,me,me+D+1,me+D)}S.setIndex(Ae),S.attributes.position.needsUpdate=!0,S.attributes.color.needsUpdate=!0,S.computeVertexNormals(),S.computeBoundingSphere()}const We=[],N=pe.trapped||o.voidMask;if(N){for(let Ie=0;Ie<f;Ie++)if(N[Ie]){const Pe=o.originX+Ie%o.cols*o.cellSize,Ae=o.originY+Math.floor(Ie/o.cols)*o.cellSize,oe=o.cellSize;We.push(Pe,Ae,0,Pe+oe,Ae,0,Pe+oe,Ae+oe,0,Pe,Ae,0,Pe+oe,Ae+oe,0,Pe,Ae+oe,0)}}return G.geometry.dispose(),G.geometry=new bt,G.geometry.setAttribute("position",new Pt(We,3)),pe}return ie(it),{group:i,source:m,film:Q,voids:G,plate:at,frameCount:d.length,frames:d,get frameIndex(){return it},setFrame:ie,setColorMode(ge){Ge=ge,ie(it)},dispose(){i.removeFromParent(),i.traverse(ge=>{var pe;return(pe=ge.geometry)==null?void 0:pe.dispose()});for(const ge of r)ge.dispose()}}}function ey(s,e){const t=s/2,n=t+.55,i=Math.max(5,n+.4),r=[[t,0],[n,0],[n+.12,Math.min(2,e*.12)],[i,e],[t,e],[t,0]].map(([o,c])=>new Ee(o,c)),a=new ks(r,64);return a.rotateX(Math.PI/2),a}function ty(s,e){const t=s/2,n=va.assumedInsertionMm,i=[[t,e],[6.2,e],[6.2,e+n],[t,e+n],[t,e]].map(([a,o])=>new Ee(a,o)),r=new ks(i,48);return r.rotateX(Math.PI/2),r}function Lu(s){const e=s.attributes.position,t=s.index;let n=0;for(let i=0;i<(t?t.count:e.count);i+=3){const r=t?t.getX(i):i,a=t?t.getX(i+1):i+1,o=t?t.getX(i+2):i+2;n+=(e.getX(r)*(e.getY(a)*e.getZ(o)-e.getZ(a)*e.getY(o))+e.getY(r)*(e.getZ(a)*e.getX(o)-e.getX(a)*e.getZ(o))+e.getZ(r)*(e.getX(a)*e.getY(o)-e.getY(a)*e.getX(o)))/6}return Math.abs(n)}function Du(s,e,t,n){const i=bc(s,e,t),r=s.length,a=Mo,o=a+1,c=[],l=[];for(let d=0;d<=r;d++){const f=n(d);for(let g=0;g<=a;g++){const _=g*Math.PI/a,m=i.widths[d]*Math.cos(_)/2;c.push(f.x+f.nx*m,f.y+f.ny*m,i.heights[d]*Math.sin(_))}}for(let d=0;d<r;d++)for(let f=0;f<a;f++){const g=d*o+f;l.push(g,g+1,g+o+1,g,g+o+1,g+o)}const h=c.length/3;for(let d=0;d<=r;d++){const f=n(d),g=i.widths[d]/2;c.push(f.x+f.nx*g,f.y+f.ny*g,0,f.x-f.nx*g,f.y-f.ny*g,0)}for(let d=0;d<r;d++){const f=h+2*d;l.push(f,f+2,f+3,f,f+3,f+1)}const u=new bt;return u.setAttribute("position",new Pt(c,3)),u.setIndex(l),u.computeVertexNormals(),u.userData.unitVolume=Lu(u),u}function Ch(s,e,t){return Du(s,e,t,n=>({x:n*e,y:0,nx:0,ny:1}))}function Ph(s,e,t,n,i){return Du(s,e,t,r=>{const a=i+r*e,o=xc(n,a),c=a-Math.max(0,Math.min(n.length,a));return{x:o.x+o.tx*c,y:o.y+o.ty*c,nx:-o.ty,ny:o.tx}})}function ny(s,e){const t=new Mt,n=s.width,i=s.shape==="circle"?n:s.depth,r=new On({color:1684930,transparent:!0,opacity:.22,side:Vt,depthWrite:!1}),a=new Yi({color:692124,transparent:!0,opacity:.95,depthWrite:!1}),o=s.shape==="circle"?new Ma(n/2,96):new Pi(n,i),c=new nt(o,r);c.position.z=e+.003,c.renderOrder=1,t.add(c);const l=s.shape==="circle"?Array.from({length:97},(u,d)=>new P(n/2*Math.cos(d*2*Math.PI/96),n/2*Math.sin(d*2*Math.PI/96),e+.006)):[[-n/2,-i/2],[n/2,-i/2],[n/2,i/2],[-n/2,i/2],[-n/2,-i/2]].map(([u,d])=>new P(u,d,e+.006)),h=new ji(new bt().setFromPoints(l),a);return h.renderOrder=2,t.add(h),t.position.set(s.offsetX,s.offsetY,0),t.name="設定的熱源參考輪廓",t.userData.ownedMaterials=[r,a],t}function iy(s){const t=2*s,n=(1+t*t)/(2*t),i=t-n,r=Math.acos((n-t)/n),a=48,o=16,c=[0,0,t],l=[];for(let f=1;f<=o;f++){const g=r*f/o,_=n*Math.sin(g),m=i+n*Math.cos(g);for(let p=0;p<a;p++){const x=p*2*Math.PI/a;c.push(_*Math.cos(x),_*Math.sin(x),m)}}for(let f=0;f<a;f++)l.push(0,1+f,1+(f+1)%a);for(let f=0;f<o-1;f++)for(let g=0;g<a;g++){const _=1+f*a+g,m=1+f*a+(g+1)%a;l.push(_,_+a,m,m,_+a,m+a)}const h=c.length/3;c.push(0,0,0);const u=1+(o-1)*a;for(let f=0;f<a;f++)l.push(h,u+(f+1)%a,u+f);const d=new bt;return d.setAttribute("position",new Pt(c,3)),d.setIndex(l),d.computeVertexNormals(),d.userData.unitVolume=Lu(d),d}function sy(s,e){if(typeof document>"u")return new Je(e);const t=document.createElement("canvas");t.width=4,t.height=256;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,0,256);i.addColorStop(0,s),i.addColorStop(1,e),n.fillStyle=i,n.fillRect(0,0,4,256);const r=new uu(t);return r.colorSpace=Ft,r}const ry=s=>s<.5?4*s*s*s:1-(-2*s+2)**3/2,ay=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,oy={whole:"全機",work:"工作區",head:"機頭",feed:"供膠站",close:"點膠近看",heat:"熱源特寫",follow:"局部跟隨"};class cy{constructor(e,{onScale:t,onView:n}={}){this.host=e,this.onScale=t,this.onView=n,this.mode="close",this.config=null,this.counter={parts:0},this.isoCorner=2,this.freeOrbit=!1,this.projection="ortho",this.showExitPath=!0,this.showPlannedPath=!0,this.theme="light",this.scene=new ou,this.renderer=new Hv({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.outputColorSpace=Ft,this.renderer.toneMapping=zh,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=kh,e.appendChild(this.renderer.domElement);const i=this.renderer.domElement;i.setAttribute("aria-label","毫米比例的點膠機台 3D 場景；可拖曳、滾輪縮放，Home 重設"),i.setAttribute("tabindex","0");const r=new fc(this.renderer);this.scene.environment=r.fromScene(new Bx,.04).texture,this.scene.environmentIntensity=.7,r.dispose(),this.hemi=new Vp(16777215,7174790,.9),this.scene.add(this.hemi),this.sun=new dc(16774374,2.4),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-2e-4,this.sun.shadow.normalBias=.6,this.scene.add(this.sun,this.sun.target);const a=new dc(13229311,.8);a.position.set(400,600,300),this.scene.add(a),this.setTheme("light"),this.ortho=new Sa(-150,150,100,-100,.1,2e4),this.persp=new sn(32,1,1,3e4),this.ortho.up.set(0,0,1),this.persp.up.set(0,0,1),this.camera=this.ortho,this.makeControls(),this.palette=Yx(),this.kit=new jx(this.palette,this.counter),this.glue=new cn({color:qt.putty.color,roughness:.48,metalness:0,clearcoat:.35,clearcoatRoughness:.4,sheen:.4}),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),i.addEventListener("keydown",o=>{if(o.key==="+"||o.key==="=")this.zoomBy(1.2);else if(o.key==="-")this.zoomBy(1/1.2);else if(o.key==="Home")this.fit(this.mode);else return;o.preventDefault()})}makeControls(){var e;(e=this.controls)==null||e.dispose(),this.controls=new Gv(this.camera,this.renderer.domElement),this.controls.enableDamping=!1,this.controls.minZoom=.2,this.controls.maxZoom=40,this.controls.minDistance=20,this.controls.maxDistance=2e4,this.controls.minPolarAngle=.01,this.controls.maxPolarAngle=Math.PI-.01,this.controls.zoomToCursor=!0,this.controls.addEventListener("change",()=>this.render()),this.applyOrbitMode()}applyOrbitMode(){const e=this.freeOrbit;this.controls.enableRotate=e,this.controls.mouseButtons.LEFT=e?ci.ROTATE:ci.PAN,this.controls.mouseButtons.RIGHT=ci.PAN,this.controls.touches.ONE=e?ri.ROTATE:ri.PAN,this.controls.touches.TWO=ri.DOLLY_PAN}setTheme(e){var n,i;this.theme=e;const t=e==="dark";(i=(n=this.scene.background)==null?void 0:n.dispose)==null||i.call(n),this.scene.background=sy(t?"#243042":"#f4f7fb",t?"#0d1218":"#cdd6e1"),this.hemi.intensity=t?.7:.9,this.render()}disposeGroup(e){e&&(e.traverse(t=>{var n,i;(n=t.geometry)==null||n.dispose();for(const r of((i=t.userData)==null?void 0:i.ownedMaterials)||[])r.dispose()}),e.removeFromParent())}rebuild(e,t){var d,f,g,_,m;this.clearCompression(),(d=this.imported)==null||d.removeFromParent();for(const p of[this.machine,this.environment,this.depositGroup,this.patternSource,this.overlays])this.disposeGroup(p);(f=this.chain)==null||f.dispose(),(g=this.hose)==null||g.material.dispose(),(_=this.supplyHose)==null||_.material.dispose(),(m=this.stationAirHose)==null||m.material.dispose(),Object.assign(this,{cartridge:null,pumpStation:null,head:null,hose:null,supplyHose:null,stationAirHose:null,chain:null,lcd:null,lastHose:null,enclosure:null,stationAirAnchor:null}),this.counter.parts=0,this.config=e,this.run=t;const n=e.architecture==="P300",i=this.kit;this.glue.color.setHex((qt[e.material]||qt.putty).color);const r=e.architecture==="R75"?va.nominalLengthMm-va.assumedInsertionMm:e.nozzleLength;this.visualNozzleLength=r,this.machine=new Mt,this.machine.name="machine",this.environment=new Mt,this.depositGroup=new Mt,this.overlays=new Mt,this.scene.add(this.machine,this.environment,this.depositGroup,this.overlays),e.heatSource&&(this.patternSource=ny(e.heatSource,e.surfaceZ),this.scene.add(this.patternSource)),n?this.buildCell(i):this.buildBench(i),this.buildGantry(i,n),this.buildFixture(i,e),this.tool=new Mt,this.tool.name="tool",this.machine.add(this.tool);const a=n?4:0;this.buildZSlide(i,n,a),n?(this.head=Xx(),this.head.group.position.z=r,this.tool.add(this.head.group),this.hoseStart=this.pumpStation.fluidPort,this.hoseEnd=this.head.inletPort):(this.cartridge=Vx({fillMaterial:this.glue}),this.cartridge.group.position.z=r,this.tool.add(this.cartridge.group),this.hoseStart=this.airFitting,this.hoseEnd=this.cartridge.airPort);const o=i.mesh(ey(e.diameter,r),n?"steel":"polymer",this.tool,{edges:!1});o.castShadow=!1,n||(i.mesh(ty(e.diameter,r),"polymer",this.tool,{edges:!1}).castShadow=!1),this.hose=new nt(new bt,new ot({color:n?1845811:4165088,roughness:n?.6:.25,metalness:0,transparent:!n,opacity:n?1:.85})),this.hose.castShadow=!0,this.hose.name=n?"示意供膠管":"示意供氣管",this.machine.add(this.hose),n||(this.supplyHose=new nt(new bt,this.hose.material.clone()),this.supplyHose.castShadow=!0,this.machine.add(this.supplyHose)),this.flowColumn=new nt(new dn(1,1,1,24,1,!0),this.glue),this.flowColumn.geometry.rotateX(Math.PI/2),this.flowColumn.geometry.translate(0,0,.5),this.flowColumn.visible=!1,this.depositGroup.add(this.flowColumn),this.lastDeposits=null,this.depositMeshes=[],e.mode==="point"&&(this.dotGeo=iy(e.dotRatio));const c=e.mode==="pattern"?Ph(t.frames[0].deposits,t.cellLength,e.lineRatio,t.path,t.gridStart):e.mode==="line"?Ch(t.frames[0].deposits,t.cellLength,e.lineRatio):this.dotGeo,l=new nt(c,this.glue);l.visible=!1,l.castShadow=l.receiveShadow=!0,this.depositGroup.add(l),this.depositMeshes.push(l);const h=e.mode==="pattern"?t.path.points.map(p=>new P(p.x,p.y,e.surfaceZ+.02)):e.mode==="line"?[new P(e.offsetX-e.lineLength/2,e.offsetY,e.surfaceZ+.02),new P(e.offsetX+e.lineLength/2,e.offsetY,e.surfaceZ+.02)]:[];this.plannedPath=new ji(new bt().setFromPoints(h),new Xl({color:15901498,dashSize:1.2,gapSize:.8,transparent:!0,opacity:.9})),this.plannedPath.computeLineDistances(),this.plannedPath.userData.ownedMaterials=[this.plannedPath.material],this.plannedPath.visible=this.showPlannedPath,this.overlays.add(this.plannedPath);const u=t.frames.filter(p=>p.t>=t.ending.liftStart-.01&&p.t<=t.ending.motionEnd+.01).map(p=>new P(p.x,p.y,p.z));this.exitPath=new ji(new bt().setFromPoints(u),new Xl({color:14701343,dashSize:.7,gapSize:.4,transparent:!0,opacity:.85})),this.exitPath.computeLineDistances(),this.exitPath.userData.ownedMaterials=[this.exitPath.material],this.exitPath.visible=this.showExitPath,this.overlays.add(this.exitPath),this.configureShadow(n),this.update(t.frames[0]),this.fit(this.mode,{animate:!1})}configureShadow(e){const t=e?700:420;this.sun.position.set(-260,-420,900),this.sun.target.position.set(0,40,0),Object.assign(this.sun.shadow.camera,{left:-t,right:t,top:t,bottom:-t,near:10,far:3e3}),this.sun.shadow.camera.updateProjectionMatrix()}buildBench(e){const t=this.environment;e.box(1180,820,40,-60,40,-112,"bench",t,4),e.box(1040,680,2,-60,40,-72,"mat",t,1),e.cyl(6,3,440,-280,-70,"steel",t)}buildCell(e){this.enclosure=Wx(),this.machine.add(this.enclosure),this.pumpStation=Gx(),this.pumpStation.group.position.set(-750,0,-900),this.machine.add(this.pumpStation.group);const t=new nt(new Pi(4e3,4e3),new ot({color:10134445,roughness:.9}));t.position.z=-900.5,t.receiveShadow=!0,t.userData.ownedMaterials=[t.material],this.environment.add(t);const n=new Mt;n.position.set(-469.5,-300,-700),this.machine.add(n),this.stationAirAnchor=n,e.box(12,32,32,0,0,-16,"black",n),e.rod(5,14,"x",-13,0,0,"steel",n),this.stationAirSource=new vt,this.stationAirSource.position.x=-20,n.add(this.stationAirSource),this.stationAirHose=new nt(new bt,new ot({color:3112920,roughness:.4})),this.stationAirHose.name="示意外部氣源接管",this.machine.add(this.stationAirHose),this.pumpStation.group.updateMatrixWorld(!0),n.updateMatrixWorld(!0),this.stationAirHose.geometry=xo(this.pumpStation.airPort.getWorldPosition(new P),this.stationAirSource.getWorldPosition(new P),"stationAir",3)}buildGantry(e,t){const n=this.machine,i=t?4:0,r=110+i;this.beamY=r;const a=new Mt;a.name="base",n.add(a),e.box(420,500,40,0,60,-56,"graphite",a,3),e.box(408,488,3,0,60,-19,"coverGrey",a,1);for(const v of[-185,185])for(const E of[-160,280])e.cyl(16,4,v,E,-70,"rubber",a),e.cyl(9,10,v,E,-66,"steel",a);const o=-190;e.box(150,4,30,110,o-2,-50,"black",a,1),e.cyl(10,4,165,o-4,-40,"yellow",a).rotation.x=Math.PI/2;const c=e.cyl(8,8,165,o-10,-40,"red",a);c.rotation.x=Math.PI/2;for(const[v,E]of[[70,"green"],[95,"red"],[120,"black"]]){const w=e.cyl(5,4,v,o-4,-36,E,a,20);w.rotation.x=Math.PI/2}e.box(90,1,16,-110,o-.5,-46,"aluminum",a,.6);for(const v of[-42,-38,-34])e.box(70,.6,.8,-110,o-1.1,v,"hole",a,0);e.box(320,320,16,0,0,-16,"aluminum",a,1.5);const l=[];for(let v=-137.5;v<=137.5;v+=25)for(let E=-137.5;E<=137.5;E+=25)l.push([v,E]);const h=new dn(2.6,2.6,.2,16);h.rotateX(Math.PI/2);const u=new Is(h,this.palette.hole,l.length);l.forEach(([v,E],w)=>u.setMatrixAt(w,new rt().makeTranslation(v,E,.02))),u.receiveShadow=!0,a.add(u);const d=[];for(let v=-150;v<=150;v+=5)d.push(v);const f=new ln(.5,1,.12),g=new Is(f,this.palette.black,d.length);d.forEach((v,E)=>g.setMatrixAt(E,new rt().compose(new P(v,-157+(v%25===0?2.5:1.25),.06),new Cn,new P(1,v%25===0?5:2.5,1)))),a.add(g);for(const v of[-190,190]){e.box(34,470,18,v,60,-16,"graphite",a,1.5),e.box(15,460,10,v,60,2,"steel",a,.4);for(let E=-160;E<=280;E+=40)e.screw(v,E,12.4,a,1.4);for(const E of[-172,292])e.box(30,8,22,v,E,2,"orange",a,1);e.box(46,52,46,v,318,-16,"black",a,2),e.cyl(16,4,v,318,30,"steel",a),e.box(10,40,30,v+Math.sign(v)*25,318,-10,"coverGrey",a,1)}this.bridge=new Mt,this.bridge.name="bridge",n.add(this.bridge);const _=this.bridge;for(const v of[-190,190]){for(const E of[-22,22])e.box(30,34,14,v,r+E,12,"steelDark",_,1);e.box(56,92,10,v,r,26,"cobaltDark",_,2),e.box(40,52,174,v,r,36,"cobalt",_,3),e.box(44,56,6,v,r,206,"coverGrey",_,2);for(const E of[-18,18])for(const w of[-18,18])e.screw(v+w,r+E,36.6,_,1.6)}e.box(440,40,50,0,r,205,"cobalt",_,3),e.box(400,2,36,0,r+20.5,212,"coverGrey",_,.6);for(const v of[212,240]){e.box(400,6,10,0,r-23,v-5,"steel",_,.4);for(let E=-180;E<=180;E+=40)e.screw(E,r-26.2,v,_,1.2,"y")}e.rod(4.5,390,"x",0,r-29,226,"steel",_);for(const v of[-212,212])e.box(10,46,56,v+Math.sign(v)*5,r,202,"coverGrey",_,2);e.box(50,44,44,247,r,208,"black",_,2),e.rod(16,6,"x",275,r,230,"steel",_),e.box(10,10,10,250,r-26,240,"orange",_,1),e.box(18,18,12,-200,r,255,"black",_,1),e.cyl(4,10,-200,r,267,"brass",_),this.airFitting=new vt,this.airFitting.position.set(-200,r,277),_.add(this.airFitting),this.supplyFitting=new vt,this.supplyFitting.position.set(-209,r,261),_.add(this.supplyFitting);const m=new ot({color:2369581,roughness:.55,metalness:.1}),p=new ot({color:15760411,roughness:.5,metalness:.05});this.chain=Kx({material:m,sideMaterial:p,free:200}),this.chain.group.position.set(0,r,261),this.chain.group.userData.ownedMaterials=[m,p],_.add(this.chain.group),e.box(28,30,4,0,r,255,"steelDark",_,.8),this.carriage=new Mt,this.carriage.name="x carriage",_.add(this.carriage);const x=this.carriage,y=t?380:300;for(const v of[-22,22])for(const E of[212,240])e.box(30,8,16,v,r-30,E-8,"steelDark",x,1);e.box(90,6,80,0,r-37,186,"cover",x,2),e.box(70,8,y-60,0,66+i,60,"cover",x,2),e.box(70,2,y-70,0,61+i,65,"cobalt",x,.5);for(const v of[-20,20])e.box(9,6,y-80,v,57+i,70,"steel",x,.3);e.rod(3.5,y-90,"z",0,57+i,65+(y-90)/2,"steel",x),e.box(44,44,54,0,66+i,y,"black",x,2),e.cyl(15,4,0,66+i,y+54,"steel",x),e.box(12,10,10,18,66+i,y+40,"orange",x,1);for(const v of[-28,28])for(const E of[80,y-20])e.screw(v,61.8+i-1.2,E,x,1.6,"y");e.box(30,r-64,6,0,(r+64)/2,285,"steelDark",x,1)}buildZSlide(e,t,n){const i=this.tool,r=t?130:70,a=t?140:125;e.box(64,8,a,0,42+n,r,"cobalt",i,1.5);for(const o of[-20,20])for(const c of[r+10,r+a-30])e.box(18,8,20,o,50+n,c,"steelDark",i,1);for(const o of[-24,24])for(const c of[r+8,r+a-8])e.screw(o,37.6+n,c,i,1.5,"y")}buildFixture(e,t){const n=this.machine,i=Math.min(t.width+24,310),r=Math.min(t.depth+24,310);this.fixture=new Mt,this.fixture.name="fixture",n.add(this.fixture);const a=Math.max(0,t.fixtureHeight-2);for(const o of[-1,1])for(const c of[-1,1])e.cyl(5,Math.min(2,t.fixtureHeight),o*i/2.4,c*r/2.4,0,"steel",this.fixture);a>.2&&e.box(i,r,a,0,0,Math.min(2,t.fixtureHeight),"teal",this.fixture,1.5);for(const[o,c]of[[-i/2+6,-r/2+6],[i/2-6,r/2-6],[i/2-6,-r/2+6],[-i/2+6,r/2-6]])e.screw(o,c,t.fixtureHeight+.45,this.fixture,2.2);for(const[o,c]of[[-t.width/2-3,-t.depth/4],[-t.width/2-3,t.depth/4],[t.width/4,t.depth/2+3]])Math.abs(o)<i/2&&Math.abs(c)<r/2&&e.cyl(2.5,Math.min(t.thickness,4)+1,o,c,t.fixtureHeight,"steel",this.fixture,20);for(const o of[-1,1]){const c=o*(t.width/2-10),l=-t.depth/2-7;Math.abs(l)>r/2||(e.cyl(5,6,c,l,t.fixtureHeight,"steelDark",this.fixture),e.box(8,16,3,c,l+5,t.fixtureHeight+Math.min(t.thickness,6),"red",this.fixture,1))}if(this.partHolder=new Mt,this.partHolder.name="workpiece",n.add(this.partHolder),this.imported)this.partHolder.add(this.imported),this.imported.position.set(0,0,t.fixtureHeight);else{e.box(t.width,t.depth,t.thickness,0,0,t.fixtureHeight,"castAl",this.partHolder,Math.min(1.2,t.thickness/4));for(const o of[-1,1])for(const c of[-1,1]){const l=o*(t.width/2-6),h=c*(t.depth/2-6);t.width>30&&t.depth>30&&e.cyl(1.8,.1,l,h,t.surfaceZ-.04,"hole",this.partHolder,16)}}t.architecture==="R75"&&this.buildController(e)}buildController(e){const t=new Mt;t.name="air dispenser controller (generic)",t.position.set(-360,-40,-70),this.machine.add(t),e.box(150,190,86,0,0,0,"cover",t,4),e.box(150,4,86,0,-96,0,"cobalt",t,1.5);for(const a of[-60,60])for(const o of[-80,80])e.cyl(6,3,a,o,-3,"rubber",t);if(this.lcd=Zx(),this.lcd){const a=new nt(new Pi(62,27),new On({map:this.lcd.texture,toneMapped:!1}));a.rotation.x=Math.PI/2,a.position.set(-28,-98.8,56),a.userData.ownedMaterials=[a.material],t.add(a),e.box(68,1.5,33,-28,-97.9,39.5,"black",t,.6)}for(const[a,o]of[[-50,"green"],[-36,"cover"],[-22,"cover"],[-8,"red"]]){const c=e.cyl(4,3,a,-99,22,o,t,18);c.rotation.x=Math.PI/2}const n=e.cyl(11,12,42,-102,52,"black",t,24);n.rotation.x=Math.PI/2;const i=e.cyl(14,4,42,-99,24,"steel",t,32);i.rotation.x=Math.PI/2;const r=e.cyl(12,1,42,-101.2,24,"cover",t,32);r.rotation.x=Math.PI/2,this.gaugeNeedle=e.box(1.2,.6,10,42,-101.9,19,"red",t,0),this.gaugeNeedle.geometry.translate(0,0,0),e.cyl(5,10,50,70,86,"brass",t),this.supplyOutlet=new vt,this.supplyOutlet.position.set(50,70,96),t.add(this.supplyOutlet)}update(e){var l;if(!this.config)return;const t=this.config;if(this.frame=e,this.tool.position.set(e.x,e.y,e.z),this.carriage.position.x=e.x,this.bridge.position.y=e.y,(l=this.chain)==null||l.update(Math.max(-170,Math.min(170,e.x))),this.cartridge&&this.cartridge.updateFill(e.remaining/75),this.lcd){const h=t.pressure;this.lcd.draw([`${h.toFixed(1)} psi`,e.command?"DISPENSE ●":"READY  "+e.t.toFixed(2)+"s"],!!e.command),this.gaugeNeedle&&(this.gaugeNeedle.rotation.y=-1.2+h/100*2.4)}this.machine.updateMatrixWorld(!0);const n=this.machine.worldToLocal(this.hoseStart.getWorldPosition(new P)),i=this.machine.worldToLocal(this.hoseEnd.getWorldPosition(new P));if(!this.lastHose||n.distanceToSquared(this.lastHose[0])>1e-5||i.distanceToSquared(this.lastHose[1])>1e-5){if(this.hose.geometry.dispose(),this.hose.geometry=xo(n,i,t.architecture==="R75"?"air":"feed",t.architecture==="R75"?2.6:5),this.supplyHose){this.supplyHose.geometry.dispose();const h=this.machine.worldToLocal(this.supplyOutlet.getWorldPosition(new P)),u=this.machine.worldToLocal(this.supplyFitting.getWorldPosition(new P));this.supplyHose.geometry=xo(h,u,"supply",2.6)}this.lastHose=[n,i]}const r=this.depositMeshes[0],a=e.deposited;if(r.visible=a>1e-12&&!this.compression,t.mode==="line"||t.mode==="pattern")this.lastDeposits!==e.deposits&&(r.geometry.dispose(),r.geometry=t.mode==="pattern"?Ph(e.deposits,this.run.cellLength,t.lineRatio,this.run.path,this.run.gridStart):Ch(e.deposits,this.run.cellLength,t.lineRatio),this.lastDeposits=e.deposits),t.mode==="pattern"?r.position.set(0,0,t.surfaceZ+.001):r.position.set(t.offsetX-t.lineLength/2+this.run.gridStart,t.offsetY,t.surfaceZ+.001);else if(r.visible){const h=ua(a,t.dotRatio);r.scale.set(h.radius,h.radius,a*1e3/(this.dotGeo.userData.unitVolume*h.radius*h.radius)),r.position.set(t.offsetX,t.offsetY,t.surfaceZ+.001)}const o=e.z-t.surfaceZ,c=e.q>.02*(this.run.Q||1)&&o<=t.standoff+.05&&!this.compression;if(this.flowColumn.visible=c,c){const h=t.diameter/2*Math.min(1,.55+.45*(e.q/this.run.Q));this.flowColumn.scale.set(h,h,o),this.flowColumn.position.set(e.x,e.y,t.surfaceZ)}(this.mode==="follow"||this.mode==="head")&&this.trackTool(),this.render()}trackTool(){const e=this.frame;if(!e||this.tween)return;const t=this.mode==="follow"?new P(e.x,e.y,this.config.surfaceZ):new P(e.x,e.y,e.z).add(this.headTargetOffset||new P);this.camera.position.add(t.clone().sub(this.controls.target)),this.controls.target.copy(t)}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;!e||!t||(this.renderer.setSize(e,t,!1),this.persp.aspect=e/t,this.persp.updateProjectionMatrix(),this.config&&this.fit(this.mode,{animate:!1}))}isoDirection(){const e=[[1,1,1],[-1,1,1],[-1,-1,1],[1,-1,1]][this.isoCorner];return new P(...e).normalize()}visibility(e){const t=this.config.architecture==="P300",n={whole:()=>!0,work:i=>{var r;return i!==this.enclosure&&i!==((r=this.pumpStation)==null?void 0:r.group)&&i!==this.stationAirHose&&i!==this.stationAirAnchor},feed:i=>{var r;return[(r=this.pumpStation)==null?void 0:r.group,this.enclosure,this.stationAirAnchor,this.hose,this.stationAirHose].includes(i)},head:i=>[this.tool,this.bridge,this.partHolder,this.fixture,this.hose].includes(i),close:i=>[this.tool,this.partHolder,this.fixture].includes(i),heat:i=>[this.tool,this.partHolder,this.fixture].includes(i),follow:i=>[this.tool,this.partHolder,this.fixture].includes(i)}[e];for(const i of this.machine.children)i.visible=n(i)&&!(this.compression&&i===this.tool);this.environment.visible=e==="whole"||e==="work"||t&&e==="feed";for(const i of this.tool.children){i.updateMatrixWorld();const r=new Mn().setFromObject(i);i.visible=["whole","work","head"].includes(e)||r.min.z-this.tool.position.z<(e==="heat"?20:this.visualNozzleLength-1)}}framing(e){const t=this.config,n=[];let i;if(e==="whole"||e==="feed"||e==="head"){const r=e==="whole"?this.machine:e==="feed"?this.pumpStation.group:this.tool,a=new Mn;r.traverseVisible(o=>{(o.isMesh||o.isInstancedMesh)&&a.expandByObject(o)});for(const o of[a.min.x,a.max.x])for(const c of[a.min.y,a.max.y])for(const l of[a.min.z,a.max.z])n.push(new P(o,c,l));i=a.getCenter(new P),e==="head"&&(this.headTargetOffset=i.clone().sub(this.tool.position))}else if(e==="work"){for(const r of[-250,250])for(const a of[-200,330])for(const o of[-60,t.architecture==="P300"?430:330])n.push(new P(r,a,o));i=new P(0,60,t.architecture==="P300"?180:130)}else if(e==="heat"&&t.heatSource){const r=t.heatSource,a=r.width/2+Math.max(6,r.width*.35),o=(r.shape==="circle"?r.width:r.depth)/2+Math.max(6,r.width*.35),c=this.compression?new Mn().setFromObject(this.compression.plate):null,l=c?Math.min(r.offsetX-a,c.min.x):r.offsetX-a,h=c?Math.max(r.offsetX+a,c.max.x):r.offsetX+a,u=c?Math.min(r.offsetY-o,c.min.y):r.offsetY-o,d=c?Math.max(r.offsetY+o,c.max.y):r.offsetY+o;for(const f of[l,h])for(const g of[u,d])for(const _ of[t.surfaceZ-2,t.surfaceZ+4])n.push(new P(f,g,_));i=new P((l+h)/2,(u+d)/2,t.surfaceZ+1)}else{const r=t.heatSource,a=e==="follow"?20:Math.max(Math.min(t.width+24,310)/2,r?Math.abs(r.offsetX)+r.width/2:0),o=e==="follow"?20:Math.max(Math.min(t.depth+24,310)/2,r?Math.abs(r.offsetY)+(r.shape==="circle"?r.width:r.depth)/2:0);for(const c of[-a,a])for(const l of[-o,o])for(const h of[t.fixtureHeight,t.surfaceZ+25])n.push(new P(c,l,h));i=new P(0,0,t.surfaceZ+5),e==="follow"&&this.frame&&i.set(this.frame.x,this.frame.y,t.surfaceZ)}return{pts:n,target:i}}fit(e="close",{animate:t=!0}={}){var y;if(e==="feed"&&!this.pumpStation&&(e="work"),this.mode=e,!this.config)return;this.visibility(e);const n=this.host.clientWidth||800,i=this.host.clientHeight||500,r=n/i,{pts:a,target:o}=this.framing(e),c=this.freeOrbit?this.camera.position.clone().sub(this.controls.target).normalize():this.isoDirection(),l=this.ortho.clone();l.position.copy(o).add(c.clone().multiplyScalar(5e3)),l.up.set(0,0,1),l.lookAt(o),l.updateMatrixWorld();const h=a.map(v=>v.clone().applyMatrix4(l.matrixWorldInverse)),u=e==="close"?1.22:e==="heat"?1.08:1.12;let d=Math.max(1,...h.map(v=>Math.abs(v.x)))*u,f=Math.max(1,...h.map(v=>Math.abs(v.y)))*u;const g=Math.max(1,...h.map(v=>Math.abs(v.z+5e3)));e==="follow"&&(d=20,f=d/r);const _=Math.max(f,d/r)*2;let m;if(this.projection==="ortho")m={position:o.clone().add(c.clone().multiplyScalar(5e3)),target:o.clone(),span:_};else{const v=_/2/Math.tan(Nc.degToRad(this.persp.fov/2))+g;m={position:o.clone().add(c.clone().multiplyScalar(v)),target:o.clone(),span:_}}const p={position:this.camera.position.clone(),target:this.controls.target.clone(),span:this.currentSpan??_},x=t&&!ay()&&this.currentSpan!==void 0;if(this.tween=null,!x)this.applyCamera(m,r);else{const v=performance.now();this.tween={begin:p,end:m,t0:v,aspect:r};const E=w=>{if(!this.tween||this.tween.t0!==v)return;const A=Math.min(1,(w-v)/480),D=ry(A),b=p.position.clone().lerp(m.position,D);this.applyCamera({position:b,target:p.target.clone().lerp(m.target,D),span:p.span+(m.span-p.span)*D},r),A<1?requestAnimationFrame(E):(this.tween=null,this.applyCamera(m,r),(this.mode==="follow"||this.mode==="head")&&(this.trackTool(),this.render()))};requestAnimationFrame(E)}(y=this.onView)==null||y.call(this)}applyCamera({position:e,target:t,span:n},i=this.persp.aspect){this.currentSpan=n;const r=this.camera;r.position.copy(e),this.controls.target.copy(t),r.lookAt(t),r.isOrthographicCamera&&(r.zoom=1,r.left=-n*i/2,r.right=n*i/2,r.top=n/2,r.bottom=-n/2),r.updateProjectionMatrix(),this.controls.update(),this.render()}zoomBy(e){if(this.camera.isOrthographicCamera)this.camera.zoom*=e,this.camera.updateProjectionMatrix();else{const t=this.camera.position.clone().sub(this.controls.target).divideScalar(e);this.camera.position.copy(this.controls.target).add(t)}this.controls.update(),this.render()}setCorner(e){this.isoCorner=e,this.setFreeOrbit(!1,!1),this.fit(this.mode)}setFreeOrbit(e,t=!0){var n;this.freeOrbit=e,this.applyOrbitMode(),!e&&t&&this.fit(this.mode),(n=this.onView)==null||n.call(this)}setProjection(e){if(e===this.projection)return;const t=this.camera;this.projection=e,this.camera=e==="ortho"?this.ortho:this.persp,this.camera.position.copy(t.position),this.makeControls(),this.fit(this.mode,{animate:!1})}render(){if(!(!this.renderer||!this.camera||!this.controls)&&(this.renderer.render(this.scene,this.camera),this.onScale)){const e=this.controls.target,t=e.clone().project(this.camera),n=e.clone().add(new P(10,0,0)).project(this.camera),i=this.host.clientWidth,r=this.host.clientHeight,a=Math.hypot((n.x-t.x)*i/2,(n.y-t.y)*r/2);this.onScale(a,Math.atan2(-(n.y-t.y)*r,(n.x-t.x)*i)*180/Math.PI)}}setOverlayVisibility({exitPath:e,plannedPath:t,heatSource:n}={}){e!==void 0&&(this.showExitPath=e),t!==void 0&&(this.showPlannedPath=t),this.exitPath&&(this.exitPath.visible=this.showExitPath&&!this.compression),this.plannedPath&&(this.plannedPath.visible=this.showPlannedPath&&!this.compression),n!==void 0&&this.patternSource&&(this.patternSource.visible=n),this.render()}showCompression(e,t,n={}){return this.clearCompression(),this.compression=Qx(this.config,t,e,n),this.scene.add(this.compression.group),this.tool.visible=!1,this.depositMeshes[0].visible=!1,this.flowColumn.visible=!1,this.setOverlayVisibility({}),this.patternSource&&(this.patternSource.visible=!1),this.render(),this.compression}setCompressionFrame(e){var t;(t=this.compression)==null||t.setFrame(e),this.render()}setCompressionColor(e){var t;(t=this.compression)==null||t.setColorMode(e),this.render()}clearCompression(){this.compression&&(this.compression.dispose(),this.compression=null,this.tool&&(this.tool.visible=!0),this.patternSource&&(this.patternSource.visible=!0),this.frame&&this.update(this.frame),this.setOverlayVisibility({}),this.config&&this.visibility(this.mode))}async importFile(e,t,n){const i=e.name.toLowerCase().split(".").pop(),r=await e.arrayBuffer();let a;if(i==="stl"){const f=new nx().parse(r);f.computeVertexNormals(),a=new nt(f,this.palette.castAl),a.castShadow=a.receiveShadow=!0}else if(i==="glb"||i==="gltf"){if(i==="gltf"){const _=JSON.parse(new TextDecoder().decode(r));if([..._.buffers||[],..._.images||[]].some(m=>m.uri&&!m.uri.startsWith("data:")))throw new Error("此 glTF 含外接檔案，請匯出單一 GLB 或內嵌資源 glTF。")}const f=new yu;f.setURLModifier(_=>{if(!_.startsWith("blob:")&&!_.startsWith("data:"))throw new Error("工件引用外部資源，請匯出內嵌材質的 GLB。");return _}),a=(await new ix(f).parseAsync(i==="gltf"?new TextDecoder().decode(r):r,"")).scene,a.traverse(_=>{_.isMesh&&(_.castShadow=_.receiveShadow=!0)})}else throw new Error("目前可載入 STL、GLB、內嵌 glTF。STEP 請先轉換。");const o=new Mt;o.add(a);const c=i==="stl"?{mm:1,cm:10,m:1e3,inch:25.4}[t]:1e3;o.scale.setScalar(c),(i!=="stl"||n==="Y")&&(o.rotation.x=Math.PI/2),o.updateMatrixWorld(!0);const l=new Mn().setFromObject(o),h=l.getSize(new P);if(![h.x,h.y,h.z].every(f=>Number.isFinite(f))||h.x<1||h.x>1e3||h.y<1||h.y>1e3||h.z<.1||h.z>200)throw new Error("工件尺寸不在原型範圍內（長寬 1–1000mm，厚 0.1–200mm），請檢查來源單位與檔案。");const u=new Mt;u.add(o),o.position.set(-(l.min.x+l.max.x)/2,-(l.min.y+l.max.y)/2,-l.min.z),this.clearImport(),this.imported=u;const d=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",r))).map(f=>f.toString(16).padStart(2,"0")).join("");return{width:h.x,depth:h.y,thickness:h.z,workpieceKind:"imported",workpieceFile:{name:e.name,sha256:d,sourceUnit:i==="stl"?t:"m",up:i==="stl"?n:"Y",unitFactorToMm:c}}}clearImport(){this.imported&&(this.imported.removeFromParent(),this.imported.traverse(e=>{var t;return(t=e.geometry)==null?void 0:t.dispose()}),this.imported=null)}geometryAudit(){return{parts:this.counter.parts,renderedDepositVolumeMm3:this.depositMeshes.filter(e=>e.visible).reduce((e,t)=>e+t.geometry.userData.unitVolume*t.scale.x*t.scale.y*t.scale.z,0),cameraDirection:this.camera.position.clone().sub(this.controls.target).normalize().toArray()}}screenshot(){return this.render(),this.renderer.domElement.toDataURL("image/png")}}const nn=101325,ly=9.80665,hy=Object.freeze(["compressible","rigid","vent"]),Yc=Object.freeze({airMode:"compressible",pressKgf:10,pressSpeed:1,settleTime:300}),Lh=9e4,ti=0,zi=1,ii=2,si=3,uy=.001,dy=.003*nn,fy=5e-5,Dh=.8;function py(s,e){const t=xc(s,e),n=Math.max(0,Math.min(s.length,e)),i=e-n;return{...t,x:t.x+t.tx*i,y:t.y+t.ty*i}}function my(s){const e=s.config,t=s.summary.deposits;if(e.mode==="point"){const r=t[0]*1e3;return r>0?[{x:e.offsetX,y:e.offsetY,v:r,tx:1,ty:0,width:0}]:[]}const n=bc(t,s.cellLength,e.lineRatio),i=[];for(let r=0;r<t.length;r++){const a=t[r]*1e3;if(!(a>0))continue;const o=s.gridStart+(r+.5)*s.cellLength,c=(n.widths[r]+n.widths[r+1])/2;if(e.mode==="pattern"){const l=py(s.path,o);i.push({x:l.x,y:l.y,v:a,tx:l.tx,ty:l.ty,width:c})}else i.push({x:e.offsetX+o-e.lineLength/2,y:e.offsetY,v:a,tx:1,ty:0,width:c})}return i}function Iu(s,e={}){const t=qt[s.material]||qt.putty,n=Number.isFinite(e.viscosity)&&e.viscosity>0?e.viscosity:s.material==="grease"&&Number.isFinite(s.viscosity)&&s.viscosity>0?s.viscosity:t.squeezeViscosity,i=Number.isFinite(e.yieldStress)&&e.yieldStress>=0?e.yieldStress:t.yieldStress;return{viscosity:n,yieldStress:i}}function gy(s,e,t,n,i,r,a,o){const c=new Float64Array(e),l=new Float64Array(e),h=new Float64Array(e),u=new Float64Array(e),d=(m,p)=>{for(let x=0;x<e;x++)p[x]=i[x]*m[x];for(let x=0;x<s;x++)for(let y=4*x;y<4*x+4;y++){const v=t[y];v<0||(p[x]-=n[y]*m[v],v>=s&&(p[v]-=n[y]*m[x]))}};d(a,u);let f=0,g=0;for(let m=0;m<e;m++)c[m]=r[m]-u[m],l[m]=c[m]/i[m],h[m]=l[m],f+=c[m]*l[m],g+=r[m]*r[m];const _=Math.max(1e-20*g,o);for(let m=0;m<4e3;m++){let p=0;for(let w=0;w<e;w++)p+=c[w]*c[w];if(p<=_)break;d(h,u);let x=0;for(let w=0;w<e;w++)x+=h[w]*u[w];if(!(x>0))break;const y=f/x;let v=0;for(let w=0;w<e;w++)a[w]+=y*h[w],c[w]-=y*u[w],l[w]=c[w]/i[w],v+=c[w]*l[w];const E=v/f;f=v;for(let w=0;w<e;w++)h[w]=l[w]+E*h[w]}return a}function _y(s,e){const{cols:t,rows:n,cellSize:i}=s,r=t*n,a=i*i,o=Float64Array.from(s.volume),c=e.gap,l=e.airMode||"compressible",h=e.viscosity,u=e.force,d=e.yieldStress||0,f=Math.max(0,e.settleTime??Yc.settleTime),g=e.pressSpeed>0?e.pressSpeed:1/0,_=e.frames||0,m=e.sourceFraction||null;let p=0;if(m)for(let $=0;$<r;$++)p+=m[$]*a;let x=0;for(let $=0;$<r;$++)x=Math.max(x,o[$]/a);const y=($,j)=>{const F=$%t;return j[0]=F>0?$-1:-1,j[1]=F+1<t?$+1:-1,j[2]=$>=t?$-t:-1,j[3]=$+t<r?$+t:-1,j},v=[0,0,0,0],E=new Uint8Array(r).fill(zi),w=new Uint8Array(r),A=new Int32Array(r).fill(-1),D=new Int32Array(r),b=new Uint8Array(r),S=new Int32Array(r),I=new Int32Array(r),U=new Map;let V=0;const Y={sealed:0,vented:0,collapsed:0,dissolved:0,ventedAtmMm3:0},Q=nn*a*c;let G=0,ae="press",X=0;const fe=($,j)=>Math.max(0,j-o[$]),Me=$=>$.gas/Math.max($.air,1e-12)-nn;function Se($,j,F=!0){var gt;const R=$*(1-uy),B=ue=>o[ue]<R&&E[ue]!==si;b.fill(0);let q=0;for(let ue=0;ue<r;ue++){const xe=ue%t;(xe===0||xe===t-1||ue<t||ue>=r-t)&&B(ue)&&(b[ue]=1,I[q++]=ue)}for(;q;){const ue=I[--q];for(const xe of y(ue,v))xe>=0&&!b[xe]&&B(xe)&&(b[xe]=1,I[q++]=xe)}if(l!=="compressible"){for(let ue=0;ue<r;ue++)E[ue]!==si&&(B(ue)?b[ue]||l==="vent"?E[ue]=zi:E[ue]=si:E[ue]=ti);return}w.set(E),D.set(A),S.fill(-1);const ne=[];for(let ue=0;ue<r;ue++){if(S[ue]>=0||b[ue]||!(o[ue]<R))continue;const xe={cells:[],fresh:0,drained:0,prior:new Map};for(S[ue]=ne.length,I[0]=ue,q=1;q;){const ye=I[--q];xe.cells.push(ye);const $e=fe(ye,$);w[ye]===ii?xe.prior.set(D[ye],(xe.prior.get(D[ye])||0)+$e):w[ye]===zi?xe.fresh+=$e:xe.drained+=$e;for(const Re of y(ye,v))Re>=0&&S[Re]<0&&!b[Re]&&o[Re]<R&&(S[Re]=ne.length,I[q++]=Re)}ne.push(xe)}E.fill(zi),A.fill(-1);for(let ue=0;ue<r;ue++)o[ue]<R||(E[ue]=ti);const W=new Set,O=new Map,re=new Map,de=(ue,xe)=>re.set(ue,(re.get(ue)||0)+xe);for(const ue of ne){let xe=0;for(const ye of ue.prior.values())xe+=ye;for(const[ye,$e]of ue.prior){const Re=$e+(xe>0?ue.drained*$e/xe:ue.drained/ue.prior.size);ue.prior.set(ye,Re),de(ye,Re)}}for(let ue=0;ue<r;ue++)w[ue]===ii&&b[ue]&&de(D[ue],fe(ue,$));const Ue=new Map([...U.values()].map(ue=>[ue.id,ue.gas]));for(const ue of ne){let xe=ue.fresh*nn,ye=null,$e=-1;for(const[St,Zt]of ue.prior){const Li=U.get(St);Li&&(xe+=Ue.get(St)*Zt/Math.max(re.get(St)||Zt,1e-15),Zt>$e&&(ye=Li,$e=Zt))}if(!(xe>0)){for(const St of ue.cells)E[St]=ti;continue}if(xe<Q){ue.prior.size&&Y.dissolved++;continue}let Re;ye&&!W.has(ye.id)?(W.add(ye.id),Re=ye):(Re={id:V++,sealGap:ye?ye.sealGap:j,sealTime:ye?ye.sealTime:G,sealPhase:ye?ye.sealPhase:ae,maxP:0,minRatio:1,q:null},ye||Y.sealed++),Re.gas=xe,Re.cells=ue.cells.length;let ut=0,yt=0,kt=0;for(const St of ue.cells){E[St]=ii,A[St]=Re.id;const Zt=fe(St,$);ut+=Zt,yt+=St%t*Zt,kt+=Math.floor(St/t)*Zt}Re.air=ut,Re.cx=ut>0?yt/ut:ue.cells[0]%t,Re.cy=ut>0?kt/ut:Math.floor(ue.cells[0]/t);const st=Me(Re);Re.p=st,F&&(Re.maxP=Math.max(Re.maxP,st),Re.minRatio=Math.min(Re.minRatio,ut*nn/Re.gas),ae==="press"&&Re.gas>=3*Q&&(X=Math.max(X,st))),O.set(Re.id,Re)}const ke=new Set;for(let ue=0;ue<r;ue++)w[ue]===ii&&E[ue]===zi&&ke.add(D[ue]);const ft=new Set;for(const ue of ne)for(const xe of ue.prior.keys())ft.add(xe);for(const[ue,xe]of U)O.has(ue)||W.has(ue)||ft.has(ue)||(ke.has(ue)?(Y.vented++,Y.ventedAtmMm3+=xe.gas/nn):Y.collapsed++);U.clear();for(const[ue,xe]of O)U.set(ue,xe);(gt=e.trace)==null||gt.call(e,{h:j,time:G,phase:ae,record:F,pockets:[...U.values()],events:{...Y},comps:ne})}const we=new Float64Array(r);function at($){if(!(d>0)){for(const B of U.values())B.hold=0;return}we.fill(1/0);let j=0,F=0;for(let B=0;B<r;B++)E[B]===zi&&(we[B]=0,I[F++]=B);for(;j<F;){const B=I[j++];for(const q of y(B,v))q>=0&&E[q]===ti&&we[q]===1/0&&(we[q]=we[B]+1,I[F++]=q)}const R=new Map;for(let B=0;B<r;B++)if(E[B]===ii)for(const q of y(B,v))q>=0&&E[q]===ti&&R.set(A[B],Math.min(R.get(A[B])??1/0,we[q]));for(const B of U.values())B.hold=2*d/$*((R.get(B.id)??1/0)+.5)*i}const Ge=new Int32Array(r).fill(-1),it=new Float64Array(r);function te($,j){const F=[];for(let xe=0;xe<r;xe++)E[xe]===ti&&(Ge[xe]=F.push(xe)-1);const R=F.length,B=new Map;j.forEach((xe,ye)=>B.set(xe.id,R+ye));const q=R+j.length,ne=new Int32Array(4*R).fill(-1),W=new Float64Array(4*R),O=new Float64Array(q),re=new Float64Array(R),de=[],Ue=[],ke=new Uint8Array(R);let ft=0;for(let xe=0;xe<R;xe++){const ye=F[xe];re[xe]=o[ye]-$,ft+=Math.max(0,re[xe]),y(ye,v);for(let $e=0;$e<4;$e++){const Re=v[$e];if(Re<0)continue;const ut=E[Re];if(ut===ti){ne[4*xe+$e]=Ge[Re],W[4*xe+$e]=1,O[xe]+=1;continue}if(ut===si)continue;const yt=1/(.5+Math.min(1,Math.max(0,o[Re]/$)));if(ut===zi)de.push(xe,Re,yt),O[xe]+=yt,ke[xe]=1;else{const kt=B.get(A[Re]);if(kt===void 0)continue;ne[4*xe+$e]=kt,W[4*xe+$e]=yt,O[xe]+=yt,O[kt]+=yt,Ue.push(xe,Re,kt,yt,4*xe+$e),ke[xe]=1}}}const gt=new Uint8Array(R),ue=[];for(let xe=0;xe<R;xe++){if(gt[xe])continue;ue.length=0;let ye=!1;gt[xe]=1,ue.push(xe);for(let $e=0;$e<ue.length;$e++){const Re=ue[$e];ke[Re]&&(ye=!0);for(let ut=4*Re;ut<4*Re+4;ut++){const yt=ne[ut];yt>=0&&yt<R&&!gt[yt]&&(gt[yt]=1,ue.push(yt))}}if(!ye)for(const $e of ue)O[$e]=1,re[$e]=0,ne.fill(-1,4*$e,4*$e+4)}for(let xe=0;xe<q;xe++)O[xe]>0||(O[xe]=1);return{cells:F,m:R,size:q,nb:ne,w:W,diag:O,rhsVol:re,open:de,pface:Ue,activePockets:j,excess:ft,cap:$}}function ie($,j,F=1,R=!1){const{m:B,size:q,nb:ne,w:W,rhsVol:O,activePockets:re,pface:de}=$,Ue=new Float64Array(q);for(let Re=0;Re<B;Re++)Ue[Re]=it[$.cells[Re]]*F;const ke=re.length,ft=re.map(Re=>Re.air),gt=re.map(Re=>ae==="relax"&&Re.hold||0),ue=(Re,ut)=>ft[Re]-re[Re].gas/Math.max(nn+ut+gt[Re],.02*nn),xe=re.map((Re,ut)=>{const yt=Me(Re)-gt[ut];return Number.isFinite(Re.q)?Math.max(yt,Re.q):yt}),ye=q*((R?1e-10:fy)*$.cap/j)**2;let $e=new Float64Array(ke);for(let Re=0;Re<(ke?5:1);Re++){const ut=Float64Array.from($.diag),yt=new Float64Array(q);for(let st=0;st<B;st++)yt[st]=O[st]/j;for(let st=0;st<ke;st++){const St=Math.max(nn+xe[st]+gt[st],.02*nn),Zt=re[st].gas/(St*St);ut[B+st]+=Zt/j,yt[B+st]=(Zt*xe[st]-ue(st,xe[st]))/j,Ue[B+st]=xe[st]}gy(B,q,ne,W,ut,yt,Ue,ye),$e=new Float64Array(ke);for(let st=0;st<de.length;st+=5)$e[de[st+2]-B]+=j*de[st+3]*(Ue[de[st]]-Ue[de[st+2]]);let kt=0;for(let st=0;st<ke;st++){const St=Math.max(Ue[B+st],.02*nn-nn-gt[st]);kt=Math.max(kt,Math.abs($e[st]-ue(st,St))/(ft[st]+.05*$.cap)),xe[st]=St}if(kt<.02)break}return{x:Ue,kappa:j,inflow:$e,q:xe,hold:gt}}function Te($,j){const{cells:F,m:R,nb:B,w:q,open:ne,pface:W}=$,{x:O,kappa:re}=j,de=Float64Array.from(o);for(let ye=0;ye<R;ye++)for(let $e=4*ye;$e<4*ye+4;$e++){const Re=B[$e];if(Re<=ye||Re>=R)continue;const ut=re*q[$e]*(O[ye]-O[Re]);de[F[ye]]-=ut,de[F[Re]]+=ut}const Ue=new Float64Array(R),ke=(ye,$e,Re)=>{if(Re>=0){de[F[ye]]-=Re,de[$e]+=Re;return}const ut=Math.min(-Re,Math.max(0,de[$e]));de[$e]-=ut,de[F[ye]]+=ut,Ue[ye]+=-Re-ut};for(let ye=0;ye<ne.length;ye+=3)ke(ne[ye],ne[ye+1],re*ne[ye+2]*O[ne[ye]]);for(let ye=0;ye<W.length;ye+=5)ke(W[ye],W[ye+1],re*W[ye+3]*(O[W[ye]]-O[W[ye+2]]));for(let ye=0;ye<W.length;ye+=5){const $e=W[ye+1];if(!(de[$e]>$.cap))continue;const Re=A[$e];let ut=de[$e]-$.cap;de[$e]=$.cap;const yt=[$e],kt=new Set(yt);for(let st=0;st<yt.length&&ut>0;st++)for(const St of y(yt[st],[0,0,0,0])){if(St<0||kt.has(St)||E[St]!==ii||A[St]!==Re)continue;kt.add(St),yt.push(St);const Zt=Math.max(0,$.cap-de[St]),Li=Math.min(Zt,ut);de[St]+=Li,ut-=Li}de[$e]+=ut}let ft=0,gt=!1;for(let ye=0;ye<R;ye++)ft=Math.max(ft,Ue[ye]/$.cap),de[F[ye]]<-1e-12*$.cap&&(gt=!0);let ue=0;for(let ye=0;ye<ne.length;ye+=3)ue=Math.max(ue,(de[ne[ye+1]]-$.cap)/$.cap);for(let ye=0;ye<W.length;ye+=5)ue=Math.max(ue,(de[W[ye+1]]-$.cap)/$.cap);let xe=0;return $.activePockets.forEach((ye,$e)=>xe=Math.max(xe,Math.abs(j.inflow[$e])/(ye.air+.5*$.cap))),{trial:de,drain:ft,swing:xe,negative:gt,front:ue}}function ge($,j){let F=0;for(let R=0;R<$.m;R++)F+=j.x[R];return $.activePockets.forEach((R,B)=>F+=Math.max(0,j.q[B]+j.hold[B])*R.cells),F*a*1e-6}const pe=($,j)=>{let F=0;for(let R=0;R<$.m;R++)F+=j.x[R];return F*a*1e-6},Oe=()=>({state:E.slice(),pocketOf:A.slice(),pockets:[...U.values()].map($=>({...$})),events:{...Y},nextId:V,peakBubble:X}),We=$=>{E.set($.state),A.set($.pocketOf),U.clear();for(const j of $.pockets)U.set(j.id,j);Object.assign(Y,$.events),V=$.nextId,X=$.peakBubble},N=[],Ie=($,j)=>{const F=new Uint8Array(r),R=new Uint8Array(r);let B=0;for(let O=0;O<r;O++){const re=E[O]===si?0:Math.min(1,o[O]/j);F[O]=Math.round(re*255),(E[O]===si||E[O]===ii&&re<.5)&&(R[O]=1),m&&(B+=m[O]*re*a)}const q=Math.max(3*a,.5);let ne=0,W=0;for(const O of U.values())O.air/$>=q-1e-9&&(W++,ne=Math.max(ne,Me(O)));N.push({gap:$,t:G,phase:ae,coverage:F,trapped:R,coveredPercent:p>0?B/p*100:0,bubbles:W,bubbleKPa:ne/1e3})},Pe=l==="compressible"&&f>0&&_>1?Math.max(1,Math.round(_*.3)):0,Ae=_>1?_-Pe:0,oe=Math.max(x,c),ze=Ae>1?Array.from({length:Ae-1},($,j)=>oe*(c/oe)**((j+1)/(Ae-1))):[];let me=0;Se(oe*a,oe,!0),Ae>1&&Ie(oe,oe*a);const Le=.07;let Ke=Le,Ze=0,C=0,M=0,z=0,J=0,se=oe;const ee=900;let Ne=!1;for(;se>c*(1+1e-12);){!Ne&&J>=ee&&(Ne=!0,Ke=Le);const $=Math.max(c,se*Math.exp(-Ke)),j=$*a,F=Oe();Se(j,$,!1);let R=!1;if(!Ne&&Ke>2e-4)for(const Ue of F.pockets){const ke=U.get(Ue.id);ke&&ke.gas/Math.max(ke.air,1e-15)>1.8*(Ue.gas/Math.max(Ue.air,1e-15))&&(R=!0)}const B=l==="compressible"?[...U.values()]:[],q=te(j,B);if(!R&&(q.m===0||q.excess<=1e-12*j)){Number.isFinite(g)&&q.m&&(G+=(se-$)/g),se=$;continue}let ne=null,W=0,O=null;if(!R){const Ue=Ze&&C?Ze*q.excess/C:0,ke=Number.isFinite(g)?$**3*((se-$)/g)/(12*h):0;if(!B.length)ne=ie(q,1,Ue),W=Math.max(ke,u>0?Math.max(1e-30,pe(q,ne)/u):1);else{W=Math.max(ke,Ue||Math.max(1e-30,pe(q,ie(te(j,[]),1,0))/u));for(let ft=0;ft<3;ft++){ne=ie(q,W);const gt=ge(q,ne)/u;if(!(gt>0)||Math.abs(gt-1)<.35||gt<1&&W<=ke*(1+1e-9))break;W=Math.max(ke,W*Math.min(20,Math.max(.05,gt)))}}O=Te(q,ne)}if(!Ne&&(R||O.negative||O.drain>.9||O.swing>.6)&&Ke>2e-4){We(F),Ke*=.5,z++;continue}o.set(O.trial);const re=B.length?1:W;for(let Ue=0;Ue<q.m;Ue++)it[q.cells[Ue]]=ne.x[Ue]/re;B.forEach((Ue,ke)=>Ue.q=ne.q[ke]);const de=12*h*W/$**3;for(G+=de,M=de,Ze=W,C=q.excess,se=$,J++,Se(j,$,!0),Ne?Ke=Le:O.front>Dh||O.swing>.3?Ke=Math.max(2e-4,Ke*.6):O.front<Dh*.4&&O.swing<.15&&(Ke=Math.min(Le,Ke*1.25));me<ze.length&&se<=ze[me]*(1+1e-9);)Ie(se,j),me++}const le=c*a;Se(le,c);const He=G;let Be=0;for(let $=0;$<r;$++)E[$]===ti&&(Be+=a);let ce=0,be=!0;if(l==="compressible"&&f>0&&U.size){ae="relax";let $=Math.min(Math.max(M,.001),f/20);const j=Array.from({length:Math.max(0,Pe-1)},(R,B)=>f*.002*500**(B/Math.max(1,Pe-2)));let F=0;for(let R=0;R<800;R++){at(c);const B=[...U.values()].filter(re=>Me(re)-re.hold>dy);if(!B.length)break;if(ce>=f*(1-1e-9)){be=!1;break}const q=Math.min($,f-ce),ne=te(le,B);if(ne.m===0)break;const W=ie(ne,c**3*q/(12*h)),O=Te(ne,W);if((O.negative||O.drain>.6||O.swing>.3)&&$>1e-6){$*=.5;continue}o.set(O.trial);for(let re=0;re<ne.m;re++)it[ne.cells[re]]=W.x[re];for(B.forEach((re,de)=>re.q=W.q[de]),ce+=q,G+=q,Se(le,c);F<j.length&&ce>=j[F];)Ie(c,le),F++;O.swing<.05&&O.drain<.15?$*=2:O.swing<.12&&($*=1.3)}}let Xe=1/0;for(let $=0;$<60;$++){let j=0,F=0;for(let B=0;B<r;B++)E[B]===ti&&o[B]>le&&(j=Math.max(j,o[B]-le),F+=o[B]-le);if(j<1e-9*le||F>.9*Xe)break;Xe=F;const R=te(le,[]);if(R.m===0)break;o.set(Te(R,ie(R,1,0,!0)).trial),Se(le,c)}return at(c),_>1&&(N.length>=_&&(N.length=_-1),Ie(c,le)),{volume:o,state:E,pocketOf:A,pockets:[...U.values()],frames:N,crest:x,cap:le,press:{time:He,relaxTime:ce,settled:be,substeps:z,steps:J,coarse:Ne,seatPressureKPa:Be>0?u/(Be*1e-6)/1e3:0,peakBubbleKPa:X/1e3,...Y}}}function vy(s,e){const t=s.config,n={shape:"rectangle",offsetX:0,offsetY:0,cellSize:1,power:25,frames:0,...Yc,...e};for(const F of["width","depth","offsetX","offsetY","gap","cellSize","power","pressKgf","pressSpeed","settleTime"])if(!Number.isFinite(n[F]))throw new Error(`${F} 必須是有限數值`);if(!["rectangle","circle"].includes(n.shape))throw new Error("熱源形狀必須為矩形或圓形");if(!hy.includes(n.airMode))throw new Error("夾氣處理方式無效");if(n.width<=0||n.width>1e3||n.depth<=0||n.depth>1e3||n.gap<.02||n.gap>10||n.cellSize<.2||n.cellSize>10)throw new Error("熱源尺寸需為 0–1000 mm、間隙 0.02–10 mm、網格 0.2–10 mm");if(n.power<0||n.power>1e4)throw new Error("熱源功耗需介於 0 與 10000 W");if(n.pressKgf<.01||n.pressKgf>5e3)throw new Error("壓合力需介於 0.01 與 5000 kgf");if(n.settleTime<0||n.settleTime>3600)throw new Error("靜置時間需介於 0 與 3600 s");if(n.pressSpeed<.01||n.pressSpeed>100)throw new Error("壓板下降速度上限需介於 0.01 與 100 mm/s");const i=qt[t.material]||qt.putty;if(n.viscosity!=null&&!(n.viscosity>=1&&n.viscosity<=1e7))throw new Error("有效黏度需介於 1 與 10,000,000 Pa·s");if(n.yieldStress!=null&&!(n.yieldStress>=0&&n.yieldStress<=1e6))throw new Error("降伏應力需介於 0 與 1,000,000 Pa");const{viscosity:r,yieldStress:a}=Iu(t,n);if(!(r>=1&&r<=1e7))throw new Error("有效黏度需介於 1 與 10,000,000 Pa·s");if(!(a>=0&&a<=1e6))throw new Error("降伏應力需介於 0 與 1,000,000 Pa");const o=Number.isFinite(n.conductivity)&&n.conductivity>0?n.conductivity:i.conductivity,c=Number.isFinite(n.contactResistance)&&n.contactResistance>=0?n.contactResistance:i.contactResistance,l=s.summary.deposits,h=l.reduce((F,R)=>F+R,0);if(!Number.isFinite(h)||h<0||l.some(F=>!Number.isFinite(F)||F<0))throw new Error("沉積體積資料無效");const u=h*1e3,d=n.shape==="circle"?n.width:n.depth,f=my(s),g=t.mode==="point"?ua(h,t.dotRatio):null,_=Math.max(g?g.radius:0,...f.map(F=>F.width/2),0),m=Math.sqrt(u/(Math.PI*n.gap))+_+4*n.cellSize,p=f.map(F=>F.x),x=f.map(F=>F.y),y=Math.min(n.offsetX-n.width/2,t.offsetX,...p)-m,v=Math.max(n.offsetX+n.width/2,t.offsetX,...p)+m,E=Math.min(n.offsetY-d/2,t.offsetY,...x)-m,w=Math.max(n.offsetY+d/2,t.offsetY,...x)+m;let A=Math.max(n.cellSize,Math.sqrt((v-y)*(w-E)/(Lh*.89))),D=Math.ceil((v-y)/A),b=Math.ceil((w-E)/A);for(;D*b>Lh;)A*=1.02,D=Math.ceil((v-y)/A),b=Math.ceil((w-E)/A);const S=y,I=E,U=D*b,V=A*A,Y=F=>S+(F%D+.5)*A,Q=F=>I+(Math.floor(F/D)+.5)*A,G=(F,R)=>{const B=Math.floor((F-S)/A),q=Math.floor((R-I)/A);return B<0||q<0||B>=D||q>=b?-1:q*D+B},ae=new Float64Array(U),X=(F,R,B,q)=>{let ne=0;for(const[,W]of R)ne+=W;if(ne<=0){const W=G(B,q);W>=0&&(ae[W]+=F);return}for(const[W,O]of R)ae[W]+=F*O/ne};if(g&&f.length){const F=f[0],R=g.radius,B=g.height,q=(R*R+B*B)/(2*B),ne=[],W=Math.min(8,Math.max(1,Math.ceil(A/Math.max(R/6,1e-6))));for(let O=Math.floor((F.y-R-I)/A);O<=Math.floor((F.y+R-I)/A);O++)for(let re=Math.floor((F.x-R-S)/A);re<=Math.floor((F.x+R-S)/A);re++){if(re<0||O<0||re>=D||O>=b)continue;let de=0;for(let Ue=0;Ue<W;Ue++)for(let ke=0;ke<W;ke++){const ft=Math.hypot(S+(re+(Ue+.5)/W)*A-F.x,I+(O+(ke+.5)/W)*A-F.y);ft<R&&(de+=Math.sqrt(q*q-ft*ft)-(q-B))}de>0&&ne.push([O*D+re,de])}X(F.v,ne,F.x,F.y)}else for(const F of f){const R=Math.max(F.width/2,1e-6),B=Math.max(1,Math.min(256,Math.ceil(4*R/A))),q=[];for(let ne=0;ne<B;ne++){const W=(2*(ne+.5)/B-1)*R,O=G(F.x-F.ty*W,F.y+F.tx*W);O>=0&&q.push([O,Math.sqrt(Math.max(0,1-(W/R)**2))])}X(F.v,q,F.x,F.y)}const fe=new Float32Array(U),Me=new Float32Array(U),Se=(F,R)=>n.shape==="circle"?(F-n.offsetX)**2+(R-n.offsetY)**2<=(n.width/2)**2:Math.abs(F-n.offsetX)<=n.width/2&&Math.abs(R-n.offsetY)<=n.depth/2;let we=0;for(let F=0;F<b;F++)for(let R=0;R<D;R++){const B=F*D+R;let q=0,ne=0;for(let W=0;W<4;W++)for(let O=0;O<4;O++){const re=S+(R+(O+.5)/4)*A,de=I+(F+(W+.5)/4)*A;Se(re,de)&&(q+=1/16),Math.abs(re)<=t.width/2&&Math.abs(de)<=t.depth/2&&(ne+=1/16)}fe[B]=q,Me[B]=ne,we+=q*V}const at=n.pressKgf*ly,Ge=_y({cols:D,rows:b,cellSize:A,volume:ae},{gap:n.gap,airMode:n.airMode,force:at,pressSpeed:n.pressSpeed,viscosity:r,yieldStress:a,settleTime:n.settleTime,frames:n.frames,sourceFraction:fe,trace:n.trace}),it=Ge.volume,te=Ge.cap,ie=Ge.crest;let Te=0;for(let F=0;F<U;F++)Te+=Math.max(0,it[F]-te);const ge=new Float32Array(U),pe=new Uint8Array(U),Oe=new Float32Array(U);let We=0,N=0,Ie=0,Pe=0,Ae=0,oe=0;for(let F=0;F<U;F++){const R=it[F],B=Ge.state[F];if(ge[F]=B===si?0:Math.min(1,R/te),Oe[F]=B===si?1:B===ii?1-ge[F]:0,pe[F]=B===si||B===ii&&ge[F]<.5?1:0,We+=fe[F]*ge[F]*V,Ae+=ge[F]*V,N+=R*fe[F],Ie+=R*(1-Me[F]),Pe+=R,ge[F]>=.5&&fe[F]<.5){const q=Y(F)-n.offsetX,ne=Q(F)-n.offsetY,W=n.shape==="circle"?Math.hypot(q,ne)-n.width/2:Math.hypot(Math.max(0,Math.abs(q)-n.width/2),Math.max(0,Math.abs(ne)-n.depth/2));oe=Math.max(oe,W)}}const ze=[],me=new Map(Ge.pockets.map(F=>[F.id,F])),Le=new Uint8Array(U),Ke=new Int32Array(U);for(let F=0;F<U;F++){if(!Oe[F]||Le[F])continue;const R=Ge.pocketOf[F];let B=0,q=0,ne=0,W=0,O=0;for(Le[F]=1,Ke[O++]=F;O;){const de=Ke[--O],Ue=Oe[de];B+=Ue*V,q+=Ue*fe[de]*V,ne+=Y(de)*Ue,W+=Q(de)*Ue;const ke=de%D;for(const ft of[ke>0?de-1:-1,ke+1<D?de+1:-1,de>=D?de-D:-1,de+D<U?de+D:-1])ft>=0&&Oe[ft]&&!Le[ft]&&Ge.pocketOf[ft]===R&&(Le[ft]=1,Ke[O++]=ft)}if(!(B>0))continue;const re=R>=0?me.get(R):null;ze.push({areaMm2:B,inSourceMm2:q,x:ne/(B/V),y:W/(B/V),...re?{pressureKPa:(re.gas/Math.max(re.air,1e-12)-nn)/1e3,volumeRatio:re.air*nn/re.gas,atmVolumeMm3:re.gas/nn,sealGapMm:re.sealGap,minRatio:re.minRatio,sealedDuring:re.sealPhase}:{}})}ze.sort((F,R)=>R.inSourceMm2-F.inSourceMm2||R.areaMm2-F.areaMm2);const Ze=Math.max(3*V,.5),C=ze.filter(F=>F.inSourceMm2>1e-9&&F.areaMm2>=Ze-1e-9),M=ze.filter(F=>F.areaMm2<Ze-1e-9).reduce((F,R)=>F+R.inSourceMm2,0),z=C.reduce((F,R)=>F+R.inSourceMm2,0),J=n.shape==="circle"?Math.PI*n.width**2/4:n.width*n.depth,se=J*n.gap/1e3,ee=we>0?We/we*100:0,Ne=n.gap/1e3,le=Ne/o*1e4+c,He=J/100,Be=ee/100*He,ce={conductivity:o,contactResistance:c,bondLineMm:n.gap,power:n.power,bulkImpedanceCm2:Ne/o*1e4,impedanceCm2:le,idealResistance:le/He,resistance:Be>0?le/Be:1/0};ce.idealRise=ce.idealResistance*n.power,ce.rise=ce.resistance*n.power;const be=C.filter(F=>Number.isFinite(F.volumeRatio)),Xe={airMode:n.airMode,forceN:at,forceKgf:n.pressKgf,pressSpeed:n.pressSpeed,viscosity:r,yieldStress:a,settleTime:n.settleTime,pressTime:Ge.press.time,relaxTime:Ge.press.relaxTime,settled:Ge.press.settled,seatPressureKPa:Ge.press.seatPressureKPa,peakBubbleKPa:Ge.press.peakBubbleKPa,sealed:Ge.press.sealed,vented:Ge.press.vented,collapsed:Ge.press.collapsed,remaining:ze.filter(F=>F.areaMm2>=Ze-1e-9).length,bubbleKPa:be.length?Math.max(...be.map(F=>F.pressureKPa)):0,volumeRatio:be.length?be.reduce((F,R)=>F+R.volumeRatio*R.inSourceMm2,0)/be.reduce((F,R)=>F+R.inSourceMm2,0):null,substeps:Ge.press.substeps},$={compressible:"被膠包圍的空氣依 pV = 常數（等溫）壓縮與回脹，可隨膠流移動、在膠牆變薄時排出",rigid:"被膠包圍的乾區凍結為不可變形的夾氣（v1.0 剛性牆）",vent:"被膠包圍的空氣假設全部排出（覆蓋率上限）"},j=[`覆蓋與空洞來自平行板 Hele-Shaw 擠壓近似（等效牛頓黏度 ${Math.round(r)} Pa·s、定力 ${n.pressKgf} kgf 壓到墊片）；${$[n.airMode]}。未含剪切稀化、壁滑、潤濕與指狀穿透，不能判定實際接觸或可靠度。`,"熱阻為一維估算：(間隙 ÷ 導熱率 + TDS 推算接觸熱阻) ÷ 濕潤面積；不含擴散熱阻與空洞周邊的橫向傳熱，只供方案相對比較。"];return n.airMode==="compressible"&&Ge.press.sealed>0&&j.push(`壓到墊片後膠壓消退，被壓縮的氣泡會回脹（降伏應力 ${a} Pa 只擋住一小部分）；靜置 ${n.settleTime} s ${Ge.press.settled?"內已大致穩定":"時仍在回脹"}。透明板實測建議在壓好後 0 s、30 s、2 min、10 min 各拍一張比對。`),Ge.press.coarse&&j.push("壓合步數超過上限，後段改以粗步長完成；覆蓋與夾氣仍有效，但壓合時間與壓合中的氣壓精度下降。"),Ge.press.time>120&&j.push(`以 ${n.pressKgf} kgf 壓到墊片約需 ${Ge.press.time.toFixed(0)} s；實際手壓若較快，壓合中的氣泡壓縮會更大。`),n.airMode==="compressible"&&Ge.press.sealed>0&&j.push("氣泡在膠牆變薄處排出（吹破）的位置與時機受網格影響（指狀穿透未完整解析）；比較圖樣請使用相同網格，建議 ≤ 0.5 mm。"),Te>1e-9&&j.push("部分膠量被夾氣區完全包圍而無法再推出，已保留在原位；局部膜厚可能高於間隙。"),A>n.cellSize*1.001&&j.push(`為控制計算量，網格由 ${n.cellSize.toFixed(2)} mm 調整為 ${A.toFixed(2)} mm；細節精度下降。`),Math.abs(we-J)>J*.05&&j.push("熱源相對網格過小，熱源面積的網格取樣誤差超過 5%；請縮小工件範圍或使用更細網格，覆蓋數值不宜判讀。"),(Math.abs(n.offsetX)+n.width/2>t.width/2||Math.abs(n.offsetY)+d/2>t.depth/2)&&j.push("熱源範圍超出工件矩形參考邊界；請核對尺寸和中心偏移，匯入工件僅以包圍框近似。"),Ie>1e-6&&j.push("估算有材料超出工件矩形範圍；未模擬實際邊緣流失。"),z>0&&j.push(`熱源內有 ${C.length} 處被膠包圍的夾氣區（共 ${z.toFixed(1)} mm²）；外框、螺旋與蛇形較易發生，需透明板實測確認。`),t.workpieceKind!=="plate"&&j.push("匯入工件仍以其矩形邊界和水平上表面近似，不包含孔洞與曲面。"),t.mode==="pattern"&&j.push("膠沿規劃路徑累加；彎角、重疊與壓合輪廓為幾何近似，並非已驗證的流變模擬。"),n.gap<i.minBondLine&&j.push(`${i.name} 資料表最小黏結層厚度為 ${i.minBondLine} mm；目前目標間隙較小，須向廠商確認適用性，不代表此模型已考慮顆粒或硬接觸。`),{options:n,grid:{originX:S,originY:I,cellSize:A,cols:D,rows:b,coverage:ge,sourceFraction:fe,voidMask:pe,airFraction:Oe,frames:Ge.frames,crest:ie},summary:{depositedMl:h,sourceAreaMm2:J,requiredMl:se,coveredPercent:ee,idealVolumePercent:se>0?Math.min(100,h/se*100):0,volumeRatio:se>0?h/se:0,insideMl:N/1e3,outsideMl:(Pe-N)/1e3,offWorkpieceMl:Ie/1e3,conservationErrorMl:Pe/1e3-h,unresolvedMl:Te/1e3,wetAreaMm2:Ae,squeezeOutMm:oe,voidCount:C.length,voidAreaMm2:z,voidPercent:J>0?z/J*100:0,largestVoidMm2:C.length?Math.max(...C.map(F=>F.inSourceMm2)):0,tinyVoidMm2:M,minVoidMm2:Ze,crestMm:ie,steps:Ge.press.steps,press:Xe,thermal:ce,material:i.name},voids:ze,warnings:j,assumptions:"engineering_assumption",model:`hele_shaw_squeeze_v1.1_${n.airMode}`}}function xy(s,e,{iterations:t=26}={}){const n=s.mode==="point",i=n?"gateDuration":"speed";let r=n?.001:1,a=n?10:800,o=null;for(let h=0;h<t;h++){const u=Math.sqrt(r*a);let d=null;try{d=da({...s,[i]:u})}catch{d=null}const f=d?d.summary.deposited:1/0;d&&(!o||Math.abs(f-e)<Math.abs(o.volume-e))&&(o={run:d,value:u,volume:f});const g=f>e;n===g?a=u:r=u}if(!o)throw new Error("無法在設備限制內達到目標膠量");const c=Number(o.value.toPrecision(4)),l=da({...s,[i]:c});return{config:{...s,[i]:c},run:l,key:i,reached:Math.abs(l.summary.deposited-e)<=Math.max(1e-6,e*.03)}}const Nu={line:'<path d="M4 12h16"/>',n:'<path d="M5 19V5l14 14V5"/>',serpentine:'<path d="M4 5h15a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h14a2 2 0 0 1 0 4H4"/>',spiral:'<path d="M4 4h16v16H6V7h11v10H9v-7h5v4"/>',perimeter:'<rect x="4" y="4" width="16" height="16" rx="1"/>'},hi={line:"中心線",n:"N 形",serpentine:"蛇形",spiral:"螺旋",perimeter:"外框"},en=(s,e=16)=>`<svg viewBox="0 0 24 24" width="${e}" height="${e}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s}</svg>`,wt={play:en('<path d="M7 5v14l11-7z" fill="currentColor" stroke="none"/>'),pause:en('<path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none"/>'),restart:en('<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/>'),step:en('<path d="M6 5v14l9-7zM17 5v14"/>'),reset:en('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'),orbit:en('<circle cx="12" cy="12" r="3"/><path d="M12 3c5 0 9 4 9 9M12 21c-5 0-9-4-9-9"/><path d="M19 9l2 3 2-3M5 15l-2-3-2 3"/>'),cube:en('<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>'),sun:en('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:en('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),book:en('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5"/>'),help:en('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>'),download:en('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),press:en('<path d="M4 6h16M12 6v6M8 12h8l-2 4h-4zM4 20h16"/>'),compare:en('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),close:en('<path d="M6 6l12 12M18 6 6 18"/>')};function yy(s){return`
<header class="topbar">
  <div class="brand">
    <div class="brand-mark" aria-hidden="true"><span></span></div>
    <div><div class="eyebrow">TIM DISPENSING LAB</div><h1>TIM 點膠研究室</h1></div>
  </div>
  <div class="scenario" id="scenario" aria-label="目前情境"></div>
  <div class="top-actions">
    <span class="badge-warn" title="所有結果皆為工程假設，尚未經實機校準">工程假設 · 未校準</span>
    <button class="ghost" id="show-sources" title="參數來源與假設">${wt.book}<span>來源</span></button>
    <button class="ghost" id="help" title="使用說明">${wt.help}<span>說明</span></button>
    <button class="ghost icon-only" id="theme" title="切換深色／淺色">${wt.moon}</button>
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
    <footer class="config-foot"><button id="defaults" class="text-button">恢復此情境預設</button><span>v${s}</span></footer>
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
          <button class="tool" id="free-orbit" aria-pressed="false" title="360° 自由旋轉">${wt.orbit}</button>
          <button class="tool" id="projection" aria-pressed="false" title="切換正交／透視">${wt.cube}<span id="projection-label">正交</span></button>
          <button class="tool" id="reset-camera" title="重設視角 (Home)">${wt.reset}</button>
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
        <button class="tool" id="press-play">${wt.play}</button>
        <input type="range" id="press-scrub" min="0" max="23" step="1" value="23" aria-label="壓合進程">
        <span id="press-gap">間隙 0.50 mm</span>
        <div class="seg small" role="group" aria-label="壓合著色"><button data-press-color="material" class="active">膠色</button><button data-press-color="front">前緣時序</button></div>
        <button class="tool" id="press-exit" title="回到點膠">${wt.close}<span>回到點膠</span></button>
      </div>
      <div class="stage-foot">
        <span id="camera-hint">拖曳平移 · 滾輪縮放 · Home 重設</span>
        <span class="scale"><i id="scale-line"></i><span id="scale-label">X 軸 10 mm</span></span>
        <span class="note" id="geometry-note">mm 真實比例 · 機構為工程示意</span>
      </div>
    </section>
    <section class="dock card" aria-label="時間軸">
      <div class="transport">
        <button id="play" class="primary">${wt.play}<span>開始試驗</span></button>
        <button id="restart" class="tool" title="回到起點">${wt.restart}</button>
        <button id="step" class="tool" title="前進 0.01 秒">${wt.step}</button>
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
<dialog id="sources-dialog" class="dialog wide"><div class="dialog-head"><h2>參數來源與假設</h2><button data-close class="ghost">${wt.close}</button></div><p class="muted">「v1.0 更新」為本次查證後替換或新增的值；研究原檔 v0.3 不變。所有項目目前均未經實機驗證。</p><div class="table-scroll"><table><thead><tr><th>參數</th><th>值</th><th>類型</th><th>依據與出處</th></tr></thead><tbody id="source-rows"></tbody></table></div></dialog>
<dialog id="compare-dialog" class="dialog wide"><div class="dialog-head"><h2>熱源圖樣比較</h2><button data-close class="ghost">${wt.close}</button></div><div id="compare-body"></div></dialog>
<dialog id="help-dialog" class="dialog"><div class="dialog-head"><h2>使用說明</h2><button data-close class="ghost">${wt.close}</button></div><div id="help-body"></div></dialog>
<div id="toast" role="status"></div>`}const tr=1e3,xs=150,Mi=52,ia=14,yo=12,sa=26,Uu={q:{label:"出口流量",unit:"mL/s",key:"q",digits:3},output:{label:"累積出膠",unit:"mL",key:"output",digits:3},speed:{label:"移動速度",unit:"mm/s",key:"speed",digits:0},z:{label:"針嘴高度",unit:"mm",key:"z",digits:1}};function Ih(s){if(!(s>0))return 1;const e=10**Math.floor(Math.log10(s));for(const t of[1,1.2,1.5,2,2.5,3,4,5,6,8,10])if(t*e>=s)return t*e;return 10*e}function My(s,e,t,n,i){var b;const r=Uu[t],a=e.frames,o=a.map(S=>S[r.key]),c=t==="q"?[e.Q]:[],l=((b=i==null?void 0:i.frames)==null?void 0:b.map(S=>S[r.key]))||[],h=Ih(Math.max(1e-6,...o,...c,...l)*1.05),u=t==="z"?Math.max(0,Math.min(...o)-1):0,d=Math.max(e.duration,(i==null?void 0:i.duration)||0),f=S=>Mi+S/d*(tr-Mi-ia),g=S=>xs-sa-(S-u)/(h-u)*(xs-sa-yo),_=Math.max(1,Math.floor(a.length/900)),m=S=>S.filter((I,U)=>U%_===0||U===S.length-1).map((I,U)=>`${U?"L":"M"}${f(I.t).toFixed(1)},${g(I[r.key]).toFixed(1)}`).join(""),p=m(a),x=[0,.25,.5,.75,1].map(S=>{const I=u+(h-u)*S;return`<line class="grid" x1="${Mi}" x2="${tr-ia}" y1="${g(I)}" y2="${g(I)}"/><text class="tick" x="${Mi-8}" y="${g(I)+4}" text-anchor="end">${I.toFixed(r.digits===0?0:h<1?2:1)}</text>`}).join(""),y=[],v=Ih(d/6);for(let S=0;S<=d+1e-9;S+=v)y.push(`<text class="tick" x="${f(S)}" y="${xs-8}" text-anchor="middle">${+S.toFixed(2)}s</text>`);const E=e.ending,w=[["off",E.commandOff,"關膠"],["arrive",E.movementEnd,"到位"],["lift",E.liftStart,"抬針"],["exit",E.motionEnd,"退離完成"]].filter(([,S])=>Number.isFinite(S)).map(([S,I,U])=>`<line class="marker ${S}" x1="${f(I)}" x2="${f(I)}" y1="${yo}" y2="${xs-sa}"><title>${U} ${I.toFixed(3)} s</title></line>`).join(""),A=t==="q"?`<path class="command" d="M${Mi},${g(e.Q)} H${f(E.commandOff)} V${g(0)} H${tr-ia}"/>`:"",D=i?`<path class="baseline" d="${m(i.frames)}"/>`:"";return s.setAttribute("viewBox",`0 0 ${tr} ${xs}`),s.innerHTML=x+y.join("")+w+D+`<path class="area" d="${p} L${f(a.at(-1).t)},${g(u)} L${Mi},${g(u)} Z"/><path class="series" d="${p}"/>`+A+`<line class="cursor" id="chart-cursor" x1="${f(n)}" x2="${f(n)}" y1="${yo-4}" y2="${xs-sa}"/>`,{x:f,duration:d,toTime:S=>(S-Mi)/(tr-Mi-ia)*d}}function by(s,e,t){const n=s.querySelector("#chart-cursor");if(n&&e){const i=e.x(t);n.setAttribute("x1",i),n.setAttribute("x2",i)}}const _e=(s,e=document)=>e.querySelector(s),Kt=(s,e=document)=>[...e.querySelectorAll(s)],Ht=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),he=(s,e=3)=>Number.isFinite(s)?Number(s).toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e}):"—",Sy=s=>Number.isFinite(s)?+Number(s).toPrecision(6):s,Fu=.0689475729,Ou={get(s){try{return localStorage.getItem(s)}catch{return null}},set(s,e){try{localStorage.setItem(s,e)}catch{}}},_c=["pressure","rpm","efficiency","delay","tauOn","tauOff","fill","residual","referenceRate","pressureExponent","viscosity","hoseId","hoseLength","reverseRpm","reverseDuration","density"],Bu=()=>({shape:"rectangle",width:30,depth:30,offsetX:0,offsetY:0,gap:tl(Wn,"assembly.gap"),cellSize:.5,power:tl(Wn,"thermal.power"),...Yc,viscosity:null,yieldStress:null}),Ey=["gap","cellSize","power","airMode","pressKgf","pressSpeed","settleTime","viscosity","yieldStress"],wy={compressible:"可壓縮氣泡",rigid:"剛性牆（v1.0）",vent:"全部排出"},Ty={compressible:"可壓縮",rigid:"剛性牆",vent:"全排出"},ku=()=>({pattern:"n",spacing:5,edgeInset:2,spiralShape:"auto",spiralDirection:"outside-in"}),L={config:null,run:null,frame:null,time:0,playing:!1,clock:null,tab:"equipment",chartType:"q",chart:null,pressureUnit:"psi",heat:Bu(),pattern:ku(),overrides:new Map,baseline:null,press:null,pressBaseline:null,pressAnim:null,tuneFactor:1.2,compare:null,busy:!1};_e("#app").innerHTML=yy(vr);const jc=Ou.get("tim-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=jc;function fn(s,e=""){const t=_e("#toast");t.textContent=s,t.className=`visible ${e}`,clearTimeout(fn.timer),fn.timer=setTimeout(()=>t.className="",4200)}let et;try{et=new cy(_e("#viewport"),{onScale(s,e){const t=[.5,1,2,5,10,20,50,100,200,500].find(n=>s*n/10>=36)??500;_e("#scale-line").style.width=`${Math.min(110,s*t/10)}px`,_e("#scale-label").textContent=`X 軸 ${t} mm`,_e("#scale-line").style.transform=`rotate(${e>90?e-180:e<-90?e+180:e}deg)`},onView:()=>Sr()}),et.setTheme(jc)}catch(s){throw _e("#viewport").innerHTML='<div class="webgl-error">無法啟動 3D 顯示，請使用啟用硬體加速的桌面瀏覽器。</div>',s}let Xi=null,Ay=0;const vc=new Map;try{Xi=new Worker(new URL(""+new URL("compute-worker-Ca1NxcCO.js",import.meta.url).href,import.meta.url),{type:"module"}),Xi.onmessage=({data:s})=>{var t;const e=vc.get(s.id);if(e){if(s.progress!==void 0)return(t=e.progress)==null?void 0:t.call(e,s.progress,s.label);vc.delete(s.id),s.ok?e.resolve(s.result):e.reject(new Error(s.error))}},Xi.onerror=()=>Xi=null}catch{Xi=null}const Ry=s=>({config:s.config,summary:{deposits:s.summary.deposits},path:s.path,gridStart:s.gridStart,cellLength:s.cellLength,maxHeight:s.maxHeight});function zu(s,e,t){return Xi?new Promise((n,i)=>{const r=++Ay;vc.set(r,{resolve:n,reject:i,progress:t}),Xi.postMessage({id:r,type:s,payload:e})}):new Promise((n,i)=>setTimeout(()=>{try{s==="compress"?n(vy(e.run,{...e.heat,frames:e.frames})):i(new Error("此瀏覽器不支援背景計算，無法執行圖樣比較"))}catch(r){i(r)}},30))}const Os=()=>L.config.architecture==="P300",Hu=()=>({shape:L.heat.shape,width:L.heat.width,depth:L.heat.depth,offsetX:L.heat.offsetX,offsetY:L.heat.offsetY,pattern:L.pattern.pattern,spacing:L.pattern.spacing,edgeInset:L.pattern.edgeInset,spiralShape:L.pattern.spiralShape,spiralDirection:L.pattern.spiralDirection});function Vu(s){const e={...s,surfaceZ:s.fixtureHeight+s.thickness};return e.mode==="pattern"?e.pathSettings=Hu():delete e.pathSettings,e}function Gu(s="putty",e="R75"){return Vu({...Oh(Wn,s,e),mode:"pattern"})}function xn(s,{silent:e=!1}={}){try{const t=Vu(s),n=da(t);return L.config=t,L.overrides.set(t.profile,Object.fromEntries(_c.map(i=>[i,t[i]]))),Wu(n),!0}catch(t){return e||fn(t.message,"error"),Ri(),!1}}function Cy(s,e){const t=Oh(Wn,s,e),n=L.overrides.get(t.profile)||{},i=Object.fromEntries(Object.entries(L.config).filter(([a])=>!_c.includes(a)&&!["material","architecture","profile"].includes(a))),r={...t,...i,...Object.fromEntries(_c.map(a=>[a,n[a]??t[a]]))};r.material=s,r.architecture=e,r.profile=t.profile,s!==L.config.material&&(L.heat={...L.heat,viscosity:null,yieldStress:null}),xn(r)||(_e("#sel-material")&&(_e("#sel-material").value=L.config.material),_e("#sel-arch")&&(_e("#sel-arch").value=L.config.architecture))}const Py={tds:["TDS","tag-tds"],derived:["推導","tag-derived"],ai:["AI 初估","tag-ai"],geo:["幾何","tag-geo"],spec:["原廠","tag-tds"]};function Ye({bind:s,label:e,value:t,unit:n="",min:i,max:r,tag:a,hint:o,disabled:c,step:l="any"}){const[h,u]=Py[a]||[a,"tag-ai"];return`<label class="field${c?" disabled":""}"><span class="lbl">${e}${a?`<em class="tag ${u}">${h}</em>`:""}</span><span class="input"><input type="number" data-bind="${s}" value="${Sy(t)}" min="${i}" max="${r}" step="${l}" ${c?"disabled":""} aria-label="${Ht(e)}"><b>${n}</b></span>${o?`<small>${o}</small>`:""}</label>`}function Ai({bind:s,id:e,label:t,value:n,options:i,hint:r}){return`<label class="field"><span class="lbl">${t}</span><select ${s?`data-bind="${s}"`:""} ${e?`id="${e}"`:""}>${i.map(([a,o])=>`<option value="${a}" ${String(a)===String(n)?"selected":""}>${o}</option>`).join("")}</select>${r?`<small>${r}</small>`:""}</label>`}const Xn=(s,e,{open:t=!0,note:n}={})=>`<details class="group" ${t?"open":""}><summary>${s}</summary><div class="group-body">${e}${n?`<p class="note">${n}</p>`:""}</div></details>`;function Ly(){const s=L.config,e=Os(),t=qt[s.material],n=e?"理想容積計量":s.material==="putty"?"TDS 參考點 × 冪律管流":"常黏度 Poiseuille 圓管",i=e?`每轉 ${s.displacement} mL × 轉速 × 效率；滿腔與起停時間為假設。`:s.material==="putty"?`90 psi 時 75 g/min（TDS）；壓力冪次 m=${s.pressureExponent} 取自 Laird 點膠指南曲線形狀。Q ∝ P^m · d^(3+m) / L^m。`:"黏度 2,500,000 cP（TDS，Brookfield 2 rpm）暫作常數，不代表完整流變。",r=L.run?L.run.Q:0;return`
  <div class="pair">
    ${Ai({id:"sel-material",label:"膠材",value:s.material,options:[["putty","Laird Tputty 910"],["grease","Laird Tgrease 2500"]]})}
    ${Ai({id:"sel-arch",label:"出膠架構",value:s.architecture,options:[["R75","R75 氣壓 75cc"],["P300","P300 PCP"]]})}
  </div>
  <div class="material-card" style="--glue:#${t.color.toString(16).padStart(6,"0")}">
    <i></i><div><b>${t.name}</b><span>${t.kind}</span><span>k ${t.conductivity} W/m·K · 最小 BLT ${t.minBondLine*1e3} µm · ${t.density} g/cc · ${t.colorName}</span></div>
  </div>
  <div class="method"><span>${n}</span><strong>${he(r,3)} <small>mL/s 穩態</small></strong><p>${i}</p></div>
  ${Xn("驅動與針嘴",(e?Ye({bind:"c.rpm",label:"計量軸轉速",value:s.rpm,unit:"rpm",min:0,max:300,tag:"ai"})+Ye({bind:"c.efficiency",label:"容積效率",value:s.efficiency,unit:"",min:0,max:1,tag:"ai"}):`<div class="with-btn">${Ye({bind:"c.pressure",label:"驅動表壓",value:L.pressureUnit==="bar"?s.pressure*Fu:s.pressure,unit:L.pressureUnit,min:0,max:L.pressureUnit==="bar"?6.89475729:100,tag:"ai",hint:"控制器上限 100 psi（Performus X100 額定）"})}<button class="chip-btn" id="pressure-unit">${L.pressureUnit==="psi"?"bar":"psi"}</button></div>`)+Ye({bind:"c.diameter",label:"虛擬針嘴內徑",value:s.diameter,unit:"mm",min:.2,max:8,tag:"geo",hint:e?"只影響持膠量與外觀":"0.125 in = 3.175 mm（指南曲線用嘴）"})+Ye({bind:"c.nozzleLength",label:"等效直管長",value:s.nozzleLength,unit:"mm",min:1,max:100,tag:"ai",hint:e?"只影響持膠量":"流量基準長度，非針嘴總長"}))}
  ${Xn("響應與材料模型",Ye({bind:"c.delay",label:"起膠延遲",value:s.delay,unit:"s",min:0,max:2,tag:"ai"})+Ye({bind:"c.tauOn",label:e?"起停時間常數":"上升時間常數",value:s.tauOn,unit:"s",min:.001,max:2,tag:"ai"})+(e?"":Ye({bind:"c.tauOff",label:"卸壓下降時間常數",value:s.tauOff,unit:"s",min:.001,max:2,tag:"ai"}))+(!e&&s.material==="putty"?Ye({bind:"c.pressureExponent",label:"壓力冪次 m",value:s.pressureExponent,unit:"",min:.1,max:4,tag:"derived",hint:"指南曲線 20–100 psi 擬合 2.73；設 1 回到 v0.x 線性"})+Ye({bind:"c.referenceRate",label:"90 psi 參考流率",value:s.referenceRate,unit:"mL/s",min:0,max:10,tag:"tds",hint:"75 g/min ÷ 3.2 g/cc；指南圖讀約 75 cc/min，單位待 Laird 確認"}):"")+(!e&&s.material==="grease"?Ye({bind:"c.viscosity",label:"等效黏度",value:s.viscosity,unit:"Pa·s",min:1,max:1e5,tag:"tds"}):""),{open:!1,note:"起停常數為 AI 初估；未含溫度效應（指南：低於 23 °C 流率下降，60–80 °C 加熱可改善）。"})}
  ${Xn("膠筒與預填管路",Ye({bind:"c.fill",label:"膠筒初始裝填",value:s.fill,unit:"mL",min:s.residual,max:e?300:75,tag:s.material==="putty"?"tds":"ai",hint:s.material==="putty"?e?"300cc 鋁筒裝填 300 cc（960 g）":"75cc EFD 裝填 56 cc（179 g）":`Tgrease 實際包材：${qt.grease.packaging}`})+Ye({bind:"c.residual",label:"不可用殘量",value:s.residual,unit:"mL",min:0,max:s.fill,tag:"ai"})+(e?Ye({bind:"c.hoseId",label:"供料管內徑",value:s.hoseId,unit:"mm",min:1,max:25,tag:"ai"})+Ye({bind:"c.hoseLength",label:"供料管長",value:s.hoseLength,unit:"mm",min:0,max:5e3,tag:"ai"}):""),{open:!1,note:e?"管路已預填，只計入持膠量；未求解壓降。畫面管路為示意。":"氣室與氣管未分開求解；畫面氣管與控制器為示意。"})}`}function Dy(){var r;const s=L.heat,t=(s.shape==="circle"?Math.PI*s.width**2/4:s.width*s.depth)*s.gap/1e3,n=((r=L.run)==null?void 0:r.summary.deposited)??0,i=t>0?n/t:0;return`
  <p class="lead">熱源（元件接觸面）設定同時決定「依熱源」路徑與壓合／熱阻估算。偏移以工件中心為原點。</p>
  ${Ai({bind:"h.shape",label:"熱源形狀",value:s.shape,options:[["rectangle","矩形"],["circle","圓形"]]})}
  <div class="pair">
    ${Ye({bind:"h.width",label:s.shape==="circle"?"直徑":"長 X",value:s.width,unit:"mm",min:1,max:500,tag:"ai"})}
    ${s.shape==="circle"?"":Ye({bind:"h.depth",label:"寬 Y",value:s.depth,unit:"mm",min:1,max:500,tag:"ai"})}
  </div>
  <div class="pair">
    ${Ye({bind:"h.offsetX",label:"中心 X",value:s.offsetX,unit:"mm",min:-500,max:500})}
    ${Ye({bind:"h.offsetY",label:"中心 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}
  </div>
  <div class="pair">
    ${Ye({bind:"h.gap",label:"組裝間隙 BLT",value:s.gap,unit:"mm",min:.02,max:10,tag:"ai",hint:`${qt[L.config.material].name} 最小 ${qt[L.config.material].minBondLine} mm`})}
    ${Ye({bind:"h.power",label:"元件功耗",value:s.power,unit:"W",min:0,max:1e4,tag:"ai"})}
  </div>
  <div class="volume-meter ${i<1?"low":i>1.6?"high":"ok"}">
    <div><span>熱源間隙體積</span><b>${he(t,3)} mL</b></div>
    <div><span>目前沉積</span><b>${he(n,3)} mL</b></div>
    <div><span>比值</span><b>${he(i,2)}×</b></div>
    <i style="--w:${Math.min(100,i/2*100)}%"></i><em class="tick1"></em>
  </div>
  <div class="tune">
    ${Ye({bind:"x.tuneFactor",label:"目標膠量係數",value:L.tuneFactor,unit:"× 間隙體積",min:.3,max:5,tag:"ai",hint:"考慮溢膠與夾氣的餘量；1.2 為比較起點"})}
    <button class="secondary" id="tune">${L.config.mode==="point"?"自動調整開膠時間":"自動調整移動速度"}</button>
  </div>
  <div class="actions">
    <button class="primary" id="press">${wt.press}<span>模擬壓合</span></button>
    <button class="secondary" id="compare">${wt.compare}<span>比較所有圖樣</span></button>
  </div>
  ${Xn("壓合條件（透明板＋墊片）",Iy(s),{open:!0,note:"定力壓下，到墊片（組裝間隙）即停；之後膠壓消退，被壓縮的氣泡回脹到降伏應力擋住為止。實際手壓若先快後慢，壓合中的氣泡壓縮程度會不同，最終回脹結果影響較小。"})}
  ${Xn("估算網格",Ye({bind:"h.cellSize",label:"網格解析度",value:s.cellSize,unit:"mm",min:.2,max:5,tag:"ai",hint:"越小越細，計算時間增加；上限 90,000 格。夾氣數量對網格敏感，比較圖樣請用相同網格"}),{open:!1})}
  <p class="note">壓合採平行板 Hele-Shaw 擠壓：定力壓到墊片，被膠包圍的空氣依所選方式處理（預設可壓縮：pV = 常數、可隨膠流移動、膠牆變薄時排出）。熱阻 =（間隙 ÷ k + TDS 推算接觸熱阻）÷ 濕潤面積。皆未經透明板實測校準。</p>`}function Iy(s){const e=L.config,t=Iu(e,s),n=e.material==="grease";return`${Ai({bind:"h.airMode",label:"夾氣處理",value:s.airMode,options:[["compressible","可壓縮氣泡（會壓縮、遷移、排出）"],["rigid","剛性牆（v1.0 舊模型）"],["vent","全部排出（覆蓋率上限）"]]})}
  <div class="pair">
    ${Ye({bind:"h.pressKgf",label:"壓合力",value:s.pressKgf,unit:"kgf",min:.01,max:5e3,tag:"ai",hint:"手壓或治具的力"})}
    ${Ye({bind:"h.pressSpeed",label:"下降速度上限",value:s.pressSpeed,unit:"mm/s",min:.01,max:100,tag:"ai",hint:"剛接觸時的壓板速度"})}
  </div>
  <div class="pair">
    ${Ye({bind:"h.viscosity",label:"有效黏度",value:t.viscosity,unit:"Pa·s",min:1,max:1e7,tag:n?"tds":"derived",hint:n?"TDS Brookfield 2 rpm（同設備頁）":"由針嘴冪律擬合推算 @1 s⁻¹"})}
    ${Ye({bind:"h.yieldStress",label:"降伏應力",value:t.yieldStress,unit:"Pa",min:0,max:1e6,tag:"ai",hint:"公開散熱膏實測約 7–30 Pa"})}
  </div>
  ${Ye({bind:"h.settleTime",label:"靜置觀察時間",value:s.settleTime,unit:"s",min:0,max:3600,tag:"ai",hint:"壓到墊片後氣泡回脹的時間；建議與透明板拍照時間一致"})}
  ${s.viscosity!=null||s.yieldStress!=null?'<button class="chip-btn" id="rheo-reset">恢復材料預設黏度／降伏應力</button>':""}`}function Ny(){var i,r,a;const s=L.config,e=L.pattern;let n=`<div class="seg full" role="group" aria-label="路徑模式">${[["pattern","依熱源"],["line","直線"],["point","單點"]].map(([o,c])=>`<button data-mode="${o}" class="${s.mode===o?"active":""}">${c}</button>`).join("")}</div>`;return s.mode==="pattern"?(n+=`<div class="patterns">${Object.keys(hi).map(o=>`<button data-pattern="${o}" class="${e.pattern===o?"active":""}" title="${hi[o]}"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${Nu[o]}</svg><span>${hi[o]}</span></button>`).join("")}</div>`,e.pattern==="spiral"&&(n+=`<div class="pair">${Ai({bind:"p.spiralShape",label:"螺旋形狀",value:e.spiralShape,options:[["auto","依熱源"],["square","方形"],["round","圓形"]]})}${Ai({bind:"p.spiralDirection",label:"起點",value:e.spiralDirection,options:[["outside-in","外向內"],["inside-out","中心向外"]]})}</div>`),n+=`<div class="pair">${Ye({bind:"p.spacing",label:"路徑間距",value:e.spacing,unit:"mm",min:.2,max:1e3,tag:"ai"})}${Ye({bind:"p.edgeInset",label:"邊界內縮",value:e.edgeInset,unit:"mm",min:0,max:500,tag:"ai"})}</div>`,n+=`<p class="note">路徑長 ${he((i=L.run)==null?void 0:i.pathLength,1)} mm${(a=(r=L.run)==null?void 0:r.motion)!=null&&a.corners?` · ${L.run.motion.corners} 個減速轉角（最低 ${he(L.run.motion.slowestCorner,1)} mm/s）`:""}。內縮只限制針尖中心；Laird／Parker 指南提醒蛇形、螺旋、外框較易夾氣。</p>`):s.mode==="line"?n+=`<div class="pair">${Ye({bind:"c.lineLength",label:"路徑長度",value:s.lineLength,unit:"mm",min:1,max:250,tag:"ai"})}${Ye({bind:"c.offsetX",label:"中心 X",value:s.offsetX,unit:"mm",min:-500,max:500})}</div>${Ye({bind:"c.offsetY",label:"中心 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}`:n+=`${Ye({bind:"c.gateDuration",label:"開膠時間",value:s.gateDuration,unit:"s",min:.001,max:10,tag:"ai"})}<div class="pair">${Ye({bind:"c.offsetX",label:"點位 X",value:s.offsetX,unit:"mm",min:-500,max:500})}${Ye({bind:"c.offsetY",label:"點位 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}</div>`,s.mode!=="point"&&(n+=Xn("運動",`<div class="pair">${Ye({bind:"c.speed",label:"設定速度",value:s.speed,unit:"mm/s",min:1,max:800,tag:"ai"})}${Ye({bind:"c.acceleration",label:"加速度",value:s.acceleration,unit:"mm/s²",min:1,max:1e4,tag:"ai"})}</div>`+(s.mode==="pattern"?Ai({bind:"c.cornerMode",label:"轉角速度",value:s.cornerMode,options:[["junction","依轉角減速（junction deviation）"],["off","不減速（v0.7 對照）"]]})+(s.cornerMode==="junction"?Ye({bind:"c.junctionDeviation",label:"轉角偏差",value:s.junctionDeviation,unit:"mm",min:.001,max:5,tag:"ai",hint:"越小轉角越慢、轉角積膠越多"}):""):""))),n+=Ye({bind:"c.standoff",label:"針嘴離面高度",value:s.standoff,unit:"mm",min:.1,max:20,tag:"ai",hint:"只做間距／干涉提示"}),n}function Uy(){const s=L.config,e=Os();let t="";return s.mode!=="point"&&(t+=Xn("提前關膠",Ye({bind:"c.shutoffDistance",label:"終點前關膠距離",value:s.shutoffDistance,unit:"mm",min:0,max:250,tag:"ai"})+`<div class="seg full presets"><button data-shutoff="0">未補償 0 mm</button><button data-shutoff="${lr.value}">初估 ${lr.value} mm</button></div>`,{note:"先關膠、針嘴繼續走到終點；距離依當前加減速曲線換算成時間。提前過多會欠膠。"})),t+=Xn("退離動作",Ai({bind:"c.endMotion",label:"退離方式",value:s.endMotion,options:[["vertical","垂直抬針"],["diagonal","邊升邊回退"],["liftThenBack","先抬高再回退"],["legacy","v0.2 尾膠結算後抬針（對照）"]]})+(s.endMotion==="legacy"?"":`<div class="with-btn">${Ye({bind:"c.endDwell",label:"終點停留",value:s.endDwell,unit:"s",min:0,max:5,tag:"ai"})}<button class="chip-btn" data-dwell="0.3" title="Laird 910 指南：小點黏針時，移動前加 0.3–0.5 s 等待">指南 0.3 s</button></div>`)+`<div class="pair">${Ye({bind:"c.liftSpeed",label:"抬針速度",value:s.liftSpeed,unit:"mm/s",min:.1,max:200,tag:"ai"})}${Ye({bind:"c.liftDistance",label:"抬針高度",value:s.liftDistance,unit:"mm",min:.1,max:50,tag:"ai"})}</div>`+(["diagonal","liftThenBack"].includes(s.endMotion)&&s.mode!=="point"?`<div class="pair">${Ye({bind:"c.backtrackDistance",label:"回退距離",value:s.backtrackDistance,unit:"mm",min:0,max:50,tag:"ai"})}${Ye({bind:"c.backtrackSpeed",label:"回退速度",value:s.backtrackSpeed,unit:"mm/s",min:.1,max:200,tag:"ai"})}</div>`:""),{note:"Laird 910 指南建議小點黏針時「先左右移動再抬起」並停留 0.3–0.5 s；本模型只改軌跡與時序，不預測拉絲與落點。"}),t+=e?Xn("PCP 反轉回吸",`<div class="pair">${Ye({bind:"c.reverseDuration",label:"反轉時間",value:s.reverseDuration,unit:"s",min:0,max:2,tag:"ai",hint:"0 = 停用"})}${Ye({bind:"c.reverseRpm",label:"反轉轉速",value:s.reverseRpm,unit:"rpm",min:0,max:300,tag:"ai"})}</div><button class="chip-btn wide" id="reverse-example">套用比較值 30 rpm / 0.05 s</button>`,{note:"只回收未出嘴的暫存量並獨立記帳；不吸回工件上的膠，未求解負壓或斷絲。"}):'<p class="note">氣壓式關閉後以「卸壓下降時間常數」近似；不提供螺桿反轉。</p>',t}function Fy(){var t;const s=L.config,e=s.workpieceKind!=="plate";return`
  <div class="pair">${Ye({bind:"c.width",label:"工件長 X",value:s.width,unit:"mm",min:1,max:1e3,tag:"geo",disabled:e})}${Ye({bind:"c.depth",label:"工件寬 Y",value:s.depth,unit:"mm",min:1,max:1e3,tag:"geo",disabled:e})}</div>
  <div class="pair">${Ye({bind:"c.thickness",label:"厚度",value:s.thickness,unit:"mm",min:.1,max:200,tag:"geo",disabled:e})}${Ye({bind:"c.fixtureHeight",label:"治具支承高度",value:s.fixtureHeight,unit:"mm",min:0,max:100,tag:"ai"})}</div>
  ${Xn("匯入工件",`<div class="pair"><label class="field"><span class="lbl">STL 單位</span><select id="import-unit"><option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option><option value="inch">inch</option></select></label><label class="field"><span class="lbl">STL 向上</span><select id="import-up"><option>Z</option><option>Y</option></select></label></div>
    <label class="file-button">載入 STL / GLB / glTF<input id="workpiece-file" type="file" accept=".stl,.glb,.gltf"></label>
    ${e?`<p class="note">${Ht(((t=s.workpieceFile)==null?void 0:t.name)||"")} · ${he(s.width,2)} × ${he(s.depth,2)} × ${he(s.thickness,2)} mm</p><button class="chip-btn wide" id="clear-workpiece">恢復虛擬平板</button>`:""}`,{open:e,note:"GLB／glTF 依規格以 m、Y 向上換算；STL 需指定單位與上方向。點膠面取上方水平參考面，未處理孔洞、曲面與碰撞。"})}
  <p class="note">預設 150 × 100 × 5 mm 為虛擬壓鑄鋁平板（示意 RRU 腔體一角），非客戶工件。</p>`}const Oy={equipment:Ly,heat:Dy,path:Ny,ending:Uy,workpiece:Fy};function Ri(){const s=_e("#tab-body"),e=s.scrollTop,t=Kt("details.group",s).map(n=>n.open);s.innerHTML=Oy[L.tab](),Kt("details.group",s).forEach((n,i)=>t[i]!==void 0&&(n.open=t[i])),s.scrollTop=e,Kt("[data-tab]").forEach(n=>{n.classList.toggle("active",n.dataset.tab===L.tab),n.setAttribute("aria-selected",n.dataset.tab===L.tab)}),zy()}Kt("[data-tab]").forEach(s=>s.addEventListener("click",()=>{L.tab=s.dataset.tab,_e("#tab-body").scrollTop=0,Ri()}));_e("#tab-body").addEventListener("change",s=>{const e=s.target;if(e.id==="sel-material"||e.id==="sel-arch")return Cy(_e("#sel-material").value,_e("#sel-arch").value);if(e.id==="workpiece-file")return ky(e);const t=e.dataset.bind;if(!t)return;const[n,i]=t.split(".");let r=e.value;if(e.type==="number"){if(!e.value.trim()||!e.checkValidity())return fn("請輸入欄位範圍內的數值","error"),Ri();r=Number(e.value)}if(n==="x"){L.tuneFactor=r;return}if(n==="c"){i==="pressure"&&L.pressureUnit==="bar"&&(r/=Fu);const c={...L.config,[i]:r};return i==="tauOn"&&Os()&&(c.tauOff=r),xn(c)}const a=n==="h"?"heat":"pattern",o=L[a];if(L[a]={...o,[i]:r},n==="h"&&Ey.includes(i))return qu(),Ri();xn(L.config)||(L[a]=o,Ri())});_e("#tab-body").addEventListener("click",s=>{const e=s.target.closest("button");if(e){if(e.dataset.mode)return xn({...L.config,mode:e.dataset.mode});if(e.dataset.pattern){const t=L.pattern;L.pattern={...L.pattern,pattern:e.dataset.pattern},xn(L.config)||(L.pattern=t);return}if(e.dataset.shutoff!==void 0)return xn({...L.config,shutoffDistance:Number(e.dataset.shutoff)});if(e.dataset.dwell!==void 0)return xn({...L.config,endDwell:Number(e.dataset.dwell)});switch(e.id){case"pressure-unit":return L.pressureUnit=L.pressureUnit==="psi"?"bar":"psi",Ri();case"reverse-example":return xn({...L.config,reverseRpm:30,reverseDuration:.05});case"tune":return By();case"rheo-reset":return L.heat={...L.heat,viscosity:null,yieldStress:null},qu(),Ri();case"press":return Yu();case"compare":return Jc();case"clear-workpiece":return et.clearImport(),xn({...L.config,width:150,depth:100,thickness:5,workpieceKind:"plate",workpieceFile:null})}}});function By(){const s=L.heat,t=(s.shape==="circle"?Math.PI*s.width**2/4:s.width*s.depth)*s.gap/1e3*L.tuneFactor;try{const n=xy(L.config,t);xn(n.config),fn(n.reached?`已調整${n.key==="speed"?`移動速度為 ${he(n.config.speed,1)} mm/s`:`開膠時間為 ${he(n.config.gateDuration,3)} s`}，沉積 ${he(L.run.summary.deposited,3)} mL（目標 ${he(t,3)}）`:`已達設備限制，最接近 ${he(L.run.summary.deposited,3)} mL（目標 ${he(t,3)}）；請改壓力、轉速或圖樣`,n.reached?"ok":"error")}catch(n){fn(n.message,"error")}}async function ky(s){const e=s.files[0];if(e){L.playing=!1;try{const t=await et.importFile(e,_e("#import-unit").value,_e("#import-up").value);xn({...L.config,...t})&&fn("工件已載入。請核對尺寸；點膠使用上方水平參考面。","ok")}catch(t){fn(t.message,"error")}s.value=""}}_e("#defaults").onclick=()=>{et.clearImport(),L.heat=Bu(),L.pattern=ku(),L.overrides.delete(L.config.profile),xn(Gu(L.config.material,L.config.architecture)),fn("已恢復此情境的研究預設")};function Wu(s){fi(!1),L.playing=!1,L.time=0,L.run=s,L.frame=s.frames[0],et.rebuild({...L.config,heatSource:{...L.heat}},s),et.setOverlayVisibility({heatSource:_e("#show-heat").checked,exitPath:_e("#show-exit").checked,plannedPath:_e("#show-planned").checked}),_e("[data-view=feed]").disabled=!Os(),_e("#scrubber").max=String(Math.ceil(s.duration*1e3)),Hy(),Kc(),Ri(),Bs(),Ln(),Sr()}function zy(){const s=L.config,e=s.mode==="pattern"?`依熱源 · ${hi[L.pattern.pattern]}`:s.mode==="line"?"直線":"單點",t=s.architecture==="P300"?`${he(s.rpm,0)} rpm`:`${he(s.pressure,0)} psi`;_e("#scenario").innerHTML=[qt[s.material].name,s.architecture==="P300"?"P300 PCP":"R75 氣壓",e,t,s.mode==="point"?`${he(s.gateDuration,2)} s`:`${he(s.speed,0)} mm/s`].map((n,i)=>`<span class="${i===0?"glue-chip":""}" ${i===0?`style="--glue:#${qt[s.material].color.toString(16).padStart(6,"0")}"`:""}>${Ht(n)}</span>`).join("")}function Hy(){const s=L.run,e=s.ending;_e("#marks").innerHTML=[["off",e.commandOff,"關膠"],["arrive",e.movementEnd,"到位"],["lift",e.liftStart,"抬針"],["exit",e.motionEnd,"退離"]].map(([t,n,i])=>`<button class="mark ${t}" style="left:${n/s.duration*100}%" data-seek="${n}" title="${i} ${he(n,3)} s"><span>${i}</span></button>`).join("")}_e("#marks").addEventListener("click",s=>{const e=s.target.closest("[data-seek]");e&&(fi(),L.playing=!1,L.time=Math.min(L.run.duration,Number(e.dataset.seek)+1e-6),Ln())});function Kc(){var s;L.chart=My(_e("#chart"),L.run,L.chartType,L.time,(s=L.baseline)!=null&&s.run&&L.baseline.run.frames?L.baseline.run:null),_e("#chart-unit").textContent=Uu[L.chartType].unit,_e("#legend-command").hidden=L.chartType!=="q",_e("#legend-base").hidden=!L.baseline}Kt("[data-chart]").forEach(s=>s.addEventListener("click",()=>{L.chartType=s.dataset.chart,Kt("[data-chart]").forEach(e=>e.classList.toggle("active",e===s)),Kc()}));_e("#chart").addEventListener("click",s=>{const e=_e("#chart").getBoundingClientRect(),t=L.chart.toTime((s.clientX-e.left)/e.width*1e3);fi(),L.playing=!1,L.time=Math.max(0,Math.min(L.run.duration,t)),Ln()});function vn(s,e,t,n="",i=""){return`<div class="kpi ${i}"><span>${s}</span><b>${e}<small>${t}</small></b>${n?`<em>${n}</em>`:""}</div>`}function Vy(s){if(!s)return"";const e=s.airMode==="compressible",t=e?vn("氣泡留下",`${s.remaining}`,"個",s.sealed?`封住 ${s.sealed} 次 · 排出 ${s.vented} 次${s.peakBubbleKPa?` · 壓合中最高 ${he(s.peakBubbleKPa,0)} kPa`:""}`:"壓合過程沒有封住空氣",s.remaining?"warn":"good"):vn("氣泡","—","",s.airMode==="rigid"?"剛性牆：封住即凍結":"假設全部排出"),n=e?vn("靜置回脹",he(s.relaxTime,s.relaxTime<10?1:0),"s",s.volumeRatio!=null?`剩餘氣泡 = 1 atm 體積 ${he(s.volumeRatio*100,0)}%${s.settled?"":" · 仍在回脹"}`:"無剩餘氣泡",s.settled?"":"warn"):vn("靜置回脹","—","","此模式不計");return`<div class="kpis three">
    ${vn("壓到墊片",he(s.pressTime,s.pressTime<10?1:0),"s",`${he(s.forceKgf,1)} kgf · 座落 ${he(s.seatPressureKPa,0)} kPa`)}
    ${t}
    ${n}
  </div>`}function Bs(){var f,g;const s=L.run,e=L.config,t=s.summary,n=s.ending,i=L.heat,a=(i.shape==="circle"?Math.PI*i.width**2/4:i.width*i.depth)*i.gap/1e3,o=(f=L.press)==null?void 0:f.result.summary,c=(g=L.press)==null?void 0:g.stale,l=n.endToMiddleRatio,h=_=>_>=95?"good":_>=80?"warn":"bad",u=_=>{const p=2*Math.PI*34;return`<svg viewBox="0 0 84 84" class="ring ${h(_)}"><circle cx="42" cy="42" r="34" class="track"/><circle cx="42" cy="42" r="34" class="val" stroke-dasharray="${Math.min(100,_)/100*p} ${p}" transform="rotate(-90 42 42)"/><text x="42" y="46" text-anchor="middle">${he(_,1)}%</text></svg>`},d=[...s.warnings,...L.press&&!c?L.press.result.warnings:[]];_e("#results").innerHTML=`
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">完整試驗預估</span><span class="pill">${Ht(e.profile)}</span></div>
    <div class="hero"><b>${he(t.deposited,3)}</b><span>mL 工件沉積</span><em>${he(t.deposited*e.density,3)} g · 出口總計 ${he(t.output,3)} mL</em></div>
    <div class="kpis">
      ${vn("熱源需求比",he(a>0?t.deposited/a:0,2),"×",`需 ${he(a,3)} mL`,a>0&&t.deposited/a<1?"bad":"")}
      ${vn("開膠時間",he(s.gate,2),"s",`動作完成 ${he(n.motionEnd,2)} s`)}
      ${vn("膠高 / 寬",`${he(t.maxHeight,2)} / ${he(t.maxWidth,1)}`,"mm",`針距 ${he(e.standoff,1)} mm`,t.maxHeight>e.standoff?"warn":"")}
      ${vn("末段 / 中段",l===null?"—":he(l,2),"×","0.5–1.5 為 AI 比較帶",l!==null&&(l<.5||l>1.5)?"warn":"")}
    </div>
  </section>
  <section class="card-sec press-sec">
    <div class="sec-head"><span class="eyebrow">壓合 · 熱阻估算</span>${L.press?`<span class="pill ${c?"pill-warn":""}">${c?"設定已變更":`${he(L.press.settings.gap,2)} mm · ${Ty[L.press.settings.airMode]}`}</span>`:""}</div>
    ${o&&!c?`<div class="press-grid">${u(o.coveredPercent)}<div class="press-sum"><b>熱源等效覆蓋</b><span>沉積 ${he(o.depositedMl,3)} mL = 間隙體積 ${he(o.volumeRatio,2)}×</span><span>${Ht(o.material)} · k ${o.thermal.conductivity} W/m·K</span></div></div><div class="kpis">
          ${vn("夾氣區",o.voidCount,"處",o.voidCount?`${he(o.voidAreaMm2,1)} mm² · ${he(o.voidPercent,1)}%`:"未偵測到",o.voidCount?"bad":"good")}
          ${vn("溢出熱源",he(o.squeezeOutMm,1),"mm",`熱源外 ${he(o.outsideMl,3)} mL`,o.squeezeOutMm>3?"warn":"")}
          ${vn("TIM 溫升",he(o.thermal.rise,2),"°C",`滿覆蓋 ${he(o.thermal.idealRise,2)} °C @ ${he(o.thermal.power,0)} W`,o.thermal.rise>o.thermal.idealRise*1.1?"warn":"")}
          ${vn("熱阻",he(o.thermal.resistance,4),"K/W",`θ ${he(o.thermal.impedanceCm2,3)} °C·cm²/W`)}
        </div>
        ${Vy(o.press)}
        <div class="press-actions"><button class="chip-btn" id="press-replay">${wt.play}重播壓合</button><button class="chip-btn" id="press-save">保存壓合基準</button></div>
        ${L.pressBaseline?`<div class="compare-box"><b>壓合基準 → 目前</b><p>覆蓋 ${he(L.pressBaseline.summary.coveredPercent,1)}% → ${he(o.coveredPercent,1)}%　夾氣 ${L.pressBaseline.summary.voidCount} → ${o.voidCount}　溫升 ${he(L.pressBaseline.summary.thermal.rise,2)} → ${he(o.thermal.rise,2)} °C</p><small>${Ht(L.pressBaseline.describe)}</small></div>`:""}`:`<div class="cta"><p>${c?"熱源或點膠設定已變更，請重新模擬。":"以完整試驗的沉積分布估算壓合覆蓋、夾氣與熱阻。"}</p><button class="primary" id="press-cta">${wt.press}<span>模擬壓合</span></button><button class="secondary" id="compare-cta">${wt.compare}<span>比較所有圖樣</span></button></div>`}
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">即時帳目</span><span class="pill mono" id="led-t">t = 0.000 s</span></div>
    <dl class="ledger">
      <div><dt>TCP X / Y / Z</dt><dd id="led-xyz"></dd></div>
      <div><dt>移動速度</dt><dd id="led-v"></dd></div>
      <div><dt>膠筒剩餘</dt><dd id="led-rem"></dd></div>
      <div><dt>工件沉積</dt><dd id="led-dep"></dd></div>
      <div><dt>離面後出膠（形狀未定）</dt><dd id="led-off"></dd></div>
      ${Os()?'<div><dt>PCP 暫存 / 回收</dt><dd id="led-pend"></dd></div>':""}
      <div><dt>預填固定持膠</dt><dd id="led-fixed"></dd></div>
      <div><dt>體積對帳誤差</dt><dd id="led-bal"></dd></div>
    </dl>
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">收尾時序</span></div>
    <ol class="timeline">
      <li class="off"><b>${he(n.commandOff,3)} s</b>關膠指令</li>
      <li class="arrive"><b>${he(n.movementEnd,3)} s</b>到達終點</li>
      <li class="lift"><b>${he(n.liftStart,3)} s</b>開始抬針</li>
      <li class="exit"><b>${he(n.motionEnd,3)} s</b>退離完成</li>
    </ol>
    <p class="note">停移後流出 ${he(n.afterStopVolume*1e3,2)} µL（${he(n.afterStopPercent,1)}%）；其中離面後 ${he(t.offSurface*1e3,2)} µL 未加入膠形。${Os()&&n.reverseStart!==null?`回收暫存 ${he(t.recovered*1e3,2)} µL。`:""}</p>
  </section>
  <details class="card-sec warnings" ${d.length>4?"":"open"}><summary><span class="eyebrow">提醒與模型界線</span><span class="count">${d.length}</span></summary>${d.map(_=>`<p>${Ht(_)}</p>`).join("")}</details>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">基準比較</span><button class="chip-btn" id="save-baseline">保存目前為基準</button></div>
    ${Gy()}
  </section>
  <section class="card-sec exports">
    <button class="chip-btn" id="export-json">${wt.download}配置 JSON</button>
    <button class="chip-btn" id="export-csv">${wt.download}結果 CSV</button>
    <button class="chip-btn" id="export-image">${wt.download}畫面 PNG</button>
  </section>
  <p class="fineprint">工程假設、未經實機校準；23 °C 參考條件。結果供方案相對比較，不能作為量產配方或驗收依據。</p>`}function Xu(s,e){var n,i;const t=s.mode==="pattern"?`${hi[(n=s.pathSettings)==null?void 0:n.pattern]||""}（間距 ${(i=s.pathSettings)==null?void 0:i.spacing} mm）`:s.mode==="line"?`直線 ${s.lineLength} mm`:`單點 ${s.gateDuration} s`;return`${qt[s.material].name} · ${s.architecture} · ${t} · ${s.architecture==="P300"?`${s.rpm} rpm`:`${he(s.pressure,1)} psi`} · ${s.speed} mm/s${e?` · 熱源 ${e.width}${e.shape==="circle"?" Ø":` × ${e.depth}`} mm / ${e.gap} mm`:""}`}function Gy(){var i,r;const s=L.baseline;if(!s)return'<p class="note">保存基準後再調整參數，比較沉積量與配置差異；流量曲線會疊上基準。</p>';const e=L.run.summary.deposited-s.summary.deposited,t=Object.keys(L.config).filter(a=>typeof L.config[a]!="object"&&L.config[a]!==s.config[a]);for(const a of new Set([...Object.keys(L.config.pathSettings||{}),...Object.keys(s.config.pathSettings||{})]))((i=L.config.pathSettings)==null?void 0:i[a])!==((r=s.config.pathSettings)==null?void 0:r[a])&&t.push("pathSettings."+a);const n=(a,o)=>{var c;return o.startsWith("pathSettings.")?((c=a.pathSettings)==null?void 0:c[o.slice(13)])??"—":a[o]};return`<div class="compare-box"><div class="delta"><span>${he(s.summary.deposited,3)} → ${he(L.run.summary.deposited,3)} mL</span><b class="${e>=0?"up":"down"}">${e>=0?"+":""}${he(e,3)} mL</b></div>
    <details><summary>${t.length?`${t.length} 個欄位不同`:"與基準配置相同"}</summary>${t.map(a=>`<p><code>${Ht(a)}</code> ${Ht(n(s.config,a))} → ${Ht(n(L.config,a))}</p>`).join("")||"<p>無</p>"}</details></div>`}_e("#results").addEventListener("click",s=>{const e=s.target.closest("button");if(e)switch(e.id){case"press-cta":return Yu();case"compare-cta":return Jc();case"press-replay":return Zc(!0);case"press-save":return L.pressBaseline={summary:structuredClone(L.press.result.summary),describe:Xu(L.config,L.press.settings)},fn("已保存壓合基準","ok"),Bs();case"save-baseline":return L.baseline={config:structuredClone(L.config),summary:structuredClone(L.run.summary),run:{frames:L.run.frames.map(t=>({t:t.t,q:t.q,output:t.output,speed:t.speed,z:t.z})),duration:L.run.duration}},fn("已保存完整試驗結果為基準","ok"),Kc(),Bs();case"export-json":return Qc(JSON.stringify(Zu(),null,2),"TIM_工程假設_試驗配置.json","application/json");case"export-csv":return $y();case"export-image":return qy()}});function Ln(){const s=L.run,e=L.frame=Ed(s,L.time);L.press||et.update(e),_e("#hud-t").textContent=he(e.t,3),_e("#hud-out").textContent=he(e.output,3),_e("#hud-q").textContent=he(e.q,3),_e("#hud-xyz").textContent=`${he(e.x,1)}, ${he(e.y,1)}, ${he(e.z,1)}`;const t=(i,r)=>{const a=document.getElementById(i);a&&(a.textContent=r)};t("led-t",`t = ${he(e.t,3)} s`),t("led-xyz",`${he(e.x,1)} / ${he(e.y,1)} / ${he(e.z,2)} mm`),t("led-v",`${he(e.speed,1)} mm/s`),t("led-rem",`${he(e.remaining,3)} mL`),t("led-dep",`${he(e.deposited,5)} mL`),t("led-off",`${he(e.offSurface*1e3,2)} µL`),t("led-pend",`${he(e.pending*1e3,2)} / ${he(e.recovered*1e3,2)} µL`),t("led-fixed",`${he(e.fixed,3)} mL`),t("led-bal",`${e.balance.toExponential(1)} mL`),_e("#phase").textContent=L.press?"壓合後估算 · 未校準":L.time===0?"就緒":L.time>=s.duration?"試驗完成":L.playing?e.phase:`已暫停 · ${e.phase}`,_e(".phase").dataset.state=L.press?"press":e.command?"dispense":L.time>=s.duration?"done":"idle";const n=L.playing?"暫停":L.time>=s.duration?"再次播放":L.time>0?"繼續":"開始試驗";_e("#play").innerHTML=`${L.playing?wt.pause:wt.play}<span>${n}</span>`,_e("#time-readout").textContent=`${he(e.t,3)} / ${he(s.duration,3)} s`,_e("#scrubber").value=String(Math.round(L.time*1e3)),_e("#scrubber").style.setProperty("--p",`${L.time/s.duration*100}%`),by(_e("#chart"),L.chart,L.time)}_e("#play").onclick=()=>{fi(),L.time>=L.run.duration&&(L.time=0),L.playing=!L.playing,L.clock=null,Ln()};_e("#restart").onclick=()=>{fi(),L.playing=!1,L.time=0,Ln()};_e("#step").onclick=()=>{fi(),L.playing=!1,L.time=Math.min(L.run.duration,L.time+.010001),Ln()};_e("#scrubber").oninput=s=>{fi(),L.playing=!1,L.time=Math.min(L.run.duration,+s.target.value/1e3),Ln()};document.addEventListener("keydown",s=>{s.target.closest("input, select, textarea, dialog")||s.code==="Space"&&(s.preventDefault(),_e("#play").click())});document.addEventListener("visibilitychange",()=>{document.hidden&&L.playing&&(L.playing=!1,L.clock=null,Ln())});function $u(s){L.playing?(L.clock!==null&&(L.time=Math.min(L.run.duration,L.time+(s-L.clock)/1e3*Number(_e("#playback-speed").value))),L.clock=s,L.time>=L.run.duration&&(L.playing=!1),Ln()):L.clock=null,requestAnimationFrame($u)}function Sr(){Kt("[data-corner]").forEach(s=>s.classList.toggle("active",!et.freeOrbit&&Number(s.dataset.corner)===et.isoCorner)),_e("#free-orbit").setAttribute("aria-pressed",String(et.freeOrbit)),_e("#projection").setAttribute("aria-pressed",String(et.projection==="persp")),_e("#projection-label").textContent=et.projection==="persp"?"透視":"正交",Kt("[data-view]").forEach(s=>s.classList.toggle("active",s.dataset.view===et.mode)),_e("#camera-hint").textContent=et.freeOrbit?"左鍵旋轉 · 右鍵平移 · 滾輪縮放 · Home 重設":"拖曳平移 · 滾輪縮放 · Home 重設",_e("#view-label").textContent=`${oy[et.mode]} · ${et.freeOrbit?"自由旋轉":`等角 ${et.isoCorner+1}`}${et.projection==="persp"?" · 透視":""}`,_e("#geometry-note").textContent=L.press?"透明板與覆蓋為未校準幾何估算":["whole","work","head","feed"].includes(et.mode)?"設備依公開外形參考 · 局部、支架與管路為示意":"近看隱藏上部機構 · 膠形為幾何示意"}Kt("[data-view]").forEach(s=>s.addEventListener("click",()=>{et.fit(s.dataset.view),L.press||et.update(L.frame)}));Kt("[data-corner]").forEach(s=>s.addEventListener("click",()=>et.setCorner(Number(s.dataset.corner))));_e("#free-orbit").onclick=()=>et.setFreeOrbit(!et.freeOrbit);_e("#projection").onclick=()=>{et.setProjection(et.projection==="ortho"?"persp":"ortho"),Sr()};_e("#reset-camera").onclick=()=>{et.setFreeOrbit(!1,!1),et.fit(et.mode)};_e("#show-exit").onchange=s=>et.setOverlayVisibility({exitPath:s.target.checked});_e("#show-planned").onchange=s=>et.setOverlayVisibility({plannedPath:s.target.checked});_e("#show-heat").onchange=s=>et.setOverlayVisibility({heatSource:s.target.checked});_e("#theme").onclick=()=>{const s=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=s,Ou.set("tim-theme",s),et.setTheme(s),_e("#theme").innerHTML=s==="dark"?wt.sun:wt.moon};_e("#theme").innerHTML=jc==="dark"?wt.sun:wt.moon;function qu(){L.press&&!L.press.stale&&(L.press.stale=!0,Bs())}function fi(s=!0){cancelAnimationFrame(L.pressAnim),L.pressAnim=null,L.press&&(L.press=null,et.clearCompression(),_e("#press-bar").hidden=!0,s&&(Bs(),Ln(),Sr()))}async function Yu(){if(L.busy)return;L.busy=!0,document.body.classList.add("busy"),Kt("#press, #press-cta").forEach(t=>t.querySelector("span").textContent="計算中…");const s={...L.heat},e=L.run;try{const t=await zu("compress",{run:Ry(e),heat:s,frames:24});if(e!==L.run||JSON.stringify(s)!==JSON.stringify(L.heat)){fn("計算期間設定已變更，請重新模擬壓合");return}fi(!1),L.playing=!1,L.time=e.duration,Ln(),L.press={result:t,settings:s,stale:!1};const n=et.showCompression(t,s);et.fit("heat");const i=_e("#press-scrub");i.max=String(n.frameCount-1),_e("#press-bar").hidden=!1,Bs(),Ln(),Sr(),Zc(!0)}catch(t){fn(`壓合估算失敗：${t.message}`,"error")}finally{L.busy=!1,document.body.classList.remove("busy"),Kt("#press, #press-cta").forEach(t=>t.querySelector("span")&&(t.querySelector("span").textContent="模擬壓合"))}}function ju(s){var a;const e=et.compression;if(!e)return;et.setCompressionFrame(s);const t=e.frames[s];_e("#press-scrub").value=String(s);const n=((a=L.press.result.summary.press)==null?void 0:a.pressTime)??0,i=t.phase==="relax"?`靜置 +${he(t.t-n,t.t-n<10?1:0)} s`:`${t.t!==void 0?`壓合 ${he(t.t,1)} s · `:""}間隙 ${he(t.gap,3)} mm`,r=t.bubbles?` · 氣泡 ${t.bubbles}（${he(t.bubbleKPa,0)} kPa）`:"";_e("#press-gap").textContent=`${i} · 覆蓋 ${he(t.coveredPercent??L.press.result.summary.coveredPercent,1)}%${r}`}function Zc(s){const e=et.compression;if(!e)return;cancelAnimationFrame(L.pressAnim);const t=e.frameCount,n=performance.now(),i=s?0:Number(_e("#press-scrub").value),r=2400*((t-1-i)/Math.max(1,t-1)),a=o=>{const c=Math.max(i,Math.min(t-1,i+Math.round(Math.max(0,o-n)/Math.max(1,r)*(t-1-i))));ju(c),L.pressAnim=c<t-1?requestAnimationFrame(a):null};L.pressAnim=requestAnimationFrame(a)}_e("#press-scrub").oninput=s=>{cancelAnimationFrame(L.pressAnim),ju(Number(s.target.value))};_e("#press-play").onclick=()=>Zc(Number(_e("#press-scrub").value)>=et.compression.frameCount-1);_e("#press-exit").onclick=()=>fi();Kt("[data-press-color]").forEach(s=>s.addEventListener("click",()=>{Kt("[data-press-color]").forEach(e=>e.classList.toggle("active",e===s)),et.setCompressionColor(s.dataset.pressColor)}));const Wy=["line","n","serpentine","spiral","perimeter"];async function Jc(){var a,o;const s=_e("#compare-dialog");s.open||s.showModal();const e=((a=L.compare)==null?void 0:a.matchVolume)??!0,t=((o=L.compare)==null?void 0:o.factor)??L.tuneFactor,n=`<div class="compare-controls"><label class="chk"><input type="checkbox" id="cmp-match" ${e?"checked":""}>等膠量比較（自動調整速度到需求 ×</label><input type="number" id="cmp-factor" value="${t}" min="0.3" max="5" step="any"><span>）</span><button class="primary" id="cmp-run">${wt.compare}<span>重新計算</span></button></div>`;_e("#compare-body").innerHTML=`${n}<div class="progress"><i style="width:0%"></i></div><p class="note" id="cmp-status">計算中…</p>`,Ku();const i={...L.config,pathSettings:Hu()},r={...L.heat,cellSize:Math.max(.5,L.heat.cellSize)};try{const c=await zu("compare",{config:i,heat:r,patterns:Wy,factor:t,matchVolume:e},(l,h)=>{const u=_e("#compare-body .progress i");u&&(u.style.width=`${l*100}%`);const d=_e("#cmp-status");d&&(d.textContent=`計算 ${hi[h]}…`)});L.compare={...c,matchVolume:e,factor:t},Xy(n)}catch(c){_e("#cmp-status").textContent=c.message}}function Ku(){_e("#cmp-run").onclick=()=>{L.compare={matchVolume:_e("#cmp-match").checked,factor:Number(_e("#cmp-factor").value)||1.2},Jc()}}function Xy(s){const e=L.compare,t=e.rows.filter(o=>o.ok),n=(o,c)=>t.length?t.reduce((l,h)=>(c>0?h[o]>l[o]:h[o]<l[o])?h:l)[o]:null,i=n("coveredPercent",1),r=n("rise",-1),a=n("cycle",-1);_e("#compare-body").innerHTML=`${s}
  <p class="note">熱源 ${L.heat.shape==="circle"?`Ø${L.heat.width}`:`${L.heat.width} × ${L.heat.depth}`} mm、間隙 ${L.heat.gap} mm，需求 ${he(e.required,3)} mL。${e.matchVolume?`每個圖樣自動調整移動速度，使沉積 ≈ 需求 × ${e.factor}。`:"沿用目前速度與流量，膠量隨路徑長改變。"}其他設定沿用目前配置；網格 ≥ 0.5 mm；夾氣處理：${wy[L.heat.airMode]}，${L.heat.pressKgf} kgf 壓到墊片${L.heat.airMode==="compressible"?`、靜置 ${L.heat.settleTime} s`:""}。</p>
  <div class="table-scroll"><table class="cmp"><thead><tr><th>圖樣</th><th>速度<br><small>mm/s</small></th><th>沉積<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溢出<br><small>mm</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
  ${e.rows.map(o=>o.ok?`<tr><td><span class="pat"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${Nu[o.pattern]}</svg>${hi[o.pattern]}</span></td><td>${he(o.speed,1)}</td><td class="${o.reached?"":"warn"}" title="${o.reached?"":"加速度與轉角限制了平均速度，提高設定速度也無法再減少膠量；請降低壓力／轉速或增加間距"}">${he(o.deposited,3)} <small>(${he(o.volumeRatio,2)}×)</small>${o.reached?"":" ⚠"}</td><td class="${o.coveredPercent===i?"best":""}">${he(o.coveredPercent,1)}</td><td class="${o.voidCount?"bad":""}">${o.voidCount} / ${he(o.voidAreaMm2,1)}</td><td>${he(o.squeezeOutMm,1)}</td><td class="${o.rise===r?"best":""}">${he(o.rise,2)}</td><td class="${o.cycle===a?"best":""}">${he(o.cycle,2)}</td><td><button class="chip-btn" data-apply="${o.pattern}" data-speed="${o.speed}">套用</button></td></tr>`:`<tr><td>${hi[o.pattern]}</td><td colspan="8" class="bad">${Ht(o.error)}</td></tr>`).join("")}
  </tbody></table></div>
  ${e.rows.some(o=>o.ok&&!o.reached)?'<p class="note warn-note">⚠ 該圖樣在目前加速度與轉角限制下無法達到目標膠量（提高設定速度已無效）；請降低壓力或轉速、加大間距，或提高加速度後再比較。</p>':""}
  <p class="note">綠色為各欄最佳值。夾氣與覆蓋來自未校準的 Hele-Shaw 近似；動作時間含收尾、不含上下料。請以透明板實測確認後再定案。</p>`,Ku()}_e("#compare-body").addEventListener("click",s=>{var n;const e=s.target.closest("[data-apply]");if(!e)return;L.pattern={...L.pattern,pattern:e.dataset.apply};const t={...L.config,mode:"pattern"};(n=L.compare)!=null&&n.matchVolume&&(t.speed=Number(e.dataset.speed)),_e("#compare-dialog").close(),L.tab="path",xn(t)&&fn(`已套用 ${hi[e.dataset.apply]}`,"ok")});function Qc(s,e,t){const n=document.createElement("a"),i=URL.createObjectURL(s instanceof Blob?s:new Blob([s],{type:t}));n.href=i,n.download=e,n.click(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}function Zu(){var s;return{application:"TIM Dispensing Lab",version:vr,date:new Date().toISOString(),label:xa,validatedAgainstHardware:!1,parameterRegistryVersion:Wn.schema_version,parameterUpdates:Ts,modelAssumptions:{flow:"delayed_first_order",puttyFlowLaw:"tds_reference_point_power_law_tube",motion:L.config.cornerMode==="junction"?"lookahead_trapezoid_junction_deviation":"single_arc_length_trapezoid",lineGeometry:"shared_half_ellipse_rings_total_volume_normalized",pointGeometry:"spherical_cap",surfaceAllocation:"outlet_before_first_lift_only_except_legacy",squeeze:`parallel_plate_hele_shaw_constant_force_to_spacer_${L.heat.airMode}_air`,thermal:"one_dimensional_bulk_plus_tds_derived_contact",hardwareAppearance:"reference_envelopes_with_assumed_details_not_OEM_CAD"},config:L.config,heatSource:L.heat,pattern:L.pattern,hardwareReference:qx[L.config.architecture],material:qt[L.config.material],referenceParameters:Wn.parameters,additionalDefaults:[lr,...yc,...Mc],sources:Wn.sources,warnings:L.run.warnings,summary:L.run.summary,motion:L.run.motion,compression:L.press&&!L.press.stale?{settings:L.press.settings,summary:L.press.result.summary,voids:L.press.result.voids.slice(0,50),warnings:L.press.result.warnings,baseline:L.pressBaseline}:null,patternComparison:((s=L.compare)==null?void 0:s.rows)||null,baseline:L.baseline?{config:L.baseline.config,summary:L.baseline.summary}:null,view:{mode:et.mode,projection:et.projection,isoCorner:et.isoCorner,freeOrbit:et.freeOrbit,time:L.frame.t,cameraPosition:et.camera.position.toArray(),cameraTarget:et.controls.target.toArray()},note:"工件檔案不內嵌，僅保存名稱與雜湊；重新載入需原檔。"}}function $y(){var r;const s=[["t","time_s"],["command","command_0_1"],["target","target_mL_s"],["q","outflow_mL_s"],["output","outlet_mL"],["mass","mass_g"],["s","arc_length_mm"],["x","TCP_X_mm"],["y","TCP_Y_mm"],["z","TCP_Z_mm"],["speed","speed_mm_s"],["remaining","cartridge_mL"],["pending","pending_mL"],["fixed","fixed_primed_mL"],["balance","balance_error_mL"],["deposited","deposited_mL"],["offSurface","off_surface_mL"],["recovered","recovered_pending_mL"],["vx","velocity_X_mm_s"],["vy","velocity_Y_mm_s"],["vz","velocity_Z_mm_s"],["phase","phase"],["depositionBalance","deposition_balance_mL"]],e=a=>'"'+String(a).replaceAll('"','""')+'"',t=Zu(),n=JSON.stringify({config:L.config,heatSource:L.heat,sourceVersion:Wn.schema_version,parameterUpdates:Ts.map(a=>[a.id,a.value]),modelAssumptions:t.modelAssumptions,compression:((r=t.compression)==null?void 0:r.summary)||null,ending:L.run.ending,warnings:L.run.warnings}),i=[["label","app_version","profile",...s.map(a=>a[1]),"run_metadata_json_first_row"].join(","),...L.run.frames.map((a,o)=>[xa,vr,L.config.profile,...s.map(([c])=>a[c]),o===0?n:""].map(e).join(","))];Qc("\uFEFF"+i.join(`\r
`),"TIM_未校準_試驗結果.csv","text/csv;charset=utf-8")}async function qy(){var i;const s=new Image;s.src=et.screenshot(),await s.decode();const e=document.createElement("canvas");e.width=s.width,e.height=s.height+110;const t=e.getContext("2d");t.fillStyle="#f4f6f8",t.fillRect(0,0,e.width,e.height),t.drawImage(s,0,0),t.fillStyle="#16181b",t.font="bold 20px sans-serif",t.fillText(`TIM 點膠研究室 v${vr} · ${xa}`,24,s.height+32),t.font="15px sans-serif",t.fillStyle="#4f5157",t.fillText(`${Xu(L.config,L.heat)} · t=${L.frame.t.toFixed(3)} s · 沉積 ${L.run.summary.deposited.toFixed(4)} mL`,24,s.height+60);const n=(i=L.press)==null?void 0:i.result.summary;t.fillText(n?`壓合估算：覆蓋 ${n.coveredPercent.toFixed(1)}% · 夾氣 ${n.voidCount} 處 ${n.voidAreaMm2.toFixed(1)} mm² · 溫升 ${n.thermal.rise.toFixed(2)} °C（未校準）`:"工件沉積與離面後出膠分帳；虛線為針尖路徑，非膠絲。mm 真實比例。",24,s.height+86),e.toBlob(r=>Qc(r,n?"TIM_未校準_壓合畫面.png":"TIM_未校準_點膠畫面.png","image/png"))}const Yy={published_typical:"原廠典型",published_rated:"原廠額定",published_limit:"原廠上限",derived:"公式／資料推導",engineering_assumption:"AI 工程初估"};function jy(){const s=new Map(Ts.map(n=>[n.id,n])),e=new Map(Wn.parameters.map(n=>[n.id,n])),t=[...Ts.map(n=>({...n,v1:!0})),...Mc.map(n=>({...n,v1:!0})),lr,...yc,...Wn.parameters.filter(n=>!s.has(n.id))];_e("#source-rows").innerHTML=t.map(n=>{const i=n.v1&&e.get(n.id);return`<tr class="${n.v1?"v1":""}"><td><code>${Ht(n.id)}</code>${n.v1?`<em class="tag tag-derived">v${n.since||"1.0"} 更新</em>`:""}</td><td>${Ht(n.value)} ${Ht(n.unit||"")}${i?`<br><small>原 v0.3：${Ht(i.value)}</small>`:""}</td><td>${Ht(Yy[n.evidence]||n.evidence)}<br><small>${Ht(n.role||"控制初值")}</small></td><td>${Ht(n.basis)}<br><small>${Ht((n.source_refs||[]).join(" / "))}</small></td></tr>`}).join("")}_e("#help-body").innerHTML=`
<ol class="steps">
  <li><b>設備</b>：選膠材（Tputty 910／Tgrease 2500）與架構（R75 氣壓／P300 PCP），調整壓力或轉速。</li>
  <li><b>熱源</b>：輸入元件接觸面尺寸、位置、組裝間隙與功耗。可「自動調整移動速度」讓膠量 = 間隙體積 × 係數。</li>
  <li><b>路徑</b>：依熱源選中心線／N／蛇形／螺旋／外框，或直線、單點。多段路徑在轉角依 junction deviation 減速。</li>
  <li><b>播放</b>：空白鍵播放／暫停；拖曳時間軸或點曲線跳到該時刻；時間軸上的標記可跳到關膠、到位、抬針、退離。</li>
  <li><b>壓合</b>：按「模擬壓合」看透明板以定力壓到墊片、膠膜擴散、氣泡（紅色）壓縮／遷移／排出，以及靜置後的回脹；可切換「前緣時序」著色。夾氣處理可在熱源頁切換為 v1.0 剛性牆或全部排出作對照。</li>
  <li><b>比較</b>：「比較所有圖樣」在等膠量下比較覆蓋、夾氣、溢膠、溫升與動作時間，可直接套用。</li>
</ol>
<p class="muted">視角：全機／工作區／機頭／供膠站／近看／跟隨；①–④ 等角方向；360° 自由旋轉；正交與透視可切換。所有零件以 mm 真實比例繪製；設備外形依公開尺寸，細部與管路為示意。</p>
<p class="muted">本工具所有結果為工程假設、未經實機校準，用於縮小試驗範圍與比較方案，不能取代透明板或首件驗證。</p>`;_e("#show-sources").onclick=()=>{jy(),_e("#sources-dialog").showModal()};_e("#help").onclick=()=>_e("#help-dialog").showModal();Kt("[data-close]").forEach(s=>s.onclick=()=>s.closest("dialog").close());Kt("dialog").forEach(s=>s.addEventListener("click",e=>e.target===s&&s.close()));L.config=Gu();Wu(da(L.config));requestAnimationFrame($u);
