import * as Babylon from "babylonjs";
import "@babylonjs/loaders/glTF";

export class MeshManager {
  constructor(private scene: Babylon.Scene) {

  }

  // Get avatar mesh and armature
  async getAvatar(): Promise<[Babylon.AbstractMesh[], Babylon.Skeleton]> {
    console.log("Getting avatar");
    const result = await Babylon.SceneLoader.ImportMeshAsync("avatar", "glb/avatar/", "avatar.glb", this.scene);
    console.log("Got avatar");
    return [result.meshes, result.skeletons[0]];
  }

  // Get face indicator mesh
  async getFaceIndicatorMesh(): Promise<Babylon.AbstractMesh> {
    const result = await Babylon.SceneLoader.ImportMeshAsync(
      null, "glb/", "face-indicator.glb", this.scene);
    return result.meshes[0];
  }
}
