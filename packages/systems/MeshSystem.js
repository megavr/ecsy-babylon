import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Mesh } from "../components/index";
import { getScene, disposeObject, updateObjectValue } from "../utils/index";
/** System for Mesh component */
export class MeshSystem extends System {
    /** @hidden */
    execute() {
        this.queries.mesh.added.forEach((entity) => {
            let mesh = entity.getComponent(Mesh);
            mesh.object = BABYLON.MeshBuilder[`Create${mesh.type}`].call(this, mesh.type, mesh.options, getScene(this, mesh.sceneName));
        });
        this.queries.mesh.changed.forEach((entity) => {
            let mesh = entity.getMutableComponent(Mesh);
            for (let prop in mesh) {
                updateObjectValue(mesh, prop);
            }
        });
        this.queries.mesh.removed.forEach((entity) => {
            disposeObject(entity.getComponent(Mesh));
        });
    }
}
/** @hidden */
MeshSystem.queries = {
    mesh: { components: [Mesh], listen: { added: true, removed: true, changed: [Mesh] } },
};
