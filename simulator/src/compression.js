import {beadProfile, dotDimensions} from './engine.js';
import {pointOnPath} from './path-planning.js';

// The deposited nozzle footprint extends slightly past either end of the path.
function pathPoint(path,s){const p=pointOnPath(path,s),t=Math.max(0,Math.min(path.length,s)),d=s-t;return {...p,x:p.x+p.tx*d,y:p.y+p.ty*d};}

// Idealized geometric redistribution: conserves deposited volume, but has no
// material rheology, wetting, plate speed, entrapped air, force or contact law.
// Each partially filled cell is represented as a fraction of a full-gap film.
// This is an optimistic equivalent-area approximation, NOT measured contact.
export function estimateCompression(run, options) {
  const c=run.config, o={shape:'rectangle',offsetX:0,offsetY:0,cellSize:1,...options};
  for(const k of ['width','depth','offsetX','offsetY','gap','cellSize'])
    if(!Number.isFinite(o[k])) throw new Error(`${k} 必須是有限數值`);
  if(!['rectangle','circle'].includes(o.shape)) throw new Error('熱源形狀必須為矩形或圓形');
  if(o.width<=0||o.width>1000||o.depth<=0||o.depth>1000||o.gap<.02||o.gap>10||o.cellSize<.2||o.cellSize>10)
    throw new Error('熱源尺寸需為 0–1000 mm、間隙 0.02–10 mm、網格 0.2–10 mm');
  const deposits=run.summary.deposits, depositedMl=deposits.reduce((a,b)=>a+b,0);
  if(!Number.isFinite(depositedMl)||depositedMl<0||deposits.some(v=>!Number.isFinite(v)||v<0))throw new Error('沉積體積資料無效');
  const dot=c.mode==='point'?dotDimensions(depositedMl,c.dotRatio):null;
  const profile=c.mode==='line'||c.mode==='pattern'?beadProfile(deposits,run.cellLength,c.lineRatio):null;
  const halfPath=c.mode==='line'?(c.lineLength+c.diameter)/2:(dot?.radius||0);
  const halfWidth=c.mode==='line'?(profile.maxWidth||c.diameter)/2:(dot?.radius||0);
  const targetDepth=o.shape==='circle'?o.width:o.depth;
  // More room than the equivalent single-disk radius reduces artificial edge loss.
  const spread=Math.sqrt(depositedMl*1000/(Math.PI*o.gap))+4*o.cellSize;
  const pathPad=c.mode==='pattern'?(profile.maxWidth/2+c.diameter/2):0;
  const pathX=c.mode==='pattern'?run.path.points.map(p=>p.x):[c.offsetX-halfPath,c.offsetX+halfPath];
  const pathY=c.mode==='pattern'?run.path.points.map(p=>p.y):[c.offsetY-halfWidth,c.offsetY+halfWidth];
  const minX=Math.min(-c.width/2,o.offsetX-o.width/2,...pathX)-spread-pathPad;
  const maxX=Math.max(c.width/2,o.offsetX+o.width/2,...pathX)+spread+pathPad;
  const minY=Math.min(-c.depth/2,o.offsetY-targetDepth/2,...pathY)-spread-pathPad;
  const maxY=Math.max(c.depth/2,o.offsetY+targetDepth/2,...pathY)+spread+pathPad;
  // Bound interactive computation; expose the actual resolution to the user.
  let cellSize=Math.max(o.cellSize,Math.sqrt((maxX-minX)*(maxY-minY)/80000));
  let cols=Math.ceil((maxX-minX)/cellSize), rows=Math.ceil((maxY-minY)/cellSize);
  while(cols*rows>90000){cellSize*=1.02;cols=Math.ceil((maxX-minX)/cellSize);rows=Math.ceil((maxY-minY)/cellSize);}
  const originX=minX,originY=minY,n=cols*rows,area=cellSize**2,capacity=area*o.gap;
  const volume=new Float64Array(n),sourceFraction=new Float32Array(n);
  const idx=(x,y)=>{
    const ix=Math.max(0,Math.min(cols-1,Math.floor((x-originX)/cellSize)));
    const iy=Math.max(0,Math.min(rows-1,Math.floor((y-originY)/cellSize)));
    return iy*cols+ix;
  };
  const addWeighted=(v, points, fallbackX, fallbackY)=>{
    const sum=points.reduce((a,p)=>a+p[1],0);
    if(sum<=0)volume[idx(fallbackX,fallbackY)]+=v;
    else for(const [i,w] of points)volume[i]+=v*w/sum;
  };
  if(c.mode==='point'){
    const radius=dot.radius,points=[];
    const x0=Math.max(0,Math.floor((c.offsetX-radius-originX)/cellSize)),x1=Math.min(cols-1,Math.floor((c.offsetX+radius-originX)/cellSize));
    const y0=Math.max(0,Math.floor((c.offsetY-radius-originY)/cellSize)),y1=Math.min(rows-1,Math.floor((c.offsetY+radius-originY)/cellSize));
    for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
      const dx=originX+(x+.5)*cellSize-c.offsetX,dy=originY+(y+.5)*cellSize-c.offsetY;
      const r2=dx*dx+dy*dy;
      if(r2<radius*radius)points.push([y*cols+x,Math.sqrt(1-r2/(radius*radius))]);
    }
    addWeighted(depositedMl*1000,points,c.offsetX,c.offsetY);
  } else if(c.mode==='pattern'){
    // Each cross-section contributes its own volume; adding to the same cell is
    // intentional where a path crosses or beads overlap. Local tangent and
    // width give only an approximate initial footprint, not measured wetting.
    for(let i=0;i<deposits.length;i++){
      const v=deposits[i]*1000;if(!v)continue;
      const p=pathPoint(run.path,run.gridStart+(i+.5)*run.cellLength);
      const radius=(profile.widths[i]+profile.widths[i+1])/4,points=[];
      const count=Math.max(1,Math.min(256,Math.ceil(4*radius/cellSize)));
      for(let j=0;j<count;j++){
        const u=(2*(j+.5)/count-1)*radius;
        const weight=radius>0?Math.sqrt(Math.max(0,1-(u/radius)**2)):1;
        points.push([idx(p.x-p.ty*u,p.y+p.tx*u),weight]);
      }
      addWeighted(v,points,p.x,p.y);
    }
  } else {
    for(let i=0;i<deposits.length;i++){
      const v=deposits[i]*1000;if(!v)continue;
      const x=c.offsetX+run.gridStart+(i+.5)*run.cellLength-c.lineLength/2;
      const radius=(profile.widths[i]+profile.widths[i+1])/4, points=[];
      const y0=Math.max(0,Math.floor((c.offsetY-radius-originY)/cellSize)),y1=Math.min(rows-1,Math.floor((c.offsetY+radius-originY)/cellSize));
      for(let y=y0;y<=y1;y++){
        const dy=originY+(y+.5)*cellSize-c.offsetY;
        if(Math.abs(dy)<radius)points.push([idx(x,originY+(y+.5)*cellSize),Math.sqrt(1-(dy/radius)**2)]);
      }
      addWeighted(v,points,x,c.offsetY);
    }
  }
  // Iteratively redistribute any volume above one-gap film to four adjacent
  // cells. This deterministic spreading rule is a visualization heuristic.
  let pending=new Float64Array(n),next=new Float64Array(n),iterations=0,residual=0;
  for(let i=0;i<n;i++)if(volume[i]>capacity){pending[i]=volume[i]-capacity;volume[i]=capacity;}
  const tol=Math.max(1e-8,depositedMl*1000*1e-6);
  for(;iterations<5000;iterations++){
    let moved=0;
    for(let i=0;i<n;i++)if(pending[i]>0){
      const v=pending[i]/4,x=i%cols,y=Math.floor(i/cols);
      next[x?i-1:i]+=v;next[x+1<cols?i+1:i]+=v;
      next[y?i-cols:i]+=v;next[y+1<rows?i+cols:i]+=v;
    }
    for(let i=0;i<n;i++){
      if(next[i]){const v=volume[i]+next[i];pending[i]=Math.max(0,v-capacity);volume[i]=Math.min(v,capacity);moved+=pending[i];next[i]=0;}
      else pending[i]=0;
    }
    residual=moved;
    if(residual<=tol)break;
  }
  // Keep unresolved volume explicitly, rather than losing it when the loop stops.
  for(let i=0;i<n;i++)volume[i]+=pending[i];
  const coverage=new Float32Array(n);let sourceSampleArea=0,coveredArea=0,inside=0,offWorkpiece=0,accounted=0;
  const insideSource=(x,y)=>o.shape==='circle'?(x-o.offsetX)**2+(y-o.offsetY)**2<=(o.width/2)**2:
    Math.abs(x-o.offsetX)<=o.width/2&&Math.abs(y-o.offsetY)<=o.depth/2;
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
    const i=y*cols+x;let fraction=0,partFraction=0;
    // Area sampling means offset edges don't snap to one cell.
    for(let sy=0;sy<4;sy++)for(let sx=0;sx<4;sx++){
      const px=originX+(x+(sx+.5)/4)*cellSize,py=originY+(y+(sy+.5)/4)*cellSize;
      if(insideSource(px,py))fraction+=1/16;
      if(Math.abs(px)<=c.width/2&&Math.abs(py)<=c.depth/2)partFraction+=1/16;
    }
    sourceFraction[i]=fraction;coverage[i]=Math.min(1,volume[i]/capacity);
    sourceSampleArea+=fraction*area;coveredArea+=fraction*coverage[i]*area;
    inside+=volume[i]*fraction;offWorkpiece+=volume[i]*(1-partFraction);accounted+=volume[i];
  }
  const sourceArea=o.shape==='circle'?Math.PI*o.width**2/4:o.width*o.depth,requiredMl=sourceArea*o.gap/1000;
  const warnings=[
    '等效覆蓋是體積守恆的理想化幾何試算，假設膠可形成間隙厚度的膜；不能判定實際接觸、空洞、擠出形態、壓力或可靠度。',
    '未使用材料流變、潤濕性、壓合速度、HSK 平面度或壓力；結果需透明板實測校準，不能直接替代量產驗證。'
  ];
  if(residual>tol)warnings.push('網格擴散未完全收斂；仍保留未分配體積，等效覆蓋可能低估。');
  if(cellSize>o.cellSize*1.001)warnings.push(`為控制計算量，網格由 ${o.cellSize.toFixed(2)} mm 調整為 ${cellSize.toFixed(2)} mm；細節精度下降。`);
  if(Math.abs(sourceSampleArea-sourceArea)>sourceArea*.05)warnings.push('熱源相對網格過小，熱源面積的網格取樣誤差超過 5%；請縮小工件範圍或使用更細網格，覆蓋數值不宜判讀。');
  if(Math.abs(o.offsetX)+o.width/2>c.width/2||Math.abs(o.offsetY)+targetDepth/2>c.depth/2)warnings.push('熱源範圍超出工件矩形參考邊界；請核對尺寸和中心偏移，匯入工件僅以包圍框近似。');
  if(offWorkpiece>1e-6)warnings.push('估算有材料超出工件矩形範圍；未模擬實際邊緣流失。');
  if(c.workpieceKind!=='plate')warnings.push('匯入工件仍以其矩形邊界和水平上表面近似，不包含孔洞與曲面。');
  if(c.mode==='pattern')warnings.push('膠沿規劃路徑累加；彎角、重疊、潤濕與壓合輪廓均為幾何近似，並非已驗證的流變模擬。');
  if(c.material==='putty'&&o.gap<.18)warnings.push('Tputty 910 資料表最小黏結層厚度為 0.18 mm；目前目標間隙較小，須向廠商確認適用性，不代表此模型已考慮顆粒或硬接觸。');
  return {options:o,grid:{originX,originY,cellSize,cols,rows,coverage,sourceFraction},
    summary:{depositedMl,sourceAreaMm2:sourceArea,requiredMl,coveredPercent:sourceSampleArea>0?coveredArea/sourceSampleArea*100:0,
      idealVolumePercent:requiredMl>0?Math.min(100,depositedMl/requiredMl*100):0,insideMl:inside/1000,
      outsideMl:(accounted-inside)/1000,offWorkpieceMl:offWorkpiece/1000,conservationErrorMl:(accounted/1000-depositedMl),
      unresolvedMl:residual/1000,iterations:Math.min(iterations+1,5000)},warnings,assumptions:'engineering_assumption'};
}
