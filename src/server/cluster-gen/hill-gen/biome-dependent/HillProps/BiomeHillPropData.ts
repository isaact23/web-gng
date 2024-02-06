import { Biome } from "@share/utility/Biome";
import { HillProps } from "./HillProps";
import { IHillProps } from "./IHillProps";

const props = new Map<Biome, IHillProps>();
let didInit = false;

function init() {
  props.set(Biome.Grasslands, new HillProps(0.0045, 15, 30, 0.7, 30));
  props.set(Biome.Desert, new HillProps(0.0015, 10, 5, 0.7, 30));

  didInit = true;
}

export class BiomeHillPropData {

  /**
   * Get the HillProperties for a biome.
   */
  static get(biome: Biome): IHillProps {
    if (!didInit) init();

    let hillProps = props.get(biome);
    if (hillProps == undefined) {
      throw new Error("Failed to get HillProps for Biome " + biome);
    }
    return hillProps;
  }
}
