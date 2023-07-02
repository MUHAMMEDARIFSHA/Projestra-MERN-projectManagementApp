const mongoose = require('mongoose');

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
    default:"Indivitual"
  },
  end_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default : "incomplete",
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isblocked: {
    type: Boolean,
    default: false,
  },
  team_leads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
