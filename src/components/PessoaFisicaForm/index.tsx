/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, ChangeEvent, useEffect } from 'react'
import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import { Form } from './styles'
import toast from '../../services/utils/toast'
import axios, { isAxiosError } from 'axios'

export default function PessoaFisicaForm () {
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [ufList, setUfList] = useState([])
  const [municipiosList, setMunicipiosList] = useState([])
  const [selectedUF, setSelectedUF] = useState('')

  useEffect(() => {
    async function loadUF () {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK}/municipios`)
        setUfList(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadUF()
  }, [])

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
        toast({ text: `${error?.response?.data?.message}`, type: 'danger' })
      } else {
        toast({ text: 'Erro ao incluir CNPJ ', type: 'danger' })
      }
    }
  }

  async function handleMunicipios (uf: string): Promise<any> {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/municipios/${uf}`)
    setMunicipiosList(response.data)
  }
  function handleCpf (event: ChangeEvent<HTMLInputElement>) {
    setCpf(event.target.value)
  }
  function handleName (event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }
  function handleUf (event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUF(event.target.value)
    if (event.target.value === 'vazio') {
      setMunicipiosList([])
    }
    handleMunicipios(event.target.value)
  }

  const isUfEmpty = municipiosList.length < 1

  return (
    <Form onSubmit={handleSubmit}>
      <div>

      <FormGroup>
        <Input placeholder='nome*' onChange={handleName} />
      </FormGroup>
      <FormGroup>
        <Input placeholder='cpf*' onChange={handleCpf}/>
      </FormGroup>

        <div className='uf'>
          <div>
          <span>UF</span>
        <FormGroup>
          <select onChange={handleUf} value={selectedUF}>
            <option value="00000000">Não informado</option>
            {ufList.map((u: any) => (
              <option key={Math.random()} value={u.UF}>{u.UF}</option>
            ))}
          </select>
        </FormGroup>
          </div>

        {!isUfEmpty && (
          <div>
          <span>Cidade</span>
          <FormGroup>
          <select>
            {municipiosList.map((municipio: any) => (
              <option key={municipio.COD_MUNICIPIO} value={municipio.COD_MUNICIPIO}>{municipio.CIDADE}</option>
            ))}
        </select>
        </FormGroup>
        </div>
        )}
        </div>

      </div>
      <Button type='submit'>Cadastrar</Button>
    </Form>
  )
}
