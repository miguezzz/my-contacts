// Error Handler: manipulador de erros (middleware)
// evita proliferação de try-catch em todos os controllers
// o quarto argumento (error) define que é um middleware de tratamento de erros. ele PRECISA ter 4 argumentos para que o express entenda que é um middleware de tratamento de erros

module.exports = (error, request, response, next) => {
  // imprime o erro no console e retorna apenas status 500 (erro interno do servidor)
  console.log(error);
  response.sendStatus(500);
};
