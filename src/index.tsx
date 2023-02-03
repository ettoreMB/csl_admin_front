import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './authConfig'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

export const msalInstance = new PublicClientApplication(msalConfig)

// const accounts = msalInstance.getAllAccounts()
// if (accounts.length > 0) {
//   msalInstance.setActiveAccount(accounts[0])
// }

// msalInstance.addEventCallback((event: EventMessage) => {
//   if (event.eventType === EventType.LOGIN_SUCCESS && (event.payload != null)) {
//     const payload = event.payload as AuthenticationResult
//     const account = payload.account
//     msalInstance.setActiveAccount(account)
//   }
// })

root.render(
  <React.StrictMode>
    <App pca={msalInstance}/>
  </React.StrictMode>
)
