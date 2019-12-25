(function (BABYLON, ecsy) {
    'use strict';

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
            /** <Scene Name, BABYLON.Scene> */
            this._scenes = new Map();
            /** <Scene Name, BABYLON.AssetsManager> */
            this._assetManagers = new Map();
            /** Observable event when active scene is switched. */
            this.onSceneSwitched = new BABYLON.Observable();
        }
        /** Get canvas used for rendering. */
        get renderingCanvas() { return this._engine.getRenderingCanvas(); }
        /** Get name of active scene. */
        get activeSceneName() { return this._activeSceneName; }
        /** @hidden */
        init() {
            this._render = this._render.bind(this);
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
         * Add a new scene with a name.
         * @see https://doc.babylonjs.com/api/classes/babylon.scene#constructor
         * @param sceneName Readable name to be used to switch or remove scene in the system
         * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions
         */
        addScene(sceneName, options) {
            // create a new scene
            let scene = new BABYLON.Scene(this._engine, options);
            this._scenes.set(sceneName, scene);
            // create a new assetsManager with scene
            let assetManager = new BABYLON.AssetsManager(scene);
            assetManager.useDefaultLoadingScreen = false;
            this._assetManagers.set(sceneName, assetManager);
            // set scene as active when no scene in engine
            this._engine.scenes.length === 1 && (this._activeSceneName = sceneName);
            return this;
        }
        /** Remove an inactive scene by given name */
        removeScene(sceneName) {
            sceneName !== this.activeSceneName && this.getScene(sceneName).dispose();
            return this;
        }
        /**
         * Switch to a scene by given scene name.
         * @param sceneName Name of scene
         */
        switchScene(sceneName) {
            if (this.getScene(sceneName)) {
                this._activeSceneName = sceneName;
                this.onSceneSwitched.notifyObservers(this.getScene(sceneName));
            }
            return this;
        }
        /**
         * Get a scene by provided name or active scene if not found.
         * @param sceneName Name of the scene
         */
        getScene(sceneName) {
            if (sceneName) {
                return this._scenes.get(sceneName);
            }
            else {
                return this._scenes.get(this._activeSceneName);
            }
        }
        /**
         * Get an asset manager by provided scene name or asset manager in active scene if not found.
         * @param sceneName Name of the scene
         */
        getAssetManager(sceneName) {
            if (sceneName) {
                return this._assetManagers.get(sceneName);
            }
            else {
                return this._assetManagers.get(this._activeSceneName);
            }
        }
        _render() {
            getWorld(this).execute(this._engine.getDeltaTime(), performance.now());
            getWorld(this).enabled && this.getScene().render();
        }
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
     * entity.addComponent(Camera, { sceneName: "Scene" });
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
     * entity.addComponent(Mesh, { sceneName: "Scene" });
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
     * entity.addComponent(Light, { sceneName: "Scene", color: { diffuse: "#AAFFAA" } });
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
     * Get a scene found or active scene if not found.
     * @param system A registered ecsy System class
     * @param sceneName Name of the scene
     */
    function getScene(system, sceneName) {
        return getGameSystem(system).getScene(sceneName);
    }
    /**
     * Get an AssetManager found or AssetManager in active scene if not found.
     * @param system A registered ecsy System class
     * @param sceneName Name of the scene
     */
    function getAssetManager(system, sceneName) {
        return getGameSystem(system).getAssetManager(sceneName);
    }
    /**
     * Get name of active scene.
     * @param system A registered ecsy System class
     */
    function getActiveSceneName(system) {
        return getGameSystem(system).activeSceneName;
    }

    /**
     * Translate degree to radians.
     * @param degree Degree
     */
    function degreeToRadians(degree) {
        return BABYLON.Angle.FromDegrees(degree).radians();
    }
    /**
     * Translate radians to degree.
     * @param radians Radians
     */
    function radiansToDegree(radians) {
        return BABYLON.Angle.FromRadians(radians).degrees();
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
     * Convert Vector3 value to XYZProperties.
     * @param vector3 Vector3 value
     */
    function vector3ToXyz(vector3) {
        let x = vector3.x, y = vector3.y, z = vector3.z;
        return { x, y, z };
    }
    /**
     * Convert Vector3 value to XYZProperties in degrees.
     * @param vector3 Vector3 degree value
     */
    function vector3ToXyzDegree(vector3) {
        let x = vector3.x, y = vector3.y, z = vector3.z;
        return { x, y, z };
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
     * @example
     * ```
     * entity.addComponent(Material, {
     *    sceneName: "Scene",
     *    alpha: 0.7,
     *    color: { diffuse: "#E74C3C" }
     * });
     * entity.addComponent(Material, {
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
     *    sceneName: "Scene",
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
     * entity.addComponent(Asset, { sceneName: "Scene", url: "PATH_TO_ASSET" });
     * entity.addComponent(Asset, { type: AssetTypes.Babylon, url: "PATH_TO_ASSET" });
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

    /** System for Camera component */
    class CameraSystem extends ecsy.System {
        constructor() {
            super(...arguments);
            /** <BABYLON.Scene.uid, Camera component> */
            this._cameraOfScenes = new Map();
        }
        /** @hidden */
        init() {
            getGameSystem(this).onSceneSwitched.add(scene => this._updateControl(scene.uid));
        }
        /** @hidden */
        execute() {
            this.queries.camera.added.forEach((entity) => {
                let camera = entity.getComponent(Camera);
                let scene = getScene(this, camera.sceneName);
                this._cameraOfScenes.set(scene.uid, camera);
                camera.object = new BABYLON.FreeCamera("", BABYLON.Vector3.Zero(), scene);
                updateObjectsTransform(entity);
                this._updateControl(scene.uid);
            });
            this.queries.camera.removed.forEach((entity) => {
                let camera = entity.getComponent(Camera);
                disposeObject(camera);
            });
        }
        _updateControl(sceneUID) {
            let activeScene = getScene(this, getActiveSceneName(this));
            if (activeScene.uid === sceneUID) {
                let camera = this._cameraOfScenes.get(sceneUID);
                let canvas = getRenderingCanvas(this);
                camera.object.attachControl(canvas, true);
                camera.pointerLock && (activeScene.onPointerDown = () => { document.pointerLockElement || canvas.requestPointerLock(); });
            }
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
                mesh.object = BABYLON.MeshBuilder[`Create${mesh.type}`].call(this, mesh.type, mesh.options, getScene(this, mesh.sceneName));
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
                let scene = getScene(this, light.sceneName);
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
                material.object = new BABYLON.StandardMaterial(material.color.diffuse, getScene(this, material.sceneName));
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
                        updateTexture(material, material.texture, getAssetManager(this, material.sceneName));
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
                particle.object = new BABYLON.ParticleSystem(particle.type, particle.capacity, getScene(this, particle.sceneName));
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
                        updateTexture(particle, particle.texture, getAssetManager(this, particle.sceneName));
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
                let assetManager = getAssetManager(this, asset.sceneName);
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
        /** @hidden */
        execute() {
            this.queries.input.added.forEach((entity) => {
                let input = entity.getComponent(Input);
                switch (input.type) {
                    case InputTypes.Keyboard:
                        if (input.onKey) {
                            // BABYLON.KeyboardEventTypes.KEYDOWN = 1, BABYLON.KeyboardEventTypes.KEYUP = 2 
                            getScene(this, input.sceneName).onKeyboardObservable.add(keyInfo => input.onKey.call(input, keyInfo.event.key, keyInfo.type === 1, keyInfo.type === 2));
                        }
                        break;
                }
            });
            this.queries.input.removed.forEach((entity) => {
                let input = entity.getComponent(Input);
                switch (input.type) {
                    case InputTypes.Keyboard:
                        getScene(this, input.sceneName).onKeyboardObservable.clear();
                        break;
                }
            });
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
        degreeToRadians: degreeToRadians,
        radiansToDegree: radiansToDegree,
        xyzToVector3: xyzToVector3,
        xyzToVector3Radians: xyzToVector3Radians,
        vector3ToXyz: vector3ToXyz,
        vector3ToXyzDegree: vector3ToXyzDegree,
        hexToColor3: hexToColor3,
        hexToColor4: hexToColor4,
        getScene: getScene,
        getActiveSceneName: getActiveSceneName,
        getAssetManager: getAssetManager
    });

    window.EB = EB;

}(BABYLON, ECSY));
