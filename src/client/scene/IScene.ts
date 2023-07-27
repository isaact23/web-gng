import { IChunk } from "../chunk/IChunk";

export interface IScene {

  // Initialize a Babylon scene
  init() : void;

  // Load geometry for a chunk
  loadChunk(chunk: IChunk) : void;
}