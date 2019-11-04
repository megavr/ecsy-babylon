(function (ecsy, _ecsyBabylon) {
    'use strict';

    const canvas = document.getElementById("renderCanvas");
    const world = new ecsy.World();
    world
        .registerSystem(_ecsyBabylon.GameSystem)
        .registerSystem(_ecsyBabylon.TransformSystem)
        .registerSystem(_ecsyBabylon.MeshSystem)
        .registerSystem(_ecsyBabylon.LightSystem)
        .registerSystem(_ecsyBabylon.MaterialSystem);
    const game = world.getSystem(_ecsyBabylon.GameSystem);
    game.start(canvas, false).addScene("Scene1");
    const camera = world.createEntity()
        .addComponent(_ecsyBabylon.Transform)
        .addComponent(_ecsyBabylon.Camera);
    camera.getMutableComponent(_ecsyBabylon.Transform).position.y = 1.7;
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
            .addComponent(_ecsyBabylon.Transform)
            .addComponent(_ecsyBabylon.Mesh)
            .addComponent(_ecsyBabylon.Material, { diffuse: box.diffuse, wireframe: box.wireframe || false });
        box.x !== undefined && (entity.getMutableComponent(_ecsyBabylon.Transform).position.x = box.x);
        box.z !== undefined && (entity.getMutableComponent(_ecsyBabylon.Transform).position.z = box.z);
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
    const light = world.createEntity()
        .addComponent(_ecsyBabylon.Transform)
        .addComponent(_ecsyBabylon.Light);
    light.getMutableComponent(_ecsyBabylon.Light).direction.x = 1;
    light.getMutableComponent(_ecsyBabylon.Light).direction.y = 1;
    const pointLight = world.createEntity().addComponent(_ecsyBabylon.Transform).addComponent(_ecsyBabylon.Light, { type: _ecsyBabylon.LightTypes.Point });
    pointLight.getMutableComponent(_ecsyBabylon.Transform).position.z = -1;
    pointLight.getMutableComponent(_ecsyBabylon.Transform).position.y = 0.5;

}(ECSY, EB));
