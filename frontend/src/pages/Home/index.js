import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import { useEffect } from 'react';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderBy]); // dependency array vazio para executar apenas uma vez

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar Contato"
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length !== 1 ? ' contatos' : ' contato'}
        </strong>
        <Link to="/new">Adicionar Contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            {/* edit vai ser outra page */}
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>

            {/* delete vai ser um button com confirm */}
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
