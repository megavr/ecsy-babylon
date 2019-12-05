import * as BABYLON from "@babylonjs/core";
export declare enum InputTypes {
    Keyboard = "Keyboard",
    VrRight = "VrRight",
    VrLeft = "VrLeft"
}
/**
 * @example VR
 * ```
 * entity.addComponent(Input, { type: InputTypes.VrLeft, onPad: onPad, onPadValues: onPadValues });
 * function onPad(pressed, touched, value) {
 *   if (pressed) console.log("Pad is pressed.");
 *   if (touched) console.log("Pad is touched.");
 * }
 * function onPadValues(x, y) {
 *   console.log("Pad is touched on: " + x + ", " + y);
 * }
 * ```
 * @example Keyboard
 * ```
 * entity.addComponent(Input, { type: InputTypes.Keyboard, onKey: onKey });
 * function onKey(key, down, up) {
 *   if (down) console.log(key + " is pressing.");
 * }
 * ```
 */
export declare class Input {
    object: BABYLON.WebVRController;
    /** @default "VrRight" */
    type?: InputTypes;
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#onmainbuttonstatechangedobservable
     * @memberof VrRight, VrLeft
     */
    onMainButton?: Input.PressTouchValueInput;
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#onpadstatechangedobservable
     * @memberof VrRight, VrLeft
     */
    onPad?: Input.PressTouchValueInput;
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#onpadvalueschangedobservable
     * @memberof VrRight, VrLeft
     */
    onPadValues?: Input.ValueInput;
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#onsecondarybuttonstatechangedobservable
     * @memberof VrRight, VrLeft
     */
    onSecondaryButton?: Input.PressTouchValueInput;
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#ontriggerstatechangedobservable
     * @memberof VrRight, VrLeft
     */
    onTrigger?: Input.PressTouchValueInput;
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
    interface PressTouchValueInput {
        (pressed: boolean, touched: boolean, value: number): void;
    }
    interface ValueInput {
        (x: number, y: number): void;
    }
}
export {};
