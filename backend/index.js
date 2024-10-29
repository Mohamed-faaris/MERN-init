import dotenv from 'dotenv'; 
import express from 'express';
import mongoose from 'mongoose';

dotenv.config({ path: './config/.env' }); 

const mongoDatabaseURL = process.env.mongoDatabaseURL;
const SERVER_PORT = process.env.SERVER_PORT; 

async function mongooseConnect() {
  try {
    await mongoose.connect(mongoDatabaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}
const app = express();

app.get("/", (req, res) => {
    res.send("connected");
  });

app.get("/task", (req, res) => {
    res.status(200).send("connected");
  });

app.listen(SERVER_PORT,async () => {
    await mongooseConnect();  
    console.log(`server is running on http://localhost:${SERVER_PORT}`);
});
