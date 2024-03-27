import * as Babylon from "babylonjs";
import { MaterialManager } from "./materials/MaterialManager";
import { MeshManager } from "./meshes/MeshManager";

export class AssetManager {
  public readonly materialManager: MaterialManager;
  public readonly meshManager: MeshManager;

  constructor(scene: Babylon.Scene) {
    this.materialManager = new MaterialManager(scene);
    this.meshManager = new MeshManager(scene);
  }
}