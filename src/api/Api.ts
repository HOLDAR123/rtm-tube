import axios, { AxiosRequestConfig } from 'axios';

import store from '../store';

export default class Api {
  protected address: string =
    process.env.REACT_APP_API_ENDPOINT || 'REACT_APP_API_ENDPOINT';
  protected token: string | null = null;

  private updateToken() {
    const {
      auth: { token },
    } = store.getState();

    if (token) {
      this.token = token;
    } else {
      this.token = null;
    }
  }

  constructor() {
    this.updateToken();

    store.subscribe(this.updateToken.bind(this));
  }

  request<RES>(method: string, config: AxiosRequestConfig): Promise<RES> {
    return axios<RES>(this.address + method, config).then(
      (response) => response.data,
    );
  }
}
