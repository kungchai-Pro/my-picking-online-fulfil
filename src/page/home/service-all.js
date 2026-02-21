import axios from 'axios';
import { urlcall } from '../config';

export async function loginUser(valuse){
  var loginobject={
    username:valuse.username,
    password:valuse.password
  }
  return axios.post(urlcall.url_sql_account + `login`,loginobject)
  .then(function (response) {
    if(response.data){
      return  response.data;
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });

}

