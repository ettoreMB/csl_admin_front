import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { ReactNode } from 'react'

interface AuthContainerProps {
  children: ReactNode
}

export default function AuthContainer ({ children }: AuthContainerProps) {
  return (
    <>
      <AuthenticatedTemplate>
        {children}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>Faça login</h1>
      </UnauthenticatedTemplate>
    </>
  )
}
