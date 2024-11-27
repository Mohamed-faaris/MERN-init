import { Router } from "express";
import { User } from "../models/models.mjs";
import { hashPassword } from "../utils/passwordHelpers.mjs";
import { statusStringToInt } from "../utils/enumHelpers.mjs";


const router  = Router()

router.post("/createDevUser",async (req,res)=>{
    console.log("hello test")
    console.log(req.body)
    const user = new User({
        name: req.body.email,
        email: `${req.body.email}@test.com`, 
        phone: 123456789,
        batch: 2023, 
        role: statusStringToInt("dev"),
        passwordHash: hashPassword(req.body.password),
    })
    try{
        const stats = await user.save()
        res.status(200).send({msg:"ok",user:stats})
    }
    catch(err){
        console.error(err)
        res.status(400).send({msg:err.message})
    }
    
})

export default router