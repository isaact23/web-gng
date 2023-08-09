import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

import { BasicView } from "../view/BasicView";
import { IChunk } from "../chunk/Chunk";
import { IGame } from "./Game";
import { IView } from "../view/View";
import { ICluster } from "../cluster/Cluster";
import { IPlayer } from "../player/Player";

const GRAVITY = -9.81;
const MAX_FALL_SPEED = 20;
const WALK_SPEED = 3;

// Run all game logic.
export class BasicGame implements IGame {

  private engine: Babylon.Engine;
  private scene: Babylon.Scene;

  constructor(
    private view: IView,
    private localPlayer: IPlayer,
    debugMode = false
  )
  {
    this.engine = new Babylon.Engine(view.getCanvas());

    // Set up the scene
    this.scene = this._initScene(debugMode);
    this._addLocalPlayer(localPlayer);
    this._addLight();
    this._addEventListeners();

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
  _addLocalPlayer(player: IPlayer): void {
    const capsule = Babylon.MeshBuilder.CreateCapsule("playerCapsule", {
      radius: 0.5,
      height: 2
    }, this.scene);
    capsule.position = player.getPosition();

    const camera = new Babylon.UniversalCamera(
      "playerCamera",
      player.getPosition().add(new Vector3(0, 0, -20)),
      this.scene);

    this.scene.registerBeforeRender(() => {
      const fps = this.engine.getFps();

      const oldVel = player.getVelocity();
      const velDelta = new Vector3(0, GRAVITY / fps, 0);
      let newVel = oldVel.add(velDelta);
      if (newVel.y < -MAX_FALL_SPEED) {
        newVel = new Vector3(0, -MAX_FALL_SPEED, 0);
      }
      player.setVelocity(newVel);

      const movement = player.getVelocity().divide(new Vector3(fps, fps, fps));
      capsule.moveWithCollisions(movement);

      console.log(player.getVelocity().y);
    });
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

    return scene;
  }

  // Add a light to the scene.
  _addLight() {
    const light = new Babylon.HemisphericLight("light", new Vector3(-1, 1, 0), this.scene);
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
