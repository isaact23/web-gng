import { Block } from "./block";
import { World } from "./world";
import * as Babylon from "babylonjs";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
if (!(canvas instanceof HTMLCanvasElement)) {
  throw "Could not find HTMLCanvasElement renderCanvas";
}
const engine = new Babylon.Engine(canvas, true); // Generate the Babylon 3D engine

const createScene = function (world: World) {
  const scene = new Babylon.Scene(engine);

  const camera = new Babylon.UniversalCamera("camera1", new Babylon.Vector3(5, 4, 5), scene);
  camera.rotation = new Babylon.Vector3(Math.PI / 6, 1.25 * Math.PI, 0);
  camera.attachControl(canvas, true);

  const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const sphere = Babylon.MeshBuilder.CreateSphere("sphere", { diameter: 1, segments: 32 }, scene);
  sphere.position.y = 0.5;

  const p1 = Babylon.MeshBuilder.CreatePlane("plane", {width: 1, height: 1}, scene);
  p1.position = new Babylon.Vector3(0, 0, 0);
  p1.rotation = new Babylon.Vector3(Math.PI / 2, 0, 0);

  const blockIterator = world.getIterator();
  for (let block of blockIterator) {
    console.log(block);
  }

  return scene;
};

// Create block data
const world = new World();
world.setBlock(0, 0, 0, Block.Stone);
world.setBlock(2, 0, 0, Block.Stone);
world.setBlock(4, 0, 0, Block.Air);

// Create Babylon 3D environment
const scene = createScene(world);

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
