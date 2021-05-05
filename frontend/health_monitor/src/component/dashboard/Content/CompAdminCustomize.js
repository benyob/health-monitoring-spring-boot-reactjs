import React, { useState ,useEffect, useContext } from 'react'
import styled from 'styled-components'
import { ActiveNotifyContext, MyThemeContext } from '../../../App';
import adminService from '../../../service/admin.service';
import languageService from '../../../service/language.service';
import nutritionSerivce, { CustomizedFullMealType, nutrientUnits } from '../../../service/nutrition.serivce';
import { cols, themes } from '../../../service/theme.service';
import ReactTooltip from 'react-tooltip';
import { NotifyMeType } from '../../../service/notifications.service';

const getText = (i) => {
    return languageService.getText(i)
}
const themeChange={
        dark:{
            backgroundColor:cols.black,
            transition:"all .5s",
            
        },
        light:{
            backgroundColor:cols.unclear_white,
            transition:"all .5s",
        },
        // style={theme===themes.dark?themeChange.dark:themeChange.light}
    }
export default function CompAdmin () {
    const { theme } = useContext(MyThemeContext)
    const fn_notifyMeThat = useContext(ActiveNotifyContext)
    
    const [Fields, setFields] = useState(
        {
            type:'Anything',
            title:"",
            description:"",
            thumbnailUrl:"",
            protein :0,
            fat:0,
            carbohydrate :0,
            energy:0,
            sugars:0,
            water:0,
            amountPer:""
        })
    const [FulLMeal, setFulLMeal] = useState({
        title:"",
        caloriesAmount:0,
        meals:[]
    })
    const [FullMealList, setFullMealList] = useState([])
    // const [CustomizedFullMeal, setCustomizedFullMeal] = useState({})

    const HandleAddFullMeal=()=>{
        if(FulLMeal.meals.length<=0) 
        {
            fn_notifyMeThat(" At least one meal is required",NotifyMeType.yellow);
            return;
        }
        setFullMealList([...FullMealList,FulLMeal])
    }
    const handleSaveCusomized=()=>{
        if(FullMealList.length<=0) 
        {
            fn_notifyMeThat(" At least one Fullmeal is required",NotifyMeType.yellow);
            return;
        }
        const c = {
            calories:0,
            type:"",
            meals:[]
        }
        var cals=0;
        FullMealList.forEach(fm=>{
            cals+=parseInt(fm.caloriesAmount);
        });

        c.calories=cals;
        c.type=Fields.type;
        c.meals=FullMealList;
        //save to db
        nutritionSerivce.setCustomizedFMeal(c).then(res=>{
            res.data===true?fn_notifyMeThat("Customized meal was saved",NotifyMeType.green)
            :fn_notifyMeThat("Customized meal was NOT saved",NotifyMeType.red);
        });

        // setCustomizedFullMeal(c);
        // // console.log(c);
        // console.log(CustomizedFullMeal);

    }
    const HandleAddMeal=()=>{
        if(Fields.description.length<=0){
            fn_notifyMeThat("Meal description is required",NotifyMeType.yellow)
            return;
        }
        const m = {
            description:Fields.description,
            thumbnailUrl:Fields.thumbnailUrl,
            protein:Fields.protein,
            fat:Fields.fat,
            carbohydrate :Fields.carbohydrate,
            energy:Fields.energy,
            sugars:Fields.sugars,
            water:Fields.water,
            amountPer:Fields.amountPer,
        };
        var meals=[...FulLMeal.meals];
        meals.push(m);;
        var cals=0;
        meals.forEach(m=>{
            cals+=parseInt(m.energy);
        });
        const fmeal={
        title:Fields.title,
        caloriesAmount:cals,
        meals:meals
        };
        setFulLMeal(fmeal);
    }
    
    const UpdateFiealdsState=(e, property)=>{
        const {value} =e.target;
    
        setFields(prevState => ({
            ...prevState,
            [property]: value
        }));
    }
    const handleDeleteMeal=(indx)=>{
        
        var newMeals = [...FulLMeal.meals];
        for( var i = 0; i < newMeals.length; i++){ 
    
            if ( i === indx) { 
                newMeals.splice(i, 1);
                break 
            }
        
        }
        setFulLMeal(prevState => ({
            ...prevState,
            meals: newMeals
        }));
    }
    const handleDeleteFullMeal=(indx)=>{
        
        var newFML = [...FullMealList];
        for( var i = 0; i < newFML.length; i++){ 
    
            if ( i === indx) { 
                newFML.splice(i, 1);
                break 
            }
        
        }
        setFullMealList(newFML);
    }
    const HandleClearMeal=()=>{
        setFields(prevState => ({
            ...prevState,
            description:"",
            thumbnailUrl:"",
            protein :0,
            fat:0,
            carbohydrate :0,
            energy:0,
            sugars:0,
            water:0,
            amountPer:"",
        }));

    }
    const FMTypesOptions=CustomizedFullMealType.map((cfm_type,indx)=>{
        return <option key={indx} value={cfm_type.type}>{getText(cfm_type.type)}</option>
    })
    return(
        <Container style={theme===themes.dark?themeChange.dark:themeChange.light}>
        <ReactTooltip effect="solid"/>
        <BigTitle theme={theme}> {getText('Create Custom Full Meals')} </BigTitle>
       
        <CustomType theme={theme}>
            <p>{getText('Type')}</p>
            <Select onChange={(e)=>UpdateFiealdsState(e ,"type")} >
                {FMTypesOptions}
            </Select>
        </CustomType>

        <SmallTitle style={{paddingLeft:'.5rem'}} theme={theme}>{getText("Full Meals")}</SmallTitle>
       
       
        <FullMeals_add>
        <FullMealsField>
            <p>{getText("Title")}</p>
            <input onChange={(e)=>UpdateFiealdsState(e ,"title")} value={Fields.title} placeholder="breakfast ,snack ..." type="text"/>
        </FullMealsField>
        <FullMealsField>
            <p>{getText("Calories")}</p>
            <input readOnly placeholder="0" value={FulLMeal.caloriesAmount} type="number"/>
        </FullMealsField>
        <FullMealsField>
            <p>{getText("Meals")}</p>
        </FullMealsField>
        <FullMeals_MealsContainer>
            <FullMeals_AddMeal>
            <img src={Fields.thumbnailUrl}alt=""/>
            <input  data-tip="Description" onChange={(e)=>UpdateFiealdsState(e ,"description")} title="description" value={Fields.description}  placeholder="description..." type="text"/>
            <input  data-tip="Amount Per (include unit)" onChange={(e)=>UpdateFiealdsState(e ,"amountPer")} value={Fields.amountPer} placeholder="Amount Per" type="text"/>
            <input min={0} data-tip={"Amount of calories "+nutrientUnits.Energy} onChange={(e)=>UpdateFiealdsState(e ,"energy")} value={Fields.energy} placeholder="Calories" type="number"/>
            <input min={0} data-tip={"Amount of Protein "+nutrientUnits.Protein}  onChange={(e)=>UpdateFiealdsState(e ,"protein")} value={Fields.protein} placeholder="Protein" type="number"/>
            <input min={0} data-tip={"Amount of fat "+nutrientUnits.fat}  onChange={(e)=>UpdateFiealdsState(e ,"fat")} value={Fields.fat} placeholder="Fat" type="number"/>
            <input min={0} data-tip={"Amount of Carbohydrate "+nutrientUnits.Carbohydrate}  onChange={(e)=>UpdateFiealdsState(e ,"carbohydrate")} value={Fields.carbohydrate} placeholder="Carbohydrate" type="number"/>
            <input min={0} data-tip={"Amount of Sugars "+nutrientUnits.Sugars}  onChange={(e)=>UpdateFiealdsState(e ,"sugars")} value={Fields.sugars} placeholder="Sugars" type="number"/>
            <input min={0} data-tip={"Amount of Water "+nutrientUnits.Water}  onChange={(e)=>UpdateFiealdsState(e ,"water")} value={Fields.water} placeholder="Water" type="number"/>
            <input  data-tip="Thumbnail Url" onChange={(e)=>UpdateFiealdsState(e ,"thumbnailUrl")} value={Fields.thumbnailUrl}  placeholder="Thumbnail Url" type="text"/>
            
            <p style={{fontSize:'.9rem',padding:'.5rem .2rem'}} onClick={()=>HandleAddMeal()}>{getText("Add")}</p>
            <p style={{fontSize:'.9rem',padding:'.5rem .2rem'}} onClick={()=>HandleClearMeal()}>{getText("Clear")}</p>
            
            </FullMeals_AddMeal>
            {FulLMeal.meals.map((m,indx)=>{
            return (<FullMeals_Meal key={indx}>
                <img src={m.thumbnailUrl} alt=""/>
                <p>{m.description}</p>
                <p>{m.energy} Cal</p>
                <span onClick={()=> handleDeleteMeal(indx)} style={{marginLeft:"auto",color:cols.red,cursor:'pointer',marginRight:'1rem',border:'1px solid red',padding:'.2rem .5rem'}}>X</span>
            </FullMeals_Meal>
            )})}
        </FullMeals_MealsContainer>
        
        <input style={{outline:'.5px solid '+cols.light_blue}} onClick={()=>HandleAddFullMeal()} type="submit" value="Add"/>
        </FullMeals_add>
        {FullMealList.map((fm,indx)=>{
            return <FullMeals key={indx}>
        <FullMealsField>
            <p>{getText("Title")}</p>
            <p>{fm.title}</p>
        </FullMealsField>
        <FullMealsField>
            <p>{getText("Calories")}</p>
            <p>{fm.caloriesAmount}</p>
        </FullMealsField>
        <FullMealsField>
            <p>{getText("Meals")}</p>
        </FullMealsField>
        <FullMeals_MealsContainer>
            {fm.meals.map((m,indx2)=>{
                return <FullMeals_Meal key={indx2}>
                    <img src={m.thumbnailUrl} alt=""/>
                    <p>{m.description}</p>
                    <p>{m.energy} Cal</p>
                    <p>{m.amountPer}</p>
                </FullMeals_Meal>
                })}
            </FullMeals_MealsContainer>
            <span onClick={()=> handleDeleteFullMeal(indx)} style={{margin:"0 auto",color:cols.red,cursor:'pointer',marginRight:'1rem',border:'1px solid red',padding:'.2rem .5rem'}}>X</span>
        </FullMeals>
         })}
          <SaveCustomiedMeal onClick={()=>handleSaveCusomized()}>
        <p >{getText("Save")}</p>
        </SaveCustomiedMeal>
        
        </Container>
    )
    
}
const SaveCustomiedMeal=styled.div`
display:grid;
place-items:center;
border-bottom:3px solid ${cols.blue};
outline:1px solid ${cols.blue};

background-color:${cols.veryLight_blue};
width:5rem;
margin:0 auto;
cursor:pointer;
:hover{
    background-color:${cols.black};
    >p{
        color:${cols.white};
    }
}
>p{
    color:${cols.black};
    font-weight:600;
}
transition:background-color .35s;
`;
const FullMeals_AddMeal=styled.div`
border-bottom:1.5px solid ${cols.gray};

display:flex;
flex-wrap:wrap;
min-height:5rem;
width:100%;

align-items:center;
gap:.5rem;
>p{
    cursor:pointer;
    border:1px solid ${cols.blue};
    font-weight:600;
    color:${cols.blue};
    padding:.25rem 1rem;
    :hover{
        color:${cols.white};
        background-color:${cols.blue};
        
        
    }
    transition:all .2s;
}
>input{
    outline:none;
    border:none;
    border-bottom:1.5px solid ${cols.blue};
    height:2rem;
    color:${cols.blue};
    font-size:.7rem;
    font-weight:600;
    width:5rem;
}
>input[type="number"]{
    width:4rem;
    font-size:.7rem;
    font-weight:600;
}
>img{
    border:1px solid ${cols.blue};
    width:4rem;
    height:4rem;
    border-radius:10px;   
    margin-left:1rem;
}

`;
const FullMeals_Meal=styled.div`
border-bottom:1.5px solid ${cols.gray};
display:flex;
height:5rem;
align-items:center;
>p{
    margin-left:10%;
    color:${cols.dark_blue};
}
>img{
    width:4rem;
    height:4rem;
    border-radius:10px; 
    margin-left:3rem;   
}

`;
const FullMeals_MealsContainer=styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    padding-bottom:2rem;
`;
const FullMealsField=styled.div`
    display:flex;
    align-items:center;
    >p{
        padding-left:.5rem;
        width:30%;
    }
    >input{
        
        outline:none;
        border:none;
        border-bottom:1.5px solid ${cols.blue};
        height:2rem;
        color:${cols.blue};
        font-size:.9rem;
        
    }
