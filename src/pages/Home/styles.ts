import styled from 'styled-components'

export const Container = styled.div`
 width: 100%;

table {
  width: 100%;
  margin-bottom: 24px;

  thead {
    background: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
    tr:last-child {
      width: 55px;
    }
    th {
      border-radius: 4px;
    }
  }
  tbody {
    tr {
      background: ${({ theme }) => theme.colors.background};
      td:last-child {
      width: 8%;
      text-align: center;
      img {
        height: 24px;
      }

      }
      td:nth-child(1) {
        width: 15%;
      }
      td:nth-child(3) {
        width: 5%;
      }
      td:nth-child(4) {
        width: 28%;
      }
      td {
      padding: 4px 8px;
      word-break: break-word;

    }
    }


  }
}
`

export const InputSearchContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    padding: 0 1rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
    outline: 0;
      &::placeholder {
        color: ${({ theme }) => theme.colors.gray['200']};
      }
   }
`
