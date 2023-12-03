import { Biome } from "@share/utility/Biome";
import { IContinuousBiomeGenerator } from "./IContinuousBiomeGenerator";
import { BiomeComposition, IBiomeComposition } from "./biome-composition";
import { logistic } from "../../../share/utility/Logistic";
import { BiomePercentage } from "./biome-composition/biome-percentage/BiomePercentage";

const BIOME_BORDER_GRADE = 4;

/**
 * Class for biome placement generator
 */
export class ContinuousBiomeGenerator implements IContinuousBiomeGenerator {

  public readonly points: [number, number, Biome][]

  constructor (
    worldWidth: number,
    biomeWidth: number
  ) {
    this.points = [];
    const biomeCount = Math.floor((worldWidth * worldWidth) / (biomeWidth * biomeWidth));
    const biomes = Object.values(Biome).filter(v => typeof(v) !== "string") as Biome[];

    for (let i = 0; i < biomeCount; i++) {
      this.points.push([
        Math.floor(Math.random() * worldWidth),
        Math.floor(Math.random() * worldWidth),
        biomes[Math.floor(Math.random() * biomes.length)]
      ]);
    }
  }

  /**
   * Given an x and z value, get the biome.
   */
  getBiomesFromXZ(x: number, z: number): IBiomeComposition {

    let biomeInfluences = new Map<Biome, number>();
    let totalInfluence = 0;

    // Calculate biome influence on this point
    for (let point of this.points) {

      const distance = Math.sqrt(Math.pow(point[0] - x, 2) + Math.pow(point[1] - z, 2));
      let influence = Math.pow(distance + 10, -BIOME_BORDER_GRADE);

      if (influence == undefined) {
        influence = 0;
      }
      totalInfluence += influence;

      const biome = point[2];
      const oldInfluence = biomeInfluences.get(biome);
      if (oldInfluence == undefined) {
        biomeInfluences.set(biome, influence);
      } else {
        biomeInfluences.set(biome, oldInfluence + influence);
      }
    }

    // Convert biome influence levels to biome compositions
    if (totalInfluence == 0) {
      const grassComposition = new BiomeComposition();
      grassComposition.addBiomePercentage(Biome.Grasslands, 1);
      return grassComposition;
    }

    let biomeComposition = new BiomeComposition();
    for (let biomeInfluence of biomeInfluences) {
      let biome = biomeInfluence[0];
      let influence = biomeInfluence[1];
      let percentage = influence / totalInfluence;
      biomeComposition.addBiomePercentage(biome, percentage);
    }

    return biomeComposition;
  }
}
