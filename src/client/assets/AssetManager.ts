import { IAssetManager } from "./IAssetManager"
import { IMaterialManager } from "./materials/IMaterialManager";
import { IMeshManager } from "./meshes/IMeshManager";

export class AssetManager implements IAssetManager {
  constructor() {

  }

  // Load assets asynchronously. Return a boolean indicating the success of the operation.
  loadAssets(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  // Get material manager.
  getMaterialManager(): IMaterialManager {
    throw new Error("Method not implemented.");
  }

  // Get mesh manager.
  getMeshManager(): IMeshManager {
    throw new Error("Method not implemented.");
  }
}