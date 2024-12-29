const db = require('../../database');

class CategoryRepository {
  // busca todas as categorias do banco
  async findAll(orderBy) {
    const direction = orderBy === 'desc' ? 'DESC' : 'ASC';

    // queremos o vetor de linhas
    const rows = await db.query(
      `SELECT * FROM categories ORDER BY name ${direction}`,
    );

    return rows;
  }

  // procura categoria pelo id
  async findById({ id }) {
    const [row] = await db.query(
      `
        SELECT * FROM categories where id = $1
      `,
      [id],
    );

    return row;
  }

  // procura categoria pelo nome
  async findByName(name) {
    // desestrutura o array de rows (vindo de database/index.js partindo do db.query) e pega a primeira posição (que é o registro desejado)
    const [row] = await db.query('SELECT * FROM categories WHERE name = $1', [
      name,
    ]);

    return row;
  }

  // cria nova categoria
  // desestrutura o name do objeto passado para pegar apenas o name
  async create({ name }) {
    const [row] = await db.query(
      `
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
      `,
      [name],
    );
    return row;
  }

  // atualiza categoria
  async update({ name, id }) {
    const [row] = await db.query(
      `
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
      `,
      [name, id],
    );

    return row;
  }

  // deleta categoria
  // Diferente de um comando SELECT, um DELETE não retorna o conteúdo das linhas deletadas, apenas informa se a operação foi bem-sucedida e quantas linhas foram afetadas.
  async delete({ id }) {
    const deleteOp = await db.query(
      `
      DELETE FROM contacts WHERE id = $1
      `,
      [id],
    );

    return deleteOp;
  }
}

module.exports = new CategoryRepository();
