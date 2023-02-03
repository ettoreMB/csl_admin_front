/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, ChangeEvent } from 'react'
import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import { Form } from './styles'
import toast from '../../services/utils/toast'
import { isAxiosError } from 'axios'

export default function PessoaFisicaForm () {
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')

  async function handleSubmit (event: any): Promise<void> {
    try {
      event.preventDefault()
      // await axios.post('http://localhost:5000/estabelecimentos/cpf', {
      //   cpf: cpf !== '' ? cpf : '999999999',
      //   name
      // })
      const fisica = {
        cpf: cpf !== '' ? cpf : '999999999',
        name
      }
      console.log(fisica)
      toast({ text: 'Estabelecimento Incluido com sucesso', type: 'success' })
      setCpf('')
    } catch (error) {
      if (isAxiosError(error)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        toast({ text: `${error?.response?.data?.message}`, type: 'danger' })
      } else {
        toast({ text: 'Erro ao incluir CNPJ ', type: 'danger' })
      }
    }
  }

  function handleCpf (event: ChangeEvent<HTMLInputElement>) {
    setCpf(event.target.value)
  }
  function handleName (event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
      <span className="info">
        O cadastro é feito apenas com o numero do CPF e nome.
      </span>
      <span className="info">
        Cadastros sem o CPF serão salvos com o valor de 99999999999
      </span>
      <FormGroup>
        <Input placeholder='nome*' onChange={handleName} />
      </FormGroup>
      <FormGroup>
        <Input placeholder='cpf' onChange={handleCpf}/>
      </FormGroup>
      </div>
      <Button type='submit'>Cadastrar</Button>
    </Form>
  )
}
