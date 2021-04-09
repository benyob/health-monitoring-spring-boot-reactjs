import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/admin';



class AdminService {
 
  getusers()
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.get(`${API_URL}/users`, { headers: authHeader() });
    }
    return 'plz login again'
  }
}

export default new AdminService();