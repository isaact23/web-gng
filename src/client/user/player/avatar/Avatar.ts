import * as Babylon from "@babylonjs/core";
import { AbstractMesh, Scene, Skeleton, UniversalCamera, Vector3 } from "@babylonjs/core";
import { InputHandler } from "./input-handler";
import { Game } from "@client/game";
import { UserActionProcessor } from "@client/action";
import { RemoveBlockAction } from "@share/action/block/RemoveBlockAction";
import { Block, FaceVectorConverter } from "@share/utility";
import { AddBlockAction } from "@share/action/block/AddBlockAction";
import { BlockTargeter } from "./block-targeter";
import { LAYER_MASK_PLAYER } from "@share/static/Layers";

const NOCLIP = true;

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

  // Avatar's physical status
  private pos: Vector3;
  private vel: Vector3;
  private grounded = false;

  // Avatar mesh & armature
  private root: AbstractMesh;
  private body: AbstractMesh;
  private head: AbstractMesh;
  private armature: Skeleton;

  private camera: UniversalCamera;
  private targeter: BlockTargeter;

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

    // Get assets
    this.ap = game.getUserAP();
    this.scene = game.getScene();
    this.engine = game.getEngine();
    const canvas = game.getView().getCanvas();

    // Load meshes
    this.body = assets[0][0];
    this.head = assets[0][1];
    this.armature = assets[1];

    // Collision capsule
    this.root = Babylon.MeshBuilder.CreateCapsule("playerCapsule", {
      radius: 0.4,
      height: 1.8
    }, this.scene);
    //this.capsule.position = Vector3.Zero();
    this.root.isPickable = false;
    this.root.isVisible = false;

    // Set up avatar parent hierarchy
    this.body.setParent(this.root);
    this.head.setParent(this.body);

    this.root.position = new Vector3(20, 30, 20);
    this.body.position = new Vector3(0, -0.9, 0);

    this.pos = Vector3.Zero();
    this.vel = Vector3.Zero();

    this.scene.registerBeforeRender(() => {this.update()});

    // Initialize camera
    this.camera = new Babylon.UniversalCamera(
      "playerCamera",
      new Vector3(0, 1.8, 0),
      this.scene);
    this.camera.rotation = new Vector3(0.5, 0, 0);
    this.camera.angularSensibility = 500;
    this.camera.inertia = 0;
    this.camera.attachControl(canvas, false);
    this.camera.minZ = 0;
    this.camera.layerMask = 0x1;

    // Init misc. subsystems
    this.targeter = new BlockTargeter(this.camera, this.scene);
    this.inputHandler = new InputHandler(this, this.scene);
  }

  /**
   * On callback from InputHandler, break the targeted block.
   */
  public handleLeftClick() {

    // Find block
    let target = this.targeter.getTarget();
    if (target != null) {

      // Break block
      const action = new RemoveBlockAction(target[0]);
      this.ap.update(action);
    }
  }

  /**
   * On callback from InputHandler, place a block.
   */
  public handleRightClick() {

    // Find block
    let target = this.targeter.getTarget();
    if (target != null) {

      // Place block
      const offset = FaceVectorConverter.getVectorFromFace(target[1]);
      const coord = target[0].addScalars(offset.x, offset.y, offset.z);
      const action = new AddBlockAction(coord, Block.Stone);
      this.ap.update(action);
    }
  }

  /**
   * On callback from InputHandler, look around.
   */
  public handlePointerMove() {

  }

  /**
   * Loop run on every render frame.
   */
  private update() {

    const fps = this.engine.getFps();
    const input = this.inputHandler.getInput();

    this.checkGrounded();

    if (!NOCLIP) {

      // Calculate gravity
      let newVelY = 0;
      if (!this.grounded) {
        const oldVelY = this.vel.y;
        const gravityAccel = GRAVITY / fps;
        newVelY = oldVelY + gravityAccel;
        if (newVelY < -MAX_FALL_SPEED) {
          newVelY = -MAX_FALL_SPEED;
        }
      }

      // Jump
      if (input.jump && this.grounded) {
        this.grounded = false;
        newVelY = JUMP_VELOCITY;
      }
      this.vel.y = newVelY;

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
    if (NOCLIP) {
      if (input.jump && !input.shift) { targetVelY = 1; isMoving = true; }
      if (input.shift && !input.jump) { targetVelY = -1; isMoving = true; }
    }

    let targetVel: Vector3;
    let targetSpeed = NOCLIP ? NOCLIP_SPEED : WALK_SPEED;

    if (isMoving) {
      targetVel = new Vector3(targetVelX, targetVelY, targetVelZ)
        .normalize()
        .multiplyByFloats(targetSpeed, targetSpeed, targetSpeed);
    } else {
      targetVel = Vector3.Zero();
    }

    // Move player velocity toward target velocity
    const lateral = NOCLIP ? NOCLIP_ACCELERATION / fps : LATERAL_ACCELERATION / fps;
    if (this.vel.x < targetVel.x) {
      this.vel.x = Math.min(targetVel.x, this.vel.x + lateral);
    }
    else if (this.vel.x > targetVel.x) {
      this.vel.x = Math.max(targetVel.x, this.vel.x - lateral);
    }
    if (this.vel.z < targetVel.z) {
      this.vel.z = Math.min(targetVel.z, this.vel.z + lateral);
    }
    else if (this.vel.z > targetVel.z) {
      this.vel.z = Math.max(targetVel.z, this.vel.z - lateral);
    }
    if (NOCLIP) {
      if (this.vel.y < targetVel.y) {
        this.vel.y = Math.min(targetVel.y, this.vel.y + lateral);
      }
      else if (this.vel.y > targetVel.y) {
        this.vel.y = Math.max(targetVel.y, this.vel.y - lateral);
      }
    }

    // Rotate velocity based on camera rotation
    const viewAngleY = this.camera.rotation.y;
    const rotationAxis = Babylon.Matrix.RotationAxis(Babylon.Axis.Y, viewAngleY);
    const rotatedVel = Babylon.Vector3.TransformCoordinates(this.vel, rotationAxis);

    const movement = rotatedVel.divide(new Vector3(fps, fps, fps));
    const newPos = this.root.position.add(movement);

    //this.root.moveWithCollisions(movement);
    this.root.position = newPos;

    // Highlight the block the player is looking at
    this.targeter.highlightBlock();
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
    this.root.dispose();
    this.body.dispose();
    this.head.dispose();
    this.armature.dispose();
    this.camera.dispose();
  }
}
