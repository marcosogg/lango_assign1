import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placeJsonStore } from "./place-json-store.js";

export const collectionJsonStore = {
  async getAllCollections() {
    await db.read();
    return db.data.collections;
  },

  async addCollection(collection) {
    await db.read();
    collection._id = v4();
    db.data.collections.push(collection);
    await db.write();
    return collection;
  },

  async getCollectionById(id) {
    await db.read();
    let list = db.data.collections.find((collection) => collection._id === id);
    if (list) {
      list.places = await placeJsonStore.getPlacesByCollectionId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCollections(userid) {
    await db.read();
    return db.data.collections.filter((collection) => collection.userid === userid);
  },

  async deleteCollectionById(id) {
    await db.read();
    const index = db.data.collections.findIndex((collection) => collection._id === id);
    if (index !== -1) db.data.collections.splice(index, 1);
    await db.write();
  },

  async deleteAllCollections() {
    db.data.collections = [];
    await db.write();
  },
};
