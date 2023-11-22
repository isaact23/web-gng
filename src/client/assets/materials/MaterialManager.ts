import * as Babylon from "babylonjs";
import { TextureManager } from "./textures/TextureManager";
import { ITextureManager } from "./textures/ITextureManager";
import { IMaterialManager } from "./IMaterialManager";

let mat: Babylon.StandardMaterial | null = null;

export class MaterialManager implements IMaterialManager {
  private textureManager: ITextureManager;
  private mat: Babylon.StandardMaterial;

  constructor(private scene: Babylon.Scene) {
    this.textureManager = new TextureManager(scene);

    this.mat = new Babylon.StandardMaterial("tilemap", scene);
    //this.mat.specularPower = 100;
    this.mat.specularColor = Babylon.Color3.Black();
    this.mat.diffuseTexture = this.textureManager.getTilemapTexture();

    this.mat.wireframe = true;
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
