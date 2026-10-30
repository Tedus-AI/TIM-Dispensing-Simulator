"""Rebuild the generic display-only nozzle coupling in Blender 5.2.

Units: source dimensions below are mm, converted to Blender metres.
Local Z=0 is the bottom seating plane, centred on the nozzle's bore.
This is an engineering-style visualization, not an OEM CAD model.
"""
import bpy
import math
from pathlib import Path
from mathutils import Vector

HERE = Path(__file__).resolve().parent
SIM = HERE.parent.parent
GLB = SIM / 'public' / 'assets' / 'nozzle-adapter.glb'
BLEND = HERE / 'nozzle-adapter.blend'
GLB.parent.mkdir(parents=True, exist_ok=True)

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for datablocks in (bpy.data.materials, bpy.data.meshes):
    for block in list(datablocks):
        if block.users == 0:
            datablocks.remove(block)

def material(name, color, metal, rough):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    node = mat.node_tree.nodes.get('Principled BSDF')
    node.inputs['Base Color'].default_value = (*color, 1)
    node.inputs['Metallic'].default_value = metal
    node.inputs['Roughness'].default_value = rough
    return mat

steel = material('Satin stainless - generic', (.52, .57, .56), .88, .31)
machined = material('Machined bright steel - generic', (.72, .75, .72), .9, .24)
seal = material('Dark elastomer ring', (.075, .085, .08), .0, .75)
bronze = material('Pale satin brass indexing band', (.48, .38, .19), .76, .35)

def ring(name, z0, z1, inner, outer, mat, sides=64, shape='round', bevel=.13):
    """Closed annular solid; surfaces at shared z planes remain mechanically joined."""
    vertices=[]
    for radius_mode,z in [('inner',z0),('outer',z0),('outer',z1),('inner',z1)]:
        for i in range(sides):
            a=2*math.pi*i/sides
            radius=inner if radius_mode=='inner' else outer
            if radius_mode=='outer' and shape=='hex':
                # Circumradius `outer`, six true flats; circular internal bore retained.
                sector=((a+math.pi/6)%(math.pi/3))-math.pi/6
                radius=outer*math.cos(math.pi/6)/math.cos(sector)
            if radius_mode=='outer' and shape=='grip':
                # Subtle 40-tooth grip, radial millimetre depths, no floating decorations.
                radius=outer-(.10 if i%2 else 0)
            vertices.append((radius*math.cos(a)*.001,radius*math.sin(a)*.001,z*.001))
    faces=[]
    for j in range(4):
        for i in range(sides):
            n=(i+1)%sides
            faces.append((j*sides+i,j*sides+n,((j+1)%4)*sides+n,((j+1)%4)*sides+i))
    mesh=bpy.data.meshes.new(name+' mesh')
    mesh.from_pydata(vertices,[],faces);mesh.update()
    obj=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    for polygon in obj.data.polygons:
        polygon.use_smooth = abs(polygon.normal.z)<.5 and shape=='round'
    if bevel:
        bpy.context.view_layer.objects.active=obj;obj.select_set(True)
        mod=obj.modifiers.new('Machined edge break', 'BEVEL')
        mod.width=bevel*.001;mod.segments=2
        bpy.ops.object.modifier_apply(modifier=mod.name)
        obj.select_set(False)
    obj['source_units']='mm'
    obj['description']='Generic visual engineering assumption, not OEM CAD'
    return obj

# Bore radius 5.05 mm leaves radial clearance for the current virtual nozzle
# at its largest allowed outside radius, 4.6 mm (8 mm bore + 0.6 mm wall).
ring('01 Lower seating ferrule',0,2.7,5.05,6.65,machined)
ring('02 Turned ferrule shoulder',2.7,4.0,5.05,7.2,steel)
ring('03 Wrench hexagonal gland',4.0,8.8,5.05,8.35,steel,sides=96,shape='hex',bevel=.17)
ring('04 Identification band',8.8,9.3,5.05,7.1,bronze,bevel=.08)
ring('05 Grip sleeve',9.3,12.8,5.05,7.25,machined,sides=80,shape='grip',bevel=.06)
ring('06 Sealing ring',12.8,13.5,5.05,6.85,seal,bevel=.05)
ring('07 Upper retaining sleeve',13.5,16.0,5.05,7.25,steel,bevel=.13)

# Encode a precise and easy-to-find mating datum in the editable .blend.
datum=bpy.data.objects.new('DATUM_bottom_seat_z0',None)
bpy.context.collection.objects.link(datum);datum.empty_display_type='CIRCLE';datum.empty_display_size=.003
datum['unit']='metre';datum['purpose']='Nozzle axis (X=0,Y=0), bottom seat Z=0'

bpy.context.scene.unit_settings.system='METRIC'
bpy.context.scene.unit_settings.scale_length=1.0
bpy.context.scene['unit_convention']='Blender metres; 1 mm = 0.001 m; Z up; mating bottom plane local Z=0.'
bpy.context.scene['provenance']='Generic artistic mechanical assembly. Not a scanned or manufacturer-specific model.'
bpy.ops.wm.save_as_mainfile(filepath=str(BLEND), compress=True)

bpy.ops.object.select_all(action='DESELECT')
for obj in bpy.context.scene.objects:
    if obj.type=='MESH': obj.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(GLB),export_format='GLB',use_selection=True,
    export_yup=True,export_apply=True,export_extras=True,export_cameras=False,export_lights=False,
    export_materials='EXPORT',export_animations=False)

mesh_objects=[obj for obj in bpy.context.scene.objects if obj.type=='MESH']
corners=[obj.matrix_world @ Vector(corner) for obj in mesh_objects for corner in obj.bound_box]
print('DIMENSIONS_MM',*[round((max(v[i] for v in corners)-min(v[i] for v in corners))*1000,5) for i in range(3)])
print('BOUNDS_MM_MIN',*[round(min(v[i] for v in corners)*1000,5) for i in range(3)])
print('BOUNDS_MM_MAX',*[round(max(v[i] for v in corners)*1000,5) for i in range(3)])
print('PARTS',len(mesh_objects),'TRIANGLES',sum(sum(len(poly.vertices)-2 for poly in obj.data.polygons) for obj in mesh_objects))
print('GLB',GLB,GLB.stat().st_size,'BYTES')
print('BLEND',BLEND,BLEND.stat().st_size,'BYTES')
