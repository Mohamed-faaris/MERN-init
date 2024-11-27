import { Router } from "express";
import passport from "passport";



const router =  Router();

router.post("/",(req,res)=>{res.send("hello, auth").status(200);})

router.post('/login',passport.authenticate("local"),(req,res)=>{
    res.send("ok").status(200);
})



export default router