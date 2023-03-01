import styled from 'styled-components'

export const Container = styled.div`
  margin: 8px 0;

`
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
  align-items: center;
  justify-content: space-between;

`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80px;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  & .listHeader  {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    background-color: white;
    padding: 8px;
    gap: 20px;
    font-weight: bold;
  }
  div{
    display: grid;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    button {
      height: 24px;
      width: 24px;
      background: ${({ theme }) => theme.colors.danger.main};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;

      img {
        height: 100%;
      }
    }
  }
`
