import { Place } from "./place.js";

export const placeMongoStore = {
  async getAllPlaces() {
    const places = await Place.find().lean();
    return places;
  },

  async addPlace(collectionId, place) {
    place.collectionid = collectionId;
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async getPlacesByCollectionId(id) {
    const places = await Place.find({ collectionid: id }).lean();
    return places;
  },

  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      console.log("getPlaceById: ", place)
      return place;
    }
    return null;
  },

  async deletePlace(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  async updatePlace(placeId, updatedPlace) {
    console.log("updatePlace: ", placeId);
    const placeDoc = await Place.findOne({ _id: placeId });
  
    if (!placeDoc) {
      // Handle the scenario where no document was found
      console.error(`No document found with _id: ${placeId}`);
      // You could throw an error or return a value indicating failure
      throw new Error("Document not found");
      // Or, if you prefer to handle it more gracefully, you might return null or a specific response indicating the document was not found
      // return null; // Example of a graceful handling
    }
  
    // If document is found, proceed to update its fields
    placeDoc.place = updatedPlace.place;
    placeDoc.category = updatedPlace.category;
    placeDoc.description = updatedPlace.description;
    placeDoc.lat = updatedPlace.lat;
    placeDoc.long = updatedPlace.long;
  
    await placeDoc.save();
  }
  
};