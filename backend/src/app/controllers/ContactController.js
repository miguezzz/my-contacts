const ContactRepository = require('../repositories/ContactRepository'); // gerencia a lógica de acesso aos dados

const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  // listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  // obter um registro
  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid User ID' });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  // criar um novo registro
  async store(request, response) {
    const { name, email, phone, category_id } = request.body; // desestruturando tudo para manter o código mais legível

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (email) {
      const emailExists = await ContactRepository.findByEmail(email);
      if (emailExists) {
        return response
          .status(400) // 400: Bad Request
          .json({ error: 'This email is already being used' });
      }
    }


    const phoneExists = await ContactRepository.findByPhone(phone);
    if (phoneExists) {
      return response
        .status(400) // 400: Bad Request
        .json({ error: 'This phone is already being used' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid Category ID' });
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact); // 201: Created
  }

  // editar um registro
  async update(request, response) {
    const { id } = request.params;

    const { name, email, phone, category_id } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid User ID' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid Category ID' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userExists = await ContactRepository.findById(id);

    if (!userExists) {
      return response
        .status(404)
        .json({ error: 'Cannot update. Contact not found' });
    }

    if (email) {
      const findByEmail = await ContactRepository.findByEmail(email);
      // se encontrar um email cujo id seja diferente do id passado no parâmetro, retorna erro, pois foi passado um email para edição e o email já está sendo usado por outro contato (não pode haver dois contatos com o mesmo email)
      if (findByEmail && findByEmail.id !== id) {
        return response
          .status(400)
          .json({ error: 'This email is already being used' });
      }
    }
    const findByPhone = await ContactRepository.findByPhone(phone);

    // se encontrar um telefone cujo id seja diferente do id passado no parâmetro, retorna erro, pois foi passado um telefone para edição e o telefone já está sendo usado por outro contato (não pode haver dois contatos com o mesmo telefone)
    if (findByPhone && findByPhone.id !== id) {
      return response
        .status(400)
        .json({ error: 'This phone is already being used' });
    }

    const contact = await ContactRepository.update({
      id,
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  // deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    await ContactRepository.delete(id);
    response.sendStatus(204); // 204: no content
  }
}

// Singleton (exporta uma instância única do controller)
module.exports = new ContactController();
