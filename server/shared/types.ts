export enum CryptoCoin {
  BITCOIN = "bitcoin",
  MATIC = "matic-network",
  ETHEREUM = "ethereum",
}
export type CryptoPriceType = {
  _id: string;
  coinId: CryptoCoin;
  price: number;
  marketCap: number;
  dayChange: number;
  createdAt: Date;
  updatedAt: Date;
};
