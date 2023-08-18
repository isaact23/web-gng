import * as Babylon from "babylonjs";
import { getTilemapTexture } from "./TextureManager";

let mat: Babylon.StandardMaterial | null = null;

export function getTilemapMaterial(): Babylon.StandardMaterial {
  if (mat == null) {
    mat = new Babylon.StandardMaterial("tilemap");
    //mat.specularPower = 100;
    mat.specularColor = Babylon.Color3.Black();
    mat.diffuseTexture = getTilemapTexture();
  }

  return mat;
}
