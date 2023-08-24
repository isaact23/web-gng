import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";
import { Face, getFaceFromVector } from "../Block";
import { IAssetManager } from "../assets/IAssetManager";

const VIEW_DISTANCE = 5;

export class BlockHighlighter {
  private indicator: Babylon.AbstractMesh | null = null;

  constructor(private assetManager: IAssetManager) {
    // Load face indicator mesh
    assetManager.getMeshManager().getFaceIndicatorMesh().then((res) => {
      this.indicator = res;
      this.indicator.isPickable = false;

    });
  }

  // Highlight a block based on the player view ray. Return true on success.
  public highlightBlock(camera: Babylon.UniversalCamera, scene: Babylon.Scene): boolean {

    if (this.indicator == null) {
      return false;
    }

    const target = this._getTargetBlockAndFace(camera, scene);
    if (target == null) {
      this.indicator.visibility = 0;
    } else {
      this.indicator.visibility = 1;
      this.indicator.position = target[0];
      console.log(target[1]);
    }

    return true;
  }

  // Determine the block and face the player is currently targeting.
  private _getTargetBlockAndFace(camera: Babylon.UniversalCamera, scene: Babylon.Scene) : [Vector3, Face] | null {

    // Raycast
    const direction = camera.getDirection(Babylon.Axis.Z);
    const ray = new Babylon.Ray(camera.position, direction, VIEW_DISTANCE);
    const pickingInfo = scene.pickWithRay(ray);

    if (pickingInfo == null || !pickingInfo.hit || pickingInfo.pickedPoint == null) {
      return null;
    }

    // Get normal of hit
    const normal = pickingInfo.getNormal();
    if (normal == null) return null;

    // Determine which face was hit
    const face = getFaceFromVector(normal);
    if (face === undefined) return null;

    // Determine which block was hit
    const hitPos = pickingInfo.pickedPoint;
    const blockMid = hitPos.add(normal.multiplyByFloats(-0.5, -0.5, -0.5));
    const blockPos = new Vector3(Math.floor(blockMid.x), Math.floor(blockMid.y), Math.floor(blockMid.z));

    return [blockPos, face];
  }
}
