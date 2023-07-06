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

module.exports = {createProject,getProjects}
