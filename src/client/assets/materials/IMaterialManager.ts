import * as Babylon from "babylonjs";
import { ITextureManager } from "./textures/ITextureManager";

export interface IMaterialManager {
  
  // Get texture manager.
  getTextureManager(): ITextureManager;

  // Get the universal tilemap material.
  getTilemapMaterial(): Babylon.Material;
}