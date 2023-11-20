import { Biome } from "@share/utility/Biome";
import { IBiomeComposition } from "./IBiomeComposition";

export class BiomeComposition implements IBiomeComposition {

  private _compositions: {"biome": Biome, "percent": number}[] | null = null;
}