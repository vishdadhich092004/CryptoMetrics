import mongoose from "mongoose";

const mongoConnect = async (mongoUri: string) => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Mongo DB connected");
    })
    .catch((e) => {
      console.log("Mongo Connection Failed", e);
    });
};

export default mongoConnect;
