import * as Babylon from "babylonjs";

import { BasicView } from "../view/BasicView";
import { IChunk } from "../chunk/Chunk";
import { IGame } from "./IGame";
import { IView } from "../view/View";
import { ICluster } from "../cluster/Cluster";

// Run all game logic.
export class BasicGame implements IGame {

  private engine: Babylon.Engine;
  private scene: Babylon.Scene;

  constructor(
    private view: IView = new BasicView(),
    private startPosition: Babylon.Vector3 = Babylon.Vector3.Zero(),
    debugMode = false
  )
  {
    this.engine = new Babylon.Engine(view.getCanvas());

    // Set up the scene
    this.scene = this._initScene(debugMode);
    this._addLocalPlayer(startPosition);
    this._addLight();
    this._addEventListeners();

    // Run engine render loop
    const fpsElement = view.getFpsElement();
    const scene = this.scene;
    const engine = this.engine;
    this.engine.runRenderLoop(function () {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
  }

  // Load geometry for a chunk
  loadChunk(chunk: IChunk): void {
    const mesh = chunk.generateMesh();
    this.scene?.addMesh(mesh);
  }

  // Load geometry for a cluster
  loadCluster(cluster: ICluster): void {
    const meshes = cluster.generateMeshes();
    for (let mesh of meshes) {
      this.scene?.addMesh(mesh);
    }
  }

  // Add a local player controller to the game.
  _addLocalPlayer(startPosition: Babylon.Vector3): void {
    const capsule = Babylon.MeshBuilder.CreateCapsule("playerCapsule", {
      radius: 0.5,
      height: 2
    }, this.scene);
    capsule.position = startPosition;

    const camera = new Babylon.UniversalCamera("playerCamera", startPosition.add(new Babylon.Vector3(0, 0, -20)), this.scene);
  }

  // Initialize the Babylon scene before adding objects.
  _initScene(debugMode: boolean = false): Babylon.Scene {

    // Set up scene
    const scene = new Babylon.Scene(this.engine);
    //scene.gravity = new Babylon.Vector3(0, -0.05, 0);
    scene.collisionsEnabled = true;
    scene.enablePhysics();
    if (debugMode) {
      scene.debugLayer.show();
    }

    return scene;
  }

  // Add a light to the scene.
  _addLight() {
    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(-1, 1, 0), this.scene);
    light.intensity = 0.7;
  }

  // Add event listeners.
  _addEventListeners() {
    const engine = this.engine;

    window.addEventListener("resize", () => {
      engine.resize();
    });
  }
}
