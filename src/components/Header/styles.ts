import styled from 'styled-components'

export const HeaderContainer = styled.header`
  margin-top:64px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 48px;
  nav {
    display: flex;
    gap: 2rem;

    a{
      text-decoration: none;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.gray['900']};
    }
  }
`
