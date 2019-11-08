import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Camera } from "../components/index";
import { disposeObject, getWorld } from "../utils/index";
export class GameSystem extends System {
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
     * Start the core system can be used by other systems & components.
     * @param canvas WebGL context to be used for rendering
     * @param antialias defines enable antialiasing (default: false)
     * @param options defines further options to be sent to the getContext() function
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
GameSystem.queries = {
    camera: { components: [Camera], listen: { added: true, removed: true } }
};