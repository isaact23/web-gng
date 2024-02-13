/**
 * Handle the GUI for Green and Gold.
 */
export interface IGUIManager {

  /**
   * Enable the main menu GUI.
   */
  mainMenuGui(): void;

  /**
   * Enable the gameplay GUI.
   */
  gameGui(): void;
}