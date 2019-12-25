import { System } from "ecsy";
import { Transform } from "../components/index";
import { updateObjectsTransform } from "../utils/objectUtils";
/** System for Transform component */
export class TransformSystem extends System {
    /** @hidden */
    execute() {
        this.queries.transforms.changed.forEach((entity) => {
            updateObjectsTransform(entity);
        });
    }
}
/** @hidden */
TransformSystem.queries = {
    transforms: { components: [Transform], listen: { changed: [Transform] } },
};
