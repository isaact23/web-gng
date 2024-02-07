import { Socket } from "socket.io";
import { IClusterData } from "@share/data/cluster-data";
import { AbsoluteCoordinate } from "@share/data/coordinate";
import { ClusterEncoder } from "@share/data/cluster-data/ClusterEncoder";

/**
 * Receive messages from IGameServer and forward
 * them to the client.
 */
export class Outgoing {

  /**
   * Send cluster data to a socket.
   * @param socket The socket (connection to a player)
   * to send the world data to.
   * @param cluster The world data (cluster).
   */
  sendWorld(socket: Socket, cluster: IClusterData) {
    console.log("Sending world to " + socket.id);
    socket.send("world", ClusterEncoder.encode(cluster));
  }
}
