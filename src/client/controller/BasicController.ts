import * as Babylon from "babylonjs";

import { BasicView } from "../view/BasicView";
import { MeshGeneratorChunk } from "../chunk/Chunk";
import { IController } from "./IController";
import { IView } from "../view/View";
import { ICluster } from "../cluster/Cluster";
import { BasicFirstPersonController } from "./first-person-controller/BasicFirstPersonController";

// A Babylon controller uses data from the model to control the Babylon view.
export class BasicController implements IController {

  private engine: Babylon.Engine;
  private scene: Babylon.Scene;

  constructor(
    private view: IView = new BasicView(),
    startPosition: Babylon.Vector3 = Babylon.Vector3.Zero(),
    debugMode = false
  )
  {
    this.engine = new Babylon.Engine(view.getCanvas());

    // Set up the scene
    this.scene = this._initScene(debugMode);
    this._addFirstPersonController(startPosition);
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

  // Get the Babylon engine
  getEngine() {
    return this.engine;
  }

  // Get the Babylon scene
  getScene() {
    return this.scene;
  }

  // Load geometry for a chunk
  loadChunk(chunk: MeshGeneratorChunk): void {
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

  // Initialize the Babylon scene before adding objects.
  _initScene(debugMode: boolean = false): Babylon.Scene {

    // Set up scene
    const scene = new Babylon.Scene(this.engine);
    scene.gravity = new Babylon.Vector3(0, -0.5, 0);
    scene.collisionsEnabled = true;
    scene.enablePhysics();
    if (debugMode) {
      scene.debugLayer.show();
    }

    return scene;
  }

  // Add a first person controller to the game.
  _addFirstPersonController(startPosition: Babylon.Vector3) {
    const fpc = new BasicFirstPersonController(this.view, this, startPosition);
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

    `document.addEventListener("pointerlockchange", () => {
      if (document.pointerLockElement) {
        camera.detachControl();
      } else {
        camera.attachControl(true);
      }
    }, false);

    console.log(canvas);
    canvas.addEventListener("pointerdown", () => {
      canvas.requestPointerLock();
    });`
  }
}
