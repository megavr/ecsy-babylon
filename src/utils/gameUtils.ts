import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { getWorld } from "./worldUtils";
import { GameSystem } from "../systems/GameSystem";

/**
 * @hidden
 * Get runtime GameSystem instance. 
 * @param system A registered ecsy System class
 */
export function getGameSystem(system: System): GameSystem {
  return getWorld(system).getSystem(GameSystem) as GameSystem;
}

/**
 * @hidden
 * Get canvas used for rendering. 
 * @param system A registered ecsy System class
 */
export function getRenderingCanvas(system: System): HTMLCanvasElement {
  return getGameSystem(system).renderingCanvas as HTMLCanvasElement;
}

/**
 * Get a scene found or active scene if not found.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 */
export function getScene(system: System, sceneName?: String): BABYLON.Scene {
  return getGameSystem(system).getScene(sceneName);
}

/**
 * Get an AssetManager found or AssetManager in active scene if not found.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 */
export function getAssetManager(system: System, sceneName?: string): BABYLON.AssetsManager {
  return getGameSystem(system).getAssetManager(sceneName);
}

/**
 * Get name of active scene.
 * @param system A registered ecsy System class
 */
export function getActiveSceneName(system: System): String {
  return getGameSystem(system).activeSceneName;
}