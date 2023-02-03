import styled from 'styled-components'

export const Container = styled.div`
  width: calc(100% - 0);
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;

  div {
    width: max-content;
    padding: 22px ;
    button {
      width: 248px;
      padding: 16px;
      border: none;
      background: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.gray[50]};
      font-weight: bold;
    }
  }

`
