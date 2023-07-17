const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  taskname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed", "to-do"],
    default: "to-do",
  },
});

const projectSchema = new mongoose.Schema({
  projectname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "Indivitual",
  },
  end_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "incomplete",
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isblocked: {
    type: Boolean,
    default: false,
  },
  team_leads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
 
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      email: {
        type: String,
      },
    },
  ],
  tasks: [taskSchema],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;


