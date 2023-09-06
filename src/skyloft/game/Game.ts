// Code from https://www.babylonjs-playground.com/#3EDS3A#22

import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

import { GUI } from "../gui/GUI";
import { IClusterData } from "@server/cluster/cluster-data";
import { IGame } from ".";
import { IView } from "../view";

import { IAssetManager } from "../../client/assets/IAssetManager";
import { AssetManager } from "../../client/assets/AssetManager";
import { ClusterGenerator } from "@server/cluster/cluster-gen";
import { LocalPlayerMotor } from "../movement/LocalPlayerMotor";

/**
 * The runner class for all game logic.
 */
export class Game implements IGame {

  // Overhead
  private engine: Babylon.Engine;
  private scene: Babylon.Scene;

  // Lighting
  private sun: Babylon.DirectionalLight;
  private hemisphericLight: Babylon.HemisphericLight;
  private shadowGenerator: Babylon.ShadowGenerator | null = null;

  // Game elements
  private view: IView;
  private cluster: ICluster;
  private motor: LocalPlayerMotor;
  private gui: GUI;
  private assetManager: IAssetManager | null = null;

  /**
   * Create a new Game.
   * @param view The view to use for the game.
   * @param debugMode Show Babylon debug GUI.
   */
  constructor(
    view: IView,
    debugMode = false
  )
  {
    this.view = view;
    this.engine = new Babylon.Engine(view.getCanvas());

    // Set up the scene
    this.scene = this._initScene(debugMode);
    this._addEventListeners();

    // Set up lighting
    this.sun = new Babylon.DirectionalLight("sun", new Vector3(-1, -1, -1), this.scene);
    this.sun.intensity = 1.2;
    this.sun.position = new Vector3(100, 100, 100);
    this.hemisphericLight = new Babylon.HemisphericLight("ambience", new Vector3(-1, 1, -1), this.scene);
    this.hemisphericLight.intensity = 0.3;

    // Init asset manager
    this.assetManager = new AssetManager(this.scene);

    // Init shadow generator
    this.shadowGenerator = new Babylon.ShadowGenerator(1024, this.sun);
    this.shadowGenerator.usePoissonSampling = true;

    // Create world cluster
    this.cluster = ClusterGenerator.createSineCluster(this.shadowGenerator, this.assetManager);
    this.cluster.remesh();

    // Create local player motor
    this.motor = new LocalPlayerMotor(
      view.getCanvas(), this.engine, this.scene, this.cluster, this.assetManager, new Vector3(20, 20, 20));

    this.gui = new GUI();

    // Run engine render loop
    const fpsElement = view.getFpsElement();
    const scene = this.scene;
    const engine = this.engine;
    this.engine.runRenderLoop(() => {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
  }

  /**
   * Initialize the Babylon scene before adding objects.
   */
  _initScene(debugMode: boolean = false): Babylon.Scene {

    // Set up scene
    const scene = new Babylon.Scene(this.engine);
    if (debugMode) {
      scene.debugLayer.show();
    }

    scene.clearColor = new Babylon.Color4(0.5, 0.6, 0.7, 1);

    return scene;
  }

  /**
   * Add event listeners.
   */ 
  _addEventListeners() {
    const engine = this.engine;

    // Window resize listener
    window.addEventListener("resize", () => {
      engine.resize();
    });

    this.scene.onPointerDown = event => {
      this.engine.enterPointerlock();
    };
  }
}
