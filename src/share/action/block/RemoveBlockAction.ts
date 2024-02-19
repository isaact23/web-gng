import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";
import { Action } from "../Action";

export class RemoveBlockAction extends Action {
  constructor(
    public readonly coord: IAbsoluteCoordinate
  ) {
    super();
  }

  /**
   * Convert this Action into its string representation.
   * @return string representation of this Action.
   */
  override toStr(): string {
    return "RemoveBlockAction|" + this.coord.toString();
  }

  /**
   * Get an instance of this Action from a string representation,
   * minus the class name.
   * @param str The string representation of this action without
   * the class name.
   * @return A new instance of this Action.
   */
  static fromStr(str: string): RemoveBlockAction {
    const coord = AbsoluteCoordinate.fromString(str);
    return new RemoveBlockAction(coord);
  }
}