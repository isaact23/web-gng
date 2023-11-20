import { IBiomeComposition } from "./biome-composition/IBiomeComposition";

/**
 * Interface for continuous biome placement generator.
 * Returns percentage composition of different biomes per coordinate.
 */
export interface IContinuousBiomeGenerator {
  /**
   * Given an x and z value, get the biomes and percentage compositions.
   */
  getBiomesFromXZ(x: number, z: number): IBiomeComposition;
}
