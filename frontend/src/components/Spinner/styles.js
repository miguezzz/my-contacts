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

export const StyledSpinner = styled.div`
  svg {
      width: ${({ size }) => `${size}px`};
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
`;
