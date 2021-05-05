import dateFormat from 'dateformat';
import React, { useState, useEffect, useContext } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import styled, { css } from 'styled-components'
import { MyThemeContext } from '../../../../App';
import healthDataService from '../../../../service/healthData.service';
import { HealthDataType } from '../../../../service/HelperClass';
import languageService from '../../../../service/language.service';
import { cols, colsGraph, themes, icons, colsRgba } from '../../../../service/theme.service';
import { HealthDataContex } from '../../../CompDashboard';

export default function DetailedSugarLevels(props) {

    //get empty data to fill and share across all comps
    const { healthData, updateHealthData } = useContext(HealthDataContex)
    const [chartType, setChartType] = useState("line")
    const [nbrOfDisplayerRecords, setNbrOfDisplayerRecords] = useState(4);
    const [indexOpenedRecordRow, setIndexOpenedRecordRow] = useState(-1);
    const [indexEditedRecordRow, setIndexEditedRecordRow] = useState(-1);
    const { data_sugarLevels } = healthData;

    //get theme
    const { theme } = useContext(MyThemeContext)
    const getText = (i) => {
        return languageService.getText(i)
    }
    //state
    const [placeHolders, setPlaceHolders] = useState({ value: 0, date:dateFormat(Date.now(),'yyyy-mm-dd'), note: '' });


    const handlePlaceHolder = (e) => {
        const { name, value } = e.target;
        setPlaceHolders(prevState => ({
            ...prevState, [name]: value
        }))

    }

    const chartData_sugarLevels = () => {

        let dates = [];
        let values1 = [];
        //how many records to display in charts-> blood-> blood pressure chart
        let displayedRecs = 15;
        for (let index = 0; index < data_sugarLevels.length; index++) {
            //leave if we add 7 records or less
            //if (index > displayedRecs) break;

            dates.push(dateFormat(data_sugarLevels[index].date, "mmm d"));
            values1.push(data_sugarLevels[index].value);

        }
        var barChartData = {
			labels: dates,
			datasets: [{
				label: getText('Value')+" (mmol/L)",
				backgroundColor: colsRgba[6],
				borderColor:'rgba(255,100,100,1)',
				borderWidth: 1,
				data:values1,
				
			},]

		};
        return barChartData;
    }

    const addDataSugarLevels = (e) => {
        //add in global ddata
        e.preventDefault();
        //update here

        //add data to server
        healthDataService.setHealthData( HealthDataType.SugarLevels,placeHolders).then(res => {
            //then get data from server
            updateHealthData(HealthDataType.SugarLevels);
        });
    }
    const editDataSugarLevels = () => {
        //update data to server
        const {value ,value2 ,date ,note} = placeHolders;
        healthDataService.updateHealthData(HealthDataType.SugarLevels ,{id:indexEditedRecordRow,value:value ,value2:value2 ,date:date ,note:note}).then(res => {
            //then get data from server
            updateHealthData(HealthDataType.SugarLevels);
        });
        setIndexEditedRecordRow(-1);
    }
    let indexColorRecords = -1;
    const recordsDisplayer = data_sugarLevels.map(d => {
        indexColorRecords++;
        return <RecordRow backgroundColor={indexColorRecords % 2 === 0 ? 'white' : cols.veryLight_blue} value key={d.id}>

            <p>{d.value}</p>
            <p>{dateFormat(d.date, "mmmm d ,yyyy")}</p>
            {/* <p>{d.note} ({d.id})</p> */}
            <p>{d.note}</p>
            <EditRecordRow open={d.id === indexOpenedRecordRow}>
                <img onClick={d.id !== indexOpenedRecordRow ? () => setIndexOpenedRecordRow(d.id) : () => setIndexOpenedRecordRow(-1)} id="edit-row-arrow" src={icons.ic_arrow_left} alt="" />
                <div>
                    <img onClick={() => handleDeleteRecord(d.id)} id="edit-row-delete" src={icons.ic_delete} alt="" />
                    <img onClick={() => handleEditRecord(d)} id="edit-row-edit" src={icons.ic_edit} alt="" />
                </div>
            </EditRecordRow>
        </RecordRow>
    })


    const handleEditRecord = (data) => {
        //set these values in plcae holder to update inputs
        setPlaceHolders({value: data.value, date: dateFormat(data.date,'yyyy-mm-dd'), note: data.note})

        //change add btn to save or cancel
        setIndexEditedRecordRow(data.id);
    }
    const handleDeleteRecord = (id) => {
        console.log("delete record");
        //delete
        healthDataService.deleteRecord(HealthDataType.SugarLevels, id).then(r => {
            //update data
            updateHealthData(HealthDataType.SugarLevels);
        })
    }

    return (
        <Container>

            <S_cart_title theme={theme}>{getText('Sugar Levels')}</S_cart_title>
            <S_cart  >
                <S_cart_body theme={theme}>
                    {chartType === 'line'
                        ? <Line data={chartData_sugarLevels()}
                            options={{ maintainAspectRatio: false }}
                        />
                        : <></>}
                    {chartType === 'bar'
                        ? <Bar data={chartData_sugarLevels()}
                            options={{ maintainAspectRatio: false }}
                        />
                        : <></>}
                </S_cart_body>
                <Flag>
                <p data-tip={props.refValue}>{getText("Reference Value")}</p>
                    <div>

                        <p onClick={() => setChartType('line')}>
                            <img src={icons.ic_line} alt="" />
                        </p>
                        <p onClick={() => setChartType('bar')}>
                            <img src={icons.ic_bar} alt="" />
                        </p>
                    </div>
                </Flag>
            </S_cart>

            <S_cart_title theme={theme}>{getText('Records')}</S_cart_title>
            <Cont_TableRecord>
            <RecordRow title="true">                    <p>{getText("Value")}</p>
                    <p>{getText("Measurement Date")}</p>
                    <p>{getText("Note")}</p>
                </RecordRow>
            </Cont_TableRecord>
            {recordsDisplayer.length !== 0 ?
                <ScrollCntainerRecods>
                    {recordsDisplayer.length - nbrOfDisplayerRecords > 0
                        ? <p onClick={() => setNbrOfDisplayerRecords(nbrOfDisplayerRecords + 1)}>{getText('Show More') + " !"}</p>
                        : <></>
                    }
                    {recordsDisplayer.slice(-nbrOfDisplayerRecords)}
                </ScrollCntainerRecods>
                : <p style={{ paddingLeft: '2.5rem', color: cols.blue, alignSelf: "center" }}>{getText('There are no records ,add new ones') + " !"}</p>
            }
            <Cont_TableRecord>
                <FormAddRecord onSubmit={(e) => addDataSugarLevels(e)}>
                    <input value={placeHolders.value} type="number" required onChange={(e) => { handlePlaceHolder(e) }} name="value" placeholder={getText("Value") + " ..."} />
                    <input value={placeHolders.date} type="date" required onChange={(e) => { handlePlaceHolder(e) }} name="date" />
                    <input value={placeHolders.note} type="text" onChange={(e) => { handlePlaceHolder(e) }} name="note" placeholder={getText("Note") + " ..."} />
                    {indexEditedRecordRow===-1
                    ?<input type="submit" value={getText("Add")} onSubmit={(e) => addDataSugarLevels(e)} />
                    :<div>
                        <button id="btn-edit-check" onClick={()=>{editDataSugarLevels();setIndexOpenedRecordRow(-1)}}>
                            <img src={icons.ic_check} alt=""/>
                        </button>
                        <button id="btn-edit-x" onClick={()=>{setIndexEditedRecordRow(-1) ;setIndexOpenedRecordRow(-1)}}>
                            <img src={icons.ic_x} alt=""/>
                        </button>
                    </div>
                }
                </FormAddRecord>
            </Cont_TableRecord>

        </Container>
    )
}
//#region style
const ScrollCntainerRecods = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    max-height:17.5rem;
    overflow-y:scroll;
    overflow-x:hidden;
    gap:.25rem;
    padding:.25rem 0;
    >p{
        align-self:center;
        color:${cols.blue};
        padding:.2rem 1.5rem .2rem 1.5rem;
        border:1px solid ${cols.blue};
        border-radius:5px;
        cursor:pointer;
        :hover{
            
            padding:.2rem 2rem .2rem 2rem;
            color:${cols.veryLight_blue};
            background-color:${cols.blue};
        }
        transition : padding .2s;
    }
    
    &::-webkit-scrollbar{
        background-color: rgba(0, 0, 0, .1);
        width: .7rem;
        
    }
    
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        width: .2rem;
        background-color: ${cols.blue};
    }
