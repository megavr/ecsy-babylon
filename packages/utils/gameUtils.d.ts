import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { GameSystem } from "../systems/GameSystem";
/**
 * @hidden
 * Get runtime GameSystem instance.
 * @param system A registered ecsy System class
 */
export declare function getGameSystem(system: System): GameSystem;
/**
 * @hidden
 * Get canvas used for rendering.
 * @param system A registered ecsy System class
 */
export declare function getRenderingCanvas(system: System): HTMLCanvasElement;
/**
 * Get a scene found or active scene if not found.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 */
export declare function getScene(system: System, sceneName?: String): BABYLON.Scene;
/**
 * Get an AssetManager found or AssetManager in active scene if not found.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 */
export declare function getAssetManager(system: System, sceneName?: string): BABYLON.AssetsManager;
/**
 * Get name of active scene.
 * @param system A registered ecsy System class
 */
export declare function getActiveSceneName(system: System): String;
