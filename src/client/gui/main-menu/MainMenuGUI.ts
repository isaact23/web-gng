import { IMainMenuGUI } from "./IMainMenuGUI";
import * as BabylonGUI from "babylonjs-gui";

/**
 * Class for the main menu GUI.
 */
export class MainMenuGUI implements IMainMenuGUI {

  /**
   * Create the main menu GUI.
   */
  constructor(private readonly ui: BabylonGUI.AdvancedDynamicTexture)
  {

  }

  /**
   * Enable the GUI.
   */
  enable(): void {

  }

  /**
   * Disable the GUI.
   */
  disable(): void {

  }
}