import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './authConfig'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const msalInstance = new PublicClientApplication(msalConfig)
root.render(
  <React.StrictMode>
    <App msalInstace={msalInstance}/>
  </React.StrictMode>
)
