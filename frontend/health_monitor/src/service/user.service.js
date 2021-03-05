import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/dashboard/';

class UserService {
  // for testing
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  //health data 
  getBloodPressure(id)
  {
    return axios.get(API_URL + 'user/'+id+'/BloodPressure', { headers: authHeader() });
  }
}

export default new UserService();