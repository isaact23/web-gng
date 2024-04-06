import * as Babylon from "@babylonjs/core";
import { AbstractMesh, Scene, Skeleton, Vector3 } from "@babylonjs/core";
import { Camera } from "./camera";
import { InputHandler } from "./input-handler";
import { Game } from "@client/game";
import { UserActionProcessor } from "@client/action";
import { RemoveBlockAction } from "@share/action/block/RemoveBlockAction";
import { Block, FaceVectorConverter } from "@share/utility";
import { AddBlockAction } from "@share/action/block/AddBlockAction";

const GRAVITY = -25;
const MAX_FALL_SPEED = 50;
const WALK_SPEED = 7;
const NOCLIP_SPEED = 30;
const LATERAL_ACCELERATION = 50;
const NOCLIP_ACCELERATION = 200;
const JUMP_VELOCITY = 6;

/**
 * Store the model and skeleton of the user and control
 * its movement.
 */
export class Avatar {

  private ap: UserActionProcessor;
  private inputHandler: InputHandler;
  private scene: Scene;
  private engine: Babylon.Engine;

  private camera: Camera;

  // Avatar's physical status
  private pos: Vector3;
  private vel: Vector3;
  private grounded = false;

  // Avatar mesh & armature
  private body: AbstractMesh;
  private head: AbstractMesh;
  private armature: Skeleton;

  /**
   * Factory function to asynchronously create Avatar
   */
  static async create(game: Game): Promise<Avatar> {
    const assets = await game.getAssetManager().meshManager.getAvatar();

    return new Avatar(game, assets);
  }

  /**
   * Create a new Avatar. Can only be called via the static async factory function.
   */
  private constructor(
    game: Game,
    assets: any,
  ) {

    this.ap = game.getUserAP();
    this.scene = game.getScene();
    this.engine = game.getEngine();
    const canvas = game.getView().getCanvas();

    this.inputHandler = new InputHandler(this.handleLeftClick, this.handleRightClick, this.scene);
    this.camera = new Camera(this.scene, canvas);

    this.body = assets[0][0];
    this.head = assets[0][1];
    this.armature = assets[1];

    this.body.position = new Vector3(0, 40, 0);
    this.head.position = new Vector3(0, 40, 0);

    this.pos = Vector3.Zero();
    this.vel = Vector3.Zero();

    this.scene.registerBeforeRender(() => this.update);
  }

  /**
   * On callback from InputHandler, break the targeted block.
   */
  private handleLeftClick() {

    // Find block
    let target = this.camera.getTarget();
    if (target != null) {

      // Break block
      const action = new RemoveBlockAction(target[0]);
      this.ap.update(action);
    }
  }

  /**
   * On callback from InputHandler, place a block.
   */
  private handleRightClick() {

    // Find block
    let target = this.camera.getTarget();
    if (target != null) {

      // Place block
      const offset = FaceVectorConverter.getVectorFromFace(target[1]);
      const coord = target[0].addScalars(offset.x, offset.y, offset.z);
      const action = new AddBlockAction(coord, Block.Stone);
      this.ap.update(action);
    }
  }

  /**
   * Loop run on every render frame.
   */
  private update() {

    const fps = this.engine.getFps();

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
  }

  private checkGrounded() {
    // Check if player is on the ground
    const ray = new Babylon.Ray(
      this.pos.add(new Vector3(0, 0.01, 0)),
      Vector3.Down(),
      0.02);
    const hit = this.scene.pickWithRay(ray);
    this.grounded = (hit !== null);

  }

  /**
   * Remove Avatar assets from the game.
   */
  public dispose() {
    this.camera.dispose();
    this.body.dispose();
    this.head.dispose();
    this.armature.dispose();
  }
}
