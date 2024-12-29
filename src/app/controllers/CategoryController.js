const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoryRepository.findAll(orderBy);

    return response.json(categories); // 200: OK
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoryRepository.findById({ id });
    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
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

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const nameExists = await CategoryRepository.findByName(name);

    if (nameExists && nameExists.id !== id) {
      // nome existe e é de categoria !== da que estamos alterando
      return response
        .status(400)
        .json({ error: 'This category name is already being used' });
    }

    const updatedCategory = await CategoryRepository.update({ name, id });

    return response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    // por enquanto, quero apenas retornar no content, independentemente de ter removido ou não (caso n exista)
    await CategoryRepository.delete(id);
    response.sendStatus(204); // 204: no content
  }
}

module.exports = new CategoryController();
