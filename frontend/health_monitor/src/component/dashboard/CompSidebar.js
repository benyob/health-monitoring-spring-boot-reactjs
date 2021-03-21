import React from 'react'
import '../dashboard/CompSidebar.css'
import CompSidebarBtns from './sidebar_charts/CompSidebarBtns'
export default function CompContent2(props) {

    const {selectedSideBtn ,fn_setSelectedSideBtn}=props;
    return (
        <CompSidebarBtns  selectedSideBtn={selectedSideBtn} fn_setSelectedSideBtn={fn_setSelectedSideBtn} selectedNavBtn={props.selectedNavBtn} />
    )

}
