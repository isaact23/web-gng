import { IChunk } from "../chunk/IChunk";
import { IView } from "../view/IView";

export interface IScene {
  
  // Initialize a Babylon scene
  init(view: IView) : void;

  // Load geometry for a chunk
  loadChunk(chunk: IChunk) : void;
}