import React, { useContext, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import styled, { css } from 'styled-components'
import { MyThemeContext } from '../../../App';
import ReactTooltip from 'react-tooltip';

import languageService from '../../../service/language.service';
import nutritionSerivce, { CustomizedFullMealType, nutrientUnits } from '../../../service/nutrition.serivce';
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
    },
    // style={theme===themes.dark?themeChange.dark:themeChange.light}
}
export default function CompNutritionCustomizedMeals() {
    const { theme } = useContext(MyThemeContext)
    const [CustomizedMeals, setCustomizedMeals] = useState([]) 
    const getData=(type)=>{
        nutritionSerivce.getCustomizedFMeal(type).then(res=>{
            setCustomizedMeals(res.data);
        })
    }
    const getMealTooltip=(m)=>{
        var tp=`${m.description}<br>
        Amount Per ${m.amountPer}<br>
        Energy ${m.energy + nutrientUnits.Energy}<br>
        Protien ${m.protein + nutrientUnits.Protein}<br>
        Fat ${m.fat + nutrientUnits.fat}<br>
        Sugars ${m.sugars + nutrientUnits.Sugars}<br>
        Carbohydrate ${m.carbohydrate + nutrientUnits.Carbohydrate}<br>
        Water ${m.water + nutrientUnits.Water}<br>

        `;
        return tp;
    }

    const getPieChartData=(fm)=>{
        var d={
            energy:0,
            fat:0,
            protein:0,
            sugars:0,
            water:0,
            carbohydrate:0,
        }
        
            fm.meals.forEach(e => {
                d.energy+=e.energy;
                d.protein+=e.protein;
                d.fat +=e.fat;
                d.sugars+= e.sugars;
                d.water+= e.water;
                d.carbohydrate+= e.carbohydrate;
            })
            
        
       
        const _data={
        labels: [getText('Energy'), getText('Protein'), getText('Fat'),
getText('Carbohydrate'), getText('Sugars'),getText('Water')],
            datasets: [
              {
                label: 'Rainfall',
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
                data: [d.energy ,d.protein ,d.fat ,d.carbohydrate ,d.sugars ,d.water]
              }
            ]
          }
          return _data;
    }

    
    const results = CustomizedMeals.map((c,indx)=>{
        return<Customized key={indx}>
            <ReactTooltip  multiline={true} effect="float"/>
        <p>Total Calories : <span>{c.calories}{nutrientUnits.Energy}</span></p>
        <div>
            {
                c.meals.map((fm,indx2)=>{
                    return <FullMeal borderDown={indx2===c.meals.length-1?false:true} key={indx2}>
                            <FullMeal_title>
                                <p>{fm.title} : <span>{fm.caloriesAmount}{nutrientUnits.Energy}</span></p>
                                
                            </FullMeal_title>
                            <FullMeal_graph>
                            <Pie data={getPieChartData(fm)} 
                            options={{ maintainAspectRatio: false }}/>
                            </FullMeal_graph>
                            <FullMeal_meals>
                                {
                                    fm.meals.map((m,indx3)=>{
                                        return <Meal  data-tip={getMealTooltip(m)} key={indx3}>
                                            <img src={m.thumbnailUrl} alt=""/>
                                            <p>{m.description}</p>
                                        </Meal>
                                    })
                                }
                               
                            </FullMeal_meals>
           
        </FullMeal>
                })
            }
        </div>
    </Customized>
    })
    const FMltypesButtons = CustomizedFullMealType.map((c,indx)=>{
        return<button key={indx} onClick={()=>getData(c.type)}>
                <img src={c.img} alt=""/>
                <span>{getText(c.type)}</span>
            </button>
    })
    return (
        <Wrapper style={theme===themes.dark?themeChange.dark:themeChange.light}>          
  
            <Title theme={theme}>
               {getText("Customized Meals")}
            </Title>
            <TypesContainer>
                {FMltypesButtons}
            </TypesContainer>
            <Title theme={theme}>
               {getText("Results")} ({results.length})
            </Title>
            <CustomizedContainer>
                {results}
            </CustomizedContainer>
            
        </Wrapper>
    )
}

