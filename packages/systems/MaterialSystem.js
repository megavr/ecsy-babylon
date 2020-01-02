import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Material, Mesh, MeshTypes } from "../components/index";
import { getScene, getAssetManager } from "../utils/gameUtils";
import { updateObjectValue, disposeObject } from "../utils/objectUtils";
import { updateTexture, hexToColor3 } from "../utils/materialUtils";
/** System for Material component */
export class MaterialSystem extends System {
    /** @hidden */
    execute() {
        this.queries.meshMaterial.added.forEach((entity) => {
            if (!this._isUrlMesh(entity)) {
                let material = entity.getComponent(Material);
                material.object = new BABYLON.StandardMaterial(material.color.diffuse, getScene(this, material.scene));
                this._updateMaterial(material);
                let mesh = entity.getComponent(Mesh);
                mesh.object.material = material.object;
            }
        });
        this.queries.meshMaterial.changed.forEach((entity) => {
            this._isUrlMesh(entity) || this._updateMaterial(entity.getComponent(Material));
        });
        this.queries.meshMaterial.removed.forEach((entity) => {
            if (!this._isUrlMesh(entity)) {
                disposeObject(entity.getComponent(Material));
                entity.getComponent(Mesh).object.material = null;
            }
        });
    }
    _isUrlMesh(entity) {
        return entity.getComponent(Mesh).type === MeshTypes.Url;
    }
    _updateMaterial(material) {
        for (let prop in material) {
            switch (prop) {
                case "color":
                    this._updateColor(material, material.color);
                    break;
                case "texture":
                    updateTexture(material, material.texture, getAssetManager(this, material.scene));
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
