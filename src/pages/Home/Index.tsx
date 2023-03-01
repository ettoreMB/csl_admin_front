
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import CreateEstabelecimento from '../NewEstabelecimento'
import { Container, InputSearchContainer, LoadPageError } from './styles'
import enterIcon from '../../assets/icons/enter.svg'
import Loader from '../../components/Loader'
import UseHome from './useHome'
import Button from '../../components/Button'

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

      {hasError &&
      (
      <LoadPageError>
        <h1>Erro ao carregar a pagina </h1>
        <Button type="button" onClick={handleTryAgain}>Recarregar pagina</Button>
      </LoadPageError>)}
      {isListEmpty && <h1>Estabelecimento não encontrado  </h1>}

      <Container>
      {hasEstabelecimentos && (
        <>
          <table>
            <thead>
              <tr>
                <th>CNPJ</th>
                <th>NOME FANTASIA</th>
                <th>Representante</th>
                <th>Acessar</th>
              </tr>
            </thead>
            <tbody>
              {estabelecimentos.map((estabelecimento: EstabelecimentoProps, index) => (
                <tr key={index} >
                  <td>{estabelecimento.CNPJ}</td>
                  <td>{estabelecimento.NOME_FANTASIA}</td>
                  <td>{estabelecimento.EMAIL_REPRESENTANTE_DEMANDA}</td>
                  <td className='action-field'>
                    <Link
                      to={`/estabelecimento/${estabelecimento.CNPJ}`}>
                      <img src={enterIcon} alt="Icone de Entrar" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      </Container>

      <Modal visible={modalIsVisible} onCancel={handleModal}>
        <CreateEstabelecimento />
      </Modal>
    </>
  )
}
