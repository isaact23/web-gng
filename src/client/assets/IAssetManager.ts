import { IMaterialManager } from "./materials/IMaterialManager";
import { IMeshManager } from "./meshes/IMeshManager";

export interface IAssetManager {

  // Load assets asynchronously. Return a boolean indicating the success of the operation.
  loadAssets(): Promise<boolean>;

  // Get material manager.
  getMaterialManager(): IMaterialManager;

  // Get mesh manager.
  getMeshManager(): IMeshManager;
}