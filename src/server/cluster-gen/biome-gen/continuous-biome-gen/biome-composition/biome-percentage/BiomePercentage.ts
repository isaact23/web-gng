import { Biome } from "@share/utility/Biome";
import { IBiomePercentage } from "./IBiomePercentage";

/**
 * Store a biome and a percentage.
 */
export class BiomePercentage implements IBiomePercentage {

  constructor(private biome: Biome, private percentage: number) {
    if (percentage < 0 || percentage > 1) {
      throw new Error("Percentage must be between 0 and 1");
    }
  }

  getBiome(): Biome {
    return this.biome;
  }

  getPercentage(): number {
    return this.percentage;
  }
}