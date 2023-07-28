import { Block } from "./Block";
import * as Chunk from "./chunk/Chunk";
import * as Scene from "./scene/Scene";
import * as View from "./view/View";

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

// Create view
const view: View.IView = new View.BasicView();

// Create Babylon 3D environment
const scene: Scene.IScene = new Scene.BasicScene(view);
scene.init();
scene.loadChunk(chunk);
