import { AssetManager } from "@client/assets";
import { AbstractMesh, Skeleton } from "babylonjs";

/**
 * Store the model and skeleton of the user and control
 * its movement.
 */
export class Avatar {

  /**
   * Factory function to asynchronously create Avatar
   */
  static async create(assetManager: AssetManager): Promise<Avatar> {
    const assets = await assetManager.meshManager.getAvatar();

    const body = assets[0][0];
    const head = assets[0][1];
    const armature = assets[1];

    return new Avatar(body, head, armature);
  }

  /**
   * Create a new Avatar. Can only be called via the static async factory function.
   */
  private constructor(private body: AbstractMesh, private head: AbstractMesh, private armature: Skeleton) {

  }
}