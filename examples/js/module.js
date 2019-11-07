import { World } from 'https://ecsy.io/build/ecsy.module.js';
import { GameSystem, TransformSystem, MeshSystem, LightSystem, MaterialSystem, ParticleSystem, Transform, Camera, Mesh, Material, MeshTypes, Light, LightTypes, Particle } from '../../dist/ecsy-babylon.module.js';

const canvas = document.getElementById("renderCanvas");
const world = new World();
world
    .registerSystem(GameSystem)
    .registerSystem(TransformSystem)
    .registerSystem(MeshSystem)
    .registerSystem(LightSystem)
    .registerSystem(MaterialSystem)
    .registerSystem(ParticleSystem);
const game = world.getSystem(GameSystem);
game.start(canvas, false).addScene("Scene1");
const camera = world.createEntity()
    .addComponent(Transform)
    .addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;
[
    { diffuse: "#E74C3C", pz: 3, ry: 0, sx: 0.8 },
    { diffuse: "#27AE60", px: 3, ry: 15, sz: 1.6 },
    { diffuse: "#3498DB", pz: -3, ry: 30, sx: 0.8 },
    { diffuse: "#F1C40F", px: -3, ry: 45, sz: 1.6 },
].forEach(box => {
    const entity = world.createEntity()
        .addComponent(Transform)
        .addComponent(Mesh)
        .addComponent(Material, { diffuse: box.diffuse });
    box.px !== undefined && (entity.getMutableComponent(Transform).position.x = box.px);
    box.pz !== undefined && (entity.getMutableComponent(Transform).position.z = box.pz);
    entity.getMutableComponent(Transform).rotation.y = box.ry;
    box.sx !== undefined && (entity.getMutableComponent(Transform).scale.x = box.sx);
    box.sz !== undefined && (entity.getMutableComponent(Transform).scale.z = box.sz);
});
const ground = world.createEntity()
    .addComponent(Transform)
    .addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 8, height: 8 } })
    .addComponent(Material, {
    diffuse: "#76716d",
    specular: "#a6754c",
    texture: {
        diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-diffuse-1.jpg", uScale: 4, vScale: 4 },
        specular: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-specular-1.jpg", uScale: 4, vScale: 4 },
        bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-normal-1.jpg", uScale: 4, vScale: 4 }
    }
});
ground.getMutableComponent(Transform).position.y = -0.5;
const hemiLight = world.createEntity()
    .addComponent(Transform)
    .addComponent(Light, { direction: { x: 1, y: 1, z: 0 } });
hemiLight.getMutableComponent(Light).direction.z = 1;
const pointLight = world.createEntity()
    .addComponent(Transform)
    .addComponent(Light, { type: LightTypes.Point, intensity: 1.2, specular: "#ffff00" });
pointLight.getMutableComponent(Transform).position.x = 1;
pointLight.getMutableComponent(Transform).position.z = 1;
const particle = world.createEntity()
    .addComponent(Transform)
    .addComponent(Particle, {
    emitter: { x: 1, y: 0, z: 1 },
    texture: {
        particle: { url: "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/assets/particles/textures/explosion/Flare.png" }
    }
});
particle.getMutableComponent(Transform).position.z = 3;
