// Code from https://www.babylonjs-playground.com/#3EDS3A#22

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
const WALK_SPEED = 8;
const LATERAL_ACCELERATION = 10;

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
    const canvas = this.view.getCanvas();

    const capsule = Babylon.MeshBuilder.CreateCapsule("playerCapsule", {
      radius: 0.5,
      height: 2
    }, this.scene);
    capsule.position = player.getPosition();

    const camera = new Babylon.UniversalCamera(
      "playerCamera",
      player.getPosition(),
      this.scene);
    camera.attachControl(canvas, false);
    camera.minZ = 0;
    
    const input = {
      forward: false,
      back: false,
      left: false,
      right: false,
      jump: false
    };

    this.scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case Babylon.KeyboardEventTypes.KEYDOWN: {
          switch (kbInfo.event.key) {
            case 'w':
            case 'W': {
              input.forward = true;
              break;
            }
            case 'a':
            case 'A': {
              input.left = true;
              break;
            }
            case 's':
            case 'S': {
              input.back = true;
              break;
            }
            case 'd':
            case 'D': {
              input.right = true;
              break;
            }
            case ' ': {
              input.jump = true;
              break;
            }
          }
          break;
        }
        case Babylon.KeyboardEventTypes.KEYUP: {
          switch (kbInfo.event.key) {
            case 'w':
            case 'W': {
              input.forward = false;
              break;
            }
            case 'a':
            case 'A': {
              input.left = false;
              break;
            }
            case 's':
            case 'S': {
              input.back = false;
              break;
            }
            case 'd':
            case 'D': {
              input.right = false;
              break;
            }
            case ' ': {
              input.jump = false;
              break;
            }
          }
          break;
        }
      }
    });

    let velX = 0;
    let velZ = 0;

    this.scene.registerBeforeRender(() => {

      const fps = this.engine.getFps();
  
      // Calculate gravity
      const oldVelY = player.getVelocity().y;
      const gravityAccel = GRAVITY / fps;
      let newVelY = oldVelY + gravityAccel;
      if (newVelY < -MAX_FALL_SPEED) {
        newVelY = -MAX_FALL_SPEED;
      }
  
      // Change velocity based on player inputs
      const lateral = LATERAL_ACCELERATION / fps;
      let targetVelX = 0;
      let targetVelZ = 0;
      if (input.forward && !input.back) { velZ += lateral; }
      else if (input.back && !input.forward) { velZ -= lateral; }
      else {
        if (velZ < 0) {
          velZ += lateral;
          if (velZ > 0) { velZ = 0; }
        }
        else {
          velZ -= lateral;
          if (velZ < 0) { velZ = 0; }
        }
      }
      if (input.left && !input.right) { velX -= lateral; }
      else if (input.right && !input.left) { velX += lateral; }
      else {
        if (velX < 0) {
          velX += lateral;
          if (velX > 0) { velX = 0; }
        }
        else {
          velX -= lateral;
          if (velX < 0) { velX = 0; }
        }
      }

      if (velX < -1) { velX = -1; }
      if (velX > 1)  { velX =  1; }
      if (velZ < -1) { velZ = -1; }
      if (velZ > 1)  { velZ =  1; }

      let newVel = new Vector3(velX, 0, velZ).multiplyByFloats(WALK_SPEED, 0, WALK_SPEED);
      newVel = new Vector3(newVel.x, newVelY, newVel.z);

      // Rotate velocity based on camera rotation
      const viewAngleY = camera.rotation.y;
      const rotationAxis = Babylon.Matrix.RotationAxis(Babylon.Axis.Y, viewAngleY);
      const rotatedVel = Babylon.Vector3.TransformCoordinates(newVel, rotationAxis);

      player.setVelocity(rotatedVel);
  
      const movement = player.getVelocity().divide(new Vector3(fps, fps, fps));
      capsule.moveWithCollisions(movement);
      camera.position = capsule.position;
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

    // Window resize listener
    window.addEventListener("resize", () => {
      engine.resize();
    });

    // Add pointer lock
    this.scene.onPointerDown = (event) => {
      engine.enterPointerlock();
    }
  }
}
