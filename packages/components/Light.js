import { xyz } from "../utils/mathUtils";
export var LightTypes;
(function (LightTypes) {
    LightTypes["Point"] = "Point";
    LightTypes["Directional"] = "Directional";
    LightTypes["Spot"] = "Spot";
    LightTypes["Hemispheric"] = "Hemispheric";
})(LightTypes || (LightTypes = {}));
/**
 * @example
 * ```
 * entity.addComponent(Light, { sceneName: "Scene", color: { diffuse: "#AAFFAA" } });
 * entity.addComponent(Light, { type: LightTypes.Point, intensity: 2 });
 * entity.addComponent(Light, { type: LightTypes.Directional, direction: { x: 0, y: 0, z: 1 } });
 * entity.addComponent(Light, { type: LightTypes.Spot, direction: { x: 0, y: 0, z: 1 }, angle: 30, exponent: 2 });
 * ```
 */
export class Light {
    constructor() {
        /** @default "Hemispheric" */
        this.type = LightTypes.Hemispheric;
        /**
         * @see https://doc.babylonjs.com/api/classes/babylon.shadowlight#direction
         * @default 0,0,0
         */
        this.direction = xyz();
    }
}
