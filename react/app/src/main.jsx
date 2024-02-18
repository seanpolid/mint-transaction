import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import MainProvider from './stores/MainProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainProvider>
      <App />
    </MainProvider>
  </BrowserRouter>,
)
