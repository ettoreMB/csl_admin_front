/* eslint-disable @typescript-eslint/no-misused-promises */

import { Container } from './styles'
import { useMsal as UseMsal } from '@azure/msal-react'

export default function Login () {
  const { instance } = UseMsal()
  async function handleLogin () {
    await instance.loginPopup()
  }
  return (
    <Container>
      <h1>CSL ADMIN</h1>
      <span>Faça Login para acessar o sistema</span>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </Container>

  )
}
