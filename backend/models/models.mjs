import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //also roll.no in clg ID
    phone: { type: String, required: true },
    batch: { type: Number, required: true },
    lastLogin: { type: Date, default:null },
    passwordHash: { type: String, required: true },
    role: { type: Number, required: true },
    groups: [{ type: String, ref: "Group" }],
    taskStates:[{type: mongoose.Types.ObjectId, ref: "TaskState"}]
  },
  {
    versionKey: false,
  }
);

userSchema.index({ email: 1 });

export const User = new mongoose.model("user", userSchema);

export const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, default: 5 },
    deadline: { type: Date, default: null },
    createdBy: { type: String, required: true, ref: "User" },
  },
  {
    versionKey: false
  }
);

export const Task = new mongoose.model("Task", taskSchema);

export const userTaskState = mongoose.Schema(
  {
    taskKey: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Task" },
    lastModifiedAt: { type: Date, default: null },
    status: { type: Number, default: null },
  },
  {
    versionKey: false
  }
);

export const TaskState = new mongoose.model("TaskState", taskSchema);

export const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: () => new Date() },
    taskKeys: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Task" },
    members: [{ type: String, ref: "User" }],
    moderators: [{ type: String, ref: "User" }],
  },
  {
    versionKey: false,
  }
);

export const Group = mongoose.model("Group", groupSchema);
