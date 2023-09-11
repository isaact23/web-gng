import { IView } from "./IView";

export class View implements IView {
  private canvas : HTMLCanvasElement;
  private fpsElement : HTMLElement;

  constructor() {
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw "Could not find HTMLCanvasElement renderCanvas";
    }
    this.canvas = canvas;

    const fpsElement = document.getElementById("fps");
    if (!(fpsElement instanceof HTMLElement)) {
      throw "Could not find HTMLElement fps";
    }
    this.fpsElement = fpsElement;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
  getFpsElement(): HTMLElement {
    return this.fpsElement;
  }
}
