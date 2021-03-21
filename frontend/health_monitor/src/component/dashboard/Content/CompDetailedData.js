import React, { useState } from 'react'
import styled from 'styled-components'
import { HealthDataType } from '../../../service/HelperClass';
import { cols } from '../../../service/theme.service';
import DetailedBloodPressure from './data_detailed/DetailedBloodPressure';
import DetailedSugarLevels from './data_detailed/DetailedSugarLevels';

export default function CompDetailedData(props) {
    const { show, fn_hide } = props;
    const { content } = props;

    return (

        <Container show={show}>
            <ClosePage onClick={fn_hide}>
                X
            </ClosePage>
            {content === HealthDataType.BloodPressure ? (<DetailedBloodPressure />) : <></>}
            {content === HealthDataType.SugarLevels ? (<DetailedSugarLevels />) : <></>}
        </Container>

    )
}
const Container = styled.div`
    position:absolute;

    backdrop-filter:blur(8px);
    padding-top:4rem;

    z-index :${props => props.show ? (10) : (-10)};
    
    height:100vh;
    width:100vw;
    
    display:flex;
    justify-content:center;

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
