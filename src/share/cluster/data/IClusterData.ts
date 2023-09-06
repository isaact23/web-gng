import { Block } from "share/utility";
import { IChunkData } from "./chunk/IChunkData";
import { Vector3 } from "babylonjs";

export interface IClusterData {
  // Add a new chunk. Replace any chunk in its spot.
  addChunk(chunk: IChunkData) : void;

  // Get the chunk at a coordinate
  getChunk(pos: Vector3) : IChunkData | undefined;

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3) : Block | undefined;

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void;

  // Get iterator for all chunks in the world
  getIterator(): Generator<IChunkData>;
}
