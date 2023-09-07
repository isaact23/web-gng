import { SignalManager, ISignalManager } from "./signal-manager";
import { GameServer, IGameServer } from "./game-server";

// Initialize services
const gameServer: IGameServer = new GameServer();
const signalManager: ISignalManager = new SignalManager();

// Add bidirectional relationship between game server and signal manager
gameServer.addSignalManager(signalManager);
signalManager.addGameServer(gameServer);
