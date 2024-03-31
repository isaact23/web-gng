import { IGameGUI } from "./IGameGUI";
import * as BabylonGUI from "@babylonjs/gui";

/**
 * Class for the game GUI.
 */
export class GameGUI implements IGameGUI {

  private readonly crossfire: BabylonGUI.Image;

  /**
   * Create the gameplay GUI.
   */
  constructor(private readonly ui: BabylonGUI.AdvancedDynamicTexture)
  {
    this.crossfire = new BabylonGUI.Image("crossfire", "img/crossfire.png");
    this.crossfire.width = "16px";
    this.crossfire.height = "16px";
  }

  /**
   * Enable the GUI.
   */
  enable(): void {
    this.ui.addControl(this.crossfire);
  }

  /**
   * Disable the GUI.
   */
  disable(): void {
    this.ui.removeControl(this.crossfire);
  }
}