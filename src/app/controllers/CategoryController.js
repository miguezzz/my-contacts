const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoryRepository.findAll(orderBy);

    return response.json(categories); // 200: OK
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const nameExists = await CategoryRepository.findByName(name);
    if (nameExists) {
      return response
        .status(400)
        .json({ error: 'This category name is already being used' });
    }

    // passa o objeto com o name para o método create
    const category = await CategoryRepository.create({ name });

    response.status(201).json(category);
  }
}

module.exports = new CategoryController();
