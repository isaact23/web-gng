import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { Biome } from "@share/utility/Biome";
import { BiomeDependentHillGenerator } from "./hill-gen/biome-dependent/BiomeDependentHillGenerator";
import { a } from "@share/data/coordinate/CoordinateGenerators";
import { ContinuousBiomeGenerator, IContinuousBiomeGenerator } from "./biome-gen";
import { InterpolatedHillGenerator } from "./hill-gen/InterpolatedHillGenerator";
import { BiomeBlocks } from "@share/utility/BiomeBlocks";

const WORLD_WIDTH = 200;
const BIOME_WIDTH = 50;
const BIOME_BORDER_GRADE = 5;

/**
 * Generator for cluster data.
 */
export class ContinuousClusterGenerator implements IClusterGenerator {

  /**
   * Generate a standard world.
   */
  createWorldCluster(): IClusterData {
    const cluster = new ClusterData();

    // Generate biomes
    const biomeGen = new ContinuousBiomeGenerator(WORLD_WIDTH, BIOME_WIDTH, BIOME_BORDER_GRADE);

    // Generate hills
    const hillGen = new BiomeDependentHillGenerator(WORLD_WIDTH, biomeGen);
    //const hillGen = new InterpolatedHillGenerator(biomeGen);

    for (let x = 0; x < WORLD_WIDTH; x++) {
      for (let z = 0; z < WORLD_WIDTH; z++) {


        const y = 0;

        const biome: Biome = biomeGen.getTopBiomeFromXZ(x, z);
        const topBlock = BiomeBlocks.getBlockFromBiome(biome);

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

    for (let point of biomeGen.points) {
      cluster.setBlock(a(point[0], 2, point[1]), BiomeBlocks.getBlockFromBiome(point[2]));
    }

    return cluster;
  }
}
