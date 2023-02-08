import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
function Welcome({ user }) {
    return (
        <Container>
            <img src={Robot} alt='Robot' />
            <h1>Welcome, <span>{user.username}!</span></h1>
            <h3>Please select a contact to Start Messaging.</h3>
        </Container>
    )
}
const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-bottom:20px;
    h1{
        color:white;
        span{
            color:blue;
        }
    }
    h3{
        color:white;
    }
`
export default Welcome