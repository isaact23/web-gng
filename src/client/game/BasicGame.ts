// Code from https://www.babylonjs-playground.com/#3EDS3A#22

import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

import { BasicGUI } from "../gui/BasicGUI";
import { IChunk } from "../chunk/Chunk";
import { ICluster, BasicCluster } from "../cluster/Cluster";
import { IGame } from "./Game";
import { IView } from "../view/View";

import { addLocalPlayer } from "../movement/BasicMovement";

// Run all game logic.
export class BasicGame implements IGame {

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

  constructor(
    view: IView,
    cluster: ICluster | null = null,
    doShadows = false,
    debugMode = false
  )
  {
    this.view = view;
    this.engine = new Babylon.Engine(view.getCanvas());
    if (cluster == null) {
      this.cluster = new BasicCluster();
    } else {
      this.cluster = cluster;
    }

    // Set up the scene
    this.scene = this._initScene(debugMode);
    this._addEventListeners();

    addLocalPlayer(view.getCanvas(), this.engine, this.scene, new Vector3(20, 20, 20), false);

    const ui = new BasicGUI();

    // Set up lighting
    this.sun = new Babylon.DirectionalLight("sun", new Vector3(-1, -1, -1), this.scene);
    this.sun.intensity = 1.2;
    this.sun.position = new Vector3(100, 100, 100);
    this.hemisphericLight = new Babylon.HemisphericLight("ambience", new Vector3(-1, 1, -1), this.scene);
    this.hemisphericLight.intensity = 0.3;

    if (doShadows) {
      this.shadowGenerator = new Babylon.ShadowGenerator(1024, this.sun);
      this.shadowGenerator.usePoissonSampling = true;
    }

    // Run engine render loop
    const fpsElement = view.getFpsElement();
    const scene = this.scene;
    const engine = this.engine;
    this.engine.runRenderLoop(() => {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
  }

  // Load geometry for a chunk
  loadChunk(chunk: IChunk): void {
    const mesh = chunk.generateMesh();
    this.shadowGenerator?.getShadowMap()?.renderList?.push(mesh);
    this.scene?.addMesh(mesh);
  }

  // Load geometry for a cluster
  loadCluster(cluster: ICluster): void {
    const meshes = cluster.generateMeshes();
    const shadowMap = this.shadowGenerator?.getShadowMap();
    for (let mesh of meshes) {
      shadowMap?.renderList?.push(mesh);
      this.scene?.addMesh(mesh);
    }
  }

  // Initialize the Babylon scene before adding objects.
  _initScene(debugMode: boolean = false): Babylon.Scene {

    // Set up scene
    const scene = new Babylon.Scene(this.engine);
    //scene.gravity = new Vector3(0, -0.05, 0);
    scene.collisionsEnabled = true;
    scene.enablePhysics();
    if (debugMode) {
      scene.debugLayer.show();
    }

    scene.clearColor = new Babylon.Color4(0.5, 0.6, 0.7, 1);

    return scene;
  }

  // Add event listeners.
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
