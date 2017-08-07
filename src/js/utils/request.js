class Requests {
  static async makeRequest(url, method, headers, body) {
    let request = {
      mode: 'cors',
      method,
      headers
    };
    if (body) {
      request = {
        ...request,
        body
      };
    }
    const res = await fetch(url, request);
    return await res.json();
  }
  static makeHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  static async get(url) {
    return new Promise(async (res, rej) => {
      try {
        const headers = Requests.makeHeaders();
        const json = await Requests.makeRequest(url, 'GET', headers);
        res(json);
      } catch (err) {
        rej(err);
      }
    });
  }
  static async post(url, body) {
    return new Promise(async (res, rej) => {
      try {
        const headers = Requests.makeHeaders();
        const json = await Requests.makeRequest(url, 'POST', headers, body);
        res(json);
      } catch (err) {
        rej(err);
      }
    });
  }
  static async put(url, body) {
    return new Promise(async (res, rej) => {
      try {
        const headers = Requests.makeHeaders();
        const json = await Requests.makeRequest(url, 'PUT', headers, body);
        res(json);
      } catch (err) {
        rej(err);
      }
    });
  }
  static async delete(url, body) {
    return new Promise(async (res, rej) => {
      try {
        const headers = Requests.makeHeaders();
        const json = await Requests.makeRequest(url, 'DELETE', headers, body);
        res(json);
      } catch (err) {
        rej(err);
      }
    });
  }
}

export default Requests;
