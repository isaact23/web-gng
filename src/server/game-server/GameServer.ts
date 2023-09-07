import { IClusterData } from "@share/cluster-data";
import { IGameServer } from ".";
import { ClusterGenerator } from "@server/cluster-gen";
import { ISignalManager } from "@server/signal-manager";

/**
 * Handler for server-side game logic.
 */
export class GameServer implements IGameServer {
  private cluster: IClusterData;
  private signal: ISignalManager | undefined;

  /**
   * Initialize the game server.
   */
  constructor() {
    this.cluster = ClusterGenerator.createSineCluster();
  }

  /**
   * Add a reference to the signal manager.
   * @throws if this GameServer already has an ISignalManager.
   */
  addSignalManager(signalManager: ISignalManager): void {
    if (this.signal != undefined) {
      throw "Cannot add an ISignalManager to a GameServer that already has an ISignalManager"
    }
    this.signal = signalManager;
  }
}
