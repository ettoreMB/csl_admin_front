import axios from 'axios'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import CreateEstabelecimento from '../NewEstabelecimento'
import { Container, InputSearchContainer } from './styles'

interface EstabelecimentoProps {
  CNPJ: number
}

export default function Home () {
  const [searchTerm, setSearchTerm] = useState('')
  const [estabelecimentos, setEstabelecimentos] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  function handleModal () {
    setModalIsVisible(!modalIsVisible)
  }

  function handleSearchTerm (event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  const filteredContactsByCNPJ = useMemo(() => estabelecimentos.filter((estabelecimento: EstabelecimentoProps) => (String(estabelecimento.CNPJ).includes(searchTerm))), [estabelecimentos, searchTerm])

  useEffect(() => {
    async function getData () {
      try {
        const response = await axios.get('http://localhost:5000/estabelecimentos/')
        setEstabelecimentos(response.data)
        console.log(estabelecimentos)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  return (
    <>
    <InputSearchContainer>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTerm}
        placeholder="Pesquise pelo CNPJ"
        />
    </InputSearchContainer>
    <button onClick={handleModal}>+ estabelecimento</button>
    <Container>
      <table>
        <thead>
          <th>CNPJ</th>
          <th>CNES</th>
          <th>RAZAO SOCIAL</th>
          <th>Representante</th>
          <th></th>
        </thead>
        <tbody>
          {filteredContactsByCNPJ.map((estabelecimento: EstabelecimentoProps) => (
            <tr key={estabelecimento.CNPJ}>
              <td>{estabelecimento.CNPJ}</td>
              <td>32154</td>
              <td>Loja Teste</td>
              <td>Rep</td>
              <td><Link to="/">Ir</Link></td>
          </tr>
          ))}

        </tbody>
      </table>
    </Container>
    <Modal visible={modalIsVisible} onCancel={handleModal}>
      <CreateEstabelecimento />
    </Modal>
    </>
  )
}
