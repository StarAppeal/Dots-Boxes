class RestCaller {
  async get<T>(url: string): Promise<T> {
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    });
  }

  async post<T>(url: string, body: any): Promise<T> {
    return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      body: body
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    });
  }
}
