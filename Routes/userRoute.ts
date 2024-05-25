import express from "express";
import { userRegister } from "../Controllers/userReg-Log";

const userRoute = express.Router();

userRoute.post("/register", userRegister);

export default userRoute;
