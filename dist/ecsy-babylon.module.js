import { Vector3, Angle, Texture, VRExperienceHelper, Engine, Scene, MeshBuilder, HemisphericLight, SpotLight, DirectionalLight, PointLight, Color3, StandardMaterial, ParticleSystem as ParticleSystem$1, Color4 } from '../js-modules/babylon.module.js';
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
class Particle {
    constructor() {
        this.type = ParticleTypes.Point;
        this.capacity = 100;
        this.emitter = { x: 0, y: 0, z: 0 };
        // Point, Box, DirectedSphere, Cylinder
        this.direction1 = { x: 0, y: 0, z: 0 };
        this.direction2 = { x: 0, y: 10, z: 10 };
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
    return new Vector3(properties.x, properties.y, properties.z);
}
/**
 * Update Babylon texture for the texture properties in a TextureComponent.
 * @param component TextureComponent in the entity
 * @param properties Properties to be update
 * @param system A registered ecsy System class
 */
function updateTexture(component, properties, system) {
    Object.keys(properties).forEach(name => {
        let textureAttributes = properties[name];
        let textureObject = new Texture(textureAttributes.url, getActiveScene(system, component.sceneName));
        Object.keys(textureAttributes).filter(prop => prop === "url").forEach(prop => {
            textureObject[prop] = textureAttributes[prop];
        });
        component.object[`${name}Texture`] && disposeObject(component.object[`${name}Texture`]);
        component.object[`${name}Texture`] = textureObject;
    });
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
            this._updateTransform(entity.getComponent(Transform), entity.getComponents());
        });
    }
    _updateTransform(transform, components) {
        Object.keys(components)
            .filter(name => { return components[name].object !== undefined; })
            .forEach(name => {
            let object = components[name].object;
            object.position && (object.position = xyzToVector3(transform.position));
            object.rotation && object.rotation.set(degreeToRadians(transform.rotation.x), degreeToRadians(transform.rotation.y), degreeToRadians(transform.rotation.z));
            object.scaling && (object.scaling = xyzToVector3(transform.scale));
        });
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
            disposeObject(entity.getComponent(Mesh));
        });
    }
}
MeshSystem.queries = {
    mesh: { components: [Mesh], listen: { added: true, removed: true } },
};

var LightColorValues;
(function (LightColorValues) {
    LightColorValues["specular"] = "specular";
})(LightColorValues || (LightColorValues = {}));
var LightXyzValues;
(function (LightXyzValues) {
    LightXyzValues["direction"] = "direction";
})(LightXyzValues || (LightXyzValues = {}));
class LightSystem extends System {
    execute() {
        this.queries.light.added.forEach((entity) => {
            let light = entity.getComponent(Light);
            let direction = xyzToVector3(light.direction);
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
                lightObject[name] = Color3.FromHexString((light[name]));
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
LightSystem.queries = {
    light: { components: [Light], listen: { added: true, removed: true, changed: true } },
};

var MaterialColorValues;
(function (MaterialColorValues) {
    MaterialColorValues["diffuse"] = "diffuse";
    MaterialColorValues["specular"] = "specular";
    MaterialColorValues["emissive"] = "emissive";
    MaterialColorValues["ambient"] = "ambient";
})(MaterialColorValues || (MaterialColorValues = {}));
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
            disposeObject(entity.getComponent(Material));
            entity.getComponent(Mesh).object.material = null;
        });
    }
    _updateMaterial(material) {
        let materialObject = material.object;
        Object.keys(material).forEach(name => {
            if (MaterialColorValues[name]) {
                materialObject[`${name}Color`] = Color3.FromHexString(material[name]);
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
MaterialSystem.queries = {
    meshMaterial: { components: [Mesh, Material], listen: { added: true, removed: true, changed: [Material] } },
};

var ParticleColorValues;
(function (ParticleColorValues) {
    ParticleColorValues["textureMask"] = "textureMask";
})(ParticleColorValues || (ParticleColorValues = {}));
var ParticleXyzValues;
(function (ParticleXyzValues) {
    ParticleXyzValues["emitter"] = "emitter";
    ParticleXyzValues["direction1"] = "direction1";
    ParticleXyzValues["direction2"] = "direction2";
})(ParticleXyzValues || (ParticleXyzValues = {}));
class ParticleSystem extends System {
    execute() {
        this.queries.particle.added.forEach((entity) => {
            let particle = entity.getComponent(Particle);
            particle.object = new ParticleSystem$1(particle.type, particle.capacity, getActiveScene(this, particle.sceneName));
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
                particleObject[name] = Color4.FromHexString(particle[name]);
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
ParticleSystem.queries = {
    particle: { components: [Particle], listen: { added: true, changed: true, removed: true } },
};

export { Camera, GameSystem, Light, LightSystem, LightTypes, Material, MaterialSystem, Mesh, MeshSystem, MeshTypes, Particle, ParticleSystem, ParticleTypes, Transform, TransformSystem };
