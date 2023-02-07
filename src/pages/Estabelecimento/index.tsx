/* eslint-disable @typescript-eslint/restrict-template-expressions */

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import Label from './components/Label'
import { Container } from './styles'

import arrow from '../../assets/icons/arrow.svg'
interface EstabelecimentoProps {
  CNPJ: number
  CNES: string
  RAZAO_SOCIAl: string
  NOME_FANTASIA: string
  LOGRADOURO: string
  NUMERO: string
  COMPLEMENTO: string
  BAIRRO: string
  CEP: string
  EMAIL_REPRESENTANTE_DEMANDA: string
  EMAIL_REPRESENTANTE_VENDA: string
  municipio: {
    COD_MUNICIPIO: number
    CIDADE: string
    CIDADE_UF: string
    UF: string
  }
}

export default function Estabelecimento () {
  const [estabelecimento, setEstabelecimento] = useState<EstabelecimentoProps>({
    CNPJ: 0,
    CNES: '',
    NOME_FANTASIA: '',
    RAZAO_SOCIAl: '',
    LOGRADOURO: '',
    NUMERO: '',
    COMPLEMENTO: '',
    BAIRRO: '',
    EMAIL_REPRESENTANTE_VENDA: '',
    CEP: '',
    EMAIL_REPRESENTANTE_DEMANDA: '',
    municipio: {
      COD_MUNICIPIO: 0,
      CIDADE: '',
      CIDADE_UF: '',
      UF: ''
    }
  })
  const [isLoading, setIsloading] = useState(false)

  const { cnpj } = useParams()

  useEffect(() => {
    async function loadEstabelecimento () {
      try {
        setIsloading(true)
        const response = await axios.get(`${process.env.REACT_APP_BACK}/estabelecimentos/${cnpj}`)

        setEstabelecimento(response.data)

        setIsloading(false)
      } catch (error) {
        console.log(error)
      }
    }
    loadEstabelecimento()
  }, [cnpj])
  console.log(estabelecimento)
  return (
    <>
      <Loader isLoading={isLoading} />
      <Container>
          <Link to={'/'}>
            <img src={arrow} alt="Icone Voltar" />
            Voltar
          </Link>
        <Label
          title={'CNPJ'}
          value={estabelecimento?.CNPJ}
        />
        <Label
          title={'CNES'}
          value={estabelecimento.CNES}
        />
        <Label
          title={'RAZÃO SOCIAL'}
          value={estabelecimento.RAZAO_SOCIAl}
        />
        <Label
          title={'NOME FANTASIA'}
          value={estabelecimento.NOME_FANTASIA}
        />
        <Label
          title={'LOGRADOURO'}
          value={estabelecimento.LOGRADOURO ?? 'Não Informado'}
        />
        <Label
          title={'NUMERO'}
          value={estabelecimento.NUMERO ?? 'Não Informado' ?? 'Não Informado'}
        />
        {estabelecimento.municipio && (
          <Label
          title={'UF'}
          value={estabelecimento.municipio.UF}
        />
        )}

        <Label
          title={'REPRESENTANTE_DEMANDA'}
          value={estabelecimento.EMAIL_REPRESENTANTE_DEMANDA}
        />
        <Label
          title={'REPRESENTANTE_VENDA'}
          value={estabelecimento.EMAIL_REPRESENTANTE_VENDA}
        />
      </Container>
    </>
  )
}
