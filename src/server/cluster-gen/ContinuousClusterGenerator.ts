import { ContinuousBiomeGenerator, IContinuousBiomeGenerator, OneBiomeGenerator } from "./biome-gen";
import { BiomeDependentHillGenerator, InterpolatedHillGenerator, IHillGenerator } from "./hill-gen";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { a } from "@share/data/coordinate/CoordinateGenerators";
import { Block, Biome, getBlockFromBiome } from "@share/utility";

const WORLD_WIDTH = 100;
const BIOME_WIDTH = 50;

/**
 * Generator for cluster data.
 */
export class ContinuousClusterGenerator {

  /**
   * Generate a standard world.
   */
  static createWorldCluster(): IClusterData {
    const cluster = new ClusterData();

    // Generate biomes
    //const biomeGen: IContinuousBiomeGenerator = new ContinuousBiomeGenerator(WORLD_WIDTH, BIOME_WIDTH);
    const biomeGen: IContinuousBiomeGenerator = new OneBiomeGenerator(Biome.Grasslands);

    // Generate hills
    const hillGen: IHillGenerator = new BiomeDependentHillGenerator(WORLD_WIDTH, biomeGen);
    //const hillGen: IHillGenerator = new InterpolatedHillGenerator(biomeGen);

    for (let x = 0; x < WORLD_WIDTH; x++) {
      for (let z = 0; z < WORLD_WIDTH; z++) {

        const y = hillGen.getYFromXZ(x, z);
        const biome: Biome = biomeGen.getBiomesFromXZ(x, z).getTopBiome();
        const topBlock = getBlockFromBiome(biome);

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

    /*for (let point of biomeGen.points) {
      cluster.setBlock(a(point[0], 100, point[1]), BiomeBlocks.getBlockFromBiome(point[2]));
    }

    for (let point of hillGen.coords) {
      cluster.setBlock(point, Block.Stone);
    }*/

    return cluster;
  }
}
