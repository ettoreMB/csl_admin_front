import ToastMessage from '../ToastMessage'
import { useState, SetStateAction, useCallback, useEffect } from 'react'
import { Container } from './styles'
import { toastEventManager } from '../../../services/utils/toast'

interface AddToastProps {
  id: number
  type: 'danger' | 'success' | 'default'
  text: string
  duration: number
}

export default function ToastContainer () {
  const [messages, setMessages] = useState<SetStateAction<any>>([])

  useEffect(() => {
    function handleAddToast ({ type, text, duration }: AddToastProps) {
      setMessages((prevState: any[]) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration
        }
      ])
    }
    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState: any[]) => prevState.filter(
      (message: AddToastProps) => message.id !== id
    ))
  }, [])

  return (
    <Container>
      {messages.map((message: AddToastProps) => (
        <ToastMessage
        key={message.id}
        message={message}
        onRemoveMessage={handleRemoveMessage}
        />

      ))}
    </Container>
  )
}
