/**
 * Handle the GUI for SkyQuest.
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