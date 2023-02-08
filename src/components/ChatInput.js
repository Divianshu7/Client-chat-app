import { SendOutlined, SmileFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react';
function ChatInput({ handleSendMsg }) {
    const [emojipicker, setEmojipicker] = useState(false)
    const [msg, setMsg] = useState('')
    const handleEmojiPicker = () => {
        setEmojipicker(!emojipicker)

    }
    const handleEmojiClick = (e) => {
        setMsg(msg + e.emoji)
    }
    const send = (e) => {
        e.preventDefault()
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('')
        }
    }
    return (
        <Container>
            <div className='button-container'>
                <div className='emoji'>
                    <SmileFilled onClick={handleEmojiPicker} style={{ fontSize: 30 }} />
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => send(e)}>
                {emojipicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}

                <input type='text' value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='type your message here' />
                <button type='submit' className='submit'><SendOutlined style={{ fontSize: 20 }} /></button>
            </form>
        </Container>
    )
}
const Container = styled.div`
    display:grid;
    height:40px;
    grid-template-columns:5% 95%;
    .button-container{
        object-fit:contain;
        align-items:center;
        justify-content:center;
        display:flex;
    }
    .emoji{
        object-fit:fill;
        color :grey;
        width:100%;
        height:100%;
        align-items:center;
        justify-content:center;
        display:flex;
        
    }
    .input-container{
        display:grid;
        grid-template-columns:90% 10%;
        .EmojiPickerReact{
            position:absolute;
            bottom:140px;
        }
        input{
            border-radius:10px;
            margin-right:-25px;
            background-color:grey;
            border:none;
            color:white;
            font-size:20px;
            padding-left:10px;

            &::placeholder{
                color:white;
            }
            &:focus{
                color:white;
            
            } 
            &:hover{
                cursor:pointer;
            }  
        }
        button{
            border:none;
            border-radius:20px;
            background-color:purple;
            color:white;
            cursor:pointer;
        }
    }
`
export default ChatInput