import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Camera } from "../components/index";
/** Core system of ecsy-babylon. */
export declare class GameSystem extends System {
    /** @hidden */
    static queries: {
        camera: {
            components: (typeof Camera)[];
            listen: {
                added: boolean;
                removed: boolean;
            };
        };
    };
    /** @hidden */
    queries: any;
    /** Babylon.js engine instance. */
    engine: BABYLON.Engine;
    private _scenes;
    private _assetManagers;
    private _activeScene;
    private _activeSceneName;
    private _activeCameraEntity;
    private _isRendering;
    /** Get name of active scene */
    get activeSceneName(): String;
    /** Get active Camera Entity. */
    get activeCameraEntity(): Entity;
    /** @hidden */
    init(): void;
    /** @hidden */
    execute(): void;
    /**
     * Start game system in the world can be used by other systems & components.
     * @see https://doc.babylonjs.com/api/classes/babylon.engine#constructor
     * @param canvas WebGL context to be used for rendering
     * @param antialias defines enable antialiasing (default: false)
     * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.engineoptions
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     * @returns This GameSystem
     */
    start(canvas: HTMLCanvasElement, antialias?: boolean, options?: BABYLON.EngineOptions, adaptToDeviceRatio?: boolean): GameSystem;
    /**
     * Add a new scene with a name.
     * @see https://doc.babylonjs.com/api/classes/babylon.scene#constructor
     * @param sceneName Readable name to be used to switch or remove scene in the system
     * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions
     * @returns This GameSystem
     */
    addScene(sceneName: String, options?: BABYLON.SceneOptions): GameSystem;
    /** Remove an inactive scene by given name */
    removeScene(sceneName: String): GameSystem;
    /**
     * Switch to a scene by given scene name.
     * @param sceneName Name of scene
     * @param cameraEntity Default camera for the new scene
     * @returns This GameSystem
     */
    switchScene(sceneName: String, cameraEntity: Entity): GameSystem;
    /**
     * Get a scene by provided name.
     * @param sceneName Name of the scene
     * @returns Scene found in system or active scene if not available
     */
    getScene(sceneName?: String): BABYLON.Scene;
    /**
     * Get a asset manager by provided scene name.
     * @param sceneName Name of the scene
     * @returns Asset manager found or asset manager in active scene
     */
    getAssetManager(sceneName?: String): BABYLON.AssetsManager;
    private _render;
}
