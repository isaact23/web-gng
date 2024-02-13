import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { ContinuousClusterGenerator } from "@server/cluster-gen";
import { Outgoing } from "@server/socket";
import { Socket } from "socket.io";
import { Grid } from "@share/data/grid";
import { Vector3 } from "babylonjs";
import { SerializableGrid } from "@share/data/grid/SerializableGrid";
import { ChunkCoordinate } from "@share/data/coordinate";
import { join } from "path";
import { writeFileSync } from "fs";

/**
 * Handler for server-side game logic.
 */
export class GameServer {
  private cluster: IClusterData;

  /**
   * Initialize the game server.
   */
  constructor(private readonly outgoing: Outgoing) {

    // Generate a cluster
    console.log("Generating world");
    this.cluster = ContinuousClusterGenerator.createWorldCluster();
    console.log("Done generating world");

    const rep = this.cluster.toStringRep();
    //writeFileSync(join(__dirname, "output.txt"), rep, {flag: 'w'});
    const cluster2 = ClusterData.fromStringRep(rep);
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
    this.outgoing.sendWorld(socket, this.cluster);
  }
}
