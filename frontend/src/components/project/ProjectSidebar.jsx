import { BarChart3, Trash, Trash2 } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { NoteAdd} from "@mui/icons-material";

import React from 'react'

function ProjectSidebar() {
  return (
    <Sidebar>
    <SidebarItem icon={<BarChart3 size={20}/>} text="Project"/>
    <SidebarItem icon={<Trash size={20}/>} text="Trash"/>
    <SidebarItem icon={<NoteAdd size={20}/>} text="Quick Notes"/>
    {/* <SidebarItem icon={<BarChart3 size={20}/>} text="Project"/> */}
 
</Sidebar>
  )
}

export default ProjectSidebar

