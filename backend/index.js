import dotenv from 'dotenv'; 
import express from 'express';
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

//user defined modules
import { mongooseConnect } from './utils/databaseHelpers';



dotenv.config({ path: './config/.env' }); 

//environment constants
const mongoDatabaseURL = process.env.mongoDatabaseURL;
const SERVER_PORT = process.env.SERVER_PORT
const SECRET = process.env.SECRET || "default_secret";

const app = express();

//middlewares
app.use(express.json());

app.use(app.use(
  session({
    secret:SECRET,
    saveUninitialized: false,
    resave: false, 
    cookie: {
      maxAge: 60000 * 60, // 1 hour
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(), // Reuse existing Mongoose client
    }),
  })
));

app.use(passport.initialize())
app.use(passport.session())



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
    res.status(200).json({"status":"success","task":await Task.findOne().sort({ _id: -1 })});
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
    await mongooseConnect(mongoDatabaseURL) 
    console.log(`connected to mongoDB and server is running on http://localhost:${SERVER_PORT}`);
});
