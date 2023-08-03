import { Vector3 } from "babylonjs";
import { Block } from "./Block";
import * as Chunk from "./chunk/Chunk";
import * as Scene from "./scene/Scene";
import * as View from "./view/View";
import * as World from "./world/World";

function createIsleChunk(coord: Vector3) : Chunk.IChunk {
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

// Create world (group of chunks)

function createIsleWorld(): World.IWorld {
  const world = new World.BasicWorld();

  for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
      for (let z = 0; z < 128; z++) {
        let layerRadius = 0.04 * (y ** 2) - 1;
        if (Math.sqrt(((x - 64) ** 2) + ((z - 64) ** 2)) > layerRadius) continue;

        let block = Block.Dirt;
        if (y == 127) block = Block.Grass;
        if (y < 50) block = Block.Stone;

        world.setBlock(new Vector3(x, y, z), block);
      }
    }
  }
  return world;
}

// Create view
const view: View.IView = new View.BasicView();

// Create Babylon 3D environment
const scene: Scene.IScene = new Scene.NoMeshScene();
scene.init(view);

/*for (let x = 0; x < 7; x++) {
  for (let y = 0; y < 7; y++) {
    for (let z = 0; z < 7; z++) {
      scene.loadChunk(createChunk(new Vector3(x, y, z)));
    }
  }
}*/

//scene.loadChunk(createIsleChunk(new Vector3(0, -2, 0)));

/*const chunk = new Chunk.MeshGeneratorChunk(new Vector3(0, 0, 0));
chunk.setBlock(0, 0, 5, Block.Grass);
scene.loadChunk(chunk);*/

const world = createIsleWorld();
scene.loadWorld(world);
