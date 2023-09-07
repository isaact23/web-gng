import express, { Request, Response } from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from './socket-types';

import { IConnection } from ".";

const PORT = 3000;

/**
 * Handler for basic services connecting the server to the client,
 * i.e. express, socket.io, http, etc.
 */
export class Connection implements IConnection {
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
    });

    server.listen(PORT, () => {
      console.log(`Skyloft server listening on port ${PORT}`);
    });
  }
}
