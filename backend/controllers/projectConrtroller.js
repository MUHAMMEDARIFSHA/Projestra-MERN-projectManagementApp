const Project = require("../models/projectSchema");
const User = require("../models/userSchema");

const createProject = async (req, res) => {
  console.log("create project");
  const projectData = req.body.projectData;
  const userEmail = req.email;
  const user = await User.findOne({ email: userEmail });
  console.log(projectData, userEmail);
  const { projectname, type, startdate, enddate, description, teamlead } =
    req.body.projectData;
  try {
    const newProject = await new Project({
      projectname: projectname,
      type: type,
      description: description,
      start_date: startdate,
      end_date: enddate,
      admin: user._id,
    }).save();
    const projectId = await newProject._id;
    user.projects.push({ projectId });
    await user.save();
    console.log("project save");

    return res
      .status(200)
      .json({ success: true, message: "project created succesfully" });
  } catch (error) {}
};

const getProjects = async (req, res) => {
  console.log("get projects");
  const email = req.email;
  console.log(email);
  const user = await User.findOne({ email: email });
  console.log(user._id);
  const projects = await Project.find({ admin: user._id });
  console.log(projects);
  try {
    return res.status(200).json({
      success: true,
      projects: projects,
      message: "succesfully taken projects data",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "some error occured" });
  }
};

const getProjectData = async (req, res) => {
  console.log("get project data indivitual");
  console.log(req.body.projectId);
  const id = req.body.projectId;
  try {
    const project = await Project.findById(id);
    return res.status(200).json({
      success: true,
      projectData: project,
      message: "project found succesfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "some error occured" });
  }
};

const addTask = async (req, res) => {
  console.log("add task");
  // console.log(req.body.task)
  // console.log(req.body.projectId)
  const task = req.body.task;
  const projectId = req.body.projectId;
  const project = await Project.findById(projectId);
  console.log(project);
  try {
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    const newTask = {
      taskname: task.taskname,
      description: task.description,
      status: task.status,
    };

    project.tasks.push(newTask);

    await project.save();

    return res.status(200).json({
      success: true,
      projectData: project,
      message: "Task added successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "some error occured" });
  }
};

const changeStatus = async (req, res) => {
  console.log("change status");
  console.log(req.body.taskData);
  const taskData = req.body.taskData;
  const projectId = req.body.projectId;
  const project = await Project.findById(projectId);
  console.log(project + "project");
  project.tasks = taskData;
  try {
    await project.save();
    res.status(200).json({
      success: true,
      projectData: project,
      message: "task updated succesfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "" });
  }
};

// group project fuctions starts
// group project

const getGroupProjectData = async (req, res) => {
  console.log("get group project data");
  const id = req.body.projectId;
  const userEmail = req.email;
  console.log(id);
  try {
    const project = await Project.findById(id);
    const users = await User.find({
      email: { $ne: userEmail },
      isBlocked: false,
    });
    console.log(users + " users");
    console.log(project);
    if (project) {
      return res
        .status(200)
        .json({
          success: true,
          projectData: project,
          usersData: users,
          message: "project found succesfully",
        });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "project not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "some error occured" });
  }
};

const addMember = async (req, res) => {
  console.log("add member");
  const user = req.body.user;
  const projectId = req.body.projectId;
  console.log(user.email, projectId);
  const project = await Project.findById(projectId);
  try {
    if (project) {
      const member = { user: user._id, email: user.email };
      project.members.push(member);
      await project.save();
      return res
        .status(200)
        .json({ message: "member added succesfully", projectData: project });
    }
  } catch (error) {}
};

const removeMember = async (req, res) => {
  console.log("remove member");
  console.log(req.body.projectId);
  console.log(req.body.memberId);
  const projectId = req.body.projectId;
  const project = await Project.findById(projectId);
  const memberData = await User.findById(req.body.memberId);
  try {
    if (project) {
      const member = { user: memberData._id, email: memberData.email };
      const indexToRemove = project.members.findIndex(
        (existingMember) =>
          existingMember.user.toString() === member.user.toString() &&
          existingMember.email === member.email
      );
      if (indexToRemove !== -1) {
        project.members.splice(indexToRemove, 1);
        await project.save();
        return res
          .status(200)
          .json({
            success: true,
            projectData: project,
            message: "member remove succesfully",
          });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "project not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "some internal server error occured" });
  }
};

const addMemberToGroup = async (req, res) => {
  console.log("add member to group ");
  const projectId = req.body.projectId;
  const task = req.body.task;
  const members = req.body.members;

  console.log(projectId, task, members);
  try {
    const project = await Project.findById(projectId);
    const membersToAdd = members.map((user) => ({
      user: user._id,
      email: user.email,
    }));
    console.log(membersToAdd);
    
    // Now push the new members to the project.members array
    // project.members.push(...membersToAdd);
    const newTask = {
      taskname: task.taskname,
      description: task.description,
      members : membersToAdd,
      start_date : task.startdate,
      end_date : task.enddate
    };
    console.log(newTask);
   project.tasks.push(newTask);
   await project.save();
    return res.status(200).json({success:true,projectData:project, message:"task added succesfully in group projecct"})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "some server related error occured" });
  }
};

const editGroupTask = async(req,res)=>{
  console.log("edit group task");
   const task = req.body.task
   const members = req.body.members
   console.log(task  , members);
   const projectId = req.body.projectId
   const taskId = task._id
   console.log(taskId);
   try{
    const project = await Project.findById(projectId)
    if(project){
      const existingTaskIndex = project.tasks.findIndex((t) => t._id.toString() === taskId);
    if (existingTaskIndex !== -1) {
      project.tasks[existingTaskIndex] = task;
     project.tasks[existingTaskIndex].members = members;
      await project.save();
      return res.status(200).json({success:true,message:"task updated succesfully",projectData:project})
   }}
  else{
    return res.status(404).json({success:false,message:"project not found"})
  }}
 catch(error){
  return res.status(500).json({success:false,message :"some error occured in server",error:error})
 }
}

const GroupTaskChangeStatus = async(req,res)=>{
  console.log("change status of task in group project")
   const task = req.body.task
   const projectId = req.body.projectId
   const status = req.body.status
   console.log("status ===" + status );
}
module.exports = {
  createProject,
  getProjects,
  getProjectData,
  addTask,
  changeStatus,
  getGroupProjectData,
  addMember,
  removeMember,
  addMemberToGroup,
  editGroupTask,
  GroupTaskChangeStatus
};
