// repository pattern: é um padrão que abstrai a camada de acesso a dados, permitindo que a lógica de negócio da aplicação seja independente da forma como os dados são armazenados ou recuperados.

const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Victor',
    email: 'victor@mail.com',
    phone: '123456789',
    category_id: v4(), // uuid vai ser pra trabalhar com a tabela no banco de dados
  },
  {
    id: v4(),
    name: 'Marina',
    email: 'marina@mail.com',
    phone: '234567890',
    category_id: v4(), // uuid vai ser pra trabalhar com a tabela no banco de dados
  },
];

class ContactRepository {
  // simula o método de busca de todos os registros
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  // simula o método de busca de um registro
  findById(id) {
    return new Promise((resolve) =>
      resolve(contacts.find((contact) => contact.id === id)),
    );
  }

  // retorna um contato pelo email
  findByEmail(email) {
    return new Promise((resolve) =>
      resolve(contacts.find((contact) => contact.email === email)),
    );
  }

  create(name, email, phone, category_id) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name: name,
        email: email,
        phone: phone,
        category_id: category_id, // uuid vai ser pra trabalhar com a tabela no banco de dados
      };

      contacts.push(newContact); // adiciona o contato criado ao array de contatos
      resolve(newContact); // retorna o contato criado
    });
  }

  // simula o método de atualização de um registro
  update(id, name, email, phone, category_id) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact,
      ); // se o id do contato for igual ao id passado, retorna o contato atualizado, senão retorna o contato sem alterações e passa para o próximo contato

      resolve(updatedContact); // retorna o contato atualizado
    });
  }

  // simula o método de criação de um registro
  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);

      resolve();
    });
  }
}

module.exports = new ContactRepository(); // exporta uma instância única do repositório
