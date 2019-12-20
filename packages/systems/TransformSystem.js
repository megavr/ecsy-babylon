import { System } from "ecsy";
import { Transform } from "../components/index";
import { updateObjectsTransform } from "../utils/objectUtils";
/** System for Transform component */
export class TransformSystem extends System {
    /** @hidden */
    execute() {
        this.queries.transforms.changed.forEach((entity) => {
            entity.getComponent(Transform).updateObjects && updateObjectsTransform(entity);
        });
    }
}
/** @hidden */
TransformSystem.queries = {
    transforms: { components: [Transform], listen: { added: true, changed: [Transform] } },
};
