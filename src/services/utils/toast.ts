import EventManager from '../../lib/EventManager'

interface AddToastProps {
  type: 'danger' | 'success' | 'default'
  text: string
  duration?: number
}

export const toastEventManager = new EventManager()

export default function toast ({ type, text, duration }: AddToastProps) {
  toastEventManager.emit('addtoast', { type, text, duration })
}
