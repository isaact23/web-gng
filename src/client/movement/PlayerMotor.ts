import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";
import { BlockTargeter } from "./block-targeter/BlockTargeter";
import { IAssetManager } from "../assets/IAssetManager";
import { Block } from "@share/utility/Block";
import { IPlayerMotor } from "./IPlayerMotor";
import { IBlockTargeter } from "./block-targeter/IBlockTargeter";
import { FaceVectorConverter } from "@share/utility";
import { IClusterClient } from "@client/cluster";

const GRAVITY = -25;
const MAX_FALL_SPEED = 50;
const WALK_SPEED = 7;
const NOCLIP_SPEED = 30;
const LATERAL_ACCELERATION = 50;
const NOCLIP_ACCELERATION = 200;
const JUMP_VELOCITY = 6;

/**
 * Control the local player movement.
 */
export class PlayerMotor implements IPlayerMotor {

  private blockTargeter: IBlockTargeter;

  // Add a local player controller to the game.
  constructor(

    canvas: HTMLCanvasElement,
    engine: Babylon.Engine,
    scene: Babylon.Scene,
    cluster: IClusterClient,
    position: Vector3 | null = null,
    noclip: boolean = false
  ) {

    let playerPos = Vector3.Zero();
    let playerVel = Vector3.Zero();
    if (position != null) {
      playerPos = position;
    }

    const capsule = Babylon.MeshBuilder.CreateCapsule("playerCapsule", {
      radius: 0.5,
      height: 1.8
    }, scene);
    capsule.position = playerPos;
    capsule.isPickable = false;

    const camera = new Babylon.UniversalCamera(
      "playerCamera",
      Vector3.Zero(),
      scene);
    camera.rotation = new Vector3(0.5, 0, 0);
    camera.angularSensibility = 500;
    camera.inertia = 0;
    camera.attachControl(canvas, false);
    camera.minZ = 0;

    this.blockTargeter = new BlockTargeter(camera, scene);
    
    const input = {
      forward: false,
      back: false,
      left: false,
      right: false,
      jump: false,
      shift: false
    };

    let grounded = false;

    // Handle mouse clicks
    scene.onPointerObservable.add(pointerInfo => {
      if (pointerInfo.type === Babylon.PointerEventTypes.POINTERDOWN) {
        // Destroy blocks on left click
        if (pointerInfo.event.inputIndex === Babylon.PointerInput.LeftClick) {
          let target = this.blockTargeter.getTargetBlockAndFace();
          if (target != null) {
            cluster.setBlock(target[0], Block.Air);
            cluster.remesh();
          }
        }

        // Place blocks on right click
        else if (pointerInfo.event.inputIndex === Babylon.PointerInput.RightClick) {
          let target = this.blockTargeter.getTargetBlockAndFace();
          if (target != null) {
            const offset = FaceVectorConverter.getVectorFromFace(target[1]);
            const coord = target[0].addScalars(offset.x, offset.y, offset.z);
            cluster.setBlock(coord, Block.Stone);
            cluster.remesh();
          }
        }
      }
    });


    // Handle keyboard input
    scene.onKeyboardObservable.add(kbInfo => {
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
            case 'Shift': {
              input.shift = true;
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
            case 'Shift': {
              input.shift = false;
              break;
            }
          }
          break;
        }
      }
    });

    // Main loop
    scene.registerBeforeRender(() => {

      // Check if player is on the ground
      const ray = new Babylon.Ray(
        capsule.position.subtract(new Vector3(0, 1.01, 0)),
        Vector3.Down(),
        0.02);
      const hit = scene.pickWithRay(ray);
      if (hit == null) { grounded = false; }
      else { grounded = hit.hit; }

      const fps = engine.getFps();

      if (!noclip) {

        // Calculate gravity
        let newVelY = 0;
        if (!grounded) {
          const oldVelY = playerVel.y;
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
        playerVel.y = newVelY;

      }

      // Calculate target velocity
      let targetVelX = 0;
      let targetVelY = 0;
      let targetVelZ = 0;
      let isMoving = false;

      if (input.forward && !input.back) { targetVelZ = 1; isMoving = true; }
      if (input.back && !input.forward) { targetVelZ = -1; isMoving = true; }
      if (input.left && !input.right) { targetVelX = -1; isMoving = true; }
      if (input.right && !input.left) { targetVelX = 1; isMoving = true; }
      if (noclip) {
        if (input.jump && !input.shift) { targetVelY = 1; isMoving = true; }
        if (input.shift && !input.jump) { targetVelY = -1; isMoving = true; }
      }

      let targetVel: Vector3;
      let targetSpeed = noclip ? NOCLIP_SPEED : WALK_SPEED;

      if (isMoving) {
        targetVel = new Vector3(targetVelX, targetVelY, targetVelZ)
          .normalize()
          .multiplyByFloats(targetSpeed, targetSpeed, targetSpeed);
      } else {
        targetVel = Vector3.Zero();
      }

      // Move player velocity toward target velocity
      const lateral = noclip ? NOCLIP_ACCELERATION / fps : LATERAL_ACCELERATION / fps;
      if (playerVel.x < targetVel.x) {
        playerVel.x += lateral;
        if (playerVel.x > targetVel.x) {
          playerVel.x = targetVel.x;
        }
      }
      else if (playerVel.x > targetVel.x) {
        playerVel.x -= lateral;
        if (playerVel.x < targetVel.x) {
          playerVel.x = targetVel.x;
        }
      }
      if (playerVel.z < targetVel.z) {
        playerVel.z += lateral;
        if (playerVel.z > targetVel.z) {
          playerVel.z = targetVel.z;
        }
      }
      else if (playerVel.z > targetVel.z) {
        playerVel.z -= lateral;
        if (playerVel.z < targetVel.z) {
          playerVel.z = targetVel.z;
        }
      }
      if (noclip) {
        if (playerVel.y < targetVel.y) {
          playerVel.y += lateral;
          if (playerVel.y > targetVel.y) {
            playerVel.y = targetVel.y;
          }
        }
        else if (playerVel.y > targetVel.y) {
          playerVel.y -= lateral;
          if (playerVel.y < targetVel.y) {
            playerVel.y = targetVel.y;
          }
        }
      }

      // Rotate velocity based on camera rotation
      const viewAngleY = camera.rotation.y;
      const rotationAxis = Babylon.Matrix.RotationAxis(Babylon.Axis.Y, viewAngleY);
      const rotatedVel = Babylon.Vector3.TransformCoordinates(playerVel, rotationAxis);

      const movement = rotatedVel.divide(new Vector3(fps, fps, fps));

      capsule.moveWithCollisions(movement);
      camera.position = capsule.position.add(new Vector3(0, 0.5, 0));

      // Highlight the block the player is looking at
      this.blockTargeter.highlightBlock();
    });
  }
}
