import { Game } from "@client/game";
import { AbsoluteCoordinate } from "@share/data/coordinate";
import { Block } from "@share/utility";
import { Socket } from "socket.io-client";

/**
 * Handle incoming messages from the server to the client.
 */
export class ClientIncoming {

  private loadedCluster = false;

  constructor(
    private game: Game,
    private socket: Socket
  ) {
    socket.on("loadCluster",   clusterStr  => game.loadClusterStr(clusterStr));
    socket.on("unloadCluster", ()          => game.unloadCluster());
    socket.on("removeBlock",   coordStr    => this.removeBlock(coordStr));
  }

  /**
   * Handle server request to remove a block locally.
   * @param coordStr The string representation of the coordinate
   *   of the block to remove.
   */
  removeBlock(coordStr: string) {
    const coord = AbsoluteCoordinate.fromString(coordStr);
    const cluster = this.game.getCluster();
    if (cluster === null) {
      console.error("Tried to remove block " + coordStr + " but the cluster is not loaded");
    }
    else {
      cluster.setBlock(coord, Block.Air);
    }
  }
}
