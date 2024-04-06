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

  private camera: Camera;
  private pos: Vector3;
  private vel: Vector3;

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
    const scene = game.getScene();
    const canvas = game.getView().getCanvas();

    this.inputHandler = new InputHandler(this.handleLeftClick, this.handleRightClick, scene);

    this.body = assets[0][0];
    this.head = assets[0][1];
    this.armature = assets[1];

    this.body.position = new Vector3(0, 40, 0);
    this.head.position = new Vector3(0, 40, 0);

    this.pos = Vector3.Zero();
    this.vel = Vector3.Zero();
    this.camera = new Camera(scene, canvas);
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
   * Remove Avatar assets from the game.
   */
  public dispose() {
    this.camera.dispose();
    this.body.dispose();
    this.head.dispose();
    this.armature.dispose();
  }
}
