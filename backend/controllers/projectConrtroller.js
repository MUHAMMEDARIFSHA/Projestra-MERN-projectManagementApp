const Project = require("../models/projectSchema");
const User = require("../models/userSchema");
const Chat = require('../models/chatSchema')


const createProject = async (req, res) => {
  console.log("create project");
  const projectData = req.body.projectData;
  const userEmail = req.email;
  const user = await User.findOne({ email: userEmail });
  console.log(projectData, userEmail);
  const { projectname, type, startdate, enddate, description, teamlead } =
    req.body.projectData;


  try {
    console.log(projectname)
    if(type === 'Group'){
      console.log(" it is a group project we want to create a chat")
      var groupChat = await Chat.create({
        chatName: projectname,
        isGroupChat: true,
        groupAdmin: user._id,
        users: [user._id]
      });
}
  console.log("chat created");

    const newProject = await new Project({
     projectname: projectname,
      type: type,
      description: description,
      start_date: startdate,
      end_date: enddate,
      admin: user._id,
      chatId: groupChat ? groupChat._id : undefined 
    }).save();
    console.log(newProject);
    console.log("project saved first");
    if (groupChat && groupChat.groupId === newProject._id) {
      console.log(groupChat);
      await groupChat.save();
    }
    
   const projectId =  newProject._id;
   await User.findByIdAndUpdate({_id:user._id},{$push:{projects:projectId}})
  
    console.log("project save");

    return res
      .status(200)
      .json({ success: true, message: "project created succesfully" });
  } catch (error) {
    return res.status(500)
  }
};

