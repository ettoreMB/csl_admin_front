
import { useState, ChangeEvent } from 'react'
import EstabelecimentoForm from '../../components/EstabelecimentoForm'
import { Container } from './styles'
import PessoaFisicaForm from '../../components/PessoaFisicaForm'

export default function CreateEstabelecimento () {
  const [isCNPJ, setIsCnpj] = useState('juridica')

  function handleSelectOption (event: ChangeEvent<HTMLSelectElement>) {
    setIsCnpj(event.target.value)
  }

  return (
      <Container>
        <div className="head">
          <h1>Qual tipo de cadastro deseja fazer ?</h1>
          <select name="" id="" onChange={handleSelectOption}>
            <option value="juridica">Juridica</option>
            <option value="fisica">fisica</option>
          </select>
        </div>
        {isCNPJ === 'juridica'
          ? (<EstabelecimentoForm />)
          : (<PessoaFisicaForm />)}

      </Container>
  )
}