const TypesContainer = styled.div`
display:flex;
gap:1rem;
img{
    width:3.5rem;
    height:3rem;
}
span{
    transition:all .5s;
    color:${cols.blue};
    font-weight:500;
    font-size:1rem;
}
button{
    width:7rem;
    height:7rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:10px;
padding:2rem;
background-color:white;
outline:none;
border:2px solid ${cols.blue};
border-radius:10px;
:hover {
    background-color:${cols.light_blue};
    span{
        color:${cols.white};
    }
}
transition:all .5s;
}
`;
const Meal = styled.div`
display:flex;
align-items:center;
gap:1rem;
background-color:${cols.veryLight_blue}; 
cursor :pointer;   
border-radius:10px;
>img{
    width:4.5rem;
    border:2px solid ${cols.blue};
    border-radius:10px;
}
:hover{
    box-shadow:0 0 1rem rgba(0,0,0,.30);
}
`;
const FullMeal_title = styled.div`
>p{
    margin-left:1rem;
    font-weight:600;
    background-color:${cols.unclear_white};
    width:fit-content;
    padding:.1rem .5rem;
    border-radius:5px;
    >span{
        font-weight:400;
        color:${cols.blue};
    }
}
`;
const FullMeal_meals = styled.div`
    overflow-y:scroll;
    height:13rem;
    display:flex;
    flex-direction:column;
    gap:.5rem;
    padding:1rem 1.5rem;
`;
const FullMeal_graph = styled.div`
height:90%;
width:100%;
place-self:center;
`;
const FullMeal = styled.div`
    // border:1px solid;
    ${props=>props.borderDown?css`
    border-bottom:2px solid rgba(0,0,0,0.14);
    `:''
    }
    padding-bottom:1rem;
    display:grid;
    grid-template-columns:1fr 1fr;    
    grid-template-rows:auto 2fr;    
    grid-template-areas:"title graph"
    "meals graph";
    min-height:15rem;
    // div{
    //     border:1px solid magenta; 
    // }
    >${FullMeal_title}{
        grid-area:title;
        display:flex;
        align-items:center;
        gap:1.5rem;
    }
    >${FullMeal_meals}{
        grid-area:meals;
    }
    >${FullMeal_graph}{
        grid-area:graph;
    }

`;
const Customized = styled.div`
// border:1px solid;
border-radius:1rem;
padding:.8rem;
box-shadow:0 0 1rem rgba(0,0,0,.30);
>p{
    font-weight:700;
    color:${cols.dark_blue};
    background-color:${cols.veryLight_blue};
    width:fit-content;
    padding:.2rem 1rem;
    border-radius:10px;
    >span{
        font-weight:400;
        color:${cols.blue};
    }
}
background-color:${cols.white};
width:90%;
margin:0 auto;
>div{
    display:flex;
    flex-direction:column;
    
}
`;
const CustomizedContainer = styled.div`
width:100%;
padding:2rem 0;
display:flex;
flex-direction:column;
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
const Wrapper = styled.div`
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




{/* <Customized>
                    <p>Totoal Calories 20 Cal</p>
                    <div>
                    <FullMeal>
                        <FullMeal_title>
                            <p>Break fast</p>
                            <span>calories</span>
                        </FullMeal_title>
                        <FullMeal_graph>
                            <Pie/>
                        </FullMeal_graph>
                        <FullMeal_meals>
                            <Meal>
                                <img width={120} src="https://images.eatthismuch.com/site_media/img/1021700_tabitharwheeler_26b2fc97-63f7-47c8-8a04-74b09cb867df.jpg" alt=""/>
                                <p>Meal 1</p>
                            </Meal>
                            <Meal>
                                <img width={120} src="https://images.eatthismuch.com/site_media/img/1021700_tabitharwheeler_26b2fc97-63f7-47c8-8a04-74b09cb867df.jpg" alt=""/>
                                <p>Meal 2</p>
                            </Meal>
                        </FullMeal_meals>
                       
                    </FullMeal>
                    </div>
                </Customized> */}