import { getWorld } from "./worldUtils";
import { GameSystem } from "../systems/GameSystem";
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
 * Get a scene found or active scene if not found.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 */
export function getScene(system, sceneName) {
    return getGameSystem(system).getScene(sceneName);
}
/**
 * Get an AssetManager found or AssetManager in active scene if not found.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 */
export function getAssetManager(system, sceneName) {
    return getGameSystem(system).getAssetManager(sceneName);
}
/**
 * Get name of active scene.
 * @param system A registered ecsy System class
 */
export function getActiveSceneName(system) {
    return getGameSystem(system).activeSceneName;
}
