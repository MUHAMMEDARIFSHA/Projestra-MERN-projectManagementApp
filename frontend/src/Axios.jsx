import axios from "axios";
const url = import.meta.env.VITE_AXIOS_URL
const instance = axios.create({
    baseURL: url,
  
    headers: {'X-Custom-Header': 'foobar',
        'Content-Type':'application/json' }
  });

  export default instance