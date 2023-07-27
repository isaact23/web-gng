import {Block} from "../Block";
import {Vector3} from "babylonjs";

export interface IChunk {
  // Get the block at an xyz coordinate
  getBlock(x: number, y: number, z: number) : Block;

  // Set a block at an xyz coordinate
  setBlock(x: number, y: number, z: number, block: Block) : void;

  // Get iterator for all non-air blocks in the chunk
  getIterator() : Generator<[Vector3, Block], any, unknown>;
}
