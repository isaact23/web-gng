// Code from https://www.babylonjs-playground.com/#3EDS3A#22

import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

import { BasicView } from "../view/BasicView";
import { IChunk } from "../chunk/Chunk";
import { ICluster, BasicCluster } from "../cluster/Cluster";
import { IGame } from "./Game";
import { IView } from "../view/View";
import { IPlayer } from "../player/Player";

const GRAVITY = -25;
const MAX_FALL_SPEED = 20;
const WALK_SPEED = 8;
const LATERAL_ACCELERATION = 50;
const JUMP_VELOCITY = 6;

// Run all game logic.
export class BasicGame implements IGame {

  // Overhead
  private engine: Babylon.Engine;
  private scene: Babylon.Scene;

  // Lighting
  private sun: Babylon.DirectionalLight;
  private hemisphericLight: Babylon.HemisphericLight;
  private shadowGenerator: Babylon.ShadowGenerator | null;

  // Game elements
  private view: IView;
  private localPlayer: IPlayer;
  private cluster: ICluster;

  constructor(
    view: IView,
    localPlayer: IPlayer,
    cluster: ICluster | null,
    doShadows = false,
    debugMode = false
  )
  {
    this.view = view;
    this.localPlayer = localPlayer;
    this.engine = new Babylon.Engine(view.getCanvas());
    if (cluster == null) {
      this.cluster = new BasicCluster();
    } else {
      this.cluster = cluster;
    }

    // Set up the scene
    this.scene = this._initScene(debugMode);
    this._addLocalPlayer(localPlayer);
    this._addEventListeners();

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
      Vector3.Zero(),
      this.scene);
    camera.angularSensibility = 500;
    camera.inertia = 0;
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
    let grounded = false;

    this.scene.registerBeforeRender(() => {

      // Check if player is on the ground
      const ray = new Babylon.Ray(
        capsule.position.subtract(new Vector3(0, 1.01, 0)),
        Vector3.Down(),
        0.02);
      const hit = this.scene.pickWithRay(ray);
      if (hit == null) { grounded = false; }
      else { grounded = hit.hit; }

      const fps = this.engine.getFps();
  
      // Calculate gravity
      let newVelY = 0;
      if (!grounded) {
        const oldVelY = player.getVelocity().y;
        const gravityAccel = GRAVITY / fps;
        newVelY = oldVelY + gravityAccel;
        if (newVelY < -MAX_FALL_SPEED) {
          newVelY = -MAX_FALL_SPEED;
        }
      }

      // Jump
      if (input.jump && grounded) {
        grounded = false;
        newVelY = JUMP_VELOCITY;
      }
  
      // Calculate target velocity
      let targetVelX = 0;
      let targetVelZ = 0;
      let isMoving = false;
      if (input.forward && !input.back) { targetVelZ = 1; isMoving = true; }
      if (input.back && !input.forward) { targetVelZ = -1; isMoving = true; }
      if (input.left && !input.right) { targetVelX = -1; isMoving = true; }
      if (input.right && !input.left) { targetVelX = 1; isMoving = true; }
      let targetVel;
      if (isMoving) {
        targetVel = new Vector3(targetVelX, 0, targetVelZ).normalize().multiplyByFloats(WALK_SPEED, 0, WALK_SPEED);
      } else {
        targetVel = Vector3.Zero();
      }

      // Move player velocity toward target velocity
      const lateral = LATERAL_ACCELERATION / fps;
      if (velX < targetVel.x) {
        velX += lateral;
        if (velX > targetVel.x) {
          velX = targetVel.x;
        }
      }
      else if (velX > targetVel.x) {
        velX -= lateral;
        if (velX < targetVel.x) {
          velX = targetVel.x;
        }
      }
      if (velZ < targetVel.z) {
        velZ += lateral;
        if (velZ > targetVel.z) {
          velZ = targetVel.z;
        }
      }
      else if (velZ > targetVel.z) {
        velZ -= lateral;
        if (velZ < targetVel.z) {
          velZ = targetVel.z;
        }
      }

      let newVel = new Vector3(velX, 0, velZ);
      newVel = new Vector3(newVel.x, newVelY, newVel.z);

      // Rotate velocity based on camera rotation
      const viewAngleY = camera.rotation.y;
      const rotationAxis = Babylon.Matrix.RotationAxis(Babylon.Axis.Y, viewAngleY);
      const rotatedVel = Babylon.Vector3.TransformCoordinates(newVel, rotationAxis);

      player.setVelocity(rotatedVel);
  
      const movement = player.getVelocity().divide(new Vector3(fps, fps, fps));
      capsule.moveWithCollisions(movement);
      camera.position = capsule.position.add(new Vector3(0, 0.5, 0));
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
