export const size = 25;

export function sample(row, column) {
  const x = 2 * column / (size - 1) - 1;
  const y = 2 * row / (size - 1) - 1;
  const signal = .51 * Math.cos(2.5 * x) * Math.cos(2.1 * y)
    + .26 * Math.sin(3.4 * x) * y;
  const outlier = (19 * row + 13 * column + 3 * row * column) % 31 === 4;
  const perturbation = outlier ? .32 + .26 * Math.sin(row * 3.7 + column) ** 2 : 0;
  return { x, y, signal, observation: signal + perturbation, outlier };
}
