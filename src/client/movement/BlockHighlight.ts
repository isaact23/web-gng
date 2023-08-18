import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";
import { Face, getFaceFromVector } from "../Block";

const VIEW_DISTANCE = 5;
let ball: Babylon.Mesh | null = null;

// Highlight a block based on the player view ray.
export function highlightBlock(camera: Babylon.UniversalCamera, scene: Babylon.Scene) {

  if (ball == null) {
    ball = Babylon.MeshBuilder.CreateSphere("ball");
    ball.scaling = new Vector3(0.2, 0.2, 0.2);
    ball.isPickable = false;
    scene.addMesh(ball);
  }

  const target = _getTargetBlockAndFace(camera, scene);
  if (target == null) {
    ball.position = new Vector3(0, -100, 0);
    return;
  } else {
    ball.position = target[0];
    console.log(target[1]);
  }
}

// Determine the block and face the player is currently targeting.
function _getTargetBlockAndFace(camera: Babylon.UniversalCamera, scene: Babylon.Scene) : [Vector3, Face] | null {
  
  if (ball == null) return null;

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