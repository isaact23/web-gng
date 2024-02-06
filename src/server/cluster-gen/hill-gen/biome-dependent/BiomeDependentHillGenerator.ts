import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";
import { IHillGenerator } from "..";
import { a } from "@share/data/coordinate/CoordinateGenerators";
import { logistic } from "@share/utility/Logistic";
import { HillProps } from "./HillProps";
import { IContinuousBiomeGenerator } from "@server/cluster-gen/biome-gen";
import { BiomeHillPropData } from "./HillProps/BiomeHillPropData";

/**
 * This hill generator considers the biome when determining hill properties.
 */
export class BiomeDependentHillGenerator implements IHillGenerator {

  /**
   * Store coordinates of guiding particles.
   */
  public coords: IAbsoluteCoordinate[] = [];

  constructor(
    private worldWidth: number,
    private biomeGen: IContinuousBiomeGenerator
  ) {

    // Generate random particles to guide hill formation
    for (let x = 0; x < worldWidth; x++) {
      for (let z = 0; z < worldWidth; z++) {

        let biomeComposition = biomeGen.getBiomesFromXZ(x, z);
        let hillProps = HillProps.createFrom(biomeComposition);

        if (Math.random() < hillProps.getDensity()) {
          let y = Math.floor(Math.random() * hillProps.getHeight() + hillProps.getAltitude());
          this.coords.push(a(x, y, z));
        }
      }
    }
  }

  /**
   * Given x and z coordinates, get the y coordinate of the hills.
   */
  getYFromXZ(x: number, z: number): number {

    const biomeComposition = this.biomeGen.getBiomesFromXZ(x, z);
    const hillProps = HillProps.createFrom(biomeComposition);

    const originY = Math.round(hillProps.getAltitude() + (hillProps.getHeight() / 2));
    const origin = new AbsoluteCoordinate(x, originY, z);

    // Determine how high this column should be based on surrounding particles
    let ySum = 0;
    let influenceSum = 0;
    for (let coord of this.coords) {

      let distance = (coord.vec().subtract(origin.vec())).length();

      // Logistic curve
      let influence = logistic(distance, 1, -hillProps.getGrade(), hillProps.getWidth());
      if (influence == undefined) {
        influence = 0;
      }

      ySum += coord.y * influence;
      influenceSum += influence;
    }

    // Calculate weighted average
    let y;
    if (influenceSum == 0) {
      y = 0;
    } else {
      y = Math.round(ySum / influenceSum);
    }

    return y;
  }
}
