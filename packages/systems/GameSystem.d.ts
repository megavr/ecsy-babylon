import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
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
    /** A map holds created scene(s) instance and its name. */
    scenes: Map<String, BABYLON.Scene>;
    private _lastTime;
    private _activeScene;
    private _isRendering;
    /** Get current scene instance. */
    get activeScene(): BABYLON.Scene;
    /** @hidden */
    init(): void;
    /** @hidden */
    execute(): void;
    /**
     * Start game system in the world can be used by other systems & components.
     * https://doc.babylonjs.com/api/classes/babylon.engine#constructor
     * @param canvas WebGL context to be used for rendering
     * @param antialias defines enable antialiasing (default: false)
     * @param options https://doc.babylonjs.com/api/interfaces/babylon.engineoptions
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     */
    start(canvas: HTMLCanvasElement, antialias?: boolean, options?: BABYLON.EngineOptions, adaptToDeviceRatio?: boolean): GameSystem;
    /**
     * Get a scene by provided name or return current scene if not available.
     * @param name Name of the scene
     */
    getScene(name?: string): BABYLON.Scene;
    /**
     * Add a new scene with a name.
     * https://doc.babylonjs.com/api/classes/babylon.scene#constructor
     * @param name Readable name to be used to switch or remove scene in the system
     * @param options https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions
     */
    addScene(name: string, options?: BABYLON.SceneOptions): GameSystem;
    private _render;
}
