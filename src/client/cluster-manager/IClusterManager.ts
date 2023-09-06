import { IClusterData } from "@share/cluster/data"

/**
 * Manage ClusterData on the client side.
 */
export interface IClusterManager extends IClusterData {

  // Load or reload chunk meshes in the world.
  remesh(): void;
}