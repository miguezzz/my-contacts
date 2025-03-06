class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);

    const body = await response.json();

    if (response.ok) {
      return body;
    }

    throw new Error(body.error); // a API retorna um "error" dentro do JSON.
  }
}

export default HttpClient;
