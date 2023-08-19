import { IMaterialManager } from "./materials/IMaterialManager";
import { IMeshManager } from "./meshes/IMeshManager";

export interface IAssetManager {

  // Get material manager.
  getMaterialManager(): IMaterialManager;

  // Get mesh manager.
  getMeshManager(): IMeshManager;
}