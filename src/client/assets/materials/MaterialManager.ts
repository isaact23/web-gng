import * as Babylon from "babylonjs";
import { TextureManager } from "./textures/TextureManager";
import { ITextureManager } from "./textures/ITextureManager";
import { IMaterialManager } from "./IMaterialManager";

let mat: Babylon.StandardMaterial | null = null;

export class MaterialManager implements IMaterialManager {
  private textureManager: ITextureManager;
  private mat: Babylon.StandardMaterial;

  constructor() {
    this.textureManager = new TextureManager();

    this.mat = new Babylon.StandardMaterial("tilemap");
    //this.mat.specularPower = 100;
    this.mat.specularColor = Babylon.Color3.Black();
    this.mat.diffuseTexture = this.textureManager.getTilemapTexture();
  }

  // Get texture manager.
  getTextureManager(): ITextureManager {
    return this.textureManager;
  }

  // Get the universal tilemap material.
  getTilemapMaterial(): Babylon.Material {
    return this.mat;
  }
}
