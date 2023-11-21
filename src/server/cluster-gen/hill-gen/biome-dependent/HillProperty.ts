
/**
 * Store the properties for a certain schema of hill generation.
 */
export class HillProperty {
  constructor(
    public readonly density: number,
    public readonly altitude: number,
    public readonly height: number,
    public readonly grade: number,
    public readonly width: number
  ) {
    if (density < 0 || density > 1) {
      throw new Error("Density must be between 0 and 1");
    }
  }
}
