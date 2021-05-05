import React, { useContext } from 'react'
import themeService, { cols, themes } from '../../../service/theme.service'
import {MyThemeContext} from '../../../App'
import languageService from '../../../service/language.service'
import styled from 'styled-components'
export default function CompSettings() {

    const {theme,updateTheme} = useContext(MyThemeContext)
    const set_dark_theme = ()=>{
        themeService.setDarkTheme();
        updateTheme()
    }
    const set_light_theme = ()=>{
        themeService.setLightTheme();
        updateTheme()
    }
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
            
            //style={theme===themes.dark?themeChange.dark:themeChange.light}
        },
        
    }
    return (
        <Container style={theme===themes.dark?themeChange.dark:themeChange.light}>

        <Title theme={theme}>{getText('Theme')}</Title>
        <Button style={{margin:'1rem'}} onClick={set_dark_theme}>{getText('Dark')}</Button>
        <Button style={{margin:'1rem'}} onClick={set_light_theme}>{getText('Light')}</Button>

        <Title theme={theme}>{getText('Language')}</Title>
        <Button style={{margin:'1rem'}} onClick={languageService.setEngLanguage}>{getText('English')}</Button>
        <Button style={{margin:'1rem'}} onClick={languageService.setFrLanguage}>{getText('French')}</Button>
        <Button style={{margin:'1rem'}} onClick={languageService.setArLanguage}>{getText('Arabic')}</Button>
        </Container>
      );
}
const Button = styled.button`
    padding:1rem 1.5rem;
    border:2px solid ${cols.blue};
    background-color:${cols.unclear_white};
    color:${cols.blue};
    border-radius:.5rem;
    font-weight:600;
    :hover{
        border-radius:0;
        border:2px solid ${cols.blue};
        background-color:${cols.blue};
        color:${cols.unclear_white};
    }
    transition:all .5s;
    
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

    const Container = styled.div`


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