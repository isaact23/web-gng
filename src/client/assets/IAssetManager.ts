import { IMaterialManager } from "./materials/IMaterialManager";
import { IMeshManager } from "./meshes/IMeshManager";

export interface IAssetManager {

  // Initialize asynchronously. Return a boolean indicating the success of the operation.
  init(): Promise<boolean>;

  // Get material manager.
  getMaterialManager(): IMaterialManager;

  // Get mesh manager.
  getMeshManager(): IMeshManager;
}