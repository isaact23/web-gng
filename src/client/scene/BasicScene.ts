import * as Babylon from "babylonjs";

import { Block } from "../Block";
import { IChunk } from "../chunk/IChunk";
import { IScene } from "./IScene";
import { IView } from "../view/IView";

export class BasicScene implements IScene {
  private scene : Babylon.Scene | undefined;

  init(view: IView) : void {
    const canvas = view.getCanvas();
    const engine = new Babylon.Engine(canvas, true);
    const scene = new Babylon.Scene(engine);
    this.scene = scene;

    const fpsElement = view.getFpsElement();
    engine.runRenderLoop(function () {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
    
    window.addEventListener("resize", function () {
      engine.resize();
    });

    const camera = new Babylon.UniversalCamera("camera1", new Babylon.Vector3(5, 4, 5), scene);
    camera.attachControl(canvas, true);
  
    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
  }

  loadChunk(chunk: IChunk) : void {

    // Spawn blocks
    const blockIterator = chunk.getIterator();
    const chunkSize = chunk.getSize();

    for (let [localCoord, block] of blockIterator) {

      const globalCoord = localCoord.add(chunk.getCoordinate().multiplyByFloats(chunkSize, chunkSize, chunkSize));

      const aboveBlock = chunk.getBlock(localCoord.x, localCoord.y + 1, localCoord.z);
      if (aboveBlock == Block.Air || aboveBlock == undefined) {
        const top = Babylon.MeshBuilder.CreatePlane("top", {width: 1, height: 1}, this.scene);
        top.position = new Babylon.Vector3(globalCoord.x, globalCoord.y + 0.5, globalCoord.z);
        top.rotation = new Babylon.Vector3(Math.PI / 2, 0, 0);
        top.freezeWorldMatrix();
      }

      const belowBlock = chunk.getBlock(localCoord.x, localCoord.y - 1, localCoord.z);
      if (belowBlock == Block.Air || belowBlock == undefined) {
        const bottom = Babylon.MeshBuilder.CreatePlane("bottom", {width: 1, height: 1}, this.scene);
        bottom.position = new Babylon.Vector3(globalCoord.x, globalCoord.y - 0.5, globalCoord.z);
        bottom.rotation = new Babylon.Vector3(3 * Math.PI / 2, 0, 0);
        bottom.freezeWorldMatrix();
      }

      const frontBlock = chunk.getBlock(localCoord.x + 1, localCoord.y, localCoord.z);
      if (frontBlock == Block.Air || frontBlock == undefined) {
        const front = Babylon.MeshBuilder.CreatePlane("front", {width: 1, height: 1}, this.scene);
        front.position = new Babylon.Vector3(globalCoord.x + 0.5, globalCoord.y, globalCoord.z);
        front.rotation = new Babylon.Vector3(0, 3 * Math.PI / 2, 0);
        front.freezeWorldMatrix();
      }

      const backBlock = chunk.getBlock(localCoord.x - 1, localCoord.y, localCoord.z);
      if (backBlock == Block.Air || backBlock == undefined) {
        const back = Babylon.MeshBuilder.CreatePlane("back", {width: 1, height: 1}, this.scene);
        back.position = new Babylon.Vector3(globalCoord.x - 0.5, globalCoord.y, globalCoord.z);
        back.rotation = new Babylon.Vector3(0, Math.PI / 2, 0);
        back.freezeWorldMatrix();
      }

      const leftBlock = chunk.getBlock(localCoord.x, localCoord.y, localCoord.z - 1);
      if (leftBlock == Block.Air || leftBlock == undefined) {
        const left = Babylon.MeshBuilder.CreatePlane("left", {width: 1, height: 1}, this.scene);
        left.position = new Babylon.Vector3(globalCoord.x, globalCoord.y, globalCoord.z - 0.5);
        left.rotation = new Babylon.Vector3(0, 0, 0);
        left.freezeWorldMatrix();
      }

      const rightBlock = chunk.getBlock(localCoord.x, localCoord.y, localCoord.z + 1);
      if (rightBlock == Block.Air || rightBlock == undefined) {
        const right = Babylon.MeshBuilder.CreatePlane("right", {width: 1, height: 1}, this.scene);
        right.position = new Babylon.Vector3(globalCoord.x, globalCoord.y, globalCoord.z + 0.5);
        right.rotation = new Babylon.Vector3(0, Math.PI, 0);
        right.freezeWorldMatrix();
      }
    }
  }
}