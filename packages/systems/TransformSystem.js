import { System } from "ecsy";
import { Transform } from "../components/index";
import { degreeToRadians, xyzToVector3 } from "../utils/index";
export class TransformSystem extends System {
    execute() {
        this.queries.object.results.forEach((entity) => {
            this._updateTransform(entity.getComponent(Transform), entity.getComponents());
        });
    }
    _updateTransform(transform, components) {
        Object.keys(components)
            .filter(name => { return components[name].object !== undefined; })
            .forEach(name => {
            let object = components[name].object;
            object.position && (object.position = xyzToVector3(transform.position));
            object.rotation && object.rotation.set(degreeToRadians(transform.rotation.x), degreeToRadians(transform.rotation.y), degreeToRadians(transform.rotation.z));
            object.scaling && (object.scaling = xyzToVector3(transform.scale));
        });
    }
}
TransformSystem.queries = {
    object: { components: [Transform] },
};
