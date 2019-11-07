import { Entity, System } from "ecsy";
import { Transform } from "../components/index";
import { degreeToRadians, xyzToVector3 } from "../utils/index";

export class TransformSystem extends System {
  static queries = {
    object: { components: [Transform] },
  };

  queries: any;

  execute() {
    this.queries.object.results.forEach((entity: Entity) => {
      this._updateTransform(entity.getComponent(Transform), entity.getComponents());
    });
  }

  private _updateTransform(transform: Transform, components: Object) {
    Object.keys(components)
      .filter(name => { return (components as any)[name].object !== undefined; })
      .forEach(name => {
        let object = (components as any)[name].object;
        object.position && (object.position = xyzToVector3(transform.position));
        object.rotation && object.rotation.set(degreeToRadians(transform.rotation.x), degreeToRadians(transform.rotation.y), degreeToRadians(transform.rotation.z));
        object.scaling && (object.scaling = xyzToVector3(transform.scale));
      });
  }
}