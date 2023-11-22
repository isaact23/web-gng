import { Biome } from "@share/utility/Biome";
import { IBiomeComposition } from "./IBiomeComposition";
import { BiomePercentage } from "./biome-percentage/BiomePercentage";
import { IBiomePercentage } from "./biome-percentage/IBiomePercentage";

export class BiomeComposition implements IBiomeComposition {

  constructor(private _biomePercentages: BiomePercentage[] = []) {}

  /**
   * Add a biome and percentage.
   */
  addBiomePercentage(biome: Biome, percentage: number): void {
    this._biomePercentages.push(new BiomePercentage(biome, percentage));
  }

  /**
   * Get a list of biomes and their percentage compositions.
   */
  getBiomePercentages(): IBiomePercentage[] {

    // Ensure the percentages add up to 1.
    let percentageTotal = 0;
    for (let biomePercentage of this._biomePercentages) {
      percentageTotal += biomePercentage.getPercentage();
    }
    if (Math.abs(percentageTotal - 1.0) >= 0.0001) {
      throw new Error("The biome percentages do not add up to 1.");
    }

    return this._biomePercentages;
  }
}
