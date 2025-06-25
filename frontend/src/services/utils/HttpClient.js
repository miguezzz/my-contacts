import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.keys(options.headers).forEach((key) => {
        headers.append(key, options.headers[key]);
      })
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      headers: headers,
      body: JSON.stringify(options.body),
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody); // a APIError é quem vai lidar com a criação da mensagem de erro
  }
}

export default HttpClient;
