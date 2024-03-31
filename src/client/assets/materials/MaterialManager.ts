import * as Babylon from "@babylonjs/core";
import { TextureManager } from "./textures/TextureManager";

let mat: Babylon.StandardMaterial | null = null;

export class MaterialManager implements MaterialManager {
  public readonly textureManager: TextureManager;
  private mat: Babylon.StandardMaterial;

  constructor(private scene: Babylon.Scene) {
    this.textureManager = new TextureManager(scene);

    this.mat = new Babylon.StandardMaterial("tilemap", scene);
    //this.mat.specularPower = 100;
    this.mat.specularColor = Babylon.Color3.Black();
    this.mat.diffuseTexture = this.textureManager.getTilemapTexture();

    //this.mat.wireframe = true;
  }

  // Get the universal tilemap material.
  getTilemapMaterial(): Babylon.Material {
    return this.mat;
  }
}
