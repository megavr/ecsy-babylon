import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Transform, Asset, AssetTypes } from "../components/index";
import { getActiveScene, disposeObject, updateTransform } from "../utils/index";

/** System for Asset component */
export class AssetSystem extends System {
  /** @hidden */
  static queries = {
    asset: { components: [Transform, Asset], listen: { added: true, removed: true } },
  };
  /** @hidden */
  queries: any;
  private _assetManager: BABYLON.AssetsManager;

  /** @hidden */
  execute() {
    this.queries.asset.added.forEach((entity: Entity) => {
      let asset = entity.getComponent(Asset) as Asset;
      this._assetManager || (this._assetManager = new BABYLON.AssetsManager(getActiveScene(this, asset.sceneName)));
      this._assetManager.useDefaultLoadingScreen = false;
      switch (asset.type) {
        default: {
          this._loadBabylon(entity.getComponent(Transform) as Transform, asset);
          break;
        }
      }
      this._assetManager.load();
    });

    this.queries.asset.removed.forEach((entity: Entity) => {
      disposeObject(entity.getComponent(Asset));
    });
  }

  private _loadBabylon(transform: Transform, asset: Asset) {
    let filenameIndex = (asset.url as string).lastIndexOf("/") + 1;
    let task = this._assetManager.addMeshTask(AssetTypes.babylon, "", (asset.url as string).substring(0, filenameIndex), (asset.url as string).substring(filenameIndex, (asset.url as string).length));
    task.onSuccess = (task: BABYLON.AbstractAssetTask) => {
      asset.object = ((task as BABYLON.MeshAssetTask).loadedMeshes[0] as BABYLON.Mesh);
      updateTransform(transform, asset);
    };
  }
}