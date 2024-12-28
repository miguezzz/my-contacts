// repository pattern: é um padrão que abstrai a camada de acesso a dados, permitindo que a lógica de negócio da aplicação seja independente da forma como os dados são armazenados ou recuperados.

const db = require('../../database'); //arquivo index.js n precisa especificar

class ContactRepository {
  // método de busca de todos os registros da lista de contatos
  async findAll() {
    const rows = await db.query('SELECT * FROM contacts ORDER BY name ASC'); // array de objetos com os registros
    return rows;
  }

  // método de busca de um registro por id no bd
  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]); // desestrutura o array de rows e pega a primeira posição (que é o registro)
    return row;
  }

  // retorna um contato pelo email
  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [
      email,
    ]);
    return row;
  }

  // retorna um contato pelo telefone
  async findByPhone(phone) {
    const [row] = await db.query('SELECT * FROM contacts WHERE $1 = phone', [
      phone,
    ]);
    return row;
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
