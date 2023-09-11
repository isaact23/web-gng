/**
 * Handle the GUI for SkyQuest.
 */
export interface IGUI {

  /**
   * Enable the main menu GUI.
   */
  mainMenuGui(): void;

  /**
   * Enable the gameplay GUI.
   */
  gameGui(): void;
}