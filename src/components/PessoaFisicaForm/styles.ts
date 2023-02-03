import styled from 'styled-components'

export const Form = styled.form`
margin-top: 16px ;
  display: flex;
    flex-direction: column;
    gap: 8px;
.info {
    color: ${({ theme }) => theme.colors.gray['800']};
    margin:  4px 0;
  }
  div {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
  }
`
