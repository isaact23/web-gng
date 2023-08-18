import { IMeshManager } from "./IMeshManager";

export class MeshManager implements IMeshManager {
  
  // Load meshes asynchronously. Return a boolean indicating the success of the operation.
  loadAssets(): Promise<boolean> {
    throw new Error("Not implemented");
  }
}