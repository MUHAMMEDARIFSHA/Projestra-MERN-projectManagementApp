import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../features/user/userAuthSlice'
import adminAuthReducer from '../features/adminAuth/adminSlice'
import emailReducer from '../features/user/emailSlice'
import userReducer from '../features/user/userSlice'
const store = configureStore({
  reducer: {
   userAuth:userAuthReducer,
   adminAuth:adminAuthReducer,
   emailReducer:emailReducer,
   userReducer :userReducer
  },
});

export default store;