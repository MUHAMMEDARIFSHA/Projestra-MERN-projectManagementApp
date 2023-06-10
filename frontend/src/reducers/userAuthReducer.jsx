import { USER_SET_AUTH,USER_CLEAR_AUTH } from "../actionTypes/userAuthTypes";

console.log(localStorage.getItem('token'))
// console.log(JSON.parse(localStorage.getItem('token')));

const initialState = {
  auth: localStorage.getItem('token')? localStorage.getItem('token') : null
}

const userAuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_SET_AUTH:
        console.log("entered set auth");
      return{
        auth: localStorage.getItem('token')
      }
    case USER_CLEAR_AUTH:
        console.log("entered clear auth");
      return{
        auth: null
      }
    default: return state
  }
}


export default userAuthReducer