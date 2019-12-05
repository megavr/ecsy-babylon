import { System } from "ecsy";
import { Transform } from "../components/index";
import { updateObjectsTransform, getObjectComponentsInEntity } from "../utils/index";
/** System for Transform component */
export class TransformSystem extends System {
    /** @hidden */
    init() {
        window.addEventListener("load", () => {
            this.queries.object.results.forEach((entity) => {
                entity.getComponent(Transform).updateObjects && updateObjectsTransform(entity.getComponent(Transform), getObjectComponentsInEntity(entity));
            });
        });
    }
    /** @hidden */
    execute() {
        this.queries.object.changed.forEach((entity) => {
            entity.getComponent(Transform).updateObjects && updateObjectsTransform(entity.getComponent(Transform), getObjectComponentsInEntity(entity));
        });
    }
}
/** @hidden */
TransformSystem.queries = {
    object: { components: [Transform], listen: { changed: [Transform] } },
};
