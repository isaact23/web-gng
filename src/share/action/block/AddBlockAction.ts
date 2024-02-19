import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";
import { Action } from "../Action";
import { Block } from "@share/utility";

export class AddBlockAction extends Action {
  constructor(
    public readonly coord: IAbsoluteCoordinate,
    public readonly block: Block
  ) {
    super();
  }

  /**
   * Convert this Action into its string representation.
   * @return string representation of this Action.
   */
  override toStr(): string {
    return "AddBlockAction|" + this.coord.toString() + "|" + this.block;
  }

  /**
   * Get an instance of this Action from a string representation,
   * minus the class name.
   * @param str The string representation of this action without
   * the class name.
   * @return A new instance of this Action.
   */
  static fromStr(str: string): AddBlockAction {
    const strs = str.split("|");
    const coord = AbsoluteCoordinate.fromString(strs[0]);
    const block: Block = parseInt(strs[1]);
    return new AddBlockAction(coord, block);
  }
}
