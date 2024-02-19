
/**
 * An action is any change to the state of the game.
 */
export abstract class Action {
  /**
   * Convert this Action into its string representation.
   */
  abstract toStr(): string;
}