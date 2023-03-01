/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios'
import { useState, ChangeEvent, useEffect } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'

import { ListContainer } from './styles'

export default function TransferenciaSetorizacao () {
  const [estabelecimento, setEstabelecimento] = useState({
    CNPJ: '',
    RAZAO_SOCIAL: ''
  })
  const [searchParam, setSerachParam] = useState('')
  const [estabelecimentosList, setEstabelecimentosList] = useState<any>([])
  const [selectedEmail, setSelectedEmail] = useState('')
  const [emails, setEmails] = useState([])
  const [hasError, setHasError] = useState(false)
  async function handleSearchEstabelecimento () {
    try {
      const result = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos/${searchParam}`)
      setEstabelecimento(result.data)
      setHasError(false)
    } catch (error) {
      setHasError(true)
    }
  }

  useEffect(() => {
    async function loadEmails () {
      const resposne = await axios.get(`${process.env.REACT_APP_BACK}/setorizacao/emails`)
      setEmails(resposne.data)
    }
    loadEmails()
  }, [])

  function handleAddEstabelecimentoList () {
    const estabelecimentoAlredyIncluded = estabelecimentosList.find((est: any) => est.CNPJ === estabelecimento.CNPJ)
    if (estabelecimentoAlredyIncluded) {
      return
    }
    setSerachParam('')
    setEstabelecimento({
      CNPJ: '',
      RAZAO_SOCIAL: ''
    })
    setEstabelecimentosList((prev: any) => [...prev, estabelecimento])
  }

  function handleRemoveEstabelecimentofromList (cnpj: string) {
    setEstabelecimentosList((prev: any) => prev.filter(
      (estabelecimento: any) => estabelecimento.CNPJ !== cnpj
    ))
  }
  function handleInputSearchEstabelecimento (event: ChangeEvent<HTMLInputElement>) {
    setSerachParam(event.target.value)
  }

  function handleSelectEmail (event: ChangeEvent<HTMLSelectElement>) {
    setSelectedEmail(event.target.value)
  }

  async function handleSubmit (event: any) {
    try {
      event.preventDefault()
      const estabelecimentoCnpj = estabelecimentosList.map((est: any) => {
        return est.CNPJ
      })

      await axios.patch(`${process.env.REACT_APP_BACK}/setorizacao/transferir`, {
        emailRep: selectedEmail,
        estabelecimentos: estabelecimentoCnpj
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <label htmlFor="">Procurar cnpj</label>
      <Input type="text" value={searchParam} onChange={handleInputSearchEstabelecimento} />
      <Button type='button' onClick={handleSearchEstabelecimento}>Procurar</Button>

      {(estabelecimento && !hasError) && (
        <>

          <h2>{estabelecimento?.CNPJ}</h2>
          <h2>{estabelecimento.RAZAO_SOCIAL}</h2>
          <Button type='button' onClick={handleAddEstabelecimentoList}>adicionar</Button >
          {hasError && (<h2>Erro</h2>)}
        </>

      )}

      <ListContainer>
        {estabelecimentosList?.map((est: any) => (
          <div key={est.CNPJ}>
            <span >{est.CNPJ}</span>
            <span >{est.NOME_FANTASIA}</span>
            <span >{est.EMAIL_REPRESENTANTE_DEMANDA}</span>
            <Button type='button' onClick={() => { handleRemoveEstabelecimentofromList(est.CNPJ) }}>Remover</Button>
          </div>

        ))}
      </ListContainer>
      {estabelecimentosList.length > 0 && (
        <>
          <span>Transferir para :</span>
          <Select onChange={handleSelectEmail} value={selectedEmail}>
            <option>Email</option>
            {emails.map((email: any) =>
              (<option key={email.EMAIL_REPRESENTANTE_DEMANDA} value={email.EMAIL_REPRESENTANTE_DEMANDA}>{email.EMAIL_REPRESENTANTE_DEMANDA}</option>)
            )}
          </Select>
          <button type='button' onClick={handleSubmit}> Transferir</button>
        </>
      )}
    </>
  )
}
