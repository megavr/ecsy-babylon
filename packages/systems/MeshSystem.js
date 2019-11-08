import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Mesh } from "../components/index";
import { getActiveScene, disposeObject } from "../utils/index";
export class MeshSystem extends System {
    execute() {
        this.queries.mesh.added.forEach((entity) => {
            let mesh = entity.getComponent(Mesh);
            mesh.object = BABYLON.MeshBuilder[`Create${mesh.type}`].call(null, mesh.type, mesh.options, getActiveScene(this, mesh.sceneName));
        });
        this.queries.mesh.removed.forEach((entity) => {
            disposeObject(entity.getComponent(Mesh));
        });
    }
}
MeshSystem.queries = {
    mesh: { components: [Mesh], listen: { added: true, removed: true } },
};
