import React,{useEffect,useState} from 'react'
import axios from '../../../Axios'

function GroupDashboard() {
    const [projectId,setProjectId] = useState("")
    const [groupProjectData,setGroupProjectData] = useState({})
    const getProjectData = async () => {
        const Id = new URLSearchParams(location.search).get("id");
        console.log(Id + " project Id");
        setProjectId(Id);
        await axios
          .post(
            "/user/project/group",
            { projectId: Id },
            { headers: { "x-access-token": localStorage.getItem("token") } }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log(`${res.data.message}`);
              console.log(res.data.projectData);
              setGroupProjectData(res.data.projectData);
            //   setTasks(res.data.projectData.tasks);
            }
          })
          .catch((error) => {});
      };
    useEffect(()=>{
getProjectData()
    },[])
  return (
    <div>
   <h1>hi this is group dashboard</h1>  
   <h1>{groupProjectData.projectname}</h1> 
    </div>
  )
}

export default GroupDashboard
