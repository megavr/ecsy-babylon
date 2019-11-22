import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Mesh, MeshTypes } from "../components/index";
import { getActiveScene, disposeObject } from "../utils/index";
/** System for Mesh component */
export class MeshSystem extends System {
    /** @hidden */
    execute() {
        this.queries.mesh.added.forEach((entity) => {
            let mesh = entity.getComponent(Mesh);
            let type;
            mesh.type ? type = mesh.type : type = MeshTypes.Box;
            mesh.object = BABYLON.MeshBuilder[`Create${type}`].call(null, type, mesh.options ? mesh.options : {}, getActiveScene(this, mesh.sceneName));
        });
        this.queries.mesh.removed.forEach((entity) => {
            disposeObject(entity.getComponent(Mesh));
        });
    }
}
/** @hidden */
MeshSystem.queries = {
    mesh: { components: [Mesh], listen: { added: true, removed: true } },
};
