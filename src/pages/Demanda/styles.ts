import styled from 'styled-components'

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
  gap: 16px;
  height: fit-content;
  align-items: center;
  select {
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    height: 52px;
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    border: 2px solid #fff;
  }
  label {
    font-size: 24px;
  }
  &:first-child {
    width: 100px ;
  }
  &:last-child {
    width: 100% ;
  }
  margin-bottom: 32px;
`

export const DemandaTable = styled.table`
width: 100%;
thead {
    background: ${({ theme }) => theme.colors.primary.main};
    color: #fff;

  }
  tbody {
    tr {
      background: ${({ theme }) => theme.colors.background};
      td {
        padding: 4px 8px;
        word-break: break-word;
      }
      td:nth-child(0) {
        width: 50%;
      }
      td:last-child {
        width: 8%;
        text-align: center;
        font-weight: bold;
      }

    }

  }

`
