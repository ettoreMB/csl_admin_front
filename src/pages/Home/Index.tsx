
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import CreateEstabelecimento from '../NewEstabelecimento'
import { Container, InputSearchContainer } from './styles'
import enterIcon from '../../assets/icons/enter.svg'
import Loader from '../../components/Loader'
import UseHome from './useHome'

interface EstabelecimentoProps {
  CNPJ: number
  CNES: string
  RAZAO_SOCIAl: string
  NOME_FANTASIA: string
  EMAIL_REPRESENTANTE_DEMANDA: string
  municipio: {
    UF?: string
  }
}

export default function Home () {
  const {
    estabelecimentos,
    searchTerm,
    debaunceValue,
    modalIsVisible,
    isLoading,
    hasError,
    getData,
    loadData,
    handleSearchTerm,
    handleModal,
    handleTryAgain

  } = UseHome()

  useEffect(() => {
    if (debaunceValue) {
      getData(debaunceValue)
    }
    if (debaunceValue === '') {
      loadData()
    }
    return () => {}
  }, [debaunceValue, loadData])

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
            placeholder="Pesquise pelo CNPJ"
          />
        </InputSearchContainer>

      {hasError && (<h1>Erro ao carregar a pagina <button onClick={handleTryAgain}>Recarregar pagina</button></h1>)}
      {isListEmpty && <h1>Estabelecimento não encontrado  </h1>}

      <Container>
      {hasEstabelecimentos && (
        <>
          <table>
            <thead>
              <tr>
                <th>CNPJ</th>
                <th>RAZAO_SOCIAl</th>
                <th>UF</th>
                <th>Representante</th>
                <th>Acessar</th>
              </tr>
            </thead>
            <tbody>
              {estabelecimentos.map((estabelecimento: EstabelecimentoProps, index) => (
                <tr key={index} >
                  <td>{estabelecimento.CNPJ}</td>
                  <td>{estabelecimento.RAZAO_SOCIAl}</td>
                  <td>
                    {!estabelecimento.municipio ? '@' : estabelecimento.municipio.UF}
                  </td>
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
