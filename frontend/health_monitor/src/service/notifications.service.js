import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/notifications';

class NotificationsService {
    getGreeting(){
        const user = JSON.parse(localStorage.getItem('user'));
        return axios.get(`${API_URL}/greeting/${user.id}`, { headers: authHeader() });

    }

    getNotified() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return axios.get(`${API_URL}/notify/${user.id}`, { headers: authHeader() });        }
        return 'plz login again'
      }
    getNotifications() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return axios.get(`${API_URL}/notifications/${user.id}`, { headers: authHeader() });        }
        return 'plz login again'
      }
}
export default new NotificationsService();