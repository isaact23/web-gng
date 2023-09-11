import * as Babylon from "babylonjs";
import * as BabylonGUI from "babylonjs-gui";
import { IGUI } from "./IGUI";

export class GUI implements IGUI {
  private readonly ui: BabylonGUI.AdvancedDynamicTexture;

  constructor() {
    this.ui = BabylonGUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");
  }

  /**
   * Enable the main menu GUI.
   */
  mainMenuGui(): void {
    this._resetUi();

    
  }

  /**
   * Enable the gameplay GUI.
   */
  gameGui(): void {
    this._resetUi();

    const crossfire = new BabylonGUI.Image("crossfire", "img/crossfire.png");
    crossfire.width = "16px";
    crossfire.height = "16px";
    this.ui.addControl(crossfire);
  }

  /**
   * Disable all GUI.
   */
  _resetUi(): void {

  }
}