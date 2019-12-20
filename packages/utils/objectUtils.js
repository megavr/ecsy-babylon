import { Transform } from "../components/Transform";
import { xyzToVector3, xyzToVector3Radians } from "./index";
/**
 * Update value of Babylon.js object's property from a property in component with same name.
 * @param component Component contains Babylon.js object
 * @param name Name of property in the component
 */
/** @hidden */
export function updateObjectValue(component, name) {
    component.object[name] = component[name];
}
/**
 * Update Vector3 of Babylon.js object's property from property in component with same name.
 * @param component Component contains Babylon.js object
 * @param name Name of property in the component, value of property should matches XYZProperties
 */
/** @hidden */
export function updateObjectVector3(component, name) {
    component.object[name] = xyzToVector3(component[name]);
}
/**
 * Get ObjectComponents in an Entity.
 * @param entity Entity to filter ObjectComponents
 * @returns Array of ObjectComponents
 */
/** @hidden */
export function getObjectComponents(entity) {
    let components = entity.getComponents();
    let objectComponents = [];
    for (let prop in components) {
        let component = components[prop];
        component.object && objectComponents.push(component);
    }
    return objectComponents;
}
/**
 * Update transformation of ObjectComponents in entity.
 * @param entity Entity to be updated
 */
/** @hidden */
export function updateObjectsTransform(entity) {
    let components = entity.getComponents();
    for (let prop in components) {
        let component = components[prop];
        (component.object && entity.hasComponent(Transform)) && updateObjectTransform(entity.getMutableComponent(Transform), component);
    }
}
/**
 * Update transformation to an ObjectComponent.
 * @param transform Transfrom component in the entity
 * @param component A component has Babylon.js object
 */
/** @hidden */
export function updateObjectTransform(transform, component) {
    let object = component.object;
    object.position && (object.position = xyzToVector3(transform.position));
    object.rotation && (object.rotation = xyzToVector3Radians(transform.rotation));
    object.scaling && (object.scaling = xyzToVector3(transform.scale));
}
/**
 * Dispose Babylon.js object in the component.
 * @param object Component contains Babylon.js object
 */
/** @hidden */
export function disposeObject(component) {
    component.object && component.object.dispose();
}
