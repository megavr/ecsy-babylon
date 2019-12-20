import * as BABYLON from "@babylonjs/core";
import { System, World, Entity } from "ecsy";
import { GameSystem } from "../systems/index";
/**
 * Hack on ecsy to get World instance from system itself.
 * @param system A registered ecsy System class
 * @returns ecsy world
 */
/** @hidden */
export declare function getWorld(system: System): World;
/**
 * Get runtime GameSystem instance.
 * @param system A registered ecsy System class
 * @returns ecsy-babylon GameSystem
 */
/** @hidden */
export declare function getGameSystem(system: System): GameSystem;
/**
 * Get a scene found or active scene if not available.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 * @returns Babylon.js Scene
 */
export declare function getScene(system: System, sceneName?: string): BABYLON.Scene;
/**
 * Get an AssetManager found or an AssetManager in active scene.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 * @returns Babylon.js AssetManager
 */
export declare function getAssetManager(system: System, sceneName?: string): BABYLON.AssetsManager;
/**
 * Get active Camera entity in the scene.
 * @param system A registered ecsy System class
 * @returns Entity with ecsy-babylon Camera
 */
export declare function getCamera(system: System): Entity;
