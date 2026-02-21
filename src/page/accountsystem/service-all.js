import axios from 'axios';
import { urlcall } from '../config';

export async function CreateNewUser(valuses) {

  const userObject = {
    name: valuses.name,
    username: valuses.username,
    password: valuses.password,
    employeeId: valuses.employeeId,
    departmentId: valuses.departmentId,
    positioncode: valuses.positioncode,
    email: valuses.email,
    menugroupId: "",
    roles: valuses.roles,
    isActive: valuses.isActive
  }

  return axios.post(urlcall.url_sql_account + `addaccount`, userObject)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
    });

}

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

export async function Departmentlist() {

  return axios.get(urlcall.url_sql_department + `departmentall`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function Positionlist() {

  return axios.get(urlcall.url_sql_department + `positiontall`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function AccountList() {

  return axios.get(urlcall.url_sql_account + `accountall`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function AccountById(Id) {

  return axios.get(urlcall.url_sql_account + `accountById/${Id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function Update_ChangePassword(valuses) {
  var objectdata = {
    "username": valuses.username,
    "password": valuses.password
  }

  return axios.put(urlcall.url_sql_account + `changepassword/${valuses.Id}`, objectdata)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

export async function UpdateNewUser(valuses) {

  const userObject = {
    name: valuses.name,
    employeeId: valuses.employeeId,
    departmentId: valuses.departmentId,
    positioncode:valuses.positioncode,
    email: valuses.email,
    roles: valuses.roles,
    menugroupId:"",
    isActive: valuses.isActive
  }

  return axios.put(urlcall.url_sql_account + `updateaccount/${valuses.acId}`, userObject)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
    });

}



