import { AssetManager } from "@client/assets";
import { AbstractMesh, Skeleton, Vector3 } from "babylonjs";
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
  static async create(assetManager: AssetManager): Promise<Avatar> {
    const assets = await assetManager.meshManager.getAvatar();

    return new Avatar(assets);
  }

  /**
   * Create a new Avatar. Can only be called via the static async factory function.
   */
  private constructor(assets: any) {
    this.camera = new Camera();
    this.pos = Vector3.Zero();
    this.vel = Vector3.Zero();

    this.body = assets[0][0];
    this.head = assets[0][1];
    this.armature = assets[1];
  }
}