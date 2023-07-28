import {Block} from "../Block";
import {Vector3} from "babylonjs";

export interface IChunk {
  // Get the size (width, length, height) of a chunk in blocks
  getSize(): number;

  // Get the block at an xyz coordinate
  getBlock(x: number, y: number, z: number) : Block | undefined;

  // Set a block at an xyz coordinate
  setBlock(x: number, y: number, z: number, block: Block) : void;

  // Get the coordinate of this chunk.
  getCoordinate() : Vector3;

  // Get iterator for local-space positions of all non-air blocks in the chunk
  getIterator() : Generator<[Vector3, Block], any, unknown>;
}
