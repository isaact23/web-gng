import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";
import { Face, FaceVectorConverter } from "@utility";
import { IAssetManager } from "../../client/assets/IAssetManager";

const VIEW_DISTANCE = 5;

export class BlockTargeter {
  private indicator: Babylon.AbstractMesh;

  constructor(
    private assetManager: IAssetManager,
    private camera: Babylon.UniversalCamera,
    private scene: Babylon.Scene
  ) {
    this.indicator = Babylon.MeshBuilder.CreateSphere("block-indicator", {
      diameter: 0.2
    });
  }

  // Highlight a block based on the player view ray. Return true on success.
  public highlightBlock(): boolean {

    const target = this.getTargetBlockAndFace();
    if (target == null) {
      this.indicator.visibility = 0;
    } else {
      this.indicator.visibility = 1;
      this.indicator.position = target[0];
    }

    return true;
  }

  // Determine the block and face the player is currently targeting.
  public getTargetBlockAndFace() : [Vector3, Face] | null {

    // Raycast
    const direction = this.camera.getDirection(Babylon.Axis.Z);
    const ray = new Babylon.Ray(this.camera.position, direction, VIEW_DISTANCE);
    const pickingInfo = this.scene.pickWithRay(ray);

    if (pickingInfo == null || !pickingInfo.hit || pickingInfo.pickedPoint == null) {
      return null;
    }

    // Get normal of hit
    const normal = pickingInfo.getNormal();
    if (normal == null) return null;

    // Determine which face was hit
    const face = FaceVectorConverter.getFaceFromVector(normal);
    if (face === undefined) return null;

    // Determine which block was hit
    const hitPos = pickingInfo.pickedPoint;
    const blockMid = hitPos.add(normal.multiplyByFloats(-0.5, -0.5, -0.5));
    const blockPos = new Vector3(Math.floor(blockMid.x), Math.floor(blockMid.y), Math.floor(blockMid.z));

    return [blockPos, face];
  }
}
