import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Scene } from "../components/index";
import { getWorld } from "../utils/worldUtils";
import { disposeObject, updateObjectValue } from "../utils/objectUtils";
import { updateTexture, hexToColor4, hexToColor3 } from "../utils/materialUtils";
/** Core system of ecsy-babylon. */
export class GameSystem extends System {
    constructor() {
        super(...arguments);
        /** <Scene UID, BABYLON.AssetsManager> */
        this._assetManagers = new Map();
        /** Observable event when active scene is switched. */
        this.onSceneSwitched = new BABYLON.Observable();
    }
    /** Get canvas used for rendering. */
    get renderingCanvas() { return this._engine.getRenderingCanvas(); }
    /** Get all scenes in engine. */
    get scenes() { return this._engine.scenes; }
    /** Get active scene. */
    get activeScene() { return this._activeScene; }
    /** @hidden */
    init() {
        this._render = this._render.bind(this);
    }
    /** @hidden */
    execute() {
        this.queries.scene.added.forEach((entity) => {
            let scene = entity.getComponent(Scene);
            scene.object = new BABYLON.Scene(this._engine, scene.options);
            this._engine.scenes.length === 1 && (this._activeScene = scene.object);
            this._updateScene(entity);
            // add assetManager for each scenes 
            let assetManager = new BABYLON.AssetsManager(scene.object);
            assetManager.useDefaultLoadingScreen = false;
            this._assetManagers.set(scene.object.uid, assetManager);
        });
        this.queries.scene.changed.forEach((entity) => {
            this._updateScene(entity);
        });
        this.queries.scene.removed.forEach((entity) => {
            let scene = entity.getComponent(Scene);
            disposeObject(scene);
        });
    }
    _updateScene(entity) {
        let scene = entity.getComponent(Scene);
        for (let prop in scene) {
            switch (prop) {
                case "texture":
                    updateTexture(scene, scene.texture, this.getAssetManager(entity));
                    break;
                case "color":
                    this._updateColor(scene, scene.color);
                    break;
                default:
                    updateObjectValue(scene, prop);
                    break;
            }
        }
    }
    _updateColor(scene, color) {
        for (let prop in color) {
            switch (prop) {
                case "clear":
                    scene.object[`${prop}Color`] = hexToColor4(color[prop]);
                    break;
                default:
                    scene.object[`${prop}Color`] = hexToColor3(color[prop]);
                    break;
            }
        }
    }
    /**
     * Start game system in the world can be used by other systems & components.
     * @see https://doc.babylonjs.com/api/classes/babylon.engine#constructor
     * @param canvas WebGL context to be used for rendering
     * @param antialias defines enable antialiasing (default: false)
     * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.engineoptions
     * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
     */
    start(canvas, antialias, options, adaptToDeviceRatio) {
        this._engine = new BABYLON.Engine(canvas, antialias, options, adaptToDeviceRatio);
        this._engine.runRenderLoop(this._render);
        return this;
    }
    /**
     * Switch to a scene by given scene entity.
     * @param scene Scene entity
     */
    switchScene(scene) {
        this._activeScene = scene.getComponent(Scene).object;
        this.onSceneSwitched.notifyObservers(this._activeScene);
        return this;
    }
    /**
     * Get scene AssetManager or return AssetManager in active scene.
     * @param scene Scene entity
     */
    getAssetManager(scene) {
        if (scene) {
            return this._assetManagers.get(scene.getComponent(Scene).object.uid);
        }
        else {
            return this._assetManagers.get(this._activeScene.uid);
        }
    }
    _render() {
        getWorld(this).execute(this._engine.getDeltaTime(), performance.now());
        getWorld(this).enabled && this._activeScene.render();
    }
}
/** @hidden */
GameSystem.queries = {
    scene: { components: [Scene], listen: { added: true, removed: true, changed: [Scene] } },
};
