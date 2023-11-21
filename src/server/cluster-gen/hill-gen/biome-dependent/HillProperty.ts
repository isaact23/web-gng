
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
  ) {}
}