`;
const FullMeals=styled.div`
    //border:1px solid;
    width :80%;
    margin-left:3rem;
    display:flex;
    flex-direction:column;
    background-color:${cols.white};
    border-radius:1rem;
    >input{
        padding:.5rem 0;
        outline:none;
        border:none;
        background-color:${cols.veryLight_blue};
        color:${cols.dark_blue};
        font-weight:600;
        :hover{
            background-color:${cols.dark_blue};
            color:${cols.veryLight_blue};
        }
        transition:all .2s;
    }
`;
const FullMeals_add=styled.div`
    //border:1px solid;
    width :80%;
    margin-left:3rem;
    display:flex;
    flex-direction:column;
    background-color:${cols.white};
    border-radius:1rem;
    >input{
        padding:.5rem 0;
        outline:none;
        border:none;
        background-color:${cols.veryLight_blue};
        color:${cols.dark_blue};
        font-weight:600;
        :hover{
            background-color:${cols.dark_blue};
            color:${cols.veryLight_blue};
        }
        transition:all .2s;
    }
`;
const SmallTitle = styled.p`
    ${props => props.theme.col_darkBlueVeryLightBlue};
    font-size : 1rem;
    font-weight : 500;
`;

const Select = styled.select`
margin-left:30%;
padding:.5rem 2rem;
border:1.5px solid ${cols.blue};
color:${cols.blue};
font-weight:600;
>option{
    color:${cols.dark_blue};
}
`;
const BigTitle = styled.p`
        ${props => props.theme.col_darkBlueVeryLightBlue};
        font-size : larger;
        font-weight : 700;
        padding :.5rem 0 0 .5rem;
        margin-top:0;
        `;
const CustomType = styled.div`
//        border:1px solid;
        display:flex;
        align-items:center;
        padding-left:.5rem;
        width:80%;
       
        >p{
            ${props => props.theme.col_darkBlueVeryLightBlue};
            font-size : 1rem;

            font-weight : 500;
        }
    `;
const Container = styled.div`
display : flex;
flex-direction:column;
height:90%;
width:100%;
gap:2rem;
padding:2rem 0;
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