import { useState } from 'react';
import { Link } from 'react-router-dom';

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
import { useEffect } from 'react';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]); // inicializa com array vazio

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(contacts);

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato" />
      </InputSearchContainer>

      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Adicionar Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Victor Miguez</strong>
              <small>instagram</small>
            </div>
            <span>victor@dev.com</span>
            <span>(21) 99999-9999</span>
          </div>

          <div className="actions">
            {/* edit vai ser outra page */}
            <Link to="/edit/123">
              <img src={edit} alt="Edit" />
            </Link>

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
