import { TrashIcon } from "lucide-react";
import Sidebar,{SidebarItem} from "../customItems/Sidebar";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { CalendarToday, Dashboard, NoteAdd,Groups3} from "@mui/icons-material";
import Groups3Icon from '@mui/icons-material/Groups3';

function GroupSideBar() {
  const navigate = useNavigate()
  const toAddMember = ()=>{
    console.log("hi ");
   navigate('/user/project/addmenber')
  }
  return (
    <Sidebar>
    <SidebarItem icon={<Dashboard size={20}/>} text="Project"/>
    <SidebarItem icon={<CalendarToday size={20}/>} text="Calendar"/>
    <SidebarItem OnClick={toAddMember} icon = {<Groups3Icon size={20}/>}   text = "Add members" />
    <SidebarItem icon={<TrashIcon size={20}/>} text="Trash"/>
    <SidebarItem icon={<NoteAdd size={20}/>} text="Quick Notes"/>
    {/* <SidebarItem icon={<BarChart3 size={20}/>} text="Project"/> */}
 
</Sidebar>
  )
}

export default GroupSideBar
