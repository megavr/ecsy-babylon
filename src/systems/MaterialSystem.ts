import * as BABYLON from "@babylonjs/core";
import { System, Entity } from "ecsy";
import { Material, Mesh } from "../components/index";
import { getActiveScene, disposeObject } from "../utils/index";
import { TextureComponent, TextureProperties } from "components/types/index";

enum ColorValues {
  diffuse = "diffuse",
  specular = "specular",
  emissive = "emissive",
  ambient = "ambient"
}

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
      disposeObject(entity.getComponent(Material));
      entity.getComponent(Mesh).object.material = null;
    });
  }

  private _updateMaterial(material: Material) {
    Object.keys(material).filter(name => name !== "texture").forEach(name => {
      (ColorValues as any)[name] !== undefined ?
        (material.object as any)[`${name}Color`] = BABYLON.Color3.FromHexString((material as any)[name]) :
        (material.object as any)[name] = (material as any)[name];
    });
    material.texture !== undefined && this._updateTexture(material, material.texture);
  }

  private _updateTexture(material: Material, textureComponent: TextureComponent) {
    Object.keys(textureComponent).forEach(name => {
      let texture = (textureComponent as any)[name] as TextureProperties;
      let textureObject = new BABYLON.Texture(texture.url, getActiveScene(this, material.sceneName));
      Object.keys(texture).filter(prop => prop !== "url").forEach(prop => {
        (textureObject as any)[prop] = (texture as any)[prop];
      });
      (material.object as any)[`${name}Texture`] !== null && disposeObject((material.object as any)[`${name}Texture`]);
      (material.object as any)[`${name}Texture`] = textureObject;
    });
  }
}