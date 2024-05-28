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
  }
});

const user = mongoose.model("Users", userSchema);
export default user;
