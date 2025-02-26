// para executar com nodemon, usar o caminho para o nodemon (./node_modules/.bin/nodemon src/index.js) ou npx nodemon src/index.js

const express = require('express'); // como é um pacote de node modules, não precisa do caminho relativo
require('express-async-errors');

const cors = require('./app/middlewares/cors');
const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

app.use(express.json()); // habilita body parser para JSON
app.use(cors); // usa o middleware CORS para permitir que a aplicação seja acessada pelo front-end e bloquear acessos de outros domínios e métodos não permitidos
app.use(routes); // usa as rotas definidas no arquivo routes.js
app.use(errorHandler); // middleware de tratamento de erros

app.listen(3001, () => console.log('Server is running on port 3001'));
