// ao baixar pacotes no yarn que são devDependecies, usar flag -D. (essas dependências não são necessárias para o projeto rodar e não sobem para produção, mas ajudam no desenvolvimento)
// para executar com nodemon, usar o caminho para o nodemon (./node_modules/.bin/nodemon src/index.js) ou npx nodemon src/index.js

// hooks: comandos executados em um dado momento predefinido. Ex: pre-commit, pre-push, pre-rebase, etc.

const express = require('express'); // como é um pacote de node modules, não precisa do caminho relativo

const routes = require('./routes');

const app = express();

app.use(express.json()); // habilita body parser para JSON
app.use(routes); // usa as rotas definidas no arquivo routes.js

app.listen(3000, () => console.log('Server is running on port 3000'));
