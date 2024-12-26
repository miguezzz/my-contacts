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
    const phoneExists = await ContactRepository.findByPhone(phone);

    if (emailExists) {
      return response
        .status(400) // 400: Bad Request
        .json({ error: 'This email is already being used' });
    }

    if (phoneExists) {
      return response
        .status(400) // 400: Bad Request
        .json({ error: 'This phone is already being used' });
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

    const findByEmail = await ContactRepository.findByEmail(email);

    // se encontrar um email cujo id seja diferente do id passado no parâmetro, retorna erro, pois foi passado um email para edição e o email já está sendo usado por outro contato (não pode haver dois contatos com o mesmo email)
    if (findByEmail && findByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This email is already being used' });
    }

    const findByPhone = await ContactRepository.findByPhone(phone);

    // se encontrar um telefone cujo id seja diferente do id passado no parâmetro, retorna erro, pois foi passado um telefone para edição e o telefone já está sendo usado por outro contato (não pode haver dois contatos com o mesmo telefone)
    if (findByPhone && findByPhone.id !== id) {
      return response
        .status(400)
        .json({ error: 'This phone is already being used' });
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
