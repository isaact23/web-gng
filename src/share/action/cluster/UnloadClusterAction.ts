import { Action } from "../Action";

export class UnloadClusterAction extends Action {
  constructor() {
    super();
  }

  /**
   * Convert this Action into its string representation.
   * @return string representation of this Action.
   */
  override toStr(): string {
    return "UnloadClusterAction";
  }

  /**
   * Get an instance of this Action from a string representation,
   * minus the class name.
   * @param str The string representation of this action without
   * the class name.
   * @return A new instance of this Action.
   */
  static fromStr(str: string): UnloadClusterAction {
    return new UnloadClusterAction();
  }
}
