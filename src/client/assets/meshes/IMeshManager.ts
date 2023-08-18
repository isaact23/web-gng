export interface IMeshManager {

  // Initialize asynchronously. Return a boolean indicating the success of the operation.
  init(): Promise<boolean>;
}