// reducers.js
import { STORE_EMAIL } from '../actionTypes/userAuthTypes';

const initialState = {
  email: '',
};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_EMAIL:
        console.log(action.payload)
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default emailReducer;
