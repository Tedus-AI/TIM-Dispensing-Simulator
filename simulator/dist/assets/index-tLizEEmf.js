(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const yd="0.3",Md="2026-10-24",bd="preimplementation_specification",Sd=!1,wd=!1,Ed="工程假設情境｜未經實機校準",Td={L910_TDS:{url:"https://www.laird.com/sites/default/files/2025-05/THR-DS-Tputty%20910%20RevC.pdf",local:"sources/Laird/Tputty910_TDS_20250422_RevC.pdf",version:"2025-04-22 Rev C"},G2500_TDS:{url:"https://www.laird.com/sites/default/files/2025-07/MKT-DOC-1592%20Tgrease%202500%20Data%20Sheet%2006272025.pdf",local:"sources/Laird/Tgrease2500_TDS_20250627.pdf",version:"2025-06-27"},L910_GUIDE:{url:"https://www.laird.com/sites/default/files/2024-06/A18720-00%20RevA%20Tputty%20910%20%20Dispensing%20Guideline.pdf",local:"sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf",page:5},DM22:{local:"sources/Equipment/Graco_DM22_Manual_3A7931EN_D.pdf",version:"3A7931D",page:26},PCP:{local:"sources/Equipment/Graco_PCP_Repair_3A5364EN_L.pdf",version:"3A5364L",page:40},X100:{local:"sources/Equipment/Nordson_PerformusX_TDS_v110624.pdf"},USER:{description:"2026-10-24 使用者授權：未獲廠商回覆也可先建立有註記的工程預設；本次停在模擬器開發之前。"},METHOD:{url:"https://doc.comsol.com/6.3/doc/com.comsol.help.cfd/cfd_ug_fluidflow_single.06.082.html",description:"用於說明完整非牛頓物性需要額外參數；未拿其軟體預設充當 TIM 物性。"}},Ad=JSON.parse('[{"id":"material.putty.density","value":3.2,"unit":"g/mL","evidence":"published_typical","basis":"TDS 典型值；不是此批膠實測。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"material.grease.density","value":3.4,"unit":"g/mL","evidence":"published_typical","basis":"TDS 典型值。","source_refs":["G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"material.grease.viscosity_reference","value":2500,"unit":"Pa.s","evidence":"derived","basis":"2500000 cP /1000；23°C、TF spindle、2rpm、Helipath。","source_refs":["G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.mass_rate","value":75,"unit":"g/min","evidence":"published_typical","basis":"75cc taper tip、90psi；完整幾何及溫度未知。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.pressure","value":90,"unit":"psi","evidence":"published_typical","basis":"原測試值；壓力位置與表壓/絕壓待確認。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"reference.putty.volume_rate","value":0.390625,"unit":"mL/s","evidence":"derived","basis":"75/3.2/60；不是新實測。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"reference_only","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"scenario.temperature","value":23,"unit":"degC","evidence":"engineering_assumption","basis":"固定等溫開發基準；不宣稱是 910 原流率試驗溫度。","source_refs":["USER"],"sensitivity_range":[23,23],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"scenario.pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"虛擬氣壓式基準，明確選表壓；不作實機操作建議。","source_refs":["USER"],"sensitivity_range":[30,90],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"scenario.reference_pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"將 TDS 未完整交代的壓力映射到虛擬模型；映射本身是假設。","source_refs":["L910_TDS","USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.id","value":3.175,"unit":"mm","evidence":"engineering_assumption","basis":"借用指南 0.125in 尺度，虛擬等徑圓管；非原測試針嘴。","source_refs":["L910_GUIDE","USER"],"sensitivity_range":[2,4],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.length","value":10,"unit":"mm","evidence":"engineering_assumption","basis":"定義虛擬有效直管長 10mm，不由 7018555 總長反推。","source_refs":["USER"],"sensitivity_range":[5,20],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.reference_id","value":3.175,"unit":"mm","evidence":"engineering_assumption","basis":"固定正規化幾何；換現用針嘴時不能一併改此基準。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"virtual_nozzle.reference_length","value":10,"unit":"mm","evidence":"engineering_assumption","basis":"固定正規化幾何。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.reference_rate","value":0.390625,"unit":"mL/s","evidence":"engineering_assumption","basis":"將 TDS 參考量映射到虛擬基準；非該幾何實測。","source_refs":["L910_TDS","USER"],"sensitivity_range":[0.1953125,0.78125],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.pressure_exponent","value":1,"unit":"1","evidence":"engineering_assumption","basis":"中性的線性壓力起點，不是 HB 的流動指數。","source_refs":["USER"],"sensitivity_range":[0.7,2],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.geometry_exponent_d","value":4,"unit":"1","evidence":"engineering_assumption","basis":"僅作等效牛頓圓管尺度比較；非真實 putty 的幾何律。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"putty_proxy.geometry_exponent_L","value":-1,"unit":"1","evidence":"engineering_assumption","basis":"等效直管長度尺度比較。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"R75_putty","estimated_by":"assistant","validated_against_hardware":false},{"id":"grease_proxy.constant_viscosity","value":2500,"unit":"Pa.s","evidence":"engineering_assumption","basis":"暫把單一測試黏度當等效常數；此用法未驗證。","source_refs":["G2500_TDS","USER"],"sensitivity_range":[625,10000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"grease_proxy.reference_rate","value":0.061906507721617925,"unit":"mL/s","evidence":"derived","basis":"虛擬等徑圓管的 Poiseuille 起算值；依上述未驗證常黏度。","source_refs":["USER","G2500_TDS"],"sensitivity_range":null,"range_kind":null,"role":"derived_check_only","scope":"R75_grease","estimated_by":null,"validated_against_hardware":false},{"id":"r75.cartridge.nominal_volume","value":75,"unit":"mL","evidence":"published_typical","basis":"910 包材標稱容量。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75","estimated_by":null,"validated_against_hardware":false},{"id":"r75.cartridge.initial_fill","value":56,"unit":"mL","evidence":"published_typical","basis":"910 TDS 裝填；grease 配置沿用時屬另行虛擬裝填。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75_putty","estimated_by":null,"validated_against_hardware":false},{"id":"r75.grease.initial_fill","value":56,"unit":"mL","evidence":"engineering_assumption","basis":"為比較採相同虛擬裝填，不宣稱 grease 有此商品包裝。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"R75_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.cartridge.bore","value":38,"unit":"mm","evidence":"engineering_assumption","basis":"配合 75mL 和已知外形選的虛擬內徑，非 Laird 圖面。","source_refs":["USER"],"sensitivity_range":[36,40],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.cartridge.unusable_residual","value":0.5,"unit":"mL","evidence":"engineering_assumption","basis":"先留少量不可用殘量，便於耗量結算。","source_refs":["USER"],"sensitivity_range":[0,2],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.adapter_dead_volume","value":5,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬氣帽/接頭死體積；首版不另外求解氣動壓縮。","source_refs":["USER"],"sensitivity_range":[1,15],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.hose_id","value":4,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬氣管幾何，不是供應商配件。","source_refs":["USER"],"sensitivity_range":[3,6],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.air.hose_length","value":1000,"unit":"mm","evidence":"engineering_assumption","basis":"設備旁配置的設計起點，不是量產標準。","source_refs":["USER"],"sensitivity_range":[500,2000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.delay","value":0.03,"unit":"s","evidence":"engineering_assumption","basis":"可觀察起膠延遲的原型種子；無實機證據。","source_refs":["USER"],"sensitivity_range":[0,0.1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.tau_on","value":0.15,"unit":"s","evidence":"engineering_assumption","basis":"整條鏈的合併建立時間常數；不再疊加假氣室或閥動態。","source_refs":["USER"],"sensitivity_range":[0.03,0.5],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"r75.dynamic.tau_off","value":0.1,"unit":"s","evidence":"engineering_assumption","basis":"整條鏈的合併停止時間常數；不等於實測停膠秒數。","source_refs":["USER"],"sensitivity_range":[0.02,0.4],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"R75","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.initial_fill","value":300,"unit":"mL","evidence":"published_typical","basis":"910 TDS 實際裝填。","source_refs":["L910_TDS"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300_putty","estimated_by":null,"validated_against_hardware":false},{"id":"p300.grease.initial_fill","value":300,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬 300mL 裝填；grease 與 DM-22 實機適用性未確認。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300_grease","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.od","value":48.5,"unit":"mm","evidence":"engineering_assumption","basis":"位於設備外徑配對區間內，非實物尺寸。","source_refs":["DM22","USER"],"sensitivity_range":[47,50],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.bore","value":46,"unit":"mm","evidence":"engineering_assumption","basis":"搭配外徑及容量的自洽虛擬尺寸。","source_refs":["USER"],"sensitivity_range":[44,47],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.overall_length","value":220,"unit":"mm","evidence":"engineering_assumption","basis":"小於設備候選 <230mm 邊界，非包材圖面。","source_refs":["DM22","USER"],"sensitivity_range":[210,225],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometry_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.cartridge.unusable_residual","value":3,"unit":"mL","evidence":"engineering_assumption","basis":"虛擬不可用殘量。","source_refs":["USER"],"sensitivity_range":[0,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.id","value":12.7,"unit":"mm","evidence":"engineering_assumption","basis":"自訂 1/2in 內徑情境，不從 607 案例移植為 910 規格。","source_refs":["USER"],"sensitivity_range":[9.5,12.7],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory_geometry","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.length","value":1000,"unit":"mm","evidence":"engineering_assumption","basis":"自訂 1m 管路情境。","source_refs":["USER"],"sensitivity_range":[500,2000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory_geometry","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.hose.initially_primed","value":true,"unit":"boolean","evidence":"engineering_assumption","basis":"起跑時管內已有材料；初始總存量須包含此部分，不能視為免費填管。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.adapter.wetted_dead_volume","value":2,"unit":"mL","evidence":"engineering_assumption","basis":"接頭、計量頭與其他未分解腔體的合併持膠量，不含已另計的軟管與針嘴；不是工程圖量測。","source_refs":["USER"],"sensitivity_range":[0,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"inventory","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.pcp.displacement","value":0.3,"unit":"mL/rev","evidence":"published_typical","basis":"25B192 排量；不是 Laird 升級頭已確認型號。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"active","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"p300.pcp.speed","value":60,"unit":"rpm","evidence":"engineering_assumption","basis":"低於候選額定上限的簡單起點；不是材料商建議配方。","source_refs":["USER"],"sensitivity_range":[20,120],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.pcp.volumetric_efficiency","value":1,"unit":"1","evidence":"engineering_assumption","basis":"理想滿腔、無滑漏；不冒稱量測效率。","source_refs":["USER"],"sensitivity_range":[0.7,1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.delay","value":0.02,"unit":"s","evidence":"engineering_assumption","basis":"計量鏈合併延遲種子，無實機依據。","source_refs":["USER"],"sensitivity_range":[0,0.1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.tau_on","value":0.08,"unit":"s","evidence":"engineering_assumption","basis":"計量鏈合併建立時間常數種子。","source_refs":["USER"],"sensitivity_range":[0.02,0.3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.dynamic.tau_off","value":0.08,"unit":"s","evidence":"engineering_assumption","basis":"第一版與建立時間常數共同設定為0.08s，使用單一守恆輸送響應，避免各自設定造成總體積不一致。","source_refs":["USER"],"sensitivity_range":[0.02,0.3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.supply.air_pressure","value":20,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"只作架構圖顯示情境，不據此計算實際供料能力。","source_refs":["USER"],"sensitivity_range":[10,30],"range_kind":"engineering_scenarios_not_confidence_interval","role":"display_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"p300.supply.pressure_ratio","value":22,"unit":"1","evidence":"published_typical","basis":"DM-22 名義壓力比，乘積不是流動中實測壓力。","source_refs":["DM22"],"sensitivity_range":null,"range_kind":null,"role":"display_only","scope":"P300","estimated_by":null,"validated_against_hardware":false},{"id":"p300.pcp.inlet_pressure","value":90,"unit":"psi_gauge","evidence":"engineering_assumption","basis":"入口顯示情境；不當已確認工作窗口，也不直接改變理想每轉量。","source_refs":["USER"],"sensitivity_range":[70,100],"range_kind":"engineering_scenarios_not_confidence_interval","role":"display_only","scope":"P300","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.speed","value":100,"unit":"mm/s","evidence":"engineering_assumption","basis":"在參考平台量程內選擇便於觀察的速度。","source_refs":["USER"],"sensitivity_range":[25,150],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.acceleration","value":500,"unit":"mm/s^2","evidence":"engineering_assumption","basis":"虛擬梯形速度曲線，不是 E3/C300 實測加速度。","source_refs":["USER"],"sensitivity_range":[100,1000],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.standoff","value":2,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬針距；首版作間隙檢查，不自動算擠壓與自由射流。","source_refs":["USER"],"sensitivity_range":[0.5,3],"range_kind":"engineering_scenarios_not_confidence_interval","role":"clearance_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.lift_speed","value":20,"unit":"mm/s","evidence":"engineering_assumption","basis":"虛擬抬針速度；不據此預測拉絲。","source_refs":["USER"],"sensitivity_range":[5,50],"range_kind":"engineering_scenarios_not_confidence_interval","role":"kinematics_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"motion.lift_distance","value":5,"unit":"mm","evidence":"engineering_assumption","basis":"點膠後抬升距離。","source_refs":["USER"],"sensitivity_range":[2,10],"range_kind":"engineering_scenarios_not_confidence_interval","role":"kinematics_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"job.line_length","value":100,"unit":"mm","evidence":"engineering_assumption","basis":"基準直線，位於兩個平台候選工作包絡內。","source_refs":["USER"],"sensitivity_range":[20,150],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"job.point_gate_duration","value":0.1,"unit":"s","evidence":"engineering_assumption","basis":"泛用 timed-gate 原型事件，不仿真 Graco 自動 Shot 的 PLC 時序。","source_refs":["USER"],"sensitivity_range":[0.05,1],"range_kind":"engineering_scenarios_not_confidence_interval","role":"active","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"shape.line_height_to_width","value":0.5,"unit":"1","evidence":"engineering_assumption","basis":"半橢圓截面的幾何比例，非材料接觸角或保形量測。","source_refs":["USER"],"sensitivity_range":[0.25,0.75],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometric_illustration_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"shape.dot_height_to_width","value":0.25,"unit":"1","evidence":"engineering_assumption","basis":"球冠幾何比例，非材料/表面量測。","source_refs":["USER"],"sensitivity_range":[0.1,0.5],"range_kind":"engineering_scenarios_not_confidence_interval","role":"geometric_illustration_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"workpiece.width","value":150,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬平板。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"geometry_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"workpiece.depth","value":100,"unit":"mm","evidence":"engineering_assumption","basis":"虛擬平板。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"geometry_only","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"numerics.initial_timestep","value":0.001,"unit":"s","evidence":"engineering_assumption","basis":"未實作求解器的起始步長規格；仍需步長收斂檢查。","source_refs":["USER"],"sensitivity_range":[0.0005,0.002],"range_kind":"engineering_scenarios_not_confidence_interval","role":"implementation_requirement","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"numerics.mass_balance_relative_tolerance","value":0.001,"unit":"1","evidence":"engineering_assumption","basis":"軟體數值質量平衡目標 0.1%，不是物理準確度。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"implementation_requirement","scope":"all","estimated_by":"assistant","validated_against_hardware":false},{"id":"limits.x100_max_pressure","value":100,"unit":"psi","evidence":"published_limit","basis":"候選控制器額定上限，不代表整套配件相容。","source_refs":["X100"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"limits.pcp_max_rpm","value":300,"unit":"rpm","evidence":"published_limit","basis":"3A5364L 規格，不等於高填料實際可用上限。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"limits.pcp_max_working_pressure","value":290,"unit":"psi","evidence":"published_limit","basis":"不是已確認入口上限。","source_refs":["PCP"],"sensitivity_range":null,"range_kind":null,"role":"reference_limit","scope":"all","estimated_by":null,"validated_against_hardware":false},{"id":"common.nozzle.initially_primed","value":true,"unit":"boolean","evidence":"engineering_assumption","basis":"初始針嘴已充膠，針嘴容積列入初始總存量；不從當次膠筒重複扣除。","source_refs":["USER"],"sensitivity_range":null,"range_kind":null,"role":"inventory","scope":"all","estimated_by":"assistant","validated_against_hardware":false}]'),Rd={temperature_dependence:{enabled:!1,reason:"固定23°C，未填假溫度敏感係數"},yield_and_thixotropy:{enabled:!1,reason:"完整物性保持未知，改以等效流量與合併響應"},wall_slip_and_friction_solver:{enabled:!1,reason:"不與合併動態重複計入"},hose_pressure_drop_and_starvation:{enabled:!1,reason:"P300 先用滿腔理想計量，壓力只顯示"},snuffback:{enabled:!1,reason:"第一版無回吸；開啟需另定義守恆、負流量與吸氣"},stringing_and_slump:{enabled:!1,reason:"幾何示意不宣稱材料恢復或斷絲"},compression_thermal_voids:{enabled:!1,reason:"後續階段"}},Cd=[{id:"R75_PUTTY_ASSUMED",material:"Tputty 910 參考資料＋工程預設",architecture:"R75",flow_method_candidate:"normalized_reference_flow",hardware_compatibility:"unconfirmed"},{id:"R75_GREASE_ASSUMED",material:"Tgrease-2500 參考資料＋常黏度近似",architecture:"R75",flow_method_candidate:"virtual_newtonian_capillary",hardware_compatibility:"unconfirmed"},{id:"P300_PUTTY_IDEAL",material:"Tputty 910 密度＋理想 PCP",architecture:"P300",flow_method_candidate:"ideal_positive_displacement",hardware_compatibility:"unconfirmed"},{id:"P300_GREASE_IDEAL",material:"Tgrease-2500 密度＋理想 PCP",architecture:"P300",flow_method_candidate:"ideal_positive_displacement",hardware_compatibility:"unconfirmed_grease_viscosity_application"}],Xn={schema_version:yd,created_date:Md,stage:bd,implementation_authorized:Sd,manufacturer_response_required_to_start_assumption_prototype:wd,global_label:Ed,sources:Td,parameters:Ad,features:Rd,profiles:Cd},Fa=2e4;function Pd(s){const e={shape:"rectangle",pattern:"serpentine",offsetX:0,offsetY:0,spacing:5,edgeInset:2,spiralShape:"auto",spiralDirection:"outside-in",...s};e.shape==="circle"&&(e.depth=e.width);for(const h of["width","depth","offsetX","offsetY","spacing","edgeInset"])if(!Number.isFinite(e[h]))throw new Error(`${h} 必須是有限數值`);if(!["rectangle","circle"].includes(e.shape))throw new Error("熱源形狀不支援");if(!["point","line","n","serpentine","spiral","perimeter"].includes(e.pattern))throw new Error("點膠路徑不支援");if(!["auto","round","square"].includes(e.spiralShape))throw new Error("螺旋形狀不支援");if(!["outside-in","inside-out"].includes(e.spiralDirection))throw new Error("螺旋方向不支援");const t=e.shape==="circle"?e.width:e.depth;if(e.width<=0||t<=0||e.width>1e3||t>1e3)throw new Error("熱源尺寸需介於 0 與 1000 mm");if(e.spacing<.2||e.spacing>1e3)throw new Error("路徑間距需介於 0.2 與 1000 mm");if(e.edgeInset<0||e.edgeInset>=Math.min(e.width,t)/2)throw new Error("邊界內縮須小於熱源最短尺寸的一半");const n=e.width/2-e.edgeInset,i=t/2-e.edgeInset,r=e.spiralShape==="auto"?e.shape==="circle"?"round":"square":e.spiralShape,a=[],o=(h,u)=>{h+=e.offsetX,u+=e.offsetY;const d=a.at(-1);if(!(d&&Math.hypot(h-d.x,u-d.y)<1e-9)){if(a.length>=Fa)throw new Error("路徑點數過多，請增加間距或縮小熱源");a.push({x:h,y:u})}};if(e.pattern==="point")o(0,0);else if(e.pattern==="line")o(-n,0),o(n,0);else if(e.pattern==="n"){const h=e.shape==="circle"?n/Math.SQRT2:n,u=e.shape==="circle"?n/Math.SQRT2:i;o(-h,-u),o(-h,u),o(h,-u),o(h,u)}else if(e.pattern==="serpentine"){const h=Math.max(1,Math.floor(2*i/e.spacing)+1);if(h*2>Fa)throw new Error("蛇形路徑點數過多，請增加間距");for(let u=0;u<h;u++){const d=(u-(h-1)/2)*e.spacing,f=e.shape==="circle"?Math.sqrt(Math.max(0,n*n-d*d)):n;u%2===0?(o(-f,d),o(f,d)):(o(f,d),o(-f,d))}}else if(e.pattern==="perimeter")if(e.shape==="rectangle")o(-n,-i),o(n,-i),o(n,i),o(-n,i),o(-n,-i);else{const h=Math.max(16,Math.ceil(2*Math.PI*n/1));if(h+1>Fa)throw new Error("路徑點數過多，請縮小熱源");for(let u=0;u<=h;u++){const d=2*Math.PI*u/h;o(n*Math.cos(d),n*Math.sin(d))}}else if(r==="square"){const h=e.shape==="circle"?n/Math.SQRT2:n,u=e.shape==="circle"?n/Math.SQRT2:i;let d=-h,f=h,g=-u,_=u;for(o(d,g);o(f,g),g+=e.spacing,!(g>_||(o(f,_),f-=e.spacing,f<d)||(o(d,_),_-=e.spacing,_<g)||(o(d,g),d+=e.spacing,d>f)););o(0,0)}else{const h=Math.min(n,i),u=2*Math.PI*h/e.spacing;let d=0;for(o(h,0);d<u;){const f=Math.max(0,h-e.spacing*d/(2*Math.PI));d=Math.min(u,d+Math.min(.18,1/Math.max(1,f)));const g=d===u?0:Math.max(0,h-e.spacing*d/(2*Math.PI));o(g*Math.cos(d),g*Math.sin(d))}a[a.length-1]={x:e.offsetX,y:e.offsetY}}if(!a.length)throw new Error("無法生成點膠路徑");e.pattern==="spiral"&&e.spiralDirection==="inside-out"&&a.reverse();const c=[0];let l=0;for(let h=1;h<a.length;h++)l+=Math.hypot(a[h].x-a[h-1].x,a[h].y-a[h-1].y),c.push(l);return{shape:e.shape,pattern:e.pattern,width:e.width,depth:t,offsetX:e.offsetX,offsetY:e.offsetY,edgeInset:e.edgeInset,spacing:e.spacing,spiralShape:e.spiralShape,effectiveSpiralShape:r,spiralDirection:e.spiralDirection,points:a,cumulative:c,length:l,units:"mm",evidence:"engineering_assumption",note:"幾何候選；未校準流量、轉角速度、點膠寬度、排氣或實際壓合。"}}function Ac(s,e){if(!Number.isFinite(e))throw new Error("路徑距離必須是有限數值");if(s.points.length===1)return{...s.points[0],tx:0,ty:0};const t=Math.max(0,Math.min(s.length,e));let n=1,i=s.points.length-1;for(;n<i;){const l=Math.floor((n+i)/2);s.cumulative[l]<t?n=l+1:i=l}const r=s.points[n-1],a=s.points[n],o=s.cumulative[n]-s.cumulative[n-1],c=o?(t-s.cumulative[n-1])/o:0;return{x:r.x+(a.x-r.x)*c,y:r.y+(a.y-r.y)*c,tx:(a.x-r.x)/o,ty:(a.y-r.y)/o}}function bs(s,e,t){const n=Math.min(e,Math.sqrt(s*t)),i=n/t,r=n>0?Math.max(0,(s-n*n/t)/n):0,a=2*i+r,o=n*i/2;return{kind:"single",length:s,duration:a,peak:n,ramp:i,cruise:r,at(c){if(c<=0)return{x:0,v:0};if(c>=a)return{x:s,v:0};if(c<i)return{x:.5*t*c*c,v:t*c};if(c<i+r)return{x:o+n*(c-i),v:n};const l=a-c;return{x:s-.5*t*l*l,v:t*l}},timeAt(c){return Ld(this,s,t,c)}}}function Ld(s,e,t,n){const i=Math.max(0,Math.min(e,n)),r=s.peak*s.ramp/2;return i<=r?Math.sqrt(2*i/t):i>=e-r?s.duration-Math.sqrt(2*(e-i)/t):s.ramp+(i-r)/s.peak}function Dd(s,e,t,n,i){const r=-(s.x*e.x+s.y*e.y);if(r<=-.999999)return i;if(r>=.999999)return 0;const a=Math.sqrt(.5*(1-r));return Math.min(i,Math.sqrt(t*n*a/(1-a)))}function Id(s,{speed:e,acceleration:t,deviation:n}){const i=[];for(let g=1;g<s.length;g++){const _=s[g].x-s[g-1].x,m=s[g].y-s[g-1].y,p=Math.hypot(_,m);p>1e-12&&i.push({length:p,u:{x:_/p,y:m/p}})}const r=i.length;if(!r)return bs(0,e,t);if(r===1)return bs(i[0].length,e,t);const a=new Float64Array(r+1);for(let g=1;g<r;g++)a[g]=Dd(i[g-1].u,i[g].u,t,n,e);a[0]=0,a[r]=0;for(let g=r-1;g>=0;g--)a[g]=Math.min(a[g],Math.sqrt(a[g+1]**2+2*t*i[g].length));for(let g=0;g<r;g++)a[g+1]=Math.min(a[g+1],Math.sqrt(a[g]**2+2*t*i[g].length));let o=0,c=0,l=e,h=0;for(let g=0;g<r;g++){const _=i[g],m=a[g],p=a[g+1],x=Math.max(m,p,Math.min(e,Math.sqrt((2*t*_.length+m*m+p*p)/2))),y=Math.max(0,(x*x-m*m)/(2*t)),v=Math.max(0,(x*x-p*p)/(2*t)),S=Math.max(0,_.length-y-v);Object.assign(_,{v0:m,v1:p,vp:x,d1:y,d2:S,d3:v,t1:(x-m)/t,t2:x>0?S/x:0,t3:(x-p)/t,start:o,distance:c}),_.duration=_.t1+_.t2+_.t3,o+=_.duration,c+=_.length,g>0&&m<e-1e-9&&(h++,l=Math.min(l,m))}const u=o,d=c,f=(g,_)=>{let m=0,p=r-1;for(;m<p;){const x=Math.ceil((m+p)/2);i[x][g]<=_?m=x:p=x-1}return i[m]};return{kind:"polyline",length:d,duration:u,peak:Math.max(...i.map(g=>g.vp)),corners:h,slowestCorner:h?l:null,junctions:Array.from(a),at(g){if(g<=0)return{x:0,v:0};if(g>=u)return{x:d,v:0};const _=f("start",g),m=Math.min(_.duration,g-_.start);if(m<_.t1)return{x:_.distance+_.v0*m+.5*t*m*m,v:_.v0+t*m};if(m<_.t1+_.t2)return{x:_.distance+_.d1+_.vp*(m-_.t1),v:_.vp};const p=m-_.t1-_.t2;return{x:_.distance+_.d1+_.d2+_.vp*p-.5*t*p*p,v:Math.max(0,_.vp-t*p)}},timeAt(g){const _=Math.max(0,Math.min(d,g));if(_>=d)return u;const m=f("distance",_),p=Math.min(m.length,_-m.distance);if(p<=m.d1)return m.start+(Math.sqrt(m.v0*m.v0+2*t*p)-m.v0)/t;if(p<=m.d1+m.d2)return m.start+m.t1+(p-m.d1)/m.vp;const x=p-m.d1-m.d2;return m.start+m.t1+m.t2+(m.vp-Math.sqrt(Math.max(0,m.vp*m.vp-2*t*x)))/t}}}const dl="sources/Laird/Tputty910_Dispensing_Guideline_RevA.pdf",es="sources/Laird/Tputty910_TDS_20250422_RevC.pdf",ts="sources/Laird/Tgrease2500_TDS_20250627.pdf",Nd="Nagrani et al., J. Rheol. 67 (2023), doi:10.1122/8.0000679（arXiv 2304.12104）",As=Object.freeze([{id:"putty_proxy.pressure_exponent",value:2.7,unit:"1",evidence:"derived",role:"氣壓 → 流率的冪次 m（流動指數 n≈1/m）",basis:"以 Laird A18720-00 Rev A 第 5 頁「75cc cartridge、0.125 in nozzle」Tputty 910 流率—氣壓曲線，300 dpi 數位讀圖 20–100 psi 對數擬合 m=2.73（各點誤差約 2% 內）；取 2.7。曲線縱軸單位（cc/min）與 TDS（g/min）仍待 Laird 確認，故只採用曲線「形狀」，90 psi 的量值仍沿用 TDS 75 g/min。取代 v0.3 的中性線性假設 m=1。",source_refs:[dl,es],supersedes:"v0.3 value 1 (engineering_assumption)"},{id:"material.putty.conductivity",value:9.1,unit:"W/(m·K)",evidence:"published_typical",role:"熱阻估算",basis:"TDS Rev C：9.1 W/mK，Hot Disk。",source_refs:[es]},{id:"material.putty.min_bond_line",value:.18,unit:"mm",evidence:"published_typical",role:"間隙下限提醒",basis:"TDS Rev C：Minimum Bond Line Thickness 180 µm（Laird Method）。",source_refs:[es]},{id:"material.putty.contact_resistance",value:.11,unit:"°C·cm²/W",evidence:"derived",role:"熱阻估算的兩側接觸熱阻合計",basis:"TDS Rev C：1.5 mm、80°C／40 psi 熱阻 1.76 °C·cm²/W（ASTM D5470）。扣除體積項 1.5 mm ÷ 9.1 W/mK = 1.65 °C·cm²/W，得接觸項約 0.11。假設該試片厚度即 1.5 mm 且導熱率不隨壓縮改變。",source_refs:[es]},{id:"material.grease.conductivity",value:3.8,unit:"W/(m·K)",evidence:"published_typical",role:"熱阻估算",basis:"TDS 2025-06-27：3.8 W/m-K，Hot Disk；A14259-09 料號頁另列 3.50，未取平均。",source_refs:[ts]},{id:"material.grease.min_bond_line",value:.05,unit:"mm",evidence:"published_typical",role:"間隙下限提醒",basis:"TDS 2025-06-27：Minimum Bondline Thickness 50 µm（Laird Test Method）。",source_refs:[ts]},{id:"material.grease.contact_resistance",value:.02,unit:"°C·cm²/W",evidence:"derived",role:"熱阻估算的兩側接觸熱阻合計",basis:"TDS：10 psi & 70°C 熱阻 0.15 °C·cm²/W（ASTM D5470）。若試片 BLT 為最小 50 µm，體積項 0.05 mm ÷ 3.8 = 0.13，接觸項約 0.02；TDS 未列試片 BLT，此推算不確定。",source_refs:[ts]},{id:"material.grease.packaging",value:"50cc syringe／600cc cartridge",unit:"",evidence:"published_typical",role:"包材提示",basis:"TDS 列 50cc 針筒（A14399-03）與 600cc 膠筒（A14259-10）；本模擬的 75 mL／300 mL grease 裝填仍是虛擬比較配置。",source_refs:[ts]},{id:"assembly.gap",value:.5,unit:"mm",evidence:"engineering_assumption",role:"壓合目標間隙預設",basis:"AI 初估：Tputty 910 為 gap filler（TDS 最小 BLT 0.18 mm、熱阻量測於 1.5 mm），0.5 mm 位於常見 RRU 元件—腔體間隙範圍內；v0.6 的 0.20 mm 太接近最小 BLT。Tgrease 屬薄 BLT 用途，請改小。",source_refs:[es,ts],supersedes:"v0.6 value 0.20 (engineering_assumption)"},{id:"squeeze.air_model",value:"compressible",unit:"",evidence:"engineering_assumption",since:"1.1",role:"壓合時被膠包圍的空氣",basis:"等溫理想氣體 pV = 常數；氣泡壓力與膜壓聯立隱式求解，氣/膠介面可雙向移動（氣泡隨膠流遷移，理想條件下約為膠流速度兩倍，Taylor & Saffman 1959），膠牆排空時氣泡接通大氣即排出。取代 v1.0「被包圍即凍結」的剛性牆；剛性牆與全部排出保留為對照選項。",source_refs:["Taylor & Saffman, Q. J. Mech. Appl. Math. 12 (1959) 265"],supersedes:"v1.0 rigid trapped air (engineering_assumption)"},{id:"squeeze.press_force",value:10,unit:"kgf",evidence:"engineering_assumption",since:"1.1",role:"透明板定力壓合到墊片",basis:"AI 初估：手壓或簡易治具量級。壓合時間與壓合中的氣泡壓縮隨之改變；墊片定位後的最終回脹主要由降伏應力決定，對此值較不敏感。下降速度上限另取 1 mm/s（AI 初估）。",source_refs:[]},{id:"material.putty.squeeze_viscosity",value:7e3,unit:"Pa·s",evidence:"derived",since:"1.1",role:"壓合等效牛頓黏度",basis:"由 90 psi、75 g/min（÷3.2 g/cc）與冪律 m = 2.7（n ≈ 0.37）在虛擬針嘴 Ø3.175 × 10 mm 反推 K ≈ 7.3×10³ Pa·sⁿ，取 1 s⁻¹ 視黏度約 7000 Pa·s（壓合剪切率約 1–5 s⁻¹）。假設 90 psi 全部落在針嘴、未扣除膠筒壓降，偏高；未含剪切稀化。",source_refs:[es,dl]},{id:"material.grease.squeeze_viscosity",value:2500,unit:"Pa·s",evidence:"published_typical",since:"1.1",role:"壓合等效牛頓黏度",basis:"TDS 2,500,000 cP（23 °C、TF spindle 2 rpm、Helipath），與設備頁的常黏度相同並隨之變動。單點黏度，未含剪切稀化。",source_refs:[ts]},{id:"material.yield_stress",value:"putty 200 / grease 50",unit:"Pa",evidence:"engineering_assumption",since:"1.1",role:"墊片定位後擋住氣泡回脹（Bingham：Δp = 2τy·L/h）",basis:"AI 初估，廠商未公開。公開文獻量測 DOWSIL TC-5550 σy ≈ 7–10 Pa、TC-5622 σy ≈ 30 Pa；Tgrease 2500 黏度高約一個數量級故取 50 Pa，Tputty 910 為可保持膠形的 putty 取 200 Pa。以 L = 5 mm、間隙 0.5 mm 計僅擋住 1–4 kPa，故模型預測墊片壓合後氣泡幾乎回脹到 1 atm 體積。",source_refs:[Nd]},{id:"thermal.power",value:25,unit:"W",evidence:"engineering_assumption",role:"溫升估算",basis:"AI 初估：5G RRU 功放／FPGA 類單顆元件量級；請改為實際功耗。",source_refs:[]}]),Ud=new Set(As.map(s=>s.id));function jh(s){if(s.__v1)return s;const e=[...s.parameters.filter(t=>!Ud.has(t.id)),...As];return{...s,parameters:e,update_version:"1.0",__v1:!0}}function fl(s,e){var t;return(t=jh(s).parameters.find(n=>n.id===e))==null?void 0:t.value}const Vs="1.2.0",Aa="工程假設／未經實機校準",Po=32,pr={id:"ending.shutoff_distance",value:10,unit:"mm",evidence:"engineering_assumption",basis:"AI 初始比較值：預設 100 mm 路徑、100 mm/s、500 mm/s² 對應提前 200 ms 關膠。不是原廠配方；速度或路徑改變後提前時間也會改變。",source_refs:["16_收尾積膠原因與影片比對.md"]},Rc=[["endMotion","vertical","","垂直抬針；提供斜退及先升再退，單點僅垂直。"],["endDwell",.1,"s","到達終點後停留 100 ms 再離開；不是從提前關膠時刻起算。"],["backtrackDistance",2,"mm","沿原直線反向回退 2 mm；垂直模式及單點不使用。"],["backtrackSpeed",20,"mm/s","回退速度上限；抬針與回退共用設定加速度。"],["reverseRpm",30,"rpm","理想 PCP 反轉參考轉速；僅回收未出嘴的暫存量。"],["reverseDuration",0,"s","反轉預設關閉；手動比較初值 0.05 s，不能視為原廠配方。"]].map(([s,e,t,n])=>({id:`ending.${s}`,key:s,value:e,unit:t,evidence:"engineering_assumption",basis:n,source_refs:["18_v0.3收尾動作與體積分帳.md"]})),Cc=[{id:"motion.corner_mode",key:"cornerMode",value:"junction",unit:"",evidence:"engineering_assumption",basis:"多段路徑在轉角依 junction deviation 規則降速（CNC 韌體常見作法）；可切回 v0.7「整條弧長單一加減速、轉角不減速」作對照。不是特定機台控制器。",source_refs:["22_v1.0接手全面修正與驗證.md"]},{id:"motion.junction_deviation",key:"junctionDeviation",value:.05,unit:"mm",evidence:"engineering_assumption",basis:"AI 初估：常見 CNC 韌體 0.01–0.05 mm。數值越小轉角越慢、轉角積膠越多；需依實際機台軌跡設定校準。",source_refs:["22_v1.0接手全面修正與驗證.md"]}],Kh=()=>Object.fromEntries(Rc.map(s=>[s.key,s.value])),Zh=()=>Object.fromEntries(Cc.map(s=>[s.key,s.value]));function Jh(s,e="putty",t="R75"){const n=Object.fromEntries(jh(s).parameters.map(o=>[o.id,o.value])),i=o=>n[o],r=t==="P300",a=r?"p300":"r75";return{material:e,architecture:t,profile:r?`P300_${e==="putty"?"PUTTY":"GREASE"}_IDEAL`:`R75_${e==="putty"?"PUTTY":"GREASE"}_ASSUMED`,density:i(`material.${e}.density`),viscosity:i("grease_proxy.constant_viscosity"),pressure:i("scenario.pressure"),referencePressure:i("scenario.reference_pressure"),referenceRate:i("putty_proxy.reference_rate"),pressureExponent:i("putty_proxy.pressure_exponent"),diameter:i("virtual_nozzle.id"),nozzleLength:i("virtual_nozzle.length"),referenceDiameter:i("virtual_nozzle.reference_id"),referenceLength:i("virtual_nozzle.reference_length"),rpm:i("p300.pcp.speed"),displacement:i("p300.pcp.displacement"),efficiency:i("p300.pcp.volumetric_efficiency"),delay:i(`${a}.dynamic.delay`),tauOn:i(`${a}.dynamic.tau_on`),tauOff:i(`${a}.dynamic.tau_off`),fill:i(`${a}.${e==="grease"?"grease":"cartridge"}.initial_fill`),residual:i(`${a}.cartridge.unusable_residual`),hoseId:i("p300.hose.id"),hoseLength:i("p300.hose.length"),deadVolume:i("p300.adapter.wetted_dead_volume"),speed:i("motion.speed"),acceleration:i("motion.acceleration"),standoff:i("motion.standoff"),liftSpeed:i("motion.lift_speed"),liftDistance:i("motion.lift_distance"),mode:"line",lineLength:i("job.line_length"),gateDuration:i("job.point_gate_duration"),shutoffDistance:pr.value,lineRatio:i("shape.line_height_to_width"),dotRatio:i("shape.dot_height_to_width"),width:i("workpiece.width"),depth:i("workpiece.depth"),thickness:5,fixtureHeight:8,surfaceZ:13,offsetX:0,offsetY:0,timestep:i("numerics.initial_timestep"),cellSize:.5,workpieceKind:"plate",workpieceFile:null,...Kh(),...Zh()}}function Fd(s){if(s.architecture==="P300")return s.displacement*s.rpm*s.efficiency/60;if(s.material==="putty"){const e=s.pressureExponent;return s.referenceRate*(Math.max(s.pressure,0)/s.referencePressure)**e*(s.diameter/s.referenceDiameter)**(3+e)*(s.referenceLength/s.nozzleLength)**e}return Math.PI*(s.diameter/1e3)**4*(Math.max(s.pressure,0)*6894.757293168)/(128*s.viscosity*s.nozzleLength/1e3)*1e6}function Lo(s,e,t,n,i,r){const a=s-n;if(a<=0||e===0||t<=0)return{q:0,volume:0};const o=Math.min(a,t),c=-Math.expm1(-o/i);let l=e*(o-i*c),h=e*c;if(a>t){const u=a-t;l+=h*r*-Math.expm1(-u/r),h*=Math.exp(-u/r)}return{q:h,volume:l}}function Od(s,e,t,n,i,r,a){const o=Lo(s,e,t,n,i,i),c=t+n;if(s<=c||r<=0||a<=0||t<=0)return{...o,recovered:0,reverseActive:!1};const l=Lo(c,e,t,n,i,i),h=Math.max(0,e*t-l.volume),u=i*Math.log1p(h/(r*i)),d=s-c,f=Math.min(d,a,u),g=r*f,_=Math.max(0,(h+r*i)*Math.exp(-f/i)-r*i)*Math.exp(-(d-f)/i);return{q:_/i,volume:l.volume+h-g-_,recovered:g,reverseActive:d<Math.min(a,u)}}function kd(s,e,t){const n=s.endMotion==="legacy",i=s.mode==="line"&&["diagonal","liftThenBack"].includes(s.endMotion)?Math.min(s.backtrackDistance,s.lineLength):0,r=n?t:e+s.endDwell,a=bs(s.liftDistance,s.liftSpeed,s.acceleration),o=i>0?bs(i,s.backtrackSpeed,s.acceleration):null,c=s.endMotion==="diagonal"&&i>0,l=Math.hypot(i,s.liftDistance),h=c?bs(l,Math.min(s.liftSpeed*l/s.liftDistance,s.backtrackSpeed*l/i),s.acceleration):null,u=r+(n?s.liftDistance/s.liftSpeed:h?h.duration:a.duration+(o?o.duration:0));return{start:r,end:u,back:i,at(d){const f=Math.max(0,d-r);if(n)return{back:0,lift:Math.min(s.liftDistance,f*s.liftSpeed),vx:0,vz:d>r&&d<u?s.liftSpeed:0,phase:"垂直抬針"};if(h){const m=h.at(f);return{back:m.x*i/l,lift:m.x*s.liftDistance/l,vx:-m.v*i/l,vz:m.v*s.liftDistance/l,phase:"斜退抬針"}}const g=a.at(f),_=o?o.at(f-a.duration):{x:0,v:0};return{back:_.x,lift:g.x,vx:-_.v,vz:g.v,phase:f<a.duration?"垂直抬針":"抬高後回退"}}}}const Bd={pressure:[0,100],diameter:[.2,8],nozzleLength:[1,100],rpm:[0,300],efficiency:[0,1],density:[.1,10],viscosity:[1,1e5],referenceRate:[0,10],pressureExponent:[.1,4],delay:[0,2],tauOn:[.001,2],tauOff:[.001,2],fill:[0,500],residual:[0,500],hoseId:[1,25],hoseLength:[0,5e3],speed:[1,800],acceleration:[1,1e4],standoff:[.1,20],lineLength:[1,250],gateDuration:[.001,10],shutoffDistance:[0,250],lineRatio:[.05,2],dotRatio:[.05,.5],width:[1,1e3],depth:[1,1e3],thickness:[.1,200],fixtureHeight:[0,100],timestep:[1e-4,.01],cellSize:[.1,5],liftSpeed:[.1,200],liftDistance:[.1,50],endDwell:[0,5],backtrackDistance:[0,50],backtrackSpeed:[.1,200],reverseRpm:[0,300],reverseDuration:[0,2],junctionDeviation:[.001,5]};function zd(s){for(const[e,t]of Object.entries(s))if(typeof t=="number"&&!Number.isFinite(t))throw new Error(`${e} 必須是有限數值`);for(const[e,[t,n]]of Object.entries(Bd))if(s[e]<t||s[e]>n)throw new Error(`${e} 超出原型允許範圍 ${t}–${n}`);if(s.residual>s.fill)throw new Error("不可用殘量不能大於裝填量");if(s.architecture==="P300"&&Math.abs(s.tauOn-s.tauOff)>1e-12)throw new Error("PCP 必須共用起停時間常數，以保持計量守恆");if(!["line","point","pattern"].includes(s.mode))throw new Error("未知路徑模式");if(s.mode==="pattern"&&(!s.pathSettings||typeof s.pathSettings!="object"))throw new Error("請先設定熱源與路徑");if(!["vertical","diagonal","liftThenBack","legacy"].includes(s.endMotion))throw new Error("未知收尾動作");if(!["junction","off"].includes(s.cornerMode))throw new Error("未知轉角速度模式");if(s.architecture!=="P300"&&s.reverseDuration>0)throw new Error("氣壓式未提供 PCP 反轉回吸；請改用下降時間常數比較卸壓響應")}function va(s,e){const t=Math.cbrt(1e3*s*3/(Math.PI*e*(3+4*e*e)));return{radius:t,height:2*e*t}}function Pc(s,e,t){const n=s.length,i=new Float64Array(n+1),r=new Float64Array(n+1);let a=0,o=0;for(const u of s)a+=u*1e3;for(let u=1;u<n;u++)i[u]=Math.sqrt(4*1e3*(s[u-1]+s[u])/(2*e*Math.PI*t));for(let u=0;u<n;u++)o+=Po*Math.sin(Math.PI/Po)*t/4*e*(i[u]**2+i[u]*i[u+1]+i[u+1]**2)/3;const c=o>0?Math.sqrt(a/o):0;let l=0,h=0;for(let u=0;u<=n;u++)i[u]*=c,r[u]=i[u]*t,r[u]>l&&(l=r[u]),i[u]>h&&(h=i[u]);return{widths:i,heights:r,volumeMm3:a,maxHeight:l,maxWidth:h}}function Hd(s,e,t){return s.mode==="point"?null:e&&s.cornerMode==="junction"&&e.points.length>2?Id(e.points,{speed:s.speed,acceleration:s.acceleration,deviation:s.junctionDeviation}):bs(t,s.speed,s.acceleration)}function xa(s){const e={...Kh(),...Zh(),endMotion:"legacy",shutoffDistance:0,...structuredClone(s)};zd(e);const t=Fd(e),n=e.architecture==="P300",i=e.fill-e.residual,r=e.mode==="pattern"?Pd(e.pathSettings):null;if(r&&r.length<=1e-9)throw new Error("圖樣路徑沒有長度；單點請使用單點模式");const a=r?r.length:e.lineLength,o=e.mode!=="point",c=Hd(e,r,a),l=o?Math.min(e.shutoffDistance,a):0,h=o?c.timeAt(a-l):e.gateDuration,u=n&&t>0?Math.min(h,i/t):h,d=o?c.duration:h,f=Math.max(d,h+e.delay+20*Math.max(e.tauOn,e.tauOff)),g=n&&e.reverseRpm>0&&e.reverseDuration>0,_=g?u+e.reverseDuration:null,m=g?_+e.delay:null,p=kd(r?{...e,mode:"line",lineLength:a}:e,d,f),x=Math.max(f,p.end,m??0);if(x>180)throw new Error("試驗超過 180 秒，請縮短路徑或提高速度");const y=Math.PI*e.diameter**2/4*(e.nozzleLength/1e3)+(n?Math.PI*e.hoseId**2/4*(e.hoseLength/1e3)+e.deadVolume:0),v=e.fill+y,S=-e.diameter/2,T=a+e.diameter;let R=e.mode==="point"?1:Math.max(2,Math.ceil(T/e.cellSize));const I=R;if(r){const We=Math.max(2,Math.floor(5e6/(Math.ceil(x/.01)+2)));R=Math.min(R,We,2e4)}const b=T/R,w=new Float64Array(R),L=[];let U=0,V=0;const Y=e.displacement*e.reverseRpm*e.efficiency/60,Q=We=>{const N=n?Od(We,t,u,e.delay,e.tauOn,Y,e.reverseDuration):Lo(We,t,h,e.delay,e.tauOn,e.tauOff),Ie=n?N.volume:Math.min(i,N.volume),Pe=n?t*Math.min(We,u):Ie,Ae=N.recovered||0,le=n?Math.max(0,Pe-Ie-Ae):0,ze=Math.max(e.residual,e.fill-Pe),ge=o?c.at(We):{x:0,v:0},Le=p.at(We),Ke=ge.v+Le.vx,Ze=ge.x-Le.back,P=r?Ac(r,Ze):null,M=P?P.x:e.offsetX+(e.mode==="line"?Ze-e.lineLength/2:0),z=P?P.y:e.offsetY,J=g&&We>=u&&We<_,re=g&&We>=u+e.delay&&We<m,ee=We<u?"點膠中":We<d?"收尾移動（已關膠）":We<p.start?e.endMotion==="legacy"?"舊版尾膠等待":"終點停留":We<p.end?Le.phase:We<x?J||re?"動作完成／反轉指令與尾膠記帳":"動作完成／尾膠記帳":"完成";return{t:We,q:!n&&N.volume>=i?0:N.q,target:We<u?t:0,command:We<u?1:0,output:Ie,mass:Ie*e.density,metered:Pe,pending:le,recovered:Ae,reverseActive:!!N.reverseActive,reverseRecoveryActive:!!N.reverseActive,reverseCommandActive:J,reverseResponseActive:re,remaining:ze,fixed:y,initial:v,s:Ze,x:M,y:z,z:e.surfaceZ+e.standoff+Le.lift,speed:Math.hypot(Ke,Le.vz),vx:P?Ke*P.tx:Ke,vy:P?Ke*P.ty:0,vz:Le.vz,phase:ee,balance:v-(ze+y+le+Ae+Ie)}},G=Q(p.start).output,ce=Math.ceil(x/e.timestep),$=e.endMotion==="legacy";for(let We=0;We<=ce;We++){const N=Math.min(x,We*e.timestep),Ie=Q(N),Pe=o?c.at(Math.max(0,N-e.timestep/2)).x:0;Ie.deposited=$?Ie.output:Math.min(Ie.output,G),Ie.offSurface=Math.max(0,Ie.output-Ie.deposited),Ie.depositionBalance=Ie.output-Ie.deposited-Ie.offSurface;const Ae=Math.max(0,Ie.deposited-($?U:Math.min(U,G)));if(e.mode==="point")w[0]+=Ae;else if(Ae>0){const le=Math.max(e.diameter/2,b),ze=Math.floor((Pe-S)/b),ge=Math.ceil(le/b)+1,Le=[];let Ke=0;for(let Ze=Math.max(0,ze-ge);Ze<=Math.min(R-1,ze+ge);Ze++){const P=Math.max(0,1-Math.abs(S+(Ze+.5)*b-Pe)/le);P&&(Le.push([Ze,P]),Ke+=P)}for(const[Ze,P]of Le)w[Ze]+=Ae*P/Ke}U=Ie.output,(N+1e-9>=V||We===ce)&&(L.push({...Ie,deposits:Float64Array.from(w)}),V+=.01)}const pe=o?Pc(w,b,e.lineRatio):null,Me=pe?pe.maxHeight:va(w[0],e.dotRatio).height,Se=L.at(-1),Ee=[],at=Math.max(0,Se.output-Q(d).output),Ge=(We,N)=>{let Ie=0;for(let Pe=0;Pe<R;Pe++){const Ae=S+Pe*b;Ie+=w[Pe]*Math.max(0,Math.min(N,Ae+b)-Math.max(We,Ae))/b}return Ie/(N-We)},it=Math.min(5,a/5),te=Ge(a*.4,a*.6),se=o&&te>1e-12?Ge(a-it,a)/te:null,Te={movementEnd:d,commandOff:u,effectiveShutoffDistance:l,leadTime:d-h,afterStopVolume:at,afterStopPercent:Se.output>0?at/Se.output*100:0,endWindowMm:it,endToMiddleRatio:se,liftStart:p.start,motionEnd:p.end,accountingEnd:x,effectiveBacktrack:p.back,offSurfaceVolume:Se.offSurface,depositedVolume:Se.deposited,recoveredVolume:Se.recovered,reverseCommandStart:g?u:null,reverseCommandEnd:_,reverseStart:g?u+e.delay:null,reverseResponseEnd:m,reverseRequestedVolume:n?Y*e.reverseDuration:0},_e=c?{kind:c.kind,duration:c.duration,peak:c.peak,corners:c.corners||0,slowestCorner:c.slowestCorner??null,averageSpeed:a/c.duration}:null;Se.offSurface>1e-9&&Ee.push("離面後仍有出膠，另列形狀未定量；未預測拉絲、滴落或落點，不加入工件膠形。"),o&&e.backtrackDistance>a&&p.back>0&&Ee.push("回退距離已限制在原直線長度內。"),e.mode==="point"&&["diagonal","liftThenBack"].includes(e.endMotion)&&Ee.push("單點沒有路徑方向，收尾使用垂直抬針。"),n&&e.reverseDuration>0&&Ee.push("PCP 反轉僅為暫存回收近似，回收量獨立記帳；不移除已沉積材料、不保證真實斷絲。"),Te.reverseRequestedVolume>Se.recovered+1e-9&&Ee.push("反轉指令超過可回收暫存量，剩餘指令不再移除材料；負壓、吸氣與下一次開膠尚未計算。"),o&&e.shutoffDistance>=a&&Ee.push("提前關膠距離達到或超過路徑長度，本次不開膠；請縮短提前距離。"),o&&se!==null&&se<.5&&Ee.push("末段平均截面低於中段一半，可能欠膠；此比較門檻為 AI 初估，不是產品驗收標準。"),o&&se!==null&&se>1.5&&Ee.push("末段平均截面高於中段 1.5 倍，可能積膠；此比較門檻為 AI 初估，不是產品驗收標準。"),Me>e.standoff&&Ee.push("簡化膠形高於針距，可能干涉；尚未計算壓扁或拉絲。"),e.material==="putty"&&!n&&Math.abs(e.pressureExponent-1)>1e-9&&Ee.push(`putty 流動指數 m=${e.pressureExponent}：針嘴內徑與長度依冪律 d^(3+m)/L^m 一併換算；仍是單點映射假設。`);const me=pe?pe.maxWidth:va(Se.deposited,e.dotRatio).radius*2;if(r){let We=!1;for(const N of r.points)if(Math.abs(N.x)+me/2>e.width/2||Math.abs(N.y)+me/2>e.depth/2){We=!0;break}We&&Ee.push("路徑或估算膠線可能超出工件範圍；尚未計算實際邊緣流失。"),(Math.abs(r.offsetX)+r.width/2>e.width/2||Math.abs(r.offsetY)+r.depth/2>e.depth/2)&&Ee.push("設定的熱源超出工件矩形參考邊界；請核對熱源位置與尺寸。"),Ee.push("3D 彎角與重疊為幾何示意；沉積量分帳守恆，但顯示網格體積與融合形狀並非精確實物。"),c.kind==="polyline"?Ee.push(`轉角依 junction deviation ${e.junctionDeviation} mm 降速（最低 ${_e.slowestCorner===null?"—":_e.slowestCorner.toFixed(1)} mm/s）；轉角較慢處膠量較多。規則為通用 CNC 近似，非特定機台控制器。`):Ee.push("圖樣使用整條路徑的弧長加減速，轉角不減速（v0.7 對照）；不是機台運動控制器或真實轉角積膠預測。"),R<I&&Ee.push("為避免記憶體不足，沿路徑的沉積取樣已放粗；局部精度下降。")}else((e.mode==="line"?(e.lineLength+e.diameter)/2:me/2)+Math.abs(e.offsetX)>e.width/2||me/2+Math.abs(e.offsetY)>e.depth/2)&&Ee.push("路徑或膠形超出工件範圍；沉積位置仍按水平參考面外推。");const Oe=n?[254,277]:[300,300];return(e.width>Oe[0]||e.depth>Oe[1])&&Ee.push("工件超出所選設備的參考工作範圍；未自動縮小。"),e.surfaceZ+e.standoff+e.liftDistance>(n?70:100)&&Ee.push("工件／針嘴高度超出參考 Z 行程；尚未確認真實機台的裝夾與工具偏置。"),e.workpieceKind!=="plate"&&Ee.push("匯入工件只作實尺寸顯示；膠形使用上方水平參考面，未驗證孔洞、曲面或完整碰撞。"),Se.remaining<=e.residual+1e-9&&Ee.push("可用膠量已耗盡；固定預填流道未吹空。"),n&&Ee.push("理想 PCP 假設滿腔；管路壓降、供料不足與材料適配尚未計算。"),{version:Vs,label:Aa,config:e,path:r,pathLength:a,Q:t,gate:h,duration:x,tailEnd:f,cellLength:b,gridStart:S,frames:L,warnings:Ee,maxHeight:Me,maxWidth:me,motion:_e,ending:Te,summary:{...Se,deposits:Array.from(Se.deposits),maxHeight:Me,maxWidth:me,ending:Te}}}function Vd(s,e){let t=0,n=s.frames.length-1;for(;t<n;){const i=Math.ceil((t+n)/2);s.frames[i].t<=e?t=i:n=i-1}return s.frames[t]}const Wt=Object.freeze({putty:{key:"putty",name:"Tputty 910",vendor:"Laird",kind:"單劑 thermal putty（陶瓷填充矽系）",conductivity:9.1,minBondLine:.18,contactResistance:.11,temperatureRange:"-40～180 °C",packaging:"30cc 針筒／75cc EFD 56cc（179 g）／180cc 159cc／300cc 鋁筒 300cc（960 g）",density:3.2,squeezeViscosity:7e3,yieldStress:200,color:14714506,colorName:"淡紅（近似）",source:"THR-DS-Tputty 910 Rev C 2025-04-22"},grease:{key:"grease",name:"Tgrease 2500",vendor:"Laird",kind:"非矽 thermal grease",conductivity:3.8,minBondLine:.05,contactResistance:.02,temperatureRange:"-55～150 °C",packaging:"50cc 針筒（A14399-03）／600cc 膠筒（A14259-10）",density:3.4,squeezeViscosity:2500,yieldStress:50,color:14277590,colorName:"灰白（近似）",source:"MKT-DOC-1592 Tgrease 2500 Data Sheet 2025-06-27"}});/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Lc="180",hi={ROTATE:0,DOLLY:1,PAN:2},oi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Gd=0,pl=1,Wd=2,Qh=1,eu=2,si=3,di=0,on=1,Gt=2,Ti=0,Ss=1,ml=2,gl=3,_l=4,$d=5,$i=100,Xd=101,qd=102,Yd=103,jd=104,Kd=200,Zd=201,Jd=202,Qd=203,Do=204,Io=205,ef=206,tf=207,nf=208,sf=209,rf=210,af=211,of=212,cf=213,lf=214,No=0,Uo=1,Fo=2,Rs=3,Oo=4,ko=5,Bo=6,zo=7,Dc=0,hf=1,uf=2,Ai=0,df=1,ff=2,pf=3,tu=4,mf=5,gf=6,_f=7,vl="attached",vf="detached",nu=300,Cs=301,Ps=302,Ho=303,Vo=304,Ra=306,Ls=1e3,Ei=1001,ya=1002,cn=1003,iu=1004,or=1005,yn=1006,da=1007,ci=1008,Yn=1009,su=1010,ru=1011,mr=1012,Ic=1013,qi=1014,Fn=1015,Tr=1016,Nc=1017,Uc=1018,gr=1020,au=35902,ou=35899,cu=1021,lu=1022,Rn=1023,_r=1026,vr=1027,Fc=1028,Oc=1029,hu=1030,kc=1031,Bc=1033,fa=33776,pa=33777,ma=33778,ga=33779,Go=35840,Wo=35841,$o=35842,Xo=35843,qo=36196,Yo=37492,jo=37496,Ko=37808,Zo=37809,Jo=37810,Qo=37811,ec=37812,tc=37813,nc=37814,ic=37815,sc=37816,rc=37817,ac=37818,oc=37819,cc=37820,lc=37821,hc=36492,uc=36494,dc=36495,fc=36283,pc=36284,mc=36285,gc=36286,xr=2300,yr=2301,Oa=2302,xl=2400,yl=2401,Ml=2402,xf=2500,yf=0,uu=1,_c=2,Mf=3200,bf=3201,zc=0,Sf=1,wi="",kt="srgb",ln="srgb-linear",Ma="linear",Rt="srgb",ns=7680,bl=519,wf=512,Ef=513,Tf=514,du=515,Af=516,Rf=517,Cf=518,Pf=519,vc=35044,Sl="300 es",$n=2e3,ba=2001;class Zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let wl=1234567;const ws=Math.PI/180,Ds=180/Math.PI;function kn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[s&255]+Kt[s>>8&255]+Kt[s>>16&255]+Kt[s>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function ct(s,e,t){return Math.max(e,Math.min(t,s))}function Hc(s,e){return(s%e+e)%e}function Lf(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Df(s,e,t){return s!==e?(t-s)/(e-s):0}function lr(s,e,t){return(1-t)*s+t*e}function If(s,e,t,n){return lr(s,e,1-Math.exp(-t*n))}function Nf(s,e=1){return e-Math.abs(Hc(s,e*2)-e)}function Uf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Ff(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Of(s,e){return s+Math.floor(Math.random()*(e-s+1))}function kf(s,e){return s+Math.random()*(e-s)}function Bf(s){return s*(.5-Math.random())}function zf(s){s!==void 0&&(wl=s);let e=wl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Hf(s){return s*ws}function Vf(s){return s*Ds}function Gf(s){return(s&s-1)===0&&s!==0}function Wf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function $f(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Xf(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*u,c*d,o*l);break;case"YZY":s.set(c*d,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*d,o*h,o*l);break;case"XZX":s.set(o*h,c*g,c*f,o*l);break;case"YXY":s.set(c*f,o*h,c*g,o*l);break;case"ZYZ":s.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Un(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Et(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Vc={DEG2RAD:ws,RAD2DEG:Ds,generateUUID:kn,clamp:ct,euclideanModulo:Hc,mapLinear:Lf,inverseLerp:Df,lerp:lr,damp:If,pingpong:Nf,smoothstep:Uf,smootherstep:Ff,randInt:Of,randFloat:kf,randFloatSpread:Bf,seededRandom:zf,degToRad:Hf,radToDeg:Vf,isPowerOfTwo:Gf,ceilPowerOfTwo:Wf,floorPowerOfTwo:$f,setQuaternionFromProperEuler:Xf,normalize:Et,denormalize:Un};class we{constructor(e=0,t=0){we.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Cn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-o;const p=c*d+l*f+h*g+u*_,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const S=Math.sqrt(y),T=Math.atan2(S,p*x);m=Math.sin(m*T)/S,o=Math.sin(o*T)/S}const v=o*x;if(c=c*m+d*v,l=l*m+f*v,h=h*m+g*v,u=u*m+_*v,m===1-o){const S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(El.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(El.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ka.copy(this).projectOnVector(e),this.sub(ka)}reflect(e){return this.sub(ka.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ka=new D,El=new Cn;class lt{constructor(e,t,n,i,r,a,o,c,l){lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],x=i[1],y=i[4],v=i[7],S=i[2],T=i[5],R=i[8];return r[0]=a*_+o*x+c*S,r[3]=a*m+o*y+c*T,r[6]=a*p+o*v+c*R,r[1]=l*_+h*x+u*S,r[4]=l*m+h*y+u*T,r[7]=l*p+h*v+u*R,r[2]=d*_+f*x+g*S,r[5]=d*m+f*y+g*T,r[8]=d*p+f*v+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ba.makeScale(e,t)),this}rotate(e){return this.premultiply(Ba.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ba.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ba=new lt;function fu(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Mr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function qf(){const s=Mr("canvas");return s.style.display="block",s}const Tl={};function br(s){s in Tl||(Tl[s]=!0,console.warn(s))}function Yf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Al=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rl=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jf(){const s={enabled:!0,workingColorSpace:ln,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Rt&&(i.r=ui(i.r),i.g=ui(i.g),i.b=ui(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Rt&&(i.r=Es(i.r),i.g=Es(i.g),i.b=Es(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===wi?Ma:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return br("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return br("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ln]:{primaries:e,whitePoint:n,transfer:Ma,toXYZ:Al,fromXYZ:Rl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:n,transfer:Rt,toXYZ:Al,fromXYZ:Rl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),s}const gt=jf();function ui(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Es(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let is;class Kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{is===void 0&&(is=Mr("canvas")),is.width=e.width,is.height=e.height;const i=is.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=is}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Mr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=ui(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ui(t[n]/255)*255):t[n]=ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zf=0;class Gc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(za(i[a].image)):r.push(za(i[a]))}else r=za(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function za(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Kf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jf=0;const Ha=new D;class $t extends Zi{constructor(e=$t.DEFAULT_IMAGE,t=$t.DEFAULT_MAPPING,n=Ei,i=Ei,r=yn,a=ci,o=Rn,c=Yn,l=$t.DEFAULT_ANISOTROPY,h=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=kn(),this.name="",this.source=new Gc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ha).x}get height(){return this.source.getSize(Ha).y}get depth(){return this.source.getSize(Ha).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ls:e.x=e.x-Math.floor(e.x);break;case Ei:e.x=e.x<0?0:1;break;case ya:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ls:e.y=e.y-Math.floor(e.y);break;case Ei:e.y=e.y<0?0:1;break;case ya:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=nu;$t.DEFAULT_ANISOTROPY=1;class yt{constructor(e=0,t=0,n=0,i=1){yt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,v=(f+1)/2,S=(p+1)/2,T=(h+d)/4,R=(u+_)/4,I=(g+m)/4;return y>v&&y>S?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=T/n,r=R/n):v>S?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=T/i,r=I/i):S<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(S),n=R/r,i=I/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qf extends Zi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new $t(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:yn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Gc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends Qf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pu extends $t{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=cn,this.minFilter=cn,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ep extends $t{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=cn,this.minFilter=cn,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mn{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Dn):Dn.fromBufferAttribute(r,a),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Dr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Dr.copy(n.boundingBox)),Dr.applyMatrix4(e.matrixWorld),this.union(Dr)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ys),Ir.subVectors(this.max,Ys),ss.subVectors(e.a,Ys),rs.subVectors(e.b,Ys),as.subVectors(e.c,Ys),mi.subVectors(rs,ss),gi.subVectors(as,rs),Ni.subVectors(ss,as);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Ni.z,Ni.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Ni.z,0,-Ni.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Ni.y,Ni.x,0];return!Va(t,ss,rs,as,Ir)||(t=[1,0,0,0,1,0,0,0,1],!Va(t,ss,rs,as,Ir))?!1:(Nr.crossVectors(mi,gi),t=[Nr.x,Nr.y,Nr.z],Va(t,ss,rs,as,Ir))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Kn=[new D,new D,new D,new D,new D,new D,new D,new D],Dn=new D,Dr=new Mn,ss=new D,rs=new D,as=new D,mi=new D,gi=new D,Ni=new D,Ys=new D,Ir=new D,Nr=new D,Ui=new D;function Va(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ui.fromArray(s,r);const o=i.x*Math.abs(Ui.x)+i.y*Math.abs(Ui.y)+i.z*Math.abs(Ui.z),c=e.dot(Ui),l=t.dot(Ui),h=n.dot(Ui);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const tp=new Mn,js=new D,Ga=new D;class jn{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):tp.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;js.subVectors(e,this.center);const t=js.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(js,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(js.copy(e.center).add(Ga)),this.expandByPoint(js.copy(e.center).sub(Ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Zn=new D,Wa=new D,Ur=new D,_i=new D,$a=new D,Fr=new D,Xa=new D;class Ar{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zn.copy(this.origin).addScaledVector(this.direction,t),Zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Wa.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(Wa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ur),o=_i.dot(this.direction),c=-_i.dot(Ur),l=_i.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Wa).addScaledVector(Ur,d),f}intersectSphere(e,t){Zn.subVectors(e.center,this.origin);const n=Zn.dot(this.direction),i=Zn.dot(Zn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Zn)!==null}intersectTriangle(e,t,n,i,r){$a.subVectors(t,e),Fr.subVectors(n,e),Xa.crossVectors($a,Fr);let a=this.direction.dot(Xa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);const c=o*this.direction.dot(Fr.crossVectors(_i,Fr));if(c<0)return null;const l=o*this.direction.dot($a.cross(_i));if(l<0||c+l>a)return null;const h=-o*_i.dot(Xa);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m)}set(e,t,n,i,r,a,o,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),a=1/os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(np,e,ip)}lookAt(e,t,n){const i=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),vi.crossVectors(n,_n),vi.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),vi.crossVectors(n,_n)),vi.normalize(),Or.crossVectors(_n,vi),i[0]=vi.x,i[4]=Or.x,i[8]=_n.x,i[1]=vi.y,i[5]=Or.y,i[9]=_n.y,i[2]=vi.z,i[6]=Or.z,i[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],y=n[7],v=n[11],S=n[15],T=i[0],R=i[4],I=i[8],b=i[12],w=i[1],L=i[5],U=i[9],V=i[13],Y=i[2],Q=i[6],G=i[10],ce=i[14],$=i[3],pe=i[7],Me=i[11],Se=i[15];return r[0]=a*T+o*w+c*Y+l*$,r[4]=a*R+o*L+c*Q+l*pe,r[8]=a*I+o*U+c*G+l*Me,r[12]=a*b+o*V+c*ce+l*Se,r[1]=h*T+u*w+d*Y+f*$,r[5]=h*R+u*L+d*Q+f*pe,r[9]=h*I+u*U+d*G+f*Me,r[13]=h*b+u*V+d*ce+f*Se,r[2]=g*T+_*w+m*Y+p*$,r[6]=g*R+_*L+m*Q+p*pe,r[10]=g*I+_*U+m*G+p*Me,r[14]=g*b+_*V+m*ce+p*Se,r[3]=x*T+y*w+v*Y+S*$,r[7]=x*R+y*L+v*Q+S*pe,r[11]=x*I+y*U+v*G+S*Me,r[15]=x*b+y*V+v*ce+S*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-i*l*u-r*o*d+n*l*d+i*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-i*a*f+i*l*h-r*c*h)+m*(+t*l*u-t*o*f-r*a*u+n*a*f+r*o*h-n*l*h)+p*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=u*m*l-_*d*l+_*c*f-o*m*f-u*c*p+o*d*p,y=g*d*l-h*m*l-g*c*f+a*m*f+h*c*p-a*d*p,v=h*_*l-g*u*l+g*o*f-a*_*f-h*o*p+a*u*p,S=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,T=t*x+n*y+i*v+r*S;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/T;return e[0]=x*R,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*R,e[2]=(o*m*r-_*c*r+_*i*l-n*m*l-o*i*p+n*c*p)*R,e[3]=(u*c*r-o*d*r-u*i*l+n*d*l+o*i*f-n*c*f)*R,e[4]=y*R,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*R,e[6]=(g*c*r-a*m*r-g*i*l+t*m*l+a*i*p-t*c*p)*R,e[7]=(a*d*r-h*c*r+h*i*l-t*d*l-a*i*f+t*c*f)*R,e[8]=v*R,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*R,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*R,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*f-t*o*f)*R,e[12]=S*R,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*R,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*m-t*o*m)*R,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*R,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,x=c*l,y=c*h,v=c*u,S=n.x,T=n.y,R=n.z;return i[0]=(1-(_+p))*S,i[1]=(f+v)*S,i[2]=(g-y)*S,i[3]=0,i[4]=(f-v)*T,i[5]=(1-(d+p))*T,i[6]=(m+x)*T,i[7]=0,i[8]=(g+y)*R,i[9]=(m-x)*R,i[10]=(1-(d+_))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=os.set(i[0],i[1],i[2]).length();const a=os.set(i[4],i[5],i[6]).length(),o=os.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],In.copy(this);const l=1/r,h=1/a,u=1/o;return In.elements[0]*=l,In.elements[1]*=l,In.elements[2]*=l,In.elements[4]*=h,In.elements[5]*=h,In.elements[6]*=h,In.elements[8]*=u,In.elements[9]*=u,In.elements[10]*=u,t.setFromRotationMatrix(In),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=$n,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===$n)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ba)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=$n,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===$n)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===ba)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const os=new D,In=new rt,np=new D(0,0,0),ip=new D(1,1,1),vi=new D,Or=new D,_n=new D,Cl=new rt,Pl=new Cn;class Pn{constructor(e=0,t=0,n=0,i=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Cl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pl.setFromEuler(this),this.setFromQuaternion(Pl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class mu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sp=0;const Ll=new D,cs=new Cn,Jn=new rt,kr=new D,Ks=new D,rp=new D,ap=new Cn,Dl=new D(1,0,0),Il=new D(0,1,0),Nl=new D(0,0,1),Ul={type:"added"},op={type:"removed"},ls={type:"childadded",child:null},qa={type:"childremoved",child:null};class xt extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new D,t=new Pn,n=new Cn,i=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new lt}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.multiply(cs),this}rotateOnWorldAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.premultiply(cs),this}rotateX(e){return this.rotateOnAxis(Dl,e)}rotateY(e){return this.rotateOnAxis(Il,e)}rotateZ(e){return this.rotateOnAxis(Nl,e)}translateOnAxis(e,t){return Ll.copy(e).applyQuaternion(this.quaternion),this.position.add(Ll.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dl,e)}translateY(e){return this.translateOnAxis(Il,e)}translateZ(e){return this.translateOnAxis(Nl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?kr.copy(e):kr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Ks,kr,this.up):Jn.lookAt(kr,Ks,this.up),this.quaternion.setFromRotationMatrix(Jn),i&&(Jn.extractRotation(i.matrixWorld),cs.setFromRotationMatrix(Jn),this.quaternion.premultiply(cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ul),ls.child=e,this.dispatchEvent(ls),ls.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(op),qa.child=e,this.dispatchEvent(qa),qa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ul),ls.child=e,this.dispatchEvent(ls),ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,rp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,ap,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}xt.DEFAULT_UP=new D(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Nn=new D,Qn=new D,Ya=new D,ei=new D,hs=new D,us=new D,Fl=new D,ja=new D,Ka=new D,Za=new D,Ja=new yt,Qa=new yt,eo=new yt;class An{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Nn.subVectors(e,t),i.cross(Nn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Nn.subVectors(i,t),Qn.subVectors(n,t),Ya.subVectors(e,t);const a=Nn.dot(Nn),o=Nn.dot(Qn),c=Nn.dot(Ya),l=Qn.dot(Qn),h=Qn.dot(Ya),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ei.x),c.addScaledVector(a,ei.y),c.addScaledVector(o,ei.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return Ja.setScalar(0),Qa.setScalar(0),eo.setScalar(0),Ja.fromBufferAttribute(e,t),Qa.fromBufferAttribute(e,n),eo.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ja,r.x),a.addScaledVector(Qa,r.y),a.addScaledVector(eo,r.z),a}static isFrontFacing(e,t,n,i){return Nn.subVectors(n,t),Qn.subVectors(e,t),Nn.cross(Qn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Nn.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return An.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;hs.subVectors(i,n),us.subVectors(r,n),ja.subVectors(e,n);const c=hs.dot(ja),l=us.dot(ja);if(c<=0&&l<=0)return t.copy(n);Ka.subVectors(e,i);const h=hs.dot(Ka),u=us.dot(Ka);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(hs,a);Za.subVectors(e,r);const f=hs.dot(Za),g=us.dot(Za);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(us,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Fl.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Fl,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(hs,a).addScaledVector(us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const gu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},Br={h:0,s:0,l:0};function to(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,gt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=gt.workingColorSpace){if(e=Hc(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=to(a,r,e+1/3),this.g=to(a,r,e),this.b=to(a,r,e-1/3)}return gt.colorSpaceToWorking(this,i),this}setStyle(e,t=kt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const n=gu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return gt.workingToColorSpace(Zt.copy(this),e),Math.round(ct(Zt.r*255,0,255))*65536+Math.round(ct(Zt.g*255,0,255))*256+Math.round(ct(Zt.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.workingToColorSpace(Zt.copy(this),t);const n=Zt.r,i=Zt.g,r=Zt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=gt.workingColorSpace){return gt.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=kt){gt.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,n=Zt.g,i=Zt.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(Br);const n=lr(xi.h,Br.h,t),i=lr(xi.s,Br.s,t),r=lr(xi.l,Br.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new Je;Je.NAMES=gu;let cp=0;class Bn extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=Ss,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Do,this.blendDst=Io,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ns,this.stencilZFail=ns,this.stencilZPass=ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ss&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Do&&(n.blendSrc=this.blendSrc),this.blendDst!==Io&&(n.blendDst=this.blendDst),this.blendEquation!==$i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Rs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ns&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ns&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ns&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class On extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bt=new D,zr=new we;let lp=0;class zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vc,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.applyMatrix3(e),this.setXY(t,zr.x,zr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Un(t,this.array)),t}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Un(t,this.array)),t}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Un(t,this.array)),t}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vc&&(e.usage=this.usage),e}}class _u extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class vu extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Pt extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let hp=0;const wn=new rt,no=new xt,ds=new D,vn=new Mn,Zs=new Mn,Yt=new D;class St extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hp++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fu(e)?vu:_u)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,t,n){return wn.makeTranslation(e,t,n),this.applyMatrix4(wn),this}scale(e,t,n){return wn.makeScale(e,t,n),this.applyMatrix4(wn),this}lookAt(e){return no.lookAt(e),no.updateMatrix(),this.applyMatrix4(no.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];vn.setFromBufferAttribute(r),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Zs.setFromBufferAttribute(o),this.morphTargetsRelative?(Yt.addVectors(vn.min,Zs.min),vn.expandByPoint(Yt),Yt.addVectors(vn.max,Zs.max),vn.expandByPoint(Yt)):(vn.expandByPoint(Zs.min),vn.expandByPoint(Zs.max))}vn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Yt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Yt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Yt.fromBufferAttribute(o,l),c&&(ds.fromBufferAttribute(e,l),Yt.add(ds)),i=Math.max(i,n.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new D,c[I]=new D;const l=new D,h=new D,u=new D,d=new we,f=new we,g=new we,_=new D,m=new D;function p(I,b,w){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,w),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,w),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),o[I].add(_),o[b].add(_),o[w].add(_),c[I].add(m),c[b].add(m),c[w].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let I=0,b=x.length;I<b;++I){const w=x[I],L=w.start,U=w.count;for(let V=L,Y=L+U;V<Y;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const y=new D,v=new D,S=new D,T=new D;function R(I){S.fromBufferAttribute(i,I),T.copy(S);const b=o[I];y.copy(b),y.sub(S.multiplyScalar(S.dot(b))).normalize(),v.crossVectors(T,b);const L=v.dot(c[I])<0?-1:1;a.setXYZW(I,y.x,y.y,y.z,L)}for(let I=0,b=x.length;I<b;++I){const w=x[I],L=w.start,U=w.count;for(let V=L,Y=L+U;V<Y;V+=3)R(e.getX(V+0)),R(e.getX(V+1)),R(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new D,r=new D,a=new D,o=new D,c=new D,l=new D,h=new D,u=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new zt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ol=new rt,Fi=new Ar,Hr=new jn,kl=new D,Vr=new D,Gr=new D,Wr=new D,io=new D,$r=new D,Bl=new D,Xr=new D;class nt extends xt{constructor(e=new St,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){$r.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(io.fromBufferAttribute(u,e),a?$r.addScaledVector(io,h):$r.addScaledVector(io.sub(t),h))}t.add($r)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(Hr.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Hr,kl)===null||Fi.origin.distanceToSquared(kl)>(e.far-e.near)**2))&&(Ol.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(Ol),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,S=y;v<S;v+=3){const T=o.getX(v),R=o.getX(v+1),I=o.getX(v+2);i=qr(this,p,e,n,l,h,u,T,R,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=o.getX(m),y=o.getX(m+1),v=o.getX(m+2);i=qr(this,a,e,n,l,h,u,x,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,S=y;v<S;v+=3){const T=v,R=v+1,I=v+2;i=qr(this,p,e,n,l,h,u,T,R,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,y=m+1,v=m+2;i=qr(this,a,e,n,l,h,u,x,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function up(s,e,t,n,i,r,a,o){let c;if(e.side===on?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===di,o),c===null)return null;Xr.copy(o),Xr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Xr);return l<t.near||l>t.far?null:{distance:l,point:Xr.clone(),object:s}}function qr(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Vr),s.getVertexPosition(c,Gr),s.getVertexPosition(l,Wr);const h=up(s,e,t,n,Vr,Gr,Wr,Bl);if(h){const u=new D;An.getBarycoord(Bl,Vr,Gr,Wr,u),i&&(h.uv=An.getInterpolatedAttribute(i,o,c,l,u,new we)),r&&(h.uv1=An.getInterpolatedAttribute(r,o,c,l,u,new we)),a&&(h.normal=An.getInterpolatedAttribute(a,o,c,l,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new D,materialIndex:0};An.getNormal(Vr,Gr,Wr,d.normal),h.face=d,h.barycoord=u}return h}class un extends St{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Pt(l,3)),this.setAttribute("normal",new Pt(h,3)),this.setAttribute("uv",new Pt(u,2));function g(_,m,p,x,y,v,S,T,R,I,b){const w=v/R,L=S/I,U=v/2,V=S/2,Y=T/2,Q=R+1,G=I+1;let ce=0,$=0;const pe=new D;for(let Me=0;Me<G;Me++){const Se=Me*L-V;for(let Ee=0;Ee<Q;Ee++){const at=Ee*w-U;pe[_]=at*x,pe[m]=Se*y,pe[p]=Y,l.push(pe.x,pe.y,pe.z),pe[_]=0,pe[m]=0,pe[p]=T>0?1:-1,h.push(pe.x,pe.y,pe.z),u.push(Ee/R),u.push(1-Me/I),ce+=1}}for(let Me=0;Me<I;Me++)for(let Se=0;Se<R;Se++){const Ee=d+Se+Q*Me,at=d+Se+Q*(Me+1),Ge=d+(Se+1)+Q*(Me+1),it=d+(Se+1)+Q*Me;c.push(Ee,at,it),c.push(at,Ge,it),$+=6}o.addGroup(f,$,b),f+=$,d+=ce}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new un(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Is(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function nn(s){const e={};for(let t=0;t<s.length;t++){const n=Is(s[t]);for(const i in n)e[i]=n[i]}return e}function dp(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function xu(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}const fp={clone:Is,merge:nn};var pp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pp,this.fragmentShader=mp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Is(e.uniforms),this.uniformsGroups=dp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yu extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=$n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yi=new D,zl=new we,Hl=new we;class rn extends yu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ds*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ds*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,zl,Hl),t.subVectors(Hl,zl)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ws*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fs=-90,ps=1;class gp extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new rn(fs,ps,e,t);i.layers=this.layers,this.add(i);const r=new rn(fs,ps,e,t);r.layers=this.layers,this.add(r);const a=new rn(fs,ps,e,t);a.layers=this.layers,this.add(a);const o=new rn(fs,ps,e,t);o.layers=this.layers,this.add(o);const c=new rn(fs,ps,e,t);c.layers=this.layers,this.add(c);const l=new rn(fs,ps,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===$n)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ba)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Mu extends $t{constructor(e=[],t=Cs,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _p extends Yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Mu(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new un(5,5,5),r=new Pi({name:"CubemapFromEquirect",uniforms:Is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:Ti});r.uniforms.tEquirect.value=t;const a=new nt(i,r),o=t.minFilter;return t.minFilter===ci&&(t.minFilter=yn),new gp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}class bt extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vp={type:"move"};class so{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vp)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class bu extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class xp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=vc,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const tn=new D;class Wc{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Wc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Vl=new D,Gl=new yt,Wl=new yt,yp=new D,$l=new rt,Yr=new D,ro=new jn,Xl=new rt,ao=new Ar;class Mp extends nt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vl,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Yr),this.boundingBox.expandByPoint(Yr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Yr),this.boundingSphere.expandByPoint(Yr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ro.copy(this.boundingSphere),ro.applyMatrix4(i),e.ray.intersectsSphere(ro)!==!1&&(Xl.copy(i).invert(),ao.copy(e.ray).applyMatrix4(Xl),!(this.boundingBox!==null&&ao.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ao)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===vl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===vf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Gl.fromBufferAttribute(i.attributes.skinIndex,e),Wl.fromBufferAttribute(i.attributes.skinWeight,e),Vl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Wl.getComponent(r);if(a!==0){const o=Gl.getComponent(r);$l.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(yp.copy(Vl).applyMatrix4($l),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Su extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class wu extends $t{constructor(e=null,t=1,n=1,i,r,a,o,c,l=cn,h=cn,u,d){super(null,a,o,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ql=new rt,bp=new rt;class $c{constructor(e=[],t=[]){this.uuid=kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:bp;ql.multiplyMatrices(o,t[r]),ql.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new $c(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new wu(t,e,e,Rn,Fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Su),this.bones.push(a),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class xc extends zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ms=new rt,Yl=new rt,jr=[],jl=new Mn,Sp=new rt,Js=new nt,Qs=new jn;class Ns extends nt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Sp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ms),jl.copy(e.boundingBox).applyMatrix4(ms),this.boundingBox.union(jl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ms),Qs.copy(e.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(Qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Js.geometry=this.geometry,Js.material=this.material,Js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),e.ray.intersectsSphere(Qs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ms),Yl.multiplyMatrices(n,ms),Js.matrixWorld=Yl,Js.raycast(e,jr);for(let a=0,o=jr.length;a<o;a++){const c=jr[a];c.instanceId=r,c.object=this,t.push(c)}jr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new xc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new wu(new Float32Array(i*this.count),i,this.count,Fc,Fn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const oo=new D,wp=new D,Ep=new lt;class Si{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=oo.subVectors(n,t).cross(wp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(oo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ep.getNormalMatrix(e),i=this.coplanarPoint(oo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Oi=new jn,Tp=new we(.5,.5),Kr=new D;class Xc{constructor(e=new Si,t=new Si,n=new Si,i=new Si,r=new Si,a=new Si){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=$n,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],x=r[12],y=r[13],v=r[14],S=r[15];if(i[0].setComponents(l-a,f-h,p-g,S-x).normalize(),i[1].setComponents(l+a,f+h,p+g,S+x).normalize(),i[2].setComponents(l+o,f+u,p+_,S+y).normalize(),i[3].setComponents(l-o,f-u,p-_,S-y).normalize(),n)i[4].setComponents(c,d,m,v).normalize(),i[5].setComponents(l-c,f-d,p-m,S-v).normalize();else if(i[4].setComponents(l-c,f-d,p-m,S-v).normalize(),t===$n)i[5].setComponents(l+c,f+d,p+m,S+v).normalize();else if(t===ba)i[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(e){Oi.center.set(0,0,0);const t=Tp.distanceTo(e.center);return Oi.radius=.7071067811865476+t,Oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Kr.x=i.normal.x>0?e.max.x:e.min.x,Kr.y=i.normal.y>0?e.max.y:e.min.y,Kr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ji extends Bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Sa=new D,wa=new D,Kl=new rt,er=new Ar,Zr=new jn,co=new D,Zl=new D;class Ki extends xt{constructor(e=new St,t=new ji){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Sa.fromBufferAttribute(t,i-1),wa.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Sa.distanceTo(wa);e.setAttribute("lineDistance",new Pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(i),Zr.radius+=r,e.ray.intersectsSphere(Zr)===!1)return;Kl.copy(i).invert(),er.copy(e.ray).applyMatrix4(Kl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),x=h.getX(_+1),y=Jr(this,e,er,c,p,x,_);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=Jr(this,e,er,c,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=Jr(this,e,er,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Jr(this,e,er,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Jr(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(Sa.fromBufferAttribute(o,i),wa.fromBufferAttribute(o,r),t.distanceSqToSegment(Sa,wa,co,Zl)>n)return;co.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(co);if(!(l<e.near||l>e.far))return{distance:l,point:Zl.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Jl=new D,Ql=new D;class qc extends Ki{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Jl.fromBufferAttribute(t,i),Ql.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Jl.distanceTo(Ql);e.setAttribute("lineDistance",new Pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ap extends Ki{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Eu extends Bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const eh=new rt,yc=new Ar,Qr=new jn,ea=new D;class Rp extends xt{constructor(e=new St,t=new Eu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(i),Qr.radius+=r,e.ray.intersectsSphere(Qr)===!1)return;eh.copy(i).invert(),yc.copy(e.ray).applyMatrix4(eh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);ea.fromBufferAttribute(u,m),th(ea,m,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)ea.fromBufferAttribute(u,g),th(ea,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function th(s,e,t,n,i,r,a){const o=yc.distanceSqToPoint(s);if(o<t){const c=new D;yc.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Tu extends $t{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Au extends $t{constructor(e,t,n=qi,i,r,a,o=cn,c=cn,l,h=_r,u=1){if(h!==_r&&h!==vr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ru extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ca extends St{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new D,h=new we;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Pt(a,3)),this.setAttribute("normal",new Pt(o,3)),this.setAttribute("uv",new Pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class pn extends St{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;x(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Pt(u,3)),this.setAttribute("normal",new Pt(d,3)),this.setAttribute("uv",new Pt(f,2));function x(){const v=new D,S=new D;let T=0;const R=(t-e)/n;for(let I=0;I<=r;I++){const b=[],w=I/r,L=w*(t-e)+e;for(let U=0;U<=i;U++){const V=U/i,Y=V*c+o,Q=Math.sin(Y),G=Math.cos(Y);S.x=L*Q,S.y=-w*n+m,S.z=L*G,u.push(S.x,S.y,S.z),v.set(Q,R,G).normalize(),d.push(v.x,v.y,v.z),f.push(V,1-w),b.push(g++)}_.push(b)}for(let I=0;I<i;I++)for(let b=0;b<r;b++){const w=_[b][I],L=_[b+1][I],U=_[b+1][I+1],V=_[b][I+1];(e>0||b!==0)&&(h.push(w,L,V),T+=3),(t>0||b!==r-1)&&(h.push(L,U,V),T+=3)}l.addGroup(p,T,0),p+=T}function y(v){const S=g,T=new we,R=new D;let I=0;const b=v===!0?e:t,w=v===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,m*w,0),d.push(0,w,0),f.push(.5,.5),g++;const L=g;for(let U=0;U<=i;U++){const Y=U/i*c+o,Q=Math.cos(Y),G=Math.sin(Y);R.x=b*G,R.y=m*w,R.z=b*Q,u.push(R.x,R.y,R.z),d.push(0,w,0),T.x=Q*.5+.5,T.y=G*.5*w+.5,f.push(T.x,T.y),g++}for(let U=0;U<i;U++){const V=S+U,Y=L+U;v===!0?h.push(Y,Y+1,V):h.push(Y+1,Y,V),I+=3}l.addGroup(p,I,v===!0?1:2),p+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const ta=new D,na=new D,lo=new D,ia=new An;class Cu extends St{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(ws*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=ia;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),ia.getNormal(lo),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const y=(x+1)%3,v=u[x],S=u[y],T=ia[h[x]],R=ia[h[y]],I=`${v}_${S}`,b=`${S}_${v}`;b in d&&d[b]?(lo.dot(d[b].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(R.x,R.y,R.z)),d[b]=null):I in d||(d[I]={index0:l[x],index1:l[y],normal:lo.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];ta.fromBufferAttribute(o,_),na.fromBufferAttribute(o,m),f.push(ta.x,ta.y,ta.z),f.push(na.x,na.y,na.z)}this.setAttribute("position",new Pt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class fi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new we:new D);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new D,i=[],r=[],a=[],o=new D,c=new rt;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ct(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ct(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Pu extends fi{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new we){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Cp extends Pu{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Yc(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const sa=new D,ho=new Yc,uo=new Yc,fo=new Yc;class Lu extends fi{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new D){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(sa.subVectors(i[0],i[1]).add(i[0]),l=sa);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(sa.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=sa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),ho.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),uo.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),fo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(ho.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),uo.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),fo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(ho.calc(c),uo.calc(c),fo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new D().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function nh(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function Pp(s,e){const t=1-s;return t*t*e}function Lp(s,e){return 2*(1-s)*s*e}function Dp(s,e){return s*s*e}function hr(s,e,t,n){return Pp(s,e)+Lp(s,t)+Dp(s,n)}function Ip(s,e){const t=1-s;return t*t*t*e}function Np(s,e){const t=1-s;return 3*t*t*s*e}function Up(s,e){return 3*(1-s)*s*s*e}function Fp(s,e){return s*s*s*e}function ur(s,e,t,n,i){return Ip(s,e)+Np(s,t)+Up(s,n)+Fp(s,i)}class Op extends fi{constructor(e=new we,t=new we,n=new we,i=new we){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new we){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ur(e,i.x,r.x,a.x,o.x),ur(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class kp extends fi{constructor(e=new D,t=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new D){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ur(e,i.x,r.x,a.x,o.x),ur(e,i.y,r.y,a.y,o.y),ur(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Bp extends fi{constructor(e=new we,t=new we){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new we){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new we){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zp extends fi{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hp extends fi{constructor(e=new we,t=new we,n=new we){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new we){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(hr(e,i.x,r.x,a.x),hr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Du extends fi{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(hr(e,i.x,r.x,a.x),hr(e,i.y,r.y,a.y),hr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vp extends fi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new we){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(nh(o,c.x,l.x,h.x,u.x),nh(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new we().fromArray(i))}return this}}var Gp=Object.freeze({__proto__:null,ArcCurve:Cp,CatmullRomCurve3:Lu,CubicBezierCurve:Op,CubicBezierCurve3:kp,EllipseCurve:Pu,LineCurve:Bp,LineCurve3:zp,QuadraticBezierCurve:Hp,QuadraticBezierCurve3:Du,SplineCurve:Vp});class Gs extends St{constructor(e=[new we(0,-.5),new we(.5,0),new we(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ct(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],h=1/t,u=new D,d=new we,f=new D,g=new D,_=new D;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let x=0;x<=t;x++){const y=n+x*h*i,v=Math.sin(y),S=Math.cos(y);for(let T=0;T<=e.length-1;T++){u.x=e[T].x*v,u.y=e[T].y,u.z=e[T].x*S,a.push(u.x,u.y,u.z),d.x=x/t,d.y=T/(e.length-1),o.push(d.x,d.y);const R=c[3*T+0]*v,I=c[3*T+1],b=c[3*T+0]*S;l.push(R,I,b)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const v=y+x*e.length,S=v,T=v+e.length,R=v+e.length+1,I=v+1;r.push(S,T,I),r.push(R,I,T)}this.setIndex(r),this.setAttribute("position",new Pt(a,3)),this.setAttribute("uv",new Pt(o,2)),this.setAttribute("normal",new Pt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.points,e.segments,e.phiStart,e.phiLength)}}class Li extends St{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const x=p*d-a;for(let y=0;y<l;y++){const v=y*u-r;g.push(v,-x,0),_.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<o;x++){const y=x+l*p,v=x+l*(p+1),S=x+1+l*(p+1),T=x+1+l*p;f.push(y,v,T),f.push(v,S,T)}this.setIndex(f),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Li(e.width,e.height,e.widthSegments,e.heightSegments)}}class jc extends St{constructor(e=new Du(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new D,c=new D,l=new we;let h=new D;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Pt(u,3)),this.setAttribute("normal",new Pt(d,3)),this.setAttribute("uv",new Pt(f,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),x(),p()}function m(y){h=e.getPointAt(y/t,h);const v=a.normals[y],S=a.binormals[y];for(let T=0;T<=i;T++){const R=T/i*Math.PI*2,I=Math.sin(R),b=-Math.cos(R);c.x=b*v.x+I*S.x,c.y=b*v.y+I*S.y,c.z=b*v.z+I*S.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function p(){for(let y=1;y<=t;y++)for(let v=1;v<=i;v++){const S=(i+1)*(y-1)+(v-1),T=(i+1)*y+(v-1),R=(i+1)*y+v,I=(i+1)*(y-1)+v;g.push(S,T,I),g.push(T,R,I)}}function x(){for(let y=0;y<=t;y++)for(let v=0;v<=i;v++)l.x=y/t,l.y=v/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new jc(new Gp[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ot extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class hn extends ot{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Wp extends Bn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $p extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xp extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ih extends ji{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function ra(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function qp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Yp(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function sh(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Iu(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Rr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class jp extends Rr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xl,endingEnd:xl}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case yl:r=e,o=2*t-n;break;case Ml:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case yl:a=e,c=2*n-t;break;case Ml:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,x=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,v=f*m-f*_;for(let S=0;S!==o;++S)r[S]=p*a[h+S]+x*a[l+S]+y*a[c+S]+v*a[u+S];return r}}class Kp extends Rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}}class Zp extends Rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Hn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ra(t,this.TimeBufferType),this.values=ra(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ra(e.times,Array),values:ra(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Zp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Kp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new jp(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case xr:t=this.InterpolantFactoryMethodDiscrete;break;case yr:t=this.InterpolantFactoryMethodLinear;break;case Oa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xr;case this.InterpolantFactoryMethodLinear:return yr;case this.InterpolantFactoryMethodSmooth:return Oa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&qp(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Oa,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Hn.prototype.ValueTypeName="";Hn.prototype.TimeBufferType=Float32Array;Hn.prototype.ValueBufferType=Float32Array;Hn.prototype.DefaultInterpolation=yr;class Ws extends Hn{constructor(e,t,n){super(e,t,n)}}Ws.prototype.ValueTypeName="bool";Ws.prototype.ValueBufferType=Array;Ws.prototype.DefaultInterpolation=xr;Ws.prototype.InterpolantFactoryMethodLinear=void 0;Ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Nu extends Hn{constructor(e,t,n,i){super(e,t,n,i)}}Nu.prototype.ValueTypeName="color";class Us extends Hn{constructor(e,t,n,i){super(e,t,n,i)}}Us.prototype.ValueTypeName="number";class Jp extends Rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let h=l+o;l!==h;l+=4)Cn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Fs extends Hn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Jp(this.times,this.values,this.getValueSize(),e)}}Fs.prototype.ValueTypeName="quaternion";Fs.prototype.InterpolantFactoryMethodSmooth=void 0;class $s extends Hn{constructor(e,t,n){super(e,t,n)}}$s.prototype.ValueTypeName="string";$s.prototype.ValueBufferType=Array;$s.prototype.DefaultInterpolation=xr;$s.prototype.InterpolantFactoryMethodLinear=void 0;$s.prototype.InterpolantFactoryMethodSmooth=void 0;class Os extends Hn{constructor(e,t,n,i){super(e,t,n,i)}}Os.prototype.ValueTypeName="vector";class Qp{constructor(e="",t=-1,n=[],i=xf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=kn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(tm(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Hn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const h=Yp(c);c=sh(c,1,h),l=sh(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Us(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];Iu(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let x=0;x!==d[g].morphTargets.length;++x){const y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new Us(".morphTargetInfluence["+_+"]",m,p))}c=f.length*a}else{const f=".bones["+t[u].name+"]";n(Os,f+".position",d,"pos",i),n(Fs,f+".quaternion",d,"rot",i),n(Os,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function em(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Us;case"vector":case"vector2":case"vector3":case"vector4":return Os;case"color":return Nu;case"quaternion":return Fs;case"bool":case"boolean":return Ws;case"string":return $s}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function tm(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=em(s.type);if(s.times===void 0){const t=[],n=[];Iu(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const li={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Uu{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const nm=new Uu;class Ji{constructor(e){this.manager=e!==void 0?e:nm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ji.DEFAULT_MATERIAL_NAME="__DEFAULT";const ti={};class im extends Error{constructor(e,t){super(e),this.response=t}}class Kc extends Ji{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=li.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ti[e]!==void 0){ti[e].push({onLoad:t,onProgress:n,onError:i});return}ti[e]=[],ti[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=ti[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){x();function x(){u.read().then(({done:y,value:v})=>{if(y)p.close();else{_+=v.byteLength;const S=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let T=0,R=h.length;T<R;T++){const I=h[T];I.onProgress&&I.onProgress(S)}p.enqueue(v),x()}},y=>{p.error(y)})}}});return new Response(m)}else throw new im(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{li.add(`file:${e}`,l);const h=ti[e];delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=ti[e];if(h===void 0)throw this.manager.itemError(e),l;delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const gs=new WeakMap;class sm extends Ji{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=li.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=gs.get(a);u===void 0&&(u=[],gs.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=Mr("img");function c(){h(),t&&t(this);const u=gs.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}gs.delete(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),li.remove(`image:${e}`);const d=gs.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}gs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),li.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class rm extends Ji{constructor(e){super(e)}load(e,t,n,i){const r=new $t,a=new sm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Pa extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class am extends Pa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const po=new rt,rh=new D,ah=new D;class Zc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=Yn,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xc,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;rh.setFromMatrixPosition(e.matrixWorld),t.position.copy(rh),ah.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ah),t.updateMatrixWorld(),po.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(po,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(po)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class om extends Zc{constructor(){super(new rn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ds*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class cm extends Pa{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new om}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const oh=new rt,tr=new D,mo=new D;class lm extends Zc{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new we(4,2),this._viewportCount=6,this._viewports=[new yt(2,1,1,1),new yt(0,1,1,1),new yt(3,1,1,1),new yt(1,1,1,1),new yt(3,0,1,1),new yt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),tr.setFromMatrixPosition(e.matrixWorld),n.position.copy(tr),mo.copy(n.position),mo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(mo),n.updateMatrixWorld(),i.makeTranslation(-tr.x,-tr.y,-tr.z),oh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oh,n.coordinateSystem,n.reversedDepth)}}class Fu extends Pa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new lm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class La extends yu{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class hm extends Zc{constructor(){super(new La(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mc extends Pa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new hm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class dr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const go=new WeakMap;class um extends Ji{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=li.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if(go.has(a)===!0)i&&i(go.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return li.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),go.set(c,l),li.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});li.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class dm extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Jc="\\[\\]\\.:\\/",fm=new RegExp("["+Jc+"]","g"),Qc="[^"+Jc+"]",pm="[^"+Jc.replace("\\.","")+"]",mm=/((?:WC+[\/:])*)/.source.replace("WC",Qc),gm=/(WCOD+)?/.source.replace("WCOD",pm),_m=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qc),vm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qc),xm=new RegExp("^"+mm+gm+_m+vm+"$"),ym=["material","materials","bones","map"];class Mm{constructor(e,t,n){const i=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Tt{constructor(e,t,n){this.path=t,this.parsedPath=n||Tt.parseTrackName(t),this.node=Tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Tt.Composite(e,t,n):new Tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fm,"")}static parseTrackName(e){const t=xm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);ym.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Tt.Composite=Mm;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class ch{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ct(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ct(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class bm extends Zi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function lh(s,e,t,n){const i=Sm(n);switch(t){case cu:return s*e;case Fc:return s*e/i.components*i.byteLength;case Oc:return s*e/i.components*i.byteLength;case hu:return s*e*2/i.components*i.byteLength;case kc:return s*e*2/i.components*i.byteLength;case lu:return s*e*3/i.components*i.byteLength;case Rn:return s*e*4/i.components*i.byteLength;case Bc:return s*e*4/i.components*i.byteLength;case fa:case pa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ma:case ga:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Wo:case Xo:return Math.max(s,16)*Math.max(e,8)/4;case Go:case $o:return Math.max(s,8)*Math.max(e,8)/2;case qo:case Yo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case jo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ec:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case tc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case nc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ic:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case sc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case rc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ac:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case oc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case cc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case lc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case hc:case uc:case dc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case fc:case pc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case mc:case gc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sm(s){switch(s){case Yn:case su:return{byteLength:1,components:1};case mr:case ru:case Tr:return{byteLength:2,components:1};case Nc:case Uc:return{byteLength:2,components:4};case qi:case Ic:case Fn:return{byteLength:4,components:1};case au:case ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ou(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function wm(s){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(s.bindBuffer(l,o),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var Em=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tm=`#ifdef USE_ALPHAHASH
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
#endif`,Am=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lm=`#ifdef USE_AOMAP
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
#endif`,Dm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Im=`#ifdef USE_BATCHING
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
#endif`,Nm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Um=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Om=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,km=`#ifdef USE_IRIDESCENCE
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
#endif`,Bm=`#ifdef USE_BUMPMAP
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
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$m=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ym=`#define PI 3.141592653589793
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
} // validated`,jm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Km=`vec3 transformedNormal = objectNormal;
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
#endif`,Zm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ng=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ig=`#ifdef USE_ENVMAP
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
#endif`,sg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rg=`#ifdef USE_ENVMAP
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
#endif`,ag=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,og=`#ifdef USE_ENVMAP
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
#endif`,cg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ug=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dg=`#ifdef USE_GRADIENTMAP
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
}`,fg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gg=`uniform bool receiveShadow;
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
#endif`,_g=`#ifdef USE_ENVMAP
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
#endif`,vg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bg=`PhysicalMaterial material;
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
#endif`,Sg=`struct PhysicalMaterial {
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
}`,wg=`
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
#endif`,Eg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Tg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ag=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ig=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ng=`#if defined( USE_POINTS_UV )
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
#endif`,Ug=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Og=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zg=`#ifdef USE_MORPHTARGETS
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
#endif`,Hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Wg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qg=`#ifdef USE_NORMALMAP
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
#endif`,Yg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,e0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,t0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,n0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,i0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,s0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,r0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,o0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,c0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,l0=`float getShadowMask() {
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
}`,h0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,u0=`#ifdef USE_SKINNING
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
#endif`,d0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,f0=`#ifdef USE_SKINNING
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
#endif`,p0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,m0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,g0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,v0=`#ifdef USE_TRANSMISSION
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
#endif`,x0=`#ifdef USE_TRANSMISSION
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
#endif`,y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,M0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const w0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E0=`uniform sampler2D t2D;
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
}`,T0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,A0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P0=`#include <common>
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
}`,L0=`#if DEPTH_PACKING == 3200
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
}`,D0=`#define DISTANCE
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
}`,I0=`#define DISTANCE
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
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,U0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F0=`uniform float scale;
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
}`,O0=`uniform vec3 diffuse;
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
}`,k0=`#include <common>
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
}`,B0=`uniform vec3 diffuse;
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
}`,z0=`#define LAMBERT
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
}`,H0=`#define LAMBERT
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
}`,V0=`#define MATCAP
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
}`,G0=`#define MATCAP
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
}`,W0=`#define NORMAL
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
}`,$0=`#define NORMAL
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
}`,X0=`#define PHONG
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
}`,q0=`#define PHONG
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
}`,Y0=`#define STANDARD
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
}`,j0=`#define STANDARD
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
}`,K0=`#define TOON
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
}`,Z0=`#define TOON
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
}`,J0=`uniform float size;
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
}`,Q0=`uniform vec3 diffuse;
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
}`,e_=`#include <common>
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
}`,t_=`uniform vec3 color;
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
}`,n_=`uniform float rotation;
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
}`,i_=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:Em,alphahash_pars_fragment:Tm,alphamap_fragment:Am,alphamap_pars_fragment:Rm,alphatest_fragment:Cm,alphatest_pars_fragment:Pm,aomap_fragment:Lm,aomap_pars_fragment:Dm,batching_pars_vertex:Im,batching_vertex:Nm,begin_vertex:Um,beginnormal_vertex:Fm,bsdfs:Om,iridescence_fragment:km,bumpmap_pars_fragment:Bm,clipping_planes_fragment:zm,clipping_planes_pars_fragment:Hm,clipping_planes_pars_vertex:Vm,clipping_planes_vertex:Gm,color_fragment:Wm,color_pars_fragment:$m,color_pars_vertex:Xm,color_vertex:qm,common:Ym,cube_uv_reflection_fragment:jm,defaultnormal_vertex:Km,displacementmap_pars_vertex:Zm,displacementmap_vertex:Jm,emissivemap_fragment:Qm,emissivemap_pars_fragment:eg,colorspace_fragment:tg,colorspace_pars_fragment:ng,envmap_fragment:ig,envmap_common_pars_fragment:sg,envmap_pars_fragment:rg,envmap_pars_vertex:ag,envmap_physical_pars_fragment:_g,envmap_vertex:og,fog_vertex:cg,fog_pars_vertex:lg,fog_fragment:hg,fog_pars_fragment:ug,gradientmap_pars_fragment:dg,lightmap_pars_fragment:fg,lights_lambert_fragment:pg,lights_lambert_pars_fragment:mg,lights_pars_begin:gg,lights_toon_fragment:vg,lights_toon_pars_fragment:xg,lights_phong_fragment:yg,lights_phong_pars_fragment:Mg,lights_physical_fragment:bg,lights_physical_pars_fragment:Sg,lights_fragment_begin:wg,lights_fragment_maps:Eg,lights_fragment_end:Tg,logdepthbuf_fragment:Ag,logdepthbuf_pars_fragment:Rg,logdepthbuf_pars_vertex:Cg,logdepthbuf_vertex:Pg,map_fragment:Lg,map_pars_fragment:Dg,map_particle_fragment:Ig,map_particle_pars_fragment:Ng,metalnessmap_fragment:Ug,metalnessmap_pars_fragment:Fg,morphinstance_vertex:Og,morphcolor_vertex:kg,morphnormal_vertex:Bg,morphtarget_pars_vertex:zg,morphtarget_vertex:Hg,normal_fragment_begin:Vg,normal_fragment_maps:Gg,normal_pars_fragment:Wg,normal_pars_vertex:$g,normal_vertex:Xg,normalmap_pars_fragment:qg,clearcoat_normal_fragment_begin:Yg,clearcoat_normal_fragment_maps:jg,clearcoat_pars_fragment:Kg,iridescence_pars_fragment:Zg,opaque_fragment:Jg,packing:Qg,premultiplied_alpha_fragment:e0,project_vertex:t0,dithering_fragment:n0,dithering_pars_fragment:i0,roughnessmap_fragment:s0,roughnessmap_pars_fragment:r0,shadowmap_pars_fragment:a0,shadowmap_pars_vertex:o0,shadowmap_vertex:c0,shadowmask_pars_fragment:l0,skinbase_vertex:h0,skinning_pars_vertex:u0,skinning_vertex:d0,skinnormal_vertex:f0,specularmap_fragment:p0,specularmap_pars_fragment:m0,tonemapping_fragment:g0,tonemapping_pars_fragment:_0,transmission_fragment:v0,transmission_pars_fragment:x0,uv_pars_fragment:y0,uv_pars_vertex:M0,uv_vertex:b0,worldpos_vertex:S0,background_vert:w0,background_frag:E0,backgroundCube_vert:T0,backgroundCube_frag:A0,cube_vert:R0,cube_frag:C0,depth_vert:P0,depth_frag:L0,distanceRGBA_vert:D0,distanceRGBA_frag:I0,equirect_vert:N0,equirect_frag:U0,linedashed_vert:F0,linedashed_frag:O0,meshbasic_vert:k0,meshbasic_frag:B0,meshlambert_vert:z0,meshlambert_frag:H0,meshmatcap_vert:V0,meshmatcap_frag:G0,meshnormal_vert:W0,meshnormal_frag:$0,meshphong_vert:X0,meshphong_frag:q0,meshphysical_vert:Y0,meshphysical_frag:j0,meshtoon_vert:K0,meshtoon_frag:Z0,points_vert:J0,points_frag:Q0,shadow_vert:e_,shadow_frag:t_,sprite_vert:n_,sprite_frag:i_},Ce={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},Gn={basic:{uniforms:nn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:nn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:nn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:nn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:nn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:nn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:nn([Ce.points,Ce.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:nn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:nn([Ce.common,Ce.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:nn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:nn([Ce.sprite,Ce.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:nn([Ce.common,Ce.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:nn([Ce.lights,Ce.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Gn.physical={uniforms:nn([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const aa={r:0,b:0,g:0},ki=new Pn,s_=new rt;function r_(s,e,t,n,i,r,a){const o=new Je(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function _(y){let v=!1;const S=g(y);S===null?p(o,c):S&&S.isColor&&(p(S,1),v=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,v){const S=g(v);S&&(S.isCubeTexture||S.mapping===Ra)?(h===void 0&&(h=new nt(new un(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:Is(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,R,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ki.copy(v.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(s_.makeRotationFromEuler(ki)),h.material.toneMapped=gt.getTransfer(S.colorSpace)!==Rt,(u!==S||d!==S.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new nt(new Li(2,2),new Pi({name:"BackgroundMaterial",uniforms:Is(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=gt.getTransfer(S.colorSpace)!==Rt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,v){y.getRGB(aa,xu(s)),n.buffers.color.setClear(aa.r,aa.g,aa.b,v,a)}function x(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:_,addToRenderList:m,dispose:x}}function a_(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(w,L,U,V,Y){let Q=!1;const G=u(V,U,L);r!==G&&(r=G,l(r.object)),Q=f(w,V,U,Y),Q&&g(w,V,U,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,v(w,L,U,V),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return s.createVertexArray()}function l(w){return s.bindVertexArray(w)}function h(w){return s.deleteVertexArray(w)}function u(w,L,U){const V=U.wireframe===!0;let Y=n[w.id];Y===void 0&&(Y={},n[w.id]=Y);let Q=Y[L.id];Q===void 0&&(Q={},Y[L.id]=Q);let G=Q[V];return G===void 0&&(G=d(c()),Q[V]=G),G}function d(w){const L=[],U=[],V=[];for(let Y=0;Y<t;Y++)L[Y]=0,U[Y]=0,V[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:V,object:w,attributes:{},index:null}}function f(w,L,U,V){const Y=r.attributes,Q=L.attributes;let G=0;const ce=U.getAttributes();for(const $ in ce)if(ce[$].location>=0){const Me=Y[$];let Se=Q[$];if(Se===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(Se=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(Se=w.instanceColor)),Me===void 0||Me.attribute!==Se||Se&&Me.data!==Se.data)return!0;G++}return r.attributesNum!==G||r.index!==V}function g(w,L,U,V){const Y={},Q=L.attributes;let G=0;const ce=U.getAttributes();for(const $ in ce)if(ce[$].location>=0){let Me=Q[$];Me===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(Me=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(Me=w.instanceColor));const Se={};Se.attribute=Me,Me&&Me.data&&(Se.data=Me.data),Y[$]=Se,G++}r.attributes=Y,r.attributesNum=G,r.index=V}function _(){const w=r.newAttributes;for(let L=0,U=w.length;L<U;L++)w[L]=0}function m(w){p(w,0)}function p(w,L){const U=r.newAttributes,V=r.enabledAttributes,Y=r.attributeDivisors;U[w]=1,V[w]===0&&(s.enableVertexAttribArray(w),V[w]=1),Y[w]!==L&&(s.vertexAttribDivisor(w,L),Y[w]=L)}function x(){const w=r.newAttributes,L=r.enabledAttributes;for(let U=0,V=L.length;U<V;U++)L[U]!==w[U]&&(s.disableVertexAttribArray(U),L[U]=0)}function y(w,L,U,V,Y,Q,G){G===!0?s.vertexAttribIPointer(w,L,U,Y,Q):s.vertexAttribPointer(w,L,U,V,Y,Q)}function v(w,L,U,V){_();const Y=V.attributes,Q=U.getAttributes(),G=L.defaultAttributeValues;for(const ce in Q){const $=Q[ce];if($.location>=0){let pe=Y[ce];if(pe===void 0&&(ce==="instanceMatrix"&&w.instanceMatrix&&(pe=w.instanceMatrix),ce==="instanceColor"&&w.instanceColor&&(pe=w.instanceColor)),pe!==void 0){const Me=pe.normalized,Se=pe.itemSize,Ee=e.get(pe);if(Ee===void 0)continue;const at=Ee.buffer,Ge=Ee.type,it=Ee.bytesPerElement,te=Ge===s.INT||Ge===s.UNSIGNED_INT||pe.gpuType===Ic;if(pe.isInterleavedBufferAttribute){const se=pe.data,Te=se.stride,_e=pe.offset;if(se.isInstancedInterleavedBuffer){for(let me=0;me<$.locationSize;me++)p($.location+me,se.meshPerAttribute);w.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let me=0;me<$.locationSize;me++)m($.location+me);s.bindBuffer(s.ARRAY_BUFFER,at);for(let me=0;me<$.locationSize;me++)y($.location+me,Se/$.locationSize,Ge,Me,Te*it,(_e+Se/$.locationSize*me)*it,te)}else{if(pe.isInstancedBufferAttribute){for(let se=0;se<$.locationSize;se++)p($.location+se,pe.meshPerAttribute);w.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let se=0;se<$.locationSize;se++)m($.location+se);s.bindBuffer(s.ARRAY_BUFFER,at);for(let se=0;se<$.locationSize;se++)y($.location+se,Se/$.locationSize,Ge,Me,Se*it,Se/$.locationSize*se*it,te)}}else if(G!==void 0){const Me=G[ce];if(Me!==void 0)switch(Me.length){case 2:s.vertexAttrib2fv($.location,Me);break;case 3:s.vertexAttrib3fv($.location,Me);break;case 4:s.vertexAttrib4fv($.location,Me);break;default:s.vertexAttrib1fv($.location,Me)}}}}x()}function S(){I();for(const w in n){const L=n[w];for(const U in L){const V=L[U];for(const Y in V)h(V[Y].object),delete V[Y];delete L[U]}delete n[w]}}function T(w){if(n[w.id]===void 0)return;const L=n[w.id];for(const U in L){const V=L[U];for(const Y in V)h(V[Y].object),delete V[Y];delete L[U]}delete n[w.id]}function R(w){for(const L in n){const U=n[L];if(U[w.id]===void 0)continue;const V=U[w.id];for(const Y in V)h(V[Y].object),delete V[Y];delete U[w.id]}}function I(){b(),a=!0,r!==i&&(r=i,l(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function o_(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function c_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==Rn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const I=R===Tr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Yn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Fn&&!I)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=g>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:S,maxSamples:T}}function l_(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Si,o=new lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,y=x*4;let v=p.clippingState||null;c.value=v,v=h(g,d,y,f);for(let S=0;S!==y;++S)v[S]=t[S];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,v=f;y!==_;++y,v+=4)a.copy(u[y]).applyMatrix4(x,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function h_(s){let e=new WeakMap;function t(a,o){return o===Ho?a.mapping=Cs:o===Vo&&(a.mapping=Ps),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ho||o===Vo)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new _p(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Ms=4,hh=[.125,.215,.35,.446,.526,.582],Xi=20,_o=new La,uh=new Je;let vo=null,xo=0,yo=0,Mo=!1;const Gi=(1+Math.sqrt(5))/2,_s=1/Gi,dh=[new D(-Gi,_s,0),new D(Gi,_s,0),new D(-_s,0,Gi),new D(_s,0,Gi),new D(0,Gi,-_s),new D(0,Gi,_s),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],u_=new D;class bc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=u_}=r;vo=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),Mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vo,xo,yo),this._renderer.xr.enabled=Mo,e.scissorTest=!1,oa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Cs||e.mapping===Ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vo=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),Mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:Tr,format:Rn,colorSpace:ln,depthBuffer:!1},i=fh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=d_(r)),this._blurMaterial=f_(r,e,t)}return i}_compileMaterial(e){const t=new nt(this._lodPlanes[0],e);this._renderer.compile(t,_o)}_sceneToCubeUV(e,t,n,i,r){const c=new rn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(uh),u.toneMapping=Ai,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const _=new On({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),m=new nt(new un,_);let p=!1;const x=e.background;x?x.isColor&&(_.color.copy(x),e.background=null,p=!0):(_.color.copy(uh),p=!0);for(let y=0;y<6;y++){const v=y%3;v===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):v===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));const S=this._cubeSize;oa(i,v*S,y>2?S:0,S,S),u.setRenderTarget(i),p&&u.render(m,c),u.render(e,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Cs||e.mapping===Ps;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ph());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new nt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;oa(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,_o)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=dh[(i-r-1)%dh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new nt(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Xi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Xi;m>Xi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xi}`);const p=[];let x=0;for(let R=0;R<Xi;++R){const I=R/_,b=Math.exp(-I*I/2);p.push(b),R===0?x+=b:R<m&&(x+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const v=this._sizeLods[i],S=3*v*(i>y-Ms?i-y+Ms:0),T=4*(this._cubeSize-v);oa(t,S,T,3*v,2*v),c.setRenderTarget(t),c.render(u,_o)}}function d_(s){const e=[],t=[],n=[];let i=s;const r=s-Ms+1+hh.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-Ms?c=hh[a-s+Ms-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),y=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let T=0;T<f;T++){const R=T%3*2/3-1,I=T>2?0:-1,b=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];x.set(b,_*g*T),y.set(d,m*g*T);const w=[T,T,T,T,T,T];v.set(w,p*g*T)}const S=new St;S.setAttribute("position",new zt(x,_)),S.setAttribute("uv",new zt(y,m)),S.setAttribute("faceIndex",new zt(v,p)),e.push(S),i>Ms&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function fh(s,e,t){const n=new Yi(s,e,t);return n.texture.mapping=Ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function oa(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function f_(s,e,t){const n=new Float32Array(Xi),i=new D(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:Xi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:el(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function ph(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:el(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function mh(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:el(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function el(){return`

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
	`}function p_(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Ho||c===Vo,h=c===Cs||c===Ps;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new bc(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new bc(s)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function m_(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&br("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function g_(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let y=0,v=x.length;y<v;y+=3){const S=x[y+0],T=x[y+1],R=x[y+2];d.push(S,T,T,R,R,S)}}else if(g!==void 0){const x=g.array;_=g.version;for(let y=0,v=x.length/3-1;y<v;y+=3){const S=y+0,T=y+1,R=y+2;d.push(S,T,T,R,R,S)}}else return;const m=new(fu(d)?vu:_u)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function __(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*_[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function v_(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function x_(s,e,t){const n=new WeakMap,i=new yt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let b=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let v=o.attributes.position.count*y,S=1;v>e.maxTextureSize&&(S=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const T=new Float32Array(v*S*4*u),R=new pu(T,v,S,u);R.type=Fn,R.needsUpdate=!0;const I=y*4;for(let w=0;w<u;w++){const L=m[w],U=p[w],V=x[w],Y=v*S*4*w;for(let Q=0;Q<L.count;Q++){const G=Q*I;f===!0&&(i.fromBufferAttribute(L,Q),T[Y+G+0]=i.x,T[Y+G+1]=i.y,T[Y+G+2]=i.z,T[Y+G+3]=0),g===!0&&(i.fromBufferAttribute(U,Q),T[Y+G+4]=i.x,T[Y+G+5]=i.y,T[Y+G+6]=i.z,T[Y+G+7]=0),_===!0&&(i.fromBufferAttribute(V,Q),T[Y+G+8]=i.x,T[Y+G+9]=i.y,T[Y+G+10]=i.z,T[Y+G+11]=V.itemSize===4?i.w:1)}}d={count:u,texture:R,size:new we(v,S)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function y_(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const ku=new $t,gh=new Au(1,1),Bu=new pu,zu=new ep,Hu=new Mu,_h=[],vh=[],xh=new Float32Array(16),yh=new Float32Array(9),Mh=new Float32Array(4);function Xs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=_h[i];if(r===void 0&&(r=new Float32Array(i),_h[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Xt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function qt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Da(s,e){let t=vh[e];t===void 0&&(t=new Int32Array(e),vh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function M_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function b_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;s.uniform2fv(this.addr,e),qt(t,e)}}function S_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;s.uniform3fv(this.addr,e),qt(t,e)}}function w_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;s.uniform4fv(this.addr,e),qt(t,e)}}function E_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Mh.set(n),s.uniformMatrix2fv(this.addr,!1,Mh),qt(t,n)}}function T_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;yh.set(n),s.uniformMatrix3fv(this.addr,!1,yh),qt(t,n)}}function A_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;xh.set(n),s.uniformMatrix4fv(this.addr,!1,xh),qt(t,n)}}function R_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function C_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;s.uniform2iv(this.addr,e),qt(t,e)}}function P_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;s.uniform3iv(this.addr,e),qt(t,e)}}function L_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;s.uniform4iv(this.addr,e),qt(t,e)}}function D_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function I_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;s.uniform2uiv(this.addr,e),qt(t,e)}}function N_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;s.uniform3uiv(this.addr,e),qt(t,e)}}function U_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;s.uniform4uiv(this.addr,e),qt(t,e)}}function F_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(gh.compareFunction=du,r=gh):r=ku,t.setTexture2D(e||r,i)}function O_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||zu,i)}function k_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Hu,i)}function B_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Bu,i)}function z_(s){switch(s){case 5126:return M_;case 35664:return b_;case 35665:return S_;case 35666:return w_;case 35674:return E_;case 35675:return T_;case 35676:return A_;case 5124:case 35670:return R_;case 35667:case 35671:return C_;case 35668:case 35672:return P_;case 35669:case 35673:return L_;case 5125:return D_;case 36294:return I_;case 36295:return N_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return F_;case 35679:case 36299:case 36307:return O_;case 35680:case 36300:case 36308:case 36293:return k_;case 36289:case 36303:case 36311:case 36292:return B_}}function H_(s,e){s.uniform1fv(this.addr,e)}function V_(s,e){const t=Xs(e,this.size,2);s.uniform2fv(this.addr,t)}function G_(s,e){const t=Xs(e,this.size,3);s.uniform3fv(this.addr,t)}function W_(s,e){const t=Xs(e,this.size,4);s.uniform4fv(this.addr,t)}function $_(s,e){const t=Xs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function X_(s,e){const t=Xs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function q_(s,e){const t=Xs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Y_(s,e){s.uniform1iv(this.addr,e)}function j_(s,e){s.uniform2iv(this.addr,e)}function K_(s,e){s.uniform3iv(this.addr,e)}function Z_(s,e){s.uniform4iv(this.addr,e)}function J_(s,e){s.uniform1uiv(this.addr,e)}function Q_(s,e){s.uniform2uiv(this.addr,e)}function ev(s,e){s.uniform3uiv(this.addr,e)}function tv(s,e){s.uniform4uiv(this.addr,e)}function nv(s,e,t){const n=this.cache,i=e.length,r=Da(t,i);Xt(n,r)||(s.uniform1iv(this.addr,r),qt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||ku,r[a])}function iv(s,e,t){const n=this.cache,i=e.length,r=Da(t,i);Xt(n,r)||(s.uniform1iv(this.addr,r),qt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||zu,r[a])}function sv(s,e,t){const n=this.cache,i=e.length,r=Da(t,i);Xt(n,r)||(s.uniform1iv(this.addr,r),qt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Hu,r[a])}function rv(s,e,t){const n=this.cache,i=e.length,r=Da(t,i);Xt(n,r)||(s.uniform1iv(this.addr,r),qt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Bu,r[a])}function av(s){switch(s){case 5126:return H_;case 35664:return V_;case 35665:return G_;case 35666:return W_;case 35674:return $_;case 35675:return X_;case 35676:return q_;case 5124:case 35670:return Y_;case 35667:case 35671:return j_;case 35668:case 35672:return K_;case 35669:case 35673:return Z_;case 5125:return J_;case 36294:return Q_;case 36295:return ev;case 36296:return tv;case 35678:case 36198:case 36298:case 36306:case 35682:return nv;case 35679:case 36299:case 36307:return iv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return rv}}class ov{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=z_(t.type)}}class cv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=av(t.type)}}class lv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const bo=/(\w+)(\])?(\[|\.)?/g;function bh(s,e){s.seq.push(e),s.map[e.id]=e}function hv(s,e,t){const n=s.name,i=n.length;for(bo.lastIndex=0;;){const r=bo.exec(n),a=bo.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){bh(t,l===void 0?new ov(o,s,e):new cv(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new lv(o),bh(t,u)),t=u}}}class _a{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);hv(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Sh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const uv=37297;let dv=0;function fv(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const wh=new lt;function pv(s){gt._getMatrix(wh,gt.workingColorSpace,s);const e=`mat3( ${wh.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(s)){case Ma:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Eh(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+fv(s.getShaderSource(e),o)}else return r}function mv(s,e){const t=pv(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function gv(s,e){let t;switch(e){case df:t="Linear";break;case ff:t="Reinhard";break;case pf:t="Cineon";break;case tu:t="ACESFilmic";break;case gf:t="AgX";break;case _f:t="Neutral";break;case mf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ca=new D;function _v(){gt.getLuminanceCoefficients(ca);const s=ca.x.toFixed(4),e=ca.y.toFixed(4),t=ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cr).join(`
`)}function xv(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function yv(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function cr(s){return s!==""}function Th(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ah(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Mv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sc(s){return s.replace(Mv,Sv)}const bv=new Map;function Sv(s,e){let t=ht[e];if(t===void 0){const n=bv.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Sc(t)}const wv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rh(s){return s.replace(wv,Ev)}function Ev(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ch(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function Tv(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Qh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===eu?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===si&&(e="SHADOWMAP_TYPE_VSM"),e}function Av(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Cs:case Ps:e="ENVMAP_TYPE_CUBE";break;case Ra:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Rv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ps:e="ENVMAP_MODE_REFRACTION";break}return e}function Cv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Dc:e="ENVMAP_BLENDING_MULTIPLY";break;case hf:e="ENVMAP_BLENDING_MIX";break;case uf:e="ENVMAP_BLENDING_ADD";break}return e}function Pv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Lv(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Tv(t),l=Av(t),h=Rv(t),u=Cv(t),d=Pv(t),f=vv(t),g=xv(r),_=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cr).join(`
`),p.length>0&&(p+=`
`)):(m=[Ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cr).join(`
`),p=[Ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?ht.tonemapping_pars_fragment:"",t.toneMapping!==Ai?gv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,mv("linearToOutputTexel",t.outputColorSpace),_v(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cr).join(`
`)),a=Sc(a),a=Th(a,t),a=Ah(a,t),o=Sc(o),o=Th(o,t),o=Ah(o,t),a=Rh(a),o=Rh(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=x+m+a,v=x+p+o,S=Sh(i,i.VERTEX_SHADER,y),T=Sh(i,i.FRAGMENT_SHADER,v);i.attachShader(_,S),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(L){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(_)||"",V=i.getShaderInfoLog(S)||"",Y=i.getShaderInfoLog(T)||"",Q=U.trim(),G=V.trim(),ce=Y.trim();let $=!0,pe=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,S,T);else{const Me=Eh(i,S,"vertex"),Se=Eh(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+Q+`
`+Me+`
`+Se)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(G===""||ce==="")&&(pe=!1);pe&&(L.diagnostics={runnable:$,programLog:Q,vertexShader:{log:G,prefix:m},fragmentShader:{log:ce,prefix:p}})}i.deleteShader(S),i.deleteShader(T),I=new _a(i,_),b=yv(i,_)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(_,uv)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=T,this}let Dv=0;class Iv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Nv(e),t.set(e,n)),n}}class Nv{constructor(e){this.id=Dv++,this.code=e,this.usedTimes=0}}function Uv(s,e,t,n,i,r,a){const o=new mu,c=new Iv,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,w,L,U,V){const Y=U.fog,Q=V.geometry,G=b.isMeshStandardMaterial?U.environment:null,ce=(b.isMeshStandardMaterial?t:e).get(b.envMap||G),$=ce&&ce.mapping===Ra?ce.image.height:null,pe=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const Me=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Se=Me!==void 0?Me.length:0;let Ee=0;Q.morphAttributes.position!==void 0&&(Ee=1),Q.morphAttributes.normal!==void 0&&(Ee=2),Q.morphAttributes.color!==void 0&&(Ee=3);let at,Ge,it,te;if(pe){const Be=Gn[pe];at=Be.vertexShader,Ge=Be.fragmentShader}else at=b.vertexShader,Ge=b.fragmentShader,c.update(b),it=c.getVertexShaderID(b),te=c.getFragmentShaderID(b);const se=s.getRenderTarget(),Te=s.state.buffers.depth.getReversed(),_e=V.isInstancedMesh===!0,me=V.isBatchedMesh===!0,Oe=!!b.map,We=!!b.matcap,N=!!ce,Ie=!!b.aoMap,Pe=!!b.lightMap,Ae=!!b.bumpMap,le=!!b.normalMap,ze=!!b.displacementMap,ge=!!b.emissiveMap,Le=!!b.metalnessMap,Ke=!!b.roughnessMap,Ze=b.anisotropy>0,P=b.clearcoat>0,M=b.dispersion>0,z=b.iridescence>0,J=b.sheen>0,re=b.transmission>0,ee=Ze&&!!b.anisotropyMap,Ne=P&&!!b.clearcoatMap,ue=P&&!!b.clearcoatNormalMap,He=P&&!!b.clearcoatRoughnessMap,ke=z&&!!b.iridescenceMap,he=z&&!!b.iridescenceThicknessMap,be=J&&!!b.sheenColorMap,$e=J&&!!b.sheenRoughnessMap,X=!!b.specularMap,j=!!b.specularColorMap,F=!!b.specularIntensityMap,C=re&&!!b.transmissionMap,k=re&&!!b.thicknessMap,q=!!b.gradientMap,ne=!!b.alphaMap,W=b.alphaTest>0,O=!!b.alphaHash,ae=!!b.extensions;let fe=Ai;b.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(fe=s.toneMapping);const Ue={shaderID:pe,shaderType:b.type,shaderName:b.name,vertexShader:at,fragmentShader:Ge,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:te,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:me,batchingColor:me&&V._colorsTexture!==null,instancing:_e,instancingColor:_e&&V.instanceColor!==null,instancingMorph:_e&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?s.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:ln,alphaToCoverage:!!b.alphaToCoverage,map:Oe,matcap:We,envMap:N,envMapMode:N&&ce.mapping,envMapCubeUVHeight:$,aoMap:Ie,lightMap:Pe,bumpMap:Ae,normalMap:le,displacementMap:d&&ze,emissiveMap:ge,normalMapObjectSpace:le&&b.normalMapType===Sf,normalMapTangentSpace:le&&b.normalMapType===zc,metalnessMap:Le,roughnessMap:Ke,anisotropy:Ze,anisotropyMap:ee,clearcoat:P,clearcoatMap:Ne,clearcoatNormalMap:ue,clearcoatRoughnessMap:He,dispersion:M,iridescence:z,iridescenceMap:ke,iridescenceThicknessMap:he,sheen:J,sheenColorMap:be,sheenRoughnessMap:$e,specularMap:X,specularColorMap:j,specularIntensityMap:F,transmission:re,transmissionMap:C,thicknessMap:k,gradientMap:q,opaque:b.transparent===!1&&b.blending===Ss&&b.alphaToCoverage===!1,alphaMap:ne,alphaTest:W,alphaHash:O,combine:b.combine,mapUv:Oe&&_(b.map.channel),aoMapUv:Ie&&_(b.aoMap.channel),lightMapUv:Pe&&_(b.lightMap.channel),bumpMapUv:Ae&&_(b.bumpMap.channel),normalMapUv:le&&_(b.normalMap.channel),displacementMapUv:ze&&_(b.displacementMap.channel),emissiveMapUv:ge&&_(b.emissiveMap.channel),metalnessMapUv:Le&&_(b.metalnessMap.channel),roughnessMapUv:Ke&&_(b.roughnessMap.channel),anisotropyMapUv:ee&&_(b.anisotropyMap.channel),clearcoatMapUv:Ne&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:ue&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:He&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:he&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:be&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:$e&&_(b.sheenRoughnessMap.channel),specularMapUv:X&&_(b.specularMap.channel),specularColorMapUv:j&&_(b.specularColorMap.channel),specularIntensityMapUv:F&&_(b.specularIntensityMap.channel),transmissionMapUv:C&&_(b.transmissionMap.channel),thicknessMapUv:k&&_(b.thicknessMap.channel),alphaMapUv:ne&&_(b.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(le||Ze),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Q.attributes.uv&&(Oe||ne),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Te,skinning:V.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Ee,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:fe,decodeVideoTexture:Oe&&b.map.isVideoTexture===!0&&gt.getTransfer(b.map.colorSpace)===Rt,decodeVideoTextureEmissive:ge&&b.emissiveMap.isVideoTexture===!0&&gt.getTransfer(b.emissiveMap.colorSpace)===Rt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Gt,flipSided:b.side===on,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ae&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&b.extensions.multiDraw===!0||me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function p(b){const w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)w.push(L),w.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(x(w,b),y(w,b),w.push(s.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function x(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapCubeUVHeight),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.morphAttributeCount),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function y(b,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),w.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),b.push(o.mask)}function v(b){const w=g[b.type];let L;if(w){const U=Gn[w];L=fp.clone(U.uniforms)}else L=b.uniforms;return L}function S(b,w){let L;for(let U=0,V=h.length;U<V;U++){const Y=h[U];if(Y.cacheKey===w){L=Y,++L.usedTimes;break}}return L===void 0&&(L=new Lv(s,w,b,r),h.push(L)),L}function T(b){if(--b.usedTimes===0){const w=h.indexOf(b);h[w]=h[h.length-1],h.pop(),b.destroy()}}function R(b){c.remove(b)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:S,releaseProgram:T,releaseShaderCache:R,programs:h,dispose:I}}function Fv(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Ov(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ph(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Lh(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Ov),n.length>1&&n.sort(d||Ph),i.length>1&&i.sort(d||Ph)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function kv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Lh,s.set(n,[a])):i>=r.length?(a=new Lh,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Bv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Je};break;case"SpotLight":t={position:new D,direction:new D,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new D,halfWidth:new D,halfHeight:new D};break}return s[e.id]=t,t}}}function zv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Hv=0;function Vv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Gv(s){const e=new Bv,t=zv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const i=new D,r=new rt,a=new rt;function o(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,x=0,y=0,v=0,S=0,T=0,R=0;l.sort(Vv);for(let b=0,w=l.length;b<w;b++){const L=l[b],U=L.color,V=L.intensity,Y=L.distance,Q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=U.r*V,u+=U.g*V,d+=U.b*V;else if(L.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(L.sh.coefficients[G],V);R++}else if(L.isDirectionalLight){const G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const ce=L.shadow,$=t.get(L);$.shadowIntensity=ce.intensity,$.shadowBias=ce.bias,$.shadowNormalBias=ce.normalBias,$.shadowRadius=ce.radius,$.shadowMapSize=ce.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=L.shadow.matrix,x++}n.directional[f]=G,f++}else if(L.isSpotLight){const G=e.get(L);G.position.setFromMatrixPosition(L.matrixWorld),G.color.copy(U).multiplyScalar(V),G.distance=Y,G.coneCos=Math.cos(L.angle),G.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),G.decay=L.decay,n.spot[_]=G;const ce=L.shadow;if(L.map&&(n.spotLightMap[S]=L.map,S++,ce.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[_]=ce.matrix,L.castShadow){const $=t.get(L);$.shadowIntensity=ce.intensity,$.shadowBias=ce.bias,$.shadowNormalBias=ce.normalBias,$.shadowRadius=ce.radius,$.shadowMapSize=ce.mapSize,n.spotShadow[_]=$,n.spotShadowMap[_]=Q,v++}_++}else if(L.isRectAreaLight){const G=e.get(L);G.color.copy(U).multiplyScalar(V),G.halfWidth.set(L.width*.5,0,0),G.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=G,m++}else if(L.isPointLight){const G=e.get(L);if(G.color.copy(L.color).multiplyScalar(L.intensity),G.distance=L.distance,G.decay=L.decay,L.castShadow){const ce=L.shadow,$=t.get(L);$.shadowIntensity=ce.intensity,$.shadowBias=ce.bias,$.shadowNormalBias=ce.normalBias,$.shadowRadius=ce.radius,$.shadowMapSize=ce.mapSize,$.shadowCameraNear=ce.camera.near,$.shadowCameraFar=ce.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=L.shadow.matrix,y++}n.point[g]=G,g++}else if(L.isHemisphereLight){const G=e.get(L);G.skyColor.copy(L.color).multiplyScalar(V),G.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[p]=G,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==x||I.numPointShadows!==y||I.numSpotShadows!==v||I.numSpotMaps!==S||I.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+S-T,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,I.directionalLength=f,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=x,I.numPointShadows=y,I.numSpotShadows=v,I.numSpotMaps=S,I.numLightProbes=R,n.version=Hv++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const y=l[p];if(y.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(y.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function Dh(s){const e=new Gv(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Wv(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new Dh(s),e.set(i,[o])):r>=a.length?(o=new Dh(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const $v=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xv=`uniform sampler2D shadow_pass;
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
}`;function qv(s,e,t){let n=new Xc;const i=new we,r=new we,a=new yt,o=new $p({depthPacking:bf}),c=new Xp,l={},h=t.maxTextureSize,u={[di]:on,[on]:di,[Gt]:Gt},d=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:$v,fragmentShader:Xv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new nt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qh;let p=this.type;this.render=function(T,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const b=s.getRenderTarget(),w=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),U=s.state;U.setBlending(Ti),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const V=p!==si&&this.type===si,Y=p===si&&this.type!==si;for(let Q=0,G=T.length;Q<G;Q++){const ce=T[Q],$=ce.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",ce,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);const pe=$.getFrameExtents();if(i.multiply(pe),r.copy($.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/pe.x),i.x=r.x*pe.x,$.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/pe.y),i.y=r.y*pe.y,$.mapSize.y=r.y)),$.map===null||V===!0||Y===!0){const Se=this.type!==si?{minFilter:cn,magFilter:cn}:{};$.map!==null&&$.map.dispose(),$.map=new Yi(i.x,i.y,Se),$.map.texture.name=ce.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();const Me=$.getViewportCount();for(let Se=0;Se<Me;Se++){const Ee=$.getViewport(Se);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),U.viewport(a),$.updateMatrices(ce,Se),n=$.getFrustum(),v(R,I,$.camera,ce,this.type)}$.isPointLightShadow!==!0&&this.type===si&&x($,I),$.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,w,L)};function x(T,R){const I=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Yi(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(R,null,I,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(R,null,I,f,_,null)}function y(T,R,I,b){let w=null;const L=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)w=L;else if(w=I.isPointLight===!0?c:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const U=w.uuid,V=R.uuid;let Y=l[U];Y===void 0&&(Y={},l[U]=Y);let Q=Y[V];Q===void 0&&(Q=w.clone(),Y[V]=Q,R.addEventListener("dispose",S)),w=Q}if(w.visible=R.visible,w.wireframe=R.wireframe,b===si?w.side=R.shadowSide!==null?R.shadowSide:R.side:w.side=R.shadowSide!==null?R.shadowSide:u[R.side],w.alphaMap=R.alphaMap,w.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,w.map=R.map,w.clipShadows=R.clipShadows,w.clippingPlanes=R.clippingPlanes,w.clipIntersection=R.clipIntersection,w.displacementMap=R.displacementMap,w.displacementScale=R.displacementScale,w.displacementBias=R.displacementBias,w.wireframeLinewidth=R.wireframeLinewidth,w.linewidth=R.linewidth,I.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const U=s.properties.get(w);U.light=I}return w}function v(T,R,I,b,w){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===si)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);const V=e.update(T),Y=T.material;if(Array.isArray(Y)){const Q=V.groups;for(let G=0,ce=Q.length;G<ce;G++){const $=Q[G],pe=Y[$.materialIndex];if(pe&&pe.visible){const Me=y(T,pe,b,w);T.onBeforeShadow(s,T,R,I,V,Me,$),s.renderBufferDirect(I,null,V,Me,T,$),T.onAfterShadow(s,T,R,I,V,Me,$)}}}else if(Y.visible){const Q=y(T,Y,b,w);T.onBeforeShadow(s,T,R,I,V,Q,null),s.renderBufferDirect(I,null,V,Q,T,null),T.onAfterShadow(s,T,R,I,V,Q,null)}}const U=T.children;for(let V=0,Y=U.length;V<Y;V++)v(U[V],R,I,b,w)}function S(T){T.target.removeEventListener("dispose",S);for(const I in l){const b=l[I],w=T.target.uuid;w in b&&(b[w].dispose(),delete b[w])}}}const Yv={[No]:Uo,[Fo]:Bo,[Oo]:zo,[Rs]:ko,[Uo]:No,[Bo]:Fo,[zo]:Oo,[ko]:Rs};function jv(s,e){function t(){let C=!1;const k=new yt;let q=null;const ne=new yt(0,0,0,0);return{setMask:function(W){q!==W&&!C&&(s.colorMask(W,W,W,W),q=W)},setLocked:function(W){C=W},setClear:function(W,O,ae,fe,Ue){Ue===!0&&(W*=fe,O*=fe,ae*=fe),k.set(W,O,ae,fe),ne.equals(k)===!1&&(s.clearColor(W,O,ae,fe),ne.copy(k))},reset:function(){C=!1,q=null,ne.set(-1,0,0,0)}}}function n(){let C=!1,k=!1,q=null,ne=null,W=null;return{setReversed:function(O){if(k!==O){const ae=e.get("EXT_clip_control");O?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT),k=O;const fe=W;W=null,this.setClear(fe)}},getReversed:function(){return k},setTest:function(O){O?se(s.DEPTH_TEST):Te(s.DEPTH_TEST)},setMask:function(O){q!==O&&!C&&(s.depthMask(O),q=O)},setFunc:function(O){if(k&&(O=Yv[O]),ne!==O){switch(O){case No:s.depthFunc(s.NEVER);break;case Uo:s.depthFunc(s.ALWAYS);break;case Fo:s.depthFunc(s.LESS);break;case Rs:s.depthFunc(s.LEQUAL);break;case Oo:s.depthFunc(s.EQUAL);break;case ko:s.depthFunc(s.GEQUAL);break;case Bo:s.depthFunc(s.GREATER);break;case zo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ne=O}},setLocked:function(O){C=O},setClear:function(O){W!==O&&(k&&(O=1-O),s.clearDepth(O),W=O)},reset:function(){C=!1,q=null,ne=null,W=null,k=!1}}}function i(){let C=!1,k=null,q=null,ne=null,W=null,O=null,ae=null,fe=null,Ue=null;return{setTest:function(Be){C||(Be?se(s.STENCIL_TEST):Te(s.STENCIL_TEST))},setMask:function(Be){k!==Be&&!C&&(s.stencilMask(Be),k=Be)},setFunc:function(Be,pt,_t){(q!==Be||ne!==pt||W!==_t)&&(s.stencilFunc(Be,pt,_t),q=Be,ne=pt,W=_t)},setOp:function(Be,pt,_t){(O!==Be||ae!==pt||fe!==_t)&&(s.stencilOp(Be,pt,_t),O=Be,ae=pt,fe=_t)},setLocked:function(Be){C=Be},setClear:function(Be){Ue!==Be&&(s.clearStencil(Be),Ue=Be)},reset:function(){C=!1,k=null,q=null,ne=null,W=null,O=null,ae=null,fe=null,Ue=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,y=null,v=null,S=null,T=null,R=new Je(0,0,0),I=0,b=!1,w=null,L=null,U=null,V=null,Y=null;const Q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,ce=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec($)[1]),G=ce>=1):$.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),G=ce>=2);let pe=null,Me={};const Se=s.getParameter(s.SCISSOR_BOX),Ee=s.getParameter(s.VIEWPORT),at=new yt().fromArray(Se),Ge=new yt().fromArray(Ee);function it(C,k,q,ne){const W=new Uint8Array(4),O=s.createTexture();s.bindTexture(C,O),s.texParameteri(C,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(C,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ae=0;ae<q;ae++)C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY?s.texImage3D(k,0,s.RGBA,1,1,ne,0,s.RGBA,s.UNSIGNED_BYTE,W):s.texImage2D(k+ae,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,W);return O}const te={};te[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),te[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),te[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(s.DEPTH_TEST),a.setFunc(Rs),Ae(!1),le(pl),se(s.CULL_FACE),Ie(Ti);function se(C){h[C]!==!0&&(s.enable(C),h[C]=!0)}function Te(C){h[C]!==!1&&(s.disable(C),h[C]=!1)}function _e(C,k){return u[C]!==k?(s.bindFramebuffer(C,k),u[C]=k,C===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=k),C===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=k),!0):!1}function me(C,k){let q=f,ne=!1;if(C){q=d.get(k),q===void 0&&(q=[],d.set(k,q));const W=C.textures;if(q.length!==W.length||q[0]!==s.COLOR_ATTACHMENT0){for(let O=0,ae=W.length;O<ae;O++)q[O]=s.COLOR_ATTACHMENT0+O;q.length=W.length,ne=!0}}else q[0]!==s.BACK&&(q[0]=s.BACK,ne=!0);ne&&s.drawBuffers(q)}function Oe(C){return g!==C?(s.useProgram(C),g=C,!0):!1}const We={[$i]:s.FUNC_ADD,[Xd]:s.FUNC_SUBTRACT,[qd]:s.FUNC_REVERSE_SUBTRACT};We[Yd]=s.MIN,We[jd]=s.MAX;const N={[Kd]:s.ZERO,[Zd]:s.ONE,[Jd]:s.SRC_COLOR,[Do]:s.SRC_ALPHA,[rf]:s.SRC_ALPHA_SATURATE,[nf]:s.DST_COLOR,[ef]:s.DST_ALPHA,[Qd]:s.ONE_MINUS_SRC_COLOR,[Io]:s.ONE_MINUS_SRC_ALPHA,[sf]:s.ONE_MINUS_DST_COLOR,[tf]:s.ONE_MINUS_DST_ALPHA,[af]:s.CONSTANT_COLOR,[of]:s.ONE_MINUS_CONSTANT_COLOR,[cf]:s.CONSTANT_ALPHA,[lf]:s.ONE_MINUS_CONSTANT_ALPHA};function Ie(C,k,q,ne,W,O,ae,fe,Ue,Be){if(C===Ti){_===!0&&(Te(s.BLEND),_=!1);return}if(_===!1&&(se(s.BLEND),_=!0),C!==$d){if(C!==m||Be!==b){if((p!==$i||v!==$i)&&(s.blendEquation(s.FUNC_ADD),p=$i,v=$i),Be)switch(C){case Ss:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ml:s.blendFunc(s.ONE,s.ONE);break;case gl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case _l:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Ss:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ml:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case gl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _l:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}x=null,y=null,S=null,T=null,R.set(0,0,0),I=0,m=C,b=Be}return}W=W||k,O=O||q,ae=ae||ne,(k!==p||W!==v)&&(s.blendEquationSeparate(We[k],We[W]),p=k,v=W),(q!==x||ne!==y||O!==S||ae!==T)&&(s.blendFuncSeparate(N[q],N[ne],N[O],N[ae]),x=q,y=ne,S=O,T=ae),(fe.equals(R)===!1||Ue!==I)&&(s.blendColor(fe.r,fe.g,fe.b,Ue),R.copy(fe),I=Ue),m=C,b=!1}function Pe(C,k){C.side===Gt?Te(s.CULL_FACE):se(s.CULL_FACE);let q=C.side===on;k&&(q=!q),Ae(q),C.blending===Ss&&C.transparent===!1?Ie(Ti):Ie(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const ne=C.stencilWrite;o.setTest(ne),ne&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),ge(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?se(s.SAMPLE_ALPHA_TO_COVERAGE):Te(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(C){w!==C&&(C?s.frontFace(s.CW):s.frontFace(s.CCW),w=C)}function le(C){C!==Gd?(se(s.CULL_FACE),C!==L&&(C===pl?s.cullFace(s.BACK):C===Wd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Te(s.CULL_FACE),L=C}function ze(C){C!==U&&(G&&s.lineWidth(C),U=C)}function ge(C,k,q){C?(se(s.POLYGON_OFFSET_FILL),(V!==k||Y!==q)&&(s.polygonOffset(k,q),V=k,Y=q)):Te(s.POLYGON_OFFSET_FILL)}function Le(C){C?se(s.SCISSOR_TEST):Te(s.SCISSOR_TEST)}function Ke(C){C===void 0&&(C=s.TEXTURE0+Q-1),pe!==C&&(s.activeTexture(C),pe=C)}function Ze(C,k,q){q===void 0&&(pe===null?q=s.TEXTURE0+Q-1:q=pe);let ne=Me[q];ne===void 0&&(ne={type:void 0,texture:void 0},Me[q]=ne),(ne.type!==C||ne.texture!==k)&&(pe!==q&&(s.activeTexture(q),pe=q),s.bindTexture(C,k||te[C]),ne.type=C,ne.texture=k)}function P(){const C=Me[pe];C!==void 0&&C.type!==void 0&&(s.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function M(){try{s.compressedTexImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function z(){try{s.compressedTexImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function J(){try{s.texSubImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function re(){try{s.texSubImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ee(){try{s.compressedTexSubImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ne(){try{s.compressedTexSubImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ue(){try{s.texStorage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function He(){try{s.texStorage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ke(){try{s.texImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function he(){try{s.texImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function be(C){at.equals(C)===!1&&(s.scissor(C.x,C.y,C.z,C.w),at.copy(C))}function $e(C){Ge.equals(C)===!1&&(s.viewport(C.x,C.y,C.z,C.w),Ge.copy(C))}function X(C,k){let q=l.get(k);q===void 0&&(q=new WeakMap,l.set(k,q));let ne=q.get(C);ne===void 0&&(ne=s.getUniformBlockIndex(k,C.name),q.set(C,ne))}function j(C,k){const ne=l.get(k).get(C);c.get(k)!==ne&&(s.uniformBlockBinding(k,ne,C.__bindingPointIndex),c.set(k,ne))}function F(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},pe=null,Me={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,y=null,v=null,S=null,T=null,R=new Je(0,0,0),I=0,b=!1,w=null,L=null,U=null,V=null,Y=null,at.set(0,0,s.canvas.width,s.canvas.height),Ge.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:se,disable:Te,bindFramebuffer:_e,drawBuffers:me,useProgram:Oe,setBlending:Ie,setMaterial:Pe,setFlipSided:Ae,setCullFace:le,setLineWidth:ze,setPolygonOffset:ge,setScissorTest:Le,activeTexture:Ke,bindTexture:Ze,unbindTexture:P,compressedTexImage2D:M,compressedTexImage3D:z,texImage2D:ke,texImage3D:he,updateUBOMapping:X,uniformBlockBinding:j,texStorage2D:ue,texStorage3D:He,texSubImage2D:J,texSubImage3D:re,compressedTexSubImage2D:ee,compressedTexSubImage3D:Ne,scissor:be,viewport:$e,reset:F}}function Kv(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,M){return f?new OffscreenCanvas(P,M):Mr("canvas")}function _(P,M,z){let J=1;const re=Ze(P);if((re.width>z||re.height>z)&&(J=z/Math.max(re.width,re.height)),J<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ee=Math.floor(J*re.width),Ne=Math.floor(J*re.height);u===void 0&&(u=g(ee,Ne));const ue=M?g(ee,Ne):u;return ue.width=ee,ue.height=Ne,ue.getContext("2d").drawImage(P,0,0,ee,Ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ee+"x"+Ne+")."),ue}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){s.generateMipmap(P)}function x(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(P,M,z,J,re=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ee=M;if(M===s.RED&&(z===s.FLOAT&&(ee=s.R32F),z===s.HALF_FLOAT&&(ee=s.R16F),z===s.UNSIGNED_BYTE&&(ee=s.R8)),M===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.R8UI),z===s.UNSIGNED_SHORT&&(ee=s.R16UI),z===s.UNSIGNED_INT&&(ee=s.R32UI),z===s.BYTE&&(ee=s.R8I),z===s.SHORT&&(ee=s.R16I),z===s.INT&&(ee=s.R32I)),M===s.RG&&(z===s.FLOAT&&(ee=s.RG32F),z===s.HALF_FLOAT&&(ee=s.RG16F),z===s.UNSIGNED_BYTE&&(ee=s.RG8)),M===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.RG8UI),z===s.UNSIGNED_SHORT&&(ee=s.RG16UI),z===s.UNSIGNED_INT&&(ee=s.RG32UI),z===s.BYTE&&(ee=s.RG8I),z===s.SHORT&&(ee=s.RG16I),z===s.INT&&(ee=s.RG32I)),M===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.RGB8UI),z===s.UNSIGNED_SHORT&&(ee=s.RGB16UI),z===s.UNSIGNED_INT&&(ee=s.RGB32UI),z===s.BYTE&&(ee=s.RGB8I),z===s.SHORT&&(ee=s.RGB16I),z===s.INT&&(ee=s.RGB32I)),M===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(ee=s.RGBA16UI),z===s.UNSIGNED_INT&&(ee=s.RGBA32UI),z===s.BYTE&&(ee=s.RGBA8I),z===s.SHORT&&(ee=s.RGBA16I),z===s.INT&&(ee=s.RGBA32I)),M===s.RGB&&(z===s.UNSIGNED_INT_5_9_9_9_REV&&(ee=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(ee=s.R11F_G11F_B10F)),M===s.RGBA){const Ne=re?Ma:gt.getTransfer(J);z===s.FLOAT&&(ee=s.RGBA32F),z===s.HALF_FLOAT&&(ee=s.RGBA16F),z===s.UNSIGNED_BYTE&&(ee=Ne===Rt?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(P,M){let z;return P?M===null||M===qi||M===gr?z=s.DEPTH24_STENCIL8:M===Fn?z=s.DEPTH32F_STENCIL8:M===mr&&(z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===qi||M===gr?z=s.DEPTH_COMPONENT24:M===Fn?z=s.DEPTH_COMPONENT32F:M===mr&&(z=s.DEPTH_COMPONENT16),z}function S(P,M){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==cn&&P.minFilter!==yn?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function T(P){const M=P.target;M.removeEventListener("dispose",T),I(M),M.isVideoTexture&&h.delete(M)}function R(P){const M=P.target;M.removeEventListener("dispose",R),w(M)}function I(P){const M=n.get(P);if(M.__webglInit===void 0)return;const z=P.source,J=d.get(z);if(J){const re=J[M.__cacheKey];re.usedTimes--,re.usedTimes===0&&b(P),Object.keys(J).length===0&&d.delete(z)}n.remove(P)}function b(P){const M=n.get(P);s.deleteTexture(M.__webglTexture);const z=P.source,J=d.get(z);delete J[M.__cacheKey],a.memory.textures--}function w(P){const M=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let re=0;re<M.__webglFramebuffer[J].length;re++)s.deleteFramebuffer(M.__webglFramebuffer[J][re]);else s.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)s.deleteFramebuffer(M.__webglFramebuffer[J]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const z=P.textures;for(let J=0,re=z.length;J<re;J++){const ee=n.get(z[J]);ee.__webglTexture&&(s.deleteTexture(ee.__webglTexture),a.memory.textures--),n.remove(z[J])}n.remove(P)}let L=0;function U(){L=0}function V(){const P=L;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),L+=1,P}function Y(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function Q(P,M){const z=n.get(P);if(P.isVideoTexture&&Le(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){const J=P.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(z,P,M);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+M)}function G(P,M){const z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){te(z,P,M);return}t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+M)}function ce(P,M){const z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){te(z,P,M);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+M)}function $(P,M){const z=n.get(P);if(P.version>0&&z.__version!==P.version){se(z,P,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+M)}const pe={[Ls]:s.REPEAT,[Ei]:s.CLAMP_TO_EDGE,[ya]:s.MIRRORED_REPEAT},Me={[cn]:s.NEAREST,[iu]:s.NEAREST_MIPMAP_NEAREST,[or]:s.NEAREST_MIPMAP_LINEAR,[yn]:s.LINEAR,[da]:s.LINEAR_MIPMAP_NEAREST,[ci]:s.LINEAR_MIPMAP_LINEAR},Se={[wf]:s.NEVER,[Pf]:s.ALWAYS,[Ef]:s.LESS,[du]:s.LEQUAL,[Tf]:s.EQUAL,[Cf]:s.GEQUAL,[Af]:s.GREATER,[Rf]:s.NOTEQUAL};function Ee(P,M){if(M.type===Fn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===yn||M.magFilter===da||M.magFilter===or||M.magFilter===ci||M.minFilter===yn||M.minFilter===da||M.minFilter===or||M.minFilter===ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,pe[M.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,pe[M.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,pe[M.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,Me[M.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,Me[M.minFilter]),M.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,Se[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===cn||M.minFilter!==or&&M.minFilter!==ci||M.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function at(P,M){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",T));const J=M.source;let re=d.get(J);re===void 0&&(re={},d.set(J,re));const ee=Y(M);if(ee!==P.__cacheKey){re[ee]===void 0&&(re[ee]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),re[ee].usedTimes++;const Ne=re[P.__cacheKey];Ne!==void 0&&(re[P.__cacheKey].usedTimes--,Ne.usedTimes===0&&b(M)),P.__cacheKey=ee,P.__webglTexture=re[ee].texture}return z}function Ge(P,M,z){return Math.floor(Math.floor(P/z)/M)}function it(P,M,z,J){const ee=P.updateRanges;if(ee.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,z,J,M.data);else{ee.sort((he,be)=>he.start-be.start);let Ne=0;for(let he=1;he<ee.length;he++){const be=ee[Ne],$e=ee[he],X=be.start+be.count,j=Ge($e.start,M.width,4),F=Ge(be.start,M.width,4);$e.start<=X+1&&j===F&&Ge($e.start+$e.count-1,M.width,4)===j?be.count=Math.max(be.count,$e.start+$e.count-be.start):(++Ne,ee[Ne]=$e)}ee.length=Ne+1;const ue=s.getParameter(s.UNPACK_ROW_LENGTH),He=s.getParameter(s.UNPACK_SKIP_PIXELS),ke=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let he=0,be=ee.length;he<be;he++){const $e=ee[he],X=Math.floor($e.start/4),j=Math.ceil($e.count/4),F=X%M.width,C=Math.floor(X/M.width),k=j,q=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,F),s.pixelStorei(s.UNPACK_SKIP_ROWS,C),t.texSubImage2D(s.TEXTURE_2D,0,F,C,k,q,z,J,M.data)}P.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,ue),s.pixelStorei(s.UNPACK_SKIP_PIXELS,He),s.pixelStorei(s.UNPACK_SKIP_ROWS,ke)}}function te(P,M,z){let J=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=s.TEXTURE_3D);const re=at(P,M),ee=M.source;t.bindTexture(J,P.__webglTexture,s.TEXTURE0+z);const Ne=n.get(ee);if(ee.version!==Ne.__version||re===!0){t.activeTexture(s.TEXTURE0+z);const ue=gt.getPrimaries(gt.workingColorSpace),He=M.colorSpace===wi?null:gt.getPrimaries(M.colorSpace),ke=M.colorSpace===wi||ue===He?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let he=_(M.image,!1,i.maxTextureSize);he=Ke(M,he);const be=r.convert(M.format,M.colorSpace),$e=r.convert(M.type);let X=y(M.internalFormat,be,$e,M.colorSpace,M.isVideoTexture);Ee(J,M);let j;const F=M.mipmaps,C=M.isVideoTexture!==!0,k=Ne.__version===void 0||re===!0,q=ee.dataReady,ne=S(M,he);if(M.isDepthTexture)X=v(M.format===vr,M.type),k&&(C?t.texStorage2D(s.TEXTURE_2D,1,X,he.width,he.height):t.texImage2D(s.TEXTURE_2D,0,X,he.width,he.height,0,be,$e,null));else if(M.isDataTexture)if(F.length>0){C&&k&&t.texStorage2D(s.TEXTURE_2D,ne,X,F[0].width,F[0].height);for(let W=0,O=F.length;W<O;W++)j=F[W],C?q&&t.texSubImage2D(s.TEXTURE_2D,W,0,0,j.width,j.height,be,$e,j.data):t.texImage2D(s.TEXTURE_2D,W,X,j.width,j.height,0,be,$e,j.data);M.generateMipmaps=!1}else C?(k&&t.texStorage2D(s.TEXTURE_2D,ne,X,he.width,he.height),q&&it(M,he,be,$e)):t.texImage2D(s.TEXTURE_2D,0,X,he.width,he.height,0,be,$e,he.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){C&&k&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ne,X,F[0].width,F[0].height,he.depth);for(let W=0,O=F.length;W<O;W++)if(j=F[W],M.format!==Rn)if(be!==null)if(C){if(q)if(M.layerUpdates.size>0){const ae=lh(j.width,j.height,M.format,M.type);for(const fe of M.layerUpdates){const Ue=j.data.subarray(fe*ae/j.data.BYTES_PER_ELEMENT,(fe+1)*ae/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,fe,j.width,j.height,1,be,Ue)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,j.width,j.height,he.depth,be,j.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,W,X,j.width,j.height,he.depth,0,j.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else C?q&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,j.width,j.height,he.depth,be,$e,j.data):t.texImage3D(s.TEXTURE_2D_ARRAY,W,X,j.width,j.height,he.depth,0,be,$e,j.data)}else{C&&k&&t.texStorage2D(s.TEXTURE_2D,ne,X,F[0].width,F[0].height);for(let W=0,O=F.length;W<O;W++)j=F[W],M.format!==Rn?be!==null?C?q&&t.compressedTexSubImage2D(s.TEXTURE_2D,W,0,0,j.width,j.height,be,j.data):t.compressedTexImage2D(s.TEXTURE_2D,W,X,j.width,j.height,0,j.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):C?q&&t.texSubImage2D(s.TEXTURE_2D,W,0,0,j.width,j.height,be,$e,j.data):t.texImage2D(s.TEXTURE_2D,W,X,j.width,j.height,0,be,$e,j.data)}else if(M.isDataArrayTexture)if(C){if(k&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ne,X,he.width,he.height,he.depth),q)if(M.layerUpdates.size>0){const W=lh(he.width,he.height,M.format,M.type);for(const O of M.layerUpdates){const ae=he.data.subarray(O*W/he.data.BYTES_PER_ELEMENT,(O+1)*W/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,O,he.width,he.height,1,be,$e,ae)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,be,$e,he.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,X,he.width,he.height,he.depth,0,be,$e,he.data);else if(M.isData3DTexture)C?(k&&t.texStorage3D(s.TEXTURE_3D,ne,X,he.width,he.height,he.depth),q&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,be,$e,he.data)):t.texImage3D(s.TEXTURE_3D,0,X,he.width,he.height,he.depth,0,be,$e,he.data);else if(M.isFramebufferTexture){if(k)if(C)t.texStorage2D(s.TEXTURE_2D,ne,X,he.width,he.height);else{let W=he.width,O=he.height;for(let ae=0;ae<ne;ae++)t.texImage2D(s.TEXTURE_2D,ae,X,W,O,0,be,$e,null),W>>=1,O>>=1}}else if(F.length>0){if(C&&k){const W=Ze(F[0]);t.texStorage2D(s.TEXTURE_2D,ne,X,W.width,W.height)}for(let W=0,O=F.length;W<O;W++)j=F[W],C?q&&t.texSubImage2D(s.TEXTURE_2D,W,0,0,be,$e,j):t.texImage2D(s.TEXTURE_2D,W,X,be,$e,j);M.generateMipmaps=!1}else if(C){if(k){const W=Ze(he);t.texStorage2D(s.TEXTURE_2D,ne,X,W.width,W.height)}q&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,be,$e,he)}else t.texImage2D(s.TEXTURE_2D,0,X,be,$e,he);m(M)&&p(J),Ne.__version=ee.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function se(P,M,z){if(M.image.length!==6)return;const J=at(P,M),re=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+z);const ee=n.get(re);if(re.version!==ee.__version||J===!0){t.activeTexture(s.TEXTURE0+z);const Ne=gt.getPrimaries(gt.workingColorSpace),ue=M.colorSpace===wi?null:gt.getPrimaries(M.colorSpace),He=M.colorSpace===wi||Ne===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);const ke=M.isCompressedTexture||M.image[0].isCompressedTexture,he=M.image[0]&&M.image[0].isDataTexture,be=[];for(let O=0;O<6;O++)!ke&&!he?be[O]=_(M.image[O],!0,i.maxCubemapSize):be[O]=he?M.image[O].image:M.image[O],be[O]=Ke(M,be[O]);const $e=be[0],X=r.convert(M.format,M.colorSpace),j=r.convert(M.type),F=y(M.internalFormat,X,j,M.colorSpace),C=M.isVideoTexture!==!0,k=ee.__version===void 0||J===!0,q=re.dataReady;let ne=S(M,$e);Ee(s.TEXTURE_CUBE_MAP,M);let W;if(ke){C&&k&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ne,F,$e.width,$e.height);for(let O=0;O<6;O++){W=be[O].mipmaps;for(let ae=0;ae<W.length;ae++){const fe=W[ae];M.format!==Rn?X!==null?C?q&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,ae,0,0,fe.width,fe.height,X,fe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,ae,F,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,ae,0,0,fe.width,fe.height,X,j,fe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,ae,F,fe.width,fe.height,0,X,j,fe.data)}}}else{if(W=M.mipmaps,C&&k){W.length>0&&ne++;const O=Ze(be[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ne,F,O.width,O.height)}for(let O=0;O<6;O++)if(he){C?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,0,0,be[O].width,be[O].height,X,j,be[O].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,F,be[O].width,be[O].height,0,X,j,be[O].data);for(let ae=0;ae<W.length;ae++){const Ue=W[ae].image[O].image;C?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,ae+1,0,0,Ue.width,Ue.height,X,j,Ue.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,ae+1,F,Ue.width,Ue.height,0,X,j,Ue.data)}}else{C?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,0,0,X,j,be[O]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,F,X,j,be[O]);for(let ae=0;ae<W.length;ae++){const fe=W[ae];C?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,ae+1,0,0,X,j,fe.image[O]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+O,ae+1,F,X,j,fe.image[O])}}}m(M)&&p(s.TEXTURE_CUBE_MAP),ee.__version=re.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function Te(P,M,z,J,re,ee){const Ne=r.convert(z.format,z.colorSpace),ue=r.convert(z.type),He=y(z.internalFormat,Ne,ue,z.colorSpace),ke=n.get(M),he=n.get(z);if(he.__renderTarget=M,!ke.__hasExternalTextures){const be=Math.max(1,M.width>>ee),$e=Math.max(1,M.height>>ee);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?t.texImage3D(re,ee,He,be,$e,M.depth,0,Ne,ue,null):t.texImage2D(re,ee,He,be,$e,0,Ne,ue,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),ge(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,re,he.__webglTexture,0,ze(M)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,re,he.__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(P,M,z){if(s.bindRenderbuffer(s.RENDERBUFFER,P),M.depthBuffer){const J=M.depthTexture,re=J&&J.isDepthTexture?J.type:null,ee=v(M.stencilBuffer,re),Ne=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ue=ze(M);ge(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ue,ee,M.width,M.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,ue,ee,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ee,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ne,s.RENDERBUFFER,P)}else{const J=M.textures;for(let re=0;re<J.length;re++){const ee=J[re],Ne=r.convert(ee.format,ee.colorSpace),ue=r.convert(ee.type),He=y(ee.internalFormat,Ne,ue,ee.colorSpace),ke=ze(M);z&&ge(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ke,He,M.width,M.height):ge(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ke,He,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,He,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function me(P,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(M.depthTexture);J.__renderTarget=M,(!J.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Q(M.depthTexture,0);const re=J.__webglTexture,ee=ze(M);if(M.depthTexture.format===_r)ge(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0);else if(M.depthTexture.format===vr)ge(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Oe(P){const M=n.get(P),z=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){const J=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){const re=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",re)};J.addEventListener("dispose",re),M.__depthDisposeCallback=re}M.__boundDepthTexture=J}if(P.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const J=P.texture.mipmaps;J&&J.length>0?me(M.__webglFramebuffer[0],P):me(M.__webglFramebuffer,P)}else if(z){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=s.createRenderbuffer(),_e(M.__webglDepthbuffer[J],P,!1);else{const re=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,ee)}}else{const J=P.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),_e(M.__webglDepthbuffer,P,!1);else{const re=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,ee)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function We(P,M,z){const J=n.get(P);M!==void 0&&Te(J.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Oe(P)}function N(P){const M=P.texture,z=n.get(P),J=n.get(M);P.addEventListener("dispose",R);const re=P.textures,ee=P.isWebGLCubeRenderTarget===!0,Ne=re.length>1;if(Ne||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=M.version,a.memory.textures++),ee){z.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[ue]=[];for(let He=0;He<M.mipmaps.length;He++)z.__webglFramebuffer[ue][He]=s.createFramebuffer()}else z.__webglFramebuffer[ue]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let ue=0;ue<M.mipmaps.length;ue++)z.__webglFramebuffer[ue]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(Ne)for(let ue=0,He=re.length;ue<He;ue++){const ke=n.get(re[ue]);ke.__webglTexture===void 0&&(ke.__webglTexture=s.createTexture(),a.memory.textures++)}if(P.samples>0&&ge(P)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ue=0;ue<re.length;ue++){const He=re[ue];z.__webglColorRenderbuffer[ue]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[ue]);const ke=r.convert(He.format,He.colorSpace),he=r.convert(He.type),be=y(He.internalFormat,ke,he,He.colorSpace,P.isXRRenderTarget===!0),$e=ze(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,$e,be,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,z.__webglColorRenderbuffer[ue])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),_e(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ee){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),Ee(s.TEXTURE_CUBE_MAP,M);for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0)for(let He=0;He<M.mipmaps.length;He++)Te(z.__webglFramebuffer[ue][He],P,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He);else Te(z.__webglFramebuffer[ue],P,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(M)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ne){for(let ue=0,He=re.length;ue<He;ue++){const ke=re[ue],he=n.get(ke);let be=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(be=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(be,he.__webglTexture),Ee(be,ke),Te(z.__webglFramebuffer,P,ke,s.COLOR_ATTACHMENT0+ue,be,0),m(ke)&&p(be)}t.unbindTexture()}else{let ue=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ue=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ue,J.__webglTexture),Ee(ue,M),M.mipmaps&&M.mipmaps.length>0)for(let He=0;He<M.mipmaps.length;He++)Te(z.__webglFramebuffer[He],P,M,s.COLOR_ATTACHMENT0,ue,He);else Te(z.__webglFramebuffer,P,M,s.COLOR_ATTACHMENT0,ue,0);m(M)&&p(ue),t.unbindTexture()}P.depthBuffer&&Oe(P)}function Ie(P){const M=P.textures;for(let z=0,J=M.length;z<J;z++){const re=M[z];if(m(re)){const ee=x(P),Ne=n.get(re).__webglTexture;t.bindTexture(ee,Ne),p(ee),t.unbindTexture()}}}const Pe=[],Ae=[];function le(P){if(P.samples>0){if(ge(P)===!1){const M=P.textures,z=P.width,J=P.height;let re=s.COLOR_BUFFER_BIT;const ee=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ne=n.get(P),ue=M.length>1;if(ue)for(let ke=0;ke<M.length;ke++)t.bindFramebuffer(s.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ne.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer);const He=P.texture.mipmaps;He&&He.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let ke=0;ke<M.length;ke++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),ue){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ne.__webglColorRenderbuffer[ke]);const he=n.get(M[ke]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,he,0)}s.blitFramebuffer(0,0,z,J,0,0,z,J,re,s.NEAREST),c===!0&&(Pe.length=0,Ae.length=0,Pe.push(s.COLOR_ATTACHMENT0+ke),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Pe.push(ee),Ae.push(ee),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ae)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ue)for(let ke=0;ke<M.length;ke++){t.bindFramebuffer(s.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.RENDERBUFFER,Ne.__webglColorRenderbuffer[ke]);const he=n.get(M[ke]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ne.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.TEXTURE_2D,he,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const M=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function ze(P){return Math.min(i.maxSamples,P.samples)}function ge(P){const M=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Le(P){const M=a.render.frame;h.get(P)!==M&&(h.set(P,M),P.update())}function Ke(P,M){const z=P.colorSpace,J=P.format,re=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==ln&&z!==wi&&(gt.getTransfer(z)===Rt?(J!==Rn||re!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}function Ze(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=U,this.setTexture2D=Q,this.setTexture2DArray=G,this.setTexture3D=ce,this.setTextureCube=$,this.rebindTextures=We,this.setupRenderTarget=N,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=ge}function Zv(s,e){function t(n,i=wi){let r;const a=gt.getTransfer(i);if(n===Yn)return s.UNSIGNED_BYTE;if(n===Nc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Uc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===au)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ou)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===su)return s.BYTE;if(n===ru)return s.SHORT;if(n===mr)return s.UNSIGNED_SHORT;if(n===Ic)return s.INT;if(n===qi)return s.UNSIGNED_INT;if(n===Fn)return s.FLOAT;if(n===Tr)return s.HALF_FLOAT;if(n===cu)return s.ALPHA;if(n===lu)return s.RGB;if(n===Rn)return s.RGBA;if(n===_r)return s.DEPTH_COMPONENT;if(n===vr)return s.DEPTH_STENCIL;if(n===Fc)return s.RED;if(n===Oc)return s.RED_INTEGER;if(n===hu)return s.RG;if(n===kc)return s.RG_INTEGER;if(n===Bc)return s.RGBA_INTEGER;if(n===fa||n===pa||n===ma||n===ga)if(a===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Go||n===Wo||n===$o||n===Xo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Go)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$o)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qo||n===Yo||n===jo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===qo||n===Yo)return a===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===jo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ko||n===Zo||n===Jo||n===Qo||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===ac||n===oc||n===cc||n===lc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ko)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qo)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ec)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===nc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ic)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===rc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ac)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===oc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===cc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===lc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===hc||n===uc||n===dc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===hc)return a===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===uc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===dc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fc||n===pc||n===mc||n===gc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===fc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===pc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===mc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Jv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qv=`
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

}`;class ex{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ru(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pi({vertexShader:Jv,fragmentShader:Qv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new Li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tx extends Zi{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new ex,p={},x=t.getContextAttributes();let y=null,v=null;const S=[],T=[],R=new we;let I=null;const b=new rn;b.viewport=new yt;const w=new rn;w.viewport=new yt;const L=[b,w],U=new dm;let V=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let se=S[te];return se===void 0&&(se=new so,S[te]=se),se.getTargetRaySpace()},this.getControllerGrip=function(te){let se=S[te];return se===void 0&&(se=new so,S[te]=se),se.getGripSpace()},this.getHand=function(te){let se=S[te];return se===void 0&&(se=new so,S[te]=se),se.getHandSpace()};function Q(te){const se=T.indexOf(te.inputSource);if(se===-1)return;const Te=S[se];Te!==void 0&&(Te.update(te.inputSource,te.frame,l||a),Te.dispatchEvent({type:te.type,data:te.inputSource}))}function G(){i.removeEventListener("select",Q),i.removeEventListener("selectstart",Q),i.removeEventListener("selectend",Q),i.removeEventListener("squeeze",Q),i.removeEventListener("squeezestart",Q),i.removeEventListener("squeezeend",Q),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",ce);for(let te=0;te<S.length;te++){const se=T[te];se!==null&&(T[te]=null,S[te].disconnect(se))}V=null,Y=null,m.reset();for(const te in p)delete p[te];e.setRenderTarget(y),f=null,d=null,u=null,i=null,v=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",Q),i.addEventListener("selectstart",Q),i.addEventListener("selectend",Q),i.addEventListener("squeeze",Q),i.addEventListener("squeezestart",Q),i.addEventListener("squeezeend",Q),i.addEventListener("end",G),i.addEventListener("inputsourceschange",ce),x.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,_e=null,me=null;x.depth&&(me=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=x.stencil?vr:_r,_e=x.stencil?gr:qi);const Oe={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Oe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Yi(d.textureWidth,d.textureHeight,{format:Rn,type:Yn,depthTexture:new Au(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Te={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Te),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Yi(f.framebufferWidth,f.framebufferHeight,{format:Rn,type:Yn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),it.setContext(i),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ce(te){for(let se=0;se<te.removed.length;se++){const Te=te.removed[se],_e=T.indexOf(Te);_e>=0&&(T[_e]=null,S[_e].disconnect(Te))}for(let se=0;se<te.added.length;se++){const Te=te.added[se];let _e=T.indexOf(Te);if(_e===-1){for(let Oe=0;Oe<S.length;Oe++)if(Oe>=T.length){T.push(Te),_e=Oe;break}else if(T[Oe]===null){T[Oe]=Te,_e=Oe;break}if(_e===-1)break}const me=S[_e];me&&me.connect(Te)}}const $=new D,pe=new D;function Me(te,se,Te){$.setFromMatrixPosition(se.matrixWorld),pe.setFromMatrixPosition(Te.matrixWorld);const _e=$.distanceTo(pe),me=se.projectionMatrix.elements,Oe=Te.projectionMatrix.elements,We=me[14]/(me[10]-1),N=me[14]/(me[10]+1),Ie=(me[9]+1)/me[5],Pe=(me[9]-1)/me[5],Ae=(me[8]-1)/me[0],le=(Oe[8]+1)/Oe[0],ze=We*Ae,ge=We*le,Le=_e/(-Ae+le),Ke=Le*-Ae;if(se.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Ke),te.translateZ(Le),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),me[10]===-1)te.projectionMatrix.copy(se.projectionMatrix),te.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Ze=We+Le,P=N+Le,M=ze-Ke,z=ge+(_e-Ke),J=Ie*N/P*Ze,re=Pe*N/P*Ze;te.projectionMatrix.makePerspective(M,z,J,re,Ze,P),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function Se(te,se){se===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(se.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let se=te.near,Te=te.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(Te=m.depthFar)),U.near=w.near=b.near=se,U.far=w.far=b.far=Te,(V!==U.near||Y!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),V=U.near,Y=U.far),U.layers.mask=te.layers.mask|6,b.layers.mask=U.layers.mask&3,w.layers.mask=U.layers.mask&5;const _e=te.parent,me=U.cameras;Se(U,_e);for(let Oe=0;Oe<me.length;Oe++)Se(me[Oe],_e);me.length===2?Me(U,b,w):U.projectionMatrix.copy(b.projectionMatrix),Ee(te,U,_e)};function Ee(te,se,Te){Te===null?te.matrix.copy(se.matrixWorld):(te.matrix.copy(Te.matrixWorld),te.matrix.invert(),te.matrix.multiply(se.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(se.projectionMatrix),te.projectionMatrixInverse.copy(se.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Ds*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(te){c=te,d!==null&&(d.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(te){return p[te]};let at=null;function Ge(te,se){if(h=se.getViewerPose(l||a),g=se,h!==null){const Te=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let _e=!1;Te.length!==U.cameras.length&&(U.cameras.length=0,_e=!0);for(let N=0;N<Te.length;N++){const Ie=Te[N];let Pe=null;if(f!==null)Pe=f.getViewport(Ie);else{const le=u.getViewSubImage(d,Ie);Pe=le.viewport,N===0&&(e.setRenderTargetTextures(v,le.colorTexture,le.depthStencilTexture),e.setRenderTarget(v))}let Ae=L[N];Ae===void 0&&(Ae=new rn,Ae.layers.enable(N),Ae.viewport=new yt,L[N]=Ae),Ae.matrix.fromArray(Ie.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Ie.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),N===0&&(U.matrix.copy(Ae.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),_e===!0&&U.cameras.push(Ae)}const me=i.enabledFeatures;if(me&&me.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const N=u.getDepthInformation(Te[0]);N&&N.isValid&&N.texture&&m.init(N,i.renderState)}if(me&&me.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let N=0;N<Te.length;N++){const Ie=Te[N].camera;if(Ie){let Pe=p[Ie];Pe||(Pe=new Ru,p[Ie]=Pe);const Ae=u.getCameraImage(Ie);Pe.sourceTexture=Ae}}}}for(let Te=0;Te<S.length;Te++){const _e=T[Te],me=S[Te];_e!==null&&me!==void 0&&me.update(_e,se,l||a)}at&&at(te,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}const it=new Ou;it.setAnimationLoop(Ge),this.setAnimationLoop=function(te){at=te},this.dispose=function(){}}}const Bi=new Pn,nx=new rt;function ix(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,xu(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,x,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===on&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===on&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),y=x.envMap,v=x.envMapRotation;y&&(m.envMap.value=y,Bi.copy(v),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),m.envMapRotation.value.setFromMatrix4(nx.makeRotationFromEuler(Bi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===on&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sx(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const v=y.program;n.uniformBlockBinding(x,v)}function l(x,y){let v=i[x.id];v===void 0&&(g(x),v=h(x),i[x.id]=v,x.addEventListener("dispose",m));const S=y.program;n.updateUBOMapping(x,S);const T=e.render.frame;r[x.id]!==T&&(d(x),r[x.id]=T)}function h(x){const y=u();x.__bindingPointIndex=y;const v=s.createBuffer(),S=x.__size,T=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,S,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,v),v}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],v=x.uniforms,S=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let T=0,R=v.length;T<R;T++){const I=Array.isArray(v[T])?v[T]:[v[T]];for(let b=0,w=I.length;b<w;b++){const L=I[b];if(f(L,T,b,S)===!0){const U=L.__offset,V=Array.isArray(L.value)?L.value:[L.value];let Y=0;for(let Q=0;Q<V.length;Q++){const G=V[Q],ce=_(G);typeof G=="number"||typeof G=="boolean"?(L.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,U+Y,L.__data)):G.isMatrix3?(L.__data[0]=G.elements[0],L.__data[1]=G.elements[1],L.__data[2]=G.elements[2],L.__data[3]=0,L.__data[4]=G.elements[3],L.__data[5]=G.elements[4],L.__data[6]=G.elements[5],L.__data[7]=0,L.__data[8]=G.elements[6],L.__data[9]=G.elements[7],L.__data[10]=G.elements[8],L.__data[11]=0):(G.toArray(L.__data,Y),Y+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,v,S){const T=x.value,R=y+"_"+v;if(S[R]===void 0)return typeof T=="number"||typeof T=="boolean"?S[R]=T:S[R]=T.clone(),!0;{const I=S[R];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return S[R]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(x){const y=x.uniforms;let v=0;const S=16;for(let R=0,I=y.length;R<I;R++){const b=Array.isArray(y[R])?y[R]:[y[R]];for(let w=0,L=b.length;w<L;w++){const U=b[w],V=Array.isArray(U.value)?U.value:[U.value];for(let Y=0,Q=V.length;Y<Q;Y++){const G=V[Y],ce=_(G),$=v%S,pe=$%ce.boundary,Me=$+pe;v+=pe,Me!==0&&S-Me<ce.storage&&(v+=S-Me),U.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=ce.storage}}}const T=v%S;return T>0&&(v+=S-T),x.__size=v,x.__cache={},this}function _(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class rx{constructor(e={}){const{canvas:t=qf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let S=!1;this._outputColorSpace=kt;let T=0,R=0,I=null,b=-1,w=null;const L=new yt,U=new yt;let V=null;const Y=new Je(0);let Q=0,G=t.width,ce=t.height,$=1,pe=null,Me=null;const Se=new yt(0,0,G,ce),Ee=new yt(0,0,G,ce);let at=!1;const Ge=new Xc;let it=!1,te=!1;const se=new rt,Te=new D,_e=new yt,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function We(){return I===null?$:1}let N=n;function Ie(A,B){return t.getContext(A,B)}try{const A={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Lc}`),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",ne,!1),t.addEventListener("webglcontextcreationerror",W,!1),N===null){const B="webgl2";if(N=Ie(B,A),N===null)throw Ie(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Pe,Ae,le,ze,ge,Le,Ke,Ze,P,M,z,J,re,ee,Ne,ue,He,ke,he,be,$e,X,j,F;function C(){Pe=new m_(N),Pe.init(),X=new Zv(N,Pe),Ae=new c_(N,Pe,e,X),le=new jv(N,Pe),Ae.reversedDepthBuffer&&d&&le.buffers.depth.setReversed(!0),ze=new v_(N),ge=new Fv,Le=new Kv(N,Pe,le,ge,Ae,X,ze),Ke=new h_(v),Ze=new p_(v),P=new wm(N),j=new a_(N,P),M=new g_(N,P,ze,j),z=new y_(N,M,P,ze),he=new x_(N,Ae,Le),ue=new l_(ge),J=new Uv(v,Ke,Ze,Pe,Ae,j,ue),re=new ix(v,ge),ee=new kv,Ne=new Wv(Pe),ke=new r_(v,Ke,Ze,le,z,f,c),He=new qv(v,z,Ae),F=new sx(N,ze,Ae,le),be=new o_(N,Pe,ze),$e=new __(N,Pe,ze),ze.programs=J.programs,v.capabilities=Ae,v.extensions=Pe,v.properties=ge,v.renderLists=ee,v.shadowMap=He,v.state=le,v.info=ze}C();const k=new tx(v,N);this.xr=k,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const A=Pe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Pe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(A){A!==void 0&&($=A,this.setSize(G,ce,!1))},this.getSize=function(A){return A.set(G,ce)},this.setSize=function(A,B,K=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=A,ce=B,t.width=Math.floor(A*$),t.height=Math.floor(B*$),K===!0&&(t.style.width=A+"px",t.style.height=B+"px"),this.setViewport(0,0,A,B)},this.getDrawingBufferSize=function(A){return A.set(G*$,ce*$).floor()},this.setDrawingBufferSize=function(A,B,K){G=A,ce=B,$=K,t.width=Math.floor(A*K),t.height=Math.floor(B*K),this.setViewport(0,0,A,B)},this.getCurrentViewport=function(A){return A.copy(L)},this.getViewport=function(A){return A.copy(Se)},this.setViewport=function(A,B,K,Z){A.isVector4?Se.set(A.x,A.y,A.z,A.w):Se.set(A,B,K,Z),le.viewport(L.copy(Se).multiplyScalar($).round())},this.getScissor=function(A){return A.copy(Ee)},this.setScissor=function(A,B,K,Z){A.isVector4?Ee.set(A.x,A.y,A.z,A.w):Ee.set(A,B,K,Z),le.scissor(U.copy(Ee).multiplyScalar($).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(A){le.setScissorTest(at=A)},this.setOpaqueSort=function(A){pe=A},this.setTransparentSort=function(A){Me=A},this.getClearColor=function(A){return A.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(A=!0,B=!0,K=!0){let Z=0;if(A){let H=!1;if(I!==null){const ve=I.texture.format;H=ve===Bc||ve===kc||ve===Oc}if(H){const ve=I.texture.type,De=ve===Yn||ve===qi||ve===mr||ve===gr||ve===Nc||ve===Uc,Ve=ke.getClearColor(),Fe=ke.getClearAlpha(),Qe=Ve.r,tt=Ve.g,qe=Ve.b;De?(g[0]=Qe,g[1]=tt,g[2]=qe,g[3]=Fe,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Qe,_[1]=tt,_[2]=qe,_[3]=Fe,N.clearBufferiv(N.COLOR,0,_))}else Z|=N.COLOR_BUFFER_BIT}B&&(Z|=N.DEPTH_BUFFER_BIT),K&&(Z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",ne,!1),t.removeEventListener("webglcontextcreationerror",W,!1),ke.dispose(),ee.dispose(),Ne.dispose(),ge.dispose(),Ke.dispose(),Ze.dispose(),z.dispose(),j.dispose(),F.dispose(),J.dispose(),k.dispose(),k.removeEventListener("sessionstart",_t),k.removeEventListener("sessionend",de),xe.stop()};function q(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function ne(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const A=ze.autoReset,B=He.enabled,K=He.autoUpdate,Z=He.needsUpdate,H=He.type;C(),ze.autoReset=A,He.enabled=B,He.autoUpdate=K,He.needsUpdate=Z,He.type=H}function W(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function O(A){const B=A.target;B.removeEventListener("dispose",O),ae(B)}function ae(A){fe(A),ge.remove(A)}function fe(A){const B=ge.get(A).programs;B!==void 0&&(B.forEach(function(K){J.releaseProgram(K)}),A.isShaderMaterial&&J.releaseShaderCache(A))}this.renderBufferDirect=function(A,B,K,Z,H,ve){B===null&&(B=me);const De=H.isMesh&&H.matrixWorld.determinant()<0,Ve=Qt(A,B,K,Z,H);le.setMaterial(Z,De);let Fe=K.index,Qe=1;if(Z.wireframe===!0){if(Fe=M.getWireframeAttribute(K),Fe===void 0)return;Qe=2}const tt=K.drawRange,qe=K.attributes.position;let mt=tt.start*Qe,At=(tt.start+tt.count)*Qe;ve!==null&&(mt=Math.max(mt,ve.start*Qe),At=Math.min(At,(ve.start+ve.count)*Qe)),Fe!==null?(mt=Math.max(mt,0),At=Math.min(At,Fe.count)):qe!=null&&(mt=Math.max(mt,0),At=Math.min(At,qe.count));const Ot=At-mt;if(Ot<0||Ot===1/0)return;j.setup(H,Z,Ve,K,Fe);let It,Lt=be;if(Fe!==null&&(It=P.get(Fe),Lt=$e,Lt.setIndex(It)),H.isMesh)Z.wireframe===!0?(le.setLineWidth(Z.wireframeLinewidth*We()),Lt.setMode(N.LINES)):Lt.setMode(N.TRIANGLES);else if(H.isLine){let je=Z.linewidth;je===void 0&&(je=1),le.setLineWidth(je*We()),H.isLineSegments?Lt.setMode(N.LINES):H.isLineLoop?Lt.setMode(N.LINE_LOOP):Lt.setMode(N.LINE_STRIP)}else H.isPoints?Lt.setMode(N.POINTS):H.isSprite&&Lt.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)br("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Lt.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Pe.get("WEBGL_multi_draw"))Lt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const je=H._multiDrawStarts,Ut=H._multiDrawCounts,vt=H._multiDrawCount,mn=Fe?P.get(Fe).bytesPerElement:1,Qi=ge.get(Z).currentProgram.getUniforms();for(let gn=0;gn<vt;gn++)Qi.setValue(N,"_gl_DrawID",gn),Lt.render(je[gn]/mn,Ut[gn])}else if(H.isInstancedMesh)Lt.renderInstances(mt,Ot,H.count);else if(K.isInstancedBufferGeometry){const je=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ut=Math.min(K.instanceCount,je);Lt.renderInstances(mt,Ot,Ut)}else Lt.render(mt,Ot)};function Ue(A,B,K){A.transparent===!0&&A.side===Gt&&A.forceSinglePass===!1?(A.side=on,A.needsUpdate=!0,Ht(A,B,K),A.side=di,A.needsUpdate=!0,Ht(A,B,K),A.side=Gt):Ht(A,B,K)}this.compile=function(A,B,K=null){K===null&&(K=A),p=Ne.get(K),p.init(B),y.push(p),K.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),A!==K&&A.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const Z=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ve=H.material;if(ve)if(Array.isArray(ve))for(let De=0;De<ve.length;De++){const Ve=ve[De];Ue(Ve,K,H),Z.add(Ve)}else Ue(ve,K,H),Z.add(ve)}),p=y.pop(),Z},this.compileAsync=function(A,B,K=null){const Z=this.compile(A,B,K);return new Promise(H=>{function ve(){if(Z.forEach(function(De){ge.get(De).currentProgram.isReady()&&Z.delete(De)}),Z.size===0){H(A);return}setTimeout(ve,10)}Pe.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let Be=null;function pt(A){Be&&Be(A)}function _t(){xe.stop()}function de(){xe.start()}const xe=new Ou;xe.setAnimationLoop(pt),typeof self<"u"&&xe.setContext(self),this.setAnimationLoop=function(A){Be=A,k.setAnimationLoop(A),A===null?xe.stop():xe.start()},k.addEventListener("sessionstart",_t),k.addEventListener("sessionend",de),this.render=function(A,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(B),B=k.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,B,I),p=Ne.get(A,y.length),p.init(B),y.push(p),se.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ge.setFromProjectionMatrix(se,$n,B.reversedDepth),te=this.localClippingEnabled,it=ue.init(this.clippingPlanes,te),m=ee.get(A,x.length),m.init(),x.push(m),k.enabled===!0&&k.isPresenting===!0){const ve=v.xr.getDepthSensingMesh();ve!==null&&ye(ve,B,-1/0,v.sortObjects)}ye(A,B,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(pe,Me),Oe=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,Oe&&ke.addToRenderList(m,A),this.info.render.frame++,it===!0&&ue.beginShadows();const K=p.state.shadowsArray;He.render(K,A,B),it===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=m.opaque,H=m.transmissive;if(p.setupLights(),B.isArrayCamera){const ve=B.cameras;if(H.length>0)for(let De=0,Ve=ve.length;De<Ve;De++){const Fe=ve[De];Re(Z,H,A,Fe)}Oe&&ke.render(A);for(let De=0,Ve=ve.length;De<Ve;De++){const Fe=ve[De];Xe(m,A,Fe,Fe.viewport)}}else H.length>0&&Re(Z,H,A,B),Oe&&ke.render(A),Xe(m,A,B);I!==null&&R===0&&(Le.updateMultisampleRenderTarget(I),Le.updateRenderTargetMipmap(I)),A.isScene===!0&&A.onAfterRender(v,A,B),j.resetDefaultState(),b=-1,w=null,y.pop(),y.length>0?(p=y[y.length-1],it===!0&&ue.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function ye(A,B,K,Z){if(A.visible===!1)return;if(A.layers.test(B.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(B);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Ge.intersectsSprite(A)){Z&&_e.setFromMatrixPosition(A.matrixWorld).applyMatrix4(se);const De=z.update(A),Ve=A.material;Ve.visible&&m.push(A,De,Ve,K,_e.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Ge.intersectsObject(A))){const De=z.update(A),Ve=A.material;if(Z&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),_e.copy(A.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),_e.copy(De.boundingSphere.center)),_e.applyMatrix4(A.matrixWorld).applyMatrix4(se)),Array.isArray(Ve)){const Fe=De.groups;for(let Qe=0,tt=Fe.length;Qe<tt;Qe++){const qe=Fe[Qe],mt=Ve[qe.materialIndex];mt&&mt.visible&&m.push(A,De,mt,K,_e.z,qe)}}else Ve.visible&&m.push(A,De,Ve,K,_e.z,null)}}const ve=A.children;for(let De=0,Ve=ve.length;De<Ve;De++)ye(ve[De],B,K,Z)}function Xe(A,B,K,Z){const H=A.opaque,ve=A.transmissive,De=A.transparent;p.setupLightsView(K),it===!0&&ue.setGlobalState(v.clippingPlanes,K),Z&&le.viewport(L.copy(Z)),H.length>0&&ut(H,B,K),ve.length>0&&ut(ve,B,K),De.length>0&&ut(De,B,K),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Re(A,B,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Z.id]===void 0&&(p.state.transmissionRenderTarget[Z.id]=new Yi(1,1,{generateMipmaps:!0,type:Pe.has("EXT_color_buffer_half_float")||Pe.has("EXT_color_buffer_float")?Tr:Yn,minFilter:ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));const ve=p.state.transmissionRenderTarget[Z.id],De=Z.viewport||L;ve.setSize(De.z*v.transmissionResolutionScale,De.w*v.transmissionResolutionScale);const Ve=v.getRenderTarget(),Fe=v.getActiveCubeFace(),Qe=v.getActiveMipmapLevel();v.setRenderTarget(ve),v.getClearColor(Y),Q=v.getClearAlpha(),Q<1&&v.setClearColor(16777215,.5),v.clear(),Oe&&ke.render(K);const tt=v.toneMapping;v.toneMapping=Ai;const qe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),p.setupLightsView(Z),it===!0&&ue.setGlobalState(v.clippingPlanes,Z),ut(A,K,Z),Le.updateMultisampleRenderTarget(ve),Le.updateRenderTargetMipmap(ve),Pe.has("WEBGL_multisampled_render_to_texture")===!1){let mt=!1;for(let At=0,Ot=B.length;At<Ot;At++){const It=B[At],Lt=It.object,je=It.geometry,Ut=It.material,vt=It.group;if(Ut.side===Gt&&Lt.layers.test(Z.layers)){const mn=Ut.side;Ut.side=on,Ut.needsUpdate=!0,Mt(Lt,K,Z,je,Ut,vt),Ut.side=mn,Ut.needsUpdate=!0,mt=!0}}mt===!0&&(Le.updateMultisampleRenderTarget(ve),Le.updateRenderTargetMipmap(ve))}v.setRenderTarget(Ve,Fe,Qe),v.setClearColor(Y,Q),qe!==void 0&&(Z.viewport=qe),v.toneMapping=tt}function ut(A,B,K){const Z=B.isScene===!0?B.overrideMaterial:null;for(let H=0,ve=A.length;H<ve;H++){const De=A[H],Ve=De.object,Fe=De.geometry,Qe=De.group;let tt=De.material;tt.allowOverride===!0&&Z!==null&&(tt=Z),Ve.layers.test(K.layers)&&Mt(Ve,B,K,Fe,tt,Qe)}}function Mt(A,B,K,Z,H,ve){A.onBeforeRender(v,B,K,Z,H,ve),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(v,B,K,Z,A,ve),H.transparent===!0&&H.side===Gt&&H.forceSinglePass===!1?(H.side=on,H.needsUpdate=!0,v.renderBufferDirect(K,B,Z,H,A,ve),H.side=di,H.needsUpdate=!0,v.renderBufferDirect(K,B,Z,H,A,ve),H.side=Gt):v.renderBufferDirect(K,B,Z,H,A,ve),A.onAfterRender(v,B,K,Z,H,ve)}function Ht(A,B,K){B.isScene!==!0&&(B=me);const Z=ge.get(A),H=p.state.lights,ve=p.state.shadowsArray,De=H.state.version,Ve=J.getParameters(A,H.state,ve,B,K),Fe=J.getProgramCacheKey(Ve);let Qe=Z.programs;Z.environment=A.isMeshStandardMaterial?B.environment:null,Z.fog=B.fog,Z.envMap=(A.isMeshStandardMaterial?Ze:Ke).get(A.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&A.envMap===null?B.environmentRotation:A.envMapRotation,Qe===void 0&&(A.addEventListener("dispose",O),Qe=new Map,Z.programs=Qe);let tt=Qe.get(Fe);if(tt!==void 0){if(Z.currentProgram===tt&&Z.lightsStateVersion===De)return wt(A,Ve),tt}else Ve.uniforms=J.getUniforms(A),A.onBeforeCompile(Ve,v),tt=J.acquireProgram(Ve,Fe),Qe.set(Fe,tt),Z.uniforms=Ve.uniforms;const qe=Z.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(qe.clippingPlanes=ue.uniform),wt(A,Ve),Z.needsLights=gd(A),Z.lightsStateVersion=De,Z.needsLights&&(qe.ambientLightColor.value=H.state.ambient,qe.lightProbe.value=H.state.probe,qe.directionalLights.value=H.state.directional,qe.directionalLightShadows.value=H.state.directionalShadow,qe.spotLights.value=H.state.spot,qe.spotLightShadows.value=H.state.spotShadow,qe.rectAreaLights.value=H.state.rectArea,qe.ltc_1.value=H.state.rectAreaLTC1,qe.ltc_2.value=H.state.rectAreaLTC2,qe.pointLights.value=H.state.point,qe.pointLightShadows.value=H.state.pointShadow,qe.hemisphereLights.value=H.state.hemi,qe.directionalShadowMap.value=H.state.directionalShadowMap,qe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,qe.spotShadowMap.value=H.state.spotShadowMap,qe.spotLightMatrix.value=H.state.spotLightMatrix,qe.spotLightMap.value=H.state.spotLightMap,qe.pointShadowMap.value=H.state.pointShadowMap,qe.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=tt,Z.uniformsList=null,tt}function st(A){if(A.uniformsList===null){const B=A.currentProgram.getUniforms();A.uniformsList=_a.seqWithValue(B.seq,A.uniforms)}return A.uniformsList}function wt(A,B){const K=ge.get(A);K.outputColorSpace=B.outputColorSpace,K.batching=B.batching,K.batchingColor=B.batchingColor,K.instancing=B.instancing,K.instancingColor=B.instancingColor,K.instancingMorph=B.instancingMorph,K.skinning=B.skinning,K.morphTargets=B.morphTargets,K.morphNormals=B.morphNormals,K.morphColors=B.morphColors,K.morphTargetsCount=B.morphTargetsCount,K.numClippingPlanes=B.numClippingPlanes,K.numIntersection=B.numClipIntersection,K.vertexAlphas=B.vertexAlphas,K.vertexTangents=B.vertexTangents,K.toneMapping=B.toneMapping}function Qt(A,B,K,Z,H){B.isScene!==!0&&(B=me),Le.resetTextureUnits();const ve=B.fog,De=Z.isMeshStandardMaterial?B.environment:null,Ve=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ln,Fe=(Z.isMeshStandardMaterial?Ze:Ke).get(Z.envMap||De),Qe=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,tt=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),qe=!!K.morphAttributes.position,mt=!!K.morphAttributes.normal,At=!!K.morphAttributes.color;let Ot=Ai;Z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ot=v.toneMapping);const It=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Lt=It!==void 0?It.length:0,je=ge.get(Z),Ut=p.state.lights;if(it===!0&&(te===!0||A!==w)){const en=A===w&&Z.id===b;ue.setState(Z,A,en)}let vt=!1;Z.version===je.__version?(je.needsLights&&je.lightsStateVersion!==Ut.state.version||je.outputColorSpace!==Ve||H.isBatchedMesh&&je.batching===!1||!H.isBatchedMesh&&je.batching===!0||H.isBatchedMesh&&je.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&je.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&je.instancing===!1||!H.isInstancedMesh&&je.instancing===!0||H.isSkinnedMesh&&je.skinning===!1||!H.isSkinnedMesh&&je.skinning===!0||H.isInstancedMesh&&je.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&je.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&je.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&je.instancingMorph===!1&&H.morphTexture!==null||je.envMap!==Fe||Z.fog===!0&&je.fog!==ve||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==ue.numPlanes||je.numIntersection!==ue.numIntersection)||je.vertexAlphas!==Qe||je.vertexTangents!==tt||je.morphTargets!==qe||je.morphNormals!==mt||je.morphColors!==At||je.toneMapping!==Ot||je.morphTargetsCount!==Lt)&&(vt=!0):(vt=!0,je.__version=Z.version);let mn=je.currentProgram;vt===!0&&(mn=Ht(Z,B,H));let Qi=!1,gn=!1,qs=!1;const Ft=mn.getUniforms(),bn=je.uniforms;if(le.useProgram(mn.program)&&(Qi=!0,gn=!0,qs=!0),Z.id!==b&&(b=Z.id,gn=!0),Qi||w!==A){le.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ft.setValue(N,"projectionMatrix",A.projectionMatrix),Ft.setValue(N,"viewMatrix",A.matrixWorldInverse);const dn=Ft.map.cameraPosition;dn!==void 0&&dn.setValue(N,Te.setFromMatrixPosition(A.matrixWorld)),Ae.logarithmicDepthBuffer&&Ft.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Ft.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),w!==A&&(w=A,gn=!0,qs=!0)}if(H.isSkinnedMesh){Ft.setOptional(N,H,"bindMatrix"),Ft.setOptional(N,H,"bindMatrixInverse");const en=H.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),Ft.setValue(N,"boneTexture",en.boneTexture,Le))}H.isBatchedMesh&&(Ft.setOptional(N,H,"batchingTexture"),Ft.setValue(N,"batchingTexture",H._matricesTexture,Le),Ft.setOptional(N,H,"batchingIdTexture"),Ft.setValue(N,"batchingIdTexture",H._indirectTexture,Le),Ft.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&Ft.setValue(N,"batchingColorTexture",H._colorsTexture,Le));const Sn=K.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&he.update(H,K,mn),(gn||je.receiveShadow!==H.receiveShadow)&&(je.receiveShadow=H.receiveShadow,Ft.setValue(N,"receiveShadow",H.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(bn.envMap.value=Fe,bn.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&B.environment!==null&&(bn.envMapIntensity.value=B.environmentIntensity),gn&&(Ft.setValue(N,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&Di(bn,qs),ve&&Z.fog===!0&&re.refreshFogUniforms(bn,ve),re.refreshMaterialUniforms(bn,Z,$,ce,p.state.transmissionRenderTarget[A.id]),_a.upload(N,st(je),bn,Le)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(_a.upload(N,st(je),bn,Le),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Ft.setValue(N,"center",H.center),Ft.setValue(N,"modelViewMatrix",H.modelViewMatrix),Ft.setValue(N,"normalMatrix",H.normalMatrix),Ft.setValue(N,"modelMatrix",H.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const en=Z.uniformsGroups;for(let dn=0,Ua=en.length;dn<Ua;dn++){const Ii=en[dn];F.update(Ii,mn),F.bind(Ii,mn)}}return mn}function Di(A,B){A.ambientLightColor.needsUpdate=B,A.lightProbe.needsUpdate=B,A.directionalLights.needsUpdate=B,A.directionalLightShadows.needsUpdate=B,A.pointLights.needsUpdate=B,A.pointLightShadows.needsUpdate=B,A.spotLights.needsUpdate=B,A.spotLightShadows.needsUpdate=B,A.rectAreaLights.needsUpdate=B,A.hemisphereLights.needsUpdate=B}function gd(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,B,K){const Z=ge.get(A);Z.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),ge.get(A.texture).__webglTexture=B,ge.get(A.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:K,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,B){const K=ge.get(A);K.__webglFramebuffer=B,K.__useDefaultFramebuffer=B===void 0};const _d=N.createFramebuffer();this.setRenderTarget=function(A,B=0,K=0){I=A,T=B,R=K;let Z=!0,H=null,ve=!1,De=!1;if(A){const Fe=ge.get(A);if(Fe.__useDefaultFramebuffer!==void 0)le.bindFramebuffer(N.FRAMEBUFFER,null),Z=!1;else if(Fe.__webglFramebuffer===void 0)Le.setupRenderTarget(A);else if(Fe.__hasExternalTextures)Le.rebindTextures(A,ge.get(A.texture).__webglTexture,ge.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const qe=A.depthTexture;if(Fe.__boundDepthTexture!==qe){if(qe!==null&&ge.has(qe)&&(A.width!==qe.image.width||A.height!==qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Le.setupDepthRenderbuffer(A)}}const Qe=A.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(De=!0);const tt=ge.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(tt[B])?H=tt[B][K]:H=tt[B],ve=!0):A.samples>0&&Le.useMultisampledRTT(A)===!1?H=ge.get(A).__webglMultisampledFramebuffer:Array.isArray(tt)?H=tt[K]:H=tt,L.copy(A.viewport),U.copy(A.scissor),V=A.scissorTest}else L.copy(Se).multiplyScalar($).floor(),U.copy(Ee).multiplyScalar($).floor(),V=at;if(K!==0&&(H=_d),le.bindFramebuffer(N.FRAMEBUFFER,H)&&Z&&le.drawBuffers(A,H),le.viewport(L),le.scissor(U),le.setScissorTest(V),ve){const Fe=ge.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,Fe.__webglTexture,K)}else if(De){const Fe=B;for(let Qe=0;Qe<A.textures.length;Qe++){const tt=ge.get(A.textures[Qe]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Qe,tt.__webglTexture,K,Fe)}}else if(A!==null&&K!==0){const Fe=ge.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Fe.__webglTexture,K)}b=-1},this.readRenderTargetPixels=function(A,B,K,Z,H,ve,De,Ve=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe){le.bindFramebuffer(N.FRAMEBUFFER,Fe);try{const Qe=A.textures[Ve],tt=Qe.format,qe=Qe.type;if(!Ae.textureFormatReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ae.textureTypeReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=A.width-Z&&K>=0&&K<=A.height-H&&(A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ve),N.readPixels(B,K,Z,H,X.convert(tt),X.convert(qe),ve))}finally{const Qe=I!==null?ge.get(I).__webglFramebuffer:null;le.bindFramebuffer(N.FRAMEBUFFER,Qe)}}},this.readRenderTargetPixelsAsync=async function(A,B,K,Z,H,ve,De,Ve=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe)if(B>=0&&B<=A.width-Z&&K>=0&&K<=A.height-H){le.bindFramebuffer(N.FRAMEBUFFER,Fe);const Qe=A.textures[Ve],tt=Qe.format,qe=Qe.type;if(!Ae.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ae.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const mt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,mt),N.bufferData(N.PIXEL_PACK_BUFFER,ve.byteLength,N.STREAM_READ),A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ve),N.readPixels(B,K,Z,H,X.convert(tt),X.convert(qe),0);const At=I!==null?ge.get(I).__webglFramebuffer:null;le.bindFramebuffer(N.FRAMEBUFFER,At);const Ot=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Yf(N,Ot,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,mt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ve),N.deleteBuffer(mt),N.deleteSync(Ot),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,B=null,K=0){const Z=Math.pow(2,-K),H=Math.floor(A.image.width*Z),ve=Math.floor(A.image.height*Z),De=B!==null?B.x:0,Ve=B!==null?B.y:0;Le.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,K,0,0,De,Ve,H,ve),le.unbindTexture()};const vd=N.createFramebuffer(),xd=N.createFramebuffer();this.copyTextureToTexture=function(A,B,K=null,Z=null,H=0,ve=null){ve===null&&(H!==0?(br("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ve=H,H=0):ve=0);let De,Ve,Fe,Qe,tt,qe,mt,At,Ot;const It=A.isCompressedTexture?A.mipmaps[ve]:A.image;if(K!==null)De=K.max.x-K.min.x,Ve=K.max.y-K.min.y,Fe=K.isBox3?K.max.z-K.min.z:1,Qe=K.min.x,tt=K.min.y,qe=K.isBox3?K.min.z:0;else{const Sn=Math.pow(2,-H);De=Math.floor(It.width*Sn),Ve=Math.floor(It.height*Sn),A.isDataArrayTexture?Fe=It.depth:A.isData3DTexture?Fe=Math.floor(It.depth*Sn):Fe=1,Qe=0,tt=0,qe=0}Z!==null?(mt=Z.x,At=Z.y,Ot=Z.z):(mt=0,At=0,Ot=0);const Lt=X.convert(B.format),je=X.convert(B.type);let Ut;B.isData3DTexture?(Le.setTexture3D(B,0),Ut=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Le.setTexture2DArray(B,0),Ut=N.TEXTURE_2D_ARRAY):(Le.setTexture2D(B,0),Ut=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const vt=N.getParameter(N.UNPACK_ROW_LENGTH),mn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Qi=N.getParameter(N.UNPACK_SKIP_PIXELS),gn=N.getParameter(N.UNPACK_SKIP_ROWS),qs=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,It.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,It.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Qe),N.pixelStorei(N.UNPACK_SKIP_ROWS,tt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,qe);const Ft=A.isDataArrayTexture||A.isData3DTexture,bn=B.isDataArrayTexture||B.isData3DTexture;if(A.isDepthTexture){const Sn=ge.get(A),en=ge.get(B),dn=ge.get(Sn.__renderTarget),Ua=ge.get(en.__renderTarget);le.bindFramebuffer(N.READ_FRAMEBUFFER,dn.__webglFramebuffer),le.bindFramebuffer(N.DRAW_FRAMEBUFFER,Ua.__webglFramebuffer);for(let Ii=0;Ii<Fe;Ii++)Ft&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ge.get(A).__webglTexture,H,qe+Ii),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ge.get(B).__webglTexture,ve,Ot+Ii)),N.blitFramebuffer(Qe,tt,De,Ve,mt,At,De,Ve,N.DEPTH_BUFFER_BIT,N.NEAREST);le.bindFramebuffer(N.READ_FRAMEBUFFER,null),le.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||A.isRenderTargetTexture||ge.has(A)){const Sn=ge.get(A),en=ge.get(B);le.bindFramebuffer(N.READ_FRAMEBUFFER,vd),le.bindFramebuffer(N.DRAW_FRAMEBUFFER,xd);for(let dn=0;dn<Fe;dn++)Ft?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Sn.__webglTexture,H,qe+dn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Sn.__webglTexture,H),bn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,en.__webglTexture,ve,Ot+dn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,en.__webglTexture,ve),H!==0?N.blitFramebuffer(Qe,tt,De,Ve,mt,At,De,Ve,N.COLOR_BUFFER_BIT,N.NEAREST):bn?N.copyTexSubImage3D(Ut,ve,mt,At,Ot+dn,Qe,tt,De,Ve):N.copyTexSubImage2D(Ut,ve,mt,At,Qe,tt,De,Ve);le.bindFramebuffer(N.READ_FRAMEBUFFER,null),le.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else bn?A.isDataTexture||A.isData3DTexture?N.texSubImage3D(Ut,ve,mt,At,Ot,De,Ve,Fe,Lt,je,It.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(Ut,ve,mt,At,Ot,De,Ve,Fe,Lt,It.data):N.texSubImage3D(Ut,ve,mt,At,Ot,De,Ve,Fe,Lt,je,It):A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ve,mt,At,De,Ve,Lt,je,It.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ve,mt,At,It.width,It.height,Lt,It.data):N.texSubImage2D(N.TEXTURE_2D,ve,mt,At,De,Ve,Lt,je,It);N.pixelStorei(N.UNPACK_ROW_LENGTH,vt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,mn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Qi),N.pixelStorei(N.UNPACK_SKIP_ROWS,gn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,qs),ve===0&&B.generateMipmaps&&N.generateMipmap(Ut),le.unbindTexture()},this.initRenderTarget=function(A){ge.get(A).__webglFramebuffer===void 0&&Le.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Le.setTextureCube(A,0):A.isData3DTexture?Le.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Le.setTexture2DArray(A,0):Le.setTexture2D(A,0),le.unbindTexture()},this.resetState=function(){T=0,R=0,I=null,le.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}}const Ih={type:"change"},tl={type:"start"},Vu={type:"end"},la=new Ar,Nh=new Si,ax=Math.cos(70*Vc.DEG2RAD),Vt=new D,fn=2*Math.PI,Ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},So=1e-6;class ox extends bm{constructor(e,t=null){super(e,t),this.state=Ct.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hi.ROTATE,MIDDLE:hi.DOLLY,RIGHT:hi.PAN},this.touches={ONE:oi.ROTATE,TWO:oi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Cn,this._lastTargetPosition=new D,this._quat=new Cn().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ch,this._sphericalDelta=new ch,this._scale=1,this._panOffset=new D,this._rotateStart=new we,this._rotateEnd=new we,this._rotateDelta=new we,this._panStart=new we,this._panEnd=new we,this._panDelta=new we,this._dollyStart=new we,this._dollyEnd=new we,this._dollyDelta=new we,this._dollyDirection=new D,this._mouse=new we,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=lx.bind(this),this._onPointerDown=cx.bind(this),this._onPointerUp=hx.bind(this),this._onContextMenu=_x.bind(this),this._onMouseWheel=fx.bind(this),this._onKeyDown=px.bind(this),this._onTouchStart=mx.bind(this),this._onTouchMove=gx.bind(this),this._onMouseDown=ux.bind(this),this._onMouseMove=dx.bind(this),this._interceptControlDown=vx.bind(this),this._interceptControlUp=xx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ih),this.update(),this.state=Ct.NONE}update(e=null){const t=this.object.position;Vt.copy(t).sub(this.target),Vt.applyQuaternion(this._quat),this._spherical.setFromVector3(Vt),this.autoRotate&&this.state===Ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=fn:n>Math.PI&&(n-=fn),i<-Math.PI?i+=fn:i>Math.PI&&(i-=fn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Vt.setFromSpherical(this._spherical),Vt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Vt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Vt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new D(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Vt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(la.origin.copy(this.object.position),la.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(la.direction))<ax?this.object.lookAt(this.target):(Nh.setFromNormalAndCoplanarPoint(this.object.up,this.target),la.intersectPlane(Nh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>So||8*(1-this._lastQuaternion.dot(this.object.quaternion))>So||this._lastTargetPosition.distanceToSquared(this.target)>So?(this.dispatchEvent(Ih),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?fn/60*this.autoRotateSpeed*e:fn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Vt.setFromMatrixColumn(t,0),Vt.multiplyScalar(-e),this._panOffset.add(Vt)}_panUp(e,t){this.screenSpacePanning===!0?Vt.setFromMatrixColumn(t,1):(Vt.setFromMatrixColumn(t,0),Vt.crossVectors(this.object.up,Vt)),Vt.multiplyScalar(e),this._panOffset.add(Vt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Vt.copy(i).sub(this.target);let r=Vt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/t.clientHeight),this._rotateUp(fn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/t.clientHeight),this._rotateUp(fn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new we,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function cx(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function lx(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function hx(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Vu),this.state=Ct.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ux(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case hi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Ct.DOLLY;break;case hi.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ct.ROTATE}break;case hi.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ct.PAN}break;default:this.state=Ct.NONE}this.state!==Ct.NONE&&this.dispatchEvent(tl)}function dx(s){switch(this.state){case Ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function fx(s){this.enabled===!1||this.enableZoom===!1||this.state!==Ct.NONE||(s.preventDefault(),this.dispatchEvent(tl),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Vu))}function px(s){this.enabled!==!1&&this._handleKeyDown(s)}function mx(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case oi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Ct.TOUCH_ROTATE;break;case oi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Ct.TOUCH_PAN;break;default:this.state=Ct.NONE}break;case 2:switch(this.touches.TWO){case oi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Ct.TOUCH_DOLLY_PAN;break;case oi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Ct.TOUCH_DOLLY_ROTATE;break;default:this.state=Ct.NONE}break;default:this.state=Ct.NONE}this.state!==Ct.NONE&&this.dispatchEvent(tl)}function gx(s){switch(this._trackPointer(s),this.state){case Ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Ct.NONE}}function _x(s){this.enabled!==!1&&s.preventDefault()}function vx(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function xx(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class yx extends Ji{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new Kc(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e){function t(l){const h=new DataView(l),u=32/8*3+32/8*3*3+16/8,d=h.getUint32(80,!0);if(80+32/8+d*u===h.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,h,_))return!1;return!0}function n(l,h,u){for(let d=0,f=l.length;d<f;d++)if(l[d]!==h.getUint8(u+d))return!1;return!0}function i(l){const h=new DataView(l),u=h.getUint32(80,!0);let d,f,g,_=!1,m,p,x,y,v;for(let L=0;L<70;L++)h.getUint32(L,!1)==1129270351&&h.getUint8(L+4)==82&&h.getUint8(L+5)==61&&(_=!0,m=new Float32Array(u*3*3),p=h.getUint8(L+6)/255,x=h.getUint8(L+7)/255,y=h.getUint8(L+8)/255,v=h.getUint8(L+9)/255);const S=84,T=50,R=new St,I=new Float32Array(u*3*3),b=new Float32Array(u*3*3),w=new Je;for(let L=0;L<u;L++){const U=S+L*T,V=h.getFloat32(U,!0),Y=h.getFloat32(U+4,!0),Q=h.getFloat32(U+8,!0);if(_){const G=h.getUint16(U+48,!0);(G&32768)===0?(d=(G&31)/31,f=(G>>5&31)/31,g=(G>>10&31)/31):(d=p,f=x,g=y)}for(let G=1;G<=3;G++){const ce=U+G*12,$=L*3*3+(G-1)*3;I[$]=h.getFloat32(ce,!0),I[$+1]=h.getFloat32(ce+4,!0),I[$+2]=h.getFloat32(ce+8,!0),b[$]=V,b[$+1]=Y,b[$+2]=Q,_&&(w.setRGB(d,f,g,kt),m[$]=w.r,m[$+1]=w.g,m[$+2]=w.b)}}return R.setAttribute("position",new zt(I,3)),R.setAttribute("normal",new zt(b,3)),_&&(R.setAttribute("color",new zt(m,3)),R.hasColors=!0,R.alpha=v),R}function r(l){const h=new St,u=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,f=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,m=new RegExp("vertex"+_+_+_,"g"),p=new RegExp("normal"+_+_+_,"g"),x=[],y=[],v=[],S=new D;let T,R=0,I=0,b=0;for(;(T=u.exec(l))!==null;){I=b;const w=T[0],L=(T=f.exec(w))!==null?T[1]:"";for(v.push(L);(T=d.exec(w))!==null;){let Y=0,Q=0;const G=T[0];for(;(T=p.exec(G))!==null;)S.x=parseFloat(T[1]),S.y=parseFloat(T[2]),S.z=parseFloat(T[3]),Q++;for(;(T=m.exec(G))!==null;)x.push(parseFloat(T[1]),parseFloat(T[2]),parseFloat(T[3])),y.push(S.x,S.y,S.z),Y++,b++;Q!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),Y!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const U=I,V=b-I;h.userData.groupNames=v,h.addGroup(U,V,R),R++}return h.setAttribute("position",new Pt(x,3)),h.setAttribute("normal",new Pt(y,3)),h}function a(l){return typeof l!="string"?new TextDecoder().decode(l):l}function o(l){if(typeof l=="string"){const h=new Uint8Array(l.length);for(let u=0;u<l.length;u++)h[u]=l.charCodeAt(u)&255;return h.buffer||h}else return l}const c=o(e);return t(c)?i(c):r(a(e))}}function Uh(s,e){if(e===yf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===_c||e===uu){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===_c)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class Mx extends Ji{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Tx(t)}),this.register(function(t){return new Ax(t)}),this.register(function(t){return new Fx(t)}),this.register(function(t){return new Ox(t)}),this.register(function(t){return new kx(t)}),this.register(function(t){return new Cx(t)}),this.register(function(t){return new Px(t)}),this.register(function(t){return new Lx(t)}),this.register(function(t){return new Dx(t)}),this.register(function(t){return new Ex(t)}),this.register(function(t){return new Ix(t)}),this.register(function(t){return new Rx(t)}),this.register(function(t){return new Ux(t)}),this.register(function(t){return new Nx(t)}),this.register(function(t){return new Sx(t)}),this.register(function(t){return new Bx(t)}),this.register(function(t){return new zx(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=dr.extractUrlBase(e);a=dr.resolveURL(l,this.path)}else a=dr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Kc(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Gu){try{a[ft.KHR_BINARY_GLTF]=new Hx(e)}catch(u){i&&i(u);return}r=JSON.parse(a[ft.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new ey(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ft.KHR_MATERIALS_UNLIT:a[u]=new wx;break;case ft.KHR_DRACO_MESH_COMPRESSION:a[u]=new Vx(r,this.dracoLoader);break;case ft.KHR_TEXTURE_TRANSFORM:a[u]=new Gx;break;case ft.KHR_MESH_QUANTIZATION:a[u]=new Wx;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function bx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const ft={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Sx{constructor(e){this.parser=e,this.name=ft.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Je(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],ln);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Mc(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Fu(h),l.distance=u;break;case"spot":l=new cm(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Vn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class wx{constructor(){this.name=ft.KHR_MATERIALS_UNLIT}getMaterialType(){return On}extendParams(e,t,n){const i=[];e.color=new Je(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],ln),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,kt))}return Promise.all(i)}}class Ex{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Tx{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new we(o,o)}return Promise.all(r)}}class Ax{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Rx{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Cx{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Je(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],ln)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,kt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class Px{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class Lx{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Je().setRGB(o[0],o[1],o[2],ln),Promise.all(r)}}class Dx{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Ix{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Je().setRGB(o[0],o[1],o[2],ln),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,kt)),Promise.all(r)}}class Nx{constructor(e){this.parser=e,this.name=ft.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Ux{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class Fx{constructor(e){this.parser=e,this.name=ft.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Ox{constructor(e){this.parser=e,this.name=ft.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class kx{constructor(e){this.parser=e,this.name=ft.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class Bx{constructor(e){this.name=ft.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class zx{constructor(e){this.name=ft.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Tn.TRIANGLES&&l.mode!==Tn.TRIANGLE_STRIP&&l.mode!==Tn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const g of u){const _=new rt,m=new D,p=new Cn,x=new D(1,1,1),y=new Ns(g.geometry,g.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&x.fromBufferAttribute(c.SCALE,v),y.setMatrixAt(v,_.compose(m,p,x));for(const v in c)if(v==="_COLOR_0"){const S=c[v];y.instanceColor=new xc(S.array,S.itemSize,S.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,c[v]);xt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Gu="glTF",nr=12,Fh={JSON:1313821514,BIN:5130562};class Hx{constructor(e){this.name=ft.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,nr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Gu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-nr,r=new DataView(e,nr);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===Fh.JSON){const l=new Uint8Array(e,nr+a,o);this.content=n.decode(l)}else if(c===Fh.BIN){const l=nr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Vx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ft.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const u=wc[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=wc[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ts[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(f)},o,l,ln,d)})})}}class Gx{constructor(){this.name=ft.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Wx{constructor(){this.name=ft.KHR_MESH_QUANTIZATION}}class Wu extends Rr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,x=1-m,y=p-d+u;for(let v=0;v!==o;v++){const S=a[_+v+o],T=a[_+v+c]*h,R=a[g+v+o],I=a[g+v]*h;r[v]=x*S+y*T+m*R+p*I}return r}}const $x=new Cn;class Xx extends Wu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return $x.fromArray(r).normalize().toArray(r),r}}const Tn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Oh={9728:cn,9729:yn,9984:iu,9985:da,9986:or,9987:ci},kh={33071:Ei,33648:ya,10497:Ls},wo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},wc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},qx={CUBICSPLINE:void 0,LINEAR:yr,STEP:xr},Eo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Yx(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ot({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:di})),s.DefaultMaterial}function zi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Vn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function jx(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Kx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Zx(s){let e;const t=s.extensions&&s.extensions[ft.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+To(t.attributes):e=s.indices+":"+To(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+To(s.targets[n]);return e}function To(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ec(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Jx(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Qx=new rt;class ey{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new bx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new rm(this.options.manager):this.textureLoader=new um(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Kc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return zi(r,o,i),Vn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ft.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(dr.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=wo[i.type],o=Ts[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new zt(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=wo[i.type],l=Ts[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(x);y||(_=new l(o,p*f,i.count*f/h),y=new xp(_,f/h),t.cache.add(x,y)),m=new Wc(y,c,d%f/h,g)}else o===null?_=new l(i.count*c):_=new l(o,d,i.count*c),m=new zt(_,c,g);if(i.sparse!==void 0){const p=wo.SCALAR,x=Ts[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,S=new x(a[1],y,i.sparse.count*p),T=new l(a[2],v,i.sparse.count*c);o!==null&&(m=new zt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,I=S.length;R<I;R++){const b=S[R];if(m.setX(b,T[R*c]),c>=2&&m.setY(b,T[R*c+1]),c>=3&&m.setZ(b,T[R*c+2]),c>=4&&m.setW(b,T[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Oh[d.magFilter]||yn,h.minFilter=Oh[d.minFilter]||ci,h.wrapS=kh[d.wrapS]||Ls,h.wrapT=kh[d.wrapT]||Ls,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==cn&&h.minFilter!==yn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new $t(_);m.needsUpdate=!0,d(m)}),t.load(dr.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),Vn(u,a),u.userData.mimeType=a.mimeType||Jx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ft.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[ft.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[ft.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Eu,Bn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new ji,Bn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ot}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[ft.KHR_MATERIALS_UNLIT]){const u=i[ft.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new Je(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],ln),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,kt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Gt);const h=r.alphaMode||Eo.OPAQUE;if(h===Eo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Eo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==On&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new we(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==On&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==On){const u=r.emissiveFactor;o.emissive=new Je().setRGB(u[0],u[1],u[2],ln)}return r.emissiveTexture!==void 0&&a!==On&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,kt)),Promise.all(l).then(function(){const u=new a(o);return r.name&&(u.name=r.name),Vn(u,r),t.associations.set(u,{materials:e}),r.extensions&&zi(i,u,r),u})}createUniqueName(e){const t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[ft.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Bh(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=Zx(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[ft.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Bh(new St,l,t),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?Yx(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const x=l[f];if(m.mode===Tn.TRIANGLES||m.mode===Tn.TRIANGLE_STRIP||m.mode===Tn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Mp(_,x):new nt(_,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Tn.TRIANGLE_STRIP?p.geometry=Uh(p.geometry,uu):m.mode===Tn.TRIANGLE_FAN&&(p.geometry=Uh(p.geometry,_c));else if(m.mode===Tn.LINES)p=new qc(_,x);else if(m.mode===Tn.LINE_STRIP)p=new Ki(_,x);else if(m.mode===Tn.LINE_LOOP)p=new Ap(_,x);else if(m.mode===Tn.POINTS)p=new Rp(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Kx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Vn(p,r),m.extensions&&zi(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&zi(i,u[0],r),u[0];const d=new bt;r.extensions&&zi(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new rn(Vc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new La(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Vn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const u=a[l];if(u){o.push(u);const d=new rt;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new $c(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,v=d.length;y<v;y++){const S=d[y],T=f[y],R=g[y],I=_[y],b=m[y];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const w=n._createAnimationTracks(S,T,R,I,b);if(w)for(let L=0;L<w.length;L++)p.push(w[L])}const x=new Qp(r,void 0,p);return Vn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Qx)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Su:l.length>1?h=new bt:l.length===1?h=l[0]:h=new xt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Vn(h,r),r.extensions&&zi(n,h,r),r.matrix!==void 0){const u=new rt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new bt;n.name&&(r.name=i.createUniqueName(n.name)),Vn(r,n),n.extensions&&zi(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Bn||d instanceof $t)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];Mi[r.path]===Mi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Mi[r.path]){case Mi.weights:l=Us;break;case Mi.rotation:l=Fs;break;case Mi.translation:case Mi.scale:l=Os;break;default:switch(n.itemSize){case 1:l=Us;break;case 2:case 3:default:l=Os;break}break}const h=i.interpolation!==void 0?qx[i.interpolation]:yr,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+Mi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ec(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Fs?Xx:Wu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function ty(s,e,t){const n=e.attributes,i=new Mn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new D(c[0],c[1],c[2]),new D(l[0],l[1],l[2])),o.normalized){const h=Ec(Ts[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new D,c=new D;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=Ec(Ts[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new jn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Bh(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=wc[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return gt.workingColorSpace!==ln&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${gt.workingColorSpace}" not supported.`),Vn(s,e),ty(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?jx(s,e.targets,t):s})}class ny extends bu{constructor(){super();const e=new un;e.deleteAttribute("uv");const t=new ot({side:on}),n=new ot,i=new Fu(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new nt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Ns(e,n,6),o=new xt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new nt(e,vs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new nt(e,vs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new nt(e,vs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new nt(e,vs(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new nt(e,vs(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new nt(e,vs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function vs(s){return new Wp({color:0,emissive:16777215,emissiveIntensity:s})}const fr=new ot({color:15660790,transparent:!0,opacity:.28,depthWrite:!1,side:Gt,roughness:.25,metalness:0}),$u=new ot({color:13033697,transparent:!0,opacity:.19,depthWrite:!1,side:Gt,roughness:.23,metalness:0}),Ao=new ot({color:2450377,roughness:.42,metalness:.12}),Wi=new ot({color:13883612,roughness:.28,metalness:.9}),ha=new ot({color:2238252,roughness:.5,metalness:.35}),iy=new ot({color:14080210,roughness:.69,metalness:0}),sy=new ot({color:14259089,roughness:.72});function xs(s,e,t,n=64){const i=new Gs(e.map(([a,o])=>new we(a,o)),n);i.rotateX(Math.PI/2);const r=new nt(i,t);return r.name=s,r.receiveShadow=!0,r}function ni(s,e,t,n,i,r=48){const a=new pn(e,e,t,r);a.rotateX(Math.PI/2);const o=new nt(a,i);return o.name=s,o.position.z=n+t/2,o.castShadow=i!==fr&&i!==$u,o.receiveShadow=!0,o}function Ro(s,e,t,n,i,r,a,o){const c=new nt(new un(e,t,n),o);return c.name=s,c.position.set(i,r,a+n/2),c.castShadow=c.receiveShadow=!0,c}function zh(s,e,t){const n=new Gs([new we(23.3,0),new we(26.6,0),new we(26.6,7),new we(23.3,7),new we(23.3,0)],32,e,t-e);n.rotateX(Math.PI/2);const i=new nt(n,Wi);return i.name=s,i.position.z=48,i.castShadow=i.receiveShadow=!0,i}function ry(s,e){const t=[[8.1,8.6],[10,11],[16.8,15.4],[20.9,19.4]],n=.62,i=[],r=[];for(const[c,l]of t)for(const h of[-n,n])i.push(c*Math.cos(e)-h*Math.sin(e),c*Math.sin(e)+h*Math.cos(e),l);for(let c=0;c<t.length-1;c++){const l=2*c;r.push(l,l+1,l+3,l,l+3,l+2)}const a=new St;a.setAttribute("position",new Pt(i,3)),a.setIndex(r),a.computeVertexNormals();const o=new nt(a,fr);return o.name=s,o}function ay({fillMaterial:s=sy}={}){const e=new bt;e.name="R75 cartridge, retainer and clamp (illustrative)",e.userData={bareOutsideDiameterMm:43.2,bareLengthMm:98.8,datum:"bare outlet face z=0",dimensionalBasis:"Nordson Optimum typical envelope; internal and accessories estimated"};const t=new bt;t.name="cartridge_bare",e.add(t);const n=[[6.2,0],[7.6,0],[7.6,8.3],[10,10.4],[16.8,15.3],[21.6,19.5],[21.6,98.8],[20,98.8],[20,20.5],[15.5,16.3],[9,11.5],[6.2,8.3],[6.2,0]];t.add(xs("bare cartridge body and outlet",n,fr)),t.add(xs("bare outlet hex, no thread detail",[[6.2,1.1],[9.4,1.1],[9.4,8.3],[6.2,8.3],[6.2,1.1]],fr,6));for(let d=0;d<6;d++)t.add(ry(`bare shoulder rib ${d+1}`,d*Math.PI/3));t.add(xs("bare upper rim",[[20,97.5],[21.6,97.5],[21.6,98.8],[20,98.8],[20,97.5]],fr));const i=20.7,r=75,a=ni("illustrative material fill",18.8,1,i,s);e.add(a);const o=ni("illustrative piston",19.2,1.6,i,iy);e.add(o);const c=ni("illustrative piston seal",19.4,.6,i,ha);e.add(c);function l(d){const f=Number.isFinite(d)?Math.min(1,Math.max(0,d)):0,g=r*f;a.visible=g>1e-9,a.scale.z=Math.max(g,1e-6),a.position.z=i+g/2,o.position.z=i+g+.8,c.position.z=i+g+.3}l(1),e.add(xs("separate transparent pressure retainer",[[21.9,14],[23.2,14],[23.2,101],[21.9,101],[21.9,14]],$u)),e.add(xs("retainer lower collar",[[9.4,8.8],[23.2,8.8],[23.2,14],[21.9,14],[18,14],[9.4,10],[9.4,8.8]],Ao)),e.add(xs("retainer top retaining lip",[[21.9,99],[24,99],[24,102.2],[21.9,102.2],[21.9,99]],Ao)),e.add(ni("separate pressure cap",24,8.5,102.2,Ao)),e.add(ni("air connector base",8,3,110.7,Wi,6)),e.add(ni("air push-fit body",5.3,7,113.7,ha)),e.add(ni("air push-fit collar",5.8,2,120.7,Wi));const h=new xt;h.name="air inlet tubing end",h.position.set(0,0,122.7),h.userData.direction=[0,0,1],e.add(h);const u=new bt;u.name="estimated split clamp and mounting plate",e.add(u),u.add(zh("left clamp half",.08,Math.PI-.08),zh("right clamp half",Math.PI+.08,2*Math.PI-.08));for(const d of[-27,27]){u.add(Ro("clamp lug",9,10,9,d,0,47,Wi));const f=ni("clamp screw head",2.6,2,56,ha,12);f.position.x=d,u.add(f);const g=ni("clamp screw socket",1,.25,58,Wi,6);g.position.x=d,u.add(g)}u.add(Ro("mounting plate",58,8,42,0,30,30,ha)),u.add(Ro("rear machine attachment face",46,4,34,0,36,34,Wi));for(const d of[-20,20])for(const f of[38,62]){const g=new nt(new pn(2.4,2.4,1.4,12),Wi);g.name="rear mounting screw",g.position.set(d,24.9,f),u.add(g)}return{group:e,bare:t,piston:o,fill:a,airPort:h,updateFill:l}}const ir=new D;function En(s,e,t,n,i,r){const a=2*Math.PI*i/4,o=Math.max(r-2*i,0),c=Math.PI/4;ir.copy(e),ir[n]=0,ir.normalize();const l=.5*a/(a+o),h=1-ir.angleTo(s)/c;return Math.sign(ir[t])===1?h*l:o/(a+o)+l+l*(1-h)}class Cr extends un{constructor(e=1,t=1,n=1,i=2,r=.1){const a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new D,l=new D,h=new D(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new D,m=.5/a;for(let p=0,x=0;p<u.length;p+=3,x+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*r,u[p+1]=h.y*Math.sign(c.y)+l.y*r,u[p+2]=h.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[x+0]=En(_,l,"z","y",r,n),f[x+1]=1-En(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),f[x+0]=1-En(_,l,"z","y",r,n),f[x+1]=1-En(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),f[x+0]=1-En(_,l,"x","z",r,e),f[x+1]=En(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),f[x+0]=1-En(_,l,"x","z",r,e),f[x+1]=1-En(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),f[x+0]=1-En(_,l,"x","y",r,e),f[x+1]=1-En(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),f[x+0]=En(_,l,"x","y",r,e),f[x+1]=1-En(_,l,"y","x",r,t);break}}static fromJSON(e){return new Cr(e.width,e.height,e.depth,e.segments,e.radius)}}function oy(){const s=new bt;s.name="P300_supply_station_reference",s.userData={reference:"Graco DM-22 25T471",evidence:"exterior envelope from manual; individual parts engineering approximation",lowerHeightMm:550,raisedHeightMm:800,widthMm:360,depthMm:300,units:"mm",fluidConnection:"1/4 NPT female, nominal",airConnection:"8 mm female, nominal"};const e={blue:new ot({color:2056127,roughness:.42,metalness:.35}),blueDark:new ot({color:1458048,roughness:.5,metalness:.3}),steel:new ot({color:12831691,roughness:.37,metalness:.74}),satin:new ot({color:9083033,roughness:.46,metalness:.68}),dark:new ot({color:2502968,roughness:.7,metalness:.2}),black:new ot({color:1120541,roughness:.62,metalness:.1}),dial:new ot({color:14870239,roughness:.8,metalness:0}),red:new ot({color:12076348,roughness:.55,metalness:.15}),brass:new ot({color:11901526,roughness:.38,metalness:.72}),glass:new ot({color:12638170,transparent:!0,opacity:.24,depthWrite:!1,roughness:.25,metalness:.02,side:Gt})};s.userData.ownedMaterials=Object.values(e);const t=(x,y,v,S,T,R,I,b="steel",w=1.2)=>{const L=Math.min(w,y/8,v/8,S/8),U=new nt(L>0?new Cr(y,v,S,2,L):new un(y,v,S),e[b]);return U.name=x,U.position.set(T,R,I+S/2),U.castShadow=b!=="glass",U.receiveShadow=!0,s.add(U),U},n=(x,y,v,S,T,R,I="steel",b="z",w=32)=>{const L=new nt(new pn(y,y,v,w),e[I]);return L.name=x,L.castShadow=I!=="glass",L.receiveShadow=!0,b==="z"?(L.rotation.x=Math.PI/2,L.position.set(S,T,R+v/2)):b==="x"?(L.rotation.z=-Math.PI/2,L.position.set(S+v/2,T,R)):L.position.set(S,T-v/2,R),s.add(L),L},i=(x,y,v,S=2.6)=>{n("bolt washer",S+1.2,.5,x,y,v,"steel"),n("hex fastener",S,2.1,x,y,v+.5,"dark","z",6)},r=(x,y,v)=>{const S=new xt;S.name=x,S.position.set(...y);const T=new D(...v).normalize();return S.quaternion.setFromUnitVectors(new D(0,0,1),T),S.userData={axis:T.toArray(),reference:"visual connection datum; unverified physical fitting"},s.add(S),S};t("base footprint",360,300,18,0,0,0,"blueDark",1),t("lower enclosure",360,230,92,0,15,18,"blue",2),t("recessed front control panel",284,10,88,0,-105,20,"blueDark",1);for(const x of[-155,155])for(const y of[-125,125])i(x,y,18);for(const x of[-156,156])t("side edge protection",12,12,74,x,-107,21,"dark",1);for(const x of[-140,140])for(const y of[30,94])n("panel screw",2,1.2,x,-110,y,"steel","y",6);function a(x,y){n("pressure gauge body",16,6,x,-110,y,"black","y"),n("pressure gauge rim",14.6,1.4,x,-116,y,"steel","y"),n("pressure gauge face",12.6,.5,x,-117.4,y,"dial","y");for(let S=0;S<9;S++){const T=(-.75+S*1.5/8)*Math.PI,R=x+10*Math.sin(T),I=y+10*Math.cos(T),b=t("gauge tick",.6,.2,1.8,R,-118.1,I-.9,"dark",0);b.rotation.y=T}const v=t("gauge needle",.75,.3,8,x,-118.3,y-1,"red",0);v.rotation.y=.7,n("gauge spindle",1.4,.6,x,-118.5,y,"dark","y")}function o(x,y){n("regulator collar",11,4,x,-110,y,"steel","y"),n("regulator knob",10,15,x,-114,y,"black","y",32);for(let v=0;v<12;v++){const S=v*Math.PI/6,T=x+9.7*Math.sin(S),R=y+9.7*Math.cos(S),I=t("knob grip rib",1,11,1.5,T,-122,R-.75,"satin",0);I.rotation.y=S}}a(-92,80),a(66,80),o(-92,46),o(66,46);for(const x of[-30,18])n("selector mounting ring",7,3,x,-110,48,"steel","y"),n("selector switch",4.4,10,x,-113,48,"black","y"),t("selector grip",2.5,4,12,x,-124,42,"satin",.3);for(const x of[-126,126]){n("ram foot flange",24,9,x,24,110,"steel");for(const y of[-13,13])for(const v of[-13,13])i(x+y,24+v,119,2);n("vertical ram post",13.5,255,x,24,119,"satin"),n("upper ram collar",20,13,x,24,374,"steel"),n("upper ram collar cap",15,4,x,24,387,"dark")}t("crossbeam below upper plate",298,40,15,0,24,382,"steel",1.5),t("upper equipment mounting plate",300,150,12,0,14,397,"steel",1.5);for(const x of[-130,130])for(const y of[-40,68])i(x,y,409,2.2);const c=-62,l=12;t("cartridge housing lower mounting block",78,80,13,c,l,110,"satin",2),n("cartridge housing lower seat",35,10,c,l,123,"dark"),n("candidate aluminium cartridge",24,170,c,l,133,"steel"),n("candidate cartridge bottom shoulder",21,4,c,l,133,"satin"),n("candidate cartridge top edge",24.4,3,c,l,300,"satin");for(const x of[-33,33]){t("cartridge housing upright",8,52,206,c+x,l,123,"satin",1);for(const y of[135,210,310])i(c+x,l-18,y,2)}t("cartridge housing head",76,67,10,c,l,329,"satin",2),n("cartridge ram rod",8,43,c,l,339,"steel"),n("ram rod upper bushing",14,7,c,l,375,"dark"),t("transparent inspection panel",59,2,190,c,l-30,132,"glass",.2);for(const x of[c-23,c+23])for(const y of[142,308])n("inspection panel fastener",2,1.4,x,l-32,y,"dark","y");const h=62,u=32;n("pump lower mounting foot",38,10,h,u,110,"steel"),t("estimated feed manifold between cartridge and pump",68,32,18,0,l,120,"satin",1),n("pump lower body",29,210,h,u,120,"steel"),n("pump lower sleeve",33,55,h,u,150,"satin"),n("pump lower collar",34,7,h,u,205,"dark"),n("pump lower upper collar",33,7,h,u,323,"satin"),n("pump shaft neck",16,67,h,u,330,"steel"),n("pump motor lower flange",43,11,h,u,409,"steel"),n("pump pneumatic motor body",42,113,h,u,420,"satin"),n("pump motor upper lip",43,8,h,u,533,"steel"),n("pump motor cap",34,9,h,u,541,"dark");for(const x of[0,Math.PI/2,Math.PI,3*Math.PI/2])i(h+31*Math.cos(x),u+31*Math.sin(x),541,2.2);for(const x of[h-22,h+22])for(const y of[u-20,u+20])i(x,y,120,2.3);const d=247,f=h+29;n("fluid fitting boss",11,6,f,u,d,"satin","x",6),n("fluid fitting nut",10,10,f+6,u,d,"steel","x",6),n("fluid fitting coupling",7,12,f+16,u,d,"steel","x"),n("fluid fitting mouth",5.4,1,f+28,u,d,"dark","x");const g=r("fluid outlet datum",[f+29,u,d],[1,0,0]),_=114,m=55;n("air inlet panel boss",7,4,_,-110,m,"steel","y",6),n("air inlet coupling",5.8,12,_,-114,m,"brass","y"),n("air inlet face",4.2,1,_,-126,m,"dark","y");const p=r("main air inlet datum",[_,-127,m],[0,-1,0]);return s.updateMatrixWorld(!0),{group:s,fluidPort:g,airPort:p}}function cy(){const s=new bt;s.name="C300 reference envelope — open inspection",s.userData={kind:"visual_envelope",source:"Graco 349735EN-B p.33",widthMm:939,depthMm:1041,heightMm:1905,bottomMm:-900,topMm:1005,caveat:"external envelope published; panel geometry, mounting and opening assumed; not OEM CAD"};const e={body:new ot({color:15330280,roughness:.55,metalness:.1}),frame:new ot({color:12239296,roughness:.54,metalness:.34}),door:new ot({color:14869983,roughness:.72,metalness:.14}),gasket:new ot({color:4213067,roughness:.8,metalness:.08}),steel:new ot({color:8359310,roughness:.4,metalness:.7}),screen:new ot({color:993850,roughness:.25,metalness:.1,emissive:735826,emissiveIntensity:.8}),screenLine:new ot({color:8106941,roughness:.6,metalness:0}),blue:new ot({color:2056145,roughness:.45,metalness:.15}),red:new ot({color:12662052,roughness:.42,metalness:.08}),yellow:new ot({color:14665028,roughness:.55,metalness:0})};s.userData.ownedMaterials=Object.values(e);function t(i,r,a,o,c,l,h,u){const d=new nt(new un(r,a,o),e[u]);return d.name=i,d.position.set(c,l,h+o/2),d.castShadow=!0,d.receiveShadow=!0,s.add(d),d}function n(i,r,a,o,c,l,h,u=20){const d=new nt(new pn(r,r,a,u),e[h]);return d.name=i,d.position.set(o,c,l),d.castShadow=!0,d.receiveShadow=!0,s.add(d),d}t("cabinet structure",939,1037,850,0,0,-900,"body"),t("front skin",939,2,850,0,-519.5,-900,"body"),t("rear skin",939,2,850,0,519.5,-900,"body"),t("front access door gasket",710,.5,620,0,-520.15,-830,"gasket"),t("front access door",704,.35,614,0,-520,-827,"door"),t("door label plate",180,.2,74,0,-520.29,-560,"frame"),t("door visual label inset",148,.15,42,0,-520.4,-544,"blue");for(const i of[-280,280])t("cabinet door pull",8,.8,95,i,-520,-315,"steel"),t("door pull lower bracket",24,.8,8,i,-520,-320,"gasket"),t("door pull upper bracket",24,.8,8,i,-520,-220,"gasket");for(const i of[-443,-360,-180,0,180,360,443])for(const r of[-874,-83])n("cabinet fastener",3,.55,i,-520.15,r,"steel",12);for(const i of[-340,340])for(const r of[-814,-230])n("access door fastener",2.6,.45,i,-520.2,r,"steel",12);for(const i of[-448.5,448.5])for(const r of[-499.5,499.5])t("window support post",42,42,1e3,i,r,-50,"frame"),t("post face inset",16,1,950,i,r<0?-520:520,-25,"gasket");t("roof structure",939,1041,55,0,0,950,"body");for(const i of[-510,510])t("window upper rail",855,20,24,0,i,926,"frame"),t("window sill",855,20,22,0,i,-50,"frame");for(const i of[-459,459])t("window side upper rail",20,957,24,i,0,926,"frame"),t("window side sill",20,957,22,i,0,-50,"frame");t("rear window mid rail",855,12,12,0,510,420,"frame");for(const i of[-459,459])t("side window mid rail",12,957,12,i,0,420,"frame");for(const i of[115,420,735])t("front door hinge",18,4,40,436,-518,i,"steel"),n("hinge pin",3,1,436,-519.6,i+20,"gasket",12);t("door latch backing",18,5,180,430,-517.8,280,"gasket"),t("door latch grip",9,4,144,430,-518.5,298,"steel"),t("console support bracket",78,20,24,-403,-500,620,"steel"),t("console housing",190,20,155,-330,-508,490,"gasket"),t("console bezel",176,1,141,-330,-518.4,497,"frame"),t("console screen",160,.7,106,-330,-519.3,524,"screen");for(let i=0;i<4;i++)t("screen interface row",118-i*13,.2,3,-334,-519.77,598-i*17,"screenLine");for(let i=0;i<4;i++)t("screen soft key",15,.2,7,-385+i*35,-519.77,532,"blue");for(const i of[-410,-250])for(const r of[503,632])n("console fastener",2,.5,i,-519.4,r,"steel",12);return t("operator button panel",108,10,68,-343,-511,404,"frame"),n("emergency stop yellow surround",18,3,-372,-517.5,438,"yellow"),n("emergency stop head",11,1.5,-372,-519.3,438,"red"),n("start indicator",6,2,-332,-519,438,"blue"),n("auxiliary indicator",6,2,-308,-519,438,"gasket"),s}function ly(){const s=new bt;s.name="PCP 0.30cc reference - 303mm body";const e=new ot({color:13817819,metalness:.9,roughness:.28}),t=new ot({color:3358016,metalness:.35,roughness:.55}),n=new ot({color:2503220,metalness:.15,roughness:.65}),i=new ot({color:2846678,metalness:.3,roughness:.4});s.userData.ownedMaterials=[e,t,n,i];function r(h,u,d,f,g=e,_=48){const m=new pn(u,u,d,_);m.rotateX(Math.PI/2);const p=new nt(m,g);return p.name=h,p.position.z=f+d/2,p.castShadow=p.receiveShadow=!0,s.add(p),p}function a(h,u,d,f,g,_,m,p=e){const x=new nt(new un(u,d,f),p);return x.name=h,x.position.set(g,_,m+f/2),x.castShadow=x.receiveShadow=!0,s.add(x),x}r("end adapter",12,13,0,e,6),r("stator end ring",15,5,13,t),r("stator body",14,105,18,n),r("stator coupling",18,10,123,e,6),r("pump barrel",20,78,133,e),r("seal housing",25,25,211,t),r("bearing housing",27,24,236,e),r("sanitary clamp",29,8,260,e),r("drive adapter",22,26,268,t),r("gearbox flange",39,9,294,e);for(let h=0;h<4;h++){const u=h*Math.PI/2,d=r("flange M4 visual",2.3,1.2,303,t,12);d.position.x=35*Math.cos(u),d.position.y=35*Math.sin(u)}r("motor shoulder",31,10,303,t),r("motor housing estimated",34,72,313,i);for(let h=0;h<8;h++){const u=h*Math.PI/4;a("motor cooling rib",3,3,52,32*Math.cos(u),32*Math.sin(u),321,t)}r("motor rear cap",34,6,385,t);const o=195,c=new nt(new pn(8,8,24,6),e);c.name="schematic side inlet #8/#6 JIC",c.rotation.z=-Math.PI/2,c.position.set(31,0,o),s.add(c);const l=new xt;l.name="PCP material inlet (schematic outlet face)",l.position.set(43,0,o),s.add(l),a("mounting rail plate estimated",58,8,125,0,38,125,t);for(const h of[145,225]){a("clamp bridge estimated",58,12,9,0,27,h,e);for(const u of[-24,24])r("clamp bolt",2.2,1.5,h+9,t,12).position.set(u,27,h+9.75)}return{group:s,inletPort:l,bodyLengthMm:303,flangeBoltCircleMm:70}}function hy(s,e,t="feed"){const n=s.clone(),i=e.clone();if(t==="air")return[n,n.clone().add(new D(0,0,28)),i.clone().add(new D(0,0,30)),i];if(t==="stationAir")return[n,n.clone().add(new D(0,-30,0)),i.clone().add(new D(-40,0,0)),i];if(t==="supply"){const r=n.clone().lerp(i,.5);return r.z=Math.max(n.z,i.z)+70,[n,n.clone().add(new D(0,0,40)),r,i.clone().add(new D(-50,0,0)),i]}return[n,n.clone().add(new D(35,0,0)),new D(-520,330,n.z+65),new D(-520,360,Math.max(i.z+120,180)),new D(i.x+120,180,i.z+100),i.clone().add(new D(50,0,0)),i]}function Co(s,e,t="feed",n=3){const i=hy(s,e,t),r=new Lu(i,!1,"centripetal");return new jc(r,96,n,12,!1)}const Ea=Object.freeze({part:"Nordson 7018555 candidate",nominalLengthMm:63.5,nominalIdMm:3.175,assumedInsertionMm:7,thread:"1/4 NPT nominal",evidence:"published dimensions + assumed insertion; unconfirmed Laird test setup",source:"https://www.nordson.com/en/products/efd-products/plastic-nozzles"}),uy=Object.freeze({R75:{cartridge:{capacityMl:75,outerDiameterMm:43.2,axialLengthMm:98.8,evidence:"published typical external envelope; bare cartridge only",source:"https://www.nordsonefd.com/nordson_efd_product_catalog/25/"},nozzle:Ea,other:"retainer, piston, holder and air hose routing are visual engineering assumptions"},P300:{enclosure:{model:"C300 reference envelope",widthMm:939,depthMm:1041,heightMm:1905,workspaceMm:[254,277,70],source:"https://www.graco.com/content/dam/graco/com_documents/349/349735/349735EN-B.pdf",evidence:"published outer envelope; interior and panels are visual assumptions"},supply:{model:"DM-22 25T471 reference",widthMm:360,depthMm:300,loweredHeightMm:550,raisedHeightMm:800,fluidPort:"1/4 NPT female",airPort:"8 mm female",source:"https://www.graco.com/content/dam/graco/tech_documents/manuals/3A7/3A7931/3A7931EN-D.pdf",evidence:"published metric dimensions; components and tubing routes are visual assumptions"},pcp:{model:"25B192 candidate; not confirmed Laird upgraded PCP",bodyLengthMm:303,boltCircleMm:70,inlet:"#8/#6 JIC",outlet:"5/16-28",source:"https://www.graco.com/content/dam/graco/tech_documents/manuals/3A5/3A5364/3A5364EN.pdf",evidence:"published body length and fittings; motor and details approximated"}}});function dy(){const s=(e,t,n,i={})=>new ot({color:e,roughness:t,metalness:n,...i});return{graphite:s(2830649,.5,.35),cover:s(15526629,.42,.05),coverGrey:s(13225168,.45,.1),cobalt:s(2056145,.34,.3),cobaltDark:s(1523340,.42,.3),steel:s(14015199,.24,.92),steelDark:s(9278877,.32,.88),aluminum:s(12896976,.3,.82),castAl:s(11778753,.46,.7),black:s(1513756,.48,.35),rubber:s(1052947,.92,0),orange:s(15760411,.5,.05),red:s(14166074,.36,.05),yellow:s(16040991,.42,.05),green:s(2274402,.38,.05),teal:s(1474698,.4,.45),hole:s(3159613,.7,.3),bench:s(14275527,.82,0),mat:s(2776936,.88,0),brass:s(13214285,.3,.9),lens:s(856342,.2,.1),glass:new hn({color:14676735,roughness:.08,metalness:0,transparent:!0,opacity:.16,depthWrite:!1,side:Gt,clearcoat:1}),polymer:new hn({color:10465402,roughness:.35,metalness:0,transparent:!0,opacity:.82,clearcoat:.6})}}class fy{constructor(e,t={parts:0}){this.palette=e,this.counter=t,this.edgeMaterial=new ji({color:724756,transparent:!0,opacity:.13})}material(e){return typeof e=="string"?this.palette[e]:e}mesh(e,t,n,{edges:i=!0,shadow:r=!0}={}){const a=new nt(e,this.material(t));return a.castShadow=r,a.receiveShadow=!0,i&&a.add(new qc(new Cu(e,32),this.edgeMaterial)),n.add(a),this.counter.parts++,a}box(e,t,n,i,r,a,o,c,l){const h=l??Math.min(1.2,e/12,t/12,n/6),u=h>.15&&Math.min(e,t,n)>=2.5?new Cr(e,t,n,2,h):new un(e,t,n),d=this.mesh(u,o,c);return d.position.set(i,r,a+n/2),d}cyl(e,t,n,i,r,a,o,c=32){const l=new pn(e,e,t,c);l.rotateX(Math.PI/2);const h=this.mesh(l,a,o,{edges:c<=8});return h.position.set(n,i,r+t/2),h}rod(e,t,n,i,r,a,o,c,l=24){const h=new pn(e,e,t,l);n==="x"?h.rotateZ(Math.PI/2):n==="z"&&h.rotateX(Math.PI/2);const u=this.mesh(h,o,c,{edges:!1});return u.position.set(i,r,a),u}screw(e,t,n,i,r=1.6,a="z"){const o=new pn(r,r,r*.9,14),c=new pn(r*.45,r*.45,r*.95,6);a==="z"?(o.rotateX(Math.PI/2),c.rotateX(Math.PI/2)):a==="y"||(o.rotateZ(Math.PI/2),c.rotateZ(Math.PI/2));const l=this.mesh(o,"black",i,{edges:!1,shadow:!1});return l.position.set(e,t,n),this.mesh(c,"hole",i,{edges:!1,shadow:!1}).position.set(e,t,n),l}}function py({material:s,sideMaterial:e,pitch:t=9,width:n=26,height:i=12,radius:r=16,free:a=200}){const o=Math.ceil((a+Math.PI*r)/t)+2,c=new Cr(t*.92,n,i,1,1.2),l=new un(t*.6,n+2,i*.45),h=new Ns(c,s,o),u=new Ns(l,e,o);h.castShadow=u.castShadow=!0,h.receiveShadow=!0;const d=new bt;d.add(h,u);const f=new rt,g=new Cn,_=new Pn,m=new D(1,1,1),p=new D;function x(y){const v=(a+y)/2,S=Math.max(0,v),T=Math.max(0,v-y);for(let R=0;R<o;R++){let I=(R+.5)*t,b=0;if(I<=S)p.set(I,0,0);else if((I-=S)<=Math.PI*r){const w=I/r;p.set(v+r*Math.sin(w),0,r-r*Math.cos(w)),b=-w}else I-=Math.PI*r,p.set(v-Math.min(I,T),0,2*r),b=-Math.PI;g.setFromEuler(_.set(0,b,0)),f.compose(p,g,m),h.setMatrixAt(R,f),u.setMatrixAt(R,f)}h.instanceMatrix.needsUpdate=u.instanceMatrix.needsUpdate=!0,h.computeBoundingSphere(),u.computeBoundingSphere()}return x(0),{group:d,update:x,dispose:()=>[c,l].forEach(y=>y.dispose())}}function my(s=256,e=112){if(typeof document>"u")return null;const t=document.createElement("canvas");t.width=s,t.height=e;const n=new Tu(t);n.colorSpace=kt;const i=t.getContext("2d");let r="";function a(o,c){const l=o.join("|")+c;l!==r&&(r=l,i.fillStyle="#0b2b1f",i.fillRect(0,0,s,e),i.fillStyle=c?"#7dffb2":"#47d38a",i.font="bold 40px ui-monospace, Menlo, Consolas, monospace",i.fillText(o[0],14,50),i.font="22px ui-monospace, Menlo, Consolas, monospace",i.fillText(o[1],14,88),c&&(i.fillStyle="#ffcf5a",i.fillRect(s-30,14,14,14)),n.needsUpdate=!0)}return{texture:n,draw:a}}const sr=[[0,[.16,.2,.55]],[.25,[.12,.45,.78]],[.5,[.1,.68,.66]],[.75,[.55,.82,.32]],[1,[.99,.82,.2]]];function gy(s){const e=Math.max(0,Math.min(1,s));for(let t=1;t<sr.length;t++)if(e<=sr[t][0]){const[n,i]=sr[t-1],[r,a]=sr[t],o=(e-n)/(r-n);return i.map((c,l)=>c+(a[l]-c)*o)}return sr.at(-1)[1]}function _y(s,e,t,{plateMargin:n=6}={}){var Te;const i=new bt;i.name="estimated compression inspection";const r=[],a=_e=>(r.push(_e),_e),o=t.grid,c=s.surfaceZ,l=e.width,h=e.shape==="circle"?e.width:e.depth,u=Uint8Array.from(o.coverage,_e=>Math.round(Math.max(0,Math.min(1,Number(_e)||0))*255)),d=(Te=o.frames)!=null&&Te.length?o.frames:[{gap:e.gap,coverage:u,trapped:o.voidMask||new Uint8Array(u.length)}],f=o.cols*o.rows,g=new Float32Array(f).fill(-1);d.forEach((_e,me)=>{for(let Oe=0;Oe<f;Oe++)g[Oe]<0&&_e.coverage[Oe]>=128&&(g[Oe]=d.length>1?me/(d.length-1):1)});const _=e.shape==="circle"?new Ca(l/2,96):new Li(l,h),m=new nt(_,a(new On({color:1684930,transparent:!0,opacity:.35,side:Gt,depthWrite:!1})));m.position.set(e.offsetX,e.offsetY,c+.004),m.name="configured heat source",m.renderOrder=1,i.add(m);const p=e.shape==="circle"?Array.from({length:97},(_e,me)=>new D(l/2*Math.cos(me*Math.PI*2/96),l/2*Math.sin(me*Math.PI*2/96),0)):[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]].map(([_e,me])=>new D(_e*l/2,me*h/2,0)),x=new Ki(new St().setFromPoints(p),a(new ji({color:771542,depthTest:!1,transparent:!0})));x.position.set(e.offsetX,e.offsetY,c+e.gap+.02),x.name="heat source boundary",x.renderOrder=6,i.add(x);let y=o.cols,v=-1,S=o.rows,T=-1;for(let _e=0;_e<f;_e++)if(u[_e]>0||d.some(me=>me.coverage[_e]>0)){const me=_e%o.cols,Oe=Math.floor(_e/o.cols);y=Math.min(y,me),v=Math.max(v,me),S=Math.min(S,Oe),T=Math.max(T,Oe)}const R=v>=y;R&&(y=Math.max(0,y-1),S=Math.max(0,S-1),v=Math.min(o.cols-1,v+1),T=Math.min(o.rows-1,T+1));const I=R?v-y+2:0,b=R?T-S+2:0,w=new St,L=new Float32Array(I*b*3),U=new Float32Array(I*b*3),V=new Float32Array(I*b);for(let _e=0;_e<b;_e++)for(let me=0;me<I;me++){const Oe=_e*I+me;L[3*Oe]=o.originX+(y+me)*o.cellSize,L[3*Oe+1]=o.originY+(S+_e)*o.cellSize}w.setAttribute("position",new zt(L,3)),w.setAttribute("color",new zt(U,3));const Y=new Je((Wt[s.material]||Wt.putty).color),Q=new nt(w,a(new hn({vertexColors:!0,roughness:.55,metalness:0,clearcoat:.2,clearcoatRoughness:.5,side:Gt,envMapIntensity:.6})));Q.name="squeezed film",Q.castShadow=!0,Q.receiveShadow=!0,i.add(Q);const G=new nt(new St,a(new On({color:16723285,transparent:!0,opacity:.85,side:Gt,depthWrite:!1})));G.name="trapped air",G.position.z=c+.01,G.renderOrder=4,i.add(G);let ce=e.offsetX-l/2,$=e.offsetX+l/2,pe=e.offsetY-h/2,Me=e.offsetY+h/2;for(let _e=0;_e<f;_e++){if(!(Number(o.coverage[_e])>1e-7))continue;const me=o.originX+_e%o.cols*o.cellSize,Oe=o.originY+Math.floor(_e/o.cols)*o.cellSize;ce=Math.min(ce,me),$=Math.max($,me+o.cellSize),pe=Math.min(pe,Oe),Me=Math.max(Me,Oe+o.cellSize)}const Se=3,Ee=new un($-ce+2*n,Me-pe+2*n,Se),at=new nt(Ee,a(new hn({color:13626101,transparent:!0,opacity:.1,roughness:.05,metalness:0,clearcoat:.4,depthWrite:!1,side:Gt})));at.name="transparent inspection plate",at.renderOrder=5,i.add(at),at.add(new qc(new Cu(Ee),a(new ji({color:4892612,transparent:!0,opacity:.8,depthWrite:!1}))));let Ge="material",it=d.length-1;const te=new Je;function se(_e){it=Math.max(0,Math.min(d.length-1,_e));const me=d[it],Oe=me.gap;if(at.position.set((ce+$)/2,(pe+Me)/2,c+Oe+Se/2),x.position.z=c+Oe+.02,R){const Ie=(le,ze)=>le<0||ze<0||le>=o.cols||ze>=o.rows?0:me.coverage[ze*o.cols+le]/255,Pe=new Float32Array(I*b);for(let le=0;le<b;le++)for(let ze=0;ze<I;ze++){const ge=y+ze,Le=S+le;Pe[le*I+ze]=(Ie(ge-1,Le-1)+Ie(ge,Le-1)+Ie(ge-1,Le)+Ie(ge,Le))/4}for(let le=0;le<b;le++)for(let ze=0;ze<I;ze++){let ge=0,Le=0;for(let Ke=-1;Ke<=1;Ke++)for(let Ze=-1;Ze<=1;Ze++){const P=ze+Ze,M=le+Ke;P<0||M<0||P>=I||M>=b||(ge+=Pe[M*I+P],Le++)}V[le*I+ze]=ge/Le}for(let le=0;le<b;le++)for(let ze=0;ze<I;ze++){const ge=le*I+ze,Le=V[ge];if(L[3*ge+2]=c+Oe*Math.min(1,2.2*(Le-.22))-(Le<.22?.02:0),Ge==="front"){const Ke=y+ze,Ze=S+le;let P=-1;for(const[z,J]of[[Ke-1,Ze-1],[Ke,Ze-1],[Ke-1,Ze],[Ke,Ze]])z>=0&&J>=0&&z<o.cols&&J<o.rows&&(P=Math.max(P,g[J*o.cols+z]));const M=gy(P<0?1:P);te.setRGB(M[0],M[1],M[2],kt)}else te.copy(Y).multiplyScalar(.7+.2*Math.min(1,Le));U[3*ge]=te.r,U[3*ge+1]=te.g,U[3*ge+2]=te.b}const Ae=[];for(let le=0;le<b-1;le++)for(let ze=0;ze<I-1;ze++){const ge=le*I+ze;Math.max(V[ge],V[ge+1],V[ge+I],V[ge+I+1])<.22||Ae.push(ge,ge+1,ge+I+1,ge,ge+I+1,ge+I)}w.setIndex(Ae),w.attributes.position.needsUpdate=!0,w.attributes.color.needsUpdate=!0,w.computeVertexNormals(),w.computeBoundingSphere()}const We=[],N=me.trapped||o.voidMask;if(N){for(let Ie=0;Ie<f;Ie++)if(N[Ie]){const Pe=o.originX+Ie%o.cols*o.cellSize,Ae=o.originY+Math.floor(Ie/o.cols)*o.cellSize,le=o.cellSize;We.push(Pe,Ae,0,Pe+le,Ae,0,Pe+le,Ae+le,0,Pe,Ae,0,Pe+le,Ae+le,0,Pe,Ae+le,0)}}return G.geometry.dispose(),G.geometry=new St,G.geometry.setAttribute("position",new Pt(We,3)),me}return se(it),{group:i,source:m,film:Q,voids:G,plate:at,frameCount:d.length,frames:d,get frameIndex(){return it},setFrame:se,setColorMode(_e){Ge=_e,se(it)},dispose(){i.removeFromParent(),i.traverse(_e=>{var me;return(me=_e.geometry)==null?void 0:me.dispose()});for(const _e of r)_e.dispose()}}}function vy(s,e){const t=s/2,n=t+.55,i=Math.max(5,n+.4),r=[[t,0],[n,0],[n+.12,Math.min(2,e*.12)],[i,e],[t,e],[t,0]].map(([o,c])=>new we(o,c)),a=new Gs(r,64);return a.rotateX(Math.PI/2),a}function xy(s,e){const t=s/2,n=Ea.assumedInsertionMm,i=[[t,e],[6.2,e],[6.2,e+n],[t,e+n],[t,e]].map(([a,o])=>new we(a,o)),r=new Gs(i,48);return r.rotateX(Math.PI/2),r}function Xu(s){const e=s.attributes.position,t=s.index;let n=0;for(let i=0;i<(t?t.count:e.count);i+=3){const r=t?t.getX(i):i,a=t?t.getX(i+1):i+1,o=t?t.getX(i+2):i+2;n+=(e.getX(r)*(e.getY(a)*e.getZ(o)-e.getZ(a)*e.getY(o))+e.getY(r)*(e.getZ(a)*e.getX(o)-e.getX(a)*e.getZ(o))+e.getZ(r)*(e.getX(a)*e.getY(o)-e.getY(a)*e.getX(o)))/6}return Math.abs(n)}function qu(s,e,t,n){const i=Pc(s,e,t),r=s.length,a=Po,o=a+1,c=[],l=[];for(let d=0;d<=r;d++){const f=n(d);for(let g=0;g<=a;g++){const _=g*Math.PI/a,m=i.widths[d]*Math.cos(_)/2;c.push(f.x+f.nx*m,f.y+f.ny*m,i.heights[d]*Math.sin(_))}}for(let d=0;d<r;d++)for(let f=0;f<a;f++){const g=d*o+f;l.push(g,g+1,g+o+1,g,g+o+1,g+o)}const h=c.length/3;for(let d=0;d<=r;d++){const f=n(d),g=i.widths[d]/2;c.push(f.x+f.nx*g,f.y+f.ny*g,0,f.x-f.nx*g,f.y-f.ny*g,0)}for(let d=0;d<r;d++){const f=h+2*d;l.push(f,f+2,f+3,f,f+3,f+1)}const u=new St;return u.setAttribute("position",new Pt(c,3)),u.setIndex(l),u.computeVertexNormals(),u.userData.unitVolume=Xu(u),u}function Hh(s,e,t){return qu(s,e,t,n=>({x:n*e,y:0,nx:0,ny:1}))}function Vh(s,e,t,n,i){return qu(s,e,t,r=>{const a=i+r*e,o=Ac(n,a),c=a-Math.max(0,Math.min(n.length,a));return{x:o.x+o.tx*c,y:o.y+o.ty*c,nx:-o.ty,ny:o.tx}})}function yy(s,e){const t=new bt,n=s.width,i=s.shape==="circle"?n:s.depth,r=new On({color:1684930,transparent:!0,opacity:.22,side:Gt,depthWrite:!1}),a=new ji({color:692124,transparent:!0,opacity:.95,depthWrite:!1}),o=s.shape==="circle"?new Ca(n/2,96):new Li(n,i),c=new nt(o,r);c.position.z=e+.003,c.renderOrder=1,t.add(c);const l=s.shape==="circle"?Array.from({length:97},(u,d)=>new D(n/2*Math.cos(d*2*Math.PI/96),n/2*Math.sin(d*2*Math.PI/96),e+.006)):[[-n/2,-i/2],[n/2,-i/2],[n/2,i/2],[-n/2,i/2],[-n/2,-i/2]].map(([u,d])=>new D(u,d,e+.006)),h=new Ki(new St().setFromPoints(l),a);return h.renderOrder=2,t.add(h),t.position.set(s.offsetX,s.offsetY,0),t.name="設定的熱源參考輪廓",t.userData.ownedMaterials=[r,a],t}function My(s){const t=2*s,n=(1+t*t)/(2*t),i=t-n,r=Math.acos((n-t)/n),a=48,o=16,c=[0,0,t],l=[];for(let f=1;f<=o;f++){const g=r*f/o,_=n*Math.sin(g),m=i+n*Math.cos(g);for(let p=0;p<a;p++){const x=p*2*Math.PI/a;c.push(_*Math.cos(x),_*Math.sin(x),m)}}for(let f=0;f<a;f++)l.push(0,1+f,1+(f+1)%a);for(let f=0;f<o-1;f++)for(let g=0;g<a;g++){const _=1+f*a+g,m=1+f*a+(g+1)%a;l.push(_,_+a,m,m,_+a,m+a)}const h=c.length/3;c.push(0,0,0);const u=1+(o-1)*a;for(let f=0;f<a;f++)l.push(h,u+(f+1)%a,u+f);const d=new St;return d.setAttribute("position",new Pt(c,3)),d.setIndex(l),d.computeVertexNormals(),d.userData.unitVolume=Xu(d),d}function by(s,e){if(typeof document>"u")return new Je(e);const t=document.createElement("canvas");t.width=4,t.height=256;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,0,256);i.addColorStop(0,s),i.addColorStop(1,e),n.fillStyle=i,n.fillRect(0,0,4,256);const r=new Tu(t);return r.colorSpace=kt,r}const Sy=s=>s<.5?4*s*s*s:1-(-2*s+2)**3/2,wy=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,Ey={whole:"全機",work:"工作區",head:"機頭",feed:"供膠站",close:"點膠近看",heat:"熱源特寫",follow:"局部跟隨"};class Ty{constructor(e,{onScale:t,onView:n}={}){this.host=e,this.onScale=t,this.onView=n,this.mode="close",this.config=null,this.counter={parts:0},this.isoCorner=2,this.freeOrbit=!1,this.projection="ortho",this.showExitPath=!0,this.showPlannedPath=!0,this.theme="light",this.scene=new bu,this.renderer=new rx({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.outputColorSpace=kt,this.renderer.toneMapping=tu,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=eu,e.appendChild(this.renderer.domElement);const i=this.renderer.domElement;i.setAttribute("aria-label","毫米比例的點膠機台 3D 場景；可拖曳、滾輪縮放，Home 重設"),i.setAttribute("tabindex","0");const r=new bc(this.renderer);this.scene.environment=r.fromScene(new ny,.04).texture,this.scene.environmentIntensity=.7,r.dispose(),this.hemi=new am(16777215,7174790,.9),this.scene.add(this.hemi),this.sun=new Mc(16774374,2.4),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-2e-4,this.sun.shadow.normalBias=.6,this.scene.add(this.sun,this.sun.target);const a=new Mc(13229311,.8);a.position.set(400,600,300),this.scene.add(a),this.setTheme("light"),this.ortho=new La(-150,150,100,-100,.1,2e4),this.persp=new rn(32,1,1,3e4),this.ortho.up.set(0,0,1),this.persp.up.set(0,0,1),this.camera=this.ortho,this.makeControls(),this.palette=dy(),this.kit=new fy(this.palette,this.counter),this.glue=new hn({color:Wt.putty.color,roughness:.48,metalness:0,clearcoat:.35,clearcoatRoughness:.4,sheen:.4}),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),i.addEventListener("keydown",o=>{if(o.key==="+"||o.key==="=")this.zoomBy(1.2);else if(o.key==="-")this.zoomBy(1/1.2);else if(o.key==="Home")this.fit(this.mode);else return;o.preventDefault()})}makeControls(){var e;(e=this.controls)==null||e.dispose(),this.controls=new ox(this.camera,this.renderer.domElement),this.controls.enableDamping=!1,this.controls.minZoom=.2,this.controls.maxZoom=40,this.controls.minDistance=20,this.controls.maxDistance=2e4,this.controls.minPolarAngle=.01,this.controls.maxPolarAngle=Math.PI-.01,this.controls.zoomToCursor=!0,this.controls.addEventListener("change",()=>this.render()),this.applyOrbitMode()}applyOrbitMode(){const e=this.freeOrbit;this.controls.enableRotate=e,this.controls.mouseButtons.LEFT=e?hi.ROTATE:hi.PAN,this.controls.mouseButtons.RIGHT=hi.PAN,this.controls.touches.ONE=e?oi.ROTATE:oi.PAN,this.controls.touches.TWO=oi.DOLLY_PAN}setTheme(e){var n,i;this.theme=e;const t=e==="dark";(i=(n=this.scene.background)==null?void 0:n.dispose)==null||i.call(n),this.scene.background=by(t?"#243042":"#f4f7fb",t?"#0d1218":"#cdd6e1"),this.hemi.intensity=t?.7:.9,this.render()}disposeGroup(e){e&&(e.traverse(t=>{var n,i;(n=t.geometry)==null||n.dispose();for(const r of((i=t.userData)==null?void 0:i.ownedMaterials)||[])r.dispose()}),e.removeFromParent())}rebuild(e,t){var d,f,g,_,m;this.clearCompression(),(d=this.imported)==null||d.removeFromParent();for(const p of[this.machine,this.environment,this.depositGroup,this.patternSource,this.overlays])this.disposeGroup(p);(f=this.chain)==null||f.dispose(),(g=this.hose)==null||g.material.dispose(),(_=this.supplyHose)==null||_.material.dispose(),(m=this.stationAirHose)==null||m.material.dispose(),Object.assign(this,{cartridge:null,pumpStation:null,head:null,hose:null,supplyHose:null,stationAirHose:null,chain:null,lcd:null,lastHose:null,enclosure:null,stationAirAnchor:null}),this.counter.parts=0,this.config=e,this.run=t;const n=e.architecture==="P300",i=this.kit;this.glue.color.setHex((Wt[e.material]||Wt.putty).color);const r=e.architecture==="R75"?Ea.nominalLengthMm-Ea.assumedInsertionMm:e.nozzleLength;this.visualNozzleLength=r,this.machine=new bt,this.machine.name="machine",this.environment=new bt,this.depositGroup=new bt,this.overlays=new bt,this.scene.add(this.machine,this.environment,this.depositGroup,this.overlays),e.heatSource&&(this.patternSource=yy(e.heatSource,e.surfaceZ),this.scene.add(this.patternSource)),n?this.buildCell(i):this.buildBench(i),this.buildGantry(i,n),this.buildFixture(i,e),this.tool=new bt,this.tool.name="tool",this.machine.add(this.tool);const a=n?4:0;this.buildZSlide(i,n,a),n?(this.head=ly(),this.head.group.position.z=r,this.tool.add(this.head.group),this.hoseStart=this.pumpStation.fluidPort,this.hoseEnd=this.head.inletPort):(this.cartridge=ay({fillMaterial:this.glue}),this.cartridge.group.position.z=r,this.tool.add(this.cartridge.group),this.hoseStart=this.airFitting,this.hoseEnd=this.cartridge.airPort);const o=i.mesh(vy(e.diameter,r),n?"steel":"polymer",this.tool,{edges:!1});o.castShadow=!1,n||(i.mesh(xy(e.diameter,r),"polymer",this.tool,{edges:!1}).castShadow=!1),this.hose=new nt(new St,new ot({color:n?1845811:4165088,roughness:n?.6:.25,metalness:0,transparent:!n,opacity:n?1:.85})),this.hose.castShadow=!0,this.hose.name=n?"示意供膠管":"示意供氣管",this.machine.add(this.hose),n||(this.supplyHose=new nt(new St,this.hose.material.clone()),this.supplyHose.castShadow=!0,this.machine.add(this.supplyHose)),this.flowColumn=new nt(new pn(1,1,1,24,1,!0),this.glue),this.flowColumn.geometry.rotateX(Math.PI/2),this.flowColumn.geometry.translate(0,0,.5),this.flowColumn.visible=!1,this.depositGroup.add(this.flowColumn),this.lastDeposits=null,this.depositMeshes=[],e.mode==="point"&&(this.dotGeo=My(e.dotRatio));const c=e.mode==="pattern"?Vh(t.frames[0].deposits,t.cellLength,e.lineRatio,t.path,t.gridStart):e.mode==="line"?Hh(t.frames[0].deposits,t.cellLength,e.lineRatio):this.dotGeo,l=new nt(c,this.glue);l.visible=!1,l.castShadow=l.receiveShadow=!0,this.depositGroup.add(l),this.depositMeshes.push(l);const h=e.mode==="pattern"?t.path.points.map(p=>new D(p.x,p.y,e.surfaceZ+.02)):e.mode==="line"?[new D(e.offsetX-e.lineLength/2,e.offsetY,e.surfaceZ+.02),new D(e.offsetX+e.lineLength/2,e.offsetY,e.surfaceZ+.02)]:[];this.plannedPath=new Ki(new St().setFromPoints(h),new ih({color:15901498,dashSize:1.2,gapSize:.8,transparent:!0,opacity:.9})),this.plannedPath.computeLineDistances(),this.plannedPath.userData.ownedMaterials=[this.plannedPath.material],this.plannedPath.visible=this.showPlannedPath,this.overlays.add(this.plannedPath);const u=t.frames.filter(p=>p.t>=t.ending.liftStart-.01&&p.t<=t.ending.motionEnd+.01).map(p=>new D(p.x,p.y,p.z));this.exitPath=new Ki(new St().setFromPoints(u),new ih({color:14701343,dashSize:.7,gapSize:.4,transparent:!0,opacity:.85})),this.exitPath.computeLineDistances(),this.exitPath.userData.ownedMaterials=[this.exitPath.material],this.exitPath.visible=this.showExitPath,this.overlays.add(this.exitPath),this.configureShadow(n),this.update(t.frames[0]),this.fit(this.mode,{animate:!1})}configureShadow(e){const t=e?700:420;this.sun.position.set(-260,-420,900),this.sun.target.position.set(0,40,0),Object.assign(this.sun.shadow.camera,{left:-t,right:t,top:t,bottom:-t,near:10,far:3e3}),this.sun.shadow.camera.updateProjectionMatrix()}buildBench(e){const t=this.environment;e.box(1180,820,40,-60,40,-112,"bench",t,4),e.box(1040,680,2,-60,40,-72,"mat",t,1),e.cyl(6,3,440,-280,-70,"steel",t)}buildCell(e){this.enclosure=cy(),this.machine.add(this.enclosure),this.pumpStation=oy(),this.pumpStation.group.position.set(-750,0,-900),this.machine.add(this.pumpStation.group);const t=new nt(new Li(4e3,4e3),new ot({color:10134445,roughness:.9}));t.position.z=-900.5,t.receiveShadow=!0,t.userData.ownedMaterials=[t.material],this.environment.add(t);const n=new bt;n.position.set(-469.5,-300,-700),this.machine.add(n),this.stationAirAnchor=n,e.box(12,32,32,0,0,-16,"black",n),e.rod(5,14,"x",-13,0,0,"steel",n),this.stationAirSource=new xt,this.stationAirSource.position.x=-20,n.add(this.stationAirSource),this.stationAirHose=new nt(new St,new ot({color:3112920,roughness:.4})),this.stationAirHose.name="示意外部氣源接管",this.machine.add(this.stationAirHose),this.pumpStation.group.updateMatrixWorld(!0),n.updateMatrixWorld(!0),this.stationAirHose.geometry=Co(this.pumpStation.airPort.getWorldPosition(new D),this.stationAirSource.getWorldPosition(new D),"stationAir",3)}buildGantry(e,t){const n=this.machine,i=t?4:0,r=110+i;this.beamY=r;const a=new bt;a.name="base",n.add(a),e.box(420,500,40,0,60,-56,"graphite",a,3),e.box(408,488,3,0,60,-19,"coverGrey",a,1);for(const v of[-185,185])for(const S of[-160,280])e.cyl(16,4,v,S,-70,"rubber",a),e.cyl(9,10,v,S,-66,"steel",a);const o=-190;e.box(150,4,30,110,o-2,-50,"black",a,1),e.cyl(10,4,165,o-4,-40,"yellow",a).rotation.x=Math.PI/2;const c=e.cyl(8,8,165,o-10,-40,"red",a);c.rotation.x=Math.PI/2;for(const[v,S]of[[70,"green"],[95,"red"],[120,"black"]]){const T=e.cyl(5,4,v,o-4,-36,S,a,20);T.rotation.x=Math.PI/2}e.box(90,1,16,-110,o-.5,-46,"aluminum",a,.6);for(const v of[-42,-38,-34])e.box(70,.6,.8,-110,o-1.1,v,"hole",a,0);e.box(320,320,16,0,0,-16,"aluminum",a,1.5);const l=[];for(let v=-137.5;v<=137.5;v+=25)for(let S=-137.5;S<=137.5;S+=25)l.push([v,S]);const h=new pn(2.6,2.6,.2,16);h.rotateX(Math.PI/2);const u=new Ns(h,this.palette.hole,l.length);l.forEach(([v,S],T)=>u.setMatrixAt(T,new rt().makeTranslation(v,S,.02))),u.receiveShadow=!0,a.add(u);const d=[];for(let v=-150;v<=150;v+=5)d.push(v);const f=new un(.5,1,.12),g=new Ns(f,this.palette.black,d.length);d.forEach((v,S)=>g.setMatrixAt(S,new rt().compose(new D(v,-157+(v%25===0?2.5:1.25),.06),new Cn,new D(1,v%25===0?5:2.5,1)))),a.add(g);for(const v of[-190,190]){e.box(34,470,18,v,60,-16,"graphite",a,1.5),e.box(15,460,10,v,60,2,"steel",a,.4);for(let S=-160;S<=280;S+=40)e.screw(v,S,12.4,a,1.4);for(const S of[-172,292])e.box(30,8,22,v,S,2,"orange",a,1);e.box(46,52,46,v,318,-16,"black",a,2),e.cyl(16,4,v,318,30,"steel",a),e.box(10,40,30,v+Math.sign(v)*25,318,-10,"coverGrey",a,1)}this.bridge=new bt,this.bridge.name="bridge",n.add(this.bridge);const _=this.bridge;for(const v of[-190,190]){for(const S of[-22,22])e.box(30,34,14,v,r+S,12,"steelDark",_,1);e.box(56,92,10,v,r,26,"cobaltDark",_,2),e.box(40,52,174,v,r,36,"cobalt",_,3),e.box(44,56,6,v,r,206,"coverGrey",_,2);for(const S of[-18,18])for(const T of[-18,18])e.screw(v+T,r+S,36.6,_,1.6)}e.box(440,40,50,0,r,205,"cobalt",_,3),e.box(400,2,36,0,r+20.5,212,"coverGrey",_,.6);for(const v of[212,240]){e.box(400,6,10,0,r-23,v-5,"steel",_,.4);for(let S=-180;S<=180;S+=40)e.screw(S,r-26.2,v,_,1.2,"y")}e.rod(4.5,390,"x",0,r-29,226,"steel",_);for(const v of[-212,212])e.box(10,46,56,v+Math.sign(v)*5,r,202,"coverGrey",_,2);e.box(50,44,44,247,r,208,"black",_,2),e.rod(16,6,"x",275,r,230,"steel",_),e.box(10,10,10,250,r-26,240,"orange",_,1),e.box(18,18,12,-200,r,255,"black",_,1),e.cyl(4,10,-200,r,267,"brass",_),this.airFitting=new xt,this.airFitting.position.set(-200,r,277),_.add(this.airFitting),this.supplyFitting=new xt,this.supplyFitting.position.set(-209,r,261),_.add(this.supplyFitting);const m=new ot({color:2369581,roughness:.55,metalness:.1}),p=new ot({color:15760411,roughness:.5,metalness:.05});this.chain=py({material:m,sideMaterial:p,free:200}),this.chain.group.position.set(0,r,261),this.chain.group.userData.ownedMaterials=[m,p],_.add(this.chain.group),e.box(28,30,4,0,r,255,"steelDark",_,.8),this.carriage=new bt,this.carriage.name="x carriage",_.add(this.carriage);const x=this.carriage,y=t?380:300;for(const v of[-22,22])for(const S of[212,240])e.box(30,8,16,v,r-30,S-8,"steelDark",x,1);e.box(90,6,80,0,r-37,186,"cover",x,2),e.box(70,8,y-60,0,66+i,60,"cover",x,2),e.box(70,2,y-70,0,61+i,65,"cobalt",x,.5);for(const v of[-20,20])e.box(9,6,y-80,v,57+i,70,"steel",x,.3);e.rod(3.5,y-90,"z",0,57+i,65+(y-90)/2,"steel",x),e.box(44,44,54,0,66+i,y,"black",x,2),e.cyl(15,4,0,66+i,y+54,"steel",x),e.box(12,10,10,18,66+i,y+40,"orange",x,1);for(const v of[-28,28])for(const S of[80,y-20])e.screw(v,61.8+i-1.2,S,x,1.6,"y");e.box(30,r-64,6,0,(r+64)/2,285,"steelDark",x,1)}buildZSlide(e,t,n){const i=this.tool,r=t?130:70,a=t?140:125;e.box(64,8,a,0,42+n,r,"cobalt",i,1.5);for(const o of[-20,20])for(const c of[r+10,r+a-30])e.box(18,8,20,o,50+n,c,"steelDark",i,1);for(const o of[-24,24])for(const c of[r+8,r+a-8])e.screw(o,37.6+n,c,i,1.5,"y")}buildFixture(e,t){const n=this.machine,i=Math.min(t.width+24,310),r=Math.min(t.depth+24,310);this.fixture=new bt,this.fixture.name="fixture",n.add(this.fixture);const a=Math.max(0,t.fixtureHeight-2);for(const o of[-1,1])for(const c of[-1,1])e.cyl(5,Math.min(2,t.fixtureHeight),o*i/2.4,c*r/2.4,0,"steel",this.fixture);a>.2&&e.box(i,r,a,0,0,Math.min(2,t.fixtureHeight),"teal",this.fixture,1.5);for(const[o,c]of[[-i/2+6,-r/2+6],[i/2-6,r/2-6],[i/2-6,-r/2+6],[-i/2+6,r/2-6]])e.screw(o,c,t.fixtureHeight+.45,this.fixture,2.2);for(const[o,c]of[[-t.width/2-3,-t.depth/4],[-t.width/2-3,t.depth/4],[t.width/4,t.depth/2+3]])Math.abs(o)<i/2&&Math.abs(c)<r/2&&e.cyl(2.5,Math.min(t.thickness,4)+1,o,c,t.fixtureHeight,"steel",this.fixture,20);for(const o of[-1,1]){const c=o*(t.width/2-10),l=-t.depth/2-7;Math.abs(l)>r/2||(e.cyl(5,6,c,l,t.fixtureHeight,"steelDark",this.fixture),e.box(8,16,3,c,l+5,t.fixtureHeight+Math.min(t.thickness,6),"red",this.fixture,1))}if(this.partHolder=new bt,this.partHolder.name="workpiece",n.add(this.partHolder),this.imported)this.partHolder.add(this.imported),this.imported.position.set(0,0,t.fixtureHeight);else{e.box(t.width,t.depth,t.thickness,0,0,t.fixtureHeight,"castAl",this.partHolder,Math.min(1.2,t.thickness/4));for(const o of[-1,1])for(const c of[-1,1]){const l=o*(t.width/2-6),h=c*(t.depth/2-6);t.width>30&&t.depth>30&&e.cyl(1.8,.1,l,h,t.surfaceZ-.04,"hole",this.partHolder,16)}}t.architecture==="R75"&&this.buildController(e)}buildController(e){const t=new bt;t.name="air dispenser controller (generic)",t.position.set(-360,-40,-70),this.machine.add(t),e.box(150,190,86,0,0,0,"cover",t,4),e.box(150,4,86,0,-96,0,"cobalt",t,1.5);for(const a of[-60,60])for(const o of[-80,80])e.cyl(6,3,a,o,-3,"rubber",t);if(this.lcd=my(),this.lcd){const a=new nt(new Li(62,27),new On({map:this.lcd.texture,toneMapped:!1}));a.rotation.x=Math.PI/2,a.position.set(-28,-98.8,56),a.userData.ownedMaterials=[a.material],t.add(a),e.box(68,1.5,33,-28,-97.9,39.5,"black",t,.6)}for(const[a,o]of[[-50,"green"],[-36,"cover"],[-22,"cover"],[-8,"red"]]){const c=e.cyl(4,3,a,-99,22,o,t,18);c.rotation.x=Math.PI/2}const n=e.cyl(11,12,42,-102,52,"black",t,24);n.rotation.x=Math.PI/2;const i=e.cyl(14,4,42,-99,24,"steel",t,32);i.rotation.x=Math.PI/2;const r=e.cyl(12,1,42,-101.2,24,"cover",t,32);r.rotation.x=Math.PI/2,this.gaugeNeedle=e.box(1.2,.6,10,42,-101.9,19,"red",t,0),this.gaugeNeedle.geometry.translate(0,0,0),e.cyl(5,10,50,70,86,"brass",t),this.supplyOutlet=new xt,this.supplyOutlet.position.set(50,70,96),t.add(this.supplyOutlet)}update(e){var l;if(!this.config)return;const t=this.config;if(this.frame=e,this.tool.position.set(e.x,e.y,e.z),this.carriage.position.x=e.x,this.bridge.position.y=e.y,(l=this.chain)==null||l.update(Math.max(-170,Math.min(170,e.x))),this.cartridge&&this.cartridge.updateFill(e.remaining/75),this.lcd){const h=t.pressure;this.lcd.draw([`${h.toFixed(1)} psi`,e.command?"DISPENSE ●":"READY  "+e.t.toFixed(2)+"s"],!!e.command),this.gaugeNeedle&&(this.gaugeNeedle.rotation.y=-1.2+h/100*2.4)}this.machine.updateMatrixWorld(!0);const n=this.machine.worldToLocal(this.hoseStart.getWorldPosition(new D)),i=this.machine.worldToLocal(this.hoseEnd.getWorldPosition(new D));if(!this.lastHose||n.distanceToSquared(this.lastHose[0])>1e-5||i.distanceToSquared(this.lastHose[1])>1e-5){if(this.hose.geometry.dispose(),this.hose.geometry=Co(n,i,t.architecture==="R75"?"air":"feed",t.architecture==="R75"?2.6:5),this.supplyHose){this.supplyHose.geometry.dispose();const h=this.machine.worldToLocal(this.supplyOutlet.getWorldPosition(new D)),u=this.machine.worldToLocal(this.supplyFitting.getWorldPosition(new D));this.supplyHose.geometry=Co(h,u,"supply",2.6)}this.lastHose=[n,i]}const r=this.depositMeshes[0],a=e.deposited;if(r.visible=a>1e-12&&!this.compression,t.mode==="line"||t.mode==="pattern")this.lastDeposits!==e.deposits&&(r.geometry.dispose(),r.geometry=t.mode==="pattern"?Vh(e.deposits,this.run.cellLength,t.lineRatio,this.run.path,this.run.gridStart):Hh(e.deposits,this.run.cellLength,t.lineRatio),this.lastDeposits=e.deposits),t.mode==="pattern"?r.position.set(0,0,t.surfaceZ+.001):r.position.set(t.offsetX-t.lineLength/2+this.run.gridStart,t.offsetY,t.surfaceZ+.001);else if(r.visible){const h=va(a,t.dotRatio);r.scale.set(h.radius,h.radius,a*1e3/(this.dotGeo.userData.unitVolume*h.radius*h.radius)),r.position.set(t.offsetX,t.offsetY,t.surfaceZ+.001)}const o=e.z-t.surfaceZ,c=e.q>.02*(this.run.Q||1)&&o<=t.standoff+.05&&!this.compression;if(this.flowColumn.visible=c,c){const h=t.diameter/2*Math.min(1,.55+.45*(e.q/this.run.Q));this.flowColumn.scale.set(h,h,o),this.flowColumn.position.set(e.x,e.y,t.surfaceZ)}(this.mode==="follow"||this.mode==="head")&&this.trackTool(),this.render()}trackTool(){const e=this.frame;if(!e||this.tween)return;const t=this.mode==="follow"?new D(e.x,e.y,this.config.surfaceZ):new D(e.x,e.y,e.z).add(this.headTargetOffset||new D);this.camera.position.add(t.clone().sub(this.controls.target)),this.controls.target.copy(t)}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;!e||!t||(this.renderer.setSize(e,t,!1),this.persp.aspect=e/t,this.persp.updateProjectionMatrix(),this.config&&this.fit(this.mode,{animate:!1}))}isoDirection(){const e=[[1,1,1],[-1,1,1],[-1,-1,1],[1,-1,1]][this.isoCorner];return new D(...e).normalize()}visibility(e){const t=this.config.architecture==="P300",n={whole:()=>!0,work:i=>{var r;return i!==this.enclosure&&i!==((r=this.pumpStation)==null?void 0:r.group)&&i!==this.stationAirHose&&i!==this.stationAirAnchor},feed:i=>{var r;return[(r=this.pumpStation)==null?void 0:r.group,this.enclosure,this.stationAirAnchor,this.hose,this.stationAirHose].includes(i)},head:i=>[this.tool,this.bridge,this.partHolder,this.fixture,this.hose].includes(i),close:i=>[this.tool,this.partHolder,this.fixture].includes(i),heat:i=>[this.tool,this.partHolder,this.fixture].includes(i),follow:i=>[this.tool,this.partHolder,this.fixture].includes(i)}[e];for(const i of this.machine.children)i.visible=n(i)&&!(this.compression&&i===this.tool);this.environment.visible=e==="whole"||e==="work"||t&&e==="feed";for(const i of this.tool.children){i.updateMatrixWorld();const r=new Mn().setFromObject(i);i.visible=["whole","work","head"].includes(e)||r.min.z-this.tool.position.z<(e==="heat"?20:this.visualNozzleLength-1)}}framing(e){const t=this.config,n=[];let i;if(e==="whole"||e==="feed"||e==="head"){const r=e==="whole"?this.machine:e==="feed"?this.pumpStation.group:this.tool,a=new Mn;r.traverseVisible(o=>{(o.isMesh||o.isInstancedMesh)&&a.expandByObject(o)});for(const o of[a.min.x,a.max.x])for(const c of[a.min.y,a.max.y])for(const l of[a.min.z,a.max.z])n.push(new D(o,c,l));i=a.getCenter(new D),e==="head"&&(this.headTargetOffset=i.clone().sub(this.tool.position))}else if(e==="work"){for(const r of[-250,250])for(const a of[-200,330])for(const o of[-60,t.architecture==="P300"?430:330])n.push(new D(r,a,o));i=new D(0,60,t.architecture==="P300"?180:130)}else if(e==="heat"&&t.heatSource){const r=t.heatSource,a=r.width/2+Math.max(6,r.width*.35),o=(r.shape==="circle"?r.width:r.depth)/2+Math.max(6,r.width*.35),c=this.compression?new Mn().setFromObject(this.compression.plate):null,l=c?Math.min(r.offsetX-a,c.min.x):r.offsetX-a,h=c?Math.max(r.offsetX+a,c.max.x):r.offsetX+a,u=c?Math.min(r.offsetY-o,c.min.y):r.offsetY-o,d=c?Math.max(r.offsetY+o,c.max.y):r.offsetY+o;for(const f of[l,h])for(const g of[u,d])for(const _ of[t.surfaceZ-2,t.surfaceZ+4])n.push(new D(f,g,_));i=new D((l+h)/2,(u+d)/2,t.surfaceZ+1)}else{const r=t.heatSource,a=e==="follow"?20:Math.max(Math.min(t.width+24,310)/2,r?Math.abs(r.offsetX)+r.width/2:0),o=e==="follow"?20:Math.max(Math.min(t.depth+24,310)/2,r?Math.abs(r.offsetY)+(r.shape==="circle"?r.width:r.depth)/2:0);for(const c of[-a,a])for(const l of[-o,o])for(const h of[t.fixtureHeight,t.surfaceZ+25])n.push(new D(c,l,h));i=new D(0,0,t.surfaceZ+5),e==="follow"&&this.frame&&i.set(this.frame.x,this.frame.y,t.surfaceZ)}return{pts:n,target:i}}fit(e="close",{animate:t=!0}={}){var y;if(e==="feed"&&!this.pumpStation&&(e="work"),this.mode=e,!this.config)return;this.visibility(e);const n=this.host.clientWidth||800,i=this.host.clientHeight||500,r=n/i,{pts:a,target:o}=this.framing(e),c=this.freeOrbit?this.camera.position.clone().sub(this.controls.target).normalize():this.isoDirection(),l=this.ortho.clone();l.position.copy(o).add(c.clone().multiplyScalar(5e3)),l.up.set(0,0,1),l.lookAt(o),l.updateMatrixWorld();const h=a.map(v=>v.clone().applyMatrix4(l.matrixWorldInverse)),u=e==="close"?1.22:e==="heat"?1.08:1.12;let d=Math.max(1,...h.map(v=>Math.abs(v.x)))*u,f=Math.max(1,...h.map(v=>Math.abs(v.y)))*u;const g=Math.max(1,...h.map(v=>Math.abs(v.z+5e3)));e==="follow"&&(d=20,f=d/r);const _=Math.max(f,d/r)*2;let m;if(this.projection==="ortho")m={position:o.clone().add(c.clone().multiplyScalar(5e3)),target:o.clone(),span:_};else{const v=_/2/Math.tan(Vc.degToRad(this.persp.fov/2))+g;m={position:o.clone().add(c.clone().multiplyScalar(v)),target:o.clone(),span:_}}const p={position:this.camera.position.clone(),target:this.controls.target.clone(),span:this.currentSpan??_},x=t&&!wy()&&this.currentSpan!==void 0;if(this.tween=null,!x)this.applyCamera(m,r);else{const v=performance.now();this.tween={begin:p,end:m,t0:v,aspect:r};const S=T=>{if(!this.tween||this.tween.t0!==v)return;const R=Math.min(1,(T-v)/480),I=Sy(R),b=p.position.clone().lerp(m.position,I);this.applyCamera({position:b,target:p.target.clone().lerp(m.target,I),span:p.span+(m.span-p.span)*I},r),R<1?requestAnimationFrame(S):(this.tween=null,this.applyCamera(m,r),(this.mode==="follow"||this.mode==="head")&&(this.trackTool(),this.render()))};requestAnimationFrame(S)}(y=this.onView)==null||y.call(this)}applyCamera({position:e,target:t,span:n},i=this.persp.aspect){this.currentSpan=n;const r=this.camera;r.position.copy(e),this.controls.target.copy(t),r.lookAt(t),r.isOrthographicCamera&&(r.zoom=1,r.left=-n*i/2,r.right=n*i/2,r.top=n/2,r.bottom=-n/2),r.updateProjectionMatrix(),this.controls.update(),this.render()}zoomBy(e){if(this.camera.isOrthographicCamera)this.camera.zoom*=e,this.camera.updateProjectionMatrix();else{const t=this.camera.position.clone().sub(this.controls.target).divideScalar(e);this.camera.position.copy(this.controls.target).add(t)}this.controls.update(),this.render()}setCorner(e){this.isoCorner=e,this.setFreeOrbit(!1,!1),this.fit(this.mode)}setFreeOrbit(e,t=!0){var n;this.freeOrbit=e,this.applyOrbitMode(),!e&&t&&this.fit(this.mode),(n=this.onView)==null||n.call(this)}setProjection(e){if(e===this.projection)return;const t=this.camera;this.projection=e,this.camera=e==="ortho"?this.ortho:this.persp,this.camera.position.copy(t.position),this.makeControls(),this.fit(this.mode,{animate:!1})}render(){if(!(!this.renderer||!this.camera||!this.controls)&&(this.renderer.render(this.scene,this.camera),this.onScale)){const e=this.controls.target,t=e.clone().project(this.camera),n=e.clone().add(new D(10,0,0)).project(this.camera),i=this.host.clientWidth,r=this.host.clientHeight,a=Math.hypot((n.x-t.x)*i/2,(n.y-t.y)*r/2);this.onScale(a,Math.atan2(-(n.y-t.y)*r,(n.x-t.x)*i)*180/Math.PI)}}setOverlayVisibility({exitPath:e,plannedPath:t,heatSource:n}={}){e!==void 0&&(this.showExitPath=e),t!==void 0&&(this.showPlannedPath=t),this.exitPath&&(this.exitPath.visible=this.showExitPath&&!this.compression),this.plannedPath&&(this.plannedPath.visible=this.showPlannedPath&&!this.compression),n!==void 0&&this.patternSource&&(this.patternSource.visible=n),this.render()}showCompression(e,t,n={}){return this.clearCompression(),this.compression=_y(this.config,t,e,n),this.scene.add(this.compression.group),this.tool.visible=!1,this.depositMeshes[0].visible=!1,this.flowColumn.visible=!1,this.setOverlayVisibility({}),this.patternSource&&(this.patternSource.visible=!1),this.render(),this.compression}setCompressionFrame(e){var t;(t=this.compression)==null||t.setFrame(e),this.render()}setCompressionColor(e){var t;(t=this.compression)==null||t.setColorMode(e),this.render()}clearCompression(){this.compression&&(this.compression.dispose(),this.compression=null,this.tool&&(this.tool.visible=!0),this.patternSource&&(this.patternSource.visible=!0),this.frame&&this.update(this.frame),this.setOverlayVisibility({}),this.config&&this.visibility(this.mode))}async importFile(e,t,n){const i=e.name.toLowerCase().split(".").pop(),r=await e.arrayBuffer();let a;if(i==="stl"){const f=new yx().parse(r);f.computeVertexNormals(),a=new nt(f,this.palette.castAl),a.castShadow=a.receiveShadow=!0}else if(i==="glb"||i==="gltf"){if(i==="gltf"){const _=JSON.parse(new TextDecoder().decode(r));if([..._.buffers||[],..._.images||[]].some(m=>m.uri&&!m.uri.startsWith("data:")))throw new Error("此 glTF 含外接檔案，請匯出單一 GLB 或內嵌資源 glTF。")}const f=new Uu;f.setURLModifier(_=>{if(!_.startsWith("blob:")&&!_.startsWith("data:"))throw new Error("工件引用外部資源，請匯出內嵌材質的 GLB。");return _}),a=(await new Mx(f).parseAsync(i==="gltf"?new TextDecoder().decode(r):r,"")).scene,a.traverse(_=>{_.isMesh&&(_.castShadow=_.receiveShadow=!0)})}else throw new Error("目前可載入 STL、GLB、內嵌 glTF。STEP 請先轉換。");const o=new bt;o.add(a);const c=i==="stl"?{mm:1,cm:10,m:1e3,inch:25.4}[t]:1e3;o.scale.setScalar(c),(i!=="stl"||n==="Y")&&(o.rotation.x=Math.PI/2),o.updateMatrixWorld(!0);const l=new Mn().setFromObject(o),h=l.getSize(new D);if(![h.x,h.y,h.z].every(f=>Number.isFinite(f))||h.x<1||h.x>1e3||h.y<1||h.y>1e3||h.z<.1||h.z>200)throw new Error("工件尺寸不在原型範圍內（長寬 1–1000mm，厚 0.1–200mm），請檢查來源單位與檔案。");const u=new bt;u.add(o),o.position.set(-(l.min.x+l.max.x)/2,-(l.min.y+l.max.y)/2,-l.min.z),this.clearImport(),this.imported=u;const d=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",r))).map(f=>f.toString(16).padStart(2,"0")).join("");return{width:h.x,depth:h.y,thickness:h.z,workpieceKind:"imported",workpieceFile:{name:e.name,sha256:d,sourceUnit:i==="stl"?t:"m",up:i==="stl"?n:"Y",unitFactorToMm:c}}}clearImport(){this.imported&&(this.imported.removeFromParent(),this.imported.traverse(e=>{var t;return(t=e.geometry)==null?void 0:t.dispose()}),this.imported=null)}geometryAudit(){return{parts:this.counter.parts,renderedDepositVolumeMm3:this.depositMeshes.filter(e=>e.visible).reduce((e,t)=>e+t.geometry.userData.unitVolume*t.scale.x*t.scale.y*t.scale.z,0),cameraDirection:this.camera.position.clone().sub(this.controls.target).normalize().toArray()}}screenshot(){return this.render(),this.renderer.domElement.toDataURL("image/png")}}const sn=101325,Ay=9.80665,Ry=Object.freeze(["compressible","rigid","vent"]),nl=Object.freeze({airMode:"compressible",pressKgf:10,pressSpeed:1,settleTime:300}),Gh=9e4,ii=0,Hi=1,ri=2,ai=3,Cy=.001,Py=.003*sn,Ly=5e-5,Wh=.8;function Dy(s,e){const t=Ac(s,e),n=Math.max(0,Math.min(s.length,e)),i=e-n;return{...t,x:t.x+t.tx*i,y:t.y+t.ty*i}}function Iy(s){const e=s.config,t=s.summary.deposits;if(e.mode==="point"){const r=t[0]*1e3;return r>0?[{x:e.offsetX,y:e.offsetY,v:r,tx:1,ty:0,width:0}]:[]}const n=Pc(t,s.cellLength,e.lineRatio),i=[];for(let r=0;r<t.length;r++){const a=t[r]*1e3;if(!(a>0))continue;const o=s.gridStart+(r+.5)*s.cellLength,c=(n.widths[r]+n.widths[r+1])/2;if(e.mode==="pattern"){const l=Dy(s.path,o);i.push({x:l.x,y:l.y,v:a,tx:l.tx,ty:l.ty,width:c})}else i.push({x:e.offsetX+o-e.lineLength/2,y:e.offsetY,v:a,tx:1,ty:0,width:c})}return i}function Yu(s,e={}){const t=Wt[s.material]||Wt.putty,n=Number.isFinite(e.viscosity)&&e.viscosity>0?e.viscosity:s.material==="grease"&&Number.isFinite(s.viscosity)&&s.viscosity>0?s.viscosity:t.squeezeViscosity,i=Number.isFinite(e.yieldStress)&&e.yieldStress>=0?e.yieldStress:t.yieldStress;return{viscosity:n,yieldStress:i}}function Ny(s,e,t,n,i,r,a,o){const c=new Float64Array(e),l=new Float64Array(e),h=new Float64Array(e),u=new Float64Array(e),d=(m,p)=>{for(let x=0;x<e;x++)p[x]=i[x]*m[x];for(let x=0;x<s;x++)for(let y=4*x;y<4*x+4;y++){const v=t[y];v<0||(p[x]-=n[y]*m[v],v>=s&&(p[v]-=n[y]*m[x]))}};d(a,u);let f=0,g=0;for(let m=0;m<e;m++)c[m]=r[m]-u[m],l[m]=c[m]/i[m],h[m]=l[m],f+=c[m]*l[m],g+=r[m]*r[m];const _=Math.max(1e-20*g,o);for(let m=0;m<4e3;m++){let p=0;for(let T=0;T<e;T++)p+=c[T]*c[T];if(p<=_)break;d(h,u);let x=0;for(let T=0;T<e;T++)x+=h[T]*u[T];if(!(x>0))break;const y=f/x;let v=0;for(let T=0;T<e;T++)a[T]+=y*h[T],c[T]-=y*u[T],l[T]=c[T]/i[T],v+=c[T]*l[T];const S=v/f;f=v;for(let T=0;T<e;T++)h[T]=l[T]+S*h[T]}return a}function Uy(s,e){const{cols:t,rows:n,cellSize:i}=s,r=t*n,a=i*i,o=Float64Array.from(s.volume),c=e.gap,l=e.airMode||"compressible",h=e.viscosity,u=e.force,d=e.yieldStress||0,f=Math.max(0,e.settleTime??nl.settleTime),g=e.pressSpeed>0?e.pressSpeed:1/0,_=e.frames||0,m=e.sourceFraction||null;let p=0;if(m)for(let X=0;X<r;X++)p+=m[X]*a;let x=0;for(let X=0;X<r;X++)x=Math.max(x,o[X]/a);const y=(X,j)=>{const F=X%t;return j[0]=F>0?X-1:-1,j[1]=F+1<t?X+1:-1,j[2]=X>=t?X-t:-1,j[3]=X+t<r?X+t:-1,j},v=[0,0,0,0],S=new Uint8Array(r).fill(Hi),T=new Uint8Array(r),R=new Int32Array(r).fill(-1),I=new Int32Array(r),b=new Uint8Array(r),w=new Int32Array(r),L=new Int32Array(r),U=new Map;let V=0;const Y={sealed:0,vented:0,collapsed:0,dissolved:0,ventedAtmMm3:0},Q=sn*a*c;let G=0,ce="press",$=0;const pe=(X,j)=>Math.max(0,j-o[X]),Me=X=>X.gas/Math.max(X.air,1e-12)-sn;function Se(X,j,F=!0){var _t;const C=X*(1-Cy),k=de=>o[de]<C&&S[de]!==ai;b.fill(0);let q=0;for(let de=0;de<r;de++){const xe=de%t;(xe===0||xe===t-1||de<t||de>=r-t)&&k(de)&&(b[de]=1,L[q++]=de)}for(;q;){const de=L[--q];for(const xe of y(de,v))xe>=0&&!b[xe]&&k(xe)&&(b[xe]=1,L[q++]=xe)}if(l!=="compressible"){for(let de=0;de<r;de++)S[de]!==ai&&(k(de)?b[de]||l==="vent"?S[de]=Hi:S[de]=ai:S[de]=ii);return}T.set(S),I.set(R),w.fill(-1);const ne=[];for(let de=0;de<r;de++){if(w[de]>=0||b[de]||!(o[de]<C))continue;const xe={cells:[],fresh:0,drained:0,prior:new Map};for(w[de]=ne.length,L[0]=de,q=1;q;){const ye=L[--q];xe.cells.push(ye);const Xe=pe(ye,X);T[ye]===ri?xe.prior.set(I[ye],(xe.prior.get(I[ye])||0)+Xe):T[ye]===Hi?xe.fresh+=Xe:xe.drained+=Xe;for(const Re of y(ye,v))Re>=0&&w[Re]<0&&!b[Re]&&o[Re]<C&&(w[Re]=ne.length,L[q++]=Re)}ne.push(xe)}S.fill(Hi),R.fill(-1);for(let de=0;de<r;de++)o[de]<C||(S[de]=ii);const W=new Set,O=new Map,ae=new Map,fe=(de,xe)=>ae.set(de,(ae.get(de)||0)+xe);for(const de of ne){let xe=0;for(const ye of de.prior.values())xe+=ye;for(const[ye,Xe]of de.prior){const Re=Xe+(xe>0?de.drained*Xe/xe:de.drained/de.prior.size);de.prior.set(ye,Re),fe(ye,Re)}}for(let de=0;de<r;de++)T[de]===ri&&b[de]&&fe(I[de],pe(de,X));const Ue=new Map([...U.values()].map(de=>[de.id,de.gas]));for(const de of ne){let xe=de.fresh*sn,ye=null,Xe=-1;for(const[wt,Qt]of de.prior){const Di=U.get(wt);Di&&(xe+=Ue.get(wt)*Qt/Math.max(ae.get(wt)||Qt,1e-15),Qt>Xe&&(ye=Di,Xe=Qt))}if(!(xe>0)){for(const wt of de.cells)S[wt]=ii;continue}if(xe<Q){de.prior.size&&Y.dissolved++;continue}let Re;ye&&!W.has(ye.id)?(W.add(ye.id),Re=ye):(Re={id:V++,sealGap:ye?ye.sealGap:j,sealTime:ye?ye.sealTime:G,sealPhase:ye?ye.sealPhase:ce,maxP:0,minRatio:1,q:null},ye||Y.sealed++),Re.gas=xe,Re.cells=de.cells.length;let ut=0,Mt=0,Ht=0;for(const wt of de.cells){S[wt]=ri,R[wt]=Re.id;const Qt=pe(wt,X);ut+=Qt,Mt+=wt%t*Qt,Ht+=Math.floor(wt/t)*Qt}Re.air=ut,Re.cx=ut>0?Mt/ut:de.cells[0]%t,Re.cy=ut>0?Ht/ut:Math.floor(de.cells[0]/t);const st=Me(Re);Re.p=st,F&&(Re.maxP=Math.max(Re.maxP,st),Re.minRatio=Math.min(Re.minRatio,ut*sn/Re.gas),ce==="press"&&Re.gas>=3*Q&&($=Math.max($,st))),O.set(Re.id,Re)}const Be=new Set;for(let de=0;de<r;de++)T[de]===ri&&S[de]===Hi&&Be.add(I[de]);const pt=new Set;for(const de of ne)for(const xe of de.prior.keys())pt.add(xe);for(const[de,xe]of U)O.has(de)||W.has(de)||pt.has(de)||(Be.has(de)?(Y.vented++,Y.ventedAtmMm3+=xe.gas/sn):Y.collapsed++);U.clear();for(const[de,xe]of O)U.set(de,xe);(_t=e.trace)==null||_t.call(e,{h:j,time:G,phase:ce,record:F,pockets:[...U.values()],events:{...Y},comps:ne})}const Ee=new Float64Array(r);function at(X){if(!(d>0)){for(const k of U.values())k.hold=0;return}Ee.fill(1/0);let j=0,F=0;for(let k=0;k<r;k++)S[k]===Hi&&(Ee[k]=0,L[F++]=k);for(;j<F;){const k=L[j++];for(const q of y(k,v))q>=0&&S[q]===ii&&Ee[q]===1/0&&(Ee[q]=Ee[k]+1,L[F++]=q)}const C=new Map;for(let k=0;k<r;k++)if(S[k]===ri)for(const q of y(k,v))q>=0&&S[q]===ii&&C.set(R[k],Math.min(C.get(R[k])??1/0,Ee[q]));for(const k of U.values())k.hold=2*d/X*((C.get(k.id)??1/0)+.5)*i}const Ge=new Int32Array(r).fill(-1),it=new Float64Array(r);function te(X,j){const F=[];for(let xe=0;xe<r;xe++)S[xe]===ii&&(Ge[xe]=F.push(xe)-1);const C=F.length,k=new Map;j.forEach((xe,ye)=>k.set(xe.id,C+ye));const q=C+j.length,ne=new Int32Array(4*C).fill(-1),W=new Float64Array(4*C),O=new Float64Array(q),ae=new Float64Array(C),fe=[],Ue=[],Be=new Uint8Array(C);let pt=0;for(let xe=0;xe<C;xe++){const ye=F[xe];ae[xe]=o[ye]-X,pt+=Math.max(0,ae[xe]),y(ye,v);for(let Xe=0;Xe<4;Xe++){const Re=v[Xe];if(Re<0)continue;const ut=S[Re];if(ut===ii){ne[4*xe+Xe]=Ge[Re],W[4*xe+Xe]=1,O[xe]+=1;continue}if(ut===ai)continue;const Mt=1/(.5+Math.min(1,Math.max(0,o[Re]/X)));if(ut===Hi)fe.push(xe,Re,Mt),O[xe]+=Mt,Be[xe]=1;else{const Ht=k.get(R[Re]);if(Ht===void 0)continue;ne[4*xe+Xe]=Ht,W[4*xe+Xe]=Mt,O[xe]+=Mt,O[Ht]+=Mt,Ue.push(xe,Re,Ht,Mt,4*xe+Xe),Be[xe]=1}}}const _t=new Uint8Array(C),de=[];for(let xe=0;xe<C;xe++){if(_t[xe])continue;de.length=0;let ye=!1;_t[xe]=1,de.push(xe);for(let Xe=0;Xe<de.length;Xe++){const Re=de[Xe];Be[Re]&&(ye=!0);for(let ut=4*Re;ut<4*Re+4;ut++){const Mt=ne[ut];Mt>=0&&Mt<C&&!_t[Mt]&&(_t[Mt]=1,de.push(Mt))}}if(!ye)for(const Xe of de)O[Xe]=1,ae[Xe]=0,ne.fill(-1,4*Xe,4*Xe+4)}for(let xe=0;xe<q;xe++)O[xe]>0||(O[xe]=1);return{cells:F,m:C,size:q,nb:ne,w:W,diag:O,rhsVol:ae,open:fe,pface:Ue,activePockets:j,excess:pt,cap:X}}function se(X,j,F=1,C=!1){const{m:k,size:q,nb:ne,w:W,rhsVol:O,activePockets:ae,pface:fe}=X,Ue=new Float64Array(q);for(let Re=0;Re<k;Re++)Ue[Re]=it[X.cells[Re]]*F;const Be=ae.length,pt=ae.map(Re=>Re.air),_t=ae.map(Re=>ce==="relax"&&Re.hold||0),de=(Re,ut)=>pt[Re]-ae[Re].gas/Math.max(sn+ut+_t[Re],.02*sn),xe=ae.map((Re,ut)=>{const Mt=Me(Re)-_t[ut];return Number.isFinite(Re.q)?Math.max(Mt,Re.q):Mt}),ye=q*((C?1e-10:Ly)*X.cap/j)**2;let Xe=new Float64Array(Be);for(let Re=0;Re<(Be?5:1);Re++){const ut=Float64Array.from(X.diag),Mt=new Float64Array(q);for(let st=0;st<k;st++)Mt[st]=O[st]/j;for(let st=0;st<Be;st++){const wt=Math.max(sn+xe[st]+_t[st],.02*sn),Qt=ae[st].gas/(wt*wt);ut[k+st]+=Qt/j,Mt[k+st]=(Qt*xe[st]-de(st,xe[st]))/j,Ue[k+st]=xe[st]}Ny(k,q,ne,W,ut,Mt,Ue,ye),Xe=new Float64Array(Be);for(let st=0;st<fe.length;st+=5)Xe[fe[st+2]-k]+=j*fe[st+3]*(Ue[fe[st]]-Ue[fe[st+2]]);let Ht=0;for(let st=0;st<Be;st++){const wt=Math.max(Ue[k+st],.02*sn-sn-_t[st]);Ht=Math.max(Ht,Math.abs(Xe[st]-de(st,wt))/(pt[st]+.05*X.cap)),xe[st]=wt}if(Ht<.02)break}return{x:Ue,kappa:j,inflow:Xe,q:xe,hold:_t}}function Te(X,j){const{cells:F,m:C,nb:k,w:q,open:ne,pface:W}=X,{x:O,kappa:ae}=j,fe=Float64Array.from(o);for(let ye=0;ye<C;ye++)for(let Xe=4*ye;Xe<4*ye+4;Xe++){const Re=k[Xe];if(Re<=ye||Re>=C)continue;const ut=ae*q[Xe]*(O[ye]-O[Re]);fe[F[ye]]-=ut,fe[F[Re]]+=ut}const Ue=new Float64Array(C),Be=(ye,Xe,Re)=>{if(Re>=0){fe[F[ye]]-=Re,fe[Xe]+=Re;return}const ut=Math.min(-Re,Math.max(0,fe[Xe]));fe[Xe]-=ut,fe[F[ye]]+=ut,Ue[ye]+=-Re-ut};for(let ye=0;ye<ne.length;ye+=3)Be(ne[ye],ne[ye+1],ae*ne[ye+2]*O[ne[ye]]);for(let ye=0;ye<W.length;ye+=5)Be(W[ye],W[ye+1],ae*W[ye+3]*(O[W[ye]]-O[W[ye+2]]));for(let ye=0;ye<W.length;ye+=5){const Xe=W[ye+1];if(!(fe[Xe]>X.cap))continue;const Re=R[Xe];let ut=fe[Xe]-X.cap;fe[Xe]=X.cap;const Mt=[Xe],Ht=new Set(Mt);for(let st=0;st<Mt.length&&ut>0;st++)for(const wt of y(Mt[st],[0,0,0,0])){if(wt<0||Ht.has(wt)||S[wt]!==ri||R[wt]!==Re)continue;Ht.add(wt),Mt.push(wt);const Qt=Math.max(0,X.cap-fe[wt]),Di=Math.min(Qt,ut);fe[wt]+=Di,ut-=Di}fe[Xe]+=ut}let pt=0,_t=!1;for(let ye=0;ye<C;ye++)pt=Math.max(pt,Ue[ye]/X.cap),fe[F[ye]]<-1e-12*X.cap&&(_t=!0);let de=0;for(let ye=0;ye<ne.length;ye+=3)de=Math.max(de,(fe[ne[ye+1]]-X.cap)/X.cap);for(let ye=0;ye<W.length;ye+=5)de=Math.max(de,(fe[W[ye+1]]-X.cap)/X.cap);let xe=0;return X.activePockets.forEach((ye,Xe)=>xe=Math.max(xe,Math.abs(j.inflow[Xe])/(ye.air+.5*X.cap))),{trial:fe,drain:pt,swing:xe,negative:_t,front:de}}function _e(X,j){let F=0;for(let C=0;C<X.m;C++)F+=j.x[C];return X.activePockets.forEach((C,k)=>F+=Math.max(0,j.q[k]+j.hold[k])*C.cells),F*a*1e-6}const me=(X,j)=>{let F=0;for(let C=0;C<X.m;C++)F+=j.x[C];return F*a*1e-6},Oe=()=>({state:S.slice(),pocketOf:R.slice(),pockets:[...U.values()].map(X=>({...X})),events:{...Y},nextId:V,peakBubble:$}),We=X=>{S.set(X.state),R.set(X.pocketOf),U.clear();for(const j of X.pockets)U.set(j.id,j);Object.assign(Y,X.events),V=X.nextId,$=X.peakBubble},N=[],Ie=(X,j)=>{const F=new Uint8Array(r),C=new Uint8Array(r);let k=0;for(let O=0;O<r;O++){const ae=S[O]===ai?0:Math.min(1,o[O]/j);F[O]=Math.round(ae*255),(S[O]===ai||S[O]===ri&&ae<.5)&&(C[O]=1),m&&(k+=m[O]*ae*a)}const q=Math.max(3*a,.5);let ne=0,W=0;for(const O of U.values())O.air/X>=q-1e-9&&(W++,ne=Math.max(ne,Me(O)));N.push({gap:X,t:G,phase:ce,coverage:F,trapped:C,coveredPercent:p>0?k/p*100:0,bubbles:W,bubbleKPa:ne/1e3})},Pe=l==="compressible"&&f>0&&_>1?Math.max(1,Math.round(_*.3)):0,Ae=_>1?_-Pe:0,le=Math.max(x,c),ze=Ae>1?Array.from({length:Ae-1},(X,j)=>le*(c/le)**((j+1)/(Ae-1))):[];let ge=0;Se(le*a,le,!0),Ae>1&&Ie(le,le*a);const Le=.07;let Ke=Le,Ze=0,P=0,M=0,z=0,J=0,re=le;const ee=900;let Ne=!1;for(;re>c*(1+1e-12);){!Ne&&J>=ee&&(Ne=!0,Ke=Le);const X=Math.max(c,re*Math.exp(-Ke)),j=X*a,F=Oe();Se(j,X,!1);let C=!1;if(!Ne&&Ke>2e-4)for(const Ue of F.pockets){const Be=U.get(Ue.id);Be&&Be.gas/Math.max(Be.air,1e-15)>1.8*(Ue.gas/Math.max(Ue.air,1e-15))&&(C=!0)}const k=l==="compressible"?[...U.values()]:[],q=te(j,k);if(!C&&(q.m===0||q.excess<=1e-12*j)){Number.isFinite(g)&&q.m&&(G+=(re-X)/g),re=X;continue}let ne=null,W=0,O=null;if(!C){const Ue=Ze&&P?Ze*q.excess/P:0,Be=Number.isFinite(g)?X**3*((re-X)/g)/(12*h):0;if(!k.length)ne=se(q,1,Ue),W=Math.max(Be,u>0?Math.max(1e-30,me(q,ne)/u):1);else{W=Math.max(Be,Ue||Math.max(1e-30,me(q,se(te(j,[]),1,0))/u));for(let pt=0;pt<3;pt++){ne=se(q,W);const _t=_e(q,ne)/u;if(!(_t>0)||Math.abs(_t-1)<.35||_t<1&&W<=Be*(1+1e-9))break;W=Math.max(Be,W*Math.min(20,Math.max(.05,_t)))}}O=Te(q,ne)}if(!Ne&&(C||O.negative||O.drain>.9||O.swing>.6)&&Ke>2e-4){We(F),Ke*=.5,z++;continue}o.set(O.trial);const ae=k.length?1:W;for(let Ue=0;Ue<q.m;Ue++)it[q.cells[Ue]]=ne.x[Ue]/ae;k.forEach((Ue,Be)=>Ue.q=ne.q[Be]);const fe=12*h*W/X**3;for(G+=fe,M=fe,Ze=W,P=q.excess,re=X,J++,Se(j,X,!0),Ne?Ke=Le:O.front>Wh||O.swing>.3?Ke=Math.max(2e-4,Ke*.6):O.front<Wh*.4&&O.swing<.15&&(Ke=Math.min(Le,Ke*1.25));ge<ze.length&&re<=ze[ge]*(1+1e-9);)Ie(re,j),ge++}const ue=c*a;Se(ue,c);const He=G;let ke=0;for(let X=0;X<r;X++)S[X]===ii&&(ke+=a);let he=0,be=!0;if(l==="compressible"&&f>0&&U.size){ce="relax";let X=Math.min(Math.max(M,.001),f/20);const j=Array.from({length:Math.max(0,Pe-1)},(C,k)=>f*.002*500**(k/Math.max(1,Pe-2)));let F=0;for(let C=0;C<800;C++){at(c);const k=[...U.values()].filter(ae=>Me(ae)-ae.hold>Py);if(!k.length)break;if(he>=f*(1-1e-9)){be=!1;break}const q=Math.min(X,f-he),ne=te(ue,k);if(ne.m===0)break;const W=se(ne,c**3*q/(12*h)),O=Te(ne,W);if((O.negative||O.drain>.6||O.swing>.3)&&X>1e-6){X*=.5;continue}o.set(O.trial);for(let ae=0;ae<ne.m;ae++)it[ne.cells[ae]]=W.x[ae];for(k.forEach((ae,fe)=>ae.q=W.q[fe]),he+=q,G+=q,Se(ue,c);F<j.length&&he>=j[F];)Ie(c,ue),F++;O.swing<.05&&O.drain<.15?X*=2:O.swing<.12&&(X*=1.3)}}let $e=1/0;for(let X=0;X<60;X++){let j=0,F=0;for(let k=0;k<r;k++)S[k]===ii&&o[k]>ue&&(j=Math.max(j,o[k]-ue),F+=o[k]-ue);if(j<1e-9*ue||F>.9*$e)break;$e=F;const C=te(ue,[]);if(C.m===0)break;o.set(Te(C,se(C,1,0,!0)).trial),Se(ue,c)}return at(c),_>1&&(N.length>=_&&(N.length=_-1),Ie(c,ue)),{volume:o,state:S,pocketOf:R,pockets:[...U.values()],frames:N,crest:x,cap:ue,press:{time:He,relaxTime:he,settled:be,substeps:z,steps:J,coarse:Ne,seatPressureKPa:ke>0?u/(ke*1e-6)/1e3:0,peakBubbleKPa:$/1e3,...Y}}}function Fy(s,e){const t=s.config,n={shape:"rectangle",offsetX:0,offsetY:0,cellSize:1,power:25,frames:0,...nl,...e};for(const F of["width","depth","offsetX","offsetY","gap","cellSize","power","pressKgf","pressSpeed","settleTime"])if(!Number.isFinite(n[F]))throw new Error(`${F} 必須是有限數值`);if(!["rectangle","circle"].includes(n.shape))throw new Error("熱源形狀必須為矩形或圓形");if(!Ry.includes(n.airMode))throw new Error("夾氣處理方式無效");if(n.width<=0||n.width>1e3||n.depth<=0||n.depth>1e3||n.gap<.02||n.gap>10||n.cellSize<.2||n.cellSize>10)throw new Error("熱源尺寸需為 0–1000 mm、間隙 0.02–10 mm、網格 0.2–10 mm");if(n.power<0||n.power>1e4)throw new Error("熱源功耗需介於 0 與 10000 W");if(n.pressKgf<.01||n.pressKgf>5e3)throw new Error("壓合力需介於 0.01 與 5000 kgf");if(n.settleTime<0||n.settleTime>3600)throw new Error("靜置時間需介於 0 與 3600 s");if(n.pressSpeed<.01||n.pressSpeed>100)throw new Error("壓板下降速度上限需介於 0.01 與 100 mm/s");const i=Wt[t.material]||Wt.putty;if(n.viscosity!=null&&!(n.viscosity>=1&&n.viscosity<=1e7))throw new Error("有效黏度需介於 1 與 10,000,000 Pa·s");if(n.yieldStress!=null&&!(n.yieldStress>=0&&n.yieldStress<=1e6))throw new Error("降伏應力需介於 0 與 1,000,000 Pa");const{viscosity:r,yieldStress:a}=Yu(t,n);if(!(r>=1&&r<=1e7))throw new Error("有效黏度需介於 1 與 10,000,000 Pa·s");if(!(a>=0&&a<=1e6))throw new Error("降伏應力需介於 0 與 1,000,000 Pa");const o=Number.isFinite(n.conductivity)&&n.conductivity>0?n.conductivity:i.conductivity,c=Number.isFinite(n.contactResistance)&&n.contactResistance>=0?n.contactResistance:i.contactResistance,l=s.summary.deposits,h=l.reduce((F,C)=>F+C,0);if(!Number.isFinite(h)||h<0||l.some(F=>!Number.isFinite(F)||F<0))throw new Error("沉積體積資料無效");const u=h*1e3,d=n.shape==="circle"?n.width:n.depth,f=Iy(s),g=t.mode==="point"?va(h,t.dotRatio):null,_=Math.max(g?g.radius:0,...f.map(F=>F.width/2),0),m=Math.sqrt(u/(Math.PI*n.gap))+_+4*n.cellSize,p=f.map(F=>F.x),x=f.map(F=>F.y),y=Math.min(n.offsetX-n.width/2,t.offsetX,...p)-m,v=Math.max(n.offsetX+n.width/2,t.offsetX,...p)+m,S=Math.min(n.offsetY-d/2,t.offsetY,...x)-m,T=Math.max(n.offsetY+d/2,t.offsetY,...x)+m;let R=Math.max(n.cellSize,Math.sqrt((v-y)*(T-S)/(Gh*.89))),I=Math.ceil((v-y)/R),b=Math.ceil((T-S)/R);for(;I*b>Gh;)R*=1.02,I=Math.ceil((v-y)/R),b=Math.ceil((T-S)/R);const w=y,L=S,U=I*b,V=R*R,Y=F=>w+(F%I+.5)*R,Q=F=>L+(Math.floor(F/I)+.5)*R,G=(F,C)=>{const k=Math.floor((F-w)/R),q=Math.floor((C-L)/R);return k<0||q<0||k>=I||q>=b?-1:q*I+k},ce=new Float64Array(U),$=(F,C,k,q)=>{let ne=0;for(const[,W]of C)ne+=W;if(ne<=0){const W=G(k,q);W>=0&&(ce[W]+=F);return}for(const[W,O]of C)ce[W]+=F*O/ne};if(g&&f.length){const F=f[0],C=g.radius,k=g.height,q=(C*C+k*k)/(2*k),ne=[],W=Math.min(8,Math.max(1,Math.ceil(R/Math.max(C/6,1e-6))));for(let O=Math.floor((F.y-C-L)/R);O<=Math.floor((F.y+C-L)/R);O++)for(let ae=Math.floor((F.x-C-w)/R);ae<=Math.floor((F.x+C-w)/R);ae++){if(ae<0||O<0||ae>=I||O>=b)continue;let fe=0;for(let Ue=0;Ue<W;Ue++)for(let Be=0;Be<W;Be++){const pt=Math.hypot(w+(ae+(Ue+.5)/W)*R-F.x,L+(O+(Be+.5)/W)*R-F.y);pt<C&&(fe+=Math.sqrt(q*q-pt*pt)-(q-k))}fe>0&&ne.push([O*I+ae,fe])}$(F.v,ne,F.x,F.y)}else for(const F of f){const C=Math.max(F.width/2,1e-6),k=Math.max(1,Math.min(256,Math.ceil(4*C/R))),q=[];for(let ne=0;ne<k;ne++){const W=(2*(ne+.5)/k-1)*C,O=G(F.x-F.ty*W,F.y+F.tx*W);O>=0&&q.push([O,Math.sqrt(Math.max(0,1-(W/C)**2))])}$(F.v,q,F.x,F.y)}const pe=new Float32Array(U),Me=new Float32Array(U),Se=(F,C)=>n.shape==="circle"?(F-n.offsetX)**2+(C-n.offsetY)**2<=(n.width/2)**2:Math.abs(F-n.offsetX)<=n.width/2&&Math.abs(C-n.offsetY)<=n.depth/2;let Ee=0;for(let F=0;F<b;F++)for(let C=0;C<I;C++){const k=F*I+C;let q=0,ne=0;for(let W=0;W<4;W++)for(let O=0;O<4;O++){const ae=w+(C+(O+.5)/4)*R,fe=L+(F+(W+.5)/4)*R;Se(ae,fe)&&(q+=1/16),Math.abs(ae)<=t.width/2&&Math.abs(fe)<=t.depth/2&&(ne+=1/16)}pe[k]=q,Me[k]=ne,Ee+=q*V}const at=n.pressKgf*Ay,Ge=Uy({cols:I,rows:b,cellSize:R,volume:ce},{gap:n.gap,airMode:n.airMode,force:at,pressSpeed:n.pressSpeed,viscosity:r,yieldStress:a,settleTime:n.settleTime,frames:n.frames,sourceFraction:pe,trace:n.trace}),it=Ge.volume,te=Ge.cap,se=Ge.crest;let Te=0;for(let F=0;F<U;F++)Te+=Math.max(0,it[F]-te);const _e=new Float32Array(U),me=new Uint8Array(U),Oe=new Float32Array(U);let We=0,N=0,Ie=0,Pe=0,Ae=0,le=0;for(let F=0;F<U;F++){const C=it[F],k=Ge.state[F];if(_e[F]=k===ai?0:Math.min(1,C/te),Oe[F]=k===ai?1:k===ri?1-_e[F]:0,me[F]=k===ai||k===ri&&_e[F]<.5?1:0,We+=pe[F]*_e[F]*V,Ae+=_e[F]*V,N+=C*pe[F],Ie+=C*(1-Me[F]),Pe+=C,_e[F]>=.5&&pe[F]<.5){const q=Y(F)-n.offsetX,ne=Q(F)-n.offsetY,W=n.shape==="circle"?Math.hypot(q,ne)-n.width/2:Math.hypot(Math.max(0,Math.abs(q)-n.width/2),Math.max(0,Math.abs(ne)-n.depth/2));le=Math.max(le,W)}}const ze=[],ge=new Map(Ge.pockets.map(F=>[F.id,F])),Le=new Uint8Array(U),Ke=new Int32Array(U);for(let F=0;F<U;F++){if(!Oe[F]||Le[F])continue;const C=Ge.pocketOf[F];let k=0,q=0,ne=0,W=0,O=0;for(Le[F]=1,Ke[O++]=F;O;){const fe=Ke[--O],Ue=Oe[fe];k+=Ue*V,q+=Ue*pe[fe]*V,ne+=Y(fe)*Ue,W+=Q(fe)*Ue;const Be=fe%I;for(const pt of[Be>0?fe-1:-1,Be+1<I?fe+1:-1,fe>=I?fe-I:-1,fe+I<U?fe+I:-1])pt>=0&&Oe[pt]&&!Le[pt]&&Ge.pocketOf[pt]===C&&(Le[pt]=1,Ke[O++]=pt)}if(!(k>0))continue;const ae=C>=0?ge.get(C):null;ze.push({areaMm2:k,inSourceMm2:q,x:ne/(k/V),y:W/(k/V),...ae?{pressureKPa:(ae.gas/Math.max(ae.air,1e-12)-sn)/1e3,volumeRatio:ae.air*sn/ae.gas,atmVolumeMm3:ae.gas/sn,sealGapMm:ae.sealGap,minRatio:ae.minRatio,sealedDuring:ae.sealPhase}:{}})}ze.sort((F,C)=>C.inSourceMm2-F.inSourceMm2||C.areaMm2-F.areaMm2);const Ze=Math.max(3*V,.5),P=ze.filter(F=>F.inSourceMm2>1e-9&&F.areaMm2>=Ze-1e-9),M=ze.filter(F=>F.areaMm2<Ze-1e-9).reduce((F,C)=>F+C.inSourceMm2,0),z=P.reduce((F,C)=>F+C.inSourceMm2,0),J=n.shape==="circle"?Math.PI*n.width**2/4:n.width*n.depth,re=J*n.gap/1e3,ee=Ee>0?We/Ee*100:0,Ne=n.gap/1e3,ue=Ne/o*1e4+c,He=J/100,ke=ee/100*He,he={conductivity:o,contactResistance:c,bondLineMm:n.gap,power:n.power,bulkImpedanceCm2:Ne/o*1e4,impedanceCm2:ue,idealResistance:ue/He,resistance:ke>0?ue/ke:1/0};he.idealRise=he.idealResistance*n.power,he.rise=he.resistance*n.power;const be=P.filter(F=>Number.isFinite(F.volumeRatio)),$e={airMode:n.airMode,forceN:at,forceKgf:n.pressKgf,pressSpeed:n.pressSpeed,viscosity:r,yieldStress:a,settleTime:n.settleTime,pressTime:Ge.press.time,relaxTime:Ge.press.relaxTime,settled:Ge.press.settled,seatPressureKPa:Ge.press.seatPressureKPa,peakBubbleKPa:Ge.press.peakBubbleKPa,sealed:Ge.press.sealed,vented:Ge.press.vented,collapsed:Ge.press.collapsed,remaining:ze.filter(F=>F.areaMm2>=Ze-1e-9).length,bubbleKPa:be.length?Math.max(...be.map(F=>F.pressureKPa)):0,volumeRatio:be.length?be.reduce((F,C)=>F+C.volumeRatio*C.inSourceMm2,0)/be.reduce((F,C)=>F+C.inSourceMm2,0):null,substeps:Ge.press.substeps},X={compressible:"被膠包圍的空氣依 pV = 常數（等溫）壓縮與回脹，可隨膠流移動、在膠牆變薄時排出",rigid:"被膠包圍的乾區凍結為不可變形的夾氣（v1.0 剛性牆）",vent:"被膠包圍的空氣假設全部排出（覆蓋率上限）"},j=[`覆蓋與空洞來自平行板 Hele-Shaw 擠壓近似（等效牛頓黏度 ${Math.round(r)} Pa·s、定力 ${n.pressKgf} kgf 壓到墊片）；${X[n.airMode]}。未含剪切稀化、壁滑、潤濕與指狀穿透，不能判定實際接觸或可靠度。`,"熱阻為一維估算：(間隙 ÷ 導熱率 + TDS 推算接觸熱阻) ÷ 濕潤面積；不含擴散熱阻與空洞周邊的橫向傳熱，只供方案相對比較。"];return n.airMode==="compressible"&&Ge.press.sealed>0&&j.push(`壓到墊片後膠壓消退，被壓縮的氣泡會回脹（降伏應力 ${a} Pa 只擋住一小部分）；靜置 ${n.settleTime} s ${Ge.press.settled?"內已大致穩定":"時仍在回脹"}。透明板實測建議在壓好後 0 s、30 s、2 min、10 min 各拍一張比對。`),Ge.press.coarse&&j.push("壓合步數超過上限，後段改以粗步長完成；覆蓋與夾氣仍有效，但壓合時間與壓合中的氣壓精度下降。"),Ge.press.time>120&&j.push(`以 ${n.pressKgf} kgf 壓到墊片約需 ${Ge.press.time.toFixed(0)} s；實際手壓若較快，壓合中的氣泡壓縮會更大。`),n.airMode==="compressible"&&Ge.press.sealed>0&&j.push("氣泡在膠牆變薄處排出（吹破）的位置與時機受網格影響（指狀穿透未完整解析）；比較圖樣請使用相同網格，建議 ≤ 0.5 mm。"),Te>1e-9&&j.push("部分膠量被夾氣區完全包圍而無法再推出，已保留在原位；局部膜厚可能高於間隙。"),R>n.cellSize*1.001&&j.push(`為控制計算量，網格由 ${n.cellSize.toFixed(2)} mm 調整為 ${R.toFixed(2)} mm；細節精度下降。`),Math.abs(Ee-J)>J*.05&&j.push("熱源相對網格過小，熱源面積的網格取樣誤差超過 5%；請縮小工件範圍或使用更細網格，覆蓋數值不宜判讀。"),(Math.abs(n.offsetX)+n.width/2>t.width/2||Math.abs(n.offsetY)+d/2>t.depth/2)&&j.push("熱源範圍超出工件矩形參考邊界；請核對尺寸和中心偏移，匯入工件僅以包圍框近似。"),Ie>1e-6&&j.push("估算有材料超出工件矩形範圍；未模擬實際邊緣流失。"),z>0&&j.push(`熱源內有 ${P.length} 處被膠包圍的夾氣區（共 ${z.toFixed(1)} mm²）；外框、螺旋與蛇形較易發生，需透明板實測確認。`),t.workpieceKind!=="plate"&&j.push("匯入工件仍以其矩形邊界和水平上表面近似，不包含孔洞與曲面。"),t.mode==="pattern"&&j.push("膠沿規劃路徑累加；彎角、重疊與壓合輪廓為幾何近似，並非已驗證的流變模擬。"),n.gap<i.minBondLine&&j.push(`${i.name} 資料表最小黏結層厚度為 ${i.minBondLine} mm；目前目標間隙較小，須向廠商確認適用性，不代表此模型已考慮顆粒或硬接觸。`),{options:n,grid:{originX:w,originY:L,cellSize:R,cols:I,rows:b,coverage:_e,sourceFraction:pe,voidMask:me,airFraction:Oe,frames:Ge.frames,crest:se},summary:{depositedMl:h,sourceAreaMm2:J,requiredMl:re,coveredPercent:ee,idealVolumePercent:re>0?Math.min(100,h/re*100):0,volumeRatio:re>0?h/re:0,insideMl:N/1e3,outsideMl:(Pe-N)/1e3,offWorkpieceMl:Ie/1e3,conservationErrorMl:Pe/1e3-h,unresolvedMl:Te/1e3,wetAreaMm2:Ae,squeezeOutMm:le,voidCount:P.length,voidAreaMm2:z,voidPercent:J>0?z/J*100:0,largestVoidMm2:P.length?Math.max(...P.map(F=>F.inSourceMm2)):0,tinyVoidMm2:M,minVoidMm2:Ze,crestMm:se,steps:Ge.press.steps,press:$e,thermal:he,material:i.name},voids:ze,warnings:j,assumptions:"engineering_assumption",model:`hele_shaw_squeeze_v1.1_${n.airMode}`}}function Oy(s,e,{iterations:t=26}={}){const n=s.mode==="point",i=n?"gateDuration":"speed";let r=n?.001:1,a=n?10:800,o=null;for(let h=0;h<t;h++){const u=Math.sqrt(r*a);let d=null;try{d=xa({...s,[i]:u})}catch{d=null}const f=d?d.summary.deposited:1/0;d&&(!o||Math.abs(f-e)<Math.abs(o.volume-e))&&(o={run:d,value:u,volume:f});const g=f>e;n===g?a=u:r=u}if(!o)throw new Error("無法在設備限制內達到目標膠量");const c=Number(o.value.toPrecision(4)),l=xa({...s,[i]:c});return{config:{...s,[i]:c},run:l,key:i,reached:Math.abs(l.summary.deposited-e)<=Math.max(1e-6,e*.03)}}const Ia=Object.freeze({coverage:95,overflow:3});function Sr(s,e=Ia){const t=Math.max(0,e.coverage-s.coveredPercent),n=Math.max(0,s.squeezeOutMm-e.overflow);return{pass:t<=1e-9&&n<=1e-9,short:t,over:n,deficit:t/5+n}}function ky(s,e,t=Ia){const n=Sr(s,t),i=Sr(e,t);return n.pass!==i.pass?n.pass?-1:1:n.pass?s.depositedMl-e.depositedMl||e.coveredPercent-s.coveredPercent||s.squeezeOutMm-e.squeezeOutMm:n.deficit-i.deficit||s.depositedMl-e.depositedMl}const ju=(s,e=Ia)=>[...s].sort((t,n)=>ky(t,n,e));function $h(s,e){var n,i;const t=e.summary;return{depositedMl:t.depositedMl,requiredMl:t.requiredMl,volumeRatio:t.volumeRatio,coveredPercent:t.coveredPercent,squeezeOutMm:t.squeezeOutMm,voidCount:t.voidCount,voidAreaMm2:t.voidAreaMm2,rise:t.thermal.rise,cycle:s.ending.motionEnd,pressTime:((n=t.press)==null?void 0:n.pressTime)??null,airMode:((i=t.press)==null?void 0:i.airMode)??null}}const Ku={line:'<path d="M4 12h16"/>',n:'<path d="M5 19V5l14 14V5"/>',serpentine:'<path d="M4 5h15a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h14a2 2 0 0 1 0 4H4"/>',spiral:'<path d="M4 4h16v16H6V7h11v10H9v-7h5v4"/>',perimeter:'<rect x="4" y="4" width="16" height="16" rx="1"/>'},zn={line:"中心線",n:"N 形",serpentine:"蛇形",spiral:"螺旋",perimeter:"外框"},jt=(s,e=16)=>`<svg viewBox="0 0 24 24" width="${e}" height="${e}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s}</svg>`,dt={play:jt('<path d="M7 5v14l11-7z" fill="currentColor" stroke="none"/>'),pause:jt('<path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none"/>'),restart:jt('<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/>'),step:jt('<path d="M6 5v14l9-7zM17 5v14"/>'),reset:jt('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'),orbit:jt('<circle cx="12" cy="12" r="3"/><path d="M12 3c5 0 9 4 9 9M12 21c-5 0-9-4-9-9"/><path d="M19 9l2 3 2-3M5 15l-2-3-2 3"/>'),cube:jt('<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>'),sun:jt('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:jt('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),book:jt('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5"/>'),help:jt('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>'),download:jt('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),press:jt('<path d="M4 6h16M12 6v6M8 12h8l-2 4h-4zM4 20h16"/>'),compare:jt('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),close:jt('<path d="M6 6l12 12M18 6 6 18"/>'),save:jt('<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>'),spark:jt('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>')};function By(s){return`
<header class="topbar">
  <div class="brand">
    <div class="brand-mark" aria-hidden="true"><span></span></div>
    <div><div class="eyebrow">TIM DISPENSING LAB</div><h1>TIM 點膠研究室</h1></div>
  </div>
  <div class="scenario" id="scenario" aria-label="目前情境"></div>
  <div class="top-actions">
    <span class="badge-warn" title="所有結果皆為工程假設，尚未經實機校準">工程假設 · 未校準</span>
    <button class="ghost" id="show-scenarios" title="已存情境的比較">${dt.compare}<span>情境比較</span><em class="count" id="scenario-count" hidden></em></button>
    <button class="ghost" id="show-sources" title="參數來源與假設">${dt.book}<span>來源</span></button>
    <button class="ghost" id="help" title="使用說明">${dt.help}<span>說明</span></button>
    <button class="ghost icon-only" id="theme" title="切換深色／淺色">${dt.moon}</button>
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
          <button class="tool" id="free-orbit" aria-pressed="false" title="360° 自由旋轉">${dt.orbit}</button>
          <button class="tool" id="projection" aria-pressed="false" title="切換正交／透視">${dt.cube}<span id="projection-label">正交</span></button>
          <button class="tool" id="reset-camera" title="重設視角 (Home)">${dt.reset}</button>
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
        <button class="tool" id="press-play">${dt.play}</button>
        <input type="range" id="press-scrub" min="0" max="23" step="1" value="23" aria-label="壓合進程">
        <span id="press-gap">間隙 0.50 mm</span>
        <div class="seg small" role="group" aria-label="壓合著色"><button data-press-color="material" class="active">膠色</button><button data-press-color="front">前緣時序</button></div>
        <button class="tool" id="press-exit" title="回到點膠">${dt.close}<span>回到點膠</span></button>
      </div>
      <div class="stage-foot">
        <span id="camera-hint">拖曳平移 · 滾輪縮放 · Home 重設</span>
        <span class="scale"><i id="scale-line"></i><span id="scale-label">X 軸 10 mm</span></span>
        <span class="note" id="geometry-note">mm 真實比例 · 機構為工程示意</span>
      </div>
    </section>
    <section class="dock card" aria-label="時間軸">
      <div class="transport">
        <button id="play" class="primary">${dt.play}<span>開始試驗</span></button>
        <button id="restart" class="tool" title="回到起點">${dt.restart}</button>
        <button id="step" class="tool" title="前進 0.01 秒">${dt.step}</button>
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
<dialog id="sources-dialog" class="dialog wide"><div class="dialog-head"><h2>參數來源與假設</h2><button data-close class="ghost">${dt.close}</button></div><p class="muted">「v1.0 更新」為本次查證後替換或新增的值；研究原檔 v0.3 不變。所有項目目前均未經實機驗證。</p><div class="table-scroll"><table><thead><tr><th>參數</th><th>值</th><th>類型</th><th>依據與出處</th></tr></thead><tbody id="source-rows"></tbody></table></div></dialog>
<dialog id="compare-dialog" class="dialog wide"><div class="dialog-head"><h2>熱源圖樣比較</h2><button data-close class="ghost">${dt.close}</button></div><div id="compare-body"></div></dialog>
<dialog id="scenarios-dialog" class="dialog wide"><div class="dialog-head"><h2>情境比較</h2><button data-close class="ghost">${dt.close}</button></div><div id="scenarios-body"></div></dialog>
<dialog id="optimize-dialog" class="dialog wide"><div class="dialog-head"><h2>自動最佳化（數值搜尋）</h2><button data-close class="ghost">${dt.close}</button></div><div id="optimize-body"></div></dialog>
<dialog id="help-dialog" class="dialog"><div class="dialog-head"><h2>使用說明</h2><button data-close class="ghost">${dt.close}</button></div><div id="help-body"></div></dialog>
<div id="toast" role="status"></div>`}const rr=1e3,Vi=150,bi=52,ua=14,ys=12,ar=26,Zu={q:{label:"出口流量",unit:"mL/s",key:"q",digits:3},output:{label:"累積出膠",unit:"mL",key:"output",digits:3},speed:{label:"移動速度",unit:"mm/s",key:"speed",digits:0},z:{label:"針嘴高度",unit:"mm",key:"z",digits:1}};function Xh(s){if(!(s>0))return 1;const e=10**Math.floor(Math.log10(s));for(const t of[1,1.2,1.5,2,2.5,3,4,5,6,8,10])if(t*e>=s)return t*e;return 10*e}function zy(s,e,t,n,i){var w;const r=Zu[t],a=e.frames,o=a.map(L=>L[r.key]),c=t==="q"?[e.Q]:[],l=((w=i==null?void 0:i.frames)==null?void 0:w.map(L=>L[r.key]))||[],h=Xh(Math.max(1e-6,...o,...c,...l)*1.05),u=t==="z"?Math.max(0,Math.min(...o)-1):0,d=Math.max(e.duration,(i==null?void 0:i.duration)||0),f=L=>bi+L/d*(rr-bi-ua),g=L=>Vi-ar-(L-u)/(h-u)*(Vi-ar-ys),_=Math.max(1,Math.floor(a.length/900)),m=L=>L.filter((U,V)=>V%_===0||V===L.length-1).map((U,V)=>`${V?"L":"M"}${f(U.t).toFixed(1)},${g(U[r.key]).toFixed(1)}`).join(""),p=m(a),x=[0,.25,.5,.75,1].map(L=>{const U=u+(h-u)*L;return`<line class="grid" x1="${bi}" x2="${rr-ua}" y1="${g(U)}" y2="${g(U)}"/><text class="tick" x="${bi-8}" y="${g(U)+4}" text-anchor="end">${U.toFixed(r.digits===0?0:h<1?2:1)}</text>`}).join(""),y=[],v=Xh(d/6);for(let L=0;L<=d+1e-9;L+=v)y.push(`<text class="tick" x="${f(L)}" y="${Vi-8}" text-anchor="middle">${+L.toFixed(2)}s</text>`);const S=e.ending,T=[["off",S.commandOff,"關膠"],["arrive",S.movementEnd,"到位"],["lift",S.liftStart,"抬針"],["exit",S.motionEnd,"退離完成"]].filter(([,L])=>Number.isFinite(L)).map(([L,U,V])=>`<line class="marker ${L}" x1="${f(U)}" x2="${f(U)}" y1="${ys}" y2="${Vi-ar}"><title>${V} ${U.toFixed(3)} s</title></line>`).join(""),R=d-S.motionEnd>.05&&S.motionEnd<e.duration?`<rect class="tail" x="${f(S.motionEnd)}" y="${ys}" width="${f(e.duration)-f(S.motionEnd)}" height="${Vi-ar-ys}"><title>動作已完成；之後只結算尾膠（離面出膠），不是機台等待時間</title></rect><text class="tail-label" x="${(f(S.motionEnd)+f(e.duration))/2}" y="${ys+13}" text-anchor="middle">尾膠結算 · 非等待</text>`:"",I=t==="q"?`<path class="command" d="M${bi},${g(e.Q)} H${f(S.commandOff)} V${g(0)} H${rr-ua}"/>`:"",b=i?`<path class="baseline" d="${m(i.frames)}"/>`:"";return s.setAttribute("viewBox",`0 0 ${rr} ${Vi}`),s.innerHTML=x+R+y.join("")+T+b+`<path class="area" d="${p} L${f(a.at(-1).t)},${g(u)} L${bi},${g(u)} Z"/><path class="series" d="${p}"/>`+I+`<line class="cursor" id="chart-cursor" x1="${f(n)}" x2="${f(n)}" y1="${ys-4}" y2="${Vi-ar}"/>`,{x:f,duration:d,toTime:L=>(L-bi)/(rr-bi-ua)*d}}function Hy(s,e,t){const n=s.querySelector("#chart-cursor");if(n&&e){const i=e.x(t);n.setAttribute("x1",i),n.setAttribute("x2",i)}}const oe=(s,e=document)=>e.querySelector(s),Jt=(s,e=document)=>[...e.querySelectorAll(s)],Dt=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ie=(s,e=3)=>Number.isFinite(s)?Number(s).toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e}):"—",Vy=s=>Number.isFinite(s)?+Number(s).toPrecision(6):s,Ju=.0689475729,Pr={get(s){try{return localStorage.getItem(s)}catch{return null}},set(s,e){try{localStorage.setItem(s,e)}catch{}}},Tc=["pressure","rpm","efficiency","delay","tauOn","tauOff","fill","residual","referenceRate","pressureExponent","viscosity","hoseId","hoseLength","reverseRpm","reverseDuration","density"],il=()=>({shape:"rectangle",width:30,depth:30,offsetX:0,offsetY:0,gap:fl(Xn,"assembly.gap"),cellSize:.5,power:fl(Xn,"thermal.power"),...nl,viscosity:null,yieldStress:null}),Gy=["gap","cellSize","power","airMode","pressKgf","pressSpeed","settleTime","viscosity","yieldStress"],Wy={compressible:"可壓縮氣泡",rigid:"剛性牆（v1.0）",vent:"全部排出"},Qu={compressible:"可壓縮",rigid:"剛性牆",vent:"全排出"},sl=()=>({pattern:"n",spacing:5,edgeInset:2,spiralShape:"auto",spiralDirection:"outside-in"}),E={config:null,run:null,frame:null,time:0,playing:!1,clock:null,tab:"equipment",chartType:"q",chart:null,pressureUnit:"psi",heat:il(),pattern:sl(),overrides:new Map,baseline:null,press:null,pressBaseline:null,pressAnim:null,tuneFactor:1.2,compare:null,busy:!1,goals:{...Ia,...qh("tim-goals")||{}},scenarios:qh("tim-scenarios")||[],optimize:null};function qh(s){try{return JSON.parse(Pr.get(s)||"null")}catch{return null}}oe("#app").innerHTML=By(Vs);const rl=Pr.get("tim-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=rl;function Nt(s,e=""){const t=oe("#toast");t.textContent=s,t.className=`visible ${e}`,clearTimeout(Nt.timer),Nt.timer=setTimeout(()=>t.className="",4200)}let et;try{et=new Ty(oe("#viewport"),{onScale(s,e){const t=[.5,1,2,5,10,20,50,100,200,500].find(n=>s*n/10>=36)??500;oe("#scale-line").style.width=`${Math.min(110,s*t/10)}px`,oe("#scale-label").textContent=`X 軸 ${t} mm`,oe("#scale-line").style.transform=`rotate(${e>90?e-180:e<-90?e+180:e}deg)`},onView:()=>Lr()}),et.setTheme(rl)}catch(s){throw oe("#viewport").innerHTML='<div class="webgl-error">無法啟動 3D 顯示，請使用啟用硬體加速的桌面瀏覽器。</div>',s}let Wn=null,$y=0;const wr=new Map;function ed(){try{Wn=new Worker(new URL(""+new URL("compute-worker-BwyHvsCT.js",import.meta.url).href,import.meta.url),{type:"module"}),Wn.onmessage=({data:s})=>{var t;const e=wr.get(s.id);if(e){if(s.progress!==void 0)return(t=e.progress)==null?void 0:t.call(e,s.progress,s.label);wr.delete(s.id),s.ok?e.resolve(s.result):e.reject(new Error(s.error))}},Wn.onerror=()=>Wn=null}catch{Wn=null}}ed();function Xy(){Wn==null||Wn.terminate();for(const s of wr.values())s.reject(new Error("已取消"));wr.clear(),ed()}const td=s=>({config:s.config,summary:{deposits:s.summary.deposits},path:s.path,gridStart:s.gridStart,cellLength:s.cellLength,maxHeight:s.maxHeight});function Na(s,e,t){return Wn?new Promise((n,i)=>{const r=++$y;wr.set(r,{resolve:n,reject:i,progress:t}),Wn.postMessage({id:r,type:s,payload:e})}):new Promise((n,i)=>setTimeout(()=>{try{s==="compress"?n(Fy(e.run,{...e.heat,frames:e.frames})):i(new Error("此瀏覽器不支援背景計算，無法執行圖樣比較"))}catch(r){i(r)}},30))}const ks=()=>E.config.architecture==="P300",al=()=>({shape:E.heat.shape,width:E.heat.width,depth:E.heat.depth,offsetX:E.heat.offsetX,offsetY:E.heat.offsetY,pattern:E.pattern.pattern,spacing:E.pattern.spacing,edgeInset:E.pattern.edgeInset,spiralShape:E.pattern.spiralShape,spiralDirection:E.pattern.spiralDirection});function nd(s){const e={...s,surfaceZ:s.fixtureHeight+s.thickness};return e.mode==="pattern"?e.pathSettings=al():delete e.pathSettings,e}function id(s="putty",e="R75"){return nd({...Jh(Xn,s,e),mode:"pattern"})}function an(s,{silent:e=!1}={}){try{const t=nd(s),n=xa(t);return E.config=t,E.overrides.set(t.profile,Object.fromEntries(Tc.map(i=>[i,t[i]]))),sd(n),!0}catch(t){return e||Nt(t.message,"error"),Ci(),!1}}function qy(s,e){const t=Jh(Xn,s,e),n=E.overrides.get(t.profile)||{},i=Object.fromEntries(Object.entries(E.config).filter(([a])=>!Tc.includes(a)&&!["material","architecture","profile"].includes(a))),r={...t,...i,...Object.fromEntries(Tc.map(a=>[a,n[a]??t[a]]))};r.material=s,r.architecture=e,r.profile=t.profile,s!==E.config.material&&(E.heat={...E.heat,viscosity:null,yieldStress:null}),an(r)||(oe("#sel-material")&&(oe("#sel-material").value=E.config.material),oe("#sel-arch")&&(oe("#sel-arch").value=E.config.architecture))}const Yy={tds:["TDS","tag-tds"],derived:["推導","tag-derived"],ai:["AI 初估","tag-ai"],geo:["幾何","tag-geo"],spec:["原廠","tag-tds"]};function Ye({bind:s,label:e,value:t,unit:n="",min:i,max:r,tag:a,hint:o,disabled:c,step:l="any"}){const[h,u]=Yy[a]||[a,"tag-ai"];return`<label class="field${c?" disabled":""}"><span class="lbl">${e}${a?`<em class="tag ${u}">${h}</em>`:""}</span><span class="input"><input type="number" data-bind="${s}" value="${Vy(t)}" min="${i}" max="${r}" step="${l}" ${c?"disabled":""} aria-label="${Dt(e)}"><b>${n}</b></span>${o?`<small>${o}</small>`:""}</label>`}function Ri({bind:s,id:e,label:t,value:n,options:i,hint:r}){return`<label class="field"><span class="lbl">${t}</span><select ${s?`data-bind="${s}"`:""} ${e?`id="${e}"`:""}>${i.map(([a,o])=>`<option value="${a}" ${String(a)===String(n)?"selected":""}>${o}</option>`).join("")}</select>${r?`<small>${r}</small>`:""}</label>`}const qn=(s,e,{open:t=!0,note:n}={})=>`<details class="group" ${t?"open":""}><summary>${s}</summary><div class="group-body">${e}${n?`<p class="note">${n}</p>`:""}</div></details>`;function jy(){const s=E.config,e=ks(),t=Wt[s.material],n=e?"理想容積計量":s.material==="putty"?"TDS 參考點 × 冪律管流":"常黏度 Poiseuille 圓管",i=e?`每轉 ${s.displacement} mL × 轉速 × 效率；滿腔與起停時間為假設。`:s.material==="putty"?`90 psi 時 75 g/min（TDS）；壓力冪次 m=${s.pressureExponent} 取自 Laird 點膠指南曲線形狀。Q ∝ P^m · d^(3+m) / L^m。`:"黏度 2,500,000 cP（TDS，Brookfield 2 rpm）暫作常數，不代表完整流變。",r=E.run?E.run.Q:0;return`
  <div class="pair">
    ${Ri({id:"sel-material",label:"膠材",value:s.material,options:[["putty","Laird Tputty 910"],["grease","Laird Tgrease 2500"]]})}
    ${Ri({id:"sel-arch",label:"出膠架構",value:s.architecture,options:[["R75","R75 氣壓 75cc"],["P300","P300 PCP"]]})}
  </div>
  <div class="material-card" style="--glue:#${t.color.toString(16).padStart(6,"0")}">
    <i></i><div><b>${t.name}</b><span>${t.kind}</span><span>k ${t.conductivity} W/m·K · 最小 BLT ${t.minBondLine*1e3} µm · ${t.density} g/cc · ${t.colorName}</span></div>
  </div>
  <div class="method"><span>${n}</span><strong>${ie(r,3)} <small>mL/s 穩態</small></strong><p>${i}</p></div>
  ${qn("驅動與針嘴",(e?Ye({bind:"c.rpm",label:"計量軸轉速",value:s.rpm,unit:"rpm",min:0,max:300,tag:"ai"})+Ye({bind:"c.efficiency",label:"容積效率",value:s.efficiency,unit:"",min:0,max:1,tag:"ai"}):`<div class="with-btn">${Ye({bind:"c.pressure",label:"驅動表壓",value:E.pressureUnit==="bar"?s.pressure*Ju:s.pressure,unit:E.pressureUnit,min:0,max:E.pressureUnit==="bar"?6.89475729:100,tag:"ai",hint:"控制器上限 100 psi（Performus X100 額定）"})}<button class="chip-btn" id="pressure-unit">${E.pressureUnit==="psi"?"bar":"psi"}</button></div>`)+Ye({bind:"c.diameter",label:"虛擬針嘴內徑",value:s.diameter,unit:"mm",min:.2,max:8,tag:"geo",hint:e?"只影響持膠量與外觀":"0.125 in = 3.175 mm（指南曲線用嘴）"})+Ye({bind:"c.nozzleLength",label:"等效直管長",value:s.nozzleLength,unit:"mm",min:1,max:100,tag:"ai",hint:e?"只影響持膠量":"流量基準長度，非針嘴總長"}))}
  ${qn("響應與材料模型",Ye({bind:"c.delay",label:"起膠延遲",value:s.delay,unit:"s",min:0,max:2,tag:"ai"})+Ye({bind:"c.tauOn",label:e?"起停時間常數":"上升時間常數",value:s.tauOn,unit:"s",min:.001,max:2,tag:"ai"})+(e?"":Ye({bind:"c.tauOff",label:"卸壓下降時間常數",value:s.tauOff,unit:"s",min:.001,max:2,tag:"ai"}))+(!e&&s.material==="putty"?Ye({bind:"c.pressureExponent",label:"壓力冪次 m",value:s.pressureExponent,unit:"",min:.1,max:4,tag:"derived",hint:"指南曲線 20–100 psi 擬合 2.73；設 1 回到 v0.x 線性"})+Ye({bind:"c.referenceRate",label:"90 psi 參考流率",value:s.referenceRate,unit:"mL/s",min:0,max:10,tag:"tds",hint:"75 g/min ÷ 3.2 g/cc；指南圖讀約 75 cc/min，單位待 Laird 確認"}):"")+(!e&&s.material==="grease"?Ye({bind:"c.viscosity",label:"等效黏度",value:s.viscosity,unit:"Pa·s",min:1,max:1e5,tag:"tds"}):""),{open:!1,note:"起停常數為 AI 初估；未含溫度效應（指南：低於 23 °C 流率下降，60–80 °C 加熱可改善）。"})}
  ${qn("膠筒與預填管路",Ye({bind:"c.fill",label:"膠筒初始裝填",value:s.fill,unit:"mL",min:s.residual,max:e?300:75,tag:s.material==="putty"?"tds":"ai",hint:s.material==="putty"?e?"300cc 鋁筒裝填 300 cc（960 g）":"75cc EFD 裝填 56 cc（179 g）":`Tgrease 實際包材：${Wt.grease.packaging}`})+Ye({bind:"c.residual",label:"不可用殘量",value:s.residual,unit:"mL",min:0,max:s.fill,tag:"ai"})+(e?Ye({bind:"c.hoseId",label:"供料管內徑",value:s.hoseId,unit:"mm",min:1,max:25,tag:"ai"})+Ye({bind:"c.hoseLength",label:"供料管長",value:s.hoseLength,unit:"mm",min:0,max:5e3,tag:"ai"}):""),{open:!1,note:e?"管路已預填，只計入持膠量；未求解壓降。畫面管路為示意。":"氣室與氣管未分開求解；畫面氣管與控制器為示意。"})}`}function Ky(){var r;const s=E.heat,t=(s.shape==="circle"?Math.PI*s.width**2/4:s.width*s.depth)*s.gap/1e3,n=((r=E.run)==null?void 0:r.summary.deposited)??0,i=t>0?n/t:0;return`
  <p class="lead">熱源（元件接觸面）設定同時決定「依熱源」路徑與壓合／熱阻估算。偏移以工件中心為原點。</p>
  ${Ri({bind:"h.shape",label:"熱源形狀",value:s.shape,options:[["rectangle","矩形"],["circle","圓形"]]})}
  <div class="pair">
    ${Ye({bind:"h.width",label:s.shape==="circle"?"直徑":"長 X",value:s.width,unit:"mm",min:1,max:500,tag:"ai"})}
    ${s.shape==="circle"?"":Ye({bind:"h.depth",label:"寬 Y",value:s.depth,unit:"mm",min:1,max:500,tag:"ai"})}
  </div>
  <div class="pair">
    ${Ye({bind:"h.offsetX",label:"中心 X",value:s.offsetX,unit:"mm",min:-500,max:500})}
    ${Ye({bind:"h.offsetY",label:"中心 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}
  </div>
  <div class="pair">
    ${Ye({bind:"h.gap",label:"組裝間隙 BLT",value:s.gap,unit:"mm",min:.02,max:10,tag:"ai",hint:`${Wt[E.config.material].name} 最小 ${Wt[E.config.material].minBondLine} mm`})}
    ${Ye({bind:"h.power",label:"元件功耗",value:s.power,unit:"W",min:0,max:1e4,tag:"ai"})}
  </div>
  <div class="volume-meter ${i<1?"low":i>1.6?"high":"ok"}">
    <div><span>熱源間隙體積</span><b>${ie(t,3)} mL</b></div>
    <div><span>目前沉積</span><b>${ie(n,3)} mL</b></div>
    <div><span>比值</span><b>${ie(i,2)}×</b></div>
    <i style="--w:${Math.min(100,i/2*100)}%"></i><em class="tick1"></em>
  </div>
  <div class="tune">
    ${Ye({bind:"x.tuneFactor",label:"目標膠量係數",value:E.tuneFactor,unit:"× 間隙體積",min:.3,max:5,tag:"ai",hint:"考慮溢膠與夾氣的餘量；1.2 為比較起點"})}
    <button class="secondary" id="tune">${E.config.mode==="point"?"自動調整開膠時間":"自動調整移動速度"}</button>
  </div>
  <div class="actions">
    <button class="primary" id="press">${dt.press}<span>模擬壓合</span></button>
    <button class="secondary" id="compare">${dt.compare}<span>比較所有圖樣</span></button>
  </div>
  <button class="secondary wide-btn" id="optimize">${dt.spark}<span>自動最佳化目前圖樣</span></button>
  ${qn("壓合條件（透明板＋墊片）",Zy(s),{open:!0,note:"定力壓下，到墊片（組裝間隙）即停；之後膠壓消退，被壓縮的氣泡回脹到降伏應力擋住為止。實際手壓若先快後慢，壓合中的氣泡壓縮程度會不同，最終回脹結果影響較小。"})}
  ${qn("估算網格",Ye({bind:"h.cellSize",label:"網格解析度",value:s.cellSize,unit:"mm",min:.2,max:5,tag:"ai",hint:"越小越細，計算時間增加；上限 90,000 格。夾氣數量對網格敏感，比較圖樣請用相同網格"}),{open:!1})}
  <p class="note">壓合採平行板 Hele-Shaw 擠壓：定力壓到墊片，被膠包圍的空氣依所選方式處理（預設可壓縮：pV = 常數、可隨膠流移動、膠牆變薄時排出）。熱阻 =（間隙 ÷ k + TDS 推算接觸熱阻）÷ 濕潤面積。皆未經透明板實測校準。</p>`}function Zy(s){const e=E.config,t=Yu(e,s),n=e.material==="grease";return`${Ri({bind:"h.airMode",label:"夾氣處理",value:s.airMode,options:[["compressible","可壓縮氣泡（會壓縮、遷移、排出）"],["rigid","剛性牆（v1.0 舊模型）"],["vent","全部排出（覆蓋率上限）"]]})}
  <div class="pair">
    ${Ye({bind:"h.pressKgf",label:"壓合力",value:s.pressKgf,unit:"kgf",min:.01,max:5e3,tag:"ai",hint:"手壓或治具的力"})}
    ${Ye({bind:"h.pressSpeed",label:"下降速度上限",value:s.pressSpeed,unit:"mm/s",min:.01,max:100,tag:"ai",hint:"剛接觸時的壓板速度"})}
  </div>
  <div class="pair">
    ${Ye({bind:"h.viscosity",label:"有效黏度",value:t.viscosity,unit:"Pa·s",min:1,max:1e7,tag:n?"tds":"derived",hint:n?"TDS Brookfield 2 rpm（同設備頁）":"由針嘴冪律擬合推算 @1 s⁻¹"})}
    ${Ye({bind:"h.yieldStress",label:"降伏應力",value:t.yieldStress,unit:"Pa",min:0,max:1e6,tag:"ai",hint:"公開散熱膏實測約 7–30 Pa"})}
  </div>
  ${Ye({bind:"h.settleTime",label:"靜置觀察時間",value:s.settleTime,unit:"s",min:0,max:3600,tag:"ai",hint:"壓到墊片後氣泡回脹的時間；建議與透明板拍照時間一致"})}
  ${s.viscosity!=null||s.yieldStress!=null?'<button class="chip-btn" id="rheo-reset">恢復材料預設黏度／降伏應力</button>':""}`}function Jy(){var i,r,a;const s=E.config,e=E.pattern;let n=`<div class="seg full" role="group" aria-label="路徑模式">${[["pattern","依熱源"],["line","直線"],["point","單點"]].map(([o,c])=>`<button data-mode="${o}" class="${s.mode===o?"active":""}">${c}</button>`).join("")}</div>`;return s.mode==="pattern"?(n+=`<div class="patterns">${Object.keys(zn).map(o=>`<button data-pattern="${o}" class="${e.pattern===o?"active":""}" title="${zn[o]}"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${Ku[o]}</svg><span>${zn[o]}</span></button>`).join("")}</div>`,e.pattern==="spiral"&&(n+=`<div class="pair">${Ri({bind:"p.spiralShape",label:"螺旋形狀",value:e.spiralShape,options:[["auto","依熱源"],["square","方形"],["round","圓形"]]})}${Ri({bind:"p.spiralDirection",label:"起點",value:e.spiralDirection,options:[["outside-in","外向內"],["inside-out","中心向外"]]})}</div>`),n+=`<div class="pair">${Ye({bind:"p.spacing",label:"路徑間距",value:e.spacing,unit:"mm",min:.2,max:1e3,tag:"ai"})}${Ye({bind:"p.edgeInset",label:"邊界內縮",value:e.edgeInset,unit:"mm",min:0,max:500,tag:"ai"})}</div>`,n+=`<p class="note">路徑長 ${ie((i=E.run)==null?void 0:i.pathLength,1)} mm${(a=(r=E.run)==null?void 0:r.motion)!=null&&a.corners?` · ${E.run.motion.corners} 個減速轉角（最低 ${ie(E.run.motion.slowestCorner,1)} mm/s）`:""}。內縮只限制針尖中心；Laird／Parker 指南提醒蛇形、螺旋、外框較易夾氣。</p>`):s.mode==="line"?n+=`<div class="pair">${Ye({bind:"c.lineLength",label:"路徑長度",value:s.lineLength,unit:"mm",min:1,max:250,tag:"ai"})}${Ye({bind:"c.offsetX",label:"中心 X",value:s.offsetX,unit:"mm",min:-500,max:500})}</div>${Ye({bind:"c.offsetY",label:"中心 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}`:n+=`${Ye({bind:"c.gateDuration",label:"開膠時間",value:s.gateDuration,unit:"s",min:.001,max:10,tag:"ai"})}<div class="pair">${Ye({bind:"c.offsetX",label:"點位 X",value:s.offsetX,unit:"mm",min:-500,max:500})}${Ye({bind:"c.offsetY",label:"點位 Y",value:s.offsetY,unit:"mm",min:-500,max:500})}</div>`,s.mode!=="point"&&(n+=qn("運動",`<div class="pair">${Ye({bind:"c.speed",label:"設定速度",value:s.speed,unit:"mm/s",min:1,max:800,tag:"ai"})}${Ye({bind:"c.acceleration",label:"加速度",value:s.acceleration,unit:"mm/s²",min:1,max:1e4,tag:"ai"})}</div>`+(s.mode==="pattern"?Ri({bind:"c.cornerMode",label:"轉角速度",value:s.cornerMode,options:[["junction","依轉角減速（junction deviation）"],["off","不減速（v0.7 對照）"]]})+(s.cornerMode==="junction"?Ye({bind:"c.junctionDeviation",label:"轉角偏差",value:s.junctionDeviation,unit:"mm",min:.001,max:5,tag:"ai",hint:"越小轉角越慢、轉角積膠越多"}):""):""))),n+=Ye({bind:"c.standoff",label:"針嘴離面高度",value:s.standoff,unit:"mm",min:.1,max:20,tag:"ai",hint:"只做間距／干涉提示"}),n}function Qy(){const s=E.config,e=ks();let t="";return s.mode!=="point"&&(t+=qn("提前關膠",Ye({bind:"c.shutoffDistance",label:"終點前關膠距離",value:s.shutoffDistance,unit:"mm",min:0,max:250,tag:"ai"})+`<div class="seg full presets"><button data-shutoff="0">未補償 0 mm</button><button data-shutoff="${pr.value}">初估 ${pr.value} mm</button></div>`,{note:"先關膠、針嘴繼續走到終點；距離依當前加減速曲線換算成時間。提前過多會欠膠。"})),t+=qn("退離動作",Ri({bind:"c.endMotion",label:"退離方式",value:s.endMotion,options:[["vertical","垂直抬針"],["diagonal","邊升邊回退"],["liftThenBack","先抬高再回退"],["legacy","v0.2 尾膠結算後抬針（對照）"]]})+(s.endMotion==="legacy"?"":`<div class="with-btn">${Ye({bind:"c.endDwell",label:"終點停留",value:s.endDwell,unit:"s",min:0,max:5,tag:"ai"})}<button class="chip-btn" data-dwell="0.3" title="Laird 910 指南：小點黏針時，移動前加 0.3–0.5 s 等待">指南 0.3 s</button></div>`)+`<div class="pair">${Ye({bind:"c.liftSpeed",label:"抬針速度",value:s.liftSpeed,unit:"mm/s",min:.1,max:200,tag:"ai"})}${Ye({bind:"c.liftDistance",label:"抬針高度",value:s.liftDistance,unit:"mm",min:.1,max:50,tag:"ai"})}</div>`+(["diagonal","liftThenBack"].includes(s.endMotion)&&s.mode!=="point"?`<div class="pair">${Ye({bind:"c.backtrackDistance",label:"回退距離",value:s.backtrackDistance,unit:"mm",min:0,max:50,tag:"ai"})}${Ye({bind:"c.backtrackSpeed",label:"回退速度",value:s.backtrackSpeed,unit:"mm/s",min:.1,max:200,tag:"ai"})}</div>`:""),{note:"Laird 910 指南建議小點黏針時「先左右移動再抬起」並停留 0.3–0.5 s；本模型只改軌跡與時序，不預測拉絲與落點。"}),t+=e?qn("PCP 反轉回吸",`<div class="pair">${Ye({bind:"c.reverseDuration",label:"反轉時間",value:s.reverseDuration,unit:"s",min:0,max:2,tag:"ai",hint:"0 = 停用"})}${Ye({bind:"c.reverseRpm",label:"反轉轉速",value:s.reverseRpm,unit:"rpm",min:0,max:300,tag:"ai"})}</div><button class="chip-btn wide" id="reverse-example">套用比較值 30 rpm / 0.05 s</button>`,{note:"只回收未出嘴的暫存量並獨立記帳；不吸回工件上的膠，未求解負壓或斷絲。"}):'<p class="note">氣壓式關閉後以「卸壓下降時間常數」近似；不提供螺桿反轉。</p>',t}function eM(){var t;const s=E.config,e=s.workpieceKind!=="plate";return`
  <div class="pair">${Ye({bind:"c.width",label:"工件長 X",value:s.width,unit:"mm",min:1,max:1e3,tag:"geo",disabled:e})}${Ye({bind:"c.depth",label:"工件寬 Y",value:s.depth,unit:"mm",min:1,max:1e3,tag:"geo",disabled:e})}</div>
  <div class="pair">${Ye({bind:"c.thickness",label:"厚度",value:s.thickness,unit:"mm",min:.1,max:200,tag:"geo",disabled:e})}${Ye({bind:"c.fixtureHeight",label:"治具支承高度",value:s.fixtureHeight,unit:"mm",min:0,max:100,tag:"ai"})}</div>
  ${qn("匯入工件",`<div class="pair"><label class="field"><span class="lbl">STL 單位</span><select id="import-unit"><option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option><option value="inch">inch</option></select></label><label class="field"><span class="lbl">STL 向上</span><select id="import-up"><option>Z</option><option>Y</option></select></label></div>
    <label class="file-button">載入 STL / GLB / glTF<input id="workpiece-file" type="file" accept=".stl,.glb,.gltf"></label>
    ${e?`<p class="note">${Dt(((t=s.workpieceFile)==null?void 0:t.name)||"")} · ${ie(s.width,2)} × ${ie(s.depth,2)} × ${ie(s.thickness,2)} mm</p><button class="chip-btn wide" id="clear-workpiece">恢復虛擬平板</button>`:""}`,{open:e,note:"GLB／glTF 依規格以 m、Y 向上換算；STL 需指定單位與上方向。點膠面取上方水平參考面，未處理孔洞、曲面與碰撞。"})}
  <p class="note">預設 150 × 100 × 5 mm 為虛擬壓鑄鋁平板（示意 RRU 腔體一角），非客戶工件。</p>`}const tM={equipment:jy,heat:Ky,path:Jy,ending:Qy,workpiece:eM};function Ci(){const s=oe("#tab-body"),e=s.scrollTop,t=Jt("details.group",s).map(n=>n.open);s.innerHTML=tM[E.tab](),Jt("details.group",s).forEach((n,i)=>t[i]!==void 0&&(n.open=t[i])),s.scrollTop=e,Jt("[data-tab]").forEach(n=>{n.classList.toggle("active",n.dataset.tab===E.tab),n.setAttribute("aria-selected",n.dataset.tab===E.tab)}),sM()}Jt("[data-tab]").forEach(s=>s.addEventListener("click",()=>{E.tab=s.dataset.tab,oe("#tab-body").scrollTop=0,Ci()}));oe("#tab-body").addEventListener("change",s=>{const e=s.target;if(e.id==="sel-material"||e.id==="sel-arch")return qy(oe("#sel-material").value,oe("#sel-arch").value);if(e.id==="workpiece-file")return iM(e);const t=e.dataset.bind;if(!t)return;const[n,i]=t.split(".");let r=e.value;if(e.type==="number"){if(!e.value.trim()||!e.checkValidity())return Nt("請輸入欄位範圍內的數值","error"),Ci();r=Number(e.value)}if(n==="x"){E.tuneFactor=r;return}if(n==="c"){i==="pressure"&&E.pressureUnit==="bar"&&(r/=Ju);const c={...E.config,[i]:r};return i==="tauOn"&&ks()&&(c.tauOff=r),an(c)}const a=n==="h"?"heat":"pattern",o=E[a];if(E[a]={...o,[i]:r},n==="h"&&Gy.includes(i))return ad(),Ci();an(E.config)||(E[a]=o,Ci())});oe("#tab-body").addEventListener("click",s=>{const e=s.target.closest("button");if(e){if(e.dataset.mode)return an({...E.config,mode:e.dataset.mode});if(e.dataset.pattern){const t=E.pattern;E.pattern={...E.pattern,pattern:e.dataset.pattern},an(E.config)||(E.pattern=t);return}if(e.dataset.shutoff!==void 0)return an({...E.config,shutoffDistance:Number(e.dataset.shutoff)});if(e.dataset.dwell!==void 0)return an({...E.config,endDwell:Number(e.dataset.dwell)});switch(e.id){case"pressure-unit":return E.pressureUnit=E.pressureUnit==="psi"?"bar":"psi",Ci();case"reverse-example":return an({...E.config,reverseRpm:30,reverseDuration:.05});case"tune":return nM();case"optimize":return dM();case"rheo-reset":return E.heat={...E.heat,viscosity:null,yieldStress:null},ad(),Ci();case"press":return od();case"compare":return hl();case"clear-workpiece":return et.clearImport(),an({...E.config,width:150,depth:100,thickness:5,workpieceKind:"plate",workpieceFile:null})}}});function nM(){const s=E.heat,t=(s.shape==="circle"?Math.PI*s.width**2/4:s.width*s.depth)*s.gap/1e3*E.tuneFactor;try{const n=Oy(E.config,t);an(n.config),Nt(n.reached?`已調整${n.key==="speed"?`移動速度為 ${ie(n.config.speed,1)} mm/s`:`開膠時間為 ${ie(n.config.gateDuration,3)} s`}，沉積 ${ie(E.run.summary.deposited,3)} mL（目標 ${ie(t,3)}）`:`已達設備限制，最接近 ${ie(E.run.summary.deposited,3)} mL（目標 ${ie(t,3)}）；請改壓力、轉速或圖樣`,n.reached?"ok":"error")}catch(n){Nt(n.message,"error")}}async function iM(s){const e=s.files[0];if(e){E.playing=!1;try{const t=await et.importFile(e,oe("#import-unit").value,oe("#import-up").value);an({...E.config,...t})&&Nt("工件已載入。請核對尺寸；點膠使用上方水平參考面。","ok")}catch(t){Nt(t.message,"error")}s.value=""}}oe("#defaults").onclick=()=>{et.clearImport(),E.heat=il(),E.pattern=sl(),E.overrides.delete(E.config.profile),an(id(E.config.material,E.config.architecture)),Nt("已恢復此情境的研究預設")};function sd(s){pi(!1),E.playing=!1,E.time=0,E.run=s,E.frame=s.frames[0],et.rebuild({...E.config,heatSource:{...E.heat}},s),et.setOverlayVisibility({heatSource:oe("#show-heat").checked,exitPath:oe("#show-exit").checked,plannedPath:oe("#show-planned").checked}),oe("[data-view=feed]").disabled=!ks(),oe("#scrubber").max=String(Math.ceil(s.duration*1e3)),rM(),ol(),Ci(),Bs(),Ln(),Lr()}function sM(){const s=E.config,e=s.mode==="pattern"?`依熱源 · ${zn[E.pattern.pattern]}`:s.mode==="line"?"直線":"單點",t=s.architecture==="P300"?`${ie(s.rpm,0)} rpm`:`${ie(s.pressure,0)} psi`;oe("#scenario").innerHTML=[Wt[s.material].name,s.architecture==="P300"?"P300 PCP":"R75 氣壓",e,t,s.mode==="point"?`${ie(s.gateDuration,2)} s`:`${ie(s.speed,0)} mm/s`].map((n,i)=>`<span class="${i===0?"glue-chip":""}" ${i===0?`style="--glue:#${Wt[s.material].color.toString(16).padStart(6,"0")}"`:""}>${Dt(n)}</span>`).join("")}function rM(){const s=E.run,e=s.ending;oe("#marks").innerHTML=[["off",e.commandOff,"關膠"],["arrive",e.movementEnd,"到位"],["lift",e.liftStart,"抬針"],["exit",e.motionEnd,"退離"]].map(([t,n,i])=>`<button class="mark ${t}" style="left:${n/s.duration*100}%" data-seek="${n}" title="${i} ${ie(n,3)} s"><span>${i}</span></button>`).join("")}oe("#marks").addEventListener("click",s=>{const e=s.target.closest("[data-seek]");e&&(pi(),E.playing=!1,E.time=Math.min(E.run.duration,Number(e.dataset.seek)+1e-6),Ln())});function ol(){var s;E.chart=zy(oe("#chart"),E.run,E.chartType,E.time,(s=E.baseline)!=null&&s.run&&E.baseline.run.frames?E.baseline.run:null),oe("#chart-unit").textContent=Zu[E.chartType].unit,oe("#legend-command").hidden=E.chartType!=="q",oe("#legend-base").hidden=!E.baseline}Jt("[data-chart]").forEach(s=>s.addEventListener("click",()=>{E.chartType=s.dataset.chart,Jt("[data-chart]").forEach(e=>e.classList.toggle("active",e===s)),ol()}));oe("#chart").addEventListener("click",s=>{const e=oe("#chart").getBoundingClientRect(),t=E.chart.toTime((s.clientX-e.left)/e.width*1e3);pi(),E.playing=!1,E.time=Math.max(0,Math.min(E.run.duration,t)),Ln()});function xn(s,e,t,n="",i=""){return`<div class="kpi ${i}"><span>${s}</span><b>${e}<small>${t}</small></b>${n?`<em>${n}</em>`:""}</div>`}function aM(s){if(!s)return"";const e=s.airMode==="compressible",t=e?xn("氣泡留下",`${s.remaining}`,"個",s.sealed?`封住 ${s.sealed} 次 · 排出 ${s.vented} 次${s.peakBubbleKPa?` · 壓合中最高 ${ie(s.peakBubbleKPa,0)} kPa`:""}`:"壓合過程沒有封住空氣",s.remaining?"warn":"good"):xn("氣泡","—","",s.airMode==="rigid"?"剛性牆：封住即凍結":"假設全部排出"),n=e?xn("靜置回脹",ie(s.relaxTime,s.relaxTime<10?1:0),"s",s.volumeRatio!=null?`剩餘氣泡 = 1 atm 體積 ${ie(s.volumeRatio*100,0)}%${s.settled?"":" · 仍在回脹"}`:"無剩餘氣泡",s.settled?"":"warn"):xn("靜置回脹","—","","此模式不計");return`<div class="kpis three">
    ${xn("壓到墊片",ie(s.pressTime,s.pressTime<10?1:0),"s",`${ie(s.forceKgf,1)} kgf · 座落 ${ie(s.seatPressureKPa,0)} kPa`)}
    ${t}
    ${n}
  </div>`}function Bs(){var f,g;const s=E.run,e=E.config,t=s.summary,n=s.ending,i=E.heat,a=(i.shape==="circle"?Math.PI*i.width**2/4:i.width*i.depth)*i.gap/1e3,o=(f=E.press)==null?void 0:f.result.summary,c=(g=E.press)==null?void 0:g.stale,l=n.endToMiddleRatio,h=_=>_>=95?"good":_>=80?"warn":"bad",u=_=>{const p=2*Math.PI*34;return`<svg viewBox="0 0 84 84" class="ring ${h(_)}"><circle cx="42" cy="42" r="34" class="track"/><circle cx="42" cy="42" r="34" class="val" stroke-dasharray="${Math.min(100,_)/100*p} ${p}" transform="rotate(-90 42 42)"/><text x="42" y="46" text-anchor="middle">${ie(_,1)}%</text></svg>`},d=[...s.warnings,...E.press&&!c?E.press.result.warnings:[]];oe("#results").innerHTML=`
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">完整試驗預估</span><span class="pill">${Dt(e.profile)}</span></div>
    <div class="hero"><b>${ie(t.deposited,3)}</b><span>mL 工件沉積</span><em>${ie(t.deposited*e.density,3)} g · 出口總計 ${ie(t.output,3)} mL</em></div>
    <div class="kpis">
      ${xn("熱源需求比",ie(a>0?t.deposited/a:0,2),"×",`需 ${ie(a,3)} mL`,a>0&&t.deposited/a<1?"bad":"")}
      ${xn("開膠時間",ie(s.gate,2),"s",`動作完成 ${ie(n.motionEnd,2)} s`)}
      ${xn("膠高 / 寬",`${ie(t.maxHeight,2)} / ${ie(t.maxWidth,1)}`,"mm",`針距 ${ie(e.standoff,1)} mm`,t.maxHeight>e.standoff?"warn":"")}
      ${xn("末段 / 中段",l===null?"—":ie(l,2),"×","0.5–1.5 為 AI 比較帶",l!==null&&(l<.5||l>1.5)?"warn":"")}
    </div>
  </section>
  <section class="card-sec press-sec">
    <div class="sec-head"><span class="eyebrow">壓合 · 熱阻估算</span>${E.press?`<span class="pill ${c?"pill-warn":""}">${c?"設定已變更":`${ie(E.press.settings.gap,2)} mm · ${Qu[E.press.settings.airMode]}`}</span>`:""}</div>
    ${o&&!c?`<div class="press-grid">${u(o.coveredPercent)}<div class="press-sum"><b>熱源等效覆蓋</b><span>沉積 ${ie(o.depositedMl,3)} mL = 間隙體積 ${ie(o.volumeRatio,2)}×</span><span>${Dt(o.material)} · k ${o.thermal.conductivity} W/m·K</span></div></div><div class="kpis">
          ${xn("夾氣區",o.voidCount,"處",o.voidCount?`${ie(o.voidAreaMm2,1)} mm² · ${ie(o.voidPercent,1)}%`:"未偵測到",o.voidCount?"bad":"good")}
          ${xn("溢出熱源",ie(o.squeezeOutMm,1),"mm",`熱源外 ${ie(o.outsideMl,3)} mL`,o.squeezeOutMm>3?"warn":"")}
          ${xn("TIM 溫升",ie(o.thermal.rise,2),"°C",`滿覆蓋 ${ie(o.thermal.idealRise,2)} °C @ ${ie(o.thermal.power,0)} W`,o.thermal.rise>o.thermal.idealRise*1.1?"warn":"")}
          ${xn("熱阻",ie(o.thermal.resistance,4),"K/W",`θ ${ie(o.thermal.impedanceCm2,3)} °C·cm²/W`)}
        </div>
        ${aM(o.press)}
        <div class="press-actions"><button class="chip-btn" id="press-replay">${dt.play}重播壓合</button><button class="chip-btn" id="press-save">保存壓合基準</button><button class="chip-btn" id="scenario-save">${dt.save}存成情境</button></div>
        ${E.pressBaseline?`<div class="compare-box"><b>壓合基準 → 目前</b><p>覆蓋 ${ie(E.pressBaseline.summary.coveredPercent,1)}% → ${ie(o.coveredPercent,1)}%　夾氣 ${E.pressBaseline.summary.voidCount} → ${o.voidCount}　溫升 ${ie(E.pressBaseline.summary.thermal.rise,2)} → ${ie(o.thermal.rise,2)} °C</p><small>${Dt(E.pressBaseline.describe)}</small></div>`:""}`:`<div class="cta"><p>${c?"熱源或點膠設定已變更，請重新模擬。":"以完整試驗的沉積分布估算壓合覆蓋、夾氣與熱阻。"}</p><button class="primary" id="press-cta">${dt.press}<span>模擬壓合</span></button><button class="secondary" id="compare-cta">${dt.compare}<span>比較所有圖樣</span></button><button class="secondary" id="scenario-save-cta">${dt.save}<span>存成情境（自動壓合）</span></button></div>`}
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">即時帳目</span><span class="pill mono" id="led-t">t = 0.000 s</span></div>
    <dl class="ledger">
      <div><dt>TCP X / Y / Z</dt><dd id="led-xyz"></dd></div>
      <div><dt>移動速度</dt><dd id="led-v"></dd></div>
      <div><dt>膠筒剩餘</dt><dd id="led-rem"></dd></div>
      <div><dt>工件沉積</dt><dd id="led-dep"></dd></div>
      <div><dt>離面後出膠（形狀未定）</dt><dd id="led-off"></dd></div>
      ${ks()?'<div><dt>PCP 暫存 / 回收</dt><dd id="led-pend"></dd></div>':""}
      <div><dt>預填固定持膠</dt><dd id="led-fixed"></dd></div>
      <div><dt>體積對帳誤差</dt><dd id="led-bal"></dd></div>
    </dl>
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">收尾時序</span></div>
    <ol class="timeline">
      <li class="off"><b>${ie(n.commandOff,3)} s</b>關膠指令</li>
      <li class="arrive"><b>${ie(n.movementEnd,3)} s</b>到達終點</li>
      <li class="lift"><b>${ie(n.liftStart,3)} s</b>開始抬針</li>
      <li class="exit"><b>${ie(n.motionEnd,3)} s</b>退離完成</li>
    </ol>
    <p class="note">停移後流出 ${ie(n.afterStopVolume*1e3,2)} µL（${ie(n.afterStopPercent,1)}%）；其中離面後 ${ie(t.offSurface*1e3,2)} µL 未加入膠形。${ks()&&n.reverseStart!==null?`回收暫存 ${ie(t.recovered*1e3,2)} µL。`:""}</p>
  </section>
  <details class="card-sec warnings" ${d.length>4?"":"open"}><summary><span class="eyebrow">提醒與模型界線</span><span class="count">${d.length}</span></summary>${d.map(_=>`<p>${Dt(_)}</p>`).join("")}</details>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">基準比較</span><button class="chip-btn" id="save-baseline">保存目前為基準</button></div>
    ${oM()}
  </section>
  <section class="card-sec exports">
    <button class="chip-btn" id="export-json">${dt.download}配置 JSON</button>
    <button class="chip-btn" id="export-csv">${dt.download}結果 CSV</button>
    <button class="chip-btn" id="export-image">${dt.download}畫面 PNG</button>
  </section>
  <p class="fineprint">工程假設、未經實機校準；23 °C 參考條件。結果供方案相對比較，不能作為量產配方或驗收依據。</p>`}function cl(s,e){var n,i;const t=s.mode==="pattern"?`${zn[(n=s.pathSettings)==null?void 0:n.pattern]||""}（間距 ${(i=s.pathSettings)==null?void 0:i.spacing} mm）`:s.mode==="line"?`直線 ${s.lineLength} mm`:`單點 ${s.gateDuration} s`;return`${Wt[s.material].name} · ${s.architecture} · ${t} · ${s.architecture==="P300"?`${s.rpm} rpm`:`${ie(s.pressure,1)} psi`} · ${s.speed} mm/s${e?` · 熱源 ${e.width}${e.shape==="circle"?" Ø":` × ${e.depth}`} mm / ${e.gap} mm`:""}`}function oM(){var i,r;const s=E.baseline;if(!s)return'<p class="note">保存基準後再調整參數，比較沉積量與配置差異；流量曲線會疊上基準。</p>';const e=E.run.summary.deposited-s.summary.deposited,t=Object.keys(E.config).filter(a=>typeof E.config[a]!="object"&&E.config[a]!==s.config[a]);for(const a of new Set([...Object.keys(E.config.pathSettings||{}),...Object.keys(s.config.pathSettings||{})]))((i=E.config.pathSettings)==null?void 0:i[a])!==((r=s.config.pathSettings)==null?void 0:r[a])&&t.push("pathSettings."+a);const n=(a,o)=>{var c;return o.startsWith("pathSettings.")?((c=a.pathSettings)==null?void 0:c[o.slice(13)])??"—":a[o]};return`<div class="compare-box"><div class="delta"><span>${ie(s.summary.deposited,3)} → ${ie(E.run.summary.deposited,3)} mL</span><b class="${e>=0?"up":"down"}">${e>=0?"+":""}${ie(e,3)} mL</b></div>
    <details><summary>${t.length?`${t.length} 個欄位不同`:"與基準配置相同"}</summary>${t.map(a=>`<p><code>${Dt(a)}</code> ${Dt(n(s.config,a))} → ${Dt(n(E.config,a))}</p>`).join("")||"<p>無</p>"}</details></div>`}oe("#results").addEventListener("click",s=>{const e=s.target.closest("button");if(e)switch(e.id){case"press-cta":return od();case"compare-cta":return hl();case"press-replay":return ll(!0);case"scenario-save":case"scenario-save-cta":return hM();case"press-save":return E.pressBaseline={summary:structuredClone(E.press.result.summary),describe:cl(E.config,E.press.settings)},Nt("已保存壓合基準","ok"),Bs();case"save-baseline":return E.baseline={config:structuredClone(E.config),summary:structuredClone(E.run.summary),run:{frames:E.run.frames.map(t=>({t:t.t,q:t.q,output:t.output,speed:t.speed,z:t.z})),duration:E.run.duration}},Nt("已保存完整試驗結果為基準","ok"),ol(),Bs();case"export-json":return Er(JSON.stringify(md(),null,2),"TIM_工程假設_試驗配置.json","application/json");case"export-csv":return pM();case"export-image":return mM()}});function Ln(){const s=E.run,e=E.frame=Vd(s,E.time);E.press||et.update(e),oe("#hud-t").textContent=ie(e.t,3),oe("#hud-out").textContent=ie(e.output,3),oe("#hud-q").textContent=ie(e.q,3),oe("#hud-xyz").textContent=`${ie(e.x,1)}, ${ie(e.y,1)}, ${ie(e.z,1)}`;const t=(i,r)=>{const a=document.getElementById(i);a&&(a.textContent=r)};t("led-t",`t = ${ie(e.t,3)} s`),t("led-xyz",`${ie(e.x,1)} / ${ie(e.y,1)} / ${ie(e.z,2)} mm`),t("led-v",`${ie(e.speed,1)} mm/s`),t("led-rem",`${ie(e.remaining,3)} mL`),t("led-dep",`${ie(e.deposited,5)} mL`),t("led-off",`${ie(e.offSurface*1e3,2)} µL`),t("led-pend",`${ie(e.pending*1e3,2)} / ${ie(e.recovered*1e3,2)} µL`),t("led-fixed",`${ie(e.fixed,3)} mL`),t("led-bal",`${e.balance.toExponential(1)} mL`),oe("#phase").textContent=E.press?"壓合後估算 · 未校準":E.time===0?"就緒":E.time>=s.duration?"試驗完成":E.playing?e.phase:`已暫停 · ${e.phase}`,oe(".phase").dataset.state=E.press?"press":e.command?"dispense":E.time>=s.duration?"done":"idle";const n=E.playing?"暫停":E.time>=s.duration?"再次播放":E.time>0?"繼續":"開始試驗";oe("#play").innerHTML=`${E.playing?dt.pause:dt.play}<span>${n}</span>`,oe("#time-readout").textContent=`${ie(e.t,3)} / ${ie(s.duration,3)} s`,oe("#scrubber").value=String(Math.round(E.time*1e3)),oe("#scrubber").style.setProperty("--p",`${E.time/s.duration*100}%`),Hy(oe("#chart"),E.chart,E.time)}oe("#play").onclick=()=>{pi(),E.time>=E.run.duration&&(E.time=0),E.playing=!E.playing,E.clock=null,Ln()};oe("#restart").onclick=()=>{pi(),E.playing=!1,E.time=0,Ln()};oe("#step").onclick=()=>{pi(),E.playing=!1,E.time=Math.min(E.run.duration,E.time+.010001),Ln()};oe("#scrubber").oninput=s=>{pi(),E.playing=!1,E.time=Math.min(E.run.duration,+s.target.value/1e3),Ln()};document.addEventListener("keydown",s=>{s.target.closest("input, select, textarea, dialog")||s.code==="Space"&&(s.preventDefault(),oe("#play").click())});document.addEventListener("visibilitychange",()=>{document.hidden&&E.playing&&(E.playing=!1,E.clock=null,Ln())});function rd(s){E.playing?(E.clock!==null&&(E.time=Math.min(E.run.duration,E.time+(s-E.clock)/1e3*Number(oe("#playback-speed").value))),E.clock=s,E.time>=E.run.duration&&(E.playing=!1),Ln()):E.clock=null,requestAnimationFrame(rd)}function Lr(){Jt("[data-corner]").forEach(s=>s.classList.toggle("active",!et.freeOrbit&&Number(s.dataset.corner)===et.isoCorner)),oe("#free-orbit").setAttribute("aria-pressed",String(et.freeOrbit)),oe("#projection").setAttribute("aria-pressed",String(et.projection==="persp")),oe("#projection-label").textContent=et.projection==="persp"?"透視":"正交",Jt("[data-view]").forEach(s=>s.classList.toggle("active",s.dataset.view===et.mode)),oe("#camera-hint").textContent=et.freeOrbit?"左鍵旋轉 · 右鍵平移 · 滾輪縮放 · Home 重設":"拖曳平移 · 滾輪縮放 · Home 重設",oe("#view-label").textContent=`${Ey[et.mode]} · ${et.freeOrbit?"自由旋轉":`等角 ${et.isoCorner+1}`}${et.projection==="persp"?" · 透視":""}`,oe("#geometry-note").textContent=E.press?"透明板與覆蓋為未校準幾何估算":["whole","work","head","feed"].includes(et.mode)?"設備依公開外形參考 · 局部、支架與管路為示意":"近看隱藏上部機構 · 膠形為幾何示意"}Jt("[data-view]").forEach(s=>s.addEventListener("click",()=>{et.fit(s.dataset.view),E.press||et.update(E.frame)}));Jt("[data-corner]").forEach(s=>s.addEventListener("click",()=>et.setCorner(Number(s.dataset.corner))));oe("#free-orbit").onclick=()=>et.setFreeOrbit(!et.freeOrbit);oe("#projection").onclick=()=>{et.setProjection(et.projection==="ortho"?"persp":"ortho"),Lr()};oe("#reset-camera").onclick=()=>{et.setFreeOrbit(!1,!1),et.fit(et.mode)};oe("#show-exit").onchange=s=>et.setOverlayVisibility({exitPath:s.target.checked});oe("#show-planned").onchange=s=>et.setOverlayVisibility({plannedPath:s.target.checked});oe("#show-heat").onchange=s=>et.setOverlayVisibility({heatSource:s.target.checked});oe("#theme").onclick=()=>{const s=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=s,Pr.set("tim-theme",s),et.setTheme(s),oe("#theme").innerHTML=s==="dark"?dt.sun:dt.moon};oe("#theme").innerHTML=rl==="dark"?dt.sun:dt.moon;function ad(){E.press&&!E.press.stale&&(E.press.stale=!0,Bs())}function pi(s=!0){cancelAnimationFrame(E.pressAnim),E.pressAnim=null,E.press&&(E.press=null,et.clearCompression(),oe("#press-bar").hidden=!0,s&&(Bs(),Ln(),Lr()))}async function od(){if(E.busy)return;E.busy=!0,document.body.classList.add("busy"),Jt("#press, #press-cta").forEach(t=>t.querySelector("span").textContent="計算中…");const s={...E.heat},e=E.run;try{const t=await Na("compress",{run:td(e),heat:s,frames:24});if(e!==E.run||JSON.stringify(s)!==JSON.stringify(E.heat)){Nt("計算期間設定已變更，請重新模擬壓合");return}pi(!1),E.playing=!1,E.time=e.duration,Ln(),E.press={result:t,settings:s,stale:!1};const n=et.showCompression(t,s);et.fit("heat");const i=oe("#press-scrub");i.max=String(n.frameCount-1),oe("#press-bar").hidden=!1,Bs(),Ln(),Lr(),ll(!0)}catch(t){Nt(`壓合估算失敗：${t.message}`,"error")}finally{E.busy=!1,document.body.classList.remove("busy"),Jt("#press, #press-cta").forEach(t=>t.querySelector("span")&&(t.querySelector("span").textContent="模擬壓合"))}}function cd(s){var a;const e=et.compression;if(!e)return;et.setCompressionFrame(s);const t=e.frames[s];oe("#press-scrub").value=String(s);const n=((a=E.press.result.summary.press)==null?void 0:a.pressTime)??0,i=t.phase==="relax"?`靜置 +${ie(t.t-n,t.t-n<10?1:0)} s`:`${t.t!==void 0?`壓合 ${ie(t.t,1)} s · `:""}間隙 ${ie(t.gap,3)} mm`,r=t.bubbles?` · 氣泡 ${t.bubbles}（${ie(t.bubbleKPa,0)} kPa）`:"";oe("#press-gap").textContent=`${i} · 覆蓋 ${ie(t.coveredPercent??E.press.result.summary.coveredPercent,1)}%${r}`}function ll(s){const e=et.compression;if(!e)return;cancelAnimationFrame(E.pressAnim);const t=e.frameCount,n=performance.now(),i=s?0:Number(oe("#press-scrub").value),r=2400*((t-1-i)/Math.max(1,t-1)),a=o=>{const c=Math.max(i,Math.min(t-1,i+Math.round(Math.max(0,o-n)/Math.max(1,r)*(t-1-i))));cd(c),E.pressAnim=c<t-1?requestAnimationFrame(a):null};E.pressAnim=requestAnimationFrame(a)}oe("#press-scrub").oninput=s=>{cancelAnimationFrame(E.pressAnim),cd(Number(s.target.value))};oe("#press-play").onclick=()=>ll(Number(oe("#press-scrub").value)>=et.compression.frameCount-1);oe("#press-exit").onclick=()=>pi();Jt("[data-press-color]").forEach(s=>s.addEventListener("click",()=>{Jt("[data-press-color]").forEach(e=>e.classList.toggle("active",e===s)),et.setCompressionColor(s.dataset.pressColor)}));const cM=["line","n","serpentine","spiral","perimeter"];async function hl(){var a,o;const s=oe("#compare-dialog");s.open||s.showModal();const e=((a=E.compare)==null?void 0:a.matchVolume)??!0,t=((o=E.compare)==null?void 0:o.factor)??E.tuneFactor,n=`<div class="compare-controls"><label class="chk"><input type="checkbox" id="cmp-match" ${e?"checked":""}>等膠量比較（自動調整速度到需求 ×</label><input type="number" id="cmp-factor" value="${t}" min="0.3" max="5" step="any"><span>）</span><button class="primary" id="cmp-run">${dt.compare}<span>重新計算</span></button></div>`;oe("#compare-body").innerHTML=`${n}<div class="progress"><i style="width:0%"></i></div><p class="note" id="cmp-status">計算中…</p>`,ld();const i={...E.config,pathSettings:al()},r={...E.heat,cellSize:Math.max(.5,E.heat.cellSize)};try{const c=await Na("compare",{config:i,heat:r,patterns:cM,factor:t,matchVolume:e},(l,h)=>{const u=oe("#compare-body .progress i");u&&(u.style.width=`${l*100}%`);const d=oe("#cmp-status");d&&(d.textContent=`計算 ${zn[h]}…`)});E.compare={...c,matchVolume:e,factor:t},lM(n)}catch(c){oe("#cmp-status").textContent=c.message}}function ld(){oe("#cmp-run").onclick=()=>{E.compare={matchVolume:oe("#cmp-match").checked,factor:Number(oe("#cmp-factor").value)||1.2},hl()}}function lM(s){const e=E.compare,t=e.rows.filter(o=>o.ok),n=(o,c)=>t.length?t.reduce((l,h)=>(c>0?h[o]>l[o]:h[o]<l[o])?h:l)[o]:null,i=n("coveredPercent",1),r=n("rise",-1),a=n("cycle",-1);oe("#compare-body").innerHTML=`${s}
  <p class="note">熱源 ${E.heat.shape==="circle"?`Ø${E.heat.width}`:`${E.heat.width} × ${E.heat.depth}`} mm、間隙 ${E.heat.gap} mm，需求 ${ie(e.required,3)} mL。${e.matchVolume?`每個圖樣自動調整移動速度，使沉積 ≈ 需求 × ${e.factor}。`:"沿用目前速度與流量，膠量隨路徑長改變。"}其他設定沿用目前配置；網格 ≥ 0.5 mm；夾氣處理：${Wy[E.heat.airMode]}，${E.heat.pressKgf} kgf 壓到墊片${E.heat.airMode==="compressible"?`、靜置 ${E.heat.settleTime} s`:""}。</p>
  <div class="table-scroll"><table class="cmp"><thead><tr><th>圖樣</th><th>速度<br><small>mm/s</small></th><th>沉積<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溢出<br><small>mm</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
  ${e.rows.map(o=>o.ok?`<tr><td><span class="pat"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${Ku[o.pattern]}</svg>${zn[o.pattern]}</span></td><td>${ie(o.speed,1)}</td><td class="${o.reached?"":"warn"}" title="${o.reached?"":"加速度與轉角限制了平均速度，提高設定速度也無法再減少膠量；請降低壓力／轉速或增加間距"}">${ie(o.deposited,3)} <small>(${ie(o.volumeRatio,2)}×)</small>${o.reached?"":" ⚠"}</td><td class="${o.coveredPercent===i?"best":""}">${ie(o.coveredPercent,1)}</td><td class="${o.voidCount?"bad":""}">${o.voidCount} / ${ie(o.voidAreaMm2,1)}</td><td>${ie(o.squeezeOutMm,1)}</td><td class="${o.rise===r?"best":""}">${ie(o.rise,2)}</td><td class="${o.cycle===a?"best":""}">${ie(o.cycle,2)}</td><td><button class="chip-btn" data-apply="${o.pattern}" data-speed="${o.speed}">套用</button></td></tr>`:`<tr><td>${zn[o.pattern]}</td><td colspan="8" class="bad">${Dt(o.error)}</td></tr>`).join("")}
  </tbody></table></div>
  ${e.rows.some(o=>o.ok&&!o.reached)?'<p class="note warn-note">⚠ 該圖樣在目前加速度與轉角限制下無法達到目標膠量（提高設定速度已無效）；請降低壓力或轉速、加大間距，或提高加速度後再比較。</p>':""}
  <p class="note">綠色為各欄最佳值。夾氣與覆蓋來自未校準的 Hele-Shaw 近似；動作時間含收尾、不含上下料。請以透明板實測確認後再定案。</p>`,ld()}oe("#compare-body").addEventListener("click",s=>{var n;const e=s.target.closest("[data-apply]");if(!e)return;E.pattern={...E.pattern,pattern:e.dataset.apply};const t={...E.config,mode:"pattern"};(n=E.compare)!=null&&n.matchVolume&&(t.speed=Number(e.dataset.speed)),oe("#compare-dialog").close(),E.tab="path",an(t)&&Nt(`已套用 ${zn[e.dataset.apply]}`,"ok")});const hd=()=>`<div class="goal-controls"><label>覆蓋率目標 <input type="number" data-goal="coverage" value="${E.goals.coverage}" min="50" max="100" step="any"> %</label><label>溢膠上限 <input type="number" data-goal="overflow" value="${E.goals.overflow}" min="0" max="50" step="any"> mm</label><span class="muted">達標＝覆蓋 ≥ 目標且溢膠 ≤ 上限；達標者膠量越少排越前，未達標者依差距排序。</span></div>`;function ud(s){const e=Sr(s,E.goals);return e.pass?'<span class="ok-badge">達標</span>':`<span class="no-badge">${[e.short>0?`覆蓋差 ${ie(e.short,1)}%`:"",e.over>0?`溢膠超 ${ie(e.over,1)} mm`:""].filter(Boolean).join("・")}</span>`}function dd(s,e){s.querySelectorAll("[data-goal]").forEach(t=>t.onchange=()=>{const n=Number(t.value);if(!t.value.trim()||!t.checkValidity())return Nt("請輸入欄位範圍內的數值","error");E.goals={...E.goals,[t.dataset.goal]:n},Pr.set("tim-goals",JSON.stringify(E.goals)),e()})}const ul=["serpentine","spiral"];function fd(s){const e=s.config,t=s.pattern,n=e.architecture==="P300"?`${ie(e.rpm,0)} rpm`:`${ie(e.pressure,0)} psi`,i=e.mode==="pattern"?`${zn[t.pattern]}${ul.includes(t.pattern)?` 間距 ${t.spacing}`:""} 內縮 ${t.edgeInset}`:e.mode==="point"?`單點 ${ie(e.gateDuration,2)} s`:`直線 ${e.lineLength} mm`;return`${Wt[e.material].name} · ${n} · Ø${e.diameter} · ${ie(e.speed,1)} mm/s · a ${e.acceleration} · ${i} · 間隙 ${s.heat.gap} · ${s.heat.pressKgf} kgf`}function zs(){Pr.set("tim-scenarios",JSON.stringify(E.scenarios));const s=E.scenarios.length;oe("#scenario-count").hidden=!s,oe("#scenario-count").textContent=String(s)}function pd(s){const e=new Set(E.scenarios.map(i=>i.name));let t=E.scenarios.length+1;for(;e.has(`情境 ${t}`);)t++;const n={id:`${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`,name:`情境 ${t}`,savedAt:new Date().toISOString(),...s};E.scenarios.push(n),zs(),Nt(`已存成「${n.name}」，共 ${E.scenarios.length} 個情境`,"ok"),oe("#scenarios-dialog").open&&Hs()}async function hM(){let s;const e={...E.heat},t=E.run;if(E.press&&!E.press.stale)s=$h(t,E.press.result);else{if(E.busy)return;E.busy=!0,document.body.classList.add("busy"),Nt("計算壓合後存成情境…");try{s=$h(t,await Na("compress",{run:td(t),heat:e,frames:0}))}catch(n){return Nt(`壓合估算失敗：${n.message}`,"error")}finally{E.busy=!1,document.body.classList.remove("busy")}if(t!==E.run||JSON.stringify(e)!==JSON.stringify(E.heat))return Nt("計算期間設定已變更，請再存一次")}pd({config:structuredClone(E.config),heat:e,pattern:{...E.pattern},metrics:s,source:"手動設定"})}function uM(s){E.heat={...il(),...s.heat},E.pattern={...sl(),...s.pattern},an(structuredClone(s.config))&&(oe("#scenarios-dialog").close(),Nt(`已載入「${s.name}」`,"ok"))}function Hs(){const s=oe("#scenarios-body"),e=E.scenarios,t=ju(e.map(a=>({...a.metrics,id:a.id})),E.goals).map(a=>e.find(o=>o.id===a.id)),n=(a,o)=>e.length?Math.min(...e.map(c=>o*c.metrics[a]))*o:null,i={cover:n("coveredPercent",-1),out:n("squeezeOutMm",1),dep:n("depositedMl",1),rise:n("rise",1)},r=(a,o)=>o!==null&&Math.abs(a-o)<1e-9?"best":"";s.innerHTML=`${hd()}
  ${e.length?`<div class="table-scroll"><table class="cmp scen"><thead><tr><th>#</th><th>情境</th><th>判定</th><th>膠量<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>溢出<br><small>mm</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
      ${t.map((a,o)=>{const c=a.metrics;return`<tr class="${o===0&&Sr(c,E.goals).pass?"top":""}"><td>${o+1}</td><td class="scen-name"><input value="${Dt(a.name)}" data-rename="${a.id}" aria-label="情境名稱"><small>${Dt(fd(a))}</small><small class="muted">${Dt(a.source||"")} · ${new Date(a.savedAt).toLocaleString()}</small></td><td>${ud(c)}</td><td class="${r(c.depositedMl,i.dep)}">${ie(c.depositedMl,3)} <small>(${ie(c.volumeRatio,2)}×)</small></td><td class="${r(c.coveredPercent,i.cover)}">${ie(c.coveredPercent,1)}</td><td class="${r(c.squeezeOutMm,i.out)}">${ie(c.squeezeOutMm,1)}</td><td class="${c.voidCount?"bad":""}">${c.voidCount} / ${ie(c.voidAreaMm2,1)}</td><td class="${r(c.rise,i.rise)}">${ie(c.rise,2)}</td><td>${ie(c.cycle,2)}</td><td class="row-actions"><button class="chip-btn" data-load="${a.id}">載入</button><button class="chip-btn" data-remove="${a.id}">刪除</button></td></tr>`}).join("")}
      </tbody></table></div>
      <p class="note">綠色為各欄最佳值；第一列加框代表依目標排序的最佳情境。情境存在這台電腦的瀏覽器中，可匯出 JSON 帶到其他電腦再匯入。夾氣與覆蓋來自未校準的模型，僅供相對比較。</p>`:'<div class="empty"><p>還沒有情境。調好一組參數後，在右側結果卡按「存成情境」（未壓合會自動先壓合），或在「自動最佳化」結果中存入。</p></div>'}
  <div class="scen-tools"><button class="chip-btn" id="scen-csv" ${e.length?"":"disabled"}>${dt.download}匯出 CSV</button><button class="chip-btn" id="scen-export" ${e.length?"":"disabled"}>${dt.download}匯出 JSON</button><label class="chip-btn">匯入 JSON<input type="file" id="scen-import" accept=".json,application/json" hidden></label><button class="chip-btn danger" id="scen-clear" ${e.length?"":"disabled"}>清除全部</button></div>`,dd(s,Hs)}oe("#show-scenarios").onclick=()=>{Hs(),oe("#scenarios-dialog").showModal()};oe("#scenarios-body").addEventListener("click",s=>{const e=s.target.closest("button");if(e){if(e.dataset.load)return uM(E.scenarios.find(t=>t.id===e.dataset.load));if(e.dataset.remove)return E.scenarios=E.scenarios.filter(t=>t.id!==e.dataset.remove),zs(),Hs();if(e.id==="scen-clear"&&confirm(`刪除全部 ${E.scenarios.length} 個情境？`))return E.scenarios=[],zs(),Hs();if(e.id==="scen-export")return Er(JSON.stringify({application:"TIM Dispensing Lab",version:Vs,goals:E.goals,scenarios:E.scenarios},null,2),"TIM_情境.json","application/json");if(e.id==="scen-csv"){const t=["排名","情境","判定","膠量 mL","需求倍數","覆蓋 %","溢出 mm","夾氣 處","夾氣 mm²","溫升 °C","動作 s","設定","來源"],n=ju(E.scenarios.map(a=>({...a.metrics,id:a.id})),E.goals).map(a=>E.scenarios.find(o=>o.id===a.id)),i=a=>`"${String(a).replaceAll('"','""')}"`,r=n.map((a,o)=>{const c=a.metrics,l=Sr(c,E.goals);return[o+1,a.name,l.pass?"達標":"未達標",c.depositedMl.toFixed(4),c.volumeRatio.toFixed(3),c.coveredPercent.toFixed(2),c.squeezeOutMm.toFixed(2),c.voidCount,c.voidAreaMm2.toFixed(2),c.rise.toFixed(3),c.cycle.toFixed(3),fd(a),a.source||""]});return Er(`\uFEFF${[t,...r].map(a=>a.map(i).join(",")).join(`
`)}`,"TIM_情境比較.csv","text/csv")}}});oe("#scenarios-body").addEventListener("change",async s=>{var t;const e=s.target;if(e.dataset.rename){const n=E.scenarios.find(i=>i.id===e.dataset.rename);return n&&(n.name=e.value.trim()||n.name),zs()}if(e.id==="scen-import"&&((t=e.files)!=null&&t[0])){try{const n=JSON.parse(await e.files[0].text()),i=(Array.isArray(n)?n:n.scenarios||[]).filter(r=>r&&r.config&&r.heat&&r.pattern&&r.metrics&&Number.isFinite(r.metrics.coveredPercent));if(!i.length)throw new Error("檔案中沒有可用的情境");for(const r of i)E.scenarios.push({...r,id:`${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`});zs(),Nt(`已匯入 ${i.length} 個情境`,"ok")}catch(n){Nt(`匯入失敗：${n.message}`,"error")}Hs()}});function dM(){if(E.config.mode!=="pattern")return Nt("自動最佳化需先在「路徑」選擇依熱源圖樣","error");Ta(),oe("#optimize-dialog").showModal()}function Ta(){const s=E.optimize||{},e=E.pattern.pattern,t=ul.includes(e),n=s.dose||[.8,2.5],i=oe("#optimize-body"),r=s.result,a=r?r.candidates.slice(0,12):[],o=a.some(c=>c.pass);i.innerHTML=`
  <p class="lead">在目前條件下，用模擬器搜尋「最少膠量達到覆蓋目標、且溢膠不超過上限」的設定。這是數值搜尋，不是統計學習；結果與模型同樣未經實機校準。</p>
  <div class="opt-scope"><div><b>固定</b><span>${Dt(zn[e])}圖樣、熱源 ${E.heat.shape==="circle"?`Ø${E.heat.width}`:`${E.heat.width} × ${E.heat.depth}`} mm、間隙 ${E.heat.gap} mm、${Dt(Wt[E.config.material].name)}、${E.config.architecture==="P300"?`${E.config.rpm} rpm`:`${ie(E.config.pressure,0)} psi`}、Ø${E.config.diameter} 針嘴、加速度 ${E.config.acceleration}、壓合 ${E.heat.pressKgf} kgf／${Qu[E.heat.airMode]}</span></div><div><b>搜尋</b><span>膠量（以移動速度調整）${t?"、路徑間距":""}、邊界內縮</span></div></div>
  ${hd()}
  <div class="goal-controls"><label>膠量範圍 <input type="number" id="opt-dose-lo" value="${n[0]}" min="0.3" max="5" step="any"> – <input type="number" id="opt-dose-hi" value="${n[1]}" min="0.4" max="6" step="any"> × 間隙體積</label>
  ${s.running?'<button class="secondary" id="opt-cancel">停止</button>':`<button class="primary" id="opt-run">${dt.spark}<span>${r?"重新搜尋":"開始搜尋"}</span></button>`}</div>
  ${s.running?`<div class="progress"><i style="width:${(s.progress||0)*100}%"></i></div><p class="note" id="opt-status">${Dt(s.label||"準備中…")}（約需數十秒到數分鐘，視膠材與網格）</p>`:""}
  ${s.error?`<p class="note warn-note">${Dt(s.error)}</p>`:""}
  ${r?`<p class="note">${Dt(s.describe)}　需求 ${ie(r.required,3)} mL；試算 ${r.evaluations} 次（粗網格 ${ie(r.searchCell,2)} mm，前 3 名以 ${ie(E.heat.cellSize,2)} mm 複核）。</p>
      ${o?"":'<p class="note warn-note">沒有組合同時達到兩個目標；下表依差距排序，第一列是最接近的取捨。可放寬溢膠上限或覆蓋目標，或換圖樣。</p>'}
      <div class="table-scroll"><table class="cmp"><thead><tr><th>#</th><th>判定</th>${t?"<th>間距<br><small>mm</small></th>":""}<th>內縮<br><small>mm</small></th><th>膠量<br><small>mL（×需求）</small></th><th>速度<br><small>mm/s</small></th><th>覆蓋<br><small>%</small></th><th>溢出<br><small>mm</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溫升<br><small>°C</small></th><th></th></tr></thead><tbody>
      ${a.map((c,l)=>`<tr class="${l===0?"top":""}"><td>${l+1}</td><td>${ud(c)}</td>${t?`<td>${c.spacing}</td>`:""}<td>${c.edgeInset}</td><td class="${c.reached?"":"warn"}" title="${c.reached?"":"加速度與轉角限制下達不到此膠量"}">${ie(c.depositedMl,3)} <small>(${ie(c.volumeRatio,2)}×)</small>${c.reached?"":" ⚠"}</td><td>${ie(c.speed,1)}</td><td>${ie(c.coveredPercent,1)}</td><td>${ie(c.squeezeOutMm,1)}</td><td>${c.voidCount} / ${ie(c.voidAreaMm2,1)}</td><td>${ie(c.rise,2)}</td><td class="row-actions"><button class="chip-btn" data-opt-apply="${l}">套用</button><button class="chip-btn" data-opt-save="${l}">存成情境</button>${c.verified?"":'<small class="muted">粗網格</small>'}</td></tr>`).join("")}
      </tbody></table></div>
      <p class="note">每種幾何以二分法找「達到覆蓋目標的最少膠量」；覆蓋到不了目標的組合列出上限膠量時的結果。套用後請再按「模擬壓合」以完整網格與動畫確認。</p>`:""}`,dd(i,Ta)}async function fM(){const s=Number(oe("#opt-dose-lo").value),e=Number(oe("#opt-dose-hi").value);if(!(s>0&&e>s))return Nt("膠量範圍需為 0 < 下限 < 上限","error");const t={...E.config,pathSettings:al()},n={...E.heat};E.optimize={running:!0,progress:0,dose:[s,e]},Ta();try{const i=await Na("optimize",{config:t,heat:n,goals:{...E.goals},dose:[s,e]},(r,a)=>{E.optimize.progress=r,E.optimize.label=a;const o=oe("#optimize-body .progress i");o&&(o.style.width=`${r*100}%`);const c=oe("#opt-status");c&&(c.textContent=`${a}（${Math.round(r*100)}%）`)});E.optimize={result:i,dose:[s,e],config:t,heat:n,pattern:{...E.pattern},describe:cl(t,n)}}catch(i){E.optimize={error:i.message==="已取消"?"已停止搜尋。":i.message,dose:[s,e]}}oe("#optimize-dialog").open&&Ta()}function Yh(s){const e=E.optimize,t={...e.pattern,spacing:s.spacing,edgeInset:s.edgeInset},n={...e.config,speed:s.speed,pathSettings:{...e.config.pathSettings,spacing:s.spacing,edgeInset:s.edgeInset}},{spacing:i,edgeInset:r,factor:a,speed:o,reached:c,verified:l,pass:h,short:u,over:d,deficit:f,...g}=s;return{config:n,heat:{...e.heat},pattern:t,metrics:g,source:l?"自動最佳化（已複核）":"自動最佳化（粗網格）"}}oe("#optimize-body").addEventListener("click",s=>{var n,i;const e=s.target.closest("button");if(!e)return;if(e.id==="opt-run")return fM();if(e.id==="opt-cancel")return Xy();const t=((i=(n=E.optimize)==null?void 0:n.result)==null?void 0:i.candidates)||[];if(e.dataset.optSave!==void 0)return pd(Yh(t[Number(e.dataset.optSave)]));if(e.dataset.optApply!==void 0){const r=t[Number(e.dataset.optApply)],a=Yh(r);E.heat={...a.heat},E.pattern=a.pattern,an({...E.config,...a.config})&&(oe("#optimize-dialog").close(),Nt(`已套用：${ul.includes(a.pattern.pattern)?`間距 ${r.spacing} mm、`:""}內縮 ${r.edgeInset} mm、速度 ${ie(r.speed,1)} mm/s`,"ok"))}});zs();function Er(s,e,t){const n=document.createElement("a"),i=URL.createObjectURL(s instanceof Blob?s:new Blob([s],{type:t}));n.href=i,n.download=e,n.click(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}function md(){var s;return{application:"TIM Dispensing Lab",version:Vs,date:new Date().toISOString(),label:Aa,validatedAgainstHardware:!1,parameterRegistryVersion:Xn.schema_version,parameterUpdates:As,modelAssumptions:{flow:"delayed_first_order",puttyFlowLaw:"tds_reference_point_power_law_tube",motion:E.config.cornerMode==="junction"?"lookahead_trapezoid_junction_deviation":"single_arc_length_trapezoid",lineGeometry:"shared_half_ellipse_rings_total_volume_normalized",pointGeometry:"spherical_cap",surfaceAllocation:"outlet_before_first_lift_only_except_legacy",squeeze:`parallel_plate_hele_shaw_constant_force_to_spacer_${E.heat.airMode}_air`,thermal:"one_dimensional_bulk_plus_tds_derived_contact",hardwareAppearance:"reference_envelopes_with_assumed_details_not_OEM_CAD"},config:E.config,heatSource:E.heat,pattern:E.pattern,hardwareReference:uy[E.config.architecture],material:Wt[E.config.material],referenceParameters:Xn.parameters,additionalDefaults:[pr,...Rc,...Cc],sources:Xn.sources,warnings:E.run.warnings,summary:E.run.summary,motion:E.run.motion,compression:E.press&&!E.press.stale?{settings:E.press.settings,summary:E.press.result.summary,voids:E.press.result.voids.slice(0,50),warnings:E.press.result.warnings,baseline:E.pressBaseline}:null,patternComparison:((s=E.compare)==null?void 0:s.rows)||null,baseline:E.baseline?{config:E.baseline.config,summary:E.baseline.summary}:null,view:{mode:et.mode,projection:et.projection,isoCorner:et.isoCorner,freeOrbit:et.freeOrbit,time:E.frame.t,cameraPosition:et.camera.position.toArray(),cameraTarget:et.controls.target.toArray()},note:"工件檔案不內嵌，僅保存名稱與雜湊；重新載入需原檔。"}}function pM(){var r;const s=[["t","time_s"],["command","command_0_1"],["target","target_mL_s"],["q","outflow_mL_s"],["output","outlet_mL"],["mass","mass_g"],["s","arc_length_mm"],["x","TCP_X_mm"],["y","TCP_Y_mm"],["z","TCP_Z_mm"],["speed","speed_mm_s"],["remaining","cartridge_mL"],["pending","pending_mL"],["fixed","fixed_primed_mL"],["balance","balance_error_mL"],["deposited","deposited_mL"],["offSurface","off_surface_mL"],["recovered","recovered_pending_mL"],["vx","velocity_X_mm_s"],["vy","velocity_Y_mm_s"],["vz","velocity_Z_mm_s"],["phase","phase"],["depositionBalance","deposition_balance_mL"]],e=a=>'"'+String(a).replaceAll('"','""')+'"',t=md(),n=JSON.stringify({config:E.config,heatSource:E.heat,sourceVersion:Xn.schema_version,parameterUpdates:As.map(a=>[a.id,a.value]),modelAssumptions:t.modelAssumptions,compression:((r=t.compression)==null?void 0:r.summary)||null,ending:E.run.ending,warnings:E.run.warnings}),i=[["label","app_version","profile",...s.map(a=>a[1]),"run_metadata_json_first_row"].join(","),...E.run.frames.map((a,o)=>[Aa,Vs,E.config.profile,...s.map(([c])=>a[c]),o===0?n:""].map(e).join(","))];Er("\uFEFF"+i.join(`\r
`),"TIM_未校準_試驗結果.csv","text/csv;charset=utf-8")}async function mM(){var i;const s=new Image;s.src=et.screenshot(),await s.decode();const e=document.createElement("canvas");e.width=s.width,e.height=s.height+110;const t=e.getContext("2d");t.fillStyle="#f4f6f8",t.fillRect(0,0,e.width,e.height),t.drawImage(s,0,0),t.fillStyle="#16181b",t.font="bold 20px sans-serif",t.fillText(`TIM 點膠研究室 v${Vs} · ${Aa}`,24,s.height+32),t.font="15px sans-serif",t.fillStyle="#4f5157",t.fillText(`${cl(E.config,E.heat)} · t=${E.frame.t.toFixed(3)} s · 沉積 ${E.run.summary.deposited.toFixed(4)} mL`,24,s.height+60);const n=(i=E.press)==null?void 0:i.result.summary;t.fillText(n?`壓合估算：覆蓋 ${n.coveredPercent.toFixed(1)}% · 夾氣 ${n.voidCount} 處 ${n.voidAreaMm2.toFixed(1)} mm² · 溫升 ${n.thermal.rise.toFixed(2)} °C（未校準）`:"工件沉積與離面後出膠分帳；虛線為針尖路徑，非膠絲。mm 真實比例。",24,s.height+86),e.toBlob(r=>Er(r,n?"TIM_未校準_壓合畫面.png":"TIM_未校準_點膠畫面.png","image/png"))}const gM={published_typical:"原廠典型",published_rated:"原廠額定",published_limit:"原廠上限",derived:"公式／資料推導",engineering_assumption:"AI 工程初估"};function _M(){const s=new Map(As.map(n=>[n.id,n])),e=new Map(Xn.parameters.map(n=>[n.id,n])),t=[...As.map(n=>({...n,v1:!0})),...Cc.map(n=>({...n,v1:!0})),pr,...Rc,...Xn.parameters.filter(n=>!s.has(n.id))];oe("#source-rows").innerHTML=t.map(n=>{const i=n.v1&&e.get(n.id);return`<tr class="${n.v1?"v1":""}"><td><code>${Dt(n.id)}</code>${n.v1?`<em class="tag tag-derived">v${n.since||"1.0"} 更新</em>`:""}</td><td>${Dt(n.value)} ${Dt(n.unit||"")}${i?`<br><small>原 v0.3：${Dt(i.value)}</small>`:""}</td><td>${Dt(gM[n.evidence]||n.evidence)}<br><small>${Dt(n.role||"控制初值")}</small></td><td>${Dt(n.basis)}<br><small>${Dt((n.source_refs||[]).join(" / "))}</small></td></tr>`}).join("")}oe("#help-body").innerHTML=`
<ol class="steps">
  <li><b>設備</b>：選膠材（Tputty 910／Tgrease 2500）與架構（R75 氣壓／P300 PCP），調整壓力或轉速。</li>
  <li><b>熱源</b>：輸入元件接觸面尺寸、位置、組裝間隙與功耗。可「自動調整移動速度」讓膠量 = 間隙體積 × 係數。</li>
  <li><b>路徑</b>：依熱源選中心線／N／蛇形／螺旋／外框，或直線、單點。多段路徑在轉角依 junction deviation 減速。</li>
  <li><b>播放</b>：空白鍵播放／暫停；拖曳時間軸或點曲線跳到該時刻；時間軸上的標記可跳到關膠、到位、抬針、退離。</li>
  <li><b>壓合</b>：按「模擬壓合」看透明板以定力壓到墊片、膠膜擴散、氣泡（紅色）壓縮／遷移／排出，以及靜置後的回脹；可切換「前緣時序」著色。夾氣處理可在熱源頁切換為 v1.0 剛性牆或全部排出作對照。</li>
  <li><b>比較</b>：「比較所有圖樣」在等膠量下比較覆蓋、夾氣、溢膠、溫升與動作時間，可直接套用。</li>
  <li><b>情境</b>：覺得不錯的參數按結果卡的「存成情境」（未壓合會自動先算），再改參數繼續試；右上「情境比較」一次比較全部，依「覆蓋 ≥ 目標、溢膠 ≤ 上限、膠量最少」排序，可載入、改名、刪除、匯出 CSV／JSON。情境存在這台電腦的瀏覽器。</li>
  <li><b>自動最佳化</b>：熱源頁「自動最佳化目前圖樣」固定圖樣、熱源、間隙與設備，搜尋膠量（以移動速度調整）、間距（蛇形／螺旋）與邊界內縮，找出達標且膠量最少的設定；結果可套用或存成情境。</li>
  <li><b>曲線</b>：退離完成後的灰色區域是「尾膠結算」——模型繼續積分關膠後逐漸衰減的出膠，讓體積帳目完整，並非機台等待時間；週期時間以「動作完成」計。</li>
</ol>
<p class="muted">視角：全機／工作區／機頭／供膠站／近看／跟隨；①–④ 等角方向；360° 自由旋轉；正交與透視可切換。所有零件以 mm 真實比例繪製；設備外形依公開尺寸，細部與管路為示意。</p>
<p class="muted">本工具所有結果為工程假設、未經實機校準，用於縮小試驗範圍與比較方案，不能取代透明板或首件驗證。</p>`;oe("#show-sources").onclick=()=>{_M(),oe("#sources-dialog").showModal()};oe("#help").onclick=()=>oe("#help-dialog").showModal();Jt("[data-close]").forEach(s=>s.onclick=()=>s.closest("dialog").close());Jt("dialog").forEach(s=>s.addEventListener("click",e=>e.target===s&&s.close()));E.config=id();sd(xa(E.config));requestAnimationFrame(rd);
