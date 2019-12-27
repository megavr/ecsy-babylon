import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Scene } from "../components/index";
/** Core system of ecsy-babylon. */
export declare class GameSystem extends System {
    /** @hidden */
    static queries: {
        scene: {
            components: (typeof Scene)[];
            listen: {
                added: boolean;
                removed: boolean;
                changed: (typeof Scene)[];
            };
        };
    };
    /** @hidden */
    queries: any;
    private _engine;
    /** Get canvas used for rendering. */
    get renderingCanvas(): HTMLCanvasElement | null;
    /** Get all scenes in engine. */
    get scenes(): BABYLON.Scene[];
    private _activeScene;
    /** Get active scene. */
    get activeScene(): BABYLON.Scene;
    /** <Scene UID, BABYLON.AssetsManager> */
    private _assetManagers;
    /** Observable event when active scene is switched. */
    onSceneSwitched: BABYLON.Observable<BABYLON.Scene>;
    /** @hidden */
    init(): void;
    /** @hidden */
    execute(): void;
    private _updateScene;
    private _updateColor;
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
     * Switch to a scene by given scene entity.
     * @param scene Scene entity
     */
    switchScene(scene: Entity): GameSystem;
    /**
     * Get scene AssetManager or return AssetManager in active scene.
     * @param scene Scene entity
     */
    getAssetManager(scene?: Entity): BABYLON.AssetsManager;
    private _render;
}
