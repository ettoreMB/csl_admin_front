import styled from 'styled-components'

export const HeaderContainer = styled.header`
  height: 56px;
  display: flex ;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.gray['50']};
  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 1280px;
    padding: 0 16px;
    gap: 16px

  }
  button {
    background: transparent;
    border:  none;
    height: 100%;
    color: ${({ theme }) => theme.colors.gray['50']};
    font-weight: bold;

    &:hover {
      color: ${({ theme }) => theme.colors.gray['200']};
    }
  }
  img {
    height: 50px;
  }
  div {
    a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray[50]};
    font-weight: bold;
  }
  }



`
