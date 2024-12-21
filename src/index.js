const express = require('express'); // como é um pacote de node modules, não precisa do caminho relativo

const app = express();

app.get('/', (request, response) => {
  response.send('Hello World!');
})

app.listen(3000, () => console.log('Server is running on port 3000'));