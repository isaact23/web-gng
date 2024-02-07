import { IClusterData } from "./IClusterData";

/**
 * The ClusterEncoder provides methods for converting
 * clusters to strings and vice versa to allow block data
 * to be sent from server to client.
 */
export class ClusterEncoder {
  static encode(cluster: IClusterData): string {
    throw new Error("Not implemented");
  }

  static decode(data: string): IClusterData {
    throw new Error("Not implemented");
  }
}