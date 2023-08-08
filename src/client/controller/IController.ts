import { IChunk } from "../chunk/Chunk";
import { ICluster } from "../cluster/Cluster";
import { Engine, Scene } from "babylonjs";

export interface IController {

  // Get the Babylon engine
  getEngine(): Engine;

  // Get the Babylon scene
  getScene(): Scene;

  // Load geometry for a chunk
  loadChunk(chunk: IChunk): void;

  // Load geometry for a cluster
  loadCluster(cluster: ICluster): void;
}