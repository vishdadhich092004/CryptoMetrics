import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoConnect from "./db/db.connect";
import { startPriceUpdateJob } from "./services/updatePrices";
import routes from "./routes/routes";
import rateLimit from "express-rate-limit";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey from CryptoMetrics Backend");
});

const connectMongo = async () => {
  await mongoConnect(process.env.MONGO_URI as string);

  // start the first priceUpdateFunc
  await startPriceUpdateJob();
};
connectMongo();

// definig limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
// all routes
app.use("/api", apiLimiter, routes);

const port = process.env.PORT || 6060;
app.listen(port, () => {
  console.log("Server Runnign on Port : ", port);
});
