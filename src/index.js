import React from 'react'
// import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createRoot } from 'react-dom/client'
// ReactDOM.render(<App />, )
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
if (process.env.NODE_ENV === 'production') disableReactDevTools()
const node = document.getElementById('root')
const root = createRoot(node)
root.render(<App />)