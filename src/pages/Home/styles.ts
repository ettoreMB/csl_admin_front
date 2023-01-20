import styled from 'styled-components'

export const Container = styled.div`
 width: 100%;

table {
  width: 100%;

  thead {
    background: ${({ theme }) => theme.colors.primary.dark};
    th {
      border-radius: 4px;
    }
  }
  tbody {
    tr {
      background: ${({ theme }) => theme.colors.primary.light};
    }
  }
}
`

export const InputSearchContainer = styled.div`
  width: 100%;
  input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    padding: 0 1rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
      &::placeholder {
        color: ${({ theme }) => theme.colors.gray['200']};
      }
   }
`
