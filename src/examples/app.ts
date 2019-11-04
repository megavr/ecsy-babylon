import { World } from "ecsy";
import { GameSystem, TransformSystem, MeshSystem, LightSystem, MaterialSystem, Transform, Camera, Mesh, MeshTypes, Light, LightTypes, Material } from "@ecsy-babylon";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const world = new World();
world
  .registerSystem(GameSystem)
  .registerSystem(TransformSystem)
  .registerSystem(MeshSystem)
  .registerSystem(LightSystem)
  .registerSystem(MaterialSystem);

const game = world.getSystem(GameSystem) as GameSystem;
game.start(canvas, false).addScene("Scene1");

const camera = world.createEntity()
  .addComponent(Transform)
  .addComponent(Camera);

camera.getMutableComponent(Transform).position.y = 1.7;

[
  { diffuse: "#E74C3C", z: 3 },
  { diffuse: "#E74C3C", wireframe: true, x: 2, z: 2 },
  { diffuse: "#27AE60", x: 3 },
  { diffuse: "#27AE60", wireframe: true, x: 2, z: -2 },
  { diffuse: "#3498DB", z: -3 },
  { diffuse: "#3498DB", wireframe: true, x: -2, z: -2 },
  { diffuse: "#F1C40F", x: -3 },
  { diffuse: "#F1C40F", wireframe: true, x: -2, z: 2 },
].forEach(box => {
  const entity = world.createEntity()
    .addComponent(Transform)
    .addComponent(Mesh)
    .addComponent(Material, { diffuse: box.diffuse, wireframe: box.wireframe || false });

  box.x !== undefined && (entity.getMutableComponent(Transform).position.x = box.x);
  box.z !== undefined && (entity.getMutableComponent(Transform).position.z = box.z);
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

const light = world.createEntity()
  .addComponent(Transform)
  .addComponent(Light);

light.getMutableComponent(Light).direction.x = 1;
light.getMutableComponent(Light).direction.y = 1;

const pointLight = world.createEntity().addComponent(Transform).addComponent(Light, { type: LightTypes.Point });
pointLight.getMutableComponent(Transform).position.z = -1;
pointLight.getMutableComponent(Transform).position.y = 0.5;