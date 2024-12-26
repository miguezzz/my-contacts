// cria a conexão com o banco de dados
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values); // executa a query passada como argumento e desestrutura apenas o array de linhas de resultado da query
  return rows;
};
