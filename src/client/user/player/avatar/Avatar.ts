import { AbstractMesh, Scene, Skeleton, Vector3 } from "@babylonjs/core";
import { Camera } from "./camera";
import { InputHandler } from "./input-handler";
import { Game } from "@client/game";

/**
 * Store the model and skeleton of the user and control
 * its movement.
 */
export class Avatar {
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

    return new Avatar(assets, game.getScene(), game.getView().getCanvas());
  }

  /**
   * Create a new Avatar. Can only be called via the static async factory function.
   */
  private constructor(assets: any, scene: Scene, canvas: HTMLCanvasElement) {
    this.inputHandler = new InputHandler(scene);

    this.body = assets[0][0];
    this.head = assets[0][1];
    this.armature = assets[1];

    this.body.position = new Vector3(0, 40, 0);
    this.head.position = new Vector3(0, 40, 0);

    this.pos = Vector3.Zero();
    this.vel = Vector3.Zero();
    this.camera = new Camera(scene, canvas);
  }

  dispose() {
    this.camera.dispose();
    this.body.dispose();
    this.head.dispose();
    this.armature.dispose();
  }
}
