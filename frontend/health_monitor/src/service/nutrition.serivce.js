import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/nutrition/meal';


const params={
    api_key:'VzrIgUEc8MdNEfQuC1xbg1fpWLkip8Dgd97bgdjt',
    dataType:["Survey (FNDDS)"],
}

export const nutrientIds={
    Protein :1003,
    fat:1004,
    Carbohydrate :1005,
    Energy:1008,
    Sugars:2000,
    Water:1051,
}

class NutritionService {
    searchFood(name ,nbr_results) {
        const URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${(params.api_key)}&query=${(name)}&dataType=${(params.dataType)}&pageSize=${(nbr_results)}`
        
        return axios.get(URL);
    }

    getMeal(description) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
         return axios.get(`${API_URL}/${description}`, { headers: authHeader() });
        }
        return 'plz login again'
      }
    setMeal(meals) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          axios.post(`${API_URL}/add`,meals, { headers: authHeader() })
        }
        return 'plz login again'
      }

}
export default new NutritionService()
