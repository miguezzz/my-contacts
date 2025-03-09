class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);

    let body = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    console.log('body:', body);

    if (response.ok) {
      return body;
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`, // se body.error for null ou undefined (caso a api n retorne json), retorna a mensagem padrão com status e statusText
    ); // a API retorna um "error" dentro do JSON.
  }
}

export default HttpClient;
