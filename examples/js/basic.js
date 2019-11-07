(function (ecsy, _ecsyBabylon) {
    'use strict';

    const canvas = document.getElementById("renderCanvas");
    const world = new ecsy.World();
    world
        .registerSystem(_ecsyBabylon.GameSystem)
        .registerSystem(_ecsyBabylon.TransformSystem)
        .registerSystem(_ecsyBabylon.MeshSystem)
        .registerSystem(_ecsyBabylon.LightSystem)
        .registerSystem(_ecsyBabylon.MaterialSystem)
        .registerSystem(_ecsyBabylon.ParticleSystem);
    const game = world.getSystem(_ecsyBabylon.GameSystem);
    game.start(canvas, false).addScene("Scene1");
    const camera = world.createEntity()
        .addComponent(_ecsyBabylon.Transform)
        .addComponent(_ecsyBabylon.Camera);
    camera.getMutableComponent(_ecsyBabylon.Transform).position.y = 1.7;
    [
        { diffuse: "#E74C3C", pz: 3, ry: 0, sx: 0.8 },
        { diffuse: "#27AE60", px: 3, ry: 15, sz: 1.6 },
        { diffuse: "#3498DB", pz: -3, ry: 30, sx: 0.8 },
        { diffuse: "#F1C40F", px: -3, ry: 45, sz: 1.6 },
    ].forEach(box => {
        const entity = world.createEntity()
            .addComponent(_ecsyBabylon.Transform)
            .addComponent(_ecsyBabylon.Mesh)
            .addComponent(_ecsyBabylon.Material, { diffuse: box.diffuse });
        box.px !== undefined && (entity.getMutableComponent(_ecsyBabylon.Transform).position.x = box.px);
        box.pz !== undefined && (entity.getMutableComponent(_ecsyBabylon.Transform).position.z = box.pz);
        entity.getMutableComponent(_ecsyBabylon.Transform).rotation.y = box.ry;
        box.sx !== undefined && (entity.getMutableComponent(_ecsyBabylon.Transform).scale.x = box.sx);
        box.sz !== undefined && (entity.getMutableComponent(_ecsyBabylon.Transform).scale.z = box.sz);
    });
    const ground = world.createEntity()
        .addComponent(_ecsyBabylon.Transform)
        .addComponent(_ecsyBabylon.Mesh, { type: _ecsyBabylon.MeshTypes.Ground, options: { width: 8, height: 8 } })
        .addComponent(_ecsyBabylon.Material, {
        diffuse: "#76716d",
        specular: "#a6754c",
        texture: {
            diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-diffuse-1.jpg", uScale: 4, vScale: 4 },
            specular: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-specular-1.jpg", uScale: 4, vScale: 4 },
            bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-normal-1.jpg", uScale: 4, vScale: 4 }
        }
    });
    ground.getMutableComponent(_ecsyBabylon.Transform).position.y = -0.5;
    const hemiLight = world.createEntity()
        .addComponent(_ecsyBabylon.Transform)
        .addComponent(_ecsyBabylon.Light, { direction: { x: 1, y: 1, z: 0 } });
    hemiLight.getMutableComponent(_ecsyBabylon.Light).direction.z = 1;
    const pointLight = world.createEntity()
        .addComponent(_ecsyBabylon.Transform)
        .addComponent(_ecsyBabylon.Light, { type: _ecsyBabylon.LightTypes.Point, intensity: 1.2, specular: "#ffff00" });
    pointLight.getMutableComponent(_ecsyBabylon.Transform).position.x = 1;
    pointLight.getMutableComponent(_ecsyBabylon.Transform).position.z = 1;
    const particle = world.createEntity()
        .addComponent(_ecsyBabylon.Transform)
        .addComponent(_ecsyBabylon.Particle, {
        emitter: { x: 1, y: 0, z: 1 },
        texture: {
            particle: { url: "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/assets/particles/textures/explosion/Flare.png" }
        }
    });
    particle.getMutableComponent(_ecsyBabylon.Transform).position.z = 3;

}(ECSY, EB));
