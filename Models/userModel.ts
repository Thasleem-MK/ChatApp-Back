import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});
module.exports = mongoose.model("Users", userSchema);
