import { Request, Response } from "express";
import CryptoPrice from "../models/cryptoPrice";
import { validateCoin } from "../helpers/validateCoin";
import { calculateStandardDeviation } from "../utils/standardDeviation";

type DeviationQuery = {
  coin?: string;
};

interface getDeviationResponse {
  deviation: string;
  success?: boolean;
  error?: string;
}
export const getDeviation = async (
  req: Request,
  res: Response
): Promise<getDeviationResponse | any> => {
  try {
    const { coin }: DeviationQuery = req.query;
    const validation = validateCoin(req.query.coin);

    // validate the coin
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    // returning the last 100 price records of a coin
    const priceRecords = await CryptoPrice.find(
      {
        coinId: coin,
      },
      {
        price: 1,
        _id: 0,
      },
      {
        sort: { createdAt: -1 },
        limit: 100,
      }
    );

    // if no data exists
    if (priceRecords.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No Data found for specified coin" });
    }

    // extracting the price only from the records
    const prices = priceRecords.map((record) => record.price);

    const deviation = calculateStandardDeviation(prices);

    return res.status(200).json({ deviation });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
