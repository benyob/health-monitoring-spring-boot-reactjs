import dateFormat from 'dateformat';
import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components'
import { MyThemeContext } from '../../../../App';
import healthDataService from '../../../../service/healthData.service';
import { HealthDataType } from '../../../../service/HelperClass';
import languageService from '../../../../service/language.service';
import { cols, colsGraph, themes } from '../../../../service/theme.service';
import { HealthDataContex } from '../../../CompDashboard';


export default function DetailedBloodPressure() {

    //get empty data to fill and share across all comps
    const { healthData, updateHealthData } = useContext(HealthDataContex)
    const { data_bloodPressure } = healthData;

    //get theme
    const { theme } = useContext(MyThemeContext)
    const getText = (i) => {
        return languageService.getText(i)
    }
    //state
    const [placeHolders, setPlaceHolders] = useState({ value: 0, value2: 0, date: '', note: '' });

    const handlePlaceHolder = (e) => {
        const { name, value } = e.target;
        setPlaceHolders(prevState => ({
            ...prevState, [name]: value
        }))

    }
    const chartData_bloodPressure = () => {

        let dates = [];
        let values1 = [];
        let values2 = [];
        //how many records to display in charts-> blood-> blood pressure chart
        let displayedRecs = 15;
        for (let index = 0; index < data_bloodPressure.length; index++) {
            //leave if we add 7 records or less
            //if (index > displayedRecs) break;

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
                    borderColor: colsGraph[10],
                    lineTension: 0,
                },
                {
                    label: getText('Diastolic'),
                    data: values2,
                    backgroundColor: ['rgba(0,0,0,0)'],
                    borderWidth: 2,
                    borderColor: colsGraph[2],
                    lineTension: 0,
                },
            ],
        }
        return d;
    }

    const addDataBloodPressure = (e) => {
        //add in global ddata
        e.preventDefault();
        //update here
        data_bloodPressure.push(placeHolders);
        updateHealthData(HealthDataType.BloodPressure, data_bloodPressure);

        //update in server
        //update in server
        healthDataService.setBloodPressure(placeHolders).then(res=>{
            console.log(res.data);

        });
    }

    return (
        <Container>

            <S_cart_title theme={theme}>{getText('Blood Pressure')}</S_cart_title>
            <S_cart theme={theme} >
                <S_cart_body theme={theme}>
                    <Line data={chartData_bloodPressure()}
                        options={{ maintainAspectRatio: false }}
                    />
                </S_cart_body>
            </S_cart>

            <S_cart_title theme={theme}>{getText('Add Records')}</S_cart_title>
            <div style={{ width: '100%', height: '15rem' }}>
                <form onSubmit={(e)=>addDataBloodPressure(e)}>

                    <input type="text"  onChange={(e) => { handlePlaceHolder(e) }} name="note" placeholder="note .." />
                    <input type="date" required onChange={(e) => { handlePlaceHolder(e) }} name="date" placeholder="date .." />
                    <input type="number" required onChange={(e) => { handlePlaceHolder(e) }} name="value" placeholder="val 2" />
                    <input type="number" required onChange={(e) => { handlePlaceHolder(e) }} name="value2" placeholder="val 2" />
                    <input type="submit" value='Add' onSubmit={(e)=>addDataBloodPressure(e)}/>
                </form>
            </div>
        </Container>
    )
}
//#region style

const Container = styled.div`
        width:80%;
        height:fit-content;
        display:flex;
        flex-direction:column;
        gap:2rem;

        
    `;

const S_cart = styled.div`
    // border:1px solid blue;
    background:${props => props.theme === themes.dark ? 'black' : 'white'};    
    height : 100%;
    width:100%;
    display : flex;
    :hover {
        box-shadow : 0 0 1rem ${cols.blue};
    }
    flex-direction : column;
    border-radius:10px;
    
    transition: background-color 1s;
    transition: box-shadow .2s;
    `;
const S_cart_title = styled.p`
        ${props => props.theme.col_darkBlueVeryLightBlue};
        background-color:${cols.unclear_white};
        font-size : 1.5rem;
        font-weight : 700;
        padding :1rem;
        border-radius:10px;
        
    `;
const S_cart_body = styled.div`
        ${props => props.theme.bg_darkBlueVeryLightBlue};
        background-color:${cols.white};
        margin:.5rem;
        height :fit-content;
        height:15rem;
        border-radius:10px;
        box-shadow : 0 0 1rem rgba(0,0,0,.2)
        // border:1px solid red;
    `;

    //#endregion