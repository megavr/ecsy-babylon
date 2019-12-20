import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Asset, AssetTypes } from "../components/index";
import { getAssetManager } from "../utils/gameUtils";
import { updateObjectsTransform, disposeObject } from "../utils/objectUtils";

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
          let filenameIndex = (asset.url as string).lastIndexOf("/") + 1;
          let task = assetManager.addMeshTask(AssetTypes.Babylon, "", (asset.url as string).substring(0, filenameIndex), (asset.url as string).substring(filenameIndex, (asset.url as string).length));
          task.onSuccess = (task: BABYLON.AbstractAssetTask) => {
            asset.object = ((task as BABYLON.MeshAssetTask).loadedMeshes[0] as BABYLON.Mesh);
            updateObjectsTransform(entity);
          }
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
}