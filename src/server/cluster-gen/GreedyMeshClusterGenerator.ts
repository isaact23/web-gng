import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { a } from "@share/data/coordinate/CoordinateGenerators";

/**
 * Generator for cluster data.
 */
export class GreedyMeshClusterGenerator implements IClusterGenerator {

  /**
   * Generate a standard world.
   */
  createWorldCluster(): IClusterData {
    const cluster = new ClusterData();

    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        for (let z = 0; z < 16; z++) {
          if (
            (x < 9 && y < 9 && z < 9) ||
            (x > 5 && y > 4 && z > 3)
          ) {
            cluster.setBlock(a(x, y, z), Block.Stone);
          }
        }
      }
    }

    return cluster;
  }
}
