import { IClusterData } from "@share/data/cluster-data";
import { ContinuousClusterGenerator } from "@server/cluster-gen";
import { Outgoing } from "@server/socket";
import { Socket } from "socket.io";
import { Grid } from "@share/data/grid";
import { Vector3 } from "babylonjs";

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

    const grid = new Grid<number>();
    grid.set(new Vector3(0, 0, 0), 4);
    grid.set(new Vector3(0, 1, 0), 7);
    grid.set(new Vector3(1, 5, 13), -5);
    grid.set(new Vector3(0, 1, 8), 8);
    const rep = grid.toStringRep();
    console.log("Grid representation: " + rep);
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
