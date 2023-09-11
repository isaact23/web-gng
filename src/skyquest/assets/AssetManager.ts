import * as Babylon from "babylonjs";
import { IAssetManager } from "./IAssetManager"
import { IMaterialManager } from "./materials/IMaterialManager";
import { MaterialManager } from "./materials/MaterialManager";
import { IMeshManager } from "./meshes/IMeshManager";
import { MeshManager } from "./meshes/MeshManager";

export class AssetManager implements IAssetManager {
  private materialManager: IMaterialManager;
  private meshManager: IMeshManager;

  constructor(scene: Babylon.Scene) {
    this.materialManager = new MaterialManager(scene);
    this.meshManager = new MeshManager(scene);
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