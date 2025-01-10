import { Request, Response } from "express";
import CryptoPrice from "../models/cryptoPrice";
import { CryptoPriceType } from "../shared/types";

// query type
type StatsQuery = {
  coin?: string;
};
const validCoins = ["bitcoin", "matic-network", "ethereum"];

export const getStats = async (
  req: Request,
  res: Response
): Promise<CryptoPriceType | any> => {
  try {
    const { coin }: StatsQuery = req.query;
    if (!coin) {
      return res
        .status(400)
        .json({ success: false, message: "Coin Parameter is required" });
    }
    // validate coin token
    if (!validCoins.includes(coin)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Coin. Coin should be : bitcoin, matic-network, ethereum",
      });
    }

    // fetch the latest price data for the requested coin
    const latestPrice = await CryptoPrice.findOne(
      {
        coinId: coin,
      },
      {
        price: 1,
        marketCap: 1,
        dayChange: 1,
        _id: 0,
      },
      {
        sort: { createdAt: -1 },
      }
    );

    if (!latestPrice) {
      return res.status(404).json({
        success: false,
        message: "No data found for the particular coin",
      });
    }
    // returning the data in the required format of {price, marketCap, 24change}
    return res.status(200).json({
      price: latestPrice.price,
      marketCap: latestPrice.marketCap,
      "24change": latestPrice.dayChange,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
