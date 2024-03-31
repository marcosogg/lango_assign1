import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(collectionId, place) {
    place._id = v4();
    place.collectionid = collectionId;
    places.push(place);
    return place;
  },

  async getPlacesByCollectionId(id) {
    return places.filter((place) => place.collectionid === id);
  },

  async getPlaceById(id) {
    return places.find((place) => place._id === id);
  },

  async getCollectionPlaces(collectionId) {
    return places.filter((place) => place.collectionid === collectionId);
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.title = updatedPlace.title;
    place.category = updatedPlace.category;
    place.description = updatedPlace.description;
  },
};
