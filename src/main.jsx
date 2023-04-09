import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
      </AuthContextProvider>
  </React.StrictMode>,
)
