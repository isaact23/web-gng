import { GameServer } from "@server/game-server";
import { Server as IOServer } from 'socket.io';

/**
 * Handle incoming messages from a client and
 * send them to the IGameServer.
 */
export class ServerIncoming {

  /**
   * Create the SocketIncoming instance.
   */
  constructor(
    private readonly gameServer: GameServer,
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
      this.gameServer.onConnection(socket);
    });
  }
}