import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectToDb from "./config/dbConnect";
import userRouter from "./Routes/userRoute";

const app = express();

config({ path: "./config/.env" });

connectToDb();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/chatApp", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port number ${port}`);
});
