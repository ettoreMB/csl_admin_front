import Button from '../../../../components/Button'
import { LoadPageError } from './styles'

interface PageErrorProps {
  onHandleTryAgain: () => void
}

export function PageError ({ onHandleTryAgain }: PageErrorProps) {
  return (
    <LoadPageError>
      <h1>Erro ao carregar a pagina </h1>
      <Button type="button" onClick={onHandleTryAgain}>Recarregar pagina</Button>
    </LoadPageError>
  )
}
