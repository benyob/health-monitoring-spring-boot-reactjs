import React, { useContext } from 'react'
import themeService from '../../../service/theme.service'
import {MyThemeContext} from '../../../App'
import languageService from '../../../service/language.service'
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
    
    return (
        <div>
        <button style={{margin:'1rem'}} onClick={set_dark_theme}>Set dark theme</button>
        <button style={{margin:'1rem'}} onClick={set_light_theme}>Set light theme</button>
        <button style={{margin:'1rem'}} onClick={languageService.setEngLanguage}>Set English</button>
        <button style={{margin:'1rem'}} onClick={languageService.setFrLanguage}>Set Frensh</button>
        <button style={{margin:'1rem'}} onClick={languageService.setArLanguage}>Set Arabic</button>
        </div>
      );
}
