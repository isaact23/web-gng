/**
 * Interface for chunk coordinates. An increment of 1 shifts
 * to an adjacent chunk.
 */
export interface IChunkCoordinate {
  get x(): number;
  get y(): number;
  get z(): number;
}