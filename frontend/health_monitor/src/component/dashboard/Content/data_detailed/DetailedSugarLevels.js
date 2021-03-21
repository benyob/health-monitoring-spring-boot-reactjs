import React from 'react'
import styled from 'styled-components';
import { cols } from '../../../../service/theme.service';

export default function DetailedSugarLevels() {
    
    return (
        <S_container col='red' width='35rem' height='40rem'>
           Edit Sugar Levels Data
    </S_container>
)
}
const S_container = styled.div`
    background-color:${cols.veryLight_blue};
    margin:0 auto;

`;
