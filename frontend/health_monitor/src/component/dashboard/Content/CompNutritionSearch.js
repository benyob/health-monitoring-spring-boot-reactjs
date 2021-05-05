import React, { useContext, useState } from 'react'
import { Bar, Doughnut, Pie, Polar } from 'react-chartjs-2';
import styled from 'styled-components'
import { MyThemeContext } from '../../../App';
import { Cmp_FoodFactRow } from '../../../My_UI library/UI';
import languageService from '../../../service/language.service';
import nutritionSerivce, { nutrientIds, nutrientUnits } from '../../../service/nutrition.serivce';
import { cols, icons, themes } from '../../../service/theme.service';
const getText = (i) => {
    return languageService.getText(i)
}
const themeChange={
    dark:{
        backgroundColor:cols.black,
        transition:"all .5s",
        outline:"2px solid white",
        
    },
    light:{
        backgroundColor:cols.unclear_white,
        transition:"all .5s",
        
        //style={theme===themes.dark?themeChange.dark:themeChange.light}
    },
    
}
export default function CompNutritionSearch() {
    //get theme
    const { theme } = useContext(MyThemeContext)
    const [searchText, setsearchText] = useState({ querry: "", nbOfResults: 2 })
    const [data_foodFacts, setdata_FoodFacts] = useState([]);
    const handleSearshOnChange = (e) => {
        const { value, name } = e.target;
        const s = searchText;
        if (name === "querry") s.querry = value;
        if (name === "nbOfResults") s.nbOfResults = value;
        setsearchText(s)
    }
    const fn_getNutritionValById = (id, arr) => {
        let v = 0;
        arr.forEach(p => {
            if (p.nutrientId === id) {
                v = p.value;

            }
        })
        return v;
    }
    const fn_createMealsArray = (foods) => {
        const meals = [];
        foods.forEach((f) => {
            meals.push({
                description: f["description"],
                protein: fn_getNutritionValById(nutrientIds.Protein, f["foodNutrients"]),
                fat: fn_getNutritionValById(nutrientIds.fat, f["foodNutrients"]),
                carbohydrate: fn_getNutritionValById(nutrientIds.Carbohydrate, f["foodNutrients"]),
                energy: fn_getNutritionValById(nutrientIds.Energy, f["foodNutrients"]),
                sugars: fn_getNutritionValById(nutrientIds.Sugars, f["foodNutrients"]),
                water: fn_getNutritionValById(nutrientIds.Water, f["foodNutrients"]),
                thumbnailUrl:"",
	            amountPer:"n/a"
            })
        });
        return meals;
    }

    const fn_search = () => {
        // whitespace
        if (searchText.querry.trim().length <= 0) return;
        //fetch food from db
        nutritionSerivce.getMeal(searchText.querry).then(res=>{
            //food is in db
            if(res.data.length>0)
            {
                setdata_FoodFacts(res.data);
                console.log("food fetched from db !");

            }
            //food is not in db ,fetch from fdc
            else
            {
                console.log("food fetched from fdc ,and was added to db !");
                nutritionSerivce.searchFood(searchText.querry ,searchText.nbOfResults).then(fdcRes=>{
                    const meals = fn_createMealsArray(fdcRes.data.foods);
                    // add to db
                    nutritionSerivce.setMeal(meals);
                    // update state
                    setdata_FoodFacts(meals);
                })
            }
        }) 

    }

    const results = data_foodFacts.slice(0 ,searchText.nbOfResults).map((d, index) => {
        return (<FoodFact key={index}>
            <div id="f-fact-index">{index + 1}</div>
            <Cmp_FoodFactRow name="Description" value={d.description} />
            <Cmp_FoodFactRow name="Protein" value={d.protein+nutrientUnits.Protein} />
            <Cmp_FoodFactRow name="Total lipid (fat)" value={d.fat+nutrientUnits.fat} />
            <Cmp_FoodFactRow name="Carbohydrate, by difference" value={d.carbohydrate+nutrientUnits.Carbohydrate} />
            <Cmp_FoodFactRow name="Energy" value={d.energy+nutrientUnits.Energy} />
            <Cmp_FoodFactRow name="Sugars" value={d.sugars+nutrientUnits.Sugars} />
            <Cmp_FoodFactRow name="Water" value={d.water+nutrientUnits.Water} />
            <Cmp_FoodFactRow name="Amount Per" value={d.amountPer} />
        </FoodFact>

        )
    })

    const  barData=(d)=>{
        const _data={
            labels: [getText('Energy'), getText('Protein'), getText('Fat'),
        getText('Carbohydrate'), getText('Sugars'),getText('Water')],
                datasets: [
                  {
                    label: getText("Nutrition Facts"),
                    backgroundColor: [
                      '#bf68f6',
                      '#e84545',
                      '#ccffbd',
                      '#fdca40',
                      '#2978b5',
                      '#8fd6e1'
                    ],
                    hoverBackgroundColor: [
                    '#bf68f6',
                    '#e84545',
                    '#ccffbd',
                    '#fdca40',
                    '#2978b5',
                    '#8fd6e1'
                    ],
                    data: [d.energy ,d.protein ,d.fat ,d.carbohydrate ,d.sugars ,d.water],
                    borderWidth: 2,
                        borderRadius: 2,
                        borderSkipped: false,
                }
                ]
              }
              return _data;
    }

    const displayedSearchMeals=data_foodFacts.slice(0 ,searchText.nbOfResults).map((m,i)=>{
        return(<MealDisplay key={i}>
            <MealDisplay_info>
                <img src={m.thumbnailUrl} alt=""/>
                <p>Description <span>{m.description}</span></p>
                <p>Amount per <span>{m.amountPer}</span></p>
            </MealDisplay_info>
            <MealDisplay_graph>
                {/* <Bar data={barData(m)}  options={{ maintainAspectRatio: true ,responsive:true }}/> */}
                <Doughnut data={barData(m)}  options={{ maintainAspectRatio: false ,responsive:true }}/>
            </MealDisplay_graph>
        </MealDisplay>)
    })
    return (

        <Container style={theme===themes.dark?themeChange.dark:themeChange.light}>
            <Title theme={theme}>{getText('Search Food Nutrition Facts')}</Title>

            <SearchBar>
                <div onClick={(e) => fn_search(e)}><img src={icons.ic_search_white} alt="" /></div>
                <input onChange={(e) => handleSearshOnChange(e)} name="querry" type="text" />
                <input onChange={(e) => handleSearshOnChange(e)} defaultValue={2} min={1} max={50} name={"nbOfResults"} type="number" />
            </SearchBar>
            <Title theme={theme}>{getText('Search Result')}</Title>
                <div style={{width:'100%'}}> 
            <ContainerFoodFacts>
                {/* {data_foodFacts.length > 0 ? results : <p style={{color:cols.blue}}>{getText('No Results')}</p>} */}
                    {displayedSearchMeals}
                {/* <MealDisplay>
                    <MealDisplay_info>
                        <img src="data:image/jpeg;base64,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" alt=""/>
                        <p>Description <span>Meal 1</span></p>
                        <p>Amount per <span>100g</span></p>
                    </MealDisplay_info>
                    <MealDisplay_graph>
                        <Bar data={barData}  options={{ maintainAspectRatio: false }}/>
                    </MealDisplay_graph>
                </MealDisplay> */}
                
            </ContainerFoodFacts>
                </div>
        </Container>
    )
}

