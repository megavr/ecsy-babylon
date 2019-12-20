import { Entity, System } from "ecsy";
import { Transform } from "../components/index";
import { updateObjectsTransform } from "../utils/objectUtils";

/** System for Transform component */
export class TransformSystem extends System {
  /** @hidden */
  static queries = {
    transforms: { components: [Transform], listen: { added: true, changed: [Transform] } },
  };
  /** @hidden */
  queries: any;

  /** @hidden */
  execute() {
    this.queries.transforms.changed.forEach((entity: Entity) => {
      entity.getComponent(Transform).updateObjects && updateObjectsTransform(entity);
    });
  }
}