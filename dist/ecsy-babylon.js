(function (BABYLON, ecsy) {
    'use strict';

    /**
     * @example
     * ```
     * entity.addComponent(Scene, { color: { clear: "123ABCFF" } });
     * ```
     */
    class Scene {
        constructor() {
            /** @see https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions */
            this.options = {};
        }
    }

    /**
     * Translate degree to radians.
     * @param degree Degree
     */
    function degreeToRadians(degree) {
        return BABYLON.Angle.FromDegrees(degree).radians();
    }
    /**
     * Convert XYZProperties value to Vector3.
     * @param properties XYZProperties value
     */
    function xyzToVector3(properties) {
        return new BABYLON.Vector3(properties.x, properties.y, properties.z);
    }
    /**
     * Convert XYZProperties degree value to Vector3 in radians.
     * @param properties XYZProperties value in degrees
     */
    function xyzToVector3Radians(properties) {
        return new BABYLON.Vector3(degreeToRadians(properties.x), degreeToRadians(properties.y), degreeToRadians(properties.z));
    }
    /**
     * @hidden
     * Create object by XYZ values or create all zero object.
     * @param x value
     * @param y value
     * @param z value
     * @returns Object matches XYZProperties
     */
    function xyz(x, y, z) {
        if (x && y && z) {
            return { x: x, y: y, z: z };
        }
        else {
            return { x: 0, y: 0, z: 0 };
        }
    }

    /**
     * @example
     * ```
     * entity.addComponent(Transform);
     * ```
     */
    class Transform {
        constructor() {
            /** @default 0,0,0 */
            this.position = xyz();
            /** @default 0,0,0 */
            this.rotation = xyz();
            /** @default 1,1,1 */
            this.scale = xyz(1, 1, 1);
        }
    }

    /**
     * @example
     * ```
     * entity.addComponent(Camera, { pointerLock: true });
     * ```
     */
    class Camera {
        constructor() {
            /**
             * Lock pointer when using the camera.
             * @see https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
             * @default false
             */
            this.pointerLock = false;
        }
    }

    var MeshTypes;
    (function (MeshTypes) {
        MeshTypes["Box"] = "Box";
        MeshTypes["Plane"] = "Plane";
        MeshTypes["Sphere"] = "Sphere";
        MeshTypes["Ground"] = "Ground";
    })(MeshTypes || (MeshTypes = {}));
    /**
     * @example
     * ```
     * entity.addComponent(Mesh);
     * entity.addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 2, height: 2 } });
     * entity.addComponent(Mesh, { type: MeshTypes.Sphere, options: { diameter: 2 } });
     * ```
     */
    class Mesh {
        constructor() {
            /** @default "Box" */
            this.type = MeshTypes.Box;
            /** @default {} */
            this.options = {};
        }
    }

    var LightTypes;
    (function (LightTypes) {
        LightTypes["Point"] = "Point";
        LightTypes["Directional"] = "Directional";
        LightTypes["Spot"] = "Spot";
        LightTypes["Hemispheric"] = "Hemispheric";
    })(LightTypes || (LightTypes = {}));
    /**
     * @example
     * ```
     * entity.addComponent(Light, { color: { diffuse: "#AAFFAA" } });
     * entity.addComponent(Light, { type: LightTypes.Point, intensity: 2 });
     * entity.addComponent(Light, { type: LightTypes.Directional, direction: { x: 0, y: 0, z: 1 } });
     * entity.addComponent(Light, { type: LightTypes.Spot, direction: { x: 0, y: 0, z: 1 }, angle: 30, exponent: 2 });
     * ```
     */
    class Light {
        constructor() {
            /** @default "Hemispheric" */
            this.type = LightTypes.Hemispheric;
            /**
             * @see https://doc.babylonjs.com/api/classes/babylon.shadowlight#direction
             * @default 0,0,0
             */
            this.direction = xyz();
        }
    }

    /**
     * @hidden
     * Update value of Babylon.js object's property from a property in component with same name.
     * @param component Component contains Babylon.js object
     * @param name Name of property in the component
     */
    function updateObjectValue(component, name) {
        component.object[name] = component[name];
    }
    /**
     * @hidden
     * Update Vector3 of Babylon.js object's property from property in component with same name.
     * @param component Component contains Babylon.js object
     * @param name Name of property in the component, value of property should matches XYZProperties
     */
    function updateObjectVector3(component, name) {
        component.object[name] = xyzToVector3(component[name]);
    }
    /**
     * @hidden
     * Update transformation of ObjectComponents in entity.
     * @param entity Entity to be updated
     */
    function updateObjectsTransform(entity) {
        let components = entity.getComponents();
        for (let prop in components) {
            let component = components[prop];
            (component.object && entity.hasComponent(Transform)) && updateObjectTransform(entity.getMutableComponent(Transform), component);
        }
    }
    /**
     * @hidden
     * Update transformation to an ObjectComponent.
     * @param transform Transfrom component in the entity
     * @param component A component has Babylon.js object
     */
    function updateObjectTransform(transform, component) {
        let object = component.object;
        object.position && (object.position = xyzToVector3(transform.position));
        object.rotation && (object.rotation = xyzToVector3Radians(transform.rotation));
        object.scaling && (object.scaling = xyzToVector3(transform.scale));
    }
    /**
     * @hidden
     * Dispose Babylon.js object in the component.
     * @param object Component contains Babylon.js object
     */
    function disposeObject(component) {
        component.object && component.object.dispose();
    }

    /**
     * @hidden
     * Update texture object to a component for its texture properties.
     * @param component TextureComponent in the entity
     * @param textureProperties Texture properties to be update
     * @param assetManager AssetManager to process textures
     */
    function updateTexture(component, textureProperties, assetManager) {
        for (let prop in textureProperties) {
            let textureAttributes = textureProperties[prop];
            let task = assetManager.addTextureTask(prop, textureAttributes.url);
            task.onSuccess = (task) => {
                let textureObject = task.texture;
                for (let attr in textureAttributes) {
                    attr !== "url" && (textureObject[attr] = textureAttributes[attr]);
                }
                let textureName = `${prop}Texture`;
                let componentObject = component.object;
                componentObject[textureName] && disposeObject(componentObject[textureName]);
                componentObject[textureName] = textureObject;
            };
        }
        assetManager.load();
        assetManager.reset();
    }
    /**
     * @hidden
     * Create object of material color values or create a material color object with white diffuse.
     * @param diffuse Diffuse color in hex string. e.g., #123ABC
     * @returns Object matches MaterialColorProperties
     */
    function materialColorHex(diffuse) {
        if (diffuse) {
            return { diffuse: diffuse };
        }
        else {
            return { diffuse: "#ffffff" };
        }
    }
    /**
     * Convert hex color value to Color3.
     * @param hexString Text of hex color value(e.g., #123ABC)
     */
    function hexToColor3(hexString) {
        return BABYLON.Color3.FromHexString(hexString);
    }
    /**
     * Convert hex color value to Color4 (has alpha).
     * @param hexString Text of hex color value(e.g., #123ABCFF)
     */
    function hexToColor4(hexString) {
        return BABYLON.Color4.FromHexString(hexString);
    }

    /**
     * @example
     * ```
     * entity.addComponent(Mesh).addComponent(Material, {
     *    alpha: 0.7,
     *    color: { diffuse: "#E74C3C" }
     * });
     * entity.addComponent(Mesh).addComponent(Material, {
     *    texture: {
     *      diffuse: { url: "PATH_TO_TEXTURE", uScale: 4, vScale: 4 }
     *    }
     * });
     * ```
     */
    class Material {
        constructor() {
            /** @default { diffuse: "#ffffff" } */
            this.color = materialColorHex();
        }
    }

    var ParticleTypes;
    (function (ParticleTypes) {
        ParticleTypes["Point"] = "Point";
        ParticleTypes["Box"] = "Box";
        ParticleTypes["Sphere"] = "Sphere";
        ParticleTypes["DirectedSphere"] = "DirectedSphere";
        ParticleTypes["Hemisphere"] = "Hemisphere";
        ParticleTypes["Cylinder"] = "Cylinder";
        ParticleTypes["DirectedCylinder"] = "DirectedCylinder";
        ParticleTypes["Cone"] = "Cone";
    })(ParticleTypes || (ParticleTypes = {}));
    /**
     * @example
     * ```
     * entity.addComponent(Particle, {
     *    emitter: { x: 0, y: 0, z: 1 },
     *    texture: {
     *      diffuse: { url: "PATH_TO_PARTICLE_TEXTURE" }
     *    }
     * });
     * ```
     */
    class Particle {
        constructor() {
            /** @default "Point" */
            this.type = ParticleTypes.Point;
            /**
             * @see https://doc.babylonjs.com/api/classes/babylon.particlesystem#constructor
             * @default 100
             */
            this.capacity = 100;
            /**
             * @see https://doc.babylonjs.com/api/classes/babylon.particlesystem#emitter
             * @default 0,0,0
             */
            this.emitter = xyz();
            /**
             * @memberof Point, Box, DirectedSphere, Cylinder
             * @default 0,0,0
             */
            this.direction1 = xyz();
            /**
             * @memberof Point, Box, DirectedSphere, Cylinder
             * @default 10,10,10
             */
            this.direction2 = xyz(10, 10, 10);
            /**
             * @memberof Box
             * @default 0,0,0
             */
            this.minEmitBox = xyz();
            /**
             * @memberof Box
             * @default 0,0,0
             */
            this.maxEmitBox = xyz();
        }
    }

    var AssetTypes;
    (function (AssetTypes) {
        AssetTypes["Babylon"] = "Babylon";
    })(AssetTypes || (AssetTypes = {}));
    /**
     * @example
     * ```
     * entity.addComponent(Asset, { url: "PATH_TO_ASSET" });
     * ```
     */
    class Asset {
        constructor() {
            /** @default "Babylon" */
            this.type = AssetTypes.Babylon;
        }
    }

    var InputTypes;
    (function (InputTypes) {
        InputTypes["Keyboard"] = "Keyboard";
    })(InputTypes || (InputTypes = {}));
    /**
     * @example Keyboard
     * ```
     * entity.addComponent(Input, { onKey: onKey });
     * function onKey(key, down, up) {
     *   if (down) console.log(key + " is pressing.");
     * }
     * ```
     */
    class Input {
        constructor() {
            /** @default "Keyboard" */
            this.type = InputTypes.Keyboard;
        }
    }

    /**
     * @hidden
     * Hack on ecsy to get World instance from system itself.
     * @param system A registered ecsy System class
     * @returns ecsy world
     */
    function getWorld(system) {
        return system["world"];
    }

    /** Core system of ecsy-babylon. */
    class GameSystem extends ecsy.System {
        constructor() {
            super(...arguments);
            /** <Scene UID, BABYLON.AssetsManager> */
            this._assetManagers = new Map();
            /** Observable event when active scene is switched. */
            this.onSceneSwitched = new BABYLON.Observable();
        }
        /** Get canvas used for rendering. */
        get renderingCanvas() { return this._engine.getRenderingCanvas(); }
        /** Get all scenes in engine. */
        get scenes() { return this._engine.scenes; }
        /** Get active scene. */
        get activeScene() { return this._activeScene; }
        /** @hidden */
        init() {
            this._render = this._render.bind(this);
        }
        /** @hidden */
        execute() {
            this.queries.scene.added.forEach((entity) => {
                let scene = entity.getComponent(Scene);
                scene.object = new BABYLON.Scene(this._engine, scene.options);
                this._engine.scenes.length === 1 && (this._activeScene = scene.object);
                this._updateScene(entity);
                // add assetManager for each scenes 
                let assetManager = new BABYLON.AssetsManager(scene.object);
                assetManager.useDefaultLoadingScreen = false;
                this._assetManagers.set(scene.object.uid, assetManager);
            });
            this.queries.scene.changed.forEach((entity) => {
                this._updateScene(entity);
            });
            this.queries.scene.removed.forEach((entity) => {
                let scene = entity.getComponent(Scene);
                disposeObject(scene);
            });
        }
        _updateScene(entity) {
            let scene = entity.getComponent(Scene);
            for (let prop in scene) {
                switch (prop) {
                    case "texture":
                        updateTexture(scene, scene.texture, this.getAssetManager(entity));
                        break;
                    case "color":
                        this._updateColor(scene, scene.color);
                        break;
                    default:
                        updateObjectValue(scene, prop);
                        break;
                }
            }
        }
        _updateColor(scene, color) {
            for (let prop in color) {
                switch (prop) {
                    case "clear":
                        scene.object[`${prop}Color`] = hexToColor4(color[prop]);
                        break;
                    default:
                        scene.object[`${prop}Color`] = hexToColor3(color[prop]);
                        break;
                }
            }
        }
        /**
         * Start game system in the world can be used by other systems & components.
         * @see https://doc.babylonjs.com/api/classes/babylon.engine#constructor
         * @param canvas WebGL context to be used for rendering
         * @param antialias defines enable antialiasing (default: false)
         * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.engineoptions
         * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
         */
        start(canvas, antialias, options, adaptToDeviceRatio) {
            this._engine = new BABYLON.Engine(canvas, antialias, options, adaptToDeviceRatio);
            this._engine.runRenderLoop(this._render);
            return this;
        }
        /**
         * Switch to a scene by given scene entity.
         * @param scene Scene entity
         */
        switchScene(scene) {
            this._activeScene = scene.getComponent(Scene).object;
            this.onSceneSwitched.notifyObservers(this._activeScene);
            return this;
        }
        /**
         * Get scene AssetManager or return AssetManager in active scene.
         * @param scene Scene entity
         */
        getAssetManager(scene) {
            if (scene) {
                return this._assetManagers.get(scene.getComponent(Scene).object.uid);
            }
            else {
                return this._assetManagers.get(this._activeScene.uid);
            }
        }
        _render() {
            getWorld(this).execute(this._engine.getDeltaTime(), performance.now());
            getWorld(this).enabled && this._activeScene.render();
        }
    }
    /** @hidden */
    GameSystem.queries = {
        scene: { components: [Scene], listen: { added: true, removed: true, changed: [Scene] } },
    };

    /** System for Transform component */
    class TransformSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.transforms.changed.forEach((entity) => {
                updateObjectsTransform(entity);
            });
        }
    }
    /** @hidden */
    TransformSystem.queries = {
        transforms: { components: [Transform], listen: { changed: [Transform] } },
    };

    /**
     * @hidden
     * Get runtime GameSystem instance.
     * @param system A registered ecsy System class
     */
    function getGameSystem(system) {
        return getWorld(system).getSystem(GameSystem);
    }
    /**
     * @hidden
     * Get canvas used for rendering.
     * @param system A registered ecsy System class
     */
    function getRenderingCanvas(system) {
        return getGameSystem(system).renderingCanvas;
    }
    /**
     * @hidden
     * Get all scenes in engine.
     * @param system A registered ecsy System class
     */
    function getScenes(system) {
        return getGameSystem(system).scenes;
    }
    /**
     * Get a scene or return active scene.
     * @param system A registered ecsy System class
     * @param scene Scene entity
     */
    function getScene(system, scene) {
        if (scene) {
            return scene.getComponent(Scene).object;
        }
        else {
            return getGameSystem(system).activeScene;
        }
    }
    /**
     * Get scene AssetManager or return AssetManager in active scene.
     * @param system A registered ecsy System class
     * @param scene Scene entity
     */
    function getAssetManager(system, scene) {
        return getGameSystem(system).getAssetManager(scene);
    }

    /** System for Camera component */
    class CameraSystem extends ecsy.System {
        constructor() {
            super(...arguments);
            /** <BABYLON.Scene.uid, Camera component> */
            this._cameras = new Map();
        }
        /** @hidden */
        init() {
            getGameSystem(this).onSceneSwitched.add(scene => this._updateControl(scene));
            this._pointerLock = this._pointerLock.bind(this);
        }
        /** @hidden */
        execute() {
            this.queries.camera.added.forEach((entity) => {
                let camera = entity.getComponent(Camera);
                let scene = getScene(this, camera.scene);
                camera.object = new BABYLON.FreeCamera("", BABYLON.Vector3.Zero(), scene);
                updateObjectsTransform(entity);
                this._cameras.set(scene.uid, camera);
                this._updateControl(scene);
            });
            this.queries.camera.removed.forEach((entity) => {
                let camera = entity.getComponent(Camera);
                let scene = getScene(this, camera.scene);
                this._removeControl(scene);
                this._cameras.has(scene.uid) && this._cameras.delete(scene.uid);
                disposeObject(camera);
            });
        }
        _updateControl(targetScene) {
            if (targetScene.uid === getScene(this).uid) {
                getScenes(this).forEach(scene => this._removeControl(scene));
                let camera = this._cameras.get(targetScene.uid);
                camera.object.attachControl(getRenderingCanvas(this));
                camera.pointerLock ? targetScene.onPointerObservable.add(this._pointerLock) : document.exitPointerLock();
            }
        }
        _removeControl(scene) {
            this._cameras.forEach((camera, sceneUID) => sceneUID === scene.uid && camera.object.detachControl(getRenderingCanvas(this)));
            scene.onPointerObservable.removeCallback(this._pointerLock);
        }
        _pointerLock(pointerInfo) {
            pointerInfo.event.type === "pointerdown" && (document.pointerLockElement || getRenderingCanvas(this).requestPointerLock());
        }
    }
    /** @hidden */
    CameraSystem.queries = {
        camera: { components: [Camera], listen: { added: true, removed: true } },
    };

    /** System for Mesh component */
    class MeshSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.mesh.added.forEach((entity) => {
                let mesh = entity.getComponent(Mesh);
                mesh.object = BABYLON.MeshBuilder[`Create${mesh.type}`].call(this, mesh.type, mesh.options, getScene(this, mesh.scene));
                updateObjectsTransform(entity);
            });
            this.queries.mesh.changed.forEach((entity) => {
                let mesh = entity.getMutableComponent(Mesh);
                for (let prop in mesh) {
                    updateObjectValue(mesh, prop);
                }
            });
            this.queries.mesh.removed.forEach((entity) => {
                disposeObject(entity.getComponent(Mesh));
            });
        }
    }
    /** @hidden */
    MeshSystem.queries = {
        mesh: { components: [Mesh], listen: { added: true, removed: true, changed: [Mesh] } },
    };

    /** System for Light component */
    class LightSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.light.added.forEach((entity) => {
                let light = entity.getComponent(Light);
                let direction = xyzToVector3(light.direction);
                let scene = getScene(this, light.scene);
                switch (light.type) {
                    case LightTypes.Point:
                        light.object = new BABYLON.PointLight(light.type, BABYLON.Vector3.Zero(), scene);
                        break;
                    case LightTypes.Directional:
                        light.object = new BABYLON.DirectionalLight(light.type, direction, scene);
                        break;
                    case LightTypes.Spot:
                        light.object = new BABYLON.SpotLight(light.type, BABYLON.Vector3.Zero(), direction, degreeToRadians(light.angle), light.exponent, scene);
                        break;
                    default:
                        light.object = new BABYLON.HemisphericLight(LightTypes.Hemispheric, direction, scene);
                        break;
                }
                this._updateLight(light);
                updateObjectsTransform(entity);
            });
            this.queries.light.changed.forEach((entity) => {
                this._updateLight(entity.getComponent(Light));
            });
            this.queries.light.removed.forEach((entity) => {
                disposeObject(entity.getComponent(Light));
            });
        }
        _updateLight(light) {
            for (let prop in light) {
                switch (prop) {
                    case "direction":
                        updateObjectVector3(light, prop);
                        break;
                    case "color":
                        this._updateColor(light, light.color);
                        break;
                    default:
                        updateObjectValue(light, prop);
                        break;
                }
            }
        }
        _updateColor(light, color) {
            for (let prop in color) {
                light.object[prop] = hexToColor3(color[prop]);
            }
        }
    }
    /** @hidden */
    LightSystem.queries = {
        light: { components: [Light], listen: { added: true, removed: true, changed: [Light] } },
    };

    /** System for Material component */
    class MaterialSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.meshMaterial.added.forEach((entity) => {
                let material = entity.getComponent(Material);
                material.object = new BABYLON.StandardMaterial(material.color.diffuse, getScene(this, material.scene));
                this._updateMaterial(material);
                entity.getComponent(Mesh).object.material = material.object;
            });
            this.queries.meshMaterial.changed.forEach((entity) => {
                this._updateMaterial(entity.getComponent(Material));
            });
            this.queries.meshMaterial.removed.forEach((entity) => {
                disposeObject(entity.getComponent(Material));
                entity.getComponent(Mesh).object.material = null;
            });
        }
        _updateMaterial(material) {
            for (let prop in material) {
                switch (prop) {
                    case "color":
                        this._updateColor(material, material.color);
                        break;
                    case "texture":
                        updateTexture(material, material.texture, getAssetManager(this, material.scene));
                        break;
                    default:
                        updateObjectValue(material, prop);
                        break;
                }
            }
        }
        _updateColor(material, color) {
            for (let prop in color) {
                (material.object[`${prop}Color`] = hexToColor3(color[prop]));
            }
        }
    }
    /** @hidden */
    MaterialSystem.queries = {
        meshMaterial: { components: [Mesh, Material], listen: { added: true, removed: true, changed: [Material] } },
    };

    /** System for Particle component */
    class ParticleSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.particle.added.forEach((entity) => {
                let particle = entity.getComponent(Particle);
                particle.object = new BABYLON.ParticleSystem(particle.type, particle.capacity, getScene(this, particle.scene));
                let particleObject = particle.object;
                switch (particle.type) {
                    case ParticleTypes.Point:
                        particleObject.createPointEmitter(xyzToVector3(particle.direction1), xyzToVector3(particle.direction2));
                        break;
                    case ParticleTypes.Box:
                        particleObject.createBoxEmitter(xyzToVector3(particle.direction1), xyzToVector3(particle.direction2), xyzToVector3(particle.minEmitBox), xyzToVector3(particle.maxEmitBox));
                        break;
                    case ParticleTypes.Sphere:
                        particleObject.createSphereEmitter(particle.radius, particle.radiusRange);
                        break;
                    case ParticleTypes.DirectedSphere:
                        particleObject.createDirectedSphereEmitter(particle.radius, xyzToVector3(particle.direction1), xyzToVector3(particle.direction2));
                        break;
                    case ParticleTypes.Hemisphere:
                        particleObject.createHemisphericEmitter(particle.radius, particle.radiusRange);
                        break;
                    case ParticleTypes.Cylinder:
                        particleObject.createCylinderEmitter(particle.radius, particle.height, particle.radiusRange, Math.random());
                        break;
                    case ParticleTypes.DirectedCylinder:
                        particleObject.createDirectedCylinderEmitter(particle.radius, particle.height, particle.radiusRange, xyzToVector3(particle.direction1), xyzToVector3(particle.direction2));
                        break;
                    case ParticleTypes.Cone:
                        particleObject.createConeEmitter(particle.radius, particle.angle);
                        break;
                }
                this._updateParticle(particle);
                updateObjectsTransform(entity);
                particleObject.start();
            });
            this.queries.particle.changed.forEach((entity) => {
                this._updateParticle(entity.getComponent(Particle));
            });
            this.queries.particle.removed.forEach((entity) => {
                let particle = entity.getComponent(Particle);
                particle.object.stop();
                disposeObject(particle);
            });
        }
        _updateParticle(particle) {
            for (let prop in particle) {
                switch (prop) {
                    case "emitter":
                    case "direction1":
                    case "direction2":
                    case "minEmitBox":
                    case "maxEmitBox":
                        updateObjectVector3(particle, prop);
                        break;
                    case "texture":
                        updateTexture(particle, particle.texture, getAssetManager(this, particle.scene));
                        break;
                    case "color":
                        this._updateColor(particle, particle.color);
                        break;
                    default:
                        updateObjectValue(particle, prop);
                        break;
                }
            }
        }
        _updateColor(particle, color) {
            for (let prop in color) {
                particle.object[prop] = hexToColor4(color[prop]);
            }
        }
    }
    /** @hidden */
    ParticleSystem.queries = {
        particle: { components: [Particle], listen: { added: true, removed: true, changed: [Particle] } },
    };

    /** System for Asset component */
    class AssetSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.asset.added.forEach((entity) => {
                let asset = entity.getComponent(Asset);
                let assetManager = getAssetManager(this, asset.scene);
                switch (asset.type) {
                    default: {
                        let filenameIndex = asset.url.lastIndexOf("/") + 1;
                        let task = assetManager.addMeshTask(AssetTypes.Babylon, "", asset.url.substring(0, filenameIndex), asset.url.substring(filenameIndex, asset.url.length));
                        task.onSuccess = (task) => {
                            asset.object = task.loadedMeshes[0];
                            updateObjectsTransform(entity);
                        };
                        break;
                    }
                }
                assetManager.load();
                assetManager.reset();
            });
            this.queries.asset.removed.forEach((entity) => {
                disposeObject(entity.getComponent(Asset));
            });
        }
    }
    /** @hidden */
    AssetSystem.queries = {
        asset: { components: [Asset], listen: { added: true, removed: true } },
    };

    /** System for Input component */
    class InputSystem extends ecsy.System {
        constructor() {
            super(...arguments);
            this._inputs = new Map();
        }
        init() {
            getGameSystem(this).onSceneSwitched.add(scene => this._updateOnKey(scene));
            this._onKey = this._onKey.bind(this);
        }
        /** @hidden */
        execute() {
            this.queries.input.added.forEach((entity) => {
                let input = entity.getComponent(Input);
                let scene = getScene(this, input.scene);
                switch (input.type) {
                    default:
                        if (!this._inputs.has(scene.uid)) {
                            this._inputs.set(scene.uid, input);
                            this._updateOnKey(scene);
                        }
                        break;
                }
            });
            this.queries.input.removed.forEach((entity) => {
                let input = entity.getComponent(Input);
                let scene = getScene(this, input.scene);
                switch (input.type) {
                    default:
                        if (this._inputs.has(scene.uid)) {
                            this._inputs.delete(scene.uid);
                            this._removeOnKey(scene);
                        }
                        break;
                }
            });
        }
        _updateOnKey(targetScene) {
            if (targetScene.uid === getScene(this).uid) {
                getScenes(this).forEach(scene => this._removeOnKey(scene));
                this._input = this._inputs.get(targetScene.uid);
                this._input.onKey && targetScene.onKeyboardObservable.add(this._onKey);
            }
        }
        _removeOnKey(scene) {
            scene.onKeyboardObservable.removeCallback(this._onKey);
        }
        _onKey(keyInfo) {
            // BABYLON.KeyboardEventTypes.KEYDOWN = 1, BABYLON.KeyboardEventTypes.KEYUP = 2
            this._input.onKey.call(this._input, keyInfo.event.key, keyInfo.type === 1, keyInfo.type === 2);
        }
    }
    /** @hidden */
    InputSystem.queries = {
        input: { components: [Input], listen: { added: true, removed: true } },
    };



    var EB = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GameSystem: GameSystem,
        TransformSystem: TransformSystem,
        CameraSystem: CameraSystem,
        MeshSystem: MeshSystem,
        LightSystem: LightSystem,
        MaterialSystem: MaterialSystem,
        ParticleSystem: ParticleSystem,
        AssetSystem: AssetSystem,
        InputSystem: InputSystem,
        Scene: Scene,
        Transform: Transform,
        Camera: Camera,
        get MeshTypes () { return MeshTypes; },
        Mesh: Mesh,
        get LightTypes () { return LightTypes; },
        Light: Light,
        Material: Material,
        get ParticleTypes () { return ParticleTypes; },
        Particle: Particle,
        get AssetTypes () { return AssetTypes; },
        Asset: Asset,
        get InputTypes () { return InputTypes; },
        Input: Input,
        getScene: getScene,
        getAssetManager: getAssetManager,
        degreeToRadians: degreeToRadians,
        xyzToVector3: xyzToVector3,
        xyzToVector3Radians: xyzToVector3Radians,
        hexToColor3: hexToColor3,
        hexToColor4: hexToColor4
    });

    window.EB = EB;

}(BABYLON, ECSY));
