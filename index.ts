import express from "express";
import { configDotenv } from "dotenv";
const cors = require("cors");
const connectToDb = require("./config/dbConnect");

const app = express();

configDotenv({ path: "./config/.env" });

connectToDb();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.listen(process.env.port, () => {
  console.log(`Server running in port number ${process.env.port}`);
});
