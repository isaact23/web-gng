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

  sendAction(action: Action) {
    this.io.emit("action", action.toStr());
  }
}
