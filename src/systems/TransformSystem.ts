import { Entity, System } from "ecsy";
import { Transform } from "../components/index";
import { updateObjectsTransform, getObjectComponentsInEntity } from "../utils/index";

/** System for Transform component */
export class TransformSystem extends System {
  /** @hidden */
  static queries = {
    object: { components: [Transform], listen: { changed: [Transform] } },
  };
  /** @hidden */
  queries: any;

  /** @hidden */
  init() {
    window.addEventListener("load", () => {
      this.queries.object.results.forEach((entity: Entity) => {
        entity.getComponent(Transform).updateObjects && updateObjectsTransform(entity.getComponent(Transform), getObjectComponentsInEntity(entity));
      });
    });
  }

  /** @hidden */
  execute() {
    this.queries.object.changed.forEach((entity: Entity) => {
      entity.getComponent(Transform).updateObjects && updateObjectsTransform(entity.getComponent(Transform), getObjectComponentsInEntity(entity));
    });
  }
}