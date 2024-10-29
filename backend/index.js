import express from "express"
import mongoose from 'mongoose'

import {SERVER_PORT,mongoDatabaseURL} from "../config/.env"

mongoose.connect(mongoDatabaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.error('Connection failed:', error));


const app = express()

app.get("/",(req,res)=>{
    res.send("connected");
})

app.listen(SERVER_PORT,()=>{
    console.log(`server is running on http://localhost:${SERVER_PORT}`)
})
