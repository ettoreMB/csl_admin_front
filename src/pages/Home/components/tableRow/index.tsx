import { Link } from 'react-router-dom'
import enterIcon from '../../../../assets/icons/enter.svg'
interface TableRowProps {
  estabelecimento: {
    CNPJ: number
    NOME_FANTASIA: string
    RAZAO_SOCIAl: string
    EMAIL_REPRESENTANTE_DEMANDA: string
  }
}

export default function TableRow ({ estabelecimento }: TableRowProps) {
  return (
      <tr>
        <td>{estabelecimento.CNPJ}</td>
        <td>{estabelecimento.NOME_FANTASIA}</td>
        <td>{estabelecimento.EMAIL_REPRESENTANTE_DEMANDA}</td>
        <td className='action-field'>
          <Link
            to={`/estabelecimento/${estabelecimento.CNPJ}`}>
            <img src={enterIcon} alt="Icone de Entrar" />
          </Link>
        </td>
      </tr>
  )
}
