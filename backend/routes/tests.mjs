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
    const stats = await user.save();
    const group = await Group.findOneAndUpdate(
      { name: req.body.group },
      { $push: { members: `${req.body.email}@test.com` } },
      { upsert: true, new: true }
    );
    res.status(200).send({ msg: "ok", user: [stats, group] });
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: err.message });
  }
});

router.post("/createTask", async (req, res) => {
  try {
    const task = await Task({
      title: req.body.title || "error title",
      description: req.body.description || "error description",
      createdBy: "test",
    }).save();
    const group = await Group.findOneAndUpdate(
      { name: req.body.group },
      { $push: { taskKeys: task._id } },
      { new: true }
    );
    console.log(group)
    const taskStatePromises = group.members.map(async (member) => {
      console.log(member)
      return User.findOneAndUpdate(
        {email:member},
        {$push:{taskStates:{taskKey:task._id}}}
      )
    });
    await Promise.all(taskStatePromises);
    res.send("task created").status(200);
  } catch (error) {
    console.log(error);
    res.send({ 
      msg: error.message || "An error occurred while creating the task", 
      email: req.user.email 
  }).status(400);
  }
});

router.post("/getTask", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User not found");
    }

    const tasks = await Promise.all(
      user.taskStates.map(async (taskState) => {
        return await Task.findById(taskState.taskKey); 
      })
    );
    
    res.status(200).send({ email: req.body.email, tasks: tasks });

  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message || "An error occurred while retrieving tasks." });
  }
});



export default router;
