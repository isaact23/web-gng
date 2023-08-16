import * as Babylon from "babylonjs";
import * as BabylonGUI from "babylonjs-gui";

export class BasicGUI {
  constructor() {
    const ui = BabylonGUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");

    const crossfire = new BabylonGUI.Image("crossfire", "img/crossfire.png");
    crossfire.width = "256px";
    crossfire.height = "256px";
    ui.addControl(crossfire);
  }
}