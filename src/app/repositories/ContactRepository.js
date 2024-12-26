// repository pattern: é um padrão que abstrai a camada de acesso a dados, permitindo que a lógica de negócio da aplicação seja independente da forma como os dados são armazenados ou recuperados.

const { v4 } = require('uuid');

const db = require('../../database'); //arquivo index.js n precisa especificar

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

  findByPhone(phone) {
    return new Promise((resolve) =>
      resolve(contacts.find((contact) => contact.phone === phone)),
    );
  }

  async create(name, email, phone, category_id) {
    // desestrtura o array de rows e pega a primeira posição (que é o registro inserido)
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, phone, category_id],
    );
    // insert into contacts(colunas que se deseja passar argumentos)
    // os $ servem para prevenir o SQL injection.
    // os valores passados no array serão passados, em ordem, para os values
    // o RETURNING * retorna o registro inserido (já que no insert não é retornado nada e queremos retornar o registro inserido no controller)
    return row;
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
