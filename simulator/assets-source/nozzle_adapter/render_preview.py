"""Render a diagnostic preview, without saving lighting into the deliverable asset."""
import bpy
from pathlib import Path
from mathutils import Vector
here=Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(here/'nozzle-adapter.blend'))
scene=bpy.context.scene
scene.render.engine='CYCLES';scene.cycles.samples=32
scene.render.resolution_x=720;scene.render.resolution_y=720;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.film_transparent=False
scene.world.color=(.25,.25,.25)

def aim(obj,target):obj.rotation_euler=(Vector(target)-obj.location).to_track_quat('-Z','Y').to_euler()

bpy.ops.object.camera_add(location=(.039,-.050,.037))
cam=bpy.context.object;cam.data.type='ORTHO';cam.data.ortho_scale=.035;cam.data.clip_start=.0001;aim(cam,(0,0,.008));scene.camera=cam
for name,location,power,size in [('Key',(.024,-.035,.05),.06,.07),('Fill',(-.040,-.015,.025),.035,.08),('Rim',(.005,.040,.04),.07,.05)]:
    bpy.ops.object.light_add(type='AREA',location=location)
    light=bpy.context.object;light.name=name;light.data.energy=power;light.data.shape='DISK';light.data.size=size;aim(light,(0,0,.008))
scene.view_settings.view_transform='AgX'
scene.render.filepath=str(here/'nozzle-adapter-preview.png')
bpy.ops.render.render(write_still=True)
