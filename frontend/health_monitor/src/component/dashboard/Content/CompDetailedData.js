import React, { useState } from 'react'
import styled from 'styled-components'
import { HealthDataType } from '../../../service/HelperClass';
import { cols } from '../../../service/theme.service';
import DetailedBloodPressure from './data_detailed/DetailedBloodPressure';
import DetailedSugarLevels from './data_detailed/DetailedSugarLevels';
import DetailedCholesterolLevels from './data_detailed/DetailedCholesterolLevels';
import DetailedPulseRate from './data_detailed/DetailedPulseRate';
import DetailedRespirationRate from './data_detailed/DetailedRespirationRate';
import DetailedTemperature from './data_detailed/DetailedTemperature';
import DetailedSleepingHours from './data_detailed/DetailedSleepingHours';
import DetailedWeight from './data_detailed/DetailedWeight';

export default function CompDetailedData(props) {
    const { fn_hide } = props;
    const { content } = props;

    //see more message
    const [seeMore, setSeeMore] = useState(true)
    return (

        <Container >
             
            <ClosePage onClick={fn_hide}>
                X
            </ClosePage>
            {content === HealthDataType.BloodPressure ? (<DetailedBloodPressure />) : <></>}
            {content === HealthDataType.SugarLevels ? (<DetailedSugarLevels />) : <></>}
            {content === HealthDataType.CholesterolLevels ? (<DetailedCholesterolLevels />) : <></>}
            {content === HealthDataType.PulseRate ? (<DetailedPulseRate />) : <></>}
            {content === HealthDataType.RespirationRate ? (<DetailedRespirationRate />) : <></>}
            {content === HealthDataType.Weight ? (<DetailedWeight />) : <></>}
            {content === HealthDataType.SleepingHours ? (<DetailedSleepingHours />) : <></>}
            {content === HealthDataType.Temperature ? (<DetailedTemperature />) : <></>}
        </Container>

    )
}
const SeeMore = styled.div`
    width:100vw;
    height:100vh;
    background-color:red;
    position:absolute;
    z-index:100;
`;
const Container = styled.div`
    position:absolute;

    backdrop-filter:blur(10px);
    padding-top:4rem;
    

    z-index :10;
    
    height:100vh;
    width:100vw;
    
    //padding-left:10rem;
    
    overflow:scroll;
 
    &::-webkit-scrollbar{
        background-color: rgba(0, 0, 0, .1);
        width: .7rem;
        
    }
    
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        width: .2rem;
        background-color: ${cols.dark_blue};
    }
`;

const ClosePage = styled.div`
    position:fixed;
    background-color:${cols.dark_blue};
    left:10px;
    top:10px;

    width :2rem;    
    height :2rem;
    
    border-radius:10px;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    box-shadow:0 0 1rem rgba(0,0,0,0.5);
    &:hover{
        // width :2.2rem;    
        // height :2.2rem;
        box-shadow:0 0 1rem ${cols.light_blue};
    }

`;
