import { Block } from "share/utility";
import { Mesh, Vector3 } from "babylonjs";
import { IClusterData } from "../IClusterData";

export interface IChunkData {
  // Get the size (width, length, height) of a chunk in blocks
  getSize(): number;

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3) : Block | undefined;

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void;

  // Get the coordinate of this chunk.
  getCoordinate() : Vector3;

  // Get iterator for local-space positions of all non-air blocks in the chunk
  getIterator() : Generator<[Vector3, Block]>;
}
