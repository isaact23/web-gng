import * as Babylon from "babylonjs";
import { IChunk } from "../chunk/IChunk";
import { ICluster } from "../cluster/ICluster";
import { IAssetManager } from "../assets/IAssetManager";

export interface IGame {
  // Handle asynchronous initialization. Return boolean indicating success.
  init(): Promise<boolean>;

  // Get asset manager. Must call init() before calling.
  getAssetManager(): IAssetManager;

  // Load geometry for a chunk
  loadChunk(chunk: IChunk): void;

  // Load geometry for a cluster
  loadCluster(cluster: ICluster): void;
}