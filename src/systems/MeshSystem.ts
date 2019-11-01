import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Mesh } from "../components/index";
import { getActiveScene, disposeObject } from "../utils/index";

export class MeshSystem extends System {
  static queries = {
    mesh: { components: [Mesh], listen: { added: true, removed: true } },
  };

  queries: any;

  execute() {
    this.queries.mesh.added.forEach((entity: Entity) => {
      let mesh = entity.getComponent(Mesh) as Mesh;
      mesh.object = (BABYLON.MeshBuilder as any)[`Create${mesh.type}`].call(null, mesh.type, mesh.options, getActiveScene(this, mesh.sceneName));
    });
    this.queries.mesh.removed.forEach((entity: Entity) => {
      let mesh = entity.getComponent(Mesh) as Mesh;
      disposeObject(mesh);
    });
  }
}