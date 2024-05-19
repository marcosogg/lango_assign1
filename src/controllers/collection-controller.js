import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import {imageStore } from "../models/image-store.js";

export const collectionController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const viewData = {
        title: "Collection",
        collection: collection,
      };
      return h.view("collection-view", viewData);
    },
  },

  addPlace: {
    handler: async function (request, h) {
      const url = await imageStore.uploadImage(request.payload.imagefile);
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newPlace = {
        place: request.payload.place,
        category: request.payload.category,
        description: request.payload.description,
        lat: Number(request.payload.lat),
        long: Number(request.payload.long),
        img: url
      };
      await db.placeStore.addPlace(collection._id, newPlace);
      return h.redirect(`/collection/${collection._id}`);
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  
  deletePlace: {
    handler: async function(request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/collection/${collection._id}`);
    },
  },
  editPlace: {
    handler: async function(request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      // Render a page to edit the place details (form)
      return h.view("edit-place", { collection, place });
    },
  },
  updatePlace: {
    handler: async function(request, h) {

      try {
        const placeId = request.params.placeid;

        const place = await db.placeStore.getPlaceById(placeId);
        console.log()

        if (!place) {
          console.log(`Place with ID ${placeId} not found.`);
          return h.response("Place not found").code(404);
        }

        const updatedPlace = {
          place: request.payload.place || place.place,
          category: request.payload.category || place.category,
          description: request.payload.description || place.description,
          lat: Number(request.payload.lat) || place.lat,
          long:Number(request.payload.long) || place.long,
          img: place.img
        };

        await db.placeStore.updatePlace(placeId, updatedPlace);

        return h.redirect(`/collection/${request.params.id}`);
      } catch (err) {
        console.error("Error updating place:", err);
        return h.response("Internal Server Error").code(500);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  getCollections: {
    handler: async function(request, h) {
      const collections = await db.collectionStore.getAllCollections();
      // Debug log to check what is being returned by getAllCollections
      console.log(collections);
      return h.view("collections", { collections });
    },
  },
  uploadImage: {
    handler: async function (request, h) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          collection.img = url;
          await db.collectionStore.updateCollection(collection);
        }
        return h.redirect(`/collection/${collection._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/collection/${collection._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  
};
