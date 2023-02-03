/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import axios, { isAxiosError } from 'axios'
import { useState, ChangeEvent } from 'react'

import toast from '../../services/utils/toast'
import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import { Form } from './styles'

export default function EstabelecimentoForm () {
  const [cnpj, setCnpj] = useState('')

  async function handleSubmit (event: any): Promise<void> {
    try {
      event.preventDefault()
      await axios.post(`${process.env.REACT_APP_BASE_BACK_URL}/search`, {
        cnpj
      })

      toast({ text: 'Estabelecimento Incluido com sucesso', type: 'success' })
      setCnpj('')
    } catch (error) {
      if (isAxiosError(error)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        toast({ text: `${error?.response?.data?.message}`, type: 'danger' })
      } else {
        toast({ text: 'Erro ao incluir CNPJ ', type: 'danger' })
      }
    }
  }

  function handleCnpj (event: ChangeEvent<HTMLInputElement>) {
    setCnpj(event.target.value)
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <div>
        <span className='info'>As informações serão buscadas diretamente na receita federal</span>
      <FormGroup>
        < Input
        placeholder='cnpj*'
        type={'text'}
        value={cnpj}
        onChange={handleCnpj}
        />
      </FormGroup>
      <Button type='submit'>Cadastrar</Button>
      </div>

    </Form>
  </>
  )
}
