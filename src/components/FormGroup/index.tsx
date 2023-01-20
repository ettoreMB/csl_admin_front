
import { Container } from './styles'
import { ReactNode } from 'react'
interface FormGroupProps {
  children: ReactNode
  error?: string
}

export default function FormGroup ({ children, error = '' }: FormGroupProps) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>

  )
}
