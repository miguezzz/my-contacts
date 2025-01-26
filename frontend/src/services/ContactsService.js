import HttpClient from './utils/HttpClient';

class ContactService {
  async listContacts(orderBy = 'asc') {
    return HttpClient.get(`http://localhost:3001/contacts?orderBy=${orderBy}`);
  }
}

export default new ContactService();
