/**
 * Calculate logistic curve for a number
 */
export function logistic(
  
  x: number,
  supremum: number,
  grade: number,
  midpoint: number

): number | undefined {

  const denom = 1 + Math.pow(Math.E, (grade * (x - midpoint)));

  if (denom == 0) {
    return undefined;
  }

  return supremum / denom;
}