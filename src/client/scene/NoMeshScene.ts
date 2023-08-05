import * as Babylon from "babylonjs";

import { MeshGeneratorChunk } from "../chunk/Chunk";
import { IScene } from "./IScene";
import { IView } from "../view/View";
import { IWorld } from "../world/World";

// A NoMeshScene is NOT responsible for generating meshes.

export class NoMeshScene implements IScene {
  private canvas: HTMLCanvasElement | undefined;
  private engine: Babylon.Engine | undefined;
  private scene: Babylon.Scene | undefined;

  // Initialize the scene completely.
  init(
      view: IView,
      firstPerson = false,
      startPosition = new Babylon.Vector3(0, 0, 0),
      debugMode = false
      ): void
  {
    this.canvas = view.getCanvas();
    this.engine = new Babylon.Engine(this.canvas, true);
    
    // Set up the scene
    this._initScene(debugMode);
    if (this.scene === undefined) throw "Failed to initialize this.scene";
    this._addCamera(firstPerson, startPosition);
    this._addLight();
    this._addEventListeners();

    // Run engine render loop
    const engine = this.engine;
    const fpsElement = view.getFpsElement();
    const scene = this.scene;
    this.engine.runRenderLoop(function () {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
  }

  // Load geometry for a chunk
  loadChunk(chunk: MeshGeneratorChunk): void {
    const mesh = chunk.generateMesh();
    this.scene?.addMesh(mesh);
  }

  // Load geometry for a world
  loadWorld(world: IWorld): void {
    const meshes = world.generateMeshes();
    for (let mesh of meshes) {
      this.scene?.addMesh(mesh);
    }
  }

  // Initialize the Babylon scene before adding objects.
  _initScene(debugMode: boolean = false) {
    if (this.engine === undefined) throw "Cannot initialize scene because this.engine is undefined";
    
    // Set up scene
    const scene = new Babylon.Scene(this.engine);
    scene.gravity = new Babylon.Vector3(0, -0.5, 0);
    scene.collisionsEnabled = true;
    scene.enablePhysics();
    if (debugMode) {
      scene.debugLayer.show();
    }
    this.scene = scene;
  }

  // Add a camera to the scene.
  _addCamera(firstPerson: boolean, startPosition: Babylon.Vector3) {

    // Set up camera
    const camera = new Babylon.UniversalCamera("camera1", new Babylon.Vector3(0, 0, 0), this.scene);
    camera.position = startPosition;
    if (firstPerson) {
      camera.ellipsoid = new Babylon.Vector3(.5, 1, .5);
      camera.applyGravity = true;
      camera.needMoveForGravity = true;
      camera.checkCollisions = true;
      camera.speed = 0.3;
    }
    camera.attachControl(this.canvas, true);

    // Add WASD
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
  }

  // Add a light to the scene.
  _addLight() {
    if (this.scene === undefined) throw "Cannot add light because this.scene is undefined";
    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(-1, 1, 0), this.scene);
    light.intensity = 0.7;
  }

  // Add event listeners to the window.
  _addEventListeners() {
    const engine = this.engine;
    if (engine === undefined) throw "Cannot add event listeners before engine is initialized";

    window.addEventListener("resize", function () {
      engine.resize();
    });
  }
}
