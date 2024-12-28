const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

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

router.get('/categories', CategoryController.index);

// rotas post
router.post('/contacts', ContactController.store);

router.post('/categories', CategoryController.store);

// rotas put
router.put('/contacts/:id', ContactController.update);

router.put('/categories/:id', CategoryController.update);

// rotas delete
router.delete('/contacts/:id', ContactController.delete);

router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
