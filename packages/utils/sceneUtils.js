import { getWorld } from "./worldUtils";
import { SceneSystem } from "../systems/SceneSystem";
/**
 * @hidden
 * Get runtime SceneSystem instance.
 * @param system A registered ecsy System class
 */
export function getSceneSystem(system) {
    return getWorld(system).getSystem(SceneSystem);
}
