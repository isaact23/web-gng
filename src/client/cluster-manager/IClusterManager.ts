import { IClusterData } from "@share/cluster/data"

export interface IClusterManager extends IClusterData {

  // Load or reload chunk meshes in the world.
  remesh(): void;
}