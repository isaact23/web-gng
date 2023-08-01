import * as Babylon from "babylonjs";
import * as Mesh from "../mesh/Mesh";

import { Face, Block } from "../Block";
import { IChunk } from "../chunk/IChunk";
import { IScene } from "./IScene";
import { IView } from "../view/IView";
import * as TextureManager from "../TextureManager";

export class MeshScene implements IScene {
  private scene : Babylon.Scene | undefined;

  init(view: IView) : void {
    const canvas = view.getCanvas();
    const engine = new Babylon.Engine(canvas, true);
    const scene = new Babylon.Scene(engine);
    this.scene = scene;

    scene.debugLayer.show();

    const fpsElement = view.getFpsElement();
    engine.runRenderLoop(function () {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
    
    window.addEventListener("resize", function () {
      engine.resize();
    });

    const camera = new Babylon.UniversalCamera("camera1", new Babylon.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
  
    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(-1, 1, 0), scene);
    light.intensity = 0.7;

    const mesh: Mesh.IMesh = new Mesh.BasicMesh();
    mesh.addVertex(0, 0, 10);
    mesh.addVertex(3, 0, 10);
    mesh.addVertex(3, 3, 10);
    mesh.addVertex(0, 3, 10);
    mesh.addTriangle(0, 1, 2);
    mesh.addTriangle(2, 3, 0);

    //const uvs = TextureManager.getTextureUvs(Block.Stone, Face.Front);
    mesh.addUvs();

    const mat = new Babylon.StandardMaterial("tilemap", this.scene);
    const tex = new Babylon.Texture("img/test.png");
    tex.updateSamplingMode(Babylon.Texture.NEAREST_NEAREST);
    mat.diffuseTexture = tex;

    const builtMesh = mesh.getMesh();
    builtMesh.material = mat;

    this.scene?.addMesh(builtMesh);
  }

  loadChunk(chunk: IChunk) : void {

    const blockIterator = chunk.getIterator();
    const chunkSize = chunk.getSize();
    const chunkGlobalCoord = chunk.getCoordinate().multiplyByFloats(chunkSize, chunkSize, chunkSize);

    const mesh: Mesh.IMesh = new Mesh.BasicMesh();

    for (let [coord, block] of blockIterator) {

      const aboveBlock = chunk.getBlock(coord.x, coord.y + 1, coord.z);
      if (aboveBlock == Block.Air || aboveBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y + 1, coord.z);
        const v2 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z);
        const v3 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z + 1);
        const v4 = mesh.addVertex(coord.x, coord.y + 1, coord.z + 1);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const belowBlock = chunk.getBlock(coord.x, coord.y - 1, coord.z);
      if (belowBlock == Block.Air || belowBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y, coord.z);
        const v2 = mesh.addVertex(coord.x, coord.y, coord.z + 1);
        const v3 = mesh.addVertex(coord.x + 1, coord.y, coord.z + 1);
        const v4 = mesh.addVertex(coord.x + 1, coord.y, coord.z);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const frontBlock = chunk.getBlock(coord.x + 1, coord.y, coord.z);
      if (frontBlock == Block.Air || frontBlock === undefined) {

        const v1 = mesh.addVertex(coord.x + 1, coord.y, coord.z);
        const v2 = mesh.addVertex(coord.x + 1, coord.y, coord.z + 1);
        const v3 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z + 1);
        const v4 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const backBlock = chunk.getBlock(coord.x - 1, coord.y, coord.z);
      if (backBlock == Block.Air || backBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y, coord.z);
        const v2 = mesh.addVertex(coord.x, coord.y + 1, coord.z);
        const v3 = mesh.addVertex(coord.x, coord.y + 1, coord.z + 1);
        const v4 = mesh.addVertex(coord.x, coord.y, coord.z + 1);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const leftBlock = chunk.getBlock(coord.x, coord.y, coord.z - 1);
      if (leftBlock == Block.Air || leftBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y, coord.z);
        const v2 = mesh.addVertex(coord.x + 1, coord.y, coord.z);
        const v3 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z);
        const v4 = mesh.addVertex(coord.x, coord.y + 1, coord.z);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const rightBlock = chunk.getBlock(coord.x, coord.y, coord.z + 1);
      if (rightBlock == Block.Air || rightBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y, coord.z + 1);
        const v2 = mesh.addVertex(coord.x, coord.y + 1, coord.z + 1);
        const v3 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z + 1);
        const v4 = mesh.addVertex(coord.x + 1, coord.y, coord.z + 1);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }
    }

    const builtMesh = mesh.getMesh();
    builtMesh.position = chunkGlobalCoord;

    const mat = new Babylon.StandardMaterial("stone", this.scene);
    mat.diffuseTexture = new Babylon.Texture("img/stone.png");
    builtMesh.material = mat;

    this.scene?.addMesh(builtMesh);
  }
}
