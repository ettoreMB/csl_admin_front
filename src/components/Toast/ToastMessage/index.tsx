import { Container } from './styles'
import check from '../../../assets/icons/check.svg'
import close from '../../../assets/icons/close.svg'
import { useEffect } from 'react'

export interface ToastMessageProps {
  message: {
    id: number
    type: 'danger' | 'success' | 'default'
    text: string
    duration: number
  }
  onRemoveMessage: (id: number) => void
}

export default function ToastMessage ({ message, onRemoveMessage }: ToastMessageProps) {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onRemoveMessage(message.id)
    }, message.duration ?? 5000)

    return () => {
      clearTimeout(timeOutId)
    }
  }, [message, onRemoveMessage])

  function handleRemoveToast () {
    onRemoveMessage(message.id)
  }

  return (
    <Container type={message.type} role="button" onClick={handleRemoveToast}>
      {message.type === 'danger' && <img src={close} alt="Close Button" />}
      {message.type === 'success' && <img src={check} alt="Check Icon" />}
      <strong>{message.text}</strong>
    </Container>
  )
}
