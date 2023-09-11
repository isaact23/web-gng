import * as Babylon from "babylonjs";
import * as BabylonGUI from "babylonjs-gui";
import { IGUI } from "./IGUI";

export class GUI implements IGUI {

  private readonly ui: BabylonGUI.AdvancedDynamicTexture;

  // Gameplay UI elements
  private readonly crossfire: BabylonGUI.Image;

  /**
   * Initialize gameplay elements
   */
  constructor() {
    this.ui = BabylonGUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");

    this.crossfire = new BabylonGUI.Image("crossfire", "img/crossfire.png");
    this.crossfire.width = "16px";
    this.crossfire.height = "16px";
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
    
    this.ui.addControl(this.crossfire);
  }

  /**
   * Disable all GUI.
   */
  _resetUi(): void {
    this.ui.clear();
  }
}