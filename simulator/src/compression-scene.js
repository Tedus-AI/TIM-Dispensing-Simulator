import * as THREE from 'three';

// This is an inspection visualization, not a mechanical glass/fixture model.
// Coordinates, heat-source footprint and the plate's lower face use mm in Z-up world space.
export function createCompressionScene(config, settings, result) {
  const group = new THREE.Group();
  group.name = 'estimated compression inspection';
  const materials = [];
  const material = m => { materials.push(m); return m; };
  const sourceWidth = settings.width;
  const sourceDepth = settings.shape === 'circle' ? settings.width : settings.depth;
  const z = config.surfaceZ;
  const epsilon = Math.min(settings.gap / 8, 0.001);
  const sourceGeometry = settings.shape === 'circle'
    ? new THREE.CircleGeometry(sourceWidth / 2, 96)
    : new THREE.PlaneGeometry(sourceWidth, sourceDepth);
  const source = new THREE.Mesh(sourceGeometry, material(new THREE.MeshBasicMaterial({
    color: 0x4ca0a3, transparent: true, opacity: 0.48, side: THREE.DoubleSide, depthWrite: false
  })));
  source.position.set(settings.offsetX, settings.offsetY, z + epsilon);
  source.name = 'configured heat source'; source.renderOrder = 1; group.add(source);

  let points;
  if (settings.shape === 'circle') {
    points = Array.from({length: 97}, (_, i) => {
      const a = i * Math.PI * 2 / 96;
      return new THREE.Vector3(sourceWidth / 2 * Math.cos(a), sourceWidth / 2 * Math.sin(a), 0);
    });
  } else {
    const x = sourceWidth / 2, y = sourceDepth / 2;
    points = [[-x,-y],[x,-y],[x,y],[-x,y],[-x,-y]].map(([a,b]) => new THREE.Vector3(a,b,0));
  }
  const outline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material(new THREE.LineBasicMaterial({color: 0x17686d, depthTest: true})));
  outline.position.set(settings.offsetX, settings.offsetY, z + epsilon * 2);
  outline.name = 'heat source boundary'; outline.renderOrder = 2; group.add(outline);

  // Each tinted square is one grid cell. Alpha encodes the cell's estimated area
  // fraction; it does not claim the unknown shape of material inside that cell.
  const grid = result.grid, positions = [], colors = [], indices = [];
  const glueColor = new THREE.Color(config.material === 'putty' ? 0xb65055 : 0xddd6be);
  let count = 0;
  let minX = settings.offsetX - sourceWidth / 2, maxX = settings.offsetX + sourceWidth / 2;
  let minY = settings.offsetY - sourceDepth / 2, maxY = settings.offsetY + sourceDepth / 2;
  for (let y = 0; y < grid.rows; y++) for (let x = 0; x < grid.cols; x++) {
    const fraction = Math.max(0, Math.min(1, Number(grid.coverage[y * grid.cols + x]) || 0));
    if (fraction <= 1e-7) continue;
    const x0 = grid.originX + x * grid.cellSize, y0 = grid.originY + y * grid.cellSize;
    const x1 = x0 + grid.cellSize, y1 = y0 + grid.cellSize;
    minX = Math.min(minX, x0); maxX = Math.max(maxX, x1);
    minY = Math.min(minY, y0); maxY = Math.max(maxY, y1);
    positions.push(x0,y0,0, x1,y0,0, x1,y1,0, x0,y1,0);
    const alpha = 0.85 * Math.sqrt(fraction);
    for (let n = 0; n < 4; n++) colors.push(glueColor.r, glueColor.g, glueColor.b, alpha);
    const base = count++ * 4; indices.push(base,base+1,base+2,base,base+2,base+3);
  }
  const areaGeometry = new THREE.BufferGeometry();
  areaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));
  areaGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors,4));
  areaGeometry.setIndex(indices); areaGeometry.computeVertexNormals();
  const area = new THREE.Mesh(areaGeometry, material(new THREE.MeshBasicMaterial({
    vertexColors:true, transparent:true, depthWrite:false, side:THREE.DoubleSide
  })));
  area.position.z = z + epsilon * 3; area.name = 'estimated compressed area'; area.renderOrder = 3; group.add(area);

  // A generic transparent inspection plate, not a vendor-specific heat sink.
  // Thickness and 6 mm perimeter margin are visual assumptions. The plate spans
  // both the heat source and all calculated material, with a 6 mm margin. Its
  // lower face is exactly at the specified assembly gap.
  const plateThickness = 3, plateWidth = maxX - minX + 12, plateDepth = maxY - minY + 12;
  const plateGeometry = new THREE.BoxGeometry(plateWidth, plateDepth, plateThickness);
  const plate = new THREE.Mesh(plateGeometry, material(new THREE.MeshPhysicalMaterial({
    color:0xbce4eb, transparent:true, opacity:0.14, roughness:0.2,
    metalness:0, depthWrite:false, side:THREE.DoubleSide
  })));
  plate.position.set((minX + maxX) / 2, (minY + maxY) / 2, z + settings.gap + plateThickness / 2);
  plate.name = 'transparent inspection plate'; plate.renderOrder = 4; group.add(plate);
  const plateEdges = new THREE.LineSegments(new THREE.EdgesGeometry(plateGeometry), material(new THREE.LineBasicMaterial({color:0x438c97, transparent:true, opacity:0.7, depthWrite:false})));
  plateEdges.name = 'transparent plate edges'; plate.add(plateEdges);

  return {
    group, source, area, plate,
    dispose() {
      group.removeFromParent();
      group.traverse(object => object.geometry?.dispose());
      for (const m of materials) m.dispose();
    }
  };
}
