import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { a } from "@share/data/coordinate/CoordinateGenerators";

/**
 * Generator for cluster data.
 */
export class GreedyMeshClusterGenerator {

  /**
   * Generate a standard world.
   */
  static createWorldCluster(): IClusterData {
    const cluster = ClusterData.new();

    /*for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        for (let z = 0; z < 16; z++) {
          if ((x < 9 && y < 9 && z < 9) ||
              (x > 5 && y > 4 && z > 3)) {
            cluster.setBlock(a(x, y, z), Block.Stone);
          }
        }
      }
    }*/

    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        if (x > 2 && z > 2 && x < 12 && z < 12) {
          cluster.setBlock(a(x, 0, z), Block.Stone);
        }
      }
    }

    return cluster;
  }
}
