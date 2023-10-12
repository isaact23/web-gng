import { Biome } from "@share/utility/Biome";

/**
 * Interface for biome placement generator
 */
export interface IBiomeGenerator {
  /**
   * Given an x and z value, get the biome.
   */
  getBiomeFromXZ(x: number, z: number): Biome;
}
