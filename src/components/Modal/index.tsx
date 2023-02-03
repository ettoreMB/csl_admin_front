import { ReactNode } from 'react'
import { Overlay, Container, Footer } from './styles'
import ReactPortal from '../ReactPortal'

interface ModalProps {
  children: ReactNode
  visible: boolean
  onCancel: () => void
}

export default function Modal ({ children, visible, onCancel }: ModalProps) {
  if (!visible) {
    return null
  }

  return (
    <ReactPortal containerId={ 'modal-root'}>
      <Overlay>
      <Container >
        {children}
        <Footer>
          <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
          >cancelar</button>

        </Footer>
      </Container>
    </Overlay>,
    </ReactPortal>
  )
}
