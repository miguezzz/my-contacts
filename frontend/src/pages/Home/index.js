import { useEffect, useState, useMemo } from 'react';
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

import Loader from '../../components/Loader';

import ContactsService from '../../services/ContactsService';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        // se searchTerm for '', filteredContacts será um array com todos os contatos
        contact.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    // faz a filtragem de contatos novamente apenas se mudar os contacts ou o searchTerm
    [contacts, searchTerm],
  );

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);
        console.log('contactsList:', contactsList);

        setContacts(contactsList);
      } catch (error) {
        console.log(error);
        console.log('response:', error.response);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();

    return () => console.log('cleanup');
  }, [orderBy]); // dependency array monitorando a mudança de ordenação

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

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