const MealDisplay_info=styled.div`
margin:0 2rem;
display:flex;
gap:1rem;
align-items:center;
p{
    font-weight:600;
    color:${cols.light_blue};
}
span{
    font-size:large;
    color:${cols.black};
    background-color:${cols.veryLight_blue};
    padding:5px;
    border-radius:10px;
}
img{
    width:5rem;
    height:5rem;
    border:5px solid${cols.veryLight_blue};
    border-radius:10px;
    border-radius:10px;
}
`;
const MealDisplay_graph=styled.div`
min-height:15rem;
place-self:center;
`;

const MealDisplay=styled.div`
box-shadow:-2px 2px 5px rgba(191, 191, 191, 1);
background-color:${cols.white};
width:100%;
min-height:5rem;
display:grid;
grid-template-rows:auto 1fr;

padding:1rem 0;
border-radius:5px;
`;

//#region mini comps



//#endregion
//#region 

const FoodFact = styled.div`
    position:relative;
    min-width:80%;
    padding-bottom:3rem;
    
    #f-fact-index{
        position:absolute;
        top:0rem;
        left:-2.2rem;
        background-color:${cols.blue};
        color:${cols.white};
        width:1.2rem;
        padding-left:1rem;
        border-top-left-radius:15px;
        font-weight:700;
        :hover{
            width:2rem;
            left:-3rem;
        }
        transition:all .5s;
    }
`;
const ContainerFoodFacts = styled.div`
    //border:1px solid;
    width:90%;
    min-height:15rem;
    display:flex;
    align-items:center;
    flex-direction:column;
   padding-bottom:3rem;
   margin:0 auto;
   gap:1rem;
`;

const Title = styled.p`
        ${props => props.theme.col_darkBlueVeryLightBlue};
        font-size : larger;
        font-weight : 700;
        padding :.5rem 0 0 .5rem;
        margin-top:0 ;
        margin-left:1rem;
        align-self:flex-start;
    `;
const SearchBar = styled.div`
    
    height:3rem;
    width:80%;
    background-color:transparent;
    display:flex;
    align-items:center;
    
    >div{
        background-color:${cols.blue};
        height:100%;
        width:5rem;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:5px 0 0 5px;
        :hover{
            background-color:${cols.dark_blue};
        }
        transition: background-color .5s;
    }
    >input[type="text"]{
        height:3rem;
        width:calc(100% - 6rem);
        border:none;
        ouline:none;
        padding :0 .5rem;
        color:${cols.dark_blue};
        font-weight:700;
    }
    >input[type="number"]{
        height:3rem;
        width:2rem;
        border:none;
        ouline:none;
        padding :0 .5rem;
        color:${cols.white};
        background-color:${cols.light_blue};
        font-weight:700;
    }
`;

const Container = styled.div`

display : flex;
flex-direction:column;
align-items:center;
height:100%;
width:100%;
gap:1rem;

padding-top:2rem;
overflow:scroll;

&::-webkit-scrollbar{
    background-color: rgba(0, 0, 0, .1);
    width: .7rem;
}

&::-webkit-scrollbar-thumb{
    border-radius: 10px;
    width: .2rem;
    background-color: var(--col_blue);
}
transition : background 1s; 
`;
//#endregion
