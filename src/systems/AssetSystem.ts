import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Transform, Asset, AssetTypes } from "../components/index";
import { disposeObject, updateObjectsTransform, getAssetManager } from "../utils/index";

/** System for Asset component */
export class AssetSystem extends System {
  /** @hidden */
  static queries = {
    asset: { components: [Asset], listen: { added: true, removed: true } },
  };
  /** @hidden */
  queries: any;

  /** @hidden */
  execute() {
    this.queries.asset.added.forEach((entity: Entity) => {
      let asset = entity.getComponent(Asset);
      let assetManager = getAssetManager(this, asset.sceneName)
      switch (asset.type) {
        default: {
          this._loadBabylon(entity.getComponent(Transform), asset, assetManager);
          break;
        }
      }
      assetManager.load();
      assetManager.reset();
    });

    this.queries.asset.removed.forEach((entity: Entity) => {
      disposeObject(entity.getComponent(Asset));
    });
  }

  private _loadBabylon(transform: Transform, asset: Asset, assetManager: BABYLON.AssetsManager) {
    let filenameIndex = (asset.url as string).lastIndexOf("/") + 1;
    let task = assetManager.addMeshTask(AssetTypes.Babylon, "", (asset.url as string).substring(0, filenameIndex), (asset.url as string).substring(filenameIndex, (asset.url as string).length));
    task.onSuccess = (task: BABYLON.AbstractAssetTask) => {
      asset.object = ((task as BABYLON.MeshAssetTask).loadedMeshes[0] as BABYLON.Mesh);
      transform && updateObjectsTransform(transform, [asset]);
    }
  }
}