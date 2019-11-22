import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Light, LightTypes } from "../components/index";
import { getActiveScene, disposeObject, degreeToRadians, xyzToVector3, hexToColor3 } from "../utils/index";
/** @hidden */
var LightColorValues;
(function (LightColorValues) {
    LightColorValues["specular"] = "specular";
})(LightColorValues || (LightColorValues = {}));
/** @hidden */
var LightXyzValues;
(function (LightXyzValues) {
    LightXyzValues["direction"] = "direction";
})(LightXyzValues || (LightXyzValues = {}));
/** System for Light component */
export class LightSystem extends System {
    /** @hidden */
    execute() {
        this.queries.light.added.forEach((entity) => {
            let light = entity.getComponent(Light);
            let direction = xyzToVector3(light.direction);
            let scene = getActiveScene(this, light.sceneName);
            switch (light.type) {
                case LightTypes.Point:
                    light.object = new BABYLON.PointLight(light.type, BABYLON.Vector3.Zero(), scene);
                    break;
                case LightTypes.Directional:
                    light.object = new BABYLON.DirectionalLight(light.type, direction, scene);
                    break;
                case LightTypes.Spot:
                    light.object = new BABYLON.SpotLight(light.type, BABYLON.Vector3.Zero(), direction, degreeToRadians(light.angle), light.exponent, scene);
                    break;
                default:
                    light.object = new BABYLON.HemisphericLight(LightTypes.Hemispheric, direction, scene);
                    break;
            }
            this._updateLight(light);
        });
        this.queries.light.changed.forEach((entity) => {
            this._updateLight(entity.getComponent(Light));
        });
        this.queries.light.removed.forEach((entity) => {
            disposeObject(entity.getComponent(Light));
        });
    }
    _updateLight(light) {
        let lightObject = light.object;
        Object.keys(light).forEach(name => {
            if (LightColorValues[name]) {
                lightObject[name] = hexToColor3(light[name]);
            }
            else if (LightXyzValues[name]) {
                lightObject[name] = xyzToVector3(light[name]);
            }
            else {
                lightObject[name] = light[name];
            }
        });
    }
}
/** @hidden */
LightSystem.queries = {
    light: { components: [Light], listen: { added: true, removed: true, changed: true } },
};
