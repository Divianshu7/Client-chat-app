import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SetAvatar from './components/SetAvatar'
function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/' element={<Chat />} />
                <Route exact path='/setAvatar' element={<SetAvatar />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App