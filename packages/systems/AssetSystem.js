import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Transform, Asset, AssetTypes } from "../components/index";
import { getScene, disposeObject, updateObjectsTransform } from "../utils/index";
/** System for Asset component */
export class AssetSystem extends System {
    /** @hidden */
    execute() {
        this.queries.asset.added.forEach((entity) => {
            let asset = entity.getComponent(Asset);
            this._assetManager || (this._assetManager = new BABYLON.AssetsManager(getScene(this, asset.sceneName)));
            this._assetManager.useDefaultLoadingScreen = false;
            switch (asset.type) {
                default: {
                    this._loadBabylon(entity.getComponent(Transform), asset);
                    break;
                }
            }
            this._assetManager.load();
        });
        this.queries.asset.removed.forEach((entity) => {
            disposeObject(entity.getComponent(Asset));
        });
    }
    _loadBabylon(transform, asset) {
        let filenameIndex = asset.url.lastIndexOf("/") + 1;
        let task = this._assetManager.addMeshTask(AssetTypes.Babylon, "", asset.url.substring(0, filenameIndex), asset.url.substring(filenameIndex, asset.url.length));
        task.onSuccess = (task) => {
            asset.object = task.loadedMeshes[0];
            updateObjectsTransform(transform, [asset]);
        };
    }
}
/** @hidden */
AssetSystem.queries = {
    asset: { components: [Transform, Asset], listen: { added: true, removed: true } },
};
