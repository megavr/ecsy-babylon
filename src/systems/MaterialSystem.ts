import * as BABYLON from "@babylonjs/core";
import { System, Entity } from "ecsy";
import { Material, Mesh } from "../components/index";
import { getActiveScene, disposeObject } from "../utils/index";

enum ColorValues { diffuse, specular, emissive, ambient }

export class MaterialSystem extends System {
  static queries = {
    meshMaterial: { components: [Mesh, Material], listen: { added: true, removed: true, changed: [Material] } },
  };

  queries: any;

  execute() {
    this.queries.meshMaterial.added.forEach((entity: Entity) => {
      let material = entity.getComponent(Material) as Material;
      material.object = new BABYLON.StandardMaterial(material.diffuse, getActiveScene(this, material.sceneName));
      this._updateMaterial(material);
      entity.getComponent(Mesh).object.material = material.object;
    });

    this.queries.meshMaterial.changed.forEach((entity: Entity) => {
      this._updateMaterial(entity.getComponent(Material));
    });

    this.queries.meshMaterial.removed.forEach((entity: Entity) => {
      let material = entity.getComponent(Material) as Material;
      disposeObject(material);
      entity.getComponent(Mesh).object.material = null;
    });
  }

  private _updateMaterial(material: Material) {
    Object.keys(material).forEach(name => {
      (ColorValues as any)[name] !== undefined ?
        (material.object as any)[`${name}Color`] = BABYLON.Color3.FromHexString((material as any)[name]) :
        (material.object as any)[name] = (material as any)[name];
    });
  }
}