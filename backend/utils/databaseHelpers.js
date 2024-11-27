import mongoose from 'mongoose';

export const mongooseConnect = async(mongoDatabaseURL) => {
    try {
      await mongoose.connect(mongoDatabaseURL);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }