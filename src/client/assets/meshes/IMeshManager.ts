export interface IMeshManager {

  // Load meshes asynchronously. Return a boolean indicating the success of the operation.
  loadAssets(): Promise<boolean>;
}