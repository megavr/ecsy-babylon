import { System } from "ecsy";
import { Transform } from "../components/index";
import { updateTransform } from "../utils/index";
/** System for Transform component */
export class TransformSystem extends System {
    /** @hidden */
    init() {
        window.addEventListener("load", () => {
            this.queries.object.results.forEach((entity) => {
                this._updateTransform(entity.getComponent(Transform), entity.getComponents());
            });
        });
    }
    /** @hidden */
    execute() {
        this.queries.object.changed.forEach((entity) => {
            this._updateTransform(entity.getComponent(Transform), entity.getComponents());
        });
    }
    _updateTransform(transform, components) {
        Object.keys(components)
            .filter(name => { return components[name].object !== undefined; })
            .forEach(name => updateTransform(transform, components[name]));
    }
}
/** @hidden */
TransformSystem.queries = {
    object: { components: [Transform], listen: { changed: [Transform] } },
};
