/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios'
import { useEffect, ChangeEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import CreateEstabelecimento from '../NewEstabelecimento'
import { Container, InputSearchContainer } from './styles'
import enterIcon from '../../assets/icons/enter.svg'
import Loader from '../../components/Loader'

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

  function handleModal () {
    setModalIsVisible(!modalIsVisible)
  }

  function handleSearchTerm (event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function tranformCNPJ (cnpj: number) {
    const transforedCNPJ = String(cnpj)
    if (transforedCNPJ.length > 11) {
      return transforedCNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }
    return transforedCNPJ.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  useEffect(() => {
    async function getData () {
      try {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos`)

        setEstabelecimentos(response.data)
        setHasError(false)
        setIsLoading(false)
      } catch (error) {
        setHasError(true)
        setIsLoading(false)
      }
    }

    getData()
  }, [])
  const filteredContactsByCNPJ = useMemo(() => estabelecimentos.filter((estabelecimento: EstabelecimentoProps) => (
    String(estabelecimento.CNPJ)
      .startsWith(searchTerm.replace(/[^a-zA-Z0-9 ]/g, '')))
  ), [estabelecimentos, searchTerm])
  const hasEstabelecimentos = filteredContactsByCNPJ.length > 0
  const isListEmpty = !hasError && (!isLoading && !hasEstabelecimentos)
  return (
    <>
        <Loader isLoading={isLoading} />
        {hasError && (<h1>Erro ao carregar a pagina</h1>)}
         <Container>

        {hasEstabelecimentos && (
          <>
            <InputSearchContainer>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTerm}
                placeholder="Pesquise pelo CNPJ"
                />

            </InputSearchContainer>
                {isListEmpty && (<h1>Nenhum Cnpj encontrado</h1>)}
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

                {filteredContactsByCNPJ.slice(0, 15)?.map((estabelecimento: EstabelecimentoProps, index) => (
                  <tr key={index} >
                    <td>{tranformCNPJ(estabelecimento.CNPJ)}</td>
                    <td>{estabelecimento.RAZAO_SOCIAl}</td>
                    <td>
                      {!estabelecimento.municipio
                        ? '@'
                        : estabelecimento.municipio.UF
                      }
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
