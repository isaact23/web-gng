
/**
 * Generate a random standard normal value using Box-Muller transform
 */
export function normalRandom() {
  const v1 = Math.sqrt(-2 * Math.log(1 - Math.random()));
  const v2 = Math.sin(2 * Math.PI * Math.random());
  const res = v1 * v2;
  return res;
}
