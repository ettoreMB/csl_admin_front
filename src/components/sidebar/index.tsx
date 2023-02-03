
import { Container } from './styles'
import closeButton from '../../assets/icons/close.svg'
import { Link } from 'react-router-dom'
interface SideBarProps {
  visible: boolean
  closeSideBar: () => void
}

export default function SideBar ({ visible, closeSideBar }: SideBarProps) {
  if (!visible) {
    return null
  }

  return (
    <Container>
      <div>
        <h1>Menu</h1>

        <button type="button" onClick={closeSideBar} ><img src={closeButton} alt="" /></button>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/criar">Cadastrar Estabelecimento</Link>
      </nav>
    </Container>
  )
}
