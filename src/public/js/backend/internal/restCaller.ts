class RestCaller {
  async get<T>(url: string): Promise<T> {
    return this.restCall("get", url);
  }

  async post<T>(url: string, body: any): Promise<T> {
    return this.restCall("post", url, body);
  }

  private async restCall<T>(method: string, url: string, body?: any): Promise<T> {
    return fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      body: body
    }).then(response => {
      if (!response.ok) {
        console.log(JSON.stringify(response))
        throw new Error(response.statusText)
      }
      return response.json()
    });
  }

}
