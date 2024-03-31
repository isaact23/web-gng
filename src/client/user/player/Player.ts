import { AssetManager } from "@client/assets";
import { Avatar } from "./avatar";
import { Scene } from "@babylonjs/core";

/**
 * The in-game representation of a user. Handles everything ingame
 * related to the user, including the avatar, inventory, movement, etc.
 * The user may exist but the player does not if no world is loaded.
 */
export class Player {

  /**
   * Factory function to create player asynchronously
   */
  static async create(assetManager: AssetManager, scene: Scene, canvas: HTMLCanvasElement): Promise<Player> {

    const avatar = await Avatar.create(assetManager, scene, canvas);
    return new Player(avatar);
  }

  /**
   * Player constructor - must be called from factory function
   */
  private constructor(private avatar: Avatar) {

  }

  dispose() {
    this.avatar?.dispose();
  }
}