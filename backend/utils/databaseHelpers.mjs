import mongoose from 'mongoose';

export const mongooseConnect = async(mongoDatabaseURL) => {
    try {
      await mongoose.connect(mongoDatabaseURL);
      console.log("connected to database!!!")
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }