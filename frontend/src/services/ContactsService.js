import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(
      `/contacts/2d35f188-8968-405a-90ed-90d1d1ed6074?orderBy=${orderBy}`,
    );
  }
}

export default new ContactsService();
