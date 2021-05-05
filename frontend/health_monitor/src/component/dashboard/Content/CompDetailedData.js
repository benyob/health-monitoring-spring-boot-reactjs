import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { HealthDataType } from '../../../service/HelperClass';
import { cols, themes } from '../../../service/theme.service';
import DetailedBloodPressure from './data_detailed/DetailedBloodPressure';
import DetailedSugarLevels from './data_detailed/DetailedSugarLevels';
import DetailedCholesterolLevels from './data_detailed/DetailedCholesterolLevels';
import DetailedPulseRate from './data_detailed/DetailedPulseRate';
import DetailedRespirationRate from './data_detailed/DetailedRespirationRate';
import DetailedTemperature from './data_detailed/DetailedProtein';
import DetailedSleepingHours from './data_detailed/DetailedSleepingHours';
import DetailedWeight from './data_detailed/DetailedWeight';
import { MyThemeContext } from '../../../App';
import ReactTooltip from 'react-tooltip';
import adminService from '../../../service/admin.service';
import DetailedProtein from './data_detailed/DetailedProtein';
import DetailedCalories from './data_detailed/DetailedCalories';
import DetailedSodium from './data_detailed/DetailedSodium';
import DetailedCarbohydrate from './data_detailed/DetailedCarbohydrate';
const themeChange={
    dark:{
         backgroundColor:"rgba(0,0,0,0.8)",
        transition:"all .5s",

    },
    light:{
        backgroundColor:"rgba(255,255,255,0.9)"
        ,transition:"all .5s"
    },
    
}
export default function CompDetailedData(props) {
    const { theme } = useContext(MyThemeContext)
    const [refValuesList, setRefValuesList] = useState({
    BloodPressure:"BloodPressure",
    SugarLevels:"SugarLevels",
    PulseRate:"PulseRate",
    RespirationRate:"RespirationRate",
    CholesterolLevels:"CholesterolLevels",
    Temperature:"Temperature",
    SleepingHours:"SleepingHours",
    Weight:"Weight",
    Calories :"Calories",
    Sodium  :"Sodium",
    Carbohydrate :"Carbohydrate",
    Protein :"Protein",
})
    useEffect(() => {
        adminService.getFloatValuesShortcut(HealthDataType.BloodPressure).then(r=>{
            fn_setRefVal("BloodPressure",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.SugarLevels).then(r=>{
            fn_setRefVal("SugarLevels",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.CholesterolLevels).then(r=>{
            fn_setRefVal("CholesterolLevels",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.PulseRate).then(r=>{
            fn_setRefVal("PulseRate",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.RespirationRate).then(r=>{
            fn_setRefVal("RespirationRate",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.SleepingHours).then(r=>{
            fn_setRefVal("SleepingHours",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.Temperature).then(r=>{
            fn_setRefVal("Temperature",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.Weight).then(r=>{
            fn_setRefVal("Weight",r.data);
        });
        //* */
        adminService.getFloatValuesShortcut(HealthDataType.Protein).then(r=>{
            fn_setRefVal("Protein",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.Carbohydrate).then(r=>{
            fn_setRefVal("Carbohydrate",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.Sodium).then(r=>{
            fn_setRefVal("Sodium",r.data);
        });
        adminService.getFloatValuesShortcut(HealthDataType.Calories).then(r=>{
            fn_setRefVal("Calories",r.data);
        });
        
    }, [])

    const { fn_hide } = props;
    const { content } = props;

    const fn_setRefVal=(type ,value)=>{
        setRefValuesList(prevState => ({
            ...prevState,
            [type]: value
        }));
    }    

   
    return (

        <Container style={theme===themes.dark?themeChange.dark:themeChange.light}>
             <ReactTooltip multiline={true} type="dark"/>
            <ClosePage onClick={fn_hide}>
                X
            </ClosePage>

            {content === HealthDataType.BloodPressure ? (<DetailedBloodPressure refValue={refValuesList.BloodPressure}/>) : <></>}
            {content === HealthDataType.SugarLevels ? (<DetailedSugarLevels refValue={refValuesList.SugarLevels}/>) : <></>}
            {content === HealthDataType.CholesterolLevels ? (<DetailedCholesterolLevels refValue={refValuesList.CholesterolLevels}/>) : <></>}
            {content === HealthDataType.PulseRate ? (<DetailedPulseRate refValue={refValuesList.PulseRate} />) : <></>}
            {content === HealthDataType.RespirationRate ? (<DetailedRespirationRate refValue={refValuesList.RespirationRate}/>) : <></>}
            {content === HealthDataType.Weight ? (<DetailedWeight refValue={refValuesList.Weight}/>) : <></>}
            {content === HealthDataType.SleepingHours ? (<DetailedSleepingHours refValue={refValuesList.SleepingHours}/>) : <></>}
            {content === HealthDataType.Temperature ? (<DetailedTemperature refValue={refValuesList.Temperature}/>) : <></>}
            {content === HealthDataType.Protein ? (<DetailedProtein refValue={refValuesList.Protein}/>) : <></>}

            {content === HealthDataType.Sodium ? (<DetailedSodium refValue={refValuesList.Sodium}/>) : <></>}
            {content === HealthDataType.Carbohydrate ? (<DetailedCarbohydrate refValue={refValuesList.Carbohydrate}/>) : <></>}
            {content === HealthDataType.Calories ? (<DetailedCalories refValue={refValuesList.Calories}/>) : <></>}
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

    // backdrop-filter:blur(10px);
    background-color:rgba(255,255,255,0.7);
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
    background-color:${cols.red};
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
