import { Container } from './styles'

interface LabelProps {
  title: string
  value: string | number
}

export default function Label ({ title, value }: LabelProps) {
  return (
    <Container>
      <strong>{title}: </strong>
      <span>{value}</span>
    </Container>
  )
}
