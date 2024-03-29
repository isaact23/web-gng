import { AssetManager } from "@client/assets";
import { Player } from "./player";
import * as Babylon from "babylonjs";

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
  async spawnPlayer(assetManager: AssetManager, scene: Babylon.Scene, canvas: HTMLCanvasElement) {
    this.player = await Player.create(assetManager, scene, canvas);
  }

  /**
   * Remove the player, the in-game component of this user.
   */
  removePlayer(): void {
    this.player?.dispose();
    this.player = null;
  }
}