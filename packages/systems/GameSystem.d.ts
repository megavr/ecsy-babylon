import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Camera } from "../components/index";
export declare class GameSystem extends System {
    static queries: {
        camera: {
            components: (typeof Camera)[];
            listen: {
                added: boolean;
                removed: boolean;
            };
        };
    };
    queries: any;
    engine: BABYLON.Engine;
    scenes: Map<String, BABYLON.Scene>;
    private _lastTime;
    private _activeScene;
    private _isRendering;
    get activeScene(): BABYLON.Scene;
    init(): void;
    execute(): void;
    /**
     * Start the core system can be used by other systems & components.
     * @param canvas WebGL context to be used for rendering
     * @param antialias defines enable antialiasing (default: false)
     * @param options defines further options to be sent to the getContext() function
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     */
    start(canvas: HTMLCanvasElement, antialias?: boolean, options?: BABYLON.EngineOptions, adaptToDeviceRatio?: boolean): GameSystem;
    /**
     * Get a scene by provided name or return current scene if not available.
     * @param name Scene name
     */
    getScene(name?: string): BABYLON.Scene;
    /**
     * Add a new scene.
     * @param name Name can be used to switch or remove in the system
     * @param options SceneOptions for the new Scene instance
     */
    addScene(name: string, options?: BABYLON.SceneOptions): GameSystem;
    private _render;
}
