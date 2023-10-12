import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { AbsoluteCoordinate } from "@share/data/coordinate";
import { HillGenerator, IHillGenerator, VariableHillGenerator } from "./hill-gen";
import { BiomeGenerator, IBiomeGenerator } from "./biome-gen";
import { Biome } from "@share/utility/Biome";

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
    const BIOME_WIDTH = 20;

    // Lambda for creating absolute coordinates
    const v = (x: number, y: number, z: number) => new AbsoluteCoordinate(x, y, z);

    // Generate hills
    /*const hillGen: IHillGenerator = new HillGenerator(WORLD_WIDTH);

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
    }*/

    // Generate biomes
    const biomeGen = new BiomeGenerator(WORLD_WIDTH, BIOME_WIDTH);

    for (let point of biomeGen.points) {
      cluster.setBlock(v(point[0], 2, point[1]), Block.Stone);
    }

    for (let x = 0; x < WORLD_WIDTH; x++) {
      for (let z = 0; z < WORLD_WIDTH; z++) {

        const biome = biomeGen.getBiomeFromXZ(x, z);

        let block: Block = Block.Stone;
        switch (biome) {
          case Biome.Grasslands: {
            block = Block.Grass; break;
          }
          case Biome.Desert: {
            block = Block.Sand; break;
          }
        }
        cluster.setBlock(v(x, 0, z), block);
      }
    }

    return cluster;
  }
}
