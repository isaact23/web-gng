import { Action } from "@share/action/Action";
import { Socket } from "socket.io-client";

/**
 * Send messages from the client to the server.
 */
export class ClientOutgoing {

  constructor(private socket: Socket) {}

  /**
   * Send an Action to the server.
   */
  sendAction(action: Action) {
    
  }
}
