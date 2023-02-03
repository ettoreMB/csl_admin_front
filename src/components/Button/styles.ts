import styled, { css } from 'styled-components'

interface StyledButtonProps {
  danger: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  font-weight: bold;
  height: 52px;
  color: #fff;
  padding: 0 16px;
  transition: background 0.2s ease-in;
  display: felx;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #ccc !important;
    cursor: default !important;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
    background: ${theme.colors.danger.light};
  }

  &:active {
    background: ${theme.colors.danger.dark};
  }

  `}
`
