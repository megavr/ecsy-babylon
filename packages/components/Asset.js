export var AssetTypes;
(function (AssetTypes) {
    AssetTypes["babylon"] = "Babylon";
})(AssetTypes || (AssetTypes = {}));
export class Asset {
    constructor() {
        this.type = AssetTypes.babylon;
    }
}
