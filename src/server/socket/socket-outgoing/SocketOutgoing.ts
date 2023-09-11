import { Socket } from "socket.io";
import { ISocketOutgoing } from "./ISocketOutgoing";
import { IClusterData } from "@share/cluster-data";

/**
 * Receive messages from IGameServer and forward
 * them to the client.
 */
export class SocketOutgoing implements ISocketOutgoing {

  /**
   * Send cluster data to a socket.
   */
  sendWorld(socket: Socket, cluster: IClusterData): void {

    socket.send("world", cluster);
  }
}
