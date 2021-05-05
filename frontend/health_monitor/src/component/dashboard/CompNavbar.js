import React, { useContext, useState } from 'react'
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

import '../dashboard/CompNavbar.css';
import { Spring } from 'react-spring/renderprops'
import languageService from '../../service/language.service';
import { ActiveNotifyContext, MyThemeContext } from '../../App'
import themeService, { cols, themes } from '../../service/theme.service';
import styled from 'styled-components';
import { NotifyMeType } from '../../service/notifications.service';
const themeChange={
    dark:{
        backgroundColor:cols.black
        ,transition:"all .5s"
        ,borderRadius:"0",
    },
    light:{
        backgroundColor:cols.blue
        ,transition:"all .5s"
        ,borderRadiusBottomLeft:"var(--radius)",
    },
    
}
export default function CompNavbar(props) {
    const { theme } = useContext(MyThemeContext)
    const fn_notifyMe = useContext(ActiveNotifyContext)
    const [SearchQuery, setSearchQuery] = useState("")
    const [SearchResults, setSearchResults] = useState([])
    const {unreadNotifications ,reset}=props;

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
    
    const searchLocations=[
        {to:"/dashboard/settings",name:"Settings",keyWords:"settings theme language",navIndx:3,sideIndx:0},
        {to:"/dashboard/settings",name:"Set Language",keyWords:"settings language",navIndx:3,sideIndx:0},
        {to:"/dashboard/settings",name:"Set Theme",keyWords:"settings theme dark light",navIndx:3,sideIndx:0},
        
        {to:"/dashboard/notifications",name:"Notifications",keyWords:"notifications",navIndx:2,sideIndx:0},
        
        {to:"/dashboard/nutrition/search",name:"Search Food Facts",keyWords:"search food nutrition facts",navIndx:1,sideIndx:0},
        {to:"/dashboard/nutrition/generatemeal",name:"Generate Meal",keyWords:"generate food nutrition",navIndx:1,sideIndx:1},
        {to:"/dashboard/nutrition/customizedmeal",name:"Customized Meals",keyWords:"vegan paleo vegetarian generate customized food nutrition",navIndx:1,sideIndx:2},
        
        {to:"/dashboard/charts/blood",name:"Blood Pressure",keyWords:"blood pressure charts",navIndx:0,sideIndx:0},
        {to:"/dashboard/charts/blood",name:"Sugar Levels",keyWords:"blood sugar levels charts",navIndx:0,sideIndx:0},
        {to:"/dashboard/charts/blood",name:"Cholesterol Levels",keyWords:"blood charts cholesterol levels",navIndx:0,sideIndx:0},
        {to:"/dashboard/charts/blood",name:"Pulse Rate",keyWords:"charts pulse blood  rate ",navIndx:0,sideIndx:0},
        {to:"/dashboard/charts/blood",name:"Respiration Rate",keyWords:"charts blood respitation rate",navIndx:0,sideIndx:0},

        {to:"/dashboard/charts/body",name:"Temperature",keyWords:"body tempirature",navIndx:0,sideIndx:1},
        {to:"/dashboard/charts/body",name:"Sleeping Hours",keyWords:"body sleeping hours",navIndx:0,sideIndx:1},
        {to:"/dashboard/charts/body",name:"Weight",keyWords:"body weight",navIndx:0,sideIndx:1},
    ]
    const HandleOnChangeSearch=(e)=>{
        const {value}= e.target; 
        setSearchQuery(value);
        if(value.length<=0)
        {
            setSearchResults([]);
            return;
         }
        let v=[]
        searchLocations.forEach(s => {
            let tmp= e.target.value.toLowerCase();
            if(s.keyWords.includes(tmp)){
               v.push(s) 
            }
        });
        setSearchResults(v);
    }
    const fn_search=(s)=>{
        fn_setSelectedNavBtn(s.navIndx);
        fn_setSelectedSideBtn(s.sideIndx);
        setSearchResults([])
        setSearchQuery("")
    }
    const inputSearchResults=SearchResults.map((m,i)=>{
        return <Link style={{textDecoration:'none'}} key={i} to={m.to} onClick={()=>fn_search(m)}>
        <SearchSelect  >
           {m.name}
        </SearchSelect>
        </Link>
    })
    return (
        <div style={theme===themes.dark?themeChange.dark:themeChange.light} className="dashboard-navbar">
          
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
                            <Link to="/dashboard/admin/general"
                                onClick={() => fn_setSelectedMenu(4)} className="navbar-btn btn_admin"
                                style={selectedNavBtn === 4 ? activeNavBtn : disactiveNavBtn}>
                                <img src={ic_admin} alt="" />
                            </Link>
                        ) : (<></>)
                        }
                      

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
                    <div style={vals, {backgroundColor:cols.veryLight_blue}} className="navbar-search">
                        <div  className="container-navbar-search-icon">
                        <img  className="navbar-search-icon" src={ic_search} alt="" />
                        </div>

                        <SearchContainer style={{width:"100%"}}>
                        <input onChange={(e)=>{HandleOnChangeSearch(e)}} value={SearchQuery} placeholder={getText("Search") + "..."} className="navbar-search-input"/>
                        <SearchSelectContainer>
                            <span onClick={()=>{setSearchResults([]);setSearchQuery("")}}>x</span>
                            {inputSearchResults}
                        </SearchSelectContainer>
                        </SearchContainer>
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
const SearchSelect = styled.p`
    padding-left:1rem;
    color:${cols.unclear_white};
    
    :hover{
        color:${cols.dark_blue};
    }
    transition:all .35s;
    
    `;
    const SearchSelectContainer = styled.div`
    background-color:${cols.light_blue};
    position:absolute;
    z-index:10;
    width:100%;
    >span{
        position:absolute;
        opacity:.5;
        top:-25px;
        right:10px;
        padding:2px 10px;
        font-weight:600;
        color:${cols.red};
        cursor:pointer;
        :hover{
            opacity:1;

        }
    }
    `;
    
    const SearchContainer = styled.div`
    position:relative;

`;

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
