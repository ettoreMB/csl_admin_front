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
import { IPublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'

interface AppProps {
  pca: IPublicClientApplication
}

export default function App ({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
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
