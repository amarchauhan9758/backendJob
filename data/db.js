// mongodb+srv://amarchauhan06232:<db_password>@cluster0.r2dcu.mongodb.net/

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB conne", conn.connection.host);
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

export default connectDB;
