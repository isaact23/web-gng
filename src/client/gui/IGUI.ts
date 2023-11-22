/**
 * Interface for any GUI controller class.
 */
export interface IGUI {
  /**
   * Enable the GUI.
   */
  enable(): void;

  /**
   * Disable the GUI.
   */
  disable(): void;
}