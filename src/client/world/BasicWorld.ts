import { Mesh, Vector3 } from "babylonjs/index";
import { IChunk } from "../chunk/IChunk";
import { IWorld } from "./IWorld";
import { Block } from "../Block";

export class BasicWorld implements IWorld {
  
  // Add a new chunk
  addChunk(chunk: IChunk): void {
    throw new Error("Method not implemented.");
  }

  // Get the chunk at a coordinate
  getChunk(pos: Vector3): IChunk {
    throw new Error("Method not implemented.");
  }

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3): Block | undefined {
    throw new Error("Method not implemented.");
  }

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block): void {
    throw new Error("Method not implemented.");
  }

  // Get iterator for all chunks in the world
  *getIterator(): Generator<IChunk, any, unknown> {
    throw new Error("Method not implemented.");
  }

  // Convert block data for all chunks into a mesh
  generateMesh(): Mesh {
    throw new Error("Method not implemented.");
  }
}