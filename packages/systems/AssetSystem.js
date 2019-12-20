import { System } from "ecsy";
import { Asset, AssetTypes } from "../components/index";
import { getAssetManager } from "../utils/gameUtils";
import { updateObjectsTransform, disposeObject } from "../utils/objectUtils";
/** System for Asset component */
export class AssetSystem extends System {
    /** @hidden */
    execute() {
        this.queries.asset.added.forEach((entity) => {
            let asset = entity.getComponent(Asset);
            let assetManager = getAssetManager(this, asset.sceneName);
            switch (asset.type) {
                default: {
                    let filenameIndex = asset.url.lastIndexOf("/") + 1;
                    let task = assetManager.addMeshTask(AssetTypes.Babylon, "", asset.url.substring(0, filenameIndex), asset.url.substring(filenameIndex, asset.url.length));
                    task.onSuccess = (task) => {
                        asset.object = task.loadedMeshes[0];
                        updateObjectsTransform(entity);
                    };
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
}
/** @hidden */
AssetSystem.queries = {
    asset: { components: [Asset], listen: { added: true, removed: true } },
};
