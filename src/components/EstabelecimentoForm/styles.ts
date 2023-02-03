import styled from 'styled-components'

export const Form = styled.form`
  margin-top: 16px;
  gap: 8px;

  .info {
    color: ${({ theme }) => theme.colors.gray['800']};
  }


  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`
