import { Entity, System } from "ecsy";
import { Transform } from "../components/index";
import { updateTransform } from "../utils/index";

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
        this._updateTransform(entity.getComponent(Transform), entity.getComponents());
      });
    });
  }
  /** @hidden */
  execute() {
    this.queries.object.changed.forEach((entity: Entity) => {
      this._updateTransform(entity.getComponent(Transform), entity.getComponents());
    });
  }

  private _updateTransform(transform: Transform, components: Object) {
    Object.keys(components)
      .filter(name => { return (components as any)[name].object !== undefined; })
      .forEach(name => updateTransform(transform, (components as any)[name]));
  }
}