`;
const Flag = styled.div`
    height:3.5rem;
    border-radius:10px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    >p{
        background-color:${cols.veryLight_blue};
        color:${cols.dark_blue};
        padding:.5rem;
        border-radius:5px;
        margin-left:2rem;
        :hover{
            box-shadow:0 0 .1rem ${cols.light_blue};
        }
    }
    >div{
        display:flex;
        margin-right:2rem;
        gap:1rem;
        justify-self:flex-end;
        >p{
            background-color:${cols.blue};
            color:${cols.white};
            padding:.5rem;
            border-radius:5px;
            cursor:pointer;
            
            :hover{
                box-shadow:0 0 .5rem ${cols.light_blue};
                margin-top:.8rem;
            }
            transition:margin .15s;
            
        }
    }
    
}
`;

const FormAddRecord = styled.form`
display:grid;
grid-template-columns:1fr 2fr 3fr;
    grid-template-rows:1fr 1fr;
    place-items:stretch;
    height:7rem;
    row-gap:.5rem;
    input[type="text"],
    input[type="number"],
    input[type="date"]
    {
        background-color:${cols.blue};
        font-weight:600;
        padding-left:1.5rem;
        //theme//
        
        color:${cols.white};
        border:none;
        outline:none;
        border-radius:0;
        :hover{
            box-shadow:0 0 .2rem ${cols.dark_blue};
            
        }
    }
    input[type="submit"]{
        background-color:${cols.blue};
        font-weight:600;
        padding-left:1.5rem;
        //theme//
        cursor:pointer;
        color:${cols.white};
        border:none;
        outline:none;
        border-radius:0 0 10px 10px;
        grid-column:span 4;
        :hover{
            box-shadow:0 0 .2rem ${cols.dark_blue};
            
        }
    }
    
    >::placeholder{
        font-weight:600;
        color:${cols.white};
    }
    >div{
        grid-column:span 4;
        display:flex;
        justify-content:center;
        gap:1rem;
        >button{
            transition:all .2s;
            background-color:${cols.gray};
            min-width:20rem;
            border:none;
            border-radius:0 0 1rem 1rem;
        }
        #btn-edit-check{
            :hover{
                background-color:${cols.light_blue};
            }
        }
        #btn-edit-x{
            :hover{
                background-color:${cols.red};
            }
            
        }
    }
    transition :all .51s;
