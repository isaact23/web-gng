import * as Babylon from "babylonjs";
import "@babylonjs/loaders";
import { IMeshManager } from "./IMeshManager";

export class MeshManager implements IMeshManager {
  constructor(private scene: Babylon.Scene) {

  }

  // Get face indicator mesh
  async getFaceIndicatorMesh(): Promise<Babylon.AbstractMesh> {
    const result = await Babylon.SceneLoader.ImportMeshAsync(
      null, "glb/", "face-indicator.glb", this.scene);
    return result.meshes[0];
  }
}