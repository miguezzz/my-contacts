import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 24px;

  a {
    width: fit-content;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2px;

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
