import { Router } from "express";
import passport from "passport";



const router =  Router();

router.post('/login',passport.authenticate("local"),(req,res)=>{
    res.send("ok").status(200);
})

router.post("/status", (request, response) => {
	return request.user ? response.send(request.user) : response.sendStatus(401);
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(400).send({ msg: err.message });
        }
        res.sendStatus(200); });
});



export default router