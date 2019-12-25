import { System } from "ecsy";
import { getScene } from "../utils/gameUtils";
import { Input, InputTypes } from "../components/index";
/** System for Input component */
export class InputSystem extends System {
    /** @hidden */
    execute() {
        this.queries.input.added.forEach((entity) => {
            let input = entity.getComponent(Input);
            switch (input.type) {
                case InputTypes.Keyboard:
                    if (input.onKey) {
                        // BABYLON.KeyboardEventTypes.KEYDOWN = 1, BABYLON.KeyboardEventTypes.KEYUP = 2 
                        getScene(this, input.sceneName).onKeyboardObservable.add(keyInfo => input.onKey.call(input, keyInfo.event.key, keyInfo.type === 1, keyInfo.type === 2));
                    }
                    break;
            }
        });
        this.queries.input.removed.forEach((entity) => {
            let input = entity.getComponent(Input);
            switch (input.type) {
                case InputTypes.Keyboard:
                    getScene(this, input.sceneName).onKeyboardObservable.clear();
                    break;
            }
        });
    }
}
/** @hidden */
InputSystem.queries = {
    input: { components: [Input], listen: { added: true, removed: true } },
};
