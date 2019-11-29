(function (BABYLON, ecsy) {
    'use strict';

    /**
     * Usage:
     * ```
     * entity.addComponent(Transform);
     * ```
     */
    class Transform {
        constructor() {
            this.position = { x: 0, y: 0, z: 0 };
            this.rotation = { x: 0, y: 0, z: 0 };
            this.scale = { x: 1, y: 1, z: 1 };
            this.updateObjects = true;
        }
    }

    /**
     * Usage:
     * ```
     * entity.addComponent(Camera);
     * entity.addComponent(Camera, { options: { controllerMeshes: false } });
     * ```
     */
    class Camera {
        constructor() {
            /**
             * Default: {}
             *
             * https://doc.babylonjs.com/api/interfaces/babylon.vrexperiencehelperoptions
             */
            this.options = {};
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
     * Usage:
     * ```
     * entity.addComponent(Mesh);
     * entity.addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 2, height: 2 } });
     * entity.addComponent(Mesh, { type: MeshTypes.Sphere, options: { diameter: 2 } });
     * ```
     */
    class Mesh {
        constructor() {
            /** Default: "Box" */
            this.type = MeshTypes.Box;
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
     * Usage:
     * ```
     * entity.addComponent(Light);
     * entity.addComponent(Light, { type: LightTypes.Point, intensity: 2 });
     * entity.addComponent(Light, { type: LightTypes.Directional, direction: { x: 0, y: 0, z: 1 } });
     * entity.addComponent(Light, { type: LightTypes.Spot, direction: { x: 0, y: 0, z: 1 }, angle: 30, exponent: 2 });
     * ```
     */
    class Light {
        constructor() {
            /** Default: "Hemispheric" */
            this.type = LightTypes.Hemispheric;
            this.direction = { x: 0, y: 0, z: 0 };
        }
    }

    /**
     * Usage:
     * ```
     * entity.addComponent(Material);
     * entity.addComponent(Material, { diffuse: "#E74C3C" });
     * entity.addComponent(Material, { texture: {
     *   diffuse: { url: "PATH_TO_TEXTURE", uScale: 4, vScale: 4 },
     * });
     * ```
     */
    class Material {
        constructor() {
            /**
             * Default: "#ffffff"
             *
             * https://doc.babylonjs.com/api/classes/babylon.standardmaterial#diffusecolor
             */
            this.diffuse = "#ffffff";
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
     * Usage:
     * ```
     * entity.addComponent(Particle, {
     *   emitter: { x: 0, y: 0, z: 1 },
     *   texture: {
     *     diffuse: { url: "PATH_TO_PARTICLE_TEXTURE" }
     *   }
     * });
     * ```
     */
    class Particle {
        constructor() {
            /** default: "Point" */
            this.type = ParticleTypes.Point;
            /** default: 100 */
            this.capacity = 100;
            /** https://doc.babylonjs.com/api/classes/babylon.particlesystem#emitter */
            this.emitter = { x: 0, y: 0, z: 0 };
            /** Point, Box, DirectedSphere, Cylinder */
            this.direction1 = { x: 0, y: 0, z: 0 };
            /** Point, Box, DirectedSphere, Cylinder; Default to emit at right-up-front 10 units. */
            this.direction2 = { x: 10, y: 10, z: 10 };
            /** Box */
            this.minEmitBox = { x: 0, y: 0, z: 0 };
            /** Box */
            this.maxEmitBox = { x: 0, y: 0, z: 0 };
        }
    }

    var AssetTypes;
    (function (AssetTypes) {
        AssetTypes["Babylon"] = "Babylon";
    })(AssetTypes || (AssetTypes = {}));
    /**
     * Usage:
     * ```
     * entity.addComponent(Asset, { url: "PATH_TO_ASSET" });
     * entity.addComponent(Asset, { sceneName: "Scene", url: "PATH_TO_ASSET" });
     * entity.addComponent(Asset, { type: AssetTypes.Babylon, url: "PATH_TO_ASSET" });
     * ```
     */
    class Asset {
        constructor() {
            /** Default: "Babylon" */
            this.type = AssetTypes.Babylon;
        }
    }

    var InputTypes;
    (function (InputTypes) {
        InputTypes["VrRight"] = "VrRight";
        InputTypes["VrLeft"] = "VrLeft";
    })(InputTypes || (InputTypes = {}));
    /**
     * Usage:
     * ```
     * entity.addComponent(Input, { type:InputTypes.VrLeft, onPad: onPad, onPadValues: onPadValues });
     * function onPad(pressed, touched) {
     *   if (pressed) console.log("Pad is pressed.");
     *   if (touched) console.log("Pad is touched.");
     * }
     * function onPadValues(x, y) {
     *   console.log("Pad is touched on: " + x + ", " + y);
     * }
     * ```
     */
    class Input {
        constructor() {
            /** Default: "VrRight" */
            this.type = InputTypes.VrRight;
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
     * Translate radians to degree.
     * @param degree Radians
     */
    function radiansToDegree(radians) {
        return BABYLON.Angle.FromRadians(radians).degrees();
    }
    /**
     * Hack on ecsy 0.1.4 to get World instance from system itself.
     * @param system A registered ecsy System class
     */
    function getWorld(system) {
        return system["world"];
    }
    /**
     * Dispose Babylon.js object in the component.
     * @param object Component contains Babylon.js object
     */
    function disposeObject(component) {
        component.object && component.object.dispose();
    }
    /** @hidden */
    function getGameSystem(system) {
        return getWorld(system).getSystems().find(system => { return system.engine !== undefined; });
    }
    /**
     * Get scene by name or return active scene.
     * @param system A registered ecsy System class
     * @param sceneName Name to get specific scene in system
     */
    function getScene(system, sceneName) {
        return getGameSystem(system).getScene(sceneName);
    }
    /**
     * Get current Camera entity in the scene.
     * @param system A registered ecsy System class
     */
    function getCamera(system) {
        return getGameSystem(system).currentCamera;
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
     * @param hexString Text of hex color value(e.g., #123def)
     */
    function hexToColor3(hexString) {
        return BABYLON.Color3.FromHexString(hexString);
    }
    /**
     * Convert hex color value to Color4 (has alpha).
     * @param hexString Text of hex color value(e.g., #123def1f)
     */
    function hexToColor4(hexString) {
        return BABYLON.Color4.FromHexString(hexString);
    }
    /**
     * Update texture object to a component for its texture properties.
     * @param component TextureComponent in the entity
     * @param properties Properties to be update
     * @param system A registered ecsy System class
     */
    function updateTexture(component, properties, system) {
        Object.keys(properties).forEach(name => {
            let textureAttributes = properties[name];
            let textureObject = new BABYLON.Texture(textureAttributes.url, getScene(system, component.sceneName));
            Object.keys(textureAttributes)
                .filter(prop => { return prop !== "url"; })
                .forEach(prop => textureObject[prop] = textureAttributes[prop]);
            component.object[`${name}Texture`] && disposeObject(component.object[`${name}Texture`]);
            component.object[`${name}Texture`] = textureObject;
        });
    }
    /**
     * Get ObjectComponents in an Entity.
     * @param entity Entity to filter ObjectComponents
     */
    function getEntityObjectComponents(entity) {
        let components = entity.getComponents();
        let objectComponents = [];
        Object.keys(components)
            .filter(name => { return "object" in components[name]; })
            .forEach(name => objectComponents.push(components[name]));
        return objectComponents;
    }
    /**
     * Update transformation to ObjectComponents.
     * @param transform Transfrom component in the entity
     * @param components Components with object
     */
    function updateObjectsTransform(transform, components) {
        components.forEach(component => {
            let object = component.object;
            object.position && (object.position = xyzToVector3(transform.position));
            object.rotation && (object.rotation = xyzToVector3Radians(transform.rotation));
            object.scaling && (object.scaling = xyzToVector3(transform.scale));
        });
    }

    /** Core system of ecsy-babylon. */
    class GameSystem extends ecsy.System {
        constructor() {
            super(...arguments);
            /** A map holds created scene(s) instance and its name. */
            this.scenes = new Map();
            this._lastTime = 0;
            this._isRendering = false;
        }
        /** Get current scene instance. */
        get activeScene() { return this._activeScene; }
        /** Get current Camera Entity. */
        get currentCamera() { return this._currentCamera; }
        /** @hidden */
        init() { this._render = this._render.bind(this); }
        /** @hidden */
        execute() {
            this.queries.camera.added.forEach((entity) => {
                let camera = entity.getComponent(Camera);
                let scene = this.getScene(camera.sceneName);
                camera.object = new BABYLON.VRExperienceHelper(scene, camera.options);
                if (scene === this._activeScene) {
                    this._currentCamera = camera;
                    this._isRendering = true;
                }
            });
            this.queries.camera.removed.forEach((entity) => {
                let camera = entity.getComponent(Camera);
                disposeObject(camera);
                let scene = this.getScene(camera.sceneName);
                scene === this._activeScene && (this._isRendering = false);
            });
        }
        /**
         * Start game system in the world can be used by other systems & components.
         * https://doc.babylonjs.com/api/classes/babylon.engine#constructor
         * @param canvas WebGL context to be used for rendering
         * @param antialias defines enable antialiasing (default: false)
         * @param options https://doc.babylonjs.com/api/interfaces/babylon.engineoptions
         * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
         */
        start(canvas, antialias, options, adaptToDeviceRatio) {
            this.engine = new BABYLON.Engine(canvas, antialias, options, adaptToDeviceRatio);
            this._lastTime = performance.now();
            this.engine.runRenderLoop(this._render);
            return this;
        }
        /**
         * Get a scene by provided name or return current scene if not available.
         * @param name Name of the scene
         */
        getScene(name) {
            if (name) {
                return this.scenes.get(name);
            }
            else {
                return this._activeScene;
            }
        }
        /**
         * Add a new scene with a name.
         * https://doc.babylonjs.com/api/classes/babylon.scene#constructor
         * @param name Readable name to be used to switch or remove scene in the system
         * @param options https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions
         */
        addScene(name, options) {
            let scene = new BABYLON.Scene(this.engine, options);
            this.scenes.set(name, scene);
            this.engine.scenes.length === 1 && (this._activeScene = scene);
            return this;
        }
        _render() {
            let time = performance.now();
            getWorld(this).execute(time - this._lastTime, time);
            (this._isRendering && getWorld(this).enabled) && this._activeScene.render();
            this._lastTime = time;
        }
    }
    /** @hidden */
    GameSystem.queries = {
        camera: { components: [Camera], listen: { added: true, removed: true } }
    };

    /** System for Transform component */
    class TransformSystem extends ecsy.System {
        /** @hidden */
        init() {
            window.addEventListener("load", () => {
                this.queries.object.results.forEach((entity) => {
                    entity.getComponent(Transform).updateObjects && updateObjectsTransform(entity.getComponent(Transform), getEntityObjectComponents(entity));
                });
            });
        }
        /** @hidden */
        execute() {
            this.queries.object.changed.forEach((entity) => {
                entity.getComponent(Transform).updateObjects && updateObjectsTransform(entity.getComponent(Transform), getEntityObjectComponents(entity));
            });
        }
    }
    /** @hidden */
    TransformSystem.queries = {
        object: { components: [Transform], listen: { changed: [Transform] } },
    };

    /** System for Mesh component */
    class MeshSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.mesh.added.forEach((entity) => {
                let mesh = entity.getComponent(Mesh);
                mesh.object = BABYLON.MeshBuilder[`Create${mesh.type}`].call(null, mesh.type, mesh.options, getScene(this, mesh.sceneName));
            });
            this.queries.mesh.removed.forEach((entity) => {
                disposeObject(entity.getComponent(Mesh));
            });
        }
    }
    /** @hidden */
    MeshSystem.queries = {
        mesh: { components: [Mesh], listen: { added: true, removed: true } },
    };

    /** @hidden */
    var LightColorValues;
    (function (LightColorValues) {
        LightColorValues["specular"] = "specular";
    })(LightColorValues || (LightColorValues = {}));
    /** @hidden */
    var LightXyzValues;
    (function (LightXyzValues) {
        LightXyzValues["direction"] = "direction";
    })(LightXyzValues || (LightXyzValues = {}));
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
            });
            this.queries.light.changed.forEach((entity) => {
                this._updateLight(entity.getComponent(Light));
            });
            this.queries.light.removed.forEach((entity) => {
                disposeObject(entity.getComponent(Light));
            });
        }
        _updateLight(light) {
            let lightObject = light.object;
            Object.keys(light).forEach(name => {
                if (LightColorValues[name]) {
                    lightObject[name] = hexToColor3(light[name]);
                }
                else if (LightXyzValues[name]) {
                    lightObject[name] = xyzToVector3(light[name]);
                }
                else {
                    lightObject[name] = light[name];
                }
            });
        }
    }
    /** @hidden */
    LightSystem.queries = {
        light: { components: [Light], listen: { added: true, removed: true, changed: true } },
    };

    /** @hidden */
    var MaterialColorValues;
    (function (MaterialColorValues) {
        MaterialColorValues["diffuse"] = "diffuse";
        MaterialColorValues["specular"] = "specular";
        MaterialColorValues["emissive"] = "emissive";
        MaterialColorValues["ambient"] = "ambient";
    })(MaterialColorValues || (MaterialColorValues = {}));
    /** System for Material component */
    class MaterialSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.meshMaterial.added.forEach((entity) => {
                let material = entity.getComponent(Material);
                material.object = new BABYLON.StandardMaterial(material.diffuse, getScene(this, material.sceneName));
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
            let materialObject = material.object;
            Object.keys(material).forEach(name => {
                if (MaterialColorValues[name]) {
                    materialObject[`${name}Color`] = hexToColor3(material[name]);
                }
                else if (name === "texture") {
                    material.texture && updateTexture(material, material.texture, this);
                }
                else {
                    materialObject[name] = material[name];
                }
            });
        }
    }
    /** @hidden */
    MaterialSystem.queries = {
        meshMaterial: { components: [Mesh, Material], listen: { added: true, removed: true, changed: [Material] } },
    };

    /** @hidden */
    var ParticleColorValues;
    (function (ParticleColorValues) {
        ParticleColorValues["textureMask"] = "textureMask";
    })(ParticleColorValues || (ParticleColorValues = {}));
    /** @hidden */
    var ParticleXyzValues;
    (function (ParticleXyzValues) {
        ParticleXyzValues["emitter"] = "emitter";
        ParticleXyzValues["direction1"] = "direction1";
        ParticleXyzValues["direction2"] = "direction2";
    })(ParticleXyzValues || (ParticleXyzValues = {}));
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
            let particleObject = particle.object;
            Object.keys(particle).forEach(name => {
                if (ParticleXyzValues[name]) {
                    particleObject[name] = xyzToVector3(particle[name]);
                }
                else if (ParticleColorValues[name]) {
                    particleObject[name] = hexToColor4(particle[name]);
                }
                else if (name === "texture") {
                    particle.texture && updateTexture(particle, particle.texture, this);
                }
                else {
                    particleObject[name] = particle[name];
                }
            });
        }
    }
    /** @hidden */
    ParticleSystem.queries = {
        particle: { components: [Particle], listen: { added: true, changed: true, removed: true } },
    };

    /** System for Asset component */
    class AssetSystem extends ecsy.System {
        /** @hidden */
        execute() {
            this.queries.asset.added.forEach((entity) => {
                let asset = entity.getComponent(Asset);
                this._assetManager || (this._assetManager = new BABYLON.AssetsManager(getScene(this, asset.sceneName)));
                this._assetManager.useDefaultLoadingScreen = false;
                switch (asset.type) {
                    default: {
                        this._loadBabylon(entity.getComponent(Transform), asset);
                        break;
                    }
                }
                this._assetManager.load();
            });
            this.queries.asset.removed.forEach((entity) => {
                disposeObject(entity.getComponent(Asset));
            });
        }
        _loadBabylon(transform, asset) {
            let filenameIndex = asset.url.lastIndexOf("/") + 1;
            let task = this._assetManager.addMeshTask(AssetTypes.Babylon, "", asset.url.substring(0, filenameIndex), asset.url.substring(filenameIndex, asset.url.length));
            task.onSuccess = (task) => {
                asset.object = task.loadedMeshes[0];
                updateObjectsTransform(transform, [asset]);
            };
        }
    }
    /** @hidden */
    AssetSystem.queries = {
        asset: { components: [Transform, Asset], listen: { added: true, removed: true } },
    };

    /** @hidden */
    var VRStateButtons;
    (function (VRStateButtons) {
        VRStateButtons["onMainButton"] = "onMainButton";
        VRStateButtons["onPad"] = "onPad";
        VRStateButtons["onSecondaryButton"] = "onSecondaryButton";
        VRStateButtons["onTrigger"] = "onTrigger";
    })(VRStateButtons || (VRStateButtons = {}));
    /** @hidden */
    var VRValueButtons;
    (function (VRValueButtons) {
        VRValueButtons["onPadValues"] = "onPadValues";
    })(VRValueButtons || (VRValueButtons = {}));
    /** System for Input component */
    class InputSystem extends ecsy.System {
        constructor() {
            super(...arguments);
            this._isControllerConntected = false;
        }
        /** @hidden */
        execute() {
            this.queries.input.added.forEach((entity) => {
                let transform = entity.getMutableComponent(Transform);
                (transform && entity.getComponent(Input).type.startsWith("Vr")) && (transform.updateObjects = false);
            });
            this.queries.input.results.forEach((entity) => {
                let controllers = getCamera(this).object.webVRCamera.controllers;
                let input = entity.getMutableComponent(Input);
                if (controllers.length > 0) {
                    this._isControllerConntected ?
                        this._updateObjectsTransform(entity, input.object, entity.getMutableComponent(Transform)) :
                        this._initVRController(input, controllers);
                }
            });
        }
        _initVRController(input, controllers) {
            input.type === InputTypes.VrLeft ?
                input.object = this._getVRController(controllers, "left") :
                input.object = this._getVRController(controllers, "right");
            this._bindControllerBehaviours(input);
            this._isControllerConntected = true;
        }
        _getVRController(controllers, hand) {
            return controllers.find((controller) => { return controller.hand === hand; });
        }
        _bindControllerBehaviours(input) {
            Object.keys(input).filter(name => { return name in VRStateButtons; }).forEach(name => {
                input[name] && input.object[`${name}StateChangedObservable`].add(data => {
                    input[name].call(input, data.pressed, data.touched, data.value);
                });
            });
            Object.keys(input).filter(name => { return name in VRValueButtons; }).forEach(name => {
                input[name] && input.object[`${name}ChangedObservable`].add(data => {
                    input[name].call(input, data.x, data.y);
                });
            });
        }
        _updateObjectsTransform(entity, controller, transform) {
            transform && getEntityObjectComponents(entity)
                .filter(component => { return !(component instanceof Input); })
                .forEach(component => {
                let pos = controller.devicePosition;
                let rot = controller.deviceRotationQuaternion.toEulerAngles();
                let object = component.object;
                object.position && (object.position = pos);
                object.rotation && (object.rotation = rot);
                object.scaling && (object.scaling = xyzToVector3(transform.scale));
                transform.position = vector3ToXyz(pos);
                transform.rotation = vector3ToXyzDegree(rot);
            });
        }
    }
    /** @hidden */
    InputSystem.queries = {
        input: { components: [Input], listen: { added: true } },
    };



    var EB = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GameSystem: GameSystem,
        TransformSystem: TransformSystem,
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
        getWorld: getWorld,
        disposeObject: disposeObject,
        getScene: getScene,
        getCamera: getCamera,
        xyzToVector3: xyzToVector3,
        xyzToVector3Radians: xyzToVector3Radians,
        vector3ToXyz: vector3ToXyz,
        vector3ToXyzDegree: vector3ToXyzDegree,
        hexToColor3: hexToColor3,
        hexToColor4: hexToColor4,
        updateTexture: updateTexture,
        getEntityObjectComponents: getEntityObjectComponents,
        updateObjectsTransform: updateObjectsTransform
    });

    window.EB = EB;

}(BABYLON, ECSY));
