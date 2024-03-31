import { AssetManager } from "@client/assets";
import { AbstractMesh, Scene, Skeleton, Vector3 } from "@babylonjs/core";
import { Camera } from "./camera";

/**
 * Store the model and skeleton of the user and control
 * its movement.
 */
export class Avatar {
  private camera: Camera;
  private pos: Vector3;
  private vel: Vector3;

  private body: AbstractMesh;
  private head: AbstractMesh;
  private armature: Skeleton;

  /**
   * Factory function to asynchronously create Avatar
   */
  static async create(assetManager: AssetManager, scene: Scene, canvas: HTMLCanvasElement): Promise<Avatar> {
    const assets = await assetManager.meshManager.getAvatar();

    return new Avatar(assets, scene, canvas);
  }

  /**
   * Create a new Avatar. Can only be called via the static async factory function.
   */
  private constructor(assets: any, scene: Scene, canvas: HTMLCanvasElement) {
    this.camera = new Camera(scene, canvas);
    this.pos = Vector3.Zero();
    this.vel = Vector3.Zero();

    this.body = assets[0][0];
    this.head = assets[0][1];
    this.armature = assets[1];
  }

  dispose() {
    this.camera.dispose();
    this.body.dispose();
    this.head.dispose();
    this.armature.dispose();
  }
}
