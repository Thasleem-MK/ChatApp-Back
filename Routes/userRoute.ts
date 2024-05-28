import express from "express";
import { otpVarification, userRegister } from "../Controllers/userReg-Log";

const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/otp", otpVarification);

export default userRoute;
