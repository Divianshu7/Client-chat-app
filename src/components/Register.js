import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'

import { register } from '../utils/auth'
function Register() {
    const history = useNavigate()
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            history('/')
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (handleValidation()) {
            const { password, confirmPassword, email, username } = values
            try {
                const { data } = await register({ username, password, email })
                if (data.status === true) {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                    history('/')
                } else {
                    toast.error(data.msg)
                }
            } catch (err) {
                console.log('Registeration error==>', err)
                toast.error('Registeration error, Try again')
            }
        }
    }
    const handleValidation = () => {
        const { password, confirmPassword, email, username } = values
        if (password !== confirmPassword) {
            toast.error('password and confirmPassword should be same.', {
                theme: "dark",
                autoClose: 8000

            })
            console.log('password and confirmPassword should be same')
            return false
        } else if (username.length < 3) {
            toast.error('Username should be greater than 3 characters', {
                theme: 'dark',
                autoClose: 8000
            })
            console.log('Username should be greater than 3 characters')
            return false
        } else if (password.length < 8) {
            toast.error('Password should be greater than 8 characters', {
                theme: 'dark',
                autoClose: 8000
            })
            console.log('Password should be greater than 8 characters')
            return false
        } else if (email === '') {
            toast.error('email required', {
                theme: 'dark',
                autoClose: 8000
            })
            console.log('email required')
            return false
        }
        return true
    }
    const handleChnage = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='brand'>
                        <img src={Logo} alt='Logo' />
                        <h1>snappy</h1>
                    </div>
                    <input type='text' name='username' placeholder='user name' onChange={(e) => handleChnage(e)} />
                    <input type='email' name='email' placeholder='email' onChange={(e) => handleChnage(e)} />
                    <input type='password' name='password' placeholder='password' onChange={(e) => handleChnage(e)} />
                    <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={(e) => handleChnage(e)} />
                    <button type='submit' >Create User</button>
                    <span>already have an account ? <Link to='/login'>Login</Link> </span>
                </form>
            </FormContainer>
        </>
    )
}
const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:#131324;
    .brand{
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        border-radius:2rem;
        padding:3rem 5rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline:none;
            }
        }
        button{
            background-color:#997af0;
            color:white;
            padding :1rem 2rem;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{
            color:white;
            text-transform:uppercase;
            a{
                color:#4e0eff;
                text-transform:none;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }
`
export default Register