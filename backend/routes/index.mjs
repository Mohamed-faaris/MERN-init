import { Router } from "express";
import auth from "./auth.mjs";
import tests from "./tests.mjs"

const router = Router();

router.use("/auth",auth)
router.use("/tests",tests)

router.post("/",(req,res)=>res.send("hello"))

export default router;
