// import { configureStore } from '@reduxjs/toolkit'
// import { applyMiddleware } from '@reduxjs/toolkit'
// import { composeWithDevTools } from '@redux-devtools/extension'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducers/combineReducer'

// const store = configureStore({reducer: rootReducer}, composeWithDevTools(applyMiddleware(thunk)))

// export default store

import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../features/userAuth/userSlice'
import adminAuthReducer from '../features/adminAuth/adminSlice'
import emailReducer from '../features/userAuth/emailSlice'


const store = configureStore({
  reducer: {
   userAuth:userAuthReducer,
   adminAuth:adminAuthReducer,
   emailReducer:emailReducer
  },
});

export default store;