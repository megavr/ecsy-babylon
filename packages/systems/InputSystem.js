import { System } from "ecsy";
import { Input } from "../components/index";
import { getScene, getScenes, getSystem } from "../utils/gameUtils";
import { GameSystem } from "./GameSystem";
/** System for Input component */
export class InputSystem extends System {
    constructor() {
        super(...arguments);
        this._inputs = new Map();
    }
    init() {
        getSystem(this, GameSystem).onSceneSwitched.add(scene => this._updateOnKey(scene));
        this._onKey = this._onKey.bind(this);
    }
    /** @hidden */
    execute() {
        this.queries.input.added.forEach((entity) => {
            let input = entity.getComponent(Input);
            let scene = getScene(this, input.scene);
            switch (input.type) {
                default:
                    if (!this._inputs.has(scene.uid)) {
                        this._inputs.set(scene.uid, input);
                        this._updateOnKey(scene);
                    }
                    break;
            }
        });
        this.queries.input.removed.forEach((entity) => {
            let input = entity.getComponent(Input);
            let scene = getScene(this, input.scene);
            switch (input.type) {
                default:
                    if (this._inputs.has(scene.uid)) {
                        this._inputs.delete(scene.uid);
                        this._removeOnKey(scene);
                    }
                    break;
            }
        });
    }
    _updateOnKey(targetScene) {
        if (targetScene.uid === getScene(this).uid) {
            getScenes(this).forEach(scene => this._removeOnKey(scene));
            this._input = this._inputs.get(targetScene.uid);
            this._input.onKey && targetScene.onKeyboardObservable.add(this._onKey);
        }
    }
    _removeOnKey(scene) {
        scene.onKeyboardObservable.removeCallback(this._onKey);
    }
    _onKey(keyInfo) {
        // BABYLON.KeyboardEventTypes.KEYDOWN = 1, BABYLON.KeyboardEventTypes.KEYUP = 2
        this._input.onKey.call(this._input, keyInfo.event.key, keyInfo.type === 1, keyInfo.type === 2);
    }
}
/** @hidden */
InputSystem.queries = {
    input: { components: [Input], listen: { added: true, removed: true } },
};
