import { Vector3 } from "babylonjs";
import { Block } from "./Block";
import * as Chunk from "./chunk/Chunk";
import * as World from "./world/World";

export function createIsleChunk(coord: Vector3) : Chunk.IChunk {
  const chunk = new Chunk.MeshGeneratorChunk(coord);
  for (let x = 0; x < 32; x++) {
    for (let y = 0; y < 32; y++) {
      for (let z = 0; z < 32; z++) {
        let layerRadius = 0.01 * (y ** 2) - 1;
        if (Math.sqrt(((x - 16) ** 2) + ((z - 16) ** 2)) > layerRadius) continue;

        let block = Block.Dirt;
        if (y == 31) block = Block.Grass;
        if (y < 24) block = Block.Stone;

        chunk.setBlock(new Vector3(x, y, z), block);
      }
    }
  }
  return chunk;
}

export function createIsleWorld(): World.IWorld {
  const world = new World.BasicWorld();

  for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
      for (let z = 0; z < 128; z++) {
        let layerRadius = 0.003 * (y ** 2) - 1;
        if (Math.sqrt(((x - 64) ** 2) + ((z - 64) ** 2)) > layerRadius) continue;

        let block = Block.Dirt;
        if (y == 127) block = Block.Grass;
        if (y < 75) block = Block.Stone;

        world.setBlock(new Vector3(x, y, z), block);
      }
    }
  }
  return world;
}
