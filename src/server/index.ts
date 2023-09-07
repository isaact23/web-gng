import { Connection, IConnection } from "./connection";
import { GameServer, IGameServer } from "./game-server";

const connection: IConnection = new Connection();
connection.init();

const gameServer: IGameServer = new GameServer();
gameServer.init();
