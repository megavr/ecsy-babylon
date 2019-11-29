export var LightTypes;
(function (LightTypes) {
    LightTypes["Point"] = "Point";
    LightTypes["Directional"] = "Directional";
    LightTypes["Spot"] = "Spot";
    LightTypes["Hemispheric"] = "Hemispheric";
})(LightTypes || (LightTypes = {}));
/**
 * Usage:
 * ```
 * entity.addComponent(Light);
 * entity.addComponent(Light, { type: LightTypes.Point, intensity: 2 });
 * entity.addComponent(Light, { type: LightTypes.Directional, direction: { x: 0, y: 0, z: 1 } });
 * entity.addComponent(Light, { type: LightTypes.Spot, direction: { x: 0, y: 0, z: 1 }, angle: 30, exponent: 2 });
 * ```
 */
export class Light {
    constructor() {
        /** Default: "Hemispheric" */
        this.type = LightTypes.Hemispheric;
        this.direction = { x: 0, y: 0, z: 0 };
    }
}
