import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: none; /* remove a imagem de fundo */
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 12px;
    display: block;
    margin-top: 8px;
  }

  .form-item {
    position: relative; /* Para o loader ficar em relação a esse elemento */
  }
`;
