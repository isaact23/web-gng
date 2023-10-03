import { IAbsoluteCoordinate } from "@share/data/coordinate";

/**
 * Interface for generating random coordinates to guide world generation.
 */
export interface INoiseGenerator {
  /**
   * Get iterator for all noise blocks that will ever spawn within a
   * certain radius of a coordinate.
   * @param origin The origin from which to seek noise blocks.
   * @param radius The maximum distance from the origin to select noise blocks from.
   * @returns An iterator of IAbsoluteCoordinates of noise blocks that fall
   * within the specified radius of the specified origin, as well as their distances
   * from the origin.
   */
  getIterator(coord: IAbsoluteCoordinate, radius: number): Generator<[IAbsoluteCoordinate, number]>;
}
