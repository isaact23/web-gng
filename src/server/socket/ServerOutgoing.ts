import { Socket } from "socket.io";
import { Action } from "@share/action";
import { Server as IOServer } from 'socket.io';

/**
 * Receive messages from GameServer and forward
 * them to the client.
 */
export class ServerOutgoing {

  constructor(
    private readonly io: IOServer
  ) {}

  /**
   * Send an action to all clients.
   */
  sendAction(action: Action) {
    this.io.emit("action", action.toStr());
  }
  
  /**
   * Send an action to one client.
   */
  sendActionTo(action: Action, socket: Socket) {
    socket.send("action", action.toStr());
  }

  /**
   * Send action to all clients except one.
   * @param action The action to send.
   * @param socket The client NOT to send the message to
   *    (i.e. the broadcasting client)
   */
  sendActionFrom(action: Action, socket: Socket) {
    socket.broadcast.emit("action", action.toStr());
  }
}
