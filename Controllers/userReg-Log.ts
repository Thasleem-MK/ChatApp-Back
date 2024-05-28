import { Request, Response } from "express";
import Joi from "joi";
import nodemailer from "nodemailer";
import user from "../Models/userModel";

const joiSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().required().email().lowercase().messages({
    "string.email": "Email must be a valid email address",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Phone number is required",
    "string.empty": "Phone number cannot be empty",
  }),
});

let RegisterDetails: { name: string; email: string; phone: string };
let otp: number;

export const userRegister = async (req: Request, res: Response) => {
  const { error, value } = joiSchema.validate(req.body);
  RegisterDetails = value;
  otp = Math.floor(Math.random() * 1000000);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  let mailOptions = {
    from: process.env.email,
    to: value.email,
    subject: "Varification otp from ChatApp",
    text: `${otp} is your ChatApp varification code`,  
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error sending OTP email" });
  }
};

export const otpVarification = async (req: Request, res: Response) => {
  const { OTP }: { OTP: string } = req.body;
  if (otp.toString() !== OTP) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }
  try {
    const newUser = new user({
      name: RegisterDetails.name,
      email: RegisterDetails.email,
      phone: RegisterDetails.phone,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
