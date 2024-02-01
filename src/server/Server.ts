import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';

import { IServer } from ".";
import { GameServer, IGameServer } from "./game-server";
import { ISocketIncoming, SocketIncoming } from './socket/socket-incoming';
import { ISocketOutgoing, SocketOutgoing } from './socket/socket-outgoing';

const PORT = 3000;

/**
 * Handler for basic services connecting the server to the client,
 * i.e. express, socket.io, http, etc.
 */
export class Server implements IServer {

  private gameServer: IGameServer;

  /**
   * Initialize the connection.
   */
  constructor() {

    const app = express();
    app.use(express.static("dist"));
    app.use(express.static("public"));

    const server = http.createServer(app);

    const io = new IOServer
      (server, {
        cors: {
          origin: "localhost:3000",
          methods: ["GET", "POST"]
        }
      });
    
    // Initialize the game server and socket.io message handlers
    const socketOutgoing: ISocketOutgoing = new SocketOutgoing();
    this.gameServer = new GameServer(socketOutgoing);
    const socketIncoming: ISocketIncoming = new SocketIncoming(this.gameServer, io);

    server.listen(PORT, () => {
      console.log(`Sky Quest server listening on port ${PORT}`);
    });
  }
}
