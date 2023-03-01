import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    background: ${({ theme }) => theme.colors.gray['200']};
    font-size: 16px;
    color:${({ theme }) => theme.colors.gray[900]};
  }

  button {
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
    margin: 8px 0;

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
  }
`
