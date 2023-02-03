import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.dark};
  color: ${({ theme }) => theme.colors.primary.lighter};
  position: fixed;
  width: 250px;
  height: 100%;
  justify-content: center;
  padding: 16px;
  left: 0;
  top: 0;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      background: none;
      border: none;
      height: 50px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 4px;


    a {
      text-align: left;
      padding: 20px 0;
      background-color: black;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.primary.lighter};
      background-color: ${({ theme }) => theme.colors.primary.dark};
      padding-left: 8px;
      border-radius: 8px;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.darker};
      }

    }
  }

`
