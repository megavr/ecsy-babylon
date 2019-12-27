import { Entity } from "ecsy";
import { SceneComponent } from "./types/index";
export declare enum InputTypes {
    Keyboard = "Keyboard"
}
/**
 * @example Keyboard
 * ```
 * entity.addComponent(Input, { onKey: onKey });
 * function onKey(key, down, up) {
 *   if (down) console.log(key + " is pressing.");
 * }
 * ```
 */
export declare class Input implements SceneComponent {
    scene?: Entity;
    /** @default "Keyboard" */
    type?: InputTypes;
    /**
     * Return key value when detect keydown or keyup behaviuor.
     * @memberof Keyboard
     */
    onKey?: Input.KeyDownUpInput;
}
declare namespace Input {
    interface KeyDownUpInput {
        (key: string, down: boolean, up: boolean): void;
    }
}
export {};
