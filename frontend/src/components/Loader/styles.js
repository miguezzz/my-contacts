import styled, { keyframes } from 'styled-components';

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

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(246, 245, 252, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    svg {
      width: 3.25em;
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
