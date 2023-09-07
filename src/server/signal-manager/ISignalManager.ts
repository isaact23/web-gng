import { IGameServer } from "@server/game-server";

/**
 * Handler for basic services connecting the server to the client,
 * i.e. express, socket.io, http, etc.
 */
export interface ISignalManager {
  /**
   * Add a reference to the game server.
   * @throws if this ISignalManager already has an IGameServer added.
   */
  addGameServer(gameServer: IGameServer): void;
}
