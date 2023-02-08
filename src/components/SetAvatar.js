import { Buffer } from 'buffer'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import loader from '../assets/loader.gif'
import { setAvatar } from '../utils/auth'
function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945'
    const history = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an avatar', {
                theme: 'dark',
            })
        }
        else {
            try {
                const user = await JSON.parse(localStorage.getItem('chat-app-user'))
                const payload = {
                    image: avatars[selectedAvatar]
                }
                const { data } = await setAvatar(user._id, payload)
                if (data.isSet) {
                    user.isAvatarImageSet = true
                    user.avatarImage = data.image
                    localStorage.setItem('chat-app-user', JSON.stringify(user))
                    history('/')
                } else {
                    toast.error('Avatar Setting error try again', {
                        theme: 'dark'
                    })

                }
            } catch (err) {
                console.log(err)
                toast.error('Avatar Setting error try again', {
                    theme: 'dark'
                })
            }
        }
    }
    const generateImage = async () => {
        const data = []
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
            console.log(image)
            const buffer = new Buffer(image.data)
            data.push(buffer.toString('base64'))
        }
        setAvatars(data)
        setIsLoading(false)
    }

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            history('/login')
        }
    }, [])
    useEffect(() => {
        generateImage()

    }, [])
    return (
        <>
            {isLoading ? (<Container>
                <img src={loader} alt='loading' className='loader' />
            </Container>) : (<Container>
                <div className='title-container'>
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className='avatars'>
                    {avatars.map((avatar, i) => {
                        return (
                            <div key={i} className={`avatar ${selectedAvatar === i ? 'selected' : ''}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} onClick={() => setSelectedAvatar(i)} alt='avatar' />
                            </div>
                        )
                    })}
                </div>
                <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture </button>
            </Container>)}
        </>
    )
}
const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:3rem;
    background-color:#131324;
    height:100vh;
    width:100vw;
    .loader{
        max-inline-size:100%;
    }
    .title-container{
        h1{
            color:white;
        }
    }
    .avatars{
        gap:2rem;
        display:flex;
        .avatar{
            border:0.4rem solid transparent;
            padding 0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5 s ease-in-out;
            img{
                height:6rem;
            }
        }
        .selected{
            border:0.4rem solid blue;
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
`
export default SetAvatar