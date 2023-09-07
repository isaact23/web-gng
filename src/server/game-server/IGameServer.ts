import { ISignalManager } from "@server/signal-manager";

/**
 * Handler for server-side game logic.
 */
export interface IGameServer {

  /**
   * Add a reference to the signal manager.
   * @throws if this IGameServer already has an ISignalManager.
   */
  addSignalManager(signalManager: ISignalManager): void;
}
