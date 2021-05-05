import React, { useContext } from 'react'
import styled from 'styled-components';
import { ActiveNotifyContext, MyThemeContext } from '../../App';
import themeService, { cols, themes } from '../../service/theme.service';
import '../dashboard/CompSidebar.css'
import CompSidebarBtns from './sidebar_charts/CompSidebarBtns'
import ic_moon from '../../Exported Assets/ic_moon.svg'
import ic_sun from '../../Exported Assets/ic_sun.svg'
export default function CompContent2(props) {
    const { theme, updateTheme } = useContext(MyThemeContext)
    const fn_notifyMe = useContext(ActiveNotifyContext)
    const set_dark_theme = () => {
        themeService.setDarkTheme();
        updateTheme()
    }
    const set_light_theme = () => {
        themeService.setLightTheme();
        updateTheme()
    }
    const {selectedSideBtn ,fn_setSelectedSideBtn}=props;
    return (
        <>
            <CompSidebarBtns  selectedSideBtn={selectedSideBtn} fn_setSelectedSideBtn={fn_setSelectedSideBtn} selectedNavBtn={props.selectedNavBtn} />
            <ThemeSetter>
                {theme === themes.dark
                    ? (
                        <img onClick={set_light_theme} src={ic_sun} alt="" />
                    )
                    : (
                        <img onClick={set_dark_theme} src={ic_moon} alt="" />
                    )
                }
            </ThemeSetter>
        </>
    )

}
const ThemeSetter = styled.div`
    position:absolute;
    bottom:0;
    transform:translate(1.5rem,-1.5rem);
    width:2rem;
    height:2rem;
    display:grid;
    place-content:center;
    border-radius:50%;
    opacity:.5;
    border:1.5px solid${cols.light_blue};
    img{
        filter:grayscale(1);
        width:1rem;
        height:1rem;
        padding:.8rem;
    }
    :hover{
        img{
            filter:grayscale(0);
        }
    opacity:1;
    }
    transition:all .3s;
`;
