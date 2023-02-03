import styled from 'styled-components'

export const Container = styled.div`
display:  flex;
flex-direction: column;
background: ${({ theme }) => theme.colors.background};
padding: 16px;
border-radius:8px;
box-shadow: ${({ theme }) => theme.colors.shadown};
a {
  text-decoration: none;
  margin-bottom: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  img {
    height: 24px;
  }
}
`
