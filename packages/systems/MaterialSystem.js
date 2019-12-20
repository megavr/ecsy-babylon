import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Material, Mesh } from "../components/index";
import { hexToColor3 } from "../utils/index";
import { getScene, getAssetManager } from "../utils/gameUtils";
import { updateObjectValue, disposeObject } from "../utils/objectUtils";
import { updateTexture } from "../utils/materialUtils";
/** System for Material component */
export class MaterialSystem extends System {
    /** @hidden */
    execute() {
        this.queries.meshMaterial.added.forEach((entity) => {
            let material = entity.getComponent(Material);
            material.object = new BABYLON.StandardMaterial(material.color.diffuse, getScene(this, material.sceneName));
            this._updateMaterial(material);
            entity.getComponent(Mesh).object.material = material.object;
        });
        this.queries.meshMaterial.changed.forEach((entity) => {
            this._updateMaterial(entity.getComponent(Material));
        });
        this.queries.meshMaterial.removed.forEach((entity) => {
            disposeObject(entity.getComponent(Material));
            entity.getComponent(Mesh).object.material = null;
        });
    }
    _updateMaterial(material) {
        for (let prop in material) {
            switch (prop) {
                case "color":
                    this._updateColor(material, material.color);
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
    _updateColor(material, color) {
        for (let prop in color) {
            (material.object[`${prop}Color`] = hexToColor3(color[prop]));
        }
    }
}
/** @hidden */
MaterialSystem.queries = {
    meshMaterial: { components: [Mesh, Material], listen: { added: true, removed: true, changed: [Material] } },
};
