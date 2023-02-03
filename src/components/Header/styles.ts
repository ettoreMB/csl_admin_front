import styled from 'styled-components'

export const HeaderContainer = styled.header`
  height: 56px;
  display: flex ;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
  background: ${({ theme }) => theme.colors.primary.main};
  div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    max-width: 1280px;
    padding: 0 16px;

  }
  button {
    background: transparent;
    border:  none;
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
