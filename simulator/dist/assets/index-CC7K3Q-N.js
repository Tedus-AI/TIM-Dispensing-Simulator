(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const nd="0.3",id="2026-10-24",sd="preimplementation_specification",rd=!1,ad=!1,od="工程假設情境｜未經實機校準",cd={L910_TDS:{url:"https://www.laird.com/sites/default/files/2025-05/THR-DS-Tputty%20910%20RevC.pdf",local:"sources/Laird/Tputty910_TDS_20250422_RevC.pdf",version:"2025-04-22 Rev C"},G2500_TDS:{url:"https://www.laird.com/sites/default/files/2025-07/MKT-DOC-1592%20Tgrease%202500%20Data%20Sheet%2006272025.pdf",local:"sources/Laird/Tgrease2500_TDS_20250627.pdf",version:"2025-06-27"},L910_GUIDE:{url:"https://www.laird.com/sites/default/files/2024-06/A18720-00%20RevA%20Tputty%20910%20%20Dispensing%20Guideline.pdf",local:"sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf",page:5},DM22:{local:"sources/Equipment/Graco_DM22_Manual_3A7931EN_D.pdf",version:"3A7931D",page:26},PCP:{local:"sources/Equipment/Graco_PCP_Repair_3A5364EN_L.pdf",version:"3A5364L",page:40},X100:{local:"sources/Equipment/Nordson_PerformusX_TDS_v110624.pdf"},USER:{description:"2026-10-24 使用者授權：未獲廠商回覆也可先建立有註記的工程預設；本次停在模擬器開發之前。"},METHOD:{url:"https://doc.comsol.com/6.3/doc/com.comsol.help.cfd/cfd_ug_fluidflow_single.06.082.html",description:"用於說明完整非牛頓物性需要額外參數；未拿其軟體預設充當 TIM 物性。"}},ld=JSON.parse('[{"id":"material.putty.density","value":3.2,"unit":"g/mL","evidence":"published_typical","basis":"TDS 典型值；不是此批膠實測。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"material.grease.density","value":3.4,"unit":"g/mL","evidence":"published_typical","basis":"TDS 典型值。","source_refs":["G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"material.grease.viscosity_reference","value":2500,"unit":"Pa.s","evidence":"derived","basis":"2500000 cP /1000；23°C、TF spindle、2rpm、Helipath。","source_refs":["G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.mass_rate","value":75,"unit":"g/min","evidence":"published_typical","basis":"75cc taper tip、90psi；完整幾何及溫度未知。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.pressure","value":90,"unit":"psi","evidence":"published_typical","basis":"原測試值；壓力位置與表壓/絕壓待確認。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.volume_rate","value":0.390625,"unit":"mL/s","evidence":"derived","basis":"75/3.2/60；不是新實測。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"scenario.temperature","value":23,"unit":"degC","evidence":"engineering_assumption","basis":"固定等溫開發基準；不宣稱是 910 原流率試驗溫度。","source_refs":["USER"],"sensitivity_range":[23,23],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"scenario.pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"虛擬氣壓式基準，明確選表壓；不作實機操作建議。","source_refs":["USER"],"sensitivity_range":[30,90],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"scenario.reference_pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"將 TDS 未完整交代的壓力映射到虛擬模型；映射本身是假設。","source_refs":["L910_TDS","USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.id","value":3.175,"unit":"mm","evidence":"engineering_assumption","basis":"借用指南 0.125in 尺度，虛擬等徑圓管；非原測試針嘴。","source_refs":["L910_GUIDE","USER"],"sensitivity_range":[2,4],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.length","value":10,"unit":"mm","evidence":"engineering_assumption","basis":"定義虛擬有效直管長 10mm，不由 7018555 總長反推。","source_refs":["USER"],"sensitivity_range":[5,20],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.reference_id","value":3.175,"unit":"mm","evidence":"engineering_assumption","basis":"固定正規化幾何；換現用針嘴時不能一併改此基準。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.reference_length","value":10,"unit":"mm","evidence":"engineering_assumption","basis":"固定正規化幾何。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.reference_rate","value":0.390625,"unit":"mL/s","evidence":"engineering_assumption","basis":"將 TDS 參考量映射到虛擬基準；非該幾何實測。","source_refs":["L910_TDS","USER"],"sensitivity_range":[0.1953125,0.78125],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.pressure_exponent","value":1,"unit":"1","evidence":"engineering_assumption","basis":"中性的線性壓力起點，不是 HB 的流動指數。","source_refs":["USER"],"sensitivity_range":[0.7,2],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.geometry_exponent_d","value":4,"unit":"1","evidence":"engineering_assumption","basis":"僅作等效牛頓圓管尺度比較；非真實 putty 的幾何律。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.geometry_exponent_L","value":-1,"unit":"1","evidence":"engineering_assumption","basis":"等效直管長度尺度比較。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"grease_proxy.constant_viscosity","value":2500,"unit":"Pa.s","evidence":"engineering_assumption","basis":"暫把單一測試黏度當等效常數；此用法未驗證。","source_refs":["G2500_TDS","USER"],"sensitivity_range":[625,10000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"grease_proxy.reference_rate","value":0.061906507721617925,"unit":"mL/s","evidence":"derived","basis":"虛擬等徑圓管的 Poiseuille 起算值；依上述未驗證常黏度。","source_refs":["USER","G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"derived_check_only","scope":"R75_grease","estimated_by":null,"validated_against_hardware":false},{"id":"r75.cartridge.nominal_volume","value":75,"unit":"mL","evidence":"published_typical","basis":"910 包材標稱容量。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75","estimated_by":null,"validated_against_hardware":false},{"id":"r75.cartridge.initial_fill","value":56,"unit":"mL","evidence":"published_typical","basis":"910 TDS 裝填；grease 配置沿用時屬另行虛擬裝填。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75_putty","estimated_by":null,"validated_against_hardware":false},{"id":"r75.grease.initial_fill","value":56,"unit":"mL","evidence":"engineering_assumption","basis":"為比較採相同虛擬裝填，不宣稱 grease 有此商品包裝。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.cartridge.bore","value":38,"unit":"mm","evidence":"engineering_assumption","basis":"配合 75mL 和已知外形選的虛擬內徑，非 Laird 圖面。","source_refs":["USER"],"sensitivity_range":[36,40],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.cartridge.unusable_residual","value":0.5,"unit":"mL","evidence":"engineering_assumption","basis":"先留少量不可用殘量，便於耗量結算。","source_refs":["USER"],"sensitivity_range":[0,2],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.adapter_dead_volume","value":5,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬氣帽/接頭死體積；首版不另外求解氣動壓縮。","source_refs":["USER"],"sensitivity_range":[1,15],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.hose_id","value":4,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬氣管幾何，不是供應商配件。","source_refs":["USER"],"sensitivity_range":[3,6],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.hose_length","value":1000,"unit":"mm","evidence":"engineering_assumption","basis":"設備旁配置的設計起點，不是量產標準。","source_refs":["USER"],"sensitivity_range":[500,2000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.delay","value":0.03,"unit":"s","evidence":"engineering_assumption","basis":"可觀察起膠延遲的原型種子；無實機證據。","source_refs":["USER"],"sensitivity_range":[0,0.1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.tau_on","value":0.15,"unit":"s","evidence":"engineering_assumption","basis":"整條鏈的合併建立時間常數；不再疊加假氣室或閥動態。","source_refs":["USER"],"sensitivity_range":[0.03,0.5],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.tau_off","value":0.1,"unit":"s","evidence":"engineering_assumption","basis":"整條鏈的合併停止時間常數；不等於實測停膠秒數。","source_refs":["USER"],"sensitivity_range":[0.02,0.4],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.initial_fill","value":300,"unit":"mL","evidence":"published_typical","basis":"910 TDS 實際裝填。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300_putty","estimated_by":null,"validated_against_hardware":false},{"id":"p300.grease.initial_fill","value":300,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬 300mL 裝填；grease 與 DM-22 實機適用性未確認。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.od","value":48.5,"unit":"mm","evidence":"engineering_assumption","basis":"位於設備外徑配對區間內，非實物尺寸。","source_refs":["DM22","USER"],"sensitivity_range":[47,50],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.bore","value":46,"unit":"mm","evidence":"engineering_assumption","basis":"搭配外徑及容量的自洽虛擬尺寸。","source_refs":["USER"],"sensitivity_range":[44,47],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.overall_length","value":220,"unit":"mm","evidence":"engineering_assumption","basis":"小於設備候選 <230mm 邊界，非包材圖面。","source_refs":["DM22","USER"],"sensitivity_range":[210,225],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.unusable_residual","value":3,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬不可用殘量。","source_refs":["USER"],"sensitivity_range":[0,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.id","value":12.7,"unit":"mm","evidence":"engineering_assumption","basis":"自訂 1/2in 內徑情境，不從 607 案例移植為 910 規格。","source_refs":["USER"],"sensitivity_range":[9.5,12.7],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory_geometry","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.length","value":1000,"unit":"mm","evidence":"engineering_assumption","basis":"自訂 1m 管路情境。","source_refs":["USER"],"sensitivity_range":[500,2000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory_geometry","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.initially_primed","value":true,"unit":"boolean","evidence":"engineering_assumption","basis":"起跑時管內已有材料；初始總存量須包含此部分，不能視為免費填管。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.adapter.wetted_dead_volume","value":2,"unit":"mL","evidence":"engineering_assumption","basis":"接頭、計量頭與其他未分解腔體的合併持膠量，不含已另計的軟管與針嘴；不是工程圖量測。","source_refs":["USER"],"sensitivity_range":[0,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.pcp.displacement","value":0.3,"unit":"mL/rev","evidence":"published_typical","basis":"25B192 排量；不是 Laird 升級頭已確認型號。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"p300.pcp.speed","value":60,"unit":"rpm","evidence":"engineering_assumption","basis":"低於候選額定上限的簡單起點；不是材料商建議配方。","source_refs":["USER"],"sensitivity_range":[20,120],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.pcp.volumetric_efficiency","value":1,"unit":"1","evidence":"engineering_assumption","basis":"理想滿腔、無滑漏；不冒稱量測效率。","source_refs":["USER"],"sensitivity_range":[0.7,1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.delay","value":0.02,"unit":"s","evidence":"engineering_assumption","basis":"計量鏈合併延遲種子，無實機依據。","source_refs":["USER"],"sensitivity_range":[0,0.1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.tau_on","value":0.08,"unit":"s","evidence":"engineering_assumption","basis":"計量鏈合併建立時間常數種子。","source_refs":["USER"],"sensitivity_range":[0.02,0.3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.tau_off","value":0.08,"unit":"s","evidence":"engineering_assumption","basis":"第一版與建立時間常數共同設定為0.08s，使用單一守恆輸送響應，避免各自設定造成總體積不一致。","source_refs":["USER"],"sensitivity_range":[0.02,0.3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.supply.air_pressure","value":20,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"只作架構圖顯示情境，不據此計算實際供料能力。","source_refs":["USER"],"sensitivity_range":[10,30],"range_kind":"engineering_scenarios_not_confidence_interval","role":"display_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.supply.pressure_ratio","value":22,"unit":"1","evidence":"published_typical","basis":"DM-22 名義壓力比，乘積不是流動中實測壓力。","source_refs":["DM22"],"sensitivity_range":null,"range_kind":null,"role":"display_only","scope":"P300","estimated_by":null,"validated_against_hardware":false},{"id":"p300.pcp.inlet_pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"入口顯示情境；不當已確認工作窗口，也不直接改變理想每轉量。","source_refs":["USER"],"sensitivity_range":[70,100],"range_kind":"engineering_scenarios_not_confidence_interval","role":"display_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.speed","value":100,"unit":"mm/s","evidence":"engineering_assumption","basis":"在參考平台量程內選擇便於觀察的速度。","source_refs":["USER"],"sensitivity_range":[25,150],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.acceleration","value":500,"unit":"mm/s^2","evidence":"engineering_assumption","basis":"虛擬梯形速度曲線，不是 E3/C300 實測加速度。","source_refs":["USER"],"sensitivity_range":[100,1000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.standoff","value":2,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬針距；首版作間隙檢查，不自動算擠壓與自由射流。","source_refs":["USER"],"sensitivity_range":[0.5,3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"clearance_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.lift_speed","value":20,"unit":"mm/s","evidence":"engineering_assumption","basis":"虛擬抬針速度；不據此預測拉絲。","source_refs":["USER"],"sensitivity_range":[5,50],"range_kind":"engineering_scenarios_not_confidence_interval","role":"kinematics_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.lift_distance","value":5,"unit":"mm","evidence":"engineering_assumption","basis":"點膠後抬升距離。","source_refs":["USER"],"sensitivity_range":[2,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"kinematics_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"job.line_length","value":100,"unit":"mm","evidence":"engineering_assumption","basis":"基準直線，位於兩個平台候選工作包絡內。","source_refs":["USER"],"sensitivity_range":[20,150],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"job.point_gate_duration","value":0.1,"unit":"s","evidence":"engineering_assumption","basis":"泛用 timed-gate 原型事件，不仿真 Graco 自動 Shot 的 PLC 時序。","source_refs":["USER"],"sensitivity_range":[0.05,1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"shape.line_height_to_width","value":0.5,"unit":"1","evidence":"engineering_assumption","basis":"半橢圓截面的幾何比例，非材料接觸角或保形量測。","source_refs":["USER"],"sensitivity_range":[0.25,0.75],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometric_illustration_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"shape.dot_height_to_width","value":0.25,"unit":"1","evidence":"engineering_assumption","basis":"球冠幾何比例，非材料/表面量測。","source_refs":["USER"],"sensitivity_range":[0.1,0.5],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometric_illustration_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"workpiece.width","value":150,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬平板。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"geometry_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"workpiece.depth","value":100,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬平板。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"geometry_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"numerics.initial_timestep","value":0.001,"unit":"s","evidence":"engineering_assumption","basis":"未實作求解器的起始步長規格；仍需步長收斂檢查。","source_refs":["USER"],"sensitivity_range":[0.0005,0.002],"range_kind":"engineering_scenarios_not_confidence_interval","role":"implementation_requirement","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"numerics.mass_balance_relative_tolerance","value":0.001,"unit":"1","evidence":"engineering_assumption","basis":"軟體數值質量平衡目標 0.1%，不是物理準確度。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"implementation_requirement","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"limits.x100_max_pressure","value":100,"unit":"psi","evidence":"published_limit","basis":"候選控制器額定上限，不代表整套配件相容。","source_refs":["X100"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"limits.pcp_max_rpm","value":300,"unit":"rpm","evidence":"published_limit","basis":"3A5364L 規格，不等於高填料實際可用上限。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"limits.pcp_max_working_pressure","value":290,"unit":"psi","evidence":"published_limit","basis":"不是已確認入口上限。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"common.nozzle.initially_primed","value":true,"unit":"boolean","evidence":"engineering_assumption","basis":"初始針嘴已充膠，針嘴容積列入初始總存量；不從當次膠筒重複扣除。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"all","estimated_by":"assistant","validated_against_hardware":false}]'),hd={temperature_dependence:{enabled:!1,reason:"固定23°C，未填假溫度敏感係數"},yield_and_thixotropy:{enabled:!1,reason:"完整物性保持未知，改以等效流量與合併響應"},wall_slip_and_friction_solver:{enabled:!1,reason:"不與合併動態重複計入"},hose_pressure_drop_and_starvation:{enabled:!1,reason:"P300 先用滿腔理想計量，壓力只顯示"},snuffback:{enabled:!1,reason:"第一版無回吸；開啟需另定義守恆、負流量與吸氣"},stringing_and_slump:{enabled:!1,reason:"幾何示意不宣稱材料恢復或斷絲"},compression_thermal_voids:{enabled:!1,reason:"後續階段"}},ud=[{id:"R75_PUTTY_ASSUMED",material:"Tputty 910 參考資料＋工程預設",architecture:"R75",flow_method_candidate:"normalized_reference_flow",hardware_compatibility:"unconfirmed"},{id:"R75_GREASE_ASSUMED",material:"Tgrease-2500 參考資料＋常黏度近似",architecture:"R75",flow_method_candidate:"virtual_newtonian_capillary",hardware_compatibility:"unconfirmed"},{id:"P300_PUTTY_IDEAL",material:"Tputty 910 密度＋理想 PCP",architecture:"P300",flow_method_candidate:"ideal_positive_displacement",hardware_compatibility:"unconfirmed"},{id:"P300_GREASE_IDEAL",material:"Tgrease-2500 密度＋理想 PCP",architecture:"P300",flow_method_candidate:"ideal_positive_displacement",hardware_compatibility:"unconfirmed_grease_viscosity_application"}],Vn={schema_version:nd,created_date:id,stage:sd,implementation_authorized:rd,manufacturer_response_required_to_start_assumption_prototype:ad,global_label:od,sources:cd,parameters:ld,features:hd,profiles:ud},Ea=2e4;function dd(s){const e={shape:"rectangle",pattern:"serpentine",offsetX:0,offsetY:0,spacing:5,edgeInset:2,spiralShape:"auto",spiralDirection:"outside-in",...s};e.shape==="circle"&&(e.depth=e.width);for(const h of["width","depth","offsetX","offsetY","spacing","edgeInset"])if(!Number.isFinite(e[h]))throw new Error(`${h} 必須是有限數值`);if(!["rectangle","circle"].includes(e.shape))throw new Error("熱源形狀不支援");if(!["point","line","n","serpentine","spiral","perimeter"].includes(e.pattern))throw new Error("點膠路徑不支援");if(!["auto","round","square"].includes(e.spiralShape))throw new Error("螺旋形狀不支援");if(!["outside-in","inside-out"].includes(e.spiralDirection))throw new Error("螺旋方向不支援");const t=e.shape==="circle"?e.width:e.depth;if(e.width<=0||t<=0||e.width>1e3||t>1e3)throw new Error("熱源尺寸需介於 0 與 1000 mm");if(e.spacing<.2||e.spacing>1e3)throw new Error("路徑間距需介於 0.2 與 1000 mm");if(e.edgeInset<0||e.edgeInset>=Math.min(e.width,t)/2)throw new Error("邊界內縮須小於熱源最短尺寸的一半");const n=e.width/2-e.edgeInset,i=t/2-e.edgeInset,r=e.spiralShape==="auto"?e.shape==="circle"?"round":"square":e.spiralShape,a=[],o=(h,u)=>{h+=e.offsetX,u+=e.offsetY;const d=a.at(-1);if(!(d&&Math.hypot(h-d.x,u-d.y)<1e-9)){if(a.length>=Ea)throw new Error("路徑點數過多，請增加間距或縮小熱源");a.push({x:h,y:u})}};if(e.pattern==="point")o(0,0);else if(e.pattern==="line")o(-n,0),o(n,0);else if(e.pattern==="n"){const h=e.shape==="circle"?n/Math.SQRT2:n,u=e.shape==="circle"?n/Math.SQRT2:i;o(-h,-u),o(-h,u),o(h,-u),o(h,u)}else if(e.pattern==="serpentine"){const h=Math.max(1,Math.floor(2*i/e.spacing)+1);if(h*2>Ea)throw new Error("蛇形路徑點數過多，請增加間距");for(let u=0;u<h;u++){const d=(u-(h-1)/2)*e.spacing,f=e.shape==="circle"?Math.sqrt(Math.max(0,n*n-d*d)):n;u%2===0?(o(-f,d),o(f,d)):(o(f,d),o(-f,d))}}else if(e.pattern==="perimeter")if(e.shape==="rectangle")o(-n,-i),o(n,-i),o(n,i),o(-n,i),o(-n,-i);else{const h=Math.max(16,Math.ceil(2*Math.PI*n/1));if(h+1>Ea)throw new Error("路徑點數過多，請縮小熱源");for(let u=0;u<=h;u++){const d=2*Math.PI*u/h;o(n*Math.cos(d),n*Math.sin(d))}}else if(r==="square"){const h=e.shape==="circle"?n/Math.SQRT2:n,u=e.shape==="circle"?n/Math.SQRT2:i;let d=-h,f=h,g=-u,_=u;for(o(d,g);o(f,g),g+=e.spacing,!(g>_||(o(f,_),f-=e.spacing,f<d)||(o(d,_),_-=e.spacing,_<g)||(o(d,g),d+=e.spacing,d>f)););o(0,0)}else{const h=Math.min(n,i),u=2*Math.PI*h/e.spacing;let d=0;for(o(h,0);d<u;){const f=Math.max(0,h-e.spacing*d/(2*Math.PI));d=Math.min(u,d+Math.min(.18,1/Math.max(1,f)));const g=d===u?0:Math.max(0,h-e.spacing*d/(2*Math.PI));o(g*Math.cos(d),g*Math.sin(d))}a[a.length-1]={x:e.offsetX,y:e.offsetY}}if(!a.length)throw new Error("無法生成點膠路徑");e.pattern==="spiral"&&e.spiralDirection==="inside-out"&&a.reverse();const c=[0];let l=0;for(let h=1;h<a.length;h++)l+=Math.hypot(a[h].x-a[h-1].x,a[h].y-a[h-1].y),c.push(l);return{shape:e.shape,pattern:e.pattern,width:e.width,depth:t,offsetX:e.offsetX,offsetY:e.offsetY,edgeInset:e.edgeInset,spacing:e.spacing,spiralShape:e.spiralShape,effectiveSpiralShape:r,spiralDirection:e.spiralDirection,points:a,cumulative:c,length:l,units:"mm",evidence:"engineering_assumption",note:"幾何候選；未校準流量、轉角速度、點膠寬度、排氣或實際壓合。"}}function _c(s,e){if(!Number.isFinite(e))throw new Error("路徑距離必須是有限數值");if(s.points.length===1)return{...s.points[0],tx:0,ty:0};const t=Math.max(0,Math.min(s.length,e));let n=1,i=s.points.length-1;for(;n<i;){const l=Math.floor((n+i)/2);s.cumulative[l]<t?n=l+1:i=l}const r=s.points[n-1],a=s.points[n],o=s.cumulative[n]-s.cumulative[n-1],c=o?(t-s.cumulative[n-1])/o:0;return{x:r.x+(a.x-r.x)*c,y:r.y+(a.y-r.y)*c,tx:(a.x-r.x)/o,ty:(a.y-r.y)/o}}function xs(s,e,t){const n=Math.min(e,Math.sqrt(s*t)),i=n/t,r=n>0?Math.max(0,(s-n*n/t)/n):0,a=2*i+r,o=n*i/2;return{kind:"single",length:s,duration:a,peak:n,ramp:i,cruise:r,at(c){if(c<=0)return{x:0,v:0};if(c>=a)return{x:s,v:0};if(c<i)return{x:.5*t*c*c,v:t*c};if(c<i+r)return{x:o+n*(c-i),v:n};const l=a-c;return{x:s-.5*t*l*l,v:t*l}},timeAt(c){return fd(this,s,t,c)}}}function fd(s,e,t,n){const i=Math.max(0,Math.min(e,n)),r=s.peak*s.ramp/2;return i<=r?Math.sqrt(2*i/t):i>=e-r?s.duration-Math.sqrt(2*(e-i)/t):s.ramp+(i-r)/s.peak}function pd(s,e,t,n,i){const r=-(s.x*e.x+s.y*e.y);if(r<=-.999999)return i;if(r>=.999999)return 0;const a=Math.sqrt(.5*(1-r));return Math.min(i,Math.sqrt(t*n*a/(1-a)))}function md(s,{speed:e,acceleration:t,deviation:n}){const i=[];for(let g=1;g<s.length;g++){const _=s[g].x-s[g-1].x,m=s[g].y-s[g-1].y,p=Math.hypot(_,m);p>1e-12&&i.push({length:p,u:{x:_/p,y:m/p}})}const r=i.length;if(!r)return xs(0,e,t);if(r===1)return xs(i[0].length,e,t);const a=new Float64Array(r+1);for(let g=1;g<r;g++)a[g]=pd(i[g-1].u,i[g].u,t,n,e);a[0]=0,a[r]=0;for(let g=r-1;g>=0;g--)a[g]=Math.min(a[g],Math.sqrt(a[g+1]**2+2*t*i[g].length));for(let g=0;g<r;g++)a[g+1]=Math.min(a[g+1],Math.sqrt(a[g]**2+2*t*i[g].length));let o=0,c=0,l=e,h=0;for(let g=0;g<r;g++){const _=i[g],m=a[g],p=a[g+1],x=Math.max(m,p,Math.min(e,Math.sqrt((2*t*_.length+m*m+p*p)/2))),y=Math.max(0,(x*x-m*m)/(2*t)),v=Math.max(0,(x*x-p*p)/(2*t)),E=Math.max(0,_.length-y-v);Object.assign(_,{v0:m,v1:p,vp:x,d1:y,d2:E,d3:v,t1:(x-m)/t,t2:x>0?E/x:0,t3:(x-p)/t,start:o,distance:c}),_.duration=_.t1+_.t2+_.t3,o+=_.duration,c+=_.length,g>0&&m<e-1e-9&&(h++,l=Math.min(l,m))}const u=o,d=c,f=(g,_)=>{let m=0,p=r-1;for(;m<p;){const x=Math.ceil((m+p)/2);i[x][g]<=_?m=x:p=x-1}return i[m]};return{kind:"polyline",length:d,duration:u,peak:Math.max(...i.map(g=>g.vp)),corners:h,slowestCorner:h?l:null,junctions:Array.from(a),at(g){if(g<=0)return{x:0,v:0};if(g>=u)return{x:d,v:0};const _=f("start",g),m=Math.min(_.duration,g-_.start);if(m<_.t1)return{x:_.distance+_.v0*m+.5*t*m*m,v:_.v0+t*m};if(m<_.t1+_.t2)return{x:_.distance+_.d1+_.vp*(m-_.t1),v:_.vp};const p=m-_.t1-_.t2;return{x:_.distance+_.d1+_.d2+_.vp*p-.5*t*p*p,v:Math.max(0,_.vp-t*p)}},timeAt(g){const _=Math.max(0,Math.min(d,g));if(_>=d)return u;const m=f("distance",_),p=Math.min(m.length,_-m.distance);if(p<=m.d1)return m.start+(Math.sqrt(m.v0*m.v0+2*t*p)-m.v0)/t;if(p<=m.d1+m.d2)return m.start+m.t1+(p-m.d1)/m.vp;const x=p-m.d1-m.d2;return m.start+m.t1+m.t2+(m.vp-Math.sqrt(Math.max(0,m.vp*m.vp-2*t*x)))/t}}}const Jc="sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf",Zi="sources/Laird/Tputty910_TDS_20250422_RevC.pdf",Ji="sources/Laird/Tgrease2500_TDS_20250627.pdf",gd="Nagrani et al., J. Rheol. 67 (2023), doi:10.1122/8.0000679（arXiv 2304.12104）",Es=Object.freeze([{id:"putty_proxy.pressure_exponent",value:2.7,unit:"1",evidence:"derived",role:"氣壓 → 流率的冪次 m（流動指數 n≈1/m）",basis:"以 Laird A18720-00 Rev A 第 5 頁「75cc cartridge、0.125 in nozzle」Tputty 910 流率—氣壓曲線，300 dpi 數位讀圖 20–100 psi 對數擬合 m=2.73（各點誤差約 2% 內）；取 2.7。曲線縱軸單位（cc/min）與 TDS（g/min）仍待 Laird 確認，故只採用曲線「形狀」，90 psi 的量值仍沿用 TDS 75 g/min。取代 v0.3 的中性線性假設 m=1。",source_refs:[Jc,Zi],supersedes:"v0.3 value 1 (engineering_assumption)"},{id:"material.putty.conductivity",value:9.1,unit:"W/(m·K)",evidence:"published_typical",role:"熱阻估算",basis:"TDS Rev C：9.1 W/mK，Hot Disk。",source_refs:[Zi]},{id:"material.putty.min_bond_line",value:.18,unit:"mm",evidence:"published_typical",role:"間隙下限提醒",basis:"TDS Rev C：Minimum Bond Line Thickness 180 µm（Laird Method）。",source_refs:[Zi]},{id:"material.putty.contact_resistance",value:.11,unit:"°C·cm²/W",evidence:"derived",role:"熱阻估算的兩側接觸熱阻合計",basis:"TDS Rev C：1.5 mm、80°C／40 psi 熱阻 1.76 °C·cm²/W（ASTM D5470）。扣除體積項 1.5 mm ÷ 9.1 W/mK = 1.65 °C·cm²/W，得接觸項約 0.11。假設該試片厚度即 1.5 mm 且導熱率不隨壓縮改變。",source_refs:[Zi]},{id:"material.grease.conductivity",value:3.8,unit:"W/(m·K)",evidence:"published_typical",role:"熱阻估算",basis:"TDS 2025-06-27：3.8 W/m-K，Hot Disk；A14259-09 料號頁另列 3.50，未取平均。",source_refs:[Ji]},{id:"material.grease.min_bond_line",value:.05,unit:"mm",evidence:"published_typical",role:"間隙下限提醒",basis:"TDS 2025-06-27：Minimum Bondline Thickness 50 µm（Laird Test Method）。",source_refs:[Ji]},{id:"material.grease.contact_resistance",value:.02,unit:"°C·cm²/W",evidence:"derived",role:"熱阻估算的兩側接觸熱阻合計",basis:"TDS：10 psi & 70°C 熱阻 0.15 °C·cm²/W（ASTM D5470）。若試片 BLT 為最小 50 µm，體積項 0.05 mm ÷ 3.8 = 0.13，接觸項約 0.02；TDS 未列試片 BLT，此推算不確定。",source_refs:[Ji]},{id:"material.grease.packaging",value:"50cc syringe／600cc cartridge",unit:"",evidence:"published_typical",role:"包材提示",basis:"TDS 列 50cc 針筒（A14399-03）與 600cc 膠筒（A14259-10）；本模擬的 75 mL／300 mL grease 裝填仍是虛擬比較配置。",source_refs:[Ji]},{id:"assembly.gap",value:.5,unit:"mm",evidence:"engineering_assumption",role:"壓合目標間隙預設",basis:"AI 初估：Tputty 910 為 gap filler（TDS 最小 BLT 0.18 mm、熱阻量測於 1.5 mm），0.5 mm 位於常見 RRU 元件—腔體間隙範圍內；v0.6 的 0.20 mm 太接近最小 BLT。Tgrease 屬薄 BLT 用途，請改小。",source_refs:[Zi,Ji],supersedes:"v0.6 value 0.20 (engineering_assumption)"},{id:"squeeze.air_model",value:"compressible",unit:"",evidence:"engineering_assumption",since:"1.1",role:"壓合時被膠包圍的空氣",basis:"等溫理想氣體 pV = 常數；氣泡壓力與膜壓聯立隱式求解，氣/膠介面可雙向移動（氣泡隨膠流遷移，理想條件下約為膠流速度兩倍，Taylor & Saffman 1959），膠牆排空時氣泡接通大氣即排出。取代 v1.0「被包圍即凍結」的剛性牆；剛性牆與全部排出保留為對照選項。",source_refs:["Taylor & Saffman, Q. J. Mech. Appl. Math. 12 (1959) 265"],supersedes:"v1.0 rigid trapped air (engineering_assumption)"},{id:"squeeze.press_force",value:10,unit:"kgf",evidence:"engineering_assumption",since:"1.1",role:"透明板定力壓合到墊片",basis:"AI 初估：手壓或簡易治具量級。壓合時間與壓合中的氣泡壓縮隨之改變；墊片定位後的最終回脹主要由降伏應力決定，對此值較不敏感。下降速度上限另取 1 mm/s（AI 初估）。",source_refs:[]},{id:"material.putty.squeeze_viscosity",value:7e3,unit:"Pa·s",evidence:"derived",since:"1.1",role:"壓合等效牛頓黏度",basis:"由 90 psi、75 g/min（÷3.2 g/cc）與冪律 m = 2.7（n ≈ 0.37）在虛擬針嘴 Ø3.175 × 10 mm 反推 K ≈ 7.3×10³ Pa·sⁿ，取 1 s⁻¹ 視黏度約 7000 Pa·s（壓合剪切率約 1–5 s⁻¹）。假設 90 psi 全部落在針嘴、未扣除膠筒壓降，偏高；未含剪切稀化。",source_refs:[Zi,Jc]},{id:"material.grease.squeeze_viscosity",value:2500,unit:"Pa·s",evidence:"published_typical",since:"1.1",role:"壓合等效牛頓黏度",basis:"TDS 2,500,000 cP（23 °C、TF spindle 2 rpm、Helipath），與設備頁的常黏度相同並隨之變動。單點黏度，未含剪切稀化。",source_refs:[Ji]},{id:"material.yield_stress",value:"putty 200 / grease 50",unit:"Pa",evidence:"engineering_assumption",since:"1.1",role:"墊片定位後擋住氣泡回脹（Bingham：Δp = 2τy·L/h）",basis:"AI 初估，廠商未公開。公開文獻量測 DOWSIL TC-5550 σy ≈ 7–10 Pa、TC-5622 σy ≈ 30 Pa；Tgrease 2500 黏度高約一個數量級故取 50 Pa，Tputty 910 為可保持膠形的 putty 取 200 Pa。以 L = 5 mm、間隙 0.5 mm 計僅擋住 1–4 kPa，故模型預測墊片壓合後氣泡幾乎回脹到 1 atm 體積。",source_refs:[gd]},{id:"thermal.power",value:25,unit:"W",evidence:"engineering_assumption",role:"溫升估算",basis:"AI 初估：5G RRU 功放／FPGA 類單顆元件量級；請改為實際功耗。",source_refs:[]}]),_d=new Set(Es.map(s=>s.id));function Dh(s){if(s.__v1)return s;const e=[...s.parameters.filter(t=>!_d.has(t.id)),...Es];return{...s,parameters:e,update_version:"1.0",__v1:!0}}function Qc(s,e){var t;return(t=Dh(s).parameters.find(n=>n.id===e))==null?void 0:t.value}const gr="1.1.0",_a="工程假設／未經實機校準",xo=32,or={id:"ending.shutoff_distance",value:10,unit:"mm",evidence:"engineering_assumption",basis:"AI 初始比較值：預設 100 mm 路徑、100 mm/s、500 mm/s² 對應提前 200 ms 關膠。不是原廠配方；速度或路徑改變後提前時間也會改變。",source_refs:["16_收尾積膠原因與影片比對.md"]},vc=[["endMotion","vertical","","垂直抬針；提供斜退及先升再退，單點僅垂直。"],["endDwell",.1,"s","到達終點後停留 100 ms 再離開；不是從提前關膠時刻起算。"],["backtrackDistance",2,"mm","沿原直線反向回退 2 mm；垂直模式及單點不使用。"],["backtrackSpeed",20,"mm/s","回退速度上限；抬針與回退共用設定加速度。"],["reverseRpm",30,"rpm","理想 PCP 反轉參考轉速；僅回收未出嘴的暫存量。"],["reverseDuration",0,"s","反轉預設關閉；手動比較初值 0.05 s，不能視為原廠配方。"]].map(([s,e,t,n])=>({id:`ending.${s}`,key:s,value:e,unit:t,evidence:"engineering_assumption",basis:n,source_refs:["18_v0.3收尾動作與體積分帳.md"]})),xc=[{id:"motion.corner_mode",key:"cornerMode",value:"junction",unit:"",evidence:"engineering_assumption",basis:"多段路徑在轉角依 junction deviation 規則降速（CNC 韌體常見作法）；可切回 v0.7「整條弧長單一加減速、轉角不減速」作對照。不是特定機台控制器。",source_refs:["22_v1.0接手全面修正與驗證.md"]},{id:"motion.junction_deviation",key:"junctionDeviation",value:.05,unit:"mm",evidence:"engineering_assumption",basis:"AI 初估：常見 CNC 韌體 0.01–0.05 mm。數值越小轉角越慢、轉角積膠越多；需依實際機台軌跡設定校準。",source_refs:["22_v1.0接手全面修正與驗證.md"]}],Ih=()=>Object.fromEntries(vc.map(s=>[s.key,s.value])),Nh=()=>Object.fromEntries(xc.map(s=>[s.key,s.value]));function Uh(s,e="putty",t="R75"){const n=Object.fromEntries(Dh(s).parameters.map(o=>[o.id,o.value])),i=o=>n[o],r=t==="P300",a=r?"p300":"r75";return{material:e,architecture:t,profile:r?`P300_${e==="putty"?"PUTTY":"GREASE"}_IDEAL`:`R75_${e==="putty"?"PUTTY":"GREASE"}_ASSUMED`,density:i(`material.${e}.density`),viscosity:i("grease_proxy.constant_viscosity"),pressure:i("scenario.pressure"),referencePressure:i("scenario.reference_pressure"),referenceRate:i("putty_proxy.reference_rate"),pressureExponent:i("putty_proxy.pressure_exponent"),diameter:i("virtual_nozzle.id"),nozzleLength:i("virtual_nozzle.length"),referenceDiameter:i("virtual_nozzle.reference_id"),referenceLength:i("virtual_nozzle.reference_length"),rpm:i("p300.pcp.speed"),displacement:i("p300.pcp.displacement"),efficiency:i("p300.pcp.volumetric_efficiency"),delay:i(`${a}.dynamic.delay`),tauOn:i(`${a}.dynamic.tau_on`),tauOff:i(`${a}.dynamic.tau_off`),fill:i(`${a}.${e==="grease"?"grease":"cartridge"}.initial_fill`),residual:i(`${a}.cartridge.unusable_residual`),hoseId:i("p300.hose.id"),hoseLength:i("p300.hose.length"),deadVolume:i("p300.adapter.wetted_dead_volume"),speed:i("motion.speed"),acceleration:i("motion.acceleration"),standoff:i("motion.standoff"),liftSpeed:i("motion.lift_speed"),liftDistance:i("motion.lift_distance"),mode:"line",lineLength:i("job.line_length"),gateDuration:i("job.point_gate_duration"),shutoffDistance:or.value,lineRatio:i("shape.line_height_to_width"),dotRatio:i("shape.dot_height_to_width"),width:i("workpiece.width"),depth:i("workpiece.depth"),thickness:5,fixtureHeight:8,surfaceZ:13,offsetX:0,offsetY:0,timestep:i("numerics.initial_timestep"),cellSize:.5,workpieceKind:"plate",workpieceFile:null,...Ih(),...Nh()}}function vd(s){if(s.architecture==="P300")return s.displacement*s.rpm*s.efficiency/60;if(s.material==="putty"){const e=s.pressureExponent;return s.referenceRate*(Math.max(s.pressure,0)/s.referencePressure)**e*(s.diameter/s.referenceDiameter)**(3+e)*(s.referenceLength/s.nozzleLength)**e}return Math.PI*(s.diameter/1e3)**4*(Math.max(s.pressure,0)*6894.757293168)/(128*s.viscosity*s.nozzleLength/1e3)*1e6}function yo(s,e,t,n,i,r){const a=s-n;if(a<=0||e===0||t<=0)return{q:0,volume:0};const o=Math.min(a,t),c=-Math.expm1(-o/i);let l=e*(o-i*c),h=e*c;if(a>t){const u=a-t;l+=h*r*-Math.expm1(-u/r),h*=Math.exp(-u/r)}return{q:h,volume:l}}function xd(s,e,t,n,i,r,a){const o=yo(s,e,t,n,i,i),c=t+n;if(s<=c||r<=0||a<=0||t<=0)return{...o,recovered:0,reverseActive:!1};const l=yo(c,e,t,n,i,i),h=Math.max(0,e*t-l.volume),u=i*Math.log1p(h/(r*i)),d=s-c,f=Math.min(d,a,u),g=r*f,_=Math.max(0,(h+r*i)*Math.exp(-f/i)-r*i)*Math.exp(-(d-f)/i);return{q:_/i,volume:l.volume+h-g-_,recovered:g,reverseActive:d<Math.min(a,u)}}function yd(s,e,t){const n=s.endMotion==="legacy",i=s.mode==="line"&&["diagonal","liftThenBack"].includes(s.endMotion)?Math.min(s.backtrackDistance,s.lineLength):0,r=n?t:e+s.endDwell,a=xs(s.liftDistance,s.liftSpeed,s.acceleration),o=i>0?xs(i,s.backtrackSpeed,s.acceleration):null,c=s.endMotion==="diagonal"&&i>0,l=Math.hypot(i,s.liftDistance),h=c?xs(l,Math.min(s.liftSpeed*l/s.liftDistance,s.backtrackSpeed*l/i),s.acceleration):null,u=r+(n?s.liftDistance/s.liftSpeed:h?h.duration:a.duration+(o?o.duration:0));return{start:r,end:u,back:i,at(d){const f=Math.max(0,d-r);if(n)return{back:0,lift:Math.min(s.liftDistance,f*s.liftSpeed),vx:0,vz:d>r&&d<u?s.liftSpeed:0,phase:"垂直抬針"};if(h){const m=h.at(f);return{back:m.x*i/l,lift:m.x*s.liftDistance/l,vx:-m.v*i/l,vz:m.v*s.liftDistance/l,phase:"斜退抬針"}}const g=a.at(f),_=o?o.at(f-a.duration):{x:0,v:0};return{back:_.x,lift:g.x,vx:-_.v,vz:g.v,phase:f<a.duration?"垂直抬針":"抬高後回退"}}}}const Md={pressure:[0,100],diameter:[.2,8],nozzleLength:[1,100],rpm:[0,300],efficiency:[0,1],density:[.1,10],viscosity:[1,1e5],referenceRate:[0,10],pressureExponent:[.1,4],delay:[0,2],tauOn:[.001,2],tauOff:[.001,2],fill:[0,500],residual:[0,500],hoseId:[1,25],hoseLength:[0,5e3],speed:[1,800],acceleration:[1,1e4],standoff:[.1,20],lineLength:[1,250],gateDuration:[.001,10],shutoffDistance:[0,250],lineRatio:[.05,2],dotRatio:[.05,.5],width:[1,1e3],depth:[1,1e3],thickness:[.1,200],fixtureHeight:[0,100],timestep:[1e-4,.01],cellSize:[.1,5],liftSpeed:[.1,200],liftDistance:[.1,50],endDwell:[0,5],backtrackDistance:[0,50],backtrackSpeed:[.1,200],reverseRpm:[0,300],reverseDuration:[0,2],junctionDeviation:[.001,5]};function bd(s){for(const[e,t]of Object.entries(s))if(typeof t=="number"&&!Number.isFinite(t))throw new Error(`${e} 必須是有限數值`);for(const[e,[t,n]]of Object.entries(Md))if(s[e]<t||s[e]>n)throw new Error(`${e} 超出原型允許範圍 ${t}–${n}`);if(s.residual>s.fill)throw new Error("不可用殘量不能大於裝填量");if(s.architecture==="P300"&&Math.abs(s.tauOn-s.tauOff)>1e-12)throw new Error("PCP 必須共用起停時間常數，以保持計量守恆");if(!["line","point","pattern"].includes(s.mode))throw new Error("未知路徑模式");if(s.mode==="pattern"&&(!s.pathSettings||typeof s.pathSettings!="object"))throw new Error("請先設定熱源與路徑");if(!["vertical","diagonal","liftThenBack","legacy"].includes(s.endMotion))throw new Error("未知收尾動作");if(!["junction","off"].includes(s.cornerMode))throw new Error("未知轉角速度模式");if(s.architecture!=="P300"&&s.reverseDuration>0)throw new Error("氣壓式未提供 PCP 反轉回吸；請改用下降時間常數比較卸壓響應")}function la(s,e){const t=Math.cbrt(1e3*s*3/(Math.PI*e*(3+4*e*e)));return{radius:t,height:2*e*t}}function yc(s,e,t){const n=s.length,i=new Float64Array(n+1),r=new Float64Array(n+1);let a=0,o=0;for(const u of s)a+=u*1e3;for(let u=1;u<n;u++)i[u]=Math.sqrt(4*1e3*(s[u-1]+s[u])/(2*e*Math.PI*t));for(let u=0;u<n;u++)o+=xo*Math.sin(Math.PI/xo)*t/4*e*(i[u]**2+i[u]*i[u+1]+i[u+1]**2)/3;const c=o>0?Math.sqrt(a/o):0;let l=0,h=0;for(let u=0;u<=n;u++)i[u]*=c,r[u]=i[u]*t,r[u]>l&&(l=r[u]),i[u]>h&&(h=i[u]);return{widths:i,heights:r,volumeMm3:a,maxHeight:l,maxWidth:h}}function Sd(s,e,t){return s.mode==="point"?null:e&&s.cornerMode==="junction"&&e.points.length>2?md(e.points,{speed:s.speed,acceleration:s.acceleration,deviation:s.junctionDeviation}):xs(t,s.speed,s.acceleration)}function ha(s){const e={...Ih(),...Nh(),endMotion:"legacy",shutoffDistance:0,...structuredClone(s)};bd(e);const t=vd(e),n=e.architecture==="P300",i=e.fill-e.residual,r=e.mode==="pattern"?dd(e.pathSettings):null;if(r&&r.length<=1e-9)throw new Error("圖樣路徑沒有長度；單點請使用單點模式");const a=r?r.length:e.lineLength,o=e.mode!=="point",c=Sd(e,r,a),l=o?Math.min(e.shutoffDistance,a):0,h=o?c.timeAt(a-l):e.gateDuration,u=n&&t>0?Math.min(h,i/t):h,d=o?c.duration:h,f=Math.max(d,h+e.delay+20*Math.max(e.tauOn,e.tauOff)),g=n&&e.reverseRpm>0&&e.reverseDuration>0,_=g?u+e.reverseDuration:null,m=g?_+e.delay:null,p=yd(r?{...e,mode:"line",lineLength:a}:e,d,f),x=Math.max(f,p.end,m??0);if(x>180)throw new Error("試驗超過 180 秒，請縮短路徑或提高速度");const y=Math.PI*e.diameter**2/4*(e.nozzleLength/1e3)+(n?Math.PI*e.hoseId**2/4*(e.hoseLength/1e3)+e.deadVolume:0),v=e.fill+y,E=-e.diameter/2,w=a+e.diameter;let A=e.mode==="point"?1:Math.max(2,Math.ceil(w/e.cellSize));const D=A;if(r){const Xe=Math.max(2,Math.floor(5e6/(Math.ceil(x/.01)+2)));A=Math.min(A,Xe,2e4)}const b=w/A,S=new Float64Array(A),I=[];let U=0,G=0;const q=e.displacement*e.reverseRpm*e.efficiency/60,te=Xe=>{const N=n?xd(Xe,t,u,e.delay,e.tauOn,q,e.reverseDuration):yo(Xe,t,h,e.delay,e.tauOn,e.tauOff),Ne=n?N.volume:Math.min(i,N.volume),Le=n?t*Math.min(Xe,u):Ne,Ce=N.recovered||0,ce=n?Math.max(0,Le-Ne-Ce):0,Be=Math.max(e.residual,e.fill-Le),me=o?c.at(Xe):{x:0,v:0},Ie=p.at(Xe),et=me.v+Ie.vx,Ke=me.x-Ie.back,R=r?_c(r,Ke):null,M=R?R.x:e.offsetX+(e.mode==="line"?Ke-e.lineLength/2:0),k=R?R.y:e.offsetY,Q=g&&Xe>=u&&Xe<_,se=g&&Xe>=u+e.delay&&Xe<m,Y=Xe<u?"點膠中":Xe<d?"收尾移動（已關膠）":Xe<p.start?e.endMotion==="legacy"?"舊版尾膠等待":"終點停留":Xe<p.end?Ie.phase:Xe<x?Q||se?"動作完成／反轉指令與尾膠記帳":"動作完成／尾膠記帳":"完成";return{t:Xe,q:!n&&N.volume>=i?0:N.q,target:Xe<u?t:0,command:Xe<u?1:0,output:Ne,mass:Ne*e.density,metered:Le,pending:ce,recovered:Ce,reverseActive:!!N.reverseActive,reverseRecoveryActive:!!N.reverseActive,reverseCommandActive:Q,reverseResponseActive:se,remaining:Be,fixed:y,initial:v,s:Ke,x:M,y:k,z:e.surfaceZ+e.standoff+Ie.lift,speed:Math.hypot(et,Ie.vz),vx:R?et*R.tx:et,vy:R?et*R.ty:0,vz:Ie.vz,phase:Y,balance:v-(Be+y+ce+Ce+Ne)}},W=te(p.start).output,oe=Math.ceil(x/e.timestep),X=e.endMotion==="legacy";for(let Xe=0;Xe<=oe;Xe++){const N=Math.min(x,Xe*e.timestep),Ne=te(N),Le=o?c.at(Math.max(0,N-e.timestep/2)).x:0;Ne.deposited=X?Ne.output:Math.min(Ne.output,W),Ne.offSurface=Math.max(0,Ne.output-Ne.deposited),Ne.depositionBalance=Ne.output-Ne.deposited-Ne.offSurface;const Ce=Math.max(0,Ne.deposited-(X?U:Math.min(U,W)));if(e.mode==="point")S[0]+=Ce;else if(Ce>0){const ce=Math.max(e.diameter/2,b),Be=Math.floor((Le-E)/b),me=Math.ceil(ce/b)+1,Ie=[];let et=0;for(let Ke=Math.max(0,Be-me);Ke<=Math.min(A-1,Be+me);Ke++){const R=Math.max(0,1-Math.abs(E+(Ke+.5)*b-Le)/ce);R&&(Ie.push([Ke,R]),et+=R)}for(const[Ke,R]of Ie)S[Ke]+=Ce*R/et}U=Ne.output,(N+1e-9>=G||Xe===oe)&&(I.push({...Ne,deposits:Float64Array.from(S)}),G+=.01)}const fe=o?yc(S,b,e.lineRatio):null,Se=fe?fe.maxHeight:la(S[0],e.dotRatio).height,Ee=I.at(-1),Ae=[],at=Math.max(0,Ee.output-te(d).output),We=(Xe,N)=>{let Ne=0;for(let Le=0;Le<A;Le++){const Ce=E+Le*b;Ne+=S[Le]*Math.max(0,Math.min(N,Ce+b)-Math.max(Xe,Ce))/b}return Ne/(N-Xe)},it=Math.min(5,a/5),ne=We(a*.4,a*.6),ie=o&&ne>1e-12?We(a-it,a)/ne:null,Re={movementEnd:d,commandOff:u,effectiveShutoffDistance:l,leadTime:d-h,afterStopVolume:at,afterStopPercent:Ee.output>0?at/Ee.output*100:0,endWindowMm:it,endToMiddleRatio:ie,liftStart:p.start,motionEnd:p.end,accountingEnd:x,effectiveBacktrack:p.back,offSurfaceVolume:Ee.offSurface,depositedVolume:Ee.deposited,recoveredVolume:Ee.recovered,reverseCommandStart:g?u:null,reverseCommandEnd:_,reverseStart:g?u+e.delay:null,reverseResponseEnd:m,reverseRequestedVolume:n?q*e.reverseDuration:0},ge=c?{kind:c.kind,duration:c.duration,peak:c.peak,corners:c.corners||0,slowestCorner:c.slowestCorner??null,averageSpeed:a/c.duration}:null;Ee.offSurface>1e-9&&Ae.push("離面後仍有出膠，另列形狀未定量；未預測拉絲、滴落或落點，不加入工件膠形。"),o&&e.backtrackDistance>a&&p.back>0&&Ae.push("回退距離已限制在原直線長度內。"),e.mode==="point"&&["diagonal","liftThenBack"].includes(e.endMotion)&&Ae.push("單點沒有路徑方向，收尾使用垂直抬針。"),n&&e.reverseDuration>0&&Ae.push("PCP 反轉僅為暫存回收近似，回收量獨立記帳；不移除已沉積材料、不保證真實斷絲。"),Re.reverseRequestedVolume>Ee.recovered+1e-9&&Ae.push("反轉指令超過可回收暫存量，剩餘指令不再移除材料；負壓、吸氣與下一次開膠尚未計算。"),o&&e.shutoffDistance>=a&&Ae.push("提前關膠距離達到或超過路徑長度，本次不開膠；請縮短提前距離。"),o&&ie!==null&&ie<.5&&Ae.push("末段平均截面低於中段一半，可能欠膠；此比較門檻為 AI 初估，不是產品驗收標準。"),o&&ie!==null&&ie>1.5&&Ae.push("末段平均截面高於中段 1.5 倍，可能積膠；此比較門檻為 AI 初估，不是產品驗收標準。"),Se>e.standoff&&Ae.push("簡化膠形高於針距，可能干涉；尚未計算壓扁或拉絲。"),e.material==="putty"&&!n&&Math.abs(e.pressureExponent-1)>1e-9&&Ae.push(`putty 流動指數 m=${e.pressureExponent}：針嘴內徑與長度依冪律 d^(3+m)/L^m 一併換算；仍是單點映射假設。`);const pe=fe?fe.maxWidth:la(Ee.deposited,e.dotRatio).radius*2;if(r){let Xe=!1;for(const N of r.points)if(Math.abs(N.x)+pe/2>e.width/2||Math.abs(N.y)+pe/2>e.depth/2){Xe=!0;break}Xe&&Ae.push("路徑或估算膠線可能超出工件範圍；尚未計算實際邊緣流失。"),(Math.abs(r.offsetX)+r.width/2>e.width/2||Math.abs(r.offsetY)+r.depth/2>e.depth/2)&&Ae.push("設定的熱源超出工件矩形參考邊界；請核對熱源位置與尺寸。"),Ae.push("3D 彎角與重疊為幾何示意；沉積量分帳守恆，但顯示網格體積與融合形狀並非精確實物。"),c.kind==="polyline"?Ae.push(`轉角依 junction deviation ${e.junctionDeviation} mm 降速（最低 ${ge.slowestCorner===null?"—":ge.slowestCorner.toFixed(1)} mm/s）；轉角較慢處膠量較多。規則為通用 CNC 近似，非特定機台控制器。`):Ae.push("圖樣使用整條路徑的弧長加減速，轉角不減速（v0.7 對照）；不是機台運動控制器或真實轉角積膠預測。"),A<D&&Ae.push("為避免記憶體不足，沿路徑的沉積取樣已放粗；局部精度下降。")}else((e.mode==="line"?(e.lineLength+e.diameter)/2:pe/2)+Math.abs(e.offsetX)>e.width/2||pe/2+Math.abs(e.offsetY)>e.depth/2)&&Ae.push("路徑或膠形超出工件範圍；沉積位置仍按水平參考面外推。");const Oe=n?[254,277]:[300,300];return(e.width>Oe[0]||e.depth>Oe[1])&&Ae.push("工件超出所選設備的參考工作範圍；未自動縮小。"),e.surfaceZ+e.standoff+e.liftDistance>(n?70:100)&&Ae.push("工件／針嘴高度超出參考 Z 行程；尚未確認真實機台的裝夾與工具偏置。"),e.workpieceKind!=="plate"&&Ae.push("匯入工件只作實尺寸顯示；膠形使用上方水平參考面，未驗證孔洞、曲面或完整碰撞。"),Ee.remaining<=e.residual+1e-9&&Ae.push("可用膠量已耗盡；固定預填流道未吹空。"),n&&Ae.push("理想 PCP 假設滿腔；管路壓降、供料不足與材料適配尚未計算。"),{version:gr,label:_a,config:e,path:r,pathLength:a,Q:t,gate:h,duration:x,tailEnd:f,cellLength:b,gridStart:E,frames:I,warnings:Ae,maxHeight:Se,maxWidth:pe,motion:ge,ending:Re,summary:{...Ee,deposits:Array.from(Ee.deposits),maxHeight:Se,maxWidth:pe,ending:Re}}}function Ed(s,e){let t=0,n=s.frames.length-1;for(;t<n;){const i=Math.ceil((t+n)/2);s.frames[i].t<=e?t=i:n=i-1}return s.frames[t]}const Xt=Object.freeze({putty:{key:"putty",name:"Tputty 910",vendor:"Laird",kind:"單劑 thermal putty（陶瓷填充矽系）",conductivity:9.1,minBondLine:.18,contactResistance:.11,temperatureRange:"-40～180 °C",packaging:"30cc 針筒／75cc EFD 56cc（179 g）／180cc 159cc／300cc 鋁筒 300cc（960 g）",density:3.2,squeezeViscosity:7e3,yieldStress:200,color:14714506,colorName:"淡紅（近似）",source:"THR-DS-Tputty 910 Rev C 2025-04-22"},grease:{key:"grease",name:"Tgrease 2500",vendor:"Laird",kind:"非矽 thermal grease",conductivity:3.8,minBondLine:.05,contactResistance:.02,temperatureRange:"-55～150 °C",packaging:"50cc 針筒（A14399-03）／600cc 膠筒（A14259-10）",density:3.4,squeezeViscosity:2500,yieldStress:50,color:14277590,colorName:"灰白（近似）",source:"MKT-DOC-1592 Tgrease 2500 Data Sheet 2025-06-27"}});/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mc="180",ai={ROTATE:0,DOLLY:1,PAN:2},ii={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wd=0,el=1,Td=2,Fh=1,Oh=2,ei=3,li=0,nn=1,zt=2,Ei=0,ys=1,tl=2,nl=3,il=4,Ad=5,Hi=100,Rd=101,Cd=102,Pd=103,Ld=104,Dd=200,Id=201,Nd=202,Ud=203,Mo=204,bo=205,Fd=206,Od=207,Bd=208,kd=209,zd=210,Hd=211,Vd=212,Gd=213,Wd=214,So=0,Eo=1,wo=2,ws=3,To=4,Ao=5,Ro=6,Co=7,bc=0,Xd=1,$d=2,wi=0,qd=1,Yd=2,jd=3,Bh=4,Kd=5,Zd=6,Jd=7,sl="attached",Qd="detached",kh=300,Ts=301,As=302,Po=303,Lo=304,va=306,Rs=1e3,Si=1001,ua=1002,sn=1003,zh=1004,er=1005,vn=1006,ia=1007,si=1008,Wn=1009,Hh=1010,Vh=1011,cr=1012,Sc=1013,Wi=1014,Nn=1015,_r=1016,Ec=1017,wc=1018,lr=1020,Gh=35902,Wh=35899,Xh=1021,$h=1022,Tn=1023,hr=1026,ur=1027,Tc=1028,Ac=1029,qh=1030,Rc=1031,Cc=1033,sa=33776,ra=33777,aa=33778,oa=33779,Do=35840,Io=35841,No=35842,Uo=35843,Fo=36196,Oo=37492,Bo=37496,ko=37808,zo=37809,Ho=37810,Vo=37811,Go=37812,Wo=37813,Xo=37814,$o=37815,qo=37816,Yo=37817,jo=37818,Ko=37819,Zo=37820,Jo=37821,Qo=36492,ec=36494,tc=36495,nc=36283,ic=36284,sc=36285,rc=36286,dr=2300,fr=2301,wa=2302,rl=2400,al=2401,ol=2402,ef=2500,tf=0,Yh=1,ac=2,nf=3200,sf=3201,Pc=0,rf=1,bi="",Nt="srgb",rn="srgb-linear",da="linear",Tt="srgb",Qi=7680,cl=519,af=512,of=513,cf=514,jh=515,lf=516,hf=517,uf=518,df=519,oc=35044,ll="300 es",Hn=2e3,fa=2001;class Yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hl=1234567;const Ms=Math.PI/180,Cs=180/Math.PI;function Fn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[s&255]+qt[s>>8&255]+qt[s>>16&255]+qt[s>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function ct(s,e,t){return Math.max(e,Math.min(t,s))}function Lc(s,e){return(s%e+e)%e}function ff(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function pf(s,e,t){return s!==e?(t-s)/(e-s):0}function nr(s,e,t){return(1-t)*s+t*e}function mf(s,e,t,n){return nr(s,e,1-Math.exp(-t*n))}function gf(s,e=1){return e-Math.abs(Lc(s,e*2)-e)}function _f(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function vf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function xf(s,e){return s+Math.floor(Math.random()*(e-s+1))}function yf(s,e){return s+Math.random()*(e-s)}function Mf(s){return s*(.5-Math.random())}function bf(s){s!==void 0&&(hl=s);let e=hl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Sf(s){return s*Ms}function Ef(s){return s*Cs}function wf(s){return(s&s-1)===0&&s!==0}function Tf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Af(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Rf(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*d,o*l);break;case"YZY":s.set(c*d,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*d,o*h,o*l);break;case"XZX":s.set(o*h,c*g,c*f,o*l);break;case"YXY":s.set(c*f,o*h,c*g,o*l);break;case"ZYZ":s.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function In(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function bt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Dc={DEG2RAD:Ms,RAD2DEG:Cs,generateUUID:Fn,clamp:ct,euclideanModulo:Lc,mapLinear:ff,inverseLerp:pf,lerp:nr,damp:mf,pingpong:gf,smoothstep:_f,smootherstep:vf,randInt:xf,randFloat:yf,randFloatSpread:Mf,seededRandom:bf,degToRad:Sf,radToDeg:Ef,isPowerOfTwo:wf,ceilPowerOfTwo:Tf,floorPowerOfTwo:Af,setQuaternionFromProperEuler:Rf,normalize:bt,denormalize:In};class we{constructor(e=0,t=0){we.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class An{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-o;const p=c*d+l*f+h*g+u*_,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const E=Math.sqrt(y),w=Math.atan2(E,p*x);m=Math.sin(m*w)/E,o=Math.sin(o*w)/E}const v=o*x;if(c=c*m+d*v,l=l*m+f*v,h=h*m+g*v,u=u*m+_*v,m===1-o){const E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ul.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ul.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ta.copy(this).projectOnVector(e),this.sub(Ta)}reflect(e){return this.sub(Ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ta=new P,ul=new An;class lt{constructor(e,t,n,i,r,a,o,c,l){lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],x=i[1],y=i[4],v=i[7],E=i[2],w=i[5],A=i[8];return r[0]=a*_+o*x+c*E,r[3]=a*m+o*y+c*w,r[6]=a*p+o*v+c*A,r[1]=l*_+h*x+u*E,r[4]=l*m+h*y+u*w,r[7]=l*p+h*v+u*A,r[2]=d*_+f*x+g*E,r[5]=d*m+f*y+g*w,r[8]=d*p+f*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Aa.makeScale(e,t)),this}rotate(e){return this.premultiply(Aa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Aa=new lt;function Kh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function pr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Cf(){const s=pr("canvas");return s.style.display="block",s}const dl={};function mr(s){s in dl||(dl[s]=!0,console.warn(s))}function Pf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const fl=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pl=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lf(){const s={enabled:!0,workingColorSpace:rn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Tt&&(i.r=oi(i.r),i.g=oi(i.g),i.b=oi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Tt&&(i.r=bs(i.r),i.g=bs(i.g),i.b=bs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===bi?da:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return mr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return mr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[rn]:{primaries:e,whitePoint:n,transfer:da,toXYZ:fl,fromXYZ:pl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:Tt,toXYZ:fl,fromXYZ:pl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),s}const pt=Lf();function oi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function bs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let es;class Df{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{es===void 0&&(es=pr("canvas")),es.width=e.width,es.height=e.height;const i=es.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=es}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=pr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=oi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let If=0;class Ic{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=Fn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ra(i[a].image)):r.push(Ra(i[a]))}else r=Ra(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ra(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Df.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nf=0;const Ca=new P;class Ht extends Yi{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,n=Si,i=Si,r=vn,a=si,o=Tn,c=Wn,l=Ht.DEFAULT_ANISOTROPY,h=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Fn(),this.name="",this.source=new Ic(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ca).x}get height(){return this.source.getSize(Ca).y}get depth(){return this.source.getSize(Ca).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rs:e.x=e.x-Math.floor(e.x);break;case Si:e.x=e.x<0?0:1;break;case ua:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rs:e.y=e.y-Math.floor(e.y);break;case Si:e.y=e.y<0?0:1;break;case ua:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=kh;Ht.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,n=0,i=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,v=(f+1)/2,E=(p+1)/2,w=(h+d)/4,A=(u+_)/4,D=(g+m)/4;return y>v&&y>E?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=w/n,r=A/n):v>E?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=w/i,r=D/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=A/r,i=D/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uf extends Yi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new Ht(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:vn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ic(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xi extends Uf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Zh extends Ht{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=sn,this.minFilter=sn,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ff extends Ht{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=sn,this.minFilter=sn,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xn{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Pn):Pn.fromBufferAttribute(r,a),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),br.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),br.copy(n.boundingBox)),br.applyMatrix4(e.matrixWorld),this.union(br)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vs),Sr.subVectors(this.max,Vs),ts.subVectors(e.a,Vs),ns.subVectors(e.b,Vs),is.subVectors(e.c,Vs),fi.subVectors(ns,ts),pi.subVectors(is,ns),Li.subVectors(ts,is);let t=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Li.z,Li.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Li.z,0,-Li.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Li.y,Li.x,0];return!Pa(t,ts,ns,is,Sr)||(t=[1,0,0,0,1,0,0,0,1],!Pa(t,ts,ns,is,Sr))?!1:(Er.crossVectors(fi,pi),t=[Er.x,Er.y,Er.z],Pa(t,ts,ns,is,Sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $n=[new P,new P,new P,new P,new P,new P,new P,new P],Pn=new P,br=new xn,ts=new P,ns=new P,is=new P,fi=new P,pi=new P,Li=new P,Vs=new P,Sr=new P,Er=new P,Di=new P;function Pa(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Di.fromArray(s,r);const o=i.x*Math.abs(Di.x)+i.y*Math.abs(Di.y)+i.z*Math.abs(Di.z),c=e.dot(Di),l=t.dot(Di),h=n.dot(Di);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Of=new xn,Gs=new P,La=new P;class Xn{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Of.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gs.subVectors(e,this.center);const t=Gs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Gs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(La.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gs.copy(e.center).add(La)),this.expandByPoint(Gs.copy(e.center).sub(La))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const qn=new P,Da=new P,wr=new P,mi=new P,Ia=new P,Tr=new P,Na=new P;class vr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Da.copy(e).add(t).multiplyScalar(.5),wr.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(Da);const r=e.distanceTo(t)*.5,a=-this.direction.dot(wr),o=mi.dot(this.direction),c=-mi.dot(wr),l=mi.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Da).addScaledVector(wr,d),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),i=qn.dot(qn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,i,r){Ia.subVectors(t,e),Tr.subVectors(n,e),Na.crossVectors(Ia,Tr);let a=this.direction.dot(Na),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mi.subVectors(this.origin,e);const c=o*this.direction.dot(Tr.crossVectors(mi,Tr));if(c<0)return null;const l=o*this.direction.dot(Ia.cross(mi));if(l<0||c+l>a)return null;const h=-o*mi.dot(Na);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m)}set(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ss.setFromMatrixColumn(e,0).length(),r=1/ss.setFromMatrixColumn(e,1).length(),a=1/ss.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bf,e,kf)}lookAt(e,t,n){const i=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),gi.crossVectors(n,pn),gi.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),gi.crossVectors(n,pn)),gi.normalize(),Ar.crossVectors(pn,gi),i[0]=gi.x,i[4]=Ar.x,i[8]=pn.x,i[1]=gi.y,i[5]=Ar.y,i[9]=pn.y,i[2]=gi.z,i[6]=Ar.z,i[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],y=n[7],v=n[11],E=n[15],w=i[0],A=i[4],D=i[8],b=i[12],S=i[1],I=i[5],U=i[9],G=i[13],q=i[2],te=i[6],W=i[10],oe=i[14],X=i[3],fe=i[7],Se=i[11],Ee=i[15];return r[0]=a*w+o*S+c*q+l*X,r[4]=a*A+o*I+c*te+l*fe,r[8]=a*D+o*U+c*W+l*Se,r[12]=a*b+o*G+c*oe+l*Ee,r[1]=h*w+u*S+d*q+f*X,r[5]=h*A+u*I+d*te+f*fe,r[9]=h*D+u*U+d*W+f*Se,r[13]=h*b+u*G+d*oe+f*Ee,r[2]=g*w+_*S+m*q+p*X,r[6]=g*A+_*I+m*te+p*fe,r[10]=g*D+_*U+m*W+p*Se,r[14]=g*b+_*G+m*oe+p*Ee,r[3]=x*w+y*S+v*q+E*X,r[7]=x*A+y*I+v*te+E*fe,r[11]=x*D+y*U+v*W+E*Se,r[15]=x*b+y*G+v*oe+E*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-i*l*u-r*o*d+n*l*d+i*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-i*a*f+i*l*h-r*c*h)+m*(+t*l*u-t*o*f-r*a*u+n*a*f+r*o*h-n*l*h)+p*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=u*m*l-_*d*l+_*c*f-o*m*f-u*c*p+o*d*p,y=g*d*l-h*m*l-g*c*f+a*m*f+h*c*p-a*d*p,v=h*_*l-g*u*l+g*o*f-a*_*f-h*o*p+a*u*p,E=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,w=t*x+n*y+i*v+r*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=x*A,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*A,e[2]=(o*m*r-_*c*r+_*i*l-n*m*l-o*i*p+n*c*p)*A,e[3]=(u*c*r-o*d*r-u*i*l+n*d*l+o*i*f-n*c*f)*A,e[4]=y*A,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*A,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*p-t*c*p)*A,e[7]=(a*d*r-h*c*r+h*i*l-t*d*l-a*i*f+t*c*f)*A,e[8]=v*A,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*A,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*A,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*f-t*o*f)*A,e[12]=E*A,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*A,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*m-t*o*m)*A,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,x=c*l,y=c*h,v=c*u,E=n.x,w=n.y,A=n.z;return i[0]=(1-(_+p))*E,i[1]=(f+v)*E,i[2]=(g-y)*E,i[3]=0,i[4]=(f-v)*w,i[5]=(1-(d+p))*w,i[6]=(m+x)*w,i[7]=0,i[8]=(g+y)*A,i[9]=(m-x)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=ss.set(i[0],i[1],i[2]).length();const a=ss.set(i[4],i[5],i[6]).length(),o=ss.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Ln.copy(this);const l=1/r,h=1/a,u=1/o;return Ln.elements[0]*=l,Ln.elements[1]*=l,Ln.elements[2]*=l,Ln.elements[4]*=h,Ln.elements[5]*=h,Ln.elements[6]*=h,Ln.elements[8]*=u,Ln.elements[9]*=u,Ln.elements[10]*=u,t.setFromRotationMatrix(Ln),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=Hn,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===Hn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===fa)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Hn,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===Hn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===fa)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ss=new P,Ln=new rt,Bf=new P(0,0,0),kf=new P(1,1,1),gi=new P,Ar=new P,pn=new P,ml=new rt,gl=new An;class Rn{constructor(e=0,t=0,n=0,i=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ml,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gl.setFromEuler(this),this.setFromQuaternion(gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class Jh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zf=0;const _l=new P,rs=new An,Yn=new rt,Rr=new P,Ws=new P,Hf=new P,Vf=new An,vl=new P(1,0,0),xl=new P(0,1,0),yl=new P(0,0,1),Ml={type:"added"},Gf={type:"removed"},as={type:"childadded",child:null},Ua={type:"childremoved",child:null};class gt extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new P,t=new Rn,n=new An,i=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new lt}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(vl,e)}rotateY(e){return this.rotateOnAxis(xl,e)}rotateZ(e){return this.rotateOnAxis(yl,e)}translateOnAxis(e,t){return _l.copy(e).applyQuaternion(this.quaternion),this.position.add(_l.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vl,e)}translateY(e){return this.translateOnAxis(xl,e)}translateZ(e){return this.translateOnAxis(yl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Rr.copy(e):Rr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Ws,Rr,this.up):Yn.lookAt(Rr,Ws,this.up),this.quaternion.setFromRotationMatrix(Yn),i&&(Yn.extractRotation(i.matrixWorld),rs.setFromRotationMatrix(Yn),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ml),as.child=e,this.dispatchEvent(as),as.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gf),Ua.child=e,this.dispatchEvent(Ua),Ua.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ml),as.child=e,this.dispatchEvent(as),as.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,e,Hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,Vf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}gt.DEFAULT_UP=new P(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Dn=new P,jn=new P,Fa=new P,Kn=new P,os=new P,cs=new P,bl=new P,Oa=new P,Ba=new P,ka=new P,za=new vt,Ha=new vt,Va=new vt;class wn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Dn.subVectors(e,t),i.cross(Dn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Dn.subVectors(i,t),jn.subVectors(n,t),Fa.subVectors(e,t);const a=Dn.dot(Dn),o=Dn.dot(jn),c=Dn.dot(Fa),l=jn.dot(jn),h=jn.dot(Fa),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Kn.x),c.addScaledVector(a,Kn.y),c.addScaledVector(o,Kn.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return za.setScalar(0),Ha.setScalar(0),Va.setScalar(0),za.fromBufferAttribute(e,t),Ha.fromBufferAttribute(e,n),Va.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(za,r.x),a.addScaledVector(Ha,r.y),a.addScaledVector(Va,r.z),a}static isFrontFacing(e,t,n,i){return Dn.subVectors(n,t),jn.subVectors(e,t),Dn.cross(jn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Dn.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return wn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return wn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;os.subVectors(i,n),cs.subVectors(r,n),Oa.subVectors(e,n);const c=os.dot(Oa),l=cs.dot(Oa);if(c<=0&&l<=0)return t.copy(n);Ba.subVectors(e,i);const h=os.dot(Ba),u=cs.dot(Ba);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(os,a);ka.subVectors(e,r);const f=os.dot(ka),g=cs.dot(ka);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(cs,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return bl.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(bl,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(os,a).addScaledVector(cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Qh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function Ga(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=pt.workingColorSpace){if(e=Lc(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ga(a,r,e+1/3),this.g=Ga(a,r,e),this.b=Ga(a,r,e-1/3)}return pt.colorSpaceToWorking(this,i),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){const n=Qh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=bs(e.r),this.g=bs(e.g),this.b=bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return pt.workingToColorSpace(Yt.copy(this),e),Math.round(ct(Yt.r*255,0,255))*65536+Math.round(ct(Yt.g*255,0,255))*256+Math.round(ct(Yt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.workingToColorSpace(Yt.copy(this),t);const n=Yt.r,i=Yt.g,r=Yt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=pt.workingColorSpace){return pt.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=Nt){pt.workingToColorSpace(Yt.copy(this),e);const t=Yt.r,n=Yt.g,i=Yt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(Cr);const n=nr(_i.h,Cr.h,t),i=nr(_i.s,Cr.s,t),r=nr(_i.l,Cr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new Ze;Ze.NAMES=Qh;let Wf=0;class On extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Fn(),this.name="",this.type="Material",this.blending=ys,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mo,this.blendDst=bo,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(n.blending=this.blending),this.side!==li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Mo&&(n.blendSrc=this.blendSrc),this.blendDst!==bo&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Un extends On{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ut=new P,Pr=new we;let Xf=0;class Ft{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=oc,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Pr.fromBufferAttribute(this,t),Pr.applyMatrix3(e),this.setXY(t,Pr.x,Pr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=In(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=In(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=In(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=In(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==oc&&(e.usage=this.usage),e}}class eu extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tu extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Rt extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}let $f=0;const bn=new rt,Wa=new gt,ls=new P,mn=new xn,Xs=new xn,Wt=new P;class Mt extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kh(e)?tu:eu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return Wa.lookAt(e),Wa.updateMatrix(),this.applyMatrix4(Wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Rt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Xs.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(mn.min,Xs.min),mn.expandByPoint(Wt),Wt.addVectors(mn.max,Xs.max),mn.expandByPoint(Wt)):(mn.expandByPoint(Xs.min),mn.expandByPoint(Xs.max))}mn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Wt.fromBufferAttribute(o,l),c&&(ls.fromBufferAttribute(e,l),Wt.add(ls)),i=Math.max(i,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<n.count;D++)o[D]=new P,c[D]=new P;const l=new P,h=new P,u=new P,d=new we,f=new we,g=new we,_=new P,m=new P;function p(D,b,S){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),o[D].add(_),o[b].add(_),o[S].add(_),c[D].add(m),c[b].add(m),c[S].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let D=0,b=x.length;D<b;++D){const S=x[D],I=S.start,U=S.count;for(let G=I,q=I+U;G<q;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const y=new P,v=new P,E=new P,w=new P;function A(D){E.fromBufferAttribute(i,D),w.copy(E);const b=o[D];y.copy(b),y.sub(E.multiplyScalar(E.dot(b))).normalize(),v.crossVectors(w,b);const I=v.dot(c[D])<0?-1:1;a.setXYZW(D,y.x,y.y,y.z,I)}for(let D=0,b=x.length;D<b;++D){const S=x[D],I=S.start,U=S.count;for(let G=I,q=I+U;G<q;G+=3)A(e.getX(G+0)),A(e.getX(G+1)),A(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new P,r=new P,a=new P,o=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ft(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sl=new rt,Ii=new vr,Lr=new Xn,El=new P,Dr=new P,Ir=new P,Nr=new P,Xa=new P,Ur=new P,wl=new P,Fr=new P;class nt extends gt{constructor(e=new Mt,t=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Ur.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Xa.fromBufferAttribute(u,e),a?Ur.addScaledVector(Xa,h):Ur.addScaledVector(Xa.sub(t),h))}t.add(Ur)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(r),Ii.copy(e.ray).recast(e.near),!(Lr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Lr,El)===null||Ii.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(Sl.copy(r).invert(),Ii.copy(e.ray).applyMatrix4(Sl),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,E=y;v<E;v+=3){const w=o.getX(v),A=o.getX(v+1),D=o.getX(v+2);i=Or(this,p,e,n,l,h,u,w,A,D),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=o.getX(m),y=o.getX(m+1),v=o.getX(m+2);i=Or(this,a,e,n,l,h,u,x,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,E=y;v<E;v+=3){const w=v,A=v+1,D=v+2;i=Or(this,p,e,n,l,h,u,w,A,D),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,y=m+1,v=m+2;i=Or(this,a,e,n,l,h,u,x,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function qf(s,e,t,n,i,r,a,o){let c;if(e.side===nn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===li,o),c===null)return null;Fr.copy(o),Fr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Fr);return l<t.near||l>t.far?null:{distance:l,point:Fr.clone(),object:s}}function Or(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Dr),s.getVertexPosition(c,Ir),s.getVertexPosition(l,Nr);const h=qf(s,e,t,n,Dr,Ir,Nr,wl);if(h){const u=new P;wn.getBarycoord(wl,Dr,Ir,Nr,u),i&&(h.uv=wn.getInterpolatedAttribute(i,o,c,l,u,new we)),r&&(h.uv1=wn.getInterpolatedAttribute(r,o,c,l,u,new we)),a&&(h.normal=wn.getInterpolatedAttribute(a,o,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new P,materialIndex:0};wn.getNormal(Dr,Ir,Nr,d.normal),h.face=d,h.barycoord=u}return h}class on extends Mt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(u,2));function g(_,m,p,x,y,v,E,w,A,D,b){const S=v/A,I=E/D,U=v/2,G=E/2,q=w/2,te=A+1,W=D+1;let oe=0,X=0;const fe=new P;for(let Se=0;Se<W;Se++){const Ee=Se*I-G;for(let Ae=0;Ae<te;Ae++){const at=Ae*S-U;fe[_]=at*x,fe[m]=Ee*y,fe[p]=q,l.push(fe.x,fe.y,fe.z),fe[_]=0,fe[m]=0,fe[p]=w>0?1:-1,h.push(fe.x,fe.y,fe.z),u.push(Ae/A),u.push(1-Se/D),oe+=1}}for(let Se=0;Se<D;Se++)for(let Ee=0;Ee<A;Ee++){const Ae=d+Ee+te*Se,at=d+Ee+te*(Se+1),We=d+(Ee+1)+te*(Se+1),it=d+(Ee+1)+te*Se;c.push(Ae,at,it),c.push(at,We,it),X+=6}o.addGroup(f,X,b),f+=X,d+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new on(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ps(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Qt(s){const e={};for(let t=0;t<s.length;t++){const n=Ps(s[t]);for(const i in n)e[i]=n[i]}return e}function Yf(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function nu(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const jf={clone:Ps,merge:Qt};var Kf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends On{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kf,this.fragmentShader=Zf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ps(e.uniforms),this.uniformsGroups=Yf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class iu extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new P,Tl=new we,Al=new we;class tn extends iu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ms*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(Ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,Tl,Al),t.subVectors(Al,Tl)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ms*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const hs=-90,us=1;class Jf extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new tn(hs,us,e,t);i.layers=this.layers,this.add(i);const r=new tn(hs,us,e,t);r.layers=this.layers,this.add(r);const a=new tn(hs,us,e,t);a.layers=this.layers,this.add(a);const o=new tn(hs,us,e,t);o.layers=this.layers,this.add(o);const c=new tn(hs,us,e,t);c.layers=this.layers,this.add(c);const l=new tn(hs,us,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===fa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class su extends Ht{constructor(e=[],t=Ts,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qf extends Xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new su(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new on(5,5,5),r=new Ri({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:Ei});r.uniforms.tEquirect.value=t;const a=new nt(i,r),o=t.minFilter;return t.minFilter===si&&(t.minFilter=vn),new Jf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}class yt extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ep={type:"move"};class $a{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ep)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ru extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class tp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=oc,this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Zt=new P;class Nc{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=In(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=In(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=In(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=In(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Nc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Rl=new P,Cl=new vt,Pl=new vt,np=new P,Ll=new rt,Br=new P,qa=new Xn,Dl=new rt,Ya=new vr;class ip extends nt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sl,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new xn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Br),this.boundingBox.expandByPoint(Br)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Xn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Br),this.boundingSphere.expandByPoint(Br)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qa.copy(this.boundingSphere),qa.applyMatrix4(i),e.ray.intersectsSphere(qa)!==!1&&(Dl.copy(i).invert(),Ya.copy(e.ray).applyMatrix4(Dl),!(this.boundingBox!==null&&Ya.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ya)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new vt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===sl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Qd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Cl.fromBufferAttribute(i.attributes.skinIndex,e),Pl.fromBufferAttribute(i.attributes.skinWeight,e),Rl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Pl.getComponent(r);if(a!==0){const o=Cl.getComponent(r);Ll.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(np.copy(Rl).applyMatrix4(Ll),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class au extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ou extends Ht{constructor(e=null,t=1,n=1,i,r,a,o,c,l=sn,h=sn,u,d){super(null,a,o,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Il=new rt,sp=new rt;class Uc{constructor(e=[],t=[]){this.uuid=Fn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:sp;Il.multiplyMatrices(o,t[r]),Il.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Uc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ou(t,e,e,Tn,Nn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new au),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class cc extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ds=new rt,Nl=new rt,kr=[],Ul=new xn,rp=new rt,$s=new nt,qs=new Xn;class Ls extends nt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new cc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,rp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),Ul.copy(e.boundingBox).applyMatrix4(ds),this.boundingBox.union(Ul)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),qs.copy(e.boundingSphere).applyMatrix4(ds),this.boundingSphere.union(qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qs.copy(this.boundingSphere),qs.applyMatrix4(n),e.ray.intersectsSphere(qs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ds),Nl.multiplyMatrices(n,ds),$s.matrixWorld=Nl,$s.raycast(e,kr);for(let a=0,o=kr.length;a<o;a++){const c=kr[a];c.instanceId=r,c.object=this,t.push(c)}kr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new cc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ou(new Float32Array(i*this.count),i,this.count,Tc,Nn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ja=new P,ap=new P,op=new lt;class Mi{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ja.subVectors(n,t).cross(ap.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ja),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||op.getNormalMatrix(e),i=this.coplanarPoint(ja).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new Xn,cp=new we(.5,.5),zr=new P;class Fc{constructor(e=new Mi,t=new Mi,n=new Mi,i=new Mi,r=new Mi,a=new Mi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Hn,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],x=r[12],y=r[13],v=r[14],E=r[15];if(i[0].setComponents(l-a,f-h,p-g,E-x).normalize(),i[1].setComponents(l+a,f+h,p+g,E+x).normalize(),i[2].setComponents(l+o,f+u,p+_,E+y).normalize(),i[3].setComponents(l-o,f-u,p-_,E-y).normalize(),n)i[4].setComponents(c,d,m,v).normalize(),i[5].setComponents(l-c,f-d,p-m,E-v).normalize();else if(i[4].setComponents(l-c,f-d,p-m,E-v).normalize(),t===Hn)i[5].setComponents(l+c,f+d,p+m,E+v).normalize();else if(t===fa)i[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){Ni.center.set(0,0,0);const t=cp.distanceTo(e.center);return Ni.radius=.7071067811865476+t,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(zr.x=i.normal.x>0?e.max.x:e.min.x,zr.y=i.normal.y>0?e.max.y:e.min.y,zr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $i extends On{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const pa=new P,ma=new P,Fl=new rt,Ys=new vr,Hr=new Xn,Ka=new P,Ol=new P;class qi extends gt{constructor(e=new Mt,t=new $i){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)pa.fromBufferAttribute(t,i-1),ma.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=pa.distanceTo(ma);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(i),Hr.radius+=r,e.ray.intersectsSphere(Hr)===!1)return;Fl.copy(i).invert(),Ys.copy(e.ray).applyMatrix4(Fl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),x=h.getX(_+1),y=Vr(this,e,Ys,c,p,x,_);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=Vr(this,e,Ys,c,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=Vr(this,e,Ys,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Vr(this,e,Ys,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Vr(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(pa.fromBufferAttribute(o,i),ma.fromBufferAttribute(o,r),t.distanceSqToSegment(pa,ma,Ka,Ol)>n)return;Ka.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ka);if(!(l<e.near||l>e.far))return{distance:l,point:Ol.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Bl=new P,kl=new P;class Oc extends qi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Bl.fromBufferAttribute(t,i),kl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Bl.distanceTo(kl);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lp extends qi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class cu extends On{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const zl=new rt,lc=new vr,Gr=new Xn,Wr=new P;class hp extends gt{constructor(e=new Mt,t=new cu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(i),Gr.radius+=r,e.ray.intersectsSphere(Gr)===!1)return;zl.copy(i).invert(),lc.copy(e.ray).applyMatrix4(zl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);Wr.fromBufferAttribute(u,m),Hl(Wr,m,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Wr.fromBufferAttribute(u,g),Hl(Wr,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Hl(s,e,t,n,i,r,a){const o=lc.distanceSqToPoint(s);if(o<t){const c=new P;lc.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class lu extends Ht{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class hu extends Ht{constructor(e,t,n=Wi,i,r,a,o=sn,c=sn,l,h=hr,u=1){if(h!==hr&&h!==ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ic(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class uu extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xa extends Mt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new P,h=new we;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Rt(a,3)),this.setAttribute("normal",new Rt(o,3)),this.setAttribute("uv",new Rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class hn extends Mt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;x(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Rt(u,3)),this.setAttribute("normal",new Rt(d,3)),this.setAttribute("uv",new Rt(f,2));function x(){const v=new P,E=new P;let w=0;const A=(t-e)/n;for(let D=0;D<=r;D++){const b=[],S=D/r,I=S*(t-e)+e;for(let U=0;U<=i;U++){const G=U/i,q=G*c+o,te=Math.sin(q),W=Math.cos(q);E.x=I*te,E.y=-S*n+m,E.z=I*W,u.push(E.x,E.y,E.z),v.set(te,A,W).normalize(),d.push(v.x,v.y,v.z),f.push(G,1-S),b.push(g++)}_.push(b)}for(let D=0;D<i;D++)for(let b=0;b<r;b++){const S=_[b][D],I=_[b+1][D],U=_[b+1][D+1],G=_[b][D+1];(e>0||b!==0)&&(h.push(S,I,G),w+=3),(t>0||b!==r-1)&&(h.push(I,U,G),w+=3)}l.addGroup(p,w,0),p+=w}function y(v){const E=g,w=new we,A=new P;let D=0;const b=v===!0?e:t,S=v===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,m*S,0),d.push(0,S,0),f.push(.5,.5),g++;const I=g;for(let U=0;U<=i;U++){const q=U/i*c+o,te=Math.cos(q),W=Math.sin(q);A.x=b*W,A.y=m*S,A.z=b*te,u.push(A.x,A.y,A.z),d.push(0,S,0),w.x=te*.5+.5,w.y=W*.5*S+.5,f.push(w.x,w.y),g++}for(let U=0;U<i;U++){const G=E+U,q=I+U;v===!0?h.push(q,q+1,G):h.push(q+1,q,G),D+=3}l.addGroup(p,D,v===!0?1:2),p+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Xr=new P,$r=new P,Za=new P,qr=new wn;class du extends Mt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(Ms*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=qr;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),qr.getNormal(Za),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const y=(x+1)%3,v=u[x],E=u[y],w=qr[h[x]],A=qr[h[y]],D=`${v}_${E}`,b=`${E}_${v}`;b in d&&d[b]?(Za.dot(d[b].normal)<=r&&(f.push(w.x,w.y,w.z),f.push(A.x,A.y,A.z)),d[b]=null):D in d||(d[D]={index0:l[x],index1:l[y],normal:Za.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];Xr.fromBufferAttribute(o,_),$r.fromBufferAttribute(o,m),f.push(Xr.x,Xr.y,Xr.z),f.push($r.x,$r.y,$r.z)}this.setAttribute("position",new Rt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class hi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new we:new P);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new P,i=[],r=[],a=[],o=new P,c=new rt;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ct(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ct(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class fu extends hi{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new we){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class up extends fu{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Bc(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const Yr=new P,Ja=new Bc,Qa=new Bc,eo=new Bc;class pu extends hi{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(Yr.subVectors(i[0],i[1]).add(i[0]),l=Yr);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Yr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Yr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ja.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),Qa.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),eo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ja.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Qa.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),eo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Ja.calc(c),Qa.calc(c),eo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Vl(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function dp(s,e){const t=1-s;return t*t*e}function fp(s,e){return 2*(1-s)*s*e}function pp(s,e){return s*s*e}function ir(s,e,t,n){return dp(s,e)+fp(s,t)+pp(s,n)}function mp(s,e){const t=1-s;return t*t*t*e}function gp(s,e){const t=1-s;return 3*t*t*s*e}function _p(s,e){return 3*(1-s)*s*s*e}function vp(s,e){return s*s*s*e}function sr(s,e,t,n,i){return mp(s,e)+gp(s,t)+_p(s,n)+vp(s,i)}class xp extends hi{constructor(e=new we,t=new we,n=new we,i=new we){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new we){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(sr(e,i.x,r.x,a.x,o.x),sr(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class yp extends hi{constructor(e=new P,t=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(sr(e,i.x,r.x,a.x,o.x),sr(e,i.y,r.y,a.y,o.y),sr(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mp extends hi{constructor(e=new we,t=new we){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new we){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new we){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bp extends hi{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sp extends hi{constructor(e=new we,t=new we,n=new we){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new we){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ir(e,i.x,r.x,a.x),ir(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mu extends hi{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ir(e,i.x,r.x,a.x),ir(e,i.y,r.y,a.y),ir(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ep extends hi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new we){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Vl(o,c.x,l.x,h.x,u.x),Vl(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new we().fromArray(i))}return this}}var wp=Object.freeze({__proto__:null,ArcCurve:up,CatmullRomCurve3:pu,CubicBezierCurve:xp,CubicBezierCurve3:yp,EllipseCurve:fu,LineCurve:Mp,LineCurve3:bp,QuadraticBezierCurve:Sp,QuadraticBezierCurve3:mu,SplineCurve:Ep});class Os extends Mt{constructor(e=[new we(0,-.5),new we(.5,0),new we(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ct(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],h=1/t,u=new P,d=new we,f=new P,g=new P,_=new P;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let x=0;x<=t;x++){const y=n+x*h*i,v=Math.sin(y),E=Math.cos(y);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*v,u.y=e[w].y,u.z=e[w].x*E,a.push(u.x,u.y,u.z),d.x=x/t,d.y=w/(e.length-1),o.push(d.x,d.y);const A=c[3*w+0]*v,D=c[3*w+1],b=c[3*w+0]*E;l.push(A,D,b)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const v=y+x*e.length,E=v,w=v+e.length,A=v+e.length+1,D=v+1;r.push(E,w,D),r.push(A,D,w)}this.setIndex(r),this.setAttribute("position",new Rt(a,3)),this.setAttribute("uv",new Rt(o,2)),this.setAttribute("normal",new Rt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.points,e.segments,e.phiStart,e.phiLength)}}class Ci extends Mt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const x=p*d-a;for(let y=0;y<l;y++){const v=y*u-r;g.push(v,-x,0),_.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<o;x++){const y=x+l*p,v=x+l*(p+1),E=x+1+l*(p+1),w=x+1+l*p;f.push(y,v,w),f.push(v,E,w)}this.setIndex(f),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.width,e.height,e.widthSegments,e.heightSegments)}}class kc extends Mt{constructor(e=new mu(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,c=new P,l=new we;let h=new P;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Rt(u,3)),this.setAttribute("normal",new Rt(d,3)),this.setAttribute("uv",new Rt(f,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),x(),p()}function m(y){h=e.getPointAt(y/t,h);const v=a.normals[y],E=a.binormals[y];for(let w=0;w<=i;w++){const A=w/i*Math.PI*2,D=Math.sin(A),b=-Math.cos(A);c.x=b*v.x+D*E.x,c.y=b*v.y+D*E.y,c.z=b*v.z+D*E.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function p(){for(let y=1;y<=t;y++)for(let v=1;v<=i;v++){const E=(i+1)*(y-1)+(v-1),w=(i+1)*y+(v-1),A=(i+1)*y+v,D=(i+1)*(y-1)+v;g.push(E,w,D),g.push(w,A,D)}}function x(){for(let y=0;y<=t;y++)for(let v=0;v<=i;v++)l.x=y/t,l.y=v/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new kc(new wp[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ot extends On{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pc,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class an extends ot{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Tp extends On{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pc,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ap extends On{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rp extends On{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Gl extends $i{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function jr(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Cp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Pp(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Wl(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function gu(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class xr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Lp extends xr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:rl,endingEnd:rl}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case al:r=e,o=2*t-n;break;case ol:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case al:a=e,c=2*n-t;break;case ol:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,x=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,v=f*m-f*_;for(let E=0;E!==o;++E)r[E]=p*a[h+E]+x*a[l+E]+y*a[c+E]+v*a[u+E];return r}}class Dp extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}}class Ip extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Bn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=jr(t,this.TimeBufferType),this.values=jr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:jr(e.times,Array),values:jr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ip(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Dp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Lp(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case dr:t=this.InterpolantFactoryMethodDiscrete;break;case fr:t=this.InterpolantFactoryMethodLinear;break;case wa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return dr;case this.InterpolantFactoryMethodLinear:return fr;case this.InterpolantFactoryMethodSmooth:return wa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Cp(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===wa,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Bn.prototype.ValueTypeName="";Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=fr;class Bs extends Bn{constructor(e,t,n){super(e,t,n)}}Bs.prototype.ValueTypeName="bool";Bs.prototype.ValueBufferType=Array;Bs.prototype.DefaultInterpolation=dr;Bs.prototype.InterpolantFactoryMethodLinear=void 0;Bs.prototype.InterpolantFactoryMethodSmooth=void 0;class _u extends Bn{constructor(e,t,n,i){super(e,t,n,i)}}_u.prototype.ValueTypeName="color";class Ds extends Bn{constructor(e,t,n,i){super(e,t,n,i)}}Ds.prototype.ValueTypeName="number";class Np extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let h=l+o;l!==h;l+=4)An.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Is extends Bn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Np(this.times,this.values,this.getValueSize(),e)}}Is.prototype.ValueTypeName="quaternion";Is.prototype.InterpolantFactoryMethodSmooth=void 0;class ks extends Bn{constructor(e,t,n){super(e,t,n)}}ks.prototype.ValueTypeName="string";ks.prototype.ValueBufferType=Array;ks.prototype.DefaultInterpolation=dr;ks.prototype.InterpolantFactoryMethodLinear=void 0;ks.prototype.InterpolantFactoryMethodSmooth=void 0;class Ns extends Bn{constructor(e,t,n,i){super(e,t,n,i)}}Ns.prototype.ValueTypeName="vector";class Up{constructor(e="",t=-1,n=[],i=ef){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Fn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Op(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Bn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const h=Pp(c);c=Wl(c,1,h),l=Wl(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Ds(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];gu(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let x=0;x!==d[g].morphTargets.length;++x){const y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new Ds(".morphTargetInfluence["+_+"]",m,p))}c=f.length*a}else{const f=".bones["+t[u].name+"]";n(Ns,f+".position",d,"pos",i),n(Is,f+".quaternion",d,"rot",i),n(Ns,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Fp(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ds;case"vector":case"vector2":case"vector3":case"vector4":return Ns;case"color":return _u;case"quaternion":return Is;case"bool":case"boolean":return Bs;case"string":return ks}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Op(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Fp(s.type);if(s.times===void 0){const t=[],n=[];gu(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const ri={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class vu{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Bp=new vu;class ji{constructor(e){this.manager=e!==void 0?e:Bp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ji.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zn={};class kp extends Error{constructor(e,t){super(e),this.response=t}}class zc extends ji{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ri.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Zn[e]!==void 0){Zn[e].push({onLoad:t,onProgress:n,onError:i});return}Zn[e]=[],Zn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Zn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){x();function x(){u.read().then(({done:y,value:v})=>{if(y)p.close();else{_+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let w=0,A=h.length;w<A;w++){const D=h[w];D.onProgress&&D.onProgress(E)}p.enqueue(v),x()}},y=>{p.error(y)})}}});return new Response(m)}else throw new kp(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{ri.add(`file:${e}`,l);const h=Zn[e];delete Zn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Zn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Zn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const fs=new WeakMap;class zp extends ji{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ri.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=fs.get(a);u===void 0&&(u=[],fs.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=pr("img");function c(){h(),t&&t(this);const u=fs.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}fs.delete(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),ri.remove(`image:${e}`);const d=fs.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}fs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ri.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Hp extends ji{constructor(e){super(e)}load(e,t,n,i){const r=new Ht,a=new zp(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class ya extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Vp extends ya{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const to=new rt,Xl=new P,$l=new P;class Hc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=Wn,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fc,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Xl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xl),$l.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($l),t.updateMatrixWorld(),to.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(to,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(to)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Gp extends Hc{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Cs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Wp extends ya{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Gp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ql=new rt,js=new P,no=new P;class Xp extends Hc{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new we(4,2),this._viewportCount=6,this._viewports=[new vt(2,1,1,1),new vt(0,1,1,1),new vt(3,1,1,1),new vt(1,1,1,1),new vt(3,0,1,1),new vt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),js.setFromMatrixPosition(e.matrixWorld),n.position.copy(js),no.copy(n.position),no.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(no),n.updateMatrixWorld(),i.makeTranslation(-js.x,-js.y,-js.z),ql.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ql,n.coordinateSystem,n.reversedDepth)}}class xu extends ya{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Xp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ma extends iu{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $p extends Hc{constructor(){super(new Ma(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hc extends ya{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new $p}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class rr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const io=new WeakMap;class qp extends ji{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ri.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if(io.has(a)===!0)i&&i(io.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ri.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),io.set(c,l),ri.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ri.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Yp extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Vc="\\[\\]\\.:\\/",jp=new RegExp("["+Vc+"]","g"),Gc="[^"+Vc+"]",Kp="[^"+Vc.replace("\\.","")+"]",Zp=/((?:WC+[\/:])*)/.source.replace("WC",Gc),Jp=/(WCOD+)?/.source.replace("WCOD",Kp),Qp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gc),em=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gc),tm=new RegExp("^"+Zp+Jp+Qp+em+"$"),nm=["material","materials","bones","map"];class im{constructor(e,t,n){const i=n||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Et{constructor(e,t,n){this.path=t,this.parsedPath=n||Et.parseTrackName(t),this.node=Et.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Et.Composite(e,t,n):new Et(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(jp,"")}static parseTrackName(e){const t=tm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);nm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Et.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Et.Composite=im;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Yl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ct(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ct(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class sm extends Yi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function jl(s,e,t,n){const i=rm(n);switch(t){case Xh:return s*e;case Tc:return s*e/i.components*i.byteLength;case Ac:return s*e/i.components*i.byteLength;case qh:return s*e*2/i.components*i.byteLength;case Rc:return s*e*2/i.components*i.byteLength;case $h:return s*e*3/i.components*i.byteLength;case Tn:return s*e*4/i.components*i.byteLength;case Cc:return s*e*4/i.components*i.byteLength;case sa:case ra:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case aa:case oa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Io:case Uo:return Math.max(s,16)*Math.max(e,8)/4;case Do:case No:return Math.max(s,8)*Math.max(e,8)/2;case Fo:case Oo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Bo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ko:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case zo:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ho:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Go:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Xo:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case $o:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case qo:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Yo:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case jo:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ko:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Zo:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Jo:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Qo:case ec:case tc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case nc:case ic:return Math.ceil(s/4)*Math.ceil(e/4)*8;case sc:case rc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rm(s){switch(s){case Wn:case Hh:return{byteLength:1,components:1};case cr:case Vh:case _r:return{byteLength:2,components:1};case Ec:case wc:return{byteLength:2,components:4};case Wi:case Sc:case Nn:return{byteLength:4,components:1};case Gh:case Wh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function yu(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function am(s){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(s.bindBuffer(l,o),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var om=`#ifdef USE_ALPHAHASH
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
}`,ht={alphahash_fragment:om,alphahash_pars_fragment:cm,alphamap_fragment:lm,alphamap_pars_fragment:hm,alphatest_fragment:um,alphatest_pars_fragment:dm,aomap_fragment:fm,aomap_pars_fragment:pm,batching_pars_vertex:mm,batching_vertex:gm,begin_vertex:_m,beginnormal_vertex:vm,bsdfs:xm,iridescence_fragment:ym,bumpmap_pars_fragment:Mm,clipping_planes_fragment:bm,clipping_planes_pars_fragment:Sm,clipping_planes_pars_vertex:Em,clipping_planes_vertex:wm,color_fragment:Tm,color_pars_fragment:Am,color_pars_vertex:Rm,color_vertex:Cm,common:Pm,cube_uv_reflection_fragment:Lm,defaultnormal_vertex:Dm,displacementmap_pars_vertex:Im,displacementmap_vertex:Nm,emissivemap_fragment:Um,emissivemap_pars_fragment:Fm,colorspace_fragment:Om,colorspace_pars_fragment:Bm,envmap_fragment:km,envmap_common_pars_fragment:zm,envmap_pars_fragment:Hm,envmap_pars_vertex:Vm,envmap_physical_pars_fragment:Qm,envmap_vertex:Gm,fog_vertex:Wm,fog_pars_vertex:Xm,fog_fragment:$m,fog_pars_fragment:qm,gradientmap_pars_fragment:Ym,lightmap_pars_fragment:jm,lights_lambert_fragment:Km,lights_lambert_pars_fragment:Zm,lights_pars_begin:Jm,lights_toon_fragment:eg,lights_toon_pars_fragment:tg,lights_phong_fragment:ng,lights_phong_pars_fragment:ig,lights_physical_fragment:sg,lights_physical_pars_fragment:rg,lights_fragment_begin:ag,lights_fragment_maps:og,lights_fragment_end:cg,logdepthbuf_fragment:lg,logdepthbuf_pars_fragment:hg,logdepthbuf_pars_vertex:ug,logdepthbuf_vertex:dg,map_fragment:fg,map_pars_fragment:pg,map_particle_fragment:mg,map_particle_pars_fragment:gg,metalnessmap_fragment:_g,metalnessmap_pars_fragment:vg,morphinstance_vertex:xg,morphcolor_vertex:yg,morphnormal_vertex:Mg,morphtarget_pars_vertex:bg,morphtarget_vertex:Sg,normal_fragment_begin:Eg,normal_fragment_maps:wg,normal_pars_fragment:Tg,normal_pars_vertex:Ag,normal_vertex:Rg,normalmap_pars_fragment:Cg,clearcoat_normal_fragment_begin:Pg,clearcoat_normal_fragment_maps:Lg,clearcoat_pars_fragment:Dg,iridescence_pars_fragment:Ig,opaque_fragment:Ng,packing:Ug,premultiplied_alpha_fragment:Fg,project_vertex:Og,dithering_fragment:Bg,dithering_pars_fragment:kg,roughnessmap_fragment:zg,roughnessmap_pars_fragment:Hg,shadowmap_pars_fragment:Vg,shadowmap_pars_vertex:Gg,shadowmap_vertex:Wg,shadowmask_pars_fragment:Xg,skinbase_vertex:$g,skinning_pars_vertex:qg,skinning_vertex:Yg,skinnormal_vertex:jg,specularmap_fragment:Kg,specularmap_pars_fragment:Zg,tonemapping_fragment:Jg,tonemapping_pars_fragment:Qg,transmission_fragment:e0,transmission_pars_fragment:t0,uv_pars_fragment:n0,uv_pars_vertex:i0,uv_vertex:s0,worldpos_vertex:r0,background_vert:a0,background_frag:o0,backgroundCube_vert:c0,backgroundCube_frag:l0,cube_vert:h0,cube_frag:u0,depth_vert:d0,depth_frag:f0,distanceRGBA_vert:p0,distanceRGBA_frag:m0,equirect_vert:g0,equirect_frag:_0,linedashed_vert:v0,linedashed_frag:x0,meshbasic_vert:y0,meshbasic_frag:M0,meshlambert_vert:b0,meshlambert_frag:S0,meshmatcap_vert:E0,meshmatcap_frag:w0,meshnormal_vert:T0,meshnormal_frag:A0,meshphong_vert:R0,meshphong_frag:C0,meshphysical_vert:P0,meshphysical_frag:L0,meshtoon_vert:D0,meshtoon_frag:I0,points_vert:N0,points_frag:U0,shadow_vert:F0,shadow_frag:O0,sprite_vert:B0,sprite_frag:k0},Pe={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},zn={basic:{uniforms:Qt([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Qt([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Ze(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Qt([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Qt([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Qt([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new Ze(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Qt([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Qt([Pe.points,Pe.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Qt([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Qt([Pe.common,Pe.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Qt([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Qt([Pe.sprite,Pe.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Qt([Pe.common,Pe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Qt([Pe.lights,Pe.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};zn.physical={uniforms:Qt([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Kr={r:0,b:0,g:0},Ui=new Rn,z0=new rt;function H0(s,e,t,n,i,r,a){const o=new Ze(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function _(y){let v=!1;const E=g(y);E===null?p(o,c):E&&E.isColor&&(p(E,1),v=!0);const w=s.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===va)?(h===void 0&&(h=new nt(new on(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:Ps(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ui.copy(v.backgroundRotation),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(z0.makeRotationFromEuler(Ui)),h.material.toneMapped=pt.getTransfer(E.colorSpace)!==Tt,(u!==E||d!==E.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new nt(new Ci(2,2),new Ri({name:"BackgroundMaterial",uniforms:Ps(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=pt.getTransfer(E.colorSpace)!==Tt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,v){y.getRGB(Kr,nu(s)),n.buffers.color.setClear(Kr.r,Kr.g,Kr.b,v,a)}function x(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:_,addToRenderList:m,dispose:x}}function V0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(S,I,U,G,q){let te=!1;const W=u(G,U,I);r!==W&&(r=W,l(r.object)),te=f(S,G,U,q),te&&g(S,G,U,q),q!==null&&e.update(q,s.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,v(S,I,U,G),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return s.createVertexArray()}function l(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function u(S,I,U){const G=U.wireframe===!0;let q=n[S.id];q===void 0&&(q={},n[S.id]=q);let te=q[I.id];te===void 0&&(te={},q[I.id]=te);let W=te[G];return W===void 0&&(W=d(c()),te[G]=W),W}function d(S){const I=[],U=[],G=[];for(let q=0;q<t;q++)I[q]=0,U[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:G,object:S,attributes:{},index:null}}function f(S,I,U,G){const q=r.attributes,te=I.attributes;let W=0;const oe=U.getAttributes();for(const X in oe)if(oe[X].location>=0){const Se=q[X];let Ee=te[X];if(Ee===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(Ee=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(Ee=S.instanceColor)),Se===void 0||Se.attribute!==Ee||Ee&&Se.data!==Ee.data)return!0;W++}return r.attributesNum!==W||r.index!==G}function g(S,I,U,G){const q={},te=I.attributes;let W=0;const oe=U.getAttributes();for(const X in oe)if(oe[X].location>=0){let Se=te[X];Se===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(Se=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(Se=S.instanceColor));const Ee={};Ee.attribute=Se,Se&&Se.data&&(Ee.data=Se.data),q[X]=Ee,W++}r.attributes=q,r.attributesNum=W,r.index=G}function _(){const S=r.newAttributes;for(let I=0,U=S.length;I<U;I++)S[I]=0}function m(S){p(S,0)}function p(S,I){const U=r.newAttributes,G=r.enabledAttributes,q=r.attributeDivisors;U[S]=1,G[S]===0&&(s.enableVertexAttribArray(S),G[S]=1),q[S]!==I&&(s.vertexAttribDivisor(S,I),q[S]=I)}function x(){const S=r.newAttributes,I=r.enabledAttributes;for(let U=0,G=I.length;U<G;U++)I[U]!==S[U]&&(s.disableVertexAttribArray(U),I[U]=0)}function y(S,I,U,G,q,te,W){W===!0?s.vertexAttribIPointer(S,I,U,q,te):s.vertexAttribPointer(S,I,U,G,q,te)}function v(S,I,U,G){_();const q=G.attributes,te=U.getAttributes(),W=I.defaultAttributeValues;for(const oe in te){const X=te[oe];if(X.location>=0){let fe=q[oe];if(fe===void 0&&(oe==="instanceMatrix"&&S.instanceMatrix&&(fe=S.instanceMatrix),oe==="instanceColor"&&S.instanceColor&&(fe=S.instanceColor)),fe!==void 0){const Se=fe.normalized,Ee=fe.itemSize,Ae=e.get(fe);if(Ae===void 0)continue;const at=Ae.buffer,We=Ae.type,it=Ae.bytesPerElement,ne=We===s.INT||We===s.UNSIGNED_INT||fe.gpuType===Sc;if(fe.isInterleavedBufferAttribute){const ie=fe.data,Re=ie.stride,ge=fe.offset;if(ie.isInstancedInterleavedBuffer){for(let pe=0;pe<X.locationSize;pe++)p(X.location+pe,ie.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let pe=0;pe<X.locationSize;pe++)m(X.location+pe);s.bindBuffer(s.ARRAY_BUFFER,at);for(let pe=0;pe<X.locationSize;pe++)y(X.location+pe,Ee/X.locationSize,We,Se,Re*it,(ge+Ee/X.locationSize*pe)*it,ne)}else{if(fe.isInstancedBufferAttribute){for(let ie=0;ie<X.locationSize;ie++)p(X.location+ie,fe.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ie=0;ie<X.locationSize;ie++)m(X.location+ie);s.bindBuffer(s.ARRAY_BUFFER,at);for(let ie=0;ie<X.locationSize;ie++)y(X.location+ie,Ee/X.locationSize,We,Se,Ee*it,Ee/X.locationSize*ie*it,ne)}}else if(W!==void 0){const Se=W[oe];if(Se!==void 0)switch(Se.length){case 2:s.vertexAttrib2fv(X.location,Se);break;case 3:s.vertexAttrib3fv(X.location,Se);break;case 4:s.vertexAttrib4fv(X.location,Se);break;default:s.vertexAttrib1fv(X.location,Se)}}}}x()}function E(){D();for(const S in n){const I=n[S];for(const U in I){const G=I[U];for(const q in G)h(G[q].object),delete G[q];delete I[U]}delete n[S]}}function w(S){if(n[S.id]===void 0)return;const I=n[S.id];for(const U in I){const G=I[U];for(const q in G)h(G[q].object),delete G[q];delete I[U]}delete n[S.id]}function A(S){for(const I in n){const U=n[I];if(U[S.id]===void 0)continue;const G=U[S.id];for(const q in G)h(G[q].object),delete G[q];delete U[S.id]}}function D(){b(),a=!0,r!==i&&(r=i,l(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:D,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function G0(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function W0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==Tn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===_r&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Wn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Nn&&!D)}function c(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:E,maxSamples:w}}function X0(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Mi,o=new lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,y=x*4;let v=p.clippingState||null;c.value=v,v=h(g,d,y,f);for(let E=0;E!==y;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,v=f;y!==_;++y,v+=4)a.copy(u[y]).applyMatrix4(x,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function $0(s){let e=new WeakMap;function t(a,o){return o===Po?a.mapping=Ts:o===Lo&&(a.mapping=As),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Po||o===Lo)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Qf(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const vs=4,Kl=[.125,.215,.35,.446,.526,.582],Vi=20,so=new Ma,Zl=new Ze;let ro=null,ao=0,oo=0,co=!1;const ki=(1+Math.sqrt(5))/2,ps=1/ki,Jl=[new P(-ki,ps,0),new P(ki,ps,0),new P(-ps,0,ki),new P(ps,0,ki),new P(0,ki,-ps),new P(0,ki,ps),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],q0=new P;class uc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=q0}=r;ro=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=th(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ro,ao,oo),this._renderer.xr.enabled=co,e.scissorTest=!1,Zr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ts||e.mapping===As?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ro=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:_r,format:Tn,colorSpace:rn,depthBuffer:!1},i=Ql(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ql(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Y0(r)),this._blurMaterial=j0(r,e,t)}return i}_compileMaterial(e){const t=new nt(this._lodPlanes[0],e);this._renderer.compile(t,so)}_sceneToCubeUV(e,t,n,i,r){const c=new tn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Zl),u.toneMapping=wi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const _=new Un({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),m=new nt(new on,_);let p=!1;const x=e.background;x?x.isColor&&(_.color.copy(x),e.background=null,p=!0):(_.color.copy(Zl),p=!0);for(let y=0;y<6;y++){const v=y%3;v===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):v===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));const E=this._cubeSize;Zr(i,v*E,y>2?E:0,E,E),u.setRenderTarget(i),p&&u.render(m,c),u.render(e,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ts||e.mapping===As;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=th()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=eh());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new nt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Zr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,so)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Jl[(i-r-1)%Jl.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new nt(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Vi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Vi;m>Vi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vi}`);const p=[];let x=0;for(let A=0;A<Vi;++A){const D=A/_,b=Math.exp(-D*D/2);p.push(b),A===0?x+=b:A<m&&(x+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const v=this._sizeLods[i],E=3*v*(i>y-vs?i-y+vs:0),w=4*(this._cubeSize-v);Zr(t,E,w,3*v,2*v),c.setRenderTarget(t),c.render(u,so)}}function Y0(s){const e=[],t=[],n=[];let i=s;const r=s-vs+1+Kl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-vs?c=Kl[a-s+vs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),y=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,D=w>2?0:-1,b=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];x.set(b,_*g*w),y.set(d,m*g*w);const S=[w,w,w,w,w,w];v.set(S,p*g*w)}const E=new Mt;E.setAttribute("position",new Ft(x,_)),E.setAttribute("uv",new Ft(y,m)),E.setAttribute("faceIndex",new Ft(v,p)),e.push(E),i>vs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ql(s,e,t){const n=new Xi(s,e,t);return n.texture.mapping=va,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function j0(s,e,t){const n=new Float32Array(Vi),i=new P(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Wc(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function eh(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wc(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function th(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Wc(){return`

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
	`}function K0(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Po||c===Lo,h=c===Ts||c===As;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new uc(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new uc(s)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Z0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&mr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function J0(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let y=0,v=x.length;y<v;y+=3){const E=x[y+0],w=x[y+1],A=x[y+2];d.push(E,w,w,A,A,E)}}else if(g!==void 0){const x=g.array;_=g.version;for(let y=0,v=x.length/3-1;y<v;y+=3){const E=y+0,w=y+1,A=y+2;d.push(E,w,w,A,A,E)}}else return;const m=new(Kh(d)?tu:eu)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Q0(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*_[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function e_(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function t_(s,e,t){const n=new WeakMap,i=new vt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let b=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let v=o.attributes.position.count*y,E=1;v>e.maxTextureSize&&(E=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const w=new Float32Array(v*E*4*u),A=new Zh(w,v,E,u);A.type=Nn,A.needsUpdate=!0;const D=y*4;for(let S=0;S<u;S++){const I=m[S],U=p[S],G=x[S],q=v*E*4*S;for(let te=0;te<I.count;te++){const W=te*D;f===!0&&(i.fromBufferAttribute(I,te),w[q+W+0]=i.x,w[q+W+1]=i.y,w[q+W+2]=i.z,w[q+W+3]=0),g===!0&&(i.fromBufferAttribute(U,te),w[q+W+4]=i.x,w[q+W+5]=i.y,w[q+W+6]=i.z,w[q+W+7]=0),_===!0&&(i.fromBufferAttribute(G,te),w[q+W+8]=i.x,w[q+W+9]=i.y,w[q+W+10]=i.z,w[q+W+11]=G.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new we(v,E)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function n_(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const Mu=new Ht,nh=new hu(1,1),bu=new Zh,Su=new Ff,Eu=new su,ih=[],sh=[],rh=new Float32Array(16),ah=new Float32Array(9),oh=new Float32Array(4);function zs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=ih[i];if(r===void 0&&(r=new Float32Array(i),ih[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Vt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Gt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ba(s,e){let t=sh[e];t===void 0&&(t=new Int32Array(e),sh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function i_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function s_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2fv(this.addr,e),Gt(t,e)}}function r_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;s.uniform3fv(this.addr,e),Gt(t,e)}}function a_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4fv(this.addr,e),Gt(t,e)}}function o_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;oh.set(n),s.uniformMatrix2fv(this.addr,!1,oh),Gt(t,n)}}function c_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;ah.set(n),s.uniformMatrix3fv(this.addr,!1,ah),Gt(t,n)}}function l_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;rh.set(n),s.uniformMatrix4fv(this.addr,!1,rh),Gt(t,n)}}function h_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function u_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2iv(this.addr,e),Gt(t,e)}}function d_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;s.uniform3iv(this.addr,e),Gt(t,e)}}function f_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4iv(this.addr,e),Gt(t,e)}}function p_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function m_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2uiv(this.addr,e),Gt(t,e)}}function g_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;s.uniform3uiv(this.addr,e),Gt(t,e)}}function __(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4uiv(this.addr,e),Gt(t,e)}}function v_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(nh.compareFunction=jh,r=nh):r=Mu,t.setTexture2D(e||r,i)}function x_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Su,i)}function y_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Eu,i)}function M_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||bu,i)}function b_(s){switch(s){case 5126:return i_;case 35664:return s_;case 35665:return r_;case 35666:return a_;case 35674:return o_;case 35675:return c_;case 35676:return l_;case 5124:case 35670:return h_;case 35667:case 35671:return u_;case 35668:case 35672:return d_;case 35669:case 35673:return f_;case 5125:return p_;case 36294:return m_;case 36295:return g_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return v_;case 35679:case 36299:case 36307:return x_;case 35680:case 36300:case 36308:case 36293:return y_;case 36289:case 36303:case 36311:case 36292:return M_}}function S_(s,e){s.uniform1fv(this.addr,e)}function E_(s,e){const t=zs(e,this.size,2);s.uniform2fv(this.addr,t)}function w_(s,e){const t=zs(e,this.size,3);s.uniform3fv(this.addr,t)}function T_(s,e){const t=zs(e,this.size,4);s.uniform4fv(this.addr,t)}function A_(s,e){const t=zs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function R_(s,e){const t=zs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function C_(s,e){const t=zs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function P_(s,e){s.uniform1iv(this.addr,e)}function L_(s,e){s.uniform2iv(this.addr,e)}function D_(s,e){s.uniform3iv(this.addr,e)}function I_(s,e){s.uniform4iv(this.addr,e)}function N_(s,e){s.uniform1uiv(this.addr,e)}function U_(s,e){s.uniform2uiv(this.addr,e)}function F_(s,e){s.uniform3uiv(this.addr,e)}function O_(s,e){s.uniform4uiv(this.addr,e)}function B_(s,e,t){const n=this.cache,i=e.length,r=ba(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Mu,r[a])}function k_(s,e,t){const n=this.cache,i=e.length,r=ba(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Su,r[a])}function z_(s,e,t){const n=this.cache,i=e.length,r=ba(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Eu,r[a])}function H_(s,e,t){const n=this.cache,i=e.length,r=ba(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||bu,r[a])}function V_(s){switch(s){case 5126:return S_;case 35664:return E_;case 35665:return w_;case 35666:return T_;case 35674:return A_;case 35675:return R_;case 35676:return C_;case 5124:case 35670:return P_;case 35667:case 35671:return L_;case 35668:case 35672:return D_;case 35669:case 35673:return I_;case 5125:return N_;case 36294:return U_;case 36295:return F_;case 36296:return O_;case 35678:case 36198:case 36298:case 36306:case 35682:return B_;case 35679:case 36299:case 36307:return k_;case 35680:case 36300:case 36308:case 36293:return z_;case 36289:case 36303:case 36311:case 36292:return H_}}class G_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=b_(t.type)}}class W_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=V_(t.type)}}class X_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const lo=/(\w+)(\])?(\[|\.)?/g;function ch(s,e){s.seq.push(e),s.map[e.id]=e}function $_(s,e,t){const n=s.name,i=n.length;for(lo.lastIndex=0;;){const r=lo.exec(n),a=lo.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){ch(t,l===void 0?new G_(o,s,e):new W_(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new X_(o),ch(t,u)),t=u}}}class ca{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);$_(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function lh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const q_=37297;let Y_=0;function j_(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const hh=new lt;function K_(s){pt._getMatrix(hh,pt.workingColorSpace,s);const e=`mat3( ${hh.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(s)){case da:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function uh(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+j_(s.getShaderSource(e),o)}else return r}function Z_(s,e){const t=K_(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function J_(s,e){let t;switch(e){case qd:t="Linear";break;case Yd:t="Reinhard";break;case jd:t="Cineon";break;case Bh:t="ACESFilmic";break;case Zd:t="AgX";break;case Jd:t="Neutral";break;case Kd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Jr=new P;function Q_(){pt.getLuminanceCoefficients(Jr);const s=Jr.x.toFixed(4),e=Jr.y.toFixed(4),t=Jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ev(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function tv(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nv(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function tr(s){return s!==""}function dh(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fh(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const iv=/^[ \t]*#include +<([\w\d./]+)>/gm;function dc(s){return s.replace(iv,rv)}const sv=new Map;function rv(s,e){let t=ht[e];if(t===void 0){const n=sv.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return dc(t)}const av=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ph(s){return s.replace(av,ov)}function ov(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function mh(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function cv(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Fh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Oh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ei&&(e="SHADOWMAP_TYPE_VSM"),e}function lv(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ts:case As:e="ENVMAP_TYPE_CUBE";break;case va:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case As:e="ENVMAP_MODE_REFRACTION";break}return e}function uv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case bc:e="ENVMAP_BLENDING_MULTIPLY";break;case Xd:e="ENVMAP_BLENDING_MIX";break;case $d:e="ENVMAP_BLENDING_ADD";break}return e}function dv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function fv(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=cv(t),l=lv(t),h=hv(t),u=uv(t),d=dv(t),f=ev(t),g=tv(r),_=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(tr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(tr).join(`
`),p.length>0&&(p+=`
`)):(m=[mh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),p=[mh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wi?"#define TONE_MAPPING":"",t.toneMapping!==wi?ht.tonemapping_pars_fragment:"",t.toneMapping!==wi?J_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Z_("linearToOutputTexel",t.outputColorSpace),Q_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(tr).join(`
`)),a=dc(a),a=dh(a,t),a=fh(a,t),o=dc(o),o=dh(o,t),o=fh(o,t),a=ph(a),o=ph(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=x+m+a,v=x+p+o,E=lh(i,i.VERTEX_SHADER,y),w=lh(i,i.FRAGMENT_SHADER,v);i.attachShader(_,E),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(I){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(_)||"",G=i.getShaderInfoLog(E)||"",q=i.getShaderInfoLog(w)||"",te=U.trim(),W=G.trim(),oe=q.trim();let X=!0,fe=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,w);else{const Se=uh(i,E,"vertex"),Ee=uh(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+te+`
`+Se+`
`+Ee)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(W===""||oe==="")&&(fe=!1);fe&&(I.diagnostics={runnable:X,programLog:te,vertexShader:{log:W,prefix:m},fragmentShader:{log:oe,prefix:p}})}i.deleteShader(E),i.deleteShader(w),D=new ca(i,_),b=nv(i,_)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,q_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Y_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=w,this}let pv=0;class mv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new gv(e),t.set(e,n)),n}}class gv{constructor(e){this.id=pv++,this.code=e,this.usedTimes=0}}function _v(s,e,t,n,i,r,a){const o=new Jh,c=new mv,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,S,I,U,G){const q=U.fog,te=G.geometry,W=b.isMeshStandardMaterial?U.environment:null,oe=(b.isMeshStandardMaterial?t:e).get(b.envMap||W),X=oe&&oe.mapping===va?oe.image.height:null,fe=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const Se=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Ee=Se!==void 0?Se.length:0;let Ae=0;te.morphAttributes.position!==void 0&&(Ae=1),te.morphAttributes.normal!==void 0&&(Ae=2),te.morphAttributes.color!==void 0&&(Ae=3);let at,We,it,ne;if(fe){const Ve=zn[fe];at=Ve.vertexShader,We=Ve.fragmentShader}else at=b.vertexShader,We=b.fragmentShader,c.update(b),it=c.getVertexShaderID(b),ne=c.getFragmentShaderID(b);const ie=s.getRenderTarget(),Re=s.state.buffers.depth.getReversed(),ge=G.isInstancedMesh===!0,pe=G.isBatchedMesh===!0,Oe=!!b.map,Xe=!!b.matcap,N=!!oe,Ne=!!b.aoMap,Le=!!b.lightMap,Ce=!!b.bumpMap,ce=!!b.normalMap,Be=!!b.displacementMap,me=!!b.emissiveMap,Ie=!!b.metalnessMap,et=!!b.roughnessMap,Ke=b.anisotropy>0,R=b.clearcoat>0,M=b.dispersion>0,k=b.iridescence>0,Q=b.sheen>0,se=b.transmission>0,Y=Ke&&!!b.anisotropyMap,ze=R&&!!b.clearcoatMap,xe=R&&!!b.clearcoatNormalMap,Ue=R&&!!b.clearcoatRoughnessMap,ke=k&&!!b.iridescenceMap,de=k&&!!b.iridescenceThicknessMap,B=Q&&!!b.sheenColorMap,le=Q&&!!b.sheenRoughnessMap,he=!!b.specularMap,j=!!b.specularColorMap,F=!!b.specularIntensityMap,C=se&&!!b.transmissionMap,V=se&&!!b.thicknessMap,K=!!b.gradientMap,ee=!!b.alphaMap,$=b.alphaTest>0,H=!!b.alphaHash,ae=!!b.extensions;let Me=wi;b.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Me=s.toneMapping);const Ye={shaderID:fe,shaderType:b.type,shaderName:b.name,vertexShader:at,fragmentShader:We,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:ne,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:pe,batchingColor:pe&&G._colorsTexture!==null,instancing:ge,instancingColor:ge&&G.instanceColor!==null,instancingMorph:ge&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ie===null?s.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:rn,alphaToCoverage:!!b.alphaToCoverage,map:Oe,matcap:Xe,envMap:N,envMapMode:N&&oe.mapping,envMapCubeUVHeight:X,aoMap:Ne,lightMap:Le,bumpMap:Ce,normalMap:ce,displacementMap:d&&Be,emissiveMap:me,normalMapObjectSpace:ce&&b.normalMapType===rf,normalMapTangentSpace:ce&&b.normalMapType===Pc,metalnessMap:Ie,roughnessMap:et,anisotropy:Ke,anisotropyMap:Y,clearcoat:R,clearcoatMap:ze,clearcoatNormalMap:xe,clearcoatRoughnessMap:Ue,dispersion:M,iridescence:k,iridescenceMap:ke,iridescenceThicknessMap:de,sheen:Q,sheenColorMap:B,sheenRoughnessMap:le,specularMap:he,specularColorMap:j,specularIntensityMap:F,transmission:se,transmissionMap:C,thicknessMap:V,gradientMap:K,opaque:b.transparent===!1&&b.blending===ys&&b.alphaToCoverage===!1,alphaMap:ee,alphaTest:$,alphaHash:H,combine:b.combine,mapUv:Oe&&_(b.map.channel),aoMapUv:Ne&&_(b.aoMap.channel),lightMapUv:Le&&_(b.lightMap.channel),bumpMapUv:Ce&&_(b.bumpMap.channel),normalMapUv:ce&&_(b.normalMap.channel),displacementMapUv:Be&&_(b.displacementMap.channel),emissiveMapUv:me&&_(b.emissiveMap.channel),metalnessMapUv:Ie&&_(b.metalnessMap.channel),roughnessMapUv:et&&_(b.roughnessMap.channel),anisotropyMapUv:Y&&_(b.anisotropyMap.channel),clearcoatMapUv:ze&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:xe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:de&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:B&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:le&&_(b.sheenRoughnessMap.channel),specularMapUv:he&&_(b.specularMap.channel),specularColorMapUv:j&&_(b.specularColorMap.channel),specularIntensityMapUv:F&&_(b.specularIntensityMap.channel),transmissionMapUv:C&&_(b.transmissionMap.channel),thicknessMapUv:V&&_(b.thicknessMap.channel),alphaMapUv:ee&&_(b.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(ce||Ke),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!te.attributes.uv&&(Oe||ee),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Re,skinning:G.isSkinnedMesh===!0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ae,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Me,decodeVideoTexture:Oe&&b.map.isVideoTexture===!0&&pt.getTransfer(b.map.colorSpace)===Tt,decodeVideoTextureEmissive:me&&b.emissiveMap.isVideoTexture===!0&&pt.getTransfer(b.emissiveMap.colorSpace)===Tt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===zt,flipSided:b.side===nn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ae&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&b.extensions.multiDraw===!0||pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ye.vertexUv1s=l.has(1),Ye.vertexUv2s=l.has(2),Ye.vertexUv3s=l.has(3),l.clear(),Ye}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)S.push(I),S.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(x(S,b),y(S,b),S.push(s.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function x(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function y(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),b.push(o.mask)}function v(b){const S=g[b.type];let I;if(S){const U=zn[S];I=jf.clone(U.uniforms)}else I=b.uniforms;return I}function E(b,S){let I;for(let U=0,G=h.length;U<G;U++){const q=h[U];if(q.cacheKey===S){I=q,++I.usedTimes;break}}return I===void 0&&(I=new fv(s,S,b,r),h.push(I)),I}function w(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function A(b){c.remove(b)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:D}}function vv(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function xv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function gh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function _h(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||xv),n.length>1&&n.sort(d||gh),i.length>1&&i.sort(d||gh)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function yv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new _h,s.set(n,[a])):i>=r.length?(a=new _h,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Mv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Ze};break;case"SpotLight":t={position:new P,direction:new P,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new P,halfWidth:new P,halfHeight:new P};break}return s[e.id]=t,t}}}function bv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Sv=0;function Ev(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function wv(s){const e=new Mv,t=bv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const i=new P,r=new rt,a=new rt;function o(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,x=0,y=0,v=0,E=0,w=0,A=0;l.sort(Ev);for(let b=0,S=l.length;b<S;b++){const I=l[b],U=I.color,G=I.intensity,q=I.distance,te=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=U.r*G,u+=U.g*G,d+=U.b*G;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],G);A++}else if(I.isDirectionalLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const oe=I.shadow,X=t.get(I);X.shadowIntensity=oe.intensity,X.shadowBias=oe.bias,X.shadowNormalBias=oe.normalBias,X.shadowRadius=oe.radius,X.shadowMapSize=oe.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=te,n.directionalShadowMatrix[f]=I.shadow.matrix,x++}n.directional[f]=W,f++}else if(I.isSpotLight){const W=e.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(U).multiplyScalar(G),W.distance=q,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[_]=W;const oe=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,oe.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[_]=oe.matrix,I.castShadow){const X=t.get(I);X.shadowIntensity=oe.intensity,X.shadowBias=oe.bias,X.shadowNormalBias=oe.normalBias,X.shadowRadius=oe.radius,X.shadowMapSize=oe.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=te,v++}_++}else if(I.isRectAreaLight){const W=e.get(I);W.color.copy(U).multiplyScalar(G),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=W,m++}else if(I.isPointLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const oe=I.shadow,X=t.get(I);X.shadowIntensity=oe.intensity,X.shadowBias=oe.bias,X.shadowNormalBias=oe.normalBias,X.shadowRadius=oe.radius,X.shadowMapSize=oe.mapSize,X.shadowCameraNear=oe.camera.near,X.shadowCameraFar=oe.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=te,n.pointShadowMatrix[g]=I.shadow.matrix,y++}n.point[g]=W,g++}else if(I.isHemisphereLight){const W=e.get(I);W.skyColor.copy(I.color).multiplyScalar(G),W.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[p]=W,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==x||D.numPointShadows!==y||D.numSpotShadows!==v||D.numSpotMaps!==E||D.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,D.directionalLength=f,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=x,D.numPointShadows=y,D.numSpotShadows=v,D.numSpotMaps=E,D.numLightProbes=A,n.version=Sv++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const y=l[p];if(y.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(y.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function vh(s){const e=new wv(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Tv(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new vh(s),e.set(i,[o])):r>=a.length?(o=new vh(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Av=`void main() {
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
}`;function Cv(s,e,t){let n=new Fc;const i=new we,r=new we,a=new vt,o=new Ap({depthPacking:sf}),c=new Rp,l={},h=t.maxTextureSize,u={[li]:nn,[nn]:li,[zt]:zt},d=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:Av,fragmentShader:Rv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Mt;g.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new nt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fh;let p=this.type;this.render=function(w,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const b=s.getRenderTarget(),S=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),U=s.state;U.setBlending(Ei),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const G=p!==ei&&this.type===ei,q=p===ei&&this.type!==ei;for(let te=0,W=w.length;te<W;te++){const oe=w[te],X=oe.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const fe=X.getFrameExtents();if(i.multiply(fe),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/fe.x),i.x=r.x*fe.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/fe.y),i.y=r.y*fe.y,X.mapSize.y=r.y)),X.map===null||G===!0||q===!0){const Ee=this.type!==ei?{minFilter:sn,magFilter:sn}:{};X.map!==null&&X.map.dispose(),X.map=new Xi(i.x,i.y,Ee),X.map.texture.name=oe.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const Se=X.getViewportCount();for(let Ee=0;Ee<Se;Ee++){const Ae=X.getViewport(Ee);a.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),U.viewport(a),X.updateMatrices(oe,Ee),n=X.getFrustum(),v(A,D,X.camera,oe,this.type)}X.isPointLightShadow!==!0&&this.type===ei&&x(X,D),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,S,I)};function x(w,A){const D=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Xi(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(A,null,D,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(A,null,D,f,_,null)}function y(w,A,D,b){let S=null;const I=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)S=I;else if(S=D.isPointLight===!0?c:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=S.uuid,G=A.uuid;let q=l[U];q===void 0&&(q={},l[U]=q);let te=q[G];te===void 0&&(te=S.clone(),q[G]=te,A.addEventListener("dispose",E)),S=te}if(S.visible=A.visible,S.wireframe=A.wireframe,b===ei?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:u[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=s.properties.get(S);U.light=D}return S}function v(w,A,D,b,S){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===ei)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);const G=e.update(w),q=w.material;if(Array.isArray(q)){const te=G.groups;for(let W=0,oe=te.length;W<oe;W++){const X=te[W],fe=q[X.materialIndex];if(fe&&fe.visible){const Se=y(w,fe,b,S);w.onBeforeShadow(s,w,A,D,G,Se,X),s.renderBufferDirect(D,null,G,Se,w,X),w.onAfterShadow(s,w,A,D,G,Se,X)}}}else if(q.visible){const te=y(w,q,b,S);w.onBeforeShadow(s,w,A,D,G,te,null),s.renderBufferDirect(D,null,G,te,w,null),w.onAfterShadow(s,w,A,D,G,te,null)}}const U=w.children;for(let G=0,q=U.length;G<q;G++)v(U[G],A,D,b,S)}function E(w){w.target.removeEventListener("dispose",E);for(const D in l){const b=l[D],S=w.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const Pv={[So]:Eo,[wo]:Ro,[To]:Co,[ws]:Ao,[Eo]:So,[Ro]:wo,[Co]:To,[Ao]:ws};function Lv(s,e){function t(){let C=!1;const V=new vt;let K=null;const ee=new vt(0,0,0,0);return{setMask:function($){K!==$&&!C&&(s.colorMask($,$,$,$),K=$)},setLocked:function($){C=$},setClear:function($,H,ae,Me,Ye){Ye===!0&&($*=Me,H*=Me,ae*=Me),V.set($,H,ae,Me),ee.equals(V)===!1&&(s.clearColor($,H,ae,Me),ee.copy(V))},reset:function(){C=!1,K=null,ee.set(-1,0,0,0)}}}function n(){let C=!1,V=!1,K=null,ee=null,$=null;return{setReversed:function(H){if(V!==H){const ae=e.get("EXT_clip_control");H?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT),V=H;const Me=$;$=null,this.setClear(Me)}},getReversed:function(){return V},setTest:function(H){H?ie(s.DEPTH_TEST):Re(s.DEPTH_TEST)},setMask:function(H){K!==H&&!C&&(s.depthMask(H),K=H)},setFunc:function(H){if(V&&(H=Pv[H]),ee!==H){switch(H){case So:s.depthFunc(s.NEVER);break;case Eo:s.depthFunc(s.ALWAYS);break;case wo:s.depthFunc(s.LESS);break;case ws:s.depthFunc(s.LEQUAL);break;case To:s.depthFunc(s.EQUAL);break;case Ao:s.depthFunc(s.GEQUAL);break;case Ro:s.depthFunc(s.GREATER);break;case Co:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ee=H}},setLocked:function(H){C=H},setClear:function(H){$!==H&&(V&&(H=1-H),s.clearDepth(H),$=H)},reset:function(){C=!1,K=null,ee=null,$=null,V=!1}}}function i(){let C=!1,V=null,K=null,ee=null,$=null,H=null,ae=null,Me=null,Ye=null;return{setTest:function(Ve){C||(Ve?ie(s.STENCIL_TEST):Re(s.STENCIL_TEST))},setMask:function(Ve){V!==Ve&&!C&&(s.stencilMask(Ve),V=Ve)},setFunc:function(Ve,re,ve){(K!==Ve||ee!==re||$!==ve)&&(s.stencilFunc(Ve,re,ve),K=Ve,ee=re,$=ve)},setOp:function(Ve,re,ve){(H!==Ve||ae!==re||Me!==ve)&&(s.stencilOp(Ve,re,ve),H=Ve,ae=re,Me=ve)},setLocked:function(Ve){C=Ve},setClear:function(Ve){Ye!==Ve&&(s.clearStencil(Ve),Ye=Ve)},reset:function(){C=!1,V=null,K=null,ee=null,$=null,H=null,ae=null,Me=null,Ye=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,y=null,v=null,E=null,w=null,A=new Ze(0,0,0),D=0,b=!1,S=null,I=null,U=null,G=null,q=null;const te=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,oe=0;const X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=oe>=1):X.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=oe>=2);let fe=null,Se={};const Ee=s.getParameter(s.SCISSOR_BOX),Ae=s.getParameter(s.VIEWPORT),at=new vt().fromArray(Ee),We=new vt().fromArray(Ae);function it(C,V,K,ee){const $=new Uint8Array(4),H=s.createTexture();s.bindTexture(C,H),s.texParameteri(C,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(C,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ae=0;ae<K;ae++)C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY?s.texImage3D(V,0,s.RGBA,1,1,ee,0,s.RGBA,s.UNSIGNED_BYTE,$):s.texImage2D(V+ae,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,$);return H}const ne={};ne[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),ne[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ne[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(s.DEPTH_TEST),a.setFunc(ws),Ce(!1),ce(el),ie(s.CULL_FACE),Ne(Ei);function ie(C){h[C]!==!0&&(s.enable(C),h[C]=!0)}function Re(C){h[C]!==!1&&(s.disable(C),h[C]=!1)}function ge(C,V){return u[C]!==V?(s.bindFramebuffer(C,V),u[C]=V,C===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=V),C===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=V),!0):!1}function pe(C,V){let K=f,ee=!1;if(C){K=d.get(V),K===void 0&&(K=[],d.set(V,K));const $=C.textures;if(K.length!==$.length||K[0]!==s.COLOR_ATTACHMENT0){for(let H=0,ae=$.length;H<ae;H++)K[H]=s.COLOR_ATTACHMENT0+H;K.length=$.length,ee=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,ee=!0);ee&&s.drawBuffers(K)}function Oe(C){return g!==C?(s.useProgram(C),g=C,!0):!1}const Xe={[Hi]:s.FUNC_ADD,[Rd]:s.FUNC_SUBTRACT,[Cd]:s.FUNC_REVERSE_SUBTRACT};Xe[Pd]=s.MIN,Xe[Ld]=s.MAX;const N={[Dd]:s.ZERO,[Id]:s.ONE,[Nd]:s.SRC_COLOR,[Mo]:s.SRC_ALPHA,[zd]:s.SRC_ALPHA_SATURATE,[Bd]:s.DST_COLOR,[Fd]:s.DST_ALPHA,[Ud]:s.ONE_MINUS_SRC_COLOR,[bo]:s.ONE_MINUS_SRC_ALPHA,[kd]:s.ONE_MINUS_DST_COLOR,[Od]:s.ONE_MINUS_DST_ALPHA,[Hd]:s.CONSTANT_COLOR,[Vd]:s.ONE_MINUS_CONSTANT_COLOR,[Gd]:s.CONSTANT_ALPHA,[Wd]:s.ONE_MINUS_CONSTANT_ALPHA};function Ne(C,V,K,ee,$,H,ae,Me,Ye,Ve){if(C===Ei){_===!0&&(Re(s.BLEND),_=!1);return}if(_===!1&&(ie(s.BLEND),_=!0),C!==Ad){if(C!==m||Ve!==b){if((p!==Hi||v!==Hi)&&(s.blendEquation(s.FUNC_ADD),p=Hi,v=Hi),Ve)switch(C){case ys:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case tl:s.blendFunc(s.ONE,s.ONE);break;case nl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case il:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case ys:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case tl:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case nl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case il:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}x=null,y=null,E=null,w=null,A.set(0,0,0),D=0,m=C,b=Ve}return}$=$||V,H=H||K,ae=ae||ee,(V!==p||$!==v)&&(s.blendEquationSeparate(Xe[V],Xe[$]),p=V,v=$),(K!==x||ee!==y||H!==E||ae!==w)&&(s.blendFuncSeparate(N[K],N[ee],N[H],N[ae]),x=K,y=ee,E=H,w=ae),(Me.equals(A)===!1||Ye!==D)&&(s.blendColor(Me.r,Me.g,Me.b,Ye),A.copy(Me),D=Ye),m=C,b=!1}function Le(C,V){C.side===zt?Re(s.CULL_FACE):ie(s.CULL_FACE);let K=C.side===nn;V&&(K=!K),Ce(K),C.blending===ys&&C.transparent===!1?Ne(Ei):Ne(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const ee=C.stencilWrite;o.setTest(ee),ee&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),me(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ie(s.SAMPLE_ALPHA_TO_COVERAGE):Re(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(C){S!==C&&(C?s.frontFace(s.CW):s.frontFace(s.CCW),S=C)}function ce(C){C!==wd?(ie(s.CULL_FACE),C!==I&&(C===el?s.cullFace(s.BACK):C===Td?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Re(s.CULL_FACE),I=C}function Be(C){C!==U&&(W&&s.lineWidth(C),U=C)}function me(C,V,K){C?(ie(s.POLYGON_OFFSET_FILL),(G!==V||q!==K)&&(s.polygonOffset(V,K),G=V,q=K)):Re(s.POLYGON_OFFSET_FILL)}function Ie(C){C?ie(s.SCISSOR_TEST):Re(s.SCISSOR_TEST)}function et(C){C===void 0&&(C=s.TEXTURE0+te-1),fe!==C&&(s.activeTexture(C),fe=C)}function Ke(C,V,K){K===void 0&&(fe===null?K=s.TEXTURE0+te-1:K=fe);let ee=Se[K];ee===void 0&&(ee={type:void 0,texture:void 0},Se[K]=ee),(ee.type!==C||ee.texture!==V)&&(fe!==K&&(s.activeTexture(K),fe=K),s.bindTexture(C,V||ne[C]),ee.type=C,ee.texture=V)}function R(){const C=Se[fe];C!==void 0&&C.type!==void 0&&(s.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function M(){try{s.compressedTexImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function k(){try{s.compressedTexImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Q(){try{s.texSubImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function se(){try{s.texSubImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Y(){try{s.compressedTexSubImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ze(){try{s.compressedTexSubImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function xe(){try{s.texStorage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ue(){try{s.texStorage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ke(){try{s.texImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function de(){try{s.texImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function B(C){at.equals(C)===!1&&(s.scissor(C.x,C.y,C.z,C.w),at.copy(C))}function le(C){We.equals(C)===!1&&(s.viewport(C.x,C.y,C.z,C.w),We.copy(C))}function he(C,V){let K=l.get(V);K===void 0&&(K=new WeakMap,l.set(V,K));let ee=K.get(C);ee===void 0&&(ee=s.getUniformBlockIndex(V,C.name),K.set(C,ee))}function j(C,V){const ee=l.get(V).get(C);c.get(V)!==ee&&(s.uniformBlockBinding(V,ee,C.__bindingPointIndex),c.set(V,ee))}function F(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},fe=null,Se={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,y=null,v=null,E=null,w=null,A=new Ze(0,0,0),D=0,b=!1,S=null,I=null,U=null,G=null,q=null,at.set(0,0,s.canvas.width,s.canvas.height),We.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:Re,bindFramebuffer:ge,drawBuffers:pe,useProgram:Oe,setBlending:Ne,setMaterial:Le,setFlipSided:Ce,setCullFace:ce,setLineWidth:Be,setPolygonOffset:me,setScissorTest:Ie,activeTexture:et,bindTexture:Ke,unbindTexture:R,compressedTexImage2D:M,compressedTexImage3D:k,texImage2D:ke,texImage3D:de,updateUBOMapping:he,uniformBlockBinding:j,texStorage2D:xe,texStorage3D:Ue,texSubImage2D:Q,texSubImage3D:se,compressedTexSubImage2D:Y,compressedTexSubImage3D:ze,scissor:B,viewport:le,reset:F}}function Dv(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return f?new OffscreenCanvas(R,M):pr("canvas")}function _(R,M,k){let Q=1;const se=Ke(R);if((se.width>k||se.height>k)&&(Q=k/Math.max(se.width,se.height)),Q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(Q*se.width),ze=Math.floor(Q*se.height);u===void 0&&(u=g(Y,ze));const xe=M?g(Y,ze):u;return xe.width=Y,xe.height=ze,xe.getContext("2d").drawImage(R,0,0,Y,ze),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+Y+"x"+ze+")."),xe}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){s.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(R,M,k,Q,se=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=M;if(M===s.RED&&(k===s.FLOAT&&(Y=s.R32F),k===s.HALF_FLOAT&&(Y=s.R16F),k===s.UNSIGNED_BYTE&&(Y=s.R8)),M===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(Y=s.R8UI),k===s.UNSIGNED_SHORT&&(Y=s.R16UI),k===s.UNSIGNED_INT&&(Y=s.R32UI),k===s.BYTE&&(Y=s.R8I),k===s.SHORT&&(Y=s.R16I),k===s.INT&&(Y=s.R32I)),M===s.RG&&(k===s.FLOAT&&(Y=s.RG32F),k===s.HALF_FLOAT&&(Y=s.RG16F),k===s.UNSIGNED_BYTE&&(Y=s.RG8)),M===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(Y=s.RG8UI),k===s.UNSIGNED_SHORT&&(Y=s.RG16UI),k===s.UNSIGNED_INT&&(Y=s.RG32UI),k===s.BYTE&&(Y=s.RG8I),k===s.SHORT&&(Y=s.RG16I),k===s.INT&&(Y=s.RG32I)),M===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),k===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),k===s.UNSIGNED_INT&&(Y=s.RGB32UI),k===s.BYTE&&(Y=s.RGB8I),k===s.SHORT&&(Y=s.RGB16I),k===s.INT&&(Y=s.RGB32I)),M===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),k===s.UNSIGNED_INT&&(Y=s.RGBA32UI),k===s.BYTE&&(Y=s.RGBA8I),k===s.SHORT&&(Y=s.RGBA16I),k===s.INT&&(Y=s.RGBA32I)),M===s.RGB&&(k===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&(Y=s.R11F_G11F_B10F)),M===s.RGBA){const ze=se?da:pt.getTransfer(Q);k===s.FLOAT&&(Y=s.RGBA32F),k===s.HALF_FLOAT&&(Y=s.RGBA16F),k===s.UNSIGNED_BYTE&&(Y=ze===Tt?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function v(R,M){let k;return R?M===null||M===Wi||M===lr?k=s.DEPTH24_STENCIL8:M===Nn?k=s.DEPTH32F_STENCIL8:M===cr&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Wi||M===lr?k=s.DEPTH_COMPONENT24:M===Nn?k=s.DEPTH_COMPONENT32F:M===cr&&(k=s.DEPTH_COMPONENT16),k}function E(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==sn&&R.minFilter!==vn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function w(R){const M=R.target;M.removeEventListener("dispose",w),D(M),M.isVideoTexture&&h.delete(M)}function A(R){const M=R.target;M.removeEventListener("dispose",A),S(M)}function D(R){const M=n.get(R);if(M.__webglInit===void 0)return;const k=R.source,Q=d.get(k);if(Q){const se=Q[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&b(R),Object.keys(Q).length===0&&d.delete(k)}n.remove(R)}function b(R){const M=n.get(R);s.deleteTexture(M.__webglTexture);const k=R.source,Q=d.get(k);delete Q[M.__cacheKey],a.memory.textures--}function S(R){const M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(M.__webglFramebuffer[Q]))for(let se=0;se<M.__webglFramebuffer[Q].length;se++)s.deleteFramebuffer(M.__webglFramebuffer[Q][se]);else s.deleteFramebuffer(M.__webglFramebuffer[Q]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[Q])}else{if(Array.isArray(M.__webglFramebuffer))for(let Q=0;Q<M.__webglFramebuffer.length;Q++)s.deleteFramebuffer(M.__webglFramebuffer[Q]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Q=0;Q<M.__webglColorRenderbuffer.length;Q++)M.__webglColorRenderbuffer[Q]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[Q]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=R.textures;for(let Q=0,se=k.length;Q<se;Q++){const Y=n.get(k[Q]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(k[Q])}n.remove(R)}let I=0;function U(){I=0}function G(){const R=I;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),I+=1,R}function q(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function te(R,M){const k=n.get(R);if(R.isVideoTexture&&Ie(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const Q=R.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(k,R,M);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+M)}function W(R,M){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){ne(k,R,M);return}t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+M)}function oe(R,M){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){ne(k,R,M);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+M)}function X(R,M){const k=n.get(R);if(R.version>0&&k.__version!==R.version){ie(k,R,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+M)}const fe={[Rs]:s.REPEAT,[Si]:s.CLAMP_TO_EDGE,[ua]:s.MIRRORED_REPEAT},Se={[sn]:s.NEAREST,[zh]:s.NEAREST_MIPMAP_NEAREST,[er]:s.NEAREST_MIPMAP_LINEAR,[vn]:s.LINEAR,[ia]:s.LINEAR_MIPMAP_NEAREST,[si]:s.LINEAR_MIPMAP_LINEAR},Ee={[af]:s.NEVER,[df]:s.ALWAYS,[of]:s.LESS,[jh]:s.LEQUAL,[cf]:s.EQUAL,[uf]:s.GEQUAL,[lf]:s.GREATER,[hf]:s.NOTEQUAL};function Ae(R,M){if(M.type===Nn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===vn||M.magFilter===ia||M.magFilter===er||M.magFilter===si||M.minFilter===vn||M.minFilter===ia||M.minFilter===er||M.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,fe[M.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,fe[M.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,fe[M.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Se[M.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Se[M.minFilter]),M.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,Ee[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===sn||M.minFilter!==er&&M.minFilter!==si||M.type===Nn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function at(R,M){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",w));const Q=M.source;let se=d.get(Q);se===void 0&&(se={},d.set(Q,se));const Y=q(M);if(Y!==R.__cacheKey){se[Y]===void 0&&(se[Y]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),se[Y].usedTimes++;const ze=se[R.__cacheKey];ze!==void 0&&(se[R.__cacheKey].usedTimes--,ze.usedTimes===0&&b(M)),R.__cacheKey=Y,R.__webglTexture=se[Y].texture}return k}function We(R,M,k){return Math.floor(Math.floor(R/k)/M)}function it(R,M,k,Q){const Y=R.updateRanges;if(Y.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,k,Q,M.data);else{Y.sort((de,B)=>de.start-B.start);let ze=0;for(let de=1;de<Y.length;de++){const B=Y[ze],le=Y[de],he=B.start+B.count,j=We(le.start,M.width,4),F=We(B.start,M.width,4);le.start<=he+1&&j===F&&We(le.start+le.count-1,M.width,4)===j?B.count=Math.max(B.count,le.start+le.count-B.start):(++ze,Y[ze]=le)}Y.length=ze+1;const xe=s.getParameter(s.UNPACK_ROW_LENGTH),Ue=s.getParameter(s.UNPACK_SKIP_PIXELS),ke=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let de=0,B=Y.length;de<B;de++){const le=Y[de],he=Math.floor(le.start/4),j=Math.ceil(le.count/4),F=he%M.width,C=Math.floor(he/M.width),V=j,K=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,F),s.pixelStorei(s.UNPACK_SKIP_ROWS,C),t.texSubImage2D(s.TEXTURE_2D,0,F,C,V,K,k,Q,M.data)}R.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,xe),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ue),s.pixelStorei(s.UNPACK_SKIP_ROWS,ke)}}function ne(R,M,k){let Q=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=s.TEXTURE_3D);const se=at(R,M),Y=M.source;t.bindTexture(Q,R.__webglTexture,s.TEXTURE0+k);const ze=n.get(Y);if(Y.version!==ze.__version||se===!0){t.activeTexture(s.TEXTURE0+k);const xe=pt.getPrimaries(pt.workingColorSpace),Ue=M.colorSpace===bi?null:pt.getPrimaries(M.colorSpace),ke=M.colorSpace===bi||xe===Ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let de=_(M.image,!1,i.maxTextureSize);de=et(M,de);const B=r.convert(M.format,M.colorSpace),le=r.convert(M.type);let he=y(M.internalFormat,B,le,M.colorSpace,M.isVideoTexture);Ae(Q,M);let j;const F=M.mipmaps,C=M.isVideoTexture!==!0,V=ze.__version===void 0||se===!0,K=Y.dataReady,ee=E(M,de);if(M.isDepthTexture)he=v(M.format===ur,M.type),V&&(C?t.texStorage2D(s.TEXTURE_2D,1,he,de.width,de.height):t.texImage2D(s.TEXTURE_2D,0,he,de.width,de.height,0,B,le,null));else if(M.isDataTexture)if(F.length>0){C&&V&&t.texStorage2D(s.TEXTURE_2D,ee,he,F[0].width,F[0].height);for(let $=0,H=F.length;$<H;$++)j=F[$],C?K&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,j.width,j.height,B,le,j.data):t.texImage2D(s.TEXTURE_2D,$,he,j.width,j.height,0,B,le,j.data);M.generateMipmaps=!1}else C?(V&&t.texStorage2D(s.TEXTURE_2D,ee,he,de.width,de.height),K&&it(M,de,B,le)):t.texImage2D(s.TEXTURE_2D,0,he,de.width,de.height,0,B,le,de.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){C&&V&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ee,he,F[0].width,F[0].height,de.depth);for(let $=0,H=F.length;$<H;$++)if(j=F[$],M.format!==Tn)if(B!==null)if(C){if(K)if(M.layerUpdates.size>0){const ae=jl(j.width,j.height,M.format,M.type);for(const Me of M.layerUpdates){const Ye=j.data.subarray(Me*ae/j.data.BYTES_PER_ELEMENT,(Me+1)*ae/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,Me,j.width,j.height,1,B,Ye)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,j.width,j.height,de.depth,B,j.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,he,j.width,j.height,de.depth,0,j.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else C?K&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,j.width,j.height,de.depth,B,le,j.data):t.texImage3D(s.TEXTURE_2D_ARRAY,$,he,j.width,j.height,de.depth,0,B,le,j.data)}else{C&&V&&t.texStorage2D(s.TEXTURE_2D,ee,he,F[0].width,F[0].height);for(let $=0,H=F.length;$<H;$++)j=F[$],M.format!==Tn?B!==null?C?K&&t.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,j.width,j.height,B,j.data):t.compressedTexImage2D(s.TEXTURE_2D,$,he,j.width,j.height,0,j.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):C?K&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,j.width,j.height,B,le,j.data):t.texImage2D(s.TEXTURE_2D,$,he,j.width,j.height,0,B,le,j.data)}else if(M.isDataArrayTexture)if(C){if(V&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ee,he,de.width,de.height,de.depth),K)if(M.layerUpdates.size>0){const $=jl(de.width,de.height,M.format,M.type);for(const H of M.layerUpdates){const ae=de.data.subarray(H*$/de.data.BYTES_PER_ELEMENT,(H+1)*$/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,H,de.width,de.height,1,B,le,ae)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,B,le,de.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,he,de.width,de.height,de.depth,0,B,le,de.data);else if(M.isData3DTexture)C?(V&&t.texStorage3D(s.TEXTURE_3D,ee,he,de.width,de.height,de.depth),K&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,B,le,de.data)):t.texImage3D(s.TEXTURE_3D,0,he,de.width,de.height,de.depth,0,B,le,de.data);else if(M.isFramebufferTexture){if(V)if(C)t.texStorage2D(s.TEXTURE_2D,ee,he,de.width,de.height);else{let $=de.width,H=de.height;for(let ae=0;ae<ee;ae++)t.texImage2D(s.TEXTURE_2D,ae,he,$,H,0,B,le,null),$>>=1,H>>=1}}else if(F.length>0){if(C&&V){const $=Ke(F[0]);t.texStorage2D(s.TEXTURE_2D,ee,he,$.width,$.height)}for(let $=0,H=F.length;$<H;$++)j=F[$],C?K&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,B,le,j):t.texImage2D(s.TEXTURE_2D,$,he,B,le,j);M.generateMipmaps=!1}else if(C){if(V){const $=Ke(de);t.texStorage2D(s.TEXTURE_2D,ee,he,$.width,$.height)}K&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,B,le,de)}else t.texImage2D(s.TEXTURE_2D,0,he,B,le,de);m(M)&&p(Q),ze.__version=Y.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ie(R,M,k){if(M.image.length!==6)return;const Q=at(R,M),se=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+k);const Y=n.get(se);if(se.version!==Y.__version||Q===!0){t.activeTexture(s.TEXTURE0+k);const ze=pt.getPrimaries(pt.workingColorSpace),xe=M.colorSpace===bi?null:pt.getPrimaries(M.colorSpace),Ue=M.colorSpace===bi||ze===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);const ke=M.isCompressedTexture||M.image[0].isCompressedTexture,de=M.image[0]&&M.image[0].isDataTexture,B=[];for(let H=0;H<6;H++)!ke&&!de?B[H]=_(M.image[H],!0,i.maxCubemapSize):B[H]=de?M.image[H].image:M.image[H],B[H]=et(M,B[H]);const le=B[0],he=r.convert(M.format,M.colorSpace),j=r.convert(M.type),F=y(M.internalFormat,he,j,M.colorSpace),C=M.isVideoTexture!==!0,V=Y.__version===void 0||Q===!0,K=se.dataReady;let ee=E(M,le);Ae(s.TEXTURE_CUBE_MAP,M);let $;if(ke){C&&V&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ee,F,le.width,le.height);for(let H=0;H<6;H++){$=B[H].mipmaps;for(let ae=0;ae<$.length;ae++){const Me=$[ae];M.format!==Tn?he!==null?C?K&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ae,0,0,Me.width,Me.height,he,Me.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ae,F,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?K&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ae,0,0,Me.width,Me.height,he,j,Me.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ae,F,Me.width,Me.height,0,he,j,Me.data)}}}else{if($=M.mipmaps,C&&V){$.length>0&&ee++;const H=Ke(B[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ee,F,H.width,H.height)}for(let H=0;H<6;H++)if(de){C?K&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,B[H].width,B[H].height,he,j,B[H].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,F,B[H].width,B[H].height,0,he,j,B[H].data);for(let ae=0;ae<$.length;ae++){const Ye=$[ae].image[H].image;C?K&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ae+1,0,0,Ye.width,Ye.height,he,j,Ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ae+1,F,Ye.width,Ye.height,0,he,j,Ye.data)}}else{C?K&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,he,j,B[H]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,F,he,j,B[H]);for(let ae=0;ae<$.length;ae++){const Me=$[ae];C?K&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ae+1,0,0,he,j,Me.image[H]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,ae+1,F,he,j,Me.image[H])}}}m(M)&&p(s.TEXTURE_CUBE_MAP),Y.__version=se.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function Re(R,M,k,Q,se,Y){const ze=r.convert(k.format,k.colorSpace),xe=r.convert(k.type),Ue=y(k.internalFormat,ze,xe,k.colorSpace),ke=n.get(M),de=n.get(k);if(de.__renderTarget=M,!ke.__hasExternalTextures){const B=Math.max(1,M.width>>Y),le=Math.max(1,M.height>>Y);se===s.TEXTURE_3D||se===s.TEXTURE_2D_ARRAY?t.texImage3D(se,Y,Ue,B,le,M.depth,0,ze,xe,null):t.texImage2D(se,Y,Ue,B,le,0,ze,xe,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,se,de.__webglTexture,0,Be(M)):(se===s.TEXTURE_2D||se>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Q,se,de.__webglTexture,Y),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ge(R,M,k){if(s.bindRenderbuffer(s.RENDERBUFFER,R),M.depthBuffer){const Q=M.depthTexture,se=Q&&Q.isDepthTexture?Q.type:null,Y=v(M.stencilBuffer,se),ze=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=Be(M);me(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xe,Y,M.width,M.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,xe,Y,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Y,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ze,s.RENDERBUFFER,R)}else{const Q=M.textures;for(let se=0;se<Q.length;se++){const Y=Q[se],ze=r.convert(Y.format,Y.colorSpace),xe=r.convert(Y.type),Ue=y(Y.internalFormat,ze,xe,Y.colorSpace),ke=Be(M);k&&me(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ke,Ue,M.width,M.height):me(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ke,Ue,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Ue,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function pe(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(M.depthTexture);Q.__renderTarget=M,(!Q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),te(M.depthTexture,0);const se=Q.__webglTexture,Y=Be(M);if(M.depthTexture.format===hr)me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(M.depthTexture.format===ur)me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Oe(R){const M=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const Q=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Q){const se=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Q.removeEventListener("dispose",se)};Q.addEventListener("dispose",se),M.__depthDisposeCallback=se}M.__boundDepthTexture=Q}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const Q=R.texture.mipmaps;Q&&Q.length>0?pe(M.__webglFramebuffer[0],R):pe(M.__webglFramebuffer,R)}else if(k){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]===void 0)M.__webglDepthbuffer[Q]=s.createRenderbuffer(),ge(M.__webglDepthbuffer[Q],R,!1);else{const se=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer[Q];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,Y)}}else{const Q=R.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),ge(M.__webglDepthbuffer,R,!1);else{const se=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,Y)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Xe(R,M,k){const Q=n.get(R);M!==void 0&&Re(Q.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Oe(R)}function N(R){const M=R.texture,k=n.get(R),Q=n.get(M);R.addEventListener("dispose",A);const se=R.textures,Y=R.isWebGLCubeRenderTarget===!0,ze=se.length>1;if(ze||(Q.__webglTexture===void 0&&(Q.__webglTexture=s.createTexture()),Q.__version=M.version,a.memory.textures++),Y){k.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[xe]=[];for(let Ue=0;Ue<M.mipmaps.length;Ue++)k.__webglFramebuffer[xe][Ue]=s.createFramebuffer()}else k.__webglFramebuffer[xe]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let xe=0;xe<M.mipmaps.length;xe++)k.__webglFramebuffer[xe]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(ze)for(let xe=0,Ue=se.length;xe<Ue;xe++){const ke=n.get(se[xe]);ke.__webglTexture===void 0&&(ke.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&me(R)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let xe=0;xe<se.length;xe++){const Ue=se[xe];k.__webglColorRenderbuffer[xe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[xe]);const ke=r.convert(Ue.format,Ue.colorSpace),de=r.convert(Ue.type),B=y(Ue.internalFormat,ke,de,Ue.colorSpace,R.isXRRenderTarget===!0),le=Be(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,le,B,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.RENDERBUFFER,k.__webglColorRenderbuffer[xe])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),ge(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),Ae(s.TEXTURE_CUBE_MAP,M);for(let xe=0;xe<6;xe++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ue=0;Ue<M.mipmaps.length;Ue++)Re(k.__webglFramebuffer[xe][Ue],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ue);else Re(k.__webglFramebuffer[xe],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);m(M)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ze){for(let xe=0,Ue=se.length;xe<Ue;xe++){const ke=se[xe],de=n.get(ke);let B=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(B=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(B,de.__webglTexture),Ae(B,ke),Re(k.__webglFramebuffer,R,ke,s.COLOR_ATTACHMENT0+xe,B,0),m(ke)&&p(B)}t.unbindTexture()}else{let xe=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(xe=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(xe,Q.__webglTexture),Ae(xe,M),M.mipmaps&&M.mipmaps.length>0)for(let Ue=0;Ue<M.mipmaps.length;Ue++)Re(k.__webglFramebuffer[Ue],R,M,s.COLOR_ATTACHMENT0,xe,Ue);else Re(k.__webglFramebuffer,R,M,s.COLOR_ATTACHMENT0,xe,0);m(M)&&p(xe),t.unbindTexture()}R.depthBuffer&&Oe(R)}function Ne(R){const M=R.textures;for(let k=0,Q=M.length;k<Q;k++){const se=M[k];if(m(se)){const Y=x(R),ze=n.get(se).__webglTexture;t.bindTexture(Y,ze),p(Y),t.unbindTexture()}}}const Le=[],Ce=[];function ce(R){if(R.samples>0){if(me(R)===!1){const M=R.textures,k=R.width,Q=R.height;let se=s.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ze=n.get(R),xe=M.length>1;if(xe)for(let ke=0;ke<M.length;ke++)t.bindFramebuffer(s.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ze.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ze.__webglMultisampledFramebuffer);const Ue=R.texture.mipmaps;Ue&&Ue.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ze.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ze.__webglFramebuffer);for(let ke=0;ke<M.length;ke++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(se|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(se|=s.STENCIL_BUFFER_BIT)),xe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ze.__webglColorRenderbuffer[ke]);const de=n.get(M[ke]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,de,0)}s.blitFramebuffer(0,0,k,Q,0,0,k,Q,se,s.NEAREST),c===!0&&(Le.length=0,Ce.length=0,Le.push(s.COLOR_ATTACHMENT0+ke),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Le.push(Y),Ce.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ce)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Le))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),xe)for(let ke=0;ke<M.length;ke++){t.bindFramebuffer(s.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.RENDERBUFFER,ze.__webglColorRenderbuffer[ke]);const de=n.get(M[ke]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ze.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.TEXTURE_2D,de,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ze.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const M=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Be(R){return Math.min(i.maxSamples,R.samples)}function me(R){const M=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ie(R){const M=a.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function et(R,M){const k=R.colorSpace,Q=R.format,se=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==rn&&k!==bi&&(pt.getTransfer(k)===Tt?(Q!==Tn||se!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}function Ke(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=U,this.setTexture2D=te,this.setTexture2DArray=W,this.setTexture3D=oe,this.setTextureCube=X,this.rebindTextures=Xe,this.setupRenderTarget=N,this.updateRenderTargetMipmap=Ne,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=me}function Iv(s,e){function t(n,i=bi){let r;const a=pt.getTransfer(i);if(n===Wn)return s.UNSIGNED_BYTE;if(n===Ec)return s.UNSIGNED_SHORT_4_4_4_4;if(n===wc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Gh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Wh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hh)return s.BYTE;if(n===Vh)return s.SHORT;if(n===cr)return s.UNSIGNED_SHORT;if(n===Sc)return s.INT;if(n===Wi)return s.UNSIGNED_INT;if(n===Nn)return s.FLOAT;if(n===_r)return s.HALF_FLOAT;if(n===Xh)return s.ALPHA;if(n===$h)return s.RGB;if(n===Tn)return s.RGBA;if(n===hr)return s.DEPTH_COMPONENT;if(n===ur)return s.DEPTH_STENCIL;if(n===Tc)return s.RED;if(n===Ac)return s.RED_INTEGER;if(n===qh)return s.RG;if(n===Rc)return s.RG_INTEGER;if(n===Cc)return s.RGBA_INTEGER;if(n===sa||n===ra||n===aa||n===oa)if(a===Tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Do||n===Io||n===No||n===Uo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Do)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===No)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Uo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fo||n===Oo||n===Bo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Fo||n===Oo)return a===Tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Bo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ko||n===zo||n===Ho||n===Vo||n===Go||n===Wo||n===Xo||n===$o||n===qo||n===Yo||n===jo||n===Ko||n===Zo||n===Jo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ko)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ho)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Go)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$o)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jo)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qo||n===ec||n===tc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Qo)return a===Tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ec)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nc||n===ic||n===sc||n===rc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===nc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ic)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===sc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===lr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Nv=`
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

}`;class Fv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new uu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ri({vertexShader:Nv,fragmentShader:Uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new Ci(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ov extends Yi{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Fv,p={},x=t.getContextAttributes();let y=null,v=null;const E=[],w=[],A=new we;let D=null;const b=new tn;b.viewport=new vt;const S=new tn;S.viewport=new vt;const I=[b,S],U=new Yp;let G=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let ie=E[ne];return ie===void 0&&(ie=new $a,E[ne]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(ne){let ie=E[ne];return ie===void 0&&(ie=new $a,E[ne]=ie),ie.getGripSpace()},this.getHand=function(ne){let ie=E[ne];return ie===void 0&&(ie=new $a,E[ne]=ie),ie.getHandSpace()};function te(ne){const ie=w.indexOf(ne.inputSource);if(ie===-1)return;const Re=E[ie];Re!==void 0&&(Re.update(ne.inputSource,ne.frame,l||a),Re.dispatchEvent({type:ne.type,data:ne.inputSource}))}function W(){i.removeEventListener("select",te),i.removeEventListener("selectstart",te),i.removeEventListener("selectend",te),i.removeEventListener("squeeze",te),i.removeEventListener("squeezestart",te),i.removeEventListener("squeezeend",te),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",oe);for(let ne=0;ne<E.length;ne++){const ie=w[ne];ie!==null&&(w[ne]=null,E[ne].disconnect(ie))}G=null,q=null,m.reset();for(const ne in p)delete p[ne];e.setRenderTarget(y),f=null,d=null,u=null,i=null,v=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){o=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ne){if(i=ne,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",te),i.addEventListener("selectstart",te),i.addEventListener("selectend",te),i.addEventListener("squeeze",te),i.addEventListener("squeezestart",te),i.addEventListener("squeezeend",te),i.addEventListener("end",W),i.addEventListener("inputsourceschange",oe),x.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,ge=null,pe=null;x.depth&&(pe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Re=x.stencil?ur:hr,ge=x.stencil?lr:Wi);const Oe={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Oe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Xi(d.textureWidth,d.textureHeight,{format:Tn,type:Wn,depthTexture:new hu(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Re={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Re),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Xi(f.framebufferWidth,f.framebufferHeight,{format:Tn,type:Wn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),it.setContext(i),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function oe(ne){for(let ie=0;ie<ne.removed.length;ie++){const Re=ne.removed[ie],ge=w.indexOf(Re);ge>=0&&(w[ge]=null,E[ge].disconnect(Re))}for(let ie=0;ie<ne.added.length;ie++){const Re=ne.added[ie];let ge=w.indexOf(Re);if(ge===-1){for(let Oe=0;Oe<E.length;Oe++)if(Oe>=w.length){w.push(Re),ge=Oe;break}else if(w[Oe]===null){w[Oe]=Re,ge=Oe;break}if(ge===-1)break}const pe=E[ge];pe&&pe.connect(Re)}}const X=new P,fe=new P;function Se(ne,ie,Re){X.setFromMatrixPosition(ie.matrixWorld),fe.setFromMatrixPosition(Re.matrixWorld);const ge=X.distanceTo(fe),pe=ie.projectionMatrix.elements,Oe=Re.projectionMatrix.elements,Xe=pe[14]/(pe[10]-1),N=pe[14]/(pe[10]+1),Ne=(pe[9]+1)/pe[5],Le=(pe[9]-1)/pe[5],Ce=(pe[8]-1)/pe[0],ce=(Oe[8]+1)/Oe[0],Be=Xe*Ce,me=Xe*ce,Ie=ge/(-Ce+ce),et=Ie*-Ce;if(ie.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(et),ne.translateZ(Ie),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),pe[10]===-1)ne.projectionMatrix.copy(ie.projectionMatrix),ne.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Ke=Xe+Ie,R=N+Ie,M=Be-et,k=me+(ge-et),Q=Ne*N/R*Ke,se=Le*N/R*Ke;ne.projectionMatrix.makePerspective(M,k,Q,se,Ke,R),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function Ee(ne,ie){ie===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(ie.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(i===null)return;let ie=ne.near,Re=ne.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(Re=m.depthFar)),U.near=S.near=b.near=ie,U.far=S.far=b.far=Re,(G!==U.near||q!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),G=U.near,q=U.far),U.layers.mask=ne.layers.mask|6,b.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;const ge=ne.parent,pe=U.cameras;Ee(U,ge);for(let Oe=0;Oe<pe.length;Oe++)Ee(pe[Oe],ge);pe.length===2?Se(U,b,S):U.projectionMatrix.copy(b.projectionMatrix),Ae(ne,U,ge)};function Ae(ne,ie,Re){Re===null?ne.matrix.copy(ie.matrixWorld):(ne.matrix.copy(Re.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(ie.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(ie.projectionMatrix),ne.projectionMatrixInverse.copy(ie.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=Cs*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(ne){c=ne,d!==null&&(d.fixedFoveation=ne),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ne)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(ne){return p[ne]};let at=null;function We(ne,ie){if(h=ie.getViewerPose(l||a),g=ie,h!==null){const Re=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ge=!1;Re.length!==U.cameras.length&&(U.cameras.length=0,ge=!0);for(let N=0;N<Re.length;N++){const Ne=Re[N];let Le=null;if(f!==null)Le=f.getViewport(Ne);else{const ce=u.getViewSubImage(d,Ne);Le=ce.viewport,N===0&&(e.setRenderTargetTextures(v,ce.colorTexture,ce.depthStencilTexture),e.setRenderTarget(v))}let Ce=I[N];Ce===void 0&&(Ce=new tn,Ce.layers.enable(N),Ce.viewport=new vt,I[N]=Ce),Ce.matrix.fromArray(Ne.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(Ne.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Le.x,Le.y,Le.width,Le.height),N===0&&(U.matrix.copy(Ce.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ge===!0&&U.cameras.push(Ce)}const pe=i.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const N=u.getDepthInformation(Re[0]);N&&N.isValid&&N.texture&&m.init(N,i.renderState)}if(pe&&pe.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let N=0;N<Re.length;N++){const Ne=Re[N].camera;if(Ne){let Le=p[Ne];Le||(Le=new uu,p[Ne]=Le);const Ce=u.getCameraImage(Ne);Le.sourceTexture=Ce}}}}for(let Re=0;Re<E.length;Re++){const ge=w[Re],pe=E[Re];ge!==null&&pe!==void 0&&pe.update(ge,ie,l||a)}at&&at(ne,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const it=new yu;it.setAnimationLoop(We),this.setAnimationLoop=function(ne){at=ne},this.dispose=function(){}}}const Fi=new Rn,Bv=new rt;function kv(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,nu(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,x,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),y=x.envMap,v=x.envMapRotation;y&&(m.envMap.value=y,Fi.copy(v),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),m.envMapRotation.value.setFromMatrix4(Bv.makeRotationFromEuler(Fi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function zv(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const v=y.program;n.uniformBlockBinding(x,v)}function l(x,y){let v=i[x.id];v===void 0&&(g(x),v=h(x),i[x.id]=v,x.addEventListener("dispose",m));const E=y.program;n.updateUBOMapping(x,E);const w=e.render.frame;r[x.id]!==w&&(d(x),r[x.id]=w)}function h(x){const y=u();x.__bindingPointIndex=y;const v=s.createBuffer(),E=x.__size,w=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,E,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,v),v}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],v=x.uniforms,E=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let w=0,A=v.length;w<A;w++){const D=Array.isArray(v[w])?v[w]:[v[w]];for(let b=0,S=D.length;b<S;b++){const I=D[b];if(f(I,w,b,E)===!0){const U=I.__offset,G=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let te=0;te<G.length;te++){const W=G[te],oe=_(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,U+q,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,q),q+=oe.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,v,E){const w=x.value,A=y+"_"+v;if(E[A]===void 0)return typeof w=="number"||typeof w=="boolean"?E[A]=w:E[A]=w.clone(),!0;{const D=E[A];if(typeof w=="number"||typeof w=="boolean"){if(D!==w)return E[A]=w,!0}else if(D.equals(w)===!1)return D.copy(w),!0}return!1}function g(x){const y=x.uniforms;let v=0;const E=16;for(let A=0,D=y.length;A<D;A++){const b=Array.isArray(y[A])?y[A]:[y[A]];for(let S=0,I=b.length;S<I;S++){const U=b[S],G=Array.isArray(U.value)?U.value:[U.value];for(let q=0,te=G.length;q<te;q++){const W=G[q],oe=_(W),X=v%E,fe=X%oe.boundary,Se=X+fe;v+=fe,Se!==0&&E-Se<oe.storage&&(v+=E-Se),U.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=oe.storage}}}const w=v%E;return w>0&&(v+=E-w),x.__size=v,x.__cache={},this}function _(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class Hv{constructor(e={}){const{canvas:t=Cf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=Nt;let w=0,A=0,D=null,b=-1,S=null;const I=new vt,U=new vt;let G=null;const q=new Ze(0);let te=0,W=t.width,oe=t.height,X=1,fe=null,Se=null;const Ee=new vt(0,0,W,oe),Ae=new vt(0,0,W,oe);let at=!1;const We=new Fc;let it=!1,ne=!1;const ie=new rt,Re=new P,ge=new vt,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function Xe(){return D===null?X:1}let N=n;function Ne(T,O){return t.getContext(T,O)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mc}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",ee,!1),t.addEventListener("webglcontextcreationerror",$,!1),N===null){const O="webgl2";if(N=Ne(O,T),N===null)throw Ne(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Le,Ce,ce,Be,me,Ie,et,Ke,R,M,k,Q,se,Y,ze,xe,Ue,ke,de,B,le,he,j,F;function C(){Le=new Z0(N),Le.init(),he=new Iv(N,Le),Ce=new W0(N,Le,e,he),ce=new Lv(N,Le),Ce.reversedDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),Be=new e_(N),me=new vv,Ie=new Dv(N,Le,ce,me,Ce,he,Be),et=new $0(v),Ke=new K0(v),R=new am(N),j=new V0(N,R),M=new J0(N,R,Be,j),k=new n_(N,M,R,Be),de=new t_(N,Ce,Ie),xe=new X0(me),Q=new _v(v,et,Ke,Le,Ce,j,xe),se=new kv(v,me),Y=new yv,ze=new Tv(Le),ke=new H0(v,et,Ke,ce,k,f,c),Ue=new Cv(v,k,Ce),F=new zv(N,Be,Ce,ce),B=new G0(N,Le,Be),le=new Q0(N,Le,Be),Be.programs=Q.programs,v.capabilities=Ce,v.extensions=Le,v.properties=me,v.renderLists=Y,v.shadowMap=Ue,v.state=ce,v.info=Be}C();const V=new Ov(v,N);this.xr=V,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=Le.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Le.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(W,oe,!1))},this.getSize=function(T){return T.set(W,oe)},this.setSize=function(T,O,Z=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,oe=O,t.width=Math.floor(T*X),t.height=Math.floor(O*X),Z===!0&&(t.style.width=T+"px",t.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(W*X,oe*X).floor()},this.setDrawingBufferSize=function(T,O,Z){W=T,oe=O,X=Z,t.width=Math.floor(T*Z),t.height=Math.floor(O*Z),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(Ee)},this.setViewport=function(T,O,Z,J){T.isVector4?Ee.set(T.x,T.y,T.z,T.w):Ee.set(T,O,Z,J),ce.viewport(I.copy(Ee).multiplyScalar(X).round())},this.getScissor=function(T){return T.copy(Ae)},this.setScissor=function(T,O,Z,J){T.isVector4?Ae.set(T.x,T.y,T.z,T.w):Ae.set(T,O,Z,J),ce.scissor(U.copy(Ae).multiplyScalar(X).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(T){ce.setScissorTest(at=T)},this.setOpaqueSort=function(T){fe=T},this.setTransparentSort=function(T){Se=T},this.getClearColor=function(T){return T.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(T=!0,O=!0,Z=!0){let J=0;if(T){let z=!1;if(D!==null){const ye=D.texture.format;z=ye===Cc||ye===Rc||ye===Ac}if(z){const ye=D.texture.type,De=ye===Wn||ye===Wi||ye===cr||ye===lr||ye===Ec||ye===wc,He=ke.getClearColor(),Fe=ke.getClearAlpha(),Je=He.r,tt=He.g,$e=He.b;De?(g[0]=Je,g[1]=tt,g[2]=$e,g[3]=Fe,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Je,_[1]=tt,_[2]=$e,_[3]=Fe,N.clearBufferiv(N.COLOR,0,_))}else J|=N.COLOR_BUFFER_BIT}O&&(J|=N.DEPTH_BUFFER_BIT),Z&&(J|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",ee,!1),t.removeEventListener("webglcontextcreationerror",$,!1),ke.dispose(),Y.dispose(),ze.dispose(),me.dispose(),et.dispose(),Ke.dispose(),k.dispose(),j.dispose(),F.dispose(),Q.dispose(),V.dispose(),V.removeEventListener("sessionstart",ve),V.removeEventListener("sessionend",be),Ge.stop()};function K(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ee(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=Be.autoReset,O=Ue.enabled,Z=Ue.autoUpdate,J=Ue.needsUpdate,z=Ue.type;C(),Be.autoReset=T,Ue.enabled=O,Ue.autoUpdate=Z,Ue.needsUpdate=J,Ue.type=z}function $(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function H(T){const O=T.target;O.removeEventListener("dispose",H),ae(O)}function ae(T){Me(T),me.remove(T)}function Me(T){const O=me.get(T).programs;O!==void 0&&(O.forEach(function(Z){Q.releaseProgram(Z)}),T.isShaderMaterial&&Q.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,Z,J,z,ye){O===null&&(O=pe);const De=z.isMesh&&z.matrixWorld.determinant()<0,He=Ku(T,O,Z,J,z);ce.setMaterial(J,De);let Fe=Z.index,Je=1;if(J.wireframe===!0){if(Fe=M.getWireframeAttribute(Z),Fe===void 0)return;Je=2}const tt=Z.drawRange,$e=Z.attributes.position;let ft=tt.start*Je,wt=(tt.start+tt.count)*Je;ye!==null&&(ft=Math.max(ft,ye.start*Je),wt=Math.min(wt,(ye.start+ye.count)*Je)),Fe!==null?(ft=Math.max(ft,0),wt=Math.min(wt,Fe.count)):$e!=null&&(ft=Math.max(ft,0),wt=Math.min(wt,$e.count));const It=wt-ft;if(It<0||It===1/0)return;j.setup(z,J,He,Z,Fe);let Pt,Ct=B;if(Fe!==null&&(Pt=R.get(Fe),Ct=le,Ct.setIndex(Pt)),z.isMesh)J.wireframe===!0?(ce.setLineWidth(J.wireframeLinewidth*Xe()),Ct.setMode(N.LINES)):Ct.setMode(N.TRIANGLES);else if(z.isLine){let je=J.linewidth;je===void 0&&(je=1),ce.setLineWidth(je*Xe()),z.isLineSegments?Ct.setMode(N.LINES):z.isLineLoop?Ct.setMode(N.LINE_LOOP):Ct.setMode(N.LINE_STRIP)}else z.isPoints?Ct.setMode(N.POINTS):z.isSprite&&Ct.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)mr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ct.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Le.get("WEBGL_multi_draw"))Ct.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const je=z._multiDrawStarts,Lt=z._multiDrawCounts,mt=z._multiDrawCount,dn=Fe?R.get(Fe).bytesPerElement:1,Ki=me.get(J).currentProgram.getUniforms();for(let fn=0;fn<mt;fn++)Ki.setValue(N,"_gl_DrawID",fn),Ct.render(je[fn]/dn,Lt[fn])}else if(z.isInstancedMesh)Ct.renderInstances(ft,It,z.count);else if(Z.isInstancedBufferGeometry){const je=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Lt=Math.min(Z.instanceCount,je);Ct.renderInstances(ft,It,Lt)}else Ct.render(ft,It)};function Ye(T,O,Z){T.transparent===!0&&T.side===zt&&T.forceSinglePass===!1?(T.side=nn,T.needsUpdate=!0,_t(T,O,Z),T.side=li,T.needsUpdate=!0,_t(T,O,Z),T.side=zt):_t(T,O,Z)}this.compile=function(T,O,Z=null){Z===null&&(Z=T),p=ze.get(Z),p.init(O),y.push(p),Z.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),T!==Z&&T.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const J=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ye=z.material;if(ye)if(Array.isArray(ye))for(let De=0;De<ye.length;De++){const He=ye[De];Ye(He,Z,z),J.add(He)}else Ye(ye,Z,z),J.add(ye)}),p=y.pop(),J},this.compileAsync=function(T,O,Z=null){const J=this.compile(T,O,Z);return new Promise(z=>{function ye(){if(J.forEach(function(De){me.get(De).currentProgram.isReady()&&J.delete(De)}),J.size===0){z(T);return}setTimeout(ye,10)}Le.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Ve=null;function re(T){Ve&&Ve(T)}function ve(){Ge.stop()}function be(){Ge.start()}const Ge=new yu;Ge.setAnimationLoop(re),typeof self<"u"&&Ge.setContext(self),this.setAnimationLoop=function(T){Ve=T,V.setAnimationLoop(T),T===null?Ge.stop():Ge.start()},V.addEventListener("sessionstart",ve),V.addEventListener("sessionend",be),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(O),O=V.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,O,D),p=ze.get(T,y.length),p.init(O),y.push(p),ie.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),We.setFromProjectionMatrix(ie,Hn,O.reversedDepth),ne=this.localClippingEnabled,it=xe.init(this.clippingPlanes,ne),m=Y.get(T,x.length),m.init(),x.push(m),V.enabled===!0&&V.isPresenting===!0){const ye=v.xr.getDepthSensingMesh();ye!==null&&Te(ye,O,-1/0,v.sortObjects)}Te(T,O,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(fe,Se),Oe=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Oe&&ke.addToRenderList(m,T),this.info.render.frame++,it===!0&&xe.beginShadows();const Z=p.state.shadowsArray;Ue.render(Z,T,O),it===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,z=m.transmissive;if(p.setupLights(),O.isArrayCamera){const ye=O.cameras;if(z.length>0)for(let De=0,He=ye.length;De<He;De++){const Fe=ye[De];xt(J,z,T,Fe)}Oe&&ke.render(T);for(let De=0,He=ye.length;De<He;De++){const Fe=ye[De];ut(m,T,Fe,Fe.viewport)}}else z.length>0&&xt(J,z,T,O),Oe&&ke.render(T),ut(m,T,O);D!==null&&A===0&&(Ie.updateMultisampleRenderTarget(D),Ie.updateRenderTargetMipmap(D)),T.isScene===!0&&T.onAfterRender(v,T,O),j.resetDefaultState(),b=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],it===!0&&xe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Te(T,O,Z,J){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)Z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||We.intersectsSprite(T)){J&&ge.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ie);const De=k.update(T),He=T.material;He.visible&&m.push(T,De,He,Z,ge.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||We.intersectsObject(T))){const De=k.update(T),He=T.material;if(J&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ge.copy(T.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),ge.copy(De.boundingSphere.center)),ge.applyMatrix4(T.matrixWorld).applyMatrix4(ie)),Array.isArray(He)){const Fe=De.groups;for(let Je=0,tt=Fe.length;Je<tt;Je++){const $e=Fe[Je],ft=He[$e.materialIndex];ft&&ft.visible&&m.push(T,De,ft,Z,ge.z,$e)}}else He.visible&&m.push(T,De,He,Z,ge.z,null)}}const ye=T.children;for(let De=0,He=ye.length;De<He;De++)Te(ye[De],O,Z,J)}function ut(T,O,Z,J){const z=T.opaque,ye=T.transmissive,De=T.transparent;p.setupLightsView(Z),it===!0&&xe.setGlobalState(v.clippingPlanes,Z),J&&ce.viewport(I.copy(J)),z.length>0&&Ot(z,O,Z),ye.length>0&&Ot(ye,O,Z),De.length>0&&Ot(De,O,Z),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function xt(T,O,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new Xi(1,1,{generateMipmaps:!0,type:Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float")?_r:Wn,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace}));const ye=p.state.transmissionRenderTarget[J.id],De=J.viewport||I;ye.setSize(De.z*v.transmissionResolutionScale,De.w*v.transmissionResolutionScale);const He=v.getRenderTarget(),Fe=v.getActiveCubeFace(),Je=v.getActiveMipmapLevel();v.setRenderTarget(ye),v.getClearColor(q),te=v.getClearAlpha(),te<1&&v.setClearColor(16777215,.5),v.clear(),Oe&&ke.render(Z);const tt=v.toneMapping;v.toneMapping=wi;const $e=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),it===!0&&xe.setGlobalState(v.clippingPlanes,J),Ot(T,Z,J),Ie.updateMultisampleRenderTarget(ye),Ie.updateRenderTargetMipmap(ye),Le.has("WEBGL_multisampled_render_to_texture")===!1){let ft=!1;for(let wt=0,It=O.length;wt<It;wt++){const Pt=O[wt],Ct=Pt.object,je=Pt.geometry,Lt=Pt.material,mt=Pt.group;if(Lt.side===zt&&Ct.layers.test(J.layers)){const dn=Lt.side;Lt.side=nn,Lt.needsUpdate=!0,st(Ct,Z,J,je,Lt,mt),Lt.side=dn,Lt.needsUpdate=!0,ft=!0}}ft===!0&&(Ie.updateMultisampleRenderTarget(ye),Ie.updateRenderTargetMipmap(ye))}v.setRenderTarget(He,Fe,Je),v.setClearColor(q,te),$e!==void 0&&(J.viewport=$e),v.toneMapping=tt}function Ot(T,O,Z){const J=O.isScene===!0?O.overrideMaterial:null;for(let z=0,ye=T.length;z<ye;z++){const De=T[z],He=De.object,Fe=De.geometry,Je=De.group;let tt=De.material;tt.allowOverride===!0&&J!==null&&(tt=J),He.layers.test(Z.layers)&&st(He,O,Z,Fe,tt,Je)}}function st(T,O,Z,J,z,ye){T.onBeforeRender(v,O,Z,J,z,ye),T.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(v,O,Z,J,T,ye),z.transparent===!0&&z.side===zt&&z.forceSinglePass===!1?(z.side=nn,z.needsUpdate=!0,v.renderBufferDirect(Z,O,J,z,T,ye),z.side=li,z.needsUpdate=!0,v.renderBufferDirect(Z,O,J,z,T,ye),z.side=zt):v.renderBufferDirect(Z,O,J,z,T,ye),T.onAfterRender(v,O,Z,J,z,ye)}function _t(T,O,Z){O.isScene!==!0&&(O=pe);const J=me.get(T),z=p.state.lights,ye=p.state.shadowsArray,De=z.state.version,He=Q.getParameters(T,z.state,ye,O,Z),Fe=Q.getProgramCacheKey(He);let Je=J.programs;J.environment=T.isMeshStandardMaterial?O.environment:null,J.fog=O.fog,J.envMap=(T.isMeshStandardMaterial?Ke:et).get(T.envMap||J.environment),J.envMapRotation=J.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Je===void 0&&(T.addEventListener("dispose",H),Je=new Map,J.programs=Je);let tt=Je.get(Fe);if(tt!==void 0){if(J.currentProgram===tt&&J.lightsStateVersion===De)return di(T,He),tt}else He.uniforms=Q.getUniforms(T),T.onBeforeCompile(He,v),tt=Q.acquireProgram(He,Fe),Je.set(Fe,tt),J.uniforms=He.uniforms;const $e=J.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&($e.clippingPlanes=xe.uniform),di(T,He),J.needsLights=Ju(T),J.lightsStateVersion=De,J.needsLights&&($e.ambientLightColor.value=z.state.ambient,$e.lightProbe.value=z.state.probe,$e.directionalLights.value=z.state.directional,$e.directionalLightShadows.value=z.state.directionalShadow,$e.spotLights.value=z.state.spot,$e.spotLightShadows.value=z.state.spotShadow,$e.rectAreaLights.value=z.state.rectArea,$e.ltc_1.value=z.state.rectAreaLTC1,$e.ltc_2.value=z.state.rectAreaLTC2,$e.pointLights.value=z.state.point,$e.pointLightShadows.value=z.state.pointShadow,$e.hemisphereLights.value=z.state.hemi,$e.directionalShadowMap.value=z.state.directionalShadowMap,$e.directionalShadowMatrix.value=z.state.directionalShadowMatrix,$e.spotShadowMap.value=z.state.spotShadowMap,$e.spotLightMatrix.value=z.state.spotLightMatrix,$e.spotLightMap.value=z.state.spotLightMap,$e.pointShadowMap.value=z.state.pointShadowMap,$e.pointShadowMatrix.value=z.state.pointShadowMatrix),J.currentProgram=tt,J.uniformsList=null,tt}function $t(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=ca.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function di(T,O){const Z=me.get(T);Z.outputColorSpace=O.outputColorSpace,Z.batching=O.batching,Z.batchingColor=O.batchingColor,Z.instancing=O.instancing,Z.instancingColor=O.instancingColor,Z.instancingMorph=O.instancingMorph,Z.skinning=O.skinning,Z.morphTargets=O.morphTargets,Z.morphNormals=O.morphNormals,Z.morphColors=O.morphColors,Z.morphTargetsCount=O.morphTargetsCount,Z.numClippingPlanes=O.numClippingPlanes,Z.numIntersection=O.numClipIntersection,Z.vertexAlphas=O.vertexAlphas,Z.vertexTangents=O.vertexTangents,Z.toneMapping=O.toneMapping}function Ku(T,O,Z,J,z){O.isScene!==!0&&(O=pe),Ie.resetTextureUnits();const ye=O.fog,De=J.isMeshStandardMaterial?O.environment:null,He=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:rn,Fe=(J.isMeshStandardMaterial?Ke:et).get(J.envMap||De),Je=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,tt=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),$e=!!Z.morphAttributes.position,ft=!!Z.morphAttributes.normal,wt=!!Z.morphAttributes.color;let It=wi;J.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(It=v.toneMapping);const Pt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Ct=Pt!==void 0?Pt.length:0,je=me.get(J),Lt=p.state.lights;if(it===!0&&(ne===!0||T!==S)){const Kt=T===S&&J.id===b;xe.setState(J,T,Kt)}let mt=!1;J.version===je.__version?(je.needsLights&&je.lightsStateVersion!==Lt.state.version||je.outputColorSpace!==He||z.isBatchedMesh&&je.batching===!1||!z.isBatchedMesh&&je.batching===!0||z.isBatchedMesh&&je.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&je.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&je.instancing===!1||!z.isInstancedMesh&&je.instancing===!0||z.isSkinnedMesh&&je.skinning===!1||!z.isSkinnedMesh&&je.skinning===!0||z.isInstancedMesh&&je.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&je.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&je.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&je.instancingMorph===!1&&z.morphTexture!==null||je.envMap!==Fe||J.fog===!0&&je.fog!==ye||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==xe.numPlanes||je.numIntersection!==xe.numIntersection)||je.vertexAlphas!==Je||je.vertexTangents!==tt||je.morphTargets!==$e||je.morphNormals!==ft||je.morphColors!==wt||je.toneMapping!==It||je.morphTargetsCount!==Ct)&&(mt=!0):(mt=!0,je.__version=J.version);let dn=je.currentProgram;mt===!0&&(dn=_t(J,O,z));let Ki=!1,fn=!1,Hs=!1;const Dt=dn.getUniforms(),yn=je.uniforms;if(ce.useProgram(dn.program)&&(Ki=!0,fn=!0,Hs=!0),J.id!==b&&(b=J.id,fn=!0),Ki||S!==T){ce.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Dt.setValue(N,"projectionMatrix",T.projectionMatrix),Dt.setValue(N,"viewMatrix",T.matrixWorldInverse);const cn=Dt.map.cameraPosition;cn!==void 0&&cn.setValue(N,Re.setFromMatrixPosition(T.matrixWorld)),Ce.logarithmicDepthBuffer&&Dt.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Dt.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,fn=!0,Hs=!0)}if(z.isSkinnedMesh){Dt.setOptional(N,z,"bindMatrix"),Dt.setOptional(N,z,"bindMatrixInverse");const Kt=z.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),Dt.setValue(N,"boneTexture",Kt.boneTexture,Ie))}z.isBatchedMesh&&(Dt.setOptional(N,z,"batchingTexture"),Dt.setValue(N,"batchingTexture",z._matricesTexture,Ie),Dt.setOptional(N,z,"batchingIdTexture"),Dt.setValue(N,"batchingIdTexture",z._indirectTexture,Ie),Dt.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&Dt.setValue(N,"batchingColorTexture",z._colorsTexture,Ie));const Mn=Z.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&de.update(z,Z,dn),(fn||je.receiveShadow!==z.receiveShadow)&&(je.receiveShadow=z.receiveShadow,Dt.setValue(N,"receiveShadow",z.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(yn.envMap.value=Fe,yn.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&O.environment!==null&&(yn.envMapIntensity.value=O.environmentIntensity),fn&&(Dt.setValue(N,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&Zu(yn,Hs),ye&&J.fog===!0&&se.refreshFogUniforms(yn,ye),se.refreshMaterialUniforms(yn,J,X,oe,p.state.transmissionRenderTarget[T.id]),ca.upload(N,$t(je),yn,Ie)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(ca.upload(N,$t(je),yn,Ie),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Dt.setValue(N,"center",z.center),Dt.setValue(N,"modelViewMatrix",z.modelViewMatrix),Dt.setValue(N,"normalMatrix",z.normalMatrix),Dt.setValue(N,"modelMatrix",z.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Kt=J.uniformsGroups;for(let cn=0,Sa=Kt.length;cn<Sa;cn++){const Pi=Kt[cn];F.update(Pi,dn),F.bind(Pi,dn)}}return dn}function Zu(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Ju(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(T,O,Z){const J=me.get(T);J.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),me.get(T.texture).__webglTexture=O,me.get(T.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:Z,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,O){const Z=me.get(T);Z.__webglFramebuffer=O,Z.__useDefaultFramebuffer=O===void 0};const Qu=N.createFramebuffer();this.setRenderTarget=function(T,O=0,Z=0){D=T,w=O,A=Z;let J=!0,z=null,ye=!1,De=!1;if(T){const Fe=me.get(T);if(Fe.__useDefaultFramebuffer!==void 0)ce.bindFramebuffer(N.FRAMEBUFFER,null),J=!1;else if(Fe.__webglFramebuffer===void 0)Ie.setupRenderTarget(T);else if(Fe.__hasExternalTextures)Ie.rebindTextures(T,me.get(T.texture).__webglTexture,me.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const $e=T.depthTexture;if(Fe.__boundDepthTexture!==$e){if($e!==null&&me.has($e)&&(T.width!==$e.image.width||T.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(T)}}const Je=T.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(De=!0);const tt=me.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(tt[O])?z=tt[O][Z]:z=tt[O],ye=!0):T.samples>0&&Ie.useMultisampledRTT(T)===!1?z=me.get(T).__webglMultisampledFramebuffer:Array.isArray(tt)?z=tt[Z]:z=tt,I.copy(T.viewport),U.copy(T.scissor),G=T.scissorTest}else I.copy(Ee).multiplyScalar(X).floor(),U.copy(Ae).multiplyScalar(X).floor(),G=at;if(Z!==0&&(z=Qu),ce.bindFramebuffer(N.FRAMEBUFFER,z)&&J&&ce.drawBuffers(T,z),ce.viewport(I),ce.scissor(U),ce.setScissorTest(G),ye){const Fe=me.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+O,Fe.__webglTexture,Z)}else if(De){const Fe=O;for(let Je=0;Je<T.textures.length;Je++){const tt=me.get(T.textures[Je]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Je,tt.__webglTexture,Z,Fe)}}else if(T!==null&&Z!==0){const Fe=me.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Fe.__webglTexture,Z)}b=-1},this.readRenderTargetPixels=function(T,O,Z,J,z,ye,De,He=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe){ce.bindFramebuffer(N.FRAMEBUFFER,Fe);try{const Je=T.textures[He],tt=Je.format,$e=Je.type;if(!Ce.textureFormatReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-J&&Z>=0&&Z<=T.height-z&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+He),N.readPixels(O,Z,J,z,he.convert(tt),he.convert($e),ye))}finally{const Je=D!==null?me.get(D).__webglFramebuffer:null;ce.bindFramebuffer(N.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(T,O,Z,J,z,ye,De,He=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe)if(O>=0&&O<=T.width-J&&Z>=0&&Z<=T.height-z){ce.bindFramebuffer(N.FRAMEBUFFER,Fe);const Je=T.textures[He],tt=Je.format,$e=Je.type;if(!Ce.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ft=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ft),N.bufferData(N.PIXEL_PACK_BUFFER,ye.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+He),N.readPixels(O,Z,J,z,he.convert(tt),he.convert($e),0);const wt=D!==null?me.get(D).__webglFramebuffer:null;ce.bindFramebuffer(N.FRAMEBUFFER,wt);const It=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Pf(N,It,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ft),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ye),N.deleteBuffer(ft),N.deleteSync(It),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,O=null,Z=0){const J=Math.pow(2,-Z),z=Math.floor(T.image.width*J),ye=Math.floor(T.image.height*J),De=O!==null?O.x:0,He=O!==null?O.y:0;Ie.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,Z,0,0,De,He,z,ye),ce.unbindTexture()};const ed=N.createFramebuffer(),td=N.createFramebuffer();this.copyTextureToTexture=function(T,O,Z=null,J=null,z=0,ye=null){ye===null&&(z!==0?(mr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ye=z,z=0):ye=0);let De,He,Fe,Je,tt,$e,ft,wt,It;const Pt=T.isCompressedTexture?T.mipmaps[ye]:T.image;if(Z!==null)De=Z.max.x-Z.min.x,He=Z.max.y-Z.min.y,Fe=Z.isBox3?Z.max.z-Z.min.z:1,Je=Z.min.x,tt=Z.min.y,$e=Z.isBox3?Z.min.z:0;else{const Mn=Math.pow(2,-z);De=Math.floor(Pt.width*Mn),He=Math.floor(Pt.height*Mn),T.isDataArrayTexture?Fe=Pt.depth:T.isData3DTexture?Fe=Math.floor(Pt.depth*Mn):Fe=1,Je=0,tt=0,$e=0}J!==null?(ft=J.x,wt=J.y,It=J.z):(ft=0,wt=0,It=0);const Ct=he.convert(O.format),je=he.convert(O.type);let Lt;O.isData3DTexture?(Ie.setTexture3D(O,0),Lt=N.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Ie.setTexture2DArray(O,0),Lt=N.TEXTURE_2D_ARRAY):(Ie.setTexture2D(O,0),Lt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,O.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,O.unpackAlignment);const mt=N.getParameter(N.UNPACK_ROW_LENGTH),dn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ki=N.getParameter(N.UNPACK_SKIP_PIXELS),fn=N.getParameter(N.UNPACK_SKIP_ROWS),Hs=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Pt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Pt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Je),N.pixelStorei(N.UNPACK_SKIP_ROWS,tt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,$e);const Dt=T.isDataArrayTexture||T.isData3DTexture,yn=O.isDataArrayTexture||O.isData3DTexture;if(T.isDepthTexture){const Mn=me.get(T),Kt=me.get(O),cn=me.get(Mn.__renderTarget),Sa=me.get(Kt.__renderTarget);ce.bindFramebuffer(N.READ_FRAMEBUFFER,cn.__webglFramebuffer),ce.bindFramebuffer(N.DRAW_FRAMEBUFFER,Sa.__webglFramebuffer);for(let Pi=0;Pi<Fe;Pi++)Dt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,me.get(T).__webglTexture,z,$e+Pi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,me.get(O).__webglTexture,ye,It+Pi)),N.blitFramebuffer(Je,tt,De,He,ft,wt,De,He,N.DEPTH_BUFFER_BIT,N.NEAREST);ce.bindFramebuffer(N.READ_FRAMEBUFFER,null),ce.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(z!==0||T.isRenderTargetTexture||me.has(T)){const Mn=me.get(T),Kt=me.get(O);ce.bindFramebuffer(N.READ_FRAMEBUFFER,ed),ce.bindFramebuffer(N.DRAW_FRAMEBUFFER,td);for(let cn=0;cn<Fe;cn++)Dt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Mn.__webglTexture,z,$e+cn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mn.__webglTexture,z),yn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Kt.__webglTexture,ye,It+cn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Kt.__webglTexture,ye),z!==0?N.blitFramebuffer(Je,tt,De,He,ft,wt,De,He,N.COLOR_BUFFER_BIT,N.NEAREST):yn?N.copyTexSubImage3D(Lt,ye,ft,wt,It+cn,Je,tt,De,He):N.copyTexSubImage2D(Lt,ye,ft,wt,Je,tt,De,He);ce.bindFramebuffer(N.READ_FRAMEBUFFER,null),ce.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else yn?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(Lt,ye,ft,wt,It,De,He,Fe,Ct,je,Pt.data):O.isCompressedArrayTexture?N.compressedTexSubImage3D(Lt,ye,ft,wt,It,De,He,Fe,Ct,Pt.data):N.texSubImage3D(Lt,ye,ft,wt,It,De,He,Fe,Ct,je,Pt):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ye,ft,wt,De,He,Ct,je,Pt.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ye,ft,wt,Pt.width,Pt.height,Ct,Pt.data):N.texSubImage2D(N.TEXTURE_2D,ye,ft,wt,De,He,Ct,je,Pt);N.pixelStorei(N.UNPACK_ROW_LENGTH,mt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,dn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ki),N.pixelStorei(N.UNPACK_SKIP_ROWS,fn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Hs),ye===0&&O.generateMipmaps&&N.generateMipmap(Lt),ce.unbindTexture()},this.initRenderTarget=function(T){me.get(T).__webglFramebuffer===void 0&&Ie.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ie.setTextureCube(T,0):T.isData3DTexture?Ie.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ie.setTexture2DArray(T,0):Ie.setTexture2D(T,0),ce.unbindTexture()},this.resetState=function(){w=0,A=0,D=null,ce.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}}const xh={type:"change"},Xc={type:"start"},wu={type:"end"},Qr=new vr,yh=new Mi,Vv=Math.cos(70*Dc.DEG2RAD),Bt=new P,ln=2*Math.PI,At={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ho=1e-6;class Gv extends sm{constructor(e,t=null){super(e,t),this.state=At.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ai.ROTATE,MIDDLE:ai.DOLLY,RIGHT:ai.PAN},this.touches={ONE:ii.ROTATE,TWO:ii.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new An,this._lastTargetPosition=new P,this._quat=new An().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yl,this._sphericalDelta=new Yl,this._scale=1,this._panOffset=new P,this._rotateStart=new we,this._rotateEnd=new we,this._rotateDelta=new we,this._panStart=new we,this._panEnd=new we,this._panDelta=new we,this._dollyStart=new we,this._dollyEnd=new we,this._dollyDelta=new we,this._dollyDirection=new P,this._mouse=new we,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Xv.bind(this),this._onPointerDown=Wv.bind(this),this._onPointerUp=$v.bind(this),this._onContextMenu=Qv.bind(this),this._onMouseWheel=jv.bind(this),this._onKeyDown=Kv.bind(this),this._onTouchStart=Zv.bind(this),this._onTouchMove=Jv.bind(this),this._onMouseDown=qv.bind(this),this._onMouseMove=Yv.bind(this),this._interceptControlDown=ex.bind(this),this._interceptControlUp=tx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(xh),this.update(),this.state=At.NONE}update(e=null){const t=this.object.position;Bt.copy(t).sub(this.target),Bt.applyQuaternion(this._quat),this._spherical.setFromVector3(Bt),this.autoRotate&&this.state===At.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=ln:n>Math.PI&&(n-=ln),i<-Math.PI?i+=ln:i>Math.PI&&(i-=ln),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Bt.setFromSpherical(this._spherical),Bt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Bt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Qr.origin.copy(this.object.position),Qr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Qr.direction))<Vv?this.object.lookAt(this.target):(yh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Qr.intersectPlane(yh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ho||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ho||this._lastTargetPosition.distanceToSquared(this.target)>ho?(this.dispatchEvent(xh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ln/60*this.autoRotateSpeed*e:ln/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Bt.setFromMatrixColumn(t,0),Bt.multiplyScalar(-e),this._panOffset.add(Bt)}_panUp(e,t){this.screenSpacePanning===!0?Bt.setFromMatrixColumn(t,1):(Bt.setFromMatrixColumn(t,0),Bt.crossVectors(this.object.up,Bt)),Bt.multiplyScalar(e),this._panOffset.add(Bt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Bt.copy(i).sub(this.target);let r=Bt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new we,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Wv(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function Xv(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function $v(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(wu),this.state=At.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function qv(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ai.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=At.DOLLY;break;case ai.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=At.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=At.ROTATE}break;case ai.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=At.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=At.PAN}break;default:this.state=At.NONE}this.state!==At.NONE&&this.dispatchEvent(Xc)}function Yv(s){switch(this.state){case At.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case At.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case At.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function jv(s){this.enabled===!1||this.enableZoom===!1||this.state!==At.NONE||(s.preventDefault(),this.dispatchEvent(Xc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(wu))}function Kv(s){this.enabled!==!1&&this._handleKeyDown(s)}function Zv(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ii.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=At.TOUCH_ROTATE;break;case ii.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=At.TOUCH_PAN;break;default:this.state=At.NONE}break;case 2:switch(this.touches.TWO){case ii.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=At.TOUCH_DOLLY_PAN;break;case ii.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=At.TOUCH_DOLLY_ROTATE;break;default:this.state=At.NONE}break;default:this.state=At.NONE}this.state!==At.NONE&&this.dispatchEvent(Xc)}function Jv(s){switch(this._trackPointer(s),this.state){case At.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case At.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case At.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case At.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=At.NONE}}function Qv(s){this.enabled!==!1&&s.preventDefault()}function ex(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tx(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class nx extends ji{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new zc(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e){function t(l){const h=new DataView(l),u=32/8*3+32/8*3*3+16/8,d=h.getUint32(80,!0);if(80+32/8+d*u===h.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,h,_))return!1;return!0}function n(l,h,u){for(let d=0,f=l.length;d<f;d++)if(l[d]!==h.getUint8(u+d))return!1;return!0}function i(l){const h=new DataView(l),u=h.getUint32(80,!0);let d,f,g,_=!1,m,p,x,y,v;for(let I=0;I<70;I++)h.getUint32(I,!1)==1129270351&&h.getUint8(I+4)==82&&h.getUint8(I+5)==61&&(_=!0,m=new Float32Array(u*3*3),p=h.getUint8(I+6)/255,x=h.getUint8(I+7)/255,y=h.getUint8(I+8)/255,v=h.getUint8(I+9)/255);const E=84,w=50,A=new Mt,D=new Float32Array(u*3*3),b=new Float32Array(u*3*3),S=new Ze;for(let I=0;I<u;I++){const U=E+I*w,G=h.getFloat32(U,!0),q=h.getFloat32(U+4,!0),te=h.getFloat32(U+8,!0);if(_){const W=h.getUint16(U+48,!0);(W&32768)===0?(d=(W&31)/31,f=(W>>5&31)/31,g=(W>>10&31)/31):(d=p,f=x,g=y)}for(let W=1;W<=3;W++){const oe=U+W*12,X=I*3*3+(W-1)*3;D[X]=h.getFloat32(oe,!0),D[X+1]=h.getFloat32(oe+4,!0),D[X+2]=h.getFloat32(oe+8,!0),b[X]=G,b[X+1]=q,b[X+2]=te,_&&(S.setRGB(d,f,g,Nt),m[X]=S.r,m[X+1]=S.g,m[X+2]=S.b)}}return A.setAttribute("position",new Ft(D,3)),A.setAttribute("normal",new Ft(b,3)),_&&(A.setAttribute("color",new Ft(m,3)),A.hasColors=!0,A.alpha=v),A}function r(l){const h=new Mt,u=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,f=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,m=new RegExp("vertex"+_+_+_,"g"),p=new RegExp("normal"+_+_+_,"g"),x=[],y=[],v=[],E=new P;let w,A=0,D=0,b=0;for(;(w=u.exec(l))!==null;){D=b;const S=w[0],I=(w=f.exec(S))!==null?w[1]:"";for(v.push(I);(w=d.exec(S))!==null;){let q=0,te=0;const W=w[0];for(;(w=p.exec(W))!==null;)E.x=parseFloat(w[1]),E.y=parseFloat(w[2]),E.z=parseFloat(w[3]),te++;for(;(w=m.exec(W))!==null;)x.push(parseFloat(w[1]),parseFloat(w[2]),parseFloat(w[3])),y.push(E.x,E.y,E.z),q++,b++;te!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),q!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const U=D,G=b-D;h.userData.groupNames=v,h.addGroup(U,G,A),A++}return h.setAttribute("position",new Rt(x,3)),h.setAttribute("normal",new Rt(y,3)),h}function a(l){return typeof l!="string"?new TextDecoder().decode(l):l}function o(l){if(typeof l=="string"){const h=new Uint8Array(l.length);for(let u=0;u<l.length;u++)h[u]=l.charCodeAt(u)&255;return h.buffer||h}else return l}const c=o(e);return t(c)?i(c):r(a(e))}}function Mh(s,e){if(e===tf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ac||e===Yh){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===ac)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class ix extends ji{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new cx(t)}),this.register(function(t){return new lx(t)}),this.register(function(t){return new vx(t)}),this.register(function(t){return new xx(t)}),this.register(function(t){return new yx(t)}),this.register(function(t){return new ux(t)}),this.register(function(t){return new dx(t)}),this.register(function(t){return new fx(t)}),this.register(function(t){return new px(t)}),this.register(function(t){return new ox(t)}),this.register(function(t){return new mx(t)}),this.register(function(t){return new hx(t)}),this.register(function(t){return new _x(t)}),this.register(function(t){return new gx(t)}),this.register(function(t){return new rx(t)}),this.register(function(t){return new Mx(t)}),this.register(function(t){return new bx(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=rr.extractUrlBase(e);a=rr.resolveURL(l,this.path)}else a=rr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new zc(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Tu){try{a[dt.KHR_BINARY_GLTF]=new Sx(e)}catch(u){i&&i(u);return}r=JSON.parse(a[dt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Fx(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case dt.KHR_MATERIALS_UNLIT:a[u]=new ax;break;case dt.KHR_DRACO_MESH_COMPRESSION:a[u]=new Ex(r,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:a[u]=new wx;break;case dt.KHR_MESH_QUANTIZATION:a[u]=new Tx;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function sx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class rx{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Ze(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],rn);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new hc(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new xu(h),l.distance=u;break;case"spot":l=new Wp(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),kn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class ax{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return Un}extendParams(e,t,n){const i=[];e.color=new Ze(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],rn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Nt))}return Promise.all(i)}}class ox{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class cx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new we(o,o)}return Promise.all(r)}}class lx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class hx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class ux{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ze(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],rn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Nt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class dx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class fx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ze().setRGB(o[0],o[1],o[2],rn),Promise.all(r)}}class px{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class mx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ze().setRGB(o[0],o[1],o[2],rn),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Nt)),Promise.all(r)}}class gx{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class _x{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class vx{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class xx{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class yx{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class Mx{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class bx{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==En.TRIANGLES&&l.mode!==En.TRIANGLE_STRIP&&l.mode!==En.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const g of u){const _=new rt,m=new P,p=new An,x=new P(1,1,1),y=new Ls(g.geometry,g.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&x.fromBufferAttribute(c.SCALE,v),y.setMatrixAt(v,_.compose(m,p,x));for(const v in c)if(v==="_COLOR_0"){const E=c[v];y.instanceColor=new cc(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,c[v]);gt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Tu="glTF",Ks=12,bh={JSON:1313821514,BIN:5130562};class Sx{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ks),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Tu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ks,r=new DataView(e,Ks);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===bh.JSON){const l=new Uint8Array(e,Ks+a,o);this.content=n.decode(l)}else if(c===bh.BIN){const l=Ks+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ex{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const u=fc[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=fc[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ss[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(f)},o,l,rn,d)})})}}class wx{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Tx{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class Au extends xr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,x=1-m,y=p-d+u;for(let v=0;v!==o;v++){const E=a[_+v+o],w=a[_+v+c]*h,A=a[g+v+o],D=a[g+v]*h;r[v]=x*E+y*w+m*A+p*D}return r}}const Ax=new An;class Rx extends Au{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Ax.fromArray(r).normalize().toArray(r),r}}const En={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ss={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Sh={9728:sn,9729:vn,9984:zh,9985:ia,9986:er,9987:si},Eh={33071:Si,33648:ua,10497:Rs},uo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},fc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},xi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Cx={CUBICSPLINE:void 0,LINEAR:fr,STEP:dr},fo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Px(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ot({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:li})),s.DefaultMaterial}function Oi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function kn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Lx(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Dx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ix(s){let e;const t=s.extensions&&s.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+po(t.attributes):e=s.indices+":"+po(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+po(s.targets[n]);return e}function po(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function pc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Nx(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Ux=new rt;class Fx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new sx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new Hp(this.options.manager):this.textureLoader=new qp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Oi(r,o,i),kn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(rr.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=uo[i.type],o=Ss[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Ft(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=uo[i.type],l=Ss[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(x);y||(_=new l(o,p*f,i.count*f/h),y=new tp(_,f/h),t.cache.add(x,y)),m=new Nc(y,c,d%f/h,g)}else o===null?_=new l(i.count*c):_=new l(o,d,i.count*c),m=new Ft(_,c,g);if(i.sparse!==void 0){const p=uo.SCALAR,x=Ss[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new x(a[1],y,i.sparse.count*p),w=new l(a[2],v,i.sparse.count*c);o!==null&&(m=new Ft(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,D=E.length;A<D;A++){const b=E[A];if(m.setX(b,w[A*c]),c>=2&&m.setY(b,w[A*c+1]),c>=3&&m.setZ(b,w[A*c+2]),c>=4&&m.setW(b,w[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Sh[d.magFilter]||vn,h.minFilter=Sh[d.minFilter]||si,h.wrapS=Eh[d.wrapS]||Rs,h.wrapT=Eh[d.wrapT]||Rs,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==sn&&h.minFilter!==vn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Ht(_);m.needsUpdate=!0,d(m)}),t.load(rr.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),kn(u,a),u.userData.mimeType=a.mimeType||Nx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[dt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new cu,On.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new $i,On.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ot}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[dt.KHR_MATERIALS_UNLIT]){const u=i[dt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new Ze(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],rn),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,Nt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=zt);const h=r.alphaMode||fo.OPAQUE;if(h===fo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===fo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Un&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new we(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Un&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Un){const u=r.emissiveFactor;o.emissive=new Ze().setRGB(u[0],u[1],u[2],rn)}return r.emissiveTexture!==void 0&&a!==Un&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Nt)),Promise.all(l).then(function(){const u=new a(o);return r.name&&(u.name=r.name),kn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Oi(i,u,r),u})}createUniqueName(e){const t=Et.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return wh(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=Ix(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=wh(new Mt,l,t),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?Px(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const x=l[f];if(m.mode===En.TRIANGLES||m.mode===En.TRIANGLE_STRIP||m.mode===En.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new ip(_,x):new nt(_,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===En.TRIANGLE_STRIP?p.geometry=Mh(p.geometry,Yh):m.mode===En.TRIANGLE_FAN&&(p.geometry=Mh(p.geometry,ac));else if(m.mode===En.LINES)p=new Oc(_,x);else if(m.mode===En.LINE_STRIP)p=new qi(_,x);else if(m.mode===En.LINE_LOOP)p=new lp(_,x);else if(m.mode===En.POINTS)p=new hp(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Dx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),kn(p,r),m.extensions&&Oi(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Oi(i,u[0],r),u[0];const d=new yt;r.extensions&&Oi(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new tn(Dc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ma(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),kn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const u=a[l];if(u){o.push(u);const d=new rt;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Uc(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,v=d.length;y<v;y++){const E=d[y],w=f[y],A=g[y],D=_[y],b=m[y];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const S=n._createAnimationTracks(E,w,A,D,b);if(S)for(let I=0;I<S.length;I++)p.push(S[I])}const x=new Up(r,void 0,p);return kn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Ux)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new au:l.length>1?h=new yt:l.length===1?h=l[0]:h=new gt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),kn(h,r),r.extensions&&Oi(n,h,r),r.matrix!==void 0){const u=new rt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new yt;n.name&&(r.name=i.createUniqueName(n.name)),kn(r,n),n.extensions&&Oi(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof On||d instanceof Ht)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];xi[r.path]===xi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(xi[r.path]){case xi.weights:l=Ds;break;case xi.rotation:l=Is;break;case xi.translation:case xi.scale:l=Ns;break;default:switch(n.itemSize){case 1:l=Ds;break;case 2:case 3:default:l=Ns;break}break}const h=i.interpolation!==void 0?Cx[i.interpolation]:fr,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+xi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=pc(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Is?Rx:Au;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ox(s,e,t){const n=e.attributes,i=new xn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),o.normalized){const h=pc(Ss[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new P,c=new P;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=pc(Ss[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Xn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function wh(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=fc[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return pt.workingColorSpace!==rn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${pt.workingColorSpace}" not supported.`),kn(s,e),Ox(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Lx(s,e.targets,t):s})}class Bx extends ru{constructor(){super();const e=new on;e.deleteAttribute("uv");const t=new ot({side:nn}),n=new ot,i=new xu(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new nt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Ls(e,n,6),o=new gt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new nt(e,ms(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new nt(e,ms(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new nt(e,ms(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new nt(e,ms(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new nt(e,ms(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new nt(e,ms(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ms(s){return new Tp({color:0,emissive:16777215,emissiveIntensity:s})}const ar=new ot({color:15660790,transparent:!0,opacity:.28,depthWrite:!1,side:zt,roughness:.25,metalness:0}),Ru=new ot({color:13033697,transparent:!0,opacity:.19,depthWrite:!1,side:zt,roughness:.23,metalness:0}),mo=new ot({color:2450377,roughness:.42,metalness:.12}),zi=new ot({color:13883612,roughness:.28,metalness:.9}),ea=new ot({color:2238252,roughness:.5,metalness:.35}),kx=new ot({color:14080210,roughness:.69,metalness:0}),zx=new ot({color:14259089,roughness:.72});function gs(s,e,t,n=64){const i=new Os(e.map(([a,o])=>new we(a,o)),n);i.rotateX(Math.PI/2);const r=new nt(i,t);return r.name=s,r.receiveShadow=!0,r}function Jn(s,e,t,n,i,r=48){const a=new hn(e,e,t,r);a.rotateX(Math.PI/2);const o=new nt(a,i);return o.name=s,o.position.z=n+t/2,o.castShadow=i!==ar&&i!==Ru,o.receiveShadow=!0,o}function go(s,e,t,n,i,r,a,o){const c=new nt(new on(e,t,n),o);return c.name=s,c.position.set(i,r,a+n/2),c.castShadow=c.receiveShadow=!0,c}function Th(s,e,t){const n=new Os([new we(23.3,0),new we(26.6,0),new we(26.6,7),new we(23.3,7),new we(23.3,0)],32,e,t-e);n.rotateX(Math.PI/2);const i=new nt(n,zi);return i.name=s,i.position.z=48,i.castShadow=i.receiveShadow=!0,i}function Hx(s,e){const t=[[8.1,8.6],[10,11],[16.8,15.4],[20.9,19.4]],n=.62,i=[],r=[];for(const[c,l]of t)for(const h of[-n,n])i.push(c*Math.cos(e)-h*Math.sin(e),c*Math.sin(e)+h*Math.cos(e),l);for(let c=0;c<t.length-1;c++){const l=2*c;r.push(l,l+1,l+3,l,l+3,l+2)}const a=new Mt;a.setAttribute("position",new Rt(i,3)),a.setIndex(r),a.computeVertexNormals();const o=new nt(a,ar);return o.name=s,o}function Vx({fillMaterial:s=zx}={}){const e=new yt;e.name="R75 cartridge, retainer and clamp (illustrative)",e.userData={bareOutsideDiameterMm:43.2,bareLengthMm:98.8,datum:"bare outlet face z=0",dimensionalBasis:"Nordson Optimum typical envelope; internal and accessories estimated"};const t=new yt;t.name="cartridge_bare",e.add(t);const n=[[6.2,0],[7.6,0],[7.6,8.3],[10,10.4],[16.8,15.3],[21.6,19.5],[21.6,98.8],[20,98.8],[20,20.5],[15.5,16.3],[9,11.5],[6.2,8.3],[6.2,0]];t.add(gs("bare cartridge body and outlet",n,ar)),t.add(gs("bare outlet hex, no thread detail",[[6.2,1.1],[9.4,1.1],[9.4,8.3],[6.2,8.3],[6.2,1.1]],ar,6));for(let d=0;d<6;d++)t.add(Hx(`bare shoulder rib ${d+1}`,d*Math.PI/3));t.add(gs("bare upper rim",[[20,97.5],[21.6,97.5],[21.6,98.8],[20,98.8],[20,97.5]],ar));const i=20.7,r=75,a=Jn("illustrative material fill",18.8,1,i,s);e.add(a);const o=Jn("illustrative piston",19.2,1.6,i,kx);e.add(o);const c=Jn("illustrative piston seal",19.4,.6,i,ea);e.add(c);function l(d){const f=Number.isFinite(d)?Math.min(1,Math.max(0,d)):0,g=r*f;a.visible=g>1e-9,a.scale.z=Math.max(g,1e-6),a.position.z=i+g/2,o.position.z=i+g+.8,c.position.z=i+g+.3}l(1),e.add(gs("separate transparent pressure retainer",[[21.9,14],[23.2,14],[23.2,101],[21.9,101],[21.9,14]],Ru)),e.add(gs("retainer lower collar",[[9.4,8.8],[23.2,8.8],[23.2,14],[21.9,14],[18,14],[9.4,10],[9.4,8.8]],mo)),e.add(gs("retainer top retaining lip",[[21.9,99],[24,99],[24,102.2],[21.9,102.2],[21.9,99]],mo)),e.add(Jn("separate pressure cap",24,8.5,102.2,mo)),e.add(Jn("air connector base",8,3,110.7,zi,6)),e.add(Jn("air push-fit body",5.3,7,113.7,ea)),e.add(Jn("air push-fit collar",5.8,2,120.7,zi));const h=new gt;h.name="air inlet tubing end",h.position.set(0,0,122.7),h.userData.direction=[0,0,1],e.add(h);const u=new yt;u.name="estimated split clamp and mounting plate",e.add(u),u.add(Th("left clamp half",.08,Math.PI-.08),Th("right clamp half",Math.PI+.08,2*Math.PI-.08));for(const d of[-27,27]){u.add(go("clamp lug",9,10,9,d,0,47,zi));const f=Jn("clamp screw head",2.6,2,56,ea,12);f.position.x=d,u.add(f);const g=Jn("clamp screw socket",1,.25,58,zi,6);g.position.x=d,u.add(g)}u.add(go("mounting plate",58,8,42,0,30,30,ea)),u.add(go("rear machine attachment face",46,4,34,0,36,34,zi));for(const d of[-20,20])for(const f of[38,62]){const g=new nt(new hn(2.4,2.4,1.4,12),zi);g.name="rear mounting screw",g.position.set(d,24.9,f),u.add(g)}return{group:e,bare:t,piston:o,fill:a,airPort:h,updateFill:l}}const Zs=new P;function Sn(s,e,t,n,i,r){const a=2*Math.PI*i/4,o=Math.max(r-2*i,0),c=Math.PI/4;Zs.copy(e),Zs[n]=0,Zs.normalize();const l=.5*a/(a+o),h=1-Zs.angleTo(s)/c;return Math.sign(Zs[t])===1?h*l:o/(a+o)+l+l*(1-h)}class yr extends on{constructor(e=1,t=1,n=1,i=2,r=.1){const a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new P,l=new P,h=new P(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new P,m=.5/a;for(let p=0,x=0;p<u.length;p+=3,x+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*r,u[p+1]=h.y*Math.sign(c.y)+l.y*r,u[p+2]=h.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[x+0]=Sn(_,l,"z","y",r,n),f[x+1]=1-Sn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),f[x+0]=1-Sn(_,l,"z","y",r,n),f[x+1]=1-Sn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),f[x+0]=1-Sn(_,l,"x","z",r,e),f[x+1]=Sn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),f[x+0]=1-Sn(_,l,"x","z",r,e),f[x+1]=1-Sn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),f[x+0]=1-Sn(_,l,"x","y",r,e),f[x+1]=1-Sn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),f[x+0]=Sn(_,l,"x","y",r,e),f[x+1]=1-Sn(_,l,"y","x",r,t);break}}static fromJSON(e){return new yr(e.width,e.height,e.depth,e.segments,e.radius)}}function Gx(){const s=new yt;s.name="P300_supply_station_reference",s.userData={reference:"Graco DM-22 25T471",evidence:"exterior envelope from manual; individual parts engineering approximation",lowerHeightMm:550,raisedHeightMm:800,widthMm:360,depthMm:300,units:"mm",fluidConnection:"1/4 NPT female, nominal",airConnection:"8 mm female, nominal"};const e={blue:new ot({color:2056127,roughness:.42,metalness:.35}),blueDark:new ot({color:1458048,roughness:.5,metalness:.3}),steel:new ot({color:12831691,roughness:.37,metalness:.74}),satin:new ot({color:9083033,roughness:.46,metalness:.68}),dark:new ot({color:2502968,roughness:.7,metalness:.2}),black:new ot({color:1120541,roughness:.62,metalness:.1}),dial:new ot({color:14870239,roughness:.8,metalness:0}),red:new ot({color:12076348,roughness:.55,metalness:.15}),brass:new ot({color:11901526,roughness:.38,metalness:.72}),glass:new ot({color:12638170,transparent:!0,opacity:.24,depthWrite:!1,roughness:.25,metalness:.02,side:zt})};s.userData.ownedMaterials=Object.values(e);const t=(x,y,v,E,w,A,D,b="steel",S=1.2)=>{const I=Math.min(S,y/8,v/8,E/8),U=new nt(I>0?new yr(y,v,E,2,I):new on(y,v,E),e[b]);return U.name=x,U.position.set(w,A,D+E/2),U.castShadow=b!=="glass",U.receiveShadow=!0,s.add(U),U},n=(x,y,v,E,w,A,D="steel",b="z",S=32)=>{const I=new nt(new hn(y,y,v,S),e[D]);return I.name=x,I.castShadow=D!=="glass",I.receiveShadow=!0,b==="z"?(I.rotation.x=Math.PI/2,I.position.set(E,w,A+v/2)):b==="x"?(I.rotation.z=-Math.PI/2,I.position.set(E+v/2,w,A)):I.position.set(E,w-v/2,A),s.add(I),I},i=(x,y,v,E=2.6)=>{n("bolt washer",E+1.2,.5,x,y,v,"steel"),n("hex fastener",E,2.1,x,y,v+.5,"dark","z",6)},r=(x,y,v)=>{const E=new gt;E.name=x,E.position.set(...y);const w=new P(...v).normalize();return E.quaternion.setFromUnitVectors(new P(0,0,1),w),E.userData={axis:w.toArray(),reference:"visual connection datum; unverified physical fitting"},s.add(E),E};t("base footprint",360,300,18,0,0,0,"blueDark",1),t("lower enclosure",360,230,92,0,15,18,"blue",2),t("recessed front control panel",284,10,88,0,-105,20,"blueDark",1);for(const x of[-155,155])for(const y of[-125,125])i(x,y,18);for(const x of[-156,156])t("side edge protection",12,12,74,x,-107,21,"dark",1);for(const x of[-140,140])for(const y of[30,94])n("panel screw",2,1.2,x,-110,y,"steel","y",6);function a(x,y){n("pressure gauge body",16,6,x,-110,y,"black","y"),n("pressure gauge rim",14.6,1.4,x,-116,y,"steel","y"),n("pressure gauge face",12.6,.5,x,-117.4,y,"dial","y");for(let E=0;E<9;E++){const w=(-.75+E*1.5/8)*Math.PI,A=x+10*Math.sin(w),D=y+10*Math.cos(w),b=t("gauge tick",.6,.2,1.8,A,-118.1,D-.9,"dark",0);b.rotation.y=w}const v=t("gauge needle",.75,.3,8,x,-118.3,y-1,"red",0);v.rotation.y=.7,n("gauge spindle",1.4,.6,x,-118.5,y,"dark","y")}function o(x,y){n("regulator collar",11,4,x,-110,y,"steel","y"),n("regulator knob",10,15,x,-114,y,"black","y",32);for(let v=0;v<12;v++){const E=v*Math.PI/6,w=x+9.7*Math.sin(E),A=y+9.7*Math.cos(E),D=t("knob grip rib",1,11,1.5,w,-122,A-.75,"satin",0);D.rotation.y=E}}a(-92,80),a(66,80),o(-92,46),o(66,46);for(const x of[-30,18])n("selector mounting ring",7,3,x,-110,48,"steel","y"),n("selector switch",4.4,10,x,-113,48,"black","y"),t("selector grip",2.5,4,12,x,-124,42,"satin",.3);for(const x of[-126,126]){n("ram foot flange",24,9,x,24,110,"steel");for(const y of[-13,13])for(const v of[-13,13])i(x+y,24+v,119,2);n("vertical ram post",13.5,255,x,24,119,"satin"),n("upper ram collar",20,13,x,24,374,"steel"),n("upper ram collar cap",15,4,x,24,387,"dark")}t("crossbeam below upper plate",298,40,15,0,24,382,"steel",1.5),t("upper equipment mounting plate",300,150,12,0,14,397,"steel",1.5);for(const x of[-130,130])for(const y of[-40,68])i(x,y,409,2.2);const c=-62,l=12;t("cartridge housing lower mounting block",78,80,13,c,l,110,"satin",2),n("cartridge housing lower seat",35,10,c,l,123,"dark"),n("candidate aluminium cartridge",24,170,c,l,133,"steel"),n("candidate cartridge bottom shoulder",21,4,c,l,133,"satin"),n("candidate cartridge top edge",24.4,3,c,l,300,"satin");for(const x of[-33,33]){t("cartridge housing upright",8,52,206,c+x,l,123,"satin",1);for(const y of[135,210,310])i(c+x,l-18,y,2)}t("cartridge housing head",76,67,10,c,l,329,"satin",2),n("cartridge ram rod",8,43,c,l,339,"steel"),n("ram rod upper bushing",14,7,c,l,375,"dark"),t("transparent inspection panel",59,2,190,c,l-30,132,"glass",.2);for(const x of[c-23,c+23])for(const y of[142,308])n("inspection panel fastener",2,1.4,x,l-32,y,"dark","y");const h=62,u=32;n("pump lower mounting foot",38,10,h,u,110,"steel"),t("estimated feed manifold between cartridge and pump",68,32,18,0,l,120,"satin",1),n("pump lower body",29,210,h,u,120,"steel"),n("pump lower sleeve",33,55,h,u,150,"satin"),n("pump lower collar",34,7,h,u,205,"dark"),n("pump lower upper collar",33,7,h,u,323,"satin"),n("pump shaft neck",16,67,h,u,330,"steel"),n("pump motor lower flange",43,11,h,u,409,"steel"),n("pump pneumatic motor body",42,113,h,u,420,"satin"),n("pump motor upper lip",43,8,h,u,533,"steel"),n("pump motor cap",34,9,h,u,541,"dark");for(const x of[0,Math.PI/2,Math.PI,3*Math.PI/2])i(h+31*Math.cos(x),u+31*Math.sin(x),541,2.2);for(const x of[h-22,h+22])for(const y of[u-20,u+20])i(x,y,120,2.3);const d=247,f=h+29;n("fluid fitting boss",11,6,f,u,d,"satin","x",6),n("fluid fitting nut",10,10,f+6,u,d,"steel","x",6),n("fluid fitting coupling",7,12,f+16,u,d,"steel","x"),n("fluid fitting mouth",5.4,1,f+28,u,d,"dark","x");const g=r("fluid outlet datum",[f+29,u,d],[1,0,0]),_=114,m=55;n("air inlet panel boss",7,4,_,-110,m,"steel","y",6),n("air inlet coupling",5.8,12,_,-114,m,"brass","y"),n("air inlet face",4.2,1,_,-126,m,"dark","y");const p=r("main air inlet datum",[_,-127,m],[0,-1,0]);return s.updateMatrixWorld(!0),{group:s,fluidPort:g,airPort:p}}function Wx(){const s=new yt;s.name="C300 reference envelope — open inspection",s.userData={kind:"visual_envelope",source:"Graco 349735EN-B p.33",widthMm:939,depthMm:1041,heightMm:1905,bottomMm:-900,topMm:1005,caveat:"external envelope published; panel geometry, mounting and opening assumed; not OEM CAD"};const e={body:new ot({color:15330280,roughness:.55,metalness:.1}),frame:new ot({color:12239296,roughness:.54,metalness:.34}),door:new ot({color:14869983,roughness:.72,metalness:.14}),gasket:new ot({color:4213067,roughness:.8,metalness:.08}),steel:new ot({color:8359310,roughness:.4,metalness:.7}),screen:new ot({color:993850,roughness:.25,metalness:.1,emissive:735826,emissiveIntensity:.8}),screenLine:new ot({color:8106941,roughness:.6,metalness:0}),blue:new ot({color:2056145,roughness:.45,metalness:.15}),red:new ot({color:12662052,roughness:.42,metalness:.08}),yellow:new ot({color:14665028,roughness:.55,metalness:0})};s.userData.ownedMaterials=Object.values(e);function t(i,r,a,o,c,l,h,u){const d=new nt(new on(r,a,o),e[u]);return d.name=i,d.position.set(c,l,h+o/2),d.castShadow=!0,d.receiveShadow=!0,s.add(d),d}function n(i,r,a,o,c,l,h,u=20){const d=new nt(new hn(r,r,a,u),e[h]);return d.name=i,d.position.set(o,c,l),d.castShadow=!0,d.receiveShadow=!0,s.add(d),d}t("cabinet structure",939,1037,850,0,0,-900,"body"),t("front skin",939,2,850,0,-519.5,-900,"body"),t("rear skin",939,2,850,0,519.5,-900,"body"),t("front access door gasket",710,.5,620,0,-520.15,-830,"gasket"),t("front access door",704,.35,614,0,-520,-827,"door"),t("door label plate",180,.2,74,0,-520.29,-560,"frame"),t("door visual label inset",148,.15,42,0,-520.4,-544,"blue");for(const i of[-280,280])t("cabinet door pull",8,.8,95,i,-520,-315,"steel"),t("door pull lower bracket",24,.8,8,i,-520,-320,"gasket"),t("door pull upper bracket",24,.8,8,i,-520,-220,"gasket");for(const i of[-443,-360,-180,0,180,360,443])for(const r of[-874,-83])n("cabinet fastener",3,.55,i,-520.15,r,"steel",12);for(const i of[-340,340])for(const r of[-814,-230])n("access door fastener",2.6,.45,i,-520.2,r,"steel",12);for(const i of[-448.5,448.5])for(const r of[-499.5,499.5])t("window support post",42,42,1e3,i,r,-50,"frame"),t("post face inset",16,1,950,i,r<0?-520:520,-25,"gasket");t("roof structure",939,1041,55,0,0,950,"body");for(const i of[-510,510])t("window upper rail",855,20,24,0,i,926,"frame"),t("window sill",855,20,22,0,i,-50,"frame");for(const i of[-459,459])t("window side upper rail",20,957,24,i,0,926,"frame"),t("window side sill",20,957,22,i,0,-50,"frame");t("rear window mid rail",855,12,12,0,510,420,"frame");for(const i of[-459,459])t("side window mid rail",12,957,12,i,0,420,"frame");for(const i of[115,420,735])t("front door hinge",18,4,40,436,-518,i,"steel"),n("hinge pin",3,1,436,-519.6,i+20,"gasket",12);t("door latch backing",18,5,180,430,-517.8,280,"gasket"),t("door latch grip",9,4,144,430,-518.5,298,"steel"),t("console support bracket",78,20,24,-403,-500,620,"steel"),t("console housing",190,20,155,-330,-508,490,"gasket"),t("console bezel",176,1,141,-330,-518.4,497,"frame"),t("console screen",160,.7,106,-330,-519.3,524,"screen");for(let i=0;i<4;i++)t("screen interface row",118-i*13,.2,3,-334,-519.77,598-i*17,"screenLine");for(let i=0;i<4;i++)t("screen soft key",15,.2,7,-385+i*35,-519.77,532,"blue");for(const i of[-410,-250])for(const r of[503,632])n("console fastener",2,.5,i,-519.4,r,"steel",12);return t("operator button panel",108,10,68,-343,-511,404,"frame"),n("emergency stop yellow surround",18,3,-372,-517.5,438,"yellow"),n("emergency stop head",11,1.5,-372,-519.3,438,"red"),n("start indicator",6,2,-332,-519,438,"blue"),n("auxiliary indicator",6,2,-308,-519,438,"gasket"),s}function Xx(){const s=new yt;s.name="PCP 0.30cc reference - 303mm body";const e=new ot({color:13817819,metalness:.9,roughness:.28}),t=new ot({color:3358016,metalness:.35,roughness:.55}),n=new ot({color:2503220,metalness:.15,roughness:.65}),i=new ot({color:2846678,metalness:.3,roughness:.4});s.userData.ownedMaterials=[e,t,n,i];function r(h,u,d,f,g=e,_=48){const m=new hn(u,u,d,_);m.rotateX(Math.PI/2);const p=new nt(m,g);return p.name=h,p.position.z=f+d/2,p.castShadow=p.receiveShadow=!0,s.add(p),p}function a(h,u,d,f,g,_,m,p=e){const x=new nt(new on(u,d,f),p);return x.name=h,x.position.set(g,_,m+f/2),x.castShadow=x.receiveShadow=!0,s.add(x),x}r("end adapter",12,13,0,e,6),r("stator end ring",15,5,13,t),r("stator body",14,105,18,n),r("stator coupling",18,10,123,e,6),r("pump barrel",20,78,133,e),r("seal housing",25,25,211,t),r("bearing housing",27,24,236,e),r("sanitary clamp",29,8,260,e),r("drive adapter",22,26,268,t),r("gearbox flange",39,9,294,e);for(let h=0;h<4;h++){const u=h*Math.PI/2,d=r("flange M4 visual",2.3,1.2,303,t,12);d.position.x=35*Math.cos(u),d.position.y=35*Math.sin(u)}r("motor shoulder",31,10,303,t),r("motor housing estimated",34,72,313,i);for(let h=0;h<8;h++){const u=h*Math.PI/4;a("motor cooling rib",3,3,52,32*Math.cos(u),32*Math.sin(u),321,t)}r("motor rear cap",34,6,385,t);const o=195,c=new nt(new hn(8,8,24,6),e);c.name="schematic side inlet #8/#6 JIC",c.rotation.z=-Math.PI/2,c.position.set(31,0,o),s.add(c);const l=new gt;l.name="PCP material inlet (schematic outlet face)",l.position.set(43,0,o),s.add(l),a("mounting rail plate estimated",58,8,125,0,38,125,t);for(const h of[145,225]){a("clamp bridge estimated",58,12,9,0,27,h,e);for(const u of[-24,24])r("clamp bolt",2.2,1.5,h+9,t,12).position.set(u,27,h+9.75)}return{group:s,inletPort:l,bodyLengthMm:303,flangeBoltCircleMm:70}}function $x(s,e,t="feed"){const n=s.clone(),i=e.clone();if(t==="air")return[n,n.clone().add(new P(0,0,28)),i.clone().add(new P(0,0,30)),i];if(t==="stationAir")return[n,n.clone().add(new P(0,-30,0)),i.clone().add(new P(-40,0,0)),i];if(t==="supply"){const r=n.clone().lerp(i,.5);return r.z=Math.max(n.z,i.z)+70,[n,n.clone().add(new P(0,0,40)),r,i.clone().add(new P(-50,0,0)),i]}return[n,n.clone().add(new P(35,0,0)),new P(-520,330,n.z+65),new P(-520,360,Math.max(i.z+120,180)),new P(i.x+120,180,i.z+100),i.clone().add(new P(50,0,0)),i]}function _o(s,e,t="feed",n=3){const i=$x(s,e,t),r=new pu(i,!1,"centripetal");return new kc(r,96,n,12,!1)}const ga=Object.freeze({part:"Nordson 7018555 candidate",nominalLengthMm:63.5,nominalIdMm:3.175,assumedInsertionMm:7,thread:"1/4 NPT nominal",evidence:"published dimensions + assumed insertion; unconfirmed Laird test setup",source:"https://www.nordson.com/en/products/efd-products/plastic-nozzles"}),qx=Object.freeze({R75:{cartridge:{capacityMl:75,outerDiameterMm:43.2,axialLengthMm:98.8,evidence:"published typical external envelope; bare cartridge only",source:"https://www.nordsonefd.com/nordson_efd_product_catalog/25/"},nozzle:ga,other:"retainer, piston, holder and air hose routing are visual engineering assumptions"},P300:{enclosure:{model:"C300 reference envelope",widthMm:939,depthMm:1041,heightMm:1905,workspaceMm:[254,277,70],source:"https://www.graco.com/content/dam/graco/com_documents/349/349735/349735EN-B.pdf",evidence:"published outer envelope; interior and panels are visual assumptions"},supply:{model:"DM-22 25T471 reference",widthMm:360,depthMm:300,loweredHeightMm:550,raisedHeightMm:800,fluidPort:"1/4 NPT female",airPort:"8 mm female",source:"https://www.graco.com/content/dam/graco/tech_documents/manuals/3A7/3A7931/3A7931EN-D.pdf",evidence:"published metric dimensions; components and tubing routes are visual assumptions"},pcp:{model:"25B192 candidate; not confirmed Laird upgraded PCP",bodyLengthMm:303,boltCircleMm:70,inlet:"#8/#6 JIC",outlet:"5/16-28",source:"https://www.graco.com/content/dam/graco/tech_documents/manuals/3A5/3A5364/3A5364EN.pdf",evidence:"published body length and fittings; motor and details approximated"}}});function Yx(){const s=(e,t,n,i={})=>new ot({color:e,roughness:t,metalness:n,...i});return{graphite:s(2830649,.5,.35),cover:s(15526629,.42,.05),coverGrey:s(13225168,.45,.1),cobalt:s(2056145,.34,.3),cobaltDark:s(1523340,.42,.3),steel:s(14015199,.24,.92),steelDark:s(9278877,.32,.88),aluminum:s(12896976,.3,.82),castAl:s(11778753,.46,.7),black:s(1513756,.48,.35),rubber:s(1052947,.92,0),orange:s(15760411,.5,.05),red:s(14166074,.36,.05),yellow:s(16040991,.42,.05),green:s(2274402,.38,.05),teal:s(1474698,.4,.45),hole:s(3159613,.7,.3),bench:s(14275527,.82,0),mat:s(2776936,.88,0),brass:s(13214285,.3,.9),lens:s(856342,.2,.1),glass:new an({color:14676735,roughness:.08,metalness:0,transparent:!0,opacity:.16,depthWrite:!1,side:zt,clearcoat:1}),polymer:new an({color:10465402,roughness:.35,metalness:0,transparent:!0,opacity:.82,clearcoat:.6})}}class jx{constructor(e,t={parts:0}){this.palette=e,this.counter=t,this.edgeMaterial=new $i({color:724756,transparent:!0,opacity:.13})}material(e){return typeof e=="string"?this.palette[e]:e}mesh(e,t,n,{edges:i=!0,shadow:r=!0}={}){const a=new nt(e,this.material(t));return a.castShadow=r,a.receiveShadow=!0,i&&a.add(new Oc(new du(e,32),this.edgeMaterial)),n.add(a),this.counter.parts++,a}box(e,t,n,i,r,a,o,c,l){const h=l??Math.min(1.2,e/12,t/12,n/6),u=h>.15&&Math.min(e,t,n)>=2.5?new yr(e,t,n,2,h):new on(e,t,n),d=this.mesh(u,o,c);return d.position.set(i,r,a+n/2),d}cyl(e,t,n,i,r,a,o,c=32){const l=new hn(e,e,t,c);l.rotateX(Math.PI/2);const h=this.mesh(l,a,o,{edges:c<=8});return h.position.set(n,i,r+t/2),h}rod(e,t,n,i,r,a,o,c,l=24){const h=new hn(e,e,t,l);n==="x"?h.rotateZ(Math.PI/2):n==="z"&&h.rotateX(Math.PI/2);const u=this.mesh(h,o,c,{edges:!1});return u.position.set(i,r,a),u}screw(e,t,n,i,r=1.6,a="z"){const o=new hn(r,r,r*.9,14),c=new hn(r*.45,r*.45,r*.95,6);a==="z"?(o.rotateX(Math.PI/2),c.rotateX(Math.PI/2)):a==="y"||(o.rotateZ(Math.PI/2),c.rotateZ(Math.PI/2));const l=this.mesh(o,"black",i,{edges:!1,shadow:!1});return l.position.set(e,t,n),this.mesh(c,"hole",i,{edges:!1,shadow:!1}).position.set(e,t,n),l}}function Kx({material:s,sideMaterial:e,pitch:t=9,width:n=26,height:i=12,radius:r=16,free:a=200}){const o=Math.ceil((a+Math.PI*r)/t)+2,c=new yr(t*.92,n,i,1,1.2),l=new on(t*.6,n+2,i*.45),h=new Ls(c,s,o),u=new Ls(l,e,o);h.castShadow=u.castShadow=!0,h.receiveShadow=!0;const d=new yt;d.add(h,u);const f=new rt,g=new An,_=new Rn,m=new P(1,1,1),p=new P;function x(y){const v=(a+y)/2,E=Math.max(0,v),w=Math.max(0,v-y);for(let A=0;A<o;A++){let D=(A+.5)*t,b=0;if(D<=E)p.set(D,0,0);else if((D-=E)<=Math.PI*r){const S=D/r;p.set(v+r*Math.sin(S),0,r-r*Math.cos(S)),b=-S}else D-=Math.PI*r,p.set(v-Math.min(D,w),0,2*r),b=-Math.PI;g.setFromEuler(_.set(0,b,0)),f.compose(p,g,m),h.setMatrixAt(A,f),u.setMatrixAt(A,f)}h.instanceMatrix.needsUpdate=u.instanceMatrix.needsUpdate=!0,h.computeBoundingSphere(),u.computeBoundingSphere()}return x(0),{group:d,update:x,dispose:()=>[c,l].forEach(y=>y.dispose())}}function Zx(s=256,e=112){if(typeof document>"u")return null;const t=document.createElement("canvas");t.width=s,t.height=e;const n=new lu(t);n.colorSpace=Nt;const i=t.getContext("2d");let r="";function a(o,c){const l=o.join("|")+c;l!==r&&(r=l,i.fillStyle="#0b2b1f",i.fillRect(0,0,s,e),i.fillStyle=c?"#7dffb2":"#47d38a",i.font="bold 40px ui-monospace, Menlo, Consolas, monospace",i.fillText(o[0],14,50),i.font="22px ui-monospace, Menlo, Consolas, monospace",i.fillText(o[1],14,88),c&&(i.fillStyle="#ffcf5a",i.fillRect(s-30,14,14,14)),n.needsUpdate=!0)}return{texture:n,draw:a}}const Js=[[0,[.16,.2,.55]],[.25,[.12,.45,.78]],[.5,[.1,.68,.66]],[.75,[.55,.82,.32]],[1,[.99,.82,.2]]];function Jx(s){const e=Math.max(0,Math.min(1,s));for(let t=1;t<Js.length;t++)if(e<=Js[t][0]){const[n,i]=Js[t-1],[r,a]=Js[t],o=(e-n)/(r-n);return i.map((c,l)=>c+(a[l]-c)*o)}return Js.at(-1)[1]}function Qx(s,e,t,{plateMargin:n=6}={}){var Re;const i=new yt;i.name="estimated compression inspection";const r=[],a=ge=>(r.push(ge),ge),o=t.grid,c=s.surfaceZ,l=e.width,h=e.shape==="circle"?e.width:e.depth,u=Uint8Array.from(o.coverage,ge=>Math.round(Math.max(0,Math.min(1,Number(ge)||0))*255)),d=(Re=o.frames)!=null&&Re.length?o.frames:[{gap:e.gap,coverage:u,trapped:o.voidMask||new Uint8Array(u.length)}],f=o.cols*o.rows,g=new Float32Array(f).fill(-1);d.forEach((ge,pe)=>{for(let Oe=0;Oe<f;Oe++)g[Oe]<0&&ge.coverage[Oe]>=128&&(g[Oe]=d.length>1?pe/(d.length-1):1)});const _=e.shape==="circle"?new xa(l/2,96):new Ci(l,h),m=new nt(_,a(new Un({color:1684930,transparent:!0,opacity:.35,side:zt,depthWrite:!1})));m.position.set(e.offsetX,e.offsetY,c+.004),m.name="configured heat source",m.renderOrder=1,i.add(m);const p=e.shape==="circle"?Array.from({length:97},(ge,pe)=>new P(l/2*Math.cos(pe*Math.PI*2/96),l/2*Math.sin(pe*Math.PI*2/96),0)):[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]].map(([ge,pe])=>new P(ge*l/2,pe*h/2,0)),x=new qi(new Mt().setFromPoints(p),a(new $i({color:771542,depthTest:!1,transparent:!0})));x.position.set(e.offsetX,e.offsetY,c+e.gap+.02),x.name="heat source boundary",x.renderOrder=6,i.add(x);let y=o.cols,v=-1,E=o.rows,w=-1;for(let ge=0;ge<f;ge++)if(u[ge]>0||d.some(pe=>pe.coverage[ge]>0)){const pe=ge%o.cols,Oe=Math.floor(ge/o.cols);y=Math.min(y,pe),v=Math.max(v,pe),E=Math.min(E,Oe),w=Math.max(w,Oe)}const A=v>=y;A&&(y=Math.max(0,y-1),E=Math.max(0,E-1),v=Math.min(o.cols-1,v+1),w=Math.min(o.rows-1,w+1));const D=A?v-y+2:0,b=A?w-E+2:0,S=new Mt,I=new Float32Array(D*b*3),U=new Float32Array(D*b*3),G=new Float32Array(D*b);for(let ge=0;ge<b;ge++)for(let pe=0;pe<D;pe++){const Oe=ge*D+pe;I[3*Oe]=o.originX+(y+pe)*o.cellSize,I[3*Oe+1]=o.originY+(E+ge)*o.cellSize}S.setAttribute("position",new Ft(I,3)),S.setAttribute("color",new Ft(U,3));const q=new Ze((Xt[s.material]||Xt.putty).color),te=new nt(S,a(new an({vertexColors:!0,roughness:.55,metalness:0,clearcoat:.2,clearcoatRoughness:.5,side:zt,envMapIntensity:.6})));te.name="squeezed film",te.castShadow=!0,te.receiveShadow=!0,i.add(te);const W=new nt(new Mt,a(new Un({color:16723285,transparent:!0,opacity:.85,side:zt,depthWrite:!1})));W.name="trapped air",W.position.z=c+.01,W.renderOrder=4,i.add(W);let oe=e.offsetX-l/2,X=e.offsetX+l/2,fe=e.offsetY-h/2,Se=e.offsetY+h/2;for(let ge=0;ge<f;ge++){if(!(Number(o.coverage[ge])>1e-7))continue;const pe=o.originX+ge%o.cols*o.cellSize,Oe=o.originY+Math.floor(ge/o.cols)*o.cellSize;oe=Math.min(oe,pe),X=Math.max(X,pe+o.cellSize),fe=Math.min(fe,Oe),Se=Math.max(Se,Oe+o.cellSize)}const Ee=3,Ae=new on(X-oe+2*n,Se-fe+2*n,Ee),at=new nt(Ae,a(new an({color:13626101,transparent:!0,opacity:.1,roughness:.05,metalness:0,clearcoat:.4,depthWrite:!1,side:zt})));at.name="transparent inspection plate",at.renderOrder=5,i.add(at),at.add(new Oc(new du(Ae),a(new $i({color:4892612,transparent:!0,opacity:.8,depthWrite:!1}))));let We="material",it=d.length-1;const ne=new Ze;function ie(ge){it=Math.max(0,Math.min(d.length-1,ge));const pe=d[it],Oe=pe.gap;if(at.position.set((oe+X)/2,(fe+Se)/2,c+Oe+Ee/2),x.position.z=c+Oe+.02,A){const Ne=(ce,Be)=>ce<0||Be<0||ce>=o.cols||Be>=o.rows?0:pe.coverage[Be*o.cols+ce]/255,Le=new Float32Array(D*b);for(let ce=0;ce<b;ce++)for(let Be=0;Be<D;Be++){const me=y+Be,Ie=E+ce;Le[ce*D+Be]=(Ne(me-1,Ie-1)+Ne(me,Ie-1)+Ne(me-1,Ie)+Ne(me,Ie))/4}for(let ce=0;ce<b;ce++)for(let Be=0;Be<D;Be++){let me=0,Ie=0;for(let et=-1;et<=1;et++)for(let Ke=-1;Ke<=1;Ke++){const R=Be+Ke,M=ce+et;R<0||M<0||R>=D||M>=b||(me+=Le[M*D+R],Ie++)}G[ce*D+Be]=me/Ie}for(let ce=0;ce<b;ce++)for(let Be=0;Be<D;Be++){const me=ce*D+Be,Ie=G[me];if(I[3*me+2]=c+Oe*Math.min(1,2.2*(Ie-.22))-(Ie<.22?.02:0),We==="front"){const et=y+Be,Ke=E+ce;let R=-1;for(const[k,Q]of[[et-1,Ke-1],[et,Ke-1],[et-1,Ke],[et,Ke]])k>=0&&Q>=0&&k<o.cols&&Q<o.rows&&(R=Math.max(R,g[Q*o.cols+k]));const M=Jx(R<0?1:R);ne.setRGB(M[0],M[1],M[2],Nt)}else ne.copy(q).multiplyScalar(.7+.2*Math.min(1,Ie));U[3*me]=ne.r,U[3*me+1]=ne.g,U[3*me+2]=ne.b}const Ce=[];for(let ce=0;ce<b-1;ce++)for(let Be=0;Be<D-1;Be++){const me=ce*D+Be;Math.max(G[me],G[me+1],G[me+D],G[me+D+1])<.22||Ce.push(me,me+1,me+D+1,me,me+D+1,me+D)}S.setIndex(Ce),S.attributes.position.needsUpdate=!0,S.attributes.color.needsUpdate=!0,S.computeVertexNormals(),S.computeBoundingSphere()}const Xe=[],N=pe.trapped||o.voidMask;if(N){for(let Ne=0;Ne<f;Ne++)if(N[Ne]){const Le=o.originX+Ne%o.cols*o.cellSize,Ce=o.originY+Math.floor(Ne/o.cols)*o.cellSize,ce=o.cellSize;Xe.push(Le,Ce,0,Le+ce,Ce,0,Le+ce,Ce+ce,0,Le,Ce,0,Le+ce,Ce+ce,0,Le,Ce+ce,0)}}return W.geometry.dispose(),W.geometry=new Mt,W.geometry.setAttribute("position",new Rt(Xe,3)),pe}return ie(it),{group:i,source:m,film:te,voids:W,plate:at,frameCount:d.length,frames:d,get frameIndex(){return it},setFrame:ie,setColorMode(ge){We=ge,ie(it)},dispose(){i.removeFromParent(),i.traverse(ge=>{var pe;return(pe=ge.geometry)==null?void 0:pe.dispose()});for(const ge of r)ge.dispose()}}}function ey(s,e){const t=s/2,n=t+.55,i=Math.max(5,n+.4),r=[[t,0],[n,0],[n+.12,Math.min(2,e*.12)],[i,e],[t,e],[t,0]].map(([o,c])=>new we(o,c)),a=new Os(r,64);return a.rotateX(Math.PI/2),a}function ty(s,e){const t=s/2,n=ga.assumedInsertionMm,i=[[t,e],[6.2,e],[6.2,e+n],[t,e+n],[t,e]].map(([a,o])=>new we(a,o)),r=new Os(i,48);return r.rotateX(Math.PI/2),r}function Cu(s){const e=s.attributes.position,t=s.index;let n=0;for(let i=0;i<(t?t.count:e.count);i+=3){const r=t?t.getX(i):i,a=t?t.getX(i+1):i+1,o=t?t.getX(i+2):i+2;n+=(e.getX(r)*(e.getY(a)*e.getZ(o)-e.getZ(a)*e.getY(o))+e.getY(r)*(e.getZ(a)*e.getX(o)-e.getX(a)*e.getZ(o))+e.getZ(r)*(e.getX(a)*e.getY(o)-e.getY(a)*e.getX(o)))/6}return Math.abs(n)}function Pu(s,e,t,n){const i=yc(s,e,t),r=s.length,a=xo,o=a+1,c=[],l=[];for(let d=0;d<=r;d++){const f=n(d);for(let g=0;g<=a;g++){const _=g*Math.PI/a,m=i.widths[d]*Math.cos(_)/2;c.push(f.x+f.nx*m,f.y+f.ny*m,i.heights[d]*Math.sin(_))}}for(let d=0;d<r;d++)for(let f=0;f<a;f++){const g=d*o+f;l.push(g,g+1,g+o+1,g,g+o+1,g+o)}const h=c.length/3;for(let d=0;d<=r;d++){const f=n(d),g=i.widths[d]/2;c.push(f.x+f.nx*g,f.y+f.ny*g,0,f.x-f.nx*g,f.y-f.ny*g,0)}for(let d=0;d<r;d++){const f=h+2*d;l.push(f,f+2,f+3,f,f+3,f+1)}const u=new Mt;return u.setAttribute("position",new Rt(c,3)),u.setIndex(l),u.computeVertexNormals(),u.userData.unitVolume=Cu(u),u}function Ah(s,e,t){return Pu(s,e,t,n=>({x:n*e,y:0,nx:0,ny:1}))}function Rh(s,e,t,n,i){return Pu(s,e,t,r=>{const a=i+r*e,o=_c(n,a),c=a-Math.max(0,Math.min(n.length,a));return{x:o.x+o.tx*c,y:o.y+o.ty*c,nx:-o.ty,ny:o.tx}})}function ny(s,e){const t=new yt,n=s.width,i=s.shape==="circle"?n:s.depth,r=new Un({color:1684930,transparent:!0,opacity:.22,side:zt,depthWrite:!1}),a=new $i({color:692124,transparent:!0,opacity:.95,depthWrite:!1}),o=s.shape==="circle"?new xa(n/2,96):new Ci(n,i),c=new nt(o,r);c.position.z=e+.003,c.renderOrder=1,t.add(c);const l=s.shape==="circle"?Array.from({length:97},(u,d)=>new P(n/2*Math.cos(d*2*Math.PI/96),n/2*Math.sin(d*2*Math.PI/96),e+.006)):[[-n/2,-i/2],[n/2,-i/2],[n/2,i/2],[-n/2,i/2],[-n/2,-i/2]].map(([u,d])=>new P(u,d,e+.006)),h=new qi(new Mt().setFromPoints(l),a);return h.renderOrder=2,t.add(h),t.position.set(s.offsetX,s.offsetY,0),t.name="設定的熱源參考輪廓",t.userData.ownedMaterials=[r,a],t}function iy(s){const t=2*s,n=(1+t*t)/(2*t),i=t-n,r=Math.acos((n-t)/n),a=48,o=16,c=[0,0,t],l=[];for(let f=1;f<=o;f++){const g=r*f/o,_=n*Math.sin(g),m=i+n*Math.cos(g);for(let p=0;p<a;p++){const x=p*2*Math.PI/a;c.push(_*Math.cos(x),_*Math.sin(x),m)}}for(let f=0;f<a;f++)l.push(0,1+f,1+(f+1)%a);for(let f=0;f<o-1;f++)for(let g=0;g<a;g++){const _=1+f*a+g,m=1+f*a+(g+1)%a;l.push(_,_+a,m,m,_+a,m+a)}const h=c.length/3;c.push(0,0,0);const u=1+(o-1)*a;for(let f=0;f<a;f++)l.push(h,u+(f+1)%a,u+f);const d=new Mt;return d.setAttribute("position",new Rt(c,3)),d.setIndex(l),d.computeVertexNormals(),d.userData.unitVolume=Cu(d),d}function sy(s,e){if(typeof document>"u")return new Ze(e);const t=document.createElement("canvas");t.width=4,t.height=256;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,0,256);i.addColorStop(0,s),i.addColorStop(1,e),n.fillStyle=i,n.fillRect(0,0,4,256);const r=new lu(t);return r.colorSpace=Nt,r}const ry=s=>s<.5?4*s*s*s:1-(-2*s+2)**3/2,ay=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,oy={whole:"全機",work:"工作區",head:"機頭",feed:"供膠站",close:"點膠近看",heat:"熱源特寫",follow:"局部跟隨"};class cy{constructor(e,{onScale:t,onView:n}={}){this.host=e,this.onScale=t,this.onView=n,this.mode="close",this.config=null,this.counter={parts:0},this.isoCorner=2,this.freeOrbit=!1,this.projection="ortho",this.showExitPath=!0,this.showPlannedPath=!0,this.theme="light",this.scene=new ru,this.renderer=new Hv({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.outputColorSpace=Nt,this.renderer.toneMapping=Bh,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Oh,e.appendChild(this.renderer.domElement);const i=this.renderer.domElement;i.setAttribute("aria-label","毫米比例的點膠機台 3D 場景；可拖曳、滾輪縮放，Home 重設"),i.setAttribute("tabindex","0");const r=new uc(this.renderer);this.scene.environment=r.fromScene(new Bx,.04).texture,this.scene.environmentIntensity=.7,r.dispose(),this.hemi=new Vp(16777215,7174790,.9),this.scene.add(this.hemi),this.sun=new hc(16774374,2.4),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-2e-4,this.sun.shadow.normalBias=.6,this.scene.add(this.sun,this.sun.target);const a=new hc(13229311,.8);a.position.set(400,600,300),this.scene.add(a),this.setTheme("light"),this.ortho=new Ma(-150,150,100,-100,.1,2e4),this.persp=new tn(32,1,1,3e4),this.ortho.up.set(0,0,1),this.persp.up.set(0,0,1),this.camera=this.ortho,this.makeControls(),this.palette=Yx(),this.kit=new jx(this.palette,this.counter),this.glue=new an({color:Xt.putty.color,roughness:.48,metalness:0,clearcoat:.35,clearcoatRoughness:.4,sheen:.4}),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),i.addEventListener("keydown",o=>{if(o.key==="+"||o.key==="=")this.zoomBy(1.2);else if(o.key==="-")this.zoomBy(1/1.2);else if(o.key==="Home")this.fit(this.mode);else return;o.preventDefault()})}makeControls(){var e;(e=this.controls)==null||e.dispose(),this.controls=new Gv(this.camera,this.renderer.domElement),this.controls.enableDamping=!1,this.controls.minZoom=.2,this.controls.maxZoom=40,this.controls.minDistance=20,this.controls.maxDistance=2e4,this.controls.minPolarAngle=.01,this.controls.maxPolarAngle=Math.PI-.01,this.controls.zoomToCursor=!0,this.controls.addEventListener("change",()=>this.render()),this.applyOrbitMode()}applyOrbitMode(){const e=this.freeOrbit;this.controls.enableRotate=e,this.controls.mouseButtons.LEFT=e?ai.ROTATE:ai.PAN,this.controls.mouseButtons.RIGHT=ai.PAN,this.controls.touches.ONE=e?ii.ROTATE:ii.PAN,this.controls.touches.TWO=ii.DOLLY_PAN}setTheme(e){var n,i;this.theme=e;const t=e==="dark";(i=(n=this.scene.background)==null?void 0:n.dispose)==null||i.call(n),this.scene.background=sy(t?"#243042":"#f4f7fb",t?"#0d1218":"#cdd6e1"),this.hemi.intensity=t?.7:.9,this.render()}disposeGroup(e){e&&(e.traverse(t=>{var n,i;(n=t.geometry)==null||n.dispose();for(const r of((i=t.userData)==null?void 0:i.ownedMaterials)||[])r.dispose()}),e.removeFromParent())}rebuild(e,t){var d,f,g,_,m;this.clearCompression(),(d=this.imported)==null||d.removeFromParent();for(const p of[this.machine,this.environment,this.depositGroup,this.patternSource,this.overlays])this.disposeGroup(p);(f=this.chain)==null||f.dispose(),(g=this.hose)==null||g.material.dispose(),(_=this.supplyHose)==null||_.material.dispose(),(m=this.stationAirHose)==null||m.material.dispose(),Object.assign(this,{cartridge:null,pumpStation:null,head:null,hose:null,supplyHose:null,stationAirHose:null,chain:null,lcd:null,lastHose:null,enclosure:null,stationAirAnchor:null}),this.counter.parts=0,this.config=e,this.run=t;const n=e.architecture==="P300",i=this.kit;this.glue.color.setHex((Xt[e.material]||Xt.putty).color);const r=e.architecture==="R75"?ga.nominalLengthMm-ga.assumedInsertionMm:e.nozzleLength;this.visualNozzleLength=r,this.machine=new yt,this.machine.name="machine",this.environment=new yt,this.depositGroup=new yt,this.overlays=new yt,this.scene.add(this.machine,this.environment,this.depositGroup,this.overlays),e.heatSource&&(this.patternSource=ny(e.heatSource,e.surfaceZ),this.scene.add(this.patternSource)),n?this.buildCell(i):this.buildBench(i),this.buildGantry(i,n),this.buildFixture(i,e),this.tool=new yt,this.tool.name="tool",this.machine.add(this.tool);const a=n?4:0;this.buildZSlide(i,n,a),n?(this.head=Xx(),this.head.group.position.z=r,this.tool.add(this.head.group),this.hoseStart=this.pumpStation.fluidPort,this.hoseEnd=this.head.inletPort):(this.cartridge=Vx({fillMaterial:this.glue}),this.cartridge.group.position.z=r,this.tool.add(this.cartridge.group),this.hoseStart=this.airFitting,this.hoseEnd=this.cartridge.airPort);const o=i.mesh(ey(e.diameter,r),n?"steel":"polymer",this.tool,{edges:!1});o.castShadow=!1,n||(i.mesh(ty(e.diameter,r),"polymer",this.tool,{edges:!1}).castShadow=!1),this.hose=new nt(new Mt,new ot({color:n?1845811:4165088,roughness:n?.6:.25,metalness:0,transparent:!n,opacity:n?1:.85})),this.hose.castShadow=!0,this.hose.name=n?"示意供膠管":"示意供氣管",this.machine.add(this.hose),n||(this.supplyHose=new nt(new Mt,this.hose.material.clone()),this.supplyHose.castShadow=!0,this.machine.add(this.supplyHose)),this.flowColumn=new nt(new hn(1,1,1,24,1,!0),this.glue),this.flowColumn.geometry.rotateX(Math.PI/2),this.flowColumn.geometry.translate(0,0,.5),this.flowColumn.visible=!1,this.depositGroup.add(this.flowColumn),this.lastDeposits=null,this.depositMeshes=[],e.mode==="point"&&(this.dotGeo=iy(e.dotRatio));const c=e.mode==="pattern"?Rh(t.frames[0].deposits,t.cellLength,e.lineRatio,t.path,t.gridStart):e.mode==="line"?Ah(t.frames[0].deposits,t.cellLength,e.lineRatio):this.dotGeo,l=new nt(c,this.glue);l.visible=!1,l.castShadow=l.receiveShadow=!0,this.depositGroup.add(l),this.depositMeshes.push(l);const h=e.mode==="pattern"?t.path.points.map(p=>new P(p.x,p.y,e.surfaceZ+.02)):e.mode==="line"?[new P(e.offsetX-e.lineLength/2,e.offsetY,e.surfaceZ+.02),new P(e.offsetX+e.lineLength/2,e.offsetY,e.surfaceZ+.02)]:[];this.plannedPath=new qi(new Mt().setFromPoints(h),new Gl({color:15901498,dashSize:1.2,gapSize:.8,transparent:!0,opacity:.9})),this.plannedPath.computeLineDistances(),this.plannedPath.userData.ownedMaterials=[this.plannedPath.material],this.plannedPath.visible=this.showPlannedPath,this.overlays.add(this.plannedPath);const u=t.frames.filter(p=>p.t>=t.ending.liftStart-.01&&p.t<=t.ending.motionEnd+.01).map(p=>new P(p.x,p.y,p.z));this.exitPath=new qi(new Mt().setFromPoints(u),new Gl({color:14701343,dashSize:.7,gapSize:.4,transparent:!0,opacity:.85})),this.exitPath.computeLineDistances(),this.exitPath.userData.ownedMaterials=[this.exitPath.material],this.exitPath.visible=this.showExitPath,this.overlays.add(this.exitPath),this.configureShadow(n),this.update(t.frames[0]),this.fit(this.mode,{animate:!1})}configureShadow(e){const t=e?700:420;this.sun.position.set(-260,-420,900),this.sun.target.position.set(0,40,0),Object.assign(this.sun.shadow.camera,{left:-t,right:t,top:t,bottom:-t,near:10,far:3e3}),this.sun.shadow.camera.updateProjectionMatrix()}buildBench(e){const t=this.environment;e.box(1180,820,40,-60,40,-112,"bench",t,4),e.box(1040,680,2,-60,40,-72,"mat",t,1),e.cyl(6,3,440,-280,-70,"steel",t)}buildCell(e){this.enclosure=Wx(),this.machine.add(this.enclosure),this.pumpStation=Gx(),this.pumpStation.group.position.set(-750,0,-900),this.machine.add(this.pumpStation.group);const t=new nt(new Ci(4e3,4e3),new ot({color:10134445,roughness:.9}));t.position.z=-900.5,t.receiveShadow=!0,t.userData.ownedMaterials=[t.material],this.environment.add(t);const n=new yt;n.position.set(-469.5,-300,-700),this.machine.add(n),this.stationAirAnchor=n,e.box(12,32,32,0,0,-16,"black",n),e.rod(5,14,"x",-13,0,0,"steel",n),this.stationAirSource=new gt,this.stationAirSource.position.x=-20,n.add(this.stationAirSource),this.stationAirHose=new nt(new Mt,new ot({color:3112920,roughness:.4})),this.stationAirHose.name="示意外部氣源接管",this.machine.add(this.stationAirHose),this.pumpStation.group.updateMatrixWorld(!0),n.updateMatrixWorld(!0),this.stationAirHose.geometry=_o(this.pumpStation.airPort.getWorldPosition(new P),this.stationAirSource.getWorldPosition(new P),"stationAir",3)}buildGantry(e,t){const n=this.machine,i=t?4:0,r=110+i;this.beamY=r;const a=new yt;a.name="base",n.add(a),e.box(420,500,40,0,60,-56,"graphite",a,3),e.box(408,488,3,0,60,-19,"coverGrey",a,1);for(const v of[-185,185])for(const E of[-160,280])e.cyl(16,4,v,E,-70,"rubber",a),e.cyl(9,10,v,E,-66,"steel",a);const o=-190;e.box(150,4,30,110,o-2,-50,"black",a,1),e.cyl(10,4,165,o-4,-40,"yellow",a).rotation.x=Math.PI/2;const c=e.cyl(8,8,165,o-10,-40,"red",a);c.rotation.x=Math.PI/2;for(const[v,E]of[[70,"green"],[95,"red"],[120,"black"]]){const w=e.cyl(5,4,v,o-4,-36,E,a,20);w.rotation.x=Math.PI/2}e.box(90,1,16,-110,o-.5,-46,"aluminum",a,.6);for(const v of[-42,-38,-34])e.box(70,.6,.8,-110,o-1.1,v,"hole",a,0);e.box(320,320,16,0,0,-16,"aluminum",a,1.5);const l=[];for(let v=-137.5;v<=137.5;v+=25)for(let E=-137.5;E<=137.5;E+=25)l.push([v,E]);const h=new hn(2.6,2.6,.2,16);h.rotateX(Math.PI/2);const u=new Ls(h,this.palette.hole,l.length);l.forEach(([v,E],w)=>u.setMatrixAt(w,new rt().makeTranslation(v,E,.02))),u.receiveShadow=!0,a.add(u);const d=[];for(let v=-150;v<=150;v+=5)d.push(v);const f=new on(.5,1,.12),g=new Ls(f,this.palette.black,d.length);d.forEach((v,E)=>g.setMatrixAt(E,new rt().compose(new P(v,-157+(v%25===0?2.5:1.25),.06),new An,new P(1,v%25===0?5:2.5,1)))),a.add(g);for(const v of[-190,190]){e.box(34,470,18,v,60,-16,"graphite",a,1.5),e.box(15,460,10,v,60,2,"steel",a,.4);for(let E=-160;E<=280;E+=40)e.screw(v,E,12.4,a,1.4);for(const E of[-172,292])e.box(30,8,22,v,E,2,"orange",a,1);e.box(46,52,46,v,318,-16,"black",a,2),e.cyl(16,4,v,318,30,"steel",a),e.box(10,40,30,v+Math.sign(v)*25,318,-10,"coverGrey",a,1)}this.bridge=new yt,this.bridge.name="bridge",n.add(this.bridge);const _=this.bridge;for(const v of[-190,190]){for(const E of[-22,22])e.box(30,34,14,v,r+E,12,"steelDark",_,1);e.box(56,92,10,v,r,26,"cobaltDark",_,2),e.box(40,52,174,v,r,36,"cobalt",_,3),e.box(44,56,6,v,r,206,"coverGrey",_,2);for(const E of[-18,18])for(const w of[-18,18])e.screw(v+w,r+E,36.6,_,1.6)}e.box(440,40,50,0,r,205,"cobalt",_,3),e.box(400,2,36,0,r+20.5,212,"coverGrey",_,.6);for(const v of[212,240]){e.box(400,6,10,0,r-23,v-5,"steel",_,.4);for(let E=-180;E<=180;E+=40)e.screw(E,r-26.2,v,_,1.2,"y")}e.rod(4.5,390,"x",0,r-29,226,"steel",_);for(const v of[-212,212])e.box(10,46,56,v+Math.sign(v)*5,r,202,"coverGrey",_,2);e.box(50,44,44,247,r,208,"black",_,2),e.rod(16,6,"x",275,r,230,"steel",_),e.box(10,10,10,250,r-26,240,"orange",_,1),e.box(18,18,12,-200,r,255,"black",_,1),e.cyl(4,10,-200,r,267,"brass",_),this.airFitting=new gt,this.airFitting.position.set(-200,r,277),_.add(this.airFitting),this.supplyFitting=new gt,this.supplyFitting.position.set(-209,r,261),_.add(this.supplyFitting);const m=new ot({color:2369581,roughness:.55,metalness:.1}),p=new ot({color:15760411,roughness:.5,metalness:.05});this.chain=Kx({material:m,sideMaterial:p,free:200}),this.chain.group.position.set(0,r,261),this.chain.group.userData.ownedMaterials=[m,p],_.add(this.chain.group),e.box(28,30,4,0,r,255,"steelDark",_,.8),this.carriage=new yt,this.carriage.name="x carriage",_.add(this.carriage);const x=this.carriage,y=t?380:300;for(const v of[-22,22])for(const E of[212,240])e.box(30,8,16,v,r-30,E-8,"steelDark",x,1);e.box(90,6,80,0,r-37,186,"cover",x,2),e.box(70,8,y-60,0,66+i,60,"cover",x,2),e.box(70,2,y-70,0,61+i,65,"cobalt",x,.5);for(const v of[-20,20])e.box(9,6,y-80,v,57+i,70,"steel",x,.3);e.rod(3.5,y-90,"z",0,57+i,65+(y-90)/2,"steel",x),e.box(44,44,54,0,66+i,y,"black",x,2),e.cyl(15,4,0,66+i,y+54,"steel",x),e.box(12,10,10,18,66+i,y+40,"orange",x,1);for(const v of[-28,28])for(const E of[80,y-20])e.screw(v,61.8+i-1.2,E,x,1.6,"y");e.box(30,r-64,6,0,(r+64)/2,285,"steelDark",x,1)}buildZSlide(e,t,n){const i=this.tool,r=t?130:70,a=t?140:125;e.box(64,8,a,0,42+n,r,"cobalt",i,1.5);for(const o of[-20,20])for(const c of[r+10,r+a-30])e.box(18,8,20,o,50+n,c,"steelDark",i,1);for(const o of[-24,24])for(const c of[r+8,r+a-8])e.screw(o,37.6+n,c,i,1.5,"y")}buildFixture(e,t){const n=this.machine,i=Math.min(t.width+24,310),r=Math.min(t.depth+24,310);this.fixture=new yt,this.fixture.name="fixture",n.add(this.fixture);const a=Math.max(0,t.fixtureHeight-2);for(const o of[-1,1])for(const c of[-1,1])e.cyl(5,Math.min(2,t.fixtureHeight),o*i/2.4,c*r/2.4,0,"steel",this.fixture);a>.2&&e.box(i,r,a,0,0,Math.min(2,t.fixtureHeight),"teal",this.fixture,1.5);for(const[o,c]of[[-i/2+6,-r/2+6],[i/2-6,r/2-6],[i/2-6,-r/2+6],[-i/2+6,r/2-6]])e.screw(o,c,t.fixtureHeight+.45,this.fixture,2.2);for(const[o,c]of[[-t.width/2-3,-t.depth/4],[-t.width/2-3,t.depth/4],[t.width/4,t.depth/2+3]])Math.abs(o)<i/2&&Math.abs(c)<r/2&&e.cyl(2.5,Math.min(t.thickness,4)+1,o,c,t.fixtureHeight,"steel",this.fixture,20);for(const o of[-1,1]){const c=o*(t.width/2-10),l=-t.depth/2-7;Math.abs(l)>r/2||(e.cyl(5,6,c,l,t.fixtureHeight,"steelDark",this.fixture),e.box(8,16,3,c,l+5,t.fixtureHeight+Math.min(t.thickness,6),"red",this.fixture,1))}if(this.partHolder=new yt,this.partHolder.name="workpiece",n.add(this.partHolder),this.imported)this.partHolder.add(this.imported),this.imported.position.set(0,0,t.fixtureHeight);else{e.box(t.width,t.depth,t.thickness,0,0,t.fixtureHeight,"castAl",this.partHolder,Math.min(1.2,t.thickness/4));for(const o of[-1,1])for(const c of[-1,1]){const l=o*(t.width/2-6),h=c*(t.depth/2-6);t.width>30&&t.depth>30&&e.cyl(1.8,.1,l,h,t.surfaceZ-.04,"hole",this.partHolder,16)}}t.architecture==="R75"&&this.buildController(e)}buildController(e){const t=new yt;t.name="air dispenser controller (generic)",t.position.set(-360,-40,-70),this.machine.add(t),e.box(150,190,86,0,0,0,"cover",t,4),e.box(150,4,86,0,-96,0,"cobalt",t,1.5);for(const a of[-60,60])for(const o of[-80,80])e.cyl(6,3,a,o,-3,"rubber",t);if(this.lcd=Zx(),this.lcd){const a=new nt(new Ci(62,27),new Un({map:this.lcd.texture,toneMapped:!1}));a.rotation.x=Math.PI/2,a.position.set(-28,-98.8,56),a.userData.ownedMaterials=[a.material],t.add(a),e.box(68,1.5,33,-28,-97.9,39.5,"black",t,.6)}for(const[a,o]of[[-50,"green"],[-36,"cover"],[-22,"cover"],[-8,"red"]]){const c=e.cyl(4,3,a,-99,22,o,t,18);c.rotation.x=Math.PI/2}const n=e.cyl(11,12,42,-102,52,"black",t,24);n.rotation.x=Math.PI/2;const i=e.cyl(14,4,42,-99,24,"steel",t,32);i.rotation.x=Math.PI/2;const r=e.cyl(12,1,42,-101.2,24,"cover",t,32);r.rotation.x=Math.PI/2,this.gaugeNeedle=e.box(1.2,.6,10,42,-101.9,19,"red",t,0),this.gaugeNeedle.geometry.translate(0,0,0),e.cyl(5,10,50,70,86,"brass",t),this.supplyOutlet=new gt,this.supplyOutlet.position.set(50,70,96),t.add(this.supplyOutlet)}update(e){var l;if(!this.config)return;const t=this.config;if(this.frame=e,this.tool.position.set(e.x,e.y,e.z),this.carriage.position.x=e.x,this.bridge.position.y=e.y,(l=this.chain)==null||l.update(Math.max(-170,Math.min(170,e.x))),this.cartridge&&this.cartridge.updateFill(e.remaining/75),this.lcd){const h=t.pressure;this.lcd.draw([`${h.toFixed(1)} psi`,e.command?"DISPENSE ●":"READY  "+e.t.toFixed(2)+"s"],!!e.command),this.gaugeNeedle&&(this.gaugeNeedle.rotation.y=-1.2+h/100*2.4)}this.machine.updateMatrixWorld(!0);const n=this.machine.worldToLocal(this.hoseStart.getWorldPosition(new P)),i=this.machine.worldToLocal(this.hoseEnd.getWorldPosition(new P));if(!this.lastHose||n.distanceToSquared(this.lastHose[0])>1e-5||i.distanceToSquared(this.lastHose[1])>1e-5){if(this.hose.geometry.dispose(),this.hose.geometry=_o(n,i,t.architecture==="R75"?"air":"feed",t.architecture==="R75"?2.6:5),this.supplyHose){this.supplyHose.geometry.dispose();const h=this.machine.worldToLocal(this.supplyOutlet.getWorldPosition(new P)),u=this.machine.worldToLocal(this.supplyFitting.getWorldPosition(new P));this.supplyHose.geometry=_o(h,u,"supply",2.6)}this.lastHose=[n,i]}const r=this.depositMeshes[0],a=e.deposited;if(r.visible=a>1e-12&&!this.compression,t.mode==="line"||t.mode==="pattern")this.lastDeposits!==e.deposits&&(r.geometry.dispose(),r.geometry=t.mode==="pattern"?Rh(e.deposits,this.run.cellLength,t.lineRatio,this.run.path,this.run.gridStart):Ah(e.deposits,this.run.cellLength,t.lineRatio),this.lastDeposits=e.deposits),t.mode==="pattern"?r.position.set(0,0,t.surfaceZ+.001):r.position.set(t.offsetX-t.lineLength/2+this.run.gridStart,t.offsetY,t.surfaceZ+.001);else if(r.visible){const h=la(a,t.dotRatio);r.scale.set(h.radius,h.radius,a*1e3/(this.dotGeo.userData.unitVolume*h.radius*h.radius)),r.position.set(t.offsetX,t.offsetY,t.surfaceZ+.001)}const o=e.z-t.surfaceZ,c=e.q>.02*(this.run.Q||1)&&o<=t.standoff+.05&&!this.compression;if(this.flowColumn.visible=c,c){const h=t.diameter/2*Math.min(1,.55+.45*(e.q/this.run.Q));this.flowColumn.scale.set(h,h,o),this.flowColumn.position.set(e.x,e.y,t.surfaceZ)}(this.mode==="follow"||this.mode==="head")&&this.trackTool(),this.render()}trackTool(){const e=this.frame;if(!e||this.tween)return;const t=this.mode==="follow"?new P(e.x,e.y,this.config.surfaceZ):new P(e.x,e.y,e.z).add(this.headTargetOffset||new P);this.camera.position.add(t.clone().sub(this.controls.target)),this.controls.target.copy(t)}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;!e||!t||(this.renderer.setSize(e,t,!1),this.persp.aspect=e/t,this.persp.updateProjectionMatrix(),this.config&&this.fit(this.mode,{animate:!1}))}isoDirection(){const e=[[1,1,1],[-1,1,1],[-1,-1,1],[1,-1,1]][this.isoCorner];return new P(...e).normalize()}visibility(e){const t=this.config.architecture==="P300",n={whole:()=>!0,work:i=>{var r;return i!==this.enclosure&&i!==((r=this.pumpStation)==null?void 0:r.group)&&i!==this.stationAirHose&&i!==this.stationAirAnchor},feed:i=>{var r;return[(r=this.pumpStation)==null?void 0:r.group,this.enclosure,this.stationAirAnchor,this.hose,this.stationAirHose].includes(i)},head:i=>[this.tool,this.bridge,this.partHolder,this.fixture,this.hose].includes(i),close:i=>[this.tool,this.partHolder,this.fixture].includes(i),heat:i=>[this.tool,this.partHolder,this.fixture].includes(i),follow:i=>[this.tool,this.partHolder,this.fixture].includes(i)}[e];for(const i of this.machine.children)i.visible=n(i)&&!(this.compression&&i===this.tool);this.environment.visible=e==="whole"||e==="work"||t&&e==="feed";for(const i of this.tool.children){i.updateMatrixWorld();const r=new xn().setFromObject(i);i.visible=["whole","work","head"].includes(e)||r.min.z-this.tool.position.z<(e==="heat"?20:this.visualNozzleLength-1)}}framing(e){const t=this.config,n=[];let i;if(e==="whole"||e==="feed"||e==="head"){const r=e==="whole"?this.machine:e==="feed"?this.pumpStation.group:this.tool,a=new xn;r.traverseVisible(o=>{(o.isMesh||o.isInstancedMesh)&&a.expandByObject(o)});for(const o of[a.min.x,a.max.x])for(const c of[a.min.y,a.max.y])for(const l of[a.min.z,a.max.z])n.push(new P(o,c,l));i=a.getCenter(new P),e==="head"&&(this.headTargetOffset=i.clone().sub(this.tool.position))}else if(e==="work"){for(const r of[-250,250])for(const a of[-200,330])for(const o of[-60,t.architecture==="P300"?430:330])n.push(new P(r,a,o));i=new P(0,60,t.architecture==="P300"?180:130)}else if(e==="heat"&&t.heatSource){const r=t.heatSource,a=r.width/2+Math.max(6,r.width*.35),o=(r.shape==="circle"?r.width:r.depth)/2+Math.max(6,r.width*.35),c=this.compression?new xn().setFromObject(this.compression.plate):null,l=c?Math.min(r.offsetX-a,c.min.x):r.offsetX-a,h=c?Math.max(r.offsetX+a,c.max.x):r.offsetX+a,u=c?Math.min(r.offsetY-o,c.min.y):r.offsetY-o,d=c?Math.max(r.offsetY+o,c.max.y):r.offsetY+o;for(const f of[l,h])for(const g of[u,d])for(const _ of[t.surfaceZ-2,t.surfaceZ+4])n.push(new P(f,g,_));i=new P((l+h)/2,(u+d)/2,t.surfaceZ+1)}else{const r=t.heatSource,a=e==="follow"?20:Math.max(Math.min(t.width+24,310)/2,r?Math.abs(r.offsetX)+r.width/2:0),o=e==="follow"?20:Math.max(Math.min(t.depth+24,310)/2,r?Math.abs(r.offsetY)+(r.shape==="circle"?r.width:r.depth)/2:0);for(const c of[-a,a])for(const l of[-o,o])for(const h of[t.fixtureHeight,t.surfaceZ+25])n.push(new P(c,l,h));i=new P(0,0,t.surfaceZ+5),e==="follow"&&this.frame&&i.set(this.frame.x,this.frame.y,t.surfaceZ)}return{pts:n,target:i}}fit(e="close",{animate:t=!0}={}){var y;if(e==="feed"&&!this.pumpStation&&(e="work"),this.mode=e,!this.config)return;this.visibility(e);const n=this.host.clientWidth||800,i=this.host.clientHeight||500,r=n/i,{pts:a,target:o}=this.framing(e),c=this.freeOrbit?this.camera.position.clone().sub(this.controls.target).normalize():this.isoDirection(),l=this.ortho.clone();l.position.copy(o).add(c.clone().multiplyScalar(5e3)),l.up.set(0,0,1),l.lookAt(o),l.updateMatrixWorld();const h=a.map(v=>v.clone().applyMatrix4(l.matrixWorldInverse)),u=e==="close"?1.22:e==="heat"?1.08:1.12;let d=Math.max(1,...h.map(v=>Math.abs(v.x)))*u,f=Math.max(1,...h.map(v=>Math.abs(v.y)))*u;const g=Math.max(1,...h.map(v=>Math.abs(v.z+5e3)));e==="follow"&&(d=20,f=d/r);const _=Math.max(f,d/r)*2;let m;if(this.projection==="ortho")m={position:o.clone().add(c.clone().multiplyScalar(5e3)),target:o.clone(),span:_};else{const v=_/2/Math.tan(Dc.degToRad(this.persp.fov/2))+g;m={position:o.clone().add(c.clone().multiplyScalar(v)),target:o.clone(),span:_}}const p={position:this.camera.position.clone(),target:this.controls.target.clone(),span:this.currentSpan??_},x=t&&!ay()&&this.currentSpan!==void 0;if(this.tween=null,!x)this.applyCamera(m,r);else{const v=performance.now();this.tween={begin:p,end:m,t0:v,aspect:r};const E=w=>{if(!this.tween||this.tween.t0!==v)return;const A=Math.min(1,(w-v)/480),D=ry(A),b=p.position.clone().lerp(m.position,D);this.applyCamera({position:b,target:p.target.clone().lerp(m.target,D),span:p.span+(m.span-p.span)*D},r),A<1?requestAnimationFrame(E):(this.tween=null,this.applyCamera(m,r),(this.mode==="follow"||this.mode==="head")&&(this.trackTool(),this.render()))};requestAnimationFrame(E)}(y=this.onView)==null||y.call(this)}applyCamera({position:e,target:t,span:n},i=this.persp.aspect){this.currentSpan=n;const r=this.camera;r.position.copy(e),this.controls.target.copy(t),r.lookAt(t),r.isOrthographicCamera&&(r.zoom=1,r.left=-n*i/2,r.right=n*i/2,r.top=n/2,r.bottom=-n/2),r.updateProjectionMatrix(),this.controls.update(),this.render()}zoomBy(e){if(this.camera.isOrthographicCamera)this.camera.zoom*=e,this.camera.updateProjectionMatrix();else{const t=this.camera.position.clone().sub(this.controls.target).divideScalar(e);this.camera.position.copy(this.controls.target).add(t)}this.controls.update(),this.render()}setCorner(e){this.isoCorner=e,this.setFreeOrbit(!1,!1),this.fit(this.mode)}setFreeOrbit(e,t=!0){var n;this.freeOrbit=e,this.applyOrbitMode(),!e&&t&&this.fit(this.mode),(n=this.onView)==null||n.call(this)}setProjection(e){if(e===this.projection)return;const t=this.camera;this.projection=e,this.camera=e==="ortho"?this.ortho:this.persp,this.camera.position.copy(t.position),this.makeControls(),this.fit(this.mode,{animate:!1})}render(){if(!(!this.renderer||!this.camera||!this.controls)&&(this.renderer.render(this.scene,this.camera),this.onScale)){const e=this.controls.target,t=e.clone().project(this.camera),n=e.clone().add(new P(10,0,0)).project(this.camera),i=this.host.clientWidth,r=this.host.clientHeight,a=Math.hypot((n.x-t.x)*i/2,(n.y-t.y)*r/2);this.onScale(a,Math.atan2(-(n.y-t.y)*r,(n.x-t.x)*i)*180/Math.PI)}}setOverlayVisibility({exitPath:e,plannedPath:t,heatSource:n}={}){e!==void 0&&(this.showExitPath=e),t!==void 0&&(this.showPlannedPath=t),this.exitPath&&(this.exitPath.visible=this.showExitPath&&!this.compression),this.plannedPath&&(this.plannedPath.visible=this.showPlannedPath&&!this.compression),n!==void 0&&this.patternSource&&(this.patternSource.visible=n),this.render()}showCompression(e,t,n={}){return this.clearCompression(),this.compression=Qx(this.config,t,e,n),this.scene.add(this.compression.group),this.tool.visible=!1,this.depositMeshes[0].visible=!1,this.flowColumn.visible=!1,this.setOverlayVisibility({}),this.patternSource&&(this.patternSource.visible=!1),this.render(),this.compression}setCompressionFrame(e){var t;(t=this.compression)==null||t.setFrame(e),this.render()}setCompressionColor(e){var t;(t=this.compression)==null||t.setColorMode(e),this.render()}clearCompression(){this.compression&&(this.compression.dispose(),this.compression=null,this.tool&&(this.tool.visible=!0),this.patternSource&&(this.patternSource.visible=!0),this.frame&&this.update(this.frame),this.setOverlayVisibility({}),this.config&&this.visibility(this.mode))}async importFile(e,t,n){const i=e.name.toLowerCase().split(".").pop(),r=await e.arrayBuffer();let a;if(i==="stl"){const f=new nx().parse(r);f.computeVertexNormals(),a=new nt(f,this.palette.castAl),a.castShadow=a.receiveShadow=!0}else if(i==="glb"||i==="gltf"){if(i==="gltf"){const _=JSON.parse(new TextDecoder().decode(r));if([..._.buffers||[],..._.images||[]].some(m=>m.uri&&!m.uri.startsWith("data:")))throw new Error("此 glTF 含外接檔案，請匯出單一 GLB 或內嵌資源 glTF。")}const f=new vu;f.setURLModifier(_=>{if(!_.startsWith("blob:")&&!_.startsWith("data:"))throw new Error("工件引用外部資源，請匯出內嵌材質的 GLB。");return _}),a=(await new ix(f).parseAsync(i==="gltf"?new TextDecoder().decode(r):r,"")).scene,a.traverse(_=>{_.isMesh&&(_.castShadow=_.receiveShadow=!0)})}else throw new Error("目前可載入 STL、GLB、內嵌 glTF。STEP 請先轉換。");const o=new yt;o.add(a);const c=i==="stl"?{mm:1,cm:10,m:1e3,inch:25.4}[t]:1e3;o.scale.setScalar(c),(i!=="stl"||n==="Y")&&(o.rotation.x=Math.PI/2),o.updateMatrixWorld(!0);const l=new xn().setFromObject(o),h=l.getSize(new P);if(![h.x,h.y,h.z].every(f=>Number.isFinite(f))||h.x<1||h.x>1e3||h.y<1||h.y>1e3||h.z<.1||h.z>200)throw new Error("工件尺寸不在原型範圍內（長寬 1–1000mm，厚 0.1–200mm），請檢查來源單位與檔案。");const u=new yt;u.add(o),o.position.set(-(l.min.x+l.max.x)/2,-(l.min.y+l.max.y)/2,-l.min.z),this.clearImport(),this.imported=u;const d=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",r))).map(f=>f.toString(16).padStart(2,"0")).join("");return{width:h.x,depth:h.y,thickness:h.z,workpieceKind:"imported",workpieceFile:{name:e.name,sha256:d,sourceUnit:i==="stl"?t:"m",up:i==="stl"?n:"Y",unitFactorToMm:c}}}clearImport(){this.imported&&(this.imported.removeFromParent(),this.imported.traverse(e=>{var t;return(t=e.geometry)==null?void 0:t.dispose()}),this.imported=null)}geometryAudit(){return{parts:this.counter.parts,renderedDepositVolumeMm3:this.depositMeshes.filter(e=>e.visible).reduce((e,t)=>e+t.geometry.userData.unitVolume*t.scale.x*t.scale.y*t.scale.z,0),cameraDirection:this.camera.position.clone().sub(this.controls.target).normalize().toArray()}}screenshot(){return this.render(),this.renderer.domElement.toDataURL("image/png")}}const en=101325,ly=9.80665,hy=Object.freeze(["compressible","rigid","vent"]),$c=Object.freeze({airMode:"compressible",pressKgf:10,pressSpeed:1,settleTime:300}),Ch=9e4,Qn=0,Bi=1,ti=2,ni=3,uy=.001,dy=.003*en,fy=5e-5,Ph=.8;function py(s,e){const t=_c(s,e),n=Math.max(0,Math.min(s.length,e)),i=e-n;return{...t,x:t.x+t.tx*i,y:t.y+t.ty*i}}function my(s){const e=s.config,t=s.summary.deposits;if(e.mode==="point"){const r=t[0]*1e3;return r>0?[{x:e.offsetX,y:e.offsetY,v:r,tx:1,ty:0,width:0}]:[]}const n=yc(t,s.cellLength,e.lineRatio),i=[];for(let r=0;r<t.length;r++){const a=t[r]*1e3;if(!(a>0))continue;const o=s.gridStart+(r+.5)*s.cellLength,c=(n.widths[r]+n.widths[r+1])/2;if(e.mode==="pattern"){const l=py(s.path,o);i.push({x:l.x,y:l.y,v:a,tx:l.tx,ty:l.ty,width:c})}else i.push({x:e.offsetX+o-e.lineLength/2,y:e.offsetY,v:a,tx:1,ty:0,width:c})}return i}function Lu(s,e={}){const t=Xt[s.material]||Xt.putty,n=Number.isFinite(e.viscosity)&&e.viscosity>0?e.viscosity:s.material==="grease"&&Number.isFinite(s.viscosity)&&s.viscosity>0?s.viscosity:t.squeezeViscosity,i=Number.isFinite(e.yieldStress)&&e.yieldStress>=0?e.yieldStress:t.yieldStress;return{viscosity:n,yieldStress:i}}function gy(s,e,t,n,i,r,a,o){const c=new Float64Array(e),l=new Float64Array(e),h=new Float64Array(e),u=new Float64Array(e),d=(m,p)=>{for(let x=0;x<e;x++)p[x]=i[x]*m[x];for(let x=0;x<s;x++)for(let y=4*x;y<4*x+4;y++){const v=t[y];v<0||(p[x]-=n[y]*m[v],v>=s&&(p[v]-=n[y]*m[x]))}};d(a,u);let f=0,g=0;for(let m=0;m<e;m++)c[m]=r[m]-u[m],l[m]=c[m]/i[m],h[m]=l[m],f+=c[m]*l[m],g+=r[m]*r[m];const _=Math.max(1e-20*g,o);for(let m=0;m<4e3;m++){let p=0;for(let w=0;w<e;w++)p+=c[w]*c[w];if(p<=_)break;d(h,u);let x=0;for(let w=0;w<e;w++)x+=h[w]*u[w];if(!(x>0))break;const y=f/x;let v=0;for(let w=0;w<e;w++)a[w]+=y*h[w],c[w]-=y*u[w],l[w]=c[w]/i[w],v+=c[w]*l[w];const E=v/f;f=v;for(let w=0;w<e;w++)h[w]=l[w]+E*h[w]}return a}function _y(s,e){const{cols:t,rows:n,cellSize:i}=s,r=t*n,a=i*i,o=Float64Array.from(s.volume),c=e.gap,l=e.airMode||"compressible",h=e.viscosity,u=e.force,d=e.yieldStress||0,f=Math.max(0,e.settleTime??$c.settleTime),g=e.pressSpeed>0?e.pressSpeed:1/0,_=e.frames||0,m=e.sourceFraction||null;let p=0;if(m)for(let B=0;B<r;B++)p+=m[B]*a;let x=0;for(let B=0;B<r;B++)x=Math.max(x,o[B]/a);const y=(B,le)=>{const he=B%t;return le[0]=he>0?B-1:-1,le[1]=he+1<t?B+1:-1,le[2]=B>=t?B-t:-1,le[3]=B+t<r?B+t:-1,le},v=[0,0,0,0],E=new Uint8Array(r).fill(Bi),w=new Uint8Array(r),A=new Int32Array(r).fill(-1),D=new Int32Array(r),b=new Uint8Array(r),S=new Int32Array(r),I=new Int32Array(r),U=new Map;let G=0;const q={sealed:0,vented:0,collapsed:0,dissolved:0,ventedAtmMm3:0},te=en*a*c;let W=0,oe="press",X=0;const fe=(B,le)=>Math.max(0,le-o[B]),Se=B=>B.gas/Math.max(B.air,1e-12)-en;function Ee(B,le,he=!0){var Ve;const j=B*(1-uy),F=re=>o[re]<j&&E[re]!==ni;b.fill(0);let C=0;for(let re=0;re<r;re++){const ve=re%t;(ve===0||ve===t-1||re<t||re>=r-t)&&F(re)&&(b[re]=1,I[C++]=re)}for(;C;){const re=I[--C];for(const ve of y(re,v))ve>=0&&!b[ve]&&F(ve)&&(b[ve]=1,I[C++]=ve)}if(l!=="compressible"){for(let re=0;re<r;re++)E[re]!==ni&&(F(re)?b[re]||l==="vent"?E[re]=Bi:E[re]=ni:E[re]=Qn);return}w.set(E),D.set(A),S.fill(-1);const V=[];for(let re=0;re<r;re++){if(S[re]>=0||b[re]||!(o[re]<j))continue;const ve={cells:[],fresh:0,drained:0,prior:new Map};for(S[re]=V.length,I[0]=re,C=1;C;){const be=I[--C];ve.cells.push(be);const Ge=fe(be,B);w[be]===ti?ve.prior.set(D[be],(ve.prior.get(D[be])||0)+Ge):w[be]===Bi?ve.fresh+=Ge:ve.drained+=Ge;for(const Te of y(be,v))Te>=0&&S[Te]<0&&!b[Te]&&o[Te]<j&&(S[Te]=V.length,I[C++]=Te)}V.push(ve)}E.fill(Bi),A.fill(-1);for(let re=0;re<r;re++)o[re]<j||(E[re]=Qn);const K=new Set,ee=new Map,$=new Map,H=(re,ve)=>$.set(re,($.get(re)||0)+ve);for(const re of V){let ve=0;for(const be of re.prior.values())ve+=be;for(const[be,Ge]of re.prior){const Te=Ge+(ve>0?re.drained*Ge/ve:re.drained/re.prior.size);re.prior.set(be,Te),H(be,Te)}}for(let re=0;re<r;re++)w[re]===ti&&b[re]&&H(D[re],fe(re,B));const ae=new Map([...U.values()].map(re=>[re.id,re.gas]));for(const re of V){let ve=re.fresh*en,be=null,Ge=-1;for(const[_t,$t]of re.prior){const di=U.get(_t);di&&(ve+=ae.get(_t)*$t/Math.max($.get(_t)||$t,1e-15),$t>Ge&&(be=di,Ge=$t))}if(!(ve>0)){for(const _t of re.cells)E[_t]=Qn;continue}if(ve<te){re.prior.size&&q.dissolved++;continue}let Te;be&&!K.has(be.id)?(K.add(be.id),Te=be):(Te={id:G++,sealGap:be?be.sealGap:le,sealTime:be?be.sealTime:W,sealPhase:be?be.sealPhase:oe,maxP:0,minRatio:1,q:null},be||q.sealed++),Te.gas=ve,Te.cells=re.cells.length;let ut=0,xt=0,Ot=0;for(const _t of re.cells){E[_t]=ti,A[_t]=Te.id;const $t=fe(_t,B);ut+=$t,xt+=_t%t*$t,Ot+=Math.floor(_t/t)*$t}Te.air=ut,Te.cx=ut>0?xt/ut:re.cells[0]%t,Te.cy=ut>0?Ot/ut:Math.floor(re.cells[0]/t);const st=Se(Te);Te.p=st,he&&(Te.maxP=Math.max(Te.maxP,st),Te.minRatio=Math.min(Te.minRatio,ut*en/Te.gas),oe==="press"&&Te.gas>=3*te&&(X=Math.max(X,st))),ee.set(Te.id,Te)}const Me=new Set;for(let re=0;re<r;re++)w[re]===ti&&E[re]===Bi&&Me.add(D[re]);const Ye=new Set;for(const re of V)for(const ve of re.prior.keys())Ye.add(ve);for(const[re,ve]of U)ee.has(re)||K.has(re)||Ye.has(re)||(Me.has(re)?(q.vented++,q.ventedAtmMm3+=ve.gas/en):q.collapsed++);U.clear();for(const[re,ve]of ee)U.set(re,ve);(Ve=e.trace)==null||Ve.call(e,{h:le,time:W,phase:oe,record:he,pockets:[...U.values()],events:{...q},comps:V})}const Ae=new Float64Array(r);function at(B){if(!(d>0)){for(const F of U.values())F.hold=0;return}Ae.fill(1/0);let le=0,he=0;for(let F=0;F<r;F++)E[F]===Bi&&(Ae[F]=0,I[he++]=F);for(;le<he;){const F=I[le++];for(const C of y(F,v))C>=0&&E[C]===Qn&&Ae[C]===1/0&&(Ae[C]=Ae[F]+1,I[he++]=C)}const j=new Map;for(let F=0;F<r;F++)if(E[F]===ti)for(const C of y(F,v))C>=0&&E[C]===Qn&&j.set(A[F],Math.min(j.get(A[F])??1/0,Ae[C]));for(const F of U.values())F.hold=2*d/B*((j.get(F.id)??1/0)+.5)*i}const We=new Int32Array(r).fill(-1),it=new Float64Array(r);function ne(B,le){const he=[];for(let ve=0;ve<r;ve++)E[ve]===Qn&&(We[ve]=he.push(ve)-1);const j=he.length,F=new Map;le.forEach((ve,be)=>F.set(ve.id,j+be));const C=j+le.length,V=new Int32Array(4*j).fill(-1),K=new Float64Array(4*j),ee=new Float64Array(C),$=new Float64Array(j),H=[],ae=[],Me=new Uint8Array(j);let Ye=0;for(let ve=0;ve<j;ve++){const be=he[ve];$[ve]=o[be]-B,Ye+=Math.max(0,$[ve]),y(be,v);for(let Ge=0;Ge<4;Ge++){const Te=v[Ge];if(Te<0)continue;const ut=E[Te];if(ut===Qn){V[4*ve+Ge]=We[Te],K[4*ve+Ge]=1,ee[ve]+=1;continue}if(ut===ni)continue;const xt=1/(.5+Math.min(1,Math.max(0,o[Te]/B)));if(ut===Bi)H.push(ve,Te,xt),ee[ve]+=xt,Me[ve]=1;else{const Ot=F.get(A[Te]);if(Ot===void 0)continue;V[4*ve+Ge]=Ot,K[4*ve+Ge]=xt,ee[ve]+=xt,ee[Ot]+=xt,ae.push(ve,Te,Ot,xt,4*ve+Ge),Me[ve]=1}}}const Ve=new Uint8Array(j),re=[];for(let ve=0;ve<j;ve++){if(Ve[ve])continue;re.length=0;let be=!1;Ve[ve]=1,re.push(ve);for(let Ge=0;Ge<re.length;Ge++){const Te=re[Ge];Me[Te]&&(be=!0);for(let ut=4*Te;ut<4*Te+4;ut++){const xt=V[ut];xt>=0&&xt<j&&!Ve[xt]&&(Ve[xt]=1,re.push(xt))}}if(!be)for(const Ge of re)ee[Ge]=1,$[Ge]=0,V.fill(-1,4*Ge,4*Ge+4)}for(let ve=0;ve<C;ve++)ee[ve]>0||(ee[ve]=1);return{cells:he,m:j,size:C,nb:V,w:K,diag:ee,rhsVol:$,open:H,pface:ae,activePockets:le,excess:Ye,cap:B}}function ie(B,le,he=1,j=!1){const{m:F,size:C,nb:V,w:K,rhsVol:ee,activePockets:$,pface:H}=B,ae=new Float64Array(C);for(let Te=0;Te<F;Te++)ae[Te]=it[B.cells[Te]]*he;const Me=$.length,Ye=$.map(Te=>Te.air),Ve=$.map(Te=>oe==="relax"&&Te.hold||0),re=(Te,ut)=>Ye[Te]-$[Te].gas/Math.max(en+ut+Ve[Te],.02*en),ve=$.map((Te,ut)=>{const xt=Se(Te)-Ve[ut];return Number.isFinite(Te.q)?Math.max(xt,Te.q):xt}),be=C*((j?1e-10:fy)*B.cap/le)**2;let Ge=new Float64Array(Me);for(let Te=0;Te<(Me?5:1);Te++){const ut=Float64Array.from(B.diag),xt=new Float64Array(C);for(let st=0;st<F;st++)xt[st]=ee[st]/le;for(let st=0;st<Me;st++){const _t=Math.max(en+ve[st]+Ve[st],.02*en),$t=$[st].gas/(_t*_t);ut[F+st]+=$t/le,xt[F+st]=($t*ve[st]-re(st,ve[st]))/le,ae[F+st]=ve[st]}gy(F,C,V,K,ut,xt,ae,be),Ge=new Float64Array(Me);for(let st=0;st<H.length;st+=5)Ge[H[st+2]-F]+=le*H[st+3]*(ae[H[st]]-ae[H[st+2]]);let Ot=0;for(let st=0;st<Me;st++){const _t=Math.max(ae[F+st],.02*en-en-Ve[st]);Ot=Math.max(Ot,Math.abs(Ge[st]-re(st,_t))/(Ye[st]+.05*B.cap)),ve[st]=_t}if(Ot<.02)break}return{x:ae,kappa:le,inflow:Ge,q:ve,hold:Ve}}function Re(B,le){const{cells:he,m:j,nb:F,w:C,open:V,pface:K}=B,{x:ee,kappa:$}=le,H=Float64Array.from(o);for(let be=0;be<j;be++)for(let Ge=4*be;Ge<4*be+4;Ge++){const Te=F[Ge];if(Te<=be||Te>=j)continue;const ut=$*C[Ge]*(ee[be]-ee[Te]);H[he[be]]-=ut,H[he[Te]]+=ut}const ae=new Float64Array(j),Me=(be,Ge,Te)=>{if(Te>=0){H[he[be]]-=Te,H[Ge]+=Te;return}const ut=Math.min(-Te,Math.max(0,H[Ge]));H[Ge]-=ut,H[he[be]]+=ut,ae[be]+=-Te-ut};for(let be=0;be<V.length;be+=3)Me(V[be],V[be+1],$*V[be+2]*ee[V[be]]);for(let be=0;be<K.length;be+=5)Me(K[be],K[be+1],$*K[be+3]*(ee[K[be]]-ee[K[be+2]]));for(let be=0;be<K.length;be+=5){const Ge=K[be+1];if(!(H[Ge]>B.cap))continue;const Te=A[Ge];let ut=H[Ge]-B.cap;H[Ge]=B.cap;const xt=[Ge],Ot=new Set(xt);for(let st=0;st<xt.length&&ut>0;st++)for(const _t of y(xt[st],[0,0,0,0])){if(_t<0||Ot.has(_t)||E[_t]!==ti||A[_t]!==Te)continue;Ot.add(_t),xt.push(_t);const $t=Math.max(0,B.cap-H[_t]),di=Math.min($t,ut);H[_t]+=di,ut-=di}H[Ge]+=ut}let Ye=0,Ve=!1;for(let be=0;be<j;be++)Ye=Math.max(Ye,ae[be]/B.cap),H[he[be]]<-1e-12*B.cap&&(Ve=!0);let re=0;for(let be=0;be<V.length;be+=3)re=Math.max(re,(H[V[be+1]]-B.cap)/B.cap);for(let be=0;be<K.length;be+=5)re=Math.max(re,(H[K[be+1]]-B.cap)/B.cap);let ve=0;return B.activePockets.forEach((be,Ge)=>ve=Math.max(ve,Math.abs(le.inflow[Ge])/(be.air+.5*B.cap))),{trial:H,drain:Ye,swing:ve,negative:Ve,front:re}}function ge(B,le){let he=0;for(let j=0;j<B.m;j++)he+=le.x[j];return B.activePockets.forEach((j,F)=>he+=Math.max(0,le.q[F]+le.hold[F])*j.cells),he*a*1e-6}const pe=(B,le)=>{let he=0;for(let j=0;j<B.m;j++)he+=le.x[j];return he*a*1e-6},Oe=()=>({state:E.slice(),pocketOf:A.slice(),pockets:[...U.values()].map(B=>({...B})),events:{...q},nextId:G,peakBubble:X}),Xe=B=>{E.set(B.state),A.set(B.pocketOf),U.clear();for(const le of B.pockets)U.set(le.id,le);Object.assign(q,B.events),G=B.nextId,X=B.peakBubble},N=[],Ne=(B,le)=>{const he=new Uint8Array(r),j=new Uint8Array(r);let F=0;for(let ee=0;ee<r;ee++){const $=E[ee]===ni?0:Math.min(1,o[ee]/le);he[ee]=Math.round($*255),(E[ee]===ni||E[ee]===ti&&$<.5)&&(j[ee]=1),m&&(F+=m[ee]*$*a)}const C=Math.max(3*a,.5);let V=0,K=0;for(const ee of U.values())ee.air/B>=C-1e-9&&(K++,V=Math.max(V,Se(ee)));N.push({gap:B,t:W,phase:oe,coverage:he,trapped:j,coveredPercent:p>0?F/p*100:0,bubbles:K,bubbleKPa:V/1e3})},Le=l==="compressible"&&f>0&&_>1?Math.max(1,Math.round(_*.3)):0,Ce=_>1?_-Le:0,ce=Math.max(x,c),Be=Ce>1?Array.from({length:Ce-1},(B,le)=>ce*(c/ce)**((le+1)/(Ce-1))):[];let me=0;Ee(ce*a,ce,!0),Ce>1&&Ne(ce,ce*a);const Ie=.07;let et=Ie,Ke=0,R=0,M=0,k=0,Q=0,se=ce;for(;se>c*(1+1e-12)&&Q<600;){const B=Math.max(c,se*Math.exp(-et)),le=B*a,he=Oe();Ee(le,B,!1);let j=!1;for(const ae of he.pockets){const Me=U.get(ae.id);Me&&Me.air<.6*ae.air&&et>2e-4&&(j=!0)}const F=l==="compressible"?[...U.values()]:[],C=ne(le,F);if(!j&&(C.m===0||C.excess<=1e-12*le)){Number.isFinite(g)&&C.m&&(W+=(se-B)/g),se=B;continue}let V=null,K=0,ee=null;if(!j){const ae=Ke&&R?Ke*C.excess/R:0,Me=Number.isFinite(g)?B**3*((se-B)/g)/(12*h):0;if(!F.length)V=ie(C,1,ae),K=Math.max(Me,u>0?Math.max(1e-30,pe(C,V)/u):1);else{K=Math.max(Me,ae||Math.max(1e-30,pe(C,ie(ne(le,[]),1,0))/u));for(let Ye=0;Ye<3;Ye++){V=ie(C,K);const Ve=ge(C,V)/u;if(!(Ve>0)||Math.abs(Ve-1)<.35||Ve<1&&K<=Me*(1+1e-9))break;K=Math.max(Me,K*Math.min(20,Math.max(.05,Ve)))}}ee=Re(C,V)}if((j||ee.negative||ee.drain>.9||ee.swing>.6)&&et>2e-4){Xe(he),et*=.5,k++;continue}o.set(ee.trial);const $=F.length?1:K;for(let ae=0;ae<C.m;ae++)it[C.cells[ae]]=V.x[ae]/$;F.forEach((ae,Me)=>ae.q=V.q[Me]);const H=12*h*K/B**3;for(W+=H,M=H,Ke=K,R=C.excess,se=B,Q++,Ee(le,B,!0),ee.front>Ph||ee.swing>.3?et=Math.max(2e-4,et*.6):ee.front<Ph*.4&&ee.swing<.15&&(et=Math.min(Ie,et*1.25));me<Be.length&&se<=Be[me]*(1+1e-9);)Ne(se,le),me++}const Y=c*a;Ee(Y,c);const ze=W;let xe=0;for(let B=0;B<r;B++)E[B]===Qn&&(xe+=a);let Ue=0,ke=!0;if(l==="compressible"&&f>0&&U.size){oe="relax";let B=Math.min(Math.max(M,.001),f/20);const le=Array.from({length:Math.max(0,Le-1)},(j,F)=>f*.002*500**(F/Math.max(1,Le-2)));let he=0;for(let j=0;j<800;j++){at(c);const F=[...U.values()].filter($=>Se($)-$.hold>dy);if(!F.length)break;if(Ue>=f*(1-1e-9)){ke=!1;break}const C=Math.min(B,f-Ue),V=ne(Y,F);if(V.m===0)break;const K=ie(V,c**3*C/(12*h)),ee=Re(V,K);if((ee.negative||ee.drain>.6||ee.swing>.3)&&B>1e-6){B*=.5;continue}o.set(ee.trial);for(let $=0;$<V.m;$++)it[V.cells[$]]=K.x[$];for(F.forEach(($,H)=>$.q=K.q[H]),Ue+=C,W+=C,Ee(Y,c);he<le.length&&Ue>=le[he];)Ne(c,Y),he++;ee.swing<.05&&ee.drain<.15?B*=2:ee.swing<.12&&(B*=1.3)}}let de=1/0;for(let B=0;B<60;B++){let le=0,he=0;for(let F=0;F<r;F++)E[F]===Qn&&o[F]>Y&&(le=Math.max(le,o[F]-Y),he+=o[F]-Y);if(le<1e-9*Y||he>.9*de)break;de=he;const j=ne(Y,[]);if(j.m===0)break;o.set(Re(j,ie(j,1,0,!0)).trial),Ee(Y,c)}return at(c),_>1&&(N.length>=_&&(N.length=_-1),Ne(c,Y)),{volume:o,state:E,pocketOf:A,pockets:[...U.values()],frames:N,crest:x,cap:Y,press:{time:ze,relaxTime:Ue,settled:ke,substeps:k,steps:Q,seatPressureKPa:xe>0?u/(xe*1e-6)/1e3:0,peakBubbleKPa:X/1e3,...q}}}function vy(s,e){const t=s.config,n={shape:"rectangle",offsetX:0,offsetY:0,cellSize:1,power:25,frames:0,...$c,...e};for(const F of["width","depth","offsetX","offsetY","gap","cellSize","power","pressKgf","pressSpeed","settleTime"])if(!Number.isFinite(n[F]))throw new Error(`${F} 必須是有限數值`);if(!["rectangle","circle"].includes(n.shape))throw new Error("熱源形狀必須為矩形或圓形");if(!hy.includes(n.airMode))throw new Error("夾氣處理方式無效");if(n.width<=0||n.width>1e3||n.depth<=0||n.depth>1e3||n.gap<.02||n.gap>10||n.cellSize<.2||n.cellSize>10)throw new Error("熱源尺寸需為 0–1000 mm、間隙 0.02–10 mm、網格 0.2–10 mm");if(n.power<0||n.power>1e4)throw new Error("熱源功耗需介於 0 與 10000 W");if(n.pressKgf<.01||n.pressKgf>5e3)throw new Error("壓合力需介於 0.01 與 5000 kgf");if(n.settleTime<0||n.settleTime>3600)throw new Error("靜置時間需介於 0 與 3600 s");if(n.pressSpeed<.01||n.pressSpeed>100)throw new Error("壓板下降速度上限需介於 0.01 與 100 mm/s");const i=Xt[t.material]||Xt.putty;if(n.viscosity!=null&&!(n.viscosity>=1&&n.viscosity<=1e7))throw new Error("有效黏度需介於 1 與 10,000,000 Pa·s");if(n.yieldStress!=null&&!(n.yieldStress>=0&&n.yieldStress<=1e6))throw new Error("降伏應力需介於 0 與 1,000,000 Pa");const{viscosity:r,yieldStress:a}=Lu(t,n);if(!(r>=1&&r<=1e7))throw new Error("有效黏度需介於 1 與 10,000,000 Pa·s");if(!(a>=0&&a<=1e6))throw new Error("降伏應力需介於 0 與 1,000,000 Pa");const o=Number.isFinite(n.conductivity)&&n.conductivity>0?n.conductivity:i.conductivity,c=Number.isFinite(n.contactResistance)&&n.contactResistance>=0?n.contactResistance:i.contactResistance,l=s.summary.deposits,h=l.reduce((F,C)=>F+C,0);if(!Number.isFinite(h)||h<0||l.some(F=>!Number.isFinite(F)||F<0))throw new Error("沉積體積資料無效");const u=h*1e3,d=n.shape==="circle"?n.width:n.depth,f=my(s),g=t.mode==="point"?la(h,t.dotRatio):null,_=Math.max(g?g.radius:0,...f.map(F=>F.width/2),0),m=Math.sqrt(u/(Math.PI*n.gap))+_+4*n.cellSize,p=f.map(F=>F.x),x=f.map(F=>F.y),y=Math.min(n.offsetX-n.width/2,t.offsetX,...p)-m,v=Math.max(n.offsetX+n.width/2,t.offsetX,...p)+m,E=Math.min(n.offsetY-d/2,t.offsetY,...x)-m,w=Math.max(n.offsetY+d/2,t.offsetY,...x)+m;let A=Math.max(n.cellSize,Math.sqrt((v-y)*(w-E)/(Ch*.89))),D=Math.ceil((v-y)/A),b=Math.ceil((w-E)/A);for(;D*b>Ch;)A*=1.02,D=Math.ceil((v-y)/A),b=Math.ceil((w-E)/A);const S=y,I=E,U=D*b,G=A*A,q=F=>S+(F%D+.5)*A,te=F=>I+(Math.floor(F/D)+.5)*A,W=(F,C)=>{const V=Math.floor((F-S)/A),K=Math.floor((C-I)/A);return V<0||K<0||V>=D||K>=b?-1:K*D+V},oe=new Float64Array(U),X=(F,C,V,K)=>{let ee=0;for(const[,$]of C)ee+=$;if(ee<=0){const $=W(V,K);$>=0&&(oe[$]+=F);return}for(const[$,H]of C)oe[$]+=F*H/ee};if(g&&f.length){const F=f[0],C=g.radius,V=g.height,K=(C*C+V*V)/(2*V),ee=[],$=Math.min(8,Math.max(1,Math.ceil(A/Math.max(C/6,1e-6))));for(let H=Math.floor((F.y-C-I)/A);H<=Math.floor((F.y+C-I)/A);H++)for(let ae=Math.floor((F.x-C-S)/A);ae<=Math.floor((F.x+C-S)/A);ae++){if(ae<0||H<0||ae>=D||H>=b)continue;let Me=0;for(let Ye=0;Ye<$;Ye++)for(let Ve=0;Ve<$;Ve++){const re=Math.hypot(S+(ae+(Ye+.5)/$)*A-F.x,I+(H+(Ve+.5)/$)*A-F.y);re<C&&(Me+=Math.sqrt(K*K-re*re)-(K-V))}Me>0&&ee.push([H*D+ae,Me])}X(F.v,ee,F.x,F.y)}else for(const F of f){const C=Math.max(F.width/2,1e-6),V=Math.max(1,Math.min(256,Math.ceil(4*C/A))),K=[];for(let ee=0;ee<V;ee++){const $=(2*(ee+.5)/V-1)*C,H=W(F.x-F.ty*$,F.y+F.tx*$);H>=0&&K.push([H,Math.sqrt(Math.max(0,1-($/C)**2))])}X(F.v,K,F.x,F.y)}const fe=new Float32Array(U),Se=new Float32Array(U),Ee=(F,C)=>n.shape==="circle"?(F-n.offsetX)**2+(C-n.offsetY)**2<=(n.width/2)**2:Math.abs(F-n.offsetX)<=n.width/2&&Math.abs(C-n.offsetY)<=n.depth/2;let Ae=0;for(let F=0;F<b;F++)for(let C=0;C<D;C++){const V=F*D+C;let K=0,ee=0;for(let $=0;$<4;$++)for(let H=0;H<4;H++){const ae=S+(C+(H+.5)/4)*A,Me=I+(F+($+.5)/4)*A;Ee(ae,Me)&&(K+=1/16),Math.abs(ae)<=t.width/2&&Math.abs(Me)<=t.depth/2&&(ee+=1/16)}fe[V]=K,Se[V]=ee,Ae+=K*G}const at=n.pressKgf*ly,We=_y({cols:D,rows:b,cellSize:A,volume:oe},{gap:n.gap,airMode:n.airMode,force:at,pressSpeed:n.pressSpeed,viscosity:r,yieldStress:a,settleTime:n.settleTime,frames:n.frames,sourceFraction:fe,trace:n.trace}),it=We.volume,ne=We.cap,ie=We.crest;let Re=0;for(let F=0;F<U;F++)Re+=Math.max(0,it[F]-ne);const ge=new Float32Array(U),pe=new Uint8Array(U),Oe=new Float32Array(U);let Xe=0,N=0,Ne=0,Le=0,Ce=0,ce=0;for(let F=0;F<U;F++){const C=it[F],V=We.state[F];if(ge[F]=V===ni?0:Math.min(1,C/ne),Oe[F]=V===ni?1:V===ti?1-ge[F]:0,pe[F]=V===ni||V===ti&&ge[F]<.5?1:0,Xe+=fe[F]*ge[F]*G,Ce+=ge[F]*G,N+=C*fe[F],Ne+=C*(1-Se[F]),Le+=C,ge[F]>=.5&&fe[F]<.5){const K=q(F)-n.offsetX,ee=te(F)-n.offsetY,$=n.shape==="circle"?Math.hypot(K,ee)-n.width/2:Math.hypot(Math.max(0,Math.abs(K)-n.width/2),Math.max(0,Math.abs(ee)-n.depth/2));ce=Math.max(ce,$)}}const Be=[],me=new Map(We.pockets.map(F=>[F.id,F])),Ie=new Uint8Array(U),et=new Int32Array(U);for(let F=0;F<U;F++){if(!Oe[F]||Ie[F])continue;const C=We.pocketOf[F];let V=0,K=0,ee=0,$=0,H=0;for(Ie[F]=1,et[H++]=F;H;){const Me=et[--H],Ye=Oe[Me];V+=Ye*G,K+=Ye*fe[Me]*G,ee+=q(Me)*Ye,$+=te(Me)*Ye;const Ve=Me%D;for(const re of[Ve>0?Me-1:-1,Ve+1<D?Me+1:-1,Me>=D?Me-D:-1,Me+D<U?Me+D:-1])re>=0&&Oe[re]&&!Ie[re]&&We.pocketOf[re]===C&&(Ie[re]=1,et[H++]=re)}if(!(V>0))continue;const ae=C>=0?me.get(C):null;Be.push({areaMm2:V,inSourceMm2:K,x:ee/(V/G),y:$/(V/G),...ae?{pressureKPa:(ae.gas/Math.max(ae.air,1e-12)-en)/1e3,volumeRatio:ae.air*en/ae.gas,atmVolumeMm3:ae.gas/en,sealGapMm:ae.sealGap,minRatio:ae.minRatio,sealedDuring:ae.sealPhase}:{}})}Be.sort((F,C)=>C.inSourceMm2-F.inSourceMm2||C.areaMm2-F.areaMm2);const Ke=Math.max(3*G,.5),R=Be.filter(F=>F.inSourceMm2>1e-9&&F.areaMm2>=Ke-1e-9),M=Be.filter(F=>F.areaMm2<Ke-1e-9).reduce((F,C)=>F+C.inSourceMm2,0),k=R.reduce((F,C)=>F+C.inSourceMm2,0),Q=n.shape==="circle"?Math.PI*n.width**2/4:n.width*n.depth,se=Q*n.gap/1e3,Y=Ae>0?Xe/Ae*100:0,ze=n.gap/1e3,xe=ze/o*1e4+c,Ue=Q/100,ke=Y/100*Ue,de={conductivity:o,contactResistance:c,bondLineMm:n.gap,power:n.power,bulkImpedanceCm2:ze/o*1e4,impedanceCm2:xe,idealResistance:xe/Ue,resistance:ke>0?xe/ke:1/0};de.idealRise=de.idealResistance*n.power,de.rise=de.resistance*n.power;const B=R.filter(F=>Number.isFinite(F.volumeRatio)),le={airMode:n.airMode,forceN:at,forceKgf:n.pressKgf,pressSpeed:n.pressSpeed,viscosity:r,yieldStress:a,settleTime:n.settleTime,pressTime:We.press.time,relaxTime:We.press.relaxTime,settled:We.press.settled,seatPressureKPa:We.press.seatPressureKPa,peakBubbleKPa:We.press.peakBubbleKPa,sealed:We.press.sealed,vented:We.press.vented,collapsed:We.press.collapsed,remaining:Be.filter(F=>F.areaMm2>=Ke-1e-9).length,bubbleKPa:B.length?Math.max(...B.map(F=>F.pressureKPa)):0,volumeRatio:B.length?B.reduce((F,C)=>F+C.volumeRatio*C.inSourceMm2,0)/B.reduce((F,C)=>F+C.inSourceMm2,0):null,substeps:We.press.substeps},he={compressible:"被膠包圍的空氣依 pV = 常數（等溫）壓縮與回脹，可隨膠流移動、在膠牆變薄時排出",rigid:"被膠包圍的乾區凍結為不可變形的夾氣（v1.0 剛性牆）",vent:"被膠包圍的空氣假設全部排出（覆蓋率上限）"},j=[`覆蓋與空洞來自平行板 Hele-Shaw 擠壓近似（等效牛頓黏度 ${Math.round(r)} Pa·s、定力 ${n.pressKgf} kgf 壓到墊片）；${he[n.airMode]}。未含剪切稀化、壁滑、潤濕與指狀穿透，不能判定實際接觸或可靠度。`,"熱阻為一維估算：(間隙 ÷ 導熱率 + TDS 推算接觸熱阻) ÷ 濕潤面積；不含擴散熱阻與空洞周邊的橫向傳熱，只供方案相對比較。"];return n.airMode==="compressible"&&We.press.sealed>0&&j.push(`壓到墊片後膠壓消退，被壓縮的氣泡會回脹（降伏應力 ${a} Pa 只擋住一小部分）；靜置 ${n.settleTime} s ${We.press.settled?"內已大致穩定":"時仍在回脹"}。透明板實測建議在壓好後 0 s、30 s、2 min、10 min 各拍一張比對。`),We.press.time>120&&j.push(`以 ${n.pressKgf} kgf 壓到墊片約需 ${We.press.time.toFixed(0)} s；實際手壓若較快，壓合中的氣泡壓縮會更大。`),n.airMode==="compressible"&&We.press.sealed>0&&j.push("氣泡在膠牆變薄處排出（吹破）的位置與時機受網格影響（指狀穿透未完整解析）；比較圖樣請使用相同網格，建議 ≤ 0.5 mm。"),Re>1e-9&&j.push("部分膠量被夾氣區完全包圍而無法再推出，已保留在原位；局部膜厚可能高於間隙。"),A>n.cellSize*1.001&&j.push(`為控制計算量，網格由 ${n.cellSize.toFixed(2)} mm 調整為 ${A.toFixed(2)} mm；細節精度下降。`),Math.abs(Ae-Q)>Q*.05&&j.push("熱源相對網格過小，熱源面積的網格取樣誤差超過 5%；請縮小工件範圍或使用更細網格，覆蓋數值不宜判讀。"),(Math.abs(n.offsetX)+n.width/2>t.width/2||Math.abs(n.offsetY)+d/2>t.depth/2)&&j.push("熱源範圍超出工件矩形參考邊界；請核對尺寸和中心偏移，匯入工件僅以包圍框近似。"),Ne>1e-6&&j.push("估算有材料超出工件矩形範圍；未模擬實際邊緣流失。"),k>0&&j.push(`熱源內有 ${R.length} 處被膠包圍的夾氣區（共 ${k.toFixed(1)} mm²）；外框、螺旋與蛇形較易發生，需透明板實測確認。`),t.workpieceKind!=="plate"&&j.push("匯入工件仍以其矩形邊界和水平上表面近似，不包含孔洞與曲面。"),t.mode==="pattern"&&j.push("膠沿規劃路徑累加；彎角、重疊與壓合輪廓為幾何近似，並非已驗證的流變模擬。"),n.gap<i.minBondLine&&j.push(`${i.name} 資料表最小黏結層厚度為 ${i.minBondLine} mm；目前目標間隙較小，須向廠商確認適用性，不代表此模型已考慮顆粒或硬接觸。`),{options:n,grid:{originX:S,originY:I,cellSize:A,cols:D,rows:b,coverage:ge,sourceFraction:fe,voidMask:pe,airFraction:Oe,frames:We.frames,crest:ie},summary:{depositedMl:h,sourceAreaMm2:Q,requiredMl:se,coveredPercent:Y,idealVolumePercent:se>0?Math.min(100,h/se*100):0,volumeRatio:se>0?h/se:0,insideMl:N/1e3,outsideMl:(Le-N)/1e3,offWorkpieceMl:Ne/1e3,conservationErrorMl:Le/1e3-h,unresolvedMl:Re/1e3,wetAreaMm2:Ce,squeezeOutMm:ce,voidCount:R.length,voidAreaMm2:k,voidPercent:Q>0?k/Q*100:0,largestVoidMm2:R.length?Math.max(...R.map(F=>F.inSourceMm2)):0,tinyVoidMm2:M,minVoidMm2:Ke,crestMm:ie,steps:We.press.steps,press:le,thermal:de,material:i.name},voids:Be,warnings:j,assumptions:"engineering_assumption",model:`hele_shaw_squeeze_v1.1_${n.airMode}`}}function xy(s,e,{iterations:t=26}={}){const n=s.mode==="point",i=n?"gateDuration":"speed";let r=n?.001:1,a=n?10:800,o=null;for(let h=0;h<t;h++){const u=Math.sqrt(r*a);let d=null;try{d=ha({...s,[i]:u})}catch{d=null}const f=d?d.summary.deposited:1/0;d&&(!o||Math.abs(f-e)<Math.abs(o.volume-e))&&(o={run:d,value:u,volume:f});const g=f>e;n===g?a=u:r=u}if(!o)throw new Error("無法在設備限制內達到目標膠量");const c=Number(o.value.toPrecision(4)),l=ha({...s,[i]:c});return{config:{...s,[i]:c},run:l,key:i,reached:Math.abs(l.summary.deposited-e)<=Math.max(1e-6,e*.03)}}const Du={line:'<path d="M4 12h16"/>',n:'<path d="M5 19V5l14 14V5"/>',serpentine:'<path d="M4 5h15a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h14a2 2 0 0 1 0 4H4"/>',spiral:'<path d="M4 4h16v16H6V7h11v10H9v-7h5v4"/>',perimeter:'<rect x="4" y="4" width="16" height="16" rx="1"/>'},ci={line:"中心線",n:"N 形",serpentine:"蛇形",spiral:"螺旋",perimeter:"外框"},Jt=(s,e=16)=>`<svg viewBox="0 0 24 24" width="${e}" height="${e}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s}</svg>`,St={play:Jt('<path d="M7 5v14l11-7z" fill="currentColor" stroke="none"/>'),pause:Jt('<path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none"/>'),restart:Jt('<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/>'),step:Jt('<path d="M6 5v14l9-7zM17 5v14"/>'),reset:Jt('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'),orbit:Jt('<circle cx="12" cy="12" r="3"/><path d="M12 3c5 0 9 4 9 9M12 21c-5 0-9-4-9-9"/><path d="M19 9l2 3 2-3M5 15l-2-3-2 3"/>'),cube:Jt('<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>'),sun:Jt('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:Jt('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),book:Jt('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5"/>'),help:Jt('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>'),download:Jt('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),press:Jt('<path d="M4 6h16M12 6v6M8 12h8l-2 4h-4zM4 20h16"/>'),compare:Jt('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),close:Jt('<path d="M6 6l12 12M18 6 6 18"/>')};function yy(s){return`
<header class="topbar">
  <div class="brand">
    <div class="brand-mark" aria-hidden="true"><span></span></div>
    <div><div class="eyebrow">TIM DISPENSING LAB</div><h1>TIM 點膠研究室</h1></div>
  </div>
  <div class="scenario" id="scenario" aria-label="目前情境"></div>
  <div class="top-actions">
    <span class="badge-warn" title="所有結果皆為工程假設，尚未經實機校準">工程假設 · 未校準</span>
    <button class="ghost" id="show-sources" title="參數來源與假設">${St.book}<span>來源</span></button>
    <button class="ghost" id="help" title="使用說明">${St.help}<span>說明</span></button>
    <button class="ghost icon-only" id="theme" title="切換深色／淺色">${St.moon}</button>
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
          <button class="tool" id="free-orbit" aria-pressed="false" title="360° 自由旋轉">${St.orbit}</button>
          <button class="tool" id="projection" aria-pressed="false" title="切換正交／透視">${St.cube}<span id="projection-label">正交</span></button>
          <button class="tool" id="reset-camera" title="重設視角 (Home)">${St.reset}</button>
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
        <button class="tool" id="press-play">${St.play}</button>
        <input type="range" id="press-scrub" min="0" max="23" step="1" value="23" aria-label="壓合進程">
        <span id="press-gap">間隙 0.50 mm</span>
        <div class="seg small" role="group" aria-label="壓合著色"><button data-press-color="material" class="active">膠色</button><button data-press-color="front">前緣時序</button></div>
        <button class="tool" id="press-exit" title="回到點膠">${St.close}<span>回到點膠</span></button>
      </div>
      <div class="stage-foot">
        <span id="camera-hint">拖曳平移 · 滾輪縮放 · Home 重設</span>
        <span class="scale"><i id="scale-line"></i><span id="scale-label">X 軸 10 mm</span></span>
        <span class="note" id="geometry-note">mm 真實比例 · 機構為工程示意</span>
      </div>
    </section>
    <section class="dock card" aria-label="時間軸">
      <div class="transport">
        <button id="play" class="primary">${St.play}<span>開始試驗</span></button>
        <button id="restart" class="tool" title="回到起點">${St.restart}</button>
        <button id="step" class="tool" title="前進 0.01 秒">${St.step}</button>
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
<dialog id="sources-dialog" class="dialog wide"><div class="dialog-head"><h2>參數來源與假設</h2><button data-close class="ghost">${St.close}</button></div><p class="muted">「v1.0 更新」為本次查證後替換或新增的值；研究原檔 v0.3 不變。所有項目目前均未經實機驗證。</p><div class="table-scroll"><table><thead><tr><th>參數</th><th>值</th><th>類型</th><th>依據與出處</th></tr></thead><tbody id="source-rows"></tbody></table></div></dialog>
<dialog id="compare-dialog" class="dialog wide"><div class="dialog-head"><h2>熱源圖樣比較</h2><button data-close class="ghost">${St.close}</button></div><div id="compare-body"></div></dialog>
<dialog id="help-dialog" class="dialog"><div class="dialog-head"><h2>使用說明</h2><button data-close class="ghost">${St.close}</button></div><div id="help-body"></div></dialog>
<div id="toast" role="status"></div>`}const Qs=1e3,_s=150,yi=52,ta=14,vo=12,na=26,Iu={q:{label:"出口流量",unit:"mL/s",key:"q",digits:3},output:{label:"累積出膠",unit:"mL",key:"output",digits:3},speed:{label:"移動速度",unit:"mm/s",key:"speed",digits:0},z:{label:"針嘴高度",unit:"mm",key:"z",digits:1}};function Lh(s){if(!(s>0))return 1;const e=10**Math.floor(Math.log10(s));for(const t of[1,1.2,1.5,2,2.5,3,4,5,6,8,10])if(t*e>=s)return t*e;return 10*e}function My(s,e,t,n,i){var b;const r=Iu[t],a=e.frames,o=a.map(S=>S[r.key]),c=t==="q"?[e.Q]:[],l=((b=i==null?void 0:i.frames)==null?void 0:b.map(S=>S[r.key]))||[],h=Lh(Math.max(1e-6,...o,...c,...l)*1.05),u=t==="z"?Math.max(0,Math.min(...o)-1):0,d=Math.max(e.duration,(i==null?void 0:i.duration)||0),f=S=>yi+S/d*(Qs-yi-ta),g=S=>_s-na-(S-u)/(h-u)*(_s-na-vo),_=Math.max(1,Math.floor(a.length/900)),m=S=>S.filter((I,U)=>U%_===0||U===S.length-1).map((I,U)=>`${U?"L":"M"}${f(I.t).toFixed(1)},${g(I[r.key]).toFixed(1)}`).join(""),p=m(a),x=[0,.25,.5,.75,1].map(S=>{const I=u+(h-u)*S;return`<line class="grid" x1="${yi}" x2="${Qs-ta}" y1="${g(I)}" y2="${g(I)}"/><text class="tick" x="${yi-8}" y="${g(I)+4}" text-anchor="end">${I.toFixed(r.digits===0?0:h<1?2:1)}</text>`}).join(""),y=[],v=Lh(d/6);for(let S=0;S<=d+1e-9;S+=v)y.push(`<text class="tick" x="${f(S)}" y="${_s-8}" text-anchor="middle">${+S.toFixed(2)}s</text>`);const E=e.ending,w=[["off",E.commandOff,"關膠"],["arrive",E.movementEnd,"到位"],["lift",E.liftStart,"抬針"],["exit",E.motionEnd,"退離完成"]].filter(([,S])=>Number.isFinite(S)).map(([S,I,U])=>`<line class="marker ${S}" x1="${f(I)}" x2="${f(I)}" y1="${vo}" y2="${_s-na}"><title>${U} ${I.toFixed(3)} s</title></line>`).join(""),A=t==="q"?`<path class="command" d="M${yi},${g(e.Q)} H${f(E.commandOff)} V${g(0)} H${Qs-ta}"/>`:"",D=i?`<path class="baseline" d="${m(i.frames)}"/>`:"";return s.setAttribute("viewBox",`0 0 ${Qs} ${_s}`),s.innerHTML=x+y.join("")+w+D+`<path class="area" d="${p} L${f(a.at(-1).t)},${g(u)} L${yi},${g(u)} Z"/><path class="series" d="${p}"/>`+A+`<line class="cursor" id="chart-cursor" x1="${f(n)}" x2="${f(n)}" y1="${vo-4}" y2="${_s-na}"/>`,{x:f,duration:d,toTime:S=>(S-yi)/(Qs-yi-ta)*d}}function by(s,e,t){const n=s.querySelector("#chart-cursor");if(n&&e){const i=e.x(t);n.setAttribute("x1",i),n.setAttribute("x2",i)}}const _e=(s,e=document)=>e.querySelector(s),jt=(s,e=document)=>[...e.querySelectorAll(s)],kt=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ue=(s,e=3)=>Number.isFinite(s)?Number(s).toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e}):"—",Sy=s=>Number.isFinite(s)?+Number(s).toPrecision(6):s,Nu=.0689475729,Uu={get(s){try{return localStorage.getItem(s)}catch{return null}},set(s,e){try{localStorage.setItem(s,e)}catch{}}},mc=["pressure","rpm","efficiency","delay","tauOn","tauOff","fill","residual","referenceRate","pressureExponent","viscosity","hoseId","hoseLength","reverseRpm","reverseDuration","density"],Fu=()=>({shape:"rectangle",width:30,depth:30,offsetX:0,offsetY:0,gap:Qc(Vn,"assembly.gap"),cellSize:.5,power:Qc(Vn,"thermal.power"),...$c,viscosity:null,yieldStress:null}),Ey=["gap","cellSize","power","airMode","pressKgf","pressSpeed","settleTime","viscosity","yieldStress"],wy={compressible:"可壓縮氣泡",rigid:"剛性牆（v1.0）",vent:"全部排出"},Ty={compressible:"可壓縮",rigid:"剛性牆",vent:"全排出"},Ou=()=>({pattern:"n",spacing:5,edgeInset:2,spiralShape:"auto",spiralDirection:"outside-in"}),L={config:null,run:null,frame:null,time:0,playing:!1,clock:null,tab:"equipment",chartType:"q",chart:null,pressureUnit:"psi",heat:Fu(),pattern:Ou(),overrides:new Map,baseline:null,press:null,pressBaseline:null,pressAnim:null,tuneFactor:1.2,compare:null,busy:!1};_e("#app").innerHTML=yy(gr);const qc=Uu.get("tim-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=qc;function un(s,e=""){const t=_e("#toast");t.textContent=s,t.className=`visible ${e}`,clearTimeout(un.timer),un.timer=setTimeout(()=>t.className="",4200)}let Qe;try{Qe=new cy(_e("#viewport"),{onScale(s,e){const t=[.5,1,2,5,10,20,50,100,200,500].find(n=>s*n/10>=36)??500;_e("#scale-line").style.width=`${Math.min(110,s*t/10)}px`,_e("#scale-label").textContent=`X 軸 ${t} mm`,_e("#scale-line").style.transform=`rotate(${e>90?e-180:e<-90?e+180:e}deg)`},onView:()=>Mr()}),Qe.setTheme(qc)}catch(s){throw _e("#viewport").innerHTML='<div class="webgl-error">無法啟動 3D 顯示，請使用啟用硬體加速的桌面瀏覽器。</div>',s}let Gi=null,Ay=0;const gc=new Map;try{Gi=new Worker(new URL(""+new URL("compute-worker-BSjnibPu.js",import.meta.url).href,import.meta.url),{type:"module"}),Gi.onmessage=({data:s})=>{var t;const e=gc.get(s.id);if(e){if(s.progress!==void 0)return(t=e.progress)==null?void 0:t.call(e,s.progress,s.label);gc.delete(s.id),s.ok?e.resolve(s.result):e.reject(new Error(s.error))}},Gi.onerror=()=>Gi=null}catch{Gi=null}const Ry=s=>({config:s.config,summary:{deposits:s.summary.deposits},path:s.path,gridStart:s.gridStart,cellLength:s.cellLength,maxHeight:s.maxHeight});function Bu(s,e,t){return Gi?new Promise((n,i)=>{const r=++Ay;gc.set(r,{resolve:n,reject:i,progress:t}),Gi.postMessage({id:r,type:s,payload:e})}):new Promise((n,i)=>setTimeout(()=>{try{s==="compress"?n(vy(e.run,{...e.heat,frames:e.frames})):i(new Error("此瀏覽器不支援背景計算，無法執行圖樣比較"))}catch(r){i(r)}},30))}const Us=()=>L.config.architecture==="P300",ku=()=>({shape:L.heat.shape,width:L.heat.width,depth:L.heat.depth,offsetX:L.heat.offsetX,offsetY:L.heat.offsetY,pattern:L.pattern.pattern,spacing:L.pattern.spacing,edgeInset:L.pattern.edgeInset,spiralShape:L.pattern.spiralShape,spiralDirection:L.pattern.spiralDirection});function zu(s){const e={...s,surfaceZ:s.fixtureHeight+s.thickness};return e.mode==="pattern"?e.pathSettings=ku():delete e.pathSettings,e}function Hu(s="putty",e="R75"){return zu({...Uh(Vn,s,e),mode:"pattern"})}function _n(s,{silent:e=!1}={}){try{const t=zu(s),n=ha(t);return L.config=t,L.overrides.set(t.profile,Object.fromEntries(mc.map(i=>[i,t[i]]))),Vu(n),!0}catch(t){return e||un(t.message,"error"),Ai(),!1}}function Cy(s,e){const t=Uh(Vn,s,e),n=L.overrides.get(t.profile)||{},i=Object.fromEntries(Object.entries(L.config).filter(([a])=>!mc.includes(a)&&!["material","architecture","profile"].includes(a))),r={...t,...i,...Object.fromEntries(mc.map(a=>[a,n[a]??t[a]]))};r.material=s,r.architecture=e,r.profile=t.profile,s!==L.config.material&&(L.heat={...L.heat,viscosity:null,yieldStress:null}),_n(r)||(_e("#sel-material")&&(_e("#sel-material").value=L.config.material),_e("#sel-arch")&&(_e("#sel-arch").value=L.config.architecture))}const Py={tds:["TDS","tag-tds"],derived:["推導","tag-derived"],ai:["AI 初估","tag-ai"],geo:["幾何","tag-geo"],spec:["原廠","tag-tds"]};function qe({bind:s,label:e,value:t,unit:n="",min:i,max:r,tag:a,hint:o,disabled:c,step:l="any"}){const[h,u]=Py[a]||[a,"tag-ai"];return`<label class="field${c?" disabled":""}"><span class="lbl">${e}${a?`<em class="tag ${u}">${h}</em>`:""}</span><span class="input"><input type="number" data-bind="${s}" value="${Sy(t)}" min="${i}" max="${r}" step="${l}" ${c?"disabled":""} aria-label="${kt(e)}"><b>${n}</b></span>${o?`<small>${o}</small>`:""}</label>`}function Ti({bind:s,id:e,label:t,value:n,options:i,hint:r}){return`<label class="field"><span class="lbl">${t}</span><select ${s?`data-bind="${s}"`:""} ${e?`id="${e}"`:""}>${i.map(([a,o])=>`<option value="${a}" ${String(a)===String(n)?"selected":""}>${o}</option>`).join("")}</select>${r?`<small>${r}</small>`:""}</label>`}const Gn=(s,e,{open:t=!0,note:n}={})=>`<details class="group" ${t?"open":""}><summary>${s}</summary><div class="group-body">${e}${n?`<p class="note">${n}</p>`:""}</div></details>`;function Ly(){const s=L.config,e=Us(),t=Xt[s.material],n=e?"理想容積計量":s.material==="putty"?"TDS 參考點 × 冪律管流":"常黏度 Poiseuille 圓管",i=e?`每轉 ${s.displacement} mL × 轉速 × 效率；滿腔與起停時間為假設。`:s.material==="putty"?`90 psi 時 75 g/min（TDS）；壓力冪次 m=${s.pressureExponent} 取自 Laird 點膠指南曲線形狀。Q ∝ P^m · d^(3+m) / L^m。`:"黏度 2,500,000 cP（TDS，Brookfield 2 rpm）暫作常數，不代表完整流變。",r=L.run?L.run.Q:0;return`
  <div class="pair">
    ${Ti({id:"sel-material",label:"膠材",value:s.material,options:[["putty","Laird Tputty 910"],["grease","Laird Tgrease 2500"]]})}
    ${Ti({id:"sel-arch",label:"出膠架構",value:s.architecture,options:[["R75","R75 氣壓 75cc"],["P300","P300 PCP"]]})}
  </div>
  <div class="material-card" style="--glue:#${t.color.toString(16).padStart(6,"0")}">
    <i></i><div><b>${t.name}</b><span>${t.kind}</span><span>k ${t.conductivity} W/m·K · 最小 BLT ${t.minBondLine*1e3} µm · ${t.density} g/cc · ${t.colorName}</span></div>
  </div>
  <div class="method"><span>${n}</span><strong>${ue(r,3)} <small>mL/s 穩態</small></strong><p>${i}</p></div>
  ${Gn("驅動與針嘴",(e?qe({bind:"c.rpm",label:"計量軸轉速",value:s.rpm,unit:"rpm",min:0,max:300,tag:"ai"})+qe({bind:"c.efficiency",label:"容積效率",value:s.efficiency,unit:"",min:0,max:1,tag:"ai"}):`<div class="with-btn">${qe({bind:"c.pressure",label:"驅動表壓",value:L.pressureUnit==="bar"?s.pressure*Nu:s.pressure,unit:L.pressureUnit,min:0,max:L.pressureUnit==="bar"?6.89475729:100,tag:"ai",hint:"控制器上限 100 psi（Performus X100 額定）"})}<button class="chip-btn" id="pressure-unit">${L.pressureUnit==="psi"?"bar":"psi"}</button></div>`)+qe({bind:"c.diameter",label:"虛擬針嘴內徑",value:s.diameter,unit:"mm",min:.2,max:8,tag:"geo",hint:e?"只影響持膠量與外觀":"0.125 in = 3.175 mm（指南曲線用嘴）"})+qe({bind:"c.nozzleLength",label:"等效直管長",value:s.nozzleLength,unit:"mm",min:1,max:100,tag:"ai",hint:e?"只影響持膠量":"流量基準長度，非針嘴總長"}))}
  ${Gn("響應與材料模型",qe({bind:"c.delay",label:"起膠延遲",value:s.delay,unit:"s",min:0,max:2,tag:"ai"})+qe({bind:"c.tauOn",label:e?"起停時間常數":"上升時間常數",value:s.tauOn,unit:"s",min:.001,max:2,tag:"ai"})+(e?"":qe({bind:"c.tauOff",label:"卸壓下降時間常數",value:s.tauOff,unit:"s",min:.001,max:2,tag:"ai"}))+(!e&&s.material==="putty"?qe({bind:"c.pressureExponent",label:"壓力冪次 m",value:s.pressureExponent,unit:"",min:.1,max:4,tag:"derived",hint:"指南曲線 20–100 psi 擬合 2.73；設 1 回到 v0.x 線性"})+qe({bind:"c.referenceRate",label:"90 psi 參考流率",value:s.referenceRate,unit:"mL/s",min:0,max:10,tag:"tds",hint:"75 g/min ÷ 3.2 g/cc；指南圖讀約 75 cc/min，單位待 Laird 確認"}):"")+(!e&&s.material==="grease"?qe({bind:"c.viscosity",label:"等效黏度",value:s.viscosity,unit:"Pa·s",min:1,max:1e5,tag:"tds"}):""),{open:!1,note:"起停常數為 AI 初估；未含溫度效應（指南：低於 23 °C 流率下降，60–80 °C 加熱可改善）。"})}
  ${Gn("膠筒與預填管路",qe({bind:"c.fill",label:"膠筒初始裝填",value:s.fill,unit:"mL",min:s.residual,max:e?300:75,tag:s.material==="putty"?"tds":"ai",hint:s.material==="putty"?e?"300cc 鋁筒裝填 300 cc（960 g）":"75cc EFD 裝填 56 cc（179 g）":`Tgrease 實際包材：${Xt.grease.packaging}`})+qe({bind:"c.residual",label:"不可用殘量",value:s.residual,unit:"mL",min:0,max:s.fill,tag:"ai"})+(e?qe({bind:"c.hoseId",label:"供料管內徑",value:s.hoseId,unit:"mm",min:1,max:25,tag:"ai"})+qe({bind:"c.hoseLength",label:"供料管長",value:s.hoseLength,unit:"mm",min:0,max:5e3,tag:"ai"}):""),{open:!1,note:e?"管路已預填，只計入持膠量；未求解壓降。畫面管路為示意。":"氣室與氣管未分開求解；畫面氣管與控制器為示意。"})}`}function Dy(){var r;const s=L.heat,t=(s.shape==="circle"?Math.PI*s.width**2/4:s.width*s.depth)*s.gap/1e3,n=((r=L.run)==null?void 0:r.summary.deposited)??0,i=t>0?n/t:0;return`
  <p class="lead">熱源（元件接觸面）設定同時決定「依熱源」路徑與壓合／熱阻估算。偏移以工件中心為原點。</p>
  ${Ti({bind:"h.shape",label:"熱源形狀",value:s.shape,options:[["rectangle","矩形"],["circle","圓形"]]})}
  <div class="pair">
    ${qe({bind:"h.width",label:s.shape==="circle"?"直徑":"長 X",value:s.width,unit:"mm",min:1,max:500,tag:"ai"})}
    ${s.shape==="circle"?"":qe({bind:"h.depth",label:"寬 Y",value:s.depth,unit:"mm",min:1,max:500,tag:"ai"})}
  </div>
  <div class="pair">
    ${qe({bind:"h.offsetX",label:"中心 X",value:s.offsetX,unit:"mm",min:-500,max:500})}
    ${qe({bind:"h.offsetY",label:"中心 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}
  </div>
  <div class="pair">
    ${qe({bind:"h.gap",label:"組裝間隙 BLT",value:s.gap,unit:"mm",min:.02,max:10,tag:"ai",hint:`${Xt[L.config.material].name} 最小 ${Xt[L.config.material].minBondLine} mm`})}
    ${qe({bind:"h.power",label:"元件功耗",value:s.power,unit:"W",min:0,max:1e4,tag:"ai"})}
  </div>
  <div class="volume-meter ${i<1?"low":i>1.6?"high":"ok"}">
    <div><span>熱源間隙體積</span><b>${ue(t,3)} mL</b></div>
    <div><span>目前沉積</span><b>${ue(n,3)} mL</b></div>
    <div><span>比值</span><b>${ue(i,2)}×</b></div>
    <i style="--w:${Math.min(100,i/2*100)}%"></i><em class="tick1"></em>
  </div>
  <div class="tune">
    ${qe({bind:"x.tuneFactor",label:"目標膠量係數",value:L.tuneFactor,unit:"× 間隙體積",min:.3,max:5,tag:"ai",hint:"考慮溢膠與夾氣的餘量；1.2 為比較起點"})}
    <button class="secondary" id="tune">${L.config.mode==="point"?"自動調整開膠時間":"自動調整移動速度"}</button>
  </div>
  <div class="actions">
    <button class="primary" id="press">${St.press}<span>模擬壓合</span></button>
    <button class="secondary" id="compare">${St.compare}<span>比較所有圖樣</span></button>
  </div>
  ${Gn("壓合條件（透明板＋墊片）",Iy(s),{open:!0,note:"定力壓下，到墊片（組裝間隙）即停；之後膠壓消退，被壓縮的氣泡回脹到降伏應力擋住為止。實際手壓若先快後慢，壓合中的氣泡壓縮程度會不同，最終回脹結果影響較小。"})}
  ${Gn("估算網格",qe({bind:"h.cellSize",label:"網格解析度",value:s.cellSize,unit:"mm",min:.2,max:5,tag:"ai",hint:"越小越細，計算時間增加；上限 90,000 格。夾氣數量對網格敏感，比較圖樣請用相同網格"}),{open:!1})}
  <p class="note">壓合採平行板 Hele-Shaw 擠壓：定力壓到墊片，被膠包圍的空氣依所選方式處理（預設可壓縮：pV = 常數、可隨膠流移動、膠牆變薄時排出）。熱阻 =（間隙 ÷ k + TDS 推算接觸熱阻）÷ 濕潤面積。皆未經透明板實測校準。</p>`}function Iy(s){const e=L.config,t=Lu(e,s),n=e.material==="grease";return`${Ti({bind:"h.airMode",label:"夾氣處理",value:s.airMode,options:[["compressible","可壓縮氣泡（會壓縮、遷移、排出）"],["rigid","剛性牆（v1.0 舊模型）"],["vent","全部排出（覆蓋率上限）"]]})}
  <div class="pair">
    ${qe({bind:"h.pressKgf",label:"壓合力",value:s.pressKgf,unit:"kgf",min:.01,max:5e3,tag:"ai",hint:"手壓或治具的力"})}
    ${qe({bind:"h.pressSpeed",label:"下降速度上限",value:s.pressSpeed,unit:"mm/s",min:.01,max:100,tag:"ai",hint:"剛接觸時的壓板速度"})}
  </div>
  <div class="pair">
    ${qe({bind:"h.viscosity",label:"有效黏度",value:t.viscosity,unit:"Pa·s",min:1,max:1e7,tag:n?"tds":"derived",hint:n?"TDS Brookfield 2 rpm（同設備頁）":"由針嘴冪律擬合推算 @1 s⁻¹"})}
    ${qe({bind:"h.yieldStress",label:"降伏應力",value:t.yieldStress,unit:"Pa",min:0,max:1e6,tag:"ai",hint:"公開散熱膏實測約 7–30 Pa"})}
  </div>
  ${qe({bind:"h.settleTime",label:"靜置觀察時間",value:s.settleTime,unit:"s",min:0,max:3600,tag:"ai",hint:"壓到墊片後氣泡回脹的時間；建議與透明板拍照時間一致"})}
  ${s.viscosity!=null||s.yieldStress!=null?'<button class="chip-btn" id="rheo-reset">恢復材料預設黏度／降伏應力</button>':""}`}function Ny(){var i,r,a;const s=L.config,e=L.pattern;let n=`<div class="seg full" role="group" aria-label="路徑模式">${[["pattern","依熱源"],["line","直線"],["point","單點"]].map(([o,c])=>`<button data-mode="${o}" class="${s.mode===o?"active":""}">${c}</button>`).join("")}</div>`;return s.mode==="pattern"?(n+=`<div class="patterns">${Object.keys(ci).map(o=>`<button data-pattern="${o}" class="${e.pattern===o?"active":""}" title="${ci[o]}"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${Du[o]}</svg><span>${ci[o]}</span></button>`).join("")}</div>`,e.pattern==="spiral"&&(n+=`<div class="pair">${Ti({bind:"p.spiralShape",label:"螺旋形狀",value:e.spiralShape,options:[["auto","依熱源"],["square","方形"],["round","圓形"]]})}${Ti({bind:"p.spiralDirection",label:"起點",value:e.spiralDirection,options:[["outside-in","外向內"],["inside-out","中心向外"]]})}</div>`),n+=`<div class="pair">${qe({bind:"p.spacing",label:"路徑間距",value:e.spacing,unit:"mm",min:.2,max:1e3,tag:"ai"})}${qe({bind:"p.edgeInset",label:"邊界內縮",value:e.edgeInset,unit:"mm",min:0,max:500,tag:"ai"})}</div>`,n+=`<p class="note">路徑長 ${ue((i=L.run)==null?void 0:i.pathLength,1)} mm${(a=(r=L.run)==null?void 0:r.motion)!=null&&a.corners?` · ${L.run.motion.corners} 個減速轉角（最低 ${ue(L.run.motion.slowestCorner,1)} mm/s）`:""}。內縮只限制針尖中心；Laird／Parker 指南提醒蛇形、螺旋、外框較易夾氣。</p>`):s.mode==="line"?n+=`<div class="pair">${qe({bind:"c.lineLength",label:"路徑長度",value:s.lineLength,unit:"mm",min:1,max:250,tag:"ai"})}${qe({bind:"c.offsetX",label:"中心 X",value:s.offsetX,unit:"mm",min:-500,max:500})}</div>${qe({bind:"c.offsetY",label:"中心 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}`:n+=`${qe({bind:"c.gateDuration",label:"開膠時間",value:s.gateDuration,unit:"s",min:.001,max:10,tag:"ai"})}<div class="pair">${qe({bind:"c.offsetX",label:"點位 X",value:s.offsetX,unit:"mm",min:-500,max:500})}${qe({bind:"c.offsetY",label:"點位 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}</div>`,s.mode!=="point"&&(n+=Gn("運動",`<div class="pair">${qe({bind:"c.speed",label:"設定速度",value:s.speed,unit:"mm/s",min:1,max:800,tag:"ai"})}${qe({bind:"c.acceleration",label:"加速度",value:s.acceleration,unit:"mm/s²",min:1,max:1e4,tag:"ai"})}</div>`+(s.mode==="pattern"?Ti({bind:"c.cornerMode",label:"轉角速度",value:s.cornerMode,options:[["junction","依轉角減速（junction deviation）"],["off","不減速（v0.7 對照）"]]})+(s.cornerMode==="junction"?qe({bind:"c.junctionDeviation",label:"轉角偏差",value:s.junctionDeviation,unit:"mm",min:.001,max:5,tag:"ai",hint:"越小轉角越慢、轉角積膠越多"}):""):""))),n+=qe({bind:"c.standoff",label:"針嘴離面高度",value:s.standoff,unit:"mm",min:.1,max:20,tag:"ai",hint:"只做間距／干涉提示"}),n}function Uy(){const s=L.config,e=Us();let t="";return s.mode!=="point"&&(t+=Gn("提前關膠",qe({bind:"c.shutoffDistance",label:"終點前關膠距離",value:s.shutoffDistance,unit:"mm",min:0,max:250,tag:"ai"})+`<div class="seg full presets"><button data-shutoff="0">未補償 0 mm</button><button data-shutoff="${or.value}">初估 ${or.value} mm</button></div>`,{note:"先關膠、針嘴繼續走到終點；距離依當前加減速曲線換算成時間。提前過多會欠膠。"})),t+=Gn("退離動作",Ti({bind:"c.endMotion",label:"退離方式",value:s.endMotion,options:[["vertical","垂直抬針"],["diagonal","邊升邊回退"],["liftThenBack","先抬高再回退"],["legacy","v0.2 尾膠結算後抬針（對照）"]]})+(s.endMotion==="legacy"?"":`<div class="with-btn">${qe({bind:"c.endDwell",label:"終點停留",value:s.endDwell,unit:"s",min:0,max:5,tag:"ai"})}<button class="chip-btn" data-dwell="0.3" title="Laird 910 指南：小點黏針時，移動前加 0.3–0.5 s 等待">指南 0.3 s</button></div>`)+`<div class="pair">${qe({bind:"c.liftSpeed",label:"抬針速度",value:s.liftSpeed,unit:"mm/s",min:.1,max:200,tag:"ai"})}${qe({bind:"c.liftDistance",label:"抬針高度",value:s.liftDistance,unit:"mm",min:.1,max:50,tag:"ai"})}</div>`+(["diagonal","liftThenBack"].includes(s.endMotion)&&s.mode!=="point"?`<div class="pair">${qe({bind:"c.backtrackDistance",label:"回退距離",value:s.backtrackDistance,unit:"mm",min:0,max:50,tag:"ai"})}${qe({bind:"c.backtrackSpeed",label:"回退速度",value:s.backtrackSpeed,unit:"mm/s",min:.1,max:200,tag:"ai"})}</div>`:""),{note:"Laird 910 指南建議小點黏針時「先左右移動再抬起」並停留 0.3–0.5 s；本模型只改軌跡與時序，不預測拉絲與落點。"}),t+=e?Gn("PCP 反轉回吸",`<div class="pair">${qe({bind:"c.reverseDuration",label:"反轉時間",value:s.reverseDuration,unit:"s",min:0,max:2,tag:"ai",hint:"0 = 停用"})}${qe({bind:"c.reverseRpm",label:"反轉轉速",value:s.reverseRpm,unit:"rpm",min:0,max:300,tag:"ai"})}</div><button class="chip-btn wide" id="reverse-example">套用比較值 30 rpm / 0.05 s</button>`,{note:"只回收未出嘴的暫存量並獨立記帳；不吸回工件上的膠，未求解負壓或斷絲。"}):'<p class="note">氣壓式關閉後以「卸壓下降時間常數」近似；不提供螺桿反轉。</p>',t}function Fy(){var t;const s=L.config,e=s.workpieceKind!=="plate";return`
  <div class="pair">${qe({bind:"c.width",label:"工件長 X",value:s.width,unit:"mm",min:1,max:1e3,tag:"geo",disabled:e})}${qe({bind:"c.depth",label:"工件寬 Y",value:s.depth,unit:"mm",min:1,max:1e3,tag:"geo",disabled:e})}</div>
  <div class="pair">${qe({bind:"c.thickness",label:"厚度",value:s.thickness,unit:"mm",min:.1,max:200,tag:"geo",disabled:e})}${qe({bind:"c.fixtureHeight",label:"治具支承高度",value:s.fixtureHeight,unit:"mm",min:0,max:100,tag:"ai"})}</div>
  ${Gn("匯入工件",`<div class="pair"><label class="field"><span class="lbl">STL 單位</span><select id="import-unit"><option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option><option value="inch">inch</option></select></label><label class="field"><span class="lbl">STL 向上</span><select id="import-up"><option>Z</option><option>Y</option></select></label></div>
    <label class="file-button">載入 STL / GLB / glTF<input id="workpiece-file" type="file" accept=".stl,.glb,.gltf"></label>
    ${e?`<p class="note">${kt(((t=s.workpieceFile)==null?void 0:t.name)||"")} · ${ue(s.width,2)} × ${ue(s.depth,2)} × ${ue(s.thickness,2)} mm</p><button class="chip-btn wide" id="clear-workpiece">恢復虛擬平板</button>`:""}`,{open:e,note:"GLB／glTF 依規格以 m、Y 向上換算；STL 需指定單位與上方向。點膠面取上方水平參考面，未處理孔洞、曲面與碰撞。"})}
  <p class="note">預設 150 × 100 × 5 mm 為虛擬壓鑄鋁平板（示意 RRU 腔體一角），非客戶工件。</p>`}const Oy={equipment:Ly,heat:Dy,path:Ny,ending:Uy,workpiece:Fy};function Ai(){const s=_e("#tab-body"),e=s.scrollTop,t=jt("details.group",s).map(n=>n.open);s.innerHTML=Oy[L.tab](),jt("details.group",s).forEach((n,i)=>t[i]!==void 0&&(n.open=t[i])),s.scrollTop=e,jt("[data-tab]").forEach(n=>{n.classList.toggle("active",n.dataset.tab===L.tab),n.setAttribute("aria-selected",n.dataset.tab===L.tab)}),zy()}jt("[data-tab]").forEach(s=>s.addEventListener("click",()=>{L.tab=s.dataset.tab,_e("#tab-body").scrollTop=0,Ai()}));_e("#tab-body").addEventListener("change",s=>{const e=s.target;if(e.id==="sel-material"||e.id==="sel-arch")return Cy(_e("#sel-material").value,_e("#sel-arch").value);if(e.id==="workpiece-file")return ky(e);const t=e.dataset.bind;if(!t)return;const[n,i]=t.split(".");let r=e.value;if(e.type==="number"){if(!e.value.trim()||!e.checkValidity())return un("請輸入欄位範圍內的數值","error"),Ai();r=Number(e.value)}if(n==="x"){L.tuneFactor=r;return}if(n==="c"){i==="pressure"&&L.pressureUnit==="bar"&&(r/=Nu);const c={...L.config,[i]:r};return i==="tauOn"&&Us()&&(c.tauOff=r),_n(c)}const a=n==="h"?"heat":"pattern",o=L[a];if(L[a]={...o,[i]:r},n==="h"&&Ey.includes(i))return Xu(),Ai();_n(L.config)||(L[a]=o,Ai())});_e("#tab-body").addEventListener("click",s=>{const e=s.target.closest("button");if(e){if(e.dataset.mode)return _n({...L.config,mode:e.dataset.mode});if(e.dataset.pattern){const t=L.pattern;L.pattern={...L.pattern,pattern:e.dataset.pattern},_n(L.config)||(L.pattern=t);return}if(e.dataset.shutoff!==void 0)return _n({...L.config,shutoffDistance:Number(e.dataset.shutoff)});if(e.dataset.dwell!==void 0)return _n({...L.config,endDwell:Number(e.dataset.dwell)});switch(e.id){case"pressure-unit":return L.pressureUnit=L.pressureUnit==="psi"?"bar":"psi",Ai();case"reverse-example":return _n({...L.config,reverseRpm:30,reverseDuration:.05});case"tune":return By();case"rheo-reset":return L.heat={...L.heat,viscosity:null,yieldStress:null},Xu(),Ai();case"press":return $u();case"compare":return Kc();case"clear-workpiece":return Qe.clearImport(),_n({...L.config,width:150,depth:100,thickness:5,workpieceKind:"plate",workpieceFile:null})}}});function By(){const s=L.heat,t=(s.shape==="circle"?Math.PI*s.width**2/4:s.width*s.depth)*s.gap/1e3*L.tuneFactor;try{const n=xy(L.config,t);_n(n.config),un(n.reached?`已調整${n.key==="speed"?`移動速度為 ${ue(n.config.speed,1)} mm/s`:`開膠時間為 ${ue(n.config.gateDuration,3)} s`}，沉積 ${ue(L.run.summary.deposited,3)} mL（目標 ${ue(t,3)}）`:`已達設備限制，最接近 ${ue(L.run.summary.deposited,3)} mL（目標 ${ue(t,3)}）；請改壓力、轉速或圖樣`,n.reached?"ok":"error")}catch(n){un(n.message,"error")}}async function ky(s){const e=s.files[0];if(e){L.playing=!1;try{const t=await Qe.importFile(e,_e("#import-unit").value,_e("#import-up").value);_n({...L.config,...t})&&un("工件已載入。請核對尺寸；點膠使用上方水平參考面。","ok")}catch(t){un(t.message,"error")}s.value=""}}_e("#defaults").onclick=()=>{Qe.clearImport(),L.heat=Fu(),L.pattern=Ou(),L.overrides.delete(L.config.profile),_n(Hu(L.config.material,L.config.architecture)),un("已恢復此情境的研究預設")};function Vu(s){ui(!1),L.playing=!1,L.time=0,L.run=s,L.frame=s.frames[0],Qe.rebuild({...L.config,heatSource:{...L.heat}},s),Qe.setOverlayVisibility({heatSource:_e("#show-heat").checked,exitPath:_e("#show-exit").checked,plannedPath:_e("#show-planned").checked}),_e("[data-view=feed]").disabled=!Us(),_e("#scrubber").max=String(Math.ceil(s.duration*1e3)),Hy(),Yc(),Ai(),Fs(),Cn(),Mr()}function zy(){const s=L.config,e=s.mode==="pattern"?`依熱源 · ${ci[L.pattern.pattern]}`:s.mode==="line"?"直線":"單點",t=s.architecture==="P300"?`${ue(s.rpm,0)} rpm`:`${ue(s.pressure,0)} psi`;_e("#scenario").innerHTML=[Xt[s.material].name,s.architecture==="P300"?"P300 PCP":"R75 氣壓",e,t,s.mode==="point"?`${ue(s.gateDuration,2)} s`:`${ue(s.speed,0)} mm/s`].map((n,i)=>`<span class="${i===0?"glue-chip":""}" ${i===0?`style="--glue:#${Xt[s.material].color.toString(16).padStart(6,"0")}"`:""}>${kt(n)}</span>`).join("")}function Hy(){const s=L.run,e=s.ending;_e("#marks").innerHTML=[["off",e.commandOff,"關膠"],["arrive",e.movementEnd,"到位"],["lift",e.liftStart,"抬針"],["exit",e.motionEnd,"退離"]].map(([t,n,i])=>`<button class="mark ${t}" style="left:${n/s.duration*100}%" data-seek="${n}" title="${i} ${ue(n,3)} s"><span>${i}</span></button>`).join("")}_e("#marks").addEventListener("click",s=>{const e=s.target.closest("[data-seek]");e&&(ui(),L.playing=!1,L.time=Math.min(L.run.duration,Number(e.dataset.seek)+1e-6),Cn())});function Yc(){var s;L.chart=My(_e("#chart"),L.run,L.chartType,L.time,(s=L.baseline)!=null&&s.run&&L.baseline.run.frames?L.baseline.run:null),_e("#chart-unit").textContent=Iu[L.chartType].unit,_e("#legend-command").hidden=L.chartType!=="q",_e("#legend-base").hidden=!L.baseline}jt("[data-chart]").forEach(s=>s.addEventListener("click",()=>{L.chartType=s.dataset.chart,jt("[data-chart]").forEach(e=>e.classList.toggle("active",e===s)),Yc()}));_e("#chart").addEventListener("click",s=>{const e=_e("#chart").getBoundingClientRect(),t=L.chart.toTime((s.clientX-e.left)/e.width*1e3);ui(),L.playing=!1,L.time=Math.max(0,Math.min(L.run.duration,t)),Cn()});function gn(s,e,t,n="",i=""){return`<div class="kpi ${i}"><span>${s}</span><b>${e}<small>${t}</small></b>${n?`<em>${n}</em>`:""}</div>`}function Vy(s){if(!s)return"";const e=s.airMode==="compressible",t=e?gn("氣泡留下",`${s.remaining}`,"個",s.sealed?`封住 ${s.sealed} 次 · 排出 ${s.vented} 次${s.peakBubbleKPa?` · 壓合中最高 ${ue(s.peakBubbleKPa,0)} kPa`:""}`:"壓合過程沒有封住空氣",s.remaining?"warn":"good"):gn("氣泡","—","",s.airMode==="rigid"?"剛性牆：封住即凍結":"假設全部排出"),n=e?gn("靜置回脹",ue(s.relaxTime,s.relaxTime<10?1:0),"s",s.volumeRatio!=null?`剩餘氣泡 = 1 atm 體積 ${ue(s.volumeRatio*100,0)}%${s.settled?"":" · 仍在回脹"}`:"無剩餘氣泡",s.settled?"":"warn"):gn("靜置回脹","—","","此模式不計");return`<div class="kpis three">
    ${gn("壓到墊片",ue(s.pressTime,s.pressTime<10?1:0),"s",`${ue(s.forceKgf,1)} kgf · 座落 ${ue(s.seatPressureKPa,0)} kPa`)}
    ${t}
    ${n}
  </div>`}function Fs(){var f,g;const s=L.run,e=L.config,t=s.summary,n=s.ending,i=L.heat,a=(i.shape==="circle"?Math.PI*i.width**2/4:i.width*i.depth)*i.gap/1e3,o=(f=L.press)==null?void 0:f.result.summary,c=(g=L.press)==null?void 0:g.stale,l=n.endToMiddleRatio,h=_=>_>=95?"good":_>=80?"warn":"bad",u=_=>{const p=2*Math.PI*34;return`<svg viewBox="0 0 84 84" class="ring ${h(_)}"><circle cx="42" cy="42" r="34" class="track"/><circle cx="42" cy="42" r="34" class="val" stroke-dasharray="${Math.min(100,_)/100*p} ${p}" transform="rotate(-90 42 42)"/><text x="42" y="46" text-anchor="middle">${ue(_,1)}%</text></svg>`},d=[...s.warnings,...L.press&&!c?L.press.result.warnings:[]];_e("#results").innerHTML=`
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">完整試驗預估</span><span class="pill">${kt(e.profile)}</span></div>
    <div class="hero"><b>${ue(t.deposited,3)}</b><span>mL 工件沉積</span><em>${ue(t.deposited*e.density,3)} g · 出口總計 ${ue(t.output,3)} mL</em></div>
    <div class="kpis">
      ${gn("熱源需求比",ue(a>0?t.deposited/a:0,2),"×",`需 ${ue(a,3)} mL`,a>0&&t.deposited/a<1?"bad":"")}
      ${gn("開膠時間",ue(s.gate,2),"s",`動作完成 ${ue(n.motionEnd,2)} s`)}
      ${gn("膠高 / 寬",`${ue(t.maxHeight,2)} / ${ue(t.maxWidth,1)}`,"mm",`針距 ${ue(e.standoff,1)} mm`,t.maxHeight>e.standoff?"warn":"")}
      ${gn("末段 / 中段",l===null?"—":ue(l,2),"×","0.5–1.5 為 AI 比較帶",l!==null&&(l<.5||l>1.5)?"warn":"")}
    </div>
  </section>
  <section class="card-sec press-sec">
    <div class="sec-head"><span class="eyebrow">壓合 · 熱阻估算</span>${L.press?`<span class="pill ${c?"pill-warn":""}">${c?"設定已變更":`${ue(L.press.settings.gap,2)} mm · ${Ty[L.press.settings.airMode]}`}</span>`:""}</div>
    ${o&&!c?`<div class="press-grid">${u(o.coveredPercent)}<div class="press-sum"><b>熱源等效覆蓋</b><span>沉積 ${ue(o.depositedMl,3)} mL = 間隙體積 ${ue(o.volumeRatio,2)}×</span><span>${kt(o.material)} · k ${o.thermal.conductivity} W/m·K</span></div></div><div class="kpis">
          ${gn("夾氣區",o.voidCount,"處",o.voidCount?`${ue(o.voidAreaMm2,1)} mm² · ${ue(o.voidPercent,1)}%`:"未偵測到",o.voidCount?"bad":"good")}
          ${gn("溢出熱源",ue(o.squeezeOutMm,1),"mm",`熱源外 ${ue(o.outsideMl,3)} mL`,o.squeezeOutMm>3?"warn":"")}
          ${gn("TIM 溫升",ue(o.thermal.rise,2),"°C",`滿覆蓋 ${ue(o.thermal.idealRise,2)} °C @ ${ue(o.thermal.power,0)} W`,o.thermal.rise>o.thermal.idealRise*1.1?"warn":"")}
          ${gn("熱阻",ue(o.thermal.resistance,4),"K/W",`θ ${ue(o.thermal.impedanceCm2,3)} °C·cm²/W`)}
        </div>
        ${Vy(o.press)}
        <div class="press-actions"><button class="chip-btn" id="press-replay">${St.play}重播壓合</button><button class="chip-btn" id="press-save">保存壓合基準</button></div>
        ${L.pressBaseline?`<div class="compare-box"><b>壓合基準 → 目前</b><p>覆蓋 ${ue(L.pressBaseline.summary.coveredPercent,1)}% → ${ue(o.coveredPercent,1)}%　夾氣 ${L.pressBaseline.summary.voidCount} → ${o.voidCount}　溫升 ${ue(L.pressBaseline.summary.thermal.rise,2)} → ${ue(o.thermal.rise,2)} °C</p><small>${kt(L.pressBaseline.describe)}</small></div>`:""}`:`<div class="cta"><p>${c?"熱源或點膠設定已變更，請重新模擬。":"以完整試驗的沉積分布估算壓合覆蓋、夾氣與熱阻。"}</p><button class="primary" id="press-cta">${St.press}<span>模擬壓合</span></button><button class="secondary" id="compare-cta">${St.compare}<span>比較所有圖樣</span></button></div>`}
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">即時帳目</span><span class="pill mono" id="led-t">t = 0.000 s</span></div>
    <dl class="ledger">
      <div><dt>TCP X / Y / Z</dt><dd id="led-xyz"></dd></div>
      <div><dt>移動速度</dt><dd id="led-v"></dd></div>
      <div><dt>膠筒剩餘</dt><dd id="led-rem"></dd></div>
      <div><dt>工件沉積</dt><dd id="led-dep"></dd></div>
      <div><dt>離面後出膠（形狀未定）</dt><dd id="led-off"></dd></div>
      ${Us()?'<div><dt>PCP 暫存 / 回收</dt><dd id="led-pend"></dd></div>':""}
      <div><dt>預填固定持膠</dt><dd id="led-fixed"></dd></div>
      <div><dt>體積對帳誤差</dt><dd id="led-bal"></dd></div>
    </dl>
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">收尾時序</span></div>
    <ol class="timeline">
      <li class="off"><b>${ue(n.commandOff,3)} s</b>關膠指令</li>
      <li class="arrive"><b>${ue(n.movementEnd,3)} s</b>到達終點</li>
      <li class="lift"><b>${ue(n.liftStart,3)} s</b>開始抬針</li>
      <li class="exit"><b>${ue(n.motionEnd,3)} s</b>退離完成</li>
    </ol>
    <p class="note">停移後流出 ${ue(n.afterStopVolume*1e3,2)} µL（${ue(n.afterStopPercent,1)}%）；其中離面後 ${ue(t.offSurface*1e3,2)} µL 未加入膠形。${Us()&&n.reverseStart!==null?`回收暫存 ${ue(t.recovered*1e3,2)} µL。`:""}</p>
  </section>
  <details class="card-sec warnings" ${d.length>4?"":"open"}><summary><span class="eyebrow">提醒與模型界線</span><span class="count">${d.length}</span></summary>${d.map(_=>`<p>${kt(_)}</p>`).join("")}</details>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">基準比較</span><button class="chip-btn" id="save-baseline">保存目前為基準</button></div>
    ${Gy()}
  </section>
  <section class="card-sec exports">
    <button class="chip-btn" id="export-json">${St.download}配置 JSON</button>
    <button class="chip-btn" id="export-csv">${St.download}結果 CSV</button>
    <button class="chip-btn" id="export-image">${St.download}畫面 PNG</button>
  </section>
  <p class="fineprint">工程假設、未經實機校準；23 °C 參考條件。結果供方案相對比較，不能作為量產配方或驗收依據。</p>`}function Gu(s,e){var n,i;const t=s.mode==="pattern"?`${ci[(n=s.pathSettings)==null?void 0:n.pattern]||""}（間距 ${(i=s.pathSettings)==null?void 0:i.spacing} mm）`:s.mode==="line"?`直線 ${s.lineLength} mm`:`單點 ${s.gateDuration} s`;return`${Xt[s.material].name} · ${s.architecture} · ${t} · ${s.architecture==="P300"?`${s.rpm} rpm`:`${ue(s.pressure,1)} psi`} · ${s.speed} mm/s${e?` · 熱源 ${e.width}${e.shape==="circle"?" Ø":` × ${e.depth}`} mm / ${e.gap} mm`:""}`}function Gy(){var i,r;const s=L.baseline;if(!s)return'<p class="note">保存基準後再調整參數，比較沉積量與配置差異；流量曲線會疊上基準。</p>';const e=L.run.summary.deposited-s.summary.deposited,t=Object.keys(L.config).filter(a=>typeof L.config[a]!="object"&&L.config[a]!==s.config[a]);for(const a of new Set([...Object.keys(L.config.pathSettings||{}),...Object.keys(s.config.pathSettings||{})]))((i=L.config.pathSettings)==null?void 0:i[a])!==((r=s.config.pathSettings)==null?void 0:r[a])&&t.push("pathSettings."+a);const n=(a,o)=>{var c;return o.startsWith("pathSettings.")?((c=a.pathSettings)==null?void 0:c[o.slice(13)])??"—":a[o]};return`<div class="compare-box"><div class="delta"><span>${ue(s.summary.deposited,3)} → ${ue(L.run.summary.deposited,3)} mL</span><b class="${e>=0?"up":"down"}">${e>=0?"+":""}${ue(e,3)} mL</b></div>
    <details><summary>${t.length?`${t.length} 個欄位不同`:"與基準配置相同"}</summary>${t.map(a=>`<p><code>${kt(a)}</code> ${kt(n(s.config,a))} → ${kt(n(L.config,a))}</p>`).join("")||"<p>無</p>"}</details></div>`}_e("#results").addEventListener("click",s=>{const e=s.target.closest("button");if(e)switch(e.id){case"press-cta":return $u();case"compare-cta":return Kc();case"press-replay":return jc(!0);case"press-save":return L.pressBaseline={summary:structuredClone(L.press.result.summary),describe:Gu(L.config,L.press.settings)},un("已保存壓合基準","ok"),Fs();case"save-baseline":return L.baseline={config:structuredClone(L.config),summary:structuredClone(L.run.summary),run:{frames:L.run.frames.map(t=>({t:t.t,q:t.q,output:t.output,speed:t.speed,z:t.z})),duration:L.run.duration}},un("已保存完整試驗結果為基準","ok"),Yc(),Fs();case"export-json":return Zc(JSON.stringify(ju(),null,2),"TIM_工程假設_試驗配置.json","application/json");case"export-csv":return $y();case"export-image":return qy()}});function Cn(){const s=L.run,e=L.frame=Ed(s,L.time);L.press||Qe.update(e),_e("#hud-t").textContent=ue(e.t,3),_e("#hud-out").textContent=ue(e.output,3),_e("#hud-q").textContent=ue(e.q,3),_e("#hud-xyz").textContent=`${ue(e.x,1)}, ${ue(e.y,1)}, ${ue(e.z,1)}`;const t=(i,r)=>{const a=document.getElementById(i);a&&(a.textContent=r)};t("led-t",`t = ${ue(e.t,3)} s`),t("led-xyz",`${ue(e.x,1)} / ${ue(e.y,1)} / ${ue(e.z,2)} mm`),t("led-v",`${ue(e.speed,1)} mm/s`),t("led-rem",`${ue(e.remaining,3)} mL`),t("led-dep",`${ue(e.deposited,5)} mL`),t("led-off",`${ue(e.offSurface*1e3,2)} µL`),t("led-pend",`${ue(e.pending*1e3,2)} / ${ue(e.recovered*1e3,2)} µL`),t("led-fixed",`${ue(e.fixed,3)} mL`),t("led-bal",`${e.balance.toExponential(1)} mL`),_e("#phase").textContent=L.press?"壓合後估算 · 未校準":L.time===0?"就緒":L.time>=s.duration?"試驗完成":L.playing?e.phase:`已暫停 · ${e.phase}`,_e(".phase").dataset.state=L.press?"press":e.command?"dispense":L.time>=s.duration?"done":"idle";const n=L.playing?"暫停":L.time>=s.duration?"再次播放":L.time>0?"繼續":"開始試驗";_e("#play").innerHTML=`${L.playing?St.pause:St.play}<span>${n}</span>`,_e("#time-readout").textContent=`${ue(e.t,3)} / ${ue(s.duration,3)} s`,_e("#scrubber").value=String(Math.round(L.time*1e3)),_e("#scrubber").style.setProperty("--p",`${L.time/s.duration*100}%`),by(_e("#chart"),L.chart,L.time)}_e("#play").onclick=()=>{ui(),L.time>=L.run.duration&&(L.time=0),L.playing=!L.playing,L.clock=null,Cn()};_e("#restart").onclick=()=>{ui(),L.playing=!1,L.time=0,Cn()};_e("#step").onclick=()=>{ui(),L.playing=!1,L.time=Math.min(L.run.duration,L.time+.010001),Cn()};_e("#scrubber").oninput=s=>{ui(),L.playing=!1,L.time=Math.min(L.run.duration,+s.target.value/1e3),Cn()};document.addEventListener("keydown",s=>{s.target.closest("input, select, textarea, dialog")||s.code==="Space"&&(s.preventDefault(),_e("#play").click())});document.addEventListener("visibilitychange",()=>{document.hidden&&L.playing&&(L.playing=!1,L.clock=null,Cn())});function Wu(s){L.playing?(L.clock!==null&&(L.time=Math.min(L.run.duration,L.time+(s-L.clock)/1e3*Number(_e("#playback-speed").value))),L.clock=s,L.time>=L.run.duration&&(L.playing=!1),Cn()):L.clock=null,requestAnimationFrame(Wu)}function Mr(){jt("[data-corner]").forEach(s=>s.classList.toggle("active",!Qe.freeOrbit&&Number(s.dataset.corner)===Qe.isoCorner)),_e("#free-orbit").setAttribute("aria-pressed",String(Qe.freeOrbit)),_e("#projection").setAttribute("aria-pressed",String(Qe.projection==="persp")),_e("#projection-label").textContent=Qe.projection==="persp"?"透視":"正交",jt("[data-view]").forEach(s=>s.classList.toggle("active",s.dataset.view===Qe.mode)),_e("#camera-hint").textContent=Qe.freeOrbit?"左鍵旋轉 · 右鍵平移 · 滾輪縮放 · Home 重設":"拖曳平移 · 滾輪縮放 · Home 重設",_e("#view-label").textContent=`${oy[Qe.mode]} · ${Qe.freeOrbit?"自由旋轉":`等角 ${Qe.isoCorner+1}`}${Qe.projection==="persp"?" · 透視":""}`,_e("#geometry-note").textContent=L.press?"透明板與覆蓋為未校準幾何估算":["whole","work","head","feed"].includes(Qe.mode)?"設備依公開外形參考 · 局部、支架與管路為示意":"近看隱藏上部機構 · 膠形為幾何示意"}jt("[data-view]").forEach(s=>s.addEventListener("click",()=>{Qe.fit(s.dataset.view),L.press||Qe.update(L.frame)}));jt("[data-corner]").forEach(s=>s.addEventListener("click",()=>Qe.setCorner(Number(s.dataset.corner))));_e("#free-orbit").onclick=()=>Qe.setFreeOrbit(!Qe.freeOrbit);_e("#projection").onclick=()=>{Qe.setProjection(Qe.projection==="ortho"?"persp":"ortho"),Mr()};_e("#reset-camera").onclick=()=>{Qe.setFreeOrbit(!1,!1),Qe.fit(Qe.mode)};_e("#show-exit").onchange=s=>Qe.setOverlayVisibility({exitPath:s.target.checked});_e("#show-planned").onchange=s=>Qe.setOverlayVisibility({plannedPath:s.target.checked});_e("#show-heat").onchange=s=>Qe.setOverlayVisibility({heatSource:s.target.checked});_e("#theme").onclick=()=>{const s=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=s,Uu.set("tim-theme",s),Qe.setTheme(s),_e("#theme").innerHTML=s==="dark"?St.sun:St.moon};_e("#theme").innerHTML=qc==="dark"?St.sun:St.moon;function Xu(){L.press&&!L.press.stale&&(L.press.stale=!0,Fs())}function ui(s=!0){cancelAnimationFrame(L.pressAnim),L.pressAnim=null,L.press&&(L.press=null,Qe.clearCompression(),_e("#press-bar").hidden=!0,s&&(Fs(),Cn(),Mr()))}async function $u(){if(L.busy)return;L.busy=!0,document.body.classList.add("busy"),jt("#press, #press-cta").forEach(t=>t.querySelector("span").textContent="計算中…");const s={...L.heat},e=L.run;try{const t=await Bu("compress",{run:Ry(e),heat:s,frames:24});if(e!==L.run||JSON.stringify(s)!==JSON.stringify(L.heat)){un("計算期間設定已變更，請重新模擬壓合");return}ui(!1),L.playing=!1,L.time=e.duration,Cn(),L.press={result:t,settings:s,stale:!1};const n=Qe.showCompression(t,s);Qe.fit("heat");const i=_e("#press-scrub");i.max=String(n.frameCount-1),_e("#press-bar").hidden=!1,Fs(),Cn(),Mr(),jc(!0)}catch(t){un(`壓合估算失敗：${t.message}`,"error")}finally{L.busy=!1,document.body.classList.remove("busy"),jt("#press, #press-cta").forEach(t=>t.querySelector("span")&&(t.querySelector("span").textContent="模擬壓合"))}}function qu(s){var a;const e=Qe.compression;if(!e)return;Qe.setCompressionFrame(s);const t=e.frames[s];_e("#press-scrub").value=String(s);const n=((a=L.press.result.summary.press)==null?void 0:a.pressTime)??0,i=t.phase==="relax"?`靜置 +${ue(t.t-n,t.t-n<10?1:0)} s`:`${t.t!==void 0?`壓合 ${ue(t.t,1)} s · `:""}間隙 ${ue(t.gap,3)} mm`,r=t.bubbles?` · 氣泡 ${t.bubbles}（${ue(t.bubbleKPa,0)} kPa）`:"";_e("#press-gap").textContent=`${i} · 覆蓋 ${ue(t.coveredPercent??L.press.result.summary.coveredPercent,1)}%${r}`}function jc(s){const e=Qe.compression;if(!e)return;cancelAnimationFrame(L.pressAnim);const t=e.frameCount,n=performance.now(),i=s?0:Number(_e("#press-scrub").value),r=2400*((t-1-i)/Math.max(1,t-1)),a=o=>{const c=Math.max(i,Math.min(t-1,i+Math.round(Math.max(0,o-n)/Math.max(1,r)*(t-1-i))));qu(c),L.pressAnim=c<t-1?requestAnimationFrame(a):null};L.pressAnim=requestAnimationFrame(a)}_e("#press-scrub").oninput=s=>{cancelAnimationFrame(L.pressAnim),qu(Number(s.target.value))};_e("#press-play").onclick=()=>jc(Number(_e("#press-scrub").value)>=Qe.compression.frameCount-1);_e("#press-exit").onclick=()=>ui();jt("[data-press-color]").forEach(s=>s.addEventListener("click",()=>{jt("[data-press-color]").forEach(e=>e.classList.toggle("active",e===s)),Qe.setCompressionColor(s.dataset.pressColor)}));const Wy=["line","n","serpentine","spiral","perimeter"];async function Kc(){var a,o;const s=_e("#compare-dialog");s.open||s.showModal();const e=((a=L.compare)==null?void 0:a.matchVolume)??!0,t=((o=L.compare)==null?void 0:o.factor)??L.tuneFactor,n=`<div class="compare-controls"><label class="chk"><input type="checkbox" id="cmp-match" ${e?"checked":""}>等膠量比較（自動調整速度到需求 ×</label><input type="number" id="cmp-factor" value="${t}" min="0.3" max="5" step="any"><span>）</span><button class="primary" id="cmp-run">${St.compare}<span>重新計算</span></button></div>`;_e("#compare-body").innerHTML=`${n}<div class="progress"><i style="width:0%"></i></div><p class="note" id="cmp-status">計算中…</p>`,Yu();const i={...L.config,pathSettings:ku()},r={...L.heat,cellSize:Math.max(.5,L.heat.cellSize)};try{const c=await Bu("compare",{config:i,heat:r,patterns:Wy,factor:t,matchVolume:e},(l,h)=>{const u=_e("#compare-body .progress i");u&&(u.style.width=`${l*100}%`);const d=_e("#cmp-status");d&&(d.textContent=`計算 ${ci[h]}…`)});L.compare={...c,matchVolume:e,factor:t},Xy(n)}catch(c){_e("#cmp-status").textContent=c.message}}function Yu(){_e("#cmp-run").onclick=()=>{L.compare={matchVolume:_e("#cmp-match").checked,factor:Number(_e("#cmp-factor").value)||1.2},Kc()}}function Xy(s){const e=L.compare,t=e.rows.filter(o=>o.ok),n=(o,c)=>t.length?t.reduce((l,h)=>(c>0?h[o]>l[o]:h[o]<l[o])?h:l)[o]:null,i=n("coveredPercent",1),r=n("rise",-1),a=n("cycle",-1);_e("#compare-body").innerHTML=`${s}
  <p class="note">熱源 ${L.heat.shape==="circle"?`Ø${L.heat.width}`:`${L.heat.width} × ${L.heat.depth}`} mm、間隙 ${L.heat.gap} mm，需求 ${ue(e.required,3)} mL。${e.matchVolume?`每個圖樣自動調整移動速度，使沉積 ≈ 需求 × ${e.factor}。`:"沿用目前速度與流量，膠量隨路徑長改變。"}其他設定沿用目前配置；網格 ≥ 0.5 mm；夾氣處理：${wy[L.heat.airMode]}，${L.heat.pressKgf} kgf 壓到墊片${L.heat.airMode==="compressible"?`、靜置 ${L.heat.settleTime} s`:""}。</p>
  <div class="table-scroll"><table class="cmp"><thead><tr><th>圖樣</th><th>速度<br><small>mm/s</small></th><th>沉積<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溢出<br><small>mm</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
  ${e.rows.map(o=>o.ok?`<tr><td><span class="pat"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${Du[o.pattern]}</svg>${ci[o.pattern]}</span></td><td>${ue(o.speed,1)}</td><td class="${o.reached?"":"warn"}" title="${o.reached?"":"加速度與轉角限制了平均速度，提高設定速度也無法再減少膠量；請降低壓力／轉速或增加間距"}">${ue(o.deposited,3)} <small>(${ue(o.volumeRatio,2)}×)</small>${o.reached?"":" ⚠"}</td><td class="${o.coveredPercent===i?"best":""}">${ue(o.coveredPercent,1)}</td><td class="${o.voidCount?"bad":""}">${o.voidCount} / ${ue(o.voidAreaMm2,1)}</td><td>${ue(o.squeezeOutMm,1)}</td><td class="${o.rise===r?"best":""}">${ue(o.rise,2)}</td><td class="${o.cycle===a?"best":""}">${ue(o.cycle,2)}</td><td><button class="chip-btn" data-apply="${o.pattern}" data-speed="${o.speed}">套用</button></td></tr>`:`<tr><td>${ci[o.pattern]}</td><td colspan="8" class="bad">${kt(o.error)}</td></tr>`).join("")}
  </tbody></table></div>
  ${e.rows.some(o=>o.ok&&!o.reached)?'<p class="note warn-note">⚠ 該圖樣在目前加速度與轉角限制下無法達到目標膠量（提高設定速度已無效）；請降低壓力或轉速、加大間距，或提高加速度後再比較。</p>':""}
  <p class="note">綠色為各欄最佳值。夾氣與覆蓋來自未校準的 Hele-Shaw 近似；動作時間含收尾、不含上下料。請以透明板實測確認後再定案。</p>`,Yu()}_e("#compare-body").addEventListener("click",s=>{var n;const e=s.target.closest("[data-apply]");if(!e)return;L.pattern={...L.pattern,pattern:e.dataset.apply};const t={...L.config,mode:"pattern"};(n=L.compare)!=null&&n.matchVolume&&(t.speed=Number(e.dataset.speed)),_e("#compare-dialog").close(),L.tab="path",_n(t)&&un(`已套用 ${ci[e.dataset.apply]}`,"ok")});function Zc(s,e,t){const n=document.createElement("a"),i=URL.createObjectURL(s instanceof Blob?s:new Blob([s],{type:t}));n.href=i,n.download=e,n.click(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}function ju(){var s;return{application:"TIM Dispensing Lab",version:gr,date:new Date().toISOString(),label:_a,validatedAgainstHardware:!1,parameterRegistryVersion:Vn.schema_version,parameterUpdates:Es,modelAssumptions:{flow:"delayed_first_order",puttyFlowLaw:"tds_reference_point_power_law_tube",motion:L.config.cornerMode==="junction"?"lookahead_trapezoid_junction_deviation":"single_arc_length_trapezoid",lineGeometry:"shared_half_ellipse_rings_total_volume_normalized",pointGeometry:"spherical_cap",surfaceAllocation:"outlet_before_first_lift_only_except_legacy",squeeze:`parallel_plate_hele_shaw_constant_force_to_spacer_${L.heat.airMode}_air`,thermal:"one_dimensional_bulk_plus_tds_derived_contact",hardwareAppearance:"reference_envelopes_with_assumed_details_not_OEM_CAD"},config:L.config,heatSource:L.heat,pattern:L.pattern,hardwareReference:qx[L.config.architecture],material:Xt[L.config.material],referenceParameters:Vn.parameters,additionalDefaults:[or,...vc,...xc],sources:Vn.sources,warnings:L.run.warnings,summary:L.run.summary,motion:L.run.motion,compression:L.press&&!L.press.stale?{settings:L.press.settings,summary:L.press.result.summary,voids:L.press.result.voids.slice(0,50),warnings:L.press.result.warnings,baseline:L.pressBaseline}:null,patternComparison:((s=L.compare)==null?void 0:s.rows)||null,baseline:L.baseline?{config:L.baseline.config,summary:L.baseline.summary}:null,view:{mode:Qe.mode,projection:Qe.projection,isoCorner:Qe.isoCorner,freeOrbit:Qe.freeOrbit,time:L.frame.t,cameraPosition:Qe.camera.position.toArray(),cameraTarget:Qe.controls.target.toArray()},note:"工件檔案不內嵌，僅保存名稱與雜湊；重新載入需原檔。"}}function $y(){var r;const s=[["t","time_s"],["command","command_0_1"],["target","target_mL_s"],["q","outflow_mL_s"],["output","outlet_mL"],["mass","mass_g"],["s","arc_length_mm"],["x","TCP_X_mm"],["y","TCP_Y_mm"],["z","TCP_Z_mm"],["speed","speed_mm_s"],["remaining","cartridge_mL"],["pending","pending_mL"],["fixed","fixed_primed_mL"],["balance","balance_error_mL"],["deposited","deposited_mL"],["offSurface","off_surface_mL"],["recovered","recovered_pending_mL"],["vx","velocity_X_mm_s"],["vy","velocity_Y_mm_s"],["vz","velocity_Z_mm_s"],["phase","phase"],["depositionBalance","deposition_balance_mL"]],e=a=>'"'+String(a).replaceAll('"','""')+'"',t=ju(),n=JSON.stringify({config:L.config,heatSource:L.heat,sourceVersion:Vn.schema_version,parameterUpdates:Es.map(a=>[a.id,a.value]),modelAssumptions:t.modelAssumptions,compression:((r=t.compression)==null?void 0:r.summary)||null,ending:L.run.ending,warnings:L.run.warnings}),i=[["label","app_version","profile",...s.map(a=>a[1]),"run_metadata_json_first_row"].join(","),...L.run.frames.map((a,o)=>[_a,gr,L.config.profile,...s.map(([c])=>a[c]),o===0?n:""].map(e).join(","))];Zc("\uFEFF"+i.join(`\r
`),"TIM_未校準_試驗結果.csv","text/csv;charset=utf-8")}async function qy(){var i;const s=new Image;s.src=Qe.screenshot(),await s.decode();const e=document.createElement("canvas");e.width=s.width,e.height=s.height+110;const t=e.getContext("2d");t.fillStyle="#f4f6f8",t.fillRect(0,0,e.width,e.height),t.drawImage(s,0,0),t.fillStyle="#16181b",t.font="bold 20px sans-serif",t.fillText(`TIM 點膠研究室 v${gr} · ${_a}`,24,s.height+32),t.font="15px sans-serif",t.fillStyle="#4f5157",t.fillText(`${Gu(L.config,L.heat)} · t=${L.frame.t.toFixed(3)} s · 沉積 ${L.run.summary.deposited.toFixed(4)} mL`,24,s.height+60);const n=(i=L.press)==null?void 0:i.result.summary;t.fillText(n?`壓合估算：覆蓋 ${n.coveredPercent.toFixed(1)}% · 夾氣 ${n.voidCount} 處 ${n.voidAreaMm2.toFixed(1)} mm² · 溫升 ${n.thermal.rise.toFixed(2)} °C（未校準）`:"工件沉積與離面後出膠分帳；虛線為針尖路徑，非膠絲。mm 真實比例。",24,s.height+86),e.toBlob(r=>Zc(r,n?"TIM_未校準_壓合畫面.png":"TIM_未校準_點膠畫面.png","image/png"))}const Yy={published_typical:"原廠典型",published_rated:"原廠額定",published_limit:"原廠上限",derived:"公式／資料推導",engineering_assumption:"AI 工程初估"};function jy(){const s=new Map(Es.map(n=>[n.id,n])),e=new Map(Vn.parameters.map(n=>[n.id,n])),t=[...Es.map(n=>({...n,v1:!0})),...xc.map(n=>({...n,v1:!0})),or,...vc,...Vn.parameters.filter(n=>!s.has(n.id))];_e("#source-rows").innerHTML=t.map(n=>{const i=n.v1&&e.get(n.id);return`<tr class="${n.v1?"v1":""}"><td><code>${kt(n.id)}</code>${n.v1?`<em class="tag tag-derived">v${n.since||"1.0"} 更新</em>`:""}</td><td>${kt(n.value)} ${kt(n.unit||"")}${i?`<br><small>原 v0.3：${kt(i.value)}</small>`:""}</td><td>${kt(Yy[n.evidence]||n.evidence)}<br><small>${kt(n.role||"控制初值")}</small></td><td>${kt(n.basis)}<br><small>${kt((n.source_refs||[]).join(" / "))}</small></td></tr>`}).join("")}_e("#help-body").innerHTML=`
<ol class="steps">
  <li><b>設備</b>：選膠材（Tputty 910／Tgrease 2500）與架構（R75 氣壓／P300 PCP），調整壓力或轉速。</li>
  <li><b>熱源</b>：輸入元件接觸面尺寸、位置、組裝間隙與功耗。可「自動調整移動速度」讓膠量 = 間隙體積 × 係數。</li>
  <li><b>路徑</b>：依熱源選中心線／N／蛇形／螺旋／外框，或直線、單點。多段路徑在轉角依 junction deviation 減速。</li>
  <li><b>播放</b>：空白鍵播放／暫停；拖曳時間軸或點曲線跳到該時刻；時間軸上的標記可跳到關膠、到位、抬針、退離。</li>
  <li><b>壓合</b>：按「模擬壓合」看透明板以定力壓到墊片、膠膜擴散、氣泡（紅色）壓縮／遷移／排出，以及靜置後的回脹；可切換「前緣時序」著色。夾氣處理可在熱源頁切換為 v1.0 剛性牆或全部排出作對照。</li>
  <li><b>比較</b>：「比較所有圖樣」在等膠量下比較覆蓋、夾氣、溢膠、溫升與動作時間，可直接套用。</li>
</ol>
<p class="muted">視角：全機／工作區／機頭／供膠站／近看／跟隨；①–④ 等角方向；360° 自由旋轉；正交與透視可切換。所有零件以 mm 真實比例繪製；設備外形依公開尺寸，細部與管路為示意。</p>
<p class="muted">本工具所有結果為工程假設、未經實機校準，用於縮小試驗範圍與比較方案，不能取代透明板或首件驗證。</p>`;_e("#show-sources").onclick=()=>{jy(),_e("#sources-dialog").showModal()};_e("#help").onclick=()=>_e("#help-dialog").showModal();jt("[data-close]").forEach(s=>s.onclick=()=>s.closest("dialog").close());jt("dialog").forEach(s=>s.addEventListener("click",e=>e.target===s&&s.close()));L.config=Hu();Vu(ha(L.config));requestAnimationFrame(Wu);
