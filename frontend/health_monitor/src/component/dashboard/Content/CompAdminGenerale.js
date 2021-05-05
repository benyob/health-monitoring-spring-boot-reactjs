import React, { useState ,useEffect, useContext } from 'react'
import styled from 'styled-components'
import { ActiveNotifyContext, MyThemeContext } from '../../../App';
import adminService from '../../../service/admin.service';
import languageService from '../../../service/language.service';
import { NotifyMeType } from '../../../service/notifications.service';
import nutritionSerivce from '../../../service/nutrition.serivce';
import { cols, themes } from '../../../service/theme.service';
const getText = (i) => {
    return languageService.getText(i)
}
const themeChange={
    dark:{
        backgroundColor:cols.black,
        transition:"all .5s",
        
    },
    light:{
        backgroundColor:cols.unclear_white,
        transition:"all .5s",
    },
    // style={theme===themes.dark?themeChange.dark:themeChange.light}
}
export default function CompAdminGenerale () {
    const [users, setUsers] = useState([]);
    const [RefVales, setRefVales] = useState([]);
    const [CanEditValues, setCanEditValues] = useState(false)
    const [EditableValue, setEditableValue] = useState({
        id:null,
	  name:"",
	  unit:"",
	  value:0,
	  source:"",
    })
    const fn_notifyMeThat = useContext(ActiveNotifyContext)
    // fn_notifyMeThat("be carfull",NotifyMeType.yellow)
    const { theme } = useContext(MyThemeContext)

        useEffect(() => {
            fn_loadUsers();
            fn_loadRefValues();
        }, [])
        
       
        
        const HandleUpdateRefValue=(value)=>{
            setEditableValue({
            id:value.id,
            name:value.name,
            unit:value.unit,
            value:value.value,
            source:value.source,
            })
            setCanEditValues(true);
        }
        const HandleDeleteRefValue=(id)=>{
            adminService.deletefloatvalue(id).then(r=>{
                r.data===true?fn_notifyMeThat("Value was Deleted",NotifyMeType.green)
                        :fn_notifyMeThat("Value was NOT Deleted",NotifyMeType.red);

                fn_loadRefValues();
            })
        }
        const fn_loadUsers=()=>{
            adminService.getusers().then(res=>{
                setUsers(res.data);

            })
            
        }
        const fn_loadRefValues=()=>{
            adminService.getAllFloatValues().then(res=>{
                setRefVales(res.data);
            })
        }
        const handleOnChangeEditableValue=(e)=>{
            const {name ,value} = e.target;
            setEditableValue(prev=>({
                ...prev,[name]:value
            }))

        }
        const HandleSaveEditableValuee=()=>{
            if(EditableValue.name.length<1){
                fn_notifyMeThat("name field is empty",NotifyMeType.yellow)
                return;
            }
            adminService.setFloatValue(EditableValue).then(r=>{
                r.data===true?fn_notifyMeThat("Value was Saved",NotifyMeType.green)
                        :fn_notifyMeThat("Value was NOT Saved",NotifyMeType.red);

                fn_loadRefValues();
            })
            HandleCloseEditValue();
        }
        const ResetHDataAndNotifications=()=>{
            adminService.resetData().then(r=>{
                r.data===true?fn_notifyMeThat("Data was Deleted successfuly",NotifyMeType.green)
                    : fn_notifyMeThat("Failed to reset data", NotifyMeType.red);
                    window.location.reload();
                },err=>{
                    fn_notifyMeThat("Network Error", NotifyMeType.red);
            })
            
        }
        const HandleCloseEditValue=()=>{
            setEditableValue({
                id:null,
              name:"",
              unit:"",
              value:0,
              source:"",
            })
            setCanEditValues(false);
        }

        const displayedUsers = users.map((u,i)=>{
            return <div key={i}>
            <p>{u.id}</p>
            <p>{u.username}</p>
            <p>{u.email}</p>
            <p>
                <span onClick={()=>{
                    adminService.GrantAdmin(u.id).then(r=>{
                        r.data===true?fn_notifyMeThat("Admin granted",NotifyMeType.green)
                        :fn_notifyMeThat("Admin was NOT granted",NotifyMeType.red)
                    });
                    fn_loadUsers();              
                    }} style={{cursor:"pointer",color:cols.alert}}>
                        Grant Admin
            </span>  
            <span onClick={()=>{
                 adminService.deleteUser(u.id).then(r=>{
                    r.data===true?fn_notifyMeThat("User "+u.username+" was deleted",NotifyMeType.green)
                    :fn_notifyMeThat("Failed to delete "+u.username,NotifyMeType.red)
                    fn_loadUsers(); 
                }) 
            }} style={{cursor:"pointer",color:cols.red,marginLeft:"2.5rem"}}>Delete
            </span>
            </p>
        </div>
        }) 
        const displayRefvalues=RefVales.map((v,i)=>{
            return <ReferenceValues key={i}>
            <p style={{color:cols.dark_blue}}>{v.name}</p>
            <p style={{color:cols.dark_blue}}>{v.value}</p>
            <p style={{color:cols.dark_blue}}>{v.unit}</p>
            <p style={{width:"8rem",overflow:"hidden",textOverflow:"ellipsis",color:cols.dark_blue}}>{v.source}</p>
            <p>
            <span
            onClick={()=>HandleUpdateRefValue(v)} style={{color:cols.blue,cursor:'pointer'}}
            >Edit</span>
             <span
            onClick={()=>HandleDeleteRefValue(v.id)} style={{color:cols.red,cursor:'pointer'}}
            >Delete</span>
            </p>
        </ReferenceValues>
        })
        return(
            <Container style={theme===themes.dark?themeChange.dark:themeChange.light}>
                 <ReferenceValuesEditor active={CanEditValues}>

                    <ReferenceValuesEditor_Inputs>
                    <input name="name" onChange={(e)=>{handleOnChangeEditableValue(e)}} value={EditableValue.name} placeholder="name ..." type="text"/>
                    <input name="value" onChange={(e)=>{handleOnChangeEditableValue(e)}} value={EditableValue.value} placeholder="value ..." type="number"/>
                    <input name="unit" onChange={(e)=>{handleOnChangeEditableValue(e)}} value={EditableValue.unit} placeholder="unit..." type="text"/>
                    <input name="source" onChange={(e)=>{handleOnChangeEditableValue(e)}} value={EditableValue.source} placeholder="source ..." type="text"/>
                    </ReferenceValuesEditor_Inputs>
                    
                    <ReferenceValuesEditor_Btns>
                        <button onClick={()=>HandleSaveEditableValuee()}>save</button>
                        <button onClick={()=>HandleCloseEditValue()}>close</button>
                    </ReferenceValuesEditor_Btns>
                </ReferenceValuesEditor>
                <div id="manage_ref_vales__container">
            <Title theme={theme}> {getText('Manage Users')} </Title>
            <ContainerUsers>
                <div style={{borderBottom:"2px solid"+cols.blue}}>
                    <p style={{color:cols.dark_blue}}>ID</p>
                    <p style={{color:cols.dark_blue}}>Username</p>
                    <p style={{color:cols.dark_blue}}>Email</p>
                    <p style={{color:cols.dark_blue}}>Action</p>
                </div>
               {displayedUsers}
            </ContainerUsers>
            
            <Title theme={theme}> {getText('Manage Reference Values')} </Title>
            <ContainerValues>
               
              
                <ContainerValuesTitle style={{borderBottom:"2px solid"+cols.blue}}>
                    <p style={{color:cols.dark_blue}}>Name</p>
                    <p style={{color:cols.dark_blue}}>Value</p>
                    <p style={{color:cols.dark_blue}}>Unit</p>
                    <p style={{color:cols.dark_blue}}>Source</p>
                    <p style={{color:cols.dark_blue}}>Action</p>
                </ContainerValuesTitle>
                <div id="container_values__displayed_container">
                {displayRefvalues}
                </div>

               <button style={{
                   width:"100%",height:"2rem",border:"none",outline:"none",backgroundColor:cols.blue,color:cols.veryLight_blue
               }} onClick={()=>setCanEditValues(true)}>{getText("Add")}</button>
            </ContainerValues>
            <Title theme={theme}> {getText('Extra')} </Title>
               <ExtraContainer>
                <div>
                    <p>Reset Health data and notifications</p>
                    <button onClick={()=>ResetHDataAndNotifications()}>Reset</button>
                </div>

               </ExtraContainer>
            </div>
            </Container>
            
        )
    

}
const ExtraContainer=styled.div`
display:flex;
margin-left:2rem;
flex-direction:column;
border-bottom:1px solid ${cols.light_blue};
border-top-right-radius:.2rem;
border-top-left-radius:.2rem;
min-height:10rem;
>div{
    display:flex;
    align-items:center;
    gap:3rem;
}
p{
    color:${cols.blue};
    font-weight:600;
}
button{
    font-weight:600;
    outline:2px solid ${cols.blue};
    border:none;
    background-color:${cols.veryLight_blue};
    color:${cols.black};
    padding:.5rem 2rem;
}
`;
const ReferenceValuesEditor_Inputs = styled.div`
display:flex;
gap:.2rem;
input{
    height:3rem;
    border:none;
    outline:none;
    background-color:transparent;
    color:${cols.dark_blue};
    font-weight:600;
    border-bottom:1.5px solid ${cols.blue};
}
`;
const ReferenceValuesEditor_Btns = styled.div`
display:flex;
gap:.2rem;
button{
    width:4rem;
    border:none;
    outline:none;
    background-color:transparent;
    color:${cols.dark_blue};
    font-weight:600;
    border:1.5px solid ${cols.blue};
    border-radius:8px;
    :hover{
        color:${cols.unclear_white};
        background-color:${cols.blue};

    }
    transition:all .4s;
}
`;
const ReferenceValuesEditor = styled.div`
    position:absolute;
    z-index:1;
    border-radius:.2rem;
    bottom:0;
    display:flex;
    gap:1rem;
    
    background-color:${cols.unclear_white};
    box-shadow: 0 0 1rem rgba(0,0,0,.8);
    // padding:1rem .2rem 3rem .2rem;
    padding:1rem;
    transform:${props=>props.active?"translate(3.25rem ,-2rem)":"translate(3.25rem ,8rem)"};

    opacity:${props=>props.active?1:0};
    transition:all .5s;
`;
const ReferenceValues = styled.div`
    padding:0 1rem;
    display:grid;
    grid-template-columns:2fr 1fr 1fr 1fr 2fr;
    // grid-template-rows:1fr;
    place-items:start;
    border-bottom:1px solid ${cols.light_blue};
    border-top-right-radius:.2rem;
    border-top-left-radius:.2rem;
    
    &:hover{
        box-shadow:0 0 1rem rba(0,0,0,.5);
        background-color:${cols.unclear_white};
    }
    >p{
        font-weight:400;
       
    }
    span{
        margin-left:3rem;
    }
`;
const ContainerValuesTitle = styled.div`
    padding:0 1rem;
    display:grid;
    grid-template-columns:2fr 1fr 1fr 1fr 2fr;
    place-items:start;
    border-bottom:1px solid ${cols.light_blue};
    border-top-right-radius:.2rem;
    border-top-left-radius:.2rem;
    
    &:hover{
        box-shadow:0 0 1rem rba(0,0,0,.5);
        background-color:${cols.unclear_white};
    }
    >p{
        font-weight:600;
    }

`;

const ContainerValues = styled.div`
    margin:0 auto;
    background-color:${cols.white};
    width:95%;
    min-height:5rem;
    border-radius:.2rem;
    padding-bottom:1rem;
    position:relative;
    #container_values__displayed_container{
        max-height:15rem;
        overflow-y:scroll;
    }
   
`;
const ContainerUsers = styled.div`
    margin:0 auto;
    background-color:${cols.white};
    width:95%;
    min-height:5rem;
    border-radius:.2rem;
    padding-bottom:1rem;
    div{
        padding:0 1rem;
        display:grid; 
        border-top-right-radius:.2rem;
        border-top-left-radius:.2rem;
        grid-template-columns:.5fr 1fr 1fr 1fr;
        place-items:start;
        border-bottom:1px solid ${cols.light_blue};
        :hover{
            box-shadow:0 0 1rem rba(0,0,0,.5);
            background-color:${cols.unclear_white};
        }
        p{
            font-weight:600;
        }
    }
    
   
`;
const Title = styled.p`
        ${props => props.theme.col_darkBlueVeryLightBlue};
        font-size : larger;
        font-weight : 700;
        padding :.5rem 0 0 .5rem;
        margin-top:0;
        `;
const Container = styled.div`
display : flex;
flex-direction:column;
height:100%;
width:100%;
gap:2rem;
padding-bottom:2rem;
#manage_ref_vales__container{
    overflow-y:scroll;
    &::-webkit-scrollbar{
        background-color: rgba(0, 0, 0, .1);
        width: .7rem;
    }
    
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        width: .2rem;
        background-color: var(--col_blue);
    }
}
overflow:hidden;
transition : background 1s; 
`;