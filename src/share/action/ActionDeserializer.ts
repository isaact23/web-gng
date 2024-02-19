import { Action } from "./Action";

import { AddBlockAction } from "./block/AddBlockAction";
import { RemoveBlockAction } from "./block/RemoveBlockAction";
import { LoadClusterAction } from "./cluster/LoadClusterAction";
import { UnloadClusterAction } from "./cluster/UnloadClusterAction";

/**
 * Convert JSON strings into an instance of the
 * correct Action class.
 */
export class ActionDeserializer {
  
  /**
   * Convert a string into an instance of
   * a subclass of Action.
   * @param str The string representation of an Action subclass.
   * @returns An instance of a subclass of Action.
   */
  static fromStr(str: string): Action {
    let i = 0;
    while (i < str.length && str[i] !== '|') i++;

    let className = str.substring(0, i);
    let data;
    if (i < str.length) {
      data = str.substring(i);
    } else {
      data = "";
    }

    switch (className) {
      case "AddBlockAction":      return AddBlockAction.fromStr(data);
      case "RemoveBlockAction":   return RemoveBlockAction.fromStr(data);
      case "LoadClusterAction":   return LoadClusterAction.fromStr(data);
      case "UnloadClusterAction": return UnloadClusterAction.fromStr(data);

      default:
        throw new Error("Failed to find class for class name " + className);
    }
    
  }
}