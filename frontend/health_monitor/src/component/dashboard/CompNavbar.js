import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import ic_logo from '../../../src/Exported Assets/logo.svg'
import ic_user from '../../../src/Exported Assets/ic_face_login.svg'
import ic_charts from '../../../src/Exported Assets/ic_navbar_charts.svg'
import ic_nutrition from '../../../src/Exported Assets/ic_navbar_nutrition.svg'
import ic_admin from '../../../src/Exported Assets/ic_navbar_admin.svg'
import ic_notification from '../../../src/Exported Assets/ic_navbar_notification.svg'
import ic_settings from '../../../src/Exported Assets/ic_navbar_settings.svg'
import ic_logout from '../../../src/Exported Assets/ic_navbar_logout.svg'
import ic_search from '../../../src/Exported Assets/ic_navbar_search.svg'
import ic_moon from '../../Exported Assets/ic_moon.svg'
import ic_sun from '../../Exported Assets/ic_sun.svg'
import '../dashboard/CompNavbar.css';
import { Spring } from 'react-spring/renderprops'
import languageService from '../../service/language.service';
import { MyThemeContext } from '../../App'
import themeService, { cols, themes } from '../../service/theme.service';
import styled from 'styled-components';
export default function CompNavbar(props) {
    const { theme, updateTheme } = useContext(MyThemeContext)
    const {unreadNotifications ,reset}=props;
    const set_dark_theme = () => {
        themeService.setDarkTheme();
        updateTheme()
    }
    const set_light_theme = () => {
        themeService.setLightTheme();
        updateTheme()
    }

    const getText = (t) => {
        return languageService.getText(t)
    }

    const { selectedNavBtn, fn_setSelectedNavBtn, fn_setSelectedSideBtn } = props

    const activeNavBtn = {
        transition: 'background-color 0.5s',
        backgroundColor: 'var(--col_light_blue)',
    };
    const disactiveNavBtn = {
        transition: 'background-color 0.5s',
        backgroundColor: 'transparent',
    };

    const isAdmin = props.isAdmin;
    const logout = props.logout;
    const currentUsername = props.currentUser ? props.currentUser.username : "dummy";
    const fn_setSelectedMenu = (activeNabBtn) => {
        fn_setSelectedNavBtn(activeNabBtn);
        fn_setSelectedSideBtn(0);
    }



    return (
        <div className="dashboard-navbar">
          
            <Spring
                from={{ opacity: 0, marginLeft: -20 }}
                to={{ opacity: 1, marginLeft: 0 }}
                config={{ delay: 300 }}>
                {vals => (
                    <div style={vals} className="navbar-logo">
                        <img src={ic_logo} alt="" />
                    </div>)}
            </Spring>
            <Spring
                from={{ opacity: 0, marginTop: -20 }}
                to={{ opacity: 1, marginTop: 0 }}
                config={{ delay: 500 }}>
                {vals => (
                    <div style={vals} className="navbar-btns">

                        <Link to="/dashboard/charts/blood"
                            onClick={() => fn_setSelectedMenu(0)} className="navbar-btn"
                            style={selectedNavBtn === 0 ? activeNavBtn : disactiveNavBtn}>
                            <img src={ic_charts} alt="" />
                        </Link>

                        <Link to="/dashboard/nutrition/search"
                            onClick={() => fn_setSelectedMenu(1)} className="navbar-btn"
                            style={selectedNavBtn === 1 ? activeNavBtn : disactiveNavBtn}>
                            <img src={ic_nutrition} alt="" />
                        </Link>

                        <Link to="/dashboard/notifications"
                            onClick={() => {fn_setSelectedMenu(2);reset()}} className="navbar-btn"
                            style={selectedNavBtn === 2 ? activeNavBtn : disactiveNavBtn}>
                            <Btn_Notifications>
                                {unreadNotifications.length > 0
                                ?(<div><p>{unreadNotifications.length}</p></div>)
                                :<></>}
                                <img src={ic_notification} alt="" />
                            </Btn_Notifications>
                        </Link>

                        <Link to="/dashboard/settings"
                            onClick={() => fn_setSelectedMenu(3)} className="navbar-btn"
                            style={selectedNavBtn === 3 ? activeNavBtn : disactiveNavBtn}>
                            <img src={ic_settings} alt="" />
                        </Link>

                        {isAdmin ? (
                            <Link to="/dashboard/admin"
                                onClick={() => fn_setSelectedMenu(4)} className="navbar-btn btn_admin"
                                style={selectedNavBtn === 4 ? activeNavBtn : disactiveNavBtn}>
                                <img src={ic_admin} alt="" />
                            </Link>
                        ) : (<></>)
                        }
                        {/* {theme === themes.dark
                        ?(
                            <img onClick={set_light_theme} style={{width:'1.2rem',height:'1.2rem'}} src={ic_sun} alt=""/>
                        )
                        :(
                            <img onClick={set_dark_theme} style={{width:'1.2rem',height:'1.2rem'}} src={ic_moon} alt=""/>
                        )
                        } */}

                        <div onClick={logout} className="navbar-btn">

                            <img src={ic_logout} alt="" />
                        </div>


                    </div>
                )}
            </Spring>
            <Spring
                from={{ opacity: 0, marginTop: -20 }}
                to={{ opacity: 1, marginTop: 0 }}
                config={{ delay: 300 }}>
                {vals => (
                    <div style={vals, theme.bg_veryLightBlueDarkBlue} className="navbar-search">
                        <img className="navbar-search-icon" src={ic_search} alt="" />
                        <input className="navbar-search-input" type="text" placeholder={getText("Search") + "..."} />
                    </div>
                )}
            </Spring>
            <Spring
                from={{ opacity: 0, marginRight: -20 }}
                to={{ opacity: 1, marginRight: 20 }}
                config={{ delay: 1200 }}>
                {vals => (
                    <div style={vals} className="navbar-user">
                        {languageService.getLanguage() !== "ar"
                            ? (getText("Hi") + " " + currentUsername)
                            : (currentUsername + " " + getText("Hi"))}

                        <img src={ic_user} alt="" />
                    </div>)}
            </Spring>
        </div>

    )
}
//#region styled
const Btn_Notifications = styled.div`
position:relative;
border-radius: 5px;
height: 2.5rem;
width: 2.5rem;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;   
>div{
    position:absolute;
    z-index:1;
    right:2px;
    top:2px;
    padding:.1rem;
    background-color:${cols.red};
    border-radius:50%;
    width:35%;
    height:35%;
    display:grid;
    place-items:center;
    >p{
        font-size:.65rem;
        margin:0;
        color:${cols.veryLight_blue};
    }
}
>img{
        height: 40%;
        width: 40%;
    }
`;
//#endregion
