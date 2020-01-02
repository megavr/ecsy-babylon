import * as BABYLON from "@babylonjs/core";
import { System, Entity, SystemConstructor } from "ecsy";
/** @hidden */
export declare function getSystem<T extends System>(self: System, target: SystemConstructor<T>): T;
/**
 * @hidden
 * Get canvas used for rendering.
 * @param system A registered ecsy System class
 */
export declare function getRenderingCanvas(system: System): HTMLCanvasElement;
/**
 * @hidden
 * Get all scenes in engine.
 * @param system A registered ecsy System class
 */
export declare function getScenes(system: System): BABYLON.Scene[];
/**
 * Get a scene or return active scene.
 * @param system A registered ecsy System class
 * @param scene Scene entity
 */
export declare function getScene(system: System, scene?: Entity): BABYLON.Scene;
/**
 * Get scene AssetManager or return AssetManager in active scene.
 * @param system A registered ecsy System class
 * @param scene Scene entity
 */
export declare function getAssetManager(system: System, scene?: Entity): BABYLON.AssetsManager;
