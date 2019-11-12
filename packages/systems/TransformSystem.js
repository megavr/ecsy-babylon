import { System } from "ecsy";
import { Transform } from "../components/index";
import { updateTransform } from "../utils/index";
export class TransformSystem extends System {
    init() {
        window.addEventListener("load", () => {
            this.queries.object.results.forEach((entity) => {
                this._updateTransform(entity.getComponent(Transform), entity.getComponents());
            });
        });
    }
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
TransformSystem.queries = {
    object: { components: [Transform], listen: { changed: [Transform] } },
};
