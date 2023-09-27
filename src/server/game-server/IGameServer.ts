import { IClusterData } from "@share/data/cluster-data";

/**
 * Handler for server-side game logic.
 */
export interface IGameServer {
  /**
   * Get the current cluster data.
   * @returns IClusterData with the server's cluster data.
   */
  getCluster(): IClusterData;
}
