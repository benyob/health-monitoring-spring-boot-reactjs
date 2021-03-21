import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/dashboard';

class UserService {

  getUserDashboard() {
    return axios.get(API_URL + '/user', { headers: authHeader() });
  }
  


  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }
}

export default new UserService();