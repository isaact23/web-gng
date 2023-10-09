import { IClusterData } from "@share/data/cluster-data";

export interface IClusterGenerator {

  /**
   * Generate a standard world.
   */
  createWorldCluster(): IClusterData;
}