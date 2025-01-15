import styled, { css } from 'styled-components';

export default styled.button`
  height: 52px;
  padding: 0 16px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  color: #fff;
  border-radius: 4px;
  transition: background 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.darker};
  }

  &[disabled] {
    background: #ccc;
    cursor: default;
  }

  // Adicionando estilos condicionais
  // o css abaixo é uma função do styled-components que permite adicionar estilos conforme condições. Ele troca as propriedades neste caso conforme danger for true ou false.
  ${({ theme, danger }) =>
    danger &&
    css`
    background: ${theme.colors.danger.main};

    &:hover {
      background: ${({ theme }) => theme.colors.danger.dark};
    }

    &:active {
      background: ${({ theme }) => theme.colors.danger.darker};
    }
  `}
`;
