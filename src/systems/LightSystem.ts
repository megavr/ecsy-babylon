import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Light, LightTypes } from "../components/index";
import { getActiveScene, disposeObject, degreeToRadians } from "../utils/index";

export class LightSystem extends System {
  static queries = {
    light: { components: [Light], listen: { added: true, removed: true, changed: true } },
  };

  queries: any;

  execute() {
    this.queries.light.added.forEach((entity: Entity) => {
      let light = entity.getComponent(Light) as Light;
      let direction = new BABYLON.Vector3(light.direction.x, light.direction.y, light.direction.z);
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
        case LightTypes.Hemispheric:
          light.object = new BABYLON.HemisphericLight(light.type, direction, scene);
          break;
      }
    });

    this.queries.light.changed.forEach((entity: Entity) => {
      let light = entity.getComponent(Light) as Light;
      light.direction !== undefined && (light.object.direction = new BABYLON.Vector3(light.direction.x, light.direction.y, light.direction.z));
    });

    this.queries.light.removed.forEach((entity: Entity) => {
      let light = entity.getComponent(Light) as Light;
      disposeObject(light);
    });
  }
}