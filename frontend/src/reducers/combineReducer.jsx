import { combineReducers } from "redux"
import userAuthReducer from "./userAuthReducer"
import emailReducer from "./emailOtpReducer"

const rootReducer = combineReducers({
    userAuthReducer : userAuthReducer,
    email:emailReducer
//     AdminAuthReducer:AdminAuthReducer
 })

export default rootReducer