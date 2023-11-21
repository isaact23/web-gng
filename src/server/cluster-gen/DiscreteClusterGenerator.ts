import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { AbsoluteCoordinate } from "@share/data/coordinate";
import { HillGenerator, IHillGenerator, VariableHillGenerator } from "./hill-gen";
import { DiscreteBiomeGenerator, IDiscreteBiomeGenerator } from "./biome-gen/discrete-biome-gen";
import { Biome } from "@share/utility/Biome";
import { IndicatorHillGenerator } from "./hill-gen/IndicatorHillGenerator";

const WORLD_WIDTH = 200;
const BIOME_WIDTH = 50;

/**
 * Generator for cluster data.
 */
export class DiscreteClusterGenerator implements IClusterGenerator {

  /**
   * Generate a standard world.
   */
  createWorldCluster(): IClusterData {
    const cluster = new ClusterData();

    // Lambda for creating absolute coordinates
    const a = (x: number, y: number, z: number) => new AbsoluteCoordinate(x, y, z);

    // Generate biomes
    const biomeGen: IDiscreteBiomeGenerator = new DiscreteBiomeGenerator(WORLD_WIDTH, BIOME_WIDTH);

    // Generate hills
    const hillGen: IHillGenerator = new IndicatorHillGenerator(biomeGen);

    for (let x = 0; x < WORLD_WIDTH; x++) {
      for (let z = 0; z < WORLD_WIDTH; z++) {

        const y = hillGen.getYFromXZ(x, z);

        const biome: Biome = biomeGen.getBiomeFromXZ(x, z);
        let topBlock: Block;
        if (biome == Biome.Grasslands) {
          topBlock = Block.Grass;
        }
        else if (biome == Biome.Desert) {
          topBlock = Block.Sand;
        }
        else {
          topBlock = Block.Stone;
        }
        
        // Set block column
        cluster.setBlock(a(x, y, z), topBlock);
        for (let i = y - 1; i >= 0; i--) {
          let block = Block.Stone;
          if (y - i < 4) {
            block = Block.Dirt;
          }
          cluster.setBlock(a(x, i, z), block);
        }
      }
    }

    return cluster;
  }
}
