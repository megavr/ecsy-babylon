# ecsy-babylon
babylon.js ecsy binding and helpers

### Getting Started

1. Add script tags of Babylon.js, ecsy and ecsy-babylon.
2. Add a canvas tag as container.
3. Build a basic scene.
```javascript
<html>
  <head>
    <script src="https://unpkg.com/ecsy@0.2.1/build/ecsy.min.js"></script>
    <script src="https://unpkg.com/babylonjs@4.1.0-beta.18/babylon.js"></script>
    <script src="https://unpkg.com/@megavr/ecsy-babylon@0.0.9/dist/ecsy-babylon.min.js"></script>
  </head>
  <body>
    <canvas id="renderCanvas" style="width: 100%; height: 100%"></canvas>
    <script>
      /** Step 1 - Preparation */
      // create a ECSY world object
      const world = new ECSY.World();
      // register necessary systems from ecsy-babylon(global name: EB)
      world
        .registerSystem(EB.GameSystem)
        .registerSystem(EB.TransformSystem)
        .registerSystem(EB.CameraSystem)
        .registerSystem(EB.MeshSystem)
        .registerSystem(EB.InputSystem);
      
      /** Step 2 - Start the game engine */
      // get canvas element
      const canvas = document.getElementById("renderCanvas");
      // get GameSystem object
      const game = world.getSystem(EB.GameSystem);
      // start GameSystem by providing canvas object
      game.start(canvas);
      
      /** Step 3 - Start to build your scene */
      // add a scene
      const scene = world.createEntity().addComponent(EB.Scene);
      // add a camera
      const camera = world.createEntity()
        .addComponent(EB.Transform)
        .addComponent(EB.Camera);
      // up camera to height of eyes at standing human
      camera.getMutableComponent(EB.Transform).position.y = 1.7;
      // add a box
      const box = world.createEntity()
        .addComponent(EB.Transform)
        .addComponent(EB.Mesh);
      // put box in front of camera
      box.getMutableComponent(EB.Transform).position.z = 3;
      
      /** Step 4 - Add some interaction to your scene */
      // add keyboard input
      world.createEntity().addComponent(EB.Input, { onKey: onKey });
      // rotate box when press R/r key
      function onKey(key, down) {
        if (down) {
          if (key === "R" || key === "r") {
            box.getMutableComponent(EB.Transform).rotation.y += 30;
          }
        }
      }
    </script>
  </body>
</html>
```

### Examples
https://megavr.github.io/ecsy-babylon-examples/