import mongoose, { Schema } from "mongoose";
import { CryptoCoin, CryptoPriceType } from "../shared/types";

const cryptoPriceSchema = new Schema(
  {
    coinId: {
      type: String,
      required: true,
      enum: Object.values(CryptoCoin),
    },
    price: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    dayChange: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cryptoPriceSchema.index({ coinId: 1, createdAt: -1 });

const CryptoPrice = mongoose.model<CryptoPriceType>(
  "CryptoPrice",
  cryptoPriceSchema
);

export default CryptoPrice;
