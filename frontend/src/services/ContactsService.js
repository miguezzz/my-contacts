import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(formData) {
    return this.httpClient.post('/contacts', {
      body: formData,
      /*
      headers: {
        Authorization: `Bearer ${token}`, // Se precisar de autenticação
      }
      */
    });
  }
}

export default new ContactsService();
