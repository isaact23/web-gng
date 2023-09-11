// Code from https://www.babylonjs-playground.com/#3EDS3A#22

import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

import { GUI } from "@client/gui";
import { ClusterClient, IClusterClient } from "@client/cluster-client";
import { IGame } from ".";
import { IView } from "@client/view";

import { AssetManager, IAssetManager } from "@client/assets";
import { PlayerMotor, IPlayerMotor } from "@client/movement";

// TODO: REMOVE THIS IMPORT
import { ClusterGenerator } from "@server/game-server/cluster-gen";

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
  private cluster: IClusterClient;
  private motor: IPlayerMotor;
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
    const clusterData = new ClusterGenerator().createSineCluster();
    this.cluster = new ClusterClient(clusterData, this.shadowGenerator, this.assetManager);
    this.cluster.remesh();

    // Create local player motor
    this.motor = new PlayerMotor(
      view.getCanvas(), this.engine, this.scene, this.cluster, this.assetManager, new Vector3(20, 20, 20));

    this.gui = new GUI();
    //this.gui.mainMenuGui();
    this.gui.gameGui();

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
