import { Vector3 } from "babylonjs";
import { ICoordinate } from "../../coordinate/ICoordinate";
import { Grid } from "../Grid";

/**
 * Store generic objects in 3D coordinates. Can be serialized / deserialized.
 * @template T The type of object to store.
 * @template C The coordinate type.
 */
export class SerializableGrid<T, C extends ICoordinate> extends Grid<T, C> {

  /**
   * Create a new empty grid.
   */
  static new<T, C extends ICoordinate>(): SerializableGrid<T, C> {
    return new SerializableGrid<T, C>(new Map<number, Map<number, Map<number, T>>>());
  }

  /**
   * Factory method to re-instantiate a Grid
   *   with the data encoded in this string.
   * @template T The type of object stored in the grid.
   * @param rep The string representation of the object.
   * @param objFunc Function to convert string objects
   *   to type T.
   * @returns A new Grid equivalent to the given data.
   */
  static fromStringRep<T, C extends ICoordinate>(rep: string, objFunc: (str: string) => T): SerializableGrid<T, C> {

    const grid = SerializableGrid.new<T, C>();

    // Set up state machine
    let x = 0;
    let y = 0;
    let z = 0;
    let depth = 0;
    let index = 0;
    let numStr = "";

    // Iterate through characters
    while (index < rep.length) {
      const char = rep[index];
      if (char === '{') {
        const num = parseInt(numStr);
        numStr = "";
        if (depth == 0) {
          x = num;
        } else if (depth == 1) {
          y = num;
        }
        depth++;
      }
      else if (char === '}') {
        if (depth == 0) {
          throw new Error("Mismatched brackets");
        }
        depth--;
      }
      else if (char === '(') {
        if (depth != 2) {
          throw new Error("Opening parenthesis at wrong depth level");
        }
        const num = parseInt(numStr);
        numStr = "";
        z = num;
        depth++;
      }
      else if (char === ')') {
        if (depth != 3) {
          throw new Error("Closing parenthesis at wrong depth level");
        }
        const strlen = parseInt(numStr);
        numStr = "";

        const item = rep.substring(index + 1, index + strlen + 1);
        grid.setNum(x, y, z, objFunc(item));

        index += strlen;
        depth--;
      }
      else {
        numStr += char;
      }

      index++;
    }

    if (depth != 0) {
      throw new Error("Ended at wrong depth level");
    }
    return grid;
  }

  /**
   * Convert this Grid into a string representation
   *   that can be converted back into an equivalent
   *   Grid.
   * @param stringFunc Optional function to convert
   *   inner generic objects to strings.
   * @returns The string representation of this object.
   */
  toStringRep(stringFunc?: (obj: T) => string): string {
    let rep = "";
    this.data.forEach((xSlice, x) => {
      rep += `${x}{`;
      xSlice.forEach((ySlice, y) => {
        rep += `${y}{`;
        ySlice.forEach((item, z) => {
          let str: string;
          if (stringFunc == undefined) {
            str = `${item}`
          } else {
            str = stringFunc(item)
          }
          rep += `${z}(${str.length})${str}`
        })
        rep += "}";
      });
      rep += "}";
    });
    return rep;
  }  
}
