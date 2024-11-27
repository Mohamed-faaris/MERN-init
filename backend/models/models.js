import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //also roll.no in clg ID
    phone: { type: String, required: true },
    batch: { type: Number, required: true }, 
    createdAt: { type: Date, default: () => new Date() },
    passwordHash: { type: String, required: true },
    groups:[{type:String,ref:"Group"}]
  },
  {
    _id: false,
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
    createdBy: { type: String, required: true,ref:"User"}
  },
  {
    versionKey: false,
  }
);

export const Task = new mongoose.model("Task", taskSchema);

export const userTaskState = mongoose.Schema(
  {
    Key: { type: mongoose.Schema.Types.ObjectId, required: true,ref:"Task" },
    lastModifiedAt: { type: Date, default: null },
    status: { type: Number, default: null },
  },
  {
    _id: false,
    versionKey: false,
  }
);

export const TaskState = new mongoose.model("TaskState", taskSchema);


export const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String }, 
    createdAt: { type: Date, default: () => new Date() },
    members: [{ type: String, ref: "User" }], 
  },
  {
    _id: false,
    versionKey: false,}
);

export const Group = mongoose.model("Group", groupSchema);

