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

export default function CompChartBlood() {
    //get theme
    const { theme } = useContext(MyThemeContext)
    //get empty data to fill and share across all comps
    const { healthData, updateHealthData } = useContext(HealthDataContex)
    //this is for displaying when you click a chart
    const openDetailedDataPage = useContext(DetailedDataPageContext)


    useEffect(() => {
        console.log("Chat Blood mounted");
        healthDataService.getBloodPressure().then(res => {
            updateHealthData(HealthDataType.BloodPressure ,res.data);
            
        })
    }, [])


    const getText = (i) => {
        return languageService.getText(i)
    }


    const data_bloodPressure = () => {
        const { data_bloodPressure } = healthData;

        let dates = [];
        let values1 = [];
        let values2 = [];
        //how many records to display in charts-> blood-> blood pressure chart
        let displayedRecs = 7; 
        for (let index = 0; index < data_bloodPressure.length; index++) {
            //leave if we add 7 records or less
            if(index>displayedRecs) break;
            
            dates.push(dateFormat(data_bloodPressure[index].date, "mmm d"));
            values1.push(data_bloodPressure[index].value);
            values2.push(data_bloodPressure[index].value2);
            
        }
        const d = {
            labels: dates,
            datasets: [
                {
                    label: getText('Systolic'),
                    data: values1,
                    backgroundColor: ['rgba(0,0,0,0)'],
                    borderWidth: 2,
                    borderColor: colsGraph[5],
                    lineTension: 0,
                },
                {
                    label: getText('Diastolic'),
                    data: values2,
                    backgroundColor: ['rgba(0,0,0,0)'],
                    borderWidth: 2,
                    borderColor: colsGraph[7],
                    lineTension: 0,
                },
            ],
        }
        return d;
    }



    return (
        <S_container  theme={theme}>

             <S_cart theme={theme} onClick={() => openDetailedDataPage(HealthDataType.BloodPressure)}>
                <S_cart_title theme={theme}>{getText('Blood Pressure')}</S_cart_title>
                <S_cart_body theme={theme}>
                    <Line data={data_bloodPressure()}
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
        height:100%;
        width:100%;
        gap:2rem;
        justify-content:space-around;
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
const S_cart = styled.div`
    // border:1px solid blue;
    background:${props => props.theme === themes.dark ? cols.light_blue : cols.white};    
    width : 29rem;
    height : fit-content;
    display : flex;

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