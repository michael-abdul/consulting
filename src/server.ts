import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import mongoose from "mongoose";
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection successfully");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function () {
      console.log(`The server run on port: ${PORT}`);
    });
  })
  .catch((err) => console.log("Error on connection MongoDB", err));
