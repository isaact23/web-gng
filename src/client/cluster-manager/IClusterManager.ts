import { IClusterData } from "@share/cluster/data"

export interface IClusterManager extends IClusterData {

  // Get the internal IClusterData.
  getClusterData(): IClusterData;

  // Load or reload chunk meshes in the world.
  remesh(): void;
}