import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(collectionId, place) {
    await db.read();
    place._id = v4();
    place.collectionid = collectionId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByCollectionId(id) {
    await db.read();
    let foundPlaces = db.data.places.filter((place) => place.collectionid === id);
    if (!foundPlaces) {
      foundPlaces = null;
    }
    return foundPlaces;
  },

  async getPlaceById(id) {
    await db.read();
    let foundPlace = db.data.places.find((place) => place._id === id);
    if (!foundPlace) {
      foundPlace = null;
    }
    return foundPlace;
  },

  async getCollectionPlaces(collectionId) {
    await db.read();
    let foundPlaces = places.filter((place) => place.collectionid === collectionId);
    if (!foundPlaces) {
      foundPlaces = null;
    }
    return foundPlaces;
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    if (index !== -1) db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.place = updatedPlace.place;
    place.category = updatedPlace.category;
    place.description = updatedPlace.description;
    place.lat = updatedPlace.lat;
    place.long = updatedPlace.long;
    await db.write();
  },
};