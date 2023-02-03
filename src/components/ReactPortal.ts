import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface ReactPortalProps {
  containerId: any
  children: ReactNode

}

export default function ReactPortal ({ containerId, children }: ReactPortalProps) {
  let container = document.getElementById(containerId)

  if (container == null) {
    container = document.createElement('div')
    container.setAttribute('id', containerId)
    document.body.appendChild(container)
  }

  return ReactDOM.createPortal(children, document.body, containerId)
}
