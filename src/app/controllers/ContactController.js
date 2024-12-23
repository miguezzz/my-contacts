const { v4 } = require('uuid');
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
  async store(request, response) {
    const { name, email, phone, category_id } = request.body; // desestruturando tudo para manter o código mais legível

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const emailExists = await ContactRepository.findByEmail(email);

    if (emailExists) {
      return response
        .status(400) // 400: Bad Request
        .json({ error: 'This email is already being used' });
    }

    const contact = await ContactRepository.create(
      name,
      email,
      phone,
      category_id,
    );

    response.status(201).json(contact); // 201: Created
  }

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
