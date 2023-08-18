import { IMeshManager } from "./IMeshManager";

export class MeshManager implements IMeshManager {
  
  // Initialize asynchronously. Return a boolean indicating the success of the operation.
  init(): Promise<boolean> {
    throw new Error("Not implemented");
  }
}