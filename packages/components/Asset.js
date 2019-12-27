export var AssetTypes;
(function (AssetTypes) {
    AssetTypes["Babylon"] = "Babylon";
})(AssetTypes || (AssetTypes = {}));
/**
 * @example
 * ```
 * entity.addComponent(Asset, { url: "PATH_TO_ASSET" });
 * ```
 */
export class Asset {
    constructor() {
        /** @default "Babylon" */
        this.type = AssetTypes.Babylon;
    }
}
