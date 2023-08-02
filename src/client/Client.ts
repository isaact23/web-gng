import { Vector3 } from "babylonjs";
import { Block } from "./Block";
import * as Chunk from "./chunk/Chunk";
import * as Scene from "./scene/Scene";
import * as View from "./view/View";
import * as World from "./world/World";

function createChunk(coord: Vector3) : Chunk.IChunk {
  const chunk = new Chunk.MeshGeneratorChunk(coord);
  for (let x = 0; x < 32; x++) {
    for (let y = 0; y < 32; y++) {
      for (let z = 0; z < 32; z++) {
        let layerRadius = 0.01 * (y ** 2) - 1;
        if (Math.sqrt(((x - 16) ** 2) + ((z - 16) ** 2)) > layerRadius) continue;
        chunk.setBlock(x, y, z, Block.Stone);
      }
    }
  }
  return chunk;
}

// Create world (group of chunks)
/*
const world: World.IWorld = new World.BasicWorld();
world.addChunk(chunk1);
world.addChunk(chunk2);
*/

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

scene.loadChunk(createChunk(new Vector3(0, -1, 2)));
