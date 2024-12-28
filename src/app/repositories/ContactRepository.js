// repository pattern: é um padrão que abstrai a camada de acesso a dados, permitindo que a lógica de negócio da aplicação seja independente da forma como os dados são armazenados ou recuperados.

const db = require('../../database'); //arquivo index.js n precisa especificar

class ContactRepository {
  // método de busca de todos os registros da lista de contatos
  async findAll(orderBy) {
    const direction = orderBy === 'desc' ? 'DESC' : 'ASC'; // se o orderBy for desc, a direção é DESC, senão é ASC

    const rows = await db.query(
      `SELECT * FROM contacts ORDER BY name ${direction}`, // direction previne SQL injection
    ); // retorna array de objetos com os registros

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

  // método de atualização de um registro no banco
  async update(id, name, email, phone, category_id) {
    // cuidado pra n esquecer o WHERE
    const [row] = await db.query(
      // pega o primeiro elemento do array com desestruturação
      `
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
      `, // precisa do where senão alteramos TODAS as linhas da tabela
      [name, email, phone, category_id, id],
    );

    return row;
  }

  // deleta um contato no banco -> se não usar where, todas as linhas são deletadas!
  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM contacts WHERE id = $1
      `,
      [id],
    );

    return deleteOp;
  }
}

module.exports = new ContactRepository(); // exporta uma instância única do repositório
