import axios from "axios";
import authHeader from './auth-header';
import img_anything from '../Exported Assets/Anything.png';
import img_Paleo from '../Exported Assets/Paleo.png';
import img_Vegan from '../Exported Assets/Vegan.png';
import img_Vegetarian from '../Exported Assets/Vegetarian.png';
const API_URL = 'http://localhost:8080/api/v1/nutrition/meal';


const params={
    api_key:'VzrIgUEc8MdNEfQuC1xbg1fpWLkip8Dgd97bgdjt',
    dataType:["Survey (FNDDS)"],
}
export const CustomizedFullMealType=[
  {type:"Anything",img:img_anything},
  {type:"Paleo",img:img_Paleo},
  {type:"Vegetarian",img:img_Vegan},
  {type:"Vegan",img:img_Vegetarian},
]


export const nutrientIds={
    Protein :1003,
    fat:1004,
    Carbohydrate :1005,
    Energy:1008,
    Sugars:2000,
    Water:1051,
}
export const nutrientUnits={
    Protein :" (G)",
    fat:" (G)",
    Carbohydrate :" (G)",
    Energy:" (KCAL)",
    Sugars:" (G)",
    Water:" (G)",
}

class NutritionService {
    searchFood(name ,nbr_results) {
        const URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${(params.api_key)}&query=${(name)}&dataType=${(params.dataType)}&pageSize=${(nbr_results)}`
        
        return axios.get(URL);
    }

    upvote(id ,isUpvote) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
         return axios.get(`${API_URL}/upvote/${user.id}/${id}/${isUpvote}`, { headers: authHeader() });
        }
        return 'plz login again'
      }
    getMeal(description) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
         return axios.get(`${API_URL}/${description}`, { headers: authHeader() });
        }
        return 'plz login again'
      }
      //customized
    setCustomizedFMeal(cfm) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          return axios.post(`${API_URL}/customized/add`,cfm, { headers: authHeader() })
        }
        return 'plz login again'
      }
    getCustomizedFMeal(type) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          return axios.get(`${API_URL}/customized/get/${type}`, { headers: authHeader() })
        }
        return 'plz login again'
      }

      //
    setMeal(meals) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          axios.post(`${API_URL}/add`,meals, { headers: authHeader() })
        }
        return 'plz login again'
      }
    generateMeal(amount ,margin) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          return axios.get(`${API_URL}/generate/${amount}/${margin}`, { headers: authHeader() })
        }
        return 'plz login again'
      }

}
export default new NutritionService()
