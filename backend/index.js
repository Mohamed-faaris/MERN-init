import express from "express"
import mongoose from 'mongoose'

import mongoDatabaseURL from "../config/.env"

mongoose.connect(mongoDatabaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.error('Connection failed:', error));


const app = express()
const PORT = 1000;

app.get("/",(req,res)=>{
    res.send("connected");
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})
