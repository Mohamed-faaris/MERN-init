import dotenv from 'dotenv'; 
import express from 'express';
import mongoose from 'mongoose';

dotenv.config({ path: './config/.env' }); 

const app = express();
app.use(express.json());

const mongoDatabaseURL = process.env.mongoDatabaseURL;
const SERVER_PORT = process.env.SERVER_PORT

const taskSchema = new mongoose.Schema({
  title:{type:String , required:true,unique:true} ,
  description:{type:String , required:true},
  priority:{type:Number,default:5},
  deadline:{type:Date}
})

const Task = new mongoose.model("Task",taskSchema);

const userTaskState=mongoose.Schema({
  Key:{type:Number,required:true},
  completedAt:{type:Date,default:null},
  seenAt:{type:Date,default:null},
  thrownToBinAt:{type:Boolean,default:false}
})
  

async function mongooseConnect() {
  try {
    await mongoose.connect(mongoDatabaseURL);
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

app.get("/", (req, res) => {
    res.send("connected");
  });

app.get("/getTasks", async (req, res) => {
  console.log("@getTask ");
  res.status(200).json(await Task.find().sort({createdAt:-1}));
});

app.post("/createTestTask", async(req, res) => {
  const task = new Task({
    title:`task id-${Math.floor(Math.random()*10000)}`,
    description:`test task created at ${new Date()}`,
  })
  try {
    await task.save()
    res.status(200).json({"status":"success","task":await Task.findOne().sort({ createdAt: -1 })});
  } catch (error) {
    res.status(400).json({"status":"failed","error" : error});
  }
});

app.post("/createTask", async(req, res) => {
  console.log("@createTask ");
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(200).json({"status":"success","task":await Task.findOne().sort({ createdAt: -1 })});
  } catch (error) {
    res.status(400).json({"status":"failed", ...error});
  }
});

app.put("/editTask", async(req, res) => {
  console.log("@editTask ");
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.body["_id"],req.body,{ new: true });
    res.status(200).json({"status":"success","task":await Task.findOne().sort({ createdAt: -1 })});
  } catch (error) {
    res.status(400).json({"status":"failed", ...error});
  }
});

app.listen(SERVER_PORT,async () => {
    console.log(`connecting to mongoDB....`);
    await mongooseConnect(); 
    console.log(`connected to mongoDB and server is running on http://localhost:${SERVER_PORT}`);
});
