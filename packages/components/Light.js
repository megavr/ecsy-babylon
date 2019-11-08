export var LightTypes;
(function (LightTypes) {
    LightTypes["Point"] = "Point";
    LightTypes["Directional"] = "Directional";
    LightTypes["Spot"] = "Spot";
    LightTypes["Hemispheric"] = "Hemispheric";
})(LightTypes || (LightTypes = {}));
export class Light {
    constructor() {
        this.type = LightTypes.Hemispheric;
        this.direction = { x: 0, y: 0, z: 0 };
    }
}
