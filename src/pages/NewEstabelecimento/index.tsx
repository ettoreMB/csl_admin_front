
import { useState, ChangeEvent } from 'react'
import EstabelecimentoForm from '../../components/EstabelecimentoForm'
import { Container } from './styles'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
// import FormGroup from '../../components/FormGroup'

export default function CreateEstabelecimento () {
  // const [cnpj, setCnpj] = useState('')
  // const [data, setData] = useState({})
  const [isCNPJ, setIsCnpj] = useState('juridica')

  function handleSelectOption (event: ChangeEvent<HTMLSelectElement>) {
    setIsCnpj(event.target.value)
  }

  return (
    <>
    <AuthenticatedTemplate>
      <Container>
      <div className="head">
        <h1>Qual tipo de cadastro deseja fazer ?</h1>
        <select name="" id="" onChange={handleSelectOption}>
        <option value="juridica">Juridica</option>
        <option value="fisica">fisica</option>
      </select>
      </div>
      {isCNPJ === 'juridica'
        ? (<EstabelecimentoForm/>)
        : (<h1>Em desenvolvimento</h1>)}

      </Container>
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
      <h1>Faça login</h1>
    </UnauthenticatedTemplate>
  </>
  )
}
