import { Router } from "express";
import auth from "./auth.mjs";
import tests from "./tests.mjs"
import task from "./task.mjs"

const router = Router();

router.use("/auth",auth)
router.use("/tests",tests)
router.use("/task",task)

router.post("/",(req,res)=>res.send("hello"))

export default router;
