// Geometry-only path candidates. Dimensions are mm, centered on the configured
// heat source. These are uncalibrated examples, not validated production recipes.
const MAX_POINTS = 20000;
const MAX_SAMPLE_POINTS = 100000;

export function planDispensePath(input) {
  const o={shape:'rectangle',pattern:'serpentine',offsetX:0,offsetY:0,spacing:5,edgeInset:2,spiralShape:'auto',spiralDirection:'outside-in',...input};
  if(o.shape==='circle')o.depth=o.width;
  for(const k of ['width','depth','offsetX','offsetY','spacing','edgeInset'])
    if(!Number.isFinite(o[k])) throw new Error(`${k} 必須是有限數值`);
  if(!['rectangle','circle'].includes(o.shape)) throw new Error('熱源形狀不支援');
  if(!['point','line','n','serpentine','spiral','perimeter'].includes(o.pattern)) throw new Error('點膠路徑不支援');
  if(!['auto','round','square'].includes(o.spiralShape))throw new Error('螺旋形狀不支援');
  if(!['outside-in','inside-out'].includes(o.spiralDirection))throw new Error('螺旋方向不支援');
  const depth=o.shape==='circle'?o.width:o.depth;
  if(o.width<=0||depth<=0||o.width>1000||depth>1000)throw new Error('熱源尺寸需介於 0 與 1000 mm');
  if(o.spacing<0.2||o.spacing>1000)throw new Error('路徑間距需介於 0.2 與 1000 mm');
  if(o.edgeInset<0||o.edgeInset>=Math.min(o.width,depth)/2)throw new Error('邊界內縮須小於熱源最短尺寸的一半');
  const a=o.width/2-o.edgeInset,b=depth/2-o.edgeInset;
  const spiralShape=o.spiralShape==='auto'?(o.shape==='circle'?'round':'square'):o.spiralShape;
  const points=[];
  const add=(x,y)=>{
    x+=o.offsetX;y+=o.offsetY;
    const prev=points.at(-1);if(prev&&Math.hypot(x-prev.x,y-prev.y)<1e-9)return;
    if(points.length>=MAX_POINTS)throw new Error('路徑點數過多，請增加間距或縮小熱源');
    points.push({x,y});
  };
  if(o.pattern==='point')add(0,0);
  else if(o.pattern==='line'){add(-a,0);add(a,0);}
  else if(o.pattern==='n'){
    // An N is one continuous open stroke; no crossing or implied lift.
    const nx=o.shape==='circle'?a/Math.SQRT2:a;
    const ny=o.shape==='circle'?a/Math.SQRT2:b;
    add(-nx,-ny);add(-nx,ny);add(nx,-ny);add(nx,ny);
  }
  else if(o.pattern==='serpentine'){
    const rows=Math.max(1,Math.floor(2*b/o.spacing)+1);
    if(rows*2>MAX_POINTS)throw new Error('蛇形路徑點數過多，請增加間距');
    // Center the row set; its actual pitch equals the requested pitch.
    for(let row=0;row<rows;row++){
      const y=(row-(rows-1)/2)*o.spacing;
      const x=o.shape==='circle'?Math.sqrt(Math.max(0,a*a-y*y)):a;
      if(row%2===0){add(-x,y);add(x,y);}else{add(x,y);add(-x,y);}
    }
  }else if(o.pattern==='perimeter'){
    if(o.shape==='rectangle'){
      add(-a,-b);add(a,-b);add(a,b);add(-a,b);add(-a,-b);
    }else{
      // Polygon edges are chords, always inside the inset circular boundary.
      const count=Math.max(16,Math.ceil(2*Math.PI*a/1));
      if(count+1>MAX_POINTS)throw new Error('路徑點數過多，請縮小熱源');
      for(let i=0;i<=count;i++){const t=2*Math.PI*i/count;add(a*Math.cos(t),a*Math.sin(t));}
    }
  }else if(spiralShape==='square'){
    // A square spiral on a disk uses its inscribed square. On a rectangular
    // heat source, preserve the existing rectangular spiral aspect ratio.
    const halfX=o.shape==='circle'?a/Math.SQRT2:a;
    const halfY=o.shape==='circle'?a/Math.SQRT2:b;
    let left=-halfX,right=halfX,bottom=-halfY,top=halfY;add(left,bottom);
    while(true){
      add(right,bottom);bottom+=o.spacing;if(bottom>top)break;
      add(right,top);right-=o.spacing;if(right<left)break;
      add(left,top);top-=o.spacing;if(top<bottom)break;
      add(left,bottom);left+=o.spacing;if(left>right)break;
    }
    // End exactly at the heat-source center, enabling a true reversed path.
    add(0,0);
  }else{
    // The circular spiral fits wholly inside the inset source even when that
    // source is rectangular. One revolution changes radius by spacing.
    const outerRadius=Math.min(a,b),total=2*Math.PI*outerRadius/o.spacing;
    let t=0;add(outerRadius,0);
    while(t<total){
      const radius=Math.max(0,outerRadius-o.spacing*t/(2*Math.PI));
      t=Math.min(total,t+Math.min(.18,1/Math.max(1,radius)));
      const r=t===total?0:Math.max(0,outerRadius-o.spacing*t/(2*Math.PI));add(r*Math.cos(t),r*Math.sin(t));
    }
    // When the final sample is nearly coincident, add() deduplicates it;
    // explicitly snap that last sample to the actual center.
    points[points.length-1]={x:o.offsetX,y:o.offsetY};
  }
  if(!points.length)throw new Error('無法生成點膠路徑');
  if(o.pattern==='spiral'&&o.spiralDirection==='inside-out')points.reverse();
  const cumulative=[0];let length=0;
  for(let i=1;i<points.length;i++){
    length+=Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y);
    cumulative.push(length);
  }
  return {shape:o.shape,pattern:o.pattern,width:o.width,depth,offsetX:o.offsetX,offsetY:o.offsetY,
    edgeInset:o.edgeInset,spacing:o.spacing,spiralShape:o.spiralShape,effectiveSpiralShape:spiralShape,spiralDirection:o.spiralDirection,points,cumulative,length,units:'mm',
    evidence:'engineering_assumption',note:'幾何候選；未校準流量、轉角速度、點膠寬度、排氣或實際壓合。'};
}

