import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Camera } from "../components/index";
import { getScene, getRenderingCanvas, getGameSystem, getActiveSceneName } from "../utils/gameUtils";
import { updateObjectsTransform, disposeObject } from "../utils/objectUtils";

/** System for Camera component */
export class CameraSystem extends System {
  /** @hidden */
  static queries = {
    camera: { components: [Camera], listen: { added: true, removed: true } },
  };
  /** @hidden */
  queries: any;

  /** <BABYLON.Scene.uid, Camera component> */
  private _cameraOfScenes: Map<String, Camera> = new Map<String, Camera>();

  /** @hidden */
  init() {
    getGameSystem(this).onSceneSwitched.add(scene => this._updateControl(scene.uid));
  }

  /** @hidden */
  execute() {
    this.queries.camera.added.forEach((entity: Entity) => {
      let camera = entity.getComponent(Camera);
      let scene = getScene(this, camera.sceneName);
      this._cameraOfScenes.set(scene.uid, camera);
      camera.object = new BABYLON.FreeCamera("", BABYLON.Vector3.Zero(), scene);
      updateObjectsTransform(entity);
      this._updateControl(scene.uid);
    });

    this.queries.camera.removed.forEach((entity: Entity) => {
      let camera = entity.getComponent(Camera);
      disposeObject(camera);
    });
  }

  private _updateControl(sceneUID: String): void {
    let activeScene = getScene(this, getActiveSceneName(this));
    if (activeScene.uid === sceneUID) {
      let camera = this._cameraOfScenes.get(sceneUID) as Camera;
      let canvas = getRenderingCanvas(this);
      camera.object.attachControl(canvas, true);
      camera.pointerLock && (activeScene.onPointerDown = () => { document.pointerLockElement || canvas.requestPointerLock(); });
    }
  }
}