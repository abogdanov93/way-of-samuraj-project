import React from 'react'
import './index.css'
import reportWebVitals from './reportWebVitals'
import ReactDOM from "react-dom/client"
import AppRouter from "./App"

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<AppRouter/>)

reportWebVitals()
