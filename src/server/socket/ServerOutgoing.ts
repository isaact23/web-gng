import { Socket } from "socket.io";
import { IClusterData } from "@share/data/cluster-data";
import { LoadClusterAction } from "@share/action/cluster/LoadClusterAction";
import { Action } from "@share/action";

/**
 * Receive messages from GameServer and forward
 * them to the client.
 */
export class ServerOutgoing {

  sendAction(action: Action) {
    
  }
}
