import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Camera } from "../components/index";
import { getScene, getRenderingCanvas, getGameSystem, getScenes } from "../utils/gameUtils";
import { updateObjectsTransform, disposeObject } from "../utils/objectUtils";
/** System for Camera component */
export class CameraSystem extends System {
    constructor() {
        super(...arguments);
        /** <BABYLON.Scene.uid, Camera component> */
        this._cameras = new Map();
    }
    /** @hidden */
    init() {
        getGameSystem(this).onSceneSwitched.add(scene => this._updateControl(scene));
        this._pointerLock = this._pointerLock.bind(this);
    }
    /** @hidden */
    execute() {
        this.queries.camera.added.forEach((entity) => {
            let camera = entity.getComponent(Camera);
            let scene = getScene(this, camera.scene);
            camera.object = new BABYLON.FreeCamera("", BABYLON.Vector3.Zero(), scene);
            updateObjectsTransform(entity);
            this._cameras.set(scene.uid, camera);
            this._updateControl(scene);
        });
        this.queries.camera.removed.forEach((entity) => {
            let camera = entity.getComponent(Camera);
            let scene = getScene(this, camera.scene);
            this._removeControl(scene);
            this._cameras.has(scene.uid) && this._cameras.delete(scene.uid);
            disposeObject(camera);
        });
    }
    _updateControl(targetScene) {
        if (targetScene.uid === getScene(this).uid) {
            getScenes(this).forEach(scene => this._removeControl(scene));
            let camera = this._cameras.get(targetScene.uid);
            camera.object.attachControl(getRenderingCanvas(this));
            camera.pointerLock ? targetScene.onPointerObservable.add(this._pointerLock) : document.exitPointerLock();
        }
    }
    _removeControl(scene) {
        this._cameras.forEach((camera, sceneUID) => sceneUID === scene.uid && camera.object.detachControl(getRenderingCanvas(this)));
        scene.onPointerObservable.removeCallback(this._pointerLock);
    }
    _pointerLock(pointerInfo) {
        pointerInfo.event.type === "pointerdown" && (document.pointerLockElement || getRenderingCanvas(this).requestPointerLock());
    }
}
/** @hidden */
CameraSystem.queries = {
    camera: { components: [Camera], listen: { added: true, removed: true } },
};