`;

const EditRecordRow = styled.div`
    position:absolute;
    border-radius:15px 0 0 15px;
    
    //width:fit-content;
    transition:all .15s;
    ${props => props.open
        ? css`
        right :0;
        background-color:${cols.light_blue};
        #edit-row-arrow{
            transform:rotate(180deg);
            :hover{
                background-color:${cols.blue};
            }
        }
        
        `
        : css`
        right :-5rem;
        background-color:rgba(0,0,0,0.2);
        #edit-row-arrow{
            :hover{
                background-color:${cols.light_blue};
            }
        }
        `};

    top:0;
    bottom:0;
    display:flex;
    align-items:center;
    overflow:hidden;
    #edit-row-arrow{
        padding-left:0.5rem;
        padding-right:0.5rem;
        padding-top:100%;
        padding-bottom:100%;
    }
    >div{
        padding:0 .5rem;
        width:fit-content;
        display :flex;
        >img{
            border-radius:5px;
            margin:auto .2rem;
        }
        #edit-row-delete{
            padding:.45rem .3rem;
            background-color:white;
            :hover{
                box-shadow:0 0 .5rem ${cols.red};
            }
        }
        #edit-row-edit{
            padding:.45rem .4rem;
            background-color:${cols.blue};
            :hover{
                box-shadow:0 0 .5rem ${cols.veryLight_blue};
            }
            
        }
    }
`;
const RecordRow = styled.div`
    position:relative;
    display:grid;
    grid-template-columns:1fr 2fr 3fr;
    grid-template-rows:1fr;
    align-items:center;
    min-height:3.5rem;
  
    background-color:${props => props.backgroundColor};
    :hover{
        
        box-shadow:0 0 .5rem ${cols.blue};
    }
    
    ${props => props.title && css`
        background-color:${cols.unclear_white};
        border-radius:.5rem .5rem 0 0;
        //theme//
        
        >p{
            font-weight:600;
            padding-left:1.5rem;
            //theme//
            color:${cols.dark_blue};
        }
        `}
    
    ${props => props.value &&
        css`
        >p{
            padding-left:1.5rem;
            //theme//
            color:${cols.black};
        }
        `}
    
        transition :all .12s;
`;
const Cont_TableRecord = styled.div`
    display:flex;
    flex-direction:column;
    
    //border:1px solid green;
    `;
const Container = styled.div`
    width:80%;
    display:flex;
    flex-direction:column;
    margin:0 auto 15rem auto;
    `;

const S_cart = styled.div`
    // border:1px solid blue;
    background:${props => props.theme === themes.dark ? 'black' : 'white'};    
    height : 100%;
    width:100%;
    display : flex;
    
        box-shadow : 0 0 .5rem ${cols.light_blue};
    
    flex-direction : column;
    border-radius:10px;
    
    transition: background-color 1s;
    transition: box-shadow .2s;
    `;
const S_cart_title = styled.p`
        ${props => props.theme.col_darkBlueVeryLightBlue};
        //background-color:${cols.unclear_white};
        font-size : 1.5rem;
        font-weight : 700;
        padding :1rem;
        border-radius:10px;
        
    `;
const S_cart_body = styled.div`
        ${props => props.theme.bg_darkBlueVeryLightBlue};
        background-color:${cols.white};
        margin:.5rem;
        height :fit-content;
        height:15rem;
        border-radius:10px;
        border:2px solid ${cols.light_blue};
    `;

    //#endregion