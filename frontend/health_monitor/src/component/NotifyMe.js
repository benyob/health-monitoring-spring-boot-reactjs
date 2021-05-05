import React, { useState } from 'react'
import styled from 'styled-components'
import { cols } from '../service/theme.service'

const StyleNotify={
    Shown:{
        transform:"translate(0 ,0)",
        opacity:"1",
    },
    hidden:{
        transform:"translate(20rem ,0)",
        opacity:"0",
    },
}
export default function NotifyMe(props) {
    const {ActiveNotify ,setActiveNotify} = props
    // const msgs=ActiveNotify.msg.map((m,i)=>{
    //     return <p key={i}>{m}</p>
    // })
    
    return (
         <Container type={ActiveNotify.type} style={ActiveNotify.active?StyleNotify.Shown:StyleNotify.hidden}>
                {/* <Dismiss onClick={()=>setActiveNotify({active:false,msg:[]})}>X</Dismiss> */}
                    <p>
                    {ActiveNotify.msg}
                    </p>
            </Container>

            
    )
}
// const Wrapper = styled.div`
// position:absolute;
// z-index:100;

// right:0;
// bottom:0;
// border:1px solid;
// width:10rem;
// height:30rem;
// `;

const Container = styled.div`
padding:.5rem 1rem;
position:absolute;
z-index:100;
right:2rem;;
bottom:2rem;
background-color:${props=>props.type};
box-shadow:0 0 1rem rgba(1,1,1,.5);
p{
    color:${cols.white};
    font-weight:600;
}
:hover{
    box-shadow:0 0 1rem rgba(1,1,1,.7);

}
max-height:25rem;
max-width:15rem;
min-width:10rem;

border-radius:10px;
transition:all .3s;
transition-property: transform ,opacity;
overflow-y:scroll;

&::-webkit-scrollbar{
    background-color: rgba(0, 0, 0, .1);
    width: .3rem;
}

&::-webkit-scrollbar-thumb{
    border-radius: 10px;
    width: .2rem;
    background-color: ${cols.light_blue};
}
`;
