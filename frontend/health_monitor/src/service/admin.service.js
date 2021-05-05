import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/admin';



class AdminService {
 
getFloatValuesShortcut(name)
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.get(`${API_URL}/getfloatvaluesshortcut/${name}`, { headers: authHeader() });
    }
    return 'plz login again'
  }
  
getAllFloatValues()
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.get(`${API_URL}/getfloatvalues`, { headers: authHeader() });
    }
    return 'plz login again'
  }
  deletefloatvalue(id)
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.get(`${API_URL}/deletefloatvalue/${id}`, { headers: authHeader() });
    }
    return 'plz login again'
  }



setFloatValue(floatValue)
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.post(`${API_URL}/setfloatvalues`,floatValue, { headers: authHeader() });
    }
    return 'plz login again'
  }
GrantAdmin(id)
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.get(`${API_URL}/grantadmin/${id}`, { headers: authHeader() });
    }
    return 'plz login again'
  }
deleteUser(id)
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.get(`${API_URL}/delete/${id}`, { headers: authHeader() });
    }
    return 'plz login again'
  }

getusers()
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.get(`${API_URL}/users`, { headers: authHeader() });
    }
    return 'plz login again'
  }
  resetData()
    {
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
          return axios.get(`http://localhost:8080/api/v1/dashboard/admin/resetdata/${user.id}`, { headers: authHeader() });
      }
      return 'plz login again'
    }
}


export default new AdminService();