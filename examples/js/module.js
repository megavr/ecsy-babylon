import { World } from 'https://ecsy.io/build/ecsy.module.js';
import { GameSystem, TransformSystem, MeshSystem, LightSystem, MaterialSystem, Transform, Camera, Mesh, Material, MeshTypes, Light } from '../../dist/ecsy-babylon.module.js';

const canvas = document.getElementById("renderCanvas");
const world = new World();
world
    .registerSystem(GameSystem)
    .registerSystem(TransformSystem)
    .registerSystem(MeshSystem)
    .registerSystem(LightSystem)
    .registerSystem(MaterialSystem);
const game = world.getSystem(GameSystem);
game.start(canvas, false).addScene("Scene1");
const camera = world.createEntity()
    .addComponent(Transform)
    .addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;
[
    { diffuse: "#E74C3C", z: 3 },
    { diffuse: "#3498DB", z: -3 },
    { diffuse: "#27AE60", x: 3 },
    { diffuse: "#F1C40F", x: -3 }
].forEach(box => {
    const entity = world.createEntity()
        .addComponent(Transform)
        .addComponent(Mesh)
        .addComponent(Material, { diffuse: box.diffuse });
    box.x !== undefined && (entity.getMutableComponent(Transform).position.x = box.x);
    box.z !== undefined && (entity.getMutableComponent(Transform).position.z = box.z);
});
const ground = world.createEntity()
    .addComponent(Transform)
    .addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 8, height: 8 } })
    .addComponent(Material, { diffuse: "#76716d", specular: "#a6754c" });
ground.getMutableComponent(Transform).position.y = -0.5;
const light = world.createEntity()
    .addComponent(Transform)
    .addComponent(Light);
light.getMutableComponent(Light).direction.x = 1;
light.getMutableComponent(Light).direction.y = 1;
