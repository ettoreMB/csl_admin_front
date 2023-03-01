/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Select from '../../components/Select'
import { useState, useEffect, ChangeEvent, useMemo } from 'react'
import axios from 'axios'
import { InputSearchContainer } from '../Home/styles'
import { Container } from './styles'

interface EmailProps {
  EMAIL_REPRESENTANTE_DEMANDA: string
}

interface EstabelecimentoProps {
  CNPJ: string
  EMAIL_REPRESENTANTE_DEMANDA: string
  RAZAO_SOCIAL: string
}
export default function Setoriacao () {
  const [emails, setEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState('')
  const [estabelecimentos, setEstabelecimentos] = useState([])
  const [searchParam, setSearchParam] = useState('')

  const filteredData = useMemo(() => estabelecimentos.filter((value: EstabelecimentoProps) => (
    value.CNPJ.includes(searchParam) ||
    value.RAZAO_SOCIAL.toUpperCase().includes(searchParam.toUpperCase())
  )), [estabelecimentos, searchParam])
  function handleSelectEmail (event: ChangeEvent<HTMLSelectElement>) {
    setSelectedEmail(event.target.value)
  }

  function handleSearchParam (event: ChangeEvent<HTMLInputElement>) {
    setSearchParam(event.target.value)
  }

  useEffect(() => {
    async function loadEmails () {
      const resposne = await axios.get(`${process.env.REACT_APP_BACK}/setorizacao/emails`)
      setEmails(resposne.data)
    }
    loadEmails()
  }, [])

  useEffect(() => {
    async function loadEstabelecimentos () {
      const resposne = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos/setorizacao/${selectedEmail}`)
      setEstabelecimentos(resposne.data)
    }
    loadEstabelecimentos()
  }, [selectedEmail])

  const hasEstabelecimentos = filteredData.length > 0
  return (
    <Container>
      <label>Email Representante :</label>
      <Select onChange={handleSelectEmail}>
        <option>Email</option>
        {emails.map((email: EmailProps) =>
          (<option key={email.EMAIL_REPRESENTANTE_DEMANDA} value={email.EMAIL_REPRESENTANTE_DEMANDA}>{email.EMAIL_REPRESENTANTE_DEMANDA}</option>)
        )}
      </Select>
      {hasEstabelecimentos && (
        <>
          <InputSearchContainer >
            <input
            type="text"
            onChange={handleSearchParam}
            value={searchParam}
            placeholder="Pesquise pelo cnpj ou nome"
            />
          </InputSearchContainer>
          <table>
            <thead>
              <tr>
                <th>CNPJ</th>
                <th>Razao social</th>
                <th>Representante</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((value: any) => (
                <tr key={value.CNPJ}>
                  <td>{value.CNPJ}</td>
                  <td>{value.RAZAO_SOCIAL}</td>
                  <td >{value.EMAIL_REPRESENTANTE_DEMANDA}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Container>
  )
}
