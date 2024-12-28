const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');

const router = Router();

/*
Rota com middleware:
router.get(
  '/contacts',
  (request, response, next()) => {
    request.appID = '12345'; // adiciona uma propriedade ao objeto request no middleware
    response.send('Interceptado pelo middleware');
  },
  (request, response, next()) => response.send('Outro middleware'),
  ContactController.index),;
*/

// rotas get
router.get('/', (response) => response.send('Hello World!'));
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);

// rotas put
router.put('/contacts/:id', ContactController.update);

// rotas post
router.post('/contacts', ContactController.store);

// rotas delete
router.delete('/contacts/:id', ContactController.delete);

module.exports = router;
