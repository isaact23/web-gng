import { Avatar } from "./avatar";
import { Game } from "@client/game";

/**
 * The in-game representation of a user. Handles everything ingame
 * related to the user, including the avatar, inventory, movement, etc.
 * The user may exist but the player does not if no world is loaded.
 */
export class Player {

  /**
   * Factory function to create player asynchronously
   */
  static async create(game: Game): Promise<Player> {

    const avatar = await Avatar.create(game);
    return new Player(avatar);
  }

  /**
   * Player constructor - must be called from factory function
   */
  private constructor(private avatar: Avatar) {}

  /**
   * Remove Player assets from the world.
   */
  public dispose() {
    this.avatar?.dispose();
  }
}