import { AssetManager } from "@client/assets";
import { Avatar } from "./avatar";

/**
 * A single user. Handles everything related to this user,
 * including the avatar, inventory, movement, etc.
 */
export class Player {

  /**
   * Factory function to create player asynchronously
   */
  static async create(assetManager: AssetManager): Promise<Player> {
    const avatar = await Avatar.create(assetManager);
    return new Player(avatar);
  }

  /**
   * Player constructor - must be called from factory function
   */
  private constructor(private avatar: Avatar) {

  }
}