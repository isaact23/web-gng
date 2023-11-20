import { Biome } from "@share/utility/Biome";

/**
 * Store a biome and a percentage.
 */
export interface IBiomePercentage {
  getBiome(): Biome;
  getPercentage(): number;
}