import { Block } from "./Block";
import * as Chunk from "./chunk/Chunk";
import * as Scene from "./scene/Scene";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
if (!(canvas instanceof HTMLCanvasElement)) {
  throw "Could not find HTMLCanvasElement renderCanvas";
}

// Create block data
const chunk = new Chunk.BasicChunk();
for (let x = 0; x < 32; x++) {
  for (let y = 0; y < 32; y++) {
    for (let z = 0; z < 32; z++) {
      let layerRadius = 0.01 * (y ** 2) - 1;
      if (Math.sqrt(((x - 16) ** 2) + ((z - 16) ** 2)) > layerRadius) continue;
      chunk.setBlock(x, y, z, Block.Stone);
    }
  }
}

// Create Babylon 3D environment
const scene: Scene.IScene = new Scene.BasicScene(canvas);
scene.init();
scene.loadChunk(chunk);
