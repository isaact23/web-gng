import { Player } from "./player";

/**
 * The user currently associated with this session. An
 * instance of a user corresponds to an account.
 */
export class User {

  private player: Player | null = null;

  /**
   * Create the player, the in-game component of this user. The
   * player should only exist if the world is loaded.
   */
  spawnPlayer(): void {

  }

  /**
   * Remove the player, the in-game component of this user.
   */
  removePlayer(): void {

  }
}