import { IChunk } from "../chunk/Chunk";
import { IWorld } from "../world/World";
import { IView } from "../view/View";

export interface IScene {

  // Initialize a Babylon scene
  init(view: IView): void;

  // Load geometry for a chunk
  loadChunk(chunk: IChunk): void;

  // Load geometry for a world
  loadWorld(world: IWorld): void;
}