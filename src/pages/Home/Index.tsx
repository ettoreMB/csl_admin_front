import Modal from '../../components/Modal'
import CreateEstabelecimento from '../NewEstabelecimento'
import { Container, InputSearchContainer } from './styles'
import Loader from '../../components/Loader'
import UseHome from './useHome'
import HomeTable from './components/table'
import TableRow from './components/tableRow'
import { PageError } from './components/pageError'

interface EstabelecimentoProps {
  CNPJ: number
  CNES: string
  RAZAO_SOCIAl: string
  NOME_FANTASIA: string
  EMAIL_REPRESENTANTE_DEMANDA: string
  TBL_MUNICIPIOS: {
    UF?: string
  }
}

export default function Home () {
  const {
    estabelecimentos,
    searchTerm,
    modalIsVisible,
    isLoading,
    hasError,
    handleSearchTerm,
    handleModal,
    handleTryAgain
  } = UseHome()

  const hasEstabelecimentos = !isLoading && estabelecimentos.length >= 1
  const isListEmpty = !hasError && (!isLoading && !hasEstabelecimentos)

  return (
    <>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTerm}
          placeholder="Pesquise pelo CNPJ ou nome fantasia"
        />
      </InputSearchContainer>

      {hasError && (<PageError onHandleTryAgain={handleTryAgain}/>)}
      {isListEmpty && <h1>Estabelecimento não encontrado </h1>}

      <Container>
        {hasEstabelecimentos && (
          <HomeTable>
            {estabelecimentos.map((estabelecimento: EstabelecimentoProps) => (
              <TableRow key={Math.random()} estabelecimento={estabelecimento} />
            ))}
          </HomeTable>
        )}
      </Container>

      <Modal visible={modalIsVisible} onCancel={handleModal}>
        <CreateEstabelecimento />
      </Modal>
    </>
  )
}
