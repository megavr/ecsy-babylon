import { getWorld } from "./worldUtils";
import { GameSystem } from "../systems/GameSystem";
import { Scene } from "../components/Scene";
/** @hidden */
export function getSystem(self, target) {
    return getWorld(self).getSystem(target);
}
/**
 * @hidden
 * Get canvas used for rendering.
 * @param system A registered ecsy System class
 */
export function getRenderingCanvas(system) {
    return getSystem(system, GameSystem).renderingCanvas;
}
/**
 * @hidden
 * Get all scenes in engine.
 * @param system A registered ecsy System class
 */
export function getScenes(system) {
    return getSystem(system, GameSystem).scenes;
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
        return getSystem(system, GameSystem).activeScene;
    }
}
/**
 * Get scene AssetManager or return AssetManager in active scene.
 * @param system A registered ecsy System class
 * @param scene Scene entity
 */
export function getAssetManager(system, scene) {
    return getSystem(system, GameSystem).getAssetManager(scene);
}
