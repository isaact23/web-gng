import * as Babylon from "babylonjs";
import * as BabylonGUI from "babylonjs-gui";
import { IGUIManager } from "./IGUIManager";
import { IMainMenuGUI, MainMenuGUI } from "./main-menu";
import { GameGUI, IGameGUI } from "./game-gui";

export class GUIManager implements IGUIManager {

  private readonly ui: BabylonGUI.AdvancedDynamicTexture;
  private readonly mainMenuGUI: IMainMenuGUI;
  private readonly gameGUI: IGameGUI;

  /**
   * Initialize gameplay elements
   */
  constructor() {
    this.ui = BabylonGUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");

    this.mainMenuGUI = new MainMenuGUI(this.ui);
    this.gameGUI = new GameGUI(this.ui);
  }

  /**
   * Enable the main menu GUI.
   */
  mainMenuGui(): void {
    this._resetUi();
    this.mainMenuGUI.enable();
  }

  /**
   * Enable the gameplay GUI.
   */
  gameGui(): void {
    this._resetUi();
    this.gameGUI.enable();
  }

  /**
   * Disable all GUI.
   */
  _resetUi(): void {
    this.mainMenuGUI.disable();
    this.gameGUI.disable();

    this.ui.clear();
  }
}