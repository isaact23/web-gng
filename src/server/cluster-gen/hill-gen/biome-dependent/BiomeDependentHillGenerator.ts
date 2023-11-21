import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";
import { IHillGenerator } from "..";
import { IContinuousBiomeGenerator } from "../../biome-gen/continuous-biome-gen";

/**
 * This hill generator considers the biome when determining hill properties.
 */
export class BiomeDependentHillGenerator implements IHillGenerator {

  /**
   * Store coordinates of guiding particles.
   */
  public coords: IAbsoluteCoordinate[];

  constructor(
    private WORLD_WIDTH: number,
    private HILL_DENSITY: number,
    private HILL_HEIGHT: number,
    private HILL_ALTITUDE: number,
    private biomeGen: IContinuousBiomeGenerator
  ) {
    // Generate random particles to guide hill formation
    this.coords = [];
    const hillCount = Math.floor(WORLD_WIDTH * WORLD_WIDTH * HILL_DENSITY);
    for (let i = 0; i < hillCount; i++) {
      let x = Math.floor(Math.random() * WORLD_WIDTH);
      let y = Math.floor(Math.random() * HILL_HEIGHT + HILL_ALTITUDE);
      let z = Math.floor(Math.random() * WORLD_WIDTH);
      this.coords.push(new AbsoluteCoordinate(x, y, z));
    }
  }

  /**
   * Given x and z coordinates, get the y coordinate of the hills.
   */
  getYFromXZ(x: number, z: number): number {
    return 3;

    /*const origin = new AbsoluteCoordinate(x, this.HILL_ALTITUDE + Math.floor(this.HILL_HEIGHT / 2), z);

    // Determine how high this column should be based on surrounding particles
    let ySum = 0;
    let influenceSum = 0;
    for (let coord of this.coords) {

      let distance = (coord.vec().subtract(origin.vec())).length();

      // Logistic curve
      let influence = logistic(distance, 1, -this.HILL_GRADE, this.HILL_WIDTH);
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
      y = Math.floor(ySum / influenceSum);
    }

    return Math.round(y);*/
  }
}
