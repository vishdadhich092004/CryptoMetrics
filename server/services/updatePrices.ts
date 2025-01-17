import CryptoPrice from "../models/cryptoPrice";
import cron from "node-cron";
import { CryptoPriceType } from "../shared/types";

const COINS = ["bitcoin", "matic-network", "ethereum"];
const coinGeckoUrl = process.env.COIN_GECKO_URL as string;

export const fetchCryptoData = async (): Promise<CryptoPriceType[] | any> => {
  try {
    const coinsString = COINS.join(",");

    const url = new URL(`${coinGeckoUrl}/simple/price`);
    // adding the required search Params
    url.searchParams.append("ids", coinsString);
    url.searchParams.append("vs_currencies", "usd");
    url.searchParams.append("include_market_cap", "true");
    url.searchParams.append("include_24hr_change", "true");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`API Request failed , ${response.statusText}`);
    }

    const savePromises = COINS.map(async (coinId: string) => {
      const coinData = data[coinId];

      const priceData = {
        coinId,
        price: coinData.usd,
        marketCap: coinData.usd_market_cap,
        dayChange: coinData.usd_24h_change,
      };
      const cryptoPrice = new CryptoPrice(priceData);
      await cryptoPrice.save();
    });
    await Promise.all(savePromises);

    console.log(
      `[${new Date().toISOString()}] Successfully updated the prices for all coins`
    );
  } catch (e) {
    console.error(e);
  }
};

export const startPriceUpdateJob = async () => {
  // for the first implementation
  await fetchCryptoData();
  // calls the fetchCrypto after every 2 hours
  cron.schedule(" 0 */2 * * *", async () => {
    console.log(`[${new Date().toISOString()}] : Starting Price Update Job`);
    await fetchCryptoData();
  });
};
