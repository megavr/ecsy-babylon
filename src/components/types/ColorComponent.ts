import { SceneComponent } from "./SceneComponent";
import { ObjectComponent } from "./ObjectComponent";

/** Interface defined color of a component, which will also have sceneName and object property. */
export interface ColorComponent<T> extends SceneComponent, ObjectComponent<any> {
  color?: T;
}