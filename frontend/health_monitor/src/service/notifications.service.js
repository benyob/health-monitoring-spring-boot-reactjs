import axios from "axios";
import authHeader from './auth-header';
import { cols } from "./theme.service";
export const  NotifyMeType={
blue:cols.blue,
green:cols.alert,
yellow:cols.advice,
red:cols.warning,
}
const API_URL = 'http://localhost:8080/api/v1/notifications';

class NotificationsService {


    dismissNotification(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return axios.get(`${API_URL}/dismiss/${id}`, { headers: authHeader() });        }
        return 'plz login again'
      }

    getNotified() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return axios.get(`${API_URL}/notify2/${user.id}`, { headers: authHeader() });        }
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