import axios, { AxiosError } from 'axios'
import { useState, ChangeEvent } from 'react'

import toast from '../../services/utils/toast'

export default function UseEstabelecimentoForm () {
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
        console.log(err?.response.data)
        toast({ text: `${err?.response.data}`, type: 'danger' })
      } else {
        toast({ text: 'Erro ao incluir CNPJ ', type: 'danger' })
      }
    }
  }

  function handleCnpj (event: ChangeEvent<HTMLInputElement>) {
    setCnpj(event.target.value)
  }

  return {
    cnpj,
    submiting,
    handleCnpj,
    handleSubmit
  }
}
