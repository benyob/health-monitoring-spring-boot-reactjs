import axios from 'axios';
import authHeader from './auth-header';
import { HealthDataType } from './HelperClass';

const API_URL = 'http://localhost:8080/api/v1/dashboard';



class HealthDataService {

  //#region Read
  getBloodPressure() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return axios.get(`${API_URL}/user/${user.id}/${HealthDataType.BloodPressure}`, { headers: authHeader() });
    }
    return 'plz login again'
  }
  
  
  getHealthData(healthDataType){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return axios.get(`${API_URL}/user/${user.id}/${healthDataType}`, { headers: authHeader() });
    }
    return 'plz login again'
  }
  //#endregion

  //#region Create
  setBloodPressure(data) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {

      return axios.post(API_URL + '/user/' + user.id + '/setBloodPressure', data, { headers: authHeader() });
    }
    return 'plz login again'
  }
  setHealthData(healthDataType, data) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {

      return axios.post(`${API_URL}/user/${user.id}/${healthDataType}`, data, { headers: authHeader() });
    }
    return 'plz login again'
  }
  //#endregion
  
  //#region Update
  updateHealthData(healthDataType, data)
  {
    return axios.put(`${API_URL}/user/update/${healthDataType}`, data, { headers: authHeader() });

  }
  updateBloodPressure(data)
  {
    return axios.put(`${API_URL}/user/updateBloodPressure`, data, { headers: authHeader() });

  }
  //#endregion


  //#region delete
  deleteRecord(healthDataType, id) {
    
    return axios.delete(`${API_URL}/user/delete/${healthDataType}/${id}`, { headers: authHeader() });
  }
  //#endregion
}

export default new HealthDataService();