import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
/** Core system of ecsy-babylon. */
export declare class GameSystem extends System {
    private _engine;
    /** Get canvas used for rendering. */
    get renderingCanvas(): HTMLCanvasElement | null;
    /** <Scene Name, BABYLON.Scene> */
    private _scenes;
    /** <Scene Name, BABYLON.AssetsManager> */
    private _assetManagers;
    /** Observable event when active scene is switched. */
    onSceneSwitched: BABYLON.Observable<BABYLON.Scene>;
    private _activeSceneName;
    /** Get name of active scene. */
    get activeSceneName(): String;
    /** @hidden */
    init(): void;
    /**
     * Start game system in the world can be used by other systems & components.
     * @see https://doc.babylonjs.com/api/classes/babylon.engine#constructor
     * @param canvas WebGL context to be used for rendering
     * @param antialias defines enable antialiasing (default: false)
     * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.engineoptions
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     */
    start(canvas: HTMLCanvasElement, antialias?: boolean, options?: BABYLON.EngineOptions, adaptToDeviceRatio?: boolean): GameSystem;
    /**
     * Add a new scene with a name.
     * @see https://doc.babylonjs.com/api/classes/babylon.scene#constructor
     * @param sceneName Readable name to be used to switch or remove scene in the system
     * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions
     */
    addScene(sceneName: String, options?: BABYLON.SceneOptions): GameSystem;
    /** Remove an inactive scene by given name */
    removeScene(sceneName: String): GameSystem;
    /**
     * Switch to a scene by given scene name.
     * @param sceneName Name of scene
     */
    switchScene(sceneName: String): GameSystem;
    /**
     * Get a scene by provided name or active scene if not found.
     * @param sceneName Name of the scene
     */
    getScene(sceneName?: String): BABYLON.Scene;
    /**
     * Get an asset manager by provided scene name or asset manager in active scene if not found.
     * @param sceneName Name of the scene
     */
    getAssetManager(sceneName?: String): BABYLON.AssetsManager;
    private _render;
}
