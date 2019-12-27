import { getWorld } from "./worldUtils";
import { GameSystem } from "../systems/GameSystem";
import { Scene } from "../components/Scene";
/**
 * @hidden
 * Get runtime GameSystem instance.
 * @param system A registered ecsy System class
 */
export function getGameSystem(system) {
    return getWorld(system).getSystem(GameSystem);
}
/**
 * @hidden
 * Get canvas used for rendering.
 * @param system A registered ecsy System class
 */
export function getRenderingCanvas(system) {
    return getGameSystem(system).renderingCanvas;
}
/**
 * @hidden
 * Get all scenes in engine.
 * @param system A registered ecsy System class
 */
export function getScenes(system) {
    return getGameSystem(system).scenes;
}
/**
 * Get a scene or return active scene.
 * @param system A registered ecsy System class
 * @param scene Scene entity
 */
export function getScene(system, scene) {
    if (scene) {
        return scene.getComponent(Scene).object;
    }
    else {
        return getGameSystem(system).activeScene;
    }
}
/**
 * Get scene AssetManager or return AssetManager in active scene.
 * @param system A registered ecsy System class
 * @param scene Scene entity
 */
export function getAssetManager(system, scene) {
    return getGameSystem(system).getAssetManager(scene);
}
