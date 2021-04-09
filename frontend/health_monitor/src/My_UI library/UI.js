import styled from "styled-components";
import languageService from "../service/language.service";
import { cols } from "../service/theme.service";

export const Cmp_FoodFactRow=(props)=>{
    const {name="name",value="value" ,bg_col='white'} = props;
    const FoodFactRow=styled.div`
        display:flex;
        background-color:${props=>props.bg_col};
        border-bottom:1px solid ${cols.blue};
        border-top:1px solid ${cols.blue};
        padding-left:.5rem;
        margin-bottom:.2rem;
        p{
            width:50%;
        }
        #f-fact-row-name{
            color:${cols.blue};
            font-weight:600;
    
        }
        :hover{
            box-shadow:0 0 1rem ${cols.gray};
        }
    `;
    return<FoodFactRow bg_col={bg_col}>
    <p id="f-fact-row-name">{getText(name)}</p>
    <p >{value}</p>
    </FoodFactRow>
}
const getText = (i) => {
    return languageService.getText(i)
}
