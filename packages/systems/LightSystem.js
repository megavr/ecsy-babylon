import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Light, LightTypes } from "../components/index";
import { getScene, disposeObject, degreeToRadians, xyzToVector3, hexToColor3, updateObjectValue, updateObjectVector3 } from "../utils/index";
/** System for Light component */
export class LightSystem extends System {
    /** @hidden */
    execute() {
        this.queries.light.added.forEach((entity) => {
            let light = entity.getComponent(Light);
            let direction = xyzToVector3(light.direction);
            let scene = getScene(this, light.sceneName);
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
        for (let prop in light) {
            switch (prop) {
                case "direction":
                    updateObjectVector3(light, prop);
                    break;
                case "color":
                    this._updateColor(light, light.color);
                    break;
                default:
                    updateObjectValue(light, prop);
                    break;
            }
        }
    }
    _updateColor(light, color) {
        for (let prop in color) {
            light.object[prop] = hexToColor3(color[prop]);
        }
    }
}
/** @hidden */
LightSystem.queries = {
    light: { components: [Light], listen: { added: true, removed: true, changed: [Light] } },
};
