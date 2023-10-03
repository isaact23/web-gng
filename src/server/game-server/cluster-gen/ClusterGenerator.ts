import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { AbsoluteCoordinate } from "@share/data/coordinate";
import { INoiseGenerator, StandardNoiseGenerator } from "./noise-gen";

/**
 * Generator for cluster data.
 */
export class ClusterGenerator implements IClusterGenerator {

  /**
   * Generate a standard world.
   */
  createWorldCluster(): IClusterData {
    const cluster = new ClusterData();

    const WORLD_SIZE = 200;
    const HILL_DENSITY = 160; // How many square meters per hill
    const HILL_ALTITUDE = 2; // Distance between sea level and base of hills
    const HILL_SPAN = 15; // Peak to trough meter span of hills
    const HILL_WIDTH = 5;
    const HILL_GRADE = 0.3;

    // Lambda for creating absolute coordinates
    const v = (x: number, y: number, z: number) => new AbsoluteCoordinate(x, y, z);

    const noiseGen: INoiseGenerator = new StandardNoiseGenerator(
      WORLD_SIZE, HILL_DENSITY, HILL_ALTITUDE, HILL_SPAN
    );

    // Generate hills using weighted average of distance to particles
    for (let x = 0; x < WORLD_SIZE; x++) {
      for (let z = 0; z < WORLD_SIZE; z++) {

        // Get noise iterator
        const origin = new AbsoluteCoordinate(x, HILL_ALTITUDE + Math.floor(HILL_SPAN / 2), z);
        const noiseIt = noiseGen.getIterator(origin, 50);

        // Determine how high this column should be based on surrounding particles
        let ySum = 0;
        let influenceSum = 0;
        for (let coordDist of noiseIt) {
          let distance = coordDist[1];

          // Logistic curve
          let denom = (1 + Math.pow(Math.E, (HILL_GRADE * (distance - HILL_WIDTH))));
          let influence;
          if (denom == 0) {
            influence = 0;
          } else {
            influence = 1.0 / denom;
          }

          ySum += coordDist[0].y * influence;
          influenceSum += influence;
        }

        // Calculate weighted average
        let y;
        if (influenceSum == 0) {
          y = 0;
        } else {
          y = Math.floor(ySum / influenceSum);
        }
        
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
