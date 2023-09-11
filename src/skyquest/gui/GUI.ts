import * as Babylon from "babylonjs";
import * as BabylonGUI from "babylonjs-gui";

export class GUI {
  constructor() {
    const ui = BabylonGUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");

    const crossfire = new BabylonGUI.Image("crossfire", "img/crossfire.png");
    crossfire.width = "16px";
    crossfire.height = "16px";
    ui.addControl(crossfire);
  }
}