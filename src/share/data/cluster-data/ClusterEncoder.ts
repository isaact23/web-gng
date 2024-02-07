import { IClusterData } from "./IClusterData";

/**
 * The ClusterEncoder provides methods for converting
 * clusters to strings and vice versa to allow block data
 * to be sent from server to client.
 */
export class ClusterEncoder {
  static encode(cluster: IClusterData): string {

    // Need access to map internal to Grid

    let rep = "";
    this.data.forEach((xSlice, x) => {
      rep += `${x}{`;
      xSlice.forEach((ySlice, y) => {
        rep += `${y}{`;
        ySlice.forEach((item, z) => {
          rep += `${z}{${item}}` // TODO: Call toStringRep on item
        })
        rep += "}";
      });
      rep += "}";
    });
    return rep;
  }

  static decode(data: string): IClusterData {
    throw new Error("Not implemented");
  }
}