import * as BABYLON from "@babylonjs/core";
import { System, World, Entity } from "ecsy";
import { GameSystem } from "../systems/index";

/**
 * Hack on ecsy to get World instance from system itself.
 * @param system A registered ecsy System class
 * @returns ecsy world
 */
/** @hidden */
export function getWorld(system: System): World {
  return (system as any)["world"] as World;
}

/**
 * Get runtime GameSystem instance. 
 * @param system A registered ecsy System class
 * @returns ecsy-babylon GameSystem 
 */
/** @hidden */
export function getGameSystem(system: System): GameSystem {
  return getWorld(system).getSystems().find(system => { return (system as any).engine; }) as GameSystem;
}

/**
 * Get a scene found or active scene if not available.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 * @returns Babylon.js Scene
 */
export function getScene(system: System, sceneName?: string): BABYLON.Scene {
  return getGameSystem(system).getScene(sceneName);
}

/**
 * Get an AssetManager found or an AssetManager in active scene.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene 
 * @returns Babylon.js AssetManager
 */
export function getAssetManager(system: System, sceneName?: string): BABYLON.AssetsManager {
  return getGameSystem(system).getAssetManager(sceneName);
}

/**
 * Get active Camera entity in the scene.
 * @param system A registered ecsy System class 
 * @returns Entity with ecsy-babylon Camera 
 */
export function getCamera(system: System): Entity {
  return getGameSystem(system).activeCameraEntity;
}