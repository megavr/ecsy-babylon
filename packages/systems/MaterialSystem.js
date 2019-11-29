import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Material, Mesh } from "../components/index";
import { getScene, disposeObject, updateTexture, hexToColor3 } from "../utils/index";
/** @hidden */
var MaterialColorValues;
(function (MaterialColorValues) {
    MaterialColorValues["diffuse"] = "diffuse";
    MaterialColorValues["specular"] = "specular";
    MaterialColorValues["emissive"] = "emissive";
    MaterialColorValues["ambient"] = "ambient";
})(MaterialColorValues || (MaterialColorValues = {}));
/** System for Material component */
export class MaterialSystem extends System {
    /** @hidden */
    execute() {
        this.queries.meshMaterial.added.forEach((entity) => {
            let material = entity.getComponent(Material);
            material.object = new BABYLON.StandardMaterial(material.diffuse, getScene(this, material.sceneName));
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
        let materialObject = material.object;
        Object.keys(material).forEach(name => {
            if (MaterialColorValues[name]) {
                materialObject[`${name}Color`] = hexToColor3(material[name]);
            }
            else if (name === "texture") {
                material.texture && updateTexture(material, material.texture, this);
            }
            else {
                materialObject[name] = material[name];
            }
        });
    }
}
/** @hidden */
MaterialSystem.queries = {
    meshMaterial: { components: [Mesh, Material], listen: { added: true, removed: true, changed: [Material] } },
};
