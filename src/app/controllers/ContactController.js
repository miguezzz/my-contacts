const ContactRepository = require('../repositories/ContactRepository'); // gerencia a lógica de acesso aos dados

class ContactController {
  // listar todos os registros
  async index(request, response) {
    const contacts = await ContactRepository.findAll();

    response.json(contacts);
  }

  // obter um registro
  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json({ message: 'Contact found', contact });
  }

  // criar um novo registro
  store() {}

  // editar um registro
  update() {}

  // deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response
        .status(404)
        .json({ error: 'Cannot delete. Contact not found' });
    }

    await ContactRepository.delete(id);
    response.sendStatus(204); // resposta sem conteúdo
  }
}

// Singleton
module.exports = new ContactController(); // exporta uma instância única do controller
