import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getAllMessage, sendMsg } from '../utils/auth'
import ChatInput from './ChatInput'
import Logout from './Logout'
import Messages from './Messages'
import { v4 as uuidv4 } from 'uuid'

function ChatContainer({ socket, currentChat, currentUser }) {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()
    useEffect(() => {
        if (currentChat) { getAllMessages() }
    }, [currentChat])
    const getAllMessages = async () => {
        const res = await getAllMessage({
            from: currentUser._id,
            to: currentChat._id,
        })
        setMessages(res.data)
    }
    const handleSendMsg = async (msg) => {
        await sendMsg(
            {
                from: currentUser._id,
                to: currentChat._id,
                message: msg
            })
        socket.current.emit('send-msg', {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        const msgs = [...messages]
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs)
    }
    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])
    return (
        <Container>
            <div className='chat-header'>
                <div className='user-details'>
                    <div className='avatar'>
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt='avatar' />
                    </div>
                    <div className='username'>
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className='chat-messages'>
                {
                    messages.map((msg, i) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()} >
                                <div className={`message ${msg.fromSelf ? 'sended' : 'recieved'}`}>
                                    <div className='content'>
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    )
}
const Container = styled.div`
    padding:1rem;
    display:grid;
    overflow:hidden;

    grid-template-rows:10% 80% 10%;
    .chat-header{
        margin-top:20px;
        display:flex;
        align-items:center;
        justify-content: space-between;
        
        .user-details{
            display:flex;
            align-items:center;
        }
        height:10%;
        img{
            height:60px;
            object-fit:contain;}
        h3{
            padding:10px;
            color:white;
        }
    }
    .chat-messages{
        overflow:auto;
        color:white;
        display:flex;
        margin-bottom:10px;
        flex-direction:column;
        &::-webkit-scrollbar{
            width:6px;
            &-thumb{
                background-color:purple;
                border-radius:10px;
            }
        }
        .message{
            margin-right:10px;
            background-color: #205295;
            display:flex;
            padding:20px;
            border-radius:20px;
            font-size:20px;
            margin-top:20px;
            min-height:10px;
            align-items:center;
            justify-content:center;
            max-width:500px;
        }
        .recieved{
            // background-color:blue;
            float:left;
        }
        .sended{
            background-color:#0A2647;
            float:right;
        }
        
    }
`
export default ChatContainer