import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Mesh } from "../components/index";
import { getScene, disposeObject } from "../utils/index";

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
      let mesh = entity.getComponent(Mesh);
      mesh.object = (BABYLON.MeshBuilder as any)[`Create${mesh.type!}`].call(null, mesh.type!, mesh.options!, getScene(this, mesh.sceneName));
    });

    this.queries.mesh.removed.forEach((entity: Entity) => {
      disposeObject(entity.getComponent(Mesh));
    });
  }
}