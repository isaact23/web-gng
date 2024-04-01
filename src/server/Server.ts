import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';

import { IServer } from ".";
import { GameServer } from "./game-server";

const PORT = process.env.PORT || 3000;

/**
 * Handler for basic services connecting the server to the client,
 * i.e. express, socket.io, http, etc.
 */
export class Server implements IServer {

  private gameServer: GameServer;

  /**
   * Initialize the connection.
   */
  constructor() {

    const app = express();
    app.use(express.static("dist-client"));
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
    this.gameServer = new GameServer(io);

    server.listen(PORT, () => {
      console.log(`Green and Gold server listening on port ${PORT}`);
    });
  }
}
