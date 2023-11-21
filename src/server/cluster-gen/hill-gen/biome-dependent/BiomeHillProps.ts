import { Biome } from "@share/utility/Biome";
import { HillProperty } from "./HillProperty";

const props = new Map<Biome, HillProperty>();

props.set(Biome.Grasslands, new HillProperty(0.0015, 30, 30, 0.4, 30));
props.set(Biome.Desert, new HillProperty(0.0005, 15, 15, 0.2, 60));

const BIOME_HILL_PROPS = props;
export default BIOME_HILL_PROPS;
