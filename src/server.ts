import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import dotenv from "dotenv";

const PORT = 5000;
dotenv.config();

let server: Server;

async function main() {
  try {
    const db_url: string = process.env.MONGODB_URL!;

    if (!db_url) {
      throw new Error("DB Url is unavailable or undefined");
    }
    await mongoose.connect(db_url);
    console.log("connected to mongodb using mongoose.");

    server = app.listen(PORT, () => {
      console.log(`Server is running on  ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
