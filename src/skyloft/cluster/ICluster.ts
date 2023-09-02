import { Block } from "../utility/Block";
import { IChunk } from "./chunk/IChunk";
import { Vector3 } from "babylonjs";

export interface ICluster {
  // Add a new chunk. Replace any chunk in its spot.
  addChunk(chunk: IChunk) : void;

  // Get the chunk at a coordinate
  getChunk(pos: Vector3) : IChunk | undefined;

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3) : Block | undefined;

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void;

  // Get iterator for all chunks in the world
  getIterator(): Generator<IChunk>;

  // Load or reload chunk meshes in the world.
  load(): void;
}
