import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { BiomeGenerator, IBiomeGenerator } from "./biome-gen";
import { Block } from "@share/utility";
import { Biome } from "@share/utility/Biome";
import { AbsoluteCoordinate } from "@share/data/coordinate";

const WORLD_WIDTH = 200;
const BIOME_WIDTH = 50;

/**
 * A generator for cluster data that demonstrates the functionality of
 * biome generators. Creates a flat plane of blocks, where the block types
 * represent the different biomes.
 */
export class ClusterGenerator implements IClusterGenerator {

  /**
   * Generate the world.
   */
  createWorldCluster(): IClusterData {
    
    const cluster = new ClusterData();
    const biomeGen = new BiomeGenerator(WORLD_WIDTH, BIOME_WIDTH);

    // Lambda for creating absolute coordinates
    const a = (x: number, y: number, z: number) => new AbsoluteCoordinate(x, y, z);

    for (let point of biomeGen.points) {
      cluster.setBlock(a(point[0], 2, point[1]), Block.Stone);
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
        cluster.setBlock(a(x, 0, z), block);
      }
    }

    return cluster;
  }
}
