import { Face } from "@share/utility";
import { IAbsoluteCoordinate } from "@share/data/coordinate";

export interface IBlockTargeter {
  /**
   * Highlight a block based on the player view ray.
   * @returns True on success.
   */
  highlightBlock(): boolean;

  /**
   * Determine the block and face the player is currently targeting.
   * @returns The position and face of the targeted block, or null if no block is targeted.
   */
  getTargetBlockAndFace() : [IAbsoluteCoordinate, Face] | null;
}