import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey from CryptoMetrics Backend");
});

const port = process.env.PORT || 6060;
app.listen(port, () => {
  console.log("Server Runnign on Port : ", port);
});
