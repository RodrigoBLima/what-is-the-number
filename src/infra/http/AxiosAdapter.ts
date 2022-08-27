import axios from 'axios';
import HttpServer from './httpServer';

export default class AxiosAdapter implements HttpServer {
  async get(url: string, params: any) {
    try {
      const searchParams = new URLSearchParams(params).toString();

      const { data } = await axios.get(`${url}?${searchParams}`);

      return data;
    } catch (error) {
      console.log('axios adapter get user error', error);
      return error;
    }
  }

  async post(url: string, params: any) {
    try {
      const response = await axios.post(url, params);

      return response;
    } catch (error) {
      console.log('axios adapter post user error', error);
      return error;
    }
  }

  async put(url: string, params: any) {
    try {
      const response = await axios.put(url, params);

      return response;
    } catch (error) {
      console.log('axios adapter put user error', error);
      return error;
    }
  }

  async delete(url: string, params: any) {
    try {
      const { data } = await axios.delete(url, params);

      return data;
    } catch (error) {
      console.log('axios adapter delete user error', error);
      return error;
    }
  }
}