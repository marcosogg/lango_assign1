import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const langoService = {
  langoUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.langoUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.langoUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.langoUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.langoUrl}/api/users`);
    return res.data;
  },

  async deleteUser(id) {
    const res = await axios.delete(`${this.langoUrl}/api/users/${id}`);
    return res.data;
  },

  async createCollection(collection) {
    const res = await axios.post(`${this.langoUrl}/api/collections`, collection);
    return res.data;
  },

  async deleteAllCollections() {
    const response = await axios.delete(`${this.langoUrl}/api/collections`);
    return response.data;
  },

  async deleteCollection(id) {
    const response = await axios.delete(`${this.langoUrl}/api/collections/${id}`);
    return response;
  },

  async getAllCollections() {
    const res = await axios.get(`${this.langoUrl}/api/collections`);
    return res.data;
  },

  async getCollection(id) {
    const res = await axios.get(`${this.langoUrl}/api/collections/${id}`);
    return res.data;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.langoUrl}/api/places`);
    return res.data;
  },

  async createPlace(id, place) {
    const res = await axios.post(`${this.langoUrl}/api/collections/${id}/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const res = await axios.delete(`${this.langoUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.langoUrl}/api/places/${id}`);
    return res.data;
  },

  async deletePlace(id) {
    const res = await axios.delete(`${this.langoUrl}/api/places/${id}`);
    return res.data;
  },
};
