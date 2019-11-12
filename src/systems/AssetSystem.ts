import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Transform, Asset, AssetTypes } from "../components/index";
import { getActiveScene, disposeObject, updateTransform } from "../utils/index";

export class AssetSystem extends System {
  static queries = {
    asset: { components: [Transform, Asset], listen: { added: true, removed: true } },
  };

  queries: any;
  assetManager: BABYLON.AssetsManager;

  execute() {
    this.queries.asset.added.forEach((entity: Entity) => {
      let asset = entity.getComponent(Asset) as Asset;
      this.assetManager || (this.assetManager = new BABYLON.AssetsManager(getActiveScene(this, asset.sceneName)));
      this.assetManager.useDefaultLoadingScreen = false;
      switch (asset.type) {
        case AssetTypes.babylon: {
          let filenameIndex = (asset.url as string).lastIndexOf("/") + 1;
          let task = this.assetManager.addMeshTask(asset.type, "", (asset.url as string).substring(0, filenameIndex), (asset.url as string).substring(filenameIndex, (asset.url as string).length));
          task.onSuccess = (task: BABYLON.AbstractAssetTask) => {
            asset.object = ((task as BABYLON.MeshAssetTask).loadedMeshes[0] as BABYLON.Mesh);
            updateTransform(entity.getComponent(Transform), asset);
          };
          break;
        }
      }
      this.assetManager.load();
    });

    this.queries.asset.removed.forEach((entity: Entity) => {
      disposeObject(entity.getComponent(Asset));
    });
  }
}