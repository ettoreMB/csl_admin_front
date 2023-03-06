/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, ChangeEvent, useEffect } from 'react'
import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import { Form } from './styles'
import toast from '../../services/utils/toast'
import axios, { AxiosError } from 'axios'

export default function PessoaFisicaForm () {
  const [cpf, setCpf] = useState('')
  const [nome, setNome] = useState('')
  const [codMunicipio, setCodMunicipio] = useState('0000000')
  const [ufList, setUfList] = useState([])
  const [municipiosList, setMunicipiosList] = useState([])
  const [selectedUF, setSelectedUF] = useState('')
  const [submiting, setIsSubmiting] = useState(false)

  useEffect(() => {
    async function loadUF () {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK}/municipios/uf`)
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
      setIsSubmiting(true)
      console.log(nome, cpf)
      await axios.post('http://localhost:5000/estabelecimentos/cpf', {
        cpf,
        nome,
        codMunicipio
      })

      toast({ text: 'Pessoa Incluido com sucesso', type: 'success' })
      setCpf('')
      setNome('')
      setIsSubmiting(false)
    } catch (err) {
      setIsSubmiting(false)
      if (err instanceof AxiosError && err?.response?.data) {
        toast({ text: `${err?.response?.data}`, type: 'danger' })
      } else {
        toast({ text: 'Erro ao incluir CNPJ ', type: 'danger' })
      }
    }
  }

  async function handleMunicipios (uf: string): Promise<any> {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/municipios/cities/${uf}`)
    setMunicipiosList(response.data)
  }
  function handleCpf (event: ChangeEvent<HTMLInputElement>) {
    setCpf(event.target.value)
  }
  function handleName (event: ChangeEvent<HTMLInputElement>) {
    setNome(event.target.value)
  }
  function handleCodMunicipio (event: ChangeEvent<HTMLSelectElement>) {
    setCodMunicipio(event.target.value)
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
        <Input placeholder='nome*' onChange={handleName} value={nome} />
      </FormGroup>
      <FormGroup>
        <Input placeholder='cpf*' onChange={handleCpf} value={cpf}/>
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
          <select onChange={handleCodMunicipio} value={codMunicipio}>
            <option value="Nao Informado">Não informado</option>
            {municipiosList.map((municipio: any) => (
              <option key={Math.random()} value={municipio.COD_MUNICIPIO}>{municipio.CIDADE}</option>
            ))}
        </select>
        </FormGroup>
        </div>
        )}
        </div>

      </div>
      <Button type='submit' isLoading={submiting}>Cadastrar</Button>
    </Form>
  )
}
