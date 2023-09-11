import { IGameServer } from "@server/game-server";
import { ISocketIncoming } from "./ISocketIncoming";
import { Server as IOServer } from 'socket.io';

/**
 * Handle incoming messages from a client and
 * send them to the IGameServer.
 */
export class SocketIncoming implements ISocketIncoming {

  /**
   * Create the SocketIncoming instance.
   */
  constructor(
    private readonly gameServer: IGameServer,
    private readonly io: IOServer
  ) {
    this._setup();
  }

  /**
   * Set up callbacks for incoming messages
   */
  private _setup(): void {
    this.io.on("connection", (socket) => {
      console.log("socket.io detected user connection");
    });
  }
}