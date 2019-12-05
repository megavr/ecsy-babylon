import * as BABYLON from "@babylonjs/core";
import { System, Entity } from "ecsy";
import { Material, Mesh } from "../components/index";
import { getScene, disposeObject, updateTexture, hexToColor3, updateObjectValue, getAssetManager } from "../utils/index";
import { MaterialColorProperties } from "../components/types";

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
      material.object = new BABYLON.StandardMaterial(material.color!.diffuse!, getScene(this, material.sceneName));
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
    for (let prop in material) {
      switch (prop) {
        case "color":
          this._updateColor(material, material.color!);
          break;
        case "texture":
          updateTexture(material, material.texture, getAssetManager(this, material.sceneName));
          break;
        default:
          updateObjectValue(material, prop);
          break;
      }
    }
  }

  private _updateColor(material: Material, color: MaterialColorProperties) {
    for (let prop in color) {
      ((material.object as any)[`${prop}Color`] = hexToColor3((color as any)[prop]));
    }
  }
}