/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  BrowserRouter
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../../@types/styles/themes/deafult'
import GlobalStyles from '../../@types/styles/global'
import { AppContainer } from './styles'
import Routes from '../../routes'
import { Header } from '../../components/Header'
import ToastContainer from '../../components/Toast/ToastContainer'

import { MsalProvider } from '@azure/msal-react'

export default function App ({ msalInstance }: any) {
  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme }>
          <GlobalStyles />
            <Header />
            <AppContainer>
            <ToastContainer />

            <Routes />
          </AppContainer>
        </ThemeProvider>
      </BrowserRouter>
      </MsalProvider>
  )
}
