import * as Babylon from "babylonjs";
import { IChunk } from "../chunk/IChunk";
import { ICluster } from "../cluster/ICluster";
import { IAssetManager } from "../assets/IAssetManager";

export interface IGame {

  // Load geometry for a chunk
  loadChunk(chunk: IChunk): void;

  // Load geometry for a cluster
  loadCluster(cluster: ICluster): void;
}