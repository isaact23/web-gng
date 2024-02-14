import { IAbsoluteCoordinate } from "@share/data/coordinate";
import { Socket } from "socket.io-client";

/**
 * Send messages from the client to the server.
 */
export class Outgoing {

  constructor(private socket: Socket) {}

  /**
   * Tell server that we are removing a block.
   * @param coord The coordinate of the block to remove.
   */
  removeBlock(coord: IAbsoluteCoordinate) {
    this.socket.emit("removeBlock", coord.toString());
  }
}