// Linear interpolation and tangent for a distance along the polyline.
export function pointOnPath(path, distance) {
  if(!Number.isFinite(distance))throw new Error('路徑距離必須是有限數值');
  if(path.points.length===1)return {...path.points[0],tx:0,ty:0};
  const d=Math.max(0,Math.min(path.length,distance));let lo=1,hi=path.points.length-1;
  while(lo<hi){const m=Math.floor((lo+hi)/2);if(path.cumulative[m]<d)lo=m+1;else hi=m;}
  const p=path.points[lo-1],q=path.points[lo],segment=path.cumulative[lo]-path.cumulative[lo-1];
  const f=segment?(d-path.cumulative[lo-1])/segment:0;
  return {x:p.x+(q.x-p.x)*f,y:p.y+(q.y-p.y)*f,tx:(q.x-p.x)/segment,ty:(q.y-p.y)/segment};
}

// Includes both endpoints; samples carry their arc length to support deposition.
export function samplePath(path, step) {
  if(!Number.isFinite(step)||step<=0)throw new Error('取樣間距必須為正數');
  const count=Math.max(1,Math.ceil(path.length/step));
  if(count+1>MAX_SAMPLE_POINTS)throw new Error('路徑取樣過多，請增加取樣間距');
  if(path.length===0)return [{...pointOnPath(path,0),distance:0}];
  return Array.from({length:count+1},(_,i)=>{const distance=path.length*i/count;return {...pointOnPath(path,distance),distance};});
}
