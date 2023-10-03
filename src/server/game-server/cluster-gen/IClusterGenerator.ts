import { IClusterData } from "@share/data/cluster-data";

export interface IClusterGenerator {
  
  /**
   * Create an island cluster.
   */
  createIsleCluster(): IClusterData;

  /**
   * Create a cluster with sine waves.
   */
  createSineCluster(size: number): IClusterData;

  /**
   * Generate a standard world.
   */
  createWorldCluster(): IClusterData;
}