import React, { useContext } from 'react'
import styled from 'styled-components';
import { cols, themes } from '../../../service/theme.service';
import dateFormat from 'dateformat'
import notificationsService from '../../../service/notifications.service';
import { MyThemeContext } from '../../../App';
import languageService from '../../../service/language.service';
const getText = (i) => {
    return languageService.getText(i)
}
export default function CompNotifications(props) {
    const { theme } = useContext(MyThemeContext)

    const notifications = props.notifications;
    const getAllNotifications=props.getAllNotifications;
    const dismissNotification=(id)=>{
       
        notificationsService.dismissNotification(id).then(r=>{
            getAllNotifications();
           
        })
    }
    const container = notifications.map((n,i)=>{
        let col = cols.white;
        if(n.type==="Warning") col=cols.warning;
        else if(n.type==="Message") col=cols.alert;
        else if(n.type==="Advice") col=cols.advice;
        return<Notification key={i} colHeader={col}>
                <span>{dateFormat(n.date ,"mmmm dS ,yyyy ,HH:MM TT")}</span>
        
                <div id="notification-title">
                    <p style={{fontWeight:500,marginLeft:"1.5rem"}}>{getText(n.type)}</p>
                    <p style={{color:cols.white}}>{n.targetHealthDataType}</p>
                    </div>
                <NotificationContent>
                    <p>{n.content}</p>
                </NotificationContent>
                <Dismiss onClick={()=>dismissNotification(n.id)}><p>{getText("Dismiss")}</p></Dismiss>
            </Notification>
    })
    const themeChange={
        dark:{
            backgroundColor:cols.black,
            transition:"all .5s",
            outline:"2px solid white",
            
        },
        light:{
            backgroundColor:cols.unclear_white,
            transition:"all .5s",
        },
    }
    return (
        <Containeer style={theme===themes.dark?themeChange.dark:themeChange.light}
        >
         <div>
            {container}
         </div>
        </Containeer>
    )
}
const Dismiss=styled.div`
    // border:1px solid ${cols.red};
    position :absolute;
    top:0;
    
    height:3rem;
    width:2rem;
    border-radius:1rem;
    border-bottom-left-radius:0;
    background-color:${cols.dismiss};
    color:${cols.white};
    overflow:hidden;
    display:grid;
    place-items:center;
    opacity:.2;
    >p{
        opacity:0;
        font-weight:600;
    }

    :hover{
        width:10ch;
        opacity:1;
        >p{
            opacity:1;
        }   
    }
    transition :all .25s;
`;
const NotificationContent=styled.div`
    padding: 0 2rem;
    max-width:70%;
    
`;
const Notification=styled.div`
    // border:1px solid;
    max-height:3rem;
    width:80%;
    margin-left:2rem;
    position:relative;
    overflow:hidden;
    gap:1rem;
    background-color:${cols.white};
    border-radius:1rem;
    cursor:pointer;
    :hover{
        max-height:15rem;
        >span{
            opacity:1;
        }
    }
    >span{
        position:absolute;
        left:40%;
        transform:translate(0,35%);
        padding:.2rem .5rem;
        background-color:${cols.white};
        border-radius:.3rem;
        opacity:0;
        transition :opacity .8s;
    }
    #notification-title{
        height:3rem;
        background-color:${props=>props.colHeader};
        display:flex;
        align-items:center;
        justify-content:space-between;
        >p{
            margin:0;
            padding:0 1.5rem;
            font-size:1.1rem;
            // font-weight:600;
            font-family:roboto;
            color:${cols.black};
        }
    }
    transition:all ease-out .5s;
    `;

const Containeer=styled.div`
    padding:2rem 0;
   
    >div{

        display:flex;
        flex-direction:column;
        gap:1rem;
    }
    
    height:95%;
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
`;



// const Notification=styled.div``;