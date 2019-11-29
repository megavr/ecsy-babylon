import * as BABYLON from "@babylonjs/core";
import { System, Entity } from "ecsy";
import { Material, Mesh } from "../components/index";
import { getScene, disposeObject, updateTexture, hexToColor3 } from "../utils/index";

/** @hidden */
enum MaterialColorValues {
  diffuse = "diffuse",
  specular = "specular",
  emissive = "emissive",
  ambient = "ambient"
}

/** System for Material component */
export class MaterialSystem extends System {
  /** @hidden */
  static queries = {
    meshMaterial: { components: [Mesh, Material], listen: { added: true, removed: true, changed: [Material] } },
  };
  /** @hidden */
  queries: any;
  
  /** @hidden */
  execute() {
    this.queries.meshMaterial.added.forEach((entity: Entity) => {
      let material = entity.getComponent(Material);
      material.object = new BABYLON.StandardMaterial(material.diffuse!, getScene(this, material.sceneName));
      this._updateMaterial(material);
      entity.getComponent(Mesh).object.material = material.object;
    });

    this.queries.meshMaterial.changed.forEach((entity: Entity) => {
      this._updateMaterial(entity.getComponent(Material));
    });

    this.queries.meshMaterial.removed.forEach((entity: Entity) => {
      disposeObject(entity.getComponent(Material));
      entity.getComponent(Mesh).object.material = null;
    });
  }

  private _updateMaterial(material: Material) {
    let materialObject = material.object;
    Object.keys(material).forEach(name => {
      if ((MaterialColorValues as any)[name]) {
        (materialObject as any)[`${name}Color`] = hexToColor3((material as any)[name]);
      } else if (name === "texture") {
        material.texture && updateTexture(material, material.texture, this);
      } else {
        (materialObject as any)[name] = (material as any)[name];
      }
    });
  }
}