import { IClusterData } from "@share/data/cluster-data";
import { IGameServer } from ".";
import { ContinuousClusterGenerator } from "@server/cluster-gen";
import { ISocketOutgoing } from "@server/socket/socket-outgoing";

/**
 * Handler for server-side game logic.
 */
export class GameServer implements IGameServer {
  private cluster: IClusterData;

  /**
   * Initialize the game server.
   */
  constructor(private readonly socketOutgoing: ISocketOutgoing) {
    this.cluster = new ContinuousClusterGenerator().createWorldCluster();
  }

  /**
   * Get the current cluster data.
   * @returns IClusterData with the server's cluster data.
   */
  getCluster(): IClusterData {
    return this.cluster;
  }
}
