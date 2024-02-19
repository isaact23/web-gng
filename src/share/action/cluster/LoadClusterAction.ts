import { IClusterData } from "@share/data/cluster-data";
import { Action } from "../Action";

export class LoadClusterAction extends Action {
  constructor(
    cluster: IClusterData
  ) {
    super();
  }
}