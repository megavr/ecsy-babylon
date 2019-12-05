import { SceneComponent } from "./SceneComponent";
import { ObjectComponent } from "./ObjectComponent";
/** Interface defined texture of a component, which will also have sceneName and object property. */
export interface TextureComponent<T> extends SceneComponent, ObjectComponent<any> {
    /** Texture properties to be manipulated. */
    texture?: T;
}
