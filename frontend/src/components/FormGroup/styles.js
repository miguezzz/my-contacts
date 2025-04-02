import styled from 'styled-components';
import { keyframes } from 'styled-components';

const rotate4 = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash4 = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
`;

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

    .loader {
      position: absolute; /* Absolute em relação ao relative pai */
      top: 10px;
      right: 16px;
    }
  }

  .loader {
    svg {
      width: 2em;
      transform-origin: center;
      animation: ${rotate4} 2s linear infinite;
    }

    circle {
      fill: none;
      stroke: ${({ theme }) => theme.colors.primary.main};
      stroke-width: 2;
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      animation: ${dash4} 1.5s ease-in-out infinite;
    }
  }
`;
