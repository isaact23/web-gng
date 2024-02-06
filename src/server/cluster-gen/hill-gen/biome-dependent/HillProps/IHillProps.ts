
/**
 * Interface for storing the properties of hill generation. Values are immutable.
 */
export interface IHillProps {

  getDensity(): number;
  getAltitude(): number;
  getHeight(): number;
  getGrade(): number;
  getWidth(): number;

  /**
   * Add another IHillProps to this one and return the sum.
   */
  add(props: IHillProps): IHillProps;

  /**
   * Multiply this IHillProps by a scalar and return the product.
   */
  multiply(scalar: number): IHillProps;

  /**
   * Divide this IHillProps by a scalar and return the result.
   */
  divide(scalar: number): IHillProps;
}
