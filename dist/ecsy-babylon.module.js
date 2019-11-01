import { Angle, VRExperienceHelper, Engine, Scene, MeshBuilder, Vector3, HemisphericLight, SpotLight, DirectionalLight, PointLight, StandardMaterial, Color3 } from '../js-modules/babylon.module.js';
import { System } from 'https://ecsy.io/build/ecsy.module.js';

class Transform {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    }
}

class Camera {
    constructor() {
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
class Mesh {
    constructor() {
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
class Light {
    constructor() {
        this.type = LightTypes.Hemispheric;
        this.direction = { x: 0, y: 0, z: 0 };
    }
}

class Material {
    constructor() {
        this.diffuse = "#ffffff";
    }
}

/**
 * Translate degree to radians in Babylon.js.
 * @param degree Degree
 */
function degreeToRadians(degree) {
    return Angle.FromDegrees(degree).radians();
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
    component.object !== undefined && component.object.dispose();
}
/**
 * Get active scene from GameSystem.
 * @param system A registered ecsy System class
 * @param sceneName Name to get specific scene in system
 */
function getActiveScene(system, sceneName) {
    return getWorld(system).getSystems().find(system => { return system.activeScene !== undefined; }).getScene(sceneName);
}

class GameSystem extends System {
    constructor() {
        super(...arguments);
        this.scenes = new Map();
        this._lastTime = 0;
        this._isRendering = false;
    }
    get activeScene() { return this._activeScene; }
    init() {
        this._render = this._render.bind(this);
    }
    execute() {
        this.queries.camera.added.forEach((entity) => {
            let camera = entity.getComponent(Camera);
            let scene = this.getScene(camera.sceneName);
            camera.object = new VRExperienceHelper(scene, camera.options);
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
     * Start the core system can be used by other systems & components.
     * @param canvas WebGL context to be used for rendering
     * @param antialias defines enable antialiasing (default: false)
     * @param options defines further options to be sent to the getContext() function
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     */
    start(canvas, antialias, options, adaptToDeviceRatio) {
        this.engine = new Engine(canvas, antialias, options, adaptToDeviceRatio);
        this._lastTime = performance.now();
        this.engine.runRenderLoop(this._render);
        return this;
    }
    /**
     * Get a scene by provided name or return current scene if not available.
     * @param name Scene name
     */
    getScene(name) {
        if (name === undefined) {
            return this._activeScene;
        }
        else {
            return this.scenes.get(name);
        }
    }
    /**
     * Add a new scene.
     * @param name Name can be used to switch or remove in the system
     * @param options SceneOptions for the new Scene instance
     */
    addScene(name, options) {
        let scene = new Scene(this.engine, options);
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
GameSystem.queries = {
    camera: { components: [Camera], listen: { added: true, removed: true } }
};

class TransformSystem extends System {
    execute() {
        this.queries.object.results.forEach((entity) => {
            let transform = entity.getComponent(Transform);
            let components = entity.getComponents();
            let names = Object.keys(components).filter(name => {
                return components[name].object !== undefined;
            });
            names.length > 0 && names.forEach(name => {
                let object = components[name].object;
                object.position !== undefined && this._position(transform.position, object.position);
                object.rotation !== undefined && this._rotation(transform.rotation, object.rotation);
                // https://doc.babylonjs.com/api/classes/babylon.transformnode#scaling
                object.scaling !== undefined && this._scale(transform.scale, object.scaling);
            });
        });
    }
    _position(source, target) {
        target.set(source.x, source.y, source.z);
    }
    _rotation(source, target) {
        target.set(degreeToRadians(source.x), degreeToRadians(source.y), degreeToRadians(source.z));
    }
    _scale(source, target) {
        target.set(source.x, source.y, source.z);
    }
}
TransformSystem.queries = {
    object: { components: [Transform] },
};

class MeshSystem extends System {
    execute() {
        this.queries.mesh.added.forEach((entity) => {
            let mesh = entity.getComponent(Mesh);
            mesh.object = MeshBuilder[`Create${mesh.type}`].call(null, mesh.type, mesh.options, getActiveScene(this, mesh.sceneName));
        });
        this.queries.mesh.removed.forEach((entity) => {
            let mesh = entity.getComponent(Mesh);
            disposeObject(mesh);
        });
    }
}
MeshSystem.queries = {
    mesh: { components: [Mesh], listen: { added: true, removed: true } },
};

class LightSystem extends System {
    execute() {
        this.queries.light.added.forEach((entity) => {
            let light = entity.getComponent(Light);
            let direction = new Vector3(light.direction.x, light.direction.y, light.direction.z);
            let scene = getActiveScene(this, light.sceneName);
            switch (light.type) {
                case LightTypes.Point:
                    light.object = new PointLight(light.type, Vector3.Zero(), scene);
                    break;
                case LightTypes.Directional:
                    light.object = new DirectionalLight(light.type, direction, scene);
                    break;
                case LightTypes.Spot:
                    light.object = new SpotLight(light.type, Vector3.Zero(), direction, degreeToRadians(light.angle), light.exponent, scene);
                    break;
                case LightTypes.Hemispheric:
                    light.object = new HemisphericLight(light.type, direction, scene);
                    break;
            }
        });
        this.queries.light.changed.forEach((entity) => {
            let light = entity.getComponent(Light);
            light.direction !== undefined && (light.object.direction = new Vector3(light.direction.x, light.direction.y, light.direction.z));
        });
        this.queries.light.removed.forEach((entity) => {
            let light = entity.getComponent(Light);
            disposeObject(light);
        });
    }
}
LightSystem.queries = {
    light: { components: [Light], listen: { added: true, removed: true, changed: true } },
};

var ColorValues;
(function (ColorValues) {
    ColorValues[ColorValues["diffuse"] = 0] = "diffuse";
    ColorValues[ColorValues["specular"] = 1] = "specular";
    ColorValues[ColorValues["emissive"] = 2] = "emissive";
    ColorValues[ColorValues["ambient"] = 3] = "ambient";
})(ColorValues || (ColorValues = {}));
class MaterialSystem extends System {
    execute() {
        this.queries.meshMaterial.added.forEach((entity) => {
            let material = entity.getComponent(Material);
            material.object = new StandardMaterial(material.diffuse, getActiveScene(this, material.sceneName));
            this._updateMaterial(material);
            entity.getComponent(Mesh).object.material = material.object;
        });
        this.queries.meshMaterial.changed.forEach((entity) => {
            this._updateMaterial(entity.getComponent(Material));
        });
        this.queries.meshMaterial.removed.forEach((entity) => {
            let material = entity.getComponent(Material);
            disposeObject(material);
            entity.getComponent(Mesh).object.material = null;
        });
    }
    _updateMaterial(material) {
        Object.keys(material).forEach(name => {
            ColorValues[name] !== undefined ?
                material.object[`${name}Color`] = Color3.FromHexString(material[name]) :
                material.object[name] = material[name];
        });
    }
}
MaterialSystem.queries = {
    meshMaterial: { components: [Mesh, Material], listen: { added: true, removed: true, changed: [Material] } },
};

export { Camera, GameSystem, Light, LightSystem, LightTypes, Material, MaterialSystem, Mesh, MeshSystem, MeshTypes, Transform, TransformSystem };
