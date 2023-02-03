/* eslint-disable @typescript-eslint/no-misused-promises */
import SideBar from '../sidebar'
import { HeaderContainer } from './styles'
import { useState } from 'react'
import menuIcon from '../../assets/icons/menu.svg'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal as UseMsal, useIsAuthenticated } from '@azure/msal-react'

export function Header () {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false)
  const { instance, accounts } = UseMsal()
  const isAuthenticated = useIsAuthenticated()
  async function handleLogin () {
    await instance.loginPopup()
  }
  function handleOpenSideBar () {
    if (isNavBarVisible) {
      setIsNavBarVisible(false)
    } else {
      setIsNavBarVisible(true)
    }
  }

  function handleCloseSideBar () {
    setIsNavBarVisible(false)
  }

  function handleLogout () {
    instance.logoutPopup({
      mainWindowRedirectUri: '/login'
    })
  }

  return (
    <>
      <SideBar visible={isNavBarVisible} closeSideBar={handleCloseSideBar} />
      <HeaderContainer>
        <div>
          <AuthenticatedTemplate>
            {isAuthenticated && (
              <>
                <span>{accounts[0].name}</span>
                <button onClick={handleLogout}>Logout</button>
                <button type='button' onClick={handleOpenSideBar}><img src={menuIcon} alt="Icone Menu" /></button>
              </>

            )}

          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <button onClick={handleLogin}>Login</button>
          </UnauthenticatedTemplate>
        </div>
      </HeaderContainer>

    </>

  )
}
