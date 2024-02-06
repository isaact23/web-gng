/**
 * Calculate logistic curve for a number
 */
export function logistic(

  x: number,
  supremum: number = 1,
  grade: number = 1,
  midpoint: number = 0

): number | undefined {

  const denom = 1 + Math.pow(Math.E, (-grade * (x - midpoint)));

  if (denom == 0) {
    return undefined;
  }

  return supremum / denom;
}