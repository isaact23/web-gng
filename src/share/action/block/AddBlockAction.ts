import { IAbsoluteCoordinate } from "@share/data/coordinate";
import { Action } from "../Action";
import { Block } from "@share/utility";

export class AddBlockAction extends Action {
  constructor(
    public readonly coord: IAbsoluteCoordinate,
    public readonly block: Block
  ) {
    super();
  }
}
