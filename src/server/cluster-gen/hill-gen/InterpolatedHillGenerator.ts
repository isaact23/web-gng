import { Biome } from "@share/utility/Biome";
import { IHillGenerator } from "./IHillGenerator";
import { IContinuousBiomeGenerator } from "../biome-gen/continuous-biome-gen";

const GRASSLANDS_HEIGHT = 10;
const DESERT_HEIGHT = 20;
const DEFAULT_HEIGHT = 0;

/**
 * A hill generator that demonstrates hill interpolation between biomes.
 */
export class InterpolatedHillGenerator implements IHillGenerator {

  constructor(private biomeGen: IContinuousBiomeGenerator) {}

  getYFromXZ(x: number, z: number): number {

    const biomeComposition = this.biomeGen.getBiomesFromXZ(x, z);
    let height = 0;
    let biomePercentages = biomeComposition.getBiomePercentages();
    for (let biomePercentage of biomePercentages) {
      let biome = biomePercentage.getBiome();
      let percentage = biomePercentage.getPercentage();
      let biomeHeight: number;
      switch (biome) {
        case Biome.Grasslands: {
          biomeHeight = GRASSLANDS_HEIGHT; break;
        }
        case Biome.Desert: {
          biomeHeight = DESERT_HEIGHT; break;
        }
        default: {
          biomeHeight = DEFAULT_HEIGHT;
        }
      }
      height += biomeHeight * percentage;
    }
    return Math.round(height);
  }
}
