import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";
import { IHillGenerator } from "./IHillGenerator";
import { logistic } from "../Logistic";

/**
 * A basic hill generator.
 */
export class HillGenerator implements IHillGenerator {

  /**
   * Store coordinates of guiding particles.
   */
  private coords: IAbsoluteCoordinate[];

  constructor (
    WORLD_WIDTH: number = 100,
    HILL_DENSITY: number = 60,
    private readonly HILL_ALTITUDE: number = 2,
    private readonly HILL_HEIGHT: number = 30,
    private readonly HILL_GRADE: number = 0.3,
    private readonly HILL_WIDTH: number = 5
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

    const origin = new AbsoluteCoordinate(x, this.HILL_ALTITUDE + Math.floor(this.HILL_HEIGHT / 2), z);

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

    return Math.round(y);
  }
}
