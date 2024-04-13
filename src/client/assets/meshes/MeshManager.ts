import * as Babylon from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { LAYER_MASK_PLAYER } from "@share/static/Layers";

export class MeshManager {
  constructor(private scene: Babylon.Scene) {

  }

  // Get avatar mesh and armature
  async getAvatar(): Promise<[Babylon.AbstractMesh[], Babylon.Skeleton]> {
    const result = await Babylon.SceneLoader.ImportMeshAsync("", "glb/avatar/", "avatar.glb", this.scene);
    for (let mesh of result.meshes) {
      mesh.layerMask &= ~LAYER_MASK_PLAYER;
    }
    return [result.meshes, result.skeletons[0]];
  }

  // Get face indicator mesh
  async getFaceIndicatorMesh(): Promise<Babylon.AbstractMesh> {
    const result = await Babylon.SceneLoader.ImportMeshAsync(
      null, "glb/", "face-indicator.glb", this.scene);
    return result.meshes[0];
  }
}
