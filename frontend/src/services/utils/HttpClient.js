class HttpClient {
  async get(url) {
    const response = await fetch(url);

    return response.json();
  }
}

// singleton
export default new HttpClient();
