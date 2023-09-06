import { IClusterMesher } from "./IClusterMesher";
import { IAssetManager } from "@client/assets";
import * as Babylon from "babylonjs";

export class ClusterMesher implements IClusterMesher {

    constructor(
        private readonly shadowGenerator: Babylon.ShadowGenerator,
        private readonly assetManager: IAssetManager,
    ) {
        
    }
}