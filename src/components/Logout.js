import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PoweroffOutlined } from '@ant-design/icons'
import styled from 'styled-components'
function Logout() {
    const navigate = useNavigate()
    const handleClick = async () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <Button onClick={handleClick} ><PoweroffOutlined /></Button>
    )
}
const Button = styled.button`
    background-color:purple;
    color:white;
    border-radius:10px;
    height:40px;
    width:40px;
    float:right;
    cursor:pointer;
`
export default Logout