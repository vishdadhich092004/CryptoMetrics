import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoConnect from "./db/db.connect";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey from CryptoMetrics Backend");
});

const connectMongo = async () => {
  await mongoConnect(process.env.MONGO_URI as string);
};
connectMongo();

const port = process.env.PORT || 6060;
app.listen(port, () => {
  console.log("Server Runnign on Port : ", port);
});
