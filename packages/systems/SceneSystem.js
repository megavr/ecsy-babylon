import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Scene } from "../components/Scene";
import { getWorld } from "../utils/worldUtils";
import { disposeObject } from "../utils/objectUtils";
import { GameSystem } from "./GameSystem";
export class SceneSystem extends System {
    get activeScene() { return this._activeScene; }
    /** @hidden */
    execute() {
        this.queries.scene.added.forEach((entity) => {
            let scene = entity.getComponent(Scene);
            let engine = this._getEngine();
            scene.object = new BABYLON.Scene(engine, scene.options);
            engine.scenes.length === 1 && (this._activeScene = scene);
        });
        this.queries.scene.removed.forEach((entity) => {
            let scene = entity.getComponent(Scene);
            disposeObject(scene);
        });
    }
    _getEngine() {
        return getWorld(this).getSystem(GameSystem).engine;
    }
}
/** @hidden */
SceneSystem.queries = {
    scene: { components: [Scene], listen: { added: true, removed: true } },
};
