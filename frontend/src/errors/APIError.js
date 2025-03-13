export default class APIError extends Error {
  constructor(response, body) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.message = body?.error || `${response.status} - ${response.statusText}`; // se body.error for null ou undefined (caso a api n retorne json), retorna a mensagem padrão com status e statusText
  }
}
