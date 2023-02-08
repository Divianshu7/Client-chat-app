import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { allUsers } from '../utils/auth'
import ChatContainer from './ChatContainer'
import Contacts from './Contacts'
import Welcome from './Welcome'
import io from 'socket.io-client'
function Chat() {
    const socket = useRef()
    const history = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const getContacts = async () => {
        const data = await allUsers(currentUser._id)
        setContacts(data.data)
    }
    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            history('/login')
            toast('Login first', {
                theme: 'dark'
            })
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')))
        }
    }, [])
    useEffect(() => {
        if (currentUser) {
            socket.current = io(process.env.REACT_APP_API_HOST)
            socket.current.emit('add-user', currentUser._id)
        }
    }, [currentUser])
    useEffect(() => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                getContacts()
            } else {
                history('/setAvatar')
            }
        }
    }, [currentUser])
    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }
    return (
        <Container>
            <div className='container'>
                <Contacts changeChat={handleChatChange} contacts={contacts} currentUser={currentUser} />
                {currentChat !== undefined ? (<ChatContainer socket={socket} currentUser={currentUser} currentChat={currentChat} />) : currentUser && (<Welcome user={currentUser} />)}
            </div>
        </Container>
    )
}
const Container = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:#131324;
    .container{
        height:85vh;
        width:85vw;
        background-color:#00000076;
        display:grid;
        grid-template-columns:25% 75%;
        @media screen and(min-width720px) and (max-width:1080px){
            grid-template-columns:35% 65%;
        }
    }
`
export default Chat