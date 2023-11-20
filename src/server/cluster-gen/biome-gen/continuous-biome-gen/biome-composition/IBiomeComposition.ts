import { Biome } from "@share/utility/Biome";
import { IBiomePercentage } from "./biome-percentage/IBiomePercentage";

/**
 * Store an array of biomes and their percentage compositions for a column in the world cluster.
 */
export interface IBiomeComposition {

  /**
   * Add a biome and percentage.
   */
  addBiomePercentage(biome: Biome, percentage: number): void;

  /**
   * Get a list of biomes and their percentage compositions.
   */
  getBiomePercentages(): IBiomePercentage[];
}