import { IAbsoluteCoordinate } from "@share/data/coordinate";
import io from "socket.io-client";

/**
 * Send messages from the client to the server.
 */
export class Outgoing {

  static socket = io();

  private constructor() {}

  /**
   * Tell server that we are removing a block.
   * @param coord The coordinate of the block to remove.
   */
  static removeBlock(coord: IAbsoluteCoordinate) {
    this.socket.emit("removeBlock", coord.)
  }
}
