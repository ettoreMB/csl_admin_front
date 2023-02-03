import styled from 'styled-components'

export const Container = styled.div`
 width: 100%;
.head {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}
select {
  width: 200px;
  text-align: center;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  height: 44px;
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid #fff;
  transition: border-color 0.2s ease-in;
  /* appearance: none; */
    &:focus {
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
    }

    &[disabled] {
      background-color: ${({ theme }) => theme.colors.gray[100]};
      border-color: ${({ theme }) => theme.colors.gray[200]};
      opacity: 1;
    }

}
`
