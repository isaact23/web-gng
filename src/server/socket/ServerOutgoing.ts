import { Socket } from "socket.io";
import { IClusterData } from "@share/data/cluster-data";

/**
 * Receive messages from GameServer and forward
 * them to the client.
 */
export class ServerOutgoing {

  /**
   * Send cluster data to a socket.
   * @param socket The socket (connection to a player)
   * to send the world data to.
   * @param cluster The world data (cluster).
   */
  sendWorld(socket: Socket, cluster: IClusterData) {
    console.log("Sending world to " + socket.id);
    socket.emit("loadCluster", cluster.toStringRep());
  }
}
