import express from 'express';
import user from '../models/models.mjs';

const router  = express.Router()

router.get("/user",async(req,res)=>{
    res.send(await user.findOne(req.body.Id))
})

router.post("/user",async(req,res)=>{
    try {
        const newUser = user.insert(req.body);
        res.send({
            status:"OK",
            msg:newUser
        });
    } catch (error) {
        res.send({
            status:"NOT OK",
            msg:error
        });
    }
})


router.patch("/user",async(req,res)=>{
    try {
        const updatedUser = await user.findOneAndUpdate(
            { _id: req.body.Id},     
            { $set:req.body}, 
            { new: true }        
          );
        res.send({
            status:"OK",
            msg:updatedUser
        });
    } catch (error) {
        res.send({
            status:"NOT OK",
            msg:error
        });
    }
})

export default router