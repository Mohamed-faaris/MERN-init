import { Router } from "express";
import { Group, Task, User } from "../models/models.mjs";
import { hashPassword } from "../utils/passwordHelpers.mjs";
import { roleIntToString, roleStringToInt } from "../utils/enumHelpers.mjs";
import { ensureAuthenticated } from "../utils/middlewareHelpers.mjs";

const router = Router();

router.post("/createDevUser", async (req, res) => {
  const user = new User({
    name: req.body.email,
    email: `${req.body.email}@test.com`,
    phone: 123456789,
    batch: 2023,
    role: roleStringToInt("dev"),
    passwordHash: hashPassword(req.body.password),
  });
  try {
    const stats = await user.save();
    res.status(200).send({ msg: "ok", user: stats });
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: err.message });
  }
});

router.post("/createUser", async (req, res) => {

  const user = new User({
    name: req.body.email,
    email: `${req.body.email}@test.com`,
    phone: 123456789,
    batch: 2023,
    role: roleStringToInt("dev"),
    groups: [req.body.group],
    passwordHash: hashPassword(req.body.password),
  });
  try {
    const group = await Group.findOneAndUpdate(
      { name: req.body.group },
      { $push: { members: `${req.body.email}@test.com` } },
      { upsert: true, new: true }
    );
    const stats = await user.save();
    res.status(200).send({ msg: "ok", user: [stats, group] });
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: err.message });
  }
});

router.post("/createTask", ensureAuthenticated, async (req, res) => {
  try {
    const task = await Task({
      title: req.body.title || "error title",
      description: req.body.description || "error description",
      createdBy: req.user.email,
    }).save();
    const group = await Group.findOneAndUpdate(
      { name: req.body.group },
      { $push: { taskKeys: task._id } },
      { new: true }
    );
    const taskStatePromises = group.members.map(async (member) => {
      return User.findOneAndUpdate(
        {email:req.body.email},
        {$push:{taskStates:{taskKey:task._id}}}
      )
    });
    await Promise.all(taskStatePromises);
    res.sendStatus(200)
  } catch (error) {
    res.send({ msg: [error],email:req.user.email }).status(400);
  }
});

router.post("/getTask", async (req, res) => {
  try {
    console.log("h");
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      throw new Error("User not found");
    }
    
    const taskStates = user.taskStates;
    
    console.log(user._id,await User.findById(user._id))
    const tasks = await Promise.all(
      taskStates.map(async (taskState) => {
        //console.log(taskState,await Task.findById("674a18761b21ccb64efed79b"))
        return await Task.findById(taskState);
      })
    );

    console.log(taskStates,tasks);

    res.status(200).send({ email: req.body.email, tasks: tasks });
    
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});

export default router;
