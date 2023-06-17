import * as React from "react";
import axios from "../../Axios";
import { useEffect ,useState} from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(username, calories, fat, carbs, protein) {
  return { username, calories, fat, carbs, protein };
}

const users = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function UserDeatails() {
  const [userData,setUserData] = useState([])
  const [change,setChange] = useState("")
  const getUserDetails= async()=>{
    console.log("get user")
    await axios.get('/admin/userdetails').then((res)=>{
      if(res.status === 200){
        console.log("ss")
        console.log(res.data.users)
        setUserData(res.data.users)
      }
    })
    .catch((error)=>{

    })
  }

  useEffect(()=>{
  getUserDetails()
  },[])

  const blockUser = async(id)=>{
    console.log("delete user")
    console.log(id)
    const data = {id}
    axios.patch('/admin/blockuser',data).then((res)=>{
      if(res.status === 200){
        console.log("user deleted")
        setUserData(res.data.users)
      }
    }).catch((error)=>{

    })
}
const unBlockUser = async(id)=>{
  console.log("unblock user")
  console.log(id)
  const data = {id}
  axios.patch('/admin/unblockuser',data).then((res)=>{
   if(res.status === 200){
    console.log("user unblocked")
    setUserData(res.data.users)
   }
  })
  .catch((error)=>{

  })
}
  return (
    <>
      <AdminNavbar/>
      <Sidebar />
      <TableContainer
        component={Paper}
        sx={{ marginLeft: "225px", marginTop: "72px" }}
      >
        <Table
          sx={{ minWidth: 700, maxWidth: 1150 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Userusername</StyledTableCell>
              <StyledTableCell >Image</StyledTableCell>
              <StyledTableCell >Created At</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <StyledTableRow key={user.username}>
                <StyledTableCell component="th" scope="user">
                  {user.username}
                </StyledTableCell>
                <StyledTableCell ></StyledTableCell>
                <StyledTableCell >{new Date(user.createdAt).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell >{user.email}</StyledTableCell>
                <StyledTableCell >
                  {user.isBlocked===false? <Button variant="outlined" color="error" onClick={()=>{blockUser(user._id)}}>
                    Block
                  </Button>:<Button color="success" onClick={()=>{unBlockUser(user._id)}}> UnBlock</Button>}
                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserDeatails;
