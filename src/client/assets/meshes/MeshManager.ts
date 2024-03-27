import * as Babylon from "babylonjs";
import "@babylonjs/loaders";

export class MeshManager {
  constructor(private scene: Babylon.Scene) {

  }

  // Get avatar mesh and armature
  async getAvatar(): Promise<[Babylon.AbstractMesh[], Babylon.Skeleton[]]> {
    const result = await Babylon.SceneLoader.ImportMeshAsync("avatar", "fbx/", "avatar.fbx", this.scene);
    return [result.meshes, result.skeletons];
  }

  // Get face indicator mesh
  async getFaceIndicatorMesh(): Promise<Babylon.AbstractMesh> {
    const result = await Babylon.SceneLoader.ImportMeshAsync(
      null, "glb/", "face-indicator.glb", this.scene);
    return result.meshes[0];
  }
}