const getProjects = async (req, res) => {
  console.log("get projects");
  const email = req.email;
  console.log(email);
  const user = await User.findOne({ email: email });
  console.log(user._id);
  const projects = await Project.find({ admin: user._id });
  const memberProjects = await Project.find({
    "members": {
      $elemMatch: {
        "user": { $in: user._id },
      },
    },
  })
  console.log(projects);
  console.log(memberProjects + "     member Projects")
  try {
    return res.status(200).json({
      success: true,
      projects: projects,
      memberProjects,
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
    // console.log(users + " users");
    // console.log(project);
    if (project) {
      return res.status(200).json({
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
  console.log("add member to group (not task)");
  const userData = req.body.user;
  const projectId = req.body.projectId;
  console.log(userData.email, projectId);

  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(userData._id)
     console.log(user +" it is the user to add in the group task");
     const chatId = project.chatId
     let chat = await Chat.findById(chatId)
     try {
      chat.users.push(user._id)
      chat.save()
     } catch (error) {
      console.log(error)
     }
     
    if (project) {
      await User.findByIdAndUpdate({_id:user._id},{$push:{memberProjects:{projectId:projectId}}})
      const member = { user: userData._id, email: userData.email };
      project.members.push(member);
      await project.save();
      return res
        .status(200)
        .json({ message: "member added succesfully", projectData: project });
    }
  } catch (error) {
  return res.status(500).json({success:false,message:"some error occured in the server",error:error})
  }
};

const removeMember = async (req, res) => {
  console.log("remove member");
  console.log(req.body.projectId);
  console.log(req.body.memberId);
  const projectId = req.body.projectId;

  try {
    const project = await Project.findById(projectId);
    const memberData = await User.findById(req.body.memberId);
      const indexOfProject = memberData.memberProjects.findIndex((p)=>p.projectId.toString() === projectId.toString()) 
      console.log(indexOfProject +"   index of project");
      if(indexOfProject !== -1){
        memberData.memberProjects.splice(indexOfProject,1)
        await memberData.save()
      }
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
        return res.status(200).json({
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
  console.log("add member to group task ");
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
      members: membersToAdd,
      start_date: task.startdate,
      end_date: task.enddate,
    };
    console.log(newTask);
    project.tasks.push(newTask);
    await project.save();
    return res
      .status(200)
      .json({
        success: true,
        projectData: project,
        message: "task added succesfully in group project",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "some server related error occured" });
  }
};

const editGroupTask = async (req, res) => {
  console.log("edit group task");
  const task = req.body.task;
  const members = req.body.members;
  console.log(task, members);
  const projectId = req.body.projectId;
  const taskId = task._id;
  console.log(taskId);
  try {
    const project = await Project.findById(projectId);
    if (project) {
      const existingTaskIndex = project.tasks.findIndex((t) => t._id.toString() === taskId
      );
      const emailArr = []
     
     
      if (existingTaskIndex !== -1) {
        project.tasks[existingTaskIndex] = task;
         await members?.map((member)=>  project.tasks[existingTaskIndex].members.push({user:member._id,email:member.email}))
      
        await project.save();
        return res
          .status(200)
          .json({
            success: true,
            message: "task updated succesfully",
            projectData: project,
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
      .json({
        success: false,
        message: "some error occured in server",
        error: error,
      });
  }
};

const GroupTaskChangeStatus = async (req, res) => {
  console.log("change status of task in group project");
  const task = req.body.task;
  const projectId = req.body.projectId;
  const newStatus = req.body.status;
  const taskId = task._id;
  console.log("status ===" + newStatus);
  try {
    const project = await Project.findById(projectId);
    if (project) {
      const existingTaskIndex = project.tasks.findIndex(
        (t) => t._id.toString() === taskId
      );
      console.log("existing task " + existingTaskIndex);
      if (existingTaskIndex !== -1) {
        project.tasks[existingTaskIndex].status = newStatus.toString();
        await project.save();
        return res
          .status(200)
          .json({
            success: true,
            message: "task state updated succesfully",
            task: project.tasks[existingTaskIndex],
            projectData: project,
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
      .json({
        success: false,
        message: "some server error occured",
        error: error,
      });
  }
};

const removeMemberGroupTask = async (req, res) => {
  console.log("remove member from task");
  const memberId = req.body.memberId;
  const projectId = req.body.projectId;
  const task = req.body.task;
  const taskId = task._id;
  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(memberId);
    console.log(project + user);
    if (project) {
      const existingTaskIndex = project.tasks.findIndex(
        (t) => t._id.toString() === taskId
      );
      console.log("members=== " + project.tasks[existingTaskIndex].members);
      const indexOfMember =  project.tasks[existingTaskIndex].members.findIndex((m) => m.email === user.email);
      console.log(
        "member to remove===" + indexOfMember+
          project.tasks[existingTaskIndex].members[indexOfMember]
      );
      if (indexOfMember !== -1) {
        console.log("inside !== -1");
        project.tasks[existingTaskIndex].members.splice(indexOfMember, 1);
       await project.save();
        return res
          .status(200)
          .json({
            success: true,
            projectData: project,
            task: project.tasks,
            message: "remove a member from the task",
          });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "project not fournd" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "some server error occured",
        error: error,
      });
  }
};
const changeStatusOfMember = async(req,res)=>{
  console.log('change status of the member')
  console.log(req.body.projectId);
  console.log(req.body.task );
  console.log(req.body.status  +"  status");
  const projectId = req.body.projectId
  const memberEmail = req.email
  const task = req.body.task
  const taskId = task._id
  const status = req.body.status
  try{
     const project  =  await Project.findById(projectId)
     console.log(project +"  project");
     console.log(task._id +"   task id 1")
    //  const toChangeTask = project.tasks.filter((t)=>t.id === task.id)
    const indexOftask = project.tasks.findIndex((task) => task._id.toString() === taskId);
     console.log( " task to change ===   " + project.tasks[indexOftask].members.find((m)=>m.email ===memberEmail).status  +" change task");
     project.tasks[indexOftask].members.find((m)=>m.email ===memberEmail).status = status
     await project.save()
     res.status(200).json({success:true,message :"member status updated succesfully",projectData:project})
  }catch(error){
    return res.status(500).json({success:false,message:"some server error occured",error:error})
  }
}
const deleteProject =async (req,res)=>{
  console.log('delete project');
  const projectId = req.body.projectId
  console.log(projectId);
  try {
  const project=  await Project.findById(projectId)
    console.log(project);
    await Project.deleteOne({_id:projectId})
    return res.status(200).json({message:'project deleted'})
  } catch (error) {
    return res.status(500).json({message:"some server error occures"})
  }
}

const changeStatusOfProject = async(req,res)=>{
  console.log('change status of project')
  const newStatus = req.body.status
  const projectId = req.body.projectId
  console.log(newStatus , projectId);
  try {
    await Project.updateOne({_id:projectId},{$set:{status:newStatus}})
    const project = await Project.findById(projectId)
    return res.status(200).json({success:true, projectData:project,message:"project status changed"})
  } catch (error) {
    return res.status(500).json({message:"some internal server error"})
  }
  
}

const deleteTask = async(req,res)=>{
  console.log('delete task')
  const projectId = req.body.projectId
  const taskId = req.body.taskId
  console.log(projectId , taskId);

  try {
    const project = await Project.findById(projectId);
    if (project) {
      const existingTaskIndex = project.tasks.findIndex(
        (t) => t._id.toString() === taskId
      );
    
      if (existingTaskIndex !== -1) {
        // Task exists in the array, remove it
        project.tasks.splice(existingTaskIndex, 1);
        await project.save();
        return res.status(200).json({message:"task deleted succesfully",projectData : project})
    }}
    else{
      console.log('task not found');
    }
  } catch (error) {
    
  }
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
  GroupTaskChangeStatus,
  removeMemberGroupTask,
  changeStatusOfMember,
  deleteProject,
  changeStatusOfProject,
  deleteTask
};
