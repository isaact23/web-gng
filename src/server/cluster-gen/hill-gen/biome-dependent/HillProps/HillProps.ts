import { IHillProps } from "./IHillProps";
import { BiomeHillPropData } from "./BiomeHillPropData";
import { IBiomeComposition } from "@server/cluster-gen/biome-gen/biome-composition";

/**
 * Store the properties for a certain schema of hill generation. Values are immutable.
 */
export class HillProps implements IHillProps {
  constructor(
    private readonly _density: number,
    private readonly _altitude: number,
    private readonly _height: number,
    private readonly _grade: number,
    private readonly _width: number
  ) {
    if (_density < 0 || _density > 1) {
      throw new Error("Density must be between 0 and 1");
    }
  }

  getDensity  = () => this._density;
  getAltitude = () => this._altitude;
  getHeight   = () => this._height;
  getGrade    = () => this._grade;
  getWidth    = () => this._width;

  /**
   * Create HillProps from a BiomeComposition.
   */
  static createFrom(biomeComposition: IBiomeComposition): IHillProps {
    let avgHillProps: IHillProps = new HillProps(0, 0, 0, 0, 0);

    const biomePercentages = biomeComposition.getBiomePercentages();
    for (let biomePercentage of biomePercentages) {

      let biome = biomePercentage.getBiome();
      let percentage = biomePercentage.getPercentage();

      let hillProps = BiomeHillPropData.get(biome);
      hillProps = hillProps.multiply(percentage);
      avgHillProps = avgHillProps.add(hillProps);
    }

    return avgHillProps;
  }

  /**
   * Add another IHillProps to this one and return the sum.
   */
  add(props: IHillProps): IHillProps {
    return new HillProps(
      this._density  + props.getDensity(),
      this._altitude + props.getAltitude(),
      this._height   + props.getHeight(),
      this._grade    + props.getGrade(),
      this._width    + props.getWidth()
    );
  }

  /**
   * Multiply this IHillProps by a scalar and return the product.
   */
  multiply(scalar: number): IHillProps {
    return new HillProps(
      this._density  * scalar,
      this._altitude * scalar,
      this._height   * scalar,
      this._grade    * scalar,
      this._width    * scalar
    );
  }

  /**
   * Divide this IHillProps by a scalar and return the result.
   */
  divide(scalar: number): IHillProps {
    return new HillProps(
      this._density  / scalar,
      this._altitude / scalar,
      this._height   / scalar,
      this._grade    / scalar,
      this._width    / scalar
    );
  }
}
