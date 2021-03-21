import axios from 'axios';
import authHeader from './auth-header';
import { HealthDataType } from './HelperClass';

const API_URL = 'http://localhost:8080/api/v1/dashboard';



class HealthDataService {
 
  getBloodPressure()
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return axios.get(`${API_URL}/user/${user.id}/${HealthDataType.BloodPressure}`, { headers: authHeader() });
    }
    return 'plz login again'
  }
  setBloodPressure(data)
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){

      return axios.post(API_URL + '/user/'+user.id+'/BloodPressure',data, { headers: authHeader() });
    }
    return 'plz login again'
  }
}

export default new HealthDataService();