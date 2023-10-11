import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { AbsoluteCoordinate } from "@share/data/coordinate";
import { HillGenerator } from "./hill-gen/HillGenerator";
import { IHillGenerator } from "./hill-gen/IHillGenerator";

/**
 * Generator for cluster data.
 */
export class ClusterGenerator implements IClusterGenerator {

  /**
   * Generate a standard world.
   */
  createWorldCluster(): IClusterData {
    const cluster = new ClusterData();

    const WORLD_WIDTH = 200;
    const BIOME_WIDTH = 50;

    // Lambda for creating absolute coordinates
    const v = (x: number, y: number, z: number) => new AbsoluteCoordinate(x, y, z);

    // Generate hills
    const hillGen: IHillGenerator = new HillGenerator(WORLD_WIDTH);

    for (let x = 0; x < WORLD_WIDTH; x++) {
      for (let z = 0; z < WORLD_WIDTH; z++) {

        const y = hillGen.getYFromXZ(x, z);
        
        // Set block column
        cluster.setBlock(v(x, y, z), Block.Grass);
        for (let i = y - 1; i >= 0; i--) {
          let block = Block.Stone;
          if (y - i < 4) {
            block = Block.Dirt;
          }
          cluster.setBlock(v(x, i, z), block);
        }
      }
    }

    return cluster;
  }
}
