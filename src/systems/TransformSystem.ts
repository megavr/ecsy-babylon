import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Transform } from "../components/index";
import { degreeToRadians } from "../utils/index";

export class TransformSystem extends System {
  static queries = {
    object: { components: [Transform] },
  };

  queries: any;

  execute() {
    this.queries.object.results.forEach((entity: Entity) => {
      let transform = entity.getComponent(Transform) as Transform;
      let components = entity.getComponents();
      let names = Object.keys(components).filter(name => {
        return (components as any)[name].object !== undefined;
      });

      names.length > 0 && names.forEach(name => {
        let object = (components as any)[name].object;
        object.position !== undefined && this._position(transform.position, object.position);
        object.rotation !== undefined && this._rotation(transform.rotation, object.rotation);
        // https://doc.babylonjs.com/api/classes/babylon.transformnode#scaling
        object.scaling !== undefined && this._scale(transform.scale, object.scaling);
      });
    });
  }

  private _position(source: { x: number; y: number; z: number; }, target: BABYLON.Vector3) {
    target.set(source.x, source.y, source.z);
  }

  private _rotation(source: { x: number; y: number; z: number; }, target: BABYLON.Vector3) {
    target.set(degreeToRadians(source.x), degreeToRadians(source.y), degreeToRadians(source.z));
  }

  private _scale(source: { x: number; y: number; z: number; }, target: BABYLON.Vector3) {
    target.set(source.x, source.y, source.z);
  }
}