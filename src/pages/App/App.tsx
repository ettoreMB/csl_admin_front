/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  BrowserRouter
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { defaultTheme } from '../../@types/styles/themes/deafult'
import GlobalStyles from '../../@types/styles/global'
import { AppContainer } from './styles'
import { Header } from '../../components/Header'
import Routes from '../../routes'

export default function App () {
  return (
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme }>
          <GlobalStyles />
          <AppContainer>
            <Header />

            <Routes />
          </AppContainer>
        </ThemeProvider>
      </BrowserRouter>
  )
}
