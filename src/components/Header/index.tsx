import SideBar from '../sidebar'
import { HeaderContainer } from './styles'
import { useState } from 'react'
import menuIcon from '../../assets/icons/menu.svg'

export function Header () {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false)
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

  return (
    <>
      <SideBar visible={isNavBarVisible} closeSideBar={handleCloseSideBar} />
      <HeaderContainer>
        <div>
          <button type='button' onClick={handleOpenSideBar}><img src={menuIcon} alt="Icone Menu"/></button>
        </div>
      </HeaderContainer>
    </>

  )
}
