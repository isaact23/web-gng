import { Biome } from "@share/utility/Biome";

/**
 * Interface for discrete biome placement generator.
 * Assigns one specific biome to each XZ coordinate.
 */
export interface IDiscreteBiomeGenerator {
  /**
   * Given an x and z value, get the biome.
   */
  getBiomeFromXZ(x: number, z: number): Biome;
}
