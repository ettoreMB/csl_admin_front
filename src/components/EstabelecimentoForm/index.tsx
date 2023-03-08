import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import { Form } from './styles'
import UseEstabelecimentoForm from './useEstabelecimentoForm'

export default function EstabelecimentoForm () {
  const {
    cnpj,
    handleCnpj,
    handleSubmit,
    submiting
  } = UseEstabelecimentoForm()

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <span className='info'>
          As informações serão buscadas diretamente na receita federal
        </span>
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
  )
}
