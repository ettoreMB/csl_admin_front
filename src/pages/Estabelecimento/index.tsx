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
  RAZAO_SOCIAL: string
  NOME_FANTASIA: string
  LOGRADOURO: string
  NUMERO: string
  COMPLEMENTO: string
  BAIRRO: string
  CEP: string
  EMAIL_REPRESENTANTE_DEMANDA: string
  EMAIL_REPRESENTANTE_VENDA: string
  TBL_MUNICIPIOS: {
    CIDADE: string
    ESTADO: string
    UF: string
    COD_MUNICIPIO: number
  }
  TBL_FV_REPRESENTANTES_DEMANDA: {
    EMAIL_REPRESENTANTE_DEMANDA: string
  }
  TBL_ESTABELECIMENTOS_GRUPOS: {
    GRUPO_ESTABELECIMENTO: string
  }
}

export default function Estabelecimento () {
  const [estabelecimento, setEstabelecimento] = useState<EstabelecimentoProps>({
    CNPJ: 0,
    CNES: '',
    NOME_FANTASIA: '',
    RAZAO_SOCIAL: '',
    LOGRADOURO: '',
    NUMERO: '',
    COMPLEMENTO: '',
    BAIRRO: '',
    EMAIL_REPRESENTANTE_VENDA: '',
    CEP: '',
    EMAIL_REPRESENTANTE_DEMANDA: '',
    TBL_MUNICIPIOS: {
      CIDADE: '',
      ESTADO: '',
      UF: '',
      COD_MUNICIPIO: 0
    },
    TBL_FV_REPRESENTANTES_DEMANDA: {
      EMAIL_REPRESENTANTE_DEMANDA: ''
    },
    TBL_ESTABELECIMENTOS_GRUPOS: {
      GRUPO_ESTABELECIMENTO: ''
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
          value={estabelecimento.RAZAO_SOCIAL}
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
        {estabelecimento.TBL_MUNICIPIOS && (
          <Label
          title={'UF'}
          value={estabelecimento.TBL_MUNICIPIOS.UF}
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
