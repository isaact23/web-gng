import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { ContinuousClusterGenerator } from "@server/cluster-gen";
import { Socket } from "socket.io";
import { Server as IOServer } from 'socket.io';

/**
 * Handler for server-side game logic.
 */
export class GameServer {
  private cluster: IClusterData;

  /**
   * Initialize the game server.
   */
  constructor(
    private readonly io: IOServer
  ) {
    // Generate a cluster
    console.log("Generating world");
    this.cluster = ContinuousClusterGenerator.createWorldCluster();
    console.log("Done generating world");
  }

  /**
   * Get the current cluster data.
   * @returns IClusterData with the server's cluster data.
   */
  getCluster(): IClusterData {
    return this.cluster;
  }

  /**
   * Handle a user connection.
   * @param socket The socket of the user that connected.
   */
  onConnection(socket: Socket) {

  }
}
