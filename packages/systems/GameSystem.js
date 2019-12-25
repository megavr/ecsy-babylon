import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { getWorld } from "../utils/worldUtils";
/** Core system of ecsy-babylon. */
export class GameSystem extends System {
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
