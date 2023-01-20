import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'
import { Overlay, Container, Footer } from './styles'

interface ModalProps {
  children: ReactNode
  visible: boolean
  onCancel: () => void
}

const modalRoot = document.getElementById('modal-root') as HTMLElement

export default function Modal ({ children, visible, onCancel }: ModalProps) {
  if (!visible) {
    return null
  }

  return ReactDOM.createPortal(
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

    modalRoot
  )
}

Modal.propTypes = {
  danger: PropTypes.bool
}

Modal.defaultProps = {
  danger: false
}
