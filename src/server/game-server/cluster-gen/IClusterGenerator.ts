import { IClusterData } from "@share/cluster-data";

export interface IClusterGenerator {
  
  /**
   * Create an island cluster.
   */
  createIsleCluster(): IClusterData;

  /**
   * Create a cluster with sine waves.
   */
  createSineCluster(): IClusterData;
}