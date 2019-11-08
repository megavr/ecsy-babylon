import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent, XYZProperties } from "./types/index";
export declare enum LightTypes {
    Point = "Point",
    Directional = "Directional",
    Spot = "Spot",
    Hemispheric = "Hemispheric"
}
export declare class Light implements SceneComponent, ObjectComponent {
    sceneName?: string;
    object: BABYLON.HemisphericLight | BABYLON.ShadowLight;
    type: LightTypes;
    direction: XYZProperties;
    intensity?: number;
    radius?: number;
    range?: number;
    specular?: string;
    angle?: number;
    exponent?: number;
}
