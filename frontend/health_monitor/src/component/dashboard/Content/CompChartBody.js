import React, { useContext, useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { MyThemeContext, } from '../../../App';
import { HealthDataType } from '../../../service/HelperClass';
import languageService from '../../../service/language.service';
import { cols, colsGraph, themes } from '../../../service/theme.service'
import { DetailedDataPageContext, HealthDataContex } from '../../CompDashboard';
import dateFormat from 'dateformat';
import healthDataService from '../../../service/healthData.service';

export default function CompChartBody() {
    //get theme
    const { theme } = useContext(MyThemeContext)
    //get empty data to fill and share across all comps
    const { healthData, updateHealthData } = useContext(HealthDataContex)
    //this is for displaying when you click a chart
    const openDetailedDataPage = useContext(DetailedDataPageContext)




    const getText = (i) => {
        return languageService.getText(i)
    }


  
    const data_Temperature = () => {
        const { data_Temperature } = healthData;

        let dates = [];
        let values1 = [];
        //how many records to display in charts-> blood-> blood pressure chart
        let displayedRecs = 7; 
        for (let index = 0; index < data_Temperature.length; index++) {
            //leave if we add 7 records or less
            if(index>displayedRecs) break;
            
            dates.push(dateFormat(data_Temperature[index].date, "mmm d"));
            values1.push(data_Temperature[index].value);
            
        }
        const d = {
            labels: dates,
            datasets: [
                {
                    label: getText('Value')+" (Celsius )",
                    backgroundColor: 'rgba(255,0,100,.5)',
                    borderColor:'rgba(255,100,10,1)',
                    borderWidth: 1,
                    data:values1,
                    lineTension: .2,
                }
            ],
        }
        return d;
    }
    const data_SleepingHours = () => {
        const { data_SleepingHours } = healthData;

        let dates = [];
        let values1 = [];
        //how many records to display in charts-> blood-> blood pressure chart
        let displayedRecs = 7; 
        for (let index = 0; index < data_SleepingHours.length; index++) {
            //leave if we add 7 records or less
            if(index>displayedRecs) break;
            
            dates.push(dateFormat(data_SleepingHours[index].date, "mmm d"));
            values1.push(data_SleepingHours[index].value);
            
        }
        const d = {
            labels: dates,
            datasets: [
                {
                    label: getText('Value')+" (H)",
                    backgroundColor: 'rgba(10,255,100,.5)',
                    borderColor:'rgba(25,255,100,1)',
                    borderWidth: 1,
                    data:values1,
                    lineTension: .2,
                }
            ],
        }
        return d;
    }

    const data_Weight = () => {
        const { data_Weight } = healthData;

        let dates = [];
        let values1 = [];
        //how many records to display in charts-> blood-> blood pressure chart
        let displayedRecs = 7; 
        for (let index = 0; index < data_Weight.length; index++) {
            //leave if we add 7 records or less
            if(index>displayedRecs) break;
            
            dates.push(dateFormat(data_Weight[index].date, "mmm d"));
            values1.push(data_Weight[index].value);
            
        }
        const d = {
            labels: dates,
            datasets: [
                {
                    label: getText('Value')+" (Kg)",
                    backgroundColor: 'rgba(29,10,100,.5)',
                    borderColor:'rgba(50,10,100,1)',
                    borderWidth: 1,
                    data:values1,
                    lineTension: .2,
                }
            ],
        }
        return d;
    }
    

    return (
        <S_container  theme={theme}>

 

             <S_cart theme={theme} onClick={() => openDetailedDataPage(HealthDataType.Temperature)}>
                <S_cart_title theme={theme}>{getText('Temperature')}</S_cart_title>
                <S_cart_body theme={theme}>
                    <Line data={data_Temperature()}
                        options={{ responsive: true, }}
                    />
                </S_cart_body>
            </S_cart> 

            
             <S_cart theme={theme} onClick={() => openDetailedDataPage(HealthDataType.SleepingHours)}>
                <S_cart_title theme={theme}>{getText('Sleeping Hours')}</S_cart_title>
                <S_cart_body theme={theme}>
                    <Bar data={data_SleepingHours()}
                        options={{ responsive: true, }}
                    />
                </S_cart_body>
            </S_cart> 

            
            
             <S_cart theme={theme} onClick={() => openDetailedDataPage(HealthDataType.Weight)}>
                <S_cart_title theme={theme}>{getText('Weight')}</S_cart_title>
                <S_cart_body theme={theme}>
                    <Line data={data_Weight()}
                        options={{ responsive: true, }}
                    />
                </S_cart_body>
            </S_cart> 
            
        

        </S_container>
    );

}
//#region styled components 

const S_container = styled.div`
        background:${props => props.theme === themes.dark ? cols.dark_blue : cols.unclear_white};    

        display : flex;
        flex-wrap:wrap;
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
const S_cart = styled.div`
    // border:1px solid blue;
    background:${props => props.theme === themes.dark ? cols.light_blue : cols.white};    
    width : 29rem;
    height : fit-content;
    display : flex;
    margin-left:1rem;
        
    flex-direction : column;
    border-radius:10px;
    :hover {
        box-shadow : 0 0 1rem ${cols.blue};
        transition: box-shadow .2s;
    }
    transition: background 1s;
    `;
const S_cart_title = styled.p`
        ${props => props.theme.col_darkBlueVeryLightBlue};
        font-size : larger;
        font-weight : 700;
        padding :.5rem 0 0 .5rem;
        margin-top:0;
    `;
const S_cart_body = styled.div`
        ${props => props.theme.bg_darkBlueVeryLightBlue};
        background-color:${cols.white};
        margin-left:.5rem;
        margin-right:.5rem;
        margin-bottom:.5rem;
        height :fit-content;
        border-radius:10px;
        box-shadow : 0 0 1rem rgba(0,0,0,.2)
        // border:1px solid red;
    `;

    //#endregion