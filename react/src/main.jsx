import App from './components/App'
import MainProvider from './stores/MainProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <MainProvider>
    <App />
  </MainProvider>,
)
