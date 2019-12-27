import * as BABYLON from "@babylonjs/core";
import { System, Entity } from "ecsy";
import { getWorld } from "./worldUtils";
import { GameSystem } from "../systems/GameSystem";
import { Scene } from "../components/Scene";

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
 * @hidden
 * Get all scenes in engine.
 * @param system A registered ecsy System class
 */
export function getScenes(system: System): BABYLON.Scene[] {
  return getGameSystem(system).scenes;
}

/**
 * Get a scene or return active scene.
 * @param system A registered ecsy System class
 * @param scene Scene entity
 */
export function getScene(system: System, scene?: Entity): BABYLON.Scene {
  if (scene) {
    return scene.getComponent(Scene).object;
  } else {
    return getGameSystem(system).activeScene;
  }
}

/**
 * Get scene AssetManager or return AssetManager in active scene.
 * @param system A registered ecsy System class
 * @param scene Scene entity
 */
export function getAssetManager(system: System, scene?: Entity): BABYLON.AssetsManager {
  return getGameSystem(system).getAssetManager(scene);
}