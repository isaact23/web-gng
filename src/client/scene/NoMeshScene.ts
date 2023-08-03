import * as Babylon from "babylonjs";

import { MeshGeneratorChunk } from "../chunk/Chunk";
import { IScene } from "./IScene";
import { IView } from "../view/IView";

// A NoMeshScene is NOT responsible for generating meshes.

export class NoMeshScene implements IScene {
  private scene : Babylon.Scene | undefined;

  init(view: IView) : void {
    const canvas = view.getCanvas();
    const engine = new Babylon.Engine(canvas, true);

    const scene = new Babylon.Scene(engine);
    scene.gravity = new Babylon.Vector3(0, -1, 0);
    scene.collisionsEnabled = true;
    scene.enablePhysics();
    scene.debugLayer.show();
    this.scene = scene;

    const fpsElement = view.getFpsElement();
    engine.runRenderLoop(function () {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
    
    window.addEventListener("resize", function () {
      engine.resize();
    });

    const camera = new Babylon.UniversalCamera("camera1", new Babylon.Vector3(0, 0, 0), scene);
    camera.position = new Babylon.Vector3(16, 4, 16);
    camera.applyGravity = true;
    camera.ellipsoid = new Babylon.Vector3(1, 2, 1);
    camera.checkCollisions = true;
    camera.attachControl(canvas, true);
  
    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(-1, 1, 0), scene);
    light.intensity = 0.7;
  }

  loadChunk(chunk: MeshGeneratorChunk) : void {

    const mesh = chunk.generateMesh();
    this.scene?.addMesh(mesh);
  }
}
