export var AssetTypes;
(function (AssetTypes) {
    AssetTypes["babylon"] = "Babylon";
})(AssetTypes || (AssetTypes = {}));
/**
 * Usage:
 * ```
 * entity.addComponent(Asset, { url: "PATH_TO_ASSET" });
 * entity.addComponent(Asset, { sceneName: "Scene", url: "PATH_TO_ASSET" });
 * entity.addComponent(Asset, { type: AssetTypes.babylon, url: "PATH_TO_ASSET" });
 * ```
 */
export class Asset {
}
