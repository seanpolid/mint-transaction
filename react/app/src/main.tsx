import App from './components/App/index'
import { BrowserRouter } from 'react-router-dom'
import MainProvider from './stores/MainProvider'
import ReactDOM from 'react-dom/client'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <MainProvider>
      <App />
    </MainProvider>
  </BrowserRouter>,
)
