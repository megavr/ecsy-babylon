export var AssetTypes;
(function (AssetTypes) {
    AssetTypes["Babylon"] = "Babylon";
})(AssetTypes || (AssetTypes = {}));
/**
 * Usage:
 * ```
 * entity.addComponent(Asset, { url: "PATH_TO_ASSET" });
 * entity.addComponent(Asset, { sceneName: "Scene", url: "PATH_TO_ASSET" });
 * entity.addComponent(Asset, { type: AssetTypes.Babylon, url: "PATH_TO_ASSET" });
 * ```
 */
export class Asset {
    constructor() {
        /** Default: "Babylon" */
        this.type = AssetTypes.Babylon;
    }
}
