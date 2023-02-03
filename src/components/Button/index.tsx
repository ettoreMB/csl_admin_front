
import React from 'react'
import Spinner from '../Spinner'
import { StyledButton } from './styles'

interface ButtonProps {
  type: 'button' | 'reset' | 'submit' | undefined
  disabled?: boolean
  isLoading?: boolean
  children: React.ReactNode
  danger?: boolean
  onClick?: () => void
}

export default function Button ({
  type = 'button', disabled = false, isLoading, children, danger = false, onClick
}: ButtonProps) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading} danger={danger} onClick={onClick}>
      {isLoading && <Spinner size={16} />}
      {!isLoading && children}
    </StyledButton>
  )
}
