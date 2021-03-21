import React from 'react'
import { Link } from 'react-router-dom'
import ic_sidebar_blood from '../../../Exported Assets/ic_sidebar_blood.svg'
import ic_sidebar_body from '../../../Exported Assets/ic_sidebar_body.svg'
import ic_sidebar_nutrition from '../../../Exported Assets/ic_sidebar_nutrition.svg'
import ic_sidebar_search from '../../../Exported Assets/ic_sidebar_search.svg'
import ic_sidebar_generatemeal from '../../../Exported Assets/ic_sidebar_generatemeal.svg'
import ic_sidebar_notification from '../../../Exported Assets/ic_sidebar_notification.svg'
import ic_sidebar_settings from '../../../Exported Assets/ic_sidebar_settings.svg'
import ic_sidebar_admin from '../../../Exported Assets/ic_sidebar_admin.svg'
import languageService from '../../../service/language.service'
export default function CompSidebarBtns(props) {
    const getText = (t) => {
        return languageService.getText(t)
    }
    const btns_charts = [
        { name: getText("Blood"), to:'/dashboard/charts/blood', ic:ic_sidebar_blood,id: 0 },
        { name: getText("Body"), to:'/dashboard/charts/body',ic:ic_sidebar_body, id: 1 },
        { name: getText("Nutrition"), to:'/dashboard/charts/nutrition',ic:ic_sidebar_nutrition, id: 2 }]
    const btns_nutrition = [
        { name: getText("Search"),to:'/dashboard/nutrition/search', ic:ic_sidebar_search, id: 0 },
        { name: getText("Generate Meal"),to:'/dashboard/nutrition/generatemeal', ic:ic_sidebar_generatemeal, id: 1 }]
    
    const btns_notification = [
        { name: getText("Notifications"),to:'/dashboard/notification', ic:ic_sidebar_notification, id: 0 }
    ]
    const btns_settings = [
        { name: getText("Settings"),to:'/dashboard/settings', ic:ic_sidebar_settings, id: 0 }
    ]
    
    const btns_admin = [
        { name: getText("Admin"),to:'/dashboard/admin', ic:ic_sidebar_admin, id: 0 }
    ]
    
    const sidebar_menues=[
        {title:getText("Charts"),btns:btns_charts},
        {title:getText("Nutrition"),btns:btns_nutrition},
        {title:getText("Notifications"),btns:btns_notification},
        {title:getText("Settings"),btns:btns_settings},
        {title:getText("Admin"),btns:btns_admin}
    ]
    const {selectedNavBtn, selectedSideBtn,fn_setSelectedSideBtn} = props;
    const selectedTitle = ()=>{
        return  sidebar_menues[selectedNavBtn].title
    }
    const styleActiveSideBtn = {
        backgroundColor: 'var(--col_veryLight_blue)',
    };
    const styleDisctiveSideBtn = {
        backgroundColor: 'white',
    };
    const styleActiveSideBtnIcon = {
        backgroundColor: 'white',
    };
    const styleDisctiveSideBtnIcon = {
        backgroundColor: 'var(--col_veryLight_blue)',
    };
    const styleActiveSideBtnTitle = {
        color: 'var(--col_blue)',
    };
    const styleDisctiveSideBtnTitle = {
        color: 'var(--col_dark_blue)',
    };


    const btns = sidebar_menues[selectedNavBtn].btns.map(b => {
        return (
            <Link to={b.to} 
            style={selectedSideBtn===b.id?styleActiveSideBtn:styleDisctiveSideBtn}
            onClick={()=>fn_setSelectedSideBtn(b.id)} className="sidebar-btn" key={b.id}>
                <div  style={selectedSideBtn===b.id?styleActiveSideBtnIcon:styleDisctiveSideBtnIcon}
                className="sidebar-btn-icon">
                    <img src={b.ic} alt=""/>
                </div>
                <p style={selectedSideBtn===b.id?styleActiveSideBtnTitle:styleDisctiveSideBtnTitle}
                >{b.name}</p>
            </Link>
        )
    })
    return (
        <div className="dashboard-sidebar">
            <h3 className="h3-big-title">{selectedTitle()}</h3>
            <div className="sidebar-btns">
                {btns}
            </div>
        </div>
    )
}
