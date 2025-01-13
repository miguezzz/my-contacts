import styled from 'styled-components';

export const Container = styled.header`
  margin-top: 74px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputSearchContainer = styled.div`
  margin-top: 48px;
  width: 100%;

  input {
    width: 100%;
    background: #fff;
    max-width: 500px;
    height: 50px;
    padding: 0 16px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;

    &::placeholder { // &:: é usado para estilizar pseudo-elementos
      color: #bcbcbc;
    }
  }
`;
