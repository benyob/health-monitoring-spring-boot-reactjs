import React, { useContext, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import styled from 'styled-components'
import { MyThemeContext } from '../../../App';

import languageService from '../../../service/language.service';
import nutritionSerivce from '../../../service/nutrition.serivce';
import { cols, icons, themes } from '../../../service/theme.service';
const getText = (i) => {
    return languageService.getText(i)
}

export default function CompNutritionGenerate() {
    //get theme
    const { theme } = useContext(MyThemeContext)
    const [querry, setsearchText] = useState({ amount: 700, margin: 15 })
    const [searchResult, setSearchResult] = useState([])
    const [displayedSearchResult, setDisplayedSearchResult] = useState(3)
    
    const getPieChartData=(indx)=>{
        var d={
            energy:0,
            fat:0,
            protein:0,
            sugars:0,
            water:0,
            carbohydrate:0,
        }
        for (let i = 0; i < searchResult[indx].meals.length; i++) {
            const e = searchResult[indx].meals[i];
            d.energy+=e.energy;
            d.protein+=e.protein;
            d.fat +=e.fat;
            d.sugars+= e.sugars;
            d.water+= e.water;
            d.carbohydrate+= e.carbohydrate;
        }
       
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
    const upvote=(fm ,isUpvote)=>{
       if(isUpvoter(fm)) return;
        nutritionSerivce.upvote(fm.id,isUpvote).then(res=>{
            nutritionSerivce.generateMeal(querry.amount ,querry.margin).then(res=>{
                setSearchResult(res.data);
               
            })
        })
        var t=[...searchResult]
        t.map(e=>{
            if(e.id===fm.id) 
            {isUpvote?e.upvotes++:e.upvotes--;
            
            }
        })
        setSearchResult(t);
    }
    const isUpvoter=(fm)=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return fm.upvoters.includes(user.id);
        }
        return false;
    }
    const Fmeals=searchResult.map((fm,indx)=>{
        return( <FMContainer key={fm.id}>
            <FMMeal>
                <p>{getText("Meal")} : {indx+1}</p>
                <div>
                    {fm.meals.map(m=>{
                        return(<div key={m.id}>
                            <span>{m.description}</span>
                            <span>{m.energy} cal</span>
                        </div>)
                    })}
                </div>
            </FMMeal>
            <FMUpvote>
                <p>{getText("Upvotes")} : {fm.upvotes}</p>
                <div  style={{opacity:(isUpvoter(fm)?.1:1)}}>
                    <div onClick={()=>upvote(fm ,false)} style={{backgroundColor:cols.red}}>
                        <img src={icons.ic_arrow_downward} alt=""/>
                        <span>DownVote</span>
                    </div>
                    <div onClick={()=>upvote(fm ,true)} style={{backgroundColor:cols.blue}}>
                        <img src={icons.ic_arrow_upward} alt=""/>
                        <span>UpVote</span>
                    </div>
                </div>
            </FMUpvote>
            <FMGraph>
                <Pie data={getPieChartData(indx)} 
                options={{ maintainAspectRatio: false }}/>
            </FMGraph>
        </FMContainer>
)
    })
    const handleSearshOnChange = (e) => {
        
        const { value, name } = e.target;
        const s = querry;
        if (name === "amount") s.amount = value;
        if (name === "margin") s.margin = value;
        setsearchText(s)
    }
    const fn_generate = (e) => {
        e.preventDefault();

        nutritionSerivce.generateMeal(querry.amount ,querry.margin).then(res=>{
            
            setSearchResult(res.data);
           
        })
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
    return (
        <Wrapper style={theme===themes.dark?themeChange.dark:themeChange.light}>
            <Title theme={theme}>
               {getText("Generate Meal")}
            </Title>
            <form onSubmit={(e) => fn_generate(e)}>
            <GenerateContainer>
                <GInput>
                    <p>{getText("I want to eat")} :</p>
                    <input onChange={(e)=>handleSearshOnChange(e)} name="amount" defaultValue={500} min={0} max={100000} type="number"/>
                    <span>{getText("Calories")}</span>
                </GInput>
                <GInput>
                    <p>{getText("Margin")} :</p>
                    <input onChange={(e)=>handleSearshOnChange(e)} name="margin" defaultValue={2} min={0} max={1250} type="number"/>
                    <span>{getText("Calories")}</span>
                </GInput>
                <GBtn onClick={(e) => fn_generate(e)}>
                    <img src={icons.ic_to_right} alt=""/>
                    <input  type="submit" value={getText("Generate")}/>
                </GBtn>
            </GenerateContainer>
            </form>
           
            <Title theme={theme}>
            {(Fmeals.length>0)
                ?getText("Results")+" ("+Fmeals.length+")"
                :<></>}
            </Title>
            <ResultsContainer>
                {Fmeals.slice(0 ,displayedSearchResult)}
                {(displayedSearchResult<Fmeals.length)
                ?<More onClick={()=>setDisplayedSearchResult(displayedSearchResult+1)}>{getText("More")}</More>
                :<></>}
                {/* {(Fmeals.length<=0 )
                ?<p style={{color:cols.warning}}>{getText("Nothing was found")+" :("}</p>
                :<></>} */}

            </ResultsContainer>
        </Wrapper>
    )
}

//#region 
const More = styled.div`
padding:.5rem 2rem;
border-radius:5px;
border:1px solid ${cols.blue};
color: ${cols.blue};

:hover{
    border:1px solid ${cols.blue};
    color: ${cols.white};
    background-color: ${cols.blue};
    

}
transition:all .25s;
cursor:pointer;
`;
const FMGraph = styled.div``;
const FMUpvote = styled.div``;
const FMMeal = styled.div``;
const FMContainer = styled.div`
    // border:1px solid;
    width:40rem;
    height:20rem;
    display:grid;    
    grid-template-columns:20rem 20rem;
    grid-template-rows:12rem 8rem;
    grid-template-areas:"meal graph"
                "upvote graph";
    background-color:${cols.white};
    
    >${FMMeal}{
        // border:1px solid;
        grid-area:meal;
        display:flex;
        height:100%;
        flex-direction:column;
        >p{
            color:${cols.blue};
            margin-left:1rem;
            font-weight:600;
            font-size:1.1rem;
        }
        >div{
            display:flex;
            flex-direction:column;
            gap:0.5rem;
            align-items:center;
           height:fit-content;

            overflow-y:scroll;
            >div{
                display:flex;
                align-items:center;
                justify-content:space-between;
                height:fit-content;
                padding:.2rem 0;
                width:90%;
                border-radius:5px;
                background-color:${cols.veryLight_blue};
                >span{
                    color:${cols.dark_blue};
                    margin:0 1.5rem;
                    padding:.5rem 0;
                }
            }
        }
    }
    >${FMUpvote}{
        // border:1px solid;
        grid-area:upvote;
        height:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        
        >p{
            color:${cols.gray};
            font-weight:500;
            border-bottom:1px solid; 
        }
        >div{
            display:flex;
            justify-content:space-evenly;
            gap:1rem;
            >div{
                height:3rem;
                border-radius:5px;
                width:8rem;
               
                display:flex;
                align-items:center;
                gap:1rem;
                >span{
                    color:${cols.white};
                }
                >img{
                    margin-left:.5rem;
                }
                cursor:pointer;
                :hover{
                    box-shadow: 0 0 .5rem ${cols.dark_blue};
                }
                transition:box-shadow .5s;
            }
            
        }
    }
    >${FMGraph}{
        // border:1px solid;
        grid-area:graph;
    }
        
    
`;
const ResultsContainer = styled.div`
    // border:1px solid;
    width:100%;
    height:fit-content;
    display:flex;
    align-items:center;
    flex-direction:column;
    gap:2rem;  
    padding-bottom:2rem;  
`;
const GBtn=styled.div`
    height:2.5rem;
    width:6.5rem;
    background-color:${cols.blue};
    display:flex;
    align-items:center;
    justify-content:center;
    gap:.2rem;
    padding:.25rem 1rem;
    border-radius:.5rem;
    transition:width .25s;
    :hover{
        width:15rem;
    }
    >input{
        height:100%;
        color:${cols.white};
        background:transparent;
        border:none;
        outline:none;
        font-weight:600;
        font-size:1rem;

    }
`;

const GInput=styled.div`
    display:flex;
    align-items:center;
    gap:1rem;
    >span{
        width:10ch;
        text-align:left;
        color:${cols.gray};
        font-weight:400;
    }
    >p{
        width:15ch;
        text-align:right;
        color:${cols.blue};
        font-weight:600;
    }
    >input{
        border:none;
        font-weight:600;
        outline:none;
        background-color:${cols.veryLight_blue};
        border-radius:.5rem;
        color:${cols.dark_blue};
        padding-left:1rem;
        width:10rem;
        height:2.5rem;
    }
`;
const GenerateContainer = styled.div`
    max-width:90%;
    min-width:40rem;
    height:20rem;
    background-color:${cols.white};
    border-radius:3rem;
    margin-top:0;
    display :flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:2rem;
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
//#endregion
