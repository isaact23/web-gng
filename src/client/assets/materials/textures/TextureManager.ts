import * as Babylon from "babylonjs";
import { ITextureManager } from "./ITextureManager";

export class TextureManager implements ITextureManager {
  private tex: Babylon.Texture;

  constructor(private scene: Babylon.Scene) {
    this.tex = new Babylon.Texture("img/tilemap.png", undefined, undefined, undefined,
      Babylon.Texture.NEAREST_NEAREST);
  }

  // Get tilemap texture
  getTilemapTexture(): Babylon.Texture {
    return this.tex;
  }
}
