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

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
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
  async update(request, response) {
    const { id } = request.params;

    const { name, email, phone, category_id } = request.body;

    const userExists = await ContactRepository.findById(id);

    if (!userExists) {
      return response
        .status(404)
        .json({ error: 'Cannot update. Contact not found' });
    }

    const contact = await ContactRepository.update(
      id,
      name,
      email,
      phone,
      category_id,
    );

    response.json(contact);
  }

  // deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
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
