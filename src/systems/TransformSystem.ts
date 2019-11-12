import { Entity, System } from "ecsy";
import { Transform } from "../components/index";
import { updateTransform } from "../utils/index";

export class TransformSystem extends System {
  static queries = {
    object: { components: [Transform], listen: { changed: [Transform] } },
  };

  queries: any;

  init() {
    window.addEventListener("load", () => {
      this.queries.object.results.forEach((entity: Entity) => {
        this._updateTransform(entity.getComponent(Transform), entity.getComponents());
      });
    });
  }

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