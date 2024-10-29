import dotenv from 'dotenv'; 
import express from 'express';
import mongoose from 'mongoose';

dotenv.config({ path: './config/.env' }); 

const mongoDatabaseURL = process.env.mongoDatabaseURL;
const SERVER_PORT = process.env.SERVER_PORT

const taskSchema = new mongoose.Schema({
  key:{type:Number,default:()=>{Math.floor(Math.random()*100000)},index:true},
  title:{type:String , required:true} ,
  description:{type:String , required:true},
  priority:{type:Number,default:5},
  deadline:{type:Date},
  createdAt:{type:Date,default:()=>{new Date()},index:true}
})

const userTaskState=mongoose.Schema({
  Key:{type:Number,required:true},
  completedAt:{type:Date,default:null},
  seenAt:{type:Date,default:null},
  thrownToBinAt:{type:Boolean,default:false}
})
  

async function mongooseConnect() {
  try {
    await mongoose.connect(mongoDatabaseURL);
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
