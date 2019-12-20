import * as BABYLON from "@babylonjs/core";
import { TextureComponent, TextureAttributes, MaterialColorProperties } from "../components/types/index";
import { disposeObject } from "./objectUtils";

/**
 * Update texture object to a component for its texture properties.
 * @param component TextureComponent in the entity
 * @param textureProperties Texture properties to be update
 * @param assetManager AssetManager to process textures
 */
/** @hidden */
export function updateTexture<T>(component: TextureComponent<T>, textureProperties: T, assetManager: BABYLON.AssetsManager): void {
  for (let prop in textureProperties) {
    let textureAttributes = (textureProperties as any)[prop] as TextureAttributes;
    let task = assetManager.addTextureTask(prop, textureAttributes.url);
    task.onSuccess = (task) => {
      let textureObject = (task as BABYLON.TextureAssetTask).texture;
      for (let attr in textureAttributes) { attr !== "url" && ((textureObject as any)[attr] = (textureAttributes as any)[attr]); }
      let textureName = `${prop}Texture`;
      let componentObject = component.object;
      componentObject[textureName] && disposeObject(componentObject[textureName]);
      componentObject[textureName] = textureObject;
    }
  }
  assetManager.load();
  assetManager.reset();
}

/**
 * Create object of material color values or create a material color object with white diffuse.
 * @param diffuse Diffuse color in hex string. e.g., #123ABC
 * @returns Object matches MaterialColorProperties
 */
/** @hidden */
export function materialColorHex(diffuse?: string): MaterialColorProperties {
  if (diffuse) {
    return { diffuse: diffuse };
  } else {
    return { diffuse: "#ffffff" };
  }
}