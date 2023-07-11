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
    await user.save()
    console.log("project save");

    return res
      .status(200)
      .json({ success: true, message: "project created succesfully" });
  } catch (error) {}
};

const getProjects = async(req,res)=>{
  console.log('get projects')
  const email = req.email
  console.log(email)
   const user = await User.findOne({email:email})
  console.log(user._id)
  const projects = await Project.find({admin:user._id})
  console.log(projects);
  try{
    return res.status(200).json({success:true,projects:projects,message:"succesfully taken projects data"})
  }
  catch(error){
    return res.status(500).json({success:false,message:"some error occured"})
  }
}

const getProjectData = async(req,res)=>{
 console.log("get project data indivitual");
 console.log(req.body.projectId)
 const id = req.body.projectId
 try{
 const project = await Project.findById(id)
 return res.status(200).json({success:true,projectData:project, message:"project found succesfully"})
 }catch(error){
  return res.status(500).json({ success:false,message:"some error occured"})
 }
}

const addTask = async(req,res)=>{
  console.log("add task")
  // console.log(req.body.task)
  // console.log(req.body.projectId)
   const task = req.body.task
  const projectId = req.body.projectId
  const project = await Project.findById(projectId)
  console.log(project);
  try{
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
 const newTask = {
    taskname: task.taskname,
    description: task.description,
    status: task.status,
  };
  
  project.tasks.push(newTask);
  
  await project.save();

 return res.status(200).json({ success: true,projectData:project , message: 'Task added successfully' });
}catch(error){
  res.status(500).json({success:false,message:"some error occured"})
  }
  

}

const changeStatus= (req,res)=>{
  console.log("change status")
  console.log(req.body.taskData)
  
}

module.exports = {createProject,getProjects,getProjectData,addTask,changeStatus}
