import * as Babylon from "babylonjs";
import { Face, FaceVectorConverter } from "@share/utility";
import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";

const VIEW_DISTANCE = 5;

export class BlockTargeter {

  /**
   * Create a new BlockTargeter instance for an IPlayerMotor.
   */
  constructor(
    private camera: Babylon.UniversalCamera,
    private scene: Babylon.Scene
  ) { }

  /**
   * Highlight a block based on the player view ray.
   * @returns True on success.
   */
  public highlightBlock(): boolean {

    return true;
  }

  /**
   * Determine the block and face the player is currently targeting.
   * @returns The position and face of the targeted block, or null if no block is targeted.
   */
  public getTarget() : [IAbsoluteCoordinate, Face] | null {

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
    const blockPos = new AbsoluteCoordinate(Math.floor(blockMid.x), Math.floor(blockMid.y), Math.floor(blockMid.z));

    return [blockPos, face];
  }
}
