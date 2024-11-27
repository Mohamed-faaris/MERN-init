import dotenv from 'dotenv'; 
import express from 'express';
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from 'mongoose';  

//user defined modules
import { mongooseConnect } from './utils/databaseHelpers.mjs';
import router from './routes/index.mjs';
import "./strategies/LocalStrategy.mjs"



dotenv.config({ path: './config/.env' }); 

//environment constants
const MONGO_DATABASE_URL = process.env.MONGO_DATABASE_URL;
const SERVER_PORT = process.env.SERVER_PORT
const SECRET = process.env.SECRET || "default_secret";

const app = express();
await mongooseConnect(MONGO_DATABASE_URL) 

//middlewares
app.use(express.json());
app.use(
  session({
    secret:SECRET,
    saveUninitialized: false,
    resave: false, 
    cookie: {
      maxAge: 60000 * 60, // 1 hour
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(), 
    }),
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.use('/api',router)

app.listen(SERVER_PORT,async () => {
    console.log(`connecting to mongoDB....`);
    console.log(`connected to mongoDB and server is running on http://localhost:${SERVER_PORT}`);
});
