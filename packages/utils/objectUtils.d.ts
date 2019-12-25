import * as BABYLON from "@babylonjs/core";
import { Entity } from "ecsy";
import { Transform } from "../components/Transform";
import { ObjectComponent } from "../components/types/index";
/**
 * @hidden
 * Update value of Babylon.js object's property from a property in component with same name.
 * @param component Component contains Babylon.js object
 * @param name Name of property in the component
 */
export declare function updateObjectValue<T extends ObjectComponent<any>>(component: T, name: string): void;
/**
 * @hidden
 * Update Vector3 of Babylon.js object's property from property in component with same name.
 * @param component Component contains Babylon.js object
 * @param name Name of property in the component, value of property should matches XYZProperties
 */
export declare function updateObjectVector3<T extends ObjectComponent<any>>(component: T, name: string): void;
/**
 * @hidden
 * Get ObjectComponents in an Entity.
 * @param entity Entity to filter ObjectComponents
 */
export declare function getObjectComponents(entity: Entity): Array<ObjectComponent<BABYLON.Node>>;
/**
 * @hidden
 * Update transformation of ObjectComponents in entity.
 * @param entity Entity to be updated
 */
export declare function updateObjectsTransform(entity: Entity): void;
/**
 * @hidden
 * Update transformation to an ObjectComponent.
 * @param transform Transfrom component in the entity
 * @param component A component has Babylon.js object
 */
export declare function updateObjectTransform(transform: Transform, component: ObjectComponent<any>): void;
/**
 * @hidden
 * Dispose Babylon.js object in the component.
 * @param object Component contains Babylon.js object
 */
export declare function disposeObject(component: ObjectComponent<BABYLON.Node | BABYLON.Material | BABYLON.ParticleSystem | BABYLON.VRExperienceHelper>): void;
