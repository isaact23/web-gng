import * as Babylon from "babylonjs";
import { getTilemapTexture } from "./textures/TextureManager";
import { IMaterialManager } from "./IMaterialManager";

let mat: Babylon.StandardMaterial | null = null;

export class MaterialManager implements IMaterialManager {
  private mat: Babylon.StandardMaterial;

  constructor() {
    this.mat = new Babylon.StandardMaterial("tilemap");
    //this.mat.specularPower = 100;
    this.mat.specularColor = Babylon.Color3.Black();
    this.mat.diffuseTexture = getTilemapTexture();
  }

  // Get the universal tilemap material.
  getTilemapMaterial(): Babylon.Material {
    return this.mat;
  }
}
