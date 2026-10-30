(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const $u="0.3",Yu="2026-10-24",qu="preimplementation_specification",ju=!1,Ku=!1,Zu="工程假設情境｜未經實機校準",Ju={L910_TDS:{url:"https://www.laird.com/sites/default/files/2025-05/THR-DS-Tputty%20910%20RevC.pdf",local:"sources/Laird/Tputty910_TDS_20250422_RevC.pdf",version:"2025-04-22 Rev C"},G2500_TDS:{url:"https://www.laird.com/sites/default/files/2025-07/MKT-DOC-1592%20Tgrease%202500%20Data%20Sheet%2006272025.pdf",local:"sources/Laird/Tgrease2500_TDS_20250627.pdf",version:"2025-06-27"},L910_GUIDE:{url:"https://www.laird.com/sites/default/files/2024-06/A18720-00%20RevA%20Tputty%20910%20%20Dispensing%20Guideline.pdf",local:"sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf",page:5},DM22:{local:"sources/Equipment/Graco_DM22_Manual_3A7931EN_D.pdf",version:"3A7931D",page:26},PCP:{local:"sources/Equipment/Graco_PCP_Repair_3A5364EN_L.pdf",version:"3A5364L",page:40},X100:{local:"sources/Equipment/Nordson_PerformusX_TDS_v110624.pdf"},USER:{description:"2026-10-24 使用者授權：未獲廠商回覆也可先建立有註記的工程預設；本次停在模擬器開發之前。"},METHOD:{url:"https://doc.comsol.com/6.3/doc/com.comsol.help.cfd/cfd_ug_fluidflow_single.06.082.html",description:"用於說明完整非牛頓物性需要額外參數；未拿其軟體預設充當 TIM 物性。"}},Qu=JSON.parse('[{"id":"material.putty.density","value":3.2,"unit":"g/mL","evidence":"published_typical","basis":"TDS 典型值；不是此批膠實測。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"material.grease.density","value":3.4,"unit":"g/mL","evidence":"published_typical","basis":"TDS 典型值。","source_refs":["G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"material.grease.viscosity_reference","value":2500,"unit":"Pa.s","evidence":"derived","basis":"2500000 cP /1000；23°C、TF spindle、2rpm、Helipath。","source_refs":["G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.mass_rate","value":75,"unit":"g/min","evidence":"published_typical","basis":"75cc taper tip、90psi；完整幾何及溫度未知。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.pressure","value":90,"unit":"psi","evidence":"published_typical","basis":"原測試值；壓力位置與表壓/絕壓待確認。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.volume_rate","value":0.390625,"unit":"mL/s","evidence":"derived","basis":"75/3.2/60；不是新實測。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"scenario.temperature","value":23,"unit":"degC","evidence":"engineering_assumption","basis":"固定等溫開發基準；不宣稱是 910 原流率試驗溫度。","source_refs":["USER"],"sensitivity_range":[23,23],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"scenario.pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"虛擬氣壓式基準，明確選表壓；不作實機操作建議。","source_refs":["USER"],"sensitivity_range":[30,90],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"scenario.reference_pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"將 TDS 未完整交代的壓力映射到虛擬模型；映射本身是假設。","source_refs":["L910_TDS","USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.id","value":3.175,"unit":"mm","evidence":"engineering_assumption","basis":"借用指南 0.125in 尺度，虛擬等徑圓管；非原測試針嘴。","source_refs":["L910_GUIDE","USER"],"sensitivity_range":[2,4],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.length","value":10,"unit":"mm","evidence":"engineering_assumption","basis":"定義虛擬有效直管長 10mm，不由 7018555 總長反推。","source_refs":["USER"],"sensitivity_range":[5,20],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.reference_id","value":3.175,"unit":"mm","evidence":"engineering_assumption","basis":"固定正規化幾何；換現用針嘴時不能一併改此基準。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.reference_length","value":10,"unit":"mm","evidence":"engineering_assumption","basis":"固定正規化幾何。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.reference_rate","value":0.390625,"unit":"mL/s","evidence":"engineering_assumption","basis":"將 TDS 參考量映射到虛擬基準；非該幾何實測。","source_refs":["L910_TDS","USER"],"sensitivity_range":[0.1953125,0.78125],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.pressure_exponent","value":1,"unit":"1","evidence":"engineering_assumption","basis":"中性的線性壓力起點，不是 HB 的流動指數。","source_refs":["USER"],"sensitivity_range":[0.7,2],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.geometry_exponent_d","value":4,"unit":"1","evidence":"engineering_assumption","basis":"僅作等效牛頓圓管尺度比較；非真實 putty 的幾何律。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.geometry_exponent_L","value":-1,"unit":"1","evidence":"engineering_assumption","basis":"等效直管長度尺度比較。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"grease_proxy.constant_viscosity","value":2500,"unit":"Pa.s","evidence":"engineering_assumption","basis":"暫把單一測試黏度當等效常數；此用法未驗證。","source_refs":["G2500_TDS","USER"],"sensitivity_range":[625,10000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"grease_proxy.reference_rate","value":0.061906507721617925,"unit":"mL/s","evidence":"derived","basis":"虛擬等徑圓管的 Poiseuille 起算值；依上述未驗證常黏度。","source_refs":["USER","G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"derived_check_only","scope":"R75_grease","estimated_by":null,"validated_against_hardware":false},{"id":"r75.cartridge.nominal_volume","value":75,"unit":"mL","evidence":"published_typical","basis":"910 包材標稱容量。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75","estimated_by":null,"validated_against_hardware":false},{"id":"r75.cartridge.initial_fill","value":56,"unit":"mL","evidence":"published_typical","basis":"910 TDS 裝填；grease 配置沿用時屬另行虛擬裝填。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75_putty","estimated_by":null,"validated_against_hardware":false},{"id":"r75.grease.initial_fill","value":56,"unit":"mL","evidence":"engineering_assumption","basis":"為比較採相同虛擬裝填，不宣稱 grease 有此商品包裝。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.cartridge.bore","value":38,"unit":"mm","evidence":"engineering_assumption","basis":"配合 75mL 和已知外形選的虛擬內徑，非 Laird 圖面。","source_refs":["USER"],"sensitivity_range":[36,40],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.cartridge.unusable_residual","value":0.5,"unit":"mL","evidence":"engineering_assumption","basis":"先留少量不可用殘量，便於耗量結算。","source_refs":["USER"],"sensitivity_range":[0,2],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.adapter_dead_volume","value":5,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬氣帽/接頭死體積；首版不另外求解氣動壓縮。","source_refs":["USER"],"sensitivity_range":[1,15],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.hose_id","value":4,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬氣管幾何，不是供應商配件。","source_refs":["USER"],"sensitivity_range":[3,6],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.hose_length","value":1000,"unit":"mm","evidence":"engineering_assumption","basis":"設備旁配置的設計起點，不是量產標準。","source_refs":["USER"],"sensitivity_range":[500,2000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.delay","value":0.03,"unit":"s","evidence":"engineering_assumption","basis":"可觀察起膠延遲的原型種子；無實機證據。","source_refs":["USER"],"sensitivity_range":[0,0.1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.tau_on","value":0.15,"unit":"s","evidence":"engineering_assumption","basis":"整條鏈的合併建立時間常數；不再疊加假氣室或閥動態。","source_refs":["USER"],"sensitivity_range":[0.03,0.5],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.tau_off","value":0.1,"unit":"s","evidence":"engineering_assumption","basis":"整條鏈的合併停止時間常數；不等於實測停膠秒數。","source_refs":["USER"],"sensitivity_range":[0.02,0.4],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.initial_fill","value":300,"unit":"mL","evidence":"published_typical","basis":"910 TDS 實際裝填。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300_putty","estimated_by":null,"validated_against_hardware":false},{"id":"p300.grease.initial_fill","value":300,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬 300mL 裝填；grease 與 DM-22 實機適用性未確認。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.od","value":48.5,"unit":"mm","evidence":"engineering_assumption","basis":"位於設備外徑配對區間內，非實物尺寸。","source_refs":["DM22","USER"],"sensitivity_range":[47,50],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.bore","value":46,"unit":"mm","evidence":"engineering_assumption","basis":"搭配外徑及容量的自洽虛擬尺寸。","source_refs":["USER"],"sensitivity_range":[44,47],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.overall_length","value":220,"unit":"mm","evidence":"engineering_assumption","basis":"小於設備候選 <230mm 邊界，非包材圖面。","source_refs":["DM22","USER"],"sensitivity_range":[210,225],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.unusable_residual","value":3,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬不可用殘量。","source_refs":["USER"],"sensitivity_range":[0,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.id","value":12.7,"unit":"mm","evidence":"engineering_assumption","basis":"自訂 1/2in 內徑情境，不從 607 案例移植為 910 規格。","source_refs":["USER"],"sensitivity_range":[9.5,12.7],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory_geometry","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.length","value":1000,"unit":"mm","evidence":"engineering_assumption","basis":"自訂 1m 管路情境。","source_refs":["USER"],"sensitivity_range":[500,2000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory_geometry","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.initially_primed","value":true,"unit":"boolean","evidence":"engineering_assumption","basis":"起跑時管內已有材料；初始總存量須包含此部分，不能視為免費填管。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.adapter.wetted_dead_volume","value":2,"unit":"mL","evidence":"engineering_assumption","basis":"接頭、計量頭與其他未分解腔體的合併持膠量，不含已另計的軟管與針嘴；不是工程圖量測。","source_refs":["USER"],"sensitivity_range":[0,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.pcp.displacement","value":0.3,"unit":"mL/rev","evidence":"published_typical","basis":"25B192 排量；不是 Laird 升級頭已確認型號。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"p300.pcp.speed","value":60,"unit":"rpm","evidence":"engineering_assumption","basis":"低於候選額定上限的簡單起點；不是材料商建議配方。","source_refs":["USER"],"sensitivity_range":[20,120],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.pcp.volumetric_efficiency","value":1,"unit":"1","evidence":"engineering_assumption","basis":"理想滿腔、無滑漏；不冒稱量測效率。","source_refs":["USER"],"sensitivity_range":[0.7,1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.delay","value":0.02,"unit":"s","evidence":"engineering_assumption","basis":"計量鏈合併延遲種子，無實機依據。","source_refs":["USER"],"sensitivity_range":[0,0.1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.tau_on","value":0.08,"unit":"s","evidence":"engineering_assumption","basis":"計量鏈合併建立時間常數種子。","source_refs":["USER"],"sensitivity_range":[0.02,0.3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.tau_off","value":0.08,"unit":"s","evidence":"engineering_assumption","basis":"第一版與建立時間常數共同設定為0.08s，使用單一守恆輸送響應，避免各自設定造成總體積不一致。","source_refs":["USER"],"sensitivity_range":[0.02,0.3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.supply.air_pressure","value":20,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"只作架構圖顯示情境，不據此計算實際供料能力。","source_refs":["USER"],"sensitivity_range":[10,30],"range_kind":"engineering_scenarios_not_confidence_interval","role":"display_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.supply.pressure_ratio","value":22,"unit":"1","evidence":"published_typical","basis":"DM-22 名義壓力比，乘積不是流動中實測壓力。","source_refs":["DM22"],"sensitivity_range":null,"range_kind":null,"role":"display_only","scope":"P300","estimated_by":null,"validated_against_hardware":false},{"id":"p300.pcp.inlet_pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"入口顯示情境；不當已確認工作窗口，也不直接改變理想每轉量。","source_refs":["USER"],"sensitivity_range":[70,100],"range_kind":"engineering_scenarios_not_confidence_interval","role":"display_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.speed","value":100,"unit":"mm/s","evidence":"engineering_assumption","basis":"在參考平台量程內選擇便於觀察的速度。","source_refs":["USER"],"sensitivity_range":[25,150],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.acceleration","value":500,"unit":"mm/s^2","evidence":"engineering_assumption","basis":"虛擬梯形速度曲線，不是 E3/C300 實測加速度。","source_refs":["USER"],"sensitivity_range":[100,1000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.standoff","value":2,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬針距；首版作間隙檢查，不自動算擠壓與自由射流。","source_refs":["USER"],"sensitivity_range":[0.5,3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"clearance_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.lift_speed","value":20,"unit":"mm/s","evidence":"engineering_assumption","basis":"虛擬抬針速度；不據此預測拉絲。","source_refs":["USER"],"sensitivity_range":[5,50],"range_kind":"engineering_scenarios_not_confidence_interval","role":"kinematics_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.lift_distance","value":5,"unit":"mm","evidence":"engineering_assumption","basis":"點膠後抬升距離。","source_refs":["USER"],"sensitivity_range":[2,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"kinematics_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"job.line_length","value":100,"unit":"mm","evidence":"engineering_assumption","basis":"基準直線，位於兩個平台候選工作包絡內。","source_refs":["USER"],"sensitivity_range":[20,150],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"job.point_gate_duration","value":0.1,"unit":"s","evidence":"engineering_assumption","basis":"泛用 timed-gate 原型事件，不仿真 Graco 自動 Shot 的 PLC 時序。","source_refs":["USER"],"sensitivity_range":[0.05,1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"shape.line_height_to_width","value":0.5,"unit":"1","evidence":"engineering_assumption","basis":"半橢圓截面的幾何比例，非材料接觸角或保形量測。","source_refs":["USER"],"sensitivity_range":[0.25,0.75],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometric_illustration_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"shape.dot_height_to_width","value":0.25,"unit":"1","evidence":"engineering_assumption","basis":"球冠幾何比例，非材料/表面量測。","source_refs":["USER"],"sensitivity_range":[0.1,0.5],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometric_illustration_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"workpiece.width","value":150,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬平板。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"geometry_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"workpiece.depth","value":100,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬平板。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"geometry_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"numerics.initial_timestep","value":0.001,"unit":"s","evidence":"engineering_assumption","basis":"未實作求解器的起始步長規格；仍需步長收斂檢查。","source_refs":["USER"],"sensitivity_range":[0.0005,0.002],"range_kind":"engineering_scenarios_not_confidence_interval","role":"implementation_requirement","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"numerics.mass_balance_relative_tolerance","value":0.001,"unit":"1","evidence":"engineering_assumption","basis":"軟體數值質量平衡目標 0.1%，不是物理準確度。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"implementation_requirement","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"limits.x100_max_pressure","value":100,"unit":"psi","evidence":"published_limit","basis":"候選控制器額定上限，不代表整套配件相容。","source_refs":["X100"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"limits.pcp_max_rpm","value":300,"unit":"rpm","evidence":"published_limit","basis":"3A5364L 規格，不等於高填料實際可用上限。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"limits.pcp_max_working_pressure","value":290,"unit":"psi","evidence":"published_limit","basis":"不是已確認入口上限。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"common.nozzle.initially_primed","value":true,"unit":"boolean","evidence":"engineering_assumption","basis":"初始針嘴已充膠，針嘴容積列入初始總存量；不從當次膠筒重複扣除。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"all","estimated_by":"assistant","validated_against_hardware":false}]'),ed={temperature_dependence:{enabled:!1,reason:"固定23°C，未填假溫度敏感係數"},yield_and_thixotropy:{enabled:!1,reason:"完整物性保持未知，改以等效流量與合併響應"},wall_slip_and_friction_solver:{enabled:!1,reason:"不與合併動態重複計入"},hose_pressure_drop_and_starvation:{enabled:!1,reason:"P300 先用滿腔理想計量，壓力只顯示"},snuffback:{enabled:!1,reason:"第一版無回吸；開啟需另定義守恆、負流量與吸氣"},stringing_and_slump:{enabled:!1,reason:"幾何示意不宣稱材料恢復或斷絲"},compression_thermal_voids:{enabled:!1,reason:"後續階段"}},td=[{id:"R75_PUTTY_ASSUMED",material:"Tputty 910 參考資料＋工程預設",architecture:"R75",flow_method_candidate:"normalized_reference_flow",hardware_compatibility:"unconfirmed"},{id:"R75_GREASE_ASSUMED",material:"Tgrease-2500 參考資料＋常黏度近似",architecture:"R75",flow_method_candidate:"virtual_newtonian_capillary",hardware_compatibility:"unconfirmed"},{id:"P300_PUTTY_IDEAL",material:"Tputty 910 密度＋理想 PCP",architecture:"P300",flow_method_candidate:"ideal_positive_displacement",hardware_compatibility:"unconfirmed"},{id:"P300_GREASE_IDEAL",material:"Tgrease-2500 密度＋理想 PCP",architecture:"P300",flow_method_candidate:"ideal_positive_displacement",hardware_compatibility:"unconfirmed_grease_viscosity_application"}],Nn={schema_version:$u,created_date:Yu,stage:qu,implementation_authorized:ju,manufacturer_response_required_to_start_assumption_prototype:Ku,global_label:Zu,sources:Ju,parameters:Qu,features:ed,profiles:td},_a=2e4;function nd(s){const e={shape:"rectangle",pattern:"serpentine",offsetX:0,offsetY:0,spacing:5,edgeInset:2,spiralShape:"auto",spiralDirection:"outside-in",...s};e.shape==="circle"&&(e.depth=e.width);for(const h of["width","depth","offsetX","offsetY","spacing","edgeInset"])if(!Number.isFinite(e[h]))throw new Error(`${h} 必須是有限數值`);if(!["rectangle","circle"].includes(e.shape))throw new Error("熱源形狀不支援");if(!["point","line","n","serpentine","spiral","perimeter"].includes(e.pattern))throw new Error("點膠路徑不支援");if(!["auto","round","square"].includes(e.spiralShape))throw new Error("螺旋形狀不支援");if(!["outside-in","inside-out"].includes(e.spiralDirection))throw new Error("螺旋方向不支援");const t=e.shape==="circle"?e.width:e.depth;if(e.width<=0||t<=0||e.width>1e3||t>1e3)throw new Error("熱源尺寸需介於 0 與 1000 mm");if(e.spacing<.2||e.spacing>1e3)throw new Error("路徑間距需介於 0.2 與 1000 mm");if(e.edgeInset<0||e.edgeInset>=Math.min(e.width,t)/2)throw new Error("邊界內縮須小於熱源最短尺寸的一半");const n=e.width/2-e.edgeInset,i=t/2-e.edgeInset,r=e.spiralShape==="auto"?e.shape==="circle"?"round":"square":e.spiralShape,a=[],o=(h,u)=>{h+=e.offsetX,u+=e.offsetY;const d=a.at(-1);if(!(d&&Math.hypot(h-d.x,u-d.y)<1e-9)){if(a.length>=_a)throw new Error("路徑點數過多，請增加間距或縮小熱源");a.push({x:h,y:u})}};if(e.pattern==="point")o(0,0);else if(e.pattern==="line")o(-n,0),o(n,0);else if(e.pattern==="n"){const h=e.shape==="circle"?n/Math.SQRT2:n,u=e.shape==="circle"?n/Math.SQRT2:i;o(-h,-u),o(-h,u),o(h,-u),o(h,u)}else if(e.pattern==="serpentine"){const h=Math.max(1,Math.floor(2*i/e.spacing)+1);if(h*2>_a)throw new Error("蛇形路徑點數過多，請增加間距");for(let u=0;u<h;u++){const d=(u-(h-1)/2)*e.spacing,f=e.shape==="circle"?Math.sqrt(Math.max(0,n*n-d*d)):n;u%2===0?(o(-f,d),o(f,d)):(o(f,d),o(-f,d))}}else if(e.pattern==="perimeter")if(e.shape==="rectangle")o(-n,-i),o(n,-i),o(n,i),o(-n,i),o(-n,-i);else{const h=Math.max(16,Math.ceil(2*Math.PI*n/1));if(h+1>_a)throw new Error("路徑點數過多，請縮小熱源");for(let u=0;u<=h;u++){const d=2*Math.PI*u/h;o(n*Math.cos(d),n*Math.sin(d))}}else if(r==="square"){const h=e.shape==="circle"?n/Math.SQRT2:n,u=e.shape==="circle"?n/Math.SQRT2:i;let d=-h,f=h,g=-u,_=u;for(o(d,g);o(f,g),g+=e.spacing,!(g>_||(o(f,_),f-=e.spacing,f<d)||(o(d,_),_-=e.spacing,_<g)||(o(d,g),d+=e.spacing,d>f)););o(0,0)}else{const h=Math.min(n,i),u=2*Math.PI*h/e.spacing;let d=0;for(o(h,0);d<u;){const f=Math.max(0,h-e.spacing*d/(2*Math.PI));d=Math.min(u,d+Math.min(.18,1/Math.max(1,f)));const g=d===u?0:Math.max(0,h-e.spacing*d/(2*Math.PI));o(g*Math.cos(d),g*Math.sin(d))}a[a.length-1]={x:e.offsetX,y:e.offsetY}}if(!a.length)throw new Error("無法生成點膠路徑");e.pattern==="spiral"&&e.spiralDirection==="inside-out"&&a.reverse();const c=[0];let l=0;for(let h=1;h<a.length;h++)l+=Math.hypot(a[h].x-a[h-1].x,a[h].y-a[h-1].y),c.push(l);return{shape:e.shape,pattern:e.pattern,width:e.width,depth:t,offsetX:e.offsetX,offsetY:e.offsetY,edgeInset:e.edgeInset,spacing:e.spacing,spiralShape:e.spiralShape,effectiveSpiralShape:r,spiralDirection:e.spiralDirection,points:a,cumulative:c,length:l,units:"mm",evidence:"engineering_assumption",note:"幾何候選；未校準流量、轉角速度、點膠寬度、排氣或實際壓合。"}}function hc(s,e){if(!Number.isFinite(e))throw new Error("路徑距離必須是有限數值");if(s.points.length===1)return{...s.points[0],tx:0,ty:0};const t=Math.max(0,Math.min(s.length,e));let n=1,i=s.points.length-1;for(;n<i;){const l=Math.floor((n+i)/2);s.cumulative[l]<t?n=l+1:i=l}const r=s.points[n-1],a=s.points[n],o=s.cumulative[n]-s.cumulative[n-1],c=o?(t-s.cumulative[n-1])/o:0;return{x:r.x+(a.x-r.x)*c,y:r.y+(a.y-r.y)*c,tx:(a.x-r.x)/o,ty:(a.y-r.y)/o}}function ls(s,e,t){const n=Math.min(e,Math.sqrt(s*t)),i=n/t,r=n>0?Math.max(0,(s-n*n/t)/n):0,a=2*i+r,o=n*i/2;return{kind:"single",length:s,duration:a,peak:n,ramp:i,cruise:r,at(c){if(c<=0)return{x:0,v:0};if(c>=a)return{x:s,v:0};if(c<i)return{x:.5*t*c*c,v:t*c};if(c<i+r)return{x:o+n*(c-i),v:n};const l=a-c;return{x:s-.5*t*l*l,v:t*l}},timeAt(c){return id(this,s,t,c)}}}function id(s,e,t,n){const i=Math.max(0,Math.min(e,n)),r=s.peak*s.ramp/2;return i<=r?Math.sqrt(2*i/t):i>=e-r?s.duration-Math.sqrt(2*(e-i)/t):s.ramp+(i-r)/s.peak}function sd(s,e,t,n,i){const r=-(s.x*e.x+s.y*e.y);if(r<=-.999999)return i;if(r>=.999999)return 0;const a=Math.sqrt(.5*(1-r));return Math.min(i,Math.sqrt(t*n*a/(1-a)))}function rd(s,{speed:e,acceleration:t,deviation:n}){const i=[];for(let g=1;g<s.length;g++){const _=s[g].x-s[g-1].x,m=s[g].y-s[g-1].y,p=Math.hypot(_,m);p>1e-12&&i.push({length:p,u:{x:_/p,y:m/p}})}const r=i.length;if(!r)return ls(0,e,t);if(r===1)return ls(i[0].length,e,t);const a=new Float64Array(r+1);for(let g=1;g<r;g++)a[g]=sd(i[g-1].u,i[g].u,t,n,e);a[0]=0,a[r]=0;for(let g=r-1;g>=0;g--)a[g]=Math.min(a[g],Math.sqrt(a[g+1]**2+2*t*i[g].length));for(let g=0;g<r;g++)a[g+1]=Math.min(a[g+1],Math.sqrt(a[g]**2+2*t*i[g].length));let o=0,c=0,l=e,h=0;for(let g=0;g<r;g++){const _=i[g],m=a[g],p=a[g+1],x=Math.max(m,p,Math.min(e,Math.sqrt((2*t*_.length+m*m+p*p)/2))),M=Math.max(0,(x*x-m*m)/(2*t)),v=Math.max(0,(x*x-p*p)/(2*t)),E=Math.max(0,_.length-M-v);Object.assign(_,{v0:m,v1:p,vp:x,d1:M,d2:E,d3:v,t1:(x-m)/t,t2:x>0?E/x:0,t3:(x-p)/t,start:o,distance:c}),_.duration=_.t1+_.t2+_.t3,o+=_.duration,c+=_.length,g>0&&m<e-1e-9&&(h++,l=Math.min(l,m))}const u=o,d=c,f=(g,_)=>{let m=0,p=r-1;for(;m<p;){const x=Math.ceil((m+p)/2);i[x][g]<=_?m=x:p=x-1}return i[m]};return{kind:"polyline",length:d,duration:u,peak:Math.max(...i.map(g=>g.vp)),corners:h,slowestCorner:h?l:null,junctions:Array.from(a),at(g){if(g<=0)return{x:0,v:0};if(g>=u)return{x:d,v:0};const _=f("start",g),m=Math.min(_.duration,g-_.start);if(m<_.t1)return{x:_.distance+_.v0*m+.5*t*m*m,v:_.v0+t*m};if(m<_.t1+_.t2)return{x:_.distance+_.d1+_.vp*(m-_.t1),v:_.vp};const p=m-_.t1-_.t2;return{x:_.distance+_.d1+_.d2+_.vp*p-.5*t*p*p,v:Math.max(0,_.vp-t*p)}},timeAt(g){const _=Math.max(0,Math.min(d,g));if(_>=d)return u;const m=f("distance",_),p=Math.min(m.length,_-m.distance);if(p<=m.d1)return m.start+(Math.sqrt(m.v0*m.v0+2*t*p)-m.v0)/t;if(p<=m.d1+m.d2)return m.start+m.t1+(p-m.d1)/m.vp;const x=p-m.d1-m.d2;return m.start+m.t1+m.t2+(m.vp-Math.sqrt(Math.max(0,m.vp*m.vp-2*t*x)))/t}}}const ad="sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf",Ds="sources/Laird/Tputty910_TDS_20250422_RevC.pdf",Is="sources/Laird/Tgrease2500_TDS_20250627.pdf",ps=Object.freeze([{id:"putty_proxy.pressure_exponent",value:2.7,unit:"1",evidence:"derived",role:"氣壓 → 流率的冪次 m（流動指數 n≈1/m）",basis:"以 Laird A18720-00 Rev A 第 5 頁「75cc cartridge、0.125 in nozzle」Tputty 910 流率—氣壓曲線，300 dpi 數位讀圖 20–100 psi 對數擬合 m=2.73（各點誤差約 2% 內）；取 2.7。曲線縱軸單位（cc/min）與 TDS（g/min）仍待 Laird 確認，故只採用曲線「形狀」，90 psi 的量值仍沿用 TDS 75 g/min。取代 v0.3 的中性線性假設 m=1。",source_refs:[ad,Ds],supersedes:"v0.3 value 1 (engineering_assumption)"},{id:"material.putty.conductivity",value:9.1,unit:"W/(m·K)",evidence:"published_typical",role:"熱阻估算",basis:"TDS Rev C：9.1 W/mK，Hot Disk。",source_refs:[Ds]},{id:"material.putty.min_bond_line",value:.18,unit:"mm",evidence:"published_typical",role:"間隙下限提醒",basis:"TDS Rev C：Minimum Bond Line Thickness 180 µm（Laird Method）。",source_refs:[Ds]},{id:"material.putty.contact_resistance",value:.11,unit:"°C·cm²/W",evidence:"derived",role:"熱阻估算的兩側接觸熱阻合計",basis:"TDS Rev C：1.5 mm、80°C／40 psi 熱阻 1.76 °C·cm²/W（ASTM D5470）。扣除體積項 1.5 mm ÷ 9.1 W/mK = 1.65 °C·cm²/W，得接觸項約 0.11。假設該試片厚度即 1.5 mm 且導熱率不隨壓縮改變。",source_refs:[Ds]},{id:"material.grease.conductivity",value:3.8,unit:"W/(m·K)",evidence:"published_typical",role:"熱阻估算",basis:"TDS 2025-06-27：3.8 W/m-K，Hot Disk；A14259-09 料號頁另列 3.50，未取平均。",source_refs:[Is]},{id:"material.grease.min_bond_line",value:.05,unit:"mm",evidence:"published_typical",role:"間隙下限提醒",basis:"TDS 2025-06-27：Minimum Bondline Thickness 50 µm（Laird Test Method）。",source_refs:[Is]},{id:"material.grease.contact_resistance",value:.02,unit:"°C·cm²/W",evidence:"derived",role:"熱阻估算的兩側接觸熱阻合計",basis:"TDS：10 psi & 70°C 熱阻 0.15 °C·cm²/W（ASTM D5470）。若試片 BLT 為最小 50 µm，體積項 0.05 mm ÷ 3.8 = 0.13，接觸項約 0.02；TDS 未列試片 BLT，此推算不確定。",source_refs:[Is]},{id:"material.grease.packaging",value:"50cc syringe／600cc cartridge",unit:"",evidence:"published_typical",role:"包材提示",basis:"TDS 列 50cc 針筒（A14399-03）與 600cc 膠筒（A14259-10）；本模擬的 75 mL／300 mL grease 裝填仍是虛擬比較配置。",source_refs:[Is]},{id:"assembly.gap",value:.5,unit:"mm",evidence:"engineering_assumption",role:"壓合目標間隙預設",basis:"AI 初估：Tputty 910 為 gap filler（TDS 最小 BLT 0.18 mm、熱阻量測於 1.5 mm），0.5 mm 位於常見 RRU 元件—腔體間隙範圍內；v0.6 的 0.20 mm 太接近最小 BLT。Tgrease 屬薄 BLT 用途，請改小。",source_refs:[Ds,Is],supersedes:"v0.6 value 0.20 (engineering_assumption)"},{id:"thermal.power",value:25,unit:"W",evidence:"engineering_assumption",role:"溫升估算",basis:"AI 初估：5G RRU 功放／FPGA 類單顆元件量級；請改為實際功耗。",source_refs:[]}]),od=new Set(ps.map(s=>s.id));function Eh(s){if(s.__v1)return s;const e=[...s.parameters.filter(t=>!od.has(t.id)),...ps];return{...s,parameters:e,update_version:"1.0",__v1:!0}}function $c(s,e){var t;return(t=Eh(s).parameters.find(n=>n.id===e))==null?void 0:t.value}const cr="1.0.0",ha="工程假設／未經實機校準",uo=32,Qs={id:"ending.shutoff_distance",value:10,unit:"mm",evidence:"engineering_assumption",basis:"AI 初始比較值：預設 100 mm 路徑、100 mm/s、500 mm/s² 對應提前 200 ms 關膠。不是原廠配方；速度或路徑改變後提前時間也會改變。",source_refs:["16_收尾積膠原因與影片比對.md"]},uc=[["endMotion","vertical","","垂直抬針；提供斜退及先升再退，單點僅垂直。"],["endDwell",.1,"s","到達終點後停留 100 ms 再離開；不是從提前關膠時刻起算。"],["backtrackDistance",2,"mm","沿原直線反向回退 2 mm；垂直模式及單點不使用。"],["backtrackSpeed",20,"mm/s","回退速度上限；抬針與回退共用設定加速度。"],["reverseRpm",30,"rpm","理想 PCP 反轉參考轉速；僅回收未出嘴的暫存量。"],["reverseDuration",0,"s","反轉預設關閉；手動比較初值 0.05 s，不能視為原廠配方。"]].map(([s,e,t,n])=>({id:`ending.${s}`,key:s,value:e,unit:t,evidence:"engineering_assumption",basis:n,source_refs:["18_v0.3收尾動作與體積分帳.md"]})),dc=[{id:"motion.corner_mode",key:"cornerMode",value:"junction",unit:"",evidence:"engineering_assumption",basis:"多段路徑在轉角依 junction deviation 規則降速（CNC 韌體常見作法）；可切回 v0.7「整條弧長單一加減速、轉角不減速」作對照。不是特定機台控制器。",source_refs:["22_v1.0接手全面修正與驗證.md"]},{id:"motion.junction_deviation",key:"junctionDeviation",value:.05,unit:"mm",evidence:"engineering_assumption",basis:"AI 初估：常見 CNC 韌體 0.01–0.05 mm。數值越小轉角越慢、轉角積膠越多；需依實際機台軌跡設定校準。",source_refs:["22_v1.0接手全面修正與驗證.md"]}],wh=()=>Object.fromEntries(uc.map(s=>[s.key,s.value])),Th=()=>Object.fromEntries(dc.map(s=>[s.key,s.value]));function Ah(s,e="putty",t="R75"){const n=Object.fromEntries(Eh(s).parameters.map(o=>[o.id,o.value])),i=o=>n[o],r=t==="P300",a=r?"p300":"r75";return{material:e,architecture:t,profile:r?`P300_${e==="putty"?"PUTTY":"GREASE"}_IDEAL`:`R75_${e==="putty"?"PUTTY":"GREASE"}_ASSUMED`,density:i(`material.${e}.density`),viscosity:i("grease_proxy.constant_viscosity"),pressure:i("scenario.pressure"),referencePressure:i("scenario.reference_pressure"),referenceRate:i("putty_proxy.reference_rate"),pressureExponent:i("putty_proxy.pressure_exponent"),diameter:i("virtual_nozzle.id"),nozzleLength:i("virtual_nozzle.length"),referenceDiameter:i("virtual_nozzle.reference_id"),referenceLength:i("virtual_nozzle.reference_length"),rpm:i("p300.pcp.speed"),displacement:i("p300.pcp.displacement"),efficiency:i("p300.pcp.volumetric_efficiency"),delay:i(`${a}.dynamic.delay`),tauOn:i(`${a}.dynamic.tau_on`),tauOff:i(`${a}.dynamic.tau_off`),fill:i(`${a}.${e==="grease"?"grease":"cartridge"}.initial_fill`),residual:i(`${a}.cartridge.unusable_residual`),hoseId:i("p300.hose.id"),hoseLength:i("p300.hose.length"),deadVolume:i("p300.adapter.wetted_dead_volume"),speed:i("motion.speed"),acceleration:i("motion.acceleration"),standoff:i("motion.standoff"),liftSpeed:i("motion.lift_speed"),liftDistance:i("motion.lift_distance"),mode:"line",lineLength:i("job.line_length"),gateDuration:i("job.point_gate_duration"),shutoffDistance:Qs.value,lineRatio:i("shape.line_height_to_width"),dotRatio:i("shape.dot_height_to_width"),width:i("workpiece.width"),depth:i("workpiece.depth"),thickness:5,fixtureHeight:8,surfaceZ:13,offsetX:0,offsetY:0,timestep:i("numerics.initial_timestep"),cellSize:.5,workpieceKind:"plate",workpieceFile:null,...wh(),...Th()}}function cd(s){if(s.architecture==="P300")return s.displacement*s.rpm*s.efficiency/60;if(s.material==="putty"){const e=s.pressureExponent;return s.referenceRate*(Math.max(s.pressure,0)/s.referencePressure)**e*(s.diameter/s.referenceDiameter)**(3+e)*(s.referenceLength/s.nozzleLength)**e}return Math.PI*(s.diameter/1e3)**4*(Math.max(s.pressure,0)*6894.757293168)/(128*s.viscosity*s.nozzleLength/1e3)*1e6}function fo(s,e,t,n,i,r){const a=s-n;if(a<=0||e===0||t<=0)return{q:0,volume:0};const o=Math.min(a,t),c=-Math.expm1(-o/i);let l=e*(o-i*c),h=e*c;if(a>t){const u=a-t;l+=h*r*-Math.expm1(-u/r),h*=Math.exp(-u/r)}return{q:h,volume:l}}function ld(s,e,t,n,i,r,a){const o=fo(s,e,t,n,i,i),c=t+n;if(s<=c||r<=0||a<=0||t<=0)return{...o,recovered:0,reverseActive:!1};const l=fo(c,e,t,n,i,i),h=Math.max(0,e*t-l.volume),u=i*Math.log1p(h/(r*i)),d=s-c,f=Math.min(d,a,u),g=r*f,_=Math.max(0,(h+r*i)*Math.exp(-f/i)-r*i)*Math.exp(-(d-f)/i);return{q:_/i,volume:l.volume+h-g-_,recovered:g,reverseActive:d<Math.min(a,u)}}function hd(s,e,t){const n=s.endMotion==="legacy",i=s.mode==="line"&&["diagonal","liftThenBack"].includes(s.endMotion)?Math.min(s.backtrackDistance,s.lineLength):0,r=n?t:e+s.endDwell,a=ls(s.liftDistance,s.liftSpeed,s.acceleration),o=i>0?ls(i,s.backtrackSpeed,s.acceleration):null,c=s.endMotion==="diagonal"&&i>0,l=Math.hypot(i,s.liftDistance),h=c?ls(l,Math.min(s.liftSpeed*l/s.liftDistance,s.backtrackSpeed*l/i),s.acceleration):null,u=r+(n?s.liftDistance/s.liftSpeed:h?h.duration:a.duration+(o?o.duration:0));return{start:r,end:u,back:i,at(d){const f=Math.max(0,d-r);if(n)return{back:0,lift:Math.min(s.liftDistance,f*s.liftSpeed),vx:0,vz:d>r&&d<u?s.liftSpeed:0,phase:"垂直抬針"};if(h){const m=h.at(f);return{back:m.x*i/l,lift:m.x*s.liftDistance/l,vx:-m.v*i/l,vz:m.v*s.liftDistance/l,phase:"斜退抬針"}}const g=a.at(f),_=o?o.at(f-a.duration):{x:0,v:0};return{back:_.x,lift:g.x,vx:-_.v,vz:g.v,phase:f<a.duration?"垂直抬針":"抬高後回退"}}}}const ud={pressure:[0,100],diameter:[.2,8],nozzleLength:[1,100],rpm:[0,300],efficiency:[0,1],density:[.1,10],viscosity:[1,1e5],referenceRate:[0,10],pressureExponent:[.1,4],delay:[0,2],tauOn:[.001,2],tauOff:[.001,2],fill:[0,500],residual:[0,500],hoseId:[1,25],hoseLength:[0,5e3],speed:[1,800],acceleration:[1,1e4],standoff:[.1,20],lineLength:[1,250],gateDuration:[.001,10],shutoffDistance:[0,250],lineRatio:[.05,2],dotRatio:[.05,.5],width:[1,1e3],depth:[1,1e3],thickness:[.1,200],fixtureHeight:[0,100],timestep:[1e-4,.01],cellSize:[.1,5],liftSpeed:[.1,200],liftDistance:[.1,50],endDwell:[0,5],backtrackDistance:[0,50],backtrackSpeed:[.1,200],reverseRpm:[0,300],reverseDuration:[0,2],junctionDeviation:[.001,5]};function dd(s){for(const[e,t]of Object.entries(s))if(typeof t=="number"&&!Number.isFinite(t))throw new Error(`${e} 必須是有限數值`);for(const[e,[t,n]]of Object.entries(ud))if(s[e]<t||s[e]>n)throw new Error(`${e} 超出原型允許範圍 ${t}–${n}`);if(s.residual>s.fill)throw new Error("不可用殘量不能大於裝填量");if(s.architecture==="P300"&&Math.abs(s.tauOn-s.tauOff)>1e-12)throw new Error("PCP 必須共用起停時間常數，以保持計量守恆");if(!["line","point","pattern"].includes(s.mode))throw new Error("未知路徑模式");if(s.mode==="pattern"&&(!s.pathSettings||typeof s.pathSettings!="object"))throw new Error("請先設定熱源與路徑");if(!["vertical","diagonal","liftThenBack","legacy"].includes(s.endMotion))throw new Error("未知收尾動作");if(!["junction","off"].includes(s.cornerMode))throw new Error("未知轉角速度模式");if(s.architecture!=="P300"&&s.reverseDuration>0)throw new Error("氣壓式未提供 PCP 反轉回吸；請改用下降時間常數比較卸壓響應")}function na(s,e){const t=Math.cbrt(1e3*s*3/(Math.PI*e*(3+4*e*e)));return{radius:t,height:2*e*t}}function fc(s,e,t){const n=s.length,i=new Float64Array(n+1),r=new Float64Array(n+1);let a=0,o=0;for(const u of s)a+=u*1e3;for(let u=1;u<n;u++)i[u]=Math.sqrt(4*1e3*(s[u-1]+s[u])/(2*e*Math.PI*t));for(let u=0;u<n;u++)o+=uo*Math.sin(Math.PI/uo)*t/4*e*(i[u]**2+i[u]*i[u+1]+i[u+1]**2)/3;const c=o>0?Math.sqrt(a/o):0;let l=0,h=0;for(let u=0;u<=n;u++)i[u]*=c,r[u]=i[u]*t,r[u]>l&&(l=r[u]),i[u]>h&&(h=i[u]);return{widths:i,heights:r,volumeMm3:a,maxHeight:l,maxWidth:h}}function fd(s,e,t){return s.mode==="point"?null:e&&s.cornerMode==="junction"&&e.points.length>2?rd(e.points,{speed:s.speed,acceleration:s.acceleration,deviation:s.junctionDeviation}):ls(t,s.speed,s.acceleration)}function ia(s){const e={...wh(),...Th(),endMotion:"legacy",shutoffDistance:0,...structuredClone(s)};dd(e);const t=cd(e),n=e.architecture==="P300",i=e.fill-e.residual,r=e.mode==="pattern"?nd(e.pathSettings):null;if(r&&r.length<=1e-9)throw new Error("圖樣路徑沒有長度；單點請使用單點模式");const a=r?r.length:e.lineLength,o=e.mode!=="point",c=fd(e,r,a),l=o?Math.min(e.shutoffDistance,a):0,h=o?c.timeAt(a-l):e.gateDuration,u=n&&t>0?Math.min(h,i/t):h,d=o?c.duration:h,f=Math.max(d,h+e.delay+20*Math.max(e.tauOn,e.tauOff)),g=n&&e.reverseRpm>0&&e.reverseDuration>0,_=g?u+e.reverseDuration:null,m=g?_+e.delay:null,p=hd(r?{...e,mode:"line",lineLength:a}:e,d,f),x=Math.max(f,p.end,m??0);if(x>180)throw new Error("試驗超過 180 秒，請縮短路徑或提高速度");const M=Math.PI*e.diameter**2/4*(e.nozzleLength/1e3)+(n?Math.PI*e.hoseId**2/4*(e.hoseLength/1e3)+e.deadVolume:0),v=e.fill+M,E=-e.diameter/2,T=a+e.diameter;let C=e.mode==="point"?1:Math.max(2,Math.ceil(T/e.cellSize));const D=C;if(r){const Fe=Math.max(2,Math.floor(5e6/(Math.ceil(x/.01)+2)));C=Math.min(C,Fe,2e4)}const S=T/C,y=new Float64Array(C),P=[];let F=0,G=0;const q=e.displacement*e.reverseRpm*e.efficiency/60,X=Fe=>{const I=n?ld(Fe,t,u,e.delay,e.tauOn,q,e.reverseDuration):fo(Fe,t,h,e.delay,e.tauOn,e.tauOff),Ce=n?I.volume:Math.min(i,I.volume),we=n?t*Math.min(Fe,u):Ce,ye=I.recovered||0,se=n?Math.max(0,we-Ce-ye):0,Ne=Math.max(e.residual,e.fill-we),ce=o?c.at(Fe):{x:0,v:0},Te=p.at(Fe),it=ce.v+Te.vx,je=ce.x-Te.back,A=r?hc(r,je):null,b=A?A.x:e.offsetX+(e.mode==="line"?je-e.lineLength/2:0),k=A?A.y:e.offsetY,K=g&&Fe>=u&&Fe<_,te=g&&Fe>=u+e.delay&&Fe<m,j=Fe<u?"點膠中":Fe<d?"收尾移動（已關膠）":Fe<p.start?e.endMotion==="legacy"?"舊版尾膠等待":"終點停留":Fe<p.end?Te.phase:Fe<x?K||te?"動作完成／反轉指令與尾膠記帳":"動作完成／尾膠記帳":"完成";return{t:Fe,q:!n&&I.volume>=i?0:I.q,target:Fe<u?t:0,command:Fe<u?1:0,output:Ce,mass:Ce*e.density,metered:we,pending:se,recovered:ye,reverseActive:!!I.reverseActive,reverseRecoveryActive:!!I.reverseActive,reverseCommandActive:K,reverseResponseActive:te,remaining:Ne,fixed:M,initial:v,s:je,x:b,y:k,z:e.surfaceZ+e.standoff+Te.lift,speed:Math.hypot(it,Te.vz),vx:A?it*A.tx:it,vy:A?it*A.ty:0,vz:Te.vz,phase:j,balance:v-(Ne+M+se+ye+Ce)}},V=X(p.start).output,ee=Math.ceil(x/e.timestep),H=e.endMotion==="legacy";for(let Fe=0;Fe<=ee;Fe++){const I=Math.min(x,Fe*e.timestep),Ce=X(I),we=o?c.at(Math.max(0,I-e.timestep/2)).x:0;Ce.deposited=H?Ce.output:Math.min(Ce.output,V),Ce.offSurface=Math.max(0,Ce.output-Ce.deposited),Ce.depositionBalance=Ce.output-Ce.deposited-Ce.offSurface;const ye=Math.max(0,Ce.deposited-(H?F:Math.min(F,V)));if(e.mode==="point")y[0]+=ye;else if(ye>0){const se=Math.max(e.diameter/2,S),Ne=Math.floor((we-E)/S),ce=Math.ceil(se/S)+1,Te=[];let it=0;for(let je=Math.max(0,Ne-ce);je<=Math.min(C-1,Ne+ce);je++){const A=Math.max(0,1-Math.abs(E+(je+.5)*S-we)/se);A&&(Te.push([je,A]),it+=A)}for(const[je,A]of Te)y[je]+=ye*A/it}F=Ce.output,(I+1e-9>=G||Fe===ee)&&(P.push({...Ce,deposits:Float64Array.from(y)}),G+=.01)}const he=o?fc(y,S,e.lineRatio):null,pe=he?he.maxHeight:na(y[0],e.dotRatio).height,ve=P.at(-1),Ee=[],st=Math.max(0,ve.output-X(d).output),ot=(Fe,I)=>{let Ce=0;for(let we=0;we<C;we++){const ye=E+we*S;Ce+=y[we]*Math.max(0,Math.min(I,ye+S)-Math.max(Fe,ye))/S}return Ce/(I-Fe)},Ze=Math.min(5,a/5),Z=ot(a*.4,a*.6),Q=o&&Z>1e-12?ot(a-Ze,a)/Z:null,Se={movementEnd:d,commandOff:u,effectiveShutoffDistance:l,leadTime:d-h,afterStopVolume:st,afterStopPercent:ve.output>0?st/ve.output*100:0,endWindowMm:Ze,endToMiddleRatio:Q,liftStart:p.start,motionEnd:p.end,accountingEnd:x,effectiveBacktrack:p.back,offSurfaceVolume:ve.offSurface,depositedVolume:ve.deposited,recoveredVolume:ve.recovered,reverseCommandStart:g?u:null,reverseCommandEnd:_,reverseStart:g?u+e.delay:null,reverseResponseEnd:m,reverseRequestedVolume:n?q*e.reverseDuration:0},ae=c?{kind:c.kind,duration:c.duration,peak:c.peak,corners:c.corners||0,slowestCorner:c.slowestCorner??null,averageSpeed:a/c.duration}:null;ve.offSurface>1e-9&&Ee.push("離面後仍有出膠，另列形狀未定量；未預測拉絲、滴落或落點，不加入工件膠形。"),o&&e.backtrackDistance>a&&p.back>0&&Ee.push("回退距離已限制在原直線長度內。"),e.mode==="point"&&["diagonal","liftThenBack"].includes(e.endMotion)&&Ee.push("單點沒有路徑方向，收尾使用垂直抬針。"),n&&e.reverseDuration>0&&Ee.push("PCP 反轉僅為暫存回收近似，回收量獨立記帳；不移除已沉積材料、不保證真實斷絲。"),Se.reverseRequestedVolume>ve.recovered+1e-9&&Ee.push("反轉指令超過可回收暫存量，剩餘指令不再移除材料；負壓、吸氣與下一次開膠尚未計算。"),o&&e.shutoffDistance>=a&&Ee.push("提前關膠距離達到或超過路徑長度，本次不開膠；請縮短提前距離。"),o&&Q!==null&&Q<.5&&Ee.push("末段平均截面低於中段一半，可能欠膠；此比較門檻為 AI 初估，不是產品驗收標準。"),o&&Q!==null&&Q>1.5&&Ee.push("末段平均截面高於中段 1.5 倍，可能積膠；此比較門檻為 AI 初估，不是產品驗收標準。"),pe>e.standoff&&Ee.push("簡化膠形高於針距，可能干涉；尚未計算壓扁或拉絲。"),e.material==="putty"&&!n&&Math.abs(e.pressureExponent-1)>1e-9&&Ee.push(`putty 流動指數 m=${e.pressureExponent}：針嘴內徑與長度依冪律 d^(3+m)/L^m 一併換算；仍是單點映射假設。`);const oe=he?he.maxWidth:na(ve.deposited,e.dotRatio).radius*2;if(r){let Fe=!1;for(const I of r.points)if(Math.abs(I.x)+oe/2>e.width/2||Math.abs(I.y)+oe/2>e.depth/2){Fe=!0;break}Fe&&Ee.push("路徑或估算膠線可能超出工件範圍；尚未計算實際邊緣流失。"),(Math.abs(r.offsetX)+r.width/2>e.width/2||Math.abs(r.offsetY)+r.depth/2>e.depth/2)&&Ee.push("設定的熱源超出工件矩形參考邊界；請核對熱源位置與尺寸。"),Ee.push("3D 彎角與重疊為幾何示意；沉積量分帳守恆，但顯示網格體積與融合形狀並非精確實物。"),c.kind==="polyline"?Ee.push(`轉角依 junction deviation ${e.junctionDeviation} mm 降速（最低 ${ae.slowestCorner===null?"—":ae.slowestCorner.toFixed(1)} mm/s）；轉角較慢處膠量較多。規則為通用 CNC 近似，非特定機台控制器。`):Ee.push("圖樣使用整條路徑的弧長加減速，轉角不減速（v0.7 對照）；不是機台運動控制器或真實轉角積膠預測。"),C<D&&Ee.push("為避免記憶體不足，沿路徑的沉積取樣已放粗；局部精度下降。")}else((e.mode==="line"?(e.lineLength+e.diameter)/2:oe/2)+Math.abs(e.offsetX)>e.width/2||oe/2+Math.abs(e.offsetY)>e.depth/2)&&Ee.push("路徑或膠形超出工件範圍；沉積位置仍按水平參考面外推。");const Ie=n?[254,277]:[300,300];return(e.width>Ie[0]||e.depth>Ie[1])&&Ee.push("工件超出所選設備的參考工作範圍；未自動縮小。"),e.surfaceZ+e.standoff+e.liftDistance>(n?70:100)&&Ee.push("工件／針嘴高度超出參考 Z 行程；尚未確認真實機台的裝夾與工具偏置。"),e.workpieceKind!=="plate"&&Ee.push("匯入工件只作實尺寸顯示；膠形使用上方水平參考面，未驗證孔洞、曲面或完整碰撞。"),ve.remaining<=e.residual+1e-9&&Ee.push("可用膠量已耗盡；固定預填流道未吹空。"),n&&Ee.push("理想 PCP 假設滿腔；管路壓降、供料不足與材料適配尚未計算。"),{version:cr,label:ha,config:e,path:r,pathLength:a,Q:t,gate:h,duration:x,tailEnd:f,cellLength:S,gridStart:E,frames:P,warnings:Ee,maxHeight:pe,maxWidth:oe,motion:ae,ending:Se,summary:{...ve,deposits:Array.from(ve.deposits),maxHeight:pe,maxWidth:oe,ending:Se}}}function pd(s,e){let t=0,n=s.frames.length-1;for(;t<n;){const i=Math.ceil((t+n)/2);s.frames[i].t<=e?t=i:n=i-1}return s.frames[t]}const $t=Object.freeze({putty:{key:"putty",name:"Tputty 910",vendor:"Laird",kind:"單劑 thermal putty（陶瓷填充矽系）",conductivity:9.1,minBondLine:.18,contactResistance:.11,temperatureRange:"-40～180 °C",packaging:"30cc 針筒／75cc EFD 56cc（179 g）／180cc 159cc／300cc 鋁筒 300cc（960 g）",density:3.2,color:14714506,colorName:"淡紅（近似）",source:"THR-DS-Tputty 910 Rev C 2025-04-22"},grease:{key:"grease",name:"Tgrease 2500",vendor:"Laird",kind:"非矽 thermal grease",conductivity:3.8,minBondLine:.05,contactResistance:.02,temperatureRange:"-55～150 °C",packaging:"50cc 針筒（A14399-03）／600cc 膠筒（A14259-10）",density:3.4,color:14277590,colorName:"灰白（近似）",source:"MKT-DOC-1592 Tgrease 2500 Data Sheet 2025-06-27"}});/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pc="180",Kn={ROTATE:0,DOLLY:1,PAN:2},Yn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},md=0,Yc=1,gd=2,Rh=1,Ch=2,$n=3,ei=0,Yt=1,Dt=2,gi=0,hs=1,qc=2,jc=3,Kc=4,_d=5,Li=100,vd=101,xd=102,yd=103,Md=104,bd=200,Sd=201,Ed=202,wd=203,po=204,mo=205,Td=206,Ad=207,Rd=208,Cd=209,Pd=210,Ld=211,Dd=212,Id=213,Nd=214,go=0,_o=1,vo=2,ms=3,xo=4,yo=5,Mo=6,bo=7,mc=0,Ud=1,Fd=2,_i=0,Od=1,Bd=2,kd=3,Ph=4,zd=5,Hd=6,Vd=7,Zc="attached",Gd="detached",Lh=300,gs=301,_s=302,So=303,Eo=304,ua=306,vs=1e3,mi=1001,sa=1002,qt=1003,Dh=1004,$s=1005,cn=1006,Kr=1007,qn=1008,Un=1009,Ih=1010,Nh=1011,er=1012,gc=1013,Fi=1014,wn=1015,lr=1016,_c=1017,vc=1018,tr=1020,Uh=35902,Fh=35899,Oh=1021,Bh=1022,gn=1023,nr=1026,ir=1027,xc=1028,yc=1029,kh=1030,Mc=1031,bc=1033,Zr=33776,Jr=33777,Qr=33778,ea=33779,wo=35840,To=35841,Ao=35842,Ro=35843,Co=36196,Po=37492,Lo=37496,Do=37808,Io=37809,No=37810,Uo=37811,Fo=37812,Oo=37813,Bo=37814,ko=37815,zo=37816,Ho=37817,Vo=37818,Go=37819,Wo=37820,Xo=37821,$o=36492,Yo=36494,qo=36495,jo=36283,Ko=36284,Zo=36285,Jo=36286,sr=2300,rr=2301,va=2302,Jc=2400,Qc=2401,el=2402,Wd=2500,Xd=0,zh=1,Qo=2,$d=3200,Yd=3201,Sc=0,qd=1,pi="",At="srgb",jt="srgb-linear",ra="linear",vt="srgb",Gi=7680,tl=519,jd=512,Kd=513,Zd=514,Hh=515,Jd=516,Qd=517,ef=518,tf=519,ec=35044,nl="300 es",In=2e3,aa=2001;class zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let il=1234567;const us=Math.PI/180,xs=180/Math.PI;function An(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[s&255]+Bt[s>>8&255]+Bt[s>>16&255]+Bt[s>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function et(s,e,t){return Math.max(e,Math.min(t,s))}function Ec(s,e){return(s%e+e)%e}function nf(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function sf(s,e,t){return s!==e?(t-s)/(e-s):0}function qs(s,e,t){return(1-t)*s+t*e}function rf(s,e,t,n){return qs(s,e,1-Math.exp(-t*n))}function af(s,e=1){return e-Math.abs(Ec(s,e*2)-e)}function of(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function cf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function lf(s,e){return s+Math.floor(Math.random()*(e-s+1))}function hf(s,e){return s+Math.random()*(e-s)}function uf(s){return s*(.5-Math.random())}function df(s){s!==void 0&&(il=s);let e=il+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ff(s){return s*us}function pf(s){return s*xs}function mf(s){return(s&s-1)===0&&s!==0}function gf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function _f(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function vf(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*d,o*l);break;case"YZY":s.set(c*d,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*d,o*h,o*l);break;case"XZX":s.set(o*h,c*g,c*f,o*l);break;case"YXY":s.set(c*f,o*h,c*g,o*l);break;case"ZYZ":s.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function En(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function pt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const wc={DEG2RAD:us,RAD2DEG:xs,generateUUID:An,clamp:et,euclideanModulo:Ec,mapLinear:nf,inverseLerp:sf,lerp:qs,damp:rf,pingpong:af,smoothstep:of,smootherstep:cf,randInt:lf,randFloat:hf,randFloatSpread:uf,seededRandom:df,degToRad:ff,radToDeg:pf,isPowerOfTwo:mf,ceilPowerOfTwo:gf,floorPowerOfTwo:_f,setQuaternionFromProperEuler:vf,normalize:pt,denormalize:En};class me{constructor(e=0,t=0){me.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class _n{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-o;const p=c*d+l*f+h*g+u*_,x=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const E=Math.sqrt(M),T=Math.atan2(E,p*x);m=Math.sin(m*T)/E,o=Math.sin(o*T)/E}const v=o*x;if(c=c*m+d*v,l=l*m+f*v,h=h*m+g*v,u=u*m+_*v,m===1-o){const E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xa.copy(this).projectOnVector(e),this.sub(xa)}reflect(e){return this.sub(xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xa=new R,sl=new _n;class tt{constructor(e,t,n,i,r,a,o,c,l){tt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],x=i[1],M=i[4],v=i[7],E=i[2],T=i[5],C=i[8];return r[0]=a*_+o*x+c*E,r[3]=a*m+o*M+c*T,r[6]=a*p+o*v+c*C,r[1]=l*_+h*x+u*E,r[4]=l*m+h*M+u*T,r[7]=l*p+h*v+u*C,r[2]=d*_+f*x+g*E,r[5]=d*m+f*M+g*T,r[8]=d*p+f*v+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ya.makeScale(e,t)),this}rotate(e){return this.premultiply(ya.makeRotation(-e)),this}translate(e,t){return this.premultiply(ya.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ya=new tt;function Vh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ar(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function xf(){const s=ar("canvas");return s.style.display="block",s}const rl={};function or(s){s in rl||(rl[s]=!0,console.warn(s))}function yf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const al=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ol=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mf(){const s={enabled:!0,workingColorSpace:jt,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(i.r=Zn(i.r),i.g=Zn(i.g),i.b=Zn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(i.r=ds(i.r),i.g=ds(i.g),i.b=ds(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pi?ra:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return or("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return or("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[jt]:{primaries:e,whitePoint:n,transfer:ra,toXYZ:al,fromXYZ:ol,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:al,fromXYZ:ol,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:At}}}),s}const ct=Mf();function Zn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ds(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Wi;class bf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Wi===void 0&&(Wi=ar("canvas")),Wi.width=e.width,Wi.height=e.height;const i=Wi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Wi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ar("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Zn(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zn(t[n]/255)*255):t[n]=Zn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sf=0;class Tc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=An(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ma(i[a].image)):r.push(Ma(i[a]))}else r=Ma(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ma(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?bf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ef=0;const ba=new R;class It extends zi{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=mi,i=mi,r=cn,a=qn,o=gn,c=Un,l=It.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=An(),this.name="",this.source=new Tc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ba).x}get height(){return this.source.getSize(ba).y}get depth(){return this.source.getSize(ba).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vs:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vs:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=Lh;It.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,n=0,i=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,v=(f+1)/2,E=(p+1)/2,T=(h+d)/4,C=(u+_)/4,D=(g+m)/4;return M>v&&M>E?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=T/n,r=C/n):v>E?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=T/i,r=D/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=C/r,i=D/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wf extends zi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new It(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:cn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Tc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Oi extends wf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Gh extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=qt,this.minFilter=qt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tf extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=qt,this.minFilter=qt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ln{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mn):Mn.fromBufferAttribute(r,a),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),mr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)),mr.applyMatrix4(e.matrixWorld),this.union(mr)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ns),gr.subVectors(this.max,Ns),Xi.subVectors(e.a,Ns),$i.subVectors(e.b,Ns),Yi.subVectors(e.c,Ns),si.subVectors($i,Xi),ri.subVectors(Yi,$i),bi.subVectors(Xi,Yi);let t=[0,-si.z,si.y,0,-ri.z,ri.y,0,-bi.z,bi.y,si.z,0,-si.x,ri.z,0,-ri.x,bi.z,0,-bi.x,-si.y,si.x,0,-ri.y,ri.x,0,-bi.y,bi.x,0];return!Sa(t,Xi,$i,Yi,gr)||(t=[1,0,0,0,1,0,0,0,1],!Sa(t,Xi,$i,Yi,gr))?!1:(_r.crossVectors(si,ri),t=[_r.x,_r.y,_r.z],Sa(t,Xi,$i,Yi,gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const kn=[new R,new R,new R,new R,new R,new R,new R,new R],Mn=new R,mr=new ln,Xi=new R,$i=new R,Yi=new R,si=new R,ri=new R,bi=new R,Ns=new R,gr=new R,_r=new R,Si=new R;function Sa(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Si.fromArray(s,r);const o=i.x*Math.abs(Si.x)+i.y*Math.abs(Si.y)+i.z*Math.abs(Si.z),c=e.dot(Si),l=t.dot(Si),h=n.dot(Si);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Af=new ln,Us=new R,Ea=new R;class Fn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Af.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Us.subVectors(e,this.center);const t=Us.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Us,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ea.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Us.copy(e.center).add(Ea)),this.expandByPoint(Us.copy(e.center).sub(Ea))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const zn=new R,wa=new R,vr=new R,ai=new R,Ta=new R,xr=new R,Aa=new R;class hr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){wa.copy(e).add(t).multiplyScalar(.5),vr.copy(t).sub(e).normalize(),ai.copy(this.origin).sub(wa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(vr),o=ai.dot(this.direction),c=-ai.dot(vr),l=ai.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(wa).addScaledVector(vr,d),f}intersectSphere(e,t){zn.subVectors(e.center,this.origin);const n=zn.dot(this.direction),i=zn.dot(zn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,i,r){Ta.subVectors(t,e),xr.subVectors(n,e),Aa.crossVectors(Ta,xr);let a=this.direction.dot(Aa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ai.subVectors(this.origin,e);const c=o*this.direction.dot(xr.crossVectors(ai,xr));if(c<0)return null;const l=o*this.direction.dot(Ta.cross(ai));if(l<0||c+l>a)return null;const h=-o*ai.dot(Aa);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ke{constructor(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m){Ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m)}set(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ke().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/qi.setFromMatrixColumn(e,0).length(),r=1/qi.setFromMatrixColumn(e,1).length(),a=1/qi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rf,e,Cf)}lookAt(e,t,n){const i=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),oi.crossVectors(n,rn),oi.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),oi.crossVectors(n,rn)),oi.normalize(),yr.crossVectors(rn,oi),i[0]=oi.x,i[4]=yr.x,i[8]=rn.x,i[1]=oi.y,i[5]=yr.y,i[9]=rn.y,i[2]=oi.z,i[6]=yr.z,i[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],M=n[7],v=n[11],E=n[15],T=i[0],C=i[4],D=i[8],S=i[12],y=i[1],P=i[5],F=i[9],G=i[13],q=i[2],X=i[6],V=i[10],ee=i[14],H=i[3],he=i[7],pe=i[11],ve=i[15];return r[0]=a*T+o*y+c*q+l*H,r[4]=a*C+o*P+c*X+l*he,r[8]=a*D+o*F+c*V+l*pe,r[12]=a*S+o*G+c*ee+l*ve,r[1]=h*T+u*y+d*q+f*H,r[5]=h*C+u*P+d*X+f*he,r[9]=h*D+u*F+d*V+f*pe,r[13]=h*S+u*G+d*ee+f*ve,r[2]=g*T+_*y+m*q+p*H,r[6]=g*C+_*P+m*X+p*he,r[10]=g*D+_*F+m*V+p*pe,r[14]=g*S+_*G+m*ee+p*ve,r[3]=x*T+M*y+v*q+E*H,r[7]=x*C+M*P+v*X+E*he,r[11]=x*D+M*F+v*V+E*pe,r[15]=x*S+M*G+v*ee+E*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-i*l*u-r*o*d+n*l*d+i*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-i*a*f+i*l*h-r*c*h)+m*(+t*l*u-t*o*f-r*a*u+n*a*f+r*o*h-n*l*h)+p*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=u*m*l-_*d*l+_*c*f-o*m*f-u*c*p+o*d*p,M=g*d*l-h*m*l-g*c*f+a*m*f+h*c*p-a*d*p,v=h*_*l-g*u*l+g*o*f-a*_*f-h*o*p+a*u*p,E=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,T=t*x+n*M+i*v+r*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=x*C,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*C,e[2]=(o*m*r-_*c*r+_*i*l-n*m*l-o*i*p+n*c*p)*C,e[3]=(u*c*r-o*d*r-u*i*l+n*d*l+o*i*f-n*c*f)*C,e[4]=M*C,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*C,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*p-t*c*p)*C,e[7]=(a*d*r-h*c*r+h*i*l-t*d*l-a*i*f+t*c*f)*C,e[8]=v*C,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*C,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*C,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*f-t*o*f)*C,e[12]=E*C,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*C,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*m-t*o*m)*C,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,x=c*l,M=c*h,v=c*u,E=n.x,T=n.y,C=n.z;return i[0]=(1-(_+p))*E,i[1]=(f+v)*E,i[2]=(g-M)*E,i[3]=0,i[4]=(f-v)*T,i[5]=(1-(d+p))*T,i[6]=(m+x)*T,i[7]=0,i[8]=(g+M)*C,i[9]=(m-x)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=qi.set(i[0],i[1],i[2]).length();const a=qi.set(i[4],i[5],i[6]).length(),o=qi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],bn.copy(this);const l=1/r,h=1/a,u=1/o;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,t.setFromRotationMatrix(bn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=In,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===In)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===aa)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=In,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===In)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===aa)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const qi=new R,bn=new Ke,Rf=new R(0,0,0),Cf=new R(1,1,1),oi=new R,yr=new R,rn=new R,cl=new Ke,ll=new _n;class vn{constructor(e=0,t=0,n=0,i=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ll.setFromEuler(this),this.setFromQuaternion(ll,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class Wh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Pf=0;const hl=new R,ji=new _n,Hn=new Ke,Mr=new R,Fs=new R,Lf=new R,Df=new _n,ul=new R(1,0,0),dl=new R(0,1,0),fl=new R(0,0,1),pl={type:"added"},If={type:"removed"},Ki={type:"childadded",child:null},Ra={type:"childremoved",child:null};class ht extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=An(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ht.DEFAULT_UP.clone();const e=new R,t=new vn,n=new _n,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ke},normalMatrix:{value:new tt}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.multiply(ji),this}rotateOnWorldAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.premultiply(ji),this}rotateX(e){return this.rotateOnAxis(ul,e)}rotateY(e){return this.rotateOnAxis(dl,e)}rotateZ(e){return this.rotateOnAxis(fl,e)}translateOnAxis(e,t){return hl.copy(e).applyQuaternion(this.quaternion),this.position.add(hl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ul,e)}translateY(e){return this.translateOnAxis(dl,e)}translateZ(e){return this.translateOnAxis(fl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Mr.copy(e):Mr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Fs,Mr,this.up):Hn.lookAt(Mr,Fs,this.up),this.quaternion.setFromRotationMatrix(Hn),i&&(Hn.extractRotation(i.matrixWorld),ji.setFromRotationMatrix(Hn),this.quaternion.premultiply(ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pl),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(If),Ra.child=e,this.dispatchEvent(Ra),Ra.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pl),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,e,Lf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,Df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ht.DEFAULT_UP=new R(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Sn=new R,Vn=new R,Ca=new R,Gn=new R,Zi=new R,Ji=new R,ml=new R,Pa=new R,La=new R,Da=new R,Ia=new ut,Na=new ut,Ua=new ut;class mn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Sn.subVectors(e,t),i.cross(Sn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Sn.subVectors(i,t),Vn.subVectors(n,t),Ca.subVectors(e,t);const a=Sn.dot(Sn),o=Sn.dot(Vn),c=Sn.dot(Ca),l=Vn.dot(Vn),h=Vn.dot(Ca),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Gn.x),c.addScaledVector(a,Gn.y),c.addScaledVector(o,Gn.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return Ia.setScalar(0),Na.setScalar(0),Ua.setScalar(0),Ia.fromBufferAttribute(e,t),Na.fromBufferAttribute(e,n),Ua.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ia,r.x),a.addScaledVector(Na,r.y),a.addScaledVector(Ua,r.z),a}static isFrontFacing(e,t,n,i){return Sn.subVectors(n,t),Vn.subVectors(e,t),Sn.cross(Vn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),Sn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;Zi.subVectors(i,n),Ji.subVectors(r,n),Pa.subVectors(e,n);const c=Zi.dot(Pa),l=Ji.dot(Pa);if(c<=0&&l<=0)return t.copy(n);La.subVectors(e,i);const h=Zi.dot(La),u=Ji.dot(La);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Zi,a);Da.subVectors(e,r);const f=Zi.dot(Da),g=Ji.dot(Da);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ji,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ml.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(ml,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Zi,a).addScaledVector(Ji,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},br={h:0,s:0,l:0};function Fa(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class He{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,ct.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ct.workingColorSpace){if(e=Ec(e,1),t=et(t,0,1),n=et(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Fa(a,r,e+1/3),this.g=Fa(a,r,e),this.b=Fa(a,r,e-1/3)}return ct.colorSpaceToWorking(this,i),this}setStyle(e,t=At){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){const n=Xh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return ct.workingToColorSpace(kt.copy(this),e),Math.round(et(kt.r*255,0,255))*65536+Math.round(et(kt.g*255,0,255))*256+Math.round(et(kt.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(kt.copy(this),t);const n=kt.r,i=kt.g,r=kt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=At){ct.workingToColorSpace(kt.copy(this),e);const t=kt.r,n=kt.g,i=kt.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ci),this.setHSL(ci.h+e,ci.s+t,ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ci),e.getHSL(br);const n=qs(ci.h,br.h,t),i=qs(ci.s,br.s,t),r=qs(ci.l,br.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new He;He.NAMES=Xh;let Nf=0;class Rn extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=An(),this.name="",this.type="Material",this.blending=hs,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=po,this.blendDst=mo,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gi,this.stencilZFail=Gi,this.stencilZPass=Gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==po&&(n.blendSrc=this.blendSrc),this.blendDst!==mo&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Tn extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new R,Sr=new me;let Uf=0;class Ct{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Uf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ec,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Sr.fromBufferAttribute(this,t),Sr.applyMatrix3(e),this.setXY(t,Sr.x,Sr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=En(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=En(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=En(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=En(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ec&&(e.usage=this.usage),e}}class $h extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yh extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class yt extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ff=0;const dn=new Ke,Oa=new ht,Qi=new R,an=new ln,Os=new ln,Ft=new R;class ft extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=An(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vh(e)?Yh:$h)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new tt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return Oa.lookAt(e),Oa.updateMatrix(),this.applyMatrix4(Oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new yt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Os.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(an.min,Os.min),an.expandByPoint(Ft),Ft.addVectors(an.max,Os.max),an.expandByPoint(Ft)):(an.expandByPoint(Os.min),an.expandByPoint(Os.max))}an.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Ft.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ft));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ft.fromBufferAttribute(o,l),c&&(Qi.fromBufferAttribute(e,l),Ft.add(Qi)),i=Math.max(i,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<n.count;D++)o[D]=new R,c[D]=new R;const l=new R,h=new R,u=new R,d=new me,f=new me,g=new me,_=new R,m=new R;function p(D,S,y){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[D].add(_),o[S].add(_),o[y].add(_),c[D].add(m),c[S].add(m),c[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let D=0,S=x.length;D<S;++D){const y=x[D],P=y.start,F=y.count;for(let G=P,q=P+F;G<q;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const M=new R,v=new R,E=new R,T=new R;function C(D){E.fromBufferAttribute(i,D),T.copy(E);const S=o[D];M.copy(S),M.sub(E.multiplyScalar(E.dot(S))).normalize(),v.crossVectors(T,S);const P=v.dot(c[D])<0?-1:1;a.setXYZW(D,M.x,M.y,M.z,P)}for(let D=0,S=x.length;D<S;++D){const y=x[D],P=y.start,F=y.count;for(let G=P,q=P+F;G<q;G+=3)C(e.getX(G+0)),C(e.getX(G+1)),C(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new R,r=new R,a=new R,o=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ct(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ft,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const gl=new Ke,Ei=new hr,Er=new Fn,_l=new R,wr=new R,Tr=new R,Ar=new R,Ba=new R,Rr=new R,vl=new R,Cr=new R;class Ye extends ht{constructor(e=new ft,t=new Tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Rr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Ba.fromBufferAttribute(u,e),a?Rr.addScaledVector(Ba,h):Rr.addScaledVector(Ba.sub(t),h))}t.add(Rr)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(r),Ei.copy(e.ray).recast(e.near),!(Er.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Er,_l)===null||Ei.origin.distanceToSquared(_l)>(e.far-e.near)**2))&&(gl.copy(r).invert(),Ei.copy(e.ray).applyMatrix4(gl),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,E=M;v<E;v+=3){const T=o.getX(v),C=o.getX(v+1),D=o.getX(v+2);i=Pr(this,p,e,n,l,h,u,T,C,D),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=o.getX(m),M=o.getX(m+1),v=o.getX(m+2);i=Pr(this,a,e,n,l,h,u,x,M,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,E=M;v<E;v+=3){const T=v,C=v+1,D=v+2;i=Pr(this,p,e,n,l,h,u,T,C,D),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,M=m+1,v=m+2;i=Pr(this,a,e,n,l,h,u,x,M,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Of(s,e,t,n,i,r,a,o){let c;if(e.side===Yt?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===ei,o),c===null)return null;Cr.copy(o),Cr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Cr);return l<t.near||l>t.far?null:{distance:l,point:Cr.clone(),object:s}}function Pr(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,wr),s.getVertexPosition(c,Tr),s.getVertexPosition(l,Ar);const h=Of(s,e,t,n,wr,Tr,Ar,vl);if(h){const u=new R;mn.getBarycoord(vl,wr,Tr,Ar,u),i&&(h.uv=mn.getInterpolatedAttribute(i,o,c,l,u,new me)),r&&(h.uv1=mn.getInterpolatedAttribute(r,o,c,l,u,new me)),a&&(h.normal=mn.getInterpolatedAttribute(a,o,c,l,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new R,materialIndex:0};mn.getNormal(wr,Tr,Ar,d.normal),h.face=d,h.barycoord=u}return h}class Zt extends ft{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(u,2));function g(_,m,p,x,M,v,E,T,C,D,S){const y=v/C,P=E/D,F=v/2,G=E/2,q=T/2,X=C+1,V=D+1;let ee=0,H=0;const he=new R;for(let pe=0;pe<V;pe++){const ve=pe*P-G;for(let Ee=0;Ee<X;Ee++){const st=Ee*y-F;he[_]=st*x,he[m]=ve*M,he[p]=q,l.push(he.x,he.y,he.z),he[_]=0,he[m]=0,he[p]=T>0?1:-1,h.push(he.x,he.y,he.z),u.push(Ee/C),u.push(1-pe/D),ee+=1}}for(let pe=0;pe<D;pe++)for(let ve=0;ve<C;ve++){const Ee=d+ve+X*pe,st=d+ve+X*(pe+1),ot=d+(ve+1)+X*(pe+1),Ze=d+(ve+1)+X*pe;c.push(Ee,st,Ze),c.push(st,ot,Ze),H+=6}o.addGroup(f,H,S),f+=H,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ys(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Wt(s){const e={};for(let t=0;t<s.length;t++){const n=ys(s[t]);for(const i in n)e[i]=n[i]}return e}function Bf(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function qh(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const kf={clone:ys,merge:Wt};var zf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vi extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zf,this.fragmentShader=Hf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ys(e.uniforms),this.uniformsGroups=Bf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jh extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const li=new R,xl=new me,yl=new me;class Xt extends jh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(us*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(li.x,li.y).multiplyScalar(-e/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(li.x,li.y).multiplyScalar(-e/li.z)}getViewSize(e,t){return this.getViewBounds(e,xl,yl),t.subVectors(yl,xl)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(us*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const es=-90,ts=1;class Vf extends ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Xt(es,ts,e,t);i.layers=this.layers,this.add(i);const r=new Xt(es,ts,e,t);r.layers=this.layers,this.add(r);const a=new Xt(es,ts,e,t);a.layers=this.layers,this.add(a);const o=new Xt(es,ts,e,t);o.layers=this.layers,this.add(o);const c=new Xt(es,ts,e,t);c.layers=this.layers,this.add(c);const l=new Xt(es,ts,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===aa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Kh extends It{constructor(e=[],t=gs,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gf extends Oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Kh(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Zt(5,5,5),r=new vi({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:gi});r.uniforms.tEquirect.value=t;const a=new Ye(i,r),o=t.minFilter;return t.minFilter===qn&&(t.minFilter=cn),new Vf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}class dt extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wf={type:"move"};class ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wf)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Zh extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Xf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ec,this.updateRanges=[],this.version=0,this.uuid=An()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new R;class Ac{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=En(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=En(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=En(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=En(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ac(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ml=new R,bl=new ut,Sl=new ut,$f=new R,El=new Ke,Lr=new R,za=new Fn,wl=new Ke,Ha=new hr;class Yf extends Ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Zc,this.bindMatrix=new Ke,this.bindMatrixInverse=new Ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ln),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lr),this.boundingBox.expandByPoint(Lr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Fn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lr),this.boundingSphere.expandByPoint(Lr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),za.copy(this.boundingSphere),za.applyMatrix4(i),e.ray.intersectsSphere(za)!==!1&&(wl.copy(i).invert(),Ha.copy(e.ray).applyMatrix4(wl),!(this.boundingBox!==null&&Ha.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ha)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ut,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Zc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Gd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;bl.fromBufferAttribute(i.attributes.skinIndex,e),Sl.fromBufferAttribute(i.attributes.skinWeight,e),Ml.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Sl.getComponent(r);if(a!==0){const o=bl.getComponent(r);El.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector($f.copy(Ml).applyMatrix4(El),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Jh extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Qh extends It{constructor(e=null,t=1,n=1,i,r,a,o,c,l=qt,h=qt,u,d){super(null,a,o,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Tl=new Ke,qf=new Ke;class Rc{constructor(e=[],t=[]){this.uuid=An(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:qf;Tl.multiplyMatrices(o,t[r]),Tl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Rc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Qh(t,e,e,gn,wn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Jh),this.bones.push(a),this.boneInverses.push(new Ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class tc extends Ct{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ns=new Ke,Al=new Ke,Dr=[],Rl=new ln,jf=new Ke,Bs=new Ye,ks=new Fn;class Ms extends Ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new tc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,jf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),Rl.copy(e.boundingBox).applyMatrix4(ns),this.boundingBox.union(Rl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),ks.copy(e.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(ks)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(n),e.ray.intersectsSphere(ks)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ns),Al.multiplyMatrices(n,ns),Bs.matrixWorld=Al,Bs.raycast(e,Dr);for(let a=0,o=Dr.length;a<o;a++){const c=Dr[a];c.instanceId=r,c.object=this,t.push(c)}Dr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new tc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qh(new Float32Array(i*this.count),i,this.count,xc,wn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Va=new R,Kf=new R,Zf=new tt;class fi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Va.subVectors(n,t).cross(Kf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Va),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Zf.getNormalMatrix(e),i=this.coplanarPoint(Va).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wi=new Fn,Jf=new me(.5,.5),Ir=new R;class Cc{constructor(e=new fi,t=new fi,n=new fi,i=new fi,r=new fi,a=new fi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],x=r[12],M=r[13],v=r[14],E=r[15];if(i[0].setComponents(l-a,f-h,p-g,E-x).normalize(),i[1].setComponents(l+a,f+h,p+g,E+x).normalize(),i[2].setComponents(l+o,f+u,p+_,E+M).normalize(),i[3].setComponents(l-o,f-u,p-_,E-M).normalize(),n)i[4].setComponents(c,d,m,v).normalize(),i[5].setComponents(l-c,f-d,p-m,E-v).normalize();else if(i[4].setComponents(l-c,f-d,p-m,E-v).normalize(),t===In)i[5].setComponents(l+c,f+d,p+m,E+v).normalize();else if(t===aa)i[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(e){wi.center.set(0,0,0);const t=Jf.distanceTo(e.center);return wi.radius=.7071067811865476+t,wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ir.x=i.normal.x>0?e.max.x:e.min.x,Ir.y=i.normal.y>0?e.max.y:e.min.y,Ir.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ir)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Bi extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const oa=new R,ca=new R,Cl=new Ke,zs=new hr,Nr=new Fn,Ga=new R,Pl=new R;class ki extends ht{constructor(e=new ft,t=new Bi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)oa.fromBufferAttribute(t,i-1),ca.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=oa.distanceTo(ca);e.setAttribute("lineDistance",new yt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(i),Nr.radius+=r,e.ray.intersectsSphere(Nr)===!1)return;Cl.copy(i).invert(),zs.copy(e.ray).applyMatrix4(Cl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),x=h.getX(_+1),M=Ur(this,e,zs,c,p,x,_);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=Ur(this,e,zs,c,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=Ur(this,e,zs,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Ur(this,e,zs,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ur(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(oa.fromBufferAttribute(o,i),ca.fromBufferAttribute(o,r),t.distanceSqToSegment(oa,ca,Ga,Pl)>n)return;Ga.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ga);if(!(l<e.near||l>e.far))return{distance:l,point:Pl.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Ll=new R,Dl=new R;class Pc extends ki{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Ll.fromBufferAttribute(t,i),Dl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ll.distanceTo(Dl);e.setAttribute("lineDistance",new yt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qf extends ki{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class eu extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Il=new Ke,nc=new hr,Fr=new Fn,Or=new R;class ep extends ht{constructor(e=new ft,t=new eu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(i),Fr.radius+=r,e.ray.intersectsSphere(Fr)===!1)return;Il.copy(i).invert(),nc.copy(e.ray).applyMatrix4(Il);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);Or.fromBufferAttribute(u,m),Nl(Or,m,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Or.fromBufferAttribute(u,g),Nl(Or,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Nl(s,e,t,n,i,r,a){const o=nc.distanceSqToPoint(s);if(o<t){const c=new R;nc.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class tu extends It{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class nu extends It{constructor(e,t,n=Fi,i,r,a,o=qt,c=qt,l,h=nr,u=1){if(h!==nr&&h!==ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Tc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class iu extends It{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class da extends ft{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new R,h=new me;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new yt(a,3)),this.setAttribute("normal",new yt(o,3)),this.setAttribute("uv",new yt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new da(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class en extends ft{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;x(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new yt(u,3)),this.setAttribute("normal",new yt(d,3)),this.setAttribute("uv",new yt(f,2));function x(){const v=new R,E=new R;let T=0;const C=(t-e)/n;for(let D=0;D<=r;D++){const S=[],y=D/r,P=y*(t-e)+e;for(let F=0;F<=i;F++){const G=F/i,q=G*c+o,X=Math.sin(q),V=Math.cos(q);E.x=P*X,E.y=-y*n+m,E.z=P*V,u.push(E.x,E.y,E.z),v.set(X,C,V).normalize(),d.push(v.x,v.y,v.z),f.push(G,1-y),S.push(g++)}_.push(S)}for(let D=0;D<i;D++)for(let S=0;S<r;S++){const y=_[S][D],P=_[S+1][D],F=_[S+1][D+1],G=_[S][D+1];(e>0||S!==0)&&(h.push(y,P,G),T+=3),(t>0||S!==r-1)&&(h.push(P,F,G),T+=3)}l.addGroup(p,T,0),p+=T}function M(v){const E=g,T=new me,C=new R;let D=0;const S=v===!0?e:t,y=v===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const P=g;for(let F=0;F<=i;F++){const q=F/i*c+o,X=Math.cos(q),V=Math.sin(q);C.x=S*V,C.y=m*y,C.z=S*X,u.push(C.x,C.y,C.z),d.push(0,y,0),T.x=X*.5+.5,T.y=V*.5*y+.5,f.push(T.x,T.y),g++}for(let F=0;F<i;F++){const G=E+F,q=P+F;v===!0?h.push(q,q+1,G):h.push(q+1,q,G),D+=3}l.addGroup(p,D,v===!0?1:2),p+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new en(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Br=new R,kr=new R,Wa=new R,zr=new mn;class su extends ft{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(us*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=zr;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),zr.getNormal(Wa),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const M=(x+1)%3,v=u[x],E=u[M],T=zr[h[x]],C=zr[h[M]],D=`${v}_${E}`,S=`${E}_${v}`;S in d&&d[S]?(Wa.dot(d[S].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(C.x,C.y,C.z)),d[S]=null):D in d||(d[D]={index0:l[x],index1:l[M],normal:Wa.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];Br.fromBufferAttribute(o,_),kr.fromBufferAttribute(o,m),f.push(Br.x,Br.y,Br.z),f.push(kr.x,kr.y,kr.z)}this.setAttribute("position",new yt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ti{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new me:new R);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],r=[],a=[],o=new R,c=new Ke;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(et(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(et(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ru extends ti{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new me){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class tp extends ru{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Lc(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const Hr=new R,Xa=new Lc,$a=new Lc,Ya=new Lc;class au extends ti{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(Hr.subVectors(i[0],i[1]).add(i[0]),l=Hr);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Hr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Hr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Xa.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),$a.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),Ya.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Xa.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),$a.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Ya.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Xa.calc(c),$a.calc(c),Ya.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ul(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function np(s,e){const t=1-s;return t*t*e}function ip(s,e){return 2*(1-s)*s*e}function sp(s,e){return s*s*e}function js(s,e,t,n){return np(s,e)+ip(s,t)+sp(s,n)}function rp(s,e){const t=1-s;return t*t*t*e}function ap(s,e){const t=1-s;return 3*t*t*s*e}function op(s,e){return 3*(1-s)*s*s*e}function cp(s,e){return s*s*s*e}function Ks(s,e,t,n,i){return rp(s,e)+ap(s,t)+op(s,n)+cp(s,i)}class lp extends ti{constructor(e=new me,t=new me,n=new me,i=new me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new me){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ks(e,i.x,r.x,a.x,o.x),Ks(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hp extends ti{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ks(e,i.x,r.x,a.x,o.x),Ks(e,i.y,r.y,a.y,o.y),Ks(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class up extends ti{constructor(e=new me,t=new me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new me){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class dp extends ti{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fp extends ti{constructor(e=new me,t=new me,n=new me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new me){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(js(e,i.x,r.x,a.x),js(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ou extends ti{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(js(e,i.x,r.x,a.x),js(e,i.y,r.y,a.y),js(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pp extends ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new me){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Ul(o,c.x,l.x,h.x,u.x),Ul(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new me().fromArray(i))}return this}}var mp=Object.freeze({__proto__:null,ArcCurve:tp,CatmullRomCurve3:au,CubicBezierCurve:lp,CubicBezierCurve3:hp,EllipseCurve:ru,LineCurve:up,LineCurve3:dp,QuadraticBezierCurve:fp,QuadraticBezierCurve3:ou,SplineCurve:pp});class As extends ft{constructor(e=[new me(0,-.5),new me(.5,0),new me(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=et(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],h=1/t,u=new R,d=new me,f=new R,g=new R,_=new R;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let x=0;x<=t;x++){const M=n+x*h*i,v=Math.sin(M),E=Math.cos(M);for(let T=0;T<=e.length-1;T++){u.x=e[T].x*v,u.y=e[T].y,u.z=e[T].x*E,a.push(u.x,u.y,u.z),d.x=x/t,d.y=T/(e.length-1),o.push(d.x,d.y);const C=c[3*T+0]*v,D=c[3*T+1],S=c[3*T+0]*E;l.push(C,D,S)}}for(let x=0;x<t;x++)for(let M=0;M<e.length-1;M++){const v=M+x*e.length,E=v,T=v+e.length,C=v+e.length+1,D=v+1;r.push(E,T,D),r.push(C,D,T)}this.setIndex(r),this.setAttribute("position",new yt(a,3)),this.setAttribute("uv",new yt(o,2)),this.setAttribute("normal",new yt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new As(e.points,e.segments,e.phiStart,e.phiLength)}}class xi extends ft{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const x=p*d-a;for(let M=0;M<l;M++){const v=M*u-r;g.push(v,-x,0),_.push(0,0,1),m.push(M/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<o;x++){const M=x+l*p,v=x+l*(p+1),E=x+1+l*(p+1),T=x+1+l*p;f.push(M,v,T),f.push(v,E,T)}this.setIndex(f),this.setAttribute("position",new yt(g,3)),this.setAttribute("normal",new yt(_,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Dc extends ft{constructor(e=new ou(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new R,c=new R,l=new me;let h=new R;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new yt(u,3)),this.setAttribute("normal",new yt(d,3)),this.setAttribute("uv",new yt(f,2));function _(){for(let M=0;M<t;M++)m(M);m(r===!1?t:0),x(),p()}function m(M){h=e.getPointAt(M/t,h);const v=a.normals[M],E=a.binormals[M];for(let T=0;T<=i;T++){const C=T/i*Math.PI*2,D=Math.sin(C),S=-Math.cos(C);c.x=S*v.x+D*E.x,c.y=S*v.y+D*E.y,c.z=S*v.z+D*E.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function p(){for(let M=1;M<=t;M++)for(let v=1;v<=i;v++){const E=(i+1)*(M-1)+(v-1),T=(i+1)*M+(v-1),C=(i+1)*M+v,D=(i+1)*(M-1)+v;g.push(E,T,D),g.push(T,C,D)}}function x(){for(let M=0;M<=t;M++)for(let v=0;v<=i;v++)l.x=M/t,l.y=v/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Dc(new mp[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Qe extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sc,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Kt extends Qe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return et(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class gp extends Rn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sc,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _p extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$d,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vp extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Fl extends Bi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Vr(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function xp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function yp(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ol(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function cu(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class ur{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Mp extends ur{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Jc,endingEnd:Jc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Qc:r=e,o=2*t-n;break;case el:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Qc:a=e,c=2*n-t;break;case el:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,x=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,M=(-1-f)*m+(1.5+f)*_+.5*g,v=f*m-f*_;for(let E=0;E!==o;++E)r[E]=p*a[h+E]+x*a[l+E]+M*a[c+E]+v*a[u+E];return r}}class bp extends ur{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}}class Sp extends ur{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Cn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Vr(t,this.TimeBufferType),this.values=Vr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Vr(e.times,Array),values:Vr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mp(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case sr:t=this.InterpolantFactoryMethodDiscrete;break;case rr:t=this.InterpolantFactoryMethodLinear;break;case va:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return sr;case this.InterpolantFactoryMethodLinear:return rr;case this.InterpolantFactoryMethodSmooth:return va}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&xp(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===va,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Cn.prototype.ValueTypeName="";Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=rr;class Rs extends Cn{constructor(e,t,n){super(e,t,n)}}Rs.prototype.ValueTypeName="bool";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=sr;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;class lu extends Cn{constructor(e,t,n,i){super(e,t,n,i)}}lu.prototype.ValueTypeName="color";class bs extends Cn{constructor(e,t,n,i){super(e,t,n,i)}}bs.prototype.ValueTypeName="number";class Ep extends ur{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let h=l+o;l!==h;l+=4)_n.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Ss extends Cn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ep(this.times,this.values,this.getValueSize(),e)}}Ss.prototype.ValueTypeName="quaternion";Ss.prototype.InterpolantFactoryMethodSmooth=void 0;class Cs extends Cn{constructor(e,t,n){super(e,t,n)}}Cs.prototype.ValueTypeName="string";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=sr;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class Es extends Cn{constructor(e,t,n,i){super(e,t,n,i)}}Es.prototype.ValueTypeName="vector";class wp{constructor(e="",t=-1,n=[],i=Wd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=An(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Ap(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Cn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const h=yp(c);c=Ol(c,1,h),l=Ol(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new bs(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];cu(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let x=0;x!==d[g].morphTargets.length;++x){const M=d[g];m.push(M.time),p.push(M.morphTarget===_?1:0)}i.push(new bs(".morphTargetInfluence["+_+"]",m,p))}c=f.length*a}else{const f=".bones["+t[u].name+"]";n(Es,f+".position",d,"pos",i),n(Ss,f+".quaternion",d,"rot",i),n(Es,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Tp(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return bs;case"vector":case"vector2":case"vector3":case"vector4":return Es;case"color":return lu;case"quaternion":return Ss;case"bool":case"boolean":return Rs;case"string":return Cs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Ap(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Tp(s.type);if(s.times===void 0){const t=[],n=[];cu(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const jn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class hu{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Rp=new hu;class Hi{constructor(e){this.manager=e!==void 0?e:Rp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Hi.DEFAULT_MATERIAL_NAME="__DEFAULT";const Wn={};class Cp extends Error{constructor(e,t){super(e),this.response=t}}class Ic extends Hi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=jn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Wn[e]!==void 0){Wn[e].push({onLoad:t,onProgress:n,onError:i});return}Wn[e]=[],Wn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Wn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){x();function x(){u.read().then(({done:M,value:v})=>{if(M)p.close();else{_+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let T=0,C=h.length;T<C;T++){const D=h[T];D.onProgress&&D.onProgress(E)}p.enqueue(v),x()}},M=>{p.error(M)})}}});return new Response(m)}else throw new Cp(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{jn.add(`file:${e}`,l);const h=Wn[e];delete Wn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Wn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Wn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const is=new WeakMap;class Pp extends Hi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=jn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=is.get(a);u===void 0&&(u=[],is.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=ar("img");function c(){h(),t&&t(this);const u=is.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}is.delete(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),jn.remove(`image:${e}`);const d=is.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}is.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),jn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Lp extends Hi{constructor(e){super(e)}load(e,t,n,i){const r=new It,a=new Pp(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class fa extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Dp extends fa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const qa=new Ke,Bl=new R,kl=new R;class Nc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.mapType=Un,this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cc,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Bl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bl),kl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(kl),t.updateMatrixWorld(),qa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ip extends Nc{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=xs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Np extends fa{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ip}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const zl=new Ke,Hs=new R,ja=new R;class Up extends Nc{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new me(4,2),this._viewportCount=6,this._viewports=[new ut(2,1,1,1),new ut(0,1,1,1),new ut(3,1,1,1),new ut(1,1,1,1),new ut(3,0,1,1),new ut(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Hs),ja.copy(n.position),ja.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ja),n.updateMatrixWorld(),i.makeTranslation(-Hs.x,-Hs.y,-Hs.z),zl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zl,n.coordinateSystem,n.reversedDepth)}}class uu extends fa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Up}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class pa extends jh{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Fp extends Nc{constructor(){super(new pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ic extends fa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new Fp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Zs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Ka=new WeakMap;class Op extends Hi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=jn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if(Ka.has(a)===!0)i&&i(Ka.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return jn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Ka.set(c,l),jn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});jn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Bp extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Uc="\\[\\]\\.:\\/",kp=new RegExp("["+Uc+"]","g"),Fc="[^"+Uc+"]",zp="[^"+Uc.replace("\\.","")+"]",Hp=/((?:WC+[\/:])*)/.source.replace("WC",Fc),Vp=/(WCOD+)?/.source.replace("WCOD",zp),Gp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fc),Wp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fc),Xp=new RegExp("^"+Hp+Vp+Gp+Wp+"$"),$p=["material","materials","bones","map"];class Yp{constructor(e,t,n){const i=n||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class gt{constructor(e,t,n){this.path=t,this.parsedPath=n||gt.parseTrackName(t),this.node=gt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new gt.Composite(e,t,n):new gt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(kp,"")}static parseTrackName(e){const t=Xp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);$p.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=gt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}gt.Composite=Yp;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Hl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class qp extends zi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Vl(s,e,t,n){const i=jp(n);switch(t){case Oh:return s*e;case xc:return s*e/i.components*i.byteLength;case yc:return s*e/i.components*i.byteLength;case kh:return s*e*2/i.components*i.byteLength;case Mc:return s*e*2/i.components*i.byteLength;case Bh:return s*e*3/i.components*i.byteLength;case gn:return s*e*4/i.components*i.byteLength;case bc:return s*e*4/i.components*i.byteLength;case Zr:case Jr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Qr:case ea:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case To:case Ro:return Math.max(s,16)*Math.max(e,8)/4;case wo:case Ao:return Math.max(s,8)*Math.max(e,8)/2;case Co:case Po:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Lo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Io:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case No:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Oo:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ko:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case zo:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Go:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Xo:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case $o:case Yo:case qo:return Math.ceil(s/4)*Math.ceil(e/4)*16;case jo:case Ko:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Zo:case Jo:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jp(s){switch(s){case Un:case Ih:return{byteLength:1,components:1};case er:case Nh:case lr:return{byteLength:2,components:1};case _c:case vc:return{byteLength:2,components:4};case Fi:case gc:case wn:return{byteLength:4,components:1};case Uh:case Fh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function du(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Kp(s){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(s.bindBuffer(l,o),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var Zp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jp=`#ifdef USE_ALPHAHASH
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
#endif`,Qp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,em=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,im=`#ifdef USE_AOMAP
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
#endif`,sm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rm=`#ifdef USE_BATCHING
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
#endif`,am=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,om=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,hm=`#ifdef USE_IRIDESCENCE
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
#endif`,um=`#ifdef USE_BUMPMAP
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
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_m=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ym=`#define PI 3.141592653589793
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
} // validated`,Mm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bm=`vec3 transformedNormal = objectNormal;
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
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Em=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Am="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Pm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lm=`#ifdef USE_ENVMAP
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
#endif`,Dm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Im=`#ifdef USE_ENVMAP
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
#endif`,Nm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Um=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Om=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bm=`#ifdef USE_GRADIENTMAP
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
}`,km=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vm=`uniform bool receiveShadow;
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
#endif`,Gm=`#ifdef USE_ENVMAP
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
#endif`,Wm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$m=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ym=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qm=`PhysicalMaterial material;
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
#endif`,jm=`struct PhysicalMaterial {
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
}`,Km=`
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
#endif`,Zm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Jm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,eg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ng=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ig=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ag=`#if defined( USE_POINTS_UV )
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
#endif`,og=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ug=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dg=`#ifdef USE_MORPHTARGETS
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
#endif`,fg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,mg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xg=`#ifdef USE_NORMALMAP
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
#endif`,yg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Eg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ag=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ig=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ng=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ug=`float getShadowMask() {
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
}`,Fg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Og=`#ifdef USE_SKINNING
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
#endif`,Bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kg=`#ifdef USE_SKINNING
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
#endif`,zg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wg=`#ifdef USE_TRANSMISSION
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
#endif`,Xg=`#ifdef USE_TRANSMISSION
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
#endif`,$g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zg=`uniform sampler2D t2D;
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
}`,Jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,e0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n0=`#include <common>
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
}`,i0=`#if DEPTH_PACKING == 3200
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
}`,s0=`#define DISTANCE
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
}`,r0=`#define DISTANCE
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
}`,a0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,o0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`uniform float scale;
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
}`,l0=`uniform vec3 diffuse;
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
}`,h0=`#include <common>
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
}`,u0=`uniform vec3 diffuse;
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
}`,d0=`#define LAMBERT
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
}`,f0=`#define LAMBERT
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
}`,p0=`#define MATCAP
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
}`,m0=`#define MATCAP
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
}`,g0=`#define NORMAL
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
}`,_0=`#define NORMAL
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
}`,v0=`#define PHONG
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
}`,x0=`#define PHONG
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
}`,y0=`#define STANDARD
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
}`,M0=`#define STANDARD
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
}`,b0=`#define TOON
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
}`,S0=`#define TOON
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
}`,E0=`uniform float size;
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
}`,w0=`uniform vec3 diffuse;
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
}`,T0=`#include <common>
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
}`,A0=`uniform vec3 color;
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
}`,R0=`uniform float rotation;
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
}`,C0=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:Zp,alphahash_pars_fragment:Jp,alphamap_fragment:Qp,alphamap_pars_fragment:em,alphatest_fragment:tm,alphatest_pars_fragment:nm,aomap_fragment:im,aomap_pars_fragment:sm,batching_pars_vertex:rm,batching_vertex:am,begin_vertex:om,beginnormal_vertex:cm,bsdfs:lm,iridescence_fragment:hm,bumpmap_pars_fragment:um,clipping_planes_fragment:dm,clipping_planes_pars_fragment:fm,clipping_planes_pars_vertex:pm,clipping_planes_vertex:mm,color_fragment:gm,color_pars_fragment:_m,color_pars_vertex:vm,color_vertex:xm,common:ym,cube_uv_reflection_fragment:Mm,defaultnormal_vertex:bm,displacementmap_pars_vertex:Sm,displacementmap_vertex:Em,emissivemap_fragment:wm,emissivemap_pars_fragment:Tm,colorspace_fragment:Am,colorspace_pars_fragment:Rm,envmap_fragment:Cm,envmap_common_pars_fragment:Pm,envmap_pars_fragment:Lm,envmap_pars_vertex:Dm,envmap_physical_pars_fragment:Gm,envmap_vertex:Im,fog_vertex:Nm,fog_pars_vertex:Um,fog_fragment:Fm,fog_pars_fragment:Om,gradientmap_pars_fragment:Bm,lightmap_pars_fragment:km,lights_lambert_fragment:zm,lights_lambert_pars_fragment:Hm,lights_pars_begin:Vm,lights_toon_fragment:Wm,lights_toon_pars_fragment:Xm,lights_phong_fragment:$m,lights_phong_pars_fragment:Ym,lights_physical_fragment:qm,lights_physical_pars_fragment:jm,lights_fragment_begin:Km,lights_fragment_maps:Zm,lights_fragment_end:Jm,logdepthbuf_fragment:Qm,logdepthbuf_pars_fragment:eg,logdepthbuf_pars_vertex:tg,logdepthbuf_vertex:ng,map_fragment:ig,map_pars_fragment:sg,map_particle_fragment:rg,map_particle_pars_fragment:ag,metalnessmap_fragment:og,metalnessmap_pars_fragment:cg,morphinstance_vertex:lg,morphcolor_vertex:hg,morphnormal_vertex:ug,morphtarget_pars_vertex:dg,morphtarget_vertex:fg,normal_fragment_begin:pg,normal_fragment_maps:mg,normal_pars_fragment:gg,normal_pars_vertex:_g,normal_vertex:vg,normalmap_pars_fragment:xg,clearcoat_normal_fragment_begin:yg,clearcoat_normal_fragment_maps:Mg,clearcoat_pars_fragment:bg,iridescence_pars_fragment:Sg,opaque_fragment:Eg,packing:wg,premultiplied_alpha_fragment:Tg,project_vertex:Ag,dithering_fragment:Rg,dithering_pars_fragment:Cg,roughnessmap_fragment:Pg,roughnessmap_pars_fragment:Lg,shadowmap_pars_fragment:Dg,shadowmap_pars_vertex:Ig,shadowmap_vertex:Ng,shadowmask_pars_fragment:Ug,skinbase_vertex:Fg,skinning_pars_vertex:Og,skinning_vertex:Bg,skinnormal_vertex:kg,specularmap_fragment:zg,specularmap_pars_fragment:Hg,tonemapping_fragment:Vg,tonemapping_pars_fragment:Gg,transmission_fragment:Wg,transmission_pars_fragment:Xg,uv_pars_fragment:$g,uv_pars_vertex:Yg,uv_vertex:qg,worldpos_vertex:jg,background_vert:Kg,background_frag:Zg,backgroundCube_vert:Jg,backgroundCube_frag:Qg,cube_vert:e0,cube_frag:t0,depth_vert:n0,depth_frag:i0,distanceRGBA_vert:s0,distanceRGBA_frag:r0,equirect_vert:a0,equirect_frag:o0,linedashed_vert:c0,linedashed_frag:l0,meshbasic_vert:h0,meshbasic_frag:u0,meshlambert_vert:d0,meshlambert_frag:f0,meshmatcap_vert:p0,meshmatcap_frag:m0,meshnormal_vert:g0,meshnormal_frag:_0,meshphong_vert:v0,meshphong_frag:x0,meshphysical_vert:y0,meshphysical_frag:M0,meshtoon_vert:b0,meshtoon_frag:S0,points_vert:E0,points_frag:w0,shadow_vert:T0,shadow_frag:A0,sprite_vert:R0,sprite_frag:C0},_e={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},Dn={basic:{uniforms:Wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:Wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new He(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:Wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:Wt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:Wt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new He(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:Wt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:Wt([_e.points,_e.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:Wt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:Wt([_e.common,_e.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:Wt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:Wt([_e.sprite,_e.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:Wt([_e.common,_e.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:Wt([_e.lights,_e.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};Dn.physical={uniforms:Wt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};const Gr={r:0,b:0,g:0},Ti=new vn,P0=new Ke;function L0(s,e,t,n,i,r,a){const o=new He(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?t:e).get(v)),v}function _(M){let v=!1;const E=g(M);E===null?p(o,c):E&&E.isColor&&(p(E,1),v=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(M,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===ua)?(h===void 0&&(h=new Ye(new Zt(1,1,1),new vi({name:"BackgroundCubeMaterial",uniforms:ys(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ti.copy(v.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(P0.makeRotationFromEuler(Ti)),h.material.toneMapped=ct.getTransfer(E.colorSpace)!==vt,(u!==E||d!==E.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new Ye(new xi(2,2),new vi({name:"BackgroundMaterial",uniforms:ys(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ct.getTransfer(E.colorSpace)!==vt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,v){M.getRGB(Gr,qh(s)),n.buffers.color.setClear(Gr.r,Gr.g,Gr.b,v,a)}function x(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,v=1){o.set(M),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(o,c)},render:_,addToRenderList:m,dispose:x}}function D0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(y,P,F,G,q){let X=!1;const V=u(G,F,P);r!==V&&(r=V,l(r.object)),X=f(y,G,F,q),X&&g(y,G,F,q),q!==null&&e.update(q,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,v(y,P,F,G),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return s.createVertexArray()}function l(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,P,F){const G=F.wireframe===!0;let q=n[y.id];q===void 0&&(q={},n[y.id]=q);let X=q[P.id];X===void 0&&(X={},q[P.id]=X);let V=X[G];return V===void 0&&(V=d(c()),X[G]=V),V}function d(y){const P=[],F=[],G=[];for(let q=0;q<t;q++)P[q]=0,F[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:G,object:y,attributes:{},index:null}}function f(y,P,F,G){const q=r.attributes,X=P.attributes;let V=0;const ee=F.getAttributes();for(const H in ee)if(ee[H].location>=0){const pe=q[H];let ve=X[H];if(ve===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(ve=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(ve=y.instanceColor)),pe===void 0||pe.attribute!==ve||ve&&pe.data!==ve.data)return!0;V++}return r.attributesNum!==V||r.index!==G}function g(y,P,F,G){const q={},X=P.attributes;let V=0;const ee=F.getAttributes();for(const H in ee)if(ee[H].location>=0){let pe=X[H];pe===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor));const ve={};ve.attribute=pe,pe&&pe.data&&(ve.data=pe.data),q[H]=ve,V++}r.attributes=q,r.attributesNum=V,r.index=G}function _(){const y=r.newAttributes;for(let P=0,F=y.length;P<F;P++)y[P]=0}function m(y){p(y,0)}function p(y,P){const F=r.newAttributes,G=r.enabledAttributes,q=r.attributeDivisors;F[y]=1,G[y]===0&&(s.enableVertexAttribArray(y),G[y]=1),q[y]!==P&&(s.vertexAttribDivisor(y,P),q[y]=P)}function x(){const y=r.newAttributes,P=r.enabledAttributes;for(let F=0,G=P.length;F<G;F++)P[F]!==y[F]&&(s.disableVertexAttribArray(F),P[F]=0)}function M(y,P,F,G,q,X,V){V===!0?s.vertexAttribIPointer(y,P,F,q,X):s.vertexAttribPointer(y,P,F,G,q,X)}function v(y,P,F,G){_();const q=G.attributes,X=F.getAttributes(),V=P.defaultAttributeValues;for(const ee in X){const H=X[ee];if(H.location>=0){let he=q[ee];if(he===void 0&&(ee==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),ee==="instanceColor"&&y.instanceColor&&(he=y.instanceColor)),he!==void 0){const pe=he.normalized,ve=he.itemSize,Ee=e.get(he);if(Ee===void 0)continue;const st=Ee.buffer,ot=Ee.type,Ze=Ee.bytesPerElement,Z=ot===s.INT||ot===s.UNSIGNED_INT||he.gpuType===gc;if(he.isInterleavedBufferAttribute){const Q=he.data,Se=Q.stride,ae=he.offset;if(Q.isInstancedInterleavedBuffer){for(let oe=0;oe<H.locationSize;oe++)p(H.location+oe,Q.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let oe=0;oe<H.locationSize;oe++)m(H.location+oe);s.bindBuffer(s.ARRAY_BUFFER,st);for(let oe=0;oe<H.locationSize;oe++)M(H.location+oe,ve/H.locationSize,ot,pe,Se*Ze,(ae+ve/H.locationSize*oe)*Ze,Z)}else{if(he.isInstancedBufferAttribute){for(let Q=0;Q<H.locationSize;Q++)p(H.location+Q,he.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Q=0;Q<H.locationSize;Q++)m(H.location+Q);s.bindBuffer(s.ARRAY_BUFFER,st);for(let Q=0;Q<H.locationSize;Q++)M(H.location+Q,ve/H.locationSize,ot,pe,ve*Ze,ve/H.locationSize*Q*Ze,Z)}}else if(V!==void 0){const pe=V[ee];if(pe!==void 0)switch(pe.length){case 2:s.vertexAttrib2fv(H.location,pe);break;case 3:s.vertexAttrib3fv(H.location,pe);break;case 4:s.vertexAttrib4fv(H.location,pe);break;default:s.vertexAttrib1fv(H.location,pe)}}}}x()}function E(){D();for(const y in n){const P=n[y];for(const F in P){const G=P[F];for(const q in G)h(G[q].object),delete G[q];delete P[F]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const F in P){const G=P[F];for(const q in G)h(G[q].object),delete G[q];delete P[F]}delete n[y.id]}function C(y){for(const P in n){const F=n[P];if(F[y.id]===void 0)continue;const G=F[y.id];for(const q in G)h(G[q].object),delete G[q];delete F[y.id]}}function D(){S(),a=!0,r!==i&&(r=i,l(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:D,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function I0(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function N0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==gn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const D=C===lr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Un&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==wn&&!D)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:E,maxSamples:T}}function U0(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new fi,o=new tt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,M=x*4;let v=p.clippingState||null;c.value=v,v=h(g,d,M,f);for(let E=0;E!==M;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=f;M!==_;++M,v+=4)a.copy(u[M]).applyMatrix4(x,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function F0(s){let e=new WeakMap;function t(a,o){return o===So?a.mapping=gs:o===Eo&&(a.mapping=_s),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===So||o===Eo)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Gf(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const cs=4,Gl=[.125,.215,.35,.446,.526,.582],Di=20,Za=new pa,Wl=new He;let Ja=null,Qa=0,eo=0,to=!1;const Ci=(1+Math.sqrt(5))/2,ss=1/Ci,Xl=[new R(-Ci,ss,0),new R(Ci,ss,0),new R(-ss,0,Ci),new R(ss,0,Ci),new R(0,Ci,-ss),new R(0,Ci,ss),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],O0=new R;class sc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=O0}=r;Ja=this._renderer.getRenderTarget(),Qa=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ql(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ja,Qa,eo),this._renderer.xr.enabled=to,e.scissorTest=!1,Wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gs||e.mapping===_s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ja=this._renderer.getRenderTarget(),Qa=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:lr,format:gn,colorSpace:jt,depthBuffer:!1},i=$l(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$l(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=B0(r)),this._blurMaterial=k0(r,e,t)}return i}_compileMaterial(e){const t=new Ye(this._lodPlanes[0],e);this._renderer.compile(t,Za)}_sceneToCubeUV(e,t,n,i,r){const c=new Xt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Wl),u.toneMapping=_i,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const _=new Tn({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),m=new Ye(new Zt,_);let p=!1;const x=e.background;x?x.isColor&&(_.color.copy(x),e.background=null,p=!0):(_.color.copy(Wl),p=!0);for(let M=0;M<6;M++){const v=M%3;v===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[M],r.y,r.z)):v===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[M]));const E=this._cubeSize;Wr(i,v*E,M>2?E:0,E,E),u.setRenderTarget(i),p&&u.render(m,c),u.render(e,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===gs||e.mapping===_s;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ql()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Ye(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Wr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Za)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Xl[(i-r-1)%Xl.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ye(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Di-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Di;m>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const p=[];let x=0;for(let C=0;C<Di;++C){const D=C/_,S=Math.exp(-D*D/2);p.push(S),C===0?x+=S:C<m&&(x+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const v=this._sizeLods[i],E=3*v*(i>M-cs?i-M+cs:0),T=4*(this._cubeSize-v);Wr(t,E,T,3*v,2*v),c.setRenderTarget(t),c.render(u,Za)}}function B0(s){const e=[],t=[],n=[];let i=s;const r=s-cs+1+Gl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-cs?c=Gl[a-s+cs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),M=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let T=0;T<f;T++){const C=T%3*2/3-1,D=T>2?0:-1,S=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];x.set(S,_*g*T),M.set(d,m*g*T);const y=[T,T,T,T,T,T];v.set(y,p*g*T)}const E=new ft;E.setAttribute("position",new Ct(x,_)),E.setAttribute("uv",new Ct(M,m)),E.setAttribute("faceIndex",new Ct(v,p)),e.push(E),i>cs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function $l(s,e,t){const n=new Oi(s,e,t);return n.texture.mapping=ua,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function k0(s,e,t){const n=new Float32Array(Di),i=new R(0,1,0);return new vi({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Oc(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Yl(){return new vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oc(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function ql(){return new vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Oc(){return`

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
	`}function z0(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===So||c===Eo,h=c===gs||c===_s;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new sc(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new sc(s)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function H0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&or("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function V0(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let M=0,v=x.length;M<v;M+=3){const E=x[M+0],T=x[M+1],C=x[M+2];d.push(E,T,T,C,C,E)}}else if(g!==void 0){const x=g.array;_=g.version;for(let M=0,v=x.length/3-1;M<v;M+=3){const E=M+0,T=M+1,C=M+2;d.push(E,T,T,C,C,E)}}else return;const m=new(Vh(d)?Yh:$h)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function G0(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*_[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function W0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function X0(s,e,t){const n=new WeakMap,i=new ut;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let S=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let v=o.attributes.position.count*M,E=1;v>e.maxTextureSize&&(E=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const T=new Float32Array(v*E*4*u),C=new Gh(T,v,E,u);C.type=wn,C.needsUpdate=!0;const D=M*4;for(let y=0;y<u;y++){const P=m[y],F=p[y],G=x[y],q=v*E*4*y;for(let X=0;X<P.count;X++){const V=X*D;f===!0&&(i.fromBufferAttribute(P,X),T[q+V+0]=i.x,T[q+V+1]=i.y,T[q+V+2]=i.z,T[q+V+3]=0),g===!0&&(i.fromBufferAttribute(F,X),T[q+V+4]=i.x,T[q+V+5]=i.y,T[q+V+6]=i.z,T[q+V+7]=0),_===!0&&(i.fromBufferAttribute(G,X),T[q+V+8]=i.x,T[q+V+9]=i.y,T[q+V+10]=i.z,T[q+V+11]=G.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new me(v,E)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function $0(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const fu=new It,jl=new nu(1,1),pu=new Gh,mu=new Tf,gu=new Kh,Kl=[],Zl=[],Jl=new Float32Array(16),Ql=new Float32Array(9),eh=new Float32Array(4);function Ps(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Kl[i];if(r===void 0&&(r=new Float32Array(i),Kl[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Nt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Ut(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ma(s,e){let t=Zl[e];t===void 0&&(t=new Int32Array(e),Zl[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Y0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function q0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2fv(this.addr,e),Ut(t,e)}}function j0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;s.uniform3fv(this.addr,e),Ut(t,e)}}function K0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4fv(this.addr,e),Ut(t,e)}}function Z0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;eh.set(n),s.uniformMatrix2fv(this.addr,!1,eh),Ut(t,n)}}function J0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;Ql.set(n),s.uniformMatrix3fv(this.addr,!1,Ql),Ut(t,n)}}function Q0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;Jl.set(n),s.uniformMatrix4fv(this.addr,!1,Jl),Ut(t,n)}}function e_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function t_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2iv(this.addr,e),Ut(t,e)}}function n_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;s.uniform3iv(this.addr,e),Ut(t,e)}}function i_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4iv(this.addr,e),Ut(t,e)}}function s_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function r_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2uiv(this.addr,e),Ut(t,e)}}function a_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;s.uniform3uiv(this.addr,e),Ut(t,e)}}function o_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4uiv(this.addr,e),Ut(t,e)}}function c_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(jl.compareFunction=Hh,r=jl):r=fu,t.setTexture2D(e||r,i)}function l_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||mu,i)}function h_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||gu,i)}function u_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||pu,i)}function d_(s){switch(s){case 5126:return Y0;case 35664:return q0;case 35665:return j0;case 35666:return K0;case 35674:return Z0;case 35675:return J0;case 35676:return Q0;case 5124:case 35670:return e_;case 35667:case 35671:return t_;case 35668:case 35672:return n_;case 35669:case 35673:return i_;case 5125:return s_;case 36294:return r_;case 36295:return a_;case 36296:return o_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return h_;case 36289:case 36303:case 36311:case 36292:return u_}}function f_(s,e){s.uniform1fv(this.addr,e)}function p_(s,e){const t=Ps(e,this.size,2);s.uniform2fv(this.addr,t)}function m_(s,e){const t=Ps(e,this.size,3);s.uniform3fv(this.addr,t)}function g_(s,e){const t=Ps(e,this.size,4);s.uniform4fv(this.addr,t)}function __(s,e){const t=Ps(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function v_(s,e){const t=Ps(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function x_(s,e){const t=Ps(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function y_(s,e){s.uniform1iv(this.addr,e)}function M_(s,e){s.uniform2iv(this.addr,e)}function b_(s,e){s.uniform3iv(this.addr,e)}function S_(s,e){s.uniform4iv(this.addr,e)}function E_(s,e){s.uniform1uiv(this.addr,e)}function w_(s,e){s.uniform2uiv(this.addr,e)}function T_(s,e){s.uniform3uiv(this.addr,e)}function A_(s,e){s.uniform4uiv(this.addr,e)}function R_(s,e,t){const n=this.cache,i=e.length,r=ma(t,i);Nt(n,r)||(s.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||fu,r[a])}function C_(s,e,t){const n=this.cache,i=e.length,r=ma(t,i);Nt(n,r)||(s.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||mu,r[a])}function P_(s,e,t){const n=this.cache,i=e.length,r=ma(t,i);Nt(n,r)||(s.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||gu,r[a])}function L_(s,e,t){const n=this.cache,i=e.length,r=ma(t,i);Nt(n,r)||(s.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||pu,r[a])}function D_(s){switch(s){case 5126:return f_;case 35664:return p_;case 35665:return m_;case 35666:return g_;case 35674:return __;case 35675:return v_;case 35676:return x_;case 5124:case 35670:return y_;case 35667:case 35671:return M_;case 35668:case 35672:return b_;case 35669:case 35673:return S_;case 5125:return E_;case 36294:return w_;case 36295:return T_;case 36296:return A_;case 35678:case 36198:case 36298:case 36306:case 35682:return R_;case 35679:case 36299:case 36307:return C_;case 35680:case 36300:case 36308:case 36293:return P_;case 36289:case 36303:case 36311:case 36292:return L_}}class I_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=d_(t.type)}}class N_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=D_(t.type)}}class U_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const no=/(\w+)(\])?(\[|\.)?/g;function th(s,e){s.seq.push(e),s.map[e.id]=e}function F_(s,e,t){const n=s.name,i=n.length;for(no.lastIndex=0;;){const r=no.exec(n),a=no.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){th(t,l===void 0?new I_(o,s,e):new N_(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new U_(o),th(t,u)),t=u}}}class ta{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);F_(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function nh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const O_=37297;let B_=0;function k_(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const ih=new tt;function z_(s){ct._getMatrix(ih,ct.workingColorSpace,s);const e=`mat3( ${ih.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(s)){case ra:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function sh(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+k_(s.getShaderSource(e),o)}else return r}function H_(s,e){const t=z_(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function V_(s,e){let t;switch(e){case Od:t="Linear";break;case Bd:t="Reinhard";break;case kd:t="Cineon";break;case Ph:t="ACESFilmic";break;case Hd:t="AgX";break;case Vd:t="Neutral";break;case zd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Xr=new R;function G_(){ct.getLuminanceCoefficients(Xr);const s=Xr.x.toFixed(4),e=Xr.y.toFixed(4),t=Xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function X_(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function $_(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Ys(s){return s!==""}function rh(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ah(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Y_=/^[ \t]*#include +<([\w\d./]+)>/gm;function rc(s){return s.replace(Y_,j_)}const q_=new Map;function j_(s,e){let t=nt[e];if(t===void 0){const n=q_.get(e);if(n!==void 0)t=nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return rc(t)}const K_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oh(s){return s.replace(K_,Z_)}function Z_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function ch(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function J_(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Rh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ch?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===$n&&(e="SHADOWMAP_TYPE_VSM"),e}function Q_(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case gs:case _s:e="ENVMAP_TYPE_CUBE";break;case ua:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ev(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case _s:e="ENVMAP_MODE_REFRACTION";break}return e}function tv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case mc:e="ENVMAP_BLENDING_MULTIPLY";break;case Ud:e="ENVMAP_BLENDING_MIX";break;case Fd:e="ENVMAP_BLENDING_ADD";break}return e}function nv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function iv(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=J_(t),l=Q_(t),h=ev(t),u=tv(t),d=nv(t),f=W_(t),g=X_(r),_=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ys).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ys).join(`
`),p.length>0&&(p+=`
`)):(m=[ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),p=[ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?nt.tonemapping_pars_fragment:"",t.toneMapping!==_i?V_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,H_("linearToOutputTexel",t.outputColorSpace),G_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ys).join(`
`)),a=rc(a),a=rh(a,t),a=ah(a,t),o=rc(o),o=rh(o,t),o=ah(o,t),a=oh(a),o=oh(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+m+a,v=x+p+o,E=nh(i,i.VERTEX_SHADER,M),T=nh(i,i.FRAGMENT_SHADER,v);i.attachShader(_,E),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(P){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(_)||"",G=i.getShaderInfoLog(E)||"",q=i.getShaderInfoLog(T)||"",X=F.trim(),V=G.trim(),ee=q.trim();let H=!0,he=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,T);else{const pe=sh(i,E,"vertex"),ve=sh(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+X+`
`+pe+`
`+ve)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(V===""||ee==="")&&(he=!1);he&&(P.diagnostics={runnable:H,programLog:X,vertexShader:{log:V,prefix:m},fragmentShader:{log:ee,prefix:p}})}i.deleteShader(E),i.deleteShader(T),D=new ta(i,_),S=$_(i,_)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,O_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=B_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}let sv=0;class rv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new av(e),t.set(e,n)),n}}class av{constructor(e){this.id=sv++,this.code=e,this.usedTimes=0}}function ov(s,e,t,n,i,r,a){const o=new Wh,c=new rv,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,y,P,F,G){const q=F.fog,X=G.geometry,V=S.isMeshStandardMaterial?F.environment:null,ee=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),H=ee&&ee.mapping===ua?ee.image.height:null,he=g[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const pe=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ve=pe!==void 0?pe.length:0;let Ee=0;X.morphAttributes.position!==void 0&&(Ee=1),X.morphAttributes.normal!==void 0&&(Ee=2),X.morphAttributes.color!==void 0&&(Ee=3);let st,ot,Ze,Z;if(he){const Je=Dn[he];st=Je.vertexShader,ot=Je.fragmentShader}else st=S.vertexShader,ot=S.fragmentShader,c.update(S),Ze=c.getVertexShaderID(S),Z=c.getFragmentShaderID(S);const Q=s.getRenderTarget(),Se=s.state.buffers.depth.getReversed(),ae=G.isInstancedMesh===!0,oe=G.isBatchedMesh===!0,Ie=!!S.map,Fe=!!S.matcap,I=!!ee,Ce=!!S.aoMap,we=!!S.lightMap,ye=!!S.bumpMap,se=!!S.normalMap,Ne=!!S.displacementMap,ce=!!S.emissiveMap,Te=!!S.metalnessMap,it=!!S.roughnessMap,je=S.anisotropy>0,A=S.clearcoat>0,b=S.dispersion>0,k=S.iridescence>0,K=S.sheen>0,te=S.transmission>0,j=je&&!!S.anisotropyMap,Ue=A&&!!S.clearcoatMap,fe=A&&!!S.clearcoatNormalMap,Ae=A&&!!S.clearcoatRoughnessMap,Pe=k&&!!S.iridescenceMap,le=k&&!!S.iridescenceThicknessMap,xe=K&&!!S.sheenColorMap,Be=K&&!!S.sheenRoughnessMap,De=!!S.specularMap,ge=!!S.specularColorMap,We=!!S.specularIntensityMap,N=te&&!!S.transmissionMap,U=te&&!!S.thicknessMap,W=!!S.gradientMap,ne=!!S.alphaMap,J=S.alphaTest>0,z=!!S.alphaHash,ie=!!S.extensions;let Me=_i;S.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Me=s.toneMapping);const qe={shaderID:he,shaderType:S.type,shaderName:S.name,vertexShader:st,fragmentShader:ot,defines:S.defines,customVertexShaderID:Ze,customFragmentShaderID:Z,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:oe,batchingColor:oe&&G._colorsTexture!==null,instancing:ae,instancingColor:ae&&G.instanceColor!==null,instancingMorph:ae&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Q===null?s.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:jt,alphaToCoverage:!!S.alphaToCoverage,map:Ie,matcap:Fe,envMap:I,envMapMode:I&&ee.mapping,envMapCubeUVHeight:H,aoMap:Ce,lightMap:we,bumpMap:ye,normalMap:se,displacementMap:d&&Ne,emissiveMap:ce,normalMapObjectSpace:se&&S.normalMapType===qd,normalMapTangentSpace:se&&S.normalMapType===Sc,metalnessMap:Te,roughnessMap:it,anisotropy:je,anisotropyMap:j,clearcoat:A,clearcoatMap:Ue,clearcoatNormalMap:fe,clearcoatRoughnessMap:Ae,dispersion:b,iridescence:k,iridescenceMap:Pe,iridescenceThicknessMap:le,sheen:K,sheenColorMap:xe,sheenRoughnessMap:Be,specularMap:De,specularColorMap:ge,specularIntensityMap:We,transmission:te,transmissionMap:N,thicknessMap:U,gradientMap:W,opaque:S.transparent===!1&&S.blending===hs&&S.alphaToCoverage===!1,alphaMap:ne,alphaTest:J,alphaHash:z,combine:S.combine,mapUv:Ie&&_(S.map.channel),aoMapUv:Ce&&_(S.aoMap.channel),lightMapUv:we&&_(S.lightMap.channel),bumpMapUv:ye&&_(S.bumpMap.channel),normalMapUv:se&&_(S.normalMap.channel),displacementMapUv:Ne&&_(S.displacementMap.channel),emissiveMapUv:ce&&_(S.emissiveMap.channel),metalnessMapUv:Te&&_(S.metalnessMap.channel),roughnessMapUv:it&&_(S.roughnessMap.channel),anisotropyMapUv:j&&_(S.anisotropyMap.channel),clearcoatMapUv:Ue&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:fe&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:le&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Be&&_(S.sheenRoughnessMap.channel),specularMapUv:De&&_(S.specularMap.channel),specularColorMapUv:ge&&_(S.specularColorMap.channel),specularIntensityMapUv:We&&_(S.specularIntensityMap.channel),transmissionMapUv:N&&_(S.transmissionMap.channel),thicknessMapUv:U&&_(S.thicknessMap.channel),alphaMapUv:ne&&_(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(se||je),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!X.attributes.uv&&(Ie||ne),fog:!!q,useFog:S.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Se,skinning:G.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ee,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Me,decodeVideoTexture:Ie&&S.map.isVideoTexture===!0&&ct.getTransfer(S.map.colorSpace)===vt,decodeVideoTextureEmissive:ce&&S.emissiveMap.isVideoTexture===!0&&ct.getTransfer(S.emissiveMap.colorSpace)===vt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Dt,flipSided:S.side===Yt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ie&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&S.extensions.multiDraw===!0||oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return qe.vertexUv1s=l.has(1),qe.vertexUv2s=l.has(2),qe.vertexUv3s=l.has(3),l.clear(),qe}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)y.push(P),y.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(x(y,S),M(y,S),y.push(s.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function x(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function M(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function v(S){const y=g[S.type];let P;if(y){const F=Dn[y];P=kf.clone(F.uniforms)}else P=S.uniforms;return P}function E(S,y){let P;for(let F=0,G=h.length;F<G;F++){const q=h[F];if(q.cacheKey===y){P=q,++P.usedTimes;break}}return P===void 0&&(P=new iv(s,y,S,r),h.push(P)),P}function T(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function C(S){c.remove(S)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:D}}function cv(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function lv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function lh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function hh(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||lv),n.length>1&&n.sort(d||lh),i.length>1&&i.sort(d||lh)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function hv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new hh,s.set(n,[a])):i>=r.length?(a=new hh,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function uv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new He};break;case"SpotLight":t={position:new R,direction:new R,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new R,halfWidth:new R,halfHeight:new R};break}return s[e.id]=t,t}}}function dv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let fv=0;function pv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function mv(s){const e=new uv,t=dv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const i=new R,r=new Ke,a=new Ke;function o(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,x=0,M=0,v=0,E=0,T=0,C=0;l.sort(pv);for(let S=0,y=l.length;S<y;S++){const P=l[S],F=P.color,G=P.intensity,q=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=F.r*G,u+=F.g*G,d+=F.b*G;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],G);C++}else if(P.isDirectionalLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ee=P.shadow,H=t.get(P);H.shadowIntensity=ee.intensity,H.shadowBias=ee.bias,H.shadowNormalBias=ee.normalBias,H.shadowRadius=ee.radius,H.shadowMapSize=ee.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=P.shadow.matrix,x++}n.directional[f]=V,f++}else if(P.isSpotLight){const V=e.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(F).multiplyScalar(G),V.distance=q,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[_]=V;const ee=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,ee.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=ee.matrix,P.castShadow){const H=t.get(P);H.shadowIntensity=ee.intensity,H.shadowBias=ee.bias,H.shadowNormalBias=ee.normalBias,H.shadowRadius=ee.radius,H.shadowMapSize=ee.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=X,v++}_++}else if(P.isRectAreaLight){const V=e.get(P);V.color.copy(F).multiplyScalar(G),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=V,m++}else if(P.isPointLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const ee=P.shadow,H=t.get(P);H.shadowIntensity=ee.intensity,H.shadowBias=ee.bias,H.shadowNormalBias=ee.normalBias,H.shadowRadius=ee.radius,H.shadowMapSize=ee.mapSize,H.shadowCameraNear=ee.camera.near,H.shadowCameraFar=ee.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=V,g++}else if(P.isHemisphereLight){const V=e.get(P);V.skyColor.copy(P.color).multiplyScalar(G),V.groundColor.copy(P.groundColor).multiplyScalar(G),n.hemi[p]=V,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==x||D.numPointShadows!==M||D.numSpotShadows!==v||D.numSpotMaps!==E||D.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,D.directionalLength=f,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=x,D.numPointShadows=M,D.numSpotShadows=v,D.numSpotMaps=E,D.numLightProbes=C,n.version=fv++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const M=l[p];if(M.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(M.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function uh(s){const e=new mv(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function gv(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new uh(s),e.set(i,[o])):r>=a.length?(o=new uh(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const _v=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vv=`uniform sampler2D shadow_pass;
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
}`;function xv(s,e,t){let n=new Cc;const i=new me,r=new me,a=new ut,o=new _p({depthPacking:Yd}),c=new vp,l={},h=t.maxTextureSize,u={[ei]:Yt,[Yt]:ei,[Dt]:Dt},d=new vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:_v,fragmentShader:vv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new ft;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ye(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rh;let p=this.type;this.render=function(T,C,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=s.getRenderTarget(),y=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),F=s.state;F.setBlending(gi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const G=p!==$n&&this.type===$n,q=p===$n&&this.type!==$n;for(let X=0,V=T.length;X<V;X++){const ee=T[X],H=ee.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const he=H.getFrameExtents();if(i.multiply(he),r.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/he.x),i.x=r.x*he.x,H.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/he.y),i.y=r.y*he.y,H.mapSize.y=r.y)),H.map===null||G===!0||q===!0){const ve=this.type!==$n?{minFilter:qt,magFilter:qt}:{};H.map!==null&&H.map.dispose(),H.map=new Oi(i.x,i.y,ve),H.map.texture.name=ee.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const pe=H.getViewportCount();for(let ve=0;ve<pe;ve++){const Ee=H.getViewport(ve);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),F.viewport(a),H.updateMatrices(ee,ve),n=H.getFrustum(),v(C,D,H.camera,ee,this.type)}H.isPointLightShadow!==!0&&this.type===$n&&x(H,D),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,y,P)};function x(T,C){const D=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Oi(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(C,null,D,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(C,null,D,f,_,null)}function M(T,C,D,S){let y=null;const P=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)y=P;else if(y=D.isPointLight===!0?c:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=y.uuid,G=C.uuid;let q=l[F];q===void 0&&(q={},l[F]=q);let X=q[G];X===void 0&&(X=y.clone(),q[G]=X,C.addEventListener("dispose",E)),y=X}if(y.visible=C.visible,y.wireframe=C.wireframe,S===$n?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const F=s.properties.get(y);F.light=D}return y}function v(T,C,D,S,y){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===$n)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);const G=e.update(T),q=T.material;if(Array.isArray(q)){const X=G.groups;for(let V=0,ee=X.length;V<ee;V++){const H=X[V],he=q[H.materialIndex];if(he&&he.visible){const pe=M(T,he,S,y);T.onBeforeShadow(s,T,C,D,G,pe,H),s.renderBufferDirect(D,null,G,pe,T,H),T.onAfterShadow(s,T,C,D,G,pe,H)}}}else if(q.visible){const X=M(T,q,S,y);T.onBeforeShadow(s,T,C,D,G,X,null),s.renderBufferDirect(D,null,G,X,T,null),T.onAfterShadow(s,T,C,D,G,X,null)}}const F=T.children;for(let G=0,q=F.length;G<q;G++)v(F[G],C,D,S,y)}function E(T){T.target.removeEventListener("dispose",E);for(const D in l){const S=l[D],y=T.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const yv={[go]:_o,[vo]:Mo,[xo]:bo,[ms]:yo,[_o]:go,[Mo]:vo,[bo]:xo,[yo]:ms};function Mv(s,e){function t(){let N=!1;const U=new ut;let W=null;const ne=new ut(0,0,0,0);return{setMask:function(J){W!==J&&!N&&(s.colorMask(J,J,J,J),W=J)},setLocked:function(J){N=J},setClear:function(J,z,ie,Me,qe){qe===!0&&(J*=Me,z*=Me,ie*=Me),U.set(J,z,ie,Me),ne.equals(U)===!1&&(s.clearColor(J,z,ie,Me),ne.copy(U))},reset:function(){N=!1,W=null,ne.set(-1,0,0,0)}}}function n(){let N=!1,U=!1,W=null,ne=null,J=null;return{setReversed:function(z){if(U!==z){const ie=e.get("EXT_clip_control");z?ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.ZERO_TO_ONE_EXT):ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.NEGATIVE_ONE_TO_ONE_EXT),U=z;const Me=J;J=null,this.setClear(Me)}},getReversed:function(){return U},setTest:function(z){z?Q(s.DEPTH_TEST):Se(s.DEPTH_TEST)},setMask:function(z){W!==z&&!N&&(s.depthMask(z),W=z)},setFunc:function(z){if(U&&(z=yv[z]),ne!==z){switch(z){case go:s.depthFunc(s.NEVER);break;case _o:s.depthFunc(s.ALWAYS);break;case vo:s.depthFunc(s.LESS);break;case ms:s.depthFunc(s.LEQUAL);break;case xo:s.depthFunc(s.EQUAL);break;case yo:s.depthFunc(s.GEQUAL);break;case Mo:s.depthFunc(s.GREATER);break;case bo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ne=z}},setLocked:function(z){N=z},setClear:function(z){J!==z&&(U&&(z=1-z),s.clearDepth(z),J=z)},reset:function(){N=!1,W=null,ne=null,J=null,U=!1}}}function i(){let N=!1,U=null,W=null,ne=null,J=null,z=null,ie=null,Me=null,qe=null;return{setTest:function(Je){N||(Je?Q(s.STENCIL_TEST):Se(s.STENCIL_TEST))},setMask:function(Je){U!==Je&&!N&&(s.stencilMask(Je),U=Je)},setFunc:function(Je,Ot,wt){(W!==Je||ne!==Ot||J!==wt)&&(s.stencilFunc(Je,Ot,wt),W=Je,ne=Ot,J=wt)},setOp:function(Je,Ot,wt){(z!==Je||ie!==Ot||Me!==wt)&&(s.stencilOp(Je,Ot,wt),z=Je,ie=Ot,Me=wt)},setLocked:function(Je){N=Je},setClear:function(Je){qe!==Je&&(s.clearStencil(Je),qe=Je)},reset:function(){N=!1,U=null,W=null,ne=null,J=null,z=null,ie=null,Me=null,qe=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,M=null,v=null,E=null,T=null,C=new He(0,0,0),D=0,S=!1,y=null,P=null,F=null,G=null,q=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ee=0;const H=s.getParameter(s.VERSION);H.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=ee>=1):H.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=ee>=2);let he=null,pe={};const ve=s.getParameter(s.SCISSOR_BOX),Ee=s.getParameter(s.VIEWPORT),st=new ut().fromArray(ve),ot=new ut().fromArray(Ee);function Ze(N,U,W,ne){const J=new Uint8Array(4),z=s.createTexture();s.bindTexture(N,z),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ie=0;ie<W;ie++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(U,0,s.RGBA,1,1,ne,0,s.RGBA,s.UNSIGNED_BYTE,J):s.texImage2D(U+ie,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,J);return z}const Z={};Z[s.TEXTURE_2D]=Ze(s.TEXTURE_2D,s.TEXTURE_2D,1),Z[s.TEXTURE_CUBE_MAP]=Ze(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[s.TEXTURE_2D_ARRAY]=Ze(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Z[s.TEXTURE_3D]=Ze(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(s.DEPTH_TEST),a.setFunc(ms),ye(!1),se(Yc),Q(s.CULL_FACE),Ce(gi);function Q(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function Se(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function ae(N,U){return u[N]!==U?(s.bindFramebuffer(N,U),u[N]=U,N===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=U),N===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=U),!0):!1}function oe(N,U){let W=f,ne=!1;if(N){W=d.get(U),W===void 0&&(W=[],d.set(U,W));const J=N.textures;if(W.length!==J.length||W[0]!==s.COLOR_ATTACHMENT0){for(let z=0,ie=J.length;z<ie;z++)W[z]=s.COLOR_ATTACHMENT0+z;W.length=J.length,ne=!0}}else W[0]!==s.BACK&&(W[0]=s.BACK,ne=!0);ne&&s.drawBuffers(W)}function Ie(N){return g!==N?(s.useProgram(N),g=N,!0):!1}const Fe={[Li]:s.FUNC_ADD,[vd]:s.FUNC_SUBTRACT,[xd]:s.FUNC_REVERSE_SUBTRACT};Fe[yd]=s.MIN,Fe[Md]=s.MAX;const I={[bd]:s.ZERO,[Sd]:s.ONE,[Ed]:s.SRC_COLOR,[po]:s.SRC_ALPHA,[Pd]:s.SRC_ALPHA_SATURATE,[Rd]:s.DST_COLOR,[Td]:s.DST_ALPHA,[wd]:s.ONE_MINUS_SRC_COLOR,[mo]:s.ONE_MINUS_SRC_ALPHA,[Cd]:s.ONE_MINUS_DST_COLOR,[Ad]:s.ONE_MINUS_DST_ALPHA,[Ld]:s.CONSTANT_COLOR,[Dd]:s.ONE_MINUS_CONSTANT_COLOR,[Id]:s.CONSTANT_ALPHA,[Nd]:s.ONE_MINUS_CONSTANT_ALPHA};function Ce(N,U,W,ne,J,z,ie,Me,qe,Je){if(N===gi){_===!0&&(Se(s.BLEND),_=!1);return}if(_===!1&&(Q(s.BLEND),_=!0),N!==_d){if(N!==m||Je!==S){if((p!==Li||v!==Li)&&(s.blendEquation(s.FUNC_ADD),p=Li,v=Li),Je)switch(N){case hs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case qc:s.blendFunc(s.ONE,s.ONE);break;case jc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Kc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case hs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case qc:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case jc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}x=null,M=null,E=null,T=null,C.set(0,0,0),D=0,m=N,S=Je}return}J=J||U,z=z||W,ie=ie||ne,(U!==p||J!==v)&&(s.blendEquationSeparate(Fe[U],Fe[J]),p=U,v=J),(W!==x||ne!==M||z!==E||ie!==T)&&(s.blendFuncSeparate(I[W],I[ne],I[z],I[ie]),x=W,M=ne,E=z,T=ie),(Me.equals(C)===!1||qe!==D)&&(s.blendColor(Me.r,Me.g,Me.b,qe),C.copy(Me),D=qe),m=N,S=!1}function we(N,U){N.side===Dt?Se(s.CULL_FACE):Q(s.CULL_FACE);let W=N.side===Yt;U&&(W=!W),ye(W),N.blending===hs&&N.transparent===!1?Ce(gi):Ce(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const ne=N.stencilWrite;o.setTest(ne),ne&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ce(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(s.SAMPLE_ALPHA_TO_COVERAGE):Se(s.SAMPLE_ALPHA_TO_COVERAGE)}function ye(N){y!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),y=N)}function se(N){N!==md?(Q(s.CULL_FACE),N!==P&&(N===Yc?s.cullFace(s.BACK):N===gd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Se(s.CULL_FACE),P=N}function Ne(N){N!==F&&(V&&s.lineWidth(N),F=N)}function ce(N,U,W){N?(Q(s.POLYGON_OFFSET_FILL),(G!==U||q!==W)&&(s.polygonOffset(U,W),G=U,q=W)):Se(s.POLYGON_OFFSET_FILL)}function Te(N){N?Q(s.SCISSOR_TEST):Se(s.SCISSOR_TEST)}function it(N){N===void 0&&(N=s.TEXTURE0+X-1),he!==N&&(s.activeTexture(N),he=N)}function je(N,U,W){W===void 0&&(he===null?W=s.TEXTURE0+X-1:W=he);let ne=pe[W];ne===void 0&&(ne={type:void 0,texture:void 0},pe[W]=ne),(ne.type!==N||ne.texture!==U)&&(he!==W&&(s.activeTexture(W),he=W),s.bindTexture(N,U||Z[N]),ne.type=N,ne.texture=U)}function A(){const N=pe[he];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function b(){try{s.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function k(){try{s.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{s.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{s.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{s.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ue(){try{s.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(){try{s.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ae(){try{s.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{s.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{s.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(N){st.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),st.copy(N))}function Be(N){ot.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),ot.copy(N))}function De(N,U){let W=l.get(U);W===void 0&&(W=new WeakMap,l.set(U,W));let ne=W.get(N);ne===void 0&&(ne=s.getUniformBlockIndex(U,N.name),W.set(N,ne))}function ge(N,U){const ne=l.get(U).get(N);c.get(U)!==ne&&(s.uniformBlockBinding(U,ne,N.__bindingPointIndex),c.set(U,ne))}function We(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},he=null,pe={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,M=null,v=null,E=null,T=null,C=new He(0,0,0),D=0,S=!1,y=null,P=null,F=null,G=null,q=null,st.set(0,0,s.canvas.width,s.canvas.height),ot.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:Se,bindFramebuffer:ae,drawBuffers:oe,useProgram:Ie,setBlending:Ce,setMaterial:we,setFlipSided:ye,setCullFace:se,setLineWidth:Ne,setPolygonOffset:ce,setScissorTest:Te,activeTexture:it,bindTexture:je,unbindTexture:A,compressedTexImage2D:b,compressedTexImage3D:k,texImage2D:Pe,texImage3D:le,updateUBOMapping:De,uniformBlockBinding:ge,texStorage2D:fe,texStorage3D:Ae,texSubImage2D:K,texSubImage3D:te,compressedTexSubImage2D:j,compressedTexSubImage3D:Ue,scissor:xe,viewport:Be,reset:We}}function bv(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new me,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,b){return f?new OffscreenCanvas(A,b):ar("canvas")}function _(A,b,k){let K=1;const te=je(A);if((te.width>k||te.height>k)&&(K=k/Math.max(te.width,te.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor(K*te.width),Ue=Math.floor(K*te.height);u===void 0&&(u=g(j,Ue));const fe=b?g(j,Ue):u;return fe.width=j,fe.height=Ue,fe.getContext("2d").drawImage(A,0,0,j,Ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+j+"x"+Ue+")."),fe}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){s.generateMipmap(A)}function x(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(A,b,k,K,te=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=b;if(b===s.RED&&(k===s.FLOAT&&(j=s.R32F),k===s.HALF_FLOAT&&(j=s.R16F),k===s.UNSIGNED_BYTE&&(j=s.R8)),b===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(j=s.R8UI),k===s.UNSIGNED_SHORT&&(j=s.R16UI),k===s.UNSIGNED_INT&&(j=s.R32UI),k===s.BYTE&&(j=s.R8I),k===s.SHORT&&(j=s.R16I),k===s.INT&&(j=s.R32I)),b===s.RG&&(k===s.FLOAT&&(j=s.RG32F),k===s.HALF_FLOAT&&(j=s.RG16F),k===s.UNSIGNED_BYTE&&(j=s.RG8)),b===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(j=s.RG8UI),k===s.UNSIGNED_SHORT&&(j=s.RG16UI),k===s.UNSIGNED_INT&&(j=s.RG32UI),k===s.BYTE&&(j=s.RG8I),k===s.SHORT&&(j=s.RG16I),k===s.INT&&(j=s.RG32I)),b===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(j=s.RGB8UI),k===s.UNSIGNED_SHORT&&(j=s.RGB16UI),k===s.UNSIGNED_INT&&(j=s.RGB32UI),k===s.BYTE&&(j=s.RGB8I),k===s.SHORT&&(j=s.RGB16I),k===s.INT&&(j=s.RGB32I)),b===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),k===s.UNSIGNED_INT&&(j=s.RGBA32UI),k===s.BYTE&&(j=s.RGBA8I),k===s.SHORT&&(j=s.RGBA16I),k===s.INT&&(j=s.RGBA32I)),b===s.RGB&&(k===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&(j=s.R11F_G11F_B10F)),b===s.RGBA){const Ue=te?ra:ct.getTransfer(K);k===s.FLOAT&&(j=s.RGBA32F),k===s.HALF_FLOAT&&(j=s.RGBA16F),k===s.UNSIGNED_BYTE&&(j=Ue===vt?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function v(A,b){let k;return A?b===null||b===Fi||b===tr?k=s.DEPTH24_STENCIL8:b===wn?k=s.DEPTH32F_STENCIL8:b===er&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Fi||b===tr?k=s.DEPTH_COMPONENT24:b===wn?k=s.DEPTH_COMPONENT32F:b===er&&(k=s.DEPTH_COMPONENT16),k}function E(A,b){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==qt&&A.minFilter!==cn?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function T(A){const b=A.target;b.removeEventListener("dispose",T),D(b),b.isVideoTexture&&h.delete(b)}function C(A){const b=A.target;b.removeEventListener("dispose",C),y(b)}function D(A){const b=n.get(A);if(b.__webglInit===void 0)return;const k=A.source,K=d.get(k);if(K){const te=K[b.__cacheKey];te.usedTimes--,te.usedTimes===0&&S(A),Object.keys(K).length===0&&d.delete(k)}n.remove(A)}function S(A){const b=n.get(A);s.deleteTexture(b.__webglTexture);const k=A.source,K=d.get(k);delete K[b.__cacheKey],a.memory.textures--}function y(A){const b=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(b.__webglFramebuffer[K]))for(let te=0;te<b.__webglFramebuffer[K].length;te++)s.deleteFramebuffer(b.__webglFramebuffer[K][te]);else s.deleteFramebuffer(b.__webglFramebuffer[K]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[K])}else{if(Array.isArray(b.__webglFramebuffer))for(let K=0;K<b.__webglFramebuffer.length;K++)s.deleteFramebuffer(b.__webglFramebuffer[K]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let K=0;K<b.__webglColorRenderbuffer.length;K++)b.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[K]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const k=A.textures;for(let K=0,te=k.length;K<te;K++){const j=n.get(k[K]);j.__webglTexture&&(s.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(k[K])}n.remove(A)}let P=0;function F(){P=0}function G(){const A=P;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),P+=1,A}function q(A){const b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.colorSpace),b.join()}function X(A,b){const k=n.get(A);if(A.isVideoTexture&&Te(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&k.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(k,A,b);return}}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+b)}function V(A,b){const k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){Z(k,A,b);return}t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+b)}function ee(A,b){const k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){Z(k,A,b);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+b)}function H(A,b){const k=n.get(A);if(A.version>0&&k.__version!==A.version){Q(k,A,b);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+b)}const he={[vs]:s.REPEAT,[mi]:s.CLAMP_TO_EDGE,[sa]:s.MIRRORED_REPEAT},pe={[qt]:s.NEAREST,[Dh]:s.NEAREST_MIPMAP_NEAREST,[$s]:s.NEAREST_MIPMAP_LINEAR,[cn]:s.LINEAR,[Kr]:s.LINEAR_MIPMAP_NEAREST,[qn]:s.LINEAR_MIPMAP_LINEAR},ve={[jd]:s.NEVER,[tf]:s.ALWAYS,[Kd]:s.LESS,[Hh]:s.LEQUAL,[Zd]:s.EQUAL,[ef]:s.GEQUAL,[Jd]:s.GREATER,[Qd]:s.NOTEQUAL};function Ee(A,b){if(b.type===wn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===cn||b.magFilter===Kr||b.magFilter===$s||b.magFilter===qn||b.minFilter===cn||b.minFilter===Kr||b.minFilter===$s||b.minFilter===qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,he[b.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,he[b.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,he[b.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,pe[b.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,pe[b.minFilter]),b.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,ve[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===qt||b.minFilter!==$s&&b.minFilter!==qn||b.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function st(A,b){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",T));const K=b.source;let te=d.get(K);te===void 0&&(te={},d.set(K,te));const j=q(b);if(j!==A.__cacheKey){te[j]===void 0&&(te[j]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),te[j].usedTimes++;const Ue=te[A.__cacheKey];Ue!==void 0&&(te[A.__cacheKey].usedTimes--,Ue.usedTimes===0&&S(b)),A.__cacheKey=j,A.__webglTexture=te[j].texture}return k}function ot(A,b,k){return Math.floor(Math.floor(A/k)/b)}function Ze(A,b,k,K){const j=A.updateRanges;if(j.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,k,K,b.data);else{j.sort((le,xe)=>le.start-xe.start);let Ue=0;for(let le=1;le<j.length;le++){const xe=j[Ue],Be=j[le],De=xe.start+xe.count,ge=ot(Be.start,b.width,4),We=ot(xe.start,b.width,4);Be.start<=De+1&&ge===We&&ot(Be.start+Be.count-1,b.width,4)===ge?xe.count=Math.max(xe.count,Be.start+Be.count-xe.start):(++Ue,j[Ue]=Be)}j.length=Ue+1;const fe=s.getParameter(s.UNPACK_ROW_LENGTH),Ae=s.getParameter(s.UNPACK_SKIP_PIXELS),Pe=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let le=0,xe=j.length;le<xe;le++){const Be=j[le],De=Math.floor(Be.start/4),ge=Math.ceil(Be.count/4),We=De%b.width,N=Math.floor(De/b.width),U=ge,W=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,We),s.pixelStorei(s.UNPACK_SKIP_ROWS,N),t.texSubImage2D(s.TEXTURE_2D,0,We,N,U,W,k,K,b.data)}A.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,fe),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ae),s.pixelStorei(s.UNPACK_SKIP_ROWS,Pe)}}function Z(A,b,k){let K=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(K=s.TEXTURE_3D);const te=st(A,b),j=b.source;t.bindTexture(K,A.__webglTexture,s.TEXTURE0+k);const Ue=n.get(j);if(j.version!==Ue.__version||te===!0){t.activeTexture(s.TEXTURE0+k);const fe=ct.getPrimaries(ct.workingColorSpace),Ae=b.colorSpace===pi?null:ct.getPrimaries(b.colorSpace),Pe=b.colorSpace===pi||fe===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let le=_(b.image,!1,i.maxTextureSize);le=it(b,le);const xe=r.convert(b.format,b.colorSpace),Be=r.convert(b.type);let De=M(b.internalFormat,xe,Be,b.colorSpace,b.isVideoTexture);Ee(K,b);let ge;const We=b.mipmaps,N=b.isVideoTexture!==!0,U=Ue.__version===void 0||te===!0,W=j.dataReady,ne=E(b,le);if(b.isDepthTexture)De=v(b.format===ir,b.type),U&&(N?t.texStorage2D(s.TEXTURE_2D,1,De,le.width,le.height):t.texImage2D(s.TEXTURE_2D,0,De,le.width,le.height,0,xe,Be,null));else if(b.isDataTexture)if(We.length>0){N&&U&&t.texStorage2D(s.TEXTURE_2D,ne,De,We[0].width,We[0].height);for(let J=0,z=We.length;J<z;J++)ge=We[J],N?W&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,ge.width,ge.height,xe,Be,ge.data):t.texImage2D(s.TEXTURE_2D,J,De,ge.width,ge.height,0,xe,Be,ge.data);b.generateMipmaps=!1}else N?(U&&t.texStorage2D(s.TEXTURE_2D,ne,De,le.width,le.height),W&&Ze(b,le,xe,Be)):t.texImage2D(s.TEXTURE_2D,0,De,le.width,le.height,0,xe,Be,le.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){N&&U&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ne,De,We[0].width,We[0].height,le.depth);for(let J=0,z=We.length;J<z;J++)if(ge=We[J],b.format!==gn)if(xe!==null)if(N){if(W)if(b.layerUpdates.size>0){const ie=Vl(ge.width,ge.height,b.format,b.type);for(const Me of b.layerUpdates){const qe=ge.data.subarray(Me*ie/ge.data.BYTES_PER_ELEMENT,(Me+1)*ie/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,Me,ge.width,ge.height,1,xe,qe)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,ge.width,ge.height,le.depth,xe,ge.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,De,ge.width,ge.height,le.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?W&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,ge.width,ge.height,le.depth,xe,Be,ge.data):t.texImage3D(s.TEXTURE_2D_ARRAY,J,De,ge.width,ge.height,le.depth,0,xe,Be,ge.data)}else{N&&U&&t.texStorage2D(s.TEXTURE_2D,ne,De,We[0].width,We[0].height);for(let J=0,z=We.length;J<z;J++)ge=We[J],b.format!==gn?xe!==null?N?W&&t.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,ge.width,ge.height,xe,ge.data):t.compressedTexImage2D(s.TEXTURE_2D,J,De,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?W&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,ge.width,ge.height,xe,Be,ge.data):t.texImage2D(s.TEXTURE_2D,J,De,ge.width,ge.height,0,xe,Be,ge.data)}else if(b.isDataArrayTexture)if(N){if(U&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ne,De,le.width,le.height,le.depth),W)if(b.layerUpdates.size>0){const J=Vl(le.width,le.height,b.format,b.type);for(const z of b.layerUpdates){const ie=le.data.subarray(z*J/le.data.BYTES_PER_ELEMENT,(z+1)*J/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,z,le.width,le.height,1,xe,Be,ie)}b.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,xe,Be,le.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,De,le.width,le.height,le.depth,0,xe,Be,le.data);else if(b.isData3DTexture)N?(U&&t.texStorage3D(s.TEXTURE_3D,ne,De,le.width,le.height,le.depth),W&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,xe,Be,le.data)):t.texImage3D(s.TEXTURE_3D,0,De,le.width,le.height,le.depth,0,xe,Be,le.data);else if(b.isFramebufferTexture){if(U)if(N)t.texStorage2D(s.TEXTURE_2D,ne,De,le.width,le.height);else{let J=le.width,z=le.height;for(let ie=0;ie<ne;ie++)t.texImage2D(s.TEXTURE_2D,ie,De,J,z,0,xe,Be,null),J>>=1,z>>=1}}else if(We.length>0){if(N&&U){const J=je(We[0]);t.texStorage2D(s.TEXTURE_2D,ne,De,J.width,J.height)}for(let J=0,z=We.length;J<z;J++)ge=We[J],N?W&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,xe,Be,ge):t.texImage2D(s.TEXTURE_2D,J,De,xe,Be,ge);b.generateMipmaps=!1}else if(N){if(U){const J=je(le);t.texStorage2D(s.TEXTURE_2D,ne,De,J.width,J.height)}W&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,xe,Be,le)}else t.texImage2D(s.TEXTURE_2D,0,De,xe,Be,le);m(b)&&p(K),Ue.__version=j.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function Q(A,b,k){if(b.image.length!==6)return;const K=st(A,b),te=b.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+k);const j=n.get(te);if(te.version!==j.__version||K===!0){t.activeTexture(s.TEXTURE0+k);const Ue=ct.getPrimaries(ct.workingColorSpace),fe=b.colorSpace===pi?null:ct.getPrimaries(b.colorSpace),Ae=b.colorSpace===pi||Ue===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Pe=b.isCompressedTexture||b.image[0].isCompressedTexture,le=b.image[0]&&b.image[0].isDataTexture,xe=[];for(let z=0;z<6;z++)!Pe&&!le?xe[z]=_(b.image[z],!0,i.maxCubemapSize):xe[z]=le?b.image[z].image:b.image[z],xe[z]=it(b,xe[z]);const Be=xe[0],De=r.convert(b.format,b.colorSpace),ge=r.convert(b.type),We=M(b.internalFormat,De,ge,b.colorSpace),N=b.isVideoTexture!==!0,U=j.__version===void 0||K===!0,W=te.dataReady;let ne=E(b,Be);Ee(s.TEXTURE_CUBE_MAP,b);let J;if(Pe){N&&U&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ne,We,Be.width,Be.height);for(let z=0;z<6;z++){J=xe[z].mipmaps;for(let ie=0;ie<J.length;ie++){const Me=J[ie];b.format!==gn?De!==null?N?W&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie,0,0,Me.width,Me.height,De,Me.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie,We,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?W&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie,0,0,Me.width,Me.height,De,ge,Me.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie,We,Me.width,Me.height,0,De,ge,Me.data)}}}else{if(J=b.mipmaps,N&&U){J.length>0&&ne++;const z=je(xe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ne,We,z.width,z.height)}for(let z=0;z<6;z++)if(le){N?W&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,xe[z].width,xe[z].height,De,ge,xe[z].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,We,xe[z].width,xe[z].height,0,De,ge,xe[z].data);for(let ie=0;ie<J.length;ie++){const qe=J[ie].image[z].image;N?W&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie+1,0,0,qe.width,qe.height,De,ge,qe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie+1,We,qe.width,qe.height,0,De,ge,qe.data)}}else{N?W&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,De,ge,xe[z]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,We,De,ge,xe[z]);for(let ie=0;ie<J.length;ie++){const Me=J[ie];N?W&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie+1,0,0,De,ge,Me.image[z]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie+1,We,De,ge,Me.image[z])}}}m(b)&&p(s.TEXTURE_CUBE_MAP),j.__version=te.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function Se(A,b,k,K,te,j){const Ue=r.convert(k.format,k.colorSpace),fe=r.convert(k.type),Ae=M(k.internalFormat,Ue,fe,k.colorSpace),Pe=n.get(b),le=n.get(k);if(le.__renderTarget=b,!Pe.__hasExternalTextures){const xe=Math.max(1,b.width>>j),Be=Math.max(1,b.height>>j);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,j,Ae,xe,Be,b.depth,0,Ue,fe,null):t.texImage2D(te,j,Ae,xe,Be,0,Ue,fe,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),ce(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,te,le.__webglTexture,0,Ne(b)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,te,le.__webglTexture,j),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ae(A,b,k){if(s.bindRenderbuffer(s.RENDERBUFFER,A),b.depthBuffer){const K=b.depthTexture,te=K&&K.isDepthTexture?K.type:null,j=v(b.stencilBuffer,te),Ue=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,fe=Ne(b);ce(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe,j,b.width,b.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,j,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,j,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ue,s.RENDERBUFFER,A)}else{const K=b.textures;for(let te=0;te<K.length;te++){const j=K[te],Ue=r.convert(j.format,j.colorSpace),fe=r.convert(j.type),Ae=M(j.internalFormat,Ue,fe,j.colorSpace),Pe=Ne(b);k&&ce(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Pe,Ae,b.width,b.height):ce(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Pe,Ae,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Ae,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function oe(A,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(b.depthTexture);K.__renderTarget=b,(!K.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X(b.depthTexture,0);const te=K.__webglTexture,j=Ne(b);if(b.depthTexture.format===nr)ce(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0);else if(b.depthTexture.format===ir)ce(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ie(A){const b=n.get(A),k=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),K){const te=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,K.removeEventListener("dispose",te)};K.addEventListener("dispose",te),b.__depthDisposeCallback=te}b.__boundDepthTexture=K}if(A.depthTexture&&!b.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const K=A.texture.mipmaps;K&&K.length>0?oe(b.__webglFramebuffer[0],A):oe(b.__webglFramebuffer,A)}else if(k){b.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[K]),b.__webglDepthbuffer[K]===void 0)b.__webglDepthbuffer[K]=s.createRenderbuffer(),ae(b.__webglDepthbuffer[K],A,!1);else{const te=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,j)}}else{const K=A.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),ae(b.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,j)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Fe(A,b,k){const K=n.get(A);b!==void 0&&Se(K.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Ie(A)}function I(A){const b=A.texture,k=n.get(A),K=n.get(b);A.addEventListener("dispose",C);const te=A.textures,j=A.isWebGLCubeRenderTarget===!0,Ue=te.length>1;if(Ue||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=b.version,a.memory.textures++),j){k.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[fe]=[];for(let Ae=0;Ae<b.mipmaps.length;Ae++)k.__webglFramebuffer[fe][Ae]=s.createFramebuffer()}else k.__webglFramebuffer[fe]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let fe=0;fe<b.mipmaps.length;fe++)k.__webglFramebuffer[fe]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Ue)for(let fe=0,Ae=te.length;fe<Ae;fe++){const Pe=n.get(te[fe]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=s.createTexture(),a.memory.textures++)}if(A.samples>0&&ce(A)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let fe=0;fe<te.length;fe++){const Ae=te[fe];k.__webglColorRenderbuffer[fe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[fe]);const Pe=r.convert(Ae.format,Ae.colorSpace),le=r.convert(Ae.type),xe=M(Ae.internalFormat,Pe,le,Ae.colorSpace,A.isXRRenderTarget===!0),Be=Ne(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,Be,xe,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,k.__webglColorRenderbuffer[fe])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),ae(k.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(j){t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),Ee(s.TEXTURE_CUBE_MAP,b);for(let fe=0;fe<6;fe++)if(b.mipmaps&&b.mipmaps.length>0)for(let Ae=0;Ae<b.mipmaps.length;Ae++)Se(k.__webglFramebuffer[fe][Ae],A,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ae);else Se(k.__webglFramebuffer[fe],A,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);m(b)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ue){for(let fe=0,Ae=te.length;fe<Ae;fe++){const Pe=te[fe],le=n.get(Pe);let xe=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(xe,le.__webglTexture),Ee(xe,Pe),Se(k.__webglFramebuffer,A,Pe,s.COLOR_ATTACHMENT0+fe,xe,0),m(Pe)&&p(xe)}t.unbindTexture()}else{let fe=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(fe=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(fe,K.__webglTexture),Ee(fe,b),b.mipmaps&&b.mipmaps.length>0)for(let Ae=0;Ae<b.mipmaps.length;Ae++)Se(k.__webglFramebuffer[Ae],A,b,s.COLOR_ATTACHMENT0,fe,Ae);else Se(k.__webglFramebuffer,A,b,s.COLOR_ATTACHMENT0,fe,0);m(b)&&p(fe),t.unbindTexture()}A.depthBuffer&&Ie(A)}function Ce(A){const b=A.textures;for(let k=0,K=b.length;k<K;k++){const te=b[k];if(m(te)){const j=x(A),Ue=n.get(te).__webglTexture;t.bindTexture(j,Ue),p(j),t.unbindTexture()}}}const we=[],ye=[];function se(A){if(A.samples>0){if(ce(A)===!1){const b=A.textures,k=A.width,K=A.height;let te=s.COLOR_BUFFER_BIT;const j=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ue=n.get(A),fe=b.length>1;if(fe)for(let Pe=0;Pe<b.length;Pe++)t.bindFramebuffer(s.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ue.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer);const Ae=A.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let Pe=0;Pe<b.length;Pe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),fe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ue.__webglColorRenderbuffer[Pe]);const le=n.get(b[Pe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,le,0)}s.blitFramebuffer(0,0,k,K,0,0,k,K,te,s.NEAREST),c===!0&&(we.length=0,ye.length=0,we.push(s.COLOR_ATTACHMENT0+Pe),A.depthBuffer&&A.resolveDepthBuffer===!1&&(we.push(j),ye.push(j),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ye)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),fe)for(let Pe=0;Pe<b.length;Pe++){t.bindFramebuffer(s.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.RENDERBUFFER,Ue.__webglColorRenderbuffer[Pe]);const le=n.get(b[Pe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ue.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pe,s.TEXTURE_2D,le,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const b=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function Ne(A){return Math.min(i.maxSamples,A.samples)}function ce(A){const b=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Te(A){const b=a.render.frame;h.get(A)!==b&&(h.set(A,b),A.update())}function it(A,b){const k=A.colorSpace,K=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||k!==jt&&k!==pi&&(ct.getTransfer(k)===vt?(K!==gn||te!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),b}function je(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=F,this.setTexture2D=X,this.setTexture2DArray=V,this.setTexture3D=ee,this.setTextureCube=H,this.rebindTextures=Fe,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=se,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=ce}function Sv(s,e){function t(n,i=pi){let r;const a=ct.getTransfer(i);if(n===Un)return s.UNSIGNED_BYTE;if(n===_c)return s.UNSIGNED_SHORT_4_4_4_4;if(n===vc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Uh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Fh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ih)return s.BYTE;if(n===Nh)return s.SHORT;if(n===er)return s.UNSIGNED_SHORT;if(n===gc)return s.INT;if(n===Fi)return s.UNSIGNED_INT;if(n===wn)return s.FLOAT;if(n===lr)return s.HALF_FLOAT;if(n===Oh)return s.ALPHA;if(n===Bh)return s.RGB;if(n===gn)return s.RGBA;if(n===nr)return s.DEPTH_COMPONENT;if(n===ir)return s.DEPTH_STENCIL;if(n===xc)return s.RED;if(n===yc)return s.RED_INTEGER;if(n===kh)return s.RG;if(n===Mc)return s.RG_INTEGER;if(n===bc)return s.RGBA_INTEGER;if(n===Zr||n===Jr||n===Qr||n===ea)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ea)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wo||n===To||n===Ao||n===Ro)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===To)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ao)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ro)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Co||n===Po||n===Lo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Co||n===Po)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Lo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Do||n===Io||n===No||n===Uo||n===Fo||n===Oo||n===Bo||n===ko||n===zo||n===Ho||n===Vo||n===Go||n===Wo||n===Xo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Do)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Io)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===No)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ko)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ho)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Go)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xo)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$o||n===Yo||n===qo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===$o)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jo||n===Ko||n===Zo||n===Jo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===jo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ko)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Jo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===tr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Ev=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wv=`
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

}`;class Tv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new iu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new vi({vertexShader:Ev,fragmentShader:wv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new xi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Av extends zi{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Tv,p={},x=t.getContextAttributes();let M=null,v=null;const E=[],T=[],C=new me;let D=null;const S=new Xt;S.viewport=new ut;const y=new Xt;y.viewport=new ut;const P=[S,y],F=new Bp;let G=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let Q=E[Z];return Q===void 0&&(Q=new ka,E[Z]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Z){let Q=E[Z];return Q===void 0&&(Q=new ka,E[Z]=Q),Q.getGripSpace()},this.getHand=function(Z){let Q=E[Z];return Q===void 0&&(Q=new ka,E[Z]=Q),Q.getHandSpace()};function X(Z){const Q=T.indexOf(Z.inputSource);if(Q===-1)return;const Se=E[Q];Se!==void 0&&(Se.update(Z.inputSource,Z.frame,l||a),Se.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",ee);for(let Z=0;Z<E.length;Z++){const Q=T[Z];Q!==null&&(T[Z]=null,E[Z].disconnect(Q))}G=null,q=null,m.reset();for(const Z in p)delete p[Z];e.setRenderTarget(M),f=null,d=null,u=null,i=null,v=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",V),i.addEventListener("inputsourceschange",ee),x.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,ae=null,oe=null;x.depth&&(oe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=x.stencil?ir:nr,ae=x.stencil?tr:Fi);const Ie={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ie),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Oi(d.textureWidth,d.textureHeight,{format:gn,type:Un,depthTexture:new nu(d.textureWidth,d.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Se={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Se),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Oi(f.framebufferWidth,f.framebufferHeight,{format:gn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ze.setContext(i),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ee(Z){for(let Q=0;Q<Z.removed.length;Q++){const Se=Z.removed[Q],ae=T.indexOf(Se);ae>=0&&(T[ae]=null,E[ae].disconnect(Se))}for(let Q=0;Q<Z.added.length;Q++){const Se=Z.added[Q];let ae=T.indexOf(Se);if(ae===-1){for(let Ie=0;Ie<E.length;Ie++)if(Ie>=T.length){T.push(Se),ae=Ie;break}else if(T[Ie]===null){T[Ie]=Se,ae=Ie;break}if(ae===-1)break}const oe=E[ae];oe&&oe.connect(Se)}}const H=new R,he=new R;function pe(Z,Q,Se){H.setFromMatrixPosition(Q.matrixWorld),he.setFromMatrixPosition(Se.matrixWorld);const ae=H.distanceTo(he),oe=Q.projectionMatrix.elements,Ie=Se.projectionMatrix.elements,Fe=oe[14]/(oe[10]-1),I=oe[14]/(oe[10]+1),Ce=(oe[9]+1)/oe[5],we=(oe[9]-1)/oe[5],ye=(oe[8]-1)/oe[0],se=(Ie[8]+1)/Ie[0],Ne=Fe*ye,ce=Fe*se,Te=ae/(-ye+se),it=Te*-ye;if(Q.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(it),Z.translateZ(Te),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),oe[10]===-1)Z.projectionMatrix.copy(Q.projectionMatrix),Z.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const je=Fe+Te,A=I+Te,b=Ne-it,k=ce+(ae-it),K=Ce*I/A*je,te=we*I/A*je;Z.projectionMatrix.makePerspective(b,k,K,te,je,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ve(Z,Q){Q===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(Q.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let Q=Z.near,Se=Z.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(Se=m.depthFar)),F.near=y.near=S.near=Q,F.far=y.far=S.far=Se,(G!==F.near||q!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),G=F.near,q=F.far),F.layers.mask=Z.layers.mask|6,S.layers.mask=F.layers.mask&3,y.layers.mask=F.layers.mask&5;const ae=Z.parent,oe=F.cameras;ve(F,ae);for(let Ie=0;Ie<oe.length;Ie++)ve(oe[Ie],ae);oe.length===2?pe(F,S,y):F.projectionMatrix.copy(S.projectionMatrix),Ee(Z,F,ae)};function Ee(Z,Q,Se){Se===null?Z.matrix.copy(Q.matrixWorld):(Z.matrix.copy(Se.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(Q.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(Q.projectionMatrix),Z.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=xs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Z){c=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Z){return p[Z]};let st=null;function ot(Z,Q){if(h=Q.getViewerPose(l||a),g=Q,h!==null){const Se=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ae=!1;Se.length!==F.cameras.length&&(F.cameras.length=0,ae=!0);for(let I=0;I<Se.length;I++){const Ce=Se[I];let we=null;if(f!==null)we=f.getViewport(Ce);else{const se=u.getViewSubImage(d,Ce);we=se.viewport,I===0&&(e.setRenderTargetTextures(v,se.colorTexture,se.depthStencilTexture),e.setRenderTarget(v))}let ye=P[I];ye===void 0&&(ye=new Xt,ye.layers.enable(I),ye.viewport=new ut,P[I]=ye),ye.matrix.fromArray(Ce.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(Ce.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(we.x,we.y,we.width,we.height),I===0&&(F.matrix.copy(ye.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ae===!0&&F.cameras.push(ye)}const oe=i.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const I=u.getDepthInformation(Se[0]);I&&I.isValid&&I.texture&&m.init(I,i.renderState)}if(oe&&oe.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let I=0;I<Se.length;I++){const Ce=Se[I].camera;if(Ce){let we=p[Ce];we||(we=new iu,p[Ce]=we);const ye=u.getCameraImage(Ce);we.sourceTexture=ye}}}}for(let Se=0;Se<E.length;Se++){const ae=T[Se],oe=E[Se];ae!==null&&oe!==void 0&&oe.update(ae,Q,l||a)}st&&st(Z,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Ze=new du;Ze.setAnimationLoop(ot),this.setAnimationLoop=function(Z){st=Z},this.dispose=function(){}}}const Ai=new vn,Rv=new Ke;function Cv(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,qh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,x,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Yt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Yt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),M=x.envMap,v=x.envMapRotation;M&&(m.envMap.value=M,Ai.copy(v),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),m.envMapRotation.value.setFromMatrix4(Rv.makeRotationFromEuler(Ai)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Yt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Pv(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const v=M.program;n.uniformBlockBinding(x,v)}function l(x,M){let v=i[x.id];v===void 0&&(g(x),v=h(x),i[x.id]=v,x.addEventListener("dispose",m));const E=M.program;n.updateUBOMapping(x,E);const T=e.render.frame;r[x.id]!==T&&(d(x),r[x.id]=T)}function h(x){const M=u();x.__bindingPointIndex=M;const v=s.createBuffer(),E=x.__size,T=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,E,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,v),v}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const M=i[x.id],v=x.uniforms,E=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let T=0,C=v.length;T<C;T++){const D=Array.isArray(v[T])?v[T]:[v[T]];for(let S=0,y=D.length;S<y;S++){const P=D[S];if(f(P,T,S,E)===!0){const F=P.__offset,G=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let X=0;X<G.length;X++){const V=G[X],ee=_(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,F+q,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,q),q+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,M,v,E){const T=x.value,C=M+"_"+v;if(E[C]===void 0)return typeof T=="number"||typeof T=="boolean"?E[C]=T:E[C]=T.clone(),!0;{const D=E[C];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return E[C]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function g(x){const M=x.uniforms;let v=0;const E=16;for(let C=0,D=M.length;C<D;C++){const S=Array.isArray(M[C])?M[C]:[M[C]];for(let y=0,P=S.length;y<P;y++){const F=S[y],G=Array.isArray(F.value)?F.value:[F.value];for(let q=0,X=G.length;q<X;q++){const V=G[q],ee=_(V),H=v%E,he=H%ee.boundary,pe=H+he;v+=he,pe!==0&&E-pe<ee.storage&&(v+=E-pe),F.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=ee.storage}}}const T=v%E;return T>0&&(v+=E-T),x.__size=v,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const v=a.indexOf(M.__bindingPointIndex);a.splice(v,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class Lv{constructor(e={}){const{canvas:t=xf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const x=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=At;let T=0,C=0,D=null,S=-1,y=null;const P=new ut,F=new ut;let G=null;const q=new He(0);let X=0,V=t.width,ee=t.height,H=1,he=null,pe=null;const ve=new ut(0,0,V,ee),Ee=new ut(0,0,V,ee);let st=!1;const ot=new Cc;let Ze=!1,Z=!1;const Q=new Ke,Se=new R,ae=new ut,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ie=!1;function Fe(){return D===null?H:1}let I=n;function Ce(w,O){return t.getContext(w,O)}try{const w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${pc}`),t.addEventListener("webglcontextlost",W,!1),t.addEventListener("webglcontextrestored",ne,!1),t.addEventListener("webglcontextcreationerror",J,!1),I===null){const O="webgl2";if(I=Ce(O,w),I===null)throw Ce(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let we,ye,se,Ne,ce,Te,it,je,A,b,k,K,te,j,Ue,fe,Ae,Pe,le,xe,Be,De,ge,We;function N(){we=new H0(I),we.init(),De=new Sv(I,we),ye=new N0(I,we,e,De),se=new Mv(I,we),ye.reversedDepthBuffer&&d&&se.buffers.depth.setReversed(!0),Ne=new W0(I),ce=new cv,Te=new bv(I,we,se,ce,ye,De,Ne),it=new F0(v),je=new z0(v),A=new Kp(I),ge=new D0(I,A),b=new V0(I,A,Ne,ge),k=new $0(I,b,A,Ne),le=new X0(I,ye,Te),fe=new U0(ce),K=new ov(v,it,je,we,ye,ge,fe),te=new Cv(v,ce),j=new hv,Ue=new gv(we),Pe=new L0(v,it,je,se,k,f,c),Ae=new xv(v,k,ye),We=new Pv(I,Ne,ye,se),xe=new I0(I,we,Ne),Be=new G0(I,we,Ne),Ne.programs=K.programs,v.capabilities=ye,v.extensions=we,v.properties=ce,v.renderLists=j,v.shadowMap=Ae,v.state=se,v.info=Ne}N();const U=new Av(v,I);this.xr=U,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=we.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=we.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(w){w!==void 0&&(H=w,this.setSize(V,ee,!1))},this.getSize=function(w){return w.set(V,ee)},this.setSize=function(w,O,$=!0){if(U.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=w,ee=O,t.width=Math.floor(w*H),t.height=Math.floor(O*H),$===!0&&(t.style.width=w+"px",t.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(V*H,ee*H).floor()},this.setDrawingBufferSize=function(w,O,$){V=w,ee=O,H=$,t.width=Math.floor(w*$),t.height=Math.floor(O*$),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(ve)},this.setViewport=function(w,O,$,Y){w.isVector4?ve.set(w.x,w.y,w.z,w.w):ve.set(w,O,$,Y),se.viewport(P.copy(ve).multiplyScalar(H).round())},this.getScissor=function(w){return w.copy(Ee)},this.setScissor=function(w,O,$,Y){w.isVector4?Ee.set(w.x,w.y,w.z,w.w):Ee.set(w,O,$,Y),se.scissor(F.copy(Ee).multiplyScalar(H).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(w){se.setScissorTest(st=w)},this.setOpaqueSort=function(w){he=w},this.setTransparentSort=function(w){pe=w},this.getClearColor=function(w){return w.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(w=!0,O=!0,$=!0){let Y=0;if(w){let B=!1;if(D!==null){const ue=D.texture.format;B=ue===bc||ue===Mc||ue===yc}if(B){const ue=D.texture.type,be=ue===Un||ue===Fi||ue===er||ue===tr||ue===_c||ue===vc,Le=Pe.getClearColor(),Re=Pe.getClearAlpha(),Ve=Le.r,Xe=Le.g,Oe=Le.b;be?(g[0]=Ve,g[1]=Xe,g[2]=Oe,g[3]=Re,I.clearBufferuiv(I.COLOR,0,g)):(_[0]=Ve,_[1]=Xe,_[2]=Oe,_[3]=Re,I.clearBufferiv(I.COLOR,0,_))}else Y|=I.COLOR_BUFFER_BIT}O&&(Y|=I.DEPTH_BUFFER_BIT),$&&(Y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",W,!1),t.removeEventListener("webglcontextrestored",ne,!1),t.removeEventListener("webglcontextcreationerror",J,!1),Pe.dispose(),j.dispose(),Ue.dispose(),ce.dispose(),it.dispose(),je.dispose(),k.dispose(),ge.dispose(),We.dispose(),K.dispose(),U.dispose(),U.removeEventListener("sessionstart",wt),U.removeEventListener("sessionend",On),yn.stop()};function W(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ne(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const w=Ne.autoReset,O=Ae.enabled,$=Ae.autoUpdate,Y=Ae.needsUpdate,B=Ae.type;N(),Ne.autoReset=w,Ae.enabled=O,Ae.autoUpdate=$,Ae.needsUpdate=Y,Ae.type=B}function J(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function z(w){const O=w.target;O.removeEventListener("dispose",z),ie(O)}function ie(w){Me(w),ce.remove(w)}function Me(w){const O=ce.get(w).programs;O!==void 0&&(O.forEach(function($){K.releaseProgram($)}),w.isShaderMaterial&&K.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,$,Y,B,ue){O===null&&(O=oe);const be=B.isMesh&&B.matrixWorld.determinant()<0,Le=zu(w,O,$,Y,B);se.setMaterial(Y,be);let Re=$.index,Ve=1;if(Y.wireframe===!0){if(Re=b.getWireframeAttribute($),Re===void 0)return;Ve=2}const Xe=$.drawRange,Oe=$.attributes.position;let at=Xe.start*Ve,_t=(Xe.start+Xe.count)*Ve;ue!==null&&(at=Math.max(at,ue.start*Ve),_t=Math.min(_t,(ue.start+ue.count)*Ve)),Re!==null?(at=Math.max(at,0),_t=Math.min(_t,Re.count)):Oe!=null&&(at=Math.max(at,0),_t=Math.min(_t,Oe.count));const Tt=_t-at;if(Tt<0||Tt===1/0)return;ge.setup(B,Y,Le,$,Re);let bt,Mt=xe;if(Re!==null&&(bt=A.get(Re),Mt=Be,Mt.setIndex(bt)),B.isMesh)Y.wireframe===!0?(se.setLineWidth(Y.wireframeLinewidth*Fe()),Mt.setMode(I.LINES)):Mt.setMode(I.TRIANGLES);else if(B.isLine){let ke=Y.linewidth;ke===void 0&&(ke=1),se.setLineWidth(ke*Fe()),B.isLineSegments?Mt.setMode(I.LINES):B.isLineLoop?Mt.setMode(I.LINE_LOOP):Mt.setMode(I.LINE_STRIP)}else B.isPoints?Mt.setMode(I.POINTS):B.isSprite&&Mt.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)or("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Mt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(we.get("WEBGL_multi_draw"))Mt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const ke=B._multiDrawStarts,St=B._multiDrawCounts,lt=B._multiDrawCount,nn=Re?A.get(Re).bytesPerElement:1,Vi=ce.get(Y).currentProgram.getUniforms();for(let sn=0;sn<lt;sn++)Vi.setValue(I,"_gl_DrawID",sn),Mt.render(ke[sn]/nn,St[sn])}else if(B.isInstancedMesh)Mt.renderInstances(at,Tt,B.count);else if($.isInstancedBufferGeometry){const ke=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,St=Math.min($.instanceCount,ke);Mt.renderInstances(at,Tt,St)}else Mt.render(at,Tt)};function qe(w,O,$){w.transparent===!0&&w.side===Dt&&w.forceSinglePass===!1?(w.side=Yt,w.needsUpdate=!0,Pn(w,O,$),w.side=ei,w.needsUpdate=!0,Pn(w,O,$),w.side=Dt):Pn(w,O,$)}this.compile=function(w,O,$=null){$===null&&($=w),p=Ue.get($),p.init(O),M.push(p),$.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),w!==$&&w.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const Y=new Set;return w.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ue=B.material;if(ue)if(Array.isArray(ue))for(let be=0;be<ue.length;be++){const Le=ue[be];qe(Le,$,B),Y.add(Le)}else qe(ue,$,B),Y.add(ue)}),p=M.pop(),Y},this.compileAsync=function(w,O,$=null){const Y=this.compile(w,O,$);return new Promise(B=>{function ue(){if(Y.forEach(function(be){ce.get(be).currentProgram.isReady()&&Y.delete(be)}),Y.size===0){B(w);return}setTimeout(ue,10)}we.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Je=null;function Ot(w){Je&&Je(w)}function wt(){yn.stop()}function On(){yn.start()}const yn=new du;yn.setAnimationLoop(Ot),typeof self<"u"&&yn.setContext(self),this.setAnimationLoop=function(w){Je=w,U.setAnimationLoop(w),w===null?yn.stop():yn.start()},U.addEventListener("sessionstart",wt),U.addEventListener("sessionend",On),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),U.enabled===!0&&U.isPresenting===!0&&(U.cameraAutoUpdate===!0&&U.updateCamera(O),O=U.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,O,D),p=Ue.get(w,M.length),p.init(O),M.push(p),Q.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),ot.setFromProjectionMatrix(Q,In,O.reversedDepth),Z=this.localClippingEnabled,Ze=fe.init(this.clippingPlanes,Z),m=j.get(w,x.length),m.init(),x.push(m),U.enabled===!0&&U.isPresenting===!0){const ue=v.xr.getDepthSensingMesh();ue!==null&&yi(ue,O,-1/0,v.sortObjects)}yi(w,O,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(he,pe),Ie=U.enabled===!1||U.isPresenting===!1||U.hasDepthSensing()===!1,Ie&&Pe.addToRenderList(m,w),this.info.render.frame++,Ze===!0&&fe.beginShadows();const $=p.state.shadowsArray;Ae.render($,w,O),Ze===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,B=m.transmissive;if(p.setupLights(),O.isArrayCamera){const ue=O.cameras;if(B.length>0)for(let be=0,Le=ue.length;be<Le;be++){const Re=ue[be];ze(Y,B,w,Re)}Ie&&Pe.render(w);for(let be=0,Le=ue.length;be<Le;be++){const Re=ue[be];pr(m,w,Re,Re.viewport)}}else B.length>0&&ze(Y,B,w,O),Ie&&Pe.render(w),pr(m,w,O);D!==null&&C===0&&(Te.updateMultisampleRenderTarget(D),Te.updateRenderTargetMipmap(D)),w.isScene===!0&&w.onAfterRender(v,w,O),ge.resetDefaultState(),S=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],Ze===!0&&fe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function yi(w,O,$,Y){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||ot.intersectsSprite(w)){Y&&ae.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Q);const be=k.update(w),Le=w.material;Le.visible&&m.push(w,be,Le,$,ae.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||ot.intersectsObject(w))){const be=k.update(w),Le=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ae.copy(w.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),ae.copy(be.boundingSphere.center)),ae.applyMatrix4(w.matrixWorld).applyMatrix4(Q)),Array.isArray(Le)){const Re=be.groups;for(let Ve=0,Xe=Re.length;Ve<Xe;Ve++){const Oe=Re[Ve],at=Le[Oe.materialIndex];at&&at.visible&&m.push(w,be,at,$,ae.z,Oe)}}else Le.visible&&m.push(w,be,Le,$,ae.z,null)}}const ue=w.children;for(let be=0,Le=ue.length;be<Le;be++)yi(ue[be],O,$,Y)}function pr(w,O,$,Y){const B=w.opaque,ue=w.transmissive,be=w.transparent;p.setupLightsView($),Ze===!0&&fe.setGlobalState(v.clippingPlanes,$),Y&&se.viewport(P.copy(Y)),B.length>0&&Bn(B,O,$),ue.length>0&&Bn(ue,O,$),be.length>0&&Bn(be,O,$),se.buffers.depth.setTest(!0),se.buffers.depth.setMask(!0),se.buffers.color.setMask(!0),se.setPolygonOffset(!1)}function ze(w,O,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Oi(1,1,{generateMipmaps:!0,type:we.has("EXT_color_buffer_half_float")||we.has("EXT_color_buffer_float")?lr:Un,minFilter:qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ct.workingColorSpace}));const ue=p.state.transmissionRenderTarget[Y.id],be=Y.viewport||P;ue.setSize(be.z*v.transmissionResolutionScale,be.w*v.transmissionResolutionScale);const Le=v.getRenderTarget(),Re=v.getActiveCubeFace(),Ve=v.getActiveMipmapLevel();v.setRenderTarget(ue),v.getClearColor(q),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),Ie&&Pe.render($);const Xe=v.toneMapping;v.toneMapping=_i;const Oe=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),Ze===!0&&fe.setGlobalState(v.clippingPlanes,Y),Bn(w,$,Y),Te.updateMultisampleRenderTarget(ue),Te.updateRenderTargetMipmap(ue),we.has("WEBGL_multisampled_render_to_texture")===!1){let at=!1;for(let _t=0,Tt=O.length;_t<Tt;_t++){const bt=O[_t],Mt=bt.object,ke=bt.geometry,St=bt.material,lt=bt.group;if(St.side===Dt&&Mt.layers.test(Y.layers)){const nn=St.side;St.side=Yt,St.needsUpdate=!0,ii(Mt,$,Y,ke,St,lt),St.side=nn,St.needsUpdate=!0,at=!0}}at===!0&&(Te.updateMultisampleRenderTarget(ue),Te.updateRenderTargetMipmap(ue))}v.setRenderTarget(Le,Re,Ve),v.setClearColor(q,X),Oe!==void 0&&(Y.viewport=Oe),v.toneMapping=Xe}function Bn(w,O,$){const Y=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ue=w.length;B<ue;B++){const be=w[B],Le=be.object,Re=be.geometry,Ve=be.group;let Xe=be.material;Xe.allowOverride===!0&&Y!==null&&(Xe=Y),Le.layers.test($.layers)&&ii(Le,O,$,Re,Xe,Ve)}}function ii(w,O,$,Y,B,ue){w.onBeforeRender(v,O,$,Y,B,ue),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(v,O,$,Y,w,ue),B.transparent===!0&&B.side===Dt&&B.forceSinglePass===!1?(B.side=Yt,B.needsUpdate=!0,v.renderBufferDirect($,O,Y,B,w,ue),B.side=ei,B.needsUpdate=!0,v.renderBufferDirect($,O,Y,B,w,ue),B.side=Dt):v.renderBufferDirect($,O,Y,B,w,ue),w.onAfterRender(v,O,$,Y,B,ue)}function Pn(w,O,$){O.isScene!==!0&&(O=oe);const Y=ce.get(w),B=p.state.lights,ue=p.state.shadowsArray,be=B.state.version,Le=K.getParameters(w,B.state,ue,O,$),Re=K.getProgramCacheKey(Le);let Ve=Y.programs;Y.environment=w.isMeshStandardMaterial?O.environment:null,Y.fog=O.fog,Y.envMap=(w.isMeshStandardMaterial?je:it).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Ve===void 0&&(w.addEventListener("dispose",z),Ve=new Map,Y.programs=Ve);let Xe=Ve.get(Re);if(Xe!==void 0){if(Y.currentProgram===Xe&&Y.lightsStateVersion===be)return Xc(w,Le),Xe}else Le.uniforms=K.getUniforms(w),w.onBeforeCompile(Le,v),Xe=K.acquireProgram(Le,Re),Ve.set(Re,Xe),Y.uniforms=Le.uniforms;const Oe=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Oe.clippingPlanes=fe.uniform),Xc(w,Le),Y.needsLights=Vu(w),Y.lightsStateVersion=be,Y.needsLights&&(Oe.ambientLightColor.value=B.state.ambient,Oe.lightProbe.value=B.state.probe,Oe.directionalLights.value=B.state.directional,Oe.directionalLightShadows.value=B.state.directionalShadow,Oe.spotLights.value=B.state.spot,Oe.spotLightShadows.value=B.state.spotShadow,Oe.rectAreaLights.value=B.state.rectArea,Oe.ltc_1.value=B.state.rectAreaLTC1,Oe.ltc_2.value=B.state.rectAreaLTC2,Oe.pointLights.value=B.state.point,Oe.pointLightShadows.value=B.state.pointShadow,Oe.hemisphereLights.value=B.state.hemi,Oe.directionalShadowMap.value=B.state.directionalShadowMap,Oe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Oe.spotShadowMap.value=B.state.spotShadowMap,Oe.spotLightMatrix.value=B.state.spotLightMatrix,Oe.spotLightMap.value=B.state.spotLightMap,Oe.pointShadowMap.value=B.state.pointShadowMap,Oe.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=Xe,Y.uniformsList=null,Xe}function Wc(w){if(w.uniformsList===null){const O=w.currentProgram.getUniforms();w.uniformsList=ta.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function Xc(w,O){const $=ce.get(w);$.outputColorSpace=O.outputColorSpace,$.batching=O.batching,$.batchingColor=O.batchingColor,$.instancing=O.instancing,$.instancingColor=O.instancingColor,$.instancingMorph=O.instancingMorph,$.skinning=O.skinning,$.morphTargets=O.morphTargets,$.morphNormals=O.morphNormals,$.morphColors=O.morphColors,$.morphTargetsCount=O.morphTargetsCount,$.numClippingPlanes=O.numClippingPlanes,$.numIntersection=O.numClipIntersection,$.vertexAlphas=O.vertexAlphas,$.vertexTangents=O.vertexTangents,$.toneMapping=O.toneMapping}function zu(w,O,$,Y,B){O.isScene!==!0&&(O=oe),Te.resetTextureUnits();const ue=O.fog,be=Y.isMeshStandardMaterial?O.environment:null,Le=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:jt,Re=(Y.isMeshStandardMaterial?je:it).get(Y.envMap||be),Ve=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Xe=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Oe=!!$.morphAttributes.position,at=!!$.morphAttributes.normal,_t=!!$.morphAttributes.color;let Tt=_i;Y.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Tt=v.toneMapping);const bt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Mt=bt!==void 0?bt.length:0,ke=ce.get(Y),St=p.state.lights;if(Ze===!0&&(Z===!0||w!==y)){const Ht=w===y&&Y.id===S;fe.setState(Y,w,Ht)}let lt=!1;Y.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==St.state.version||ke.outputColorSpace!==Le||B.isBatchedMesh&&ke.batching===!1||!B.isBatchedMesh&&ke.batching===!0||B.isBatchedMesh&&ke.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&ke.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&ke.instancing===!1||!B.isInstancedMesh&&ke.instancing===!0||B.isSkinnedMesh&&ke.skinning===!1||!B.isSkinnedMesh&&ke.skinning===!0||B.isInstancedMesh&&ke.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ke.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ke.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ke.instancingMorph===!1&&B.morphTexture!==null||ke.envMap!==Re||Y.fog===!0&&ke.fog!==ue||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==fe.numPlanes||ke.numIntersection!==fe.numIntersection)||ke.vertexAlphas!==Ve||ke.vertexTangents!==Xe||ke.morphTargets!==Oe||ke.morphNormals!==at||ke.morphColors!==_t||ke.toneMapping!==Tt||ke.morphTargetsCount!==Mt)&&(lt=!0):(lt=!0,ke.__version=Y.version);let nn=ke.currentProgram;lt===!0&&(nn=Pn(Y,O,B));let Vi=!1,sn=!1,Ls=!1;const Et=nn.getUniforms(),hn=ke.uniforms;if(se.useProgram(nn.program)&&(Vi=!0,sn=!0,Ls=!0),Y.id!==S&&(S=Y.id,sn=!0),Vi||y!==w){se.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Et.setValue(I,"projectionMatrix",w.projectionMatrix),Et.setValue(I,"viewMatrix",w.matrixWorldInverse);const Jt=Et.map.cameraPosition;Jt!==void 0&&Jt.setValue(I,Se.setFromMatrixPosition(w.matrixWorld)),ye.logarithmicDepthBuffer&&Et.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Et.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,sn=!0,Ls=!0)}if(B.isSkinnedMesh){Et.setOptional(I,B,"bindMatrix"),Et.setOptional(I,B,"bindMatrixInverse");const Ht=B.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),Et.setValue(I,"boneTexture",Ht.boneTexture,Te))}B.isBatchedMesh&&(Et.setOptional(I,B,"batchingTexture"),Et.setValue(I,"batchingTexture",B._matricesTexture,Te),Et.setOptional(I,B,"batchingIdTexture"),Et.setValue(I,"batchingIdTexture",B._indirectTexture,Te),Et.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&Et.setValue(I,"batchingColorTexture",B._colorsTexture,Te));const un=$.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&le.update(B,$,nn),(sn||ke.receiveShadow!==B.receiveShadow)&&(ke.receiveShadow=B.receiveShadow,Et.setValue(I,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(hn.envMap.value=Re,hn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&O.environment!==null&&(hn.envMapIntensity.value=O.environmentIntensity),sn&&(Et.setValue(I,"toneMappingExposure",v.toneMappingExposure),ke.needsLights&&Hu(hn,Ls),ue&&Y.fog===!0&&te.refreshFogUniforms(hn,ue),te.refreshMaterialUniforms(hn,Y,H,ee,p.state.transmissionRenderTarget[w.id]),ta.upload(I,Wc(ke),hn,Te)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ta.upload(I,Wc(ke),hn,Te),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Et.setValue(I,"center",B.center),Et.setValue(I,"modelViewMatrix",B.modelViewMatrix),Et.setValue(I,"normalMatrix",B.normalMatrix),Et.setValue(I,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Ht=Y.uniformsGroups;for(let Jt=0,ga=Ht.length;Jt<ga;Jt++){const Mi=Ht[Jt];We.update(Mi,nn),We.bind(Mi,nn)}}return nn}function Hu(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function Vu(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(w,O,$){const Y=ce.get(w);Y.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),ce.get(w.texture).__webglTexture=O,ce.get(w.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:$,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,O){const $=ce.get(w);$.__webglFramebuffer=O,$.__useDefaultFramebuffer=O===void 0};const Gu=I.createFramebuffer();this.setRenderTarget=function(w,O=0,$=0){D=w,T=O,C=$;let Y=!0,B=null,ue=!1,be=!1;if(w){const Re=ce.get(w);if(Re.__useDefaultFramebuffer!==void 0)se.bindFramebuffer(I.FRAMEBUFFER,null),Y=!1;else if(Re.__webglFramebuffer===void 0)Te.setupRenderTarget(w);else if(Re.__hasExternalTextures)Te.rebindTextures(w,ce.get(w.texture).__webglTexture,ce.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Oe=w.depthTexture;if(Re.__boundDepthTexture!==Oe){if(Oe!==null&&ce.has(Oe)&&(w.width!==Oe.image.width||w.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Te.setupDepthRenderbuffer(w)}}const Ve=w.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(be=!0);const Xe=ce.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Xe[O])?B=Xe[O][$]:B=Xe[O],ue=!0):w.samples>0&&Te.useMultisampledRTT(w)===!1?B=ce.get(w).__webglMultisampledFramebuffer:Array.isArray(Xe)?B=Xe[$]:B=Xe,P.copy(w.viewport),F.copy(w.scissor),G=w.scissorTest}else P.copy(ve).multiplyScalar(H).floor(),F.copy(Ee).multiplyScalar(H).floor(),G=st;if($!==0&&(B=Gu),se.bindFramebuffer(I.FRAMEBUFFER,B)&&Y&&se.drawBuffers(w,B),se.viewport(P),se.scissor(F),se.setScissorTest(G),ue){const Re=ce.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,Re.__webglTexture,$)}else if(be){const Re=O;for(let Ve=0;Ve<w.textures.length;Ve++){const Xe=ce.get(w.textures[Ve]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ve,Xe.__webglTexture,$,Re)}}else if(w!==null&&$!==0){const Re=ce.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Re.__webglTexture,$)}S=-1},this.readRenderTargetPixels=function(w,O,$,Y,B,ue,be,Le=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=ce.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(Re=Re[be]),Re){se.bindFramebuffer(I.FRAMEBUFFER,Re);try{const Ve=w.textures[Le],Xe=Ve.format,Oe=Ve.type;if(!ye.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ye.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-Y&&$>=0&&$<=w.height-B&&(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Le),I.readPixels(O,$,Y,B,De.convert(Xe),De.convert(Oe),ue))}finally{const Ve=D!==null?ce.get(D).__webglFramebuffer:null;se.bindFramebuffer(I.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(w,O,$,Y,B,ue,be,Le=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=ce.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(Re=Re[be]),Re)if(O>=0&&O<=w.width-Y&&$>=0&&$<=w.height-B){se.bindFramebuffer(I.FRAMEBUFFER,Re);const Ve=w.textures[Le],Xe=Ve.format,Oe=Ve.type;if(!ye.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ye.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,at),I.bufferData(I.PIXEL_PACK_BUFFER,ue.byteLength,I.STREAM_READ),w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Le),I.readPixels(O,$,Y,B,De.convert(Xe),De.convert(Oe),0);const _t=D!==null?ce.get(D).__webglFramebuffer:null;se.bindFramebuffer(I.FRAMEBUFFER,_t);const Tt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await yf(I,Tt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,at),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ue),I.deleteBuffer(at),I.deleteSync(Tt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,O=null,$=0){const Y=Math.pow(2,-$),B=Math.floor(w.image.width*Y),ue=Math.floor(w.image.height*Y),be=O!==null?O.x:0,Le=O!==null?O.y:0;Te.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,be,Le,B,ue),se.unbindTexture()};const Wu=I.createFramebuffer(),Xu=I.createFramebuffer();this.copyTextureToTexture=function(w,O,$=null,Y=null,B=0,ue=null){ue===null&&(B!==0?(or("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ue=B,B=0):ue=0);let be,Le,Re,Ve,Xe,Oe,at,_t,Tt;const bt=w.isCompressedTexture?w.mipmaps[ue]:w.image;if($!==null)be=$.max.x-$.min.x,Le=$.max.y-$.min.y,Re=$.isBox3?$.max.z-$.min.z:1,Ve=$.min.x,Xe=$.min.y,Oe=$.isBox3?$.min.z:0;else{const un=Math.pow(2,-B);be=Math.floor(bt.width*un),Le=Math.floor(bt.height*un),w.isDataArrayTexture?Re=bt.depth:w.isData3DTexture?Re=Math.floor(bt.depth*un):Re=1,Ve=0,Xe=0,Oe=0}Y!==null?(at=Y.x,_t=Y.y,Tt=Y.z):(at=0,_t=0,Tt=0);const Mt=De.convert(O.format),ke=De.convert(O.type);let St;O.isData3DTexture?(Te.setTexture3D(O,0),St=I.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Te.setTexture2DArray(O,0),St=I.TEXTURE_2D_ARRAY):(Te.setTexture2D(O,0),St=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const lt=I.getParameter(I.UNPACK_ROW_LENGTH),nn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Vi=I.getParameter(I.UNPACK_SKIP_PIXELS),sn=I.getParameter(I.UNPACK_SKIP_ROWS),Ls=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,bt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,bt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ve),I.pixelStorei(I.UNPACK_SKIP_ROWS,Xe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Oe);const Et=w.isDataArrayTexture||w.isData3DTexture,hn=O.isDataArrayTexture||O.isData3DTexture;if(w.isDepthTexture){const un=ce.get(w),Ht=ce.get(O),Jt=ce.get(un.__renderTarget),ga=ce.get(Ht.__renderTarget);se.bindFramebuffer(I.READ_FRAMEBUFFER,Jt.__webglFramebuffer),se.bindFramebuffer(I.DRAW_FRAMEBUFFER,ga.__webglFramebuffer);for(let Mi=0;Mi<Re;Mi++)Et&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ce.get(w).__webglTexture,B,Oe+Mi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ce.get(O).__webglTexture,ue,Tt+Mi)),I.blitFramebuffer(Ve,Xe,be,Le,at,_t,be,Le,I.DEPTH_BUFFER_BIT,I.NEAREST);se.bindFramebuffer(I.READ_FRAMEBUFFER,null),se.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(B!==0||w.isRenderTargetTexture||ce.has(w)){const un=ce.get(w),Ht=ce.get(O);se.bindFramebuffer(I.READ_FRAMEBUFFER,Wu),se.bindFramebuffer(I.DRAW_FRAMEBUFFER,Xu);for(let Jt=0;Jt<Re;Jt++)Et?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,un.__webglTexture,B,Oe+Jt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,un.__webglTexture,B),hn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ht.__webglTexture,ue,Tt+Jt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ht.__webglTexture,ue),B!==0?I.blitFramebuffer(Ve,Xe,be,Le,at,_t,be,Le,I.COLOR_BUFFER_BIT,I.NEAREST):hn?I.copyTexSubImage3D(St,ue,at,_t,Tt+Jt,Ve,Xe,be,Le):I.copyTexSubImage2D(St,ue,at,_t,Ve,Xe,be,Le);se.bindFramebuffer(I.READ_FRAMEBUFFER,null),se.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else hn?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(St,ue,at,_t,Tt,be,Le,Re,Mt,ke,bt.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(St,ue,at,_t,Tt,be,Le,Re,Mt,bt.data):I.texSubImage3D(St,ue,at,_t,Tt,be,Le,Re,Mt,ke,bt):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ue,at,_t,be,Le,Mt,ke,bt.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ue,at,_t,bt.width,bt.height,Mt,bt.data):I.texSubImage2D(I.TEXTURE_2D,ue,at,_t,be,Le,Mt,ke,bt);I.pixelStorei(I.UNPACK_ROW_LENGTH,lt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,nn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Vi),I.pixelStorei(I.UNPACK_SKIP_ROWS,sn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ls),ue===0&&O.generateMipmaps&&I.generateMipmap(St),se.unbindTexture()},this.initRenderTarget=function(w){ce.get(w).__webglFramebuffer===void 0&&Te.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Te.setTextureCube(w,0):w.isData3DTexture?Te.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Te.setTexture2DArray(w,0):Te.setTexture2D(w,0),se.unbindTexture()},this.resetState=function(){T=0,C=0,D=null,se.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}}const dh={type:"change"},Bc={type:"start"},_u={type:"end"},$r=new hr,fh=new fi,Dv=Math.cos(70*wc.DEG2RAD),Pt=new R,Qt=2*Math.PI,xt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},io=1e-6;class Iv extends qp{constructor(e,t=null){super(e,t),this.state=xt.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Kn.ROTATE,MIDDLE:Kn.DOLLY,RIGHT:Kn.PAN},this.touches={ONE:Yn.ROTATE,TWO:Yn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new _n,this._lastTargetPosition=new R,this._quat=new _n().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hl,this._sphericalDelta=new Hl,this._scale=1,this._panOffset=new R,this._rotateStart=new me,this._rotateEnd=new me,this._rotateDelta=new me,this._panStart=new me,this._panEnd=new me,this._panDelta=new me,this._dollyStart=new me,this._dollyEnd=new me,this._dollyDelta=new me,this._dollyDirection=new R,this._mouse=new me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Uv.bind(this),this._onPointerDown=Nv.bind(this),this._onPointerUp=Fv.bind(this),this._onContextMenu=Gv.bind(this),this._onMouseWheel=kv.bind(this),this._onKeyDown=zv.bind(this),this._onTouchStart=Hv.bind(this),this._onTouchMove=Vv.bind(this),this._onMouseDown=Ov.bind(this),this._onMouseMove=Bv.bind(this),this._interceptControlDown=Wv.bind(this),this._interceptControlUp=Xv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(dh),this.update(),this.state=xt.NONE}update(e=null){const t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===xt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Qt:n>Math.PI&&(n-=Qt),i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Pt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):($r.origin.copy(this.object.position),$r.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot($r.direction))<Dv?this.object.lookAt(this.target):(fh.setFromNormalAndCoplanarPoint(this.object.up,this.target),$r.intersectPlane(fh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>io||8*(1-this._lastQuaternion.dot(this.object.quaternion))>io||this._lastTargetPosition.distanceToSquared(this.target)>io?(this.dispatchEvent(dh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Pt.copy(i).sub(this.target);let r=Pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Nv(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function Uv(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function Fv(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_u),this.state=xt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ov(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Kn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=xt.DOLLY;break;case Kn.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=xt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=xt.ROTATE}break;case Kn.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=xt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=xt.PAN}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(Bc)}function Bv(s){switch(this.state){case xt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case xt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function kv(s){this.enabled===!1||this.enableZoom===!1||this.state!==xt.NONE||(s.preventDefault(),this.dispatchEvent(Bc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(_u))}function zv(s){this.enabled!==!1&&this._handleKeyDown(s)}function Hv(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Yn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=xt.TOUCH_ROTATE;break;case Yn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=xt.TOUCH_PAN;break;default:this.state=xt.NONE}break;case 2:switch(this.touches.TWO){case Yn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=xt.TOUCH_DOLLY_PAN;break;case Yn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=xt.TOUCH_DOLLY_ROTATE;break;default:this.state=xt.NONE}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(Bc)}function Vv(s){switch(this._trackPointer(s),this.state){case xt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case xt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case xt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case xt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=xt.NONE}}function Gv(s){this.enabled!==!1&&s.preventDefault()}function Wv(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Xv(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class $v extends Hi{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new Ic(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e){function t(l){const h=new DataView(l),u=32/8*3+32/8*3*3+16/8,d=h.getUint32(80,!0);if(80+32/8+d*u===h.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,h,_))return!1;return!0}function n(l,h,u){for(let d=0,f=l.length;d<f;d++)if(l[d]!==h.getUint8(u+d))return!1;return!0}function i(l){const h=new DataView(l),u=h.getUint32(80,!0);let d,f,g,_=!1,m,p,x,M,v;for(let P=0;P<70;P++)h.getUint32(P,!1)==1129270351&&h.getUint8(P+4)==82&&h.getUint8(P+5)==61&&(_=!0,m=new Float32Array(u*3*3),p=h.getUint8(P+6)/255,x=h.getUint8(P+7)/255,M=h.getUint8(P+8)/255,v=h.getUint8(P+9)/255);const E=84,T=50,C=new ft,D=new Float32Array(u*3*3),S=new Float32Array(u*3*3),y=new He;for(let P=0;P<u;P++){const F=E+P*T,G=h.getFloat32(F,!0),q=h.getFloat32(F+4,!0),X=h.getFloat32(F+8,!0);if(_){const V=h.getUint16(F+48,!0);(V&32768)===0?(d=(V&31)/31,f=(V>>5&31)/31,g=(V>>10&31)/31):(d=p,f=x,g=M)}for(let V=1;V<=3;V++){const ee=F+V*12,H=P*3*3+(V-1)*3;D[H]=h.getFloat32(ee,!0),D[H+1]=h.getFloat32(ee+4,!0),D[H+2]=h.getFloat32(ee+8,!0),S[H]=G,S[H+1]=q,S[H+2]=X,_&&(y.setRGB(d,f,g,At),m[H]=y.r,m[H+1]=y.g,m[H+2]=y.b)}}return C.setAttribute("position",new Ct(D,3)),C.setAttribute("normal",new Ct(S,3)),_&&(C.setAttribute("color",new Ct(m,3)),C.hasColors=!0,C.alpha=v),C}function r(l){const h=new ft,u=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,f=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,m=new RegExp("vertex"+_+_+_,"g"),p=new RegExp("normal"+_+_+_,"g"),x=[],M=[],v=[],E=new R;let T,C=0,D=0,S=0;for(;(T=u.exec(l))!==null;){D=S;const y=T[0],P=(T=f.exec(y))!==null?T[1]:"";for(v.push(P);(T=d.exec(y))!==null;){let q=0,X=0;const V=T[0];for(;(T=p.exec(V))!==null;)E.x=parseFloat(T[1]),E.y=parseFloat(T[2]),E.z=parseFloat(T[3]),X++;for(;(T=m.exec(V))!==null;)x.push(parseFloat(T[1]),parseFloat(T[2]),parseFloat(T[3])),M.push(E.x,E.y,E.z),q++,S++;X!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),q!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const F=D,G=S-D;h.userData.groupNames=v,h.addGroup(F,G,C),C++}return h.setAttribute("position",new yt(x,3)),h.setAttribute("normal",new yt(M,3)),h}function a(l){return typeof l!="string"?new TextDecoder().decode(l):l}function o(l){if(typeof l=="string"){const h=new Uint8Array(l.length);for(let u=0;u<l.length;u++)h[u]=l.charCodeAt(u)&255;return h.buffer||h}else return l}const c=o(e);return t(c)?i(c):r(a(e))}}function ph(s,e){if(e===Xd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Qo||e===zh){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Qo)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class Yv extends Hi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Jv(t)}),this.register(function(t){return new Qv(t)}),this.register(function(t){return new cx(t)}),this.register(function(t){return new lx(t)}),this.register(function(t){return new hx(t)}),this.register(function(t){return new tx(t)}),this.register(function(t){return new nx(t)}),this.register(function(t){return new ix(t)}),this.register(function(t){return new sx(t)}),this.register(function(t){return new Zv(t)}),this.register(function(t){return new rx(t)}),this.register(function(t){return new ex(t)}),this.register(function(t){return new ox(t)}),this.register(function(t){return new ax(t)}),this.register(function(t){return new jv(t)}),this.register(function(t){return new ux(t)}),this.register(function(t){return new dx(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Zs.extractUrlBase(e);a=Zs.resolveURL(l,this.path)}else a=Zs.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Ic(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===vu){try{a[rt.KHR_BINARY_GLTF]=new fx(e)}catch(u){i&&i(u);return}r=JSON.parse(a[rt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Tx(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case rt.KHR_MATERIALS_UNLIT:a[u]=new Kv;break;case rt.KHR_DRACO_MESH_COMPRESSION:a[u]=new px(r,this.dracoLoader);break;case rt.KHR_TEXTURE_TRANSFORM:a[u]=new mx;break;case rt.KHR_MESH_QUANTIZATION:a[u]=new gx;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function qv(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const rt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class jv{constructor(e){this.parser=e,this.name=rt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new He(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],jt);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ic(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new uu(h),l.distance=u;break;case"spot":l=new Np(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ln(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class Kv{constructor(){this.name=rt.KHR_MATERIALS_UNLIT}getMaterialType(){return Tn}extendParams(e,t,n){const i=[];e.color=new He(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],jt),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,At))}return Promise.all(i)}}class Zv{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Jv{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new me(o,o)}return Promise.all(r)}}class Qv{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class ex{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class tx{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new He(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],jt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,At)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class nx{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class ix{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new He().setRGB(o[0],o[1],o[2],jt),Promise.all(r)}}class sx{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class rx{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new He().setRGB(o[0],o[1],o[2],jt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,At)),Promise.all(r)}}class ax{constructor(e){this.parser=e,this.name=rt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class ox{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class cx{constructor(e){this.parser=e,this.name=rt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class lx{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class hx{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class ux{constructor(e){this.name=rt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class dx{constructor(e){this.name=rt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==pn.TRIANGLES&&l.mode!==pn.TRIANGLE_STRIP&&l.mode!==pn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const g of u){const _=new Ke,m=new R,p=new _n,x=new R(1,1,1),M=new Ms(g.geometry,g.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&x.fromBufferAttribute(c.SCALE,v),M.setMatrixAt(v,_.compose(m,p,x));for(const v in c)if(v==="_COLOR_0"){const E=c[v];M.instanceColor=new tc(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,c[v]);ht.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),f.push(M)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const vu="glTF",Vs=12,mh={JSON:1313821514,BIN:5130562};class fx{constructor(e){this.name=rt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Vs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==vu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Vs,r=new DataView(e,Vs);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===mh.JSON){const l=new Uint8Array(e,Vs+a,o);this.content=n.decode(l)}else if(c===mh.BIN){const l=Vs+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class px{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=rt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const u=ac[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=ac[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=fs[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(f)},o,l,jt,d)})})}}class mx{constructor(){this.name=rt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class gx{constructor(){this.name=rt.KHR_MESH_QUANTIZATION}}class xu extends ur{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,x=1-m,M=p-d+u;for(let v=0;v!==o;v++){const E=a[_+v+o],T=a[_+v+c]*h,C=a[g+v+o],D=a[g+v]*h;r[v]=x*E+M*T+m*C+p*D}return r}}const _x=new _n;class vx extends xu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return _x.fromArray(r).normalize().toArray(r),r}}const pn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},fs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},gh={9728:qt,9729:cn,9984:Dh,9985:Kr,9986:$s,9987:qn},_h={33071:mi,33648:sa,10497:vs},so={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ac={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xx={CUBICSPLINE:void 0,LINEAR:rr,STEP:sr},ro={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function yx(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Qe({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ei})),s.DefaultMaterial}function Ri(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ln(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Mx(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function bx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Sx(s){let e;const t=s.extensions&&s.extensions[rt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ao(t.attributes):e=s.indices+":"+ao(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+ao(s.targets[n]);return e}function ao(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function oc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ex(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const wx=new Ke;class Tx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new qv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new Lp(this.options.manager):this.textureLoader=new Op(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ic(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Ri(r,o,i),Ln(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[rt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(Zs.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=so[i.type],o=fs[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Ct(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=so[i.type],l=fs[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let M=t.cache.get(x);M||(_=new l(o,p*f,i.count*f/h),M=new Xf(_,f/h),t.cache.add(x,M)),m=new Ac(M,c,d%f/h,g)}else o===null?_=new l(i.count*c):_=new l(o,d,i.count*c),m=new Ct(_,c,g);if(i.sparse!==void 0){const p=so.SCALAR,x=fs[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new x(a[1],M,i.sparse.count*p),T=new l(a[2],v,i.sparse.count*c);o!==null&&(m=new Ct(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,D=E.length;C<D;C++){const S=E[C];if(m.setX(S,T[C*c]),c>=2&&m.setY(S,T[C*c+1]),c>=3&&m.setZ(S,T[C*c+2]),c>=4&&m.setW(S,T[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=gh[d.magFilter]||cn,h.minFilter=gh[d.minFilter]||qn,h.wrapS=_h[d.wrapS]||vs,h.wrapT=_h[d.wrapT]||vs,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==qt&&h.minFilter!==cn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new It(_);m.needsUpdate=!0,d(m)}),t.load(Zs.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),Ln(u,a),u.userData.mimeType=a.mimeType||Ex(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[rt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[rt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[rt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new eu,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Bi,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Qe}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[rt.KHR_MATERIALS_UNLIT]){const u=i[rt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new He(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],jt),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,At)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Dt);const h=r.alphaMode||ro.OPAQUE;if(h===ro.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ro.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Tn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new me(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Tn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Tn){const u=r.emissiveFactor;o.emissive=new He().setRGB(u[0],u[1],u[2],jt)}return r.emissiveTexture!==void 0&&a!==Tn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,At)),Promise.all(l).then(function(){const u=new a(o);return r.name&&(u.name=r.name),Ln(u,r),t.associations.set(u,{materials:e}),r.extensions&&Ri(i,u,r),u})}createUniqueName(e){const t=gt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return vh(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=Sx(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[rt.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=vh(new ft,l,t),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?yx(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const x=l[f];if(m.mode===pn.TRIANGLES||m.mode===pn.TRIANGLE_STRIP||m.mode===pn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Yf(_,x):new Ye(_,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===pn.TRIANGLE_STRIP?p.geometry=ph(p.geometry,zh):m.mode===pn.TRIANGLE_FAN&&(p.geometry=ph(p.geometry,Qo));else if(m.mode===pn.LINES)p=new Pc(_,x);else if(m.mode===pn.LINE_STRIP)p=new ki(_,x);else if(m.mode===pn.LINE_LOOP)p=new Qf(_,x);else if(m.mode===pn.POINTS)p=new ep(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&bx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ln(p,r),m.extensions&&Ri(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Ri(i,u[0],r),u[0];const d=new dt;r.extensions&&Ri(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Xt(wc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new pa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ln(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const u=a[l];if(u){o.push(u);const d=new Ke;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Rc(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let M=0,v=d.length;M<v;M++){const E=d[M],T=f[M],C=g[M],D=_[M],S=m[M];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const y=n._createAnimationTracks(E,T,C,D,S);if(y)for(let P=0;P<y.length;P++)p.push(y[P])}const x=new wp(r,void 0,p);return Ln(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,wx)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Jh:l.length>1?h=new dt:l.length===1?h=l[0]:h=new ht,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Ln(h,r),r.extensions&&Ri(n,h,r),r.matrix!==void 0){const u=new Ke;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new dt;n.name&&(r.name=i.createUniqueName(n.name)),Ln(r,n),n.extensions&&Ri(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Rn||d instanceof It)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];hi[r.path]===hi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(hi[r.path]){case hi.weights:l=bs;break;case hi.rotation:l=Ss;break;case hi.translation:case hi.scale:l=Es;break;default:switch(n.itemSize){case 1:l=bs;break;case 2:case 3:default:l=Es;break}break}const h=i.interpolation!==void 0?xx[i.interpolation]:rr,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+hi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=oc(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Ss?vx:xu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ax(s,e,t){const n=e.attributes,i=new ln;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new R(c[0],c[1],c[2]),new R(l[0],l[1],l[2])),o.normalized){const h=oc(fs[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new R,c=new R;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=oc(fs[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Fn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function vh(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=ac[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return ct.workingColorSpace!==jt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ct.workingColorSpace}" not supported.`),Ln(s,e),Ax(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Mx(s,e.targets,t):s})}class Rx extends Zh{constructor(){super();const e=new Zt;e.deleteAttribute("uv");const t=new Qe({side:Yt}),n=new Qe,i=new uu(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new Ye(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Ms(e,n,6),o=new ht;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new Ye(e,rs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new Ye(e,rs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new Ye(e,rs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new Ye(e,rs(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new Ye(e,rs(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new Ye(e,rs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function rs(s){return new gp({color:0,emissive:16777215,emissiveIntensity:s})}const Js=new Qe({color:15660790,transparent:!0,opacity:.28,depthWrite:!1,side:Dt,roughness:.25,metalness:0}),yu=new Qe({color:13033697,transparent:!0,opacity:.19,depthWrite:!1,side:Dt,roughness:.23,metalness:0}),oo=new Qe({color:2450377,roughness:.42,metalness:.12}),Pi=new Qe({color:13883612,roughness:.28,metalness:.9}),Yr=new Qe({color:2238252,roughness:.5,metalness:.35}),Cx=new Qe({color:14080210,roughness:.69,metalness:0}),Px=new Qe({color:14259089,roughness:.72});function as(s,e,t,n=64){const i=new As(e.map(([a,o])=>new me(a,o)),n);i.rotateX(Math.PI/2);const r=new Ye(i,t);return r.name=s,r.receiveShadow=!0,r}function Xn(s,e,t,n,i,r=48){const a=new en(e,e,t,r);a.rotateX(Math.PI/2);const o=new Ye(a,i);return o.name=s,o.position.z=n+t/2,o.castShadow=i!==Js&&i!==yu,o.receiveShadow=!0,o}function co(s,e,t,n,i,r,a,o){const c=new Ye(new Zt(e,t,n),o);return c.name=s,c.position.set(i,r,a+n/2),c.castShadow=c.receiveShadow=!0,c}function xh(s,e,t){const n=new As([new me(23.3,0),new me(26.6,0),new me(26.6,7),new me(23.3,7),new me(23.3,0)],32,e,t-e);n.rotateX(Math.PI/2);const i=new Ye(n,Pi);return i.name=s,i.position.z=48,i.castShadow=i.receiveShadow=!0,i}function Lx(s,e){const t=[[8.1,8.6],[10,11],[16.8,15.4],[20.9,19.4]],n=.62,i=[],r=[];for(const[c,l]of t)for(const h of[-n,n])i.push(c*Math.cos(e)-h*Math.sin(e),c*Math.sin(e)+h*Math.cos(e),l);for(let c=0;c<t.length-1;c++){const l=2*c;r.push(l,l+1,l+3,l,l+3,l+2)}const a=new ft;a.setAttribute("position",new yt(i,3)),a.setIndex(r),a.computeVertexNormals();const o=new Ye(a,Js);return o.name=s,o}function Dx({fillMaterial:s=Px}={}){const e=new dt;e.name="R75 cartridge, retainer and clamp (illustrative)",e.userData={bareOutsideDiameterMm:43.2,bareLengthMm:98.8,datum:"bare outlet face z=0",dimensionalBasis:"Nordson Optimum typical envelope; internal and accessories estimated"};const t=new dt;t.name="cartridge_bare",e.add(t);const n=[[6.2,0],[7.6,0],[7.6,8.3],[10,10.4],[16.8,15.3],[21.6,19.5],[21.6,98.8],[20,98.8],[20,20.5],[15.5,16.3],[9,11.5],[6.2,8.3],[6.2,0]];t.add(as("bare cartridge body and outlet",n,Js)),t.add(as("bare outlet hex, no thread detail",[[6.2,1.1],[9.4,1.1],[9.4,8.3],[6.2,8.3],[6.2,1.1]],Js,6));for(let d=0;d<6;d++)t.add(Lx(`bare shoulder rib ${d+1}`,d*Math.PI/3));t.add(as("bare upper rim",[[20,97.5],[21.6,97.5],[21.6,98.8],[20,98.8],[20,97.5]],Js));const i=20.7,r=75,a=Xn("illustrative material fill",18.8,1,i,s);e.add(a);const o=Xn("illustrative piston",19.2,1.6,i,Cx);e.add(o);const c=Xn("illustrative piston seal",19.4,.6,i,Yr);e.add(c);function l(d){const f=Number.isFinite(d)?Math.min(1,Math.max(0,d)):0,g=r*f;a.visible=g>1e-9,a.scale.z=Math.max(g,1e-6),a.position.z=i+g/2,o.position.z=i+g+.8,c.position.z=i+g+.3}l(1),e.add(as("separate transparent pressure retainer",[[21.9,14],[23.2,14],[23.2,101],[21.9,101],[21.9,14]],yu)),e.add(as("retainer lower collar",[[9.4,8.8],[23.2,8.8],[23.2,14],[21.9,14],[18,14],[9.4,10],[9.4,8.8]],oo)),e.add(as("retainer top retaining lip",[[21.9,99],[24,99],[24,102.2],[21.9,102.2],[21.9,99]],oo)),e.add(Xn("separate pressure cap",24,8.5,102.2,oo)),e.add(Xn("air connector base",8,3,110.7,Pi,6)),e.add(Xn("air push-fit body",5.3,7,113.7,Yr)),e.add(Xn("air push-fit collar",5.8,2,120.7,Pi));const h=new ht;h.name="air inlet tubing end",h.position.set(0,0,122.7),h.userData.direction=[0,0,1],e.add(h);const u=new dt;u.name="estimated split clamp and mounting plate",e.add(u),u.add(xh("left clamp half",.08,Math.PI-.08),xh("right clamp half",Math.PI+.08,2*Math.PI-.08));for(const d of[-27,27]){u.add(co("clamp lug",9,10,9,d,0,47,Pi));const f=Xn("clamp screw head",2.6,2,56,Yr,12);f.position.x=d,u.add(f);const g=Xn("clamp screw socket",1,.25,58,Pi,6);g.position.x=d,u.add(g)}u.add(co("mounting plate",58,8,42,0,30,30,Yr)),u.add(co("rear machine attachment face",46,4,34,0,36,34,Pi));for(const d of[-20,20])for(const f of[38,62]){const g=new Ye(new en(2.4,2.4,1.4,12),Pi);g.name="rear mounting screw",g.position.set(d,24.9,f),u.add(g)}return{group:e,bare:t,piston:o,fill:a,airPort:h,updateFill:l}}const Gs=new R;function fn(s,e,t,n,i,r){const a=2*Math.PI*i/4,o=Math.max(r-2*i,0),c=Math.PI/4;Gs.copy(e),Gs[n]=0,Gs.normalize();const l=.5*a/(a+o),h=1-Gs.angleTo(s)/c;return Math.sign(Gs[t])===1?h*l:o/(a+o)+l+l*(1-h)}class dr extends Zt{constructor(e=1,t=1,n=1,i=2,r=.1){const a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new R,l=new R,h=new R(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new R,m=.5/a;for(let p=0,x=0;p<u.length;p+=3,x+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*r,u[p+1]=h.y*Math.sign(c.y)+l.y*r,u[p+2]=h.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[x+0]=fn(_,l,"z","y",r,n),f[x+1]=1-fn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),f[x+0]=1-fn(_,l,"z","y",r,n),f[x+1]=1-fn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),f[x+0]=1-fn(_,l,"x","z",r,e),f[x+1]=fn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),f[x+0]=1-fn(_,l,"x","z",r,e),f[x+1]=1-fn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),f[x+0]=1-fn(_,l,"x","y",r,e),f[x+1]=1-fn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),f[x+0]=fn(_,l,"x","y",r,e),f[x+1]=1-fn(_,l,"y","x",r,t);break}}static fromJSON(e){return new dr(e.width,e.height,e.depth,e.segments,e.radius)}}function Ix(){const s=new dt;s.name="P300_supply_station_reference",s.userData={reference:"Graco DM-22 25T471",evidence:"exterior envelope from manual; individual parts engineering approximation",lowerHeightMm:550,raisedHeightMm:800,widthMm:360,depthMm:300,units:"mm",fluidConnection:"1/4 NPT female, nominal",airConnection:"8 mm female, nominal"};const e={blue:new Qe({color:2056127,roughness:.42,metalness:.35}),blueDark:new Qe({color:1458048,roughness:.5,metalness:.3}),steel:new Qe({color:12831691,roughness:.37,metalness:.74}),satin:new Qe({color:9083033,roughness:.46,metalness:.68}),dark:new Qe({color:2502968,roughness:.7,metalness:.2}),black:new Qe({color:1120541,roughness:.62,metalness:.1}),dial:new Qe({color:14870239,roughness:.8,metalness:0}),red:new Qe({color:12076348,roughness:.55,metalness:.15}),brass:new Qe({color:11901526,roughness:.38,metalness:.72}),glass:new Qe({color:12638170,transparent:!0,opacity:.24,depthWrite:!1,roughness:.25,metalness:.02,side:Dt})};s.userData.ownedMaterials=Object.values(e);const t=(x,M,v,E,T,C,D,S="steel",y=1.2)=>{const P=Math.min(y,M/8,v/8,E/8),F=new Ye(P>0?new dr(M,v,E,2,P):new Zt(M,v,E),e[S]);return F.name=x,F.position.set(T,C,D+E/2),F.castShadow=S!=="glass",F.receiveShadow=!0,s.add(F),F},n=(x,M,v,E,T,C,D="steel",S="z",y=32)=>{const P=new Ye(new en(M,M,v,y),e[D]);return P.name=x,P.castShadow=D!=="glass",P.receiveShadow=!0,S==="z"?(P.rotation.x=Math.PI/2,P.position.set(E,T,C+v/2)):S==="x"?(P.rotation.z=-Math.PI/2,P.position.set(E+v/2,T,C)):P.position.set(E,T-v/2,C),s.add(P),P},i=(x,M,v,E=2.6)=>{n("bolt washer",E+1.2,.5,x,M,v,"steel"),n("hex fastener",E,2.1,x,M,v+.5,"dark","z",6)},r=(x,M,v)=>{const E=new ht;E.name=x,E.position.set(...M);const T=new R(...v).normalize();return E.quaternion.setFromUnitVectors(new R(0,0,1),T),E.userData={axis:T.toArray(),reference:"visual connection datum; unverified physical fitting"},s.add(E),E};t("base footprint",360,300,18,0,0,0,"blueDark",1),t("lower enclosure",360,230,92,0,15,18,"blue",2),t("recessed front control panel",284,10,88,0,-105,20,"blueDark",1);for(const x of[-155,155])for(const M of[-125,125])i(x,M,18);for(const x of[-156,156])t("side edge protection",12,12,74,x,-107,21,"dark",1);for(const x of[-140,140])for(const M of[30,94])n("panel screw",2,1.2,x,-110,M,"steel","y",6);function a(x,M){n("pressure gauge body",16,6,x,-110,M,"black","y"),n("pressure gauge rim",14.6,1.4,x,-116,M,"steel","y"),n("pressure gauge face",12.6,.5,x,-117.4,M,"dial","y");for(let E=0;E<9;E++){const T=(-.75+E*1.5/8)*Math.PI,C=x+10*Math.sin(T),D=M+10*Math.cos(T),S=t("gauge tick",.6,.2,1.8,C,-118.1,D-.9,"dark",0);S.rotation.y=T}const v=t("gauge needle",.75,.3,8,x,-118.3,M-1,"red",0);v.rotation.y=.7,n("gauge spindle",1.4,.6,x,-118.5,M,"dark","y")}function o(x,M){n("regulator collar",11,4,x,-110,M,"steel","y"),n("regulator knob",10,15,x,-114,M,"black","y",32);for(let v=0;v<12;v++){const E=v*Math.PI/6,T=x+9.7*Math.sin(E),C=M+9.7*Math.cos(E),D=t("knob grip rib",1,11,1.5,T,-122,C-.75,"satin",0);D.rotation.y=E}}a(-92,80),a(66,80),o(-92,46),o(66,46);for(const x of[-30,18])n("selector mounting ring",7,3,x,-110,48,"steel","y"),n("selector switch",4.4,10,x,-113,48,"black","y"),t("selector grip",2.5,4,12,x,-124,42,"satin",.3);for(const x of[-126,126]){n("ram foot flange",24,9,x,24,110,"steel");for(const M of[-13,13])for(const v of[-13,13])i(x+M,24+v,119,2);n("vertical ram post",13.5,255,x,24,119,"satin"),n("upper ram collar",20,13,x,24,374,"steel"),n("upper ram collar cap",15,4,x,24,387,"dark")}t("crossbeam below upper plate",298,40,15,0,24,382,"steel",1.5),t("upper equipment mounting plate",300,150,12,0,14,397,"steel",1.5);for(const x of[-130,130])for(const M of[-40,68])i(x,M,409,2.2);const c=-62,l=12;t("cartridge housing lower mounting block",78,80,13,c,l,110,"satin",2),n("cartridge housing lower seat",35,10,c,l,123,"dark"),n("candidate aluminium cartridge",24,170,c,l,133,"steel"),n("candidate cartridge bottom shoulder",21,4,c,l,133,"satin"),n("candidate cartridge top edge",24.4,3,c,l,300,"satin");for(const x of[-33,33]){t("cartridge housing upright",8,52,206,c+x,l,123,"satin",1);for(const M of[135,210,310])i(c+x,l-18,M,2)}t("cartridge housing head",76,67,10,c,l,329,"satin",2),n("cartridge ram rod",8,43,c,l,339,"steel"),n("ram rod upper bushing",14,7,c,l,375,"dark"),t("transparent inspection panel",59,2,190,c,l-30,132,"glass",.2);for(const x of[c-23,c+23])for(const M of[142,308])n("inspection panel fastener",2,1.4,x,l-32,M,"dark","y");const h=62,u=32;n("pump lower mounting foot",38,10,h,u,110,"steel"),t("estimated feed manifold between cartridge and pump",68,32,18,0,l,120,"satin",1),n("pump lower body",29,210,h,u,120,"steel"),n("pump lower sleeve",33,55,h,u,150,"satin"),n("pump lower collar",34,7,h,u,205,"dark"),n("pump lower upper collar",33,7,h,u,323,"satin"),n("pump shaft neck",16,67,h,u,330,"steel"),n("pump motor lower flange",43,11,h,u,409,"steel"),n("pump pneumatic motor body",42,113,h,u,420,"satin"),n("pump motor upper lip",43,8,h,u,533,"steel"),n("pump motor cap",34,9,h,u,541,"dark");for(const x of[0,Math.PI/2,Math.PI,3*Math.PI/2])i(h+31*Math.cos(x),u+31*Math.sin(x),541,2.2);for(const x of[h-22,h+22])for(const M of[u-20,u+20])i(x,M,120,2.3);const d=247,f=h+29;n("fluid fitting boss",11,6,f,u,d,"satin","x",6),n("fluid fitting nut",10,10,f+6,u,d,"steel","x",6),n("fluid fitting coupling",7,12,f+16,u,d,"steel","x"),n("fluid fitting mouth",5.4,1,f+28,u,d,"dark","x");const g=r("fluid outlet datum",[f+29,u,d],[1,0,0]),_=114,m=55;n("air inlet panel boss",7,4,_,-110,m,"steel","y",6),n("air inlet coupling",5.8,12,_,-114,m,"brass","y"),n("air inlet face",4.2,1,_,-126,m,"dark","y");const p=r("main air inlet datum",[_,-127,m],[0,-1,0]);return s.updateMatrixWorld(!0),{group:s,fluidPort:g,airPort:p}}function Nx(){const s=new dt;s.name="C300 reference envelope — open inspection",s.userData={kind:"visual_envelope",source:"Graco 349735EN-B p.33",widthMm:939,depthMm:1041,heightMm:1905,bottomMm:-900,topMm:1005,caveat:"external envelope published; panel geometry, mounting and opening assumed; not OEM CAD"};const e={body:new Qe({color:15330280,roughness:.55,metalness:.1}),frame:new Qe({color:12239296,roughness:.54,metalness:.34}),door:new Qe({color:14869983,roughness:.72,metalness:.14}),gasket:new Qe({color:4213067,roughness:.8,metalness:.08}),steel:new Qe({color:8359310,roughness:.4,metalness:.7}),screen:new Qe({color:993850,roughness:.25,metalness:.1,emissive:735826,emissiveIntensity:.8}),screenLine:new Qe({color:8106941,roughness:.6,metalness:0}),blue:new Qe({color:2056145,roughness:.45,metalness:.15}),red:new Qe({color:12662052,roughness:.42,metalness:.08}),yellow:new Qe({color:14665028,roughness:.55,metalness:0})};s.userData.ownedMaterials=Object.values(e);function t(i,r,a,o,c,l,h,u){const d=new Ye(new Zt(r,a,o),e[u]);return d.name=i,d.position.set(c,l,h+o/2),d.castShadow=!0,d.receiveShadow=!0,s.add(d),d}function n(i,r,a,o,c,l,h,u=20){const d=new Ye(new en(r,r,a,u),e[h]);return d.name=i,d.position.set(o,c,l),d.castShadow=!0,d.receiveShadow=!0,s.add(d),d}t("cabinet structure",939,1037,850,0,0,-900,"body"),t("front skin",939,2,850,0,-519.5,-900,"body"),t("rear skin",939,2,850,0,519.5,-900,"body"),t("front access door gasket",710,.5,620,0,-520.15,-830,"gasket"),t("front access door",704,.35,614,0,-520,-827,"door"),t("door label plate",180,.2,74,0,-520.29,-560,"frame"),t("door visual label inset",148,.15,42,0,-520.4,-544,"blue");for(const i of[-280,280])t("cabinet door pull",8,.8,95,i,-520,-315,"steel"),t("door pull lower bracket",24,.8,8,i,-520,-320,"gasket"),t("door pull upper bracket",24,.8,8,i,-520,-220,"gasket");for(const i of[-443,-360,-180,0,180,360,443])for(const r of[-874,-83])n("cabinet fastener",3,.55,i,-520.15,r,"steel",12);for(const i of[-340,340])for(const r of[-814,-230])n("access door fastener",2.6,.45,i,-520.2,r,"steel",12);for(const i of[-448.5,448.5])for(const r of[-499.5,499.5])t("window support post",42,42,1e3,i,r,-50,"frame"),t("post face inset",16,1,950,i,r<0?-520:520,-25,"gasket");t("roof structure",939,1041,55,0,0,950,"body");for(const i of[-510,510])t("window upper rail",855,20,24,0,i,926,"frame"),t("window sill",855,20,22,0,i,-50,"frame");for(const i of[-459,459])t("window side upper rail",20,957,24,i,0,926,"frame"),t("window side sill",20,957,22,i,0,-50,"frame");t("rear window mid rail",855,12,12,0,510,420,"frame");for(const i of[-459,459])t("side window mid rail",12,957,12,i,0,420,"frame");for(const i of[115,420,735])t("front door hinge",18,4,40,436,-518,i,"steel"),n("hinge pin",3,1,436,-519.6,i+20,"gasket",12);t("door latch backing",18,5,180,430,-517.8,280,"gasket"),t("door latch grip",9,4,144,430,-518.5,298,"steel"),t("console support bracket",78,20,24,-403,-500,620,"steel"),t("console housing",190,20,155,-330,-508,490,"gasket"),t("console bezel",176,1,141,-330,-518.4,497,"frame"),t("console screen",160,.7,106,-330,-519.3,524,"screen");for(let i=0;i<4;i++)t("screen interface row",118-i*13,.2,3,-334,-519.77,598-i*17,"screenLine");for(let i=0;i<4;i++)t("screen soft key",15,.2,7,-385+i*35,-519.77,532,"blue");for(const i of[-410,-250])for(const r of[503,632])n("console fastener",2,.5,i,-519.4,r,"steel",12);return t("operator button panel",108,10,68,-343,-511,404,"frame"),n("emergency stop yellow surround",18,3,-372,-517.5,438,"yellow"),n("emergency stop head",11,1.5,-372,-519.3,438,"red"),n("start indicator",6,2,-332,-519,438,"blue"),n("auxiliary indicator",6,2,-308,-519,438,"gasket"),s}function Ux(){const s=new dt;s.name="PCP 0.30cc reference - 303mm body";const e=new Qe({color:13817819,metalness:.9,roughness:.28}),t=new Qe({color:3358016,metalness:.35,roughness:.55}),n=new Qe({color:2503220,metalness:.15,roughness:.65}),i=new Qe({color:2846678,metalness:.3,roughness:.4});s.userData.ownedMaterials=[e,t,n,i];function r(h,u,d,f,g=e,_=48){const m=new en(u,u,d,_);m.rotateX(Math.PI/2);const p=new Ye(m,g);return p.name=h,p.position.z=f+d/2,p.castShadow=p.receiveShadow=!0,s.add(p),p}function a(h,u,d,f,g,_,m,p=e){const x=new Ye(new Zt(u,d,f),p);return x.name=h,x.position.set(g,_,m+f/2),x.castShadow=x.receiveShadow=!0,s.add(x),x}r("end adapter",12,13,0,e,6),r("stator end ring",15,5,13,t),r("stator body",14,105,18,n),r("stator coupling",18,10,123,e,6),r("pump barrel",20,78,133,e),r("seal housing",25,25,211,t),r("bearing housing",27,24,236,e),r("sanitary clamp",29,8,260,e),r("drive adapter",22,26,268,t),r("gearbox flange",39,9,294,e);for(let h=0;h<4;h++){const u=h*Math.PI/2,d=r("flange M4 visual",2.3,1.2,303,t,12);d.position.x=35*Math.cos(u),d.position.y=35*Math.sin(u)}r("motor shoulder",31,10,303,t),r("motor housing estimated",34,72,313,i);for(let h=0;h<8;h++){const u=h*Math.PI/4;a("motor cooling rib",3,3,52,32*Math.cos(u),32*Math.sin(u),321,t)}r("motor rear cap",34,6,385,t);const o=195,c=new Ye(new en(8,8,24,6),e);c.name="schematic side inlet #8/#6 JIC",c.rotation.z=-Math.PI/2,c.position.set(31,0,o),s.add(c);const l=new ht;l.name="PCP material inlet (schematic outlet face)",l.position.set(43,0,o),s.add(l),a("mounting rail plate estimated",58,8,125,0,38,125,t);for(const h of[145,225]){a("clamp bridge estimated",58,12,9,0,27,h,e);for(const u of[-24,24])r("clamp bolt",2.2,1.5,h+9,t,12).position.set(u,27,h+9.75)}return{group:s,inletPort:l,bodyLengthMm:303,flangeBoltCircleMm:70}}function Fx(s,e,t="feed"){const n=s.clone(),i=e.clone();if(t==="air")return[n,n.clone().add(new R(0,0,28)),i.clone().add(new R(0,0,30)),i];if(t==="stationAir")return[n,n.clone().add(new R(0,-30,0)),i.clone().add(new R(-40,0,0)),i];if(t==="supply"){const r=n.clone().lerp(i,.5);return r.z=Math.max(n.z,i.z)+70,[n,n.clone().add(new R(0,0,40)),r,i.clone().add(new R(-50,0,0)),i]}return[n,n.clone().add(new R(35,0,0)),new R(-520,330,n.z+65),new R(-520,360,Math.max(i.z+120,180)),new R(i.x+120,180,i.z+100),i.clone().add(new R(50,0,0)),i]}function lo(s,e,t="feed",n=3){const i=Fx(s,e,t),r=new au(i,!1,"centripetal");return new Dc(r,96,n,12,!1)}const la=Object.freeze({part:"Nordson 7018555 candidate",nominalLengthMm:63.5,nominalIdMm:3.175,assumedInsertionMm:7,thread:"1/4 NPT nominal",evidence:"published dimensions + assumed insertion; unconfirmed Laird test setup",source:"https://www.nordson.com/en/products/efd-products/plastic-nozzles"}),Ox=Object.freeze({R75:{cartridge:{capacityMl:75,outerDiameterMm:43.2,axialLengthMm:98.8,evidence:"published typical external envelope; bare cartridge only",source:"https://www.nordsonefd.com/nordson_efd_product_catalog/25/"},nozzle:la,other:"retainer, piston, holder and air hose routing are visual engineering assumptions"},P300:{enclosure:{model:"C300 reference envelope",widthMm:939,depthMm:1041,heightMm:1905,workspaceMm:[254,277,70],source:"https://www.graco.com/content/dam/graco/com_documents/349/349735/349735EN-B.pdf",evidence:"published outer envelope; interior and panels are visual assumptions"},supply:{model:"DM-22 25T471 reference",widthMm:360,depthMm:300,loweredHeightMm:550,raisedHeightMm:800,fluidPort:"1/4 NPT female",airPort:"8 mm female",source:"https://www.graco.com/content/dam/graco/tech_documents/manuals/3A7/3A7931/3A7931EN-D.pdf",evidence:"published metric dimensions; components and tubing routes are visual assumptions"},pcp:{model:"25B192 candidate; not confirmed Laird upgraded PCP",bodyLengthMm:303,boltCircleMm:70,inlet:"#8/#6 JIC",outlet:"5/16-28",source:"https://www.graco.com/content/dam/graco/tech_documents/manuals/3A5/3A5364/3A5364EN.pdf",evidence:"published body length and fittings; motor and details approximated"}}});function Bx(){const s=(e,t,n,i={})=>new Qe({color:e,roughness:t,metalness:n,...i});return{graphite:s(2830649,.5,.35),cover:s(15526629,.42,.05),coverGrey:s(13225168,.45,.1),cobalt:s(2056145,.34,.3),cobaltDark:s(1523340,.42,.3),steel:s(14015199,.24,.92),steelDark:s(9278877,.32,.88),aluminum:s(12896976,.3,.82),castAl:s(11778753,.46,.7),black:s(1513756,.48,.35),rubber:s(1052947,.92,0),orange:s(15760411,.5,.05),red:s(14166074,.36,.05),yellow:s(16040991,.42,.05),green:s(2274402,.38,.05),teal:s(1474698,.4,.45),hole:s(3159613,.7,.3),bench:s(14275527,.82,0),mat:s(2776936,.88,0),brass:s(13214285,.3,.9),lens:s(856342,.2,.1),glass:new Kt({color:14676735,roughness:.08,metalness:0,transparent:!0,opacity:.16,depthWrite:!1,side:Dt,clearcoat:1}),polymer:new Kt({color:10465402,roughness:.35,metalness:0,transparent:!0,opacity:.82,clearcoat:.6})}}class kx{constructor(e,t={parts:0}){this.palette=e,this.counter=t,this.edgeMaterial=new Bi({color:724756,transparent:!0,opacity:.13})}material(e){return typeof e=="string"?this.palette[e]:e}mesh(e,t,n,{edges:i=!0,shadow:r=!0}={}){const a=new Ye(e,this.material(t));return a.castShadow=r,a.receiveShadow=!0,i&&a.add(new Pc(new su(e,32),this.edgeMaterial)),n.add(a),this.counter.parts++,a}box(e,t,n,i,r,a,o,c,l){const h=l??Math.min(1.2,e/12,t/12,n/6),u=h>.15&&Math.min(e,t,n)>=2.5?new dr(e,t,n,2,h):new Zt(e,t,n),d=this.mesh(u,o,c);return d.position.set(i,r,a+n/2),d}cyl(e,t,n,i,r,a,o,c=32){const l=new en(e,e,t,c);l.rotateX(Math.PI/2);const h=this.mesh(l,a,o,{edges:c<=8});return h.position.set(n,i,r+t/2),h}rod(e,t,n,i,r,a,o,c,l=24){const h=new en(e,e,t,l);n==="x"?h.rotateZ(Math.PI/2):n==="z"&&h.rotateX(Math.PI/2);const u=this.mesh(h,o,c,{edges:!1});return u.position.set(i,r,a),u}screw(e,t,n,i,r=1.6,a="z"){const o=new en(r,r,r*.9,14),c=new en(r*.45,r*.45,r*.95,6);a==="z"?(o.rotateX(Math.PI/2),c.rotateX(Math.PI/2)):a==="y"||(o.rotateZ(Math.PI/2),c.rotateZ(Math.PI/2));const l=this.mesh(o,"black",i,{edges:!1,shadow:!1});return l.position.set(e,t,n),this.mesh(c,"hole",i,{edges:!1,shadow:!1}).position.set(e,t,n),l}}function zx({material:s,sideMaterial:e,pitch:t=9,width:n=26,height:i=12,radius:r=16,free:a=200}){const o=Math.ceil((a+Math.PI*r)/t)+2,c=new dr(t*.92,n,i,1,1.2),l=new Zt(t*.6,n+2,i*.45),h=new Ms(c,s,o),u=new Ms(l,e,o);h.castShadow=u.castShadow=!0,h.receiveShadow=!0;const d=new dt;d.add(h,u);const f=new Ke,g=new _n,_=new vn,m=new R(1,1,1),p=new R;function x(M){const v=(a+M)/2,E=Math.max(0,v),T=Math.max(0,v-M);for(let C=0;C<o;C++){let D=(C+.5)*t,S=0;if(D<=E)p.set(D,0,0);else if((D-=E)<=Math.PI*r){const y=D/r;p.set(v+r*Math.sin(y),0,r-r*Math.cos(y)),S=-y}else D-=Math.PI*r,p.set(v-Math.min(D,T),0,2*r),S=-Math.PI;g.setFromEuler(_.set(0,S,0)),f.compose(p,g,m),h.setMatrixAt(C,f),u.setMatrixAt(C,f)}h.instanceMatrix.needsUpdate=u.instanceMatrix.needsUpdate=!0,h.computeBoundingSphere(),u.computeBoundingSphere()}return x(0),{group:d,update:x,dispose:()=>[c,l].forEach(M=>M.dispose())}}function Hx(s=256,e=112){if(typeof document>"u")return null;const t=document.createElement("canvas");t.width=s,t.height=e;const n=new tu(t);n.colorSpace=At;const i=t.getContext("2d");let r="";function a(o,c){const l=o.join("|")+c;l!==r&&(r=l,i.fillStyle="#0b2b1f",i.fillRect(0,0,s,e),i.fillStyle=c?"#7dffb2":"#47d38a",i.font="bold 40px ui-monospace, Menlo, Consolas, monospace",i.fillText(o[0],14,50),i.font="22px ui-monospace, Menlo, Consolas, monospace",i.fillText(o[1],14,88),c&&(i.fillStyle="#ffcf5a",i.fillRect(s-30,14,14,14)),n.needsUpdate=!0)}return{texture:n,draw:a}}const Ws=[[0,[.16,.2,.55]],[.25,[.12,.45,.78]],[.5,[.1,.68,.66]],[.75,[.55,.82,.32]],[1,[.99,.82,.2]]];function Vx(s){const e=Math.max(0,Math.min(1,s));for(let t=1;t<Ws.length;t++)if(e<=Ws[t][0]){const[n,i]=Ws[t-1],[r,a]=Ws[t],o=(e-n)/(r-n);return i.map((c,l)=>c+(a[l]-c)*o)}return Ws.at(-1)[1]}function Gx(s,e,t,{plateMargin:n=6}={}){var Se;const i=new dt;i.name="estimated compression inspection";const r=[],a=ae=>(r.push(ae),ae),o=t.grid,c=s.surfaceZ,l=e.width,h=e.shape==="circle"?e.width:e.depth,u=Uint8Array.from(o.coverage,ae=>Math.round(Math.max(0,Math.min(1,Number(ae)||0))*255)),d=(Se=o.frames)!=null&&Se.length?o.frames:[{gap:e.gap,coverage:u,trapped:o.voidMask||new Uint8Array(u.length)}],f=o.cols*o.rows,g=new Float32Array(f).fill(-1);d.forEach((ae,oe)=>{for(let Ie=0;Ie<f;Ie++)g[Ie]<0&&ae.coverage[Ie]>=128&&(g[Ie]=d.length>1?oe/(d.length-1):1)});const _=e.shape==="circle"?new da(l/2,96):new xi(l,h),m=new Ye(_,a(new Tn({color:1684930,transparent:!0,opacity:.35,side:Dt,depthWrite:!1})));m.position.set(e.offsetX,e.offsetY,c+.004),m.name="configured heat source",m.renderOrder=1,i.add(m);const p=e.shape==="circle"?Array.from({length:97},(ae,oe)=>new R(l/2*Math.cos(oe*Math.PI*2/96),l/2*Math.sin(oe*Math.PI*2/96),0)):[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]].map(([ae,oe])=>new R(ae*l/2,oe*h/2,0)),x=new ki(new ft().setFromPoints(p),a(new Bi({color:771542,depthTest:!1,transparent:!0})));x.position.set(e.offsetX,e.offsetY,c+e.gap+.02),x.name="heat source boundary",x.renderOrder=6,i.add(x);let M=o.cols,v=-1,E=o.rows,T=-1;for(let ae=0;ae<f;ae++)if(u[ae]>0||d.some(oe=>oe.coverage[ae]>0)){const oe=ae%o.cols,Ie=Math.floor(ae/o.cols);M=Math.min(M,oe),v=Math.max(v,oe),E=Math.min(E,Ie),T=Math.max(T,Ie)}const C=v>=M;C&&(M=Math.max(0,M-1),E=Math.max(0,E-1),v=Math.min(o.cols-1,v+1),T=Math.min(o.rows-1,T+1));const D=C?v-M+2:0,S=C?T-E+2:0,y=new ft,P=new Float32Array(D*S*3),F=new Float32Array(D*S*3),G=new Float32Array(D*S);for(let ae=0;ae<S;ae++)for(let oe=0;oe<D;oe++){const Ie=ae*D+oe;P[3*Ie]=o.originX+(M+oe)*o.cellSize,P[3*Ie+1]=o.originY+(E+ae)*o.cellSize}y.setAttribute("position",new Ct(P,3)),y.setAttribute("color",new Ct(F,3));const q=new He(($t[s.material]||$t.putty).color),X=new Ye(y,a(new Kt({vertexColors:!0,roughness:.55,metalness:0,clearcoat:.2,clearcoatRoughness:.5,side:Dt,envMapIntensity:.6})));X.name="squeezed film",X.castShadow=!0,X.receiveShadow=!0,i.add(X);const V=new Ye(new ft,a(new Tn({color:16723285,transparent:!0,opacity:.85,side:Dt,depthWrite:!1})));V.name="trapped air",V.position.z=c+.01,V.renderOrder=4,i.add(V);let ee=e.offsetX-l/2,H=e.offsetX+l/2,he=e.offsetY-h/2,pe=e.offsetY+h/2;for(let ae=0;ae<f;ae++){if(!(Number(o.coverage[ae])>1e-7))continue;const oe=o.originX+ae%o.cols*o.cellSize,Ie=o.originY+Math.floor(ae/o.cols)*o.cellSize;ee=Math.min(ee,oe),H=Math.max(H,oe+o.cellSize),he=Math.min(he,Ie),pe=Math.max(pe,Ie+o.cellSize)}const ve=3,Ee=new Zt(H-ee+2*n,pe-he+2*n,ve),st=new Ye(Ee,a(new Kt({color:13626101,transparent:!0,opacity:.1,roughness:.05,metalness:0,clearcoat:.4,depthWrite:!1,side:Dt})));st.name="transparent inspection plate",st.renderOrder=5,i.add(st),st.add(new Pc(new su(Ee),a(new Bi({color:4892612,transparent:!0,opacity:.8,depthWrite:!1}))));let ot="material",Ze=d.length-1;const Z=new He;function Q(ae){Ze=Math.max(0,Math.min(d.length-1,ae));const oe=d[Ze],Ie=oe.gap;if(st.position.set((ee+H)/2,(he+pe)/2,c+Ie+ve/2),x.position.z=c+Ie+.02,C){const Ce=(se,Ne)=>se<0||Ne<0||se>=o.cols||Ne>=o.rows?0:oe.coverage[Ne*o.cols+se]/255,we=new Float32Array(D*S);for(let se=0;se<S;se++)for(let Ne=0;Ne<D;Ne++){const ce=M+Ne,Te=E+se;we[se*D+Ne]=(Ce(ce-1,Te-1)+Ce(ce,Te-1)+Ce(ce-1,Te)+Ce(ce,Te))/4}for(let se=0;se<S;se++)for(let Ne=0;Ne<D;Ne++){let ce=0,Te=0;for(let it=-1;it<=1;it++)for(let je=-1;je<=1;je++){const A=Ne+je,b=se+it;A<0||b<0||A>=D||b>=S||(ce+=we[b*D+A],Te++)}G[se*D+Ne]=ce/Te}for(let se=0;se<S;se++)for(let Ne=0;Ne<D;Ne++){const ce=se*D+Ne,Te=G[ce];if(P[3*ce+2]=c+Ie*Math.min(1,2.2*(Te-.22))-(Te<.22?.02:0),ot==="front"){const it=M+Ne,je=E+se;let A=-1;for(const[k,K]of[[it-1,je-1],[it,je-1],[it-1,je],[it,je]])k>=0&&K>=0&&k<o.cols&&K<o.rows&&(A=Math.max(A,g[K*o.cols+k]));const b=Vx(A<0?1:A);Z.setRGB(b[0],b[1],b[2],At)}else Z.copy(q).multiplyScalar(.7+.2*Math.min(1,Te));F[3*ce]=Z.r,F[3*ce+1]=Z.g,F[3*ce+2]=Z.b}const ye=[];for(let se=0;se<S-1;se++)for(let Ne=0;Ne<D-1;Ne++){const ce=se*D+Ne;Math.max(G[ce],G[ce+1],G[ce+D],G[ce+D+1])<.22||ye.push(ce,ce+1,ce+D+1,ce,ce+D+1,ce+D)}y.setIndex(ye),y.attributes.position.needsUpdate=!0,y.attributes.color.needsUpdate=!0,y.computeVertexNormals(),y.computeBoundingSphere()}const Fe=[],I=oe.trapped||o.voidMask;if(I){for(let Ce=0;Ce<f;Ce++)if(I[Ce]){const we=o.originX+Ce%o.cols*o.cellSize,ye=o.originY+Math.floor(Ce/o.cols)*o.cellSize,se=o.cellSize;Fe.push(we,ye,0,we+se,ye,0,we+se,ye+se,0,we,ye,0,we+se,ye+se,0,we,ye+se,0)}}return V.geometry.dispose(),V.geometry=new ft,V.geometry.setAttribute("position",new yt(Fe,3)),oe}return Q(Ze),{group:i,source:m,film:X,voids:V,plate:st,frameCount:d.length,frames:d,get frameIndex(){return Ze},setFrame:Q,setColorMode(ae){ot=ae,Q(Ze)},dispose(){i.removeFromParent(),i.traverse(ae=>{var oe;return(oe=ae.geometry)==null?void 0:oe.dispose()});for(const ae of r)ae.dispose()}}}function Wx(s,e){const t=s/2,n=t+.55,i=Math.max(5,n+.4),r=[[t,0],[n,0],[n+.12,Math.min(2,e*.12)],[i,e],[t,e],[t,0]].map(([o,c])=>new me(o,c)),a=new As(r,64);return a.rotateX(Math.PI/2),a}function Xx(s,e){const t=s/2,n=la.assumedInsertionMm,i=[[t,e],[6.2,e],[6.2,e+n],[t,e+n],[t,e]].map(([a,o])=>new me(a,o)),r=new As(i,48);return r.rotateX(Math.PI/2),r}function Mu(s){const e=s.attributes.position,t=s.index;let n=0;for(let i=0;i<(t?t.count:e.count);i+=3){const r=t?t.getX(i):i,a=t?t.getX(i+1):i+1,o=t?t.getX(i+2):i+2;n+=(e.getX(r)*(e.getY(a)*e.getZ(o)-e.getZ(a)*e.getY(o))+e.getY(r)*(e.getZ(a)*e.getX(o)-e.getX(a)*e.getZ(o))+e.getZ(r)*(e.getX(a)*e.getY(o)-e.getY(a)*e.getX(o)))/6}return Math.abs(n)}function bu(s,e,t,n){const i=fc(s,e,t),r=s.length,a=uo,o=a+1,c=[],l=[];for(let d=0;d<=r;d++){const f=n(d);for(let g=0;g<=a;g++){const _=g*Math.PI/a,m=i.widths[d]*Math.cos(_)/2;c.push(f.x+f.nx*m,f.y+f.ny*m,i.heights[d]*Math.sin(_))}}for(let d=0;d<r;d++)for(let f=0;f<a;f++){const g=d*o+f;l.push(g,g+1,g+o+1,g,g+o+1,g+o)}const h=c.length/3;for(let d=0;d<=r;d++){const f=n(d),g=i.widths[d]/2;c.push(f.x+f.nx*g,f.y+f.ny*g,0,f.x-f.nx*g,f.y-f.ny*g,0)}for(let d=0;d<r;d++){const f=h+2*d;l.push(f,f+2,f+3,f,f+3,f+1)}const u=new ft;return u.setAttribute("position",new yt(c,3)),u.setIndex(l),u.computeVertexNormals(),u.userData.unitVolume=Mu(u),u}function yh(s,e,t){return bu(s,e,t,n=>({x:n*e,y:0,nx:0,ny:1}))}function Mh(s,e,t,n,i){return bu(s,e,t,r=>{const a=i+r*e,o=hc(n,a),c=a-Math.max(0,Math.min(n.length,a));return{x:o.x+o.tx*c,y:o.y+o.ty*c,nx:-o.ty,ny:o.tx}})}function $x(s,e){const t=new dt,n=s.width,i=s.shape==="circle"?n:s.depth,r=new Tn({color:1684930,transparent:!0,opacity:.22,side:Dt,depthWrite:!1}),a=new Bi({color:692124,transparent:!0,opacity:.95,depthWrite:!1}),o=s.shape==="circle"?new da(n/2,96):new xi(n,i),c=new Ye(o,r);c.position.z=e+.003,c.renderOrder=1,t.add(c);const l=s.shape==="circle"?Array.from({length:97},(u,d)=>new R(n/2*Math.cos(d*2*Math.PI/96),n/2*Math.sin(d*2*Math.PI/96),e+.006)):[[-n/2,-i/2],[n/2,-i/2],[n/2,i/2],[-n/2,i/2],[-n/2,-i/2]].map(([u,d])=>new R(u,d,e+.006)),h=new ki(new ft().setFromPoints(l),a);return h.renderOrder=2,t.add(h),t.position.set(s.offsetX,s.offsetY,0),t.name="設定的熱源參考輪廓",t.userData.ownedMaterials=[r,a],t}function Yx(s){const t=2*s,n=(1+t*t)/(2*t),i=t-n,r=Math.acos((n-t)/n),a=48,o=16,c=[0,0,t],l=[];for(let f=1;f<=o;f++){const g=r*f/o,_=n*Math.sin(g),m=i+n*Math.cos(g);for(let p=0;p<a;p++){const x=p*2*Math.PI/a;c.push(_*Math.cos(x),_*Math.sin(x),m)}}for(let f=0;f<a;f++)l.push(0,1+f,1+(f+1)%a);for(let f=0;f<o-1;f++)for(let g=0;g<a;g++){const _=1+f*a+g,m=1+f*a+(g+1)%a;l.push(_,_+a,m,m,_+a,m+a)}const h=c.length/3;c.push(0,0,0);const u=1+(o-1)*a;for(let f=0;f<a;f++)l.push(h,u+(f+1)%a,u+f);const d=new ft;return d.setAttribute("position",new yt(c,3)),d.setIndex(l),d.computeVertexNormals(),d.userData.unitVolume=Mu(d),d}function qx(s,e){if(typeof document>"u")return new He(e);const t=document.createElement("canvas");t.width=4,t.height=256;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,0,256);i.addColorStop(0,s),i.addColorStop(1,e),n.fillStyle=i,n.fillRect(0,0,4,256);const r=new tu(t);return r.colorSpace=At,r}const jx=s=>s<.5?4*s*s*s:1-(-2*s+2)**3/2,Kx=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,Zx={whole:"全機",work:"工作區",head:"機頭",feed:"供膠站",close:"點膠近看",heat:"熱源特寫",follow:"局部跟隨"};class Jx{constructor(e,{onScale:t,onView:n}={}){this.host=e,this.onScale=t,this.onView=n,this.mode="close",this.config=null,this.counter={parts:0},this.isoCorner=2,this.freeOrbit=!1,this.projection="ortho",this.showExitPath=!0,this.showPlannedPath=!0,this.theme="light",this.scene=new Zh,this.renderer=new Lv({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.outputColorSpace=At,this.renderer.toneMapping=Ph,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ch,e.appendChild(this.renderer.domElement);const i=this.renderer.domElement;i.setAttribute("aria-label","毫米比例的點膠機台 3D 場景；可拖曳、滾輪縮放，Home 重設"),i.setAttribute("tabindex","0");const r=new sc(this.renderer);this.scene.environment=r.fromScene(new Rx,.04).texture,this.scene.environmentIntensity=.7,r.dispose(),this.hemi=new Dp(16777215,7174790,.9),this.scene.add(this.hemi),this.sun=new ic(16774374,2.4),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-2e-4,this.sun.shadow.normalBias=.6,this.scene.add(this.sun,this.sun.target);const a=new ic(13229311,.8);a.position.set(400,600,300),this.scene.add(a),this.setTheme("light"),this.ortho=new pa(-150,150,100,-100,.1,2e4),this.persp=new Xt(32,1,1,3e4),this.ortho.up.set(0,0,1),this.persp.up.set(0,0,1),this.camera=this.ortho,this.makeControls(),this.palette=Bx(),this.kit=new kx(this.palette,this.counter),this.glue=new Kt({color:$t.putty.color,roughness:.48,metalness:0,clearcoat:.35,clearcoatRoughness:.4,sheen:.4}),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),i.addEventListener("keydown",o=>{if(o.key==="+"||o.key==="=")this.zoomBy(1.2);else if(o.key==="-")this.zoomBy(1/1.2);else if(o.key==="Home")this.fit(this.mode);else return;o.preventDefault()})}makeControls(){var e;(e=this.controls)==null||e.dispose(),this.controls=new Iv(this.camera,this.renderer.domElement),this.controls.enableDamping=!1,this.controls.minZoom=.2,this.controls.maxZoom=40,this.controls.minDistance=20,this.controls.maxDistance=2e4,this.controls.minPolarAngle=.01,this.controls.maxPolarAngle=Math.PI-.01,this.controls.zoomToCursor=!0,this.controls.addEventListener("change",()=>this.render()),this.applyOrbitMode()}applyOrbitMode(){const e=this.freeOrbit;this.controls.enableRotate=e,this.controls.mouseButtons.LEFT=e?Kn.ROTATE:Kn.PAN,this.controls.mouseButtons.RIGHT=Kn.PAN,this.controls.touches.ONE=e?Yn.ROTATE:Yn.PAN,this.controls.touches.TWO=Yn.DOLLY_PAN}setTheme(e){var n,i;this.theme=e;const t=e==="dark";(i=(n=this.scene.background)==null?void 0:n.dispose)==null||i.call(n),this.scene.background=qx(t?"#243042":"#f4f7fb",t?"#0d1218":"#cdd6e1"),this.hemi.intensity=t?.7:.9,this.render()}disposeGroup(e){e&&(e.traverse(t=>{var n,i;(n=t.geometry)==null||n.dispose();for(const r of((i=t.userData)==null?void 0:i.ownedMaterials)||[])r.dispose()}),e.removeFromParent())}rebuild(e,t){var d,f,g,_,m;this.clearCompression(),(d=this.imported)==null||d.removeFromParent();for(const p of[this.machine,this.environment,this.depositGroup,this.patternSource,this.overlays])this.disposeGroup(p);(f=this.chain)==null||f.dispose(),(g=this.hose)==null||g.material.dispose(),(_=this.supplyHose)==null||_.material.dispose(),(m=this.stationAirHose)==null||m.material.dispose(),Object.assign(this,{cartridge:null,pumpStation:null,head:null,hose:null,supplyHose:null,stationAirHose:null,chain:null,lcd:null,lastHose:null,enclosure:null,stationAirAnchor:null}),this.counter.parts=0,this.config=e,this.run=t;const n=e.architecture==="P300",i=this.kit;this.glue.color.setHex(($t[e.material]||$t.putty).color);const r=e.architecture==="R75"?la.nominalLengthMm-la.assumedInsertionMm:e.nozzleLength;this.visualNozzleLength=r,this.machine=new dt,this.machine.name="machine",this.environment=new dt,this.depositGroup=new dt,this.overlays=new dt,this.scene.add(this.machine,this.environment,this.depositGroup,this.overlays),e.heatSource&&(this.patternSource=$x(e.heatSource,e.surfaceZ),this.scene.add(this.patternSource)),n?this.buildCell(i):this.buildBench(i),this.buildGantry(i,n),this.buildFixture(i,e),this.tool=new dt,this.tool.name="tool",this.machine.add(this.tool);const a=n?4:0;this.buildZSlide(i,n,a),n?(this.head=Ux(),this.head.group.position.z=r,this.tool.add(this.head.group),this.hoseStart=this.pumpStation.fluidPort,this.hoseEnd=this.head.inletPort):(this.cartridge=Dx({fillMaterial:this.glue}),this.cartridge.group.position.z=r,this.tool.add(this.cartridge.group),this.hoseStart=this.airFitting,this.hoseEnd=this.cartridge.airPort);const o=i.mesh(Wx(e.diameter,r),n?"steel":"polymer",this.tool,{edges:!1});o.castShadow=!1,n||(i.mesh(Xx(e.diameter,r),"polymer",this.tool,{edges:!1}).castShadow=!1),this.hose=new Ye(new ft,new Qe({color:n?1845811:4165088,roughness:n?.6:.25,metalness:0,transparent:!n,opacity:n?1:.85})),this.hose.castShadow=!0,this.hose.name=n?"示意供膠管":"示意供氣管",this.machine.add(this.hose),n||(this.supplyHose=new Ye(new ft,this.hose.material.clone()),this.supplyHose.castShadow=!0,this.machine.add(this.supplyHose)),this.flowColumn=new Ye(new en(1,1,1,24,1,!0),this.glue),this.flowColumn.geometry.rotateX(Math.PI/2),this.flowColumn.geometry.translate(0,0,.5),this.flowColumn.visible=!1,this.depositGroup.add(this.flowColumn),this.lastDeposits=null,this.depositMeshes=[],e.mode==="point"&&(this.dotGeo=Yx(e.dotRatio));const c=e.mode==="pattern"?Mh(t.frames[0].deposits,t.cellLength,e.lineRatio,t.path,t.gridStart):e.mode==="line"?yh(t.frames[0].deposits,t.cellLength,e.lineRatio):this.dotGeo,l=new Ye(c,this.glue);l.visible=!1,l.castShadow=l.receiveShadow=!0,this.depositGroup.add(l),this.depositMeshes.push(l);const h=e.mode==="pattern"?t.path.points.map(p=>new R(p.x,p.y,e.surfaceZ+.02)):e.mode==="line"?[new R(e.offsetX-e.lineLength/2,e.offsetY,e.surfaceZ+.02),new R(e.offsetX+e.lineLength/2,e.offsetY,e.surfaceZ+.02)]:[];this.plannedPath=new ki(new ft().setFromPoints(h),new Fl({color:15901498,dashSize:1.2,gapSize:.8,transparent:!0,opacity:.9})),this.plannedPath.computeLineDistances(),this.plannedPath.userData.ownedMaterials=[this.plannedPath.material],this.plannedPath.visible=this.showPlannedPath,this.overlays.add(this.plannedPath);const u=t.frames.filter(p=>p.t>=t.ending.liftStart-.01&&p.t<=t.ending.motionEnd+.01).map(p=>new R(p.x,p.y,p.z));this.exitPath=new ki(new ft().setFromPoints(u),new Fl({color:14701343,dashSize:.7,gapSize:.4,transparent:!0,opacity:.85})),this.exitPath.computeLineDistances(),this.exitPath.userData.ownedMaterials=[this.exitPath.material],this.exitPath.visible=this.showExitPath,this.overlays.add(this.exitPath),this.configureShadow(n),this.update(t.frames[0]),this.fit(this.mode,{animate:!1})}configureShadow(e){const t=e?700:420;this.sun.position.set(-260,-420,900),this.sun.target.position.set(0,40,0),Object.assign(this.sun.shadow.camera,{left:-t,right:t,top:t,bottom:-t,near:10,far:3e3}),this.sun.shadow.camera.updateProjectionMatrix()}buildBench(e){const t=this.environment;e.box(1180,820,40,-60,40,-112,"bench",t,4),e.box(1040,680,2,-60,40,-72,"mat",t,1),e.cyl(6,3,440,-280,-70,"steel",t)}buildCell(e){this.enclosure=Nx(),this.machine.add(this.enclosure),this.pumpStation=Ix(),this.pumpStation.group.position.set(-750,0,-900),this.machine.add(this.pumpStation.group);const t=new Ye(new xi(4e3,4e3),new Qe({color:10134445,roughness:.9}));t.position.z=-900.5,t.receiveShadow=!0,t.userData.ownedMaterials=[t.material],this.environment.add(t);const n=new dt;n.position.set(-469.5,-300,-700),this.machine.add(n),this.stationAirAnchor=n,e.box(12,32,32,0,0,-16,"black",n),e.rod(5,14,"x",-13,0,0,"steel",n),this.stationAirSource=new ht,this.stationAirSource.position.x=-20,n.add(this.stationAirSource),this.stationAirHose=new Ye(new ft,new Qe({color:3112920,roughness:.4})),this.stationAirHose.name="示意外部氣源接管",this.machine.add(this.stationAirHose),this.pumpStation.group.updateMatrixWorld(!0),n.updateMatrixWorld(!0),this.stationAirHose.geometry=lo(this.pumpStation.airPort.getWorldPosition(new R),this.stationAirSource.getWorldPosition(new R),"stationAir",3)}buildGantry(e,t){const n=this.machine,i=t?4:0,r=110+i;this.beamY=r;const a=new dt;a.name="base",n.add(a),e.box(420,500,40,0,60,-56,"graphite",a,3),e.box(408,488,3,0,60,-19,"coverGrey",a,1);for(const v of[-185,185])for(const E of[-160,280])e.cyl(16,4,v,E,-70,"rubber",a),e.cyl(9,10,v,E,-66,"steel",a);const o=-190;e.box(150,4,30,110,o-2,-50,"black",a,1),e.cyl(10,4,165,o-4,-40,"yellow",a).rotation.x=Math.PI/2;const c=e.cyl(8,8,165,o-10,-40,"red",a);c.rotation.x=Math.PI/2;for(const[v,E]of[[70,"green"],[95,"red"],[120,"black"]]){const T=e.cyl(5,4,v,o-4,-36,E,a,20);T.rotation.x=Math.PI/2}e.box(90,1,16,-110,o-.5,-46,"aluminum",a,.6);for(const v of[-42,-38,-34])e.box(70,.6,.8,-110,o-1.1,v,"hole",a,0);e.box(320,320,16,0,0,-16,"aluminum",a,1.5);const l=[];for(let v=-137.5;v<=137.5;v+=25)for(let E=-137.5;E<=137.5;E+=25)l.push([v,E]);const h=new en(2.6,2.6,.2,16);h.rotateX(Math.PI/2);const u=new Ms(h,this.palette.hole,l.length);l.forEach(([v,E],T)=>u.setMatrixAt(T,new Ke().makeTranslation(v,E,.02))),u.receiveShadow=!0,a.add(u);const d=[];for(let v=-150;v<=150;v+=5)d.push(v);const f=new Zt(.5,1,.12),g=new Ms(f,this.palette.black,d.length);d.forEach((v,E)=>g.setMatrixAt(E,new Ke().compose(new R(v,-157+(v%25===0?2.5:1.25),.06),new _n,new R(1,v%25===0?5:2.5,1)))),a.add(g);for(const v of[-190,190]){e.box(34,470,18,v,60,-16,"graphite",a,1.5),e.box(15,460,10,v,60,2,"steel",a,.4);for(let E=-160;E<=280;E+=40)e.screw(v,E,12.4,a,1.4);for(const E of[-172,292])e.box(30,8,22,v,E,2,"orange",a,1);e.box(46,52,46,v,318,-16,"black",a,2),e.cyl(16,4,v,318,30,"steel",a),e.box(10,40,30,v+Math.sign(v)*25,318,-10,"coverGrey",a,1)}this.bridge=new dt,this.bridge.name="bridge",n.add(this.bridge);const _=this.bridge;for(const v of[-190,190]){for(const E of[-22,22])e.box(30,34,14,v,r+E,12,"steelDark",_,1);e.box(56,92,10,v,r,26,"cobaltDark",_,2),e.box(40,52,174,v,r,36,"cobalt",_,3),e.box(44,56,6,v,r,206,"coverGrey",_,2);for(const E of[-18,18])for(const T of[-18,18])e.screw(v+T,r+E,36.6,_,1.6)}e.box(440,40,50,0,r,205,"cobalt",_,3),e.box(400,2,36,0,r+20.5,212,"coverGrey",_,.6);for(const v of[212,240]){e.box(400,6,10,0,r-23,v-5,"steel",_,.4);for(let E=-180;E<=180;E+=40)e.screw(E,r-26.2,v,_,1.2,"y")}e.rod(4.5,390,"x",0,r-29,226,"steel",_);for(const v of[-212,212])e.box(10,46,56,v+Math.sign(v)*5,r,202,"coverGrey",_,2);e.box(50,44,44,247,r,208,"black",_,2),e.rod(16,6,"x",275,r,230,"steel",_),e.box(10,10,10,250,r-26,240,"orange",_,1),e.box(18,18,12,-200,r,255,"black",_,1),e.cyl(4,10,-200,r,267,"brass",_),this.airFitting=new ht,this.airFitting.position.set(-200,r,277),_.add(this.airFitting),this.supplyFitting=new ht,this.supplyFitting.position.set(-209,r,261),_.add(this.supplyFitting);const m=new Qe({color:2369581,roughness:.55,metalness:.1}),p=new Qe({color:15760411,roughness:.5,metalness:.05});this.chain=zx({material:m,sideMaterial:p,free:200}),this.chain.group.position.set(0,r,261),this.chain.group.userData.ownedMaterials=[m,p],_.add(this.chain.group),e.box(28,30,4,0,r,255,"steelDark",_,.8),this.carriage=new dt,this.carriage.name="x carriage",_.add(this.carriage);const x=this.carriage,M=t?380:300;for(const v of[-22,22])for(const E of[212,240])e.box(30,8,16,v,r-30,E-8,"steelDark",x,1);e.box(90,6,80,0,r-37,186,"cover",x,2),e.box(70,8,M-60,0,66+i,60,"cover",x,2),e.box(70,2,M-70,0,61+i,65,"cobalt",x,.5);for(const v of[-20,20])e.box(9,6,M-80,v,57+i,70,"steel",x,.3);e.rod(3.5,M-90,"z",0,57+i,65+(M-90)/2,"steel",x),e.box(44,44,54,0,66+i,M,"black",x,2),e.cyl(15,4,0,66+i,M+54,"steel",x),e.box(12,10,10,18,66+i,M+40,"orange",x,1);for(const v of[-28,28])for(const E of[80,M-20])e.screw(v,61.8+i-1.2,E,x,1.6,"y");e.box(30,r-64,6,0,(r+64)/2,285,"steelDark",x,1)}buildZSlide(e,t,n){const i=this.tool,r=t?130:70,a=t?140:125;e.box(64,8,a,0,42+n,r,"cobalt",i,1.5);for(const o of[-20,20])for(const c of[r+10,r+a-30])e.box(18,8,20,o,50+n,c,"steelDark",i,1);for(const o of[-24,24])for(const c of[r+8,r+a-8])e.screw(o,37.6+n,c,i,1.5,"y")}buildFixture(e,t){const n=this.machine,i=Math.min(t.width+24,310),r=Math.min(t.depth+24,310);this.fixture=new dt,this.fixture.name="fixture",n.add(this.fixture);const a=Math.max(0,t.fixtureHeight-2);for(const o of[-1,1])for(const c of[-1,1])e.cyl(5,Math.min(2,t.fixtureHeight),o*i/2.4,c*r/2.4,0,"steel",this.fixture);a>.2&&e.box(i,r,a,0,0,Math.min(2,t.fixtureHeight),"teal",this.fixture,1.5);for(const[o,c]of[[-i/2+6,-r/2+6],[i/2-6,r/2-6],[i/2-6,-r/2+6],[-i/2+6,r/2-6]])e.screw(o,c,t.fixtureHeight+.45,this.fixture,2.2);for(const[o,c]of[[-t.width/2-3,-t.depth/4],[-t.width/2-3,t.depth/4],[t.width/4,t.depth/2+3]])Math.abs(o)<i/2&&Math.abs(c)<r/2&&e.cyl(2.5,Math.min(t.thickness,4)+1,o,c,t.fixtureHeight,"steel",this.fixture,20);for(const o of[-1,1]){const c=o*(t.width/2-10),l=-t.depth/2-7;Math.abs(l)>r/2||(e.cyl(5,6,c,l,t.fixtureHeight,"steelDark",this.fixture),e.box(8,16,3,c,l+5,t.fixtureHeight+Math.min(t.thickness,6),"red",this.fixture,1))}if(this.partHolder=new dt,this.partHolder.name="workpiece",n.add(this.partHolder),this.imported)this.partHolder.add(this.imported),this.imported.position.set(0,0,t.fixtureHeight);else{e.box(t.width,t.depth,t.thickness,0,0,t.fixtureHeight,"castAl",this.partHolder,Math.min(1.2,t.thickness/4));for(const o of[-1,1])for(const c of[-1,1]){const l=o*(t.width/2-6),h=c*(t.depth/2-6);t.width>30&&t.depth>30&&e.cyl(1.8,.1,l,h,t.surfaceZ-.04,"hole",this.partHolder,16)}}t.architecture==="R75"&&this.buildController(e)}buildController(e){const t=new dt;t.name="air dispenser controller (generic)",t.position.set(-360,-40,-70),this.machine.add(t),e.box(150,190,86,0,0,0,"cover",t,4),e.box(150,4,86,0,-96,0,"cobalt",t,1.5);for(const a of[-60,60])for(const o of[-80,80])e.cyl(6,3,a,o,-3,"rubber",t);if(this.lcd=Hx(),this.lcd){const a=new Ye(new xi(62,27),new Tn({map:this.lcd.texture,toneMapped:!1}));a.rotation.x=Math.PI/2,a.position.set(-28,-98.8,56),a.userData.ownedMaterials=[a.material],t.add(a),e.box(68,1.5,33,-28,-97.9,39.5,"black",t,.6)}for(const[a,o]of[[-50,"green"],[-36,"cover"],[-22,"cover"],[-8,"red"]]){const c=e.cyl(4,3,a,-99,22,o,t,18);c.rotation.x=Math.PI/2}const n=e.cyl(11,12,42,-102,52,"black",t,24);n.rotation.x=Math.PI/2;const i=e.cyl(14,4,42,-99,24,"steel",t,32);i.rotation.x=Math.PI/2;const r=e.cyl(12,1,42,-101.2,24,"cover",t,32);r.rotation.x=Math.PI/2,this.gaugeNeedle=e.box(1.2,.6,10,42,-101.9,19,"red",t,0),this.gaugeNeedle.geometry.translate(0,0,0),e.cyl(5,10,50,70,86,"brass",t),this.supplyOutlet=new ht,this.supplyOutlet.position.set(50,70,96),t.add(this.supplyOutlet)}update(e){var l;if(!this.config)return;const t=this.config;if(this.frame=e,this.tool.position.set(e.x,e.y,e.z),this.carriage.position.x=e.x,this.bridge.position.y=e.y,(l=this.chain)==null||l.update(Math.max(-170,Math.min(170,e.x))),this.cartridge&&this.cartridge.updateFill(e.remaining/75),this.lcd){const h=t.pressure;this.lcd.draw([`${h.toFixed(1)} psi`,e.command?"DISPENSE ●":"READY  "+e.t.toFixed(2)+"s"],!!e.command),this.gaugeNeedle&&(this.gaugeNeedle.rotation.y=-1.2+h/100*2.4)}this.machine.updateMatrixWorld(!0);const n=this.machine.worldToLocal(this.hoseStart.getWorldPosition(new R)),i=this.machine.worldToLocal(this.hoseEnd.getWorldPosition(new R));if(!this.lastHose||n.distanceToSquared(this.lastHose[0])>1e-5||i.distanceToSquared(this.lastHose[1])>1e-5){if(this.hose.geometry.dispose(),this.hose.geometry=lo(n,i,t.architecture==="R75"?"air":"feed",t.architecture==="R75"?2.6:5),this.supplyHose){this.supplyHose.geometry.dispose();const h=this.machine.worldToLocal(this.supplyOutlet.getWorldPosition(new R)),u=this.machine.worldToLocal(this.supplyFitting.getWorldPosition(new R));this.supplyHose.geometry=lo(h,u,"supply",2.6)}this.lastHose=[n,i]}const r=this.depositMeshes[0],a=e.deposited;if(r.visible=a>1e-12&&!this.compression,t.mode==="line"||t.mode==="pattern")this.lastDeposits!==e.deposits&&(r.geometry.dispose(),r.geometry=t.mode==="pattern"?Mh(e.deposits,this.run.cellLength,t.lineRatio,this.run.path,this.run.gridStart):yh(e.deposits,this.run.cellLength,t.lineRatio),this.lastDeposits=e.deposits),t.mode==="pattern"?r.position.set(0,0,t.surfaceZ+.001):r.position.set(t.offsetX-t.lineLength/2+this.run.gridStart,t.offsetY,t.surfaceZ+.001);else if(r.visible){const h=na(a,t.dotRatio);r.scale.set(h.radius,h.radius,a*1e3/(this.dotGeo.userData.unitVolume*h.radius*h.radius)),r.position.set(t.offsetX,t.offsetY,t.surfaceZ+.001)}const o=e.z-t.surfaceZ,c=e.q>.02*(this.run.Q||1)&&o<=t.standoff+.05&&!this.compression;if(this.flowColumn.visible=c,c){const h=t.diameter/2*Math.min(1,.55+.45*(e.q/this.run.Q));this.flowColumn.scale.set(h,h,o),this.flowColumn.position.set(e.x,e.y,t.surfaceZ)}(this.mode==="follow"||this.mode==="head")&&this.trackTool(),this.render()}trackTool(){const e=this.frame;if(!e||this.tween)return;const t=this.mode==="follow"?new R(e.x,e.y,this.config.surfaceZ):new R(e.x,e.y,e.z).add(this.headTargetOffset||new R);this.camera.position.add(t.clone().sub(this.controls.target)),this.controls.target.copy(t)}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;!e||!t||(this.renderer.setSize(e,t,!1),this.persp.aspect=e/t,this.persp.updateProjectionMatrix(),this.config&&this.fit(this.mode,{animate:!1}))}isoDirection(){const e=[[1,1,1],[-1,1,1],[-1,-1,1],[1,-1,1]][this.isoCorner];return new R(...e).normalize()}visibility(e){const t=this.config.architecture==="P300",n={whole:()=>!0,work:i=>{var r;return i!==this.enclosure&&i!==((r=this.pumpStation)==null?void 0:r.group)&&i!==this.stationAirHose&&i!==this.stationAirAnchor},feed:i=>{var r;return[(r=this.pumpStation)==null?void 0:r.group,this.enclosure,this.stationAirAnchor,this.hose,this.stationAirHose].includes(i)},head:i=>[this.tool,this.bridge,this.partHolder,this.fixture,this.hose].includes(i),close:i=>[this.tool,this.partHolder,this.fixture].includes(i),heat:i=>[this.tool,this.partHolder,this.fixture].includes(i),follow:i=>[this.tool,this.partHolder,this.fixture].includes(i)}[e];for(const i of this.machine.children)i.visible=n(i)&&!(this.compression&&i===this.tool);this.environment.visible=e==="whole"||e==="work"||t&&e==="feed";for(const i of this.tool.children){i.updateMatrixWorld();const r=new ln().setFromObject(i);i.visible=["whole","work","head"].includes(e)||r.min.z-this.tool.position.z<(e==="heat"?20:this.visualNozzleLength-1)}}framing(e){const t=this.config,n=[];let i;if(e==="whole"||e==="feed"||e==="head"){const r=e==="whole"?this.machine:e==="feed"?this.pumpStation.group:this.tool,a=new ln;r.traverseVisible(o=>{(o.isMesh||o.isInstancedMesh)&&a.expandByObject(o)});for(const o of[a.min.x,a.max.x])for(const c of[a.min.y,a.max.y])for(const l of[a.min.z,a.max.z])n.push(new R(o,c,l));i=a.getCenter(new R),e==="head"&&(this.headTargetOffset=i.clone().sub(this.tool.position))}else if(e==="work"){for(const r of[-250,250])for(const a of[-200,330])for(const o of[-60,t.architecture==="P300"?430:330])n.push(new R(r,a,o));i=new R(0,60,t.architecture==="P300"?180:130)}else if(e==="heat"&&t.heatSource){const r=t.heatSource,a=r.width/2+Math.max(6,r.width*.35),o=(r.shape==="circle"?r.width:r.depth)/2+Math.max(6,r.width*.35),c=this.compression?new ln().setFromObject(this.compression.plate):null,l=c?Math.min(r.offsetX-a,c.min.x):r.offsetX-a,h=c?Math.max(r.offsetX+a,c.max.x):r.offsetX+a,u=c?Math.min(r.offsetY-o,c.min.y):r.offsetY-o,d=c?Math.max(r.offsetY+o,c.max.y):r.offsetY+o;for(const f of[l,h])for(const g of[u,d])for(const _ of[t.surfaceZ-2,t.surfaceZ+4])n.push(new R(f,g,_));i=new R((l+h)/2,(u+d)/2,t.surfaceZ+1)}else{const r=t.heatSource,a=e==="follow"?20:Math.max(Math.min(t.width+24,310)/2,r?Math.abs(r.offsetX)+r.width/2:0),o=e==="follow"?20:Math.max(Math.min(t.depth+24,310)/2,r?Math.abs(r.offsetY)+(r.shape==="circle"?r.width:r.depth)/2:0);for(const c of[-a,a])for(const l of[-o,o])for(const h of[t.fixtureHeight,t.surfaceZ+25])n.push(new R(c,l,h));i=new R(0,0,t.surfaceZ+5),e==="follow"&&this.frame&&i.set(this.frame.x,this.frame.y,t.surfaceZ)}return{pts:n,target:i}}fit(e="close",{animate:t=!0}={}){var M;if(e==="feed"&&!this.pumpStation&&(e="work"),this.mode=e,!this.config)return;this.visibility(e);const n=this.host.clientWidth||800,i=this.host.clientHeight||500,r=n/i,{pts:a,target:o}=this.framing(e),c=this.freeOrbit?this.camera.position.clone().sub(this.controls.target).normalize():this.isoDirection(),l=this.ortho.clone();l.position.copy(o).add(c.clone().multiplyScalar(5e3)),l.up.set(0,0,1),l.lookAt(o),l.updateMatrixWorld();const h=a.map(v=>v.clone().applyMatrix4(l.matrixWorldInverse)),u=e==="close"?1.22:e==="heat"?1.08:1.12;let d=Math.max(1,...h.map(v=>Math.abs(v.x)))*u,f=Math.max(1,...h.map(v=>Math.abs(v.y)))*u;const g=Math.max(1,...h.map(v=>Math.abs(v.z+5e3)));e==="follow"&&(d=20,f=d/r);const _=Math.max(f,d/r)*2;let m;if(this.projection==="ortho")m={position:o.clone().add(c.clone().multiplyScalar(5e3)),target:o.clone(),span:_};else{const v=_/2/Math.tan(wc.degToRad(this.persp.fov/2))+g;m={position:o.clone().add(c.clone().multiplyScalar(v)),target:o.clone(),span:_}}const p={position:this.camera.position.clone(),target:this.controls.target.clone(),span:this.currentSpan??_},x=t&&!Kx()&&this.currentSpan!==void 0;if(this.tween=null,!x)this.applyCamera(m,r);else{const v=performance.now();this.tween={begin:p,end:m,t0:v,aspect:r};const E=T=>{if(!this.tween||this.tween.t0!==v)return;const C=Math.min(1,(T-v)/480),D=jx(C),S=p.position.clone().lerp(m.position,D);this.applyCamera({position:S,target:p.target.clone().lerp(m.target,D),span:p.span+(m.span-p.span)*D},r),C<1?requestAnimationFrame(E):(this.tween=null,this.applyCamera(m,r),(this.mode==="follow"||this.mode==="head")&&(this.trackTool(),this.render()))};requestAnimationFrame(E)}(M=this.onView)==null||M.call(this)}applyCamera({position:e,target:t,span:n},i=this.persp.aspect){this.currentSpan=n;const r=this.camera;r.position.copy(e),this.controls.target.copy(t),r.lookAt(t),r.isOrthographicCamera&&(r.zoom=1,r.left=-n*i/2,r.right=n*i/2,r.top=n/2,r.bottom=-n/2),r.updateProjectionMatrix(),this.controls.update(),this.render()}zoomBy(e){if(this.camera.isOrthographicCamera)this.camera.zoom*=e,this.camera.updateProjectionMatrix();else{const t=this.camera.position.clone().sub(this.controls.target).divideScalar(e);this.camera.position.copy(this.controls.target).add(t)}this.controls.update(),this.render()}setCorner(e){this.isoCorner=e,this.setFreeOrbit(!1,!1),this.fit(this.mode)}setFreeOrbit(e,t=!0){var n;this.freeOrbit=e,this.applyOrbitMode(),!e&&t&&this.fit(this.mode),(n=this.onView)==null||n.call(this)}setProjection(e){if(e===this.projection)return;const t=this.camera;this.projection=e,this.camera=e==="ortho"?this.ortho:this.persp,this.camera.position.copy(t.position),this.makeControls(),this.fit(this.mode,{animate:!1})}render(){if(!(!this.renderer||!this.camera||!this.controls)&&(this.renderer.render(this.scene,this.camera),this.onScale)){const e=this.controls.target,t=e.clone().project(this.camera),n=e.clone().add(new R(10,0,0)).project(this.camera),i=this.host.clientWidth,r=this.host.clientHeight,a=Math.hypot((n.x-t.x)*i/2,(n.y-t.y)*r/2);this.onScale(a,Math.atan2(-(n.y-t.y)*r,(n.x-t.x)*i)*180/Math.PI)}}setOverlayVisibility({exitPath:e,plannedPath:t,heatSource:n}={}){e!==void 0&&(this.showExitPath=e),t!==void 0&&(this.showPlannedPath=t),this.exitPath&&(this.exitPath.visible=this.showExitPath&&!this.compression),this.plannedPath&&(this.plannedPath.visible=this.showPlannedPath&&!this.compression),n!==void 0&&this.patternSource&&(this.patternSource.visible=n),this.render()}showCompression(e,t,n={}){return this.clearCompression(),this.compression=Gx(this.config,t,e,n),this.scene.add(this.compression.group),this.tool.visible=!1,this.depositMeshes[0].visible=!1,this.flowColumn.visible=!1,this.setOverlayVisibility({}),this.patternSource&&(this.patternSource.visible=!1),this.render(),this.compression}setCompressionFrame(e){var t;(t=this.compression)==null||t.setFrame(e),this.render()}setCompressionColor(e){var t;(t=this.compression)==null||t.setColorMode(e),this.render()}clearCompression(){this.compression&&(this.compression.dispose(),this.compression=null,this.tool&&(this.tool.visible=!0),this.patternSource&&(this.patternSource.visible=!0),this.frame&&this.update(this.frame),this.setOverlayVisibility({}),this.config&&this.visibility(this.mode))}async importFile(e,t,n){const i=e.name.toLowerCase().split(".").pop(),r=await e.arrayBuffer();let a;if(i==="stl"){const f=new $v().parse(r);f.computeVertexNormals(),a=new Ye(f,this.palette.castAl),a.castShadow=a.receiveShadow=!0}else if(i==="glb"||i==="gltf"){if(i==="gltf"){const _=JSON.parse(new TextDecoder().decode(r));if([..._.buffers||[],..._.images||[]].some(m=>m.uri&&!m.uri.startsWith("data:")))throw new Error("此 glTF 含外接檔案，請匯出單一 GLB 或內嵌資源 glTF。")}const f=new hu;f.setURLModifier(_=>{if(!_.startsWith("blob:")&&!_.startsWith("data:"))throw new Error("工件引用外部資源，請匯出內嵌材質的 GLB。");return _}),a=(await new Yv(f).parseAsync(i==="gltf"?new TextDecoder().decode(r):r,"")).scene,a.traverse(_=>{_.isMesh&&(_.castShadow=_.receiveShadow=!0)})}else throw new Error("目前可載入 STL、GLB、內嵌 glTF。STEP 請先轉換。");const o=new dt;o.add(a);const c=i==="stl"?{mm:1,cm:10,m:1e3,inch:25.4}[t]:1e3;o.scale.setScalar(c),(i!=="stl"||n==="Y")&&(o.rotation.x=Math.PI/2),o.updateMatrixWorld(!0);const l=new ln().setFromObject(o),h=l.getSize(new R);if(![h.x,h.y,h.z].every(f=>Number.isFinite(f))||h.x<1||h.x>1e3||h.y<1||h.y>1e3||h.z<.1||h.z>200)throw new Error("工件尺寸不在原型範圍內（長寬 1–1000mm，厚 0.1–200mm），請檢查來源單位與檔案。");const u=new dt;u.add(o),o.position.set(-(l.min.x+l.max.x)/2,-(l.min.y+l.max.y)/2,-l.min.z),this.clearImport(),this.imported=u;const d=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",r))).map(f=>f.toString(16).padStart(2,"0")).join("");return{width:h.x,depth:h.y,thickness:h.z,workpieceKind:"imported",workpieceFile:{name:e.name,sha256:d,sourceUnit:i==="stl"?t:"m",up:i==="stl"?n:"Y",unitFactorToMm:c}}}clearImport(){this.imported&&(this.imported.removeFromParent(),this.imported.traverse(e=>{var t;return(t=e.geometry)==null?void 0:t.dispose()}),this.imported=null)}geometryAudit(){return{parts:this.counter.parts,renderedDepositVolumeMm3:this.depositMeshes.filter(e=>e.visible).reduce((e,t)=>e+t.geometry.userData.unitVolume*t.scale.x*t.scale.y*t.scale.z,0),cameraDirection:this.camera.position.clone().sub(this.controls.target).normalize().toArray()}}screenshot(){return this.render(),this.renderer.domElement.toDataURL("image/png")}}const bh=9e4;function Qx(s,e){const t=hc(s,e),n=Math.max(0,Math.min(s.length,e)),i=e-n;return{...t,x:t.x+t.tx*i,y:t.y+t.ty*i}}function ey(s){const e=s.config,t=s.summary.deposits;if(e.mode==="point"){const r=t[0]*1e3;return r>0?[{x:e.offsetX,y:e.offsetY,v:r,tx:1,ty:0,width:0}]:[]}const n=fc(t,s.cellLength,e.lineRatio),i=[];for(let r=0;r<t.length;r++){const a=t[r]*1e3;if(!(a>0))continue;const o=s.gridStart+(r+.5)*s.cellLength,c=(n.widths[r]+n.widths[r+1])/2;if(e.mode==="pattern"){const l=Qx(s.path,o);i.push({x:l.x,y:l.y,v:a,tx:l.tx,ty:l.ty,width:c})}else i.push({x:e.offsetX+o-e.lineLength/2,y:e.offsetY,v:a,tx:1,ty:0,width:c})}return i}function ty(s,e,t,n,i){const r=s.length,a=new Float64Array(r),o=new Float64Array(r),c=new Float64Array(r),l=new Float64Array(r),h=(g,_)=>{for(let m=0;m<r;m++){let p=t[m]*g[m];for(let x=4*m;x<4*m+4;x++)e[x]>=0&&(p-=g[e[x]]);_[m]=p}};h(i,l);let u=0,d=0;for(let g=0;g<r;g++)a[g]=n[g]-l[g],o[g]=a[g]/t[g],c[g]=o[g],u+=a[g]*o[g],d+=n[g]*n[g];const f=1e-8*Math.max(d,1e-30);for(let g=0;g<2e3;g++){let _=0;for(let v=0;v<r;v++)_+=a[v]*a[v];if(_<=f)break;h(c,l);let m=0;for(let v=0;v<r;v++)m+=c[v]*l[v];if(!(m>0))break;const p=u/m;let x=0;for(let v=0;v<r;v++)i[v]+=p*c[v],a[v]-=p*l[v],o[v]=a[v]/t[v],x+=a[v]*o[v];const M=x/u;u=x;for(let v=0;v<r;v++)c[v]=o[v]+M*c[v]}return i}function ny(s,e){const t=s.config,n={shape:"rectangle",offsetX:0,offsetY:0,cellSize:1,power:25,frames:0,...e};for(const U of["width","depth","offsetX","offsetY","gap","cellSize","power"])if(!Number.isFinite(n[U]))throw new Error(`${U} 必須是有限數值`);if(!["rectangle","circle"].includes(n.shape))throw new Error("熱源形狀必須為矩形或圓形");if(n.width<=0||n.width>1e3||n.depth<=0||n.depth>1e3||n.gap<.02||n.gap>10||n.cellSize<.2||n.cellSize>10)throw new Error("熱源尺寸需為 0–1000 mm、間隙 0.02–10 mm、網格 0.2–10 mm");if(n.power<0||n.power>1e4)throw new Error("熱源功耗需介於 0 與 10000 W");const i=$t[t.material]||$t.putty,r=Number.isFinite(n.conductivity)&&n.conductivity>0?n.conductivity:i.conductivity,a=Number.isFinite(n.contactResistance)&&n.contactResistance>=0?n.contactResistance:i.contactResistance,o=s.summary.deposits,c=o.reduce((U,W)=>U+W,0);if(!Number.isFinite(c)||c<0||o.some(U=>!Number.isFinite(U)||U<0))throw new Error("沉積體積資料無效");const l=c*1e3,h=n.shape==="circle"?n.width:n.depth,u=ey(s),d=t.mode==="point"?na(c,t.dotRatio):null,f=Math.max(d?d.radius:0,...u.map(U=>U.width/2),0),g=Math.sqrt(l/(Math.PI*n.gap))+f+4*n.cellSize,_=u.map(U=>U.x),m=u.map(U=>U.y),p=Math.min(n.offsetX-n.width/2,t.offsetX,..._)-g,x=Math.max(n.offsetX+n.width/2,t.offsetX,..._)+g,M=Math.min(n.offsetY-h/2,t.offsetY,...m)-g,v=Math.max(n.offsetY+h/2,t.offsetY,...m)+g;let E=Math.max(n.cellSize,Math.sqrt((x-p)*(v-M)/(bh*.89))),T=Math.ceil((x-p)/E),C=Math.ceil((v-M)/E);for(;T*C>bh;)E*=1.02,T=Math.ceil((x-p)/E),C=Math.ceil((v-M)/E);const D=p,S=M,y=T*C,P=E*E,F=U=>D+(U%T+.5)*E,G=U=>S+(Math.floor(U/T)+.5)*E,q=(U,W)=>{const ne=Math.floor((U-D)/E),J=Math.floor((W-S)/E);return ne<0||J<0||ne>=T||J>=C?-1:J*T+ne},X=new Float64Array(y),V=(U,W,ne,J)=>{let z=0;for(const[,ie]of W)z+=ie;if(z<=0){const ie=q(ne,J);ie>=0&&(X[ie]+=U);return}for(const[ie,Me]of W)X[ie]+=U*Me/z};if(d&&u.length){const U=u[0],W=d.radius,ne=d.height,J=(W*W+ne*ne)/(2*ne),z=[],ie=Math.min(8,Math.max(1,Math.ceil(E/Math.max(W/6,1e-6))));for(let Me=Math.floor((U.y-W-S)/E);Me<=Math.floor((U.y+W-S)/E);Me++)for(let qe=Math.floor((U.x-W-D)/E);qe<=Math.floor((U.x+W-D)/E);qe++){if(qe<0||Me<0||qe>=T||Me>=C)continue;let Je=0;for(let Ot=0;Ot<ie;Ot++)for(let wt=0;wt<ie;wt++){const On=Math.hypot(D+(qe+(Ot+.5)/ie)*E-U.x,S+(Me+(wt+.5)/ie)*E-U.y);On<W&&(Je+=Math.sqrt(J*J-On*On)-(J-ne))}Je>0&&z.push([Me*T+qe,Je])}V(U.v,z,U.x,U.y)}else for(const U of u){const W=Math.max(U.width/2,1e-6),ne=Math.max(1,Math.min(256,Math.ceil(4*W/E))),J=[];for(let z=0;z<ne;z++){const ie=(2*(z+.5)/ne-1)*W,Me=q(U.x-U.ty*ie,U.y+U.tx*ie);Me>=0&&J.push([Me,Math.sqrt(Math.max(0,1-(ie/W)**2))])}V(U.v,J,U.x,U.y)}let ee=0;for(let U=0;U<y;U++)ee=Math.max(ee,X[U]/P);const H=new Uint8Array(y),he=new Uint8Array(y),pe=new Int32Array(y),ve=(U,W)=>{const ne=U%T;return W[0]=ne>0?U-1:-1,W[1]=ne+1<T?U+1:-1,W[2]=U>=T?U-T:-1,W[3]=U+T<y?U+T:-1,W},Ee=[0,0,0,0],st=U=>{he.fill(0);let W=0;const ne=z=>X[z]<U*(1-1e-9)&&!H[z];for(let z=0;z<y;z++){const ie=z%T;(ie===0||ie===T-1||z<T||z>=y-T)&&ne(z)&&(he[z]=1,pe[W++]=z)}for(;W;){const z=pe[--W];for(const ie of ve(z,Ee))ie>=0&&!he[ie]&&ne(ie)&&(he[ie]=1,pe[W++]=ie)}let J=0;for(let z=0;z<y;z++)ne(z)&&!he[z]&&(H[z]=1,J++);return J};let ot=0;const Ze=new Float64Array(y),Z=new Int32Array(y).fill(-1),Q=(U,W)=>{const ne=U*P;for(let J=0;J<W;J++){const z=[];for(let ze=0;ze<y;ze++)(X[ze]>ne*(1+1e-12)||X[ze]>=ne*(1-1e-12)&&!H[ze])&&z.push(ze);let ie=0;for(const ze of z)ie+=Math.max(0,X[ze]-ne);if(ie<=1e-12*Math.max(l,1))break;const Me=z.length;z.forEach((ze,Bn)=>Z[ze]=Bn);const qe=new Int32Array(4*Me),Je=new Float64Array(Me),Ot=new Float64Array(Me),wt=[];for(let ze=0;ze<Me;ze++){const Bn=z[ze];Ot[ze]=Math.max(0,X[Bn]-ne),ve(Bn,Ee);for(let ii=0;ii<4;ii++){const Pn=Ee[ii];qe[4*ze+ii]=-1,!(Pn<0||H[Pn])&&(Je[ze]++,Z[Pn]>=0?qe[4*ze+ii]=Z[Pn]:wt.push(ze,Pn))}Je[ze]===0&&(Je[ze]=1e-9)}if(!wt.length){ot+=ie,z.forEach(ze=>Z[ze]=-1);break}const On=new Float64Array(Me);for(let ze=0;ze<Me;ze++)On[ze]=Ze[z[ze]];const yn=ty(z,qe,Je,Ot,On);Ze.fill(0);for(let ze=0;ze<Me;ze++)Ze[z[ze]]=yn[ze];let yi=0;for(let ze=0;ze<wt.length;ze+=2)yi+=Math.max(0,yn[wt[ze]]);const pr=yi>0?ie/yi:0;for(const ze of z)X[ze]=Math.min(X[ze],ne);for(let ze=0;ze<wt.length;ze+=2)X[wt[ze+1]]+=Math.max(0,yn[wt[ze]])*pr;z.forEach(ze=>Z[ze]=-1)}return ne},Se=[],ae=new Float32Array(y),oe=new Float32Array(y),Ie=(U,W)=>n.shape==="circle"?(U-n.offsetX)**2+(W-n.offsetY)**2<=(n.width/2)**2:Math.abs(U-n.offsetX)<=n.width/2&&Math.abs(W-n.offsetY)<=n.depth/2;let Fe=0;for(let U=0;U<C;U++)for(let W=0;W<T;W++){const ne=U*T+W;let J=0,z=0;for(let ie=0;ie<4;ie++)for(let Me=0;Me<4;Me++){const qe=D+(W+(Me+.5)/4)*E,Je=S+(U+(ie+.5)/4)*E;Ie(qe,Je)&&(J+=1/16),Math.abs(qe)<=t.width/2&&Math.abs(Je)<=t.depth/2&&(z+=1/16)}ae[ne]=J,oe[ne]=z,Fe+=J*P}const I=(U,W)=>{const ne=new Uint8Array(y);let J=0;for(let z=0;z<y;z++){const ie=Math.min(1,X[z]/W);ne[z]=H[z]?0:Math.round(ie*255),J+=H[z]?0:ae[z]*ie*P}Se.push({gap:U,coverage:ne,trapped:H.slice(),coveredPercent:Fe>0?J/Fe*100:0})},Ce=ee>n.gap?Math.min(80,Math.max(4,Math.ceil(Math.log(n.gap/ee)/Math.log(.93)))):1,we=n.frames>1?new Set(Array.from({length:n.frames},(U,W)=>Math.round(W*Ce/(n.frames-1)))):new Set;we.has(0)&&I(Math.max(ee,n.gap),Math.max(ee,n.gap)*P);let ye=n.gap*P;for(let U=1;U<=Ce;U++){const W=ee>n.gap?ee*(n.gap/ee)**(U/Ce):n.gap;ye=Q(W,U===Ce?60:1),st(ye),we.has(U)&&I(W,ye)}const se=new Float32Array(y),Ne=new Uint8Array(y);let ce=0,Te=0,it=0,je=0,A=0,b=0;for(let U=0;U<y;U++){const W=X[U];if(se[U]=H[U]?0:Math.min(1,W/ye),Ne[U]=H[U],ce+=ae[U]*se[U]*P,A+=se[U]*P,Te+=W*ae[U],it+=W*(1-oe[U]),je+=W,se[U]>=.5&&ae[U]<.5){const ne=F(U)-n.offsetX,J=G(U)-n.offsetY,z=n.shape==="circle"?Math.hypot(ne,J)-n.width/2:Math.hypot(Math.max(0,Math.abs(ne)-n.width/2),Math.max(0,Math.abs(J)-n.depth/2));b=Math.max(b,z)}}const k=[],K=new Uint8Array(y);for(let U=0;U<y;U++){if(!Ne[U]||K[U])continue;let W=0,ne=0,J=0,z=0,ie=0;for(K[U]=1,pe[ie++]=U;ie;){const Me=pe[--ie];W++,ne+=ae[Me],J+=F(Me),z+=G(Me);for(const qe of ve(Me,Ee))qe>=0&&Ne[qe]&&!K[qe]&&(K[qe]=1,pe[ie++]=qe)}k.push({areaMm2:W*P,inSourceMm2:ne*P,x:J/W,y:z/W})}k.sort((U,W)=>W.inSourceMm2-U.inSourceMm2||W.areaMm2-U.areaMm2);const te=Math.max(3*P,.5),j=k.filter(U=>U.inSourceMm2>1e-9&&U.areaMm2>=te-1e-9),Ue=k.filter(U=>U.areaMm2<te-1e-9).reduce((U,W)=>U+W.inSourceMm2,0),fe=j.reduce((U,W)=>U+W.inSourceMm2,0),Ae=n.shape==="circle"?Math.PI*n.width**2/4:n.width*n.depth,Pe=Ae*n.gap/1e3,le=Fe>0?ce/Fe*100:0,xe=n.gap/1e3,Be=xe/r*1e4+a,De=Ae/100,ge=le/100*De,We={conductivity:r,contactResistance:a,bondLineMm:n.gap,power:n.power,bulkImpedanceCm2:xe/r*1e4,impedanceCm2:Be,idealResistance:Be/De,resistance:ge>0?Be/ge:1/0};We.idealRise=We.idealResistance*n.power,We.rise=We.resistance*n.power;const N=["覆蓋與空洞來自平行板 Hele-Shaw 擠壓近似（牛頓流體形狀、被包圍的乾區視為夾氣不再填入）；未含屈服應力、壁滑、潤濕、壓合力與氣體壓縮，不能判定實際接觸或可靠度。","熱阻為一維估算：(間隙 ÷ 導熱率 + TDS 推算接觸熱阻) ÷ 濕潤面積；不含擴散熱阻與空洞周邊的橫向傳熱，只供方案相對比較。"];return ot>1e-9&&N.push("部分膠量被夾氣區完全包圍而無法再推出，已保留在原位；局部膜厚可能高於間隙。"),E>n.cellSize*1.001&&N.push(`為控制計算量，網格由 ${n.cellSize.toFixed(2)} mm 調整為 ${E.toFixed(2)} mm；細節精度下降。`),Math.abs(Fe-Ae)>Ae*.05&&N.push("熱源相對網格過小，熱源面積的網格取樣誤差超過 5%；請縮小工件範圍或使用更細網格，覆蓋數值不宜判讀。"),(Math.abs(n.offsetX)+n.width/2>t.width/2||Math.abs(n.offsetY)+h/2>t.depth/2)&&N.push("熱源範圍超出工件矩形參考邊界；請核對尺寸和中心偏移，匯入工件僅以包圍框近似。"),it>1e-6&&N.push("估算有材料超出工件矩形範圍；未模擬實際邊緣流失。"),fe>0&&N.push(`熱源內有 ${j.length} 處被膠包圍的夾氣區（共 ${fe.toFixed(1)} mm²）；外框、螺旋與蛇形較易發生，需透明板實測確認。`),t.workpieceKind!=="plate"&&N.push("匯入工件仍以其矩形邊界和水平上表面近似，不包含孔洞與曲面。"),t.mode==="pattern"&&N.push("膠沿規劃路徑累加；彎角、重疊與壓合輪廓為幾何近似，並非已驗證的流變模擬。"),n.gap<i.minBondLine&&N.push(`${i.name} 資料表最小黏結層厚度為 ${i.minBondLine} mm；目前目標間隙較小，須向廠商確認適用性，不代表此模型已考慮顆粒或硬接觸。`),{options:n,grid:{originX:D,originY:S,cellSize:E,cols:T,rows:C,coverage:se,sourceFraction:ae,voidMask:Ne,frames:Se,crest:ee},summary:{depositedMl:c,sourceAreaMm2:Ae,requiredMl:Pe,coveredPercent:le,idealVolumePercent:Pe>0?Math.min(100,c/Pe*100):0,volumeRatio:Pe>0?c/Pe:0,insideMl:Te/1e3,outsideMl:(je-Te)/1e3,offWorkpieceMl:it/1e3,conservationErrorMl:je/1e3-c,unresolvedMl:ot/1e3,wetAreaMm2:A,squeezeOutMm:b,voidCount:j.length,voidAreaMm2:fe,voidPercent:Ae>0?fe/Ae*100:0,largestVoidMm2:j.length?Math.max(...j.map(U=>U.inSourceMm2)):0,tinyVoidMm2:Ue,minVoidMm2:te,crestMm:ee,steps:Ce,thermal:We,material:i.name},voids:k,warnings:N,assumptions:"engineering_assumption",model:"hele_shaw_squeeze_v1"}}function iy(s,e,{iterations:t=26}={}){const n=s.mode==="point",i=n?"gateDuration":"speed";let r=n?.001:1,a=n?10:800,o=null;for(let h=0;h<t;h++){const u=Math.sqrt(r*a);let d=null;try{d=ia({...s,[i]:u})}catch{d=null}const f=d?d.summary.deposited:1/0;d&&(!o||Math.abs(f-e)<Math.abs(o.volume-e))&&(o={run:d,value:u,volume:f});const g=f>e;n===g?a=u:r=u}if(!o)throw new Error("無法在設備限制內達到目標膠量");const c=Number(o.value.toPrecision(4)),l=ia({...s,[i]:c});return{config:{...s,[i]:c},run:l,key:i,reached:Math.abs(l.summary.deposited-e)<=Math.max(1e-6,e*.03)}}const Su={line:'<path d="M4 12h16"/>',n:'<path d="M5 19V5l14 14V5"/>',serpentine:'<path d="M4 5h15a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h14a2 2 0 0 1 0 4H4"/>',spiral:'<path d="M4 4h16v16H6V7h11v10H9v-7h5v4"/>',perimeter:'<rect x="4" y="4" width="16" height="16" rx="1"/>'},Jn={line:"中心線",n:"N 形",serpentine:"蛇形",spiral:"螺旋",perimeter:"外框"},Gt=(s,e=16)=>`<svg viewBox="0 0 24 24" width="${e}" height="${e}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s}</svg>`,mt={play:Gt('<path d="M7 5v14l11-7z" fill="currentColor" stroke="none"/>'),pause:Gt('<path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none"/>'),restart:Gt('<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/>'),step:Gt('<path d="M6 5v14l9-7zM17 5v14"/>'),reset:Gt('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'),orbit:Gt('<circle cx="12" cy="12" r="3"/><path d="M12 3c5 0 9 4 9 9M12 21c-5 0-9-4-9-9"/><path d="M19 9l2 3 2-3M5 15l-2-3-2 3"/>'),cube:Gt('<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>'),sun:Gt('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:Gt('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),book:Gt('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5"/>'),help:Gt('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>'),download:Gt('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),press:Gt('<path d="M4 6h16M12 6v6M8 12h8l-2 4h-4zM4 20h16"/>'),compare:Gt('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),close:Gt('<path d="M6 6l12 12M18 6 6 18"/>')};function sy(s){return`
<header class="topbar">
  <div class="brand">
    <div class="brand-mark" aria-hidden="true"><span></span></div>
    <div><div class="eyebrow">TIM DISPENSING LAB</div><h1>TIM 點膠研究室</h1></div>
  </div>
  <div class="scenario" id="scenario" aria-label="目前情境"></div>
  <div class="top-actions">
    <span class="badge-warn" title="所有結果皆為工程假設，尚未經實機校準">工程假設 · 未校準</span>
    <button class="ghost" id="show-sources" title="參數來源與假設">${mt.book}<span>來源</span></button>
    <button class="ghost" id="help" title="使用說明">${mt.help}<span>說明</span></button>
    <button class="ghost icon-only" id="theme" title="切換深色／淺色">${mt.moon}</button>
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
          <button class="tool" id="free-orbit" aria-pressed="false" title="360° 自由旋轉">${mt.orbit}</button>
          <button class="tool" id="projection" aria-pressed="false" title="切換正交／透視">${mt.cube}<span id="projection-label">正交</span></button>
          <button class="tool" id="reset-camera" title="重設視角 (Home)">${mt.reset}</button>
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
        <button class="tool" id="press-play">${mt.play}</button>
        <input type="range" id="press-scrub" min="0" max="23" step="1" value="23" aria-label="壓合進程">
        <span id="press-gap">間隙 0.50 mm</span>
        <div class="seg small" role="group" aria-label="壓合著色"><button data-press-color="material" class="active">膠色</button><button data-press-color="front">前緣時序</button></div>
        <button class="tool" id="press-exit" title="回到點膠">${mt.close}<span>回到點膠</span></button>
      </div>
      <div class="stage-foot">
        <span id="camera-hint">拖曳平移 · 滾輪縮放 · Home 重設</span>
        <span class="scale"><i id="scale-line"></i><span id="scale-label">X 軸 10 mm</span></span>
        <span class="note" id="geometry-note">mm 真實比例 · 機構為工程示意</span>
      </div>
    </section>
    <section class="dock card" aria-label="時間軸">
      <div class="transport">
        <button id="play" class="primary">${mt.play}<span>開始試驗</span></button>
        <button id="restart" class="tool" title="回到起點">${mt.restart}</button>
        <button id="step" class="tool" title="前進 0.01 秒">${mt.step}</button>
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
<dialog id="sources-dialog" class="dialog wide"><div class="dialog-head"><h2>參數來源與假設</h2><button data-close class="ghost">${mt.close}</button></div><p class="muted">「v1.0 更新」為本次查證後替換或新增的值；研究原檔 v0.3 不變。所有項目目前均未經實機驗證。</p><div class="table-scroll"><table><thead><tr><th>參數</th><th>值</th><th>類型</th><th>依據與出處</th></tr></thead><tbody id="source-rows"></tbody></table></div></dialog>
<dialog id="compare-dialog" class="dialog wide"><div class="dialog-head"><h2>熱源圖樣比較</h2><button data-close class="ghost">${mt.close}</button></div><div id="compare-body"></div></dialog>
<dialog id="help-dialog" class="dialog"><div class="dialog-head"><h2>使用說明</h2><button data-close class="ghost">${mt.close}</button></div><div id="help-body"></div></dialog>
<div id="toast" role="status"></div>`}const Xs=1e3,os=150,ui=52,qr=14,ho=12,jr=26,Eu={q:{label:"出口流量",unit:"mL/s",key:"q",digits:3},output:{label:"累積出膠",unit:"mL",key:"output",digits:3},speed:{label:"移動速度",unit:"mm/s",key:"speed",digits:0},z:{label:"針嘴高度",unit:"mm",key:"z",digits:1}};function Sh(s){if(!(s>0))return 1;const e=10**Math.floor(Math.log10(s));for(const t of[1,1.2,1.5,2,2.5,3,4,5,6,8,10])if(t*e>=s)return t*e;return 10*e}function ry(s,e,t,n,i){var S;const r=Eu[t],a=e.frames,o=a.map(y=>y[r.key]),c=t==="q"?[e.Q]:[],l=((S=i==null?void 0:i.frames)==null?void 0:S.map(y=>y[r.key]))||[],h=Sh(Math.max(1e-6,...o,...c,...l)*1.05),u=t==="z"?Math.max(0,Math.min(...o)-1):0,d=Math.max(e.duration,(i==null?void 0:i.duration)||0),f=y=>ui+y/d*(Xs-ui-qr),g=y=>os-jr-(y-u)/(h-u)*(os-jr-ho),_=Math.max(1,Math.floor(a.length/900)),m=y=>y.filter((P,F)=>F%_===0||F===y.length-1).map((P,F)=>`${F?"L":"M"}${f(P.t).toFixed(1)},${g(P[r.key]).toFixed(1)}`).join(""),p=m(a),x=[0,.25,.5,.75,1].map(y=>{const P=u+(h-u)*y;return`<line class="grid" x1="${ui}" x2="${Xs-qr}" y1="${g(P)}" y2="${g(P)}"/><text class="tick" x="${ui-8}" y="${g(P)+4}" text-anchor="end">${P.toFixed(r.digits===0?0:h<1?2:1)}</text>`}).join(""),M=[],v=Sh(d/6);for(let y=0;y<=d+1e-9;y+=v)M.push(`<text class="tick" x="${f(y)}" y="${os-8}" text-anchor="middle">${+y.toFixed(2)}s</text>`);const E=e.ending,T=[["off",E.commandOff,"關膠"],["arrive",E.movementEnd,"到位"],["lift",E.liftStart,"抬針"],["exit",E.motionEnd,"退離完成"]].filter(([,y])=>Number.isFinite(y)).map(([y,P,F])=>`<line class="marker ${y}" x1="${f(P)}" x2="${f(P)}" y1="${ho}" y2="${os-jr}"><title>${F} ${P.toFixed(3)} s</title></line>`).join(""),C=t==="q"?`<path class="command" d="M${ui},${g(e.Q)} H${f(E.commandOff)} V${g(0)} H${Xs-qr}"/>`:"",D=i?`<path class="baseline" d="${m(i.frames)}"/>`:"";return s.setAttribute("viewBox",`0 0 ${Xs} ${os}`),s.innerHTML=x+M.join("")+T+D+`<path class="area" d="${p} L${f(a.at(-1).t)},${g(u)} L${ui},${g(u)} Z"/><path class="series" d="${p}"/>`+C+`<line class="cursor" id="chart-cursor" x1="${f(n)}" x2="${f(n)}" y1="${ho-4}" y2="${os-jr}"/>`,{x:f,duration:d,toTime:y=>(y-ui)/(Xs-ui-qr)*d}}function ay(s,e,t){const n=s.querySelector("#chart-cursor");if(n&&e){const i=e.x(t);n.setAttribute("x1",i),n.setAttribute("x2",i)}}const re=(s,e=document)=>e.querySelector(s),zt=(s,e=document)=>[...e.querySelectorAll(s)],Lt=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),de=(s,e=3)=>Number.isFinite(s)?Number(s).toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e}):"—",oy=s=>Number.isFinite(s)?+Number(s).toPrecision(6):s,wu=.0689475729,Tu={get(s){try{return localStorage.getItem(s)}catch{return null}},set(s,e){try{localStorage.setItem(s,e)}catch{}}},cc=["pressure","rpm","efficiency","delay","tauOn","tauOff","fill","residual","referenceRate","pressureExponent","viscosity","hoseId","hoseLength","reverseRpm","reverseDuration","density"],Au=()=>({shape:"rectangle",width:30,depth:30,offsetX:0,offsetY:0,gap:$c(Nn,"assembly.gap"),cellSize:.5,power:$c(Nn,"thermal.power")}),Ru=()=>({pattern:"n",spacing:5,edgeInset:2,spiralShape:"auto",spiralDirection:"outside-in"}),L={config:null,run:null,frame:null,time:0,playing:!1,clock:null,tab:"equipment",chartType:"q",chart:null,pressureUnit:"psi",heat:Au(),pattern:Ru(),overrides:new Map,baseline:null,press:null,pressBaseline:null,pressAnim:null,tuneFactor:1.2,compare:null,busy:!1};re("#app").innerHTML=sy(cr);const kc=Tu.get("tim-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=kc;function tn(s,e=""){const t=re("#toast");t.textContent=s,t.className=`visible ${e}`,clearTimeout(tn.timer),tn.timer=setTimeout(()=>t.className="",4200)}let Ge;try{Ge=new Jx(re("#viewport"),{onScale(s,e){const t=[.5,1,2,5,10,20,50,100,200,500].find(n=>s*n/10>=36)??500;re("#scale-line").style.width=`${Math.min(110,s*t/10)}px`,re("#scale-label").textContent=`X 軸 ${t} mm`,re("#scale-line").style.transform=`rotate(${e>90?e-180:e<-90?e+180:e}deg)`},onView:()=>fr()}),Ge.setTheme(kc)}catch(s){throw re("#viewport").innerHTML='<div class="webgl-error">無法啟動 3D 顯示，請使用啟用硬體加速的桌面瀏覽器。</div>',s}let Ii=null,cy=0;const lc=new Map;try{Ii=new Worker(new URL("/assets/compute-worker-CwCvuiLh.js",import.meta.url),{type:"module"}),Ii.onmessage=({data:s})=>{var t;const e=lc.get(s.id);if(e){if(s.progress!==void 0)return(t=e.progress)==null?void 0:t.call(e,s.progress,s.label);lc.delete(s.id),s.ok?e.resolve(s.result):e.reject(new Error(s.error))}},Ii.onerror=()=>Ii=null}catch{Ii=null}const ly=s=>({config:s.config,summary:{deposits:s.summary.deposits},path:s.path,gridStart:s.gridStart,cellLength:s.cellLength,maxHeight:s.maxHeight});function Cu(s,e,t){return Ii?new Promise((n,i)=>{const r=++cy;lc.set(r,{resolve:n,reject:i,progress:t}),Ii.postMessage({id:r,type:s,payload:e})}):new Promise((n,i)=>setTimeout(()=>{try{s==="compress"?n(ny(e.run,{...e.heat,frames:e.frames})):i(new Error("此瀏覽器不支援背景計算，無法執行圖樣比較"))}catch(r){i(r)}},30))}const ws=()=>L.config.architecture==="P300",Pu=()=>({shape:L.heat.shape,width:L.heat.width,depth:L.heat.depth,offsetX:L.heat.offsetX,offsetY:L.heat.offsetY,pattern:L.pattern.pattern,spacing:L.pattern.spacing,edgeInset:L.pattern.edgeInset,spiralShape:L.pattern.spiralShape,spiralDirection:L.pattern.spiralDirection});function Lu(s){const e={...s,surfaceZ:s.fixtureHeight+s.thickness};return e.mode==="pattern"?e.pathSettings=Pu():delete e.pathSettings,e}function Du(s="putty",e="R75"){return Lu({...Ah(Nn,s,e),mode:"pattern"})}function on(s,{silent:e=!1}={}){try{const t=Lu(s),n=ia(t);return L.config=t,L.overrides.set(t.profile,Object.fromEntries(cc.map(i=>[i,t[i]]))),Iu(n),!0}catch(t){return e||tn(t.message,"error"),Ui(),!1}}function hy(s,e){const t=Ah(Nn,s,e),n=L.overrides.get(t.profile)||{},i=Object.fromEntries(Object.entries(L.config).filter(([a])=>!cc.includes(a)&&!["material","architecture","profile"].includes(a))),r={...t,...i,...Object.fromEntries(cc.map(a=>[a,n[a]??t[a]]))};r.material=s,r.architecture=e,r.profile=t.profile,on(r)||(re("#sel-material")&&(re("#sel-material").value=L.config.material),re("#sel-arch")&&(re("#sel-arch").value=L.config.architecture))}const uy={tds:["TDS","tag-tds"],derived:["推導","tag-derived"],ai:["AI 初估","tag-ai"],geo:["幾何","tag-geo"],spec:["原廠","tag-tds"]};function $e({bind:s,label:e,value:t,unit:n="",min:i,max:r,tag:a,hint:o,disabled:c,step:l="any"}){const[h,u]=uy[a]||[a,"tag-ai"];return`<label class="field${c?" disabled":""}"><span class="lbl">${e}${a?`<em class="tag ${u}">${h}</em>`:""}</span><span class="input"><input type="number" data-bind="${s}" value="${oy(t)}" min="${i}" max="${r}" step="${l}" ${c?"disabled":""} aria-label="${Lt(e)}"><b>${n}</b></span>${o?`<small>${o}</small>`:""}</label>`}function Ni({bind:s,id:e,label:t,value:n,options:i,hint:r}){return`<label class="field"><span class="lbl">${t}</span><select ${s?`data-bind="${s}"`:""} ${e?`id="${e}"`:""}>${i.map(([a,o])=>`<option value="${a}" ${String(a)===String(n)?"selected":""}>${o}</option>`).join("")}</select>${r?`<small>${r}</small>`:""}</label>`}const Qn=(s,e,{open:t=!0,note:n}={})=>`<details class="group" ${t?"open":""}><summary>${s}</summary><div class="group-body">${e}${n?`<p class="note">${n}</p>`:""}</div></details>`;function dy(){const s=L.config,e=ws(),t=$t[s.material],n=e?"理想容積計量":s.material==="putty"?"TDS 參考點 × 冪律管流":"常黏度 Poiseuille 圓管",i=e?`每轉 ${s.displacement} mL × 轉速 × 效率；滿腔與起停時間為假設。`:s.material==="putty"?`90 psi 時 75 g/min（TDS）；壓力冪次 m=${s.pressureExponent} 取自 Laird 點膠指南曲線形狀。Q ∝ P^m · d^(3+m) / L^m。`:"黏度 2,500,000 cP（TDS，Brookfield 2 rpm）暫作常數，不代表完整流變。",r=L.run?L.run.Q:0;return`
  <div class="pair">
    ${Ni({id:"sel-material",label:"膠材",value:s.material,options:[["putty","Laird Tputty 910"],["grease","Laird Tgrease 2500"]]})}
    ${Ni({id:"sel-arch",label:"出膠架構",value:s.architecture,options:[["R75","R75 氣壓 75cc"],["P300","P300 PCP"]]})}
  </div>
  <div class="material-card" style="--glue:#${t.color.toString(16).padStart(6,"0")}">
    <i></i><div><b>${t.name}</b><span>${t.kind}</span><span>k ${t.conductivity} W/m·K · 最小 BLT ${t.minBondLine*1e3} µm · ${t.density} g/cc · ${t.colorName}</span></div>
  </div>
  <div class="method"><span>${n}</span><strong>${de(r,3)} <small>mL/s 穩態</small></strong><p>${i}</p></div>
  ${Qn("驅動與針嘴",(e?$e({bind:"c.rpm",label:"計量軸轉速",value:s.rpm,unit:"rpm",min:0,max:300,tag:"ai"})+$e({bind:"c.efficiency",label:"容積效率",value:s.efficiency,unit:"",min:0,max:1,tag:"ai"}):`<div class="with-btn">${$e({bind:"c.pressure",label:"驅動表壓",value:L.pressureUnit==="bar"?s.pressure*wu:s.pressure,unit:L.pressureUnit,min:0,max:L.pressureUnit==="bar"?6.89475729:100,tag:"ai",hint:"控制器上限 100 psi（Performus X100 額定）"})}<button class="chip-btn" id="pressure-unit">${L.pressureUnit==="psi"?"bar":"psi"}</button></div>`)+$e({bind:"c.diameter",label:"虛擬針嘴內徑",value:s.diameter,unit:"mm",min:.2,max:8,tag:"geo",hint:e?"只影響持膠量與外觀":"0.125 in = 3.175 mm（指南曲線用嘴）"})+$e({bind:"c.nozzleLength",label:"等效直管長",value:s.nozzleLength,unit:"mm",min:1,max:100,tag:"ai",hint:e?"只影響持膠量":"流量基準長度，非針嘴總長"}))}
  ${Qn("響應與材料模型",$e({bind:"c.delay",label:"起膠延遲",value:s.delay,unit:"s",min:0,max:2,tag:"ai"})+$e({bind:"c.tauOn",label:e?"起停時間常數":"上升時間常數",value:s.tauOn,unit:"s",min:.001,max:2,tag:"ai"})+(e?"":$e({bind:"c.tauOff",label:"卸壓下降時間常數",value:s.tauOff,unit:"s",min:.001,max:2,tag:"ai"}))+(!e&&s.material==="putty"?$e({bind:"c.pressureExponent",label:"壓力冪次 m",value:s.pressureExponent,unit:"",min:.1,max:4,tag:"derived",hint:"指南曲線 20–100 psi 擬合 2.73；設 1 回到 v0.x 線性"})+$e({bind:"c.referenceRate",label:"90 psi 參考流率",value:s.referenceRate,unit:"mL/s",min:0,max:10,tag:"tds",hint:"75 g/min ÷ 3.2 g/cc；指南圖讀約 75 cc/min，單位待 Laird 確認"}):"")+(!e&&s.material==="grease"?$e({bind:"c.viscosity",label:"等效黏度",value:s.viscosity,unit:"Pa·s",min:1,max:1e5,tag:"tds"}):""),{open:!1,note:"起停常數為 AI 初估；未含溫度效應（指南：低於 23 °C 流率下降，60–80 °C 加熱可改善）。"})}
  ${Qn("膠筒與預填管路",$e({bind:"c.fill",label:"膠筒初始裝填",value:s.fill,unit:"mL",min:s.residual,max:e?300:75,tag:s.material==="putty"?"tds":"ai",hint:s.material==="putty"?e?"300cc 鋁筒裝填 300 cc（960 g）":"75cc EFD 裝填 56 cc（179 g）":`Tgrease 實際包材：${$t.grease.packaging}`})+$e({bind:"c.residual",label:"不可用殘量",value:s.residual,unit:"mL",min:0,max:s.fill,tag:"ai"})+(e?$e({bind:"c.hoseId",label:"供料管內徑",value:s.hoseId,unit:"mm",min:1,max:25,tag:"ai"})+$e({bind:"c.hoseLength",label:"供料管長",value:s.hoseLength,unit:"mm",min:0,max:5e3,tag:"ai"}):""),{open:!1,note:e?"管路已預填，只計入持膠量；未求解壓降。畫面管路為示意。":"氣室與氣管未分開求解；畫面氣管與控制器為示意。"})}`}function fy(){var r;const s=L.heat,t=(s.shape==="circle"?Math.PI*s.width**2/4:s.width*s.depth)*s.gap/1e3,n=((r=L.run)==null?void 0:r.summary.deposited)??0,i=t>0?n/t:0;return`
  <p class="lead">熱源（元件接觸面）設定同時決定「依熱源」路徑與壓合／熱阻估算。偏移以工件中心為原點。</p>
  ${Ni({bind:"h.shape",label:"熱源形狀",value:s.shape,options:[["rectangle","矩形"],["circle","圓形"]]})}
  <div class="pair">
    ${$e({bind:"h.width",label:s.shape==="circle"?"直徑":"長 X",value:s.width,unit:"mm",min:1,max:500,tag:"ai"})}
    ${s.shape==="circle"?"":$e({bind:"h.depth",label:"寬 Y",value:s.depth,unit:"mm",min:1,max:500,tag:"ai"})}
  </div>
  <div class="pair">
    ${$e({bind:"h.offsetX",label:"中心 X",value:s.offsetX,unit:"mm",min:-500,max:500})}
    ${$e({bind:"h.offsetY",label:"中心 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}
  </div>
  <div class="pair">
    ${$e({bind:"h.gap",label:"組裝間隙 BLT",value:s.gap,unit:"mm",min:.02,max:10,tag:"ai",hint:`${$t[L.config.material].name} 最小 ${$t[L.config.material].minBondLine} mm`})}
    ${$e({bind:"h.power",label:"元件功耗",value:s.power,unit:"W",min:0,max:1e4,tag:"ai"})}
  </div>
  <div class="volume-meter ${i<1?"low":i>1.6?"high":"ok"}">
    <div><span>熱源間隙體積</span><b>${de(t,3)} mL</b></div>
    <div><span>目前沉積</span><b>${de(n,3)} mL</b></div>
    <div><span>比值</span><b>${de(i,2)}×</b></div>
    <i style="--w:${Math.min(100,i/2*100)}%"></i><em class="tick1"></em>
  </div>
  <div class="tune">
    ${$e({bind:"x.tuneFactor",label:"目標膠量係數",value:L.tuneFactor,unit:"× 間隙體積",min:.3,max:5,tag:"ai",hint:"考慮溢膠與夾氣的餘量；1.2 為比較起點"})}
    <button class="secondary" id="tune">${L.config.mode==="point"?"自動調整開膠時間":"自動調整移動速度"}</button>
  </div>
  <div class="actions">
    <button class="primary" id="press">${mt.press}<span>模擬壓合</span></button>
    <button class="secondary" id="compare">${mt.compare}<span>比較所有圖樣</span></button>
  </div>
  ${Qn("估算網格",$e({bind:"h.cellSize",label:"網格解析度",value:s.cellSize,unit:"mm",min:.2,max:5,tag:"ai",hint:"越小越細，計算時間增加；上限 90,000 格"}),{open:!1})}
  <p class="note">壓合採平行板 Hele-Shaw 擠壓近似：被膠包圍的乾區視為夾氣。熱阻 =（間隙 ÷ k + TDS 推算接觸熱阻）÷ 濕潤面積。皆未經透明板實測校準。</p>`}function py(){var i,r,a;const s=L.config,e=L.pattern;let n=`<div class="seg full" role="group" aria-label="路徑模式">${[["pattern","依熱源"],["line","直線"],["point","單點"]].map(([o,c])=>`<button data-mode="${o}" class="${s.mode===o?"active":""}">${c}</button>`).join("")}</div>`;return s.mode==="pattern"?(n+=`<div class="patterns">${Object.keys(Jn).map(o=>`<button data-pattern="${o}" class="${e.pattern===o?"active":""}" title="${Jn[o]}"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${Su[o]}</svg><span>${Jn[o]}</span></button>`).join("")}</div>`,e.pattern==="spiral"&&(n+=`<div class="pair">${Ni({bind:"p.spiralShape",label:"螺旋形狀",value:e.spiralShape,options:[["auto","依熱源"],["square","方形"],["round","圓形"]]})}${Ni({bind:"p.spiralDirection",label:"起點",value:e.spiralDirection,options:[["outside-in","外向內"],["inside-out","中心向外"]]})}</div>`),n+=`<div class="pair">${$e({bind:"p.spacing",label:"路徑間距",value:e.spacing,unit:"mm",min:.2,max:1e3,tag:"ai"})}${$e({bind:"p.edgeInset",label:"邊界內縮",value:e.edgeInset,unit:"mm",min:0,max:500,tag:"ai"})}</div>`,n+=`<p class="note">路徑長 ${de((i=L.run)==null?void 0:i.pathLength,1)} mm${(a=(r=L.run)==null?void 0:r.motion)!=null&&a.corners?` · ${L.run.motion.corners} 個減速轉角（最低 ${de(L.run.motion.slowestCorner,1)} mm/s）`:""}。內縮只限制針尖中心；Laird／Parker 指南提醒蛇形、螺旋、外框較易夾氣。</p>`):s.mode==="line"?n+=`<div class="pair">${$e({bind:"c.lineLength",label:"路徑長度",value:s.lineLength,unit:"mm",min:1,max:250,tag:"ai"})}${$e({bind:"c.offsetX",label:"中心 X",value:s.offsetX,unit:"mm",min:-500,max:500})}</div>${$e({bind:"c.offsetY",label:"中心 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}`:n+=`${$e({bind:"c.gateDuration",label:"開膠時間",value:s.gateDuration,unit:"s",min:.001,max:10,tag:"ai"})}<div class="pair">${$e({bind:"c.offsetX",label:"點位 X",value:s.offsetX,unit:"mm",min:-500,max:500})}${$e({bind:"c.offsetY",label:"點位 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}</div>`,s.mode!=="point"&&(n+=Qn("運動",`<div class="pair">${$e({bind:"c.speed",label:"設定速度",value:s.speed,unit:"mm/s",min:1,max:800,tag:"ai"})}${$e({bind:"c.acceleration",label:"加速度",value:s.acceleration,unit:"mm/s²",min:1,max:1e4,tag:"ai"})}</div>`+(s.mode==="pattern"?Ni({bind:"c.cornerMode",label:"轉角速度",value:s.cornerMode,options:[["junction","依轉角減速（junction deviation）"],["off","不減速（v0.7 對照）"]]})+(s.cornerMode==="junction"?$e({bind:"c.junctionDeviation",label:"轉角偏差",value:s.junctionDeviation,unit:"mm",min:.001,max:5,tag:"ai",hint:"越小轉角越慢、轉角積膠越多"}):""):""))),n+=$e({bind:"c.standoff",label:"針嘴離面高度",value:s.standoff,unit:"mm",min:.1,max:20,tag:"ai",hint:"只做間距／干涉提示"}),n}function my(){const s=L.config,e=ws();let t="";return s.mode!=="point"&&(t+=Qn("提前關膠",$e({bind:"c.shutoffDistance",label:"終點前關膠距離",value:s.shutoffDistance,unit:"mm",min:0,max:250,tag:"ai"})+`<div class="seg full presets"><button data-shutoff="0">未補償 0 mm</button><button data-shutoff="${Qs.value}">初估 ${Qs.value} mm</button></div>`,{note:"先關膠、針嘴繼續走到終點；距離依當前加減速曲線換算成時間。提前過多會欠膠。"})),t+=Qn("退離動作",Ni({bind:"c.endMotion",label:"退離方式",value:s.endMotion,options:[["vertical","垂直抬針"],["diagonal","邊升邊回退"],["liftThenBack","先抬高再回退"],["legacy","v0.2 尾膠結算後抬針（對照）"]]})+(s.endMotion==="legacy"?"":`<div class="with-btn">${$e({bind:"c.endDwell",label:"終點停留",value:s.endDwell,unit:"s",min:0,max:5,tag:"ai"})}<button class="chip-btn" data-dwell="0.3" title="Laird 910 指南：小點黏針時，移動前加 0.3–0.5 s 等待">指南 0.3 s</button></div>`)+`<div class="pair">${$e({bind:"c.liftSpeed",label:"抬針速度",value:s.liftSpeed,unit:"mm/s",min:.1,max:200,tag:"ai"})}${$e({bind:"c.liftDistance",label:"抬針高度",value:s.liftDistance,unit:"mm",min:.1,max:50,tag:"ai"})}</div>`+(["diagonal","liftThenBack"].includes(s.endMotion)&&s.mode!=="point"?`<div class="pair">${$e({bind:"c.backtrackDistance",label:"回退距離",value:s.backtrackDistance,unit:"mm",min:0,max:50,tag:"ai"})}${$e({bind:"c.backtrackSpeed",label:"回退速度",value:s.backtrackSpeed,unit:"mm/s",min:.1,max:200,tag:"ai"})}</div>`:""),{note:"Laird 910 指南建議小點黏針時「先左右移動再抬起」並停留 0.3–0.5 s；本模型只改軌跡與時序，不預測拉絲與落點。"}),t+=e?Qn("PCP 反轉回吸",`<div class="pair">${$e({bind:"c.reverseDuration",label:"反轉時間",value:s.reverseDuration,unit:"s",min:0,max:2,tag:"ai",hint:"0 = 停用"})}${$e({bind:"c.reverseRpm",label:"反轉轉速",value:s.reverseRpm,unit:"rpm",min:0,max:300,tag:"ai"})}</div><button class="chip-btn wide" id="reverse-example">套用比較值 30 rpm / 0.05 s</button>`,{note:"只回收未出嘴的暫存量並獨立記帳；不吸回工件上的膠，未求解負壓或斷絲。"}):'<p class="note">氣壓式關閉後以「卸壓下降時間常數」近似；不提供螺桿反轉。</p>',t}function gy(){var t;const s=L.config,e=s.workpieceKind!=="plate";return`
  <div class="pair">${$e({bind:"c.width",label:"工件長 X",value:s.width,unit:"mm",min:1,max:1e3,tag:"geo",disabled:e})}${$e({bind:"c.depth",label:"工件寬 Y",value:s.depth,unit:"mm",min:1,max:1e3,tag:"geo",disabled:e})}</div>
  <div class="pair">${$e({bind:"c.thickness",label:"厚度",value:s.thickness,unit:"mm",min:.1,max:200,tag:"geo",disabled:e})}${$e({bind:"c.fixtureHeight",label:"治具支承高度",value:s.fixtureHeight,unit:"mm",min:0,max:100,tag:"ai"})}</div>
  ${Qn("匯入工件",`<div class="pair"><label class="field"><span class="lbl">STL 單位</span><select id="import-unit"><option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option><option value="inch">inch</option></select></label><label class="field"><span class="lbl">STL 向上</span><select id="import-up"><option>Z</option><option>Y</option></select></label></div>
    <label class="file-button">載入 STL / GLB / glTF<input id="workpiece-file" type="file" accept=".stl,.glb,.gltf"></label>
    ${e?`<p class="note">${Lt(((t=s.workpieceFile)==null?void 0:t.name)||"")} · ${de(s.width,2)} × ${de(s.depth,2)} × ${de(s.thickness,2)} mm</p><button class="chip-btn wide" id="clear-workpiece">恢復虛擬平板</button>`:""}`,{open:e,note:"GLB／glTF 依規格以 m、Y 向上換算；STL 需指定單位與上方向。點膠面取上方水平參考面，未處理孔洞、曲面與碰撞。"})}
  <p class="note">預設 150 × 100 × 5 mm 為虛擬壓鑄鋁平板（示意 RRU 腔體一角），非客戶工件。</p>`}const _y={equipment:dy,heat:fy,path:py,ending:my,workpiece:gy};function Ui(){const s=re("#tab-body"),e=s.scrollTop,t=zt("details.group",s).map(n=>n.open);s.innerHTML=_y[L.tab](),zt("details.group",s).forEach((n,i)=>t[i]!==void 0&&(n.open=t[i])),s.scrollTop=e,zt("[data-tab]").forEach(n=>{n.classList.toggle("active",n.dataset.tab===L.tab),n.setAttribute("aria-selected",n.dataset.tab===L.tab)}),yy()}zt("[data-tab]").forEach(s=>s.addEventListener("click",()=>{L.tab=s.dataset.tab,re("#tab-body").scrollTop=0,Ui()}));re("#tab-body").addEventListener("change",s=>{const e=s.target;if(e.id==="sel-material"||e.id==="sel-arch")return hy(re("#sel-material").value,re("#sel-arch").value);if(e.id==="workpiece-file")return xy(e);const t=e.dataset.bind;if(!t)return;const[n,i]=t.split(".");let r=e.value;if(e.type==="number"){if(!e.value.trim()||!e.checkValidity())return tn("請輸入欄位範圍內的數值","error"),Ui();r=Number(e.value)}if(n==="x"){L.tuneFactor=r;return}if(n==="c"){i==="pressure"&&L.pressureUnit==="bar"&&(r/=wu);const c={...L.config,[i]:r};return i==="tauOn"&&ws()&&(c.tauOff=r),on(c)}const a=n==="h"?"heat":"pattern",o=L[a];if(L[a]={...o,[i]:r},n==="h"&&["gap","cellSize","power"].includes(i))return Sy(),Ui();on(L.config)||(L[a]=o,Ui())});re("#tab-body").addEventListener("click",s=>{const e=s.target.closest("button");if(e){if(e.dataset.mode)return on({...L.config,mode:e.dataset.mode});if(e.dataset.pattern){const t=L.pattern;L.pattern={...L.pattern,pattern:e.dataset.pattern},on(L.config)||(L.pattern=t);return}if(e.dataset.shutoff!==void 0)return on({...L.config,shutoffDistance:Number(e.dataset.shutoff)});if(e.dataset.dwell!==void 0)return on({...L.config,endDwell:Number(e.dataset.dwell)});switch(e.id){case"pressure-unit":return L.pressureUnit=L.pressureUnit==="psi"?"bar":"psi",Ui();case"reverse-example":return on({...L.config,reverseRpm:30,reverseDuration:.05});case"tune":return vy();case"press":return Fu();case"compare":return Vc();case"clear-workpiece":return Ge.clearImport(),on({...L.config,width:150,depth:100,thickness:5,workpieceKind:"plate",workpieceFile:null})}}});function vy(){const s=L.heat,t=(s.shape==="circle"?Math.PI*s.width**2/4:s.width*s.depth)*s.gap/1e3*L.tuneFactor;try{const n=iy(L.config,t);on(n.config),tn(n.reached?`已調整${n.key==="speed"?`移動速度為 ${de(n.config.speed,1)} mm/s`:`開膠時間為 ${de(n.config.gateDuration,3)} s`}，沉積 ${de(L.run.summary.deposited,3)} mL（目標 ${de(t,3)}）`:`已達設備限制，最接近 ${de(L.run.summary.deposited,3)} mL（目標 ${de(t,3)}）；請改壓力、轉速或圖樣`,n.reached?"ok":"error")}catch(n){tn(n.message,"error")}}async function xy(s){const e=s.files[0];if(e){L.playing=!1;try{const t=await Ge.importFile(e,re("#import-unit").value,re("#import-up").value);on({...L.config,...t})&&tn("工件已載入。請核對尺寸；點膠使用上方水平參考面。","ok")}catch(t){tn(t.message,"error")}s.value=""}}re("#defaults").onclick=()=>{Ge.clearImport(),L.heat=Au(),L.pattern=Ru(),L.overrides.delete(L.config.profile),on(Du(L.config.material,L.config.architecture)),tn("已恢復此情境的研究預設")};function Iu(s){ni(!1),L.playing=!1,L.time=0,L.run=s,L.frame=s.frames[0],Ge.rebuild({...L.config,heatSource:{...L.heat}},s),Ge.setOverlayVisibility({heatSource:re("#show-heat").checked,exitPath:re("#show-exit").checked,plannedPath:re("#show-planned").checked}),re("[data-view=feed]").disabled=!ws(),re("#scrubber").max=String(Math.ceil(s.duration*1e3)),My(),zc(),Ui(),Ts(),xn(),fr()}function yy(){const s=L.config,e=s.mode==="pattern"?`依熱源 · ${Jn[L.pattern.pattern]}`:s.mode==="line"?"直線":"單點",t=s.architecture==="P300"?`${de(s.rpm,0)} rpm`:`${de(s.pressure,0)} psi`;re("#scenario").innerHTML=[$t[s.material].name,s.architecture==="P300"?"P300 PCP":"R75 氣壓",e,t,s.mode==="point"?`${de(s.gateDuration,2)} s`:`${de(s.speed,0)} mm/s`].map((n,i)=>`<span class="${i===0?"glue-chip":""}" ${i===0?`style="--glue:#${$t[s.material].color.toString(16).padStart(6,"0")}"`:""}>${Lt(n)}</span>`).join("")}function My(){const s=L.run,e=s.ending;re("#marks").innerHTML=[["off",e.commandOff,"關膠"],["arrive",e.movementEnd,"到位"],["lift",e.liftStart,"抬針"],["exit",e.motionEnd,"退離"]].map(([t,n,i])=>`<button class="mark ${t}" style="left:${n/s.duration*100}%" data-seek="${n}" title="${i} ${de(n,3)} s"><span>${i}</span></button>`).join("")}re("#marks").addEventListener("click",s=>{const e=s.target.closest("[data-seek]");e&&(ni(),L.playing=!1,L.time=Math.min(L.run.duration,Number(e.dataset.seek)+1e-6),xn())});function zc(){var s;L.chart=ry(re("#chart"),L.run,L.chartType,L.time,(s=L.baseline)!=null&&s.run&&L.baseline.run.frames?L.baseline.run:null),re("#chart-unit").textContent=Eu[L.chartType].unit,re("#legend-command").hidden=L.chartType!=="q",re("#legend-base").hidden=!L.baseline}zt("[data-chart]").forEach(s=>s.addEventListener("click",()=>{L.chartType=s.dataset.chart,zt("[data-chart]").forEach(e=>e.classList.toggle("active",e===s)),zc()}));re("#chart").addEventListener("click",s=>{const e=re("#chart").getBoundingClientRect(),t=L.chart.toTime((s.clientX-e.left)/e.width*1e3);ni(),L.playing=!1,L.time=Math.max(0,Math.min(L.run.duration,t)),xn()});function di(s,e,t,n="",i=""){return`<div class="kpi ${i}"><span>${s}</span><b>${e}<small>${t}</small></b>${n?`<em>${n}</em>`:""}</div>`}function Ts(){var f,g;const s=L.run,e=L.config,t=s.summary,n=s.ending,i=L.heat,a=(i.shape==="circle"?Math.PI*i.width**2/4:i.width*i.depth)*i.gap/1e3,o=(f=L.press)==null?void 0:f.result.summary,c=(g=L.press)==null?void 0:g.stale,l=n.endToMiddleRatio,h=_=>_>=95?"good":_>=80?"warn":"bad",u=_=>{const p=2*Math.PI*34;return`<svg viewBox="0 0 84 84" class="ring ${h(_)}"><circle cx="42" cy="42" r="34" class="track"/><circle cx="42" cy="42" r="34" class="val" stroke-dasharray="${Math.min(100,_)/100*p} ${p}" transform="rotate(-90 42 42)"/><text x="42" y="46" text-anchor="middle">${de(_,1)}%</text></svg>`},d=[...s.warnings,...L.press&&!c?L.press.result.warnings:[]];re("#results").innerHTML=`
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">完整試驗預估</span><span class="pill">${Lt(e.profile)}</span></div>
    <div class="hero"><b>${de(t.deposited,3)}</b><span>mL 工件沉積</span><em>${de(t.deposited*e.density,3)} g · 出口總計 ${de(t.output,3)} mL</em></div>
    <div class="kpis">
      ${di("熱源需求比",de(a>0?t.deposited/a:0,2),"×",`需 ${de(a,3)} mL`,a>0&&t.deposited/a<1?"bad":"")}
      ${di("開膠時間",de(s.gate,2),"s",`動作完成 ${de(n.motionEnd,2)} s`)}
      ${di("膠高 / 寬",`${de(t.maxHeight,2)} / ${de(t.maxWidth,1)}`,"mm",`針距 ${de(e.standoff,1)} mm`,t.maxHeight>e.standoff?"warn":"")}
      ${di("末段 / 中段",l===null?"—":de(l,2),"×","0.5–1.5 為 AI 比較帶",l!==null&&(l<.5||l>1.5)?"warn":"")}
    </div>
  </section>
  <section class="card-sec press-sec">
    <div class="sec-head"><span class="eyebrow">壓合 · 熱阻估算</span>${L.press?`<span class="pill ${c?"pill-warn":""}">${c?"設定已變更":`間隙 ${de(L.press.settings.gap,2)} mm`}</span>`:""}</div>
    ${o&&!c?`<div class="press-grid">${u(o.coveredPercent)}<div class="press-sum"><b>熱源等效覆蓋</b><span>沉積 ${de(o.depositedMl,3)} mL = 間隙體積 ${de(o.volumeRatio,2)}×</span><span>${Lt(o.material)} · k ${o.thermal.conductivity} W/m·K</span></div></div><div class="kpis">
          ${di("夾氣區",o.voidCount,"處",o.voidCount?`${de(o.voidAreaMm2,1)} mm² · ${de(o.voidPercent,1)}%`:"未偵測到",o.voidCount?"bad":"good")}
          ${di("溢出熱源",de(o.squeezeOutMm,1),"mm",`熱源外 ${de(o.outsideMl,3)} mL`,o.squeezeOutMm>3?"warn":"")}
          ${di("TIM 溫升",de(o.thermal.rise,2),"°C",`滿覆蓋 ${de(o.thermal.idealRise,2)} °C @ ${de(o.thermal.power,0)} W`,o.thermal.rise>o.thermal.idealRise*1.1?"warn":"")}
          ${di("熱阻",de(o.thermal.resistance,4),"K/W",`θ ${de(o.thermal.impedanceCm2,3)} °C·cm²/W`)}
        </div>
        <div class="press-actions"><button class="chip-btn" id="press-replay">${mt.play}重播壓合</button><button class="chip-btn" id="press-save">保存壓合基準</button></div>
        ${L.pressBaseline?`<div class="compare-box"><b>壓合基準 → 目前</b><p>覆蓋 ${de(L.pressBaseline.summary.coveredPercent,1)}% → ${de(o.coveredPercent,1)}%　夾氣 ${L.pressBaseline.summary.voidCount} → ${o.voidCount}　溫升 ${de(L.pressBaseline.summary.thermal.rise,2)} → ${de(o.thermal.rise,2)} °C</p><small>${Lt(L.pressBaseline.describe)}</small></div>`:""}`:`<div class="cta"><p>${c?"熱源或點膠設定已變更，請重新模擬。":"以完整試驗的沉積分布估算壓合覆蓋、夾氣與熱阻。"}</p><button class="primary" id="press-cta">${mt.press}<span>模擬壓合</span></button><button class="secondary" id="compare-cta">${mt.compare}<span>比較所有圖樣</span></button></div>`}
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">即時帳目</span><span class="pill mono" id="led-t">t = 0.000 s</span></div>
    <dl class="ledger">
      <div><dt>TCP X / Y / Z</dt><dd id="led-xyz"></dd></div>
      <div><dt>移動速度</dt><dd id="led-v"></dd></div>
      <div><dt>膠筒剩餘</dt><dd id="led-rem"></dd></div>
      <div><dt>工件沉積</dt><dd id="led-dep"></dd></div>
      <div><dt>離面後出膠（形狀未定）</dt><dd id="led-off"></dd></div>
      ${ws()?'<div><dt>PCP 暫存 / 回收</dt><dd id="led-pend"></dd></div>':""}
      <div><dt>預填固定持膠</dt><dd id="led-fixed"></dd></div>
      <div><dt>體積對帳誤差</dt><dd id="led-bal"></dd></div>
    </dl>
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">收尾時序</span></div>
    <ol class="timeline">
      <li class="off"><b>${de(n.commandOff,3)} s</b>關膠指令</li>
      <li class="arrive"><b>${de(n.movementEnd,3)} s</b>到達終點</li>
      <li class="lift"><b>${de(n.liftStart,3)} s</b>開始抬針</li>
      <li class="exit"><b>${de(n.motionEnd,3)} s</b>退離完成</li>
    </ol>
    <p class="note">停移後流出 ${de(n.afterStopVolume*1e3,2)} µL（${de(n.afterStopPercent,1)}%）；其中離面後 ${de(t.offSurface*1e3,2)} µL 未加入膠形。${ws()&&n.reverseStart!==null?`回收暫存 ${de(t.recovered*1e3,2)} µL。`:""}</p>
  </section>
  <details class="card-sec warnings" ${d.length>4?"":"open"}><summary><span class="eyebrow">提醒與模型界線</span><span class="count">${d.length}</span></summary>${d.map(_=>`<p>${Lt(_)}</p>`).join("")}</details>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">基準比較</span><button class="chip-btn" id="save-baseline">保存目前為基準</button></div>
    ${by()}
  </section>
  <section class="card-sec exports">
    <button class="chip-btn" id="export-json">${mt.download}配置 JSON</button>
    <button class="chip-btn" id="export-csv">${mt.download}結果 CSV</button>
    <button class="chip-btn" id="export-image">${mt.download}畫面 PNG</button>
  </section>
  <p class="fineprint">工程假設、未經實機校準；23 °C 參考條件。結果供方案相對比較，不能作為量產配方或驗收依據。</p>`}function Nu(s,e){var n,i;const t=s.mode==="pattern"?`${Jn[(n=s.pathSettings)==null?void 0:n.pattern]||""}（間距 ${(i=s.pathSettings)==null?void 0:i.spacing} mm）`:s.mode==="line"?`直線 ${s.lineLength} mm`:`單點 ${s.gateDuration} s`;return`${$t[s.material].name} · ${s.architecture} · ${t} · ${s.architecture==="P300"?`${s.rpm} rpm`:`${de(s.pressure,1)} psi`} · ${s.speed} mm/s${e?` · 熱源 ${e.width}${e.shape==="circle"?" Ø":` × ${e.depth}`} mm / ${e.gap} mm`:""}`}function by(){var i,r;const s=L.baseline;if(!s)return'<p class="note">保存基準後再調整參數，比較沉積量與配置差異；流量曲線會疊上基準。</p>';const e=L.run.summary.deposited-s.summary.deposited,t=Object.keys(L.config).filter(a=>typeof L.config[a]!="object"&&L.config[a]!==s.config[a]);for(const a of new Set([...Object.keys(L.config.pathSettings||{}),...Object.keys(s.config.pathSettings||{})]))((i=L.config.pathSettings)==null?void 0:i[a])!==((r=s.config.pathSettings)==null?void 0:r[a])&&t.push("pathSettings."+a);const n=(a,o)=>{var c;return o.startsWith("pathSettings.")?((c=a.pathSettings)==null?void 0:c[o.slice(13)])??"—":a[o]};return`<div class="compare-box"><div class="delta"><span>${de(s.summary.deposited,3)} → ${de(L.run.summary.deposited,3)} mL</span><b class="${e>=0?"up":"down"}">${e>=0?"+":""}${de(e,3)} mL</b></div>
    <details><summary>${t.length?`${t.length} 個欄位不同`:"與基準配置相同"}</summary>${t.map(a=>`<p><code>${Lt(a)}</code> ${Lt(n(s.config,a))} → ${Lt(n(L.config,a))}</p>`).join("")||"<p>無</p>"}</details></div>`}re("#results").addEventListener("click",s=>{const e=s.target.closest("button");if(e)switch(e.id){case"press-cta":return Fu();case"compare-cta":return Vc();case"press-replay":return Hc(!0);case"press-save":return L.pressBaseline={summary:structuredClone(L.press.result.summary),describe:Nu(L.config,L.press.settings)},tn("已保存壓合基準","ok"),Ts();case"save-baseline":return L.baseline={config:structuredClone(L.config),summary:structuredClone(L.run.summary),run:{frames:L.run.frames.map(t=>({t:t.t,q:t.q,output:t.output,speed:t.speed,z:t.z})),duration:L.run.duration}},tn("已保存完整試驗結果為基準","ok"),zc(),Ts();case"export-json":return Gc(JSON.stringify(ku(),null,2),"TIM_工程假設_試驗配置.json","application/json");case"export-csv":return Ty();case"export-image":return Ay()}});function xn(){const s=L.run,e=L.frame=pd(s,L.time);L.press||Ge.update(e),re("#hud-t").textContent=de(e.t,3),re("#hud-out").textContent=de(e.output,3),re("#hud-q").textContent=de(e.q,3),re("#hud-xyz").textContent=`${de(e.x,1)}, ${de(e.y,1)}, ${de(e.z,1)}`;const t=(i,r)=>{const a=document.getElementById(i);a&&(a.textContent=r)};t("led-t",`t = ${de(e.t,3)} s`),t("led-xyz",`${de(e.x,1)} / ${de(e.y,1)} / ${de(e.z,2)} mm`),t("led-v",`${de(e.speed,1)} mm/s`),t("led-rem",`${de(e.remaining,3)} mL`),t("led-dep",`${de(e.deposited,5)} mL`),t("led-off",`${de(e.offSurface*1e3,2)} µL`),t("led-pend",`${de(e.pending*1e3,2)} / ${de(e.recovered*1e3,2)} µL`),t("led-fixed",`${de(e.fixed,3)} mL`),t("led-bal",`${e.balance.toExponential(1)} mL`),re("#phase").textContent=L.press?"壓合後估算 · 未校準":L.time===0?"就緒":L.time>=s.duration?"試驗完成":L.playing?e.phase:`已暫停 · ${e.phase}`,re(".phase").dataset.state=L.press?"press":e.command?"dispense":L.time>=s.duration?"done":"idle";const n=L.playing?"暫停":L.time>=s.duration?"再次播放":L.time>0?"繼續":"開始試驗";re("#play").innerHTML=`${L.playing?mt.pause:mt.play}<span>${n}</span>`,re("#time-readout").textContent=`${de(e.t,3)} / ${de(s.duration,3)} s`,re("#scrubber").value=String(Math.round(L.time*1e3)),re("#scrubber").style.setProperty("--p",`${L.time/s.duration*100}%`),ay(re("#chart"),L.chart,L.time)}re("#play").onclick=()=>{ni(),L.time>=L.run.duration&&(L.time=0),L.playing=!L.playing,L.clock=null,xn()};re("#restart").onclick=()=>{ni(),L.playing=!1,L.time=0,xn()};re("#step").onclick=()=>{ni(),L.playing=!1,L.time=Math.min(L.run.duration,L.time+.010001),xn()};re("#scrubber").oninput=s=>{ni(),L.playing=!1,L.time=Math.min(L.run.duration,+s.target.value/1e3),xn()};document.addEventListener("keydown",s=>{s.target.closest("input, select, textarea, dialog")||s.code==="Space"&&(s.preventDefault(),re("#play").click())});document.addEventListener("visibilitychange",()=>{document.hidden&&L.playing&&(L.playing=!1,L.clock=null,xn())});function Uu(s){L.playing?(L.clock!==null&&(L.time=Math.min(L.run.duration,L.time+(s-L.clock)/1e3*Number(re("#playback-speed").value))),L.clock=s,L.time>=L.run.duration&&(L.playing=!1),xn()):L.clock=null,requestAnimationFrame(Uu)}function fr(){zt("[data-corner]").forEach(s=>s.classList.toggle("active",!Ge.freeOrbit&&Number(s.dataset.corner)===Ge.isoCorner)),re("#free-orbit").setAttribute("aria-pressed",String(Ge.freeOrbit)),re("#projection").setAttribute("aria-pressed",String(Ge.projection==="persp")),re("#projection-label").textContent=Ge.projection==="persp"?"透視":"正交",zt("[data-view]").forEach(s=>s.classList.toggle("active",s.dataset.view===Ge.mode)),re("#camera-hint").textContent=Ge.freeOrbit?"左鍵旋轉 · 右鍵平移 · 滾輪縮放 · Home 重設":"拖曳平移 · 滾輪縮放 · Home 重設",re("#view-label").textContent=`${Zx[Ge.mode]} · ${Ge.freeOrbit?"自由旋轉":`等角 ${Ge.isoCorner+1}`}${Ge.projection==="persp"?" · 透視":""}`,re("#geometry-note").textContent=L.press?"透明板與覆蓋為未校準幾何估算":["whole","work","head","feed"].includes(Ge.mode)?"設備依公開外形參考 · 局部、支架與管路為示意":"近看隱藏上部機構 · 膠形為幾何示意"}zt("[data-view]").forEach(s=>s.addEventListener("click",()=>{Ge.fit(s.dataset.view),L.press||Ge.update(L.frame)}));zt("[data-corner]").forEach(s=>s.addEventListener("click",()=>Ge.setCorner(Number(s.dataset.corner))));re("#free-orbit").onclick=()=>Ge.setFreeOrbit(!Ge.freeOrbit);re("#projection").onclick=()=>{Ge.setProjection(Ge.projection==="ortho"?"persp":"ortho"),fr()};re("#reset-camera").onclick=()=>{Ge.setFreeOrbit(!1,!1),Ge.fit(Ge.mode)};re("#show-exit").onchange=s=>Ge.setOverlayVisibility({exitPath:s.target.checked});re("#show-planned").onchange=s=>Ge.setOverlayVisibility({plannedPath:s.target.checked});re("#show-heat").onchange=s=>Ge.setOverlayVisibility({heatSource:s.target.checked});re("#theme").onclick=()=>{const s=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=s,Tu.set("tim-theme",s),Ge.setTheme(s),re("#theme").innerHTML=s==="dark"?mt.sun:mt.moon};re("#theme").innerHTML=kc==="dark"?mt.sun:mt.moon;function Sy(){L.press&&!L.press.stale&&(L.press.stale=!0,Ts())}function ni(s=!0){cancelAnimationFrame(L.pressAnim),L.pressAnim=null,L.press&&(L.press=null,Ge.clearCompression(),re("#press-bar").hidden=!0,s&&(Ts(),xn(),fr()))}async function Fu(){if(L.busy)return;L.busy=!0,document.body.classList.add("busy"),zt("#press, #press-cta").forEach(t=>t.querySelector("span").textContent="計算中…");const s={...L.heat},e=L.run;try{const t=await Cu("compress",{run:ly(e),heat:s,frames:24});if(e!==L.run||JSON.stringify(s)!==JSON.stringify(L.heat)){tn("計算期間設定已變更，請重新模擬壓合");return}ni(!1),L.playing=!1,L.time=e.duration,xn(),L.press={result:t,settings:s,stale:!1};const n=Ge.showCompression(t,s);Ge.fit("heat");const i=re("#press-scrub");i.max=String(n.frameCount-1),re("#press-bar").hidden=!1,Ts(),xn(),fr(),Hc(!0)}catch(t){tn(`壓合估算失敗：${t.message}`,"error")}finally{L.busy=!1,document.body.classList.remove("busy"),zt("#press, #press-cta").forEach(t=>t.querySelector("span")&&(t.querySelector("span").textContent="模擬壓合"))}}function Ou(s){const e=Ge.compression;if(!e)return;Ge.setCompressionFrame(s);const t=e.frames[s];re("#press-scrub").value=String(s),re("#press-gap").textContent=`間隙 ${de(t.gap,3)} mm · 覆蓋 ${de(t.coveredPercent??L.press.result.summary.coveredPercent,1)}%`}function Hc(s){const e=Ge.compression;if(!e)return;cancelAnimationFrame(L.pressAnim);const t=e.frameCount,n=performance.now(),i=s?0:Number(re("#press-scrub").value),r=2400*((t-1-i)/Math.max(1,t-1)),a=o=>{const c=Math.max(i,Math.min(t-1,i+Math.round(Math.max(0,o-n)/Math.max(1,r)*(t-1-i))));Ou(c),L.pressAnim=c<t-1?requestAnimationFrame(a):null};L.pressAnim=requestAnimationFrame(a)}re("#press-scrub").oninput=s=>{cancelAnimationFrame(L.pressAnim),Ou(Number(s.target.value))};re("#press-play").onclick=()=>Hc(Number(re("#press-scrub").value)>=Ge.compression.frameCount-1);re("#press-exit").onclick=()=>ni();zt("[data-press-color]").forEach(s=>s.addEventListener("click",()=>{zt("[data-press-color]").forEach(e=>e.classList.toggle("active",e===s)),Ge.setCompressionColor(s.dataset.pressColor)}));const Ey=["line","n","serpentine","spiral","perimeter"];async function Vc(){var a,o;const s=re("#compare-dialog");s.open||s.showModal();const e=((a=L.compare)==null?void 0:a.matchVolume)??!0,t=((o=L.compare)==null?void 0:o.factor)??L.tuneFactor,n=`<div class="compare-controls"><label class="chk"><input type="checkbox" id="cmp-match" ${e?"checked":""}>等膠量比較（自動調整速度到需求 ×</label><input type="number" id="cmp-factor" value="${t}" min="0.3" max="5" step="any"><span>）</span><button class="primary" id="cmp-run">${mt.compare}<span>重新計算</span></button></div>`;re("#compare-body").innerHTML=`${n}<div class="progress"><i style="width:0%"></i></div><p class="note" id="cmp-status">計算中…</p>`,Bu();const i={...L.config,pathSettings:Pu()},r={...L.heat,cellSize:Math.max(.5,L.heat.cellSize)};try{const c=await Cu("compare",{config:i,heat:r,patterns:Ey,factor:t,matchVolume:e},(l,h)=>{const u=re("#compare-body .progress i");u&&(u.style.width=`${l*100}%`);const d=re("#cmp-status");d&&(d.textContent=`計算 ${Jn[h]}…`)});L.compare={...c,matchVolume:e,factor:t},wy(n)}catch(c){re("#cmp-status").textContent=c.message}}function Bu(){re("#cmp-run").onclick=()=>{L.compare={matchVolume:re("#cmp-match").checked,factor:Number(re("#cmp-factor").value)||1.2},Vc()}}function wy(s){const e=L.compare,t=e.rows.filter(o=>o.ok),n=(o,c)=>t.length?t.reduce((l,h)=>(c>0?h[o]>l[o]:h[o]<l[o])?h:l)[o]:null,i=n("coveredPercent",1),r=n("rise",-1),a=n("cycle",-1);re("#compare-body").innerHTML=`${s}
  <p class="note">熱源 ${L.heat.shape==="circle"?`Ø${L.heat.width}`:`${L.heat.width} × ${L.heat.depth}`} mm、間隙 ${L.heat.gap} mm，需求 ${de(e.required,3)} mL。${e.matchVolume?`每個圖樣自動調整移動速度，使沉積 ≈ 需求 × ${e.factor}。`:"沿用目前速度與流量，膠量隨路徑長改變。"}其他設定沿用目前配置；網格 ≥ 0.5 mm。</p>
  <div class="table-scroll"><table class="cmp"><thead><tr><th>圖樣</th><th>速度<br><small>mm/s</small></th><th>沉積<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溢出<br><small>mm</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
  ${e.rows.map(o=>o.ok?`<tr><td><span class="pat"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${Su[o.pattern]}</svg>${Jn[o.pattern]}</span></td><td>${de(o.speed,1)}</td><td class="${o.reached?"":"warn"}" title="${o.reached?"":"加速度與轉角限制了平均速度，提高設定速度也無法再減少膠量；請降低壓力／轉速或增加間距"}">${de(o.deposited,3)} <small>(${de(o.volumeRatio,2)}×)</small>${o.reached?"":" ⚠"}</td><td class="${o.coveredPercent===i?"best":""}">${de(o.coveredPercent,1)}</td><td class="${o.voidCount?"bad":""}">${o.voidCount} / ${de(o.voidAreaMm2,1)}</td><td>${de(o.squeezeOutMm,1)}</td><td class="${o.rise===r?"best":""}">${de(o.rise,2)}</td><td class="${o.cycle===a?"best":""}">${de(o.cycle,2)}</td><td><button class="chip-btn" data-apply="${o.pattern}" data-speed="${o.speed}">套用</button></td></tr>`:`<tr><td>${Jn[o.pattern]}</td><td colspan="8" class="bad">${Lt(o.error)}</td></tr>`).join("")}
  </tbody></table></div>
  ${e.rows.some(o=>o.ok&&!o.reached)?'<p class="note warn-note">⚠ 該圖樣在目前加速度與轉角限制下無法達到目標膠量（提高設定速度已無效）；請降低壓力或轉速、加大間距，或提高加速度後再比較。</p>':""}
  <p class="note">綠色為各欄最佳值。夾氣與覆蓋來自未校準的 Hele-Shaw 近似；動作時間含收尾、不含上下料。請以透明板實測確認後再定案。</p>`,Bu()}re("#compare-body").addEventListener("click",s=>{var n;const e=s.target.closest("[data-apply]");if(!e)return;L.pattern={...L.pattern,pattern:e.dataset.apply};const t={...L.config,mode:"pattern"};(n=L.compare)!=null&&n.matchVolume&&(t.speed=Number(e.dataset.speed)),re("#compare-dialog").close(),L.tab="path",on(t)&&tn(`已套用 ${Jn[e.dataset.apply]}`,"ok")});function Gc(s,e,t){const n=document.createElement("a"),i=URL.createObjectURL(s instanceof Blob?s:new Blob([s],{type:t}));n.href=i,n.download=e,n.click(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}function ku(){var s;return{application:"TIM Dispensing Lab",version:cr,date:new Date().toISOString(),label:ha,validatedAgainstHardware:!1,parameterRegistryVersion:Nn.schema_version,parameterUpdates:ps,modelAssumptions:{flow:"delayed_first_order",puttyFlowLaw:"tds_reference_point_power_law_tube",motion:L.config.cornerMode==="junction"?"lookahead_trapezoid_junction_deviation":"single_arc_length_trapezoid",lineGeometry:"shared_half_ellipse_rings_total_volume_normalized",pointGeometry:"spherical_cap",surfaceAllocation:"outlet_before_first_lift_only_except_legacy",squeeze:"parallel_plate_hele_shaw_trapped_air_frozen",thermal:"one_dimensional_bulk_plus_tds_derived_contact",hardwareAppearance:"reference_envelopes_with_assumed_details_not_OEM_CAD"},config:L.config,heatSource:L.heat,pattern:L.pattern,hardwareReference:Ox[L.config.architecture],material:$t[L.config.material],referenceParameters:Nn.parameters,additionalDefaults:[Qs,...uc,...dc],sources:Nn.sources,warnings:L.run.warnings,summary:L.run.summary,motion:L.run.motion,compression:L.press&&!L.press.stale?{settings:L.press.settings,summary:L.press.result.summary,voids:L.press.result.voids.slice(0,50),warnings:L.press.result.warnings,baseline:L.pressBaseline}:null,patternComparison:((s=L.compare)==null?void 0:s.rows)||null,baseline:L.baseline?{config:L.baseline.config,summary:L.baseline.summary}:null,view:{mode:Ge.mode,projection:Ge.projection,isoCorner:Ge.isoCorner,freeOrbit:Ge.freeOrbit,time:L.frame.t,cameraPosition:Ge.camera.position.toArray(),cameraTarget:Ge.controls.target.toArray()},note:"工件檔案不內嵌，僅保存名稱與雜湊；重新載入需原檔。"}}function Ty(){var r;const s=[["t","time_s"],["command","command_0_1"],["target","target_mL_s"],["q","outflow_mL_s"],["output","outlet_mL"],["mass","mass_g"],["s","arc_length_mm"],["x","TCP_X_mm"],["y","TCP_Y_mm"],["z","TCP_Z_mm"],["speed","speed_mm_s"],["remaining","cartridge_mL"],["pending","pending_mL"],["fixed","fixed_primed_mL"],["balance","balance_error_mL"],["deposited","deposited_mL"],["offSurface","off_surface_mL"],["recovered","recovered_pending_mL"],["vx","velocity_X_mm_s"],["vy","velocity_Y_mm_s"],["vz","velocity_Z_mm_s"],["phase","phase"],["depositionBalance","deposition_balance_mL"]],e=a=>'"'+String(a).replaceAll('"','""')+'"',t=ku(),n=JSON.stringify({config:L.config,heatSource:L.heat,sourceVersion:Nn.schema_version,parameterUpdates:ps.map(a=>[a.id,a.value]),modelAssumptions:t.modelAssumptions,compression:((r=t.compression)==null?void 0:r.summary)||null,ending:L.run.ending,warnings:L.run.warnings}),i=[["label","app_version","profile",...s.map(a=>a[1]),"run_metadata_json_first_row"].join(","),...L.run.frames.map((a,o)=>[ha,cr,L.config.profile,...s.map(([c])=>a[c]),o===0?n:""].map(e).join(","))];Gc("\uFEFF"+i.join(`\r
`),"TIM_未校準_試驗結果.csv","text/csv;charset=utf-8")}async function Ay(){var i;const s=new Image;s.src=Ge.screenshot(),await s.decode();const e=document.createElement("canvas");e.width=s.width,e.height=s.height+110;const t=e.getContext("2d");t.fillStyle="#f4f6f8",t.fillRect(0,0,e.width,e.height),t.drawImage(s,0,0),t.fillStyle="#16181b",t.font="bold 20px sans-serif",t.fillText(`TIM 點膠研究室 v${cr} · ${ha}`,24,s.height+32),t.font="15px sans-serif",t.fillStyle="#4f5157",t.fillText(`${Nu(L.config,L.heat)} · t=${L.frame.t.toFixed(3)} s · 沉積 ${L.run.summary.deposited.toFixed(4)} mL`,24,s.height+60);const n=(i=L.press)==null?void 0:i.result.summary;t.fillText(n?`壓合估算：覆蓋 ${n.coveredPercent.toFixed(1)}% · 夾氣 ${n.voidCount} 處 ${n.voidAreaMm2.toFixed(1)} mm² · 溫升 ${n.thermal.rise.toFixed(2)} °C（未校準）`:"工件沉積與離面後出膠分帳；虛線為針尖路徑，非膠絲。mm 真實比例。",24,s.height+86),e.toBlob(r=>Gc(r,n?"TIM_未校準_壓合畫面.png":"TIM_未校準_點膠畫面.png","image/png"))}const Ry={published_typical:"原廠典型",published_rated:"原廠額定",published_limit:"原廠上限",derived:"公式／資料推導",engineering_assumption:"AI 工程初估"};function Cy(){const s=new Map(ps.map(n=>[n.id,n])),e=new Map(Nn.parameters.map(n=>[n.id,n])),t=[...ps.map(n=>({...n,v1:!0})),...dc.map(n=>({...n,v1:!0})),Qs,...uc,...Nn.parameters.filter(n=>!s.has(n.id))];re("#source-rows").innerHTML=t.map(n=>{const i=n.v1&&e.get(n.id);return`<tr class="${n.v1?"v1":""}"><td><code>${Lt(n.id)}</code>${n.v1?'<em class="tag tag-derived">v1.0 更新</em>':""}</td><td>${Lt(n.value)} ${Lt(n.unit||"")}${i?`<br><small>原 v0.3：${Lt(i.value)}</small>`:""}</td><td>${Lt(Ry[n.evidence]||n.evidence)}<br><small>${Lt(n.role||"控制初值")}</small></td><td>${Lt(n.basis)}<br><small>${Lt((n.source_refs||[]).join(" / "))}</small></td></tr>`}).join("")}re("#help-body").innerHTML=`
<ol class="steps">
  <li><b>設備</b>：選膠材（Tputty 910／Tgrease 2500）與架構（R75 氣壓／P300 PCP），調整壓力或轉速。</li>
  <li><b>熱源</b>：輸入元件接觸面尺寸、位置、組裝間隙與功耗。可「自動調整移動速度」讓膠量 = 間隙體積 × 係數。</li>
  <li><b>路徑</b>：依熱源選中心線／N／蛇形／螺旋／外框，或直線、單點。多段路徑在轉角依 junction deviation 減速。</li>
  <li><b>播放</b>：空白鍵播放／暫停；拖曳時間軸或點曲線跳到該時刻；時間軸上的標記可跳到關膠、到位、抬針、退離。</li>
  <li><b>壓合</b>：按「模擬壓合」看透明板下降、膠膜擴散與夾氣（紅色）；可切換「前緣時序」著色。</li>
  <li><b>比較</b>：「比較所有圖樣」在等膠量下比較覆蓋、夾氣、溢膠、溫升與動作時間，可直接套用。</li>
</ol>
<p class="muted">視角：全機／工作區／機頭／供膠站／近看／跟隨；①–④ 等角方向；360° 自由旋轉；正交與透視可切換。所有零件以 mm 真實比例繪製；設備外形依公開尺寸，細部與管路為示意。</p>
<p class="muted">本工具所有結果為工程假設、未經實機校準，用於縮小試驗範圍與比較方案，不能取代透明板或首件驗證。</p>`;re("#show-sources").onclick=()=>{Cy(),re("#sources-dialog").showModal()};re("#help").onclick=()=>re("#help-dialog").showModal();zt("[data-close]").forEach(s=>s.onclick=()=>s.closest("dialog").close());zt("dialog").forEach(s=>s.addEventListener("click",e=>e.target===s&&s.close()));L.config=Du();Iu(ia(L.config));requestAnimationFrame(Uu);
