import {
  Container,
  InputSearchContainer,
  Header,
  ListContainer,
  Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function ContactsList() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato" />
      </InputSearchContainer>

      <Header>
        <strong>3 Contatos</strong>
        <a href="/">Adicionar Contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <class className="info">
            <div className="contact-name">
              <strong>Victor Miguez</strong>
              <small>instagram</small>
            </div>
            <span>victor@dev.com</span>
            <span>(21) 99999-9999</span>
          </class>

          <div className="actions">
            {/* edit vai ser outra page */}
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>

            {/* delete vai ser um button com confirm */}
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
        <Card>
          <class className="info">
            <div className="contact-name">
              <strong>Victor Miguez</strong>
              <small>instagram</small>
            </div>
            <span>victor@dev.com</span>
            <span>(21) 99999-9999</span>
          </class>

          <div className="actions">
            {/* edit vai ser outra page */}
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>

            {/* delete vai ser um button com confirm */}
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
        <Card>
          <class className="info">
            <div className="contact-name">
              <strong>Victor Miguez</strong>
              <small>instagram</small>
            </div>
            <span>victor@dev.com</span>
            <span>(21) 99999-9999</span>
          </class>

          <div className="actions">
            {/* edit vai ser outra page */}
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>

            {/* delete vai ser um button com confirm */}
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
