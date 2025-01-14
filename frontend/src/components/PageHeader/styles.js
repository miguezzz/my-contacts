import styled from 'styled-components';

export const Container = styled.header`
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: left;

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }
  }

  h1 {
    font-size: 24px;
  }
`;
