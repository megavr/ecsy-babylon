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
            /** https://doc.babylonjs.com/api/interfaces/babylon.vrexperiencehelperoptions */
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
            /** https://doc.babylonjs.com/api/classes/babylon.particlesystem#emitter */
            this.emitter = { x: 0, y: 0, z: 0 };
            /** Point, Box, DirectedSphere, Cylinder */
            this.direction1 = { x: 0, y: 0, z: 0 };
            /** Point, Box, DirectedSphere, Cylinder */
            this.direction2 = { x: 0, y: 10, z: 10 };
            /** Box */
            this.minEmitBox = { x: 0, y: 0, z: 0 };
            /** Box */
            this.maxEmitBox = { x: 0, y: 0, z: 0 };
        }
    }

    var AssetTypes;
    (function (AssetTypes) {
        AssetTypes["babylon"] = "Babylon";
    })(AssetTypes || (AssetTypes = {}));
    /**
     * Usage:
     * ```
     * entity.addComponent(Asset, { url: "PATH_TO_ASSET" });
     * entity.addComponent(Asset, { sceneName: "Scene", url: "PATH_TO_ASSET" });
     * entity.addComponent(Asset, { type: AssetTypes.babylon, url: "PATH_TO_ASSET" });
     * ```
     */
    class Asset {
    }

    /**
     * Translate degree to radians.
     * @param degree Degree
     */
    function degreeToRadians(degree) {
        return BABYLON.Angle.FromDegrees(degree).radians();
    }
    /**
     * Hack on ecsy 0.1.4 to get World instance from system itself.
     * @param system A registered ecsy System class
     */
    function getWorld(system) {
        return system["world"];
    }
    /**
     * Dispose a generated Babylon.js object if existed.
     * @param object Component contains Babylon.js object
     */
    function disposeObject(component) {
        component.object && component.object.dispose();
    }
    /**
     * Get active scene from GameSystem.
     * @param system A registered ecsy System class
     * @param sceneName Name to get specific scene in system
     */
    function getActiveScene(system, sceneName) {
        return getWorld(system).getSystems().find(system => { return system.activeScene !== undefined; }).getScene(sceneName);
    }
    /**
     * Convert XYZ value to Vector3 from a TransformProperties object.
     * @param properties Defined XYZ values
     */
    function xyzToVector3(properties) {
        return new BABYLON.Vector3(properties.x, properties.y, properties.z);
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
            let textureObject = new BABYLON.Texture(textureAttributes.url, getActiveScene(system, component.sceneName));
            Object.keys(textureAttributes).filter(prop => prop === "url").forEach(prop => {
                textureObject[prop] = textureAttributes[prop];
            });
            component.object[`${name}Texture`] && disposeObject(component.object[`${name}Texture`]);
            component.object[`${name}Texture`] = textureObject;
        });
    }
    /**
     * Update transformation to a component with object.
     * @param transform Transfrom component in the entity
     * @param component Component with object
     */
    function updateTransform(transform, component) {
        if (component.object) {
            let object = component.object;
            object.position && (object.position = xyzToVector3(transform.position));
            object.rotation && object.rotation.set(degreeToRadians(transform.rotation.x), degreeToRadians(transform.rotation.y), degreeToRadians(transform.rotation.z));
            object.scaling && (object.scaling = xyzToVector3(transform.scale));
        }
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
        /** @hidden */
        init() { this._render = this._render.bind(this); }
        /** @hidden */
        execute() {
            this.queries.camera.added.forEach((entity) => {
                let camera = entity.getComponent(Camera);
                let scene = this.getScene(camera.sceneName);
                camera.object = new BABYLON.VRExperienceHelper(scene, camera.options);
                scene === this._activeScene && (this._isRendering = true);
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
                    this._updateTransform(entity.getComponent(Transform), entity.getComponents());
                });
            });
        }
        /** @hidden */
        execute() {
            this.queries.object.changed.forEach((entity) => {
                this._updateTransform(entity.getComponent(Transform), entity.getComponents());
            });
        }
        _updateTransform(transform, components) {
            Object.keys(components)
                .filter(name => { return components[name].object !== undefined; })
                .forEach(name => updateTransform(transform, components[name]));
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
                let type;
                mesh.type ? type = mesh.type : type = MeshTypes.Box;
                mesh.object = BABYLON.MeshBuilder[`Create${type}`].call(null, type, mesh.options ? mesh.options : {}, getActiveScene(this, mesh.sceneName));
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
                let scene = getActiveScene(this, light.sceneName);
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
                material.object = new BABYLON.StandardMaterial(material.diffuse ? material.diffuse : "#ffffff", getActiveScene(this, material.sceneName));
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
                particle.object = new BABYLON.ParticleSystem(particle.type ? particle.type : ParticleTypes.Point, particle.capacity ? particle.capacity : 100, getActiveScene(this, particle.sceneName));
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
                this._assetManager || (this._assetManager = new BABYLON.AssetsManager(getActiveScene(this, asset.sceneName)));
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
            let task = this._assetManager.addMeshTask(AssetTypes.babylon, "", asset.url.substring(0, filenameIndex), asset.url.substring(filenameIndex, asset.url.length));
            task.onSuccess = (task) => {
                asset.object = task.loadedMeshes[0];
                updateTransform(transform, asset);
            };
        }
    }
    /** @hidden */
    AssetSystem.queries = {
        asset: { components: [Transform, Asset], listen: { added: true, removed: true } },
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
        Asset: Asset
    });

    window.EB = EB;

}(BABYLON, ECSY));
