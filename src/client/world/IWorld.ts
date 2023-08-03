import { Block } from "../Block";
import { IChunk } from "../chunk/IChunk";
import { Mesh, Vector3 } from "babylonjs";

export interface IWorld {
  // Add a new chunk
  addChunk(chunk: IChunk) : void;

  // Get the chunk at a coordinate
  getChunk(pos: Vector3) : IChunk;

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3) : Block | undefined;

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void;

  // Get iterator for all chunks in the world
  getIterator(): Generator<IChunk>;

  // Convert block data for all chunks into a mesh
  generateMesh(): Mesh;
}
