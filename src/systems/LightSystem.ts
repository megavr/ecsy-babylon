import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Light, LightTypes } from "../components/index";
import { XYZProperties } from "../components/types/index";
import { getActiveScene, disposeObject, degreeToRadians, xyzToVector3, hexToColor3 } from "../utils/index";

/** @hidden */
enum LightColorValues {
  specular = "specular"
}

/** @hidden */
enum LightXyzValues {
  direction = "direction"
}

/** System for Light component */
export class LightSystem extends System {
  /** @hidden */
  static queries = {
    light: { components: [Light], listen: { added: true, removed: true, changed: true } },
  };
  /** @hidden */
  queries: any;

  /** @hidden */
  execute() {
    this.queries.light.added.forEach((entity: Entity) => {
      let light = entity.getComponent(Light) as Light;
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
          light.object = new BABYLON.SpotLight(light.type, BABYLON.Vector3.Zero(), direction, degreeToRadians(light.angle as number), light.exponent as number, scene);
          break;
        default:
          light.object = new BABYLON.HemisphericLight(LightTypes.Hemispheric, direction, scene);
          break;
      }
      this._updateLight(light);
    });

    this.queries.light.changed.forEach((entity: Entity) => {
      this._updateLight(entity.getComponent(Light));
    });

    this.queries.light.removed.forEach((entity: Entity) => {
      disposeObject(entity.getComponent(Light));
    });
  }

  private _updateLight(light: Light) {
    let lightObject = light.object;
    Object.keys(light).forEach(name => {
      if ((LightColorValues as any)[name]) {
        (lightObject as any)[name] = hexToColor3((light as any)[name]);
      } else if ((LightXyzValues as any)[name]) {
        (lightObject as any)[name] = xyzToVector3((light as any)[name] as XYZProperties);
      } else {
        (lightObject as any)[name] = (light as any)[name];
      }
    });
  }
}