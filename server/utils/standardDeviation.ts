type calculateStandardDeviationProps = {
  prices: number[];
};

export const calculateStandardDeviation = (prices: number[]): number => {
  // total length of prices being passed
  const len_prices = prices.length;

  // calculate mean
  const mean = prices.reduce((sum, price) => sum + price, 0) / len_prices;

  // calcluate sum of squared differences from mean
  const sumSquaredDiff = prices.reduce((sum, price) => {
    const diff = price - mean;
    return sum + Math.pow(diff, 2);
  }, 0);

  // calculating the variance and std. deviation
  const variance = sumSquaredDiff / len_prices;
  const standardDeviation = Math.sqrt(variance);

  // 6 decimal values becasue matric-network has very low std deviation
  return Number(standardDeviation.toFixed(6));
};
