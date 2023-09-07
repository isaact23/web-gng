import { IClusterData } from "@share/cluster-data";
import { IGameServer } from ".";
import { ClusterGenerator } from "@server/cluster-gen";

/**
 * Handler for server-side game logic.
 */
export class GameServer implements IGameServer {
  private cluster: IClusterData;

  /**
   * Initialize the game server.
   */
  constructor() {
    this.cluster = ClusterGenerator.createSineCluster();
  }
}
