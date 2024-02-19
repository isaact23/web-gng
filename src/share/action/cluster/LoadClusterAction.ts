import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { Action } from "../Action";

export class LoadClusterAction extends Action {
  constructor(
    public readonly cluster: IClusterData
  ) {
    super();
  }

  /**
   * Convert this Action into its string representation.
   * @return string representation of this Action.
   */
  override toStr(): string {
    return "LoadClusterAction|" + this.cluster.toStringRep();
  }

  /**
   * Get an instance of this Action from a string representation,
   * minus the class name.
   * @param str The string representation of this action without
   * the class name.
   * @return A new instance of this Action.
   */
  static fromStr(str: string): LoadClusterAction {
    const cluster = ClusterData.fromStringRep(str);
    return new LoadClusterAction(cluster);
  }
}