import { Biome } from "@share/utility/Biome";
import { HillProperty } from "./HillProperty";

const props = new Map<Biome, HillProperty>();

props.set(Biome.Grasslands, new HillProperty(2, 30, 0.3, 5, 60));
props.set(Biome.Desert, new HillProperty(-10, 6, 0.2, 20, 30));

const BIOME_HILL_PROPERTIES = props;
export default BIOME_HILL_PROPERTIES;
