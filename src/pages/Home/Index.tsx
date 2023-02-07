/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios'
import { useEffect, ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import CreateEstabelecimento from '../NewEstabelecimento'
import { Container, InputSearchContainer } from './styles'
import enterIcon from '../../assets/icons/enter.svg'
import Loader from '../../components/Loader'
import UseDebounce from '../../hooks/useDebounceSearch'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [estabelecimentos, setEstabelecimentos] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(true)

  const { debaunceValue } = UseDebounce(searchTerm, 400)
  function handleModal () {
    setModalIsVisible(!modalIsVisible)
  }

  function handleSearchTerm (event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }
  async function loadData () {
    try {
      // setIsLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos/?cnpj=`)

      setEstabelecimentos(response.data)
      setHasError(false)
      setIsLoading(false)
    } catch (error) {
      setHasError(true)
      setIsLoading(false)
    }
  }
  async function getData (value: string) {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos?cnpj=${value}`)
    // setIsLoading(true)
    setEstabelecimentos(response.data)
    setHasError(false)
    setIsLoading(false)
  }
  useEffect(() => {
    if (debaunceValue) {
      getData(debaunceValue)
    }
    if (debaunceValue === '') {
      loadData()
    }
    return () => {}
  }, [debaunceValue])

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

      {hasError && (<h1>Erro ao carregar a pagina</h1>)}
      {isListEmpty && <h1>Estabelecimento não encontrado </h1>}

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
