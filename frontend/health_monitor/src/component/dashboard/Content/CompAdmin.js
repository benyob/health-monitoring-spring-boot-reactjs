import React, { useState ,useEffect } from 'react'
import styled from 'styled-components'
import adminService from '../../../service/admin.service';


export default function CompAdmin () {
        const [users, setUsers] = useState([]);
        useEffect(() => {
            adminService.getusers().then(res=>{
                setUsers(res.data);
                console.log("user loaded");
            })
        }, [])

        return(
            <Container>
                <p>Admin board</p>
                all users :
                {users.map((m,i)=>{
                   return<p key={i}>{m}</p>
                })}
            </Container>
        )
    

}
const Container = styled.div`
    display:flex;
    flex-direction:column;
`;