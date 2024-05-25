import mongoose from "mongoose";
async function connectToDB() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://Thasleem:XlVGj7YGmCifJlZ2@cluster0.pvkgqgd.mongodb.net/ChatApp"
      )
      .then(() => {
        console.log("Connected to DataBase");
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
module.exports = connectToDB;
