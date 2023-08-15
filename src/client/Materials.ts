import * as Babylon from "babylonjs";

let mat: Babylon.StandardMaterial | null = null;

export function getTilemapMaterial(): Babylon.StandardMaterial {
  if (mat == null) {
    mat = new Babylon.StandardMaterial("tilemap");
    mat.specularPower = 100;
    const tex = new Babylon.Texture("img/tilemap.png", undefined, undefined, undefined,
      Babylon.Texture.NEAREST_NEAREST);
    mat.diffuseTexture = tex;
  }

  return mat;
}
