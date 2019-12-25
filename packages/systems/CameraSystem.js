import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Camera } from "../components/index";
import { getScene, getRenderingCanvas, getGameSystem, getActiveSceneName } from "../utils/gameUtils";
import { updateObjectsTransform, disposeObject } from "../utils/objectUtils";
/** System for Camera component */
export class CameraSystem extends System {
    constructor() {
        super(...arguments);
        /** <BABYLON.Scene.uid, Camera component> */
        this._cameraOfScenes = new Map();
    }
    /** @hidden */
    init() {
        getGameSystem(this).onSceneSwitched.add(scene => this._updateControl(scene.uid));
    }
    /** @hidden */
    execute() {
        this.queries.camera.added.forEach((entity) => {
            let camera = entity.getComponent(Camera);
            let scene = getScene(this, camera.sceneName);
            this._cameraOfScenes.set(scene.uid, camera);
            camera.object = new BABYLON.FreeCamera("", BABYLON.Vector3.Zero(), scene);
            updateObjectsTransform(entity);
            this._updateControl(scene.uid);
        });
        this.queries.camera.removed.forEach((entity) => {
            let camera = entity.getComponent(Camera);
            disposeObject(camera);
        });
    }
    _updateControl(sceneUID) {
        let activeScene = getScene(this, getActiveSceneName(this));
        if (activeScene.uid === sceneUID) {
            let camera = this._cameraOfScenes.get(sceneUID);
            let canvas = getRenderingCanvas(this);
            camera.object.attachControl(canvas, true);
            camera.pointerLock && (activeScene.onPointerDown = () => { document.pointerLockElement || canvas.requestPointerLock(); });
        }
    }
}
/** @hidden */
CameraSystem.queries = {
    camera: { components: [Camera], listen: { added: true, removed: true } },
};
