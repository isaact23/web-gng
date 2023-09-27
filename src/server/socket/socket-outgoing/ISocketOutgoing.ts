import { IClusterData } from "@share/data/cluster-data";
import { Socket } from "socket.io";

/**
 * Receive messages from IGameServer and forward
 * them to the client.
 */
export interface ISocketOutgoing {
  
  /**
   * Send cluster data to a socket.
   */
  sendWorld(socket: Socket, cluster: IClusterData): void;
}