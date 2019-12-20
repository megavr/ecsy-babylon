import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Camera } from "../components/index";
import { getWorld } from "../utils/gameUtils";
import { updateObjectsTransform, disposeObject } from "../utils/objectUtils";
/** Core system of ecsy-babylon. */
export class GameSystem extends System {
    constructor() {
        super(...arguments);
        this._scenes = new Map();
        this._assetManagers = new Map();
        this._isRendering = false;
    }
    /** Get name of active scene */
    get activeSceneName() { return this._activeSceneName; }
    /** Get active Camera Entity. */
    get activeCameraEntity() { return this._activeCameraEntity; }
    /** @hidden */
    init() { this._render = this._render.bind(this); }
    /** @hidden */
    execute() {
        this.queries.camera.added.forEach((entity) => {
            let camera = entity.getComponent(Camera);
            let scene = this.getScene(camera.sceneName);
            camera.object = new BABYLON.VRExperienceHelper(scene, camera.options);
            if (scene === this._activeScene) {
                this._activeCameraEntity = entity;
                this._isRendering = true;
            }
            updateObjectsTransform(entity);
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
     * @see https://doc.babylonjs.com/api/classes/babylon.engine#constructor
     * @param canvas WebGL context to be used for rendering
     * @param antialias defines enable antialiasing (default: false)
     * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.engineoptions
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     * @returns This GameSystem
     */
    start(canvas, antialias, options, adaptToDeviceRatio) {
        this.engine = new BABYLON.Engine(canvas, antialias, options, adaptToDeviceRatio);
        this.engine.runRenderLoop(this._render);
        return this;
    }
    /**
     * Add a new scene with a name.
     * @see https://doc.babylonjs.com/api/classes/babylon.scene#constructor
     * @param sceneName Readable name to be used to switch or remove scene in the system
     * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions
     * @returns This GameSystem
     */
    addScene(sceneName, options) {
        let scene = new BABYLON.Scene(this.engine, options);
        let assetManager = new BABYLON.AssetsManager(scene);
        assetManager.useDefaultLoadingScreen = false;
        this._scenes.set(sceneName, scene);
        this._assetManagers.set(sceneName, assetManager);
        if (this.engine.scenes.length === 1) {
            this._activeScene = scene;
            this._activeSceneName = sceneName;
        }
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
     * @param cameraEntity Default camera for the new scene
     * @returns This GameSystem
     */
    switchScene(sceneName, cameraEntity) {
        if (this.getScene(sceneName)) {
            this._activeScene = this.getScene(sceneName);
            this._activeSceneName = sceneName;
            this._activeCameraEntity = cameraEntity;
        }
        return this;
    }
    /**
     * Get a scene by provided name.
     * @param sceneName Name of the scene
     * @returns Scene found in system or active scene if not available
     */
    getScene(sceneName) {
        if (sceneName) {
            return this._scenes.get(sceneName);
        }
        else {
            return this._activeScene;
        }
    }
    /**
     * Get a asset manager by provided scene name.
     * @param sceneName Name of the scene
     * @returns Asset manager found or asset manager in active scene
     */
    getAssetManager(sceneName) {
        let name = this.activeSceneName;
        sceneName && (name = sceneName);
        return this._assetManagers.get(name);
    }
    _render() {
        getWorld(this).execute(this.engine.getDeltaTime(), performance.now());
        (this._isRendering && getWorld(this).enabled) && this._activeScene.render();
    }
}
/** @hidden */
GameSystem.queries = {
    camera: { components: [Camera], listen: { added: true, removed: true } }
};
