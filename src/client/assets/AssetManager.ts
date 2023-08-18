import { IAssetManager } from "./IAssetManager"
import { IMaterialManager } from "./materials/IMaterialManager";
import { MaterialManager } from "./materials/MaterialManager";
import { IMeshManager } from "./meshes/IMeshManager";
import { MeshManager } from "./meshes/MeshManager";

export class AssetManager implements IAssetManager {
  private materialManager: IMaterialManager;
  private meshManager: IMeshManager;

  constructor() {
    this.materialManager = new MaterialManager();
    this.meshManager = new MeshManager();
  }

  // Load assets asynchronously. Return a boolean indicating the success of the operation.
  async loadAssets(): Promise<boolean> {
    const didSucceed = await this.meshManager.loadAssets();
    return didSucceed;
  }

  // Get material manager.
  getMaterialManager(): IMaterialManager {
    return this.materialManager;
  }

  // Get mesh manager.
  getMeshManager(): IMeshManager {
    return this.meshManager;
  }
}