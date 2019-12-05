import { System } from "ecsy";
import { Transform, Asset, AssetTypes } from "../components/index";
import { disposeObject, updateObjectsTransform, getAssetManager } from "../utils/index";
/** System for Asset component */
export class AssetSystem extends System {
    /** @hidden */
    execute() {
        this.queries.asset.added.forEach((entity) => {
            let asset = entity.getComponent(Asset);
            let assetManager = getAssetManager(this, asset.sceneName);
            switch (asset.type) {
                default: {
                    this._loadBabylon(entity.getComponent(Transform), asset, assetManager);
                    break;
                }
            }
            assetManager.load();
            assetManager.reset();
        });
        this.queries.asset.removed.forEach((entity) => {
            disposeObject(entity.getComponent(Asset));
        });
    }
    _loadBabylon(transform, asset, assetManager) {
        let filenameIndex = asset.url.lastIndexOf("/") + 1;
        let task = assetManager.addMeshTask(AssetTypes.Babylon, "", asset.url.substring(0, filenameIndex), asset.url.substring(filenameIndex, asset.url.length));
        task.onSuccess = (task) => {
            asset.object = task.loadedMeshes[0];
            transform && updateObjectsTransform(transform, [asset]);
        };
    }
}
/** @hidden */
AssetSystem.queries = {
    asset: { components: [Asset], listen: { added: true, removed: true } },
};
