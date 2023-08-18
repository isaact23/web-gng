import * as Babylon from "babylonjs";

export interface ITextureManager {
  
  // Get tilemap texture
  getTilemapTexture(): Babylon.Texture;
}