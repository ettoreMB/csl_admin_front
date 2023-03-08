
import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import { Form } from './styles'
import UsePessoaFisicaForm from './usePessoaFisicaForm'

export default function PessoaFisicaForm () {
  const {
    nome,
    municipiosList,
    cpf,
    selectedUF,
    ufList,
    codMunicipio,
    submiting,
    handleSubmit,
    handleName,
    handleCpf,
    handleUf,
    handleCodMunicipio
  } = UsePessoaFisicaForm()
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
