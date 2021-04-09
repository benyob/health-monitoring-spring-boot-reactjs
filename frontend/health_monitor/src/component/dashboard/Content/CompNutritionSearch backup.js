import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { MyThemeContext } from '../../../App';
import { Cmp_FoodFactRow } from '../../../My_UI library/UI';
import languageService from '../../../service/language.service';
import nutritionSerivce, { nutrientIds } from '../../../service/nutrition.serivce';
import { cols, icons, themes } from '../../../service/theme.service';
const getText = (i) => {
    return languageService.getText(i)
}

export default function CompNutritionSearch() {
    //get theme
    const { theme } = useContext(MyThemeContext)
    const [searshTerm, setSearshTerm] = useState({ querry: "", nbOfResults: 1 })
    const [data_foodFacts, setdata_FoodFacts] = useState([]);
    const handleSearshOnChange = (e) => {
        const { value, name } = e.target;
        const s = searshTerm;
        if (name === "querry") s.querry = value;
        if (name === "nbOfResults") s.nbOfResults = value;
        setSearshTerm(s)
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
    const fn_AddToMyDb = (foods) => {
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
            })
        });
        nutritionSerivce.setMeal(meals);
    }
    const fn_search = () => {
        if (searshTerm.querry.length <= 0) return;

        nutritionSerivce.getMeal(searshTerm.querry).then(r => {
            //if it's not there add it
            if (r.data.length <= 0) {
                console.log("meal " + searshTerm.querry + " is not im my db");
                nutritionSerivce.searchFood(searshTerm.querry, searshTerm.nbOfResults).then(fcd => {
                    setdata_FoodFacts(fcd.data.foods)
                    //add to my db
                    fn_AddToMyDb(fcd.data.foods);
                })
            }

            //if it is there show it
            else {
                //display from my data base
                console.log("meal " + searshTerm.querry + " already exists im my db");
                
                nutritionSerivce.searchFood(searshTerm.querry, searshTerm.nbOfResults).then(fcd => {
                    setdata_FoodFacts(fcd.data.foods)
                    //add to my db
                    fn_AddToMyDb(fcd.data.foods);
                })
            }
        })

    }
    //     const fn_search = () => {
    //         if(searshTerm.querry.length<=0) return;

    //         nutritionSerivce.getMeal(searshTerm.querry).then(r=>{
    //             //if it's not there add it
    //             if(r.data.length<=0) {
    //                 console.log("meal"+searshTerm.querry+" is not im my db");
    //                 nutritionSerivce.searchFood(searshTerm.querry ,searshTerm.nbOfResults).then(fcd=>{
    //                     const foods =[];
    //                     fcd.data.forEach(fod => {
    //                         foods.push({
    //                             description:fod["description"],
    //                             protein:,
    //                             fat:,
    //                             carbohydrate:,
    //                             energy:,
    //                             sugars:,
    //                             water:,
    //                         })
    //                     });

    //                     setdata_FoodFacts(fcd.data.foods)

    //                     //add to my db
    //                     nutritionSerivce.setMeal({
    //                         description:,
    //                         protein:,
    //                         fat:,
    //                         carbohydrate:,
    //                         energy:,
    //                         sugars:,
    //                         water:,
    //                     })
    //                 })

    //             }
    //             //if it is there show it
    //             else{

    //                 setdata_FoodFacts(r.data)
    //             }
    //         })

    // }
    const fn_getFoodNutritionById = (index, id) => {
        let val = "not found";
        data_foodFacts[index]["foodNutrients"].forEach(element => {
            if (element.nutrientId === id)
                val = `${element.value} ${element.unitName}`;
        });
        return val;
    }
    const results = data_foodFacts.map((d, index) => {
        return (<FoodFact key={index}>
            <div id="f-fact-index">{index + 1}</div>
            <Cmp_FoodFactRow name="Description" value={d["description"]} />
            <Cmp_FoodFactRow name="Protein" value={fn_getFoodNutritionById(index, nutrientIds.Protein)} />
            <Cmp_FoodFactRow name="Total lipid (fat)" value={fn_getFoodNutritionById(index, nutrientIds.fat)} />
            <Cmp_FoodFactRow name="Carbohydrate, by difference" value={fn_getFoodNutritionById(index, nutrientIds.Carbohydrate)} />
            <Cmp_FoodFactRow name="Energy" value={fn_getFoodNutritionById(index, nutrientIds.Energy)} />
            <Cmp_FoodFactRow name="Sugars" value={fn_getFoodNutritionById(index, nutrientIds.Sugars)} />
            <Cmp_FoodFactRow name="Water" value={fn_getFoodNutritionById(index, nutrientIds.Water)} />
        </FoodFact>

        )
    })
    return (
        <Container theme={theme}>
            <Title theme={theme}>{getText('Search Food Nutrition Facts')}</Title>

            <SearchBar>
                <div onClick={(e) => fn_search(e)}><img src={icons.ic_search_white} alt="" /></div>
                <input onChange={(e) => handleSearshOnChange(e)} name="querry" type="text" />
                <input onChange={(e) => handleSearshOnChange(e)} placeholder={1} min={1} max={5} name={"nbOfResults"} type="number" />
            </SearchBar>
            <Title theme={theme}>{getText('Search Result')}</Title>
            <ContainerFoodFacts>
                {data_foodFacts.length > 0 ? results : <p>{getText('No Results')}</p>}

            </ContainerFoodFacts>
        </Container>
    )
}
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
    // border:1px solid;
    width:80%;
    min-height:15rem;
    display:flex;
    align-items:center;
    flex-direction:column;
   
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
background:${props => props.theme === themes.dark ? cols.dark_blue : cols.unclear_white};    

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
