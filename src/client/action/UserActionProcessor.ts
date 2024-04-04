import { Action } from "@share/action";
import { ClientActionProcessor } from ".";

/* A subset of ClientActionProcessor meant to be called by
 * the local user. Updates both local and remote environment.
 */
export class UserActionProcessor {
  
  constructor(private clientActionProcessor: ClientActionProcessor) {}

  // Only expose the updateLocalAndRemote method
  update(action: Action) {
   this.clientActionProcessor.updateLocalAndRemote(action);
  }
}
