const db = require('../../database');

class CategoryRepository {
  async findAll(orderBy) {
    const direction = orderBy === 'desc' ? 'DESC' : 'ASC';

    const rows = await db.query(
      `SELECT * FROM categories ORDER BY name ${direction}`,
    );

    return rows;
  }

  async findByName(name) {
    // desestrutura o array de rows (vindo de database/index.js partindo do db.query) e pega a primeira posição (que é o registro desejado)
    const [row] = await db.query('SELECT * FROM categories WHERE name = $1', [
      name,
    ]);

    return row;
  }

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
}

module.exports = new CategoryRepository();
