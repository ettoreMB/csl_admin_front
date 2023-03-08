import { useState, ChangeEvent, useEffect } from 'react'
import toast from '../../services/utils/toast'
import axios, { AxiosError } from 'axios'

export default function UsePessoaFisicaForm () {
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
      await axios.post(`${process.env.REACT_APP_BACK}/estabelecimentos/cpf`, {
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

  return {
    nome,
    cpf,
    ufList,
    codMunicipio,
    municipiosList,
    selectedUF,
    submiting,
    handleSubmit,
    handleCpf,
    handleName,
    handleCodMunicipio,
    handleUf
  }
}
