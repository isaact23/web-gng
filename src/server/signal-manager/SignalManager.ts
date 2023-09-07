import express, { Request, Response } from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from './socket-types';

import { ISignalManager } from ".";
import { IGameServer } from "@server/game-server";

const PORT = 3000;

/**
 * Handler for basic services connecting the server to the client,
 * i.e. express, socket.io, http, etc.
 */
export class SignalManager implements ISignalManager {

  private gameServer: IGameServer | undefined;

  /**
   * Initialize the connection.
   */
  constructor() {

    const app = express();
    app.use(express.static("dist"));
    app.use(express.static("public"));

    const server = http.createServer(app);

    const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
      (server, {
        cors: {
          origin: "localhost:3000",
          methods: ["GET", "POST"]
        }
      });

    app.get("/", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });

    io.on("connection", (socket) => {
      console.log("socket.io detected user connection");

      socket.send();
    });

    server.listen(PORT, () => {
      console.log(`Skyloft server listening on port ${PORT}`);
    });
  }

  /**
   * Add a reference to the game server.
   * @throws if this SignalManager already has an IGameServer added.
   */
  addGameServer(gameServer: IGameServer): void {
    if (this.gameServer != undefined) {
      throw "Cannot add an IGameServer to a SignalManager that already has an IGameServer";
    }
    this.gameServer = gameServer;
  }
}
