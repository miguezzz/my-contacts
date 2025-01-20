// ao baixar pacotes no yarn que são devDependecies, usar flag -D. (essas dependências não são necessárias para o projeto rodar e não sobem para produção, mas ajudam no desenvolvimento)
// para executar com nodemon, usar o caminho para o nodemon (./node_modules/.bin/nodemon src/index.js) ou npx nodemon src/index.js

// hooks: comandos executados em um dado momento predefinido. Ex: pre-commit, pre-push, pre-rebase, etc.

const express = require('express'); // como é um pacote de node modules, não precisa do caminho relativo
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json()); // habilita body parser para JSON
// middleware para permitir que a aplicação seja acessada pelo front-end (CORS)
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});
app.use(routes); // usa as rotas definidas no arquivo routes.js

// Error Handler: manipulador de erros (middleware)
// evita proliferação de try-catch em todos os controllers
// o quarto argumento (error) define que é um middleware de tratamento de erros. ele PRECISA ter 4 argumentos
app.use((error, request, response, next) => {
  // imprime o erro no console e retorna apenas status 500 (erro interno do servidor)
  console.log(error);
  response.sendStatus(500);
});

app.listen(3001, () => console.log('Server is running on port 3000'));
