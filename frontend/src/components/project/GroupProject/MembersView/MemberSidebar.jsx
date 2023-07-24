import React from 'react'
import Sidebar,{SidebarItem} from '../../customItems/Sidebar'
import { useNavigate } from 'react-router-dom';

import { CalendarToday, Dashboard,FormatListBulleted,Assignment, Grading, NoteAdd,Groups3} from "@mui/icons-material";

function MemberSidebar() {
    const navigate = useNavigate()
    const toDashboard = ()=>{
        console.log('Navigate to Dashboard page');
        const Id = new URLSearchParams(location.search).get("id");
            console.log(Id + " project Id");
        navigate(`/user/groupproject/member/dashboard?id=${Id}`);
    }
    const toProject = ()=>{
        console.log('Navigate to Project  page');
        const Id = new URLSearchParams(location.search).get("id");
            console.log(Id + " project Id");
        navigate(`/user/groupproject/member/project?id=${Id}`);
    }
    const toTask = ()=>{
        console.log('Navigate to task page');
        const Id = new URLSearchParams(location.search).get("id");
            console.log(Id + " project Id");
        navigate(`/user/groupproject/member/task?id=${Id}`);
    }
    const toOngoing = ()=>{
        console.log('Navigate to ongoing page');
        const Id = new URLSearchParams(location.search).get("id");
            console.log(Id + " project Id");
        navigate(`/user/groupproject/member/ongoing?id=${Id}`);
    }
    const toCompleted = ()=>{
        console.log('Navigate to Dashboard page');
        const Id = new URLSearchParams(location.search).get("id");
            console.log(Id + " project Id");
        navigate(`/user/groupproject/member/completed?id=${Id}`);
    }
    
  return (
    <div>
        <Sidebar>
        <SidebarItem onClick={toDashboard} icon={<Dashboard size={20}/>} text="Dashboard"/>
    <SidebarItem onClick={toProject} icon={<Assignment size={20}/>} text={"Project"}/>
    <SidebarItem onClick={toTask} icon={<Assignment size={20}/>} text={"Your task"}/>
    <SidebarItem onClick={toOngoing} icon={<FormatListBulleted size={20}/>} text={"Ongoing"}/>
    <SidebarItem onClick={toCompleted} icon={< Grading size={20}/>} text={"Completed"}/>
        </Sidebar>
      
    </div>
  )
}

export default MemberSidebar
