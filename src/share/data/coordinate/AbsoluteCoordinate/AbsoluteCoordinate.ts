import { IAbsoluteCoordinate } from ".";

/**
 * Absolute coordinate in world space,
 * not relative to any chunk.
 */
export class AbsoluteCoordinate implements IAbsoluteCoordinate {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) { }
}