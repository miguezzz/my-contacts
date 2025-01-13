import { Container, InputSearchContainer } from './styles';

import logo from '../../assets/images/logo-light.svg';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="mycontacts light logo" width="201" />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato" />
      </InputSearchContainer>
    </Container>
  );
}
