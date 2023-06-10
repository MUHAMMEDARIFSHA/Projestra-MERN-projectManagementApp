import {STORE_EMAIL} from '../actionTypes/userAuthTypes'

 export const storeEmail = (email) => {
    return {
      type: STORE_EMAIL,
      payload: email,
    };
  };

