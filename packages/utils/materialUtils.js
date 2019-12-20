import { disposeObject } from "./objectUtils";
/**
 * Update texture object to a component for its texture properties.
 * @param component TextureComponent in the entity
 * @param textureProperties Texture properties to be update
 * @param assetManager AssetManager to process textures
 */
/** @hidden */
export function updateTexture(component, textureProperties, assetManager) {
    for (let prop in textureProperties) {
        let textureAttributes = textureProperties[prop];
        let task = assetManager.addTextureTask(prop, textureAttributes.url);
        task.onSuccess = (task) => {
            let textureObject = task.texture;
            for (let attr in textureAttributes) {
                attr !== "url" && (textureObject[attr] = textureAttributes[attr]);
            }
            let textureName = `${prop}Texture`;
            let componentObject = component.object;
            componentObject[textureName] && disposeObject(componentObject[textureName]);
            componentObject[textureName] = textureObject;
        };
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
export function materialColorHex(diffuse) {
    if (diffuse) {
        return { diffuse: diffuse };
    }
    else {
        return { diffuse: "#ffffff" };
    }
}
