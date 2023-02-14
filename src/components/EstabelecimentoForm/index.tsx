/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import axios, { AxiosError } from 'axios'
import { useState, ChangeEvent } from 'react'

import toast from '../../services/utils/toast'
import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import { Form } from './styles'

export default function EstabelecimentoForm () {
  const [cnpj, setCnpj] = useState('')
  const [submiting, setIsSubmiting] = useState(false)

  async function handleSubmit (event: any): Promise<void> {
    try {
      event.preventDefault()
      setIsSubmiting(true)
      await axios.post(`${process.env.REACT_APP_BACK}/estabelecimentos/cnpj`, {
        cnpj
      })

      toast({ text: 'Estabelecimento Incluido com sucesso', type: 'success' })
      setIsSubmiting(false)
      setCnpj('')
    } catch (err) {
      setIsSubmiting(false)
      if (err instanceof AxiosError && err?.response?.data) {
        toast({ text: `${err?.response?.data?.message}`, type: 'danger' })
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
      <Button type='submit' isLoading={submiting}>Cadastrar</Button>
      </div>

    </Form>
  </>
  )
}
