import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Camera } from "../components/index";
import { disposeObject, getWorld } from "../utils/index";
/** Core system of ecsy-babylon. */
export class GameSystem extends System {
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
