
/**
 * Handler for basic services connecting the server to the client,
 * i.e. express, socket.io, http, etc.
 */
export interface IConnection {
  /**
   * Initialize the connection.
   */
  init(): void;
}
