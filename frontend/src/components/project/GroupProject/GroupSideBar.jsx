import { TrashIcon } from "lucide-react";
import Sidebar,{SidebarItem} from "../customItems/Sidebar";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { CalendarToday, Dashboard,FormatListBulleted,Assignment, Grading, NoteAdd,Groups3} from "@mui/icons-material";
import Groups3Icon from '@mui/icons-material/Groups3';


function GroupSideBar() {
  const navigate = useNavigate()
  
  const toAddMember = () => {
    console.log('Navigate to Add Members page');
    const Id = new URLSearchParams(location.search).get("id");
        console.log(Id + " project Id");
    navigate(`/user/project/addmembers?id=${Id}`);
  };
  const toDashboard = () => {
    console.log('Navigate to Project page');
    const Id = new URLSearchParams(location.search).get("id");
        console.log(Id + " project Id");
    navigate(`/user/groupproject?id=${Id}`);
    // Navigate to the project page logic
  };
  const toProject = ()=>{
    console.log("to project");
    const Id = new URLSearchParams(location.search).get("id");
        console.log(Id + " project Id");
        navigate(`/user/groupproject/project?id=${Id}`)
  }
  const toOngoing = ()=>{
    console.log("to ongoing");
    const Id = new URLSearchParams(location.search).get("id");
        console.log(Id + " project Id");
        navigate(`/user/groupproject/ongoing?id=${Id}`)
  }
  const toCompleted = ()=>{
    console.log("to completed");
    const Id = new URLSearchParams(location.search).get("id");
        console.log(Id + " project Id");
        navigate(`/user/groupproject/completed?id=${Id}`)
  }
  
  const toCalendar = () => {
    console.log('Navigate to Calendar page');
    // Navigate to the calendar page logic
  };
  return (
    <Sidebar>
    <SidebarItem onClick={toDashboard} icon={<Dashboard size={20}/>} text="Dashboard"/>
    <SidebarItem onClick={toProject} icon={<Assignment size={20}/>} text={"Project"}/>
    <SidebarItem onClick={toOngoing} icon={<FormatListBulleted size={20}/>} text={"Ongoing"}/>
    <SidebarItem onClick={toCompleted} icon={< Grading size={20}/>} text={"Completed"}/>
    <SidebarItem onClick={toCalendar} icon={<CalendarToday size={20}/>} text="Calendar"/>
    <SidebarItem  onClick={toAddMember} icon = {<Groups3Icon size={20}/>}   text = "Add members" />
    {/* <SidebarItem o icon={<TrashIcon size={20}/>} text="Trash"/> */}
    {/* <SidebarItem icon={<NoteAdd size={20}/>} text="Quick Notes"/> */}
    {/* <SidebarItem icon={<BarChart3 size={20}/>} text="Project"/> */}
 
</Sidebar>
  )
}

export default GroupSideBar
