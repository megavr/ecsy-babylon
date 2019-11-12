import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Transform, Asset, AssetTypes } from "../components/index";
import { getActiveScene, disposeObject, updateTransform } from "../utils/index";
export class AssetSystem extends System {
    execute() {
        this.queries.asset.added.forEach((entity) => {
            let asset = entity.getComponent(Asset);
            this.assetManager || (this.assetManager = new BABYLON.AssetsManager(getActiveScene(this, asset.sceneName)));
            this.assetManager.useDefaultLoadingScreen = false;
            switch (asset.type) {
                case AssetTypes.babylon: {
                    let filenameIndex = asset.url.lastIndexOf("/") + 1;
                    let task = this.assetManager.addMeshTask(asset.type, "", asset.url.substring(0, filenameIndex), asset.url.substring(filenameIndex, asset.url.length));
                    task.onSuccess = (task) => {
                        asset.object = task.loadedMeshes[0];
                        updateTransform(entity.getComponent(Transform), asset);
                    };
                    break;
                }
            }
            this.assetManager.load();
        });
        this.queries.asset.removed.forEach((entity) => {
            disposeObject(entity.getComponent(Asset));
        });
    }
}
AssetSystem.queries = {
    asset: { components: [Transform, Asset], listen: { added: true, removed: true } },
};
