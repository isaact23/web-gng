import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { Biome } from "@share/utility/Biome";
import { ContinuousBiomeGenerator, IContinuousBiomeGenerator } from "./biome-gen/continuous-biome-gen";
import { BiomeDependentHillGenerator } from "./hill-gen/biome-dependent/BiomeDependentHillGenerator";
import { a } from "@share/data/coordinate/CoordinateGenerators";
import { InterpolatedHillGenerator } from "./hill-gen/InterpolatedHillGenerator";

const WORLD_WIDTH = 200;
const BIOME_WIDTH = 50;
const BIOME_BORDER_GRADE = 0.5;

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
    const biomeGen: IContinuousBiomeGenerator = 
      new ContinuousBiomeGenerator(WORLD_WIDTH, BIOME_WIDTH, BIOME_BORDER_GRADE);

    // Generate hills
    const hillGen = new BiomeDependentHillGenerator(WORLD_WIDTH, biomeGen);
    //const hillGen = new InterpolatedHillGenerator(biomeGen);

    for (let x = 0; x < WORLD_WIDTH; x++) {
      for (let z = 0; z < WORLD_WIDTH; z++) {

        const y = hillGen.getYFromXZ(x, z);

        const biome: Biome = biomeGen.getTopBiomeFromXZ(x, z);
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

    /*for (let point of hillGen.coords) {
      cluster.setBlock(point, Block.Stone);
    }*/

    return cluster;
  }
}
