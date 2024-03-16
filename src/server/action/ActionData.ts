import { Action } from "@share/action";
import { Socket } from "socket.io";

/**
 * Wrapper class for Actions that annotates it with server-side
 * information, most importantly, the sender's socket.
 */
export class ActionData {
  constructor(
    public readonly action: Action,
    public readonly actor: Socket
  ) {}
}
