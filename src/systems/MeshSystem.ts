import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Mesh, MeshTypes } from "../components/index";
import { getActiveScene, disposeObject } from "../utils/index";

/** System for Mesh component */
export class MeshSystem extends System {
  /** @hidden */
  static queries = {
    mesh: { components: [Mesh], listen: { added: true, removed: true } },
  };
  /** @hidden */
  queries: any;

  /** @hidden */
  execute() {
    this.queries.mesh.added.forEach((entity: Entity) => {
      let mesh = entity.getComponent(Mesh) as Mesh;
      let type: MeshTypes;
      mesh.type ? type = mesh.type : type = MeshTypes.Box;
      mesh.object = (BABYLON.MeshBuilder as any)[`Create${type}`].call(null, type, mesh.options ? mesh.options : {}, getActiveScene(this, mesh.sceneName));
    });

    this.queries.mesh.removed.forEach((entity: Entity) => {
      disposeObject(entity.getComponent(Mesh));
    });
  }
}