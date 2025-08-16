import { IClusterData } from "@share/data/cluster-data";
import { ContinuousClusterGenerator } from "@server/cluster-gen";
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
    io.on("connection", (socket) => {
      console.log("User connected");
      socket.emit("cluster-data", this.cluster.toStringRep());
    });

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
}
