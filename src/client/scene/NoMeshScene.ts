import * as Babylon from "babylonjs";

import { MeshGeneratorChunk } from "../chunk/Chunk";
import { IScene } from "./IScene";
import { IView } from "../view/View";
import { IWorld } from "../world/World";

// A NoMeshScene is NOT responsible for generating meshes.

export class NoMeshScene implements IScene {
  private scene : Babylon.Scene | undefined;

  init(
      view: IView,
      firstPerson = false,
      startPosition = new Babylon.Vector3(0, 0, 0),
      debugMode = false
      ): void
  {
    const canvas = view.getCanvas();
    const engine = new Babylon.Engine(canvas, true);

    // Set up scene
    const scene = new Babylon.Scene(engine);
    scene.gravity = new Babylon.Vector3(0, -0.5, 0);
    scene.collisionsEnabled = true;
    scene.enablePhysics();
    if (debugMode) {
      scene.debugLayer.show();
    }
    this.scene = scene;

    const fpsElement = view.getFpsElement();
    engine.runRenderLoop(function () {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
    
    window.addEventListener("resize", function () {
      engine.resize();
    });

    // Set up camera
    const camera = new Babylon.UniversalCamera("camera1", new Babylon.Vector3(0, 0, 0), scene);
    camera.position = startPosition;
    if (firstPerson) {
      camera.ellipsoid = new Babylon.Vector3(.5, 1, .5);
      camera.applyGravity = true;
      camera.needMoveForGravity = true;
      camera.checkCollisions = true;
      camera.speed = 0.3;
    }
    camera.attachControl(canvas, true);

    // Add WASD
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
  
    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(-1, 1, 0), scene);
    light.intensity = 0.7;
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
}
