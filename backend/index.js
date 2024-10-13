import express from "express"
import second from 'mongoose'

const app = express()
const PORT = 1000;


app.get("/",(req,res)=>{
    res.send("connected");
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})