const validCoins = ["bitcoin", "matic-network", "ethereum"];
interface ValidateCoinResponse {
  isValid: boolean;
  error?: string;
}
export const validateCoin = (coin: unknown): ValidateCoinResponse => {
  // check if coin parameter exists
  if (!coin) {
    return {
      isValid: false,
      error: "Coin Parameter is missing",
    };
  }
  // check if coin is valid
  if (!validCoins.includes(coin as string)) {
    return {
      isValid: false,
      error: `Invalid Coin, Must be ${validCoins.join(", ")}`,
    };
  }
  return { isValid: true };
};
