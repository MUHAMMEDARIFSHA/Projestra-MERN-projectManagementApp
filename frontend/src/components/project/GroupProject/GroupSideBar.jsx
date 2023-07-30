import { TrashIcon } from "lucide-react";
import Sidebar,{SidebarItem} from "../customItems/Sidebar";
import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { CalendarToday, Dashboard,FormatListBulleted,Assignment, Grading, NoteAdd,Groups3} from "@mui/icons-material";
import Groups3Icon from '@mui/icons-material/Groups3';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch, useSelector } from "react-redux";
import axios from '../../../Axios'
import { setUser } from "../../../features/user/userSlice";



function GroupSideBar() {
  const navigate = useNavigate()
  const userData = useSelector((state)=> state.userReducer.user)
  const dispatch = useDispatch()
  const getData = ()=>{
      console.log("get data");
      axios.get('/user/getdata',{ headers: { 'x-access-token': localStorage.getItem('token')} }).then((res)=>{
        if(res.status===200){
          console.log(res.data.user)
          dispatch(setUser(res.data.user))
        }
      
      }).catch((error)=>{
     if(response.error && response.error.status===404){
      console.log(error.response.data.message)
     }
      })
    }
  
    useEffect(()=>{
     getData()
    },[])
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
  const toChat = ()=>{
    console.log(" to chat")
    const Id = new URLSearchParams(location.search).get("id");
    console.log(Id + " project Id");
    navigate(`/user/groupproject/chat?id=${Id}`)
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
    <Sidebar useremail={userData?.email} username={userData?.username}>
    <SidebarItem onClick={toDashboard} icon={<Dashboard size={20}/>} text="Dashboard"/>
    <SidebarItem onClick={toProject} icon={<Assignment size={20}/>} text={"Project"}/>
    <SidebarItem onClick={toOngoing} icon={<FormatListBulleted size={20}/>} text={"Ongoing"}/>
    <SidebarItem onClick={toCompleted} icon={< Grading size={20}/>} text={"Completed"}/>
    <SidebarItem onClick={toChat} icon={<ChatIcon size={20}/>} text={'Chat'}/>
    {/* <SidebarItem onClick={toCalendar} icon={<CalendarToday size={20}/>} text="Calendar"/> */}
    <SidebarItem  onClick={toAddMember} icon = {<Groups3Icon size={20}/>}   text = "Add members" />
    {/* <SidebarItem o icon={<TrashIcon size={20}/>} text="Trash"/> */}
    {/* <SidebarItem icon={<NoteAdd size={20}/>} text="Quick Notes"/> */}
    {/* <SidebarItem icon={<BarChart3 size={20}/>} text="Project"/> */}
 
</Sidebar>
  )
}

export default GroupSideBar